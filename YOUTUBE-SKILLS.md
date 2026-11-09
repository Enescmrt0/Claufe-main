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
