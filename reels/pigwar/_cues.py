def bang(): n = int(.6 * SR); t = T(n); return hp(rng.standard_normal(n), 400) * np.exp(-t * 14) * 1.2 + thud(60, .6, 1.2)[:n]
def oink(): n = int(.35 * SR); t = T(n); f = 220 + 80 * np.sin(np.pi * t / .35); x = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .3; return bp(x, 300, 2500) * np.sin(np.pi * t / .35) * .7
def gasp(): n = int(.4 * SR); t = T(n); return bp(rng.standard_normal(n), 800, 3000) * np.minimum(1, t / .05) * np.exp(-t * 6) * .5
def kaching(): return chime(2093, .6) + chime(2637, .6) * .7
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def drumroll(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 150, 900) * (.6 + .4 * np.sin(2 * np.pi * 14 * t)) * np.minimum(1, t / .3) * .6
def horn(): n = int(1.2 * SR); t = T(n); x = sum(np.sin(2 * np.pi * 110 * h * t) / h for h in range(1, 6)); return lp(x, 900) * np.minimum(1, t / .1) * np.minimum(1, (1.2 - t) / .3) * .3
def wavesfx(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 700) * (.6 + .4 * np.sin(2 * np.pi * .3 * t)) * .35
place(sfx, drumroll(1.5), wt(0, 'almost') - .3, .4); place(sfx, oink(), wt(0, 'pig'), .8)
place(sfx, pop(700), wt(1, 'claimed'), .4); place(sfx, pop(900), wt(1, 'claimed') + .15, .4)
for k in range(5): place(sfx, oink() * .5, wt(2, 'eating') + k * .3, .4)
place(sfx, bang(), wt(2, 'shot'), 1.0); place(sfx, boing(90, .6), wt(2, 'shot') + .4, .3)
place(sfx, kaching(), wt(3, 'offered') + .4, .35); place(sfx, stampfx(), wt(3, 'wanted') + .3, .5); place(sfx, gasp(), wt(3, 'wanted') + .5, .4)
place(sfx, stampfx(), wt(4, 'arrest'), .5)
for k in range(8): place(sfx, thud(120, .12, .6), wt(4, 'americans') + k * .3, .4)
place(sfx, wavesfx(2.0), S(5), .5); place(sfx, horn(), wt(5, 'warships') - .2, .6)
for k in range(4): place(sfx, thud(80, .4, .8), wt(6, '14') + .1 + k * .2, .35)
place(sfx, horn(), wt(6, 'warships') - .3, .5)
place(sfx, drumroll(1.8), S(7), .5); place(sfx, boing(160, .3), wt(7, 'fight'), .3)
place(sfx, stampfx(), wt(8, 'refused') - .05, .6); place(sfx, oink(), wt(8, 'pig'), .8)
for k in range(12): place(sfx, tick(), wt(9, '12') + k * .11, .45)
place(sfx, chime(1320, .6), wt(9, 'without'), .3)
place(sfx, thud(90, .3, 1.0), wt(10, 'settled'), .8); place(sfx, sparkle_sfx(), wt(10, 'island'), .4); place(sfx, chime(880, 1.2), wt(10, 'pig'), .3); place(sfx, oink() * .6, wt(10, 'pig') + .5, .5)
