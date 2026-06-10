// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
  site: 'https://brandon-behring.dev',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Build-time math: $…$ / $$…$$ render to static KaTeX HTML+CSS — no client JS.
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    build: {
      // The production CSP (public/_headers) is strict: script-src 'self',
      // font-src 'self'. Never inline small scripts or assets as inline
      // <script>/data: URIs — they'd be blocked at the edge.
      assetsInlineLimit: 0,
    },
  },
});
