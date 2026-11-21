# The Birthday Bet (the birthday paradox)

Portrait Short, 1080×1920, 30 fps, about 59 s. Script 15 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill. Final: `birthday-final.mp4`.

- `script.json`: 14 sentences
- `web/shots.js`: 14 shots keyed to sentences and words (`S()`, `wt()`)
- `web/env14.js`: props for this reel: a class of 23 kids, birthday cakes and date tags, a 365-day calendar grid,
  the $5 bill, a spinning coin, the pair web (all 253 lines), odds bars
- `web/env12.js`: chalkboard (shared with `reels/hans`)
- `audio.py`: SFX (pops, ticks, cash register, class laughter, coin flip) and a score from `../music_styles.py`:
  a new whistled `ukulele` style and the tension pulse
- Voice: Kokoro; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/birthday
```

## Facts

With 23 people the chance of at least one shared birthday is about 50.7% (365 equally likely days, no leap years);
23 people make 23×22/2 = 253 pairs; 30 people about 70.6%; 50 people about 97%.
