def boomfx(dur=2.5): n = int(dur * SR); t = T(n); return (lp(rng.standard_normal(n), 300) * np.exp(-t * 1.6) * 1.4 + thud(45, dur, 1.3)[:n] + lp(rng.standard_normal(n), 2500) * np.exp(-t * 8) * .6)
def splat(): n = int(.3 * SR); t = T(n); return lp(rng.standard_normal(n), 900) * np.exp(-t * 18) * .9 + thud(90, .3, .6)[:n]
def gasp(): n = int(.4 * SR); t = T(n); return bp(rng.standard_normal(n), 800, 3000) * np.minimum(1, t / .05) * np.exp(-t * 6) * .5
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 400, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def gullfx(): n = int(.35 * SR); t = T(n); f = 1800 - 900 * t / .35; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .35) * .25
def crunch(): n = int(.5 * SR); t = T(n); return hp(rng.standard_normal(n), 1200) * np.exp(-t * 10) * .8 + clang(300, .5) * .5
def wavesfx(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 700) * (.6 + .4 * np.sin(2 * np.pi * .3 * t)) * .35
place(sfx, wavesfx(S(3)), 0, .5); place(sfx, boomfx(2.2), wt(0, 'blow'), .8); place(sfx, gasp(), wt(1, 'smell'), .5); place(sfx, boing(110, .6), wt(1, 'unbearable'), .3)
place(sfx, pop(700), wt(2, 'highways'), .4); place(sfx, chime(1320, .5), wt(2, 'highway', 1), .3)
for k in range(8): place(sfx, thud(150, .15, .8), wt(3, 'half') + k * .12, .4)
place(sfx, boing(220, .4), wt(3, 'dynamite'), .3)
place(sfx, thud(50, .8, 1), wt(4, 'blast'), .5); place(sfx, sparkle_sfx(), wt(4, 'tiny'), .35)
for k in range(4): place(sfx, gullfx(), wt(4, 'seagulls') + k * .25, .5)
place(sfx, crowd(2.8), S(5) + .1, .45)
for k in range(3): place(sfx, tick(), wt(5, 'news') + k * .3, .5)
for k in range(3): place(sfx, tick(), S(6) + k * .4, .7)
place(sfx, thud(200, .2, .8), wt(6, 'pushed'), .6)
place(sfx, boomfx(3.0), S(7) - .02, 1.0); place(sfx, crowd(2.0), wt(7, 'rained'), .6)
for k in range(8): place(sfx, splat(), wt(7, 'rained') + .1 + k * .19, .4)
place(sfx, whoosh(.5, False), wt(8, 'crushed') - .45, .5); place(sfx, crunch(), wt(8, 'crushed'), .9); place(sfx, gasp(), wt(8, 'crushed') + .3, .5)
for k in range(5): place(sfx, gullfx(), S(9) + .1 + k * .17, .55)
place(sfx, boing(90, .7), wt(9, 'still'), .35)
place(sfx, sparkle_sfx(), wt(10, 'exploding'), .5); place(sfx, crowd(2.5), wt(10, 'exploding'), .4)
