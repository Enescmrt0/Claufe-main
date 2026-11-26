# "Sen" formatı: referans videoların analizi

Referanslar:
- *The Prisoner Locked Above His Own Bomb* (70 sn)
- *How 800 Men Beat an Army of 100,000* (77 sn)

İkisi de 720×1280 ve 30 fps. Her birinde yaklaşık 21-23 sahne değişikliği var. Sahnelerin içinde de sürekli kamera kesmeleri yapılıyor; görüntü ortalama 1,2-1,5 saniyede bir değişiyor.

## 1. Metin formülü

| Bölüm | Bomba videosu | 800 asker videosu |
|---|---|---|
| **Kanca** (2. tekil şahıs, şimdiki zaman, imkânsız durum) | "You're a prisoner deep inside a British battleship, and only you know it's about to explode… and you're not going to tell them where." | "You have eight hundred men, and you're charging an army of a hundred thousand." |
| **Zaman ve yer damgası** | "Last night…" (geri dönüş) | "It's 215, in China's Three Kingdoms era." |
| **Arka plan**, tek bir somut nesne üzerinden | Küçük torpido, Alexandria limanı | Mühürlü mektup: "Open when the enemy comes." |
| **Engeller**: kısa cümleler, "But… / So…" dönüşleri | Destroyerler, derinlik bombaları, partner bayılıyor, torpido batıyor | 100.000'e karşı 7.000 asker, mektup "saldır" diyor |
| **Doruk**: kahramanın tek, cesur hamlesi | Kaptanı çağırıp "15 dakika" demek ama yeri söylememek | Şafak baskını, adını haykırarak sancağa koşmak |
| **Beklenmedik detay** | Gemiler sığ suya oturuyor, güverteler kuru kalıyor, bando çalmaya devam ediyor | Kuşatılan adamlarına geri dönüyor; düşman komutan kırık köprüden atla kaçıyor |
| **Zaman atlaması ve ironik final** | "Three years later…" Madalyayı batırdığı geminin kaptanı takıyor | "Seven years later…" Yaşlı ve hasta, ama düşman hâlâ "dikkat edin" diyor |

Kurallar:
- **Uzunluk ve tempo:** 185-200 kelime, 70-77 sn. Konuşma temposu yavaş (yaklaşık 2,6 kelime/sn) ve dramatik.
- **Anlatım dili:** Hep "you" ile anlatılıyor. Hiç tarih dersi tonu yok, izleyici kahramanın yerinde.
- **Sayılar ve isimler:** Sayılar somut (800 / 100.000 / 15 dakika / 3 yıl). Kahramanın adı neredeyse hiç geçmiyor ("you", "the captain", "the warlord").
- **Final:** Her zaman ironik bir dönüş ya da düşmandan gelen saygıyla bitiyor. Son cümle kısa ve vurucu.
- **Başlık kalıbı:** Paradoks ya da sayı zıtlığı. Örnekler: *The Prisoner Locked Above His Own Bomb*, *How 800 Men Beat an Army of 100,000*.

## 2. Görsel dil (bizim stickman'den farkı)

- **Karakterler:** Kafalar yumurta biçiminde ve beyaz. Bedenler giyinik ve dolgun: ceket, pantolon, kalın kollar, beyaz eldiven-eller. Çöp kol ve bacak yok.
  - Kalın mürekkep kontur ve yumuşak gölge kullanılıyor.
  - Yüzlerde sakal gölgesi, yara izi, kızarıklık ve ter damlası var.
  - Kahramanın imza ifadesi yarı kapalı, bıkkın bakış ("half" göz).
- **Kostümler:** Döneme sadık. Denizci kepi, subay şapkası, dalgıç kıyafeti, lamel zırh, tüylü miğfer, sancaklar ve bayraklar.
- **Arka planlar:** Detaylı ve "boyanmış" görünüşlü.
  - Gemi içi perçinli sac, saat, kapı, merdiven.
  - Liman silueti, sur ve kale, tarlalar.
  - Kuşbakışı ordu çemberi ve yüzlerce minik asker.
- **Işık ve renk:** Her perdeye kendi rengi veriliyor.
  - Gece maviye, su altı yeşile çalıyor.
  - Alarm anları kırmızı, şafak ve gün batımı turuncu-sepya.
  - Kenarlarda vinyet var.
- **Kamera:** Çok çeşitli çekim kullanılıyor.
  - Yakın plan yüz, omuz üstü, ekstrem yakın (madalya takan el), kuşbakışı, geniş kalabalık.
  - Her çekimde yavaş itme ve paralaks hareketi var.
- **Altyazı:** Ekranın %69 aşağısında, küçük punto (1080'de yaklaşık 50-60 px), BÜYÜK HARF, beyaz yazı ve ince siyah kontur. Kelimeler 1-4'lük gruplar halinde birikerek beliriyor.
  - Bizim büyük, küçük harfli tek kelimelik stilimizden farklı.
- **Ses:** Dramatik sinematik müzik (gerilimde dron, doruğa doğru vurmalı yükseliş, finalde sıcak tema) ve yoğun efekt kullanılıyor.

## 3. Bizim motorda nasıl yaparız

- `reels/style/proto/chars2.js` dosyasında yeni karakter modeli `person()` var:
  - Yumurta kafa, giyinik gövde, kalın kollar ve eldiven-eller.
  - Yüz ifadeleri: `half`, `wide`, `angry`, `closed`.
  - Sakal gölgesi, yara izi ve ter.
  - Şapkalar: `sailorCap`, `officerCap2`, `warHelm`.
  - Test karesi: `proto/proto.png`.
- **Sonraki adımlar:**
  - Altyazı stilini bu formata göre değiştirmek (büyük harf, küçük punto, kelime grupları).
  - Çekim çeşitliliği için yakın plan ve kuşbakışı yardımcıları eklemek.
  - Her perdeye renk filtresi ve vinyet eklemek.
- **Ses:** Kokoro'da daha yavaş ve derin bir ses (`am_onyx` / `bm_george`, hız 1.0) seçilecek. Müzik için `music_styles.py` dosyasına sinematik bir stil eklenecek.

## 4. Bu formata uygun konu adayları (gerçek olaylar)

1. **Vasili Arkhipov (1962):** "You're on a Soviet submarine, being bombed, and two officers want to fire a nuclear torpedo. You're the only one who can say no."
2. **Juan Pujol "Garbo" (1944):** "You're a spy running 27 agents for Hitler. None of them exist." Final: hem Demir Haç hem İngiliz MBE nişanı alıyor.
3. **Saragarhi (1897):** 21 Sih askeri 10.000 kişiye karşı.
4. **Rorke's Drift (1879):** 150 asker 4.000 kişiye karşı.
5. **Stanislav Petrov (1983):** "Your screen says five American missiles are coming. You have minutes to decide."
6. **Hiroo Onoda (1945-1974):** 29 yıl boyunca bitmiş bir savaşı sürdürüyor. Final: emri ancak eski komutanı gelip verince teslim oluyor.
7. **Desmond Doss (1945):** Silahsız bir sıhhiyeci, uçurumdan 75 kişiyi tek tek indiriyor.
8. **Tsutomu Yamaguchi (1945):** Hiroşima'dan kurtulup eve, Nagasaki'ye dönüyor.
