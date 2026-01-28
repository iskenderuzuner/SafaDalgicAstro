import { getCollection } from 'astro:content';

export const prerender = true; // Hızlı çalışması için statik üretilir

export async function GET() {
  const siteUrl = 'https://safadalgicpompa.com'; // Site adresin

  // ---------------------------------------------------------
  // 1. SABİT SAYFALAR (Elle eklenenler)
  // ---------------------------------------------------------
  const staticPages = [
    '',           // Ana sayfa
    '/hakkimizda',
    '/iletisim',
    '/hizmetler', // Hizmetler ana sayfası
    '/blog',   // Eğer blog ana sayfan varsa bu yorumu kaldır
  ];

  // ---------------------------------------------------------
  // 2. OTOMATİK İÇERİKLER (CMS'ten gelenler)
  // ---------------------------------------------------------
  
  // Hizmetleri Çek
  // (Not: 'hizmetler' ismi content klasöründeki isminle aynı olmalı)
  let hizmetUrls: string[] = [];
  try {
    const allHizmetler = await getCollection('hizmetler');
    hizmetUrls = allHizmetler.map((item) => `/hizmetler/${item.slug}`);
  } catch (e) {
    console.log('Hizmetler koleksiyonu bulunamadı veya boş.');
  }

  // Blogları Çek
  // (Not: 'blog' ismi content klasöründeki isminle aynı olmalı)
  let blogUrls: string[] = [];
  try {
    const allBlog = await getCollection('blog');
    blogUrls = allBlog.map((item) => `/blog/${item.slug}`);
  } catch (e) {
    // Blog koleksiyonu henüz yoksa hata vermesin diye boş geçiyoruz
    console.log('Blog koleksiyonu bulunamadı, sitemap\'e eklenmedi.');
  }

  // ---------------------------------------------------------
  // 3. LİSTELERİ BİRLEŞTİR VE XML OLUŞTUR
  // ---------------------------------------------------------
  const allPages = [...staticPages, ...hizmetUrls, ...blogUrls];

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map((url) => `
    <url>
      <loc>${siteUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${url === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>
`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}