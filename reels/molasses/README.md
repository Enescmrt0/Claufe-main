# The Sweetest Disaster in History (Boston molasses flood, 1919)

Portrait Short, 1080×1920, 30 fps, about 69 s. Script 12 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill. Real deaths are part of the story: the casualty beat is a memorial plaque with candles, and
the stuck figure is shown waist-deep with rescuers, never as a victim.

- `script.json`: 14 sentences, 190 words
- `web/shots.js`: 15 shots keyed to sentences and words (`S()`, `wt()`)
- `web/env11.js`: props for this reel: winter sky, harbour ground, the riveted tank (leaks, brown paint, popping
  rivets, splitting open), the molasses wave, elevated railway that bends, brick blocks, pail, paint roller,
  thermometer, nurse and sailor caps, building-rules clipboard, sweet-smell lines
- `web/env3.js` - `env10.js`: shared props copied from earlier reels
- `audio.py`: SFX (drips, gloops, rivets, the burst, rumble, creaks) and a score from `../music_styles.py`:
  1910s ragtime, tension pulse, elegy
- Voice: Kokoro `am_michael` at speed 1.05; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/molasses         # or pass a recording to replace the voice
```

## Facts (web-checked 2026-11-14 and 2026-11-20)

15 January 1919, North End; tank about 50 ft tall holding about 2.3 million gallons; wave reported 15-40 ft (script:
"by some accounts twenty-five"), about 35 mph; 21 dead, about 150 injured; molasses thickened as it cooled; leaks were
known, residents filled pails, and the tank was painted brown to hide them; witnesses compared the rivets to machine-gun
fire; stricter building codes followed. The lasting smell is local lore, so the script says "locals said".
