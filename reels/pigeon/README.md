# The Bombs Steered by Pigeons (Project Pigeon)

Portrait Short, 1080×1920, 30 fps, about 60 s. Script 10 from `reels/scripts/hikaye-metinleri.md`, made with the
`/stick-figure` skill.

- `script.json`: 14 sentences, 181 words
- `web/shots.js`: 15 shots keyed to sentences and words (`S()`, `wt()`)
- `web/env7.js`: props for this reel: cartoon pigeon (peck, look back, blink, wing flap), glide bomb with pigeons in the
  nose window, guidance screen with a target ship, army officer cap, side hair, room-sized 1940s computer, rubber
  stamp, project folder, money bag, trophy, picture frame, bomber, bread crumbs
- `web/env3.js` - `env6.js`: shared props copied from earlier reels
- `audio.py`: SFX (coos, pecks, wing flaps, propeller, snickers, stamps, fanfare) and underscore
- Voice: Kokoro (engine default voice); word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/pigeon            # or pass a recording to replace the voice
```

## Facts

Project Pigeon (B. F. Skinner): three pigeons in the nose cone of the "Pelican" glide bomb pecked at a screen to
steer it; cancelled in October 1944; revived by the Navy as Project Orcon in 1948 and cancelled in 1953; Skinner was
awarded the Ig Nobel Peace Prize posthumously in 2024. The officials laughing at the demonstration comes from
Skinner's own account. The Ig Nobel trophy on screen is a generic cup, not the real prize object.
