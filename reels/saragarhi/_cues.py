def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def shot(): n = int(.5 * SR); t = T(n); return hp(rng.standard_normal(n), 500) * np.exp(-t * 16) * 1.0 + thud(70, .5, .8)[:n]
def wind(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 200, 900) * (.6 + .4 * np.sin(2 * np.pi * .2 * t)) * .35
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2200) * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5) * .5
def tick2(): return chime(2600, .12) * .5
def crumble(): n = int(1.2 * SR); t = T(n); return lp(rng.standard_normal(n), 600) * np.exp(-t * 2.5) * 1.2 + thud(50, 1.2, 1.0)[:n]
place(sfx, wind(S(3)), 0, .6); place(sfx, hit(), 0, .5); place(sfx, crowd(2.5), wt(0, 'coming'), .5); place(sfx, hit(), wt(0, '10000') if False else wt(0, 'are'), .5)
for k in range(6): place(sfx, tick2(), wt(2, 'flashes') + k * .22, .5)
place(sfx, crowd(3.0), S(3), .7); place(sfx, hit(), S(3), .4)
for k in range(8): place(sfx, tick2(), wt(3, 'flashes') + k * .18, .5)
for k in range(5): place(sfx, tick2(), wt(4, 'reply') + k * .2, .4)
place(sfx, hit(), wt(4, 'ishar') - .1, .5)
for k in range(22): place(sfx, shot(), S(5) + .2 + k * .32 + (k % 3) * .05, .45)
place(sfx, crowd(3.5), wt(5, 'charge'), .8)
place(sfx, crumble(), wt(6, 'break'), .9)
for k in range(8): place(sfx, shot(), S(7) + .1 + k * .55, .35)
for k in range(10): place(sfx, tick2(), wt(7, 'signalman') + k * .2, .45)
for k in range(8): place(sfx, tick2(), wt(8, 'permission') - .2 + k * .2, .45)
place(sfx, shot(), wt(8, 'rifle') + .3, .6)
place(sfx, hit(), wt(9, 'dark'), .7)
place(sfx, wind(4.0), S(10), .5)
place(sfx, hit(), wt(11, 'couldnt'), .4)
for k in range(21): place(sfx, chime(1500 + (k % 5) * 120, .3) * .4, wt(11, 'all') - .4 + k * .08, .3)
