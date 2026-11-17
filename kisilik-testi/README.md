# Hangisisin? — Kişilik Testi Shorts Şablonu

Soruları ve sonuçları bir JSON dosyasına yaz, şablon 1080×1920 (9:16) sesli bir YouTube Shorts videosu çıkarsın.

**Konsept:** Her cevabın bir puanı var. İzleyici geri sayım bitene kadar cevabını seçer, sonra şıkların puanları (+1, +4…) görünür.
Sonunda puanlarını toplar ve toplam puanına göre sonucunu öğrenir ("13–16 puan aldıysan... ⭐ Yıldız Kızı").

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
  "ustYazi": "MANİFEST TESTİ",
  "baslik": "Hangi Manifest Kızısın?",
  "kanca": "Sadece %4'ü Güneş Kızı çıkıyor...",
  "tema": { "renk1": "#B388EB", "renk2": "#F7A1C4" },
  "sorular": [
    { "soru": "Sabah uyanınca ilk ne yaparsın?", "secenekler": [
      { "metin": "Olumlamalarımı okurum ✨", "puan": 4 },
      { "metin": "Telefona bakarım 📱", "puan": 1 },
      { "metin": "Su içip esnerim 💧", "puan": 3 },
      { "metin": "Rüyamı yazarım 📓", "puan": 2 } ] }
  ],
  "sonuclar": [
    { "emoji": "🌊", "ad": "Okyanus Kızı", "aciklama": "...", "aralik": [5, 8] },
    { "emoji": "🌙", "ad": "Ay Kızı",      "aciklama": "...", "aralik": [9, 12] },
    { "emoji": "⭐", "ad": "Yıldız Kızı",  "aciklama": "...", "aralik": [13, 16] },
    { "emoji": "☀️", "ad": "Güneş Kızı",   "aciklama": "...", "aralik": [17, 20] }
  ],
  "kapanis": "Kaç puan aldın? Yorumlara yaz!",
  "uyari": "(isteğe bağlı) Kapanışta küçük yazıyla gösterilir"
}
```

**Puanlar:**
- Her şık `{ "metin": "...", "puan": 3 }` şeklinde yazılır. Puanları karışık sırala (A hep 1 olmasın), yoksa izleyici kalıbı çözer.
- Şıkları düz yazı olarak yazarsan (`"Kırmızı ❤️"`) puanları otomatik A=1, B=2, C=3, D=4 olur.
- `aralik`: o sonucun toplam puan aralığı. Yazmazsan en düşük ve en yüksek olası toplam, sonuçlara eşit bölünür.
  Aralıklar boşluksuz ve çakışmasız olmalı (örnek: 5–8, 9–12, 13–16, 17–20). 4 şıklı 5 soruda toplam 5 ile 20 arasında olur.
- `"puanZamani": "hemen"` eklersen puanlar şıklarla birlikte en baştan görünür. Varsayılan `"sonra"`: puanlar geri sayımdan sonra açılır.

**Süre:** 5 soru ve 4 sonuçla video yaklaşık **56 saniye** sürer. 6 soru yaparsan `"sureler": { "soru": 5, "sonuc": 3 }` ile kısalt ki 60 saniyeyi geçmesin.
Ayarlanabilen süreler (saniye): `giris`, `kural`, `soru`, `sayim`, `puan`, `sonucSorusu`, `sonuc`, `kapanis`.

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
