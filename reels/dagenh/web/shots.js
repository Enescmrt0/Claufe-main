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
const LANE_L = 410, LANE_R = 670;
// [0] 1967: an entire country switched sides of the road, overnight
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const k = ease(clamp((t - wt(0, 'switched')) / 1.2));
  topRoad(ctx, t, cam, { scroll: t * 200 }); for (let i = 0; i < 4; i++) { const x = lerp(LANE_L, LANE_R, k); carTop(ctx, x, 1700 - ((t * 260 + i * 480) % 1900), 260, (k > 0 && k < 1 ? .4 : 0), ['#c8322c', '#3a7ac8', '#f2b52a', '#3aa35b'][i]); }
  chapterTag(ctx, t, .05, 'SWEDEN, 1967'); label(ctx, 'SWITCHED SIDES', 540, 260, 110, t, wt(0, 'switched') - .2, '#ffffff', wt(0, 'overnight') - .2); label(ctx, 'OVERNIGHT', 540, 260, 140, t, wt(0, 'overnight') - .2, '#ffd23a');
} });
// [1] Sweden drove on the left; neighbors on the right; most cars had the wheel on the left
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(1, 'but') - .1 ? 0 : t < wt(1, 'and') - .1 ? 1 : 2;
  if (p === 0) { swedenRoad(ctx, t, cam); applyCam(ctx, cam, 1); volvo(ctx, 540 + Math.sin(t) * 20, 1170, 520, '#3a7ac8', -1, { driver: true }); flagSE(ctx, 860, 420, 150, t); label(ctx, 'DROVE ON THE LEFT', 540, 260, 96, t, wt(1, 'left') - .3, '#ffffff'); }
  else if (p === 1) { nordicMap(ctx, t, cam, clamp((t - wt(1, 'right') + .3) / .4)); label(ctx, 'NEIGHBORS: RIGHT', 540, 1650, 90, t, wt(1, 'neighbors') - .2, '#3aa35b'); }
  else { wheelInterior(ctx, t, cam); applyCam(ctx, cam, 1); swede(ctx, { x: 300, y: 1450, s: 700, arms: { L: { ik: [-.2, -.42] }, R: { ik: [.2, -.42] } }, face: { eyes: 'normal', mouth: 'smile', look: [1, -1] } }, 1); label(ctx, 'WHEEL ON THE LEFT', 540, 300, 96, t, wt(1, 'steering') - .2, '#ffd23a'); }
} });
// [2] 83% voted no; the government did it anyway
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const anyway = t > wt(2, 'the') - .1;
  if (!anyway) { bgFlat(ctx, '#e8eef4', '#c8d4e0'); applyCam(ctx, cam, 1); for (let i = 0; i < 6; i++) swede(ctx, { x: 110 + i * 172, y: 1420, s: 420, arms: i === 2 ? { L: [.3, -.1], R: [2.5, .2] } : { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'squint', mouth: 'frown' } }, i); voteBar(ctx, 540, 600, 880, 160, clamp((t - wt(2, '83') + .2) / .8)); label(ctx, 'A VOTE', 540, 260, 130, t, wt(2, 'vote') - .2, '#2a4aa8'); }
  else { bgFlat(ctx, '#d8c8b0', '#a8906a'); applyCam(ctx, cam, 1); flagSE(ctx, 800, 380, 170, t); minister(ctx, { x: 540, y: G + 200, s: 760, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); stamp(ctx, 540, 520, 'DOING IT', cue(t, wt(2, 'anyway') - .2, .2), '#2a5ab8', -.1); label(ctx, 'ANYWAY', 540, 260, 140, t, wt(2, 'anyway') - .2, '#ffd23a'); }
} });
// [3] Dagen H: H for höger, right
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#2a5ab8', '#14306a'); applyCam(ctx, cam, 1); for (let i = 0; i < 12; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.translate(540, 760); ctx.rotate(i / 12 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#f2c22a'; ctx.fill(); ctx.restore(); }
  const k = backOut(clamp((t - wt(3, 'dagen') + .2) / .4)); ctx.save(); ctx.translate(540, 760); ctx.scale(k, k); hLogo(ctx, 0, 0, 260); ctx.restore();
  label(ctx, 'DAGEN H', 540, 260, 150, t, wt(3, 'dagen') - .2, '#f2c22a', wt(3, 'for') - .2); label(ctx, 'HÖGER = RIGHT', 540, 260, 120, t, wt(3, 'for') - .2, '#ffffff');
} });
// [4] crews swap 360,000 road signs, keeping the new ones covered
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); swedenRoad(ctx, t, cam); applyCam(ctx, cam, 1); const cov = clamp((t - wt(4, 'covered') + .5) / .5);
  for (let i = 0; i < 3; i++) signPole(ctx, 200 + i * 340, 1080, 300 - i * 30, i === 1 ? cov : clamp((t - S(4) - i * .3) / .4), t);
  swede(ctx, { x: 360, y: G + 220, s: 520, cols: ['#f27a1a', '#f27a1a'], arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'grin', look: [1, -1] } }, 2); hardhat(ctx, { x: 360, y: G + 220, s: 520 }, '#f2c22a');
  const n = Math.round(360000 * clamp((t - wt(4, '360000') + .2) / 1.2)); label(ctx, n.toLocaleString('en-US') + ' SIGNS', 540, 260, 96, t, wt(4, 'swap') - .1, '#ffffff', wt(4, 'covered') - .3); label(ctx, 'KEPT COVERED', 540, 260, 120, t, wt(4, 'covered') - .3, '#9a9aa8');
} });
// [5] there was even a pop song: Keep to the right, Svensson
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#ff9ab0', '#c84a7a'); applyCam(ctx, cam, 1); record(ctx, 540, 720, 300, t); for (let i = 0; i < 5; i++) { const k = ((t * .6 + i / 5) % 1); ctx.save(); ctx.globalAlpha = 1 - k; text(ctx, '♪', 180 + i * 180 + Math.sin(t * 3 + i) * 30, 1100 - k * 600, 90, '#ffffff', INK, 8); ctx.restore(); }
  swede(ctx, { x: 240, y: G + 220, s: 460, bob: Math.abs(Math.sin(t * 8)) * -.03, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, 0); swede(ctx, { x: 840, y: G + 220, s: 460, flip: -1, bob: Math.abs(Math.sin(t * 8 + 1)) * -.03, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, 3);
  label(ctx, 'A POP SONG', 540, 260, 130, t, wt(5, 'pop') - .2, '#ffffff', wt(5, 'keep') - .2); label(ctx, '"KEEP RIGHT, SVENSSON"', 540, 260, 84, t, wt(5, 'keep') - .2, '#ffd23a');
} });
// [6] Sunday 3 September: traffic banned; at 4:50 every car stopped
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const stop = t > wt(6, 'at') - .1;
  if (!stop) { swedenRoad(ctx, t, cam, { top: '#2a3a6a', bot: '#c88a6a', sunX: 300, sunY: 900 }); applyCam(ctx, cam, 1); polis(ctx, { x: 540, y: G + 200, s: 620, arms: { L: [.3, -.1], R: [2.3, -.4] }, face: { eyes: 'squint', mouth: 'flat' } }); rrect(ctx, 220, 1060, 640, 60, 10); fillStroke(ctx, '#f6f6f2', 6); for (let i = 0; i < 6; i++) ctx.fillStyle = '#e0392f', ctx.fillRect(240 + i * 110, 1066, 55, 48); chapterTag(ctx, t, S(6) + .05, 'SUNDAY, 3 SEPT 1967'); label(ctx, 'TRAFFIC BANNED', 540, 260, 110, t, wt(6, 'banned') - .3, '#ff7a5a'); }
  else { swedenRoad(ctx, t, cam, { top: '#3a4a7a', bot: '#e8a878', sunX: 200, sunY: 820 }); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) volvo(ctx, 180 + i * 360, 1140, 340, ['#c8322c', '#3a7ac8', '#f2b52a'][i], -1); bigClock(ctx, 540, 520, 200, 4, 50); label(ctx, 'EVERY CAR STOPPED', 540, 900, 84, t, wt(6, 'stopped') - .3, '#ffffff'); }
} });
// [7] drivers carefully moved to the other side of the road, and waited
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); topRoad(ctx, t, cam); const k = ease(clamp((t - wt(7, 'moved') + .2) / 1.6));
  for (let i = 0; i < 4; i++) { carTop(ctx, lerp(LANE_L, LANE_R, k), 300 + i * 400, 260, Math.sin(k * Math.PI) * .5, ['#c8322c', '#3a7ac8', '#f2b52a', '#3aa35b'][i]); carTop(ctx, lerp(LANE_R, LANE_L, k), 500 + i * 400, 260, Math.PI + Math.sin(k * Math.PI) * .5, ['#7a4ac8', '#e07a2a', '#5a5a62', '#d8d8d8'][i]); }
  label(ctx, 'SWITCH SIDES', 540, 260, 120, t, wt(7, 'moved') - .2, '#ffffff', wt(7, 'waited') - .2); label(ctx, 'AND WAIT...', 540, 260, 130, t, wt(7, 'waited') - .2, '#ffd23a');
} });
// [8] at exactly 5:00, Sweden drove off on the right
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const go = t > wt(8, 'sweden') - .2;
  swedenRoad(ctx, t, cam, { top: '#e8a060', bot: '#f8e0b0', sunX: 220, sunY: 760 }); applyCam(ctx, cam, 1);
  if (!go) { bigClock(ctx, 540, 560, 220, 5, 0); for (let i = 0; i < 3; i++) volvo(ctx, 200 + i * 340, 1250, 320, ['#c8322c', '#3a7ac8', '#f2b52a'][i], 1); label(ctx, '5:00', 540, 260, 150, t, wt(8, 'exactly') - .2, '#ffffff'); }
  else { const k = (t - wt(8, 'sweden')) * 500; for (let i = 0; i < 3; i++) volvo(ctx, 200 + i * 340 + k, 1250, 320, ['#c8322c', '#3a7ac8', '#f2b52a'][i], 1); for (let i = 0; i < 3; i++) volvo(ctx, 900 - i * 340 - k * .8, 1140, 280, ['#7a4ac8', '#e07a2a', '#3aa35b'][i], -1); for (let i = 0; i < 4; i++) swede(ctx, { x: 100 + i * 290, y: 1060, s: 280, shadow: false, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, i); label(ctx, 'ON THE RIGHT!', 540, 260, 130, t, wt(8, 'right') - .2, '#3aa35b'); }
} });
// [9] the Monday after: fewer crashes; everyone drove extra carefully
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const care = t > wt(9, 'everyone') - .1;
  if (!care) { bgFlat(ctx, '#e8eef4', '#c8d4e0'); applyCam(ctx, cam, 1); crashChart(ctx, 540, 760, 820, 620, clamp((t - wt(9, 'fewer') + .2) / .6)); label(ctx, 'FEWER CRASHES', 540, 260, 110, t, wt(9, 'fewer') - .2, '#3aa35b'); }
  else { swedenRoad(ctx, t, cam); applyCam(ctx, cam, 1); volvo(ctx, 540 + (t - wt(9, 'everyone')) * 60, 1250, 560, '#3a7ac8', 1, { driver: true }); swede(ctx, { x: 860, y: G + 220, s: 440, flip: -1, arms: { L: [.3, -.1], R: [2.3, .5] }, face: { eyes: 'wide', mouth: 'o' }, sweat: true }, 2); label(ctx, 'EXTRA CAREFUL', 540, 260, 120, t, wt(9, 'extra') - .2, '#ffd23a'); }
} });
