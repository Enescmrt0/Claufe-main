# Panic attack (story of Maya)

Portrait Short, 1080×1920, 30 fps, about 42 s. Built with the `/stick-figure` skill. First video of the
mental-health series: one character, one moment, then what is happening inside the brain.

- `script.json`: 13 sentences, 134 words
- `web/shots.js`: 14 shots keyed to sentences, cues looked up from the word timings
- `web/env4.js`: props for this reel (supermarket, checkout, milk carton, siren, tiger, thought bubble);
  `web/env3.js`: shared props copied from `reels/sleep` (brain, heart, labels, meters)
- `audio.py`: SFX and underscore driven by the word timings
- Voice: Kokoro `af_heart` at speed 1.05; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash animation-skills/skills/stick-figure/engine/make.sh reels/panic kokoro
```

## Basis for the script (written from memory; verify against a health authority before publishing)

- A panic attack is a sudden surge of intense fear with physical symptoms: racing heart, fast breathing,
  tingling, a sense of unreality, fear of a heart attack.
- It is the fight-or-flight response firing without an external threat; adrenaline drives the symptoms.
- Fast breathing lowers carbon dioxide, which can cause tingling and light-headedness.
- Attacks typically peak within about ten minutes and then subside.
- Panic attacks are common and panic disorder is treatable.

The video does not diagnose or give treatment advice. It ends with "worth talking to a doctor" and an on-screen
"general info, not medical advice" note. Chest pain can have other causes; that caveat is NOT in the video and
should go in the description.
