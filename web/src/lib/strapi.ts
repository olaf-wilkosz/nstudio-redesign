// Build-time (SSG) REST client for the local Strapi CMS. Astro calls these
// functions in frontmatter / getStaticPaths, never in the browser, so plain
// (non-PUBLIC_) env vars are fine here - see astro.build/en/guides/environment-variables.
import { withBase } from './url';

const STRAPI_URL = import.meta.env.STRAPI_URL ?? 'http://localhost:1337';

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  /** KB, per Strapi's convention - used to guard against the format being larger than the original (see strapiImageSrc). */
  size: number;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  /** KB */
  size: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

export type Kategoria = 'mieszkanie' | 'dom' | 'komercyjne';

export interface Realizacja {
  id: number;
  documentId: string;
  tytul: string;
  slug: string;
  opis: string | null;
  lokalizacja: string | null;
  kategoria: Kategoria;
  kolejnosc: number | null;
  okladka: StrapiMedia | null;
  galeria: StrapiMedia[];
}

export interface PostBloga {
  id: number;
  documentId: string;
  tytul: string;
  slug: string;
  zajawka: string | null;
  tresc: string;
  data: string;
  okladka: StrapiMedia | null;
}

export interface Ustawienia {
  telefon: string | null;
  telefonMeble: string | null;
  email: string | null;
  emailMeble: string | null;
  adres: string | null;
  godzinyOtwarcia: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  googleMaps: string | null;
  lat: number | null;
  lng: number | null;
}

interface StrapiListResponse<T> {
  data: T[];
}

interface StrapiSingleResponse<T> {
  data: T | null;
}

async function strapiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Strapi request failed: GET ${path} -> ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/**
 * Resolves a Strapi media `url`. In production builds, Strapi's uploaded
 * files are copied into web/public/uploads (see scripts/sync-uploads.mjs,
 * wired as a "prebuild" step) so the deployed static site never depends on
 * Strapi still running - this returns a same-origin path for those. In dev
 * mode it points straight at the live local Strapi instance for fast
 * iteration without needing to re-sync files on every change.
 */
export function strapiMediaUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return import.meta.env.PROD ? withBase(url) : `${STRAPI_URL}${url}`;
}

type ImageSize = 'thumbnail' | 'small' | 'medium' | 'large' | 'original';

// Preferred format to fall back through if the requested size wasn't
// generated (Strapi skips a format when the original is already smaller
// than that breakpoint).
const FALLBACK_ORDER: Record<Exclude<ImageSize, 'original'>, Array<keyof NonNullable<StrapiMedia['formats']>>> = {
  thumbnail: ['thumbnail', 'small', 'medium', 'large'],
  small: ['small', 'medium', 'large', 'thumbnail'],
  medium: ['medium', 'large', 'small', 'thumbnail'],
  large: ['large', 'medium', 'small', 'thumbnail'],
};

/**
 * Strapi's local upload provider already generates thumbnail/small/medium/
 * large variants for every image (via sharp) - using those instead of the
 * always-full-resolution `url` is the single biggest image-weight win here
 * (e.g. a 2000px original at ~320KB vs. its 750px "medium" at ~58KB for a
 * card displayed at ~535px). Falls back to the original if no formats exist
 * (e.g. the source image was already smaller than every breakpoint).
 *
 * Guards against a real pathology found via Lighthouse: for flat-color
 * line-art PNGs (floor plans, technical drawings), Strapi's resized variant
 * can end up *larger* than the original despite smaller pixel dimensions
 * (PNG compression is very content-sensitive) - e.g. a 766x542 original at
 * 93KB whose "medium" resize came out at 467KB. Always use whichever is
 * smaller in actual bytes.
 */
export function strapiImageSrc(media: StrapiMedia, size: ImageSize = 'medium'): string {
  if (size !== 'original' && media.formats) {
    for (const candidate of FALLBACK_ORDER[size]) {
      const fmt = media.formats[candidate];
      if (fmt) {
        return fmt.size < media.size ? strapiMediaUrl(fmt.url) : strapiMediaUrl(media.url);
      }
    }
  }
  return strapiMediaUrl(media.url);
}

export async function getRealizacje(): Promise<Realizacja[]> {
  const json = await strapiFetch<StrapiListResponse<Realizacja>>(
    '/api/realizacje?populate=*&sort=kolejnosc:asc&pagination[pageSize]=100'
  );
  return json.data;
}

export async function getRealizacjaBySlug(slug: string): Promise<Realizacja | null> {
  const json = await strapiFetch<StrapiListResponse<Realizacja>>(
    `/api/realizacje?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  return json.data[0] ?? null;
}

export async function getPostyBloga(): Promise<PostBloga[]> {
  const json = await strapiFetch<StrapiListResponse<PostBloga>>(
    '/api/posty-bloga?populate=*&sort=data:desc&pagination[pageSize]=100'
  );
  return json.data;
}

export async function getPostBlogaBySlug(slug: string): Promise<PostBloga | null> {
  const json = await strapiFetch<StrapiListResponse<PostBloga>>(
    `/api/posty-bloga?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`
  );
  return json.data[0] ?? null;
}

const USTAWIENIA_FALLBACK: Ustawienia = {
  telefon: null,
  telefonMeble: null,
  email: null,
  emailMeble: null,
  adres: null,
  godzinyOtwarcia: null,
  facebook: null,
  instagram: null,
  youtube: null,
  googleMaps: null,
  lat: null,
  lng: null,
};

/**
 * Ustawienia is a singleton that returns 404 until an entry is created in the
 * admin panel, which is expected right after a fresh `cms` setup - fall back
 * to empty values instead of failing the whole SSG build.
 */
export async function getUstawienia(): Promise<Ustawienia> {
  const res = await fetch(`${STRAPI_URL}/api/ustawienie`);
  if (res.status === 404) return USTAWIENIA_FALLBACK;
  if (!res.ok) {
    throw new Error(`Strapi request failed: GET /api/ustawienie -> ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as StrapiSingleResponse<Ustawienia>;
  return json.data ?? USTAWIENIA_FALLBACK;
}
