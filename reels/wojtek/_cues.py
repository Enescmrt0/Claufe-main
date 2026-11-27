def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def crowd(dur): n = int(dur * SR); t = T(n); return bp(rng.standard_normal(n), 300, 2500) * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .4) * .45
def growl(dur=.8): n = int(dur * SR); t = T(n); f = 90 + 20 * np.sin(2 * np.pi * 3 * t); return lp(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (1 + .3 * rng.standard_normal(n)), 600) * np.sin(np.pi * t / dur) * .5
def gulp(): return boing(180, .25) * .6
def horn(dur=1.4): n = int(dur * SR); t = T(n); return (np.sin(2 * np.pi * 110 * t) + .5 * np.sin(2 * np.pi * 220 * t)) * np.minimum(1, t / .1) * np.minimum(1, (dur - t) / .2) * .35
def gun(): return thud(40, .8, 1.6) + lp(rng.standard_normal(int(.8 * SR)), 900) * np.exp(-T(int(.8 * SR)) * 6) * .8
def paper(): n = int(.25 * SR); t = T(n); return bp(rng.standard_normal(n), 1500, 6000) * np.sin(np.pi * t / .25) * .5
place(sfx, growl(), wt(0, 'bear'), .5); place(sfx, stampfx(), wt(0, 'enlisted'), .4)
place(sfx, sparkle_sfx(), wt(1, 'tiny'), .4); place(sfx, chime(1320, .6), wt(1, 'wojtek'), .35)
for k in range(3): place(sfx, gulp(), wt(2, 'milk') + k * .3, .4)
place(sfx, gulp(), wt(2, 'beer'), .5); place(sfx, gulp(), wt(2, 'beer') + .3, .5)
for k in range(4): place(sfx, thud(80, .3), wt(3, 'wrestled') + k * .35, .4)
place(sfx, growl(.6), wt(3, 'ate'), .4)
place(sfx, horn(), wt(4, 'sail'), .5); place(sfx, stampfx(), wt(4, 'not'), .5)
place(sfx, paper(), wt(5, 'soldier'), .5); place(sfx, stampfx(), wt(5, 'private'), .5); place(sfx, stampfx(), wt(5, 'name'), .35); place(sfx, stampfx(), wt(5, 'number'), .35); place(sfx, stampfx(), wt(5, 'rations'), .35)
for k in range(3): place(sfx, gun(), S(6) + .1 + k * 1.1, .5)
place(sfx, growl(), wt(7, 'carried'), .4); place(sfx, gun(), wt(7, 'heavy'), .35); place(sfx, gun(), wt(7, 'gunners'), .35)
place(sfx, sparkle_sfx(), wt(8, 'badge'), .5)
place(sfx, crowd(2.0), wt(9, 'promoted'), .5); place(sfx, chime(1760, .6), wt(9, 'corporal'), .4)
place(sfx, sparkle_sfx(), wt(10, 'zoo'), .3)
place(sfx, crowd(1.6), wt(11, 'spoke'), .3); place(sfx, growl(), wt(11, 'wrestle'), .5); place(sfx, thud(80, .3), wt(11, 'climbed'), .4)
