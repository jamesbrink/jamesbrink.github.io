import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jamesbrink.online',
  // Removed near-duplicate post; keep its URL alive for anyone who bookmarked it.
  redirects: {
    '/blog/installing-python-macos': '/blog/installing-python-macos-preview',
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  compressHTML: true,
});
