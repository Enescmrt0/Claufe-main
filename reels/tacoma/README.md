# The Bridge That Danced Itself Apart (Tacoma Narrows, 1940)

Portrait Short, 1080×1920, 30 fps, about 66 s. Script 6 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill. Final: `tacoma-final.mp4`. Tubby the dog, the only life lost, is remembered with a
portrait and a paw print, never shown in the fall.

- `script.json`: 13 sentences
- `web/shots.js`: 14 shots keyed to sentences and words (`S()`, `wt()`)
- `web/env13.js`: props for this reel: Puget Sound sky, water and cliffs, a side-view suspension bridge whose deck
  waves, twists and breaks, 1940s cars, wind lines, Tubby, paw print, wing/deck cross-section, wind tunnel
- `audio.py`: SFX (horns, boings, wind, steel creaks, the crack and splash) and a score from `../music_styles.py`:
  a new 1940s banjo-and-fiddle `hoedown`, tension pulse, elegy
- Voice: Kokoro; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/tacoma
```

## Facts

Opened 1 July 1940, collapsed 7 November 1940 in winds of about 40 mph. Nicknamed "Galloping Gertie" for its vertical
waves. On the last morning the motion turned into a twisting (torsional) oscillation; newspaper editor Leonard
Coatsworth abandoned his car and crawled to safety; his cocker spaniel Tubby was the only death. The solid plate
girders caught the wind (aeroelastic flutter); afterwards wind-tunnel testing of bridge decks became standard.
