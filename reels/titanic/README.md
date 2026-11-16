# The Night the Titanic Sank

Landscape film, 1920×1080, 30 fps, about 5.5 minutes. Made with the `/stick-figure` engine in its landscape build
(copied from `reels/sleep`). Real history; 11 chapters, 66 sentences, 884 words.

- `script.json`, `SCRIPT.md`, `chapters.json` (chapter starts, titles, on-screen time tags)
- `web/shots.js`: 48 shots keyed to sentences (`mk(a, b, draw)`) and words (`wt()`), with an on-screen clock
- `web/env9.js`: props for this film: the liner in side view (lights, smoke, sinking, breaking in two), smaller
  steamers, icebergs (with the hidden part below the water), lifeboats, rockets, 16-compartment hull diagram,
  ice-cube tray, people and lifeboat icons, officer cap, white beard, top hat, headphones, violin, ship interiors,
  engine telegraph, helm, Morse key, radio waves, North Atlantic chart, clock tag, thermometer
- `audio.py`: SFX from the word timings (bells, scrape, Morse, rockets, creaks, the break) and a score built from
  `../music_styles.py`: tension pulse, Edwardian waltz, elegy
- Voice: Kokoro `bm_george` at speed 1.0; word timings from Parakeet

## Rebuild

```bash
export CHROME=/opt/pw-browsers/chromium
bash .claude/skills/stick-figure/engine/make.sh reels/titanic          # or pass a recording to replace the voice
```

## Facts (checked 2026-11-15 with web search; see sources in the session)

11:39-11:40 PM iceberg sighted and struck; Fleet's "Iceberg, right ahead"; no binoculars (locked, key left ashore);
calm, moonless night; 16 compartments, afloat with 4 flooded, 5+ opened; Andrews: about two hours; Carpathia 58 miles
away, arrived about 4 AM; Californian's operator went to bed about 11:30 PM; first lifeboat 12:45 AM with about 27-28
of 65 seats; band played; last boat about 2:05; sank 2:20 AM; about 700 saved, about 1,500 lost; lifeboats for all,
24-hour radio watch, International Ice Patrol; wreck found 1985.

Rounded or disputed figures are said with "about" / "roughly" / "by most accounts". The hull length is shown as
882 feet. Water temperature (−2 °C / 28 °F) is the commonly cited figure and was not re-checked in this session.
