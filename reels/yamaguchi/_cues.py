def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def boom(dur=3.0): n = int(dur * SR); t = T(n); return (thud(30, dur, 1.8)[:n] if len(thud(30, dur, 1.8)) >= n else np.pad(thud(30, dur, 1.8), (0, n - len(thud(30, dur, 1.8))))) + lp(rng.standard_normal(n), 250) * np.exp(-t * 1.2) * 1.4
def drone(dur): n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * 70 * t) + .6 * np.sin(2 * np.pi * 72.5 * t)) * lp(rng.standard_normal(n), 400) * 0 + (np.sin(2 * np.pi * 70 * t) * .5 + .5 * np.sin(2 * np.pi * 140 * t + np.sin(2 * np.pi * 3 * t))) * np.minimum(1, t / .8) * np.minimum(1, (dur - t) / .8) * .35
def ring(dur=2.0): n = int(dur * SR); t = T(n); return np.sin(2 * np.pi * 3800 * t) * np.exp(-t * 1.4) * .12
def wind(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 1200) * (.6 + .4 * np.sin(2 * np.pi * .3 * t)) * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5) * .5
def trainfx(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 500) * (.5 + .5 * (np.sin(2 * np.pi * 2.2 * t) > .6)) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3) * .6
def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
place(sfx, ring(1.5), 0, .3)
place(sfx, drone(3.0), wt(2, 'when'), .6)
place(sfx, boom(3.0), wt(3, 'flash') - .05, 1.0); place(sfx, ring(3.0), wt(3, 'flash') + .3, .5)
place(sfx, wind(2.0), wt(4, 'the', 0), .5); place(sfx, hit(), wt(4, 'ground'), .6)
place(sfx, trainfx(2.0), wt(5, 'train') - .5, .5)
place(sfx, chime(440, 2.0), wt(6, 'nagasaki'), .3)
place(sfx, paper(), wt(7, 'work'), .4)
place(sfx, boom(3.0), wt(9, 'exploded') - .05, 1.0); place(sfx, ring(3.0), wt(9, 'exploded') + .3, .5)
place(sfx, chime(660, 2.0), wt(10, 'survived'), .3)
