// ---------- "The sweetest disaster in history" (Boston molasses flood, 1919, portrait Short) ----------
// Shots are keyed to sentences of script.json; cues come from the word timings (web/words.js).
// Real deaths are part of this story: the casualty beat is shown as a memorial, never as bodies or jokes.
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
const FOLK = [PAL.blue, ['#5a4a3a', '#5a4a3a'], PAL.green, ['#7a2a3a', '#7a2a3a'], ['#3a4a5a', '#3a4a5a']];
const BOSSC = { cols: ['#2a2a30', '#2a2a30'], hat: 'none', belt: false };
const run = (t, sp = 13) => { const a = Math.sin(t * sp); return { arms: { L: [1.3 + a * .6, .5], R: [1.3 - a * .6, .5] }, legs: { L: [.2 + Math.max(0, a) * .9, -Math.max(0, a) * 1.1 - .04], R: [.2 + Math.max(0, -a) * .9, -Math.max(0, -a) * 1.1 - .04] }, lean: .18, bob: -Math.abs(Math.cos(t * sp)) * .02 }; };
function folk(ctx, i, o) { const so = C({ cols: FOLK[i % FOLK.length], hat: 'none', belt: false }, o); drawStick(ctx, so); if (i % 2) flatCap(ctx, so); return so; }

