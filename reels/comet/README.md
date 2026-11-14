# Why Plane Windows Are Round

Portrait Short, 1080×1920, 30 fps, about 64 s. Script 5 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill.

- `script.json`: 13 sentences, 185 words
- `web/shots.js`: 21 shots keyed to sentences and words (`S()`, `wt()`), same structure as `reels/panic`
- `web/env5.js`: props for this reel: side-view jet airliner (square or round windows, passenger faces, landing gear),
  break-apart, smoke trail, hard hat, magnifier, water tank and frame, pressure gauge, crane, fuselage skin panel with
  an opening and a growing crack, stress flow lines, cabin cross-section that swells, paper clip, runway, control tower,
  plane seat
- `web/env3.js`, `web/env4.js`: shared props copied from earlier reels
- `audio.py`: SFX and underscore driven by the word timings
- Voice: Kokoro (engine default voice); word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/comet            # or pass a recording: ... reels/comet my_take.m4a
```

A new recording with the same words is warped onto the existing shot timings automatically.

## Facts

See the notes under script 5 in `reels/scripts/hikaye-metinleri.md`. The video deliberately avoids the popular myth
that the passenger windows were square and caused the crashes: the fatal crack started at the corner of a small
square opening in the roof (the ADF aerial window).
