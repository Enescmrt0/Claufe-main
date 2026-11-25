// ---------- "Ketchup was sold as medicine" (portrait Short) ----------
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
// [0] ketchup was once sold in pharmacies, as medicine
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); pharmacy(ctx, t, cam);
  ketchupBottle(ctx, 540, 1000, 620 * backOut(cue(t, .05, .35)), { text: 'MEDICINE' }); burst(ctx, 820, 460, 90, 10, '#ffd23a', 4); text(ctx, 'Rx', 820, 460, 70, '#c8221a', INK, 0);
  label(ctx, 'KETCHUP', 540, 230, 130, t, .1, '#ffffff', wt(0, 'medicine') - .2); label(ctx, '= MEDICINE?!', 540, 230, 120, t, wt(0, 'medicine') - .2, '#ffd23a');
} });
// [1] the first ketchups: mushrooms, walnuts, even fish
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); kitchen(ctx, t, cam);
  const a = cue(t, wt(1, 'mushrooms') - .2, .3), b = cue(t, wt(1, 'walnuts') - .2, .3), c = cue(t, wt(1, 'fish') - .2, .3);
  if (t < wt(1, 'mushrooms') - .2) { tomato(ctx, 540, 820, 160); line(ctx, 380, 660, 700, 980, 22, '#e0392f'); line(ctx, 700, 660, 380, 980, 22, '#e0392f'); }
  if (a > 0) mushroom(ctx, 220, 1060, 260 * backOut(a)); if (b > 0) walnut(ctx, 540, 960, 260 * backOut(b)); if (c > 0) fish(ctx, 860, 960, 320 * backOut(c), -.2);
  label(ctx, 'NOT TOMATO', 540, 260, 120, t, wt(1, 'tomatoes') - .3, '#ff6a5a', wt(1, 'mushrooms') - .2); label(ctx, t < wt(1, 'fish') - .2 ? 'MUSHROOM · WALNUT' : '...EVEN FISH', 540, 260, 96, t, wt(1, 'mushrooms') - .2, '#ffffff');
} });
// [2] 1834: Dr. John Cook Bennett claimed tomatoes cure diarrhea and indigestion
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#7a5a3a' }); applyCam(ctx, cam, 1);
  bennett(ctx, { x: 320, y: G + 160, s: 620, arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: 'happy', mouth: 'smug', look: [1, 0] } }); tomato(ctx, 320 + .42 * 620 + 60, G + 160 - .55 * 620, 80, { face: true });
  const st = t > wt(2, 'diarrhea') - .2; if (st) { for (const [i, s] of [[0, 'DIARRHEA ✓'], [1, 'INDIGESTION ✓']]) if (t > wt(2, i ? 'indigestion' : 'diarrhea') - .2) { rrect(ctx, 620, 720 + i * 120, 400, 90, 14); fillStroke(ctx, '#ffffff', 5); text(ctx, s, 820, 765 + i * 120, 44, '#2a8a4a', INK, 0); } }
  chapterTag(ctx, t, S(2) + .05, '1834'); label(ctx, 'DR. JOHN COOK BENNETT', 540, 250, 76, t, wt(2, 'john') - .2, '#ffffff', wt(2, 'cure') - .2); label(ctx, '"TOMATOES CURE!"', 540, 250, 100, t, wt(2, 'cure') - .2, '#ffd23a');
} });
// [3] he published tomato ketchup recipes; people believed him
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); kitchen(ctx, t, cam);
  drawBook(ctx, 540, 760, 2.6, '#7a1a12'); ketchupBottle(ctx, 300, 1060, 320); for (let i = 0; i < 4; i++) tomato(ctx, 700 + (i % 2) * 140, 960 + Math.floor(i / 2) * 120, 60);
  const bl = t > wt(3, 'believed') - .2; if (bl) for (let i = 0; i < 3; i++) drawStick(ctx, { cols: [PAL.blue, PAL.red, PAL.green][i], hat: 'none', belt: false, x: 220 + i * 320, y: G + 300, s: 300, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  label(ctx, 'TOMATO RECIPES', 540, 260, 100, t, wt(3, 'recipes') - .2, '#c8221a', wt(3, 'believed') - .2); label(ctx, 'PEOPLE BELIEVED', 540, 260, 100, t, wt(3, 'believed') - .2, '#2a8a4a');
} });
// [4] salesmen sold tomato pills promising cures for almost anything
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); bgDay(ctx, t, cam); applyCam(ctx, cam, 1);
  wagon(ctx, 700, GY + 300, 560, t * .5);
  const so = bennett(ctx, { x: 260, y: G + 160, s: 560, arms: { L: [2.5, .3], R: { ik: [.42, -.5] } }, face: { eyes: 'happy', mouth: 'grin' } }); pillBox(ctx, 260 + .42 * 560 + 40, G + 160 - .5 * 560, 200, -.1);
  for (let i = 0; i < 5; i++) { const r = rng(i * 3 + 2); pill(ctx, 120 + r() * 840, 420 + ((t * 260 + r() * 500) % 600), 30, t * 3 + i); }
  label(ctx, 'TOMATO PILLS!', 540, 250, 120, t, wt(4, 'tomato') - .2, '#c8221a', wt(4, 'cures') - .2); label(ctx, 'CURES EVERYTHING*', 540, 250, 96, t, wt(4, 'cures') - .2, '#ffd23a');
} });
// [5] it became a craze
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05, shake: 6 }); bgFlat(ctx, '#ff7a6a', '#c8322c'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) { const j = Math.abs(Math.sin(t * 8 + i)) * 20; drawStick(ctx, { cols: [PAL.blue, PAL.red, PAL.green, PAL.purple, PAL.yellow][i % 5], hat: 'none', belt: false, x: 70 + i * 120, y: G + 40 - j, s: 340, arms: { L: [2.5, .3], R: { ik: [.3, -.62] } }, face: { eyes: 'happy', mouth: 'grin' } }); pillBox(ctx, 70 + i * 120 + .3 * 340, G + 40 - j - .62 * 340 - 20, 100, -.2); }
  label(ctx, 'A CRAZE', 540, 300, 150, t, wt(5, 'craze') - .3, '#ffffff');
} });
// [6] the pills barely had tomato; the craze collapsed by the 1850s
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const col = t > wt(6, 'collapsed') - .3; bgFlat(ctx, col ? '#4a3a4a' : '#2a3f5f', col ? '#1a141a' : '#1a2840'); applyCam(ctx, cam, 1);
  if (!col) { pill(ctx, 520, 820, 160, .2); magnifier(ctx, 620, 920, 300, -.6); text(ctx, 'WHERE IS THE TOMATO?', 540, 1120, 56, '#ff9a8a', INK, 0); label(ctx, 'BARELY ANY TOMATO', 540, 260, 90, t, wt(6, 'barely') - .2, '#ff6a5a'); }
  else { const k = ease(clamp((t - wt(6, 'collapsed') + .3) / .8)); pillBox(ctx, 540, 840 + 260 * k, 360, k * 1.2); stamp(ctx, 540, 640, 'COLLAPSED', cue(t, wt(6, 'collapsed') - .1, .2), '#e0392f', -.1); chapterTag(ctx, t, wt(6, 'collapsed') - .2, '1850s'); }
} });
// [7] ketchup survived: kitchen, not pharmacy
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); kitchen(ctx, t, cam);
  ketchupBottle(ctx, 380, 1080, 520, { rot: -.15 }); fries(ctx, 760, 1080, 380); for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 560 + Math.sin(t * 3 + i) * 20, 26, t + i);
  label(ctx, 'KITCHEN ✓', 540, 230, 120, t, wt(7, 'kitchen') - .2, '#2a8a4a'); label(ctx, 'PHARMACY ✗', 540, 360, 100, t, wt(7, 'pharmacy') - .2, '#c8221a');
} });
