def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def horn(f=420, dur=.35): n = int(dur * SR); t = T(n); x = np.sign(np.sin(2 * np.pi * f * t)) + np.sign(np.sin(2 * np.pi * f * 1.26 * t)); return lp(x, 2500) * .12 * np.minimum(1, t / .02) * np.minimum(1, (dur - t) / .05)
def engine(dur): n = int(dur * SR); t = T(n); return lp(np.sign(np.sin(2 * np.pi * 42 * t)), 300) * .22 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def crackle(dur): n = int(dur * SR); x = np.zeros(n); idx = rng.integers(0, n, int(dur * 40)); x[idx] = rng.standard_normal(len(idx)); return hp(x, 1500) * .6
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .5
def clocktick(n=6, gap=.5): out = np.zeros(int((n * gap + .1) * SR)); [out.__setitem__(slice(int(i * gap * SR), int(i * gap * SR) + len(tick())), tick()) for i in range(n)]; return out
place(sfx, engine(4.5), 0, .5); place(sfx, whoosh(.8), wt(0, 'switched'), .5); place(sfx, hit(), wt(0, 'overnight') - .1, .5)
place(sfx, horn(), wt(1, 'left') - .1, .5); place(sfx, pop(800), wt(1, 'right') - .1, .4); place(sfx, boing(200, .4), wt(1, 'steering'), .3)
place(sfx, crowd(1.6), wt(2, '83'), .5); place(sfx, boing(110, .6), wt(2, 'no'), .3); place(sfx, stampfx(), wt(2, 'anyway') - .2, .6)
place(sfx, sparkle_sfx(), wt(3, 'dagen'), .5); place(sfx, chime(1320, .8), wt(3, 'right'), .3)
for k in range(6): place(sfx, thud(200, .12, .7), wt(4, 'swap') + k * .3, .4)
place(sfx, paper() if 'paper' in dir() else whoosh(.5), wt(4, 'covered'), .4)
place(sfx, crackle(2.5), S(5), .5)
place(sfx, horn(380, .6), wt(6, 'banned') - .2, .35); place(sfx, clocktick(5, .4), wt(6, 'at') - .1, .6); place(sfx, hit(), wt(6, 'stopped'), .5)
place(sfx, engine(3.0), wt(7, 'moved') - .2, .45); place(sfx, clocktick(4, .5), wt(7, 'waited'), .5)
place(sfx, chime(1760, 1.0), wt(8, 'exactly'), .5); place(sfx, chime(2093, 1.0), wt(8, 'exactly') + .02, .35); place(sfx, engine(2.5), wt(8, 'sweden'), .6); place(sfx, crowd(2.2), wt(8, 'sweden'), .6)
for k in range(3): place(sfx, horn(440 + k * 40, .25), wt(8, 'right') + k * .3, .4)
place(sfx, sparkle_sfx(), wt(9, 'fewer'), .4); place(sfx, horn(500, .2), wt(9, 'extra'), .3)
