const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const SHOTS = [];
const ph = (t, ...cuts) => { let i = 0; while (i < cuts.length && t >= cuts[i]) i++; return i; };
const run = (t, k = 0) => ({ legs: runLegs(t, 13, k), arms: runArms(t, 13, k) });
const tired = (t, k = 0) => ({ legs: runLegs(t, 7, k), arms: { L: [.3, -.2], R: [.3, -.2] }, lean: .12 });
function raceRow(ctx, t, n, y, s, dx = 0, o = {}) { for (let i = 0; i < n; i++) runner(ctx, Object.assign({ x: 120 + i * (840 / Math.max(1, n - 1)) + dx, y: y + (i % 2) * 40, s, bob: Math.abs(Math.sin(t * 13 + i)) * -.02, face: { eyes: o.eyes || 'squint', mouth: o.mouth || 'teeth' }, sweat: o.sweat }, run(t, i)), i + 3, i); }
// [0] the 1904 Olympic marathon might be the strangest race in history
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); raceRow(ctx, t, 4, G + 120, 440, 0, { sweat: true }); dust(ctx, 900, 1100, 300, t, .6); oldCar(ctx, 860, 1150, 420, '#2a2a30');
  chapterTag(ctx, t, .05, 'OLYMPICS, 1904'); label(ctx, 'STRANGEST RACE', 540, 260, 110, t, wt(0, 'strangest') - .2, '#ffd23a');
} });
// [1] winner poisoned; first man rode in a car; one runner napped
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(1, 'the', 1) - .1, wt(1, 'and') - .1); const cam = camA(t, lt, { z: 1.04, dz: .04 });
  if (p === 0) { bgFlat(ctx, '#5a8a3a', '#2a4a1a'); applyCam(ctx, cam, 1); runner(ctx, { x: 540, y: G + 200, s: 760, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'spiral', mouth: 'grin' }, t }, 20, 0); vial(ctx, 860, 900, 260); label(ctx, 'POISONED', 540, 260, 140, t, wt(1, 'poisoned') - .3, '#7ee08a'); }
  else if (p === 1) { dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); oldCar(ctx, 540 + Math.sin(t) * 30, 1250, 700, '#2a2a30'); runner(ctx, { x: 560, y: 1070, s: 340, shadow: false, arms: { L: [.3, -.1], R: [2.6, .2] }, face: { eyes: 'happy', mouth: 'grin' } }, 31, 1); label(ctx, 'RODE IN A CAR', 540, 260, 120, t, wt(1, 'car') - .3, '#ff9ab0'); }
  else { dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); ctx.save(); ctx.translate(540, G + 60); ctx.rotate(-Math.PI / 2); carvajal(ctx, { x: 0, y: 0, s: 520, shadow: false, face: { eyes: 'happy', mouth: 'flat' }, arms: { L: [.2, 0], R: [.2, 0] } }); ctx.restore(); for (let i = 0; i < 3; i++) { const k = ((t * .6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - k; text(ctx, 'z', 700 + k * 80, 980 - k * 200, 60 + k * 40, '#ffffff', INK, 8); ctx.restore(); } label(ctx, 'A NAP', 540, 260, 140, t, wt(1, 'nap') - .3, '#9ad8ff'); }
} });
// [2] here's how it happened
SHOTS.push({ start: S(2), end: S(3), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .06 }); bgFlat(ctx, '#2a2a3a', '#14141e'); applyCam(ctx, cam, 1); for (let i = 0; i < 12; i++) { ctx.save(); ctx.globalAlpha = .1; ctx.translate(540, 800); ctx.rotate(i / 12 * TAU + t * .3); path(ctx, [[0, 0], [-70, -1500], [70, -1500]]); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore(); } stopwatch(ctx, 540, 760, 220, '1904', t); label(ctx, 'HERE\'S HOW', 540, 300, 120, t, S(2) + .05, '#ffd23a');
} });
// [3] St. Louis, August 1904; Olympics part of a giant World's Fair
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); worldsFair(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 5; i++) (i % 2 ? lady : gent)(ctx, { x: 120 + i * 210, y: G + 160 + (i % 2) * 30, s: 420, arms: i === 2 ? { L: [.3, -.1], R: [2.4, .3] } : POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile', look: [0, -1] } }, i);
  chapterTag(ctx, t, S(3) + .05, 'ST. LOUIS, AUGUST 1904'); label(ctx, "WORLD'S FAIR", 540, 260, 120, t, wt(3, 'worlds') - .3, '#ffffff');
} });
// [4] 32 runners line up; over 30 °C; dirt roads; steep hills
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(4, 'its') - .1); const cam = camA(t, lt, { z: 1.0, dz: .03 });
  if (p === 0) { stadium(ctx, t, cam); applyCam(ctx, cam, 1); for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) runner(ctx, { x: 80 + i * 130 + r * 60, y: 1180 + r * 160, s: 300 + r * 60, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'smile' } }, 1 + r * 8 + i, i + r); label(ctx, '32 RUNNERS', 540, 260, 130, t, wt(4, '32') - .2, '#ffffff'); }
  else { dirtRoad(ctx, t, cam, { top: '#f2a85a', bot: '#fbe0b0', sunY: 280 }); applyCam(ctx, cam, 1); bigThermoL(ctx, 840, 1000, 520, clamp((t - wt(4, 'over')) / .6)); raceRow(ctx, t, 2, G + 140, 420, -40, { sweat: true }); label(ctx, '30°C+', 540, 260, 140, t, wt(4, 'over') - .2, '#ff7a4a', wt(4, 'roads') - .2); label(ctx, 'DIRT ROADS', 540, 260, 130, t, wt(4, 'roads') - .2, '#c8a060', wt(4, 'steep') - .2); label(ctx, 'STEEP HILLS', 540, 260, 130, t, wt(4, 'steep') - .2, '#ffffff'); }
} });
function bigThermoL(ctx, x, y, h, v) { rrect(ctx, x - 34, y - h, 68, h, 34); fillStroke(ctx, '#f6f6f2', 8); circle(ctx, x, y + 20, 60); fillStroke(ctx, '#e0392f', 8); rrect(ctx, x - 16, y - h * (.3 + .6 * v), 32, h * (.3 + .6 * v) + 20, 16); ctx.fillStyle = '#e0392f'; ctx.fill(); }
// [5] officials and doctors drive ahead in cars; runners choke on dust
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03, shake: 3 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const k = (t - S(5)) * 80; oldCar(ctx, 760 + k, 1160, 460, '#2a2a30'); for (let i = 0; i < 2; i++) gent(ctx, { x: 700 + i * 110 + k, y: 1020, s: 220, shadow: false, arms: POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile' } }, i); dust(ctx, 560 + k, 1130, 420, t, .85);
  const choke = t > wt(5, 'so') - .1; for (let i = 0; i < 3; i++) runner(ctx, Object.assign({ x: 120 + i * 170, y: G + 160 + (i % 2) * 40, s: 420, face: choke ? { eyes: 'x', mouth: 'o' } : { eyes: 'squint', mouth: 'teeth' } }, choke ? { legs: runLegs(t, 9, i), arms: { L: [2.6, -1.6], R: [.3, -.2] } } : run(t, i)), 5 + i, i);
  label(ctx, 'CARS AHEAD', 540, 260, 120, t, wt(5, 'drive') - .2, '#ffffff', wt(5, 'so') - .1); label(ctx, 'CHOKING ON DUST', 540, 260, 104, t, wt(5, 'choking') - .3, '#d8b070');
} });
// [6] only one place to get water on the whole course
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); dirtRoad(ctx, t, cam, { fence: false }); applyCam(ctx, cam, 1); well(ctx, 540, 1180, 520); runner(ctx, { x: 220, y: G + 180, s: 480, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] }, sweat: true }, 9, 2); label(ctx, 'ONE WELL', 540, 260, 140, t, wt(6, 'one') - .2, '#9ad8ff'); text(ctx, '1', 860, 560, 200, '#ffffff', INK, 20); text(ctx, '1', 860, 560, 200, '#ffffff', INK, 0);
} });
// [7] on purpose: organizer James Sullivan wants to see what happens when athletes don't drink
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#e8d0a8', '#c8a878'); applyCam(ctx, cam, 1); sullivan(ctx, { x: 420, y: G + 200, s: 760, arms: { L: [.3, -.1], R: { ik: [.4, -.5] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }); chalkboard(ctx, 760, 560, 300, 240, ['NO WATER', '= ?']); rrect(ctx, 420 + .4 * 760 - 50, G + 200 - .5 * 760 - 70, 100, 130, 6); fillStroke(ctx, '#f6f2e6', 5);
  label(ctx, 'ON PURPOSE', 540, 260, 130, t, wt(7, 'purpose') - .3, '#e0392f', wt(7, 'james') - .2); label(ctx, 'JAMES SULLIVAN', 540, 260, 110, t, wt(7, 'james') - .2, '#ffffff', wt(7, 'athletes') - .2); label(ctx, "DON'T DRINK", 540, 260, 130, t, wt(7, 'athletes') - .2, '#9ad8ff');
} });
// [8] so what happens?
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .06 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); qmark(ctx, 540, 760, 400, '#ffffff'); label(ctx, 'SO...', 540, 260, 140, t, S(8) + .05, '#ffffff');
} });
// [9] William Garcia collapsed; dust tore his stomach lining; nearly dies
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const p = ph(t, wt(9, 'the', 1) - .1);
  if (p === 0) { ctx.save(); ctx.translate(540, G + 80); ctx.rotate(-Math.PI / 2 * .95); runner(ctx, { x: 0, y: 0, s: 560, shadow: false, arms: { L: [1.6, -.2], R: [.3, -.1] }, face: { eyes: 'x', mouth: 'o' } }, 11, 1); ctx.restore(); dust(ctx, 760, 1140, 300, t, .7); label(ctx, 'WILLIAM GARCIA', 540, 260, 110, t, wt(9, 'william') - .2, '#ffffff', wt(9, 'collapsed') - .2); label(ctx, 'COLLAPSED', 540, 260, 130, t, wt(9, 'collapsed') - .2, '#e0392f'); }
  else { bgFlat(ctx, '#f2d8c8', '#c8987a'); applyCam(ctx, cam, 1); ctx.save(); ellipse(ctx, 540, 780, 260, 200); fillStroke(ctx, '#f29bb0', 10); for (let i = 0; i < 14; i++) { const r = rng(i + 4); circle(ctx, 360 + r() * 360, 640 + r() * 280, 10 + r() * 14); ctx.fillStyle = 'rgba(160,120,70,.8)'; ctx.fill(); } line(ctx, 470, 700, 620, 860, 10, '#c8322c'); ctx.restore(); label(ctx, 'DUST INSIDE', 540, 260, 120, t, wt(9, 'dust') - .2, '#c8a060', wt(9, 'nearly') - .2); label(ctx, 'NEARLY DIES', 540, 260, 130, t, wt(9, 'nearly') - .2, '#e0392f'); }
} });
// [10] another runner starts vomiting and quits
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const q = t > wt(10, 'quits') - .1; runner(ctx, { x: 540, y: G + 200, s: 720, lean: q ? 0 : .35, arms: q ? { L: [.3, -.1], R: [2.4, .3] } : { L: [.8, -.4], R: [.8, -.4] }, face: q ? { eyes: 'half', mouth: 'frown' } : { eyes: 'x', mouth: 'o' }, blush: true }, 14, 4); if (!q) for (let i = 0; i < 5; i++) { const k = ((t * 2 + i / 5) % 1); circle(ctx, 720 + k * 120, 820 + k * k * 400, 18 - k * 8); ctx.fillStyle = '#9ac84a'; ctx.fill(); } label(ctx, 'VOMITING', 540, 260, 130, t, wt(10, 'vomiting') - .2, '#9ac84a', wt(10, 'quits') - .1); label(ctx, 'QUITS', 540, 260, 140, t, wt(10, 'quits') - .1, '#ffffff');
} });
// [11] Andarín Carvajal, a mailman from Cuba
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#2a6ab8', '#12305a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } carvajal(ctx, { x: 540, y: G + 220, s: 820, arms: { L: [.3, -.1], R: [2.4, -1.8] }, face: { eyes: 'happy', mouth: 'grin' } }); mailbag(ctx, 540 - .3 * 820, G + 220 - .35 * 820, 260);
  label(ctx, 'ANDARÍN CARVAJAL', 540, 260, 96, t, wt(11, 'andar') - .2, '#ffffff', wt(11, 'mailman') - .2); label(ctx, 'MAILMAN · CUBA', 540, 260, 110, t, wt(11, 'mailman') - .2, '#ffd23a');
} });
// [12] raised money, lost it gambling in New Orleans, hitchhiked
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(12, 'lost') - .1, wt(12, 'had') - .2); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { usMap(ctx, t, cam, clamp((t - S(12)) / 2)); label(ctx, '→ ST. LOUIS', 540, 260, 110, t, wt(12, 'raised') - .2, '#ffffff'); }
  else if (p === 1) { bgFlat(ctx, '#2a5a3a', '#123020'); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) dice(ctx, 300 + i * 220, 700 + Math.sin(t * 8 + i) * 40, 140, t * 6 + i, [1, 6, 3][i]); carvajal(ctx, { x: 540, y: G + 240, s: 620, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'wide', mouth: 'o' } }); label(ctx, 'LOST IT ALL', 540, 260, 130, t, wt(12, 'lost') - .1, '#e0392f'); chapterTag(ctx, t, wt(12, 'new') - .2, 'NEW ORLEANS'); }
  else { dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); carvajal(ctx, { x: 300, y: G + 180, s: 620, arms: { L: [.3, -.1], R: [1.6, .6] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); oldCar(ctx, 820 - (t - wt(12, 'had')) * 60, 1200, 420, '#5a3a2a'); label(ctx, 'HITCHHIKE', 540, 260, 130, t, wt(12, 'hitchhike') - .2, '#ffd23a'); }
} });
// [13] runs in his street clothes, trousers cut off at the knee
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const cut = t > wt(13, 'trousers') - .1; carvajal(ctx, Object.assign({ x: 540, y: G + 220, s: 760, face: { eyes: 'happy', mouth: 'grin' }, trousers: true }, run(t))); if (cut) { const k = clamp((t - wt(13, 'cut')) / .3); ctx.save(); ctx.translate(860, 900); ctx.rotate(-.6 + k * .6); line(ctx, -60, 0, 60, 0, 10, '#8a8a92'); line(ctx, -60, 0, -100, -40, 10, '#8a8a92'); line(ctx, -60, 0, -100, 40, 10, '#8a8a92'); ctx.restore(); }
  label(ctx, 'STREET CLOTHES', 540, 260, 110, t, wt(13, 'street') - .2, '#ffffff', wt(13, 'trousers') - .1); label(ctx, 'DIY SHORTS', 540, 260, 130, t, wt(13, 'cut') - .2, '#ffd23a');
} });
// [14] gets hungry, eats apples from an orchard; they're rotten
SHOTS.push({ start: S(14), end: S(15), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); const rot = t > wt(14, 'theyre') - .1;
  if (!rot) { dirtRoad(ctx, t, cam, { fence: false }); applyCam(ctx, cam, 1); tree2(ctx, 780, 1160, 700, 8, false); carvajal(ctx, { x: 360, y: G + 200, s: 680, arms: { L: [.3, -.1], R: { ik: [.36, -.7] } }, face: { eyes: 'happy', mouth: 'grin', look: [1, -1] } }); appleR(ctx, 360 + .36 * 680, G + 200 - .7 * 680 - 30, 36, false); label(ctx, 'HUNGRY', 540, 260, 140, t, wt(14, 'hungry') - .2, '#ffffff', wt(14, 'apples') - .2); label(ctx, 'APPLES', 540, 260, 140, t, wt(14, 'apples') - .2, '#e0392f'); }
  else { bgFlat(ctx, '#7a8a3a', '#3a4a1a'); applyCam(ctx, cam, 1); appleR(ctx, 540, 760, 260, true); worm(ctx, 600, 680, 200, t); stamp(ctx, 540, 1100, 'ROTTEN', cue(t, wt(14, 'rotten') - .1, .2), '#5a4a1a', -.1); }
} });
// [15] stomach cramps; lies down at the side of the road and takes a nap
SHOTS.push({ start: S(15), end: S(16), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const nap = t > wt(15, 'he', 0) - .1;
  if (!nap) { carvajal(ctx, { x: 540, y: G + 220, s: 760, lean: .2, arms: { L: { ik: [-.05, -.4] }, R: { ik: [.05, -.4] } }, face: { eyes: 'x', mouth: 'teeth' }, sweat: true }); for (let i = 0; i < 3; i++) burst(ctx, 540 + Math.sin(t * 20 + i) * 30, G + 220 - .4 * 760 + i * 20, 40, 6, '#e0392f', i); label(ctx, 'CRAMPS', 540, 260, 140, t, wt(15, 'cramps') - .2, '#e0392f'); }
  else { ctx.save(); ctx.translate(560, 1180); ctx.rotate(-Math.PI / 2); carvajal(ctx, { x: 0, y: 0, s: 560, shadow: false, face: { eyes: 'happy', mouth: 'flat' }, arms: { L: [.2, 0], R: [2.8, .2] } }); ctx.restore(); for (let i = 0; i < 3; i++) { const k = ((t * .6 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - k; text(ctx, 'z', 720 + k * 80, 900 - k * 220, 70 + k * 40, '#ffffff', INK, 8); ctx.restore(); } label(ctx, 'NAP TIME', 540, 260, 140, t, wt(15, 'nap') - .3, '#9ad8ff'); }
} });
// [16] wakes up, keeps running, still finishes fourth
SHOTS.push({ start: S(16), end: S(17), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); stadium(ctx, t, cam, { tape: true, cheer: true }); applyCam(ctx, cam, 1); carvajal(ctx, Object.assign({ x: 300 + (t - S(16)) * 60, y: G + 200, s: 680, face: { eyes: 'happy', mouth: 'grin' } }, run(t))); const k = backOut(clamp((t - wt(16, 'fourth') + .2) / .3)); if (k > 0) { ctx.save(); ctx.translate(820, 600); ctx.scale(k, k); circle(ctx, 0, 0, 130); fillStroke(ctx, '#9ad8ff', 8); text(ctx, '4TH', 0, 0, 80, '#2a4a8a', INK, 0); ctx.restore(); } label(ctx, 'STILL 4TH!', 540, 260, 130, t, wt(16, 'fourth') - .2, '#ffd23a');
} });
// [17] Len Tau and Jan Mashiani, first black Africans in the Olympics
SHOTS.push({ start: S(17), end: S(18), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 2; i++) tswana(ctx, Object.assign({ x: 320 + i * 400, y: G + 200, s: 640, face: { eyes: 'normal', mouth: 'smile' } }, run(t, i * 2)), i); label(ctx, 'LEN TAU', 300, 1060 - 640 * .95, 70, t, wt(17, 'len') - .2, '#ffffff'); label(ctx, 'JAN MASHIANI', 760, 1060 - 640 * .95, 64, t, wt(17, 'jan') - .2, '#ffffff'); label(ctx, 'FIRST BLACK AFRICAN', 540, 260, 84, t, wt(17, 'first') - .2, '#ffd23a'); label(ctx, 'OLYMPIANS', 540, 360, 84, t, wt(17, 'olympics') - .3, '#ffd23a');
} });
// [18] Len Tau chased a mile off course by wild dogs; still 9th
SHOTS.push({ start: S(18), end: S(19), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 4 }); dirtRoad(ctx, t, cam, { fence: false }); applyCam(ctx, cam, 1); const nine = t > wt(18, 'he') - .1;
  if (!nine) { const k = (t - S(18)) * 120; tswana(ctx, Object.assign({ x: 700 - (k % 200), y: G + 200, s: 560, flip: -1, face: { eyes: 'wide', mouth: 'teeth' }, sweat: true }, { legs: runLegs(t, 18), arms: { L: [2.6, .2], R: [2.6, .2] } }), 0); for (let i = 0; i < 3; i++) dog(ctx, 1000 + i * 200 - (k % 200), G + 200 + (i % 2) * 50, 1.5, t + i, -1); label(ctx, 'WILD DOGS!', 540, 260, 130, t, wt(18, 'chased') - .2, '#e0392f'); }
  else { stadium(ctx, t, cam, { cheer: true }); applyCam(ctx, cam, 1); tswana(ctx, { x: 540, y: G + 200, s: 720, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, 0); label(ctx, 'STILL 9TH', 540, 260, 140, t, wt(18, 'ninth') - .3, '#ffd23a'); }
} });
// [19] Fred Lorz gets cramps after 9 miles and gives up
SHOTS.push({ start: S(19), end: S(20), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const g = t > wt(19, 'gives') - .1; runner(ctx, Object.assign({ x: 540, y: G + 220, s: 740, face: g ? { eyes: 'half', mouth: 'frown' } : { eyes: 'x', mouth: 'teeth' }, sweat: true }, g ? { arms: { L: [.2, -.1], R: [.2, -.1] }, legs: { L: [.1, 0], R: [.1, 0] } } : tired(t)), 31, 1); label(ctx, 'FRED LORZ', 540, 260, 130, t, wt(19, 'fred') - .2, '#ffffff', wt(19, 'cramps') - .2); label(ctx, 'CRAMPS AT MILE 9', 540, 260, 100, t, wt(19, 'cramps') - .2, '#e0392f', wt(19, 'gives') - .1); label(ctx, 'GIVES UP', 540, 260, 130, t, wt(19, 'gives') - .1, '#9a9aa8');
} });
// [20] so he climbs into a car
SHOTS.push({ start: S(20), end: S(21), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); oldCar(ctx, 600, 1260, 760, '#2a2a30'); const k = clamp((t - wt(20, 'climbs')) / .6); runner(ctx, { x: lerp(240, 560, k), y: lerp(G + 200, 1050, k), s: lerp(620, 380, k), shadow: k < .5, arms: { L: [2.4, .3], R: [1.4, .3] }, face: { eyes: 'happy', mouth: 'smirk' } }, 31, 1); label(ctx, 'INTO A CAR', 540, 260, 130, t, wt(20, 'car') - .3, '#ff9ab0');
} });
// [21] waves at runners as he rides past them for about 11 miles
SHOTS.push({ start: S(21), end: S(22), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const k = (t - S(21)) * 140; for (let i = 0; i < 3; i++) runner(ctx, Object.assign({ x: 200 + i * 260 - k * .2, y: G + 200, s: 420, face: { eyes: 'wide', mouth: 'o', look: [1, -1] }, sweat: true }, tired(t, i)), 6 + i, i + 2); oldCar(ctx, 100 + k, 1100, 460, '#2a2a30'); runner(ctx, { x: 100 + k, y: 960, s: 240, shadow: false, arms: { L: [.3, -.1], R: [2.6, Math.sin(t * 10) * .4] }, face: { eyes: 'happy', mouth: 'grin' } }, 31, 1); dust(ctx, k - 120, 1080, 300, t, .7); const mi = Math.round(11 * clamp((t - wt(21, 'about') + .2) / .8)); label(ctx, 'BYE!', 540, 260, 140, t, wt(21, 'waves') - .2, '#ffffff', wt(21, 'about') - .2); label(ctx, mi + ' MILES', 540, 260, 140, t, wt(21, 'about') - .2, '#ffd23a');
} });
// [22] car breaks down; Lorz gets out and jogs the rest
SHOTS.push({ start: S(22), end: S(23), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const out = t > wt(22, 'so') - .1; oldCar(ctx, 700, 1200, 560, '#2a2a30', Math.sin(t * 30) * (out ? 0 : .01)); for (let i = 0; i < 3; i++) { const k = ((t * .5 + i / 3) % 1); puff(ctx, 900 + k * 40, 1060 - k * 300, 50 + k * 60, t, '#5a5a5a', i, (1 - k) * .8); }
  if (!out) { label(ctx, 'BREAKS DOWN', 540, 260, 120, t, wt(22, 'breaks') - .2, '#e0392f'); } else { runner(ctx, Object.assign({ x: 300 - (t - wt(22, 'so')) * 50, y: G + 200, s: 600, flip: -1, face: { eyes: 'happy', mouth: 'smirk' } }, { legs: runLegs(t, 8), arms: runArms(t, 8) }), 31, 1); label(ctx, 'JOGS THE REST', 540, 260, 110, t, wt(22, 'jogs') - .2, '#ffd23a'); }
} });
// [23] enters the stadium first; the crowd goes wild
SHOTS.push({ start: S(23), end: S(24), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); stadium(ctx, t, cam, { tape: true, cheer: t > wt(23, 'crowd') - .2 }); applyCam(ctx, cam, 1); runner(ctx, Object.assign({ x: 380 + (t - S(23)) * 80, y: G + 200, s: 640, face: { eyes: 'happy', mouth: 'grin' } }, t > wt(23, 'crowd') ? { legs: runLegs(t, 10), arms: { L: [2.6, .2], R: [2.6, .2] } } : run(t)), 31, 1); label(ctx, 'FIRST!', 540, 260, 150, t, wt(23, 'first') - .2, '#ffd23a', wt(23, 'crowd') - .1); label(ctx, 'CROWD GOES WILD', 540, 260, 104, t, wt(23, 'crowd') - .1, '#ffffff');
} });
// [24] photographed with Alice Roosevelt; about to get the gold medal
SHOTS.push({ start: S(24), end: S(25), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); stadium(ctx, t, cam, { cheer: true }); applyCam(ctx, cam, 1); photoCam(ctx, 920, G + 160, 300, Math.sin(t * 6) > .85 ? 1 : 0); runner(ctx, { x: 340, y: G + 200, s: 660, arms: { L: [.3, -.1], R: [2.2, .5] }, face: { eyes: 'happy', mouth: 'grin' } }, 31, 1); lady(ctx, { x: 620, y: G + 200, s: 620, flip: -1, arms: { L: [.3, -.1], R: { ik: [.38, -.55] } }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }); if (t > wt(24, 'gold') - .3) goldMedal2(ctx, 620 - .38 * 620, G + 200 - .55 * 620 + 60, 120);
  label(ctx, 'ALICE ROOSEVELT', 540, 260, 104, t, wt(24, 'alice') - .2, '#ff9ab0', wt(24, 'gold') - .3); label(ctx, 'GOLD MEDAL...', 540, 260, 120, t, wt(24, 'gold') - .3, '#ffd23a');
} });
// [25] then someone shouts that he rode in a car
SHOTS.push({ start: S(25), end: S(26), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .05, shake: 5 }); stadium(ctx, t, cam); applyCam(ctx, cam, 1); gent(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [.3, -.1], R: [2.3, -.2] }, face: { eyes: 'angry' === '' ? 'wide' : 'wide', mouth: 'teeth' } }, 0); speech2(ctx, 540, 420, 600, 170, 'HE RODE IN A CAR!', 52, -1);
} });
function speech2(ctx, x, y, w, h, str, size, tail = -1) { rrect(ctx, x - w / 2, y - h / 2, w, h, 28); fillStroke(ctx, '#ffffff', 6); path(ctx, [[x + tail * w * .1, y + h / 2 - 3], [x + tail * w * .28, y + h / 2 + 50], [x + tail * w * .26 - tail * 50, y + h / 2 - 3]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); text(ctx, str, x, y, size, '#2a1a1a', INK, 0); }
// [26] Lorz says it was a joke; banned for life
SHOTS.push({ start: S(26), end: S(27), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); stadium(ctx, t, cam); applyCam(ctx, cam, 1); const ban = t > wt(26, 'hes') - .1; runner(ctx, { x: 540, y: G + 220, s: 760, arms: ban ? { L: [2.6, -1.6], R: [2.6, -1.6] } : { L: [1.6, -1.9], R: [1.6, -1.9] }, face: ban ? { eyes: 'wide', mouth: 'o' } : { eyes: 'happy', mouth: 'grin' }, sweat: true }, 31, 1); if (!ban) label(ctx, '"JUST A JOKE"', 540, 260, 110, t, wt(26, 'joke') - .3, '#ffffff'); stamp(ctx, 540, 520, 'BANNED', cue(t, wt(26, 'banned') - .1, .2), '#e0392f', -.12);
} });
// [27] ban lifted; next year wins Boston. Without a car.
SHOTS.push({ start: S(27), end: S(28), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const nocar = t > wt(27, 'without') - .1;
  if (!nocar) { dirtRoad(ctx, t, cam, { top: '#8ab8e0', bot: '#e8f0f2', haze: false }); applyCam(ctx, cam, 1); runner(ctx, Object.assign({ x: 540, y: G + 200, s: 700, face: { eyes: 'happy', mouth: 'grin' } }, run(t)), 31, 1); chapterTag(ctx, t, wt(27, 'next') - .2, 'BOSTON, 1905'); label(ctx, 'BOSTON WINNER', 540, 260, 110, t, wt(27, 'wins') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#f2f2ee', '#c8c8d0'); applyCam(ctx, cam, 1); oldCar(ctx, 540, 1000, 560, '#2a2a30'); circle(ctx, 540, 860, 330); ctx.lineWidth = 34; ctx.strokeStyle = '#e0392f'; ctx.stroke(); line(ctx, 310, 630, 770, 1090, 34, '#e0392f'); label(ctx, 'NO CAR', 540, 260, 140, t, wt(27, 'car') - .3, '#e0392f'); }
} });
// [28] so who actually won?
SHOTS.push({ start: S(28), end: S(29), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .05 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); goldMedal2(ctx, 540, 820, 300); qmark(ctx, 840, 560, 200, '#ffffff'); label(ctx, 'WHO WON?', 540, 260, 140, t, wt(28, 'who') - .2, '#ffffff');
} });
// [29] Thomas Hicks, Englishman running for America; miles ahead but falling apart
SHOTS.push({ start: S(29), end: S(30), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const fall = t > wt(29, 'but') - .1; runner(ctx, Object.assign({ x: 540, y: G + 220, s: 740, face: fall ? { eyes: 'x', mouth: 'o' } : { eyes: 'squint', mouth: 'teeth' }, sweat: true }, fall ? tired(t) : run(t)), 20, 0); label(ctx, 'THOMAS HICKS', 540, 260, 120, t, wt(29, 'thomas') - .2, '#ffffff', wt(29, 'he') - .1); label(ctx, 'MILES AHEAD', 540, 260, 130, t, wt(29, 'miles') - .2, '#7ee08a', wt(29, 'falling') - .2); label(ctx, 'FALLING APART', 540, 260, 120, t, wt(29, 'falling') - .2, '#e0392f');
} });
// [30] begged for water; trainers said no; gave strychnine, rat poison
SHOTS.push({ start: S(30), end: S(31), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); const p = ph(t, wt(30, 'strychnine') - .2); runner(ctx, { x: 360, y: G + 220, s: 700, arms: { L: [.3, -.1], R: [1.5, .4] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] }, sweat: true }, 20, 0); trainer(ctx, { x: 800, y: G + 220, s: 680, flip: -1, arms: p ? { L: [.3, -.1], R: { ik: [.42, -.55] } } : { L: [.3, -.1], R: [1.4, .8] }, face: p ? { eyes: 'squint', mouth: 'smirk', look: [-1, 0] } : { eyes: 'normal', mouth: 'flat', look: [-1, 0] } }, 0);
  if (p) vial(ctx, 800 - .42 * 680, G + 220 - .55 * 680 + 40, 220); else speech2(ctx, 400, 520, 360, 140, 'water...?', 50, -1);
  label(ctx, 'NO WATER', 540, 260, 130, t, wt(30, 'said') - .2, '#9ad8ff', wt(30, 'strychnine') - .2); label(ctx, 'STRYCHNINE', 540, 260, 130, t, wt(30, 'strychnine') - .2, '#7ee08a', wt(30, 'rat') - .2); label(ctx, 'RAT POISON', 540, 260, 130, t, wt(30, 'rat') - .2, '#e0392f');
} });
// [31] mixed with raw egg whites
SHOTS.push({ start: S(31), end: S(32), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); bgFlat(ctx, '#f2e6c8', '#d8c090'); applyCam(ctx, cam, 1); vial(ctx, 380, 1000, 520); egg(ctx, 740, 860, 300); text(ctx, '+', 560, 800, 160, '#3a3a3a', INK, 0); label(ctx, 'RAW EGG WHITES', 540, 260, 110, t, wt(31, 'raw') - .2, '#ffffff');
} });
// [32] people thought a tiny dose could make you run harder
SHOTS.push({ start: S(32), end: S(33), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#e8d8b8', '#c8b088'); applyCam(ctx, cam, 1); gent(ctx, { x: 300, y: G + 200, s: 700, arms: { L: [.3, -.1], R: [2.3, -.2] }, face: { eyes: 'happy', mouth: 'smile' } }, 1); thought(ctx, 720, 560, 280, 400, 620); ctx.save(); ctx.translate(720, 600); runner(ctx, Object.assign({ x: 0, y: 140, s: 280, shadow: false, face: { eyes: 'happy', mouth: 'grin' } }, run(t * 1.5)), 1, 2); ctx.restore(); label(ctx, '"MAKES YOU FASTER"', 540, 260, 96, t, wt(32, 'thought') - .2, '#ffd23a');
} });
// [33] a few miles later a second dose; this time with brandy
SHOTS.push({ start: S(33), end: S(34), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); dirtRoad(ctx, t, cam); applyCam(ctx, cam, 1); runner(ctx, { x: 360, y: G + 220, s: 700, arms: { L: [.3, -.1], R: { ik: [.3, -.62] } }, face: { eyes: 'spiral', mouth: 'grin' }, t }, 20, 0); bottle(ctx, 360 + .3 * 700 + 40, G + 220 - .62 * 700 + 40, 260, 'BRANDY', '#8a4a1a', -.6); trainer(ctx, { x: 820, y: G + 220, s: 660, flip: -1, arms: { L: [.3, -.1], R: [1.5, .4] }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }, 1); vial(ctx, 940, 900, 160);
  label(ctx, 'DOSE #2', 540, 260, 140, t, wt(33, 'second') - .2, '#7ee08a', wt(33, 'brandy') - .3); label(ctx, '+ BRANDY', 540, 260, 140, t, wt(33, 'brandy') - .3, '#c86a2a');
} });
// [34] hallucinating; thought the finish line was still 20 miles away
SHOTS.push({ start: S(34), end: S(35), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, r: Math.sin(t * 2) * .03 }); bgFlat(ctx, '#c86ab8', '#5a2a8a'); applyCam(ctx, cam, 1); for (let i = 0; i < 8; i++) { const a = t * .8 + i / 8 * TAU; circle(ctx, 540 + Math.cos(a) * 380, 760 + Math.sin(a) * 300, 40 + 20 * Math.sin(t * 3 + i)); ctx.fillStyle = ['#ffd23a', '#7ee08a', '#9ad8ff', '#ff9ab0'][i % 4]; ctx.fill(); } runner(ctx, Object.assign({ x: 540, y: G + 220, s: 760, face: { eyes: 'spiral', mouth: 'grin' }, t, headTilt: Math.sin(t * 3) * .2 }, tired(t)), 20, 0);
  label(ctx, 'HALLUCINATING', 540, 260, 110, t, wt(34, 'hallucinating') - .3, '#ffd23a', wt(34, 'finish') - .3); label(ctx, '"20 MILES TO GO?"', 540, 260, 100, t, wt(34, 'finish') - .3, '#ffffff');
} });
// [35] trainers held him up and practically carried him across the line
SHOTS.push({ start: S(35), end: S(36), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); stadium(ctx, t, cam, { tape: true, cheer: true }); applyCam(ctx, cam, 1); const k = (t - S(35)) * 50; trainer(ctx, { x: 340 + k, y: G + 200, s: 620, arms: { L: [.3, -.1], R: { ik: [.4, -.55] } }, face: { eyes: 'squint', mouth: 'teeth' }, legs: runLegs(t, 6) }, 0); trainer(ctx, { x: 740 + k, y: G + 200, s: 620, flip: -1, arms: { L: [.3, -.1], R: { ik: [.4, -.55] } }, face: { eyes: 'squint', mouth: 'teeth' }, legs: runLegs(t, 6, 1) }, 1); runner(ctx, { x: 540 + k, y: G + 160, s: 640, lean: Math.sin(t * 2) * .1, arms: { L: [1.4, -.2], R: [1.4, -.2] }, legs: { L: [.3, 0], R: [-.2, 0] }, face: { eyes: 'spiral', mouth: 'o' }, t, headTilt: .3 }, 20, 0); label(ctx, 'CARRIED', 540, 260, 140, t, wt(35, 'carried') - .2, '#ffd23a');
} });
// [36] 3:28 — still the slowest winning time in Olympic marathon history
SHOTS.push({ start: S(36), end: S(37), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#2a3a5a', '#141e30'); applyCam(ctx, cam, 1); stopwatch(ctx, 540, 760, 260, '3:28:53', t); const k = clamp((t - wt(36, 'slowest') + .2) / .5); if (k > 0) { ctx.save(); ctx.translate(540, 1180); ctx.scale(k, k); rrect(ctx, -300, -60, 600, 120, 20); fillStroke(ctx, '#e0392f', 7); text(ctx, 'SLOWEST EVER', 0, 0, 60, '#ffffff', INK, 0); ctx.restore(); } label(ctx, '3:28', 540, 260, 150, t, wt(36, '3h28m') - .3, '#ffffff');
} });
// [37] four doctors to get him out of the stadium; lost 8 pounds in one race
SHOTS.push({ start: S(37), end: S(38), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = ph(t, wt(37, 'hed') - .1);
  if (p === 0) { stadium(ctx, t, cam); applyCam(ctx, cam, 1); ctx.save(); ctx.translate(540, 1200); ctx.rotate(-Math.PI / 2); runner(ctx, { x: 0, y: 0, s: 520, shadow: false, face: { eyes: 'spiral', mouth: 'o' }, t }, 20, 0); ctx.restore(); for (let i = 0; i < 4; i++) gent(ctx, { x: 160 + i * 250, y: G + 200, s: 520, flip: i > 1 ? -1 : 1, cols: ['#f6f6f2', '#f6f6f2'], arms: { L: [.3, -.1], R: [1.2, .6] }, face: { eyes: 'wide', mouth: 'o', look: [i > 1 ? -1 : 1, 1] } }, i); label(ctx, '4 DOCTORS', 540, 260, 130, t, wt(37, '4') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#e8eef4', '#c8d4e0'); applyCam(ctx, cam, 1); scaleW(ctx, 540, 1180, 600, '-8 LBS'); runner(ctx, { x: 540, y: 1100, s: 560, squash: 1, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'frown' } }, 20, 0); label(ctx, '−8 POUNDS', 540, 260, 130, t, wt(37, 'lost') - .2, '#e0392f'); }
} });
// [38] of 32 runners, only 14 finished
SHOTS.push({ start: S(38), end: S(39), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#f2d8a8', '#d8a868'); applyCam(ctx, cam, 1); const k = clamp((t - wt(38, 'only') + .2) / .6); for (let i = 0; i < 32; i++) { const out = i >= 14; ctx.save(); ctx.globalAlpha = out ? 1 - .75 * k : 1; runner(ctx, { x: 90 + (i % 8) * 128, y: 620 + Math.floor(i / 8) * 190, s: 190, shadow: false, face: out && k > .5 ? { eyes: 'x', mouth: 'o' } : { eyes: 'happy', mouth: 'smile' } }, i + 1, i); ctx.restore(); } label(ctx, '14 / 32', 540, 300, 150, t, wt(38, '14') - .3, '#ffffff');
} });
// [39] some officials wanted to scrap the marathon for good
SHOTS.push({ start: S(39), end: S(40), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#d8c8b0', '#a8906a'); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) gent(ctx, { x: 220 + i * 320, y: G + 200, s: 600, arms: i === 1 ? { L: [.3, -.1], R: [2.4, .3] } : POSE.hips.arms, face: { eyes: 'angry' === '' ? 'squint' : 'squint', mouth: 'frown' } }, i); rrect(ctx, 340, 420, 400, 260, 8); fillStroke(ctx, '#f6f2e6', 7); text(ctx, 'MARATHON', 540, 500, 54, '#3a3a3a', INK, 0); const k = clamp((t - wt(39, 'scrap')) / .3); if (k > 0) { line(ctx, 360, 440, 360 + 360 * k, 440 + 220 * k, 18, '#e0392f'); line(ctx, 720, 440, 720 - 360 * k, 440 + 220 * k, 18, '#e0392f'); } label(ctx, 'SCRAP IT?', 540, 260, 140, t, wt(39, 'scrap') - .2, '#e0392f');
} });
// [40] instead, at the next Olympics, runners got something new. Water.
SHOTS.push({ start: S(40), end: S(41), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); dirtRoad(ctx, t, cam, { top: '#8ab8e0', bot: '#e8f0f2', haze: false }); applyCam(ctx, cam, 1); const w = t > wt(40, 'water') - .2; waterTable(ctx, 700, 1150, 520); trainer(ctx, { x: 920, y: G + 200, s: 520, flip: -1, arms: { L: [.3, -.1], R: [1.5, .4] }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }, 0); runner(ctx, Object.assign({ x: 300, y: G + 220, s: 640, face: w ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'squint', mouth: 'teeth' } }, w ? { arms: { L: [.3, -.1], R: [2.4, .3] }, legs: { L: [.1, 0], R: [.1, 0] } } : run(t)), 5, 1); if (w) for (let i = 0; i < 4; i++) sparkle(ctx, 500 + i * 120, 960 + Math.sin(t * 6 + i) * 20, 30);
  chapterTag(ctx, t, wt(40, 'next') - .2, 'LONDON, 1908'); label(ctx, 'WATER!', 540, 260, 160, t, wt(40, 'water') - .2, '#5ab0e8');
} });
