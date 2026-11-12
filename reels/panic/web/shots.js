// ---------- "Panic attack" (portrait Short, story of Maya) ----------
// Shots are keyed to sentences of script.json; cues come from the word timings (web/words.js).
const MAYA = { cols: PAL.purple, hat: 'none', belt: false };
const DOC = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'none', belt: false };
const Q1 = { cols: PAL.green, hat: 'none', belt: false }, Q2 = { cols: PAL.yellow, hat: 'none', belt: false };
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
// Maya: the stick rig plus a hair bun. Any drawStick option can be passed in `o`.
function maya(ctx, o) {
  const s = o.s || 600; drawStick(ctx, C(MAYA, o));
  ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0);
  const hy = -.765 * s * (o.squash || 1) + (o.bob || 0) * s;
  circle(ctx, 0, hy - .215 * s, .075 * s); fillStroke(ctx, '#5a3a22', Math.max(4, s * .012));
  ctx.beginPath(); ctx.arc(0, hy, .19 * s, Math.PI * 1.08, Math.PI * 1.92); ctx.lineWidth = .045 * s; ctx.strokeStyle = '#5a3a22'; ctx.lineCap = 'round'; ctx.stroke();
  ctx.restore();
}
const HOLD = { ik: [.2, -.5] }; // right hand holding the milk in front
const milkAt = (o) => { const s = o.s || 600; return [o.x + .2 * s, o.y - .5 * s + .03 * s]; };
const BRAINBG = ['#2a1d4a', '#4a2f6e'];

