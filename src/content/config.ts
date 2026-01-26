import { defineCollection, z } from 'astro:content';

// 1. HİZMETLER
const hizmetler = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number().optional().default(0),
  }),
});

// 2. SLIDER
const slider = defineCollection({
  type: 'data', 
  schema: z.object({
    title: z.string(),
    aciklama: z.string(), // Senin kodundaki gibi Türkçe bıraktım
    resim: z.string(),    // Senin kodundaki gibi Türkçe bıraktım
    sira: z.number(),
  }),
});

// 3. BLOG (Tarih otomatik)
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date().default(() => new Date()), 
    image: z.string(),
  }),
});

// 4. YORUMLAR
const yorumlar = defineCollection({
  type: 'data',
  schema: z.object({
    isim: z.string(),
    unvan: z.string().optional(),
    yorum: z.string(),
    puan: z.number().min(1).max(5).default(5),
  }),
});

// 5. GENEL AYARLAR (YENİ EKLENDİ: Logo, Favicon, SEO ve İletişim)
const ayarlar = defineCollection({
  type: 'data', // JSON dosyası olduğu için data
  schema: z.object({
    // Yeni eklediğimiz alanlar
    logo: z.string(),
    favicon: z.string(),
    siteTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    
    // Mevcut iletişim bilgileri
    slogan: z.string(),
    telefon: z.string(),
    email: z.string(),
    adres: z.string(),
    whatsappLink: z.string().optional(),
  }),
});

// HEPSİNİ DIŞARI AKTAR
export const collections = {
  hizmetler: hizmetler,
  slider: slider,
  blog: blog,       
  yorumlar: yorumlar,
  ayarlar: ayarlar // <-- Bunu ekledik, artık hata vermez.
};