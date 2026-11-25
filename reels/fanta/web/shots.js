// ---------- "How Fanta was invented" (portrait Short) ----------
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
// [0] Fanta was invented because Germany couldn't get Coca-Cola (cap pops on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#ff9a2a', '#e05a1a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .18; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  const pop = t > .25; sodaBottle(ctx, 540, 1250, 720, '#ff8a1a', { t, open: pop, text: 'FANTA' }); if (pop) { const k = clamp((t - .25) / .6); rrect(ctx, 500 + 200 * k, 530 - 500 * k, 80, 28, 4); fillStroke(ctx, '#c8c8d0', 5); for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * .2; circle(ctx, 540 + Math.cos(a) * 200 * k, 530 + Math.sin(a) * 300 * k, 14 * (1 - k * .5)); ctx.fillStyle = '#fff6d0'; ctx.fill(); } }
  label(ctx, 'INVENTED BECAUSE', 540, 230, 84, t, .2, '#ffffff', wt(0, 'coca') - .2); label(ctx, 'NO COKE!', 540, 230, 140, t, wt(0, 'coca') - .2, '#ffffff');
} });
// [1] 1940, WWII: syrup couldn't reach Germany
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgDay(ctx, t, cam, { top: '#8aa0b8', bot: '#d8dce0' }); applyCam(ctx, cam, 1);
  const k = clamp((t - S(1)) / 1.6); syrupBarrel(ctx, -100 + 520 * ease(k), GY + 300, 300); borderGate(ctx, 820, GY + 300, 420, 1);
  if (k >= 1) stamp(ctx, 540, 640, 'BLOCKED', cue(t, wt(1, 'reach') - .2, .2), '#e0392f', -.12);
  chapterTag(ctx, t, S(1) + .05, 'GERMANY, 1940'); label(ctx, 'NO SYRUP', 540, 260, 120, t, wt(1, 'syrup') - .2, '#ffffff');
} });
// [2] the boss, Max Keith, made a new drink from whatever was left
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); factoryHall(ctx, t, cam);
  keith(ctx, { x: 360, y: G + 160, s: 620, arms: { L: [.9, -2.2], R: [2.2, .3] }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }); qmark(ctx, 820, 700, 140, '#ffd23a');
  for (let i = 0; i < 3; i++) sodaBottle(ctx, 720 + i * 110, 1150, 240, 'rgba(0,0,0,0)', { label: false, fill: 0 });
  label(ctx, 'MAX KEITH', 540, 260, 120, t, wt(2, 'max') - .2, '#ffd23a', wt(2, 'whatever') - .2); label(ctx, 'USE LEFTOVERS', 540, 260, 104, t, wt(2, 'whatever') - .2, '#ffffff');
} });
// [3] whey (cheese leftovers) and apple pulp (cider scraps)
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const ap = t > wt(3, 'apple') - .2; bgFlat(ctx, ap ? '#c8e0a0' : '#fff2c8', ap ? '#8ab860' : '#f2d080'); applyCam(ctx, cam, 1);
  if (!ap) { cheeseWheel(ctx, 340, 1080, 380); bucket(ctx, 800, 1180, 340, '#eef2d8', 'WHEY'); line(ctx, 540, 960, 640, 960, 10); path(ctx, [[640, 935], [680, 960], [640, 985]]); ctx.fillStyle = INK; ctx.fill(); label(ctx, 'CHEESE LEFTOVERS', 540, 260, 90, t, wt(3, 'whey') - .2, '#ffffff'); }
  else { for (let i = 0; i < 6; i++) apple(ctx, 220 + (i % 3) * 140, 900 + Math.floor(i / 3) * 140, 60, 1, i % 2 ? '#e0392f' : '#9ad84a'); bucket(ctx, 820, 1180, 340, '#d8b87a', 'PULP'); label(ctx, 'APPLE SCRAPS', 540, 260, 110, t, wt(3, 'apple') - .2, '#ffffff'); }
} });
// [4] "use your imagination": Fantasie
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#7a4bc4', '#3a1c66'); applyCam(ctx, cam, 1);
  keith(ctx, { x: 300, y: G + 160, s: 560, arms: { L: [.3, -.1], R: [2.6, .2] }, face: { eyes: 'happy', mouth: 'grin' } });
  for (let i = 0; i < 3; i++) drawStick(ctx, { cols: ['#ffffff', '#ffffff'], hat: 'none', belt: false, x: 650 + i * 150, y: G + 180, s: 380, flip: -1, arms: { L: [.3, -.1], R: [2.9, -.6] }, face: { eyes: 'squint', mouth: 'flat', look: [-1, -1] } });
  thought(ctx, 600, 560, 1.4, 420, 900); drawBulb(ctx, 600, 540, 110, 1);
  label(ctx, 'IMAGINATION', 540, 260, 110, t, wt(4, 'imagination') - .2, '#ffffff', wt(4, 'fantasie') - .2); label(ctx, '"FANTASIE"', 540, 260, 130, t, wt(4, 'fantasie') - .2, '#ffd23a');
} });
// [5] a salesman shouted: Fanta!
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05, shake: 8 }); bgFlat(ctx, '#ffd23a', '#ff9a2a'); applyCam(ctx, cam, 1);
  burst(ctx, 620, 640, 330, 14, '#ffffff', 3); drawStick(ctx, { cols: ['#3a5a9a', '#3a5a9a'], hat: 'none', belt: false, x: 330, y: G + 160, s: 640, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'wide', mouth: 'o' } });
  text(ctx, 'FANTA!', 620, 640, 170, '#ff6a1a', INK, 20); text(ctx, 'FANTA!', 620, 640, 170, '#ff6a1a', INK, 0);
} });
// [6] it sold millions of bottles during the war
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); factoryHall(ctx, t, cam);
  const n = Math.floor(clamp((t - S(6)) / 1.4) * 15); for (let i = 0; i < n; i++) crate(ctx, 160 + (i % 5) * 190, G - Math.floor(i / 5) * 150, 180);
  label(ctx, 'MILLIONS SOLD', 540, 260, 110, t, wt(6, 'millions') - .2, '#ffd23a');
} });
// [7] orange came later: 1955, Italy
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgDay(ctx, t, cam, { top: '#4aa8f0', bot: '#fff0c8' }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) { const r = rng(i * 7 + 2); orangeFruit(ctx, 80 + r() * 920, ((t * 300 * (.6 + r()) + r() * 900) % 1100) + 200, 50 + r() * 30, t + i); }
  sodaBottle(ctx, 540, 1250, 560, '#ff8a1a', { t, text: 'FANTA' });
  chapterTag(ctx, t, S(7) + .05, 'ITALY, 1955'); label(ctx, 'ORANGE CAME LATER', 540, 260, 88, t, wt(7, 'orange') - .2, '#ff8a1a');
} });
// [8] remember: cheese water and apple scraps
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#ff9a2a', '#e05a1a'); applyCam(ctx, cam, 1);
  sodaBottle(ctx, 540, 1250, 620, '#ff8a1a', { t, text: 'FANTA', open: true });
  const a = cue(t, wt(8, 'cheese') - .2, .3), b = cue(t, wt(8, 'apple') - .2, .3); if (a > 0) cheeseWheel(ctx, 220, 760, 220 * backOut(a)); if (b > 0) apple(ctx, 860, 720, 80 * backOut(b), 1);
  label(ctx, 'CHEESE WATER', 540, 260, 110, t, wt(8, 'cheese') - .2, '#ffffff'); label(ctx, '+ APPLE SCRAPS', 540, 380, 96, t, wt(8, 'apple') - .2, '#ffd23a');
} });
