import { defineConfig } from 'astro/config';
// ... diğer importlar ...
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://safadalgicpompa.com', // BU SATIR KESİN OLMALI
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    keystatic(),
    markdoc(),
    sitemap({}) // BURAYI DEĞİŞTİRDİK (İçine {} koyduk)
  ]
});