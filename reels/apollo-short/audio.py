"""Synthesized score and sound effects for the Apollo 13 short (no samples).
usage: python audio.py  -> audio/bed.wav (music + sfx); mixed with audio/vo.wav by ffmpeg afterwards.
Score: a calm space pad for the hook, a ticking tension pulse from the explosion, a building riser for the fix,
and a warm major resolve on the splashdown."""
import numpy as np, wave

SR = 44100
DUR = 53.4
N = int(SR * DUR)
out = np.zeros(N)
rng = np.random.default_rng(13)

def put(sig, t, g=1.0):
    i = int(t * SR)
    if i >= N or i < 0: return
    sig = sig[: N - i]; out[i:i + len(sig)] += sig * g
def T(n): return np.arange(n) / SR
def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); z = 0.0
    for i, v in enumerate(x): z = (1 - a) * v + a * z; y[i] = z
    return y
def env(n, a=.005, d=.3): t = T(n); return np.minimum(1, t / a) * np.exp(-t / d)
def tone(f, dur, d=.3, a=.005, harm=(1, .3, .1)):
    n = int(dur * SR); t = T(n); return sum(h * np.sin(2 * np.pi * f * (k + 1) * t) for k, h in enumerate(harm)) * env(n, a, d)
def pad(freqs, dur, g=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for f in freqs:
        for det in (-.003, 0, .004): x += np.sin(2 * np.pi * f * (1 + det) * t + det * 100)
    x /= len(freqs) * 3
    return x * np.minimum(1, t / 1.2) * np.minimum(1, (dur - t) / 1.2) * g
def noise(dur, fc, d=.1, a=.002): n = int(dur * SR); return lowpass(rng.standard_normal(n), fc) * env(n, a, d)
def boom(): n = int(2.2 * SR); t = T(n); return (np.sin(2 * np.pi * (40 + 60 * np.exp(-t * 6)) * t) * np.exp(-t * 1.6) + lowpass(rng.standard_normal(n), 600) * np.exp(-t * 2.2) * .9)
def hiss(dur): n = int(dur * SR); t = T(n); x = rng.standard_normal(n) - lowpass(rng.standard_normal(n), 1500); return x * np.minimum(1, t / .2) * np.minimum(1, (dur - t) / .8) * .35
def beep(f=1200, dur=.12): return tone(f, dur, .2, .002, (1,))
def alarm(dur=3.0):
    o = np.zeros(int(dur * SR))
    for k in range(int(dur / .5)): s = tone(880 if k % 2 == 0 else 660, .22, .5, .002, (1, .2)); o[int(k * .5 * SR):int(k * .5 * SR) + len(s)] += s
    return o
def thud(f=80, dur=.4): n = int(dur * SR); t = T(n); return np.sin(2 * np.pi * f * t * (1 + 1.5 * np.exp(-t * 30))) * np.exp(-t / .1) + noise(dur, 900, .04) * .5
def pop(f=700): return tone(f, .12, .05, .002, (1, .4))
def tape(dur=.6): n = int(dur * SR); t = T(n); return (rng.standard_normal(n) - lowpass(rng.standard_normal(n), 2500)) * (.5 + .5 * np.sin(2 * np.pi * 22 * t)) * np.sin(np.pi * t / dur) * .5
def splash(dur=1.6): n = int(dur * SR); t = T(n); return lowpass(rng.standard_normal(n), 2200) * np.exp(-t * 2.4)
def static(dur): n = int(dur * SR); return (rng.standard_normal(n) - lowpass(rng.standard_normal(n), 3000)) * .12
def riser(dur): n = int(dur * SR); t = T(n); f = 180 * 2 ** (t / dur * 2); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / dur) ** 2 * .4

# ---- music ----
put(pad((110, 164.8, 220, 277.2), 5.2, .5), 0)                 # A major-ish space pad for the hook
put(pad((98, 146.8, 196, 246.9), 6.0, .35), 4.6)
BPM = 104; B = 60 / BPM                                          # tension pulse after the explosion
t = 10.2
while t < 38.6:
    put(tone(55, .3, .12, .004, (1, .5)), t, .5)
    put(tone(1760, .03, .01, .001, (1,)), t + B / 2, .08)
    t += B
put(pad((110, 130.8, 164.8), 18.0, .35), 10.4)                  # A minor bed under the problem
put(pad((87.3, 130.8, 174.6), 10.0, .3), 28.4)
put(riser(8.2), 38.6, .7)                                       # the build, rising to the fix
put(pad((130.8, 164.8, 196, 261.6), 9.0, .45), 44.6)            # C major: it works, they come home
for k, f in enumerate((523.3, 659.3, 784.0, 1046.5)): put(tone(f, 1.6, .7, .01, (1, .3)), 46.9 + k * .14, .12)
for k, f in enumerate((392, 523.3, 659.3, 784)): put(tone(f, 2.4, 1.0, .01, (1, .3)), 50.0 + k * .12, .1)

# ---- sound effects (voice-over seconds) ----
for c in (5.06, 10.88, 15.52, 19.76, 23.2, 29.68, 34.8, 38.64, 43.76, 47.44): put(noise(.35, 2500, .12, .1), c - .2, .12)
put(beep(1500), 3.44, .25); put(beep(1200), 4.24, .25)           # sock, duct tape
put(static(1.0), 5.1, .4)
put(boom(), 10.08, .9); put(hiss(4.0), 10.3, .5)
put(alarm(4.2), 10.9, .25)
put(pop(500), 16.0, .3); put(thud(60, .5), 18.08, .5)
for k in range(5): put(noise(.6, 900, .3, .2) * .6, 19.9 + k * .7, .3)   # breathing
put(thud(110, .25), 29.04, .5); put(thud(110, .25), 29.35, .5); put(beep(300, .3), 29.1, .3)  # square won't go in
put(thud(70, .6), 31.6, .4)
for k, at in enumerate((34.8, 35.84, 36.48, 37.2, 37.76)): put(pop(600 + k * 120), at, .4)
for k in range(4): put(tape(.5), 38.9 + k * .65, .5)
put(static(1.4), 41.7, .5); put(beep(900), 41.7, .2); put(beep(900), 42.0, .2)
for k in range(3): put(tape(.45), 43.9 + k * .5, .45)
put(beep(1320, .3), 46.9, .3)
put(noise(1.0, 3000, .4, .3) * .5, 47.6, .4)                     # chutes snap open
put(splash(), 50.0, .7)

out *= np.minimum(1, np.arange(N) / (SR * .2))
tail = int(SR * 1.0); out[-tail:] *= np.linspace(1, 0, tail)
out = np.tanh(out * 1.3) * .7
with wave.open('audio/bed.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote audio/bed.wav', DUR)
