// ---------- "Britain rented pineapples" (portrait Short) ----------
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
// [0] in the 1700s, people in Britain rented pineapples for their parties
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); georgianRoom(ctx, t, cam);
  diningTable(ctx, 540, 1120, 820); pineapple(ctx, 540, 1070, 360 * backOut(cue(t, .05, .35)), { face: true });
  burst(ctx, 820, 600, 80, 10, '#ffd23a', 4); text(ctx, '£', 820, 600, 70, '#2a5a3a', INK, 0);
  label(ctx, 'RENTED', 540, 230, 140, t, wt(0, 'rented') - .2, '#ffd23a'); label(ctx, 'PINEAPPLES', 540, 360, 110, t, wt(0, 'pineapples') - .2, '#ffffff');
} });
// [1] pineapples didn't grow in Britain; ships from the tropics: rotted on the way
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const rot = t > wt(1, 'rotted') - .3;
  bgDay(ctx, t, cam, { top: '#6ab0e8', bot: '#e8f4f8' }); applyCam(ctx, cam, 1); ctx.fillStyle = '#2a7ab8'; ctx.fillRect(-500, GY + 100, 2100, 1200); line(ctx, -500, GY + 100, 1600, GY + 100, 6);
  ship(ctx, 200 + clamp((t - S(1)) / 2.5) * 500, GY + 120, 520, t); pineapple(ctx, 760, 1180, 280, { age: rot ? clamp((t - wt(1, 'rotted') + .3) / .8) : 0, t });
  label(ctx, 'NO PINEAPPLES', 540, 250, 110, t, wt(1, 'didn') - .2, '#ffffff', wt(1, 'ship') - .2); label(ctx, 'SHIPPED IN...', 540, 250, 110, t, wt(1, 'ship') - .2, '#ffffff', wt(1, 'rotted') - .3); label(ctx, '...ROTTED', 540, 250, 130, t, wt(1, 'rotted') - .3, '#a8a040');
} });
// [2] the rich built heated glasshouses; years for a single fruit
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgDay(ctx, t, cam); applyCam(ctx, cam, 1);
  glasshouse(ctx, 540, GY + 320, 780, 380, t); const k = clamp((t - wt(2, 'years') + .4) / 1.4); pineapple(ctx, 540, GY + 300, 120 + 160 * k);
  if (t > wt(2, 'years') - .4) { const yr = 1 + Math.floor(k * 2.99); label(ctx, 'YEAR ' + yr, 540, 380, 96, t, wt(2, 'years') - .4, '#ffd23a'); }
  label(ctx, 'HEATED GLASSHOUSES', 540, 250, 84, t, wt(2, 'heated') - .2, '#ffffff');
} });
// [3] one pineapple could cost as much as a new carriage
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a5a3a', '#123020'); applyCam(ctx, cam, 1);
  pineapple(ctx, 270, 1080, 360); text(ctx, '=', 540, 900, 140, '#ffffff', INK, 0); if (t > wt(3, 'carriage') - .3) carriage(ctx, 810, 1080, 460 * backOut(cue(t, wt(3, 'carriage') - .3, .35)));
  label(ctx, '1 PINEAPPLE', 540, 250, 110, t, wt(3, 'pineapple') - .2, '#ffd23a', wt(3, 'carriage') - .3); label(ctx, '= A CARRIAGE', 540, 250, 120, t, wt(3, 'carriage') - .3, '#ffffff');
} });
// [4] owning one meant wealth; those who couldn't afford one rented one
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const rent = t > wt(4, 'rented') - .3;
  if (!rent) { georgianRoom(ctx, t, cam); gent(ctx, { x: 380, y: G + 160, s: 600, arms: { L: [.3, -.1], R: { ik: [.4, -.55] } }, face: { eyes: 'squint', mouth: 'smug' } }); pineapple(ctx, 380 + .4 * 600 + 40, G + 160 - .55 * 600 + 60, 200); for (let i = 0; i < 4; i++) star5(ctx, 760 + (i % 2) * 140, 560 + Math.floor(i / 2) * 140, 30, t + i); label(ctx, 'WEALTH', 540, 250, 130, t, wt(4, 'wealthy') - .2, '#ffd23a'); }
  else { bgDay(ctx, t, cam); applyCam(ctx, cam, 1); rrect(ctx, 200, 520, 680, 720, 10); fillStroke(ctx, '#e8dcc4', 7); rentSign(ctx, 540, 620, 560, 170); for (let i = 0; i < 3; i++) pineapple(ctx, 360 + i * 180, 1060, 200); gent(ctx, { x: 860, y: G + 200, s: 460, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'smile' } }); label(ctx, 'RENT ONE!', 540, 250, 130, t, wt(4, 'rented') - .3, '#7ee08a'); }
} });
// [5] put it in the middle of the table, or carry it around the party
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); georgianRoom(ctx, t, cam); const carry = t > wt(5, 'carry') - .3;
  if (!carry) { diningTable(ctx, 540, 1120, 820); pineapple(ctx, 540, 1070, 300); for (let i = 0; i < 2; i++) lady(ctx, { x: 160 + i * 760, y: G + 200, s: 420, flip: i ? -1 : 1, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'wide', mouth: 'o', look: [i ? -1 : 1, 0] } }); label(ctx, 'CENTREPIECE', 540, 250, 120, t, wt(5, 'middle') - .3, '#ffd23a'); }
  else { const x = 200 + clamp((t - wt(5, 'carry') + .3) / 2) * 400; gent(ctx, { x, y: G + 160, s: 560, arms: { L: [.3, -.1], R: { ik: [.35, -.62] } }, face: { eyes: 'happy', mouth: 'smug' } }); pineapple(ctx, x + .35 * 560 + 30, G + 160 - .62 * 560 + 40, 180); for (let i = 0; i < 2; i++) lady(ctx, { x: 760 + i * 180, y: G + 200, s: 400, flip: -1, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }); label(ctx, 'SHOW IT OFF', 540, 250, 120, t, wt(5, 'carry') - .3, '#ffd23a'); }
} });
// [6] nobody ate it; back to the shop, on to the next party
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const back = t > wt(6, 'next') - .3;
  if (!back) { georgianRoom(ctx, t, cam); diningTable(ctx, 540, 1120, 820); pineapple(ctx, 540, 1070, 300); line(ctx, 400, 760, 680, 1040, 20, '#e0392f'); line(ctx, 680, 760, 400, 1040, 20, '#e0392f'); label(ctx, 'NOBODY ATE IT', 540, 250, 110, t, wt(6, 'nobody') - .2, '#ff6a5a'); }
  else { bgDay(ctx, t, cam); applyCam(ctx, cam, 1); const k = (t * .6) % 1; carriage(ctx, -200 + k * 1500, GY + 300, 420); pineapple(ctx, -200 + k * 1500, GY + 300 - 230, 120); label(ctx, 'NEXT PARTY →', 540, 250, 110, t, wt(6, 'next') - .3, '#ffd23a'); }
} });
// [7] it only got eaten when it was too old to show off
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); georgianRoom(ctx, t, cam, { wall: '#9ab0a8' }); diningTable(ctx, 540, 1120, 820);
  const k = clamp((t - S(7)) / 1.4); pineapple(ctx, 540, 1070, 300, { age: k, t });
  label(ctx, 'TOO OLD?', 540, 250, 120, t, wt(7, 'old') - .3, '#a8a040'); label(ctx, 'NOW EAT IT', 540, 380, 100, t, wt(7, 'eaten') - .2, '#ffffff');
} });
// [8] a Scottish lord built a house with a giant stone pineapple; still standing
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); bgDay(ctx, t, cam, { top: '#ff9a5a', bot: '#ffd8a0' }); applyCam(ctx, cam, 1);
  dunmore(ctx, 540, G - 20, 520 * backOut(cue(t, wt(8, 'house') - .3, .4)));
  chapterTag(ctx, t, S(8) + .05, 'SCOTLAND, 1761'); label(ctx, 'STONE PINEAPPLE', 540, 250, 100, t, wt(8, 'stone') - .3, '#ffd23a'); label(ctx, 'STILL STANDING', 540, 370, 84, t, wt(8, 'standing') - .3, '#ffffff');
} });
