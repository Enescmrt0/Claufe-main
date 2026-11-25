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

# 1940s American hoedown: banjo forward-roll, boom-chick bass, sawing fiddle tune (a galloping feel)
def _banjo(m, dur=.3, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    x = sum(a * np.sin(2 * np.pi * f * k * t) * np.exp(-t * (9 + 4 * k)) for k, a in ((1, 1), (2, .6), (3, .45), (4, .3), (5, .2)))
    x += hp(rng.standard_normal(n), 3000) * np.exp(-t * 250) * .3
    return x * np.minimum(1, t / .001) * .26 * g
def _fiddle(m, dur=.3, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .007 * np.sin(2 * np.pi * 6 * t) * np.minimum(1, t / .15))
    ph = np.cumsum(f) / SR; x = 2 * (ph % 1) - 1
    x = bp(x, 400, 4000) + bp(rng.standard_normal(n), 2000, 6000) * .05
    return x * np.minimum(1, t / .03) * np.minimum(1, (dur - t) / .04) * .2 * g
def hoedown(t0, t1, g=1.0, bpm=118, tune=True):
    e = 60 / bpm / 2; t = t0; bar = 0
    prog = [(43, (67, 71, 74)), (43, (67, 71, 74)), (48, (67, 72, 76)), (50, (66, 69, 74))]   # G G C D
    roll = [0, 1, 2, 0, 1, 2, 0, 2]
    tune_ = [79, 81, 83, 81, 79, 76, 74, 76, 79, 79, 76, 74, 72, 74, 76, 78]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(8):
            tk = t + k * e
            if tk >= t1: break
            place(music, _banjo(ch[roll[k]] + (12 if k % 4 == 3 else 0), .3, .8), tk, g)
            if k % 4 == 0: place(music, pizz(root - (0 if k == 0 else -7) - 12, .3, .9), tk, g)
            if k % 2 == 1: place(music, _snare(.12), tk, g)
            if tune and k % 2 == 0: place(music, _fiddle(tune_[(bar * 4 + k // 2) % 16], e * 2, .9), tk, g)
        t += 8 * e; bar += 1

# quirky ukulele: bright strummed chords (down-up pattern) with a whistled tune
def _uke(ms, g=1.0, up=False):
    out = np.zeros(int(.5 * SR))
    for k, m in enumerate(ms[::-1] if up else ms):
        n = int(.45 * SR); t = T(n); f = midi(m)
        x = (np.sin(2 * np.pi * f * t) + .5 * np.sin(4 * np.pi * f * t) * np.exp(-t * 14) + .25 * np.sin(6 * np.pi * f * t) * np.exp(-t * 20)) * np.exp(-t * 7) * np.minimum(1, t / .002)
        i = int(k * .012 * SR); out[i:i + n] += x[:len(out) - i]
    return out * .12 * g
def _whistle(m, dur=.3, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .012 * np.sin(2 * np.pi * 5.5 * t) * np.minimum(1, t / .1))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) + bp(rng.standard_normal(n), 1500, 5000) * .06
    return x * np.minimum(1, t / .03) * np.minimum(1, (dur - t) / .05) * .18 * g
def ukulele(t0, t1, g=1.0, bpm=112, tune=True):
    e = 60 / bpm / 2; t = t0; bar = 0
    prog = [(48, (60, 64, 67, 72)), (45, (57, 64, 69, 72)), (41, (60, 65, 69, 72)), (43, (59, 62, 67, 71))]   # C Am F G
    pat = [(0, 0), (2, 0), (3, 1), (5, 1), (6, 0), (7, 1)]
    tune_ = [(0, 76, 2), (2, 79, 1), (3, 81, 1), (4, 79, 2), (6, 76, 2), (8, 74, 2), (10, 72, 1), (11, 74, 1), (12, 76, 4)]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        place(music, pizz(root - 12, .4, .7), t, g); place(music, pizz(root - 5, .3, .5), t + 4 * e, g)
        for (k, up) in pat:
            if t + k * e < t1: place(music, _uke(ch, .9, up), t + k * e, g)
        if tune and bar % 2 == 0:
            for (k, m, d) in tune_:
                if t + k * e < t1: place(music, _whistle(m, d * e * .95, .9), t + k * e, g)
        t += 8 * e; bar += 1

# 1970s space synth: analog sequencer arpeggio, warm pad, soft kick (calm wonder; tense=True for a minor, faster drive)
def _analog(m, dur=.2, g=1.0, cut=2200):
    n = int(dur * SR); t = T(n); f = midi(m)
    ph = np.cumsum(np.full(n, f)) / SR; x = (2 * (ph % 1) - 1) + .5 * (2 * ((ph * 1.007) % 1) - 1)
    x = lp(x, cut) * np.minimum(1, t / .004) * np.exp(-t * 9)
    return x * .16 * g
def _pad(ms, dur, g=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for m in ms:
        for d in (-.003, .004):
            ph = np.cumsum(np.full(n, midi(m) * (1 + d))) / SR; x += np.sign(np.sin(2 * np.pi * ph)) * .5 + (2 * (ph % 1) - 1) * .5
    x = lp(x / (len(ms) * 2), 900) * (.85 + .15 * np.sin(2 * np.pi * .25 * t))
    return x * np.minimum(1, t / .8) * np.minimum(1, (dur - t) / .8) * g
def cosmos(t0, t1, g=1.0, bpm=96, tense=False):
    s16 = 60 / bpm / 4; t = t0; bar = 0
    prog = [(45, (57, 60, 64, 69)), (41, (57, 60, 65, 69)), (43, (55, 59, 62, 67)), (40, (55, 59, 64, 67))] if tense else \
           [(38, (62, 66, 69, 74)), (43, (62, 67, 71, 74)), (40, (59, 64, 67, 71)), (45, (61, 64, 69, 73))]
    while t < t1 - .05:
        root, ch = prog[bar % 4]; L = min(16 * s16, t1 - t)
        if L > .3: place(music, _pad(ch[:3], L, .5), t, g)
        place(music, pizz(root - 12, 1.2, .8), t, g)
        for k in range(16):
            tk = t + k * s16
            if tk >= t1: break
            m = ch[[0, 1, 2, 3, 2, 1][k % 6]] + (12 if k % 8 >= 6 else 0)
            place(music, _analog(m, s16 * 1.8, .8, 1600 + 900 * np.sin(k / 16 * np.pi)), tk, g)
            if tense and k % 4 == 0: place(music, thud(55, .2, .3), tk, g)
            if not tense and k % 8 == 0: place(music, thud(60, .25, .18), tk, g)
        t += 16 * s16; bar += 1

# spooky Victorian parlour: harpsichord broken chords in D minor, celesta tune, low bell (morbid but playful)
def _harpsi(m, dur=.35, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    x = sum(a * np.sin(2 * np.pi * f * k * t) * np.exp(-t * (5 + 3 * k)) for k, a in ((1, 1), (2, .8), (3, .6), (4, .45), (5, .3), (6, .2)))
    x += hp(rng.standard_normal(n), 4000) * np.exp(-t * 300) * .25
    return x * np.minimum(1, t / .001) * .14 * g
def _celesta(m, dur=.8, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    return (np.sin(2 * np.pi * f * t) + .25 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 10)) * np.exp(-t * 4) * np.minimum(1, t / .002) * .22 * g
def spooky(t0, t1, g=1.0, bpm=100, tune=True):
    e = 60 / bpm / 2; t = t0; bar = 0
    prog = [(38, (62, 65, 69)), (37, (61, 64, 69)), (34, (58, 62, 65)), (33, (57, 61, 64))]   # Dm A/C# Bb A
    tune_ = [(0, 74), (2, 77), (3, 76), (4, 74), (6, 73), (8, 74), (10, 81), (12, 79), (13, 77), (14, 76)]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        place(music, pizz(root - 12, .9, .9), t, g); place(music, pizz(root - 5, .6, .6), t + 4 * e, g)
        for k in range(8):
            tk = t + k * e
            if tk < t1: place(music, _harpsi(ch[[0, 1, 2, 1][k % 4]] + (12 if k >= 4 else 0), .4, .8), tk, g)
        if tune and bar % 2 == 0:
            for (k, m) in tune_:
                if t + k * e < t1: place(music, _celesta(m, .8, .9), t + k * e, g)
        if bar % 4 == 0: place(music, thud(45, .6, .25), t, g)
        t += 8 * e; bar += 1

# Italian tarantella: mandolin tremolo melody, accordion off-beat chords, 6/8 bounce (A minor / E)
def _mando(m, dur=.3, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    x = np.zeros(n)
    for r in range(max(1, int(dur / .045))):
        i = int(r * .045 * SR); L = n - i; tt = T(L)
        x[i:] += (np.sin(2 * np.pi * f * tt) + .5 * np.sin(4 * np.pi * f * tt) + .3 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt * 30) * (.8 if r % 2 else 1)
    return x * .1 * g
def _accord(ms, dur=.18, g=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for m in ms:
        for d in (-.004, .004):
            ph = np.cumsum(np.full(n, midi(m) * (1 + d))) / SR; x += np.sign(np.sin(2 * np.pi * ph)) * .6 + (2 * (ph % 1) - 1) * .4
    x = lp(x / (len(ms) * 2), 2400)
    return x * np.minimum(1, t / .01) * np.minimum(1, (dur - t) / .03) * .09 * g
def tarantella(t0, t1, g=1.0, bpm=132, tune=True):
    e = 60 / bpm / 2; t = t0; bar = 0
    prog = [(45, (57, 60, 64)), (45, (57, 60, 64)), (40, (56, 59, 64)), (45, (57, 60, 64)), (50, (57, 62, 65)), (45, (57, 60, 64)), (40, (56, 59, 62)), (45, (57, 60, 64))]
    tune_ = [76, 76, 77, 76, 74, 72, 71, 72, 74, 72, 71, 69]
    while t < t1 - .05:
        root, ch = prog[bar % 8]
        for k in range(6):
            tk = t + k * e
            if tk >= t1: break
            if k == 0: place(music, pizz(root - 12, .3, .9), tk, g)
            if k == 3: place(music, pizz(root - 5, .3, .7), tk, g)
            if k in (1, 2, 4, 5): place(music, _accord(ch, e * .8, .8), tk, g)
            if k in (0, 3): place(music, _hat(.15), tk, g)
            if tune: place(music, _mando(tune_[(bar * 6 + k) % 12] + (0 if bar % 8 < 4 else -2), e * .95, .9), tk, g)
        t += 6 * e; bar += 1

# funky lab: clavinet riff, slap-ish bass, bleeps, tight drums (science humour)
def _clav(m, dur=.14, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m); ph = (f * t) % 1
    x = bp(np.where(ph < .25, 1.0, -.33), 300, 3500)
    return x * np.minimum(1, t / .002) * np.exp(-t * 14) * .16 * g
def _bleep(m, dur=.08, g=1.0):
    n = int(dur * SR); t = T(n); return np.sign(np.sin(2 * np.pi * midi(m) * t)) * np.minimum(1, (dur - t) / .01) * .05 * g
def labfunk(t0, t1, g=1.0, bpm=104, tune=True):
    s16 = 60 / bpm / 4; t = t0; bar = 0
    prog = [(40, (64, 67, 71)), (40, (64, 67, 71)), (45, (64, 69, 72)), (43, (62, 67, 71))]
    clv = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0]
    bass = [(0, 0), (3, 0), (6, 12), (8, 0), (10, 7), (14, 10)]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(16):
            tk = t + k * s16
            if tk >= t1: break
            if clv[k]: place(music, _clav(ch[k % 3] + (12 if k % 5 == 0 else 0), s16 * 1.5, .9), tk, g)
            if k % 2 == 0: place(music, _hat(.25), tk, g)
            if k in (0, 10): place(music, thud(60, .2, .35), tk, g)
            if k in (4, 12): place(music, _snare(.35), tk, g)
        for (k, o) in bass:
            if t + k * s16 < t1: place(music, pizz(root - 12 + o, .25, 1.0), t + k * s16, g)
        if tune and bar % 2 == 1:
            for k, m in enumerate([88, 91, 86, 83]):
                place(music, _bleep(m, .07, .8), t + (12 + k) * s16, g)
        t += 16 * s16; bar += 1

# British ceremonial: brass fanfare chords, timpani rolls, snare (Tower of London pomp; minor=True for a mystery tint)
def _brass(m, dur=.4, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .003 * np.sin(2 * np.pi * 5 * t))
    ph = np.cumsum(f) / SR; x = 2 * (ph % 1) - 1
    cut = 800 + 2200 * np.minimum(1, t / .08); x = lp(x, 2600) * (.6 + .4 * np.minimum(1, t / .05))
    return x * np.minimum(1, t / .03) * np.minimum(1, (dur - t) / .06) * .14 * g
def _timp(f=55, g=1.0): n = int(.7 * SR); t = T(n); return (np.sin(2 * np.pi * f * t) * np.exp(-t * 5) + lp(rng.standard_normal(n), 400) * np.exp(-t * 30) * .3) * .5 * g
def pomp(t0, t1, g=1.0, bpm=96, minor=False):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(45, (57, 60, 64)), (41, (57, 60, 65)), (43, (55, 59, 62)), (40, (56, 59, 64))] if minor else \
           [(48, (60, 64, 67)), (41, (60, 65, 69)), (43, (59, 62, 67)), (48, (60, 64, 67))]
    fan = [(0, 0, 1.5), (1.5, 1, .5), (2, 2, 1), (3, 1, .5), (3.5, 0, .5)]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for (b, i, d) in fan:
            if t + b * q < t1: place(music, _brass(ch[i] + 12, d * q * .95, .9), t + b * q, g)
        for m in ch:
            if t < t1: place(music, _brass(m, min(4 * q, t1 - t) * .95, .45), t, g)
        place(music, _timp(midi(root - 12), .9), t, g); place(music, _timp(midi(root - 5), .6), t + 2 * q, g)
        for k in range(8): place(music, _snare(.12 if k % 2 else .2), t + k * q / 2, g)
        t += 4 * q; bar += 1

# Venetian barcarolle: rocking 6/8 harp arpeggios, string pad, singing oboe line
def _harp(m, dur=.9, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    return (np.sin(2 * np.pi * f * t) + .4 * np.sin(4 * np.pi * f * t) * np.exp(-t * 6) + .15 * np.sin(6 * np.pi * f * t) * np.exp(-t * 10)) * np.exp(-t * 3) * np.minimum(1, t / .002) * .16 * g
def _oboe(m, dur=.5, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .005 * np.sin(2 * np.pi * 5.5 * t) * np.minimum(1, t / .2))
    ph = np.cumsum(f) / SR; x = bp(np.sign(np.sin(2 * np.pi * ph)) * .5 + (2 * (ph % 1) - 1) * .5, 500, 3000)
    return x * np.minimum(1, t / .05) * np.minimum(1, (dur - t) / .08) * .1 * g
def barcarolle(t0, t1, g=1.0, bpm=60, tune=True, minor=False):
    e = 60 / bpm / 3; t = t0; bar = 0
    prog = [(45, (57, 60, 64)), (50, (57, 62, 65)), (40, (56, 59, 64)), (45, (57, 60, 64))] if minor else \
           [(43, (59, 62, 67)), (48, (60, 64, 67)), (50, (62, 66, 69)), (43, (59, 62, 67))]
    tune_ = [(0, 74, 2), (2, 76, 1), (3, 74, 2), (5, 71, 1), (6, 72, 3), (9, 74, 2), (11, 71, 1)]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(12):
            tk = t + k * e
            if tk >= t1: break
            if k % 6 == 0: place(music, pizz(root - 12, .8, .7), tk, g)
            place(music, _harp([ch[0], ch[1], ch[2], ch[1] + 12, ch[2], ch[1]][k % 6], 1.0, .8), tk, g)
        L = min(12 * e, t1 - t)
        if L > .5: place(music, strings([m - 12 for m in ch], L, .35), t, g)
        if tune and bar % 2 == 0:
            for (k, m, d) in tune_:
                if t + k * e < t1: place(music, _oboe(m - (2 if minor and m % 12 == 11 else 0), d * e * .95, .9), t + k * e, g)
        t += 12 * e; bar += 1

# Parisian musette: accordion waltz with bass-chord-chord, bright melody in thirds
def musette(t0, t1, g=1.0, bpm=168, tune=True):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(41, (65, 69, 72)), (48, (64, 67, 70)), (48, (64, 67, 70)), (41, (65, 69, 72)), (46, (65, 70, 74)), (41, (65, 69, 72)), (48, (64, 67, 70)), (41, (65, 69, 72))]
    mel = [77, 76, 77, 79, 77, 76, 74, 72, 74, 76, 77, 79, 81, 79, 77, 76, 74, 76, 77, 76, 74, 72, 70, 69]
    while t < t1 - .05:
        root, ch = prog[bar % 8]
        place(music, pizz(root - 12, .4, .9), t, g)
        for b in (1, 2):
            if t + b * q < t1: place(music, _accord(ch, q * .7, .8), t + b * q, g)
        if tune:
            for b in range(3):
                if t + b * q < t1:
                    m = mel[(bar * 3 + b) % 24]; place(music, _accord([m, m - 4], q * .9, .9), t + b * q, g)
        t += 3 * q; bar += 1

# comic military: oompah tuba, snare rolls, cheeky piccolo (Emu War)
def _tuba(m, dur=.3, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m); ph = np.cumsum(np.full(n, f)) / SR
    x = lp(np.sign(np.sin(2 * np.pi * ph)) * .5 + np.sin(2 * np.pi * ph), 700)
    return x * np.minimum(1, t / .02) * np.exp(-t * 4) * .3 * g
def warpath(t0, t1, g=1.0, bpm=120, tune=True, sad=False):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(38, 45), (43, 50), (45, 52), (38, 45)] if not sad else [(38, 45), (36, 43), (34, 41), (33, 40)]
    pic = [74, 76, 78, 79, 81, 79, 78, 76, 74, 74, 81, 81, 79, 78, 76, 74] if not sad else [74, 72, 70, 69, 70, 69, 67, 65, 64, 64, 65, 67, 69, 67, 65, 64]
    while t < t1 - .05:
        a, b = prog[bar % 4]
        for k in range(4):
            tk = t + k * q
            if tk >= t1: break
            place(music, _tuba(a - 12 if k % 2 == 0 else b - 12, q * .8, 1.0), tk, g)
            place(music, _snare(.25 if k % 2 else .15), tk, g); place(music, _snare(.1), tk + q / 2, g)
            if tune:
                for h in range(2): place(music, _fife(pic[(bar * 8 + k * 2 + h) % 16] + 12, q * .45, .8), tk + h * q / 2, g)
        if bar % 4 == 3:
            for r in range(6): place(music, _snare(.12 + r * .03), t + 3 * q + r * q / 6, g)
        t += 4 * q; bar += 1

# 1940s boogie-woogie: walking piano left hand, bluesy right-hand riffs, brushed swing drums (Mike)
def boogie(t0, t1, g=1.0, bpm=150, tune=True):
    q = 60 / bpm; e1, e2 = q * .66, q * .34; t = t0; bar = 0
    roots = [43, 43, 48, 43, 50, 48, 43, 50]
    walk = [0, 4, 7, 9, 10, 9, 7, 4]
    riff = [(0, 79), (1, 82), (1.5, 79), (2, 77), (3, 74)]
    while t < t1 - .05:
        r = roots[bar % 8]
        for k in range(8):
            tk = t + (k // 2) * q + (e1 if k % 2 else 0)
            if tk >= t1: break
            place(music, _piano(r - 12 + walk[k], .3, .8), tk, g)
            if k % 2 == 0: place(music, _hat(.2), tk, g)
        for b in (1, 3):
            if t + b * q < t1: place(music, _snare(.12), t + b * q, g)
        if tune and bar % 2 == 0:
            for (b, m) in riff:
                if t + b * q < t1: place(music, _piano(m + (r - 43), .35, .7), t + b * q, g); place(music, _piano(m + (r - 43) - 3, .35, .5), t + b * q, g)
        t += 4 * q; bar += 1

# doomsday clockwork: tick-tock percussion, pulsing bass ostinato, staccato strings, rising tension
def _tock(f=1800, g=1.0): n = int(.05 * SR); t = T(n); return (np.sin(2 * np.pi * f * t) * np.exp(-t * 120) + hp(rng.standard_normal(n), 3000) * np.exp(-t * 200) * .4) * .4 * g
def _stacc(ms, dur=.12, g=1.0):
    n = int(dur * SR); t = T(n); x = np.zeros(n)
    for m in ms:
        ph = np.cumsum(np.full(n, midi(m))) / SR; x += 2 * (ph % 1) - 1
    return lp(x / len(ms), 2200) * np.minimum(1, t / .005) * np.exp(-t * 18) * .18 * g
def clockwork(t0, t1, g=1.0, bpm=112, calm=False):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(40, (64, 67, 71)), (40, (64, 67, 71)), (36, (64, 67, 72)), (38, (62, 66, 69))] if not calm else [(48, (60, 64, 67)), (43, (59, 62, 67)), (45, (60, 64, 69)), (41, (60, 65, 69))]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(8):
            tk = t + k * q / 2
            if tk >= t1: break
            place(music, _tock(1800 if k % 2 == 0 else 1300, .9), tk, g)
            place(music, pizz(root - 12 + (7 if k % 4 == 2 else 0), .2, .8), tk, g)
            if not calm and k in (0, 3, 6): place(music, _stacc(ch, .14, .9), tk, g)
            if calm and k in (0, 4): place(music, _vibes(ch[k // 4 % 3] + 12, 1.2, .7), tk, g)
        if not calm and bar % 4 == 3: place(music, thud(50, .5, .4), t + 3 * q, g)
        t += 4 * q; bar += 1

# starlight: music-box melody over a shimmering pad and a slow heartbeat pulse (wonder in space)
def _musicbox(m, dur=1.0, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    return (np.sin(2 * np.pi * f * t) + .4 * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t * 6) + .2 * np.sin(2 * np.pi * f * 5.2 * t) * np.exp(-t * 12)) * np.exp(-t * 3.5) * np.minimum(1, t / .002) * .16 * g
def starlight(t0, t1, g=1.0, bpm=84, tense=False):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(45, (57, 60, 64)), (41, (57, 60, 65)), (43, (55, 59, 62)), (40, (55, 59, 64))] if tense else [(43, (59, 62, 67)), (40, (59, 64, 67)), (36, (60, 64, 67)), (38, (57, 62, 66))]
    mel = [79, 83, 86, 83, 81, 79, 76, 79] if not tense else [76, 79, 81, 79, 77, 76, 72, 76]
    while t < t1 - .05:
        root, ch = prog[bar % 4]; L = min(4 * q, t1 - t)
        if L > .4: place(music, _pad(ch, L, .45), t, g)
        place(music, pizz(root - 12, 1.0, .7), t, g)
        for k in range(8):
            tk = t + k * q / 2
            if tk < t1: place(music, _musicbox(mel[(bar * 2 + k) % 8] if k % 2 == 0 else ch[k % 3] + 12, .9, .8), tk, g)
        if tense:
            for k in range(4): place(music, thud(55, .2, .3), t + k * q, g)
        t += 4 * q; bar += 1

# polka fizz: oom-pah bass, accordion off-beats, bouncy clarinet line (Fanta)
def _clarinet(m, dur=.2, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .004 * np.sin(2 * np.pi * 5.5 * t)); ph = np.cumsum(f) / SR
    x = np.sin(2 * np.pi * ph) + .45 * np.sin(6 * np.pi * ph) + .2 * np.sin(10 * np.pi * ph)
    return lp(x, 3000) * np.minimum(1, t / .015) * np.minimum(1, (dur - t) / .03) * .13 * g
def polka(t0, t1, g=1.0, bpm=132, tune=True):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(41, (65, 69, 72)), (48, (64, 67, 70)), (48, (64, 67, 70)), (41, (65, 69, 72))]
    mel = [72, 74, 76, 77, 79, 77, 76, 74, 72, 76, 79, 84, 82, 79, 76, 72]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(4):
            tk = t + k * q / 2
            if tk >= t1: break
            if k % 2 == 0: place(music, pizz(root - 12 + (7 if k == 2 else 0), .25, 1.0), tk, g)
            else: place(music, _accord(ch, q * .35, .9), tk, g)
            if tune: place(music, _clarinet(mel[(bar * 4 + k) % 16], q * .45, .9), tk, g)
        place(music, _snare(.12), t + q / 2, g); place(music, _snare(.12), t + 3 * q / 2, g)
        t += 2 * q; bar += 1

# spy noir: walking bass, brushed swing, muted-trumpet stabs, minor (Nobel medals)
def _mute(m, dur=.3, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .006 * np.sin(2 * np.pi * 6 * t)); ph = np.cumsum(f) / SR
    x = bp(2 * (ph % 1) - 1, 600, 2400) * (.6 + .4 * np.minimum(1, t / .06))
    return x * np.minimum(1, t / .02) * np.minimum(1, (dur - t) / .05) * .16 * g
def noir(t0, t1, g=1.0, bpm=96, tune=True):
    q = 60 / bpm; t = t0; bar = 0
    walk = [[38, 41, 43, 44], [45, 44, 43, 41], [38, 41, 43, 45], [46, 45, 44, 43]]
    stab = [(0, 74), (1.5, 77), (2.5, 76), (3, 74)]
    while t < t1 - .05:
        w = walk[bar % 4]
        for k in range(4):
            tk = t + k * q
            if tk >= t1: break
            place(music, pizz(w[k] - 12, q * .9, 1.0), tk, g); place(music, _hat(.2), tk + q * .66, g)
            if k % 2: place(music, _snare(.08), tk, g)
        if tune and bar % 2 == 1:
            for (b, m) in stab:
                if t + b * q < t1: place(music, _mute(m - 12, q * .6, .9), t + b * q, g)
        t += 4 * q; bar += 1

# balalaika: tremolo-plucked minor folk tune that speeds up (beard tax)
def _bala(m, dur=.25, g=1.0):
    n = int(dur * SR); x = np.zeros(n)
    for r in range(max(1, int(dur / .055))):
        i = int(r * .055 * SR); L = n - i; tt = T(L); f = midi(m)
        x[i:] += (np.sin(2 * np.pi * f * tt) + .6 * np.sin(4 * np.pi * f * tt) + .3 * np.sin(6 * np.pi * f * tt)) * np.exp(-tt * 22)
    return x * .07 * g
def balalaika(t0, t1, g=1.0, bpm=120, tune=True):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(45, (57, 60, 64)), (40, (56, 59, 64)), (45, (57, 60, 64)), (40, (56, 59, 64)), (50, (57, 62, 65)), (45, (57, 60, 64)), (40, (56, 59, 64)), (45, (57, 60, 64))]
    mel = [76, 74, 72, 71, 72, 74, 76, 76, 77, 76, 74, 72, 71, 69, 71, 72]
    while t < t1 - .05:
        root, ch = prog[bar % 8]
        for k in range(4):
            tk = t + k * q / 2
            if tk >= t1: break
            if k % 2 == 0: place(music, pizz(root - 12, .25, 1.0), tk, g)
            else: place(music, _bala(ch[0] + 12, q * .4, .6), tk, g); place(music, _bala(ch[2], q * .4, .5), tk, g)
            if tune: place(music, _bala(mel[(bar * 4 + k) % 16], q * .48, 1.0), tk, g)
        place(music, _snare(.1), t + q, g)
        t += 2 * q; bar += 1

# toy-box lullaby: toy piano waltz with glockenspiel sparkles (teddy bear)
def _toypiano(m, dur=.6, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m)
    x = np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 3.9 * t) * np.exp(-t * 14) + .3 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t * 6)
    return x * np.exp(-t * 5) * np.minimum(1, t / .002) * .16 * g
def lullaby(t0, t1, g=1.0, bpm=138, tune=True):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(48, (64, 67, 72)), (43, (62, 67, 71)), (45, (64, 69, 72)), (41, (65, 69, 72))]
    mel = [76, 79, 81, 79, 76, 74, 72, 74, 76, 77, 76, 72]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        place(music, pizz(root - 12, .5, .8), t, g)
        for b in (1, 2):
            if t + b * q < t1: place(music, _toypiano(ch[b], q * .9, .6), t + b * q, g)
        if tune:
            for b in range(3):
                if t + b * q < t1: place(music, _toypiano(mel[(bar * 3 + b) % 12], q * 1.5, 1.0), t + b * q, g)
        if bar % 2 == 1: place(music, glock(ch[2] + 12, 1.0, .25), t + 2 * q, g)
        t += 3 * q; bar += 1

# medicine show: honky-tonk piano, jug bass, washboard (ketchup as medicine)
def _jug(m, dur=.3, g=1.0):
    n = int(dur * SR); t = T(n); f = midi(m) * (1 + .03 * np.exp(-t * 20))
    return lp(np.sin(2 * np.pi * np.cumsum(np.full(n, f)) / SR) + .3 * bp(rng.standard_normal(n), 80, 400), 500) * np.minimum(1, t / .02) * np.exp(-t * 5) * .35 * g
def medshow(t0, t1, g=1.0, bpm=126, tune=True):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(43, (59, 62, 67)), (43, (59, 62, 67)), (48, (60, 64, 67)), (50, (62, 66, 69))]
    mel = [79, 81, 83, 79, 76, 79, 74, 76, 79, 81, 83, 86, 83, 81, 79, 76]
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        for k in range(4):
            tk = t + k * q
            if tk >= t1: break
            place(music, _jug(root - 12 + (7 if k % 2 else 0), q * .8, 1.0), tk, g)
            for m in ch: place(music, _piano(m + (0.15 if False else 0), q * .4, .35), tk + q / 2, g)
            place(music, hp(rng.standard_normal(int(.05 * SR)), 3000) * .15, tk + q * .5, g); place(music, hp(rng.standard_normal(int(.05 * SR)), 3000) * .1, tk + q * .75, g)
            if tune:
                for h in range(2): place(music, _piano(mel[(bar * 8 + k * 2 + h) % 16], q * .45, .7), tk + h * q / 2, g)
        t += 4 * q; bar += 1

# baroque minuet: harpsichord in 3/4, bright major, elegant (pineapple parties)
def minuet(t0, t1, g=1.0, bpm=132, tune=True):
    q = 60 / bpm; t = t0; bar = 0
    prog = [(50, (62, 66, 69)), (45, (61, 64, 69)), (47, (62, 66, 71)), (45, (61, 64, 69)), (43, (62, 67, 71)), (50, (62, 66, 69)), (45, (61, 64, 69)), (50, (62, 66, 69))]
    mel = [74, 76, 78, 79, 78, 76, 74, 73, 71, 73, 74, 76, 78, 79, 81, 79, 78, 76, 74, 76, 73, 74, 74, 74]
    while t < t1 - .05:
        root, ch = prog[bar % 8]
        place(music, _harpsi(root - 12, q * 1.5, .9), t, g)
        for b in (1, 2):
            if t + b * q < t1: place(music, _harpsi(ch[b - 1], q * .8, .5), t + b * q, g)
        if tune:
            for b in range(3):
                if t + b * q < t1: place(music, _harpsi(mel[(bar * 3 + b) % 24] + 12, q * .9, .9), t + b * q, g)
        t += 3 * q; bar += 1
