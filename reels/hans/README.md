# The Horse That Could Do Math (Clever Hans, Berlin, 1904)

Portrait Short, 1080×1920, 30 fps, about 69 s. Script 14 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill. Final: `hans-final.mp4`.

- `script.json`: 15 sentences
- `web/shots.js`: 15 shots keyed to sentences and words (`S()`, `wt()`), hoof taps timed with `taps()`
- `web/env12.js`: props for this reel: cartoon horse (tapping hoof, nodding head, blinders), chalkboard, moustache,
  bowler hat, notebook, wooden screen, letter tiles, score bars, Berlin street
- `audio.py`: SFX (hoof clops, neighs, chimes, crowd, stamps, buzzer) and a score from `../music_styles.py`:
  waltz, minor waltz, tension pulse
- Voice: Kokoro; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/hans
```

## Facts

Wilhelm von Osten, a Berlin maths teacher, showed Hans for free; the 1904 Hans Commission (13 members) found no trick;
psychologist Oskar Pfungst showed in 1907 that Hans read tiny, unconscious cues from the questioner (tension, a lean,
a lift of the head) and failed when no one in sight knew the answer (89% vs about 6% in his tests; the script rounds
to "almost never"). The "Clever Hans effect" is still taught in psychology and animal-cognition research.
