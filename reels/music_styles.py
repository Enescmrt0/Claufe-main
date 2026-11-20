# Distinct underscore styles for the stick-figure reels, so each video has its own music.
# Loaded by a reel's audio.py with exec(), after its synth helpers (place, pizz, glock, reed, strings, tick, thud,
# hp, lp, bp, T, SR, rng, midi, music) are defined. Every function writes into the global `music` buffer.

def _snare(g=1.0):
    n = int(.12 * SR); t = T(n); return (hp(rng.standard_normal(n), 1800) * np.exp(-t * 45) + np.sin(2 * np.pi * 190 * t) * np.exp(-t * 60) * .5) * g
def _hat(g=1.0):
    n = int(.03 * SR); t = T(n); return hp(rng.standard_normal(n), 6000) * np.exp(-t * 180) * g
def _cowbell(g=1.0):
    n = int(.12 * SR); t = T(n); return (np.sign(np.sin(2 * np.pi * 800 * t)) + np.sign(np.sin(2 * np.pi * 540 * t))) * np.exp(-t * 30) * .12 * g
def _organ(m, dur=.16, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    x = np.sin(2 * np.pi * f * t) + .5 * np.sin(4 * np.pi * f * t) + .3 * np.sin(6 * np.pi * f * t) + .2 * np.sin(8 * np.pi * f * t)
    return x * np.minimum(1, t / .008) * np.minimum(1, (dur - t) / .03) * .22 * g
def _fife(m, dur=.2, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .006 * np.sin(2 * np.pi * 6 * t))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) + .25 * np.sin(4 * np.pi * np.cumsum(f) / SR) + bp(rng.standard_normal(n), 2500, 6000) * .08
    return x * np.minimum(1, t / .02) * np.minimum(1, (dur - t) / .04) * .3 * g
def _vibes(m, dur=1.4, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    return (np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 8)) * np.exp(-t * 2.2) * (1 + .25 * np.sin(2 * np.pi * 5 * t)) * np.minimum(1, t / .003) * .3 * g

