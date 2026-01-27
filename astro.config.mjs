import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap'; // 1. EKLENEN: Sitemap importu

export default defineConfig({
  site: 'https://safadalgicpompa.com', // 2. EKLENEN: Site adresin (Sitemap için şart)
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    markdoc(),
    sitemap() // 3. EKLENEN: Entegrasyon listesine ekledik
  ]
});