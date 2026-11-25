// ---------- "Bubble wrap was wallpaper" (portrait Short) ----------
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
const wallpaper = (ctx, t, k = 1) => { bubbleSheet(ctx, 540, 400, 2200, 1600, 30, () => false, { tint: `rgba(190,230,255,${.5 * k})` }); };
// [0] bubble wrap was invented to be wallpaper (pops on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); bgFlat(ctx, '#7fd0ff', '#2f7de0'); applyCam(ctx, cam, 1);
  const np = Math.floor(t * 6); bubbleSheet(ctx, 540, 900, 860, 760, 40, i => i < np);
  popStar(ctx, 300 + (np % 4) * 140, 640 + Math.floor(np / 4) % 4 * 100, 60, (t * 6) % 1);
  label(ctx, 'BUBBLE WRAP', 540, 230, 120, t, .05, '#ffffff', wt(0, 'wallpaper') - .3); label(ctx, '= WALLPAPER?!', 540, 230, 120, t, wt(0, 'wallpaper') - .3, '#ffd23a');
} });
// [1] 1957, two engineers sealed two shower curtains together, trapping air bubbles
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); const seal = t > wt(1, 'sealed') - .2; bgRoom(ctx, t, cam, { wall: '#d8e0e8', floor: '#7a6a5a' }); applyCam(ctx, cam, 1);
  if (!seal) { engineer(ctx, { x: 240, y: G + 160, s: 520, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'smile' } }, 0); engineer(ctx, { x: 860, y: G + 160, s: 520, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'smile' } }, 1); chapterTag(ctx, t, S(1) + .05, 'NEW JERSEY, 1957'); label(ctx, 'FIELDING & CHAVANNES', 540, 240, 76, t, wt(1, 'alfred') - .2, '#ffd23a'); }
  else { const k = clamp((t - wt(1, 'sealed') + .2) / 1.2); showerCurtain(ctx, 540 - 140 * (1 - k), 760, 460, 520, t, '#7fd0ff'); showerCurtain(ctx, 540 + 140 * (1 - k), 780, 460, 520, t + 1, 'rgba(255,255,255,.8)'); if (t > wt(1, 'trapping') - .2) bubbleSheet(ctx, 540, 820, 420, 380, 26); label(ctx, '2 SHOWER CURTAINS', 540, 240, 84, t, wt(1, 'shower') - .3, '#ffd23a'); }
} });
// [2] they thought it would make cool modern textured wallpaper
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); sealedRoom(ctx, t, cam, () => wallpaper(ctx, t)); applyCam(ctx, cam, 1);
  engineer(ctx, { x: 360, y: G + 160, s: 600, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, 0); for (let i = 0; i < 4; i++) star5(ctx, 160 + i * 250, 560 + Math.sin(t * 3 + i) * 20, 26, t + i);
  label(ctx, '"MODERN WALLPAPER"', 540, 240, 90, t, wt(2, 'modern') - .3, '#ffd23a');
} });
// [3] nobody wanted it
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .04 }); sealedRoom(ctx, t, cam, () => wallpaper(ctx, t, .7)); applyCam(ctx, cam, 1);
  for (let i = 0; i < 3; i++) drawStick(ctx, { cols: [PAL.blue, PAL.red, PAL.green][i], hat: 'none', belt: false, x: 220 + i * 320, y: G + 180, s: 440, arms: { L: [.9, -2.2], R: [.9, -2.2] }, face: { eyes: 'half', mouth: 'frown' } });
  stamp(ctx, 540, 600, 'NOBODY WANTED IT', cue(t, S(4) - .2 - (S(4) - S(3)) * .7, .2), '#e0392f', -.1);
} });
// [4] tried it as greenhouse insulation; didn't really work either
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgDay(ctx, t, cam); applyCam(ctx, cam, 1);
  greenhouse(ctx, 540, GY + 320, 760, 360); bubbleSheet(ctx, 540, GY + 140, 760, 360, 22, () => false, { tint: 'rgba(200,235,255,.3)' });
  if (t > wt(4, 'didn') - .2) stamp(ctx, 540, 420, 'MEH', cue(t, wt(4, 'didn') - .1, .2), '#e0392f', .1);
  label(ctx, 'GREENHOUSE INSULATION', 540, 240, 76, t, wt(4, 'insulation') - .4, '#ffffff');
} });
// [5] 1960: IBM needed to protect its new computers during shipping
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgRoom(ctx, t, cam, { wall: '#c8d0dc', floor: '#5a5a6a' }); applyCam(ctx, cam, 1);
  computer60(ctx, 540, 1150, 440, t); box(ctx, 860, 1240, 260, 200, .5);
  chapterTag(ctx, t, S(5) + .05, '1960'); label(ctx, 'FRAGILE COMPUTERS', 540, 240, 90, t, wt(5, 'computers') - .3, '#ffffff');
} });
// [6] the bubbles were perfect
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#7ee08a', '#2a8a4a'); applyCam(ctx, cam, 1);
  box(ctx, 540, 1250, 560, 420, .7); bubbleSheet(ctx, 540, 930, 520, 300, 30); for (let i = 0; i < 4; i++) star5(ctx, 200 + i * 230, 560 + Math.sin(t * 3 + i) * 20, 30, t + i);
  label(ctx, 'PERFECT!', 540, 260, 150, t, wt(6, 'perfect') - .3, '#ffffff');
} });
// [7] failed wallpaper became one of the most popular packing materials
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); bgFlat(ctx, '#d9a05b', '#a8703a'); applyCam(ctx, cam, 1);
  const n = Math.floor(clamp((t - S(7)) / 1.8) * 15); for (let i = 0; i < n; i++) box(ctx, 140 + (i % 5) * 200, 1240 - Math.floor(i / 5) * 180, 180, 170, 0);
  label(ctx, 'PACKING LEGEND', 540, 240, 110, t, wt(7, 'packing') - .3, '#ffffff');
} });
// [8] and the most satisfying thing to pop
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .06 }); bgFlat(ctx, '#7fd0ff', '#2f7de0'); applyCam(ctx, cam, 1);
  const np = Math.floor((t - S(8)) * 10); bubbleSheet(ctx, 540, 900, 860, 760, 40, i => i < np && i % 3 !== 1);
  popStar(ctx, 300 + (np % 4) * 140, 640 + Math.floor(np / 4) % 4 * 100, 60, ((t - S(8)) * 10) % 1);
  label(ctx, 'POP!', 540, 260, 160, t, wt(8, 'pop') - .2, '#ffd23a');
} });
