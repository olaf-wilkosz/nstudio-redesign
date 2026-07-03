// Build-time (SSG) REST client for the local Strapi CMS. Astro calls these
// functions in frontmatter / getStaticPaths, never in the browser, so plain
// (non-PUBLIC_) env vars are fine here - see astro.build/en/guides/environment-variables.
const STRAPI_URL = import.meta.env.STRAPI_URL ?? 'http://localhost:1337';

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
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

/** Resolves a Strapi media `url` (often relative) to an absolute URL. */
export function strapiMediaUrl(url: string): string {
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
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
