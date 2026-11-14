"""Synthesized music bed and sound effects for the tortoise short. Everything is generated here (no samples).
usage: python audio.py   -> audio/bed.wav (music + sfx, no voice), then mixed with audio/vo.wav by ffmpeg."""
import numpy as np, wave

SR = 44100
DUR = 64.3
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

# ---- music: light sea-shanty bounce (major), turns minor for the "price" section, warm again at the end ----
BPM = 112; BEAT = 60 / BPM
MAJ = [(98.0, (1, 1.26, 1.5)), (130.8, (1, 1.26, 1.5)), (146.8, (1, 1.26, 1.5)), (98.0, (1, 1.26, 1.5))]   # G C D G
MIN = [(110.0, (1, 1.19, 1.5)), (87.3, (1, 1.26, 1.5)), (98.0, (1, 1.26, 1.5)), (110.0, (1, 1.19, 1.5))]  # Am F G Am
bar = 0; t = 0.0
while t < DUR - 1:
    sad = 38.4 < t < 53.9
    root, ch = (MIN if sad else MAJ)[bar % 4]
    lvl = 0.75 if sad else 1.0
    for b in range(4):                                   # oom-pah: bass on 1 and 3, chord stabs on 2 and 4
        tt = t + b * BEAT
        if b % 2 == 0: put(tone(root / 2 if b == 0 else root * 0.75, 0.4, 0.22, 0.004, (1, 0.4, 0.1)), tt, 0.20 * lvl)
        else:
            for r in ch: put(tone(root * 2 * r, 0.22, 0.09, 0.003, (1, 0.3)), tt, 0.04 * lvl)
    if not sad:                                          # a plucked melody note every half bar
        for k, step in enumerate((2, 1.5)):
            put(tone(root * 2 * step * (1.122 if bar % 2 else 1), 0.3, 0.12, 0.002, (1, 0.5, 0.2)), t + k * 2 * BEAT, 0.045)
    else:
        put(tone(root * 2, BEAT * 4, 1.8, 0.4, (1, 0.3)), t, 0.05)
    t += BEAT * 4; bar += 1

def splash(dur=0.6):
    return noise(dur, 1800, 0.18, 0.01)
def boing(f0=180, dur=0.4):
    n = int(dur * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * (f0 * tt + 120 * np.sin(tt * 30) / 30)) * np.exp(-tt / 0.15)
def creak(dur=0.7):
    n = int(dur * SR); tt = np.arange(n) / SR
    return np.sin(2 * np.pi * (220 + 60 * np.sin(tt * 9)) * tt) * np.sin(np.pi * tt / dur) * 0.5 * (1 + 0.5 * np.sign(np.sin(tt * 90)))
def shutter():
    return click(0.08) + noise(0.08, 5000, 0.02) * 0.6

CUTS = [5.44, 10.2, 16.4, 20.48, 26.72, 30.48, 33.6, 37.04, 38.48, 40.32, 46.08, 49.2, 53.92, 57.68]
for c in CUTS: put(whoosh(0.34), c - 0.2, 0.09)
for tt in (0.5, 2.3, 50.0): put(creak(0.8), tt, 0.06)        # ship's timbers
put(thud(70, 0.5), 4.1, 0.45)                                  # tortoise set on the stack
for k in range(5): put(splash(0.9), 5.6 + k * 0.95, 0.05)     # waves
put(boing(260, 0.35), 11.6, 0.18)                              # the sniff
put(noise(0.5, 900, 0.2), 13.2, 0.08)                          # stink
for k in range(10): put(tone(420 + 30 * (k % 3), 0.06, 0.03), 13.3 + k * 0.08, 0.02)   # flies
put(tone(160, 0.6, 0.3, 0.01, (1, 0.5)), 15.3, 0.12)           # queasy groan
put(ding(1320, 1.4), 19.6, 0.12)                               # lunchbox
for k in range(12): put(noise(0.05, 4000, 0.015), 22.3 + k * 0.165, 0.18)   # calendar pages
put(boing(150, 0.5), 24.3, 0.12)
for k in range(8): put(thud(90, 0.18), 26.9 + k * 0.45, 0.10)  # footsteps on sand
put(thud(60, 0.7), 32.7, 0.5)                                  # hatch closes
for k in range(7): put(thud(110, 0.15), 33.8 + k * 0.33, 0.16) # cook on the stairs
put(boing(330, 0.3), 35.9, 0.15)                               # tortoises flinch
put(noise(0.1, 2500, 0.03), 37.35, 0.4); put(thud(120, 0.25), 37.35, 0.3)   # red X stamp
put(thud(48, 1.2), 38.5, 0.45)                                 # "But"
for k in range(40): put(click(0.03), 41.0 + k * 0.06, 0.05)    # counter rolling
put(ding(660, 1.5), 43.5, 0.11)
put(lowpass(rng.standard_normal(int(SR * 3)), 500) * np.sin(np.pi * np.arange(int(SR * 3)) / (SR * 3)), 46.1, 0.16)  # wind
for k in range(4): put(splash(0.8), 54.1 + k * 0.9, 0.04)
for k in range(9): put(shutter(), 58.0 + k * 0.38 + (k % 3) * 0.05, 0.35)    # cameras
put(ding(990, 1.6), 62.9, 0.1)

out *= np.minimum(1, np.arange(N) / (SR * 0.3))
tail = int(SR * 1.2); out[-tail:] *= np.linspace(1, 0, tail)
out = np.tanh(out * 1.4) * 0.7
with wave.open('audio/bed.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote audio/bed.wav', round(DUR, 2), 's')
