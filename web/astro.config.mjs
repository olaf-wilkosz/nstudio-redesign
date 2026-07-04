// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://olaf-wilkosz.github.io',
  // GH Pages project site lives at <user>.github.io/nstudio-redesign, not at
  // the domain root - every internal href/src must go through withBase()
  // (src/lib/url.ts) to respect this in both dev and prod.
  base: '/nstudio-redesign',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact(), sitemap()]
});