// Copies Strapi's uploaded media (cms/public/uploads) into web/public/uploads
// so the production build is fully self-contained - the deployed static site
// must not depend on Strapi still running anywhere (it doesn't in this PoC;
// Strapi only runs long enough to serve the SSG build, see krok 7 / the GH
// Actions workflow). Runs automatically before `astro build` (prebuild hook).
//
// Also generates a .webp sibling for every jpg/png (Strapi's own formats
// included) - WebP beats both at equivalent quality, and doing it here means
// Strapi's DB/API keep plain jpg/png (no changes to seed data or the admin
// UI), while strapiMediaUrl() swaps the extension only for the deployed
// static site (see web/src/lib/strapi.ts).
import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, '../../cms/public/uploads');
const dest = join(__dirname, '../public/uploads');

if (!existsSync(source)) {
  console.warn(`[sync-uploads] ${source} not found - skipping (Strapi not set up yet?)`);
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

const RASTER_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

let copied = 0;
let converted = 0;
for (const entry of readdirSync(source)) {
  const src = join(source, entry);
  if (!statSync(src).isFile()) continue;

  copyFileSync(src, join(dest, entry));
  copied++;

  const ext = extname(entry).toLowerCase();
  if (!RASTER_EXTENSIONS.has(ext)) continue;

  const webpName = entry.slice(0, -ext.length) + '.webp';
  try {
    await sharp(src).webp({ quality: 82 }).toFile(join(dest, webpName));
    converted++;
  } catch (err) {
    console.warn(`[sync-uploads] failed to convert ${entry} to webp: ${err.message}`);
  }
}

console.log(`[sync-uploads] copied ${copied} file(s), converted ${converted} to webp`);
