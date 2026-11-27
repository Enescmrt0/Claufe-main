def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def wind(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 250, 1400) * (.6 + .4 * np.sin(2 * np.pi * .25 * t)) * np.minimum(1, t / .6) * np.minimum(1, (dur - t) / .6) * .6
def creak(dur=1.0): n = int(dur * SR); t = T(n); f = 120 + 70 * np.sin(2 * np.pi * .6 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (.5 + .5 * np.sign(np.sin(2 * np.pi * 26 * t))) * np.sin(np.pi * t / dur) * .3
def crack(): n = int(.5 * SR); t = T(n); return (hp(rng.standard_normal(n), 900) * np.exp(-t * 14) * 1.0 + thud(60, .5, .8)[:n] * .5) * .35
def waves(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 600) * (.5 + .5 * np.sin(2 * np.pi * .18 * t) ** 2) * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5) * 1.1
def splash(): n = int(.9 * SR); t = T(n); return bp(rng.standard_normal(n), 400, 5000) * np.exp(-t * 5) * .8
def bark(): n = int(.18 * SR); t = T(n); f = 500 - 900 * t; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 12) * .5
def whistle(dur=1.6): n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * 440 * t) + .6 * np.sin(2 * np.pi * 554 * t) + .4 * np.sin(2 * np.pi * 659 * t)) * np.minimum(1, t / .1) * np.minimum(1, (dur - t) / .3) * .25
def horn(dur=1.4): n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * 110 * t) + .5 * np.sin(2 * np.pi * 220 * t)) * np.minimum(1, t / .1) * np.minimum(1, (dur - t) / .2) * .35
def shutter(): return thud(900, .06, .5) * .5
place(sfx, waves(3.5), 0, .4); place(sfx, crack(), wt(0, 'crushed'), .7); place(sfx, splash(), wt(0, 'sunk'), .5)
place(sfx, crowd(1.8), wt(1, 'alive') - .4, .5)
place(sfx, horn(), wt(4, 'left'), .4); place(sfx, waves(3.0), S(4), .3)
place(sfx, shutter(), wt(5, 'photographer') + .4, .6)
for k in range(4): place(sfx, bark(), wt(5, '69') + k * .25, .4)
place(sfx, boing(240, .4), wt(5, 'stowaway') + .2, .3)
place(sfx, wind(3.0), S(6), .4); place(sfx, creak(1.6), wt(7, 'closed'), .5)
place(sfx, wind(6.0), S(9), .35); place(sfx, crowd(1.4), wt(10, 'football'), .3)
for k in range(3): place(sfx, bark(), wt(10, 'dogs') + k * .3, .35)
place(sfx, wind(2.5), wt(10, 'winter'), .5)
place(sfx, creak(1.8), wt(11, 'squeeze') - .4, .7)
place(sfx, creak(1.2), wt(12, 'groaned'), .7); place(sfx, crack(), wt(12, 'cracked'), .9); place(sfx, crack(), wt(12, 'bent'), .6)
place(sfx, stampfx(), wt(13, 'abandon'), .5)
place(sfx, creak(2.0), wt(14, 'watched'), .5); place(sfx, splash(), wt(14, 'sink') + .4, .6)
place(sfx, wind(5.0), S(15), .3)
for k in range(3): place(sfx, bark(), wt(17, 'dogs') + k * .0, 0)
place(sfx, crack(), wt(19, 'break'), .9); place(sfx, crack(), wt(19, 'tents'), .7)
place(sfx, waves(3.0), S(20), .6)
for k in range(5): place(sfx, splash(), wt(20, 'rowed') + k * .5, .25)
place(sfx, waves(2.0), S(21), .4); place(sfx, chime(880, 1.4), wt(22, '497'), .3)
place(sfx, wind(3.0), S(23), .3)
place(sfx, waves(4.0), S(25), .4); place(sfx, wind(5.0), wt(26, 'across'), .6); place(sfx, waves(5.0), wt(26, 'across'), .7)
for k in range(4): place(sfx, splash(), S(27) + k * .6, .4)
for k in range(5): place(sfx, thud(300, .1, .5), wt(27, 'chipped') + k * .14, .4)
for k in range(4): place(sfx, chime(1320, .4), wt(28, 'four') + k * .15, .3)
place(sfx, waves(2.0), S(29), .4); place(sfx, wind(4.0), S(30), .4); place(sfx, wind(4.0), S(31), .35)
place(sfx, whoosh(1.2), wt(32, 'slid'), .6); place(sfx, wind(3.0), wt(32, 'slid'), .5)
place(sfx, whistle(1.6), wt(33, 'whistle') - .1, .7)
place(sfx, boing(160, .5), wt(34, 'did'), .3)
place(sfx, wind(3.0), S(35), .3)
for k in range(3): place(sfx, crack(), wt(36, 'three') + k * .5, .3)
place(sfx, horn(1.6), wt(37, 'yelcho'), .6)
place(sfx, crowd(2.6), wt(38, 'every'), .7)
place(sfx, chime(440, 2.0), wt(39, 'found'), .35); place(sfx, chime(660, 2.0), wt(40, 'name'), .3)
place(sfx, crowd(2.0), wt(41, 'but') + .3, .45)
