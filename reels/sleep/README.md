# What if you never needed sleep? (5-minute film)

Landscape 1920×1080, 30 fps, about 4 min 57 s. Built on a copy of the `/stick-figure` engine
(`animation-skills/skills/stick-figure`) adapted from portrait to landscape.

## Files

- `script.json`: the voiceover, 80 sentences in 14 chapters (`chapters.json` holds the first line of each chapter);
  `SCRIPT.md`: the script by chapter with the basis for each claim
- `web/shots.js`: 61 shots. Each shot covers a range of SENTENCES (`mk(a, b, draw)`), and every animation cue is
  looked up from the word timings (`wt(line, 'word')`), so nothing is timed by hand
- `web/env3.js`: props drawn for this film (day, night, room and city backdrops, bed, brain, clocks, animals, …)
- `audio.py`: SFX cues and a per-chapter underscore, also driven by the word timings
- `audio/words_ref.json`: word timings of the reference take (Kokoro `af_heart`, speed 1.0, Parakeet alignment)

## Changes to the engine copy in `web/` (the upstream skill is untouched)

- `lib.js`: canvas is 1920×1080 instead of 1080×1920
- `env.js`: `applyCam` centres on the canvas middle instead of the portrait constants
- `main.js`: captions sit at y = 968, up to 3 words per chunk; vignette and whip distance scaled for landscape

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium     # cloud sessions: use the preinstalled Chromium
bash animation-skills/skills/stick-figure/engine/make.sh reels/sleep
```

The voiceover (`audio/vo.wav`) is not committed. To regenerate it: run `tts_kokoro.py af_heart 1.0` in this
folder, then join `audio/line_NN.wav` with 0.16 s between sentences and 0.95 s before each chapter start
(see `chapters.json`), and run `tools/align.py audio/vo.wav`.
