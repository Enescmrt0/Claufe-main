// ---------- "The 2,000-year-old vending machine" (portrait Short) ----------
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const G = 1240;
const SHOTS = [];
// [0] the first vending machine, almost 2,000 years ago (coin drops on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); temple(ctx, t, cam);
  const k = clamp(t / .6); heroMachine(ctx, 540, G, 620, t, { flow: t > .8 ? clamp((t - .8) / .3) : 0 });
  if (k < 1) coinB(ctx, 540, 300 + 280 * easeIn(k), 40, t * 10);
  label(ctx, 'VENDING MACHINE', 540, 230, 100, t, .1, '#ffffff', wt(0, '2') - .3); label(ctx, '2,000 YEARS OLD', 540, 230, 100, t, wt(0, '2') - .3, '#ffd23a');
} });
// [1] first century: Hero of Alexandria designed it for temples
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); temple(ctx, t, cam);
  hero(ctx, { x: 300, y: G + 160, s: 640, arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: 'happy', mouth: 'smug', look: [1, 0] } }); scroll2(ctx, 760, 900, 360, 440, t);
  chapterTag(ctx, t, S(1) + .05, '1ST CENTURY AD'); label(ctx, 'HERO OF ALEXANDRIA', 540, 230, 90, t, wt(1, 'hero') - .2, '#ffffff');
} });
// [2] it sold holy water
SHOTS.push({ start: S(2), end: S(3), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .06 }); temple(ctx, t, cam);
  heroMachine(ctx, 540, G, 620, t, { flow: 1 }); for (let i = 0; i < 5; i++) { const k = ((t * 1.5 + i / 5) % 1); ellipse(ctx, 540 + 155 + 70, G - 120 + k * 120, 8, 12); ctx.fillStyle = '#5ab0e8'; ctx.fill(); }
  sparkle(ctx, 780, 1000, 40, .8 + .2 * Math.sin(t * 6));
  label(ctx, 'HOLY WATER', 540, 240, 130, t, wt(2, 'holy') - .3, '#7fd0ff');
} });
// [3] drop a bronze coin into a slot at the top
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.3, dz: .04, y: 760 }); temple(ctx, t, cam);
  const k = clamp((t - wt(3, 'coin') + .1) / .8); heroMachine(ctx, 540, G, 620, t);
  drawStick(ctx, { cols: PAL.blue, hat: 'none', belt: false, x: 280, y: G + 100, s: 560, arms: { L: [.3, -.1], R: { ik: [.45, -1.05 + .1 * k] } }, face: { eyes: 'normal', mouth: 'smile', look: [1, -1] } });
  coinB(ctx, 540, G - 620 - 90 + 60 * easeIn(k), 30, t * 8);
  label(ctx, 'BRONZE COIN', 540, 470, 90, t, wt(3, 'bronze') - .3, '#ffd23a');
} });
// [4] the coin fell onto a small tray attached to a lever
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const k = clamp((t - S(4) - .2) / .8); heroMachine(ctx, 540, G, 860, t, { cut: true, coin: [-430 * .3 + 20, -860 - 20 + (860 * .22 - 0) * easeIn(k) * .95] });
  label(ctx, 'TRAY + LEVER', 540, 240, 120, t, wt(4, 'tray') - .3, '#ffd23a');
} });
// [5] the weight tips the tray, opens a valve, water pours out
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const tl = ease(clamp((t - wt(5, 'tipped') + .2) / .6)), fl = clamp((t - wt(5, 'poured') + .3) / .4);
  heroMachine(ctx, 540, G, 860, t, { cut: true, tilt: tl, flow: fl, coin: [-430 * .3 + 20, -860 * .78 - 22 + tl * 30] });
  label(ctx, 'TIPS', 540, 240, 110, t, wt(5, 'tipped') - .2, '#ffffff', wt(5, 'valve') - .2); label(ctx, 'VALVE OPENS', 540, 240, 110, t, wt(5, 'valve') - .2, '#ffffff', wt(5, 'poured') - .3); label(ctx, 'WATER!', 540, 240, 130, t, wt(5, 'poured') - .3, '#7fd0ff');
} });
// [6] coin slides off, lever pops back, water stops
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const sl = clamp((t - wt(6, 'slid') + .2) / .5), up = 1 - ease(clamp((t - wt(6, 'popped') + .2) / .4));
  heroMachine(ctx, 540, G, 860, t, { cut: true, tilt: up, flow: up, coin: sl < 1 ? [-430 * .3 + 20 - 60 * sl, -860 * .78 - 22 + 30 + 300 * sl * sl] : null });
  label(ctx, 'COIN SLIDES OFF', 540, 240, 96, t, wt(6, 'slid') - .2, '#ffffff', wt(6, 'stopped') - .2); label(ctx, 'WATER STOPS', 540, 240, 110, t, wt(6, 'stopped') - .2, '#ff6a5a');
} });
// [7] no coin, no water
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); temple(ctx, t, cam);
  heroMachine(ctx, 540, G, 620, t); drawStick(ctx, { cols: PAL.red, hat: 'none', belt: false, x: 900, y: G + 160, s: 460, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'half', mouth: 'frown' } });
  stamp(ctx, 540, 700, 'NO COIN, NO WATER', cue(t, S(7) + .1, .2), '#e0392f', -.1);
} });
// [8] when a vending machine eats your money, it's an ancient tradition
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgRoom(ctx, t, cam, { wall: '#c8d0dc', floor: '#5a5a6a' }); applyCam(ctx, cam, 1);
  const e = clamp((t - wt(8, 'eats') + .2) / .5); modernVend(ctx, 680, G, 760, t, e); drawStick(ctx, { cols: PAL.blue, hat: 'none', belt: false, x: 220, y: G + 160, s: 560, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: e > .5 ? 'squint' : 'normal', mouth: e > .5 ? 'teeth' : 'flat', look: [1, 0] } });
  label(ctx, 'IT ATE MY COIN', 540, 230, 100, t, wt(8, 'eats') - .2, '#ffffff', wt(8, 'ancient') - .3); label(ctx, 'ANCIENT TRADITION', 540, 230, 90, t, wt(8, 'ancient') - .3, '#ffd23a');
} });
