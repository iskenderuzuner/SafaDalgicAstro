import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'iskenderuzuner/SafaDalgicAstro', // BURAYI KENDİ BİLGİLERİNLE DEĞİŞTİR!
  },
  
  // 1. TEKİL AYARLAR (Telefon, Adres vb.)
  singletons: {
    ayarlar: singleton({
      label: 'Genel Ayarlar',
      path: 'src/content/ayarlar/genel',
      format: 'json',
      schema: {
        siteBaslik: fields.text({ label: 'Site Başlığı' }),
        slogan: fields.text({ label: 'Üst Bar Slogan' }),
        telefon: fields.text({ label: 'Telefon Numarası' }),
        email: fields.text({ label: 'E-Posta Adresi' }),
        adres: fields.text({ label: 'Açık Adres', multiline: true }),
        whatsappLink: fields.url({ label: 'WhatsApp Linki' }),
      },
    }),
  },

  // 2. KOLEKSİYONLAR (Hizmetler, Sayfalar)
  collections: {
    hizmetler: collection({
      label: 'Hizmetlerimiz',
      slugField: 'title',
      path: 'src/content/hizmetler/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Hizmet Başlığı' } }),
        description: fields.text({ label: 'Kısa Açıklama (SEO)' }),
        image: fields.url({ label: 'Kapak Resmi URL' }),
        order: fields.integer({ label: 'Sıralama No', defaultValue: 0 }),
        content: fields.document({
          label: 'Hizmet İçeriği',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});