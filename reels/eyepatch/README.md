# Why Pirates Wore Eye Patches — Ricks Clips style (Higgsfield, 24-credit budget)

Portrait Short, 1080×1920, 30 fps, about 33 s. Final: `eyepatch-final.mp4`.

## Pipeline (about 17 credits)

1. Pirate captain character + style anchor `hf/ref.png` (gpt_image_2_6, medium, 1 credit).
2. 10 scene frames `hf/s1.png`…`hf/s10.png` with the anchor as `image_references` (1 credit each).
3. One key moment animated with `kling3_0` std 5 s silent (6.25 credits): `hf/c7.mp4` (down the ladder, patch up).
4. Free, local: Kokoro voice (`am_puck` 1.15), `audio.py` (SFX + sea-shanty `jig`), `assemble.py` (Ken Burns,
   one-word captions). Scene 8 is mirrored so the patch is on the other eye after the swap.

## Facts

Eyes take up to about 20–30 minutes to fully adapt to darkness. A popular theory holds that pirates covered one eye so
it stayed dark-adapted for going below deck; it is not documented historically, but MythBusters (2007) found the idea
plausible in tests.
