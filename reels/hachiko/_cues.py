def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .35
def trainfx(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 500) * (.5 + .5 * (np.sin(2 * np.pi * 2.2 * t) > .6)) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3) * .6
def bell(): return chime(880, 1.4) * .5 + chime(1320, 1.4) * .25
def bark(): n = int(.18 * SR); t = T(n); f = 600 - 900 * t; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 12) * .5
def whine(): n = int(.7 * SR); t = T(n); f = 900 + 300 * np.sin(2 * np.pi * 1.5 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .7) * .15
def rain(dur): n = int(dur * SR); t = T(n); return hp(rng.standard_normal(n), 2500) * .2 * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5)
def wind(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 250, 1200) * np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5) * .4
def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
place(sfx, crowd(4.0), 0, .3)
place(sfx, bark(), wt(1, 'akita'), .4); place(sfx, bark(), wt(1, 'hachiko'), .4)
place(sfx, crowd(3.5), S(2), .3); place(sfx, bell(), wt(2, 'station'), .3)
place(sfx, trainfx(2.5), wt(3, 'train') - .8, .6); place(sfx, bark(), wt(3, 'home'), .5); place(sfx, bark(), wt(3, 'home') + .25, .5)
place(sfx, chime(440, 2.0), wt(4, 'died'), .3)
place(sfx, trainfx(2.5), S(5), .5); place(sfx, whine(), wt(5, 'waited'), .5)
place(sfx, rain(1.6), S(6) + 1.0, .5); place(sfx, bell(), S(6) + .2, .2); place(sfx, bell(), S(6) + 2.2, .2)
place(sfx, boing(200, .4), wt(7, 'shooed'), .3); place(sfx, sparkle_sfx(), wt(7, 'food'), .4)
place(sfx, paper(), wt(8, 'newspaper'), .5); place(sfx, crowd(2.0), wt(8, 'all'), .4)
place(sfx, sparkle_sfx(), wt(9, 'bronze'), .5); place(sfx, crowd(2.0), wt(9, 'hachiko'), .4)
place(sfx, wind(4.0), S(10), .4); place(sfx, chime(440, 2.5), wt(10, 'died'), .35)
place(sfx, crowd(4.0), S(11), .45)
