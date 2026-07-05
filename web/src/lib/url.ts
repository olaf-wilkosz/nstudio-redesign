/**
 * Prefixes a root-relative path with Astro's configured `base` (the GH Pages
 * subpath, e.g. /nstudio-redesign). Needed because Astro only auto-prefixes
 * paths it processes as assets - plain hardcoded hrefs/srcs in templates do
 * not get the base applied automatically.
 */
export function withBase(path: string): string {
  if (/^https?:\/\//.test(path)) return path; // already absolute (e.g. Strapi media URL) - pass through
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedBase && normalizedPath.startsWith(`${normalizedBase}/`)) return normalizedPath; // already based - don't double-prefix (e.g. strapiImageSrc() output passed through again as an ogImage prop)
  return `${normalizedBase}${normalizedPath}`;
}
