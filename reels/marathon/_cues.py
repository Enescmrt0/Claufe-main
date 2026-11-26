def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def engine(dur): n = int(dur * SR); t = T(n); return lp(np.sign(np.sin(2 * np.pi * 30 * t)) + .5 * np.sign(np.sin(2 * np.pi * 47 * t)), 350) * .2 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def honk(): n = int(.4 * SR); t = T(n); return lp(np.sign(np.sin(2 * np.pi * 330 * t)) * (1 - .5 * (t > .2)), 2000) * .15 * np.minimum(1, t / .02) * np.minimum(1, (.4 - t) / .05)
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .4) * np.minimum(1, (dur - t) / .5) * .55
def gasp(): n = int(.4 * SR); t = T(n); return bp(rng.standard_normal(n), 800, 3000) * np.minimum(1, t / .05) * np.exp(-t * 6) * .5
def cough(): n = int(.3 * SR); t = T(n); return bp(rng.standard_normal(n), 300, 1500) * np.exp(-t * 14) * .8
def bark(): n = int(.22 * SR); t = T(n); f = 500 - 900 * t; return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)), 300, 2500) * np.exp(-t * 10) * .5
def crunch(): n = int(.2 * SR); t = T(n); return hp(rng.standard_normal(n), 1800) * np.exp(-t * 25) * .6
def gun(): n = int(.5 * SR); t = T(n); return hp(rng.standard_normal(n), 500) * np.exp(-t * 18) * 1.0 + thud(70, .5, .8)[:n]
def shutterf(): return pop(1400) * .8
def splash(): n = int(.6 * SR); t = T(n); return bp(rng.standard_normal(n), 400, 4000) * np.exp(-t * 6) * .5
def gulp(): return boing(260, .25) * .6
place(sfx, gun(), 0.05, .5); place(sfx, crowd(3.0), 0, .4)
place(sfx, stampfx(), wt(1, 'poisoned'), .5); place(sfx, honk(), wt(1, 'car'), .6)
place(sfx, hit(), S(2), .5); place(sfx, crowd(4.0), S(3), .4)
place(sfx, gun(), wt(4, 'marathon') + .2, .6); place(sfx, crowd(2.5), wt(4, 'marathon'), .5)
place(sfx, engine(5.5), S(5), .5)
for k in range(4): place(sfx, cough(), wt(5, 'choking') + k * .3, .5)
place(sfx, splash(), wt(6, 'water'), .4)
place(sfx, boing(150, .5), wt(7, 'drink'), .3); place(sfx, hit(), S(8), .35)
place(sfx, thud(80, .5, 1.0), wt(9, 'collapsed'), .6); place(sfx, gasp(), wt(9, 'nearly'), .5)
place(sfx, boing(90, .6), wt(10, 'vomiting'), .35)
place(sfx, sparkle_sfx(), wt(11, 'carvajal'), .35)
for k in range(3): place(sfx, pop(700 + k * 120), wt(12, 'gambling') + k * .15, .5)
place(sfx, boing(110, .5), wt(12, 'lost'), .3); place(sfx, honk(), wt(12, 'hitchhike'), .4)
for k in range(3): place(sfx, crunch(), wt(13, 'cut') + k * .12, .6)
for k in range(3): place(sfx, crunch(), wt(14, 'eats') + k * .2, .5)
place(sfx, stampfx(), wt(14, 'rotten'), .5); place(sfx, boing(80, .6), wt(15, 'cramps'), .35)
place(sfx, crowd(2.0), wt(16, 'still'), .5); place(sfx, sparkle_sfx(), wt(16, 'fourth'), .4)
place(sfx, chime(1046, .8), wt(17, 'first'), .3)
for k in range(6): place(sfx, bark(), wt(18, 'chased') + k * .3, .7)
place(sfx, crowd(1.6), wt(18, 'ninth'), .4)
place(sfx, boing(120, .5), wt(19, 'gives'), .3)
place(sfx, thud(150, .2, .7), wt(20, 'climbs'), .5); place(sfx, engine(5.5), S(21), .6); place(sfx, honk(), wt(21, 'waves'), .6)
place(sfx, clang(300, .8), wt(22, 'breaks'), .5); place(sfx, engine(.8)[::-1], wt(22, 'breaks') - .2, .4)
place(sfx, crowd(3.5), wt(23, 'enters'), .8)
for k in range(3): place(sfx, shutterf(), wt(24, 'photographed') + k * .6, .5)
place(sfx, gasp(), wt(25, 'shouts'), .6); place(sfx, crowd(1.5), wt(25, 'car'), .4)
place(sfx, stampfx(), wt(26, 'banned'), .7)
place(sfx, crowd(1.6), wt(27, 'wins'), .4); place(sfx, honk(), wt(27, 'car'), .5)
place(sfx, hit(), S(28), .4)
place(sfx, gulp(), wt(30, 'strychnine'), .6); place(sfx, stampfx(), wt(30, 'rat'), .5)
place(sfx, pop(500), wt(31, 'egg'), .5); place(sfx, gulp(), wt(33, 'brandy'), .6)
place(sfx, sparkle_sfx(), wt(34, 'hallucinating'), .5); place(sfx, boing(300, 1.0), wt(34, 'finish'), .3)
place(sfx, crowd(3.5), wt(35, 'held'), .6)
place(sfx, hit(), wt(36, '3h28m'), .5); place(sfx, stampfx(), wt(36, 'slowest'), .5)
place(sfx, gasp(), wt(37, 'doctors'), .4); place(sfx, boing(90, .6), wt(37, 'lost'), .3)
for k in range(18): place(sfx, pop(400 + k * 20), wt(38, 'only') + k * .04, .2)
place(sfx, stampfx(), wt(39, 'scrap'), .5)
place(sfx, splash(), wt(40, 'water'), .7); place(sfx, sparkle_sfx(), wt(40, 'water') + .1, .5); place(sfx, crowd(2.0), wt(40, 'water'), .4)
