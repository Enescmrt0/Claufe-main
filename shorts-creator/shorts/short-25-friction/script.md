# Short 25: 5 seconds without friction

- Format: 1080×1920, 30 fps, 24.8 s (ends on the closing scene)
- Composition: `remotion/src/shots/short-25/Short25Friction.tsx` (`Short25Friction`), stick figure from `lib/stick.tsx`
- Structure (new for the series): no title card; result-first hook with motion on frame 0, then a
  second-by-second counter (SECOND 1…5) instead of a "background → steps → twist" build
- Voice: Kokoro TTS (`af_heart`, speed 1.1, local, no API key), one wav per line in `voice/` (gitignored)
- Music: `tech-pulse` bed via `tools/mix_music.py`; SFX: `sfx-plan.json` (20 cues) via `tools/mix_sfx.py`;
  final audio passed through a limiter (peak −1 dB)
- Topic source: vidIQ outlier "What If Friction Disappeared 5 Seconds" (2.6M views on a 1.6k-subscriber channel)

| t (s) | Scene | Narration |
|---|---|---|
| 0.1 | Hook | Five seconds without friction would wreck your day. |
| 2.85 | Second 1 | Second one. Your feet lose grip. You can't walk. You just slide. |
| 6.41 | Second 2 | Second two. Every car becomes a sled. No brakes, no steering. |
| 10.31 | Second 3 | Second three. Knots untie, and nails slip out of the walls. |
| 13.8 | Second 4 | Second four. Anything on a slope starts to slide. |
| 16.76 | Second 5 | Second five. Friction returns, and everything still moving slams to a halt. |
| 21.26 | Close | Friction: the most underrated force on Earth. |

Physics notes: walking, braking and steering all rely on friction between surfaces; knots and nails hold by
friction; on any incline an object with no friction accelerates downhill (the slope scene uses x = ½·a·t²).
Simplifications: only surface friction is considered (not air drag or internal friction in materials), and the
"second 3" effects would not all happen within exactly one second.
