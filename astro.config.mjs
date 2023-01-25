import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/utils/calculate-reading-time.mjs';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'server',
  integrations: [mdx(), sitemap(), tailwind(), prefetch(), react()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    extendDefaultPlugins: true,
  },
  adapter: vercel(),
});
