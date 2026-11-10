# Short 21: World War II, explained in under a minute

- Format: 1080×1920, 30 fps, 48.6 s, loop (last scene returns to the opening map)
- Composition: `remotion/src/shots/short-21/Short21WorldWar2.tsx` (`Short21WorldWar2`),
  built on `lib/map.tsx` (real Natural Earth outlines, Mercator) and `lib/explainer.tsx`
- Voice: Kokoro TTS (`af_heart`, speed 1.08, local, no API key), one wav per line in `voice/` (gitignored)
- Music: `cinematic-min` bed via `tools/mix_music.py`; SFX: `sfx-plan.json` (31 cues) via `tools/mix_sfx.py`;
  final audio passed through a limiter (peak −1 dB)

| t (s) | Scene | Narration |
|---|---|---|
| 0.3 | Title | World War Two, explained in under a minute. |
| 2.99 | 1939 | Nineteen thirty-nine. Germany invades Poland. Britain and France declare war. |
| 8.2 | 1940 | Nineteen forty. Most of Western Europe falls. Britain holds out. |
| 12.32 | 1941 | Nineteen forty-one. Germany invades the Soviet Union. |
| 16.03 | Dec 1941 | In December, Japan attacks Pearl Harbor. Now it's a true world war. |
| 20.19 | 1942–43 | Nineteen forty-two to forty-three. The tide turns: at Midway, El Alamein, and Stalingrad. |
| 26.04 | 1944 | Nineteen forty-four. D-Day. The Allies land in Normandy, and close in on Germany. |
| 31.48 | 1945 | Nineteen forty-five. Germany surrenders in May. After two atomic bombs, Japan surrenders in August. |
| 38.37 | The cost | More than seventy million people died, including six million Jews murdered in the Holocaust. |
| 43.92 | Loop | It was the deadliest war in history, and it reshaped the world. |

## Simplifications (deliberate, flagged on screen as "SIMPLIFIED · MODERN BORDERS SHOWN")

- The map uses today's country outlines as a stand-in for 1939–45 borders (e.g. Germany, Poland and the
  USSR had different borders; Austria and Czechia are coloured with Germany for the 1938–39 annexations).
- Each country has one colour at a time: Axis, occupied or Allied. Partial occupations, Vichy France,
  the 1939 Soviet invasion of eastern Poland, Italy's 1943 switch and the war in Asia before 1941 are not shown.
- Liberation timing is compressed into the 1944 and 1945 scenes.
- Death toll: commonly cited estimates range from about 70 to 85 million; the video says "more than seventy million".
