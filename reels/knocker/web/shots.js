// ---------- "The job of waking up a whole town" (knocker-uppers, portrait Short) ----------
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
const WORKER = { cols: ['#4a5a6a', '#4a5a6a'], hat: 'none', belt: false };
const BOSS = { cols: ['#2a2a30', '#2a2a30'], hat: 'none', belt: false };
const SLEEPER = { cols: ['#e6e0f0', '#e6e0f0'], hat: 'none', belt: false };
const walk = (t, sp = 9) => { const a = Math.sin(t * sp) * .6; return { legs: { L: [.1 + Math.max(0, a), -Math.max(0, a) * 1.2 - .04], R: [.1 + Math.max(0, -a), -Math.max(0, -a) * 1.2 - .04] }, bob: -Math.abs(Math.cos(t * sp)) * .015 }; };
// one window of a terrace drawn big, with the sleeper inside (awake 0..1)
function bigWindow(ctx, x, y, w, h, t, awake, o = {}) {
  ctx.beginPath(); ctx.rect(x - w / 2 - 120, y - h / 2 - 140, w + 240, h + 300); fillStroke(ctx, '#9a4a32', 9);
  for (let r = 0; r < 14; r++) line(ctx, x - w / 2 - 116, y - h / 2 - 120 + r * 40, x + w / 2 + 116, y - h / 2 - 120 + r * 40, 3, 'rgba(60,20,10,.35)');
  rrect(ctx, x - w / 2, y - h / 2, w, h, 10); fillStroke(ctx, awake > .5 ? '#ffd96a' : '#1b2238', 10);
  ctx.save(); rrect(ctx, x - w / 2, y - h / 2, w, h, 10); ctx.clip();
  if (o.sleeper !== false) { const so = C(SLEEPER, { x, y: y + h * .62, s: h * 1.05, lean: awake > .5 ? 0 : -.05, arms: awake > .5 ? { L: [.3, -.1], R: [2.4, .3] } : POSE.idle.arms, face: awake > .5 ? { eyes: o.grumpy ? 'half' : 'wide', mouth: o.grumpy ? 'frown' : 'o' } : { eyes: 'squint', mouth: 'flat' } }); if (awake > .05) { drawStick(ctx, so); nightcap(ctx, so); } }
  ctx.restore();
  line(ctx, x, y - h / 2, x, y + h / 2, 10); line(ctx, x - w / 2, y, x + w / 2, y, 10);
  ctx.beginPath(); ctx.rect(x - w / 2 - 24, y + h / 2, w + 48, 26); fillStroke(ctx, '#e8dcc0', 7);
}

