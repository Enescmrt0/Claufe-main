# Kaynak ve durum

- Kaynak: https://github.com/mromidev/claude-animated-shorts (commit `e3b817b`, MIT)
- Eklenme: 2026-11-13
- Skill adı: `cartoon-3d-short` (`.claude/skills/cartoon-3d-short` bu klasöre sembolik bağdır)

## Bu kopyada ne var

| Yol | İçerik |
|---|---|
| `SKILL.md`, `README.md`, `LICENSE` | Kaynaktaki haliyle |
| `templates/` | Kaynaktaki haliyle: köprü videosunun kaynağı, ses sentezi, QA betikleri |
| `references/STYLE_BIBLE.md`, `references/reports/` | Kaynaktaki haliyle |
| `project/` | **Bu repoda eklendi.** Hazır Remotion projesi: `package.json`, `src/index.tsx`, `src/videos/bridge/` (şablonun kopyası), `scripts/stills.mjs` (bulut oturumuna uyarlanmış) |

## Bilerek alınmayanlar

- `references/frames/` (38 kare) ve `references/sheets/` (20 sayfa, 16 MB). Bunlar başka bir YouTube kanalının
  videolarından alınmış karelerdir; kaynak repo "yalnızca stil incelemesi için" diyor. Telif riski nedeniyle bu
  repoya kopyalanmadı. Yan yana karşılaştırma gerekirse kaynak repodan alınabilir.
- Kenney CC0 modelleri (`public/bridge/kenney/*.glb`: ağaç, çalı, fener, araba vb. 26 dosya). Kaynak repoda da yok.
  Kod, eksik modeli atlayacak biçimde yazılmış (`world.ts`, `.catch(() => null)`), ama sahneler bunlar olmadan
  çıplak kalır. Modeller kenney.nl adresindeki Nature Kit ve benzeri paketlerden gelir.
- Köprü videosunun sesi (`voice.wav`, `words.json`). Kaynak repoda yok.

## Test durumu

- `npm install`: çalıştı (219 paket).
- `npx tsc --noEmit`: 6 tip hatası veriyor, hepsi `Bridge.tsx` 66-72. satırlarda (`EffectComposer` çocuklarında
  `Element | null`). Paket sürümü farkından kaynaklanan tip uyarısı; çalışmayı engellemesi beklenmez ama doğrulanmadı.
- **Render: denenmedi.** Oturumun güvenlik denetimi dış kaynaklı kodun çalıştırılmasını kullanıcı onayı olmadan
  engelledi. Bulutta WebGL'in yazılımla (swangle) çalışıp çalışmadığı ve hızın yeterli olup olmadığı bilinmiyor.

## Çalıştırma

```bash
cd cartoon-3d-short/project
npm install
node scripts/stills.mjs out/x_ 40,400,900,1300 0.5
```

## Skill'in kendi kuralları

`SKILL.md` içindeki "User rules" bölümü kaynak yazarın tercihleridir (altyazı yok, 2K çıktı, "Opus max verifies"
gibi). Bu projenin kuralları değildir; gerektiğinde değiştirilebilir.
