import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel/serverless'; // <--- BU SATIR EKSİK OLDUĞU İÇİN HATA VERİYOR
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://safadalgicpompa.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    markdoc(),
    sitemap({})
  ]
});