# The Man Who Stole the Mona Lisa (1911) — Ricks Clips style

Portrait Short, 1080×1920, 30 fps, about 69 s. Final: `monalisa-final.mp4`.
Style modelled on Ricks Clips (@ricksclips3000): 2D stickmen with big round white heads, thin stick limbs, thick
outlines, period costumes, inside richly detailed painted sets; a cut every 2–4 s; one-word captions mid-screen.

## Pipeline (about 55 Higgsfield credits)

1. Character + style anchor `hf/ref.png` (gpt_image_2_6, medium, 1 credit).
2. 17 scene frames `hf/s0.png`…`hf/s16.png`, each with the anchor as `image_references` (1 credit each).
   Prompts: `shots_plan.json` (shared STYLE block + SCENE).
3. Six key moments animated with `kling3_0` std, 5 s, sound off (6.25 credits each): `hf/c0`, `c3`, `c4`, `c6`,
   `c11`, `c16`.
4. Local and free: Kokoro voice (`am_michael` 1.24), word timings, `audio.py` (SFX + `caper` music), `assemble.py`
   (Ken Burns on stills, clip retiming, one-word ASS captions, loudness).

Higgsfield allows 4 concurrent jobs per account, so submit in groups of four.

## Facts

On 20–21 August 1911 Vincenzo Peruggia, who had worked at the Louvre fitting glass cases, hid in the museum and on the
closed Monday walked out with the Mona Lisa under his white worker's smock; a plumber opened a locked door for him. The
theft was noticed the next day when painter Louis Béroud found the empty hooks; guards had assumed it was being
photographed. The Louvre closed for a week, Picasso was questioned, and crowds came to see the empty wall. Peruggia kept
the painting in a trunk in his Paris lodgings for two years, was caught in Florence in 1913 when dealer Alfredo Geri
alerted the Uffizi, claimed patriotic motives and served a few months in prison.
