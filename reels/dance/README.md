# The Town That Couldn't Stop Dancing (Strasbourg, 1518)

Portrait Short, 1080×1920, 30 fps, about 62 s. Script 11 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill.

- `script.json`: 14 sentences, 180 words
- `web/shots.js`: 16 shots keyed to sentences and words (`S()`, `wt()`); `dancer()` builds a crowd member from an index
- `web/env8.js`: props for this reel: half-timbered town with a cathedral spire, bonnet, floppy hat, hood, dance pose,
  music notes, lute, drum, wooden stage, banner, ban sign, mountains, shrine, scroll
- `web/env3.js` - `env7.js`: shared props copied from earlier reels
- `audio.py`: SFX (footsteps, crowd, buzzers, bells, stamp) and a plucked minor-key dance underscore
- Voice: Kokoro (engine default voice); word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/dance            # or pass a recording to replace the voice
```

## Facts

July 1518, Frau Troffea; 34 dancers within a week; chronicles say about 400 within a month ("ABOUT 400?" on screen);
physicians blamed "hot blood"; the city cleared two guild halls, built a stage and hired musicians; dancers were later
sent to the shrine of St Vitus at Saverne. The death toll is disputed, so neither the script nor the screen gives a
number. The ban on public music and dancing was written from memory and should be re-checked.
