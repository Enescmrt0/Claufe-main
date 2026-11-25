// ---------- "Doomsday: Friday, 13 November 2026" (portrait Short) ----------
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
const crowd = (ctx, t, n, y, s, o = {}) => { for (let i = 0; i < n; i++) { const r = rng(i * 7 + 3); drawStick(ctx, { cols: [PAL.blue, PAL.red, PAL.green, PAL.purple, PAL.yellow, PAL.navy][i % 6], hat: 'none', belt: false, x: -40 + r() * 1160, y: y + r() * 260, s: s * (.7 + r() * .5), arms: o.up ? { L: [2.4, .3], R: [2.4, .3] } : POSE.idle.arms, face: o.face || { eyes: 'wide', mouth: 'o' } }); } };
// [0] the exact day humanity would end: Friday 13 Nov 2026, twelve days ago
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .04, shake: 4 }); bgFlat(ctx, '#3a1018', '#12060a'); applyCam(ctx, cam, 1);
  const k = backOut(cue(t, .05, .35)); calPage(ctx, 540, 900, 520 * k, 'FRIDAY', '13', 'NOV 2026', '#e0392f', -.05 + Math.sin(t * 3) * .02);
  if (t > wt(0, '12') - .3) stamp(ctx, 540, 1110, '12 DAYS AGO', cue(t, wt(0, '12') - .2, .2), '#ffd23a', -.1);
  label(ctx, 'THE END OF', 540, 250, 110, t, .1, '#ffffff'); label(ctx, 'HUMANITY', 540, 380, 120, t, wt(0, 'humanity') - .2, '#ff6a5a');
} });
// [1] 1960: von Foerster and two colleagues studied 2,000 years of population
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#7a5a3a' }); applyCam(ctx, cam, 1);
  foerster(ctx, { x: 300, y: G + 160, s: 600, arms: { L: [.3, -.1], R: { ik: [.4, -.55] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } });
  for (let i = 0; i < 2; i++) { const so = { cols: ['#ffffff', '#ffffff'], hat: 'none', belt: false, x: 760 + i * 200, y: G + 180, s: 400, flip: -1, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'smile' } }; drawStick(ctx, so); specs(ctx, so); }
  journal(ctx, 560, 640, 380, .06);
  chapterTag(ctx, t, S(1) + .05, '1960'); label(ctx, 'HEINZ VON FOERSTER', 540, 260, 84, t, wt(1, 'heinz') - .2, '#ffffff', wt(1, '2') - .3); label(ctx, '2,000 YEARS OF DATA', 540, 260, 84, t, wt(1, '2') - .3, '#ffd23a');
} });
// [2] not just growing: growing faster and faster
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  popChart(ctx, 170, 1150, 740, 600, clamp((t - S(2) - .1) / (S(3) - S(2) - .3)) * .86, 'hyper');
  label(ctx, 'NOT JUST GROWING', 540, 260, 90, t, wt(2, 'growing') - .2, '#ffffff', wt(2, 'faster') - .2); label(ctx, 'FASTER & FASTER', 540, 260, 100, t, wt(2, 'faster') - .2, '#ff6a5a');
} });
// [3] more people, more parents, more ideas, more food, even more people
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .04 }); bgDay(ctx, t, cam); applyCam(ctx, cam, 1);
  const n = Math.floor(4 + clamp((t - S(3)) / (S(4) - S(3))) ** 2 * 40); crowd(ctx, t, n, GY + 120, 300, { face: { eyes: 'happy', mouth: 'smile' } });
  const ws = [['parents', 'PARENTS'], ['ideas', 'IDEAS'], ['food', 'FOOD'], ['people', 'MORE PEOPLE']]; let cur = 0; ws.forEach(([w], i) => { if (t > wt(3, w, w === 'people' ? 1 : 0) - .15) cur = i; });
  label(ctx, '+ ' + ws[cur][1], 540, 270, 110, t, wt(3, ws[cur][0], ws[cur][0] === 'people' ? 1 : 0) - .15, ['#ffffff', '#ffd23a', '#7ee08a', '#ff6a5a'][cur]);
  if (cur === 1) drawBulb(ctx, 540, 520, 120, 1);
} });
// [4] a formula fitted to the numbers: the curve shot straight up
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const k = .86 + .14 * ease(clamp((t - wt(4, 'curve') + .2) / 1.0)); popChart(ctx, 170, 1150, 740, 600, k, 'hyper');
  if (t < wt(4, 'curve') - .2) { text(ctx, 'N = C / (T − t)ᵏ', 540, 720, 70, '#ffd23a', INK, 12); text(ctx, 'N = C / (T − t)ᵏ', 540, 720, 70, '#ffd23a', INK, 0); }
  label(ctx, 'A FORMULA', 540, 260, 110, t, wt(4, 'formula') - .2, '#ffffff', wt(4, 'straight') - .3); label(ctx, 'STRAIGHT UP', 540, 260, 120, t, wt(4, 'straight') - .3, '#ff6a5a');
} });
// [5] on 13 Nov 2026 the number of people would become infinite
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, shake: 5 }); bgFlat(ctx, '#3a1018', '#12060a'); applyCam(ctx, cam, 1);
  popChart(ctx, 170, 1150, 740, 520, 1, 'hyper', { inf: t > wt(5, 'infinite') - .3, bg: '#2a1420' });
  calPage(ctx, 200, 420, 180, 'FRIDAY', '13', 'NOV 2026', '#e0392f', -.12);
  label(ctx, 'POPULATION =', 640, 260, 84, t, wt(5, 'number') - .3, '#ffffff'); label(ctx, 'INFINITY', 640, 380, 120, t, wt(5, 'infinite') - .2, '#ffd23a');
} });
// [6] not by asteroid: by standing room only
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); bgFlat(ctx, '#0d1030', '#1a1a4a'); applyCam(ctx, cam, .1); drawStars(ctx, t, 60, 5, .8); applyCam(ctx, cam, 1);
  const sr = t > wt(6, 'standing') - .3;
  if (!sr) { crowdedGlobe(ctx, 540, 980, 300, t, .2); asteroid(ctx, 840, 520, 90, t); line(ctx, 740, 420, 940, 620, 18, '#e0392f'); line(ctx, 940, 420, 740, 620, 18, '#e0392f'); label(ctx, 'NOT AN ASTEROID', 540, 260, 90, t, wt(6, 'asteroid') - .3, '#ffffff'); }
  else { crowdedGlobe(ctx, 540, 980, 300, t, 1); label(ctx, 'STANDING ROOM', 540, 260, 104, t, wt(6, 'standing') - .3, '#ffd23a'); label(ctx, 'ONLY', 540, 380, 110, t, wt(6, 'only') - .2, '#ff6a5a'); }
} });
// [7] the date fell on von Foerster's 115th birthday
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#ff9ad0', '#c85a9a'); applyCam(ctx, cam, 1);
  foerster(ctx, { x: 330, y: G + 160, s: 620, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); cake(ctx, 790, G - 40, 340, t);
  for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 560 + Math.sin(t * 3 + i) * 20, 26, t + i);
  label(ctx, 'HIS 115TH', 540, 270, 120, t, wt(7, '115') - .3, '#ffffff'); label(ctx, 'BIRTHDAY', 540, 400, 110, t, wt(7, 'birthday') - .2, '#ffd23a');
} });
// [8] meant as a warning; then something changed
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); const ch = t > wt(8, 'changed') - .3; bgFlat(ctx, ch ? '#2a6a4a' : '#5a4a2a', ch ? '#123a28' : '#2a2010'); applyCam(ctx, cam, 1);
  warnTri(ctx, 540, 820, 260 * backOut(cue(t, wt(8, 'warning') - .3, .3)));
  label(ctx, 'A WARNING', 540, 270, 120, t, wt(8, 'warning') - .3, '#ffd23a', wt(8, 'changed') - .3); label(ctx, 'THEN...', 540, 270, 130, t, wt(8, 'changed') - .3, '#ffffff');
} });
// [9] in the 1960s the growth rate peaked and started to fall
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  rateChart(ctx, 170, 1150, 740, 560, clamp((t - S(9) - .1) / (S(10) - S(9) - .3)));
  label(ctx, 'GROWTH RATE', 540, 260, 100, t, wt(9, 'growth') - .2, '#ffffff', wt(9, 'peaked') - .2); label(ctx, 'PEAKED', 540, 260, 120, t, wt(9, 'peaked') - .2, '#ffd23a', wt(9, 'fall') - .3); label(ctx, '...AND FELL', 540, 260, 120, t, wt(9, 'fall') - .3, '#7ee08a');
} });
// [10] families got smaller; more children survived; more people moved to cities
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); const city = t > wt(10, 'cities') - .3;
  if (!city) { bgDay(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(10, 'smaller') + .2) / 1.0); family(ctx, 540, GY + 200, 380, Math.round(6 - 4 * k)); label(ctx, 'SMALLER FAMILIES', 540, 270, 90, t, wt(10, 'smaller') - .3, '#ffffff'); }
  else { bgCity(ctx, t, cam); applyCam(ctx, cam, 1); family(ctx, 540, GY + 200, 380, 2); label(ctx, 'CITY LIFE', 540, 270, 110, t, wt(10, 'cities') - .3, '#ffd23a'); }
} });
// [11] today about 8 billion, not infinity
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a6a8a', '#12384a'); applyCam(ctx, cam, 1);
  crowdedGlobe(ctx, 540, 1000, 260, t, .5); const k = ease(clamp((t - wt(11, '8') + .5) / .8));
  label(ctx, (8 * k).toFixed(1) + ' BILLION', 540, 270, 110, t, wt(11, '8') - .5, '#ffd23a'); if (t > wt(11, 'infinity') - .2) { label(ctx, 'NOT ∞', 540, 400, 110, t, wt(11, 'infinity') - .2, '#ffffff'); }
} });
// [12] the UN expects a peak later this century
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  popChart(ctx, 170, 1150, 740, 560, clamp((t - S(12)) / (S(13) - S(12) - .3)), 'real', { col: '#7ee08a', years: ['1900', '1960', '2024', '2100'] });
  label(ctx, 'PEAK: LATER', 540, 260, 104, t, wt(12, 'peak') - .3, '#7ee08a'); label(ctx, 'THIS CENTURY', 540, 380, 90, t, wt(12, 'century') - .3, '#ffffff');
} });
// [13] doomsday came and went, and you're still here, scrolling
SHOTS.push({ start: S(13), end: S(14), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  const sc = t > wt(13, 'still') - .3;
  if (!sc) { calPage(ctx, 540, 820, 440, 'FRIDAY', '13', 'NOV 2026', '#e0392f', -.06); line(ctx, 330, 600, 750, 1060, 22, '#3aa35b'); label(ctx, 'CAME AND WENT', 540, 270, 100, t, wt(13, 'came') - .3, '#ffffff'); }
  else { drawStick(ctx, { cols: PAL.blue, hat: 'none', belt: false, x: 420, y: G + 160, s: 660, arms: { L: [.3, -.1], R: { ik: [.3, -.55] } }, face: { eyes: 'half', mouth: 'smirk', look: [1, 1] } }); phone(ctx, 420 + .3 * 660 + 30, G + 160 - .55 * 660, 220, t); label(ctx, "YOU'RE STILL HERE", 540, 270, 96, t, wt(13, 'still') - .3, '#ffffff'); }
} });
