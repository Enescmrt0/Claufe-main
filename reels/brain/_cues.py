def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def slosh(): n = int(.4 * SR); t = T(n); return lp(rng.standard_normal(n), 900) * np.sin(np.pi * t / .4) * .5
def tiptoe(): return pop(1200) * .4
def engine(dur): n = int(dur * SR); t = T(n); return lp(np.sign(np.sin(2 * np.pi * 38 * t)), 300) * .25 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def knife(): n = int(.15 * SR); t = T(n); return hp(rng.standard_normal(n), 2500) * np.exp(-t * 25) * .6
place(sfx, hit(), wt(0, 'missing') - .1, .5); place(sfx, boing(150, .5), wt(0, 'missing'), .3)
place(sfx, whoosh(1.0), wt(1, 'cremated'), .3)
for k in range(4): place(sfx, tiptoe(), wt(2, 'quietly') + k * .25, .4)
place(sfx, slosh(), wt(2, 'took'), .4)
for k in range(6): place(sfx, knife(), wt(3, '240') + k * .18, .5)
for k in range(8): place(sfx, chime(2600 + k * 60, .25) * .4, wt(3, 'jars') - .3 + k * .1, .4)
place(sfx, stampfx(), wt(4, 'lost'), .6); place(sfx, sparkle_sfx(), wt(4, 'kept'), .4)
place(sfx, engine(2.2), S(5) + .1, .5); place(sfx, thud(90, .3, .8), wt(5, 'cider'), .5); place(sfx, pop(500), wt(5, 'beer'), .5)
place(sfx, sparkle_sfx(), wt(6, 'unusual'), .4); place(sfx, boing(110, .6), wt(6, 'nothing'), .35); place(sfx, stampfx(), wt(6, 'nothing'), .4)
place(sfx, engine(3.5), S(7) + .1, .6); place(sfx, chime(1320, .8), wt(7, 'granddaughter'), .3)
place(sfx, kaching() if 'kaching' in dir() else chime(1760, .6), wt(8, 'gave'), .35)
place(sfx, boing(300, .4), wt(9, 'eyes'), .35); place(sfx, clang(300, 1.0), wt(9, 'locked'), .45)
