def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def hiss(dur=.8): n = int(dur * SR); t = T(n); return hp(rng.standard_normal(n), 3000) * np.minimum(1, t / .05) * np.exp(-t * 2) * .4
def engine(dur): n = int(dur * SR); t = T(n); return lp(np.sign(np.sin(2 * np.pi * 36 * t)), 300) * .25 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def clank(): return clang(420, .5) * .5
def morse(dur, f=760): n = int(dur * SR); t = T(n); gate = (np.sin(2 * np.pi * 5 * t) + .3 * np.sin(2 * np.pi * 1.9 * t)) > .2; return np.sin(2 * np.pi * f * t) * gate * .22
def chatter(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2400) * (.6 + .4 * np.sin(2 * np.pi * 4 * t)) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3) * .4
def bell(): return chime(2400, .6) * .5 + chime(3000, .6) * .3
def strain(): n = int(.8 * SR); t = T(n); f = 180 + 60 * t; return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)), 200, 1500) * np.sin(np.pi * t / .8) * .3
for k in range(4): place(sfx, hiss(.4), wt(0, 'balloons') + k * .18, .5)
place(sfx, engine(1.0), wt(0, 'speakers'), .5); place(sfx, pop(900), wt(0, 'paint'), .4)
place(sfx, hit(), wt(1, 'ghost') - .1, .5); place(sfx, sparkle_sfx(), wt(1, 'artists'), .4)
place(sfx, boing(260, .4), wt(2, 'pretend'), .35)
for w in ('tanks', 'trucks', 'cannons'): place(sfx, hiss(.7), wt(3, w) - .2, .5)
place(sfx, engine(1.6), wt(3, 'that'), .3)
place(sfx, engine(3.0), S(4), .6)
for k in range(5): place(sfx, clank(), wt(4, 'recordings') + k * .4, .4)
place(sfx, morse(1.6), S(5) + .1, .55); place(sfx, chatter(2.2), wt(5, 'and'), .5); place(sfx, bell(), wt(5, 'french'), .3)
for k in range(2): place(sfx, bell(), wt(6, 'cyclists') + k * .25, .35)
place(sfx, strain(), wt(6, 'lift') - .1, .6); place(sfx, boing(300, .5), wt(6, 'strong') - .2, .35)
for k in range(10): place(sfx, pop(600 + k * 40), wt(7, '20') - .2 + k * .08, .25)
place(sfx, whoosh(1.0), wt(7, 'pulling'), .4)
place(sfx, chime(1320, 1.0), wt(8, 'thousands'), .3)
place(sfx, hit(), wt(9, 'secret'), .3); place(sfx, sparkle_sfx(), wt(9, 'gold'), .5); place(sfx, chime(1760, 1.2), wt(9, 'medal'), .35)
