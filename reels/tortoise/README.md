# Why Sailors Kept Giant Tortoises Alive

Portrait Short, 1080×1920, 30 fps, 64 s. Script 1 from `reels/scripts/hikaye-metinleri.md`, made in the story-Shorts
style described in `reels/style/hikaye-shorts-stili.md`.

Built on the `/zach-d-films` three.js engine with a new cartoon layer:

- `src/toon.js`: cel-shaded cast with big white heads and drawn faces (11 expressions, sweat drop, auto-blink),
  pear bodies, black stick limbs, ink outlines (inverted hull), hats (captain, pirate, chef, bandana, ranger, sun hat,
  cap); `makeTortoise()` with neck stretch, look, chew, walk and blinks.
- `src/sets.js`: ocean, sailing ship, island, ship's hold with swinging lantern, galley props, calendar, counter,
  fridge, lunchbox, tour boat, signs.
- `src/shots.js`: 15 shots cut on sentence beats; one-word captions generated from the word timings.
- `audio.py`: synthesized shanty-style music (turns minor for the "price" section) and sound effects.
- Voice: Kokoro `am_michael` at speed 1.05 (placeholder; the plan is the user's own recording). Word timings from Parakeet.

## Rebuild

```bash
cd reels/tortoise && ln -s ../../animation-skills/kit/node_modules node_modules   # once
export CHROME=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome GL=swiftshader
node render.mjs video silent.mp4 30          # ~2-3 s a frame in software; split with [from] [to] to run in parallel
../../animation-skills/kit/.venv/bin/python audio.py
```

To use your own voice: put the recording at `audio/vo.wav`, run `kit/words.py audio/vo.wav script.json`,
regenerate the captions with `python3 captions_one.py audio/vo.words.json` and move the shot boundaries in `SHOTS` to the new sentence times.

## Facts

See the notes under script 1 in `reels/scripts/hikaye-metinleri.md`. The "up to a year" is the animals' physiological
limit; the script does not claim ships kept them that long.
