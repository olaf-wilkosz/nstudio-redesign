// Copies Strapi's uploaded media (cms/public/uploads) into web/public/uploads
// so the production build is fully self-contained - the deployed static site
// must not depend on Strapi still running anywhere (it doesn't in this PoC;
// Strapi only runs long enough to serve the SSG build, see krok 7 / the GH
// Actions workflow). Runs automatically before `astro build` (prebuild hook).
import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const source = join(__dirname, '../../cms/public/uploads');
const dest = join(__dirname, '../public/uploads');

if (!existsSync(source)) {
  console.warn(`[sync-uploads] ${source} not found - skipping (Strapi not set up yet?)`);
  process.exit(0);
}

mkdirSync(dest, { recursive: true });

let count = 0;
for (const entry of readdirSync(source)) {
  const src = join(source, entry);
  if (statSync(src).isFile()) {
    copyFileSync(src, join(dest, entry));
    count++;
  }
}

console.log(`[sync-uploads] copied ${count} file(s) from cms/public/uploads to web/public/uploads`);
