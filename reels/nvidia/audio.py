"""Synthesized music bed and sound effects for the Nvidia short. Everything is generated here (no samples).
usage: python audio.py   -> audio/bed.wav (music + sfx, no voice), then mixed with audio/vo.wav by ffmpeg."""
import numpy as np, wave

SR = 44100
DUR = 52.1
N = int(SR * DUR)
out = np.zeros(N)
rng = np.random.default_rng(7)

def put(sig, t, gain=1.0):
    i = int(t * SR)
    if i >= N: return
    sig = sig[: N - i]
    out[i:i + len(sig)] += sig * gain

def env(n, a=0.005, d=0.3):
    t = np.arange(n) / SR
    return np.minimum(1, t / a) * np.exp(-t / d)

def tone(f, dur, d=0.3, a=0.005, harm=(1, 0.3, 0.1)):
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(h * np.sin(2 * np.pi * f * (k + 1) * t) for k, h in enumerate(harm))
    return s * env(n, a, d)

def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); z = 0.0
    for i, v in enumerate(x):
        z = (1 - a) * v + a * z; y[i] = z
    return y

def noise(dur, fc, d=0.1, a=0.002):
    n = int(dur * SR)
    return lowpass(rng.standard_normal(n), fc) * env(n, a, d)

def thud(f=70, dur=0.5):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (f * t + 40 * (1 - np.exp(-t * 30)) / 30)) * np.exp(-t / 0.12) + noise(dur, 900, 0.04) * 0.6

def whoosh(dur=0.45):
    n = int(dur * SR); t = np.arange(n) / SR
    return lowpass(rng.standard_normal(n), 2500) * np.sin(np.pi * t / dur) ** 2

def click(dur=0.08):
    return noise(dur, 6000, 0.012) + tone(1800, dur, 0.01) * 0.3

def ding(f=1320, dur=1.2):
    return tone(f, dur, 0.35, 0.002, (1, 0.4, 0.2)) + tone(f * 1.5, dur, 0.25, 0.002, (0.5,))

# ---- music: a slow minor pulse, darker in the middle, thinning out at the end ----
BPM = 96; BEAT = 60 / BPM
ROOTS = [55.0, 55.0, 43.65, 49.0]  # A, A, F, G (one bar each)
bar = 0; t = 0.0
while t < DUR - 1:
    root = ROOTS[bar % 4]
    level = 1.0 if 4.9 < t < 44.6 else 0.6
    put(tone(root, BEAT * 4, 1.6, 0.05, (1, 0.5, 0.15)), t, 0.20 * level)          # bass drone
    for b in range(8):                                                             # eighth-note pulse
        tt = t + b * BEAT / 2
        put(tone(root * 4 * (1.5 if b % 4 == 3 else 1), 0.25, 0.09, 0.003, (1, 0.25)), tt, 0.045 * level)
        if 13.7 < tt < 44.6: put(click(0.05), tt, 0.035 if b % 2 else 0.02)        # ticking, like a clock
    if 22.4 < t < 44.6:                                                            # minor pad for the spy part
        for f in (root * 4, root * 4 * 1.189, root * 6):
            put(tone(f, BEAT * 4, 2.5, 0.6, (1, 0.2)), t, 0.03)
    t += BEAT * 4; bar += 1

# ---- sound effects, timed to the picture ----
CUTS = [4.9, 6.7, 9.4, 13.72, 18.38, 22.45, 24.8, 28.45, 32.22, 34.05, 37.66, 40.52, 42.78, 44.62, 49.58]
for c in CUTS: put(whoosh(0.36), c - 0.2, 0.10)
put(thud(55, 0.9), 4.9, 0.5)                    # "a spy"
put(tone(110, 2.0, 0.9, 0.02, (1, 0.6, 0.4)), 4.9, 0.12)
put(ding(880, 1.6), 11.3, 0.10)                 # the chip powers up
put(whoosh(1.2), 10.6, 0.10)
put(thud(80, 0.5), 13.72 + 1.75, 0.55)          # the barrier comes down
put(click(), 13.72 + 1.75, 0.5)
put(whoosh(0.9), 18.4, 0.16)                    # newspaper spins in
put(noise(0.2, 3500, 0.05), 19.38, 0.35)
for i in range(3): put(thud(75 + i * 8, 0.4), 24.8 + 0.25 + i * 0.75 + 0.32, 0.4)  # crates land
put(tone(98, 2.2, 1.0, 0.3, (1, 0.5, 0.3)), 28.6, 0.14)                            # the handler
put(ding(660, 1.0), 34.05 + 1.35, 0.10)         # question mark
put(thud(50, 1.0), 37.7, 0.45)                  # "But"
put(thud(85, 0.4), 40.52 + 0.72, 0.5)           # folder on the table
put(noise(0.15, 3000, 0.04), 40.52 + 0.72, 0.3)
put(click(), 42.78 + 0.35, 0.6); put(thud(140, 0.2), 42.78 + 0.35, 0.2)  # badge
put(thud(60, 0.7), 44.62 + 1.5, 0.55)           # safe door
put(click(), 44.62 + 2.05, 0.5)
put(ding(1320, 1.2), 44.62 + 2.1, 0.13)         # tick
put(tone(55, 2.4, 1.3, 0.05, (1, 0.5, 0.2)), 49.6, 0.22)  # last line

out *= np.minimum(1, np.arange(N) / (SR * 0.3))
tail = int(SR * 1.2); out[-tail:] *= np.linspace(1, 0, tail)
out = np.tanh(out * 1.4) * 0.7
with wave.open('audio/bed.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote audio/bed.wav', round(DUR, 2), 's')
