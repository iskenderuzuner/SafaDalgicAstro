import { defineCollection, z } from 'astro:content';

// Hizmetler Şeması
const hizmetler = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number().optional().default(0),
  }),
});

// Slider Şeması
const slider = defineCollection({
  schema: z.object({
    title: z.string(),
    aciklama: z.string(),
    resim: z.string(),
    sira: z.number(),
  }),
});

export const collections = {
  hizmetler: hizmetler,
  slider: slider,
};