# 1950s jet-age swing: walking bass, swung ride, vibraphone chords
def swing(t0, t1, g=1.0, minor=False, bpm=128):
    b = 60 / bpm; roots = [45, 50, 43, 48] if not minor else [45, 41, 43, 40]; t = t0; i = 0
    while t < t1 - .05:
        r = roots[(i // 4) % 4]; st = [0, 4, 7, 9] if not minor else [0, 3, 7, 8]
        place(music, pizz(r - 12 + st[i % 4], .4, .9), t, g)
        place(music, _hat(.5), t, g * .5)
        if i % 2 == 1: place(music, _hat(.4), t + b * .66, g * .5)
        if i % 4 == 0:
            for m in ((r + 16, r + 19, r + 23) if not minor else (r + 15, r + 19, r + 22)): place(music, _vibes(m, 1.6, .5), t + b * 1.5, g)
        t += b; i += 1

# game-show cha-cha: organ off-beats, cowbell, bright glock riff
def gameshow(t0, t1, g=1.0, riff=True, bpm=120):
    b = 60 / bpm; prog = [(48, (60, 64, 67)), (53, (60, 65, 69)), (55, (59, 62, 67)), (48, (60, 64, 67))]; t = t0; bar = 0
    lick = [(0, 79), (.5, 76), (1, 72), (1.5, 76), (2, 79), (3, 84)]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(4):
            place(music, pizz(root - 12 if k % 2 == 0 else root - 5, .35, .9), t + k * b, g)
            place(music, _cowbell(), t + k * b, g)
            for m in ch: place(music, _organ(m), t + k * b + b / 2, g)
        place(music, _cowbell(.7), t + 3.5 * b, g)
        if riff and bar % 2 == 0:
            for (bt, m) in lick:
                if t + bt * b < t1: place(music, glock(m + (5 if bar % 4 == 2 else 0) - (5 if bar % 4 == 2 else 0), .7, .3), t + bt * b, g)
        t += 4 * b; bar += 1
# game-show "thinking" clock: tick-tock with a low pedal
def thinking(t0, t1, g=1.0, bpm=120):
    b = 60 / bpm; t = t0; i = 0
    while t < t1 - .05:
        place(music, glock(84 if i % 2 == 0 else 79, .2, .22), t, g)
        if i % 4 == 0: place(music, pizz(36, .6, .8), t, g)
        t += b / 2 * 2 if False else b; i += 1

# military march: bass drum, snare with rolls, fife tune
def march(t0, t1, g=1.0, tune=True, bpm=112):
    b = 60 / bpm; t = t0; bar = 0
    mel = [77, 77, 79, 81, 84, 81, 79, 77, 76, 77, 79, 76, 77, 72, 77, None]
    bass = [41, 36, 41, 36, 43, 36, 41, 36]
    while t < t1 - .05:
        for k in range(4):
            if k % 2 == 0: place(music, thud(60, .22, .5), t + k * b, g)
            place(music, pizz(bass[(bar * 4 + k) % 8] + (0 if k % 2 == 0 else 12), .3, .7), t + k * b, g)
            if k % 2 == 1: place(music, _snare(.5), t + k * b, g)
            place(music, _snare(.22), t + k * b + b / 2, g)
        if bar % 2 == 1:
            for r in range(6): place(music, _snare(.2 + r * .04), t + 3 * b + r * b / 6, g)
        if tune:
            for k in range(8):
                m = mel[(bar * 8 + k) % 16]
                if m and t + k * b / 2 < t1: place(music, _fife(m, b / 2 * .9), t + k * b / 2, g)
        t += 4 * b; bar += 1

# medieval dance: drone, hand drum and a modal whistle tune in 6/8
def medieval(t0, t1, g=1.0, tune=True, bpm=92):
    e = 60 / bpm / 3; t = t0; i = 0
    mel = [74, 72, 74, 77, 76, 74, 72, 69, 72, 74, 72, 69, 67, 69, 72, 74, 77, 79, 77, 74, 72, 74, 72, 69]
    n = int(max(0.1, t1 - t0) * SR); tt = T(n)
    dr = (np.sin(2 * np.pi * 73.4 * tt) + .6 * np.sin(2 * np.pi * 110 * tt) + .25 * np.sin(2 * np.pi * 146.8 * tt)) * np.minimum(1, tt / .3) * np.minimum(1, (t1 - t0 - tt) / .3) * .12
    place(music, lp(dr, 900), t0, g)
    while t < t1 - .05:
        if i % 6 == 0: place(music, thud(95, .16, .45), t, g)
        if i % 6 == 3: place(music, thud(140, .1, .3), t, g)
        if i % 6 in (2, 5): place(music, _hat(.35), t, g)
        if i % 3 == 0: place(music, pizz([50, 50, 48, 45][(i // 6) % 4], .5, .7), t, g)
        if tune and i % 3 != 1: place(music, _fife(mel[(i // 3 * 2 + (1 if i % 3 == 2 else 0)) % 24], e * 1.4, .8), t, g)
        t += e; i += 1

# Edwardian salon waltz (3/4): oom-pah-pah with a lilting glock line
def waltz(t0, t1, g=1.0, bpm=150, minor=False):
    b = 60 / bpm; t = t0; bar = 0
    prog = [(43, (67, 71, 74)), (48, (67, 72, 76)), (50, (66, 69, 72)), (43, (67, 71, 74))] if not minor else [(45, (69, 72, 76)), (50, (69, 74, 77)), (52, (68, 71, 74)), (45, (69, 72, 76))]
    mel = [79, 78, 79, 83, 81, 79, 76, 74, 76, 79, 78, 76]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        place(music, pizz(root - 12, .5, .9), t, g)
        for k in (1, 2):
            for m in ch: place(music, pizz(m - 12, .25, .3), t + k * b, g)
        for k in range(3):
            m = mel[(bar * 3 + k) % 12] - (3 if minor and mel[(bar * 3 + k) % 12] % 12 in (11, 4) else 0)
            if t + k * b < t1: place(music, glock(m, .9, .28), t + k * b, g)
        t += 3 * b; bar += 1
# tension pulse: low ostinato and ticking, no melody
def pulse(t0, t1, g=1.0, bpm=96):
    b = 60 / bpm; t = t0; i = 0
    while t < t1 - .05:
        place(music, pizz([33, 33, 36, 34][(i // 8) % 4], .3, .8), t, g)
        if i % 2 == 0: place(music, thud(55, .2, .35), t, g)
        place(music, _hat(.25), t + b / 2, g)
        t += b / 2; i += 1
# elegy: slow sustained strings with a few low piano-like notes
def elegy(t0, t1, g=1.0, prog=((45, 52, 57, 60), (41, 48, 57, 60), (43, 50, 55, 59), (40, 47, 55, 59)), bar=6.0):
    t = t0; i = 0
    while t < t1 - .2:
        ch = prog[i % len(prog)]; d = min(bar, t1 - t)
        place(music, strings(ch[1:], d, .45), t, g)
        place(music, pizz(ch[0] - 12, 1.6, .7), t, g); place(music, glock(ch[-1] + 12, 2.0, .14), t + bar / 2, g)
        t += bar; i += 1

# Victorian music hall: honky-tonk piano oom-pah with a cheeky melody (and a sleepy variant)
def _piano(m, dur=.5, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    x = sum(a * np.sin(2 * np.pi * f * k * (1 + .0015 * k) * t) for k, a in ((1, 1), (2, .5), (3, .25), (4, .12)))
    x += .5 * np.sin(2 * np.pi * f * 1.004 * t)  # slightly out-of-tune second string
    return x * np.exp(-t * 4.5) * np.minimum(1, t / .003) * .22 * g
def musichall(t0, t1, g=1.0, bpm=126, tune=True, sleepy=False):
    b = 60 / bpm; t = t0; bar = 0
    prog = [(43, (59, 62, 67)), (48, (60, 64, 67)), (50, (57, 62, 66)), (43, (59, 62, 67))]
    mel = [74, 76, 78, 79, 81, 79, 76, 74, 72, 74, 76, 72, 74, None, 71, None]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(4):
            if k % 2 == 0: place(music, _piano(root - (0 if k == 0 else 7), .5, .9), t + k * b, g)
            else:
                for m in ch: place(music, _piano(m - 12, .25, .45), t + k * b, g)
        if tune and not sleepy:
            for k in range(4):
                m = mel[(bar * 4 + k) % 16]
                if m and t + k * b < t1: place(music, _piano(m, .45, .7), t + k * b + (b * .1 if k % 2 else 0), g)
        if sleepy and bar % 2 == 0: place(music, glock(79, 1.6, .25), t, g)
        t += 4 * b; bar += 1

# 1910s ragtime: stride left hand, syncopated right-hand melody (3+3+2), honky-tonk piano
def ragtime(t0, t1, g=1.0, bpm=96, tune=True):
    e = 60 / bpm / 2; t = t0; bar = 0
    prog = [(41, (57, 60, 65)), (41, (57, 60, 65)), (46, (58, 62, 65)), (36, (58, 60, 64))]
    riff = [(0, 77), (3, 81), (6, 84), (8, 79), (11, 81), (14, 77)]   # sixteenth-ish offsets in eighths*... (3+3+2 feel)
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(4):
            if k % 2 == 0: place(music, _piano(root - (12 if k == 0 else 5), .45, .9), t + k * 2 * e, g)
            else:
                for m in ch: place(music, _piano(m - 12, .22, .4), t + k * 2 * e, g)
        if tune:
            for (o, m) in riff:
                tt = t + o * e / 2
                if tt < t1: place(music, _piano(m + (0 if bar % 4 < 2 else -2), .3, .55), tt, g)
        t += 8 * e; bar += 1
