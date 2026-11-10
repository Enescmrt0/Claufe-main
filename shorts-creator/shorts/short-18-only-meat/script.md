# Short 18: Only meat, every day

- Format: 1080×1920, 30 fps, 43.4 s, loop (last scene returns to the hook)
- Composition: `remotion/src/shots/short-18/Short18OnlyMeat.tsx` (`Short18OnlyMeat`), built on `lib/explainer.tsx`
- Voice: Kokoro TTS (`af_heart`, speed 1.05, local, no API key), one wav per line in `voice/` (gitignored)
- Music: `docu-pluck` bed via `tools/mix_music.py`; SFX: `sfx-plan.json` (28 cues) via `tools/mix_sfx.py`;
  final audio passed through a limiter (peak −1 dB)

| t (s) | Scene | Narration |
|---|---|---|
| 0.3 | Hook | What happens if you eat only meat, every single day? |
| 3.53 | Day 1–3 | Day one to three. No carbs, so your body burns through its stored sugar, and drops a lot of water. |
| 9.58 | Week 1 | Week one. Your liver starts making ketones from fat. Many people feel tired and foggy. It's called keto flu. |
| 16.82 | Zero fiber | Zero fiber means your gut bacteria start to change, and digestion can get rough. |
| 22.05 | A few weeks in | After a few weeks, hunger often drops. Protein keeps you full. |
| 26.05 | Has and lacks | But meat has almost no vitamin C, and no fiber at all. |
| 29.92 | Saturated fat | And all that saturated fat often pushes LDL cholesterol up. |
| 34.35 | Long term? | Long term? There are no long term trials. Nobody really knows. |
| 38.41 | Loop to hook | Your body can adapt to almost anything. That doesn't mean it should. |

Science notes (why the hedged wording):
- Glycogen is stored with water, so early weight loss on zero-carb diets is largely water.
- Ketosis and "keto flu" symptoms are well described for very-low-carb diets; severity varies ("many people").
- LDL "often" rises on high-saturated-fat diets, not in everyone; the chart is an illustration, not real data.
- There are no long-term controlled trials of all-meat diets; the video says so instead of predicting outcomes.
- On-screen note: "NOT MEDICAL ADVICE · TALK TO A DOCTOR FIRST".
