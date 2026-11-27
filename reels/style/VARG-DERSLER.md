# vargHQ/skills'ten öğrendiklerimiz

Kaynak: https://github.com/vargHQ/skills (MIT lisanslı, 83 video yeteneği). Okunanlar:
- `stickman-video`
- `video-script` (social referansı dahil)
- `video-sound`
- `caption-styles`
- `transition-craft`

## 1. Metin (video-script)

- **Kanca 3 saniye içinde gelir** ve sesi kapalıyken de anlaşılır. Başlıkta ya da kapakta ne vaat edildiyse ilk kare onu gösterir.
- **Kancadan hemen sonra finali ima et** ("…ve sonunda X oluyor"). Cevabı sakla, konuyu saklama.
- **Cümleler arası bağ "AMA" ya da "BU YÜZDEN" olmalı.** İki cümle arasına "ve sonra" sığıyorsa hikâye sıkıcı demektir.
- **Yeniden kanca (rehook):** Shorts'ta yaklaşık 20-25. saniyede, en fazla iki kez. Uzun videoda ilki yaklaşık 2-3. dakikada.
- **Final, ödülden hemen sonra kesilir.** Toparlama ve yavaş kapanış yok. Hoyos finalden 1 saniye kesince izlenme oranı %83'ten %88'e çıkmış.
- **Hız:** Dakikada 150 kelime, yani saniyede 2,5. Bizim `am_michael` 1.12 sesi saniyede yaklaşık 2,75 kelime okuyor.
- **Uydurma yok:** Her sayı ve isim bir kaynaktan gelir. Seslendirmede sayılar yazıyla yazılır, altyazıda rakama çevrilir. Bunu `captions.json` ile zaten yapıyoruz.
- **Kaçınılacak yapay zekâ kalıpları:**
  - "Have you ever wondered" tarzı açılışlar.
  - Üç sıfat yan yana.
  - "It's not just X, it's Y" kalıbı.
  - Resmi tarif eden anlatıcı.
- **Seri yap, tek tek video değil:** Aynı karakter ve "Part 2" takipçiye dönüşür.

## 2. Stickman animasyonu (stickman-video)

**Tutan formatlar:**
- Hayatta kalma seçimi: "GÜN 1", kurallar ve sonunda "1: … / 2: …" seçimi.
- POV.
- Karşıtlık (sahte arkadaş / gerçek arkadaş).
- Tarih anlatımı (bizim yaptığımız).
- Çöp adam dövüşü.

**Animasyon kuralları:**
- **Ana görüntü 2,5 saniyeden fazla durmaz.** Sadece nefes alma, kamera hareketi ya da yazı girişi yeterli sayılmaz; figür bir şey yapmalı.
- **Hareket katmanları:**
  - Nefes alma (yaklaşık 3,1 sn).
  - Ağırlık aktarma (yaklaşık 5,7 sn).
  - Göz kırpma.
  - Titreme.
  - Hafif çizgi kaynaması (saniyede 12 kez).
- **Örtüşen hareket:** Önce kafa döner (0,05 sn önde), sonra yakın kol (0,05-0,07 sn arkadan), en son uzak kol (0,09-0,11 sn arkadan).
- **İki kol asla aynı anda ve simetrik hareket etmez.**
- **Şok bir sekanstır:**
  - Geri sıçrama, kollar havada, gözler büyür.
  - Dizler kırılarak iniş.
  - Çömelip titreme.
- **Bir aksiyonun ritmi:** 0,1-0,2 sn hazırlık, 0,1-0,15 sn hızlı hareket, 0,4-0,8 sn tepkiyi tutma.

## 3. Ses (video-sound)

- **Profesyoneller az efekt kullanır:**
  - Kesmelerin yaklaşık %85'inin kendi sesi yoktur.
  - Bir filmde yaklaşık 2 "whoosh" vardır.
  - Vurgu, kesmelerin yalnızca %4-25'ine konur.
- **Her efektin ekranda görünür bir sebebi olmalı.**
- **Müzik, konuşma bandında (300 Hz-4 kHz) sesin en az 10 dB altında kalır.**
- **Ortam sesi her şeyin altında olur;** sessizlik bilinçli bir seçimdir.
- **Hedef seviye:** -14 LUFS, true peak -1 dBTP. Bizim `make.sh` zaten -14 LUFS'a göre normalize ediyor.
- **Uzun duraklamalar kısaltılır:** 0,25 saniyeden uzunlar 0,2 saniyeye iner. Konuşma hiçbir zaman esnetilmez.

## 4. Altyazı (caption-styles)

- **Kaç kelime gösterileceği görünümden önce seçilir:**
  - İfade: 5-12 kelime.
  - Grup: 2-5 kelime.
  - Tek kelime: yalnızca kanca ve espri anları için ya da 20 saniyeden kısa videolarda.
- **Aktif kelime, sesten 1-2 kare önce renk değiştirir.**
- **9:16 güvenli alan:** üstten 288 px, alttan 672 px, soldan 120 px, sağdan 192 px.
- **Kontrast en az 4.5:1 olmalı.**

## 5. Geçişler (transition-craft)

- **Kesme, en yüksek örtüşme anına gizlenir;** okunabilir bir karede kesilmez.
- **Çekirdek süreler kısa tutulur:** darbe 0,10-0,25 sn, whip/zoom 0,15-0,30 sn.
- **Yeni çekim 1,2-1,5 kat büyükten başlar,** 0,5-1,2 sn içinde 1 kata oturur.
- **Sarsıntı sönümlü bir sinüs gibi davranır:** darbede 8-14 Hz.

## Uyguladıklarımız (bundan sonraki videolarda)

- **`reels/scripts/tighten_pauses.py`:** Seslendirmedeki 0,30 saniyeden uzun duraklamaları 0,22 saniyeye indiriyor.
  - Saragarhi'de 2,9 saniye, maratonda 7,1 saniye boşluk çıkıyor.
- **`reels/scripts/web-v2/`:**
  - `main.js`: Söylenen kelime sesten 2 kare önce sarı yanıyor.
  - `chars.js`: Her figüre kendiliğinden nefes alma (3,1 sn) ve göz kırpma ekleniyor.
- **`reels/scripts/mk_audio.sh`:** Ses yapımı tek komuta indi. Her cümleye konan whoosh kaldırıldı; artık yalnızca her üçüncü cümlede hafif bir whoosh var.
- **Metin yazarken uygulayacaklarımız:**
  - Kanca ve finali ima etmek ilk 3 saniyede.
  - 20-25. saniyede yeniden kanca.
  - Ödülden hemen sonra kesmek.
  - Cümleler arasında "ama / bu yüzden" bağı.
