def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
def gasp(): n = int(.4 * SR); t = T(n); return bp(rng.standard_normal(n), 800, 3000) * np.minimum(1, t / .05) * np.exp(-t * 6) * .5
def wavesfx(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 700) * (.6 + .4 * np.sin(2 * np.pi * .3 * t)) * .35
def splash(): n = int(.8 * SR); t = T(n); return bp(rng.standard_normal(n), 300, 4000) * np.exp(-t * 5) * .7
def shutter(): a = thud(400, .08, .5); a[:len(tick())] += tick(); return a
def chainfx(): out = np.zeros(int(.6 * SR)); [out.__setitem__(slice(int(k * .07 * SR), int(k * .07 * SR) + int(.05 * SR)), out[int(k * .07 * SR):int(k * .07 * SR) + int(.05 * SR)] + clang(1800 + k * 120, .05)[:int(.05 * SR)] * .3) for k in range(7)]; return out
def tankfx(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 200) * (.6 + .4 * np.sin(2 * np.pi * 9 * t)) * np.minimum(1, t / .3) * .9
place(sfx, wavesfx(3.0), 0, .4); place(sfx, stampfx(), wt(0, 'fooled'), .6)
place(sfx, whoosh(.6), wt(1, 'invade'), .4); place(sfx, boing(150, .4), wt(1, 'obvious'), .3)
place(sfx, thud(90, .4, .8), wt(2, 'body'), .4); place(sfx, sparkle_sfx(), wt(2, 'officer'), .4); place(sfx, stampfx(), wt(2, 'never') - .05, .6)
for w in ('love', 'fiance', 'theater', 'letter'): place(sfx, pop(700), wt(3, w, 1 if w == 'letter' else 0) - .05, .45)
place(sfx, paper(), wt(3, 'fake'), .4)
place(sfx, chainfx(), wt(4, 'chained'), .7); place(sfx, door(), wt(4, 'briefcase'), .4) if 'door' in dir() else None
place(sfx, stampfx(), wt(4, 'greece') - .05, .5)
place(sfx, wavesfx(3.0), S(5), .5); place(sfx, splash(), wt(5, 'slipped') + .2, .6)
place(sfx, wavesfx(1.5), S(6), .4); place(sfx, gasp(), wt(6, 'washed'), .4)
for k in range(3): place(sfx, shutter(), wt(6, 'copied') + k * .35, .5)
place(sfx, whoosh(.8), wt(6, 'sent'), .5)
place(sfx, chime(1320, .6), wt(7, 'believed'), .3); place(sfx, tankfx(2.0), wt(7, 'sent'), .45)
place(sfx, wavesfx(2.5), S(8), .4); place(sfx, boing(100, .6), wt(8, 'wrong'), .35)
for k in range(10): place(sfx, tick(), wt(9, 'message') + k * .09 * (1 + k % 2), .35)
place(sfx, kaching() if 'kaching' in dir() else chime(2093, .6), wt(9, 'mincemeat'), .3); place(sfx, splash(), wt(9, 'rod'), .4); place(sfx, pop(500), wt(9, 'sinker'), .5)
place(sfx, chime(880, 1.2), wt(10, 'real'), .3)
