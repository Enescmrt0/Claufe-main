def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def bell(): return chime(440, 2.0) * .6 + chime(660, 2.0) * .3
def dig(): n = int(.3 * SR); t = T(n); return bp(rng.standard_normal(n), 200, 1500) * np.exp(-t * 12) * .7
def flies(dur): n = int(dur * SR); t = T(n); f = 220 + 30 * np.sin(2 * np.pi * 7 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (.5 + .5 * np.sin(2 * np.pi * 23 * t)) * np.minimum(1, t / .2) * np.minimum(1, (dur - t) / .3) * .12
def splash(): n = int(.9 * SR); t = T(n); return bp(rng.standard_normal(n), 400, 5000) * np.exp(-t * 5) * .8
def rumble(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 150) * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .4) * 1.6
place(sfx, bell(), 0, .45); place(sfx, stampfx(), wt(0, 'trial'), .5)
place(sfx, boing(110, .5), wt(1, 'nine') if False else wt(1, '9'), .3); place(sfx, hit(), wt(1, 'hated'), .5)
for k in range(3): place(sfx, dig(), wt(2, 'dug') + k * .3, .5)
place(sfx, whoosh(.35), wt(2, 'dressed'), .4); place(sfx, thud(60, .4), wt(2, 'throne'), .5)
place(sfx, flies(3.0), S(3), .5); place(sfx, boing(260, .4), wt(3, 'answer'), .25)
place(sfx, crowd(1.4), wt(4, 'screamed'), .3); place(sfx, chime(1760, .5), wt(4, 'nothing'), .2)
place(sfx, stampfx(), wt(5, 'lost') - .1, .7)
place(sfx, stampfx(), wt(6, 'canceled'), .5); place(sfx, whoosh(.3), wt(6, 'cut'), .4); place(sfx, splash(), wt(6, 'threw') + .9, .6)
place(sfx, rumble(2.4), wt(7, 'basilica'), .7); place(sfx, hit(), wt(7, 'collapsed') - .1, .8)
place(sfx, crowd(2.4), wt(8, 'rome'), .6)
place(sfx, thud(50, .6), wt(9, 'prison'), .6); place(sfx, hit(), wt(9, 'strangled'), .5)
place(sfx, splash(), wt(10, 'pulled'), .4); place(sfx, bell(), wt(10, 'saint'), .4)
place(sfx, stampfx(), wt(11, 'no') - .1, .6); place(sfx, bell(), S(12) - 1.2, .35)
