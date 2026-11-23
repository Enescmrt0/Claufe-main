# Why Coffins Used to Have Bells (safety coffins, 1800s)

Portrait Short, 1080×1920, 30 fps, about 62 s. Script 3 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill. Final: `coffin-final.mp4`.

- `script.json`: 14 sentences; voice Kokoro `bm_george` at 1.05, word timings from Parakeet
- `web/shots.js`: 14 shots keyed to sentences and words (`S()`, `wt()`)
- `web/env16.js`: props: night graveyard, headstones, bell post, soil cross-section, six-sided coffin, lying figure,
  newspapers, patent sheets, ladder, German waiting mortuary with a bell board, boxing ring
- `audio.py`: SFX (bells, heartbeat, scratching, owl, paper, stamps, boxing bell and crowd); music `spooky`
  (harpsichord and celesta) from `../music_styles.py`

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/coffin
```

## Facts

More than 100 safety-coffin patents were filed in the US in the 1800s (air tubes, flags, bells; Franz Vester's 1868
design had a ladder). German cities such as Munich built waiting mortuaries (Leichenhäuser) where bodies were tied to
bells; no one is recorded as having revived there, and no one is documented as saved by a safety coffin. The script
says "thousands" rather than the often-quoted single-source "over a million". "Saved by the bell" comes from boxing.
