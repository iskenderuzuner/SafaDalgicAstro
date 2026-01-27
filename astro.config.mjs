import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel/serverless';
// import sitemap iptal edildi

export default defineConfig({
  site: 'https://safadalgicpompa.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    markdoc(),
    // sitemap() iptal edildi
  ]
});