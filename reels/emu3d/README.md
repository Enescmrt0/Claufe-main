# The Great Emu War, 2D-in-3D (Higgsfield)

Portrait Short, 1080×1920, 30 fps, 15 s. Final: `emu3d-final.mp4`.
Style: flat 2D cartoon characters with thick ink outlines inside a 3D miniature diorama world.

## Pipeline (about 21 credits)

1. Three first frames with `gpt_image_2_6`, 9:16 (0.75 credits each): `hf/s0.png`, `hf/s1.png`, `hf/s2.png`.
2. Each frame animated with `kling3_0`, mode `std`, 5 s, sound off (6.25 credits each): `hf/c0.mp4`…`hf/c2.mp4`.
3. Voice (Kokoro `am_puck`), music (`warpath` from `../music_styles.py`) and SFX made locally for free: `mix.py`.
4. `assemble.sh` joins the clips, burns captions and muxes the mix.

## Image prompt pattern

"Vertical 9:16 still frame from an animated short. STYLE: flat 2D cartoon characters with thick black ink outlines and
flat cel-shaded colors, like paper cut-outs, inside a fully 3D rendered miniature diorama world with soft global
illumination, real depth, tilt-shift depth of field and painterly textures. Strong contrast between the flat 2D
characters and the volumetric 3D scenery. Bright saturated colors. No text, no logos, no watermark. SCENE: …"

## Video prompt pattern

"Keep the exact art style of the image: flat 2D cartoon characters with thick black outlines inside a 3D miniature
diorama world with depth of field. [camera move]. [character actions]. [environment motion]. Characters stay flat 2D,
no style change, no new characters, no text."
