import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid', // Dinamik özellikler için Hybrid mod
  adapter: vercel(),
  integrations: [
    react(),
    keystatic()
  ]
});