const SHOTS = [];
// [0] Maya in the queue, holding a carton of milk  (in action on frame 1: the queue shuffles forward)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); storeBG(ctx, t, cam);
  const step = Math.sin(Math.min(lt, 1.2) / 1.2 * Math.PI) * 40;
  drawCheckout(ctx, 760, PG);
  drawStick(ctx, C(Q1, { x: 700 + step, y: PG - 10, s: 520, arms: POSE.idle.arms, face: { eyes: 'normal', look: [1, 0], mouth: 'flat' } }));
  drawStick(ctx, C(Q2, { x: 470 + step, y: PG, s: 560, arms: POSE.idle.arms, face: { eyes: 'half', look: [1, 0], mouth: 'flat' } }));
  const o = { x: 230 + step * .6, y: PG + 10, s: 600, arms: { L: [.3, -.1], R: HOLD }, face: { eyes: 'normal', look: [.6, 0], mouth: 'smile' } };
  maya(ctx, o); const [mx, my] = milkAt(o); drawMilk(ctx, mx, my + 60, .85);
  label(ctx, 'MAYA', 250, 480, 80, t, wt(0, 'maya') + .1, '#ffd23a');
} });
// [1] nothing is wrong
SHOTS.push({ start: S(1), end: S(2), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.12, y: 900 }); storeBG(ctx, t, cam);
  const o = { x: 540, y: PG + 30, s: 760, bob: Math.sin(t * 2.5) * .004, arms: { L: [.3, -.1], R: HOLD }, face: { eyes: 'happy', mouth: 'smile' } };
  maya(ctx, o); const [mx, my] = milkAt(o); drawMilk(ctx, mx, my + 76, 1.05);
  label(ctx, 'ALL FINE', 540, 330, 96, t, wt(1, 'nothing') + .1, '#7ee08a');
} });
// [2] for no reason at all, her heart starts to race
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const k = cue(t, wt(2, 'heart'), LN[2].e - wt(2, 'heart'));
  const cam = camA(t, lt, { z: 1.12 + k * .06, y: 900, shake: 3 + k * 6 }); storeBG(ctx, t, cam);
  const on = t >= wt(2, 'heart');
  const o = { x: 540, y: PG + 30, s: 760, arms: { L: [.3, -.1], R: HOLD }, face: on ? { eyes: 'wide', mouth: 'o', browUp: 1 } : { eyes: 'normal', look: [.5, 0], mouth: 'smile' } };
  maya(ctx, o); const [mx, my] = milkAt(o); drawMilk(ctx, mx, my + 76, 1.05);
  if (on) { applyCam(ctx, cam, 1); const beat = 1 + .16 * Math.max(0, Math.sin(t * lerp(8, 20, k))) ** 4; drawHeart(ctx, 540 - 30, PG + 30 - .5 * 760, 44 * beat); }
  const bpm = Math.round(lerp(72, 150, k)); label(ctx, bpm + ' BPM', 540, 330, 110, t, wt(2, 'heart'), '#ff6a7e');
} });
// [3a] the brain's alarm system has just fired
SHOTS.push({ start: S(3), end: wt(3, 'the', 1) - .05, tr: 'cut', draw(ctx, lt, t) {
  bgFlat(ctx, BRAINBG[0], BRAINBG[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const on = cue(t, wt(3, 'alarm'), .15);
  drawBrain(ctx, 540, 820, 330 + Math.sin(t * 3) * 5, { glow: on * (.5 + .4 * Math.sin(t * 14)), glowCol: '#ff5a5a' });
  drawSiren(ctx, 540, 520, 110, on, t);
  label(ctx, 'ALARM!', 540, 290, 150, t, wt(3, 'alarm'), '#ff6a6a');
  tint(ctx, '#ff2a2a', on * .12 * (.5 + .5 * Math.sin(t * 14)));
} });
// [3b] the same one built to save her from a tiger
SHOTS.push({ start: wt(3, 'the', 1) - .05, end: S(4), tr: 'whip', draw(ctx, lt, t) {
  bgFlat(ctx, '#3a5a2a', '#1f3a22'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(i * 140 - 40, 1920); ctx.quadraticCurveTo(i * 140 + 30 + Math.sin(t + i) * 20, 1300 - (i % 3) * 120, i * 140 + 90, 1920); ctx.fillStyle = i % 2 ? '#2f6a35' : '#27592e'; ctx.fill(); }
  const k = backOut(cue(t, wt(3, 'tiger') - .25, .3)); if (k > 0) drawTiger(ctx, 540, 760 + Math.sin(t * 2) * 10, 300 * k);
  label(ctx, 'BUILT FOR THIS', 540, 300, 80, t, wt(3, 'built'), '#ffd23a');
} });
// [4] adrenaline floods her body, the heart pounds, breathing speeds up
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { shake: 7 }); storeBG(ctx, t, cam); tint(ctx, '#ff3a3a', .08 + .05 * Math.sin(t * 12));
  const o = { x: 540, y: PG + 10, s: 700, arms: { L: [.5, -.3], R: HOLD }, face: { eyes: 'wide', mouth: 'o', browUp: 1 } };
  maya(ctx, o); const [mx, my] = milkAt(o); drawMilk(ctx, mx, my + 70, .98, Math.sin(t * 20) * .05);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 7; i++) { const k = (t * 1.3 + i / 7) % 1; drawBolt(ctx, 540 + Math.sin(i * 2.4) * 150 * k, PG - 700 * .72 + k * 620, 26, '#ffd23a', i); }
  if (t >= wt(4, 'heart')) { const beat = 1 + .22 * Math.max(0, Math.sin(t * 19)) ** 3; drawHeart(ctx, 510, PG + 10 - .5 * 700, 52 * beat); }
  if (t >= wt(4, 'breathing')) for (let i = 0; i < 3; i++) { const k = (t * 2.6 + i / 3) % 1; puff(ctx, 620 + k * 170, PG - 700 * .7 + 30 - k * 40, 26 + k * 34, t, '#ffffff', 3 + i, (1 - k) * .9); }
  label(ctx, 'ADRENALINE', 540, 300, 96, t, wt(4, 'adrenaline'), '#ffd23a');
} });
// [5] fingers tingle, and the room starts to feel unreal
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const un = cue(t, wt(5, 'room'), .8);
  const cam = camA(t, lt, { z: 1.05 + un * .1, r: Math.sin(t * 1.6) * .05 * un, shake: 5 }); storeBG(ctx, t, cam); tint(ctx, '#d8c8ff', .28 * un);
  const o = { x: 520, y: PG + 10, s: 700, lean: Math.sin(t * 1.6) * .04 * un, arms: { L: { ik: [-.2, -.62], bend: -1 }, R: HOLD }, face: { eyes: un > .5 ? 'spiral' : 'wide', look: [-.6, -.3], mouth: 'o' }, t };
  maya(ctx, o); const [mx, my] = milkAt(o); drawMilk(ctx, mx, my + 70, .98);
  applyCam(ctx, cam, 1); const hx = 520 - .2 * 700, hy = PG + 10 - .62 * 700;
  if (t >= wt(5, 'fingers')) for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + t * 3; sparkle(ctx, hx + Math.cos(a) * 80, hy + Math.sin(a) * 80, 26, .5 + .5 * Math.sin(t * 9 + i)); }
  label(ctx, 'TINGLING', 300, 330, 80, t, wt(5, 'tingle'), '#8fd8ff', wt(5, 'room')); label(ctx, 'UNREAL', 540, 330, 120, t, wt(5, 'unreal'), '#d8c8ff');
} });
// [6] Maya is sure she's having a heart attack
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .05, shake: 8 }); storeBG(ctx, t, cam); tint(ctx, '#ff3a3a', .14);
  const o = { x: 540, y: PG + 20, s: 740, lean: .05, arms: { L: { ik: [-.02, -.5], bend: -1 }, R: { ik: [.03, -.48] } }, face: { eyes: 'wide', mouth: 'o', browUp: 1 } };
  maya(ctx, o); applyCam(ctx, cam, 1); sweat(ctx, 690, PG - 520, 30); sweat(ctx, 400, PG - 470, 24);
  thought(ctx, 800, 500, 150, 660, 650); drawHeart(ctx, 800, 500, 54, '#ff5a6e'); drawBolt(ctx, 800, 496, 44, '#ffd23a');
  label(ctx, 'HEART ATTACK?!', 540, 250, 84, t, wt(6, 'heart'), '#ff6a6a');
} });
// [7] she isn't
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  bgFlat(ctx, '#1f6a4a', '#134a36'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const k = backOut(cue(t, S(7) + .05, .2)); ctx.save(); ctx.translate(540, 820); ctx.scale(k, k); text(ctx, "SHE ISN'T", 0, 0, 170, '#fff', INK, 30); text(ctx, "SHE ISN'T", 0, 0, 170, '#fff'); ctx.restore();
} });
// [8] a panic attack: a real alarm, with no real danger
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  bgFlat(ctx, BRAINBG[0], BRAINBG[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  label(ctx, 'PANIC ATTACK', 540, 280, 110, t, wt(8, 'panic'), '#ffd23a');
  const a = cue(t, wt(8, 'real'), .2), d = cue(t, wt(8, 'no'), .2);
  if (a > 0) { drawSiren(ctx, 290, 860, 120 * backOut(a), 1, t); } label(ctx, 'REAL ALARM', 290, 1010, 60, t, wt(8, 'real'), '#ff8a8a');
  if (d > 0) { drawTiger(ctx, 790, 800, 150 * backOut(d), true); text(ctx, '?', 790, 810, 150, 'rgba(255,255,255,.85)'); } label(ctx, 'NO DANGER', 790, 1010, 60, t, wt(8, 'no'), '#7ee08a');
} });
// [9] and alarms run out of fuel
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  bgFlat(ctx, BRAINBG[0], BRAINBG[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const k = cue(t, wt(9, 'run'), LN[9].e - wt(9, 'run') + .3);
  drawSiren(ctx, 540, 760, 170, 1 - k, t);
  meterH(ctx, 240, 980, 600, 70, 1 - k * .92, mix('#ff6a3a', '#8d94a8', k));
  label(ctx, 'FUEL', 540, 1110, 64, t, wt(9, 'fuel') - .2, '#ffd23a');
} });
// [10] within about ten minutes the wave peaks, then slowly passes
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  bgFlat(ctx, '#20305c', '#3b4f8f'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const X = m => 130 + m / 20 * 820, Y = m => 1010 - 520 * Math.exp(-((m - 10) ** 2) / 22);
  line(ctx, 130, 1040, 950, 1040, 6, 'rgba(255,255,255,.5)');
  for (const m of [0, 10, 20]) { line(ctx, X(m), 1030, X(m), 1056, 6, 'rgba(255,255,255,.6)'); text(ctx, m + ' min', X(m), 1100, 40, 'rgba(255,255,255,.8)'); }
  const d = kf(t, [[S(10) + .2, 0], [wt(10, 'peaks') + .1, .5], [wt(10, 'passes') + .5, 1]], x => x);
  ctx.beginPath(); for (let i = 0; i <= 80 * d; i++) { const m = i / 4; i ? ctx.lineTo(X(m), Y(m)) : ctx.moveTo(X(m), Y(m)); } ctx.lineWidth = 16; ctx.strokeStyle = '#ff8a5c'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  circle(ctx, X(d * 20), Y(d * 20), 26); fillStroke(ctx, '#ffffff', 7);
  label(ctx, 'THE PEAK', 540, 400, 90, t, wt(10, 'peaks'), '#ffd23a', wt(10, 'then')); label(ctx, 'IT PASSES', 540, 400, 100, t, wt(10, 'passes') - .3, '#7ee08a');
} });
// [11] Maya is still holding the milk
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, y: 900 }); storeBG(ctx, t, cam);
  const br = Math.sin(t * 1.8) * .012;
  const o = { x: 540, y: PG + 30, s: 760, squash: 1 + br, arms: { L: [.3, -.1], R: HOLD }, face: { eyes: 'half', mouth: 'smile' } };
  maya(ctx, o); const [mx, my] = milkAt(o); drawMilk(ctx, mx, my + 76, 1.05);
  applyCam(ctx, cam, 1); const k = (lt * .6) % 1; puff(ctx, 660 + k * 120, PG - 520 - k * 30, 30 + k * 40, t, '#ffffff', 4, (1 - k) * .8);
  label(ctx, 'PHEW', 540, 330, 120, t, wt(11, 'still'), '#7ee08a');
} });
// [12] if it keeps happening, talk to a doctor: common and very treatable
SHOTS.push({ start: S(12), end: S(13), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01 }); applyCam(ctx, cam, 1);
  ctx.fillStyle = '#e3f3ee'; ctx.fillRect(-2000, -2000, 5080, 2000 + PG - 40); ctx.fillStyle = '#c9d8d2'; ctx.fillRect(-2000, PG - 40, 5080, 3000); line(ctx, -2000, PG - 40, 3080, PG - 40, 6);
  rrect(ctx, 400, 300, 280, 200, 16); fillStroke(ctx, '#ffffff', 7); line(ctx, 540, 340, 540, 460, 30, '#e0392f'); line(ctx, 480, 400, 600, 400, 30, '#e0392f');
  maya(ctx, { x: 300, y: PG, s: 620, arms: { L: [.3, -.1], R: [1.3, .6] }, face: { eyes: 'normal', look: [1, 0], mouth: 'smile' } });
  drawStick(ctx, C(DOC, { x: 780, y: PG, s: 660, flip: -1, arms: { L: [.3, -.1], R: [1.4, .8] }, face: { eyes: 'happy', mouth: 'smile' } }));
  label(ctx, 'COMMON', 300, 620, 70, t, wt(12, 'common'), '#2f63c9'); label(ctx, 'TREATABLE', 760, 560, 70, t, wt(12, 'treatable'), '#1f8a5a');
  label(ctx, 'general info, not medical advice', 540, 1560, 36, t, S(12) + .4, '#ffffff');
} });
