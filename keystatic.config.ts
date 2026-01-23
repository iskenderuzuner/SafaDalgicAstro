import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'iskenderuzuner/SafaDalgicAstro', // Kendi repo adın
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

  // 2. KOLEKSİYONLAR (Hizmetler, Slider vb.)
  collections: {
    hizmetler: collection({
      label: 'Hizmetlerimiz',
      slugField: 'title',
      path: 'src/content/hizmetler/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Hizmet Başlığı' } }),
        description: fields.text({ label: 'Kısa Açıklama (SEO)' }),
        image: fields.image({
          label: 'Kapak Resmi',
          directory: 'public/images/hizmetler',
          publicPath: '/images/hizmetler/',
        }),
        order: fields.integer({
          label: 'Sıralama No',
          defaultValue: 0,
        }),
        content: fields.markdoc({
          label: 'Hizmet İçeriği',
        }),
      },
    }),

    // YENİ EKLENEN SLIDER BÖLÜMÜ (Virgül hatası düzeltildi)
    slider: collection({
      label: 'Slider (Manşet)',
      slugField: 'title',
      path: 'src/content/slider/*',
      schema: {
        title: fields.slug({ name: { label: 'Başlık' } }),
        aciklama: fields.text({ label: 'Kısa Açıklama' }),
        resim: fields.image({
          label: 'Slider Resmi',
          directory: 'public/images/slider',
          publicPath: '/images/slider/',
        }),
        sira: fields.integer({
          label: 'Sıralama No (1, 2, 3...)',
          defaultValue: 1,
        }),
      },
    }),
  },
});