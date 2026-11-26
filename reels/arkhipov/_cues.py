def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def charge(): n = int(1.6 * SR); t = T(n); return lp(rng.standard_normal(n), 250) * np.exp(-t * 3) * 1.6 + thud(38, 1.6, 1.6)[:n] + clang(180, 1.6)[:n] * .35
def sonar(): n = int(1.4 * SR); t = T(n); return np.sin(2 * np.pi * 1150 * t) * np.exp(-t * 3) * .35
def alarm(dur): n = int(dur * SR); t = T(n); f = 600 + 200 * (np.sin(2 * np.pi * 1.5 * t) > 0); return np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .08 * np.minimum(1, t / .1) * np.minimum(1, (dur - t) / .2)
def hum(dur, f=50): n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * f * 2 * t)) * .12 * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5)
def creak(): n = int(.9 * SR); t = T(n); f = 90 + 40 * np.sin(2 * np.pi * 1.3 * t); return bp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)), 100, 900) * np.sin(np.pi * t / .9) * .3
def static(dur): n = int(dur * SR); return hp(rng.standard_normal(n), 2000) * .12
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def gasp(): n = int(.4 * SR); t = T(n); return bp(rng.standard_normal(n), 800, 3000) * np.minimum(1, t / .05) * np.exp(-t * 6) * .5
def flashfx(): return hp(rng.standard_normal(int(.15 * SR)), 3000) * np.exp(-T(int(.15 * SR)) * 30) * .6
place(sfx, hum(S(3)), 0, .6); place(sfx, sonar(), 0.2, .5); place(sfx, sonar(), 2.0, .4)
place(sfx, charge(), wt(0, 'bombing') - .05, .8); place(sfx, charge(), wt(0, 'you', 1) + .1, .6); place(sfx, alarm(2.0), wt(0, 'bombing'), .5)
place(sfx, hit(), wt(0, 'only') - .1, .4)
place(sfx, sonar(), wt(1, 'hiding'), .35); place(sfx, static(1.8), wt(1, 'and') - .1, .5)
place(sfx, boing(70, .8), wt(2, 'dying'), .2); place(sfx, creak(), wt(2, 'dead') - .2, .5); place(sfx, gasp(), wt(2, 'fainting') + .2, .5); place(sfx, thud(80, .4, .9), wt(2, 'fainting') + .6, .5)
place(sfx, sonar(), S(3) + .1, .5); place(sfx, sonar(), S(3) + 1.2, .5)
for i in range(4): place(sfx, charge(), wt(3, 'and') + .4 + i * .45, .7)
place(sfx, creak(), S(4), .5); place(sfx, hit(), wt(4, 'nuclear'), .5); place(sfx, alarm(2.6), wt(4, 'he'), .45)
place(sfx, hit(), S(5), .6); place(sfx, charge(), wt(5, 'sink'), .4)
place(sfx, hit(), wt(6, 'three'), .4); place(sfx, stampfx(), wt(6, 'yes'), .5); place(sfx, stampfx(), wt(6, 'yes', 1), .5)
place(sfx, hit(), wt(7, 'no'), 1.0)
place(sfx, whoosh(1.2), wt(8, 'rises'), .4)
for i in range(4): place(sfx, chime(600 + i * 40, .5) * .3, wt(8, 'surrounded') + i * .25, .3)
place(sfx, hit(), S(9), .3); place(sfx, paper() if 'paper' in dir() else pop(), S(10) + .2, .3)
for i in range(6): place(sfx, flashfx(), S(11) + .3 + i * .33, .4)
place(sfx, sparkle_sfx(), wt(11, 'saved'), .4)
