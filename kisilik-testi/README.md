# Hangisisin? — Kişilik Testi Shorts Şablonu

Soruları ve sonuçları bir JSON dosyasına yaz, şablon 1080×1920 (9:16) sesli bir YouTube Shorts videosu çıkarsın.

**Açılış:** Video doğrudan 1. soruyla açılır. Kaydıran kişi ilk karede soruyu görür, üstte test adı yazar.
Eski başlık kartlı açılışı istersen JSON'a `"acilis": "baslik"` ekle.

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
  "ustYazi": "KİŞİLİK TESTİ",
  "baslik": "Hangi Emojisin?",
  "kanca": "Çoğu kişi 🤭 çıkıyor...",
  "tema": { "renk1": "#FFB703", "renk2": "#FB5607" },
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

**Süre:** 5 soru ve 4 sonuçla video yaklaşık **64 saniye** sürer (her soruda 5 saniyelik geri sayım). Shorts 3 dakikaya kadar olabildiği için sorun yok; daha kısa istersen `"sureler": { "sayim": 4, "soru": 6.5 }` gibi ayarla.
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

## Seslendirme 🎙️
1. JSON'a `"seslendirme": true` ekle.
2. `npm run metin -- hangi-kahvesin` çalıştır. Okunacak cümleler `seslendirme/hangi-kahvesin.txt` dosyasına yazılır: giriş, kural, her soru, "puanlarını topla", her sonuç ve kapanış.
3. Her cümleyi kaydet ve dosyada yazan adla `public/ses/hangi-kahvesin/` klasörüne koy (`giris.mp3`, `soru-1.mp3`, `sonuc-1.mp3` …). `.mp3`, `.wav` ve `.m4a` olabilir.
4. `npm run render -- hangi-kahvesin` çalıştır. Kayıtlar videoya eklenir. Kayıt sahneden uzunsa sahne kendiliğinden uzar, yazılar sesle senkron kalır.

**Otomatik yapay zeka sesi (ücretsiz):** Bilgisayarında `pip install edge-tts` yaptıktan sonra
`npm run seslendir -- hangi-kahvesin` komutu tüm kayıtları Türkçe kadın sesiyle (tr-TR-EmelNeural) üretir.
Erkek ses için sonuna `-- --ses=tr-TR-AhmetNeural` ekle.

Bir cümleyi değiştirmek istersen JSON'a `"ses": { "giris": "Kendi cümlen..." }` yaz.
Kaydı olmayan sahneler sessiz kalır, video yine çıkar.

## Yayınlarken (yorum = büyüme)
`npm run yayin` çalıştır. Her test için `yayin/<test>.txt` dosyasına başlık, açıklama, etiketler ve **sabitlenecek ilk yorum** yazılır.
- İlk yorumu videoyu yükler yüklemez **sen at ve sabitle**. Sonuçlardan birini "en abartılı" ya da "en nadir" diye ilan et ki tartışma başlasın.
- Kapanış cümlesi (`"kapanis"`) bir sonuca meydan okusun: "🤪 Çılgın çıkanlar, kendinizi gösterin!"
- Uydurma istatistik kullanma ("%7'si … çıkıyor" gibi). Onun yerine: "Herkes X çıkıyor… bir tek sen çıkmayabilirsin."
- Formatı sabit tut: aynı renk (kanal paleti), 5 soru, 4 sonuç, aynı süre.
