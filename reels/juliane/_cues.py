def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def wind(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 250, 1400) * (.6 + .4 * np.sin(2 * np.pi * .4 * t)) * np.minimum(1, t / .4) * np.minimum(1, (dur - t) / .5) * .6
def rain(dur): n = int(dur * SR); t = T(n); return hp(rng.standard_normal(n), 2500) * .25 * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5)
def thunder(): n = int(2.5 * SR); t = T(n); return lp(rng.standard_normal(n), 200) * np.exp(-t * 1.5) * 2.0 * .5
def engine(dur): n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * 95 * t) * .5 + lp(rng.standard_normal(n), 300) * .5) * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5) * .4
def leaves(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * (rng.random(n) > .7) * np.minimum(1, (dur - t) / .3) * .5
def birds(dur):
    n = int(dur * SR); out = np.zeros(n)
    for k in range(int(dur * 2)):
        p = int(rng.random() * (n - SR // 2)); c = chime(2200 + rng.random() * 1400, .25)[:SR // 4]; out[p:p + len(c)] += c * .3
    return out
def water(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 400, 2500) * (.6 + .4 * np.sin(2 * np.pi * 1.2 * t)) * np.minimum(1, t / .4) * np.minimum(1, (dur - t) / .4) * .4
def splash(): n = int(.6 * SR); t = T(n); return bp(rng.standard_normal(n), 400, 5000) * np.exp(-t * 7) * .6
place(sfx, wind(5.0), 0, .5)
place(sfx, engine(5.0), wt(1, 'boarded'), .5); place(sfx, chime(1320, .8), S(1) + .2, .2)
place(sfx, engine(3.5), S(2), .5); place(sfx, rain(3.5), S(2), .6); place(sfx, thunder(), S(2) + 1.0, .5)
place(sfx, thunder(), wt(3, 'hit') - .05, 1.0); place(sfx, hit(), wt(3, 'broke'), .8)
place(sfx, wind(3.8), S(4), .9)
place(sfx, leaves(1.4), S(5), .7); place(sfx, hit(), S(5) + 1.3, .5); place(sfx, birds(3.0), wt(5, 'woke'), .5)
place(sfx, birds(4.0), S(6), .3)
place(sfx, chime(880, 1.2), wt(7, 'rule'), .3)
place(sfx, water(3.0), S(8), .5); place(sfx, birds(3.0), S(8), .3)
place(sfx, water(4.6), S(9), .5)
for k in range(4):
    place(sfx, splash(), wt(9, 'waded') + k * .6, .3)
place(sfx, boing(90, .5), wt(9, 'crocodiles'), .3)
place(sfx, water(3.0), S(10), .4); place(sfx, sparkle_sfx(), wt(10, 'loggers'), .5)
place(sfx, chime(440, 2.0), S(11), .35); place(sfx, chime(660, 2.0), wt(11, 'only'), .35); place(sfx, birds(3.0), wt(11, 'and'), .4)
