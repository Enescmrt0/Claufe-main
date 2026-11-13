# The Nvidia spy story

Portrait Short, 1080×1920, 30 fps, 52 s. Built with the `/zach-d-films` skill (three.js 3D cartoon engine).
A news story told as a short narrative: the reported espionage plot around Nvidia's CEO and his resignation.

- `script.json`: 11 sentences, 118 words
- `src/shots.js`: 16 shots cut on caption beats
- `src/props2.js`: props made for this short (chip, tower, barrier, newspaper, crates, podium, safe, chair…)
- `src/human.js`: engine file with added options (hair, glasses, clean-shaven, long hair, clothing, shoes)
- `audio.py`: synthesized music bed and sound effects (no samples)
- Voice: Kokoro `am_michael` at speed 1.08; word timings from Parakeet

## Rebuild

```bash
cd reels/nvidia && ln -s ../../animation-skills/kit/node_modules node_modules   # once
export CHROME=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome GL=swiftshader
node render.mjs video silent.mp4 30        # about 2 s a frame in software; split with [from] [to] to run in parallel
../../animation-skills/kit/.venv/bin/python audio.py
```

## Sources (searched 2026-11-13)

| Claim in the script | Source |
|---|---|
| NYT reported on 29 Oct 2026 that the CEO had been targeted in a Chinese espionage plot | CNBC 29 Oct, Wikipedia summary |
| US intelligence assessed that a Megaspeed executive had been recruited by China's Ministry of State Security | NBC News, CNBC |
| Megaspeed bought Nvidia chips | CNBC, Axios |
| China called the allegations "groundless speculation" | CNN 10 Nov |
| No charges; her exact role "remains unclear" | NBC News |
| Huang admitted infidelity (apology to employees, 8 Nov) | CNBC, Wikipedia summary |
| Board opened an independent investigation on 8 Nov | Washington Post, NBC News |
| Resigned 12 Nov, effective immediately; Colette Kress interim CEO | Nvidia 8-K (SEC), Axios, CNBC |
| Board: "no reason to believe that either national security or NVIDIA secrets were compromised" | board statement quoted in the search results |
| "Thirty-three years": Nvidia was founded in 1993 | VideoCardz headline; general knowledge |

## Cautions before publishing

- This is a developing story about real people, and the central allegation is unproven. The script says
  "reported", "believed", "reportedly" and states that no one has been charged. Keep those words if you edit it.
- The facts come from search-result summaries on 13 Nov 2026, not from reading each article in full. Re-check
  the latest reporting on the day you publish; details may have changed.
- The woman is not named in the video and her character is a generic figure. The hat-wearing silhouette stands for
  the alleged handler, not for a real person.
- The newspaper prop is a generic "THE NEWS" front page, not a copy of a real masthead.
- The company's 8-K gave no reason for the resignation. The script does not claim one; it only gives the order of events.