const SHOTS = [];
// [0] a stranger shoots peas at a bedroom window (in action on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); nightDawn(ctx, t, cam, .15); applyCam(ctx, cam, 1);
  const wins = terrace(ctx, -80, 4, 330, 640, [0, cue(t, wt(0, 'window') + .3, .1), 0, 0]); cobbles(ctx); gasLamp(ctx, 960, ST + 20, 1, t);
  const [wx, wy] = wins[1];
  const k = knocker(ctx, { x: 300, y: ST + 160, s: 520, arms: { L: [.3, -.1], R: { ik: [.25, -.66] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, -1] }, lean: -.05 });
  peaShooter(ctx, 300 + .2 * 520, ST + 160 - .66 * 520, 120, -1.0);
  for (let i = 0; i < 4; i++) { const ph = ((t * 1.3 + i / 4) % 1); const sx = 390, sy = ST + 160 - .66 * 520 - 90; pea(ctx, lerp(sx, wx, ph), lerp(sy, wy, ph) - Math.sin(ph * Math.PI) * 120, 12); if (ph > .9) burst(ctx, wx, wy, 34, 7, '#ffffff', i); }
  label(ctx, 'PING!', wx + 120, wy - 140, 80, t, .5, '#ffffff');
} });
// [1] factory towns: being late could cost you your job
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); nightDawn(ctx, t, cam, .7); applyCam(ctx, cam, 1);
  factory(ctx, 540, ST - 40, 900, 520, t, 6 + clamp((t - S(1)) / 4) * .2); cobbles(ctx, '#5a5660');
  const shut = ease(cue(t, wt(1, 'late'), .6)); factoryGate(ctx, 540, ST + 120, 620, 1 - shut);
  drawStick(ctx, C(BOSS, { x: 700, y: ST + 160, s: 460, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'squint', mouth: 'teeth', look: [-1, 0], browAng: .4 } }));
  const run = clamp((t - S(1)) / 3); const wo = C(WORKER, Object.assign({ x: lerp(-100, 300, run), y: ST + 220, s: 440, lean: .2, arms: { L: [1.4 + Math.sin(t * 12) * .5, .5], R: [1.4 - Math.sin(t * 12) * .5, .5] }, face: { eyes: 'wide', mouth: 'o' } }, walk(t, 14))); drawStick(ctx, wo); flatCap(ctx, wo); sweat(ctx, wo.x + 60, wo.y - .9 * 440, 46, 1);
  chapterTag(ctx, t, S(1) + .1, 'BRITAIN, 1800s'); label(ctx, 'LATE = FIRED', 540, 280, 100, t, wt(1, 'cost'), '#ff6a5a');
} });
// [2] alarm clocks were expensive and not very reliable
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .03 }); bgFlat(ctx, '#3a5a8a', '#1a2a4a'); applyCam(ctx, cam, 1);
  const br = cue(t, wt(2, 'reliable') - .1, .5);
  oldAlarm(ctx, 540 + (br ? 0 : Math.sin(t * 40) * 6), 800, 230, t, br);
  const p = backOut(cue(t, wt(2, 'expensive') - .1, .3)); if (p > 0) { ctx.save(); ctx.translate(700, 520); ctx.scale(p, p); priceTag(ctx, 0, 0, 200, '£££'); ctx.restore(); }
  if (br) label(ctx, 'BOING', 760, 1100, 90, t, wt(2, 'reliable'), '#ffd23a');
} });
// [3] a new job: the knocker-up
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .03 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  const k = backOut(cue(t, wt(3, 'new') - .1, .4)); ctx.save(); ctx.translate(540, 1560); ctx.scale(k, k); ctx.translate(-540, -1560);
  knocker(ctx, { x: 540, y: 1560, s: 860, arms: { L: [.3, -.1], R: { ik: [.2, -.68] } }, face: { eyes: 'happy', mouth: 'grin' } }, -.15, 1100); ctx.restore();
  label(ctx, 'THE', 540, 260, 80, t, wt(3, 'the') - .1, '#ffffff'); label(ctx, 'KNOCKER-UP', 540, 380, 130, t, wt(3, 'knocker') - .1, '#c8322c');
} });
// [4] before sunrise, a long bamboo pole, tapping on windows
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01, px: 0 }); const T0 = S(4), k = clamp((t - T0) / (S(5) - T0));
  nightDawn(ctx, t, cam, .25 + k * .2); applyCam(ctx, cam, 1);
  const off = -k * 700; const tap = t > wt(4, 'tapped') ? Math.max(0, Math.sin((t - wt(4, 'tapped')) * 10)) : 0;
  const wins = terrace(ctx, 60 + off, 6, 330, 640, [0, 0, t > wt(4, 'glass') ? 1 : 0, 0, 0, 0]); cobbles(ctx);
  gasLamp(ctx, 40 + off * .9, ST + 20, 1, t);
  const kx = 300, ky = ST + 160; const tgt = wins[2]; const ang = Math.atan2(tgt[0] - kx, -(tgt[1] - (ky - .55 * 500))) - tap * .04;
  knocker(ctx, Object.assign({ x: kx, y: ky, s: 500, arms: { L: [.3, -.1], R: { ik: [.25, -.62] } }, face: { eyes: 'normal', mouth: 'flat', look: [1, -1] } }, t < wt(4, 'tapped') ? walk(t, 7) : {}), t > wt(4, 'long') ? Math.max(.2, ang) : null, 720);
  if (tap > .9) label(ctx, 'TAP', tgt[0] + 100, tgt[1] - 120, 70, t, t - .01, '#ffffff', t + .2);
  if (t > wt(4, 'glass')) bedInWindow(ctx, ...tgt, t, 1);
  label(ctx, 'BEFORE SUNRISE', 540, 260, 80, t, wt(4, 'before'), '#ffd23a', wt(4, 'long'));
  label(ctx, 'BAMBOO POLE', 540, 260, 80, t, wt(4, 'bamboo'), '#ffffff');
} });
// [5] some used a pea shooter
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); nightDawn(ctx, t, cam, .3); applyCam(ctx, cam, 1);
  bigWindow(ctx, 760, 520, 300, 300, t, 0);
  const o = { x: 260, y: 1560, s: 760, arms: { L: { ik: [.18, -.72] }, R: { ik: [.26, -.72] } }, face: { eyes: 'squint', mouth: 'o', look: [1, -1] }, headTilt: -.15 };
  knocker(ctx, o); peaShooter(ctx, 260 + .2 * 760, 1560 - .74 * 760, 200, -.62);
  const t0 = wt(5, 'fired'); for (let i = 0; i < 5; i++) { const ph = (t - t0 - i * .22) / .5; if (ph < 0 || ph > 1.2) continue; const q = Math.min(1, ph); pea(ctx, lerp(440, 740, q), lerp(880, 540, q) - Math.sin(q * Math.PI) * 60, 16); if (ph > 1) burst(ctx, 740, 540, 40, 7, '#ffffff', i); }
  label(ctx, 'PEA SHOOTER', 540, 230, 96, t, wt(5, 'pea') - .1, '#7ee08a');
} });
// [6] they didn't leave until you were awake: no mumbling and rolling over
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam, { night: true, win: [620, 200, 300, 300] }); applyCam(ctx, cam, 1);
  const roll = t > wt(6, 'mumble') && t < wt(6, 'over') + .6; const up = t > wt(6, 'over') + .6;
  drawBed(ctx, 480, GY + 40, 1.4, { sleeper: up ? 'none' : 'closed' }); if (!up) drawZs(ctx, 320, 640, t, 1.1);
  if (roll) label(ctx, 'mmmf...', 360, 560, 70, t, wt(6, 'mumble'), '#ffffff');
  const tap = Math.max(0, Math.sin(t * 9)); if (tap > .8) burst(ctx, 770, 350, 30, 7, '#ffffff', Math.floor(t * 9));
  label(ctx, 'TAP TAP TAP', 770, 160, 60, t, S(6) + .1, '#ffd23a');
  if (up) { const so = C(SLEEPER, { x: 760, y: GY + 120, s: 520, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'half', mouth: 'frown' } }); drawStick(ctx, so); nightcap(ctx, so); label(ctx, "I'M UP!", 760, 330, 80, t, wt(6, 'over') + .6, '#ffffff'); }
} });
// [7] a few pennies a week per house; some woke whole streets
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01 }); nightDawn(ctx, t, cam, .45); applyCam(ctx, cam, 1);
  const k = clamp((t - wt(7, 'some')) / 1.8);
  const lit = Array.from({ length: 6 }, (_, i) => k * 6 > i ? 1 : 0); terrace(ctx, -50, 6, 200, 520, lit); cobbles(ctx);
  const n = Math.floor(clamp((t - wt(7, 'pennies') + .3) / 1.2) * 6); for (let i = 0; i < n; i++) penny(ctx, 260 + (i % 3) * 120, 1500 - Math.floor(i / 3) * 34, 50);
  knocker(ctx, Object.assign({ x: lerp(100, 980, k), y: ST + 160, s: 420, arms: { L: [.3, -.1], R: { ik: [.25, -.62] } }, face: { eyes: 'normal', mouth: 'smile' } }, walk(t, 8)), .5, 560);
  label(ctx, 'A FEW PENNIES', 540, 260, 84, t, wt(7, 'paid'), '#ffd23a', wt(7, 'some')); label(ctx, 'WHOLE STREETS', 540, 260, 90, t, wt(7, 'whole') - .2, '#ffffff');
} });
// [8] in a few towns, into the 1970s
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  const yr = Math.round(lerp(1850, 1970, ease(cue(t, wt(8, 'lasted') - .3, 1.8))));
  drawDigital(ctx, 540, 560, 1.6, String(yr), '#7dffb0');
  knocker(ctx, { x: 540, y: 1560, s: 640, arms: POSE.hips.arms, face: { eyes: 'happy', mouth: 'grin' } }, -.1, 820);
  label(ctx, 'IN A FEW TOWNS', 540, 300, 70, t, wt(8, 'few') - .2, '#ffffff');
} });
// [9] one obvious question
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .04 }); bgFlat(ctx, '#7a4bc4', '#4a2c86'); applyCam(ctx, cam, 1);
  qmark(ctx, 540, 820 + Math.sin(t * 3) * 14, 520 * backOut(cue(t, wt(9, 'obvious') - .2, .35)), '#ffd23a');
} });
// [10] who wakes up the knocker-up?
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam, { night: true, win: [620, 200, 300, 300] }); applyCam(ctx, cam, 1);
  drawBed(ctx, 540, GY + 40, 1.4, { sleeper: 'closed' }); drawZs(ctx, 380, 640, t, 1.1);
  ctx.save(); ctx.translate(820, GY - 150); ctx.rotate(.15); line(ctx, -40, 120, 40, -620, 12, '#c9a05b'); ctx.restore();
  label(ctx, 'WHO WAKES', 540, 260, 100, t, wt(10, 'who') - .1, '#ffffff'); label(ctx, 'THE KNOCKER-UP?', 540, 390, 90, t, wt(10, 'knocker', 1) - .2, '#ffd23a');
} });
// [11] often, nobody
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); nightDawn(ctx, t, cam, .1); applyCam(ctx, cam, 1);
  terrace(ctx, -80, 4, 330, 640, []); cobbles(ctx); gasLamp(ctx, 540, ST + 20, 1, t);
  const tw = clamp((t - S(11)) / 1.6); ctx.save(); ctx.translate(lerp(-100, 1180, tw), ST + 180); ctx.rotate(t * 6); for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(0, 0, 50, i, i + 2.4); ctx.lineWidth = 6; ctx.strokeStyle = '#8a6a3c'; ctx.stroke(); } ctx.restore();
  label(ctx, 'NOBODY', 540, 280, 140, t, wt(11, 'nobody') - .1, '#ffffff');
} });
// [12] night owls: worked through the night, slept during the day
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const day = t > wt(12, 'slept') - .2;
  const cam = camA(t, lt, { z: 1.02, dz: .02 });
  if (!day) { nightDawn(ctx, t, cam, 0); applyCam(ctx, cam, 1); terrace(ctx, -80, 4, 330, 640, []); cobbles(ctx); gasLamp(ctx, 900, ST + 20, 1, t);
    const o = knocker(ctx, { x: 460, y: ST + 260, s: 620, arms: POSE.hips.arms, face: { eyes: 'wide', mouth: 'grin' } }, -.12, 760); drawOwl(ctx, 460 + .22 * 620, ST + 260 - .62 * 620, .55, 0);
    label(ctx, 'NIGHT OWLS', 540, 280, 110, t, wt(12, 'night') - .1, '#ffd23a');
  } else { bgRoom(ctx, t, cam, { win: [620, 200, 300, 300] }); applyCam(ctx, cam, 1); drawBed(ctx, 540, GY + 40, 1.4, { sleeper: 'closed' }); drawZs(ctx, 380, 640, t, 1.1); applyCam(ctx, cam, 1); drawSun(ctx, 770, 350, 60, t, 1);
    label(ctx, 'ASLEEP ALL DAY', 540, 280, 90, t, wt(12, 'slept') - .1, '#ffffff'); }
} });
// [13] the person who woke everyone up never went to sleep
SHOTS.push({ start: S(13), end: S(14), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); const k = clamp((t - S(13)) / (S(14) - S(13)));
  nightDawn(ctx, t, cam, k * .9); applyCam(ctx, cam, 1);
  const lit = Array.from({ length: 6 }, (_, i) => k * 7 > i + 1 ? 1 : 0); terrace(ctx, -50, 6, 200, 520, lit); cobbles(ctx); gasLamp(ctx, 880, ST + 20, k < .8 ? 1 : 0, t);
  knocker(ctx, { x: 520, y: ST + 250, s: 560, arms: { L: [.3, -.1], R: { ik: [.2, -.68] } }, face: { eyes: 'wide', mouth: 'smile' } }, -.15, 720);
  label(ctx, 'NEVER SLEPT', 540, 280, 110, t, wt(13, 'never') - .2, '#ffd23a');
} });
