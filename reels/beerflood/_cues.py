def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def rush(dur): n = int(dur * SR); t = T(n); return (lp(rng.standard_normal(n), 700) * 1.4 + bp(rng.standard_normal(n), 1500, 5000) * .3) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .5)
def creak(dur=1.0): n = int(dur * SR); t = T(n); f = 140 + 60 * np.sin(2 * np.pi * .7 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (.5 + .5 * np.sign(np.sin(2 * np.pi * 30 * t))) * np.sin(np.pi * t / dur) * .3
def ping(): return chime(1800, .5) * .7 + chime(2700, .5) * .3
def bubble(): return boing(400, .2) * .4
def splash(): n = int(.9 * SR); t = T(n); return bp(rng.standard_normal(n), 400, 5000) * np.exp(-t * 5) * .8
def coinfx(): return chime(2400, .4) * .5
place(sfx, rush(4.2), .1, .6); place(sfx, crowd(2.0), 1.0, .35)
place(sfx, creak(1.2), wt(1, 'vat'), .4)
place(sfx, ping(), wt(2, 'iron'), .4)
place(sfx, creak(.8), wt(3, 'rings'), .5); place(sfx, ping(), wt(3, 'slipped'), .7); place(sfx, thud(90, .4), wt(3, 'slipped') + .1, .5)
for k in range(4): place(sfx, bubble(), S(4) + .2 + k * .3, .3)
place(sfx, hit(), wt(4, 'burst') - .05, 1.0); place(sfx, rush(2.4), wt(4, 'burst'), .6)
for k in range(3): place(sfx, hit(), wt(5, 'smashed') + k * .4, .6)
place(sfx, hit(), wt(6, 'broke'), .9); place(sfx, rush(2.0), wt(6, 'broke'), .6)
place(sfx, rush(3.8), S(7), .7); place(sfx, crowd(2.4), S(7) + .5, .4)
place(sfx, splash(), wt(8, 'crashed'), .6); place(sfx, rush(1.6), wt(8, 'flooded'), .4); place(sfx, chime(440, 1.6), wt(8, 'eight'), .3)
for k in range(4): place(sfx, splash(), wt(9, 'scooped') + k * .45, .3)
place(sfx, thud(110, .25), wt(10, 'god'), .9); place(sfx, stampfx(), wt(10, 'nobody'), .6)
place(sfx, stampfx(), wt(11, 'tax'), .5)
for k in range(5): place(sfx, coinfx(), wt(11, 'refunded') + k * .12, .35)
