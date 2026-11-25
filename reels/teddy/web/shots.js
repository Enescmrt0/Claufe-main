// ---------- "The origin of the teddy bear" (portrait Short) ----------
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
// [0] the teddy bear exists because a president refused to shoot a bear
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  const k = backOut(cue(t, .05, .35)); teddy(ctx, 540, 1250, 720 * k, { t, wave: true, bow: true });
  label(ctx, 'THE TEDDY BEAR', 540, 230, 110, t, .1, '#ffffff', wt(0, 'president') - .2); label(ctx, '...A PRESIDENT', 540, 230, 110, t, wt(0, 'president') - .2, '#2a4a9a', wt(0, 'refused') - .2); label(ctx, 'SAID NO', 540, 230, 140, t, wt(0, 'refused') - .2, '#c8322c');
} });
// [1] 1902: Roosevelt bear hunting in Mississippi, found nothing for days
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); woods(ctx, t, cam);
  roosevelt(ctx, { x: 360 + Math.sin(t * 2) * 30, y: G + 160, s: 620, arms: { L: { ik: [-.1, -.4] }, R: { ik: [.3, -.42] } }, face: { eyes: t > wt(1, 'days') - .2 ? 'half' : 'squint', mouth: 'flat', look: [1, 0] } }); rifle(ctx, 440, G + 160 - .42 * 620, 300, -.3);
  chapterTag(ctx, t, S(1) + .05, 'MISSISSIPPI, 1902'); label(ctx, 'THEODORE ROOSEVELT', 540, 260, 84, t, wt(1, 'theodore') - .2, '#ffffff', wt(1, 'days') - .2); label(ctx, 'NO BEAR. FOR DAYS.', 540, 260, 90, t, wt(1, 'days') - .2, '#ffd23a');
} });
// [2] guides caught a black bear, tied it to a tree: take the shot
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); woods(ctx, t, cam);
  treeSimple(ctx, 820, G + 40, 700, '#3a8a4a'); blackBear(ctx, 700, G + 120, 420, { flip: -1, sad: true }); if (t > wt(2, 'tied') - .2) ropeLine(ctx, [[790, 900], [640, 980], [560, 1060]]);
  for (let i = 0; i < 2; i++) drawStick(ctx, { cols: ['#6a5a3a', '#6a5a3a'], hat: 'none', belt: false, x: 160 + i * 180, y: G + 180, s: 440, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'grin', look: [1, 0] } });
  label(ctx, 'TIED TO A TREE', 540, 260, 100, t, wt(2, 'tied') - .2, '#ffffff', wt(2, 'shot') - .3); label(ctx, '"TAKE THE SHOT"', 540, 260, 100, t, wt(2, 'shot') - .3, '#ffd23a');
} });
// [3] Roosevelt refused: not fair
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .05 }); woods(ctx, t, cam);
  roosevelt(ctx, { x: 360, y: G + 160, s: 680, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'squint', mouth: 'frown' } }); rifle(ctx, 200, G - 30, 300, 1.3);
  blackBear(ctx, 820, G + 120, 360, { flip: -1 });
  stamp(ctx, 540, 520, 'NOT FAIR!', cue(t, wt(3, 'fair') - .3, .2), '#e0392f', -.1); label(ctx, 'HE REFUSED', 540, 260, 120, t, wt(3, 'refused') - .2, '#ffffff');
} });
// [4] a cartoonist drew the moment; it ran in newspapers across the country
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const n = t > wt(4, 'newspapers') - .2 ? 1 + Math.floor(clamp((t - wt(4, 'newspapers') + .2) / 1.0) * 4) : 1;
  for (let i = n - 1; i >= 0; i--) paperPage(ctx, 540 + (i ? (i % 2 ? -1 : 1) * 200 : 0), 860 + i * 30, 520 - i * 40, (i ? (i % 2 ? -.15 : .15) : -.03), (c, s) => { drawStick(c, { cols: ['#a89a6a', '#a89a6a'], hat: 'none', belt: false, x: -s * .2, y: s * .22, s: s * .45, flip: 1, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'squint', mouth: 'frown' } }); blackBear(c, s * .22, s * .2, s * .3, { flip: -1, sad: true }); });
  label(ctx, 'A CARTOON', 540, 260, 120, t, wt(4, 'cartoonist') - .2, '#ffffff', wt(4, 'newspapers') - .2); label(ctx, 'NATIONWIDE', 540, 260, 120, t, wt(4, 'newspapers') - .2, '#ffd23a');
} });
// [5] in Brooklyn, candy shop owner Morris Michtom saw it
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); shopFront(ctx, t, cam);
  const so = { cols: ['#3a3a44', '#ffffff'], hat: 'none', belt: false, x: 540, y: G + 160, s: 560, arms: { L: { ik: [-.3, -.4] }, R: { ik: [.3, -.4] } }, face: { eyes: 'wide', mouth: 'o', look: [0, 1] } }; drawStick(ctx, so); moustache(ctx, so);
  paperPage(ctx, 540, G + 160 - .36 * 560, 200, 0);
  chapterTag(ctx, t, S(5) + .05, 'BROOKLYN, NEW YORK'); label(ctx, 'MORRIS MICHTOM', 540, 230, 100, t, wt(5, 'morris') - .2, '#ffd23a');
} });
// [6] his wife Rose sewed a stuffed bear; sign in the window: Teddy's bear
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const win = t > wt(6, 'window') - .3;
  if (!win) { bgRoom(ctx, t, cam, { wall: '#e8d0b0', floor: '#9a6a3a' }); applyCam(ctx, cam, 1); const so = { cols: ['#c85a8a', '#c85a8a'], hat: 'none', belt: false, x: 280, y: G + 160, s: 560, arms: { L: { ik: [.3, -.42] }, R: { ik: [.42, -.5 + Math.sin(t * 8) * .05] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 1] } }; drawStick(ctx, so); hairBun(ctx, so); const k = clamp((t - wt(6, 'sewed') + .2) / 1.4); teddy(ctx, 680, G - 20, 360 * (.3 + .7 * k)); needle(ctx, 560, G - 260 + Math.sin(t * 8) * 20, 80, -.5); label(ctx, 'ROSE SEWED IT', 540, 260, 104, t, wt(6, 'rose') - .2, '#ffffff'); }
  else { shopFront(ctx, t, cam); teddy(ctx, 540, 1050, 420, { bow: true, t, wave: true }); signCard(ctx, 540, 600, 520, 130, "TEDDY'S BEAR", -.04);  }
} });
// [7] it sold out; then thousands more
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); bgFlat(ctx, '#ff9ad0', '#c85a9a'); applyCam(ctx, cam, 1);
  const so = t > wt(7, 'sold') - .1 && t < wt(7, 'thousands') - .3;
  if (so) stamp(ctx, 540, 860, 'SOLD OUT', cue(t, wt(7, 'sold') - .1, .2), '#e0392f', -.12);
  else { const n = Math.floor(clamp((t - wt(7, 'thousands') + .3) / 1.0) * 24); for (let i = 0; i < n; i++) teddy(ctx, 110 + (i % 6) * 172, 700 + Math.floor(i / 6) * 190, 190, { col: ['#b8763a', '#c8864a', '#a8662a'][i % 3], bow: i % 2 === 0 }); }
  label(ctx, 'SOLD OUT', 540, 260, 120, t, wt(7, 'sold') - .1, '#ffffff', wt(7, 'thousands') - .3); label(ctx, 'THOUSANDS MORE', 540, 260, 104, t, wt(7, 'thousands') - .3, '#ffd23a');
} });
// [8] every teddy bear is named after a president who said no
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  roosevelt(ctx, { x: 300, y: G + 160, s: 620, arms: { L: [.3, -.1], R: { ik: [.38, -.52] } }, face: { eyes: 'happy', mouth: 'grin' } }); teddy(ctx, 300 + .38 * 620 + 120, G + 160 - .52 * 620 + 120, 300, { bow: true, t, wave: true });
  for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 560 + Math.sin(t * 3 + i) * 20, 26, t + i);
  label(ctx, 'NAMED AFTER', 540, 230, 110, t, wt(8, 'named') - .2, '#ffffff'); label(ctx, '"TEDDY" ROOSEVELT', 540, 350, 90, t, wt(8, 'president') - .2, '#2a4a9a');
} });
