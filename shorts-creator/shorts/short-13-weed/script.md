# Short 13: Why does weed get you high?

- Format: 1080×1920, 30 fps, 38.6 s, loop (last scene returns to the hook)
- Composition: `remotion/src/shots/short-13/Short13Weed.tsx` (`Short13Weed`)
- Voice: Kokoro TTS (`af_heart`, local, no API key), one wav per line in `voice/` (gitignored)
- Music: `lofi-warm` bed via `tools/mix_music.py`; SFX: `sfx-plan.json` via `tools/mix_sfx.py`

| t (s) | Scene | Narration |
|---|---|---|
| 0.3 | Hook | Why does weed get you high? |
| 2.8 | Meet THC | It comes down to one molecule: THC. |
| 6.3 | CB1 lock | Your brain already has locks for it: CB1 receptors. |
| 10.2 | CB1 lock | Normally, your own key fits them. Anandamide, the bliss molecule. |
| 14.9 | Copycat | THC is a copycat. It fits the same lock. |
| 18.9 | Dopamine | It releases the brake on your reward system, |
| 21.5 | Dopamine | and dopamine floods in. That's the high. |
| 24.9 | Regions | CB1 locks are everywhere, so everything shifts. |
| 29.9 | Why it lasts | Your own key is cleared in minutes. THC lingers for hours. |
| 34.6 | Loop | Not a hack. Your own system, turned way up. |

## Build

```bash
cd remotion && npm run gen
npx remotion render src/index.ts Short13Weed out/Short13Weed.mp4
# add voice (ffmpeg adelay per line) -> remotion/out/Short13Weed-voiced.mp4, then from repo root:
python3 tools/mix_sfx.py shorts/short-13-weed/sfx-plan.json
python3 tools/mix_music.py --bed lofi-warm --base shorts/short-13-weed/output/short-13-sfx.mp4 \
  --out shorts/short-13-weed/output/short-13-weed-final.mp4
```
