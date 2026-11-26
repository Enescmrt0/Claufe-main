def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def shot(): n = int(.4 * SR); t = T(n); return hp(rng.standard_normal(n), 600) * np.exp(-t * 18) * .9 + thud(80, .4, .6)[:n]
def bigboom(): n = int(1.8 * SR); t = T(n); return lp(rng.standard_normal(n), 300) * np.exp(-t * 2.5) * 1.5 + thud(40, 1.8, 1.4)[:n]
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2200) * np.minimum(1, t / .4) * np.minimum(1, (dur - t) / .4) * .5
def jeer(): return crowd(1.5) + boing(120, .5)[:int(1.5 * SR)] if False else crowd(1.5)
def ropefx(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 800, 3000) * (.5 + .5 * np.sin(2 * np.pi * 3 * t)) * .25
def wind(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 200, 900) * (.6 + .4 * np.sin(2 * np.pi * .2 * t)) * .35
place(sfx, bigboom(), 0, .6); place(sfx, bigboom(), 1.6, .5)
for k in range(10): place(sfx, shot(), .2 + k * .27, .35)
place(sfx, hit(), wt(0, 'refuse'), .5)
place(sfx, wind(3), S(1), .4); place(sfx, chime(880, 1.0), wt(1, 'faith'), .25)
place(sfx, jeer(), S(2), .7); place(sfx, hit(), wt(2, 'coward'), .4)
for k in range(5): place(sfx, thud(140, .2, .8), wt(2, 'throw') + .4 + k * .22, .5)
place(sfx, paper() if 'paper' in dir() else pop(), wt(2, 'kicked'), .4)
place(sfx, wind(4), S(3), .5); place(sfx, hit(), wt(3, 'hacksaw'), .5)
for k in range(4): place(sfx, bigboom(), S(4) + k * .55, .55)
for k in range(12): place(sfx, shot(), S(4) + .1 + k * .2, .3)
place(sfx, crowd(2), wt(4, 'and'), .6)
place(sfx, wind(3), S(5), .5); place(sfx, hit(), wt(5, 'stay'), .6)
for k in range(8): place(sfx, shot(), S(6) + .3 + k * .45, .25)
place(sfx, ropefx(2.2), wt(6, 'tie'), .6)
place(sfx, chime(660, 1.6), wt(7, 'lord'), .25)
for k in range(15): place(sfx, pop(700 + k * 20), wt(8, 'saved') - .3 + k * .09, .15)
place(sfx, bigboom(), wt(9, 'grenade'), .9); place(sfx, shot(), wt(9, 'shatters'), .8)
place(sfx, hit(), S(10), .4); place(sfx, crowd(2.5), wt(10, 'puts'), .4); place(sfx, sparkle_sfx(), wt(10, 'medal'), .4)
