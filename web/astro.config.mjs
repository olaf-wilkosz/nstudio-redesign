// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import preact from '@astrojs/preact';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Base path (subdomain path prefix for GH Pages) is added in step 7 once
  // the deploy workflow lands - see krok 7 w README.
  site: 'https://olaf-wilkosz.github.io',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [preact(), sitemap()]
});