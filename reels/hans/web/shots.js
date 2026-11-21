// ---------- "The horse that could do math" (Clever Hans, portrait Short) ----------
// Shots are keyed to sentences of script.json; cues come from the word timings (web/words.js).
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
// tapping: n taps starting at t0, one every dt seconds. returns hoof lift 0..1 and taps done
const taps = (t, t0, n, dt = .38) => { const k = (t - t0) / dt; if (k < 0) return [0, 0]; const i = Math.floor(k); if (i >= n) return [0, n]; return [Math.sin((k - i) * Math.PI), i + ((k - i) > .5 ? 1 : 0)]; };
function vonOsten(ctx, o) { const so = C({ cols: ['#3a3a44', '#3a3a44'], hat: 'none', belt: false }, o); drawStick(ctx, so); moustache(ctx, so); bowler(ctx, so); return so; }
function pfungst(ctx, o) { const so = C({ cols: ['#6a5a4a', '#6a5a4a'], hat: 'none', belt: false }, o); drawStick(ctx, so); specs(ctx, so); return so; }
const blinkAt = (t, s = 0) => ((t + s * .7) % 3.1) > 2.95 ? 1 : 0;

const SHOTS = [];
// [0] a horse in Berlin could do math (tapping on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); berlinStreet(ctx, t, cam);
  chalkboard(ctx, 300, 560, 360, 240, ['2 + 2 = ?']);
  const [lift, n] = taps(t, .3, 4); drawHorse(ctx, 640, G + 120, 620, { tap: lift, t, blink: blinkAt(t), head: -lift * .1 });
  if (n > 0) label(ctx, String(n), 860, 520, 120, t, .3, '#ffd23a');
  for (let i = 0; i < 4; i++) drawStick(ctx, { cols: [PAL.blue, PAL.red, PAL.green, PAL.purple][i], hat: 'none', belt: false, x: 120 + i * 90, y: G + 260, s: 260, arms: POSE.idle.arms, face: { eyes: 'wide', mouth: 'o', look: [1, -.5] } });
  chapterTag(ctx, t, .05, 'BERLIN, 1904'); label(ctx, 'NO TRICK?', 540, 240, 100, t, wt(0, 'experts'), '#ffffff');
} });
// [1] his name was Hans; his owner, a math teacher
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .02 }); berlinStreet(ctx, t, cam);
  drawHorse(ctx, 680, G + 80, 640, { t, blink: blinkAt(t, 1), head: Math.sin(t * 2) * .05 });
  vonOsten(ctx, { x: 230, y: G + 200, s: 520, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'smile' } });
  label(ctx, 'HANS', 700, 300, 130, t, wt(1, 'hans') - .1, '#ffd23a'); label(ctx, 'WILHELM VON OSTEN', 330, 420, 54, t, wt(1, 'wilhelm') - .1, '#ffffff');
} });
// [2] three plus five: eight taps, and stop
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); berlinStreet(ctx, t, cam);
  chalkboard(ctx, 540, 470, 520, 220, ['3 + 5 = ?']);
  const [lift, n] = taps(t, wt(2, 'tap') - .1, 8, .2); drawHorse(ctx, 560, G + 140, 660, { tap: lift, t, blink: blinkAt(t, 2) });
  if (n > 0) label(ctx, String(n), 880, 760, 150, t, wt(2, 'tap'), n >= 8 ? '#7ee08a' : '#ffd23a');
  if (n >= 8) label(ctx, 'STOP.', 300, 800, 90, t, wt(2, 'stop') - .1, '#ffffff');
} });
// [3] add, subtract, tell the time, even spell
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#3a6a4a', '#1f3a2a'); applyCam(ctx, cam, 1);
  const st = t < wt(3, 'tell') - .1 ? 0 : t < wt(3, 'even') - .1 ? 1 : 2;
  if (st === 0) chalkboard(ctx, 540, 520, 600, 300, ['9 − 4 = 5', '6 + 1 = 7']);
  if (st === 1) drawClock(ctx, 540, 520, 200, 3 + t * .1, '#ffffff');
  if (st === 2) { const w = 'HANS'; for (let i = 0; i < 4; i++) letterTile(ctx, 270 + i * 180, 520, 150, w[i], cue(t, wt(3, 'tapping') - .3 + i * .3, .2)); }
  const [lift] = taps(t, S(3), 30, .24); drawHorse(ctx, 560, G + 160, 640, { tap: lift, t, blink: blinkAt(t, 3) });
  label(ctx, ['MATH', 'TIME', 'SPELLING'][st], 540, 260, 110, t, [S(3), wt(3, 'tell'), wt(3, 'even')][st], '#ffd23a');
} });
// [4] shown all over Germany, never charged a penny
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); berlinStreet(ctx, t, cam);
  for (let i = 0; i < 9; i++) { const j = Math.abs(Math.sin(t * 5 + i)) * 14; drawStick(ctx, { cols: [PAL.blue, PAL.red, PAL.green, PAL.purple, PAL.yellow][i % 5], hat: 'none', belt: false, x: 70 + i * 120, y: G + 330 - j, s: 280, arms: i % 2 ? { L: [2.4, .3], R: [2.4, .3] } : POSE.idle.arms, face: { eyes: 'happy', mouth: 'grin' } }); }
  drawHorse(ctx, 640, G + 40, 520, { t, tap: Math.max(0, Math.sin(t * 6)), blink: blinkAt(t, 4) });
  vonOsten(ctx, { x: 260, y: G + 120, s: 440, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  stamp(ctx, 540, 400, 'FREE SHOW', cue(t, wt(4, 'never'), .2), '#3fa35b', -.1);
} });
// [5-6] a commission of thirteen experts: no trick
SHOTS.push({ start: S(5), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const n = Math.floor(clamp((t - wt(5, 'commission') + .2) / 1.2) * 13);
  for (let i = 0; i < n; i++) { const r = Math.floor(i / 7), c = i % 7; const o = { cols: ['#3a3d44', '#3a3d44'], hat: 'none', belt: false, x: 120 + c * 140 + r * 70, y: GY + 120 + r * 150, s: 300, arms: POSE.hips.arms, face: { eyes: 'squint', mouth: 'flat', look: [0, .4] } }; drawStick(ctx, o); mortarboard(ctx, o); }
  label(ctx, '13 EXPERTS', 540, 240, 110, t, wt(5, 'thirteen') - .2, '#ffffff');
  stamp(ctx, 540, 560, 'NO TRICK', cue(t, wt(6, 'no') - .1, .2), '#3fa35b', -.1);
} });
// [7] but a young psychologist, Oskar Pfungst, wasn't satisfied
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .03 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  const so = pfungst(ctx, { x: 540, y: GY + 420, s: 760, arms: { L: [.3, -.1], R: { ik: [.24, -.54] } }, face: { eyes: 'squint', mouth: 'flat', browOne: 1 } });
  notebook(ctx, 540 + .24 * 760, GY + 420 - .54 * 760, 150);
  label(ctx, 'OSKAR PFUNGST', 540, 250, 100, t, wt(7, 'oskar') - .1, '#ffd23a'); label(ctx, 'NOT CONVINCED', 540, 370, 70, t, wt(7, 'satisfied') - .2, '#ffffff');
} });
// [8] still right with strangers asking
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); berlinStreet(ctx, t, cam);
  const [lift, n] = taps(t, wt(8, 'got'), 7, .24); drawHorse(ctx, 650, G + 120, 600, { tap: lift, t, blink: blinkAt(t, 5) });
  drawStick(ctx, { cols: PAL.red, hat: 'none', belt: false, x: 240, y: G + 220, s: 460, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  chalkboard(ctx, 300, 560, 360, 200, ['4 + 3']); if (n >= 7) { label(ctx, '7 ✓', 860, 720, 110, t, t - .01, '#7ee08a'); }
  label(ctx, 'A STRANGER ASKS', 540, 260, 76, t, wt(8, 'strangers') - .2, '#ffffff');
} });
// [9-10] Hans can't see anyone who knows: he falls apart
SHOTS.push({ start: S(9), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const scr = backOut(cue(t, wt(9, 'made') - .1, .4));
  const fall = t > S(10);
  const [lift, n] = taps(t, S(10) - .3, 20, .2);
  drawHorse(ctx, 680, GY + 160, 520, { tap: fall ? lift : 0, t, blink: blinkAt(t, 6), head: fall ? Math.sin(t * 5) * .08 : 0 });
  pfungst(ctx, { x: 200, y: GY + 220, s: 420, arms: { L: [.3, -.1], R: { ik: [.24, -.54] } }, face: { eyes: fall ? 'happy' : 'normal', mouth: fall ? 'grin' : 'flat', look: [1, 0] } }); notebook(ctx, 200 + .24 * 420, GY + 220 - .54 * 420, 100);
  if (scr > 0) { ctx.save(); ctx.translate(420, GY + 200); ctx.scale(1, scr); woodScreen(ctx, 0, 0, 220, 560); ctx.restore(); }
  if (fall) label(ctx, String(n), 900, 440, 110, t, S(10), '#ff6a5a');
  if (fall) qmark(ctx, 980, 620, 120, '#ff6a5a');
  label(ctx, 'NO ONE IN SIGHT KNOWS', 540, 240, 60, t, wt(9, 'couldn') - .2, '#ffffff', S(10)); label(ctx, 'FAIL', 540, 240, 140, t, wt(10, 'fell') - .1, '#ff6a5a');
} });
// [11] right nine times out of ten when he could see; almost never when he couldn't
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .015 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const a = ease(cue(t, wt(11, 'nine') - .4, .8)), b = ease(cue(t, wt(11, 'never') - .4, .8));
  scoreBar(ctx, 180, 1300, 300, 800, .89 * a, '#7ee08a', Math.round(89 * a) + '%'); scoreBar(ctx, 600, 1300, 300, 800, Math.max(.01, .06 * b), '#ff6a5a', Math.round(6 * b) + '%');
  text(ctx, 'CAN SEE', 330, 1390, 54, '#ffffff', INK, 0); text(ctx, "CAN'T SEE", 750, 1390, 54, '#ffffff', INK, 0);
} });
// [12] the questioner tenses, leans, lifts their head
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); berlinStreet(ctx, t, cam);
  const [lift, n] = taps(t, S(12), 5, .42); const close = n >= 4;
  drawHorse(ctx, 680, G + 120, 540, { tap: lift, t, look: -1, blink: blinkAt(t, 7) });
  const lean = close ? .18 : 0, lift2 = t > wt(12, 'lift') ? -.25 : 0;
  vonOsten(ctx, { x: 260, y: G + 220, s: 520, lean: -lean, headTilt: lift2, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: close ? 'wide' : 'normal', mouth: close ? 'o' : 'flat', look: [1, .3] } });
  if (close) { ctx.save(); ctx.globalAlpha = .9; ctx.beginPath(); ctx.moveTo(380, G - 260); ctx.quadraticCurveTo(520, G - 420, 660, G - 380); ctx.lineWidth = 10; ctx.strokeStyle = '#ffd23a'; ctx.setLineDash([24, 16]); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  label(ctx, 'TENSE', 260, 480, 80, t, wt(12, 'tense') - .1, '#ff6a5a'); label(ctx, 'LEAN', 260, 590, 80, t, wt(12, 'lean') - .1, '#ff6a5a'); label(ctx, 'LIFT HEAD', 260, 700, 70, t, wt(12, 'lift') - .1, '#ff6a5a');
} });
// [13] Hans wasn't counting. He was reading people.
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .04, y: 900 }); bgFlat(ctx, '#7a4bc4', '#4a2c86'); applyCam(ctx, cam, 1);
  drawHorse(ctx, 520, 1500, 720, { t, look: -1, blink: blinkAt(t, 8), head: -.12 });
  label(ctx, 'NOT COUNTING', 540, 260, 96, t, wt(13, 'counting') - .3, '#ffffff', wt(13, 'reading')); label(ctx, 'READING PEOPLE', 540, 260, 96, t, wt(13, 'reading') - .1, '#ffd23a');
} });
// [14] which might be even more impressive
SHOTS.push({ start: S(14), end: S(15), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  drawHorse(ctx, 520, 1500, 720, { t, blink: blinkAt(t, 9), head: -.08 });
  for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 520 + Math.sin(t * 3 + i) * 20, 30, t + i);
  label(ctx, 'IMPRESSIVE', 540, 300, 120, t, wt(14, 'impressive') - .2, '#c8322c');
} });
