def hit(): return thud(45, 1.0, 1.4) + lp(rng.standard_normal(int(1.0 * SR)), 400) * np.exp(-T(int(1.0 * SR)) * 4) * .6
def stampfx(): return thud(70, .4, 1.1) + hp(rng.standard_normal(int(.4 * SR)), 1500) * np.exp(-T(int(.4 * SR)) * 30) * .4
def meow(): n = int(.5 * SR); t = T(n); f = 520 + 260 * np.sin(np.pi * t / .5) - 120 * t; x = np.sin(2 * np.pi * np.cumsum(f) / SR) + .4 * np.sin(4 * np.pi * np.cumsum(f) / SR); return bp(x, 300, 3000) * np.sin(np.pi * t / .5) ** .7 * .35
def beep(f=1800): n = int(.08 * SR); t = T(n); return np.sin(2 * np.pi * f * t) * .25
def staticfx(dur): n = int(dur * SR); return hp(rng.standard_normal(n), 2500) * .1
def brakes(): n = int(.9 * SR); t = T(n); f = 2600 + 400 * np.sin(2 * np.pi * 9 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / .05) * np.exp(-t * 2) * .25
def horn(): n = int(.5 * SR); t = T(n); return lp(np.sign(np.sin(2 * np.pi * 350 * t)) + np.sign(np.sin(2 * np.pi * 440 * t)), 2500) * .12 * np.minimum(1, (.5 - t) / .05)
def purr(dur): n = int(dur * SR); t = T(n); return lp(rng.standard_normal(n), 200) * (.5 + .5 * np.sin(2 * np.pi * 25 * t)) * .5 * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .3)
def door(): return thud(110, .3, .9)
def cash(): return chime(2093, .5) + chime(2637, .5) * .7
place(sfx, meow(), 0.1, .6)
for k in range(3): place(sfx, beep(1600 + k * 300), 2.2 + k * .2, .5)
place(sfx, purr(2.0), wt(1, 'nobody') - .3, .6)
for k in range(3): place(sfx, beep(1200 + k * 400), wt(2, ['microphone', 'transmitter', 'antenna'][k]), .5)
place(sfx, stampfx(), wt(3, 'acoustic'), .5)
place(sfx, meow(), wt(4, 'hungry'), .5); place(sfx, boing(150, .5), wt(4, 'wandered'), .3)
place(sfx, stampfx(), wt(5, 'operated'), .5)
for k in range(5): place(sfx, cash(), wt(6, 'cost') + k * .18, .25)
place(sfx, staticfx(2.0), wt(7, 'listen'), .5)
place(sfx, door(), wt(8, 'let'), .6); place(sfx, meow(), wt(8, 'walked'), .4)
place(sfx, brakes(), wt(9, 'hit') - .5, .6); place(sfx, horn(), wt(9, 'hit') - .4, .5); place(sfx, hit(), wt(9, 'taxi') - .1, .9)
place(sfx, sparkle_sfx(), wt(10, 'lived'), .5); place(sfx, purr(2.0), wt(10, 'lived'), .5)
place(sfx, stampfx(), wt(11, 'not') - .05, .7); place(sfx, meow(), wt(11, 'practical') + .4, .5)
