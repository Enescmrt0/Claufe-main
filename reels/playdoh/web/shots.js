// ---------- "Play-Doh was wallpaper cleaner" (portrait Short) ----------
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
const DC = ['#e0392f', '#f2b52a', '#2f7de0', '#3aa35b'];
// [0] Play-Doh was invented to clean wallpaper
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); const k = clamp(t / 2.2);
  sootyWall(ctx, cam, .7, () => { ctx.rect(140, 560, 800 * k, 360); });
  doughBlob(ctx, 140 + 800 * k, 740, 160, '#e8e0c8', t, { dirt: true });
  label(ctx, 'PLAY-DOH', 540, 230, 130, t, .05, '#ffd23a', wt(0, 'wallpaper') - .3); label(ctx, '= WALL CLEANER', 540, 230, 104, t, wt(0, 'wallpaper') - .3, '#ffffff');
} });
// [1] 1930s: coal heating, soot turned wallpaper black
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const d = clamp((t - wt(1, 'soot') + .3) / 1.4); sootyWall(ctx, cam, .1 + .65 * d); applyCam(ctx, cam, 1);
  coalStove(ctx, 540, G + 20, 420, t);
  chapterTag(ctx, t, S(1) + .05, '1930s'); label(ctx, 'COAL SOOT', 540, 240, 120, t, wt(1, 'soot') - .2, '#ffffff');
} });
// [2] a Cincinnati soap company made squishy putty you rolled across walls
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const k = clamp((t - wt(2, 'rolled') + .3) / 1.5);
  sootyWall(ctx, cam, .65, () => { ctx.rect(180, 730, 700 * k, 200); }); applyCam(ctx, cam, 1);
  const so = drawStick(ctx, { cols: ['#5a7aa8', '#5a7aa8'], hat: 'none', belt: false, x: 160 + 700 * k, y: G + 160, s: 600, arms: { L: [.3, -.1], R: { ik: [.1, -.95] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, -1] } });
  doughBlob(ctx, 180 + 700 * k, 830, 90, '#e8e0c8', t, { dirt: k > .2 });
  chapterTag(ctx, t, S(2) + .05, 'CINCINNATI'); label(ctx, 'ROLL IT ON THE WALL', 540, 240, 84, t, wt(2, 'rolled') - .3, '#ffd23a');
} });
// [3] homes switched to cleaner heating; nobody needed it
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); sootyWall(ctx, cam, 0); applyCam(ctx, cam, 1);
  rrect(ctx, 380, 1000, 320, 200, 20); fillStroke(ctx, '#e8e8f0', 6); for (let i = 0; i < 6; i++) line(ctx, 400 + i * 50, 1020, 400 + i * 50, 1180, 8, '#c8ccd4');
  can(ctx, 860, G - 10, 240, '#9aa0aa', 'CLEANER'); if (t > wt(4 > 0 ? 3 : 3, 'nobody') - .2) { line(ctx, 760, 900, 960, 1200, 16, '#e0392f'); line(ctx, 960, 900, 760, 1200, 16, '#e0392f'); }
  label(ctx, 'CLEAN HEATING', 540, 240, 110, t, wt(3, 'cleaner') - .3, '#2a8a4a', wt(3, 'nobody') - .2); label(ctx, 'NOBODY NEEDS IT', 540, 240, 96, t, wt(3, 'nobody') - .2, '#e0392f');
} });
// [4] the company was about to go under
SHOTS.push({ start: S(4), end: S(5), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .04, shake: 5 }); bgFlat(ctx, '#4a3a4a', '#1a141a'); applyCam(ctx, cam, 1);
  factorySign(ctx, 540, 600, 700, 'KUTOL PRODUCTS'); drawRainCloud(ctx, 540, 380, 1.4, t);
  const k = clamp((t - S(4)) / 1.2); line(ctx, 200, 800, 400, 900 + 200 * k, 12, '#e0392f'); line(ctx, 400, 900 + 200 * k, 640, 1000 + 120 * k, 12, '#e0392f'); line(ctx, 640, 1000 + 120 * k, 880, 1180 + 60 * k, 12, '#e0392f');
  label(ctx, 'ALMOST BROKE', 540, 240, 120, t, wt(4, 'under') - .4, '#ff6a5a');
} });
// [5] a nursery school teacher, Kay Zufall, saw kids making shapes with it
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); classroom(ctx, t, cam);
  const kz = { cols: ['#c85a8a', '#c85a8a'], hat: 'none', belt: false, x: 160, y: G + 160, s: 560, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }; drawStick(ctx, kz); hairBun(ctx, kz);
  for (let i = 0; i < 3; i++) { kid(ctx, { x: 460 + i * 220, y: G + 200, s: 340, cols: [PAL.green, PAL.yellow, PAL.purple][i], arms: { L: { ik: [-.15, -.4] }, R: { ik: [.15, -.4] } }, face: { eyes: 'happy', mouth: 'grin', look: [0, 1] } }); shape(ctx, i, 460 + i * 220, 990, 80 * (t > wt(5, 'shapes') - .3 ? 1 : .4), DC[i]); }
  label(ctx, 'KAY ZUFALL', 540, 240, 120, t, wt(5, 'kay') - .3, '#2a8a4a', wt(5, 'shapes') - .3); label(ctx, 'KIDS MAKE SHAPES', 540, 240, 100, t, wt(5, 'shapes') - .3, '#c8322c');
} });
// [6] she told her brother-in-law, Joe McVicker
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#7a4bc4', '#3a1c66'); applyCam(ctx, cam, 1);
  const kz = { cols: ['#c85a8a', '#c85a8a'], hat: 'none', belt: false, x: 280, y: G + 160, s: 600, arms: { L: [.3, -.1], R: [2.2, .3] }, face: { eyes: 'happy', mouth: 'grin' } }; drawStick(ctx, kz); hairBun(ctx, kz);
  const jm = { cols: ['#3a3a44', '#ffffff'], hat: 'none', belt: false, x: 800, y: G + 160, s: 600, flip: -1, arms: POSE.idle.arms, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }; drawStick(ctx, jm); bowtie(ctx, jm);
  drawBulb(ctx, 800, 520, 100, t > wt(6, 'joe') ? 1 : .2);
  label(ctx, 'JOE MCVICKER', 540, 240, 110, t, wt(6, 'joe') - .3, '#ffd23a');
} });
// [7] removed the chemicals, added colors, she even named it
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  const col = t > wt(7, 'colors') - .2, nm = t > wt(7, 'name') - .3;
  if (!col) { doughBlob(ctx, 540, 900, 180, '#e8e0c8', t); line(ctx, 380, 760, 700, 1040, 18, '#e0392f'); text(ctx, 'CHEMICALS', 540, 1120, 50, '#c8322c', INK, 0); }
  else if (!nm) { for (let i = 0; i < 4; i++) doughBlob(ctx, 260 + (i % 2) * 560, 760 + Math.floor(i / 2) * 320, 110 * backOut(cue(t, wt(7, 'colors') - .2 + i * .1, .3)), DC[i], t + i); }
  else { for (let i = 0; i < 4; i++) can(ctx, 210 + i * 220, 1150, 260, DC[i]); }
  label(ctx, 'NO CHEMICALS', 540, 240, 110, t, wt(7, 'removed') - .3, '#ffffff', wt(7, 'colors') - .2); label(ctx, '+ COLORS', 540, 240, 120, t, wt(7, 'colors') - .2, '#ffffff', wt(7, 'name') - .3); label(ctx, '"PLAY-DOH"', 540, 240, 130, t, wt(7, 'name') - .3, '#c8322c');
} });
// [8] billions of cans sold, all thanks to dirty wallpaper
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .04 }); bgFlat(ctx, '#7fd0ff', '#2f7de0'); applyCam(ctx, cam, 1);
  const n = Math.floor(clamp((t - S(8)) / 1.6) * 20); for (let i = 0; i < n; i++) can(ctx, 130 + (i % 5) * 205, 1240 - Math.floor(i / 5) * 190, 190, DC[i % 4]);
  label(ctx, 'BILLIONS SOLD', 540, 240, 120, t, wt(8, 'billions') - .3, '#ffd23a', wt(8, 'dirty') - .3); label(ctx, 'THANKS, DIRTY WALLS', 540, 240, 84, t, wt(8, 'dirty') - .3, '#ffffff');
} });
