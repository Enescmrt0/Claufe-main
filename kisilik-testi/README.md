# Hangisisin? — Kişilik Testi Shorts Şablonu

Soruları ve sonuçları bir JSON dosyasına yaz, şablon 1080×1920 (9:16) sesli bir YouTube Shorts videosu çıkarsın.

## Kurulum (bir kere)
```bash
cd kisilik-testi
npm install
```

## Yeni test eklemek
1. `testler/` klasöründeki bir dosyayı kopyala, örneğin `testler/hangi-kahvesin.json`.
   Dosya adında Türkçe karakter ve boşluk kullanma; video adı bu olacak.
2. İçini doldur:

```json
{
  "ustYazi": "KİŞİLİK TESTİ",
  "baslik": "Hangi Kahvesin?",
  "kanca": "Sadece %5'i Türk Kahvesi çıkıyor...",
  "tema": { "renk1": "#C08552", "renk2": "#5E3023" },
  "sorular": [
    { "soru": "Sabah ilk ne yaparsın?", "secenekler": ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"] }
  ],
  "sonuclar": [
    { "emoji": "☕", "ad": "Türk Kahvesi", "aciklama": "A çoğunluktaysa çıkan sonuç" },
    { "emoji": "🥤", "ad": "Ice Latte", "aciklama": "B çoğunluktaysa" },
    { "emoji": "🍵", "ad": "Matcha", "aciklama": "C çoğunluktaysa" },
    { "emoji": "🫖", "ad": "Çay", "aciklama": "D çoğunluktaysa" }
  ],
  "kapanis": "Ne çıktın? Yorumlara yaz!",
  "uyari": "(isteğe bağlı) Kapanışta küçük yazıyla gösterilir"
}
```

- `sonuclar` sırası şıklarla eşleşir: 1. sonuç = A, 2. = B, ...
- 5 soru ve 4 sonuçla video yaklaşık **50 saniye** sürer (Shorts için 60 saniyenin altında).
- Süreleri değiştirmek istersen `"sureler": { "soru": 4, "sonuc": 3 }` ekle (saniye cinsinden).
  Ayarlanabilenler: `giris`, `kural`, `soru`, `sayim`, `sonucSorusu`, `sonuc`, `kapanis`.

## Video çıkarmak
```bash
npm run render                    # testler/ içindeki tüm testler → cikti/*.mp4
npm run render -- hangi-kahvesin  # sadece bir test
npm run kapak                     # her test için kapak görseli → cikti/*-kapak.png
npm run kanal                     # kanal profil fotoğrafı + banner → kanal/
npm run studio                    # tarayıcıda canlı önizleme ve düzenleme
```

## Kanal görselleri
- `kanal/kanal-profil.png`: 800×800 profil fotoğrafı
- `kanal/kanal-banner.png`: 2560×1440 banner. Yazılar, her cihazda görünen ortadaki 1546×423 alanın içinde.

## Notlar
- Efekt sesleri (tık, pop, ding, whoosh, tada) `npm run sesler` ile kodla üretilir, telifsizdir.
  Müziği yüklerken YouTube Shorts uygulamasından trend bir ses ekleyebilirsin.
- Font: Baloo 2 (Google Fonts, OFL). Projeye gömülü, internet gerekmez.
- Sorular Shorts'un güvenli alanında kalır; alttaki başlık ve sağdaki butonlar yazıların üstüne gelmez.
