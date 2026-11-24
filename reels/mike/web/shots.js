// ---------- "Mike the Headless Chicken" (portrait Short) ----------
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
const olsen = (ctx, o) => farmer(ctx, C({ arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'flat' } }, o));
// [0] in 1945 a chicken lived 18 months without its head (headless walking on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); farmBG(ctx, t, cam);
  chicken(ctx, 300 + ((t * 70) % 600), G + 140, 620, { headless: true, walk: 1, t });
  const k = ease(clamp((t - wt(0, '18') + .3) / 1)); chapterTag(ctx, t, .05, 'COLORADO, 1945');
  label(ctx, 'NO HEAD', 540, 270, 130, t, wt(0, 'without') - .2, '#ff6a5a'); label(ctx, Math.round(18 * k) + ' MONTHS', 540, 400, 100, t, wt(0, '18') - .3, '#ffd23a');
} });
// [1] his name was Mike
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .05 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  chicken(ctx, 520, 1300, 820, { t });
  label(ctx, 'MIKE', 540, 300, 180, t, wt(1, 'mike') - .2, '#c8322c');
} });
// [2] farmer Lloyd Olsen getting chicken ready for dinner swung the axe
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const sw = t > wt(2, 'swung') - .1; const cam = camA(t, lt, { z: 1.02, dz: .02, shake: sw ? 10 : 3 }); farmBG(ctx, t, cam);
  const a = sw ? -2.2 + 3.2 * easeIn(clamp((t - wt(2, 'swung') + .1) / .25)) : -2.2;
  olsen(ctx, { x: 360, y: G + 160, s: 560, arms: { L: [.3, -.1], R: [2.6 + (sw ? -1.6 * clamp((t - wt(2, 'swung')) / .25) : 0), .2] }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } });
  if (!sw) { chicken(ctx, 760, G + 120, 380, { t, blink: Math.sin(t * 3) > .95 }); axeTool(ctx, 360 + 150, G + 160 - 560 * .55, 260, -2.4); }
  else { axeTool(ctx, 520, G - 150, 260, a); chicken(ctx, 760, G + 120, 380, { t }); if (t > wt(2, 'axe') - .1) { bgFlat(ctx, '#ffffff', '#ffffff'); applyCam(ctx, cam, 1); burst(ctx, 540, 860, 300, 14, '#ffd23a', 2); text(ctx, 'CHOP!', 540, 860, 140, '#e0392f', INK, 18); text(ctx, 'CHOP!', 540, 860, 140, '#e0392f', INK, 0); } }
  chapterTag(ctx, t, S(2) + .05, 'LLOYD OLSEN'); label(ctx, 'DINNER TIME', 540, 270, 110, t, wt(2, 'dinner') - .2, '#ffffff', wt(2, 'axe') - .1);
} });
// [3] but Mike didn't die: got up and kept walking
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); farmBG(ctx, t, cam); const up = t > wt(3, 'got') - .2;
  chicken(ctx, 380 + (up ? (t - wt(3, 'walking')) * 80 * (t > wt(3, 'walking') ? 1 : 0) : 0), G + 160, 560, { headless: true, walk: t > wt(3, 'walking') - .3 ? 1 : 0, t });
  olsen(ctx, { x: 900, y: G + 160, s: 460, flip: -1, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } });
  label(ctx, "DIDN'T DIE", 540, 270, 120, t, wt(3, 'didn') - .2, '#ffd23a', wt(3, 'walking') - .2); label(ctx, 'KEPT WALKING', 540, 270, 110, t, wt(3, 'walking') - .2, '#ffffff');
} });
// [4] tried to peck for food and preen his feathers
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); farmBG(ctx, t, cam); const pr = t > wt(4, 'preen') - .2;
  chicken(ctx, 520, G + 160, 640, { headless: true, peck: !pr, preen: pr, t }); for (let i = 0; i < 8; i++) { ellipse(ctx, 640 + (i % 4) * 40, G + 170 + Math.floor(i / 4) * 16, 10, 6); ctx.fillStyle = '#f2c25a'; ctx.fill(); }
  label(ctx, 'PECK', 540, 270, 130, t, wt(4, 'peck') - .2, '#ffd23a', wt(4, 'preen') - .2); label(ctx, 'PREEN', 540, 270, 130, t, wt(4, 'preen') - .2, '#ffffff');
} });
// [5] next morning still alive; Olsen keeps him
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); farmBG(ctx, t, cam, { top: '#ff9a6a', bot: '#ffe0b0' });
  chicken(ctx, 400, G + 160, 460, { headless: true, t, walk: .4 }); olsen(ctx, { x: 800, y: G + 160, s: 520, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'grin', look: [-1, 0] } });
  chapterTag(ctx, t, S(5) + .05, 'NEXT MORNING'); label(ctx, 'STILL ALIVE', 540, 270, 120, t, wt(5, 'still') - .2, '#7ee08a', wt(5, 'keep') - .2); label(ctx, 'KEEP HIM!', 540, 270, 130, t, wt(5, 'keep') - .2, '#ffd23a');
} });
// [6] fed with an eyedropper: milk, water and grain
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .03 }); bgFlat(ctx, '#8ac0e8', '#d8ecf8'); applyCam(ctx, cam, 1);
  chicken(ctx, 460, 1320, 760, { headless: true, t }); const nx = 460 + .2 * 760, ny = 1320 - .78 * 760;
  eyedropper(ctx, nx + 10, ny - 260, 320, .1, (t * 1.5) % 1);
  const it = t < wt(6, 'water') - .1 ? 0 : t < wt(6, 'grain') - .1 ? 1 : 2;
  label(ctx, 'EYEDROPPER', 540, 270, 110, t, wt(6, 'eyedropper') - .2, '#ffffff', wt(6, 'milk') - .2); if (t > wt(6, 'milk') - .2) label(ctx, ['MILK', 'WATER', 'GRAIN'][it], 540, 270, 130, t, [wt(6, 'milk'), wt(6, 'water'), wt(6, 'grain')][it] - .2, ['#ffffff', '#7fd0ff', '#f2c25a'][it]);
} });
// [7] so how was this possible?
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .06, r: -.02 }); bgFlat(ctx, '#7a4bc4', '#3a1c66'); applyCam(ctx, cam, 1);
  chicken(ctx, 520, 1300, 700, { headless: true, t }); qmark(ctx, 820, 640, 200, '#ffd23a');
  label(ctx, 'HOW?!', 540, 300, 170, t, wt(7, 'how') - .2, '#ffd23a');
} });
// [8] axe missed the main vein, a clot stopped the bleeding
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  rrect(ctx, 400, 480, 280, 760, 140); fillStroke(ctx, '#ffffff', 8); rrect(ctx, 560, 500, 60, 720, 30); fillStroke(ctx, '#5a7ae0', 6); text(ctx, 'VEIN', 590, 1270, 50, '#9ab8ff', INK, 0);
  const sw = clamp((t - wt(8, 'missed') + .5) / .4); ctx.save(); ctx.setLineDash([20, 14]); line(ctx, 200, 700 - sw * 0, 200 + 300 * sw, 640, 9, '#e0392f'); ctx.restore(); if (sw >= 1) { text(ctx, 'MISSED ✓', 300, 580, 56, '#7ee08a', INK, 0); }
  const cl = cue(t, wt(8, 'clot') - .2, .4); if (cl > 0) { circle(ctx, 590, 560, 46 * backOut(cl)); fillStroke(ctx, '#c8322c', 6); text(ctx, 'PLUG', 760, 560, 54, '#ffd23a', INK, 0); }
  label(ctx, 'AXE MISSED', 540, 270, 110, t, wt(8, 'missed') - .2, '#ffffff', wt(8, 'clot') - .2); label(ctx, 'A CLOT SAVED HIM', 540, 270, 90, t, wt(8, 'clot') - .2, '#ffd23a');
} });
// [9] most of the brain stem left: heartbeat, breathing, walking
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#3a2a5a', '#1a1030'); applyCam(ctx, cam, 1);
  brainDiagram(ctx, 360, 780, 520, t > wt(9, 'brain') - .2 ? 1 : 0, 1);
  const items = [['heartbeat', '♥ HEARTBEAT', '#ff6a7a'], ['breathing', '≈ BREATHING', '#7fd0ff'], ['walking', '→ WALKING', '#7ee08a']];
  items.forEach(([w, s, c], i) => label(ctx, s, 820, 700 + i * 140, 60, t, wt(9, w) - .2, c));
  label(ctx, 'BRAIN STEM', 540, 270, 110, t, wt(9, 'brain') - .2, '#ffd23a');
} });
// [10] Mike became a star: tours, Life magazine, up to $4,500 a month
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); sideshow(ctx, t, cam);
  const st = t < wt(10, 'life') - .2 ? 0 : t < wt(10, 'earned') - .2 ? 1 : 2;
  if (st < 2) { signBoard(ctx, 540, 450, 860, 220, ['MIKE THE', 'HEADLESS WONDER']); chicken(ctx, 540, 1080, 500, { headless: true, t, flap: Math.sin(t * 2) > .6 }); if (st === 1) lifeMag(ctx, 860, 820, 300, .15, t); }
  else { chicken(ctx, 420, 1080, 460, { headless: true, t }); const k = ease(clamp((t - wt(10, '4') + .3) / 1.2)); for (let i = 0; i < 8; i++) { const r = rng(i * 3 + 5); ctx.save(); ctx.translate(140 + r() * 800, 300 + ((t * 300 + r() * 900) % 900)); ctx.rotate(t * 2 + i); rrect(ctx, -60, -28, 120, 56, 6); fillStroke(ctx, '#8fd18a', 5); text(ctx, '$', 0, 0, 40, '#1f5a2a', INK, 0); ctx.restore(); } label(ctx, '$' + Math.round(4500 * k).toLocaleString('en-US') + '/MONTH', 540, 300, 96, t, wt(10, '4') - .3, '#7ee08a'); }
  if (st === 0) label(ctx, 'A STAR!', 540, 260, 110, t, wt(10, 'star') - .2, '#ffd23a');
} });
// [11] University of Utah scientists made sure it wasn't a hoax
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam, { wall: '#dfe8ef', floor: '#9aa8b8' }); applyCam(ctx, cam, 1);
  drawDesk(ctx, 640, G - 40, 620); microscope(ctx, 820, G - 150, 300); chicken(ctx, 560, G - 150, 300, { headless: true, t });
  const so = { cols: ['#ffffff', '#ffffff'], hat: 'none', belt: false, x: 220, y: G + 160, s: 540, arms: { L: [.3, -.1], R: { ik: [.4, -.55] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }; drawStick(ctx, so); specs(ctx, so); magnifier(ctx, 220 + .4 * 540 + 30, G + 160 - .55 * 540 - 30, 130, -.6);
  chapterTag(ctx, t, S(11) + .05, 'UNIVERSITY OF UTAH'); stamp(ctx, 540, 400, 'NOT A HOAX', cue(t, wt(11, 'hoax') - .2, .2), '#2a8a4a', -.1);
} });
// [12] 1947: choked in a motel; the syringe was left at the last show
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const sy = t > wt(12, 'syringe') - .2;
  if (!sy) { motelRoom(ctx, t, cam); chicken(ctx, 700, G + 120, 400, { headless: true, t, flap: t > wt(12, 'choked') - .1 }); chapterTag(ctx, t, S(12) + .05, '1947'); label(ctx, 'HE CHOKED', 540, 270, 120, t, wt(12, 'choked') - .2, '#ff6a5a'); }
  else { sideshow(ctx, t, cam); syringe(ctx, 540, 1150, 320, -.1); circle(ctx, 540, 1150, 220); ctx.lineWidth = 10; ctx.strokeStyle = '#ffd23a'; ctx.stroke(); label(ctx, 'LEFT BEHIND', 540, 270, 120, t, wt(12, 'left') - .2, '#ffd23a'); label(ctx, 'THE SYRINGE', 540, 400, 90, t, wt(12, 'syringe') - .2, '#ffffff'); }
} });
// [13] his hometown Fruita throws a festival every year
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); farmBG(ctx, t, cam); bunting(ctx, 560, t);
  for (let i = 0; i < 6; i++) { const j = Math.abs(Math.sin(t * 6 + i)) * 20; drawStick(ctx, { cols: [PAL.blue, PAL.red, PAL.green, PAL.purple, PAL.yellow, PAL.navy][i], hat: 'none', belt: false, x: 100 + i * 175, y: G + 230 - j, s: 330, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); }
  chicken(ctx, 540, G - 40, 300, { headless: true, t, walk: .6 });
  chapterTag(ctx, t, S(13) + .05, 'FRUITA, COLORADO'); label(ctx, 'EVERY YEAR', 540, 270, 120, t, wt(13, 'every') - .2, '#ffd23a'); label(ctx, 'A FESTIVAL', 540, 400, 90, t, wt(13, 'festival') - .2, '#ffffff');
} });
// [14] the Mike the Headless Chicken Festival
SHOTS.push({ start: S(14), end: S(15), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); bunting(ctx, 160, t);
  signBoard(ctx, 540, 520, 900, 300, ['MIKE THE', 'HEADLESS CHICKEN', 'FESTIVAL'], '#ffffff');
  chicken(ctx, 540, 1300, 560, { headless: true, t, flap: true }); for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 820 + Math.sin(t * 3 + i) * 20, 30, t + i);
} });
