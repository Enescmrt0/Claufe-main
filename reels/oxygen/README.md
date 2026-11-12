# Oxygen: what if all the oxygen in the air vanished for five seconds?

Built with the `/stick-figure` skill (`animation-skills/skills/stick-figure`). 1080×1920, 30 fps, about 35 s.

- `script.json`: the voiceover (9 sentences, ~115 words); `captions.json`: caption swaps (65%, 2 km)
- `web/shots.js`: 11 shots timed to the voiceover's word times; `web/env2.js`: props drawn for this reel
  (outdoor world, O2 molecules, candle, stove, campfire, car, mountain, stopwatch, glass, rock)
- `audio.py`: SFX cues and the underscore, placed in voiceover seconds
- Voice: Kokoro `af_heart` at speed 1.1; word timings from Parakeet (`audio/words_ref.json`)

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium          # cloud sessions: use the preinstalled Chromium
bash animation-skills/skills/stick-figure/engine/make.sh reels/oxygen kokoro
```

## Facts behind the script

Part 1 is about oxygen GAS in the air only:
- Air is about 21% oxygen, so pressure would drop by about a fifth, roughly the pressure at 2 km altitude.
- Five seconds without oxygen is far less than a normal breath-hold.
- Combustion needs oxygen, so open flames go out and engines stop burning fuel; a candle does not relight itself.

Part 2 ("the scary version") is about every oxygen ATOM, including those bound in compounds:
- Water is about 89% oxygen by mass, the Earth's crust about 46%, the human body about 65%.

Simplifications: hot embers can reignite when oxygen returns (the script only claims this for a blown-out candle),
and a running engine may restart by itself once oxygen is back.
