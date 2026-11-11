# Short 24: What if you became a cat?

- Format: 1080×1920, 30 fps, 27 s (ends on the closing scene; no return to the hook)
- Composition: `remotion/src/shots/short-24/Short24Cat.tsx` (`Short24Cat`)
- Characters: `lib/cat.tsx` (sitting `Cat` with ear, pupil, eye-glow, tail and squash controls; sleeping `CatLoaf`)
  and the stick figure from `lib/stick.tsx` for the transformation
- Voice: Kokoro TTS (`af_heart`, speed 1.05, local, no API key), one wav per line in `voice/` (gitignored)
- Music: `lofi-warm` bed via `tools/mix_music.py`; SFX: `sfx-plan.json` (24 cues) via `tools/mix_sfx.py`;
  final audio passed through a limiter (peak −1 dB)

| t (s) | Scene | Narration |
|---|---|---|
| 0.3 | Hook | What if you woke up as a cat? |
| 2.11 | Hearing | First, your hearing explodes. Cats hear sounds three times higher than humans can. |
| 7.2 | Night vision | At night, you'd need only a sixth of the light to see. |
| 10.18 | Smell | Your nose gets about forty times more scent receptors. |
| 13.48 | Jump | You could jump five times your own height, and land on your feet. |
| 17.04 | Sweet | But dessert is ruined. Cats can't taste sweetness at all. |
| 20.72 | Sleep | And you'd sleep around fourteen hours a day. |
| 23.21 | Close | Honestly? Not a bad deal. |

Figures used (commonly cited estimates, flagged on screen as "NUMBERS ARE COMMON ESTIMATES"):
- Hearing: up to ~64 kHz for cats vs ~20 kHz for humans.
- Night vision: cats need roughly one sixth of the light humans need.
- Smell: ~200 million scent receptors vs ~5 million in humans.
- Jump: about five times their own height.
- Sweet: cats lack a working sweet-taste receptor gene (Tas1r2).
- Sleep: typically 12–16 hours a day.
