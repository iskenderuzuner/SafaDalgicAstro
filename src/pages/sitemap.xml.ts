import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const siteUrl = 'https://safadalgicpompa.com';
  const buildDate = new Date().toISOString(); // Sabit sayfalar için bugünün tarihi

  // 1. SABİT SAYFALAR (Tarihleri bugün olsun çünkü kod değiştiğinde bunlar da değişir)
  const staticPages = [
    { url: '', date: buildDate },
    { url: '/hakkimizda', date: buildDate },
    { url: '/iletisim', date: buildDate },
    { url: '/hizmetler', date: buildDate },
    { url: '/blog', date: buildDate },

  ];

  // 2. DİNAMİK İÇERİKLERİ ÇEK
  let dynamicPages = [];

  // Hizmetleri Çek
  try {
    const allHizmetler = await getCollection('hizmetler');
    const hizmetItems = allHizmetler.map((item) => ({
      url: `/hizmetler/${item.slug}`,
      // Hizmetlerde tarih alanı varsa onu kullan, yoksa bugünü kullan
      date: item.data.date ? new Date(item.data.date).toISOString() : buildDate
    }));
    dynamicPages.push(...hizmetItems);
  } catch (e) { console.log('Hizmetler boş'); }

  // Blogları Çek (ESAS BURASI ÖNEMLİ)
  try {
    const allBlog = await getCollection('blog');
    const blogItems = allBlog.map((item) => ({
      url: `/blog/${item.slug}`,
      // BURADA BLOGUN GERÇEK TARİHİNİ ALIYORUZ:
      date: item.data.date ? new Date(item.data.date).toISOString() : buildDate
    }));
    dynamicPages.push(...blogItems);
  } catch (e) { console.log('Blog boş'); }

  // 3. LİSTELERİ BİRLEŞTİR
  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map((page) => `
    <url>
      <loc>${siteUrl}${page.url}</loc>
      <lastmod>${page.date}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.url === '' ? '1.0' : '0.8'}</priority>
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