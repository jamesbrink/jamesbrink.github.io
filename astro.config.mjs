import { readdirSync, readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Map /blog/<slug>/ -> updatedDate (or date) from post frontmatter so the
// sitemap can carry <lastmod>. astro:content isn't available here, so read
// the frontmatter directly; slugs are the lowercased filenames.
const postLastmod = {};
for (const file of readdirSync('./src/content/blog')) {
  if (!file.endsWith('.mdx')) continue;
  const source = readFileSync(`./src/content/blog/${file}`, 'utf8');
  const updated = source.match(/^updatedDate:\s*['"]?([^'"\s]+)/m)?.[1];
  const date = source.match(/^date:\s*['"]?([^'"\s]+)/m)?.[1];
  const lastmod = updated || date;
  if (lastmod) {
    postLastmod[`/blog/${file.replace(/\.mdx$/, '').toLowerCase()}/`] = new Date(lastmod);
  }
}

export default defineConfig({
  site: 'https://jamesbrink.online',
  // Removed near-duplicate post; keep its URL alive for anyone who bookmarked it.
  // Tag archives moved from raw lowercased names to slugs; redirect the two
  // multi-word tags whose old URLs differed.
  redirects: {
    '/blog/installing-python-macos': '/blog/installing-python-macos-preview',
    '/blog/tag/operating systems': '/blog/tag/operating-systems',
    '/blog/tag/ai & automation': '/blog/tag/ai-automation',
  },
  integrations: [
    mdx(),
    sitemap({
      serialize(item) {
        const lastmod = postLastmod[new URL(item.url).pathname];
        return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  compressHTML: true,
});
