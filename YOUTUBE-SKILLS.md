# YouTube video skill'leri

`awesome-claude-video-skills` listesinden YouTube için seçilen skill'ler. Seslendirme, görsel ve animasyon işlerini kapsar.

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
