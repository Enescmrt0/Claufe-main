# Apollo 13: Saved by a Sock and Duct Tape

Portrait Short, 1080×1920, 30 fps, 53 s. Made with the `/zach-d-films` three.js engine plus the cartoon layer from
`reels/tortoise` (`src/toon.js`, `src/sets.js`). The long 5-minute script stays in `reels/apollo13/` for later.

- `script.json`: 11 sentences, 149 words
- `src/space.js`: star field, space stage (`toSpace`), Earth, Moon, command/service module with a detachable panel,
  lunar module, docked stack, venting gas, cabin with switch panels, mission-control consoles and wall screen, square
  CO₂ filter, round socket, duct tape, sock, hose, plastic bag, cardboard, CO₂ meter, capsule with parachutes,
  radio waves
- `src/toon.js`: adds an astronaut comms cap (`hat: 'snoopy'`)
- `src/shots.js`: 11 shots cut on sentence beats; one-word captions from `captions_one.py`
- `audio.py`: synthesized score (space pad, tension pulse, riser, major resolve) and effects
- Voice: Kokoro `am_michael` at speed 1.08; word timings from Parakeet

## Rebuild

```bash
cd reels/apollo-short && ln -s ../../animation-skills/kit/node_modules node_modules   # once
export CHROME=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome GL=swiftshader
node render.mjs video silent.mp4 30
../../animation-skills/kit/.venv/bin/python audio.py
```

## Facts (web-checked 2026-11-16)

Oxygen tank 2 exploded about 200,000 miles from Earth; the lunar module was built for two men for two days and kept
three alive for about four; command-module CO₂ canisters were square, the LM's round; the ground-built adapter used
plastic bags, cardboard (cue cards), suit hoses, a sock and duct tape; splashdown in the Pacific on 17 April 1970.
