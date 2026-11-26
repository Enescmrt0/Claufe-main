def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def keyclick(): n = int(.03 * SR); t = T(n); return hp(rng.standard_normal(n), 2500) * np.exp(-t * 300) * .8 + thud(400, .03, .3)[:n]
def morse(dur, f=750): n = int(dur * SR); t = T(n); gate = (np.sin(2 * np.pi * 4.5 * t) + .3 * np.sin(2 * np.pi * 1.7 * t)) > .2; return np.sin(2 * np.pi * f * t) * gate * .25
def door2(): return thud(90, .5, 1.0) + hp(rng.standard_normal(int(.5 * SR)), 800) * np.exp(-T(int(.5 * SR)) * 25) * .3
def cluck(): n = int(.18 * SR); t = T(n); f = 600 + 300 * np.exp(-t * 30); return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)), 400, 3000) * np.exp(-t * 14) * .4
def projfx(dur): n = int(dur * SR); t = T(n); return hp(rng.standard_normal(n), 1500) * (np.sin(2 * np.pi * 18 * t) > .5) * .25
def sonar(): n = int(1.2 * SR); t = T(n); return np.sin(2 * np.pi * 1100 * t) * np.exp(-t * 4) * .3
def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def snore(): n = int(1.0 * SR); t = T(n); return lp(rng.standard_normal(n), 300) * np.sin(np.pi * t) * .5
def coins(): return chime(2400, .4) * .5 + chime(3100, .4) * .4
sfx_hits = [S(1), S(3), S(6), S(8), S(10), wt(11, 'two')]
for h in sfx_hits: place(sfx, hit(), h - .02, .45)
place(sfx, hit(), 0, .6); place(sfx, stampfx(), wt(0, 'exists'), .4)
for k in range(27): place(sfx, pop(900 + (k % 5) * 80), wt(0, '27') - .2 + k * .05, .12)
for k in range(5): place(sfx, cluck(), S(1) + .3 + k * .35, .4)
place(sfx, paper(), wt(1, 'nazis'), .5)
place(sfx, door2(), wt(2, 'offer') - .3, .4)
for k in range(3): place(sfx, stampfx(), wt(2, 'again') + k * .3, .45)
place(sfx, door2(), S(3) + .1, .4)
for k in range(4): place(sfx, paper(), wt(4, 'hire') + k * .08, .3)
for k in range(24): place(sfx, keyclick(), wt(4, 'make') + k * .06 + (k % 3) * .02, .5)
place(sfx, paper(), wt(4, 'tourist'), .4); place(sfx, paper(), wt(4, 'map'), .4); place(sfx, projfx(1.0), wt(4, 'old') - .1, .5)
place(sfx, boing(150, .4), wt(5, 'mistakes'), .25); place(sfx, sparkle_sfx(), wt(5, 'love'), .4)
for k in range(3): place(sfx, sonar(), wt(6, 'catch') + k * .8, .4)
place(sfx, door2(), wt(6, 'looking'), .5)
for k in range(10): place(sfx, coins() if 'chime' in dir() else pop(), wt(7, 'germany') + k * .15, .25)
place(sfx, morse(2.0), wt(8, 'warn') - .4, .6); place(sfx, snore(), wt(8, 'too'), .5); place(sfx, stampfx(), wt(8, 'completely') - .1, .5)
place(sfx, morse(1.6, 820), wt(9, 'you'), .5); place(sfx, stampfx(), wt(9, 'calais'), .5)
place(sfx, thud(50, .8, 1.0), wt(10, 'armies'), .5)
place(sfx, chime(1046, 1.2), wt(11, 'iron') + .1, .35); place(sfx, chime(1318, 1.2), wt(11, 'member') + .1, .35)
