def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def gallop(dur, rate=3.2):
    n = int(dur * SR); out = np.zeros(n); i = 0.0
    while i < dur:
        for d in (0, .06, .14):
            p = int((i + d) * SR); h = thud(110, .08, .7)
            if p + len(h) < n: out[p:p + len(h)] += h
        i += 1 / rate
    return out * np.minimum(1, T(n) / .3) * np.minimum(1, (dur - T(n)) / .3)
def bugle(): return sum(chime(f, .5)[:int(.5 * SR)] for f in [523, 659, 784]) * .5
def beep(): return np.sin(2 * np.pi * 1000 * T(int(.12 * SR))) * .3
def flat(dur): n = int(dur * SR); return np.sin(2 * np.pi * 1000 * T(n)) * .25 * np.minimum(1, (dur - T(n)) / .3)
def heartbeat(): return thud(55, .2, 1.0)
place(sfx, gallop(4.2), 0, .5); place(sfx, crowd(4.0), .2, .4)
place(sfx, boing(160, .5), wt(1, 'never'), .3)
place(sfx, bugle(), wt(2, 'big'), .4); place(sfx, sparkle_sfx(), wt(2, 'sweet'), .4)
place(sfx, chime(1760, .5), wt(3, '20'), .35)
place(sfx, boing(120, .6), wt(4, 'lost'), .3)
place(sfx, gallop(3.6), S(5), .6); place(sfx, crowd(3.6), S(5), .4); place(sfx, whoosh(.4), wt(5, 'flying'), .4)
for k in range(4):
    place(sfx, heartbeat(), S(6) + k * .55, .6); place(sfx, beep(), S(6) + k * .55, .5)
place(sfx, flat(1.6), wt(6, 'attack'), .5)
place(sfx, gallop(4.0), S(7), .5)
place(sfx, gallop(4.5), S(8), .6); place(sfx, whoosh(.4), wt(8, 'jump'), .4); place(sfx, whoosh(.4), wt(8, 'jump', 1) if False else wt(8, 'after'), .4)
place(sfx, crowd(2.5), S(9), .8); place(sfx, gallop(1.6), S(9), .6); place(sfx, stampfx(), wt(9, 'first'), .6)
place(sfx, crowd(1.5), S(10), .4); place(sfx, hit(), wt(10, 'dead'), .6)
place(sfx, chime(440, 2.0), wt(11, 'buried'), .3); place(sfx, stampfx(), wt(11, 'sweet') - .2, .5)
