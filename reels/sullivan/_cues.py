def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def zapfx(): n = int(.6 * SR); t = T(n); return (hp(rng.standard_normal(n), 2000) * np.exp(-t * 9) * .7 + np.sign(np.sin(2 * np.pi * 60 * t)) * np.exp(-t * 6) * .25)
def thunder(): n = int(2.2 * SR); t = T(n); return lp(rng.standard_normal(n), 220) * np.exp(-t * 1.6) * 1.0
def rain(dur): n = int(dur * SR); t = T(n); return hp(rng.standard_normal(n), 2500) * .22 * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5)
def sizzle(dur=1.2): n = int(dur * SR); t = T(n); return hp(rng.standard_normal(n), 3500) * (rng.random(n) > .6) * np.exp(-t * 2) * .5
def ding(): return chime(1760, .5) * .6
def growl(dur=.8): n = int(dur * SR); t = T(n); f = 90 + 20 * np.sin(2 * np.pi * 3 * t); return lp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (1 + .3 * rng.standard_normal(n)), 600) * np.sin(np.pi * t / dur) * .5
def splashfx(): n = int(.7 * SR); t = T(n); return bp(rng.standard_normal(n), 400, 5000) * np.exp(-t * 6) * .7
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
place(sfx, rain(4.5), 0, .5)
for k in range(3):
    place(sfx, zapfx(), .3 + k * 1.4, .4)
place(sfx, rain(2.5), S(1), .2)
for i, w in enumerate([wt(2, 'lightning'), wt(3, 'hit'), wt(4, 'hit'), wt(5, 'lightning'), wt(7, 'struck'), wt(8, 'hit'), wt(9, 'hit')]):
    place(sfx, zapfx(), w - .05, .9); place(sfx, thunder(), w, .6); place(sfx, ding(), w + .3, .25)
place(sfx, boing(300, .3), wt(2, 'blew'), .4); place(sfx, sizzle(), wt(3, 'burned'), .5); place(sfx, sizzle(), wt(4, 'burned'), .5)
place(sfx, sizzle(1.6), wt(5, 'set'), .6); place(sfx, splashfx(), wt(6, 'water'), .3)
place(sfx, sizzle(1.4), wt(7, 'hair'), .6); place(sfx, splashfx(), wt(7, 'again', 1), .6)
place(sfx, boing(140, .4), wt(8, 'hurt'), .4)
place(sfx, growl(), wt(9, 'bear'), .7); for_k = 0
place(sfx, thud(200, .15, .9), wt(9, 'hit', 1), .7); place(sfx, thud(200, .15, .9), wt(9, 'stick'), .7)
place(sfx, rain(3.0), S(10), .4); place(sfx, crowd(1.4), wt(10, 'avoiding'), .4)
place(sfx, sparkle_sfx(), wt(11, 'world'), .5)
