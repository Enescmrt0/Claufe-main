def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def gun(): n = int(.5 * SR); t = T(n); return hp(rng.standard_normal(n), 500) * np.exp(-t * 18) * 1.0 + thud(70, .5, .8)[:n]
def squeak(f=2200): n = int(.12 * SR); t = T(n); return np.sin(2 * np.pi * np.cumsum(f + 900 * t / .12) / SR) * np.sin(np.pi * t / .12) * .25
def patter(dur, dens=40): n = int(dur * SR); x = np.zeros(n); idx = rng.integers(0, n, int(dur * dens)); x[idx] = 1.0; return lp(x, 900) * 3 * np.minimum(1, T(n) / .3) * np.minimum(1, (dur - T(n)) / .3)
def crack(): n = int(.15 * SR); t = T(n); return hp(rng.standard_normal(n), 2500) * np.exp(-t * 40) * 1.0
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def gasp(): n = int(.4 * SR); t = T(n); return bp(rng.standard_normal(n), 800, 3000) * np.minimum(1, t / .05) * np.exp(-t * 6) * .5
def latch(): return clang(900, .25) * .5
def door(): return thud(110, .3, .9)
def hoof(dur): n = int(dur * SR); t = T(n); return lp((np.sin(2 * np.pi * 3.2 * t) > .85).astype(float) + .6 * (np.sin(2 * np.pi * 3.2 * t + 1.2) > .9), 600) * .8
place(sfx, stampfx(), wt(0, 'defeated'), .6); place(sfx, squeak(), wt(0, 'rabbits'), .7); place(sfx, boing(260, .4), wt(0, 'rabbits') + .2, .3)
place(sfx, paper() if 'paper' in dir() else pop(), wt(1, 'treaty'), .3); place(sfx, gun(), wt(1, 'hunt'), .45)
for k in range(3): place(sfx, squeak(2000 + k * 300), wt(2, 'hundreds') + k * .2, .45)
for k in range(4): place(sfx, latch(), wt(3, 'opened') - .3 + k * .1, .6)
place(sfx, boing(200, .5), wt(4, 'didnt'), .3); place(sfx, patter(2.0), wt(4, 'they'), .9); place(sfx, gasp(), wt(4, 'napoleon'), .5)
place(sfx, patter(3.5, 70), S(5), 1.0)
for k in range(5): place(sfx, squeak(1800 + k * 250), S(5) + .3 + k * .5, .4)
for k in range(6): place(sfx, crack(), wt(6, 'whips') - .3 + k * .25, .55)
place(sfx, stampfx(), wt(7, 'nothing'), .5); place(sfx, patter(2.4), wt(7, 'retreated'), .8); place(sfx, door(), wt(7, 'carriage'), .6)
place(sfx, patter(4.0, 60), S(8), .9)
for k in range(3): place(sfx, boing(300 + k * 40, .3), wt(8, 'jumped') + k * .2, .4)
place(sfx, kaching() if 'kaching' in dir() else chime(2093, .6), wt(9, 'bought'), .4); place(sfx, sparkle_sfx(), wt(9, 'dinner'), .5)
place(sfx, hoof(3.0), wt(10, 'chased') - .3, .6); place(sfx, patter(2.5), wt(10, 'chased'), .7); place(sfx, crowd(1.5), wt(10, 'bunnies'), .4)
