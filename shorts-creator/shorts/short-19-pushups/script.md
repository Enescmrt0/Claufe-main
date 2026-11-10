# Short 19: 100 push-ups every day

- Format: 1080×1920, 30 fps, 43.4 s, loop (last scene returns to the hook)
- Composition: `remotion/src/shots/short-19/Short19Pushups.tsx` (`Short19Pushups`), built on `lib/explainer.tsx`
- Voice: Kokoro TTS (`af_heart`, speed 1.05, local, no API key), one wav per line in `voice/` (gitignored)
- Music: `tech-pulse` bed via `tools/mix_music.py`; SFX: `sfx-plan.json` (25 cues) via `tools/mix_sfx.py`;
  final audio passed through a limiter (peak −1 dB)
- Topic source: vidIQ rising keyword "what 20 push-ups a day does to your body" (+172% in a month)

| t (s) | Scene | Narration |
|---|---|---|
| 0.3 | Hook | What happens if you do one hundred push-ups every day? |
| 3.47 | Week 1 | Week one. You're sore. Tiny tears in the muscle fibers are being repaired. |
| 8.02 | Week 2 | Week two. It gets easier, but not from new muscle. Your nervous system is learning to fire more fibers. |
| 14.43 | Week 4–8 | Around week four to eight, real growth shows up: chest, shoulders and triceps. |
| 19.35 | Plateau | Then you hit a plateau. Your body has adapted, and a hundred reps just builds endurance. |
| 24.69 | Only pushing | And push-ups only train pushing. Skip pulling exercises, and your shoulders can start to round forward. |
| 31.14 | No rest days | No rest days is a risk too. Muscles grow while you recover, and wrists and elbows can get overused. |
| 37.48 | Loop to hook | So yes, you'll get stronger. To keep growing, make them harder, and take days off. |

Science notes:
- Early strength gains (first weeks) are mostly neural: better motor-unit recruitment, not bigger muscle.
- Measurable hypertrophy typically shows after several weeks of consistent training; timing varies by person.
- Without progressive overload the stimulus stops being enough for growth (plateau); high reps shift toward endurance.
- Push-only training and no recovery days are common causes of imbalance and overuse complaints ("can", not "will").
- The strength curve and "fibers firing 14 / 16" counter are illustrations, not real data.
