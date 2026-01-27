import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://safadalgicpompa.com', // Site adresi doğru
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    markdoc(),
    sitemap() // Eğer yine hata verirse burayı sitemap({}) yapmayı deneriz.
  ]
});