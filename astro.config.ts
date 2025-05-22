import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import node from '@astrojs/node';

import icon from 'astro-icon';
import compress from 'astro-compress';

import projectConfig from './config';

import { responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',
  prefetch: false,

  server: {
    allowedHosts: [],
    headers: {
      'Content-Security-Policy':
        "default-src data: * 'localhost'; " +
        "script-src data: * 'unsafe-inline' 'localhost'; " +
        "style-src * 'unsafe-inline' 'localhost'; " +
        "media-src data: * 'localhost'; " +
        'frame-src data: *; ' +
        'connect-src data: *; ' +
        "img-src * 'localhost'; ",
    },
  },

  integrations: [
    react({
      include: ['**/react/*'],
      experimentalReactChildren: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    projectConfig({
      config: './src/config.yaml',
    }),
  ],

  markdown: {
    remarkPlugins: [],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },

  adapter: node({
    mode: 'standalone',
  }),
});
