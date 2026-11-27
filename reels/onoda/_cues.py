def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def jungleAmb(dur): n = int(dur * SR); t = T(n); x = bp(rng.standard_normal(n), 2000, 6000) * (.5 + .5 * np.sin(2 * np.pi * 7 * t) ** 2) * .08 + lp(rng.standard_normal(n), 500) * .08; return x * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5)
def bird(): n = int(.25 * SR); t = T(n); f = 2600 + 900 * np.sin(2 * np.pi * 14 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .25) * .15
def planefx(dur): n = int(dur * SR); t = T(n); return lp(np.sign(np.sin(2 * np.pi * 60 * t)), 400) * .18 * np.sin(np.pi * t / dur)
def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
place(sfx, jungleAmb(S(2)), 0, .7); place(sfx, hit(), 0, .5)
for k in range(3): place(sfx, bird(), 1.0 + k * 1.7, .4)
place(sfx, stampfx(), wt(1, 'never') - .05, .6)
place(sfx, chime(1320, 1.0), wt(2, 'ended') - .2, .3)
place(sfx, jungleAmb(S(6) - S(2)), S(2), .6)
place(sfx, planefx(2.5), S(3), .6)
for k in range(5): place(sfx, paper(), S(3) + 1 + k * .2, .3)
place(sfx, stampfx(), wt(3, 'enemy') - .05, .5)
place(sfx, hit(), wt(4, 'killed') - .1, .4)
place(sfx, hit(), S(6), .5)
place(sfx, pop(700), wt(6, 'panda') - .1, .4); place(sfx, boing(160, .5), wt(6, 'yeti') - .1, .4)
place(sfx, sparkle_sfx(), wt(7, 'found'), .4); place(sfx, stampfx(), wt(8, 'refused') - .05, .5)
place(sfx, planefx(2.2), S(9), .5); place(sfx, planefx(2.0), S(10), .5)
place(sfx, jungleAmb(S(12) - S(10)), S(10), .6)
place(sfx, chime(880, 1.6), wt(10, 'war', 1) - .1, .35); place(sfx, clang(700, .8), wt(11, 'sword') - .1, .3)
