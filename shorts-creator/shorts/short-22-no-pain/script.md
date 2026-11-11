# Short 22: What if you felt no pain?

- Format: 1080×1920, 30 fps, 33.4 s, loop (last scene returns to the hook)
- Composition: `remotion/src/shots/short-22/Short22NoPain.tsx` (`Short22NoPain`)
- Characters: `lib/stick.tsx`, a posable stick figure (hand/foot targets solved with two-bone IK,
  faces: smile / neutral / ouch / sad, `walkPose` cycle)
- Voice: Kokoro TTS (`af_heart`, speed 1.05, local, no API key), one wav per line in `voice/` (gitignored)
- Music: `lofi-warm` bed via `tools/mix_music.py`; SFX: `sfx-plan.json` (27 cues) via `tools/mix_sfx.py`;
  final audio passed through a limiter (peak −1 dB)
- Topic source: vidIQ keyword "what if you stopped feeling pain?" (~75k searches/month, +81%)

| t (s) | Scene | Narration |
|---|---|---|
| 0.3 | Hook | What if you stopped feeling pain? |
| 2.23 | Superpower | Sounds like a superpower. No headaches. No stubbed toes. |
| 5.93 | Alarm system | But pain is your body's alarm system. Nerves warn your brain in a split second. |
| 10.91 | Hot pan | Without it, you'd grab a hot pan, and not let go. |
| 13.99 | Broken ankle | You could walk on a broken ankle, and never notice. |
| 16.99 | Small things | Small things add up too. You'd bite your tongue, scratch your eyes, and miss infections. |
| 22.03 | This is real | And this is real. Some people are born unable to feel pain. Many get badly hurt as children. |
| 28.29 | Loop to hook | Pain isn't your enemy. It's the reason you're still in one piece. |

Science notes: congenital insensitivity to pain is a real, very rare inherited condition; reported consequences
include unnoticed burns and fractures, tongue and lip biting, eye injuries and untreated infections, especially
in childhood. The damage meters are illustrations, not data.
