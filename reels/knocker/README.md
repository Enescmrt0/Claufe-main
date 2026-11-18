# The Job of Waking Up a Whole Town (knocker-uppers)

Portrait Short, 1080×1920, 30 fps, about 63 s. Script 9 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill.

- `script.json`: 14 sentences, 183 words
- `web/shots.js`: 14 shots keyed to sentences and words (`S()`, `wt()`)
- `web/env10.js`: props for this reel: night-to-dawn sky, brick terrace with lit windows, cobbles, gas lamp, the
  knocker-up (shawl, bonnet, bamboo pole), flat cap, nightcap, pea shooter, peas, mill with chimneys and clock,
  factory gate, old alarm clock (with a sprung spring), price tag, penny, sleeper in a window
- `web/env3.js` - `env8.js`: shared props copied from earlier reels
- `audio.py`: SFX (pea puffs and pings, knocks, snores, an owl, pennies) and a Victorian music-hall piano score
  (`musichall()` in `../music_styles.py`)
- Voice: Kokoro `bm_george` at speed 1.05; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/knocker          # or pass a recording to replace the voice
```

## Facts

Knocker-uppers in British (and Irish) industrial towns used long sticks or pea shooters, were paid a few pence a
week, and in some areas worked until the early 1970s; many were night owls who slept by day (Wikipedia,
"Knocker-up", checked 2026-11-14).
