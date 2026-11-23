// ---------- "How they saved the Leaning Tower" (portrait Short) ----------
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const G = 1240, A90 = .19, A01 = .14;
const tourist = (ctx, o, k = 0) => drawStick(ctx, C({ cols: [PAL.blue, PAL.red, PAL.green, PAL.purple][k % 4], hat: 'none', belt: false }, o));
const engineer = (ctx, o) => { const so = C({ cols: ['#f28a2a', '#f28a2a'], hat: 'none', belt: false }, o); drawStick(ctx, so); hardhat(ctx, so); return so; };
const SHOTS = [];
// [0] engineers saved the tower by digging under it (drill already turning on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1040 }); piazza(ctx, t, cam, { gy: 1100 }); applyCam(ctx, cam, 1); groundSection(ctx, 1100);
  const back = ease(clamp((t - wt(0, 'digging')) / 1.2)); pisaTower(ctx, 560, 1100, 640, A90 - .05 * back, { cables: 1 });
  drillRig(ctx, 160, 1060, 300, -.5, t); for (let i = 0; i < 5; i++) { const k = ((t * .8 + i * .2) % 1); circle(ctx, 300 - k * 120, 1360 - k * 260, 12); ctx.fillStyle = '#9a7a4a'; ctx.fill(); }
  label(ctx, 'SAVED', 540, 230, 120, t, wt(0, 'saved') - .1, '#ffffff'); label(ctx, 'BY DIGGING', 540, 360, 110, t, wt(0, 'digging') - .15, '#ffd23a');
} });
// [1] 800+ years slowly tipping
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); piazza(ctx, t, cam); applyCam(ctx, cam, 1);
  const k = ease(clamp((t - S(1)) / (S(2) - S(1) - .3))); pisaTower(ctx, 540, G, 700, .02 + (A90 - .02) * k);
  const yr = Math.round(1173 + (1990 - 1173) * k);
  chapterTag(ctx, t, S(1) + .05, 'PISA, ITALY'); label(ctx, String(yr), 540, 300, 150, t, S(1), '#ffd23a'); label(ctx, '800+ YEARS', 540, 450, 90, t, wt(1, '800') - .1, '#ffffff');
} });
// [2] it leaned before it was finished: one side on soft ground
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1080 }); piazza(ctx, t, cam, { gy: 1100, sun: false }); applyCam(ctx, cam, 1); groundSection(ctx, 1100, { softLabel: t > wt(2, 'soft') - .2 });
  pisaTower(ctx, 520, 1100, 640, .08, { levels: 3 });
  for (let i = 0; i < 2; i++) engineer(ctx, { x: 160 + i * 760, y: 1100, s: 300, arms: { L: [1.8, .6], R: [1.2, .2] }, face: { eyes: 'wide', mouth: 'o', look: [i ? -1 : 1, -1] } });
  label(ctx, 'NOT EVEN FINISHED', 540, 260, 84, t, wt(2, 'before') - .1, '#ffffff', wt(2, 'one') - .1); label(ctx, 'SOFT GROUND', 540, 260, 110, t, wt(2, 'soft') - .2, '#c8a4ff');
} });
// [3] 1990: could collapse, closed to visitors
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: 4 }); piazza(ctx, t, cam, { top: '#6a7a9a', bot: '#c8c0b8', sun: false }); applyCam(ctx, cam, 1);
  const wob = Math.sin(t * 3) * .006; pisaTower(ctx, 540, G, 700, A90 + .02 + wob, { crack: cue(t, wt(3, 'collapse') - .2, .4) });
  if (t > wt(3, 'collapse') - .2) warnSign(ctx, 900, 640, 110);
  if (t > wt(3, 'tower', 0) - .1 && t > wt(3, 'closed') - .3) { barrier(ctx, 80, 1000, G + 80); stamp(ctx, 540, 1050, 'CLOSED', cue(t, wt(3, 'closed') - .1, .2), '#e0392f', -.1); }
  chapterTag(ctx, t, S(3) + .05, '1990'); label(ctx, 'COULD COLLAPSE', 540, 270, 100, t, wt(3, 'collapse') - .2, '#ff6a5a');
} });
// [4] tried before: concrete, lead weights, freezing the ground
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1080 }); piazza(ctx, t, cam, { gy: 1100 }); applyCam(ctx, cam, 1); groundSection(ctx, 1100);
  const st = t < wt(4, 'concrete') - .15 ? -1 : t < wt(4, 'lead') - .15 ? 0 : t < wt(4, 'freezing') - .15 ? 1 : 2;
  pisaTower(ctx, 540, 1100, 640, A90);
  if (st >= 0) concreteRing(ctx, 540, 1130, 420);
  if (st >= 1) leadBlocks(ctx, 330, 1094, 9);
  if (st >= 2) frost(ctx, 680, 1160, 420, t);
  label(ctx, ['TRIED BEFORE', 'CONCRETE', 'LEAD WEIGHTS', 'FREEZING'][st + 1], 540, 270, 110, t, [S(4), wt(4, 'concrete'), wt(4, 'lead'), wt(4, 'freezing')][st + 1] - .15, ['#ffffff', '#d8d8d0', '#b8c0d8', '#9ad8ff'][st + 1]);
} });
// [5] one attempt made it lurch further in a single night
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const lurch = backOut(clamp((t - wt(5, 'lurch') + .05) / .35));
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: lurch > 0 && lurch < 1 ? 16 : 3 }); piazza(ctx, t, cam, { top: '#141a3a', bot: '#3a4486', sun: false, grass: '#2f5a63' }); applyCam(ctx, cam, .1); drawMoon(ctx, 860, 300, 60); drawStars(ctx, t, 40, 3, .8); applyCam(ctx, cam, 1);
  pisaTower(ctx, 540, G, 700, A90 + .05 * lurch);
  engineer(ctx, { x: 900, y: G + 160, s: 360, flip: -1, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: lurch > 0 ? 'wide' : 'normal', mouth: lurch > 0 ? 'o' : 'flat', look: [-1, -1] } });
  chapterTag(ctx, t, S(5) + .05, '1995'); label(ctx, 'LURCH!', 540, 300, 150, t, wt(5, 'lurch') - .05, '#ff6a5a'); label(ctx, 'IN ONE NIGHT', 540, 450, 80, t, wt(5, 'single') - .1, '#ffffff');
} });
// [6] the new plan sounded completely backwards
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  const so = engineer(ctx, { x: 300, y: G + 160, s: 620, arms: { L: [.3, -.1], R: { ik: [.3, -.6] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } });
  scroll(ctx, 740, 780, 380, 480, []); text(ctx, 'PLAN', 740, 640, 60, '#3a3530', INK, 0); pisaTower(ctx, 700, 900, 200, A90); ctx.save(); ctx.translate(640, 960); path(ctx, [[-14, -40], [14, -40], [14, 0], [32, 0], [0, 40], [-32, 0], [-14, 0]]); fillStroke(ctx, '#e0392f', 5); ctx.restore();
  label(ctx, 'NEW PLAN', 540, 270, 110, t, wt(6, 'new') - .1, '#ffffff', wt(6, 'backwards') - .1); label(ctx, 'BACKWARDS?!', 540, 270, 120, t, wt(6, 'backwards') - .1, '#ffd23a');
} });
// [7] don't push it up. dig under the other side
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1080 }); piazza(ctx, t, cam, { gy: 1100 }); applyCam(ctx, cam, 1); groundSection(ctx, 1100);
  pisaTower(ctx, 520, 1100, 640, A90);
  const dig = t > wt(7, 'dig') - .1;
  if (!dig) { ctx.save(); ctx.translate(900, 820); ctx.rotate(-.9); path(ctx, [[-30, 120], [30, 120], [30, 0], [70, 0], [0, -90], [-70, 0], [-30, 0]]); fillStroke(ctx, '#7ee08a', 7); ctx.restore(); line(ctx, 780, 700, 1020, 940, 22, '#e0392f'); line(ctx, 1020, 700, 780, 940, 22, '#e0392f'); }
  else { ctx.save(); ctx.translate(250, 1300); path(ctx, [[-30, -120], [30, -120], [30, 0], [70, 0], [0, 90], [-70, 0], [-30, 0]]); fillStroke(ctx, '#ffd23a', 7); ctx.restore(); }
  label(ctx, "DON'T PUSH IT", 540, 270, 100, t, S(7), '#ff6a5a', wt(7, 'dig') - .1); label(ctx, 'DIG THE OTHER SIDE', 540, 270, 84, t, wt(7, 'dig') - .1, '#ffd23a');
} });
// [8] steel cables, long drills, small amounts of soil from beneath the high side
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015, y: 1080 }); piazza(ctx, t, cam, { gy: 1100 }); applyCam(ctx, cam, 1); groundSection(ctx, 1100);
  const cab = cue(t, wt(8, 'cables') - .3, .6), dr = t > wt(8, 'drills') - .2;
  pisaTower(ctx, 560, 1100, 640, A90, { cables: cab });
  if (dr) { for (let i = 0; i < 3; i++) drillRig(ctx, 90 + i * 110, 1060, 260 + i * 50, -.35 - i * .1, t); }
  const pile = clamp((t - wt(8, 'small')) / 3); soilPile(ctx, 120, 1084, 70 * pile);
  if (dr) for (let i = 0; i < 6; i++) { const k = ((t * .7 + i / 6) % 1); circle(ctx, 360 - k * 200, 1380 - k * 300, 10); ctx.fillStyle = '#9a7a4a'; ctx.fill(); }
  label(ctx, 'STEEL CABLES', 540, 260, 100, t, wt(8, 'steel') - .1, '#ffffff', wt(8, 'drills') - .2); label(ctx, 'LONG DRILLS', 540, 260, 104, t, wt(8, 'drills') - .2, '#ffd23a', wt(8, 'little') - .1); label(ctx, 'A LITTLE AT A TIME', 540, 260, 80, t, wt(8, 'little') - .1, '#ffffff');
} });
// [9] the ground settled, the tower leaned back
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); piazza(ctx, t, cam); applyCam(ctx, cam, 1);
  const k = ease(clamp((t - S(9) - .3) / (S(10) - S(9) - .6))); pisaTower(ctx, 540, G, 700, A90 - (A90 - A01) * k, { cables: 1 });
  ctx.save(); ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(540, G, 760, -Math.PI / 2 + A90 - .02, -Math.PI / 2 + A01 - .02, true); ctx.lineWidth = 12; ctx.strokeStyle = '#ffd23a'; ctx.setLineDash([26, 18]); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  label(ctx, 'LEANING BACK', 540, 280, 110, t, wt(9, 'leaned') - .3, '#7ee08a');
} });
// [10] by 2001: 70 tons of soil, 40 cm straighter
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#3a6a4a', '#1f3a2a'); applyCam(ctx, cam, 1);
  const a = ease(cue(t, wt(10, '70') - .3, 1.0)), b = ease(cue(t, wt(10, '40') - .3, 1.0));
  soilPile(ctx, 290, 1150, 260 * Math.max(.05, a)); label(ctx, Math.round(70 * a) + ' TONS', 290, 700, 90, t, wt(10, '70') - .3, '#ffd23a'); text(ctx, 'OF SOIL', 290, 1210, 50, '#ffffff', INK, 0);
  rulerV(ctx, 800, 1150, 400 * Math.max(.05, b)); label(ctx, '−' + Math.round(40 * b) + ' CM', 800, 640, 90, t, wt(10, '40') - .3, '#7ee08a'); text(ctx, 'STRAIGHTER', 800, 1210, 50, '#ffffff', INK, 0);
  chapterTag(ctx, t, S(10) + .05, '2001');
} });
// [11] not all the way: nobody wants the Straight Tower of Pisa
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const str = t > wt(11, 'nobody') - .15; piazza(ctx, t, cam); applyCam(ctx, cam, 1);
  pisaTower(ctx, 600, G, 680, str ? 0 : A01);
  for (let i = 0; i < 3; i++) { const lean = !str; tourist(ctx, { x: 120 + i * 140, y: G + 200, s: 340, lean: lean ? -.1 : 0, arms: lean ? { L: [.3, -.1], R: { ik: [.38, -.66] } } : POSE.idle.arms, face: lean ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'half', mouth: 'frown' } }, i); }
  if (str) { line(ctx, 380, 380, 820, 1180, 24, '#e0392f'); line(ctx, 820, 380, 380, 1180, 24, '#e0392f'); }
  label(ctx, 'NOT ALL THE WAY', 540, 260, 96, t, S(11), '#ffffff', wt(11, 'nobody') - .15); label(ctx, 'STRAIGHT TOWER?', 540, 260, 96, t, wt(11, 'straight') - .2, '#ff6a5a');
} });
// [12] still going: a few more centimeters, all on its own
SHOTS.push({ start: S(12), end: S(13), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); piazza(ctx, t, cam, { top: '#ff9a5a', bot: '#ffd8a0' }); applyCam(ctx, cam, 1);
  const k = ease(clamp((t - wt(12, 'straightened') + .2) / 1.5)); pisaTower(ctx, 540, G, 700, A01 - .015 * k);
  for (let i = 0; i < 4; i++) tourist(ctx, { x: 120 + i * 280, y: G + 260, s: 300, arms: { L: [2.4, .3], R: [.3, -.1] }, face: { eyes: 'happy', mouth: 'grin' } }, i + 1);
  camera(ctx, 900, 980, 110, Math.max(0, Math.sin(t * 4)) > .9 ? 1 : 0);
  label(ctx, '+ A FEW CM', 540, 270, 110, t, wt(12, 'few') - .2, '#7ee08a'); label(ctx, 'ON ITS OWN', 540, 400, 100, t, wt(12, 'own') - .2, '#ffffff');
} });
