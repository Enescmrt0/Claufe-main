# YouTube video skill'leri

`awesome-claude-video-skills` listesinden YouTube için seçilen skill'ler. Seslendirme, görsel, animasyon ve Shorts işlerini kapsar.

## 1. Proje genelindeki skill'ler (`.claude/skills/`)

Bu repoda Claude Code açıldığında otomatik yüklenirler.

| Skill | Kaynak | Ne işe yarar |
|---|---|---|
| `remotion-*` (13 skill) | [remotion-dev/skills](https://github.com/remotion-dev/skills) @ `1af7e69` | **Animasyon:** Remotion ile kodla video, altyazı (`remotion-captions`), ses/video katmanları (`remotion-multimedia`), harita animasyonu, render ve studio |
| `youtube-intro-outro` | [iart-ai/youtube-video-skills](https://github.com/iart-ai/youtube-video-skills) @ `f3df381` (MIT) | **Görsel:** 3-5 sn marka intro'su ve YouTube end-screen alanlarına uyan 20 sn outro |
| `audiogram` | aynı depo | **Ses:** podcast/seslendirmeden dalga formlu, altyazılı video |

Remotion'ı ticari kullanmadan önce lisansına bakın (`remotion-license` skill'i veya https://www.remotion.dev/docs/license).

## 2. Uçtan uca YouTube editörü (`youtube-editor/`)

[hassancs91/claude-youtube-editor](https://github.com/hassancs91/claude-youtube-editor) @ `d490d71` (MIT). Ham kayıttan yayına kadar tüm pipeline'ı kapsar:

| Adım | Skill | |
|---|---|---|
| Kurgu | `/clean-cut` | AssemblyAI transkripti ile kesim |
| Görseller | `/make-tsx`, `/fake-screencast` | Söylenen kelimeye senkron Remotion sahneleri |
| Ses | `/clean-audio` | Gürültü temizleme ve ses izolasyonu |
| Efektler | `/suggest-sfx` | Kelimeye oturan ses efektleri (`media/library/sfx`) |
| Paketleme | `/packaging`, `/thumbnail` | Başlık ve 3 thumbnail A/B adayı |
| Marka | `/brand-setup` | Renk, font ve stili kendi kanalına uyarlar |
| Yükleme | `tools/yt_upload.py` | Özel taslak olarak YouTube'a yükler |

Bu skill'ler `tools/` ve `remotion/` klasörlerine göreli yollarla eriştiği için Claude Code'u **`youtube-editor/` klasöründe** açın:

```bash
cd youtube-editor
python3 -m venv venv && ./venv/bin/pip install -r requirements.txt
cd remotion && npm install && npm run gen && cd ..
cp .env.example .env   # API anahtarlarını girin
claude
```

Gerekenler: Python 3.10+, Node 18+, `ffmpeg` ve `ffprobe`.

Gereken API anahtarları:
- **AssemblyAI:** kurgu için.
- **ElevenLabs:** ses temizleme ve efektler için. Yerel RNNoise yöntemi anahtar istemez.
- **Gemini:** yalnızca thumbnail üretimi için.
- **fal.ai:** isteğe bağlı, üretilen video klipler için.
- **YouTube yükleme:** OAuth ile çalışır, ayrıntılar `tools/yt_upload_SETUP.md` dosyasında.

## 3. Yüzsüz YouTube Shorts üreticisi (`shorts-creator/`)

[hassancs91/claude-faceless-shorts-creator](https://github.com/hassancs91/claude-faceless-shorts-creator) @ `773054b` (MIT). Kamera kaydı gerektirmeyen dikey Shorts üretir. Üç üretim hattı vardır:

| Ne istersin | Skill | Görüntü |
|---|---|---|
| "×11 hilesi hakkında bir short yap" | `/make-short` | Tamamen kodla üretilen Remotion animasyonu, stok görüntü yok |
| "blue-man ile AI video short yap" | `/make-ai-short` | fal video modeliyle sabit, tekrar eden bir karakter |
| "kahve hakkında vox tarzı short yap" | `/make-vox` | Vox belgeseli tarzı kâğıt kolaj ve kamera hareketi |

Üç hattın ortak özellikleri:
- ElevenLabs seslendirmesi ve kelimesi kelimesine senkron altyazı,
- `/suggest-sfx` ile ses efekti ve müzik kütüphanesi,
- başa dönen kesintisiz döngüler.

`shorts/` klasöründe 12 hazır örnek prodüksiyon var.

Claude Code'u **`shorts-creator/` klasöründe** açın. Kurulum adımları `shorts-creator/README.md` dosyasında; gereken anahtarlar:
- **ElevenLabs:** seslendirme için.
- **fal.ai:** AI video ve görsel üretimi için.
- **Gemini:** isteğe bağlı.

## Claude Code bulut ortamında render

Bulut ortamında ağ kısıtlı olduğu için Remotion kendi Chrome'unu indiremiyor (`remotion.media`). Bunun yerine ortamda kurulu Chromium kullanılmalı:

```bash
npx remotion render src/index.ts <KompozisyonId> out.mp4 \
  --browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome \
  --chrome-mode=chrome-for-testing
```

`chromium_headless_shell` yerine tam `chrome` sürümü kullanılmalı. Headless shell, ortam proxy'sinin sertifikasına güvenmediği için Google Fonts'u yükleyemiyor.

## Test sonuçları (2026-11-09)

| Test | Sonuç |
|---|---|
| `youtube-editor`: pip + npm kurulumu, `npm run gen` | ✅ |
| `youtube-editor`: `RuleCard` render (1920×1080, 30 fps, 5,5 sn) | ✅ |
| `youtube-editor`: yerel RNNoise ses temizleme (anahtarsız) | ✅ |
| `youtube-editor`: `tsc --noEmit` | ⚠️ Örnek sahnelerde 8 tür hatası var (lucide ikon tipleri). Render'ı etkilemiyor. |
| `shorts-creator`: npm kurulumu, 14 kompozisyon listelendi, tür hatası yok | ✅ |
| `shorts-creator`: `Short2Math` render (1080×1920, 42 sn) | ✅ Görüntü ve altyazı doğru, ses yok (aşağıya bakın). |
| `shorts-creator`: `mix_sfx.py` ile 17 ses efekti miksi | ✅ |
| Proje kökündeki 15 skill'in Claude Code'a yüklenmesi | ✅ |

Örnek Shorts'ların seslendirme dosyaları repoya konmuyor (`shorts/*/voice/` gitignore'da); bunlar ElevenLabs ile üretiliyor. Bu yüzden anahtar olmadan render edilen örnekler sessiz çıkıyor. Ses efektleri ise kütüphaneden geldiği için anahtarsız çalışıyor.

API anahtarı gerektiren adımlar test edilmedi: transkripsiyon, ElevenLabs ses ve efekt üretimi, Gemini thumbnail üretimi, fal.ai video üretimi ve YouTube'a yükleme.

## 4. Animasyon skill'leri (`animation-skills/`)

[artemnovitckii/claude-animation-skills](https://github.com/artemnovitckii/claude-animation-skills) @ `5dbea55` (MIT). Altı skill `.claude/skills/` altına sembolik bağlantıyla eklendi, bu yüzden repo kökünden çağrılabilir:

| Skill | Ne yapar | Süre |
|---|---|---|
| `/stick-figure` | Renkli çizgi film dünyasında çöp adam açıklama videosu (30-45 sn), kelime kelime altyazı, kodla üretilen müzik ve efektler | uzun oturum |
| `/zach-d-films` | three.js ile 3D çizgi film "what if" videosu, ağır çekim çarpmalar | uzun oturum |
| `/graph` | Çizilen bir çizgi grafik ve onunla birlikte sayan büyük bir rakam | ~10 sn |
| `/map-route` | 3D şehir haritasında A'dan B'ye rota | ~1,5 dk |
| `/breakdown` | Telefonun katman katman açıldığı 3D patlatılmış görünüm | ~1,5 dk |
| `/minimalistic-graphics` | Siyah-beyaz çizgi sanatı, merdiven çıkan bir nokta | ~10 sn |

### Kurulum (bir kez, her yeni bulut oturumunda tekrar)

```bash
cd animation-skills/kit
npm install --no-audit --no-fund
# GSAP: cdnjs bu ortamda engelli, npm'den alınır
mkdir -p vendor && (cd /tmp && npm pack gsap@3.12.5 && tar xzf gsap-3.12.5.tgz package/dist/gsap.min.js) && cp /tmp/package/dist/gsap.min.js vendor/
# Ses ve kelime zamanlaması (yaklaşık 1 GB)
bash setup.sh --voice   # ya da modelleri elle kit/models/ altına koy
```

`node_modules`, `vendor`, `.venv` ve `models` klasörleri deponun kendi `.gitignore` dosyası tarafından dışarıda tutulur.

### Bu bulut ortamında render

- Tarayıcı olarak kurulu Chromium kullanılmalı: `export CHROME=/opt/pw-browsers/chromium`.
  - `stick-figure` motoru bu değişkeni zaten destekliyor.
  - `zach-d-films/engine/render.mjs` dosyasına aynı desteği ekledim; bu, orijinal depodan tek farkımız.
- 3D motor GPU olmadığı için `GL=swiftshader` ile çalıştırılmalı.
- 3D motorda her proje klasörüne `ln -s <kit>/node_modules <proje>/node_modules` bağlantısı gerekir (skill dosyası bunu anlatıyor).
