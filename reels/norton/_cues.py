def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def laugh(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 500, 2200) * (.5 + .5 * (np.sin(2 * np.pi * 6 * t) > 0)) * np.minimum(1, t / .2) * np.minimum(1, (dur - t) / .3) * .5
def whistle(dur=.8): n = int(dur * SR); t = T(n); f = 2800 * (1 + .04 * np.sin(2 * np.pi * 30 * t)); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / .03) * np.minimum(1, (dur - t) / .05) * .2
def bell(): return chime(880, 1.6) * .6 + chime(1320, 1.6) * .3
def coinfx(): return chime(2400, .4) * .5
def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
def snore(): n = int(1.0 * SR); t = T(n); return lp(rng.standard_normal(n), 300) * np.sin(np.pi * t) * .5
place(sfx, hit(), 0, .4); place(sfx, sparkle_sfx(), wt(0, 'emperor'), .5); place(sfx, crowd(2.0), wt(0, 'and'), .5)
for k in range(4): place(sfx, coinfx(), wt(1, 'fortune') + k * .15, .35)
place(sfx, boing(120, .5), wt(1, 'rice'), .3)
place(sfx, paper(), wt(2, 'letter'), .5); place(sfx, stampfx(), wt(2, 'printed'), .6)
place(sfx, sparkle_sfx(), wt(3, 'gold'), .4); place(sfx, sparkle_sfx(), wt(3, 'feather'), .4)
place(sfx, stampfx(), wt(4, 'congress'), .5); place(sfx, snore(), wt(4, 'nobody'), .5)
place(sfx, crowd(2.0), S(5), .4); place(sfx, chime(1760, .6), wt(5, 'free'), .3)
for k in range(3): place(sfx, coinfx(), wt(5, 'money') + k * .12, .35)
place(sfx, whistle(), wt(6, 'arrested') - .2, .6); place(sfx, crowd(2.2), wt(6, 'furious') - .3, .7); place(sfx, chime(1320, .6), wt(6, 'saluted'), .35)
place(sfx, kaching() if 'kaching' in dir() else chime(2093, .6), wt(7, 'paid'), .4)
place(sfx, laugh(1.4), wt(8, 'people'), .7)
place(sfx, sparkle_sfx(), wt(9, 'bay'), .6); place(sfx, crowd(2.0), wt(9, 'opened'), .5)
for k in range(3): place(sfx, bell(), S(10) + .2 + k * 1.6, .35)
