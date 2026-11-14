# The Puzzle That Made Professors Look Silly (Monty Hall)

Portrait Short, 1080×1920, 30 fps, about 64 s. Script 13 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill.

- `script.json`: 14 sentences, 203 words
- `web/shots.js`: 17 shots keyed to sentences and words (`S()`, `wt()`)
- `web/env6.js`: props for this reel: game-show doors that swing open or turn see-through (car or goat behind),
  goat, car, stage with spotlights and bulbs, bow tie, hair bun, grey hair, glasses, graduation cap, envelopes,
  magazine, microphone, old computer screen, fraction labels
- `web/env3.js` - `env5.js`: shared props copied from earlier reels
- `audio.py`: SFX (bleats, doors, paper, buzzer, fanfare) and underscore driven by the word timings
- Voice: Kokoro (engine default voice); word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/monty            # or pass a recording to replace the voice
```

## Facts

Parade magazine, 1990; about 10,000 letters, nearly 1,000 from people with PhDs, most saying she was wrong; Paul Erdős
was convinced only by a computer simulation. The magazine on screen is generic (no real masthead). The rule the
puzzle depends on: the host always opens a goat door that the player did not pick.