const SHOTS = [];
// [0] a wave of syrup taller than a house, at the speed of a car (in action on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015, shake: 6 }); winterSky(ctx, t, cam); applyCam(ctx, cam, .5);
  for (let i = 0; i < 5; i++) brickBlock(ctx, -100 + i * 300 - (t * 120) % 300, G, 260, 420 + (i % 2) * 120, i % 2 ? '#8a4a32' : '#a8603a');
  applyCam(ctx, cam, 1); harborGround(ctx, G);
  const fx = 480 + Math.sin(t * .8) * 30; molWave(ctx, fx, G + 60, 700, t);
  drawCar(ctx, 860 + Math.sin(t * 2) * 20, G + 80, 1.2, 0, '#2a2a30');
  label(ctx, '1919', 540, 260, 130, t, .1, '#ffffff'); label(ctx, '= 1 HOUSE TALL', 300, 470, 66, t, wt(0, 'taller'), '#ffd23a');
} });
// [1] a giant tank near the harbour: fifty feet, two million gallons
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); winterSky(ctx, t, cam); applyCam(ctx, cam, .4); seaLine(ctx);
  applyCam(ctx, cam, 1); harborGround(ctx, G);
  molTank(ctx, 600, G, 640, 820, t, { paint: 0 });
  folk(ctx, 0, { x: 180, y: G + 120, s: 300, arms: POSE.idle.arms, face: { eyes: 'normal', look: [1, -1], mouth: 'o' } });
  const k = cue(t, wt(1, 'fifty') - .2, .4); if (k > 0) { ctx.globalAlpha = k; line(ctx, 980, G, 980, G - 820, 8, '#ffd23a'); line(ctx, 950, G, 1010, G, 8, '#ffd23a'); line(ctx, 950, G - 820, 1010, G - 820, 8, '#ffd23a'); ctx.globalAlpha = 1; }
  label(ctx, '50 FT', 980, G - 870, 70, t, wt(1, 'fifty'), '#ffd23a');
  label(ctx, '2,000,000+ GALLONS', 540, 260, 74, t, wt(1, 'two') - .2, '#ffffff');
  chapterTag(ctx, t, S(1) + .1, 'BOSTON');
} });
function seaLine(ctx) { ctx.fillStyle = '#5a7a9a'; ctx.fillRect(-2000, G - 140, 5080, 140); }
// [2] the tank leaked; neighbours collected the drips
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .02, y: 1000 }); winterSky(ctx, t, cam); applyCam(ctx, cam, 1); harborGround(ctx, G);
  molTank(ctx, 540, G, 900, 1100, t, { paint: 0, drips: true });
  const k = cue(t, wt(2, 'neighbors') - .2, .3);
  if (k > 0) for (let i = 0; i < 2; i++) { const x = 300 + i * 420; drawStick(ctx, { cols: i ? PAL.yellow : PAL.red, hat: 'none', belt: false, x, y: G + 200, s: 340, arms: { L: [.3, -.1], R: { ik: [.24, -.36] } }, face: { eyes: 'happy', mouth: 'grin' } }); pail(ctx, x + .26 * 340, G + 200 - .1 * 340, 70, 1); }
  label(ctx, 'LEAK', 540, 280, 110, t, wt(2, 'leaked') - .1, '#ff6a5a');
} });
// [3] the company's solution: paint it brown
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02, y: 1000 }); winterSky(ctx, t, cam); applyCam(ctx, cam, 1); harborGround(ctx, G);
  const p = ease(cue(t, wt(3, 'paint') - .1, 2.2));
  molTank(ctx, 540, G, 900, 1100, t, { paint: p, drips: p < .8 });
  const so = C(BOSSC, { x: 250 + p * 520, y: G + 180, s: 420, arms: { L: [.3, -.1], R: { ik: [.25, -.9 + Math.sin(t * 8) * .08] } }, face: { eyes: 'half', mouth: 'smirk' } }); drawStick(ctx, so); topHat(ctx, so);
  paintRoller(ctx, so.x + .25 * 420, G + 180 - .9 * 420 - 60 + Math.sin(t * 8) * 34, 90, .1);
  label(ctx, 'SOLUTION?', 540, 260, 110, t, wt(3, 'solution') - .2, '#ffffff', wt(3, 'paint')); label(ctx, 'PAINT IT BROWN', 540, 260, 90, t, wt(3, 'paint'), '#b8743a');
  label(ctx, 'HIDDEN LEAKS', 540, 380, 64, t, wt(3, 'harder'), '#ff6a5a');
} });
// [4] January 15th: the weather suddenly warmed up
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); const w = ease(cue(t, wt(4, 'warmed') - .4, 1.0));
  winterSky(ctx, t, cam, { top: mix('#8fb0d0', '#6fb7ef', w), bot: mix('#e6eef4', '#fff1d0', w) }); applyCam(ctx, cam, 1);
  bigThermo(ctx, 540, 1100, 620, lerp(.12, .55, w), mix('#5fb6f0', '#ff8a3a', w));
  label(ctx, 'JANUARY 15', 540, 260, 100, t, wt(4, 'january') - .1, '#ffffff'); label(ctx, lerp(2, 40, w).toFixed(0) + '°F', 820, 700, 90, t, wt(4, 'weather'), '#ffd23a');
} });
// [5] lunchtime: a sound like machine-gun fire; rivets popping
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const pops = cue(t, wt(5, 'machine') - .2, 2.5);
  const cam = camA(t, lt, { z: 1.0, dz: .015, shake: 3 + pops * 8 }); winterSky(ctx, t, cam, { top: '#6fb7ef', bot: '#fff1d0' }); applyCam(ctx, cam, 1); harborGround(ctx, G);
  molTank(ctx, 540, G - 120, 640, 760, t, { rivets: t > wt(5, 'rivets') - .4 ? pops : 0 });
  for (let i = 0; i < 4; i++) { const look = t > wt(5, 'heard'); folk(ctx, i, { x: 150 + i * 260, y: G + 260 + (i % 2) * 40, s: 360, arms: look ? { L: [.5, -1.2], R: [2.2, .5] } : POSE.idle.arms, face: look ? { eyes: 'wide', mouth: 'o', look: [0, -1] } : { eyes: 'happy', mouth: 'smile' } }); }
  label(ctx, 'LUNCHTIME', 540, 230, 80, t, wt(5, 'lunchtime') - .2, '#ffffff', wt(5, 'machine')); label(ctx, 'RAT-TAT-TAT', 540, 230, 100, t, wt(5, 'machine') - .1, '#ff6a5a');
} });
// [6] then the tank split open
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const k = easeOut(cue(t, wt(6, 'split') - .1, .5));
  const cam = camA(t, lt, { z: 1.02, dz: .04, shake: k > 0 && k < 1 ? 20 : 3 }); winterSky(ctx, t, cam, { top: '#6fb7ef', bot: '#fff1d0' }); applyCam(ctx, cam, 1); harborGround(ctx, G);
  molTank(ctx, 540, G - 120, 640, 760, t, { split: k });
  if (k > 0 && k < 1) { burst(ctx, 540, G - 500, 300 * (1 - k * .5), 13, '#ffe14d', 5); tint(ctx, '#ffffff', .2 * (1 - k)); }
} });
// [7] a brown wave, 25 feet high, 35 miles an hour
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01, shake: 6 }); winterSky(ctx, t, cam, { top: '#6fb7ef', bot: '#fff1d0' }); applyCam(ctx, cam, .5);
  for (let i = 0; i < 5; i++) brickBlock(ctx, -100 + i * 300 - (t * 180) % 300, G, 260, 420 + (i % 2) * 120, i % 2 ? '#8a4a32' : '#a8603a');
  applyCam(ctx, cam, 1); harborGround(ctx, G);
  molWave(ctx, 420 + Math.sin(t) * 20, G + 60, 760, t);
  for (let i = 0; i < 3; i++) folk(ctx, i + 1, Object.assign({ x: 740 + i * 120, y: G + 140 + i * 30, s: 300, face: { eyes: 'wide', mouth: 'o' } }, run(t + i)));
  label(ctx, '~25 FT', 300, 300, 100, t, wt(7, 'twenty') - .2, '#ffd23a'); label(ctx, '~35 MPH', 780, 300, 100, t, wt(7, 'thirty') - .2, '#ff6a5a');
} });
// [8] buildings off their foundations; the elevated railway bent
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015, shake: 7 }); winterSky(ctx, t, cam, { top: '#6fb7ef', bot: '#fff1d0' }); applyCam(ctx, cam, 1);
  const tip = ease(cue(t, wt(8, 'knocked') - .1, 1.2)), bend = ease(cue(t, wt(8, 'bent') - .2, 1.0));
  elRailway(ctx, -100, 1180, 640, bend, t, bend < .3);
  brickBlock(ctx, 260 + tip * 120, G, 300, 520, '#a8603a', tip * .3);
  ctx.fillStyle = MOL; ctx.fillRect(-2000, G - 60, 5080, 2000); ctx.fillStyle = MOLHI; ctx.globalAlpha = .4; for (let i = 0; i < 8; i++) ctx.fillRect(-200 + ((i * 230 + t * 160) % 1500), G - 50 + (i % 3) * 30, 140, 10); ctx.globalAlpha = 1;
  label(ctx, 'OFF ITS FOUNDATIONS', 540, 250, 70, t, wt(8, 'foundations') - .3, '#ffffff', wt(8, 'bent') - .2); label(ctx, 'STEEL BENT', 540, 250, 96, t, wt(8, 'bent') - .1, '#ff6a5a');
} });
// [9] then the cold came back
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); const c = ease(cue(t, wt(9, 'cold') - .2, .9));
  winterSky(ctx, t, cam, { top: mix('#6fb7ef', '#6a8ab0', c), bot: mix('#fff1d0', '#dfe8f2', c) }); applyCam(ctx, cam, 1);
  bigThermo(ctx, 540, 1100, 620, lerp(.55, .14, c), mix('#ff8a3a', '#5fb6f0', c)); tint(ctx, '#bfe4ff', c * .15);
  label(ctx, 'COLD AGAIN', 540, 260, 110, t, wt(9, 'cold'), '#bfe4ff');
} });
// [10] molasses thickens; people caught can't move; rescuers struggle
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .015 }); winterSky(ctx, t, cam, { top: '#6a8ab0', bot: '#dfe8f2' }); applyCam(ctx, cam, 1);
  const stuckY = G + 120;
  folk(ctx, 3, { x: 560, y: stuckY + 110, s: 520, arms: { L: [2.4, .3], R: [2.0, .4] }, face: { eyes: 'wide', mouth: 'o', browUp: 1 } });
  ctx.fillStyle = MOL; ctx.fillRect(-2000, stuckY - 30, 5080, 2000); const g = ctx.createLinearGradient(0, stuckY - 30, 0, stuckY + 40); g.addColorStop(0, MOLHI); g.addColorStop(1, MOL); ctx.fillStyle = g; ctx.fillRect(-2000, stuckY - 30, 5080, 70);
  if (t > wt(10, 'rescuers') - .3) { const r1 = { cols: ['#f4f4f0', '#2a4a8a'], hat: 'none', belt: false, x: 200, y: stuckY + 60, s: 400, arms: { L: [.3, -.1], R: { ik: [.36, -.62] } }, face: { eyes: 'squint', mouth: 'teeth' }, lean: -.1 }; drawStick(ctx, r1); sailorCap2(ctx, r1);
    const r2 = { cols: ['#f4f4f0', '#f4f4f0'], hat: 'none', belt: false, x: 900, y: stuckY + 60, s: 400, flip: -1, arms: { L: [.3, -.1], R: { ik: [.36, -.62] } }, face: { eyes: 'squint', mouth: 'flat' } }; drawStick(ctx, r2); nurseCap(ctx, r2);
    line(ctx, 200 + .36 * 400, stuckY + 60 - .62 * 400, 520, stuckY - 160, 6, '#c9a05b'); }
  label(ctx, 'THICKER', 540, 260, 110, t, wt(10, 'thicker') - .1, '#b8743a', wt(10, 'people')); label(ctx, 'STUCK', 540, 260, 120, t, wt(10, 'couldn') - .1, '#ffffff');
} });
// [11] twenty-one people died; about 150 were hurt (a memorial, not a joke)
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .015, shake: 1 }); bgFlat(ctx, '#2a2f3a', '#14171e'); applyCam(ctx, cam, 1);
  rrect(ctx, 220, 520, 640, 520, 30); fillStroke(ctx, '#6a6a72', 10); rrect(ctx, 250, 550, 580, 460, 20); fillStroke(ctx, '#8a8a92', 6);
  text(ctx, 'BOSTON 1919', 540, 640, 54, '#f4efe4', INK, 0);
  const k1 = cue(t, wt(11, 'twenty'), .5), k2 = cue(t, wt(11, 'about'), .5);
  ctx.globalAlpha = k1; text(ctx, '21 LIVES LOST', 540, 790, 70, '#ffffff', INK, 0); ctx.globalAlpha = k2; text(ctx, '~150 INJURED', 540, 920, 56, '#d8d8de', INK, 0); ctx.globalAlpha = 1;
  for (const cx of [300, 780]) { ctx.beginPath(); ctx.rect(cx - 22, 1080, 44, 120); fillStroke(ctx, '#f4efe4', 5); const f = 1 + .1 * Math.sin(t * 9 + cx); ctx.beginPath(); ctx.ellipse(cx, 1060, 12 * f, 26 * f, 0, 0, TAU); ctx.fillStyle = '#ffc24a'; ctx.fill(); ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(cx, 1060, 4, cx, 1060, 140); g.addColorStop(0, 'rgba(255,200,100,.35)'); g.addColorStop(1, 'rgba(255,200,100,0)'); ctx.fillStyle = g; ctx.fillRect(cx - 160, 900, 320, 320); ctx.restore(); }
} });
// [12] building rules got stricter across America
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); bgFlat(ctx, '#3a5a8a', '#1a2a4a'); applyCam(ctx, cam, 1);
  clipboardRules(ctx, 420, 820, 640, clamp((t - wt(12, 'building')) / 1.2));
  const so = { cols: ['#3a4a5a', '#3a4a5a'], hat: 'none', belt: false, x: 860, y: 1520, s: 520, flip: -1, arms: { L: [.3, -.1], R: [1.7, .3] }, face: { eyes: 'normal', mouth: 'flat', look: [-1, 0] } }; drawStick(ctx, so); flatCap(ctx, so, '#2a2a30');
  stamp(ctx, 420, 1180, 'STRICTER', cue(t, wt(12, 'stricter') - .1, .2), '#3fa35b', -.12);
  label(ctx, 'ACROSS AMERICA', 540, 260, 80, t, wt(12, 'cities') - .1, '#ffffff');
} });
// [13] for decades, locals said the neighbourhood still smelled sweet
SHOTS.push({ start: S(13), end: S(14), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#d3f0fb', -400, 1300); applyCam(ctx, cam, .1); drawSun(ctx, 860, 260, 70, t, 1);
  applyCam(ctx, cam, .4); seaLine(ctx); applyCam(ctx, cam, 1); ctx.fillStyle = '#7ed05a'; ctx.fillRect(-2000, G, 5080, 2000);
  const so = folk(ctx, 2, { x: 520, y: G + 260, s: 620, arms: POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile', look: [0, -.6] }, headTilt: -.1 });
  sweetSmell(ctx, 600, G - 380, t, cue(t, wt(13, 'smelled') - .8, .6));
  label(ctx, 'LOCALS SAY...', 540, 260, 80, t, wt(13, 'locals') - .1, '#ffffff'); label(ctx, 'SWEET', 780, 520, 110, t, wt(13, 'sweet') - .1, '#b8743a');
} });
