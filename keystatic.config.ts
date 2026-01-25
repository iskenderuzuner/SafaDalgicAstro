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
          validation: { isRequired: true },
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
    
    // 3. BLOG
    blog: collection({
      label: 'Blog Yazıları',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Blog Başlığı' } }),
        description: fields.text({ label: 'Kısa Özet' }),
        date: fields.date({ label: 'Yayın Tarihi', validation: { isRequired: true } }),
        image: fields.image({
          label: 'Kapak Resmi',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
          validation: { isRequired: true },
        }),
        content: fields.document({
            label: 'Yazı İçeriği',
            formatting: true,
            dividers: true,
            links: true,
            images: {
              directory: 'public/images/blog/icerik',
              publicPath: '/images/blog/icerik/',
            },
        }),
      },
    }),

    // 4. MÜŞTERİ YORUMLARI
    yorumlar: collection({
      label: 'Müşteri Yorumları',
      slugField: 'isim',
      path: 'src/content/yorumlar/*',
      format: 'json',
      schema: {
        isim: fields.slug({ name: { label: 'Müşteri Adı Soyadı' } }),
        unvan: fields.text({ label: 'Ünvan / Firma Adı' }),
        yorum: fields.text({ label: 'Müşteri Yorumu', multiline: true }),
        puan: fields.integer({ 
            label: 'Puan (1-5 Arası)', 
            defaultValue: 5,
            validation: { min: 1, max: 5 } 
        }),
      },
    }),

    

  },
});