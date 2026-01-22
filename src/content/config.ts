import { defineCollection, z } from 'astro:content';

// 1. Hizmetler Koleksiyonu
const hizmetlerCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number().default(0),
  }),
});

// 2. Sayfalar Koleksiyonu
const sayfalarCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    bannerImage: z.string().optional(),
  }),
});

// 3. Genel Ayarlar (Telefon, Logo vb.)
const ayarlarCollection = defineCollection({
  type: 'data', // Bu bir yazı değil, JSON verisidir
  schema: z.object({
    siteBaslik: z.string(),
    telefon: z.string(),
    email: z.string(),
    adres: z.string(),
    slogan: z.string(),
    whatsappLink: z.string(),
  }),
});

export const collections = {
  'hizmetler': hizmetlerCollection,
  'sayfalar': sayfalarCollection,
  'ayarlar': ayarlarCollection,
};