import { defineCollection, z } from 'astro:content';

// 1. HİZMETLER (Makale formatında olduğu için type belirtmeye gerek yok, varsayılan 'content')
const hizmetler = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number().optional().default(0),
  }),
});

// 2. SLIDER (Sadece veri içerdiği için type: 'data' OLMALI)
const slider = defineCollection({
  type: 'data', // <--- KRİTİK NOKTA BURASI
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