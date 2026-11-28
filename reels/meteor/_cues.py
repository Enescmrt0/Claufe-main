def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def snore(): n = int(1.0 * SR); t = T(n); return lp(rng.standard_normal(n), 300) * np.sin(np.pi * t) * .5
def fall(dur=1.0): n = int(dur * SR); t = T(n); f = 1800 - 1400 * t / dur; return np.sin(2 * np.pi * np.cumsum(f) / SR) * .2 * np.minimum(1, t / .1)
def crash(): n = int(.8 * SR); t = T(n); return (hp(rng.standard_normal(n), 800) * np.exp(-t * 6) * .6 + thud(60, .8, 1.2)[:n] * .6)
def clang(): return chime(620, .6) * .5 + chime(930, .6) * .3
def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
def coinfx(): return chime(2400, .4) * .5
place(sfx, snore(), .5, .4); place(sfx, snore(), 1.8, .4); place(sfx, fall(.5), wt(0, 'hit') - .5, .6); place(sfx, crash(), wt(0, 'hit'), .9)
place(sfx, fall(2.0), wt(2, 'saw') - .4, .5); place(sfx, crowd(2.0), wt(2, 'saw'), .4)
place(sfx, fall(.5), wt(3, 'crashed') - .5, .6); place(sfx, crash(), wt(3, 'crashed'), 1.0)
place(sfx, clang(), wt(4, 'bounced'), .6); place(sfx, hit(), wt(4, 'slammed') + .2, .7)
place(sfx, boing(160, .5), wt(5, 'pineapple'), .4)
place(sfx, stampfx(), wt(6, 'first'), .5); place(sfx, sparkle_sfx(), wt(6, 'confirmed'), .4)
place(sfx, thud(90, .3), wt(7, 'took'), .4)
place(sfx, crowd(2.0), wt(8, 'hers') - .3, .3)
place(sfx, crowd(2.5), S(9), .5)
for k in range(4):
    place(sfx, coinfx(), wt(9, '500') + k * .12, .4)
place(sfx, snore(), wt(10, 'nobody'), .3)
place(sfx, sparkle_sfx(), wt(11, 'museum'), .5)
