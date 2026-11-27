def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def horn(dur=1.4): n = int(dur * SR); t = T(n); x = sum(np.sin(2 * np.pi * 98 * h * t) / h for h in range(1, 6)); return lp(x, 700) * np.minimum(1, t / .1) * np.minimum(1, (dur - t) / .3) * .35
def crash(): n = int(1.2 * SR); t = T(n); return lp(rng.standard_normal(n), 700) * np.exp(-t * 3) * 1.2 + clang(160, 1.2)[:n] * .5
def wavesfx(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 700) * (.6 + .4 * np.sin(2 * np.pi * .3 * t)) * .35
def cry(): n = int(.6 * SR); t = T(n); f = 700 + 200 * np.sin(2 * np.pi * 3 * t); return bp(np.sin(2 * np.pi * np.cumsum(f) / SR), 400, 3000) * np.sin(np.pi * t / .6) * .25
def boomfx(): n = int(2.0 * SR); t = T(n); return lp(rng.standard_normal(n), 300) * np.exp(-t * 2) * 1.4 + thud(40, 2.0, 1.4)[:n]
def whoosh2(): return whoosh(.6)
def splash(): n = int(.8 * SR); t = T(n); return bp(rng.standard_normal(n), 300, 4000) * np.exp(-t * 5) * .8
def bubbles(dur): n = int(dur * SR); x = np.zeros(n); idx = rng.integers(0, n, int(dur * 18)); x[idx] = 1; return bp(x, 400, 1400) * 4
def churn(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 400) * (.6 + .4 * np.sin(2 * np.pi * 6 * t)) * .7
place(sfx, wavesfx(5.5), 0, .6); place(sfx, horn(), .3, .5); place(sfx, sparkle_sfx(), wt(0, 'survived'), .5)
place(sfx, horn(1.2), wt(1, 'olympic') - .2, .4); place(sfx, crash(), wt(1, 'warship') - .1, .9)
place(sfx, chime(1320, .8), wt(2, 'fine'), .3)
place(sfx, horn(1.6), wt(3, 'titanic') - .1, .5)
place(sfx, crash(), wt(4, 'iceberg') - .1, .6); place(sfx, cry(), wt(4, 'baby'), .6)
place(sfx, wavesfx(4.5), S(5), .5); place(sfx, cry(), wt(5, 'grabbed'), .4); place(sfx, gasp() if 'gasp' in dir() else boing(200, .4), wt(5, 'without'), .3)
place(sfx, horn(1.4), wt(6, 'britannic'), .4)
place(sfx, boomfx(), wt(7, 'mine') - .05, 1.0); place(sfx, bubbles(2.0), wt(7, 'sank'), .5)
place(sfx, sparkle_sfx(), wt(8, 'toothbrush'), .5)
place(sfx, churn(3.0), S(9), .7); place(sfx, whoosh2(), wt(9, 'jumped') - .2, .5); place(sfx, splash(), wt(9, 'jumped') + .4, .7)
place(sfx, bubbles(2.0), S(10), .6); place(sfx, thud(90, .4, 1.0), wt(10, 'head'), .7); place(sfx, chime(880, 1.0), wt(10, 'survived'), .3); place(sfx, boing(110, .5), wt(10, 'fractured'), .3)
place(sfx, wavesfx(4.0), S(11), .5); place(sfx, horn(1.6), wt(11, 'miss') - .3, .5)
