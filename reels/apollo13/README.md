# Apollo 13: Four Days to Get Home

Landscape film, 1920×1080, 30 fps, about 5.3 minutes. Made with the `/stick-figure` engine in its landscape build
(copied from `reels/titanic`). Real history; 11 chapters, 62 sentences, 871 words. Final: `apollo13-final.mp4`.

- `script.json`, `SCRIPT.md`, `chapters.json` (chapter starts, titles, on-screen time tags)
- `web/shots.js`: 54 shots keyed to sentences (`mk(a, b, draw)`) and words (`wt()`), chapter tag + title per chapter
- `web/env15.js`: props for this film: starfield, Earth and Moon, the docked CSM + LM stack (panel blowing off, venting
  oxygen, lights off, engine burns), Saturn V, mission control (wall display, consoles, controllers with headsets),
  the cabin (panel lights, window, frost), oxygen tank cut-away, switch, square filter / round hole, the "mailbox"
  build (bag, cardboard, hose, sock, duct tape), CO₂ meter, phone booth, capsule with re-entry fire, parachutes,
  ocean, recovery ship and helicopter, free-return trajectory
- `web/env3.js` - `env9.js`: shared props copied from earlier reels
- `audio.py`: SFX from the word timings (the bang, alarms, radio squelch, launch rumble, ticking, sparks, gas hiss,
  clicks, tape, heartbeat during the blackout, splash, cheers) and a score from `../music_styles.py`: a new 1970s
  `cosmos` space-synth style (calm and tense), tension pulse, elegy for the cold days, march at splashdown
- Voice: Kokoro `am_michael` at speed 1.0; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/apollo13          # or pass a recording to replace the voice
```

## Facts

See the "Dayanak ve doğrulanacaklar" section of `SCRIPT.md`: the core facts were web-checked on 2026-11-16; the cold
cabin, water rationing, Haise's fever, the manual burn using Earth's terminator, Mattingly's simulator work, the longer
blackout, the movie origin of "Failure is not an option" and the clock tags are from memory and flagged there.
