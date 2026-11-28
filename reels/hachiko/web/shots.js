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
const walk = (t, a = .35) => ({ L: [.1 + Math.sin(t * 6) * a, -.15], R: [.1 - Math.sin(t * 6) * a, -.15] });
const crowdAt = (ctx, t, n, y, s, move = 0) => { for (let i = 0; i < n; i++) { const x = ((i * 1300 / n + t * move * (i % 2 ? 1 : -1)) % 1300 + 1300) % 1300 - 110; drawStick(ctx, townsJP(ctx, n, { x, y: y + (i % 2) * 30, s, flip: (i % 2 ? 1 : -1) * (move ? 1 : 1), legs: move ? walk(t + i) : undefined, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'normal', mouth: 'flat' } }, i)); } };
// [0] a dog waited almost 10 years
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); shibuya(ctx, t, cam, { mood: 'eve' }); applyCam(ctx, cam, 1); akita(ctx, 540, G + 160, 520, { sit: true, t, look: .4, collar: true });
  label(ctx, 'HE WAITED', 540, 260, 150, t, wt(0, 'waited') - .2, '#ffffff', wt(0, 'almost') - .1); label(ctx, 'ALMOST 10 YEARS', 540, 260, 110, t, wt(0, 'almost') - .1, '#ffd23a');
} });
// [1] 1924: professor took home an Akita puppy, named him Hachiko
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); bgFlat(ctx, '#e8d8b8', '#c8b088'); applyCam(ctx, cam, 1); ueno(ctx, { x: 340, y: G + 220, s: 720, arms: { L: [.3, -.1], R: [1.4, .3] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); puppyBox(ctx, 720, G + 160, 300); akita(ctx, 720, G + 60, 220, { sit: true, t, wag: true, eyes: 'happy', mouth: 'open' });
  chapterTag(ctx, t, S(1) + .05, 'TOKYO, 1924'); label(ctx, 'A PROFESSOR', 540, 260, 130, t, wt(1, 'professor') - .2, '#ffffff', wt(1, 'akita') - .1); label(ctx, 'AN AKITA PUPPY', 540, 260, 116, t, wt(1, 'akita') - .1, '#ffd23a', wt(1, 'hachiko') - .2); label(ctx, 'HACHIKO', 540, 260, 160, t, wt(1, 'hachiko') - .2, '#ffb43a');
} });
// [2] every morning: walked him to Shibuya station
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); shibuya(ctx, t, cam, { mood: 'day', clock: 7 / 12 }); applyCam(ctx, cam, 1); const k = clamp((t - S(2)) / 3.4);
  ueno(ctx, { x: lerp(160, 560, k), y: G + 220, s: 620, legs: walk(t), arms: { L: [.3, -.1], R: [.6, -.2] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); akita(ctx, lerp(340, 740, k), G + 200, 380, { t, walk: true, wag: true, collar: true, look: .5 });
  label(ctx, 'EVERY MORNING', 540, 260, 126, t, wt(2, 'every') - .2, '#ffffff', wt(2, 'shibuya') - .1); label(ctx, 'SHIBUYA STATION', 540, 260, 110, t, wt(2, 'shibuya') - .1, '#ffd23a');
} });
// [3] every evening, waiting for the train
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); shibuya(ctx, t, cam, { mood: 'eve', clock: 6 / 12 }); applyCam(ctx, cam, 1); const tr = clamp((t - wt(3, 'train') + .4) / 1.0); trainJP(ctx, lerp(1600, 560, tr), 930, 900, t);
  const meet = t > wt(3, 'home') - .2; if (meet) ueno(ctx, { x: 360, y: G + 220, s: 620, arms: { L: [.3, -.1], R: [1.2, .6] }, face: { eyes: 'happy', mouth: 'grin', look: [1, 0] } }); akita(ctx, 620, G + 200, 400, { sit: !meet, t, wag: meet, eyes: meet ? 'happy' : 'normal', mouth: meet ? 'open' : '', collar: true, look: meet ? .2 : .5, flip: meet ? -1 : 1 });
  label(ctx, 'EVERY EVENING', 540, 260, 126, t, wt(3, 'every') - .2, '#ffffff', wt(3, 'waiting') - .1); label(ctx, 'WAITING', 540, 260, 160, t, wt(3, 'waiting') - .1, '#ffd23a');
} });
// [4] May 1925: professor died suddenly at work
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03 + lt * .02, dz: 0 }); bgFlat(ctx, '#5a5a6a', '#2a2a34'); applyCam(ctx, cam, 1); const k = cue(t, wt(4, 'died') - .1, 1.0);
  ctx.save(); ctx.globalAlpha = 1 - k * .85; ueno(ctx, { x: 540, y: G + 220, s: 760, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'normal', mouth: 'flat' } }); ctx.restore(); if (k > .4) { ctx.save(); ctx.globalAlpha = (k - .4) / .6; bowler(ctx, { x: 540, y: G + 300, s: 760 }, '#2a2a32'); ctx.restore(); }
  chapterTag(ctx, t, S(4) + .05, 'MAY 1925'); label(ctx, 'MAY 1925', 540, 260, 150, t, wt(4, 'may') - .2, '#ffffff', wt(4, 'died') - .1); label(ctx, 'HE DIED', 540, 260, 160, t, wt(4, 'died') - .1, '#9a9aa8');
} });
// [5] never came home; Hachiko waited anyway
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .03, dz: 0 }); shibuya(ctx, t, cam, { mood: 'night', clock: 8 / 12 }); applyCam(ctx, cam, 1); trainJP(ctx, lerp(560, -700, clamp((t - S(5)) / 2)), 930, 900, t); akita(ctx, 560, G + 200, 440, { sit: true, t, collar: true, look: .5, eyes: 'sad' });
  label(ctx, 'HE NEVER CAME', 540, 260, 124, t, wt(5, 'never') - .2, '#ffffff', wt(5, 'hachiko') - .1); label(ctx, 'HACHIKO WAITED', 540, 260, 116, t, wt(5, 'hachiko') - .1, '#ffd23a');
} });
// [6] next day, same time, and the day after
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const moods = ['eve', 'rain', 'night', 'eve']; const i = Math.min(3, Math.floor((t - S(6)) / ((S(7) - S(6)) / 4))); shibuya(ctx, t, cam, { mood: moods[i], clock: 6 / 12 }); applyCam(ctx, cam, 1); akita(ctx, 560, G + 200, 440, { sit: true, t, collar: true, look: .5 });
  calendarFlip(ctx, 880, 1340, 180, ['DAY 2', 'DAY 3', 'DAY 4', 'DAY 5'][i], ((t - S(6)) / ((S(7) - S(6)) / 4)) % 1);
  label(ctx, 'NEXT DAY', 540, 260, 150, t, wt(6, 'next') - .2, '#ffffff', wt(6, 'same') - .1); label(ctx, 'SAME TIME', 540, 260, 150, t, wt(6, 'same') - .1, '#ffd23a', wt(6, 'day', 1) - .2); label(ctx, 'AND AGAIN', 540, 260, 150, t, wt(6, 'day', 1) - .2, '#ffffff');
} });
// [7] some shooed him away; others brought food
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); shibuya(ctx, t, cam, { mood: 'day' }); applyCam(ctx, cam, 1); const fed = t > wt(7, 'others') - .15;
  if (!fed) { const w = { x: 760, y: G + 220, s: 600, flip: -1, cols: ['#2a3a5a', '#2a3a5a'], hat: 'none', belt: true, arms: { L: [.3, -.1], R: [2.2 + Math.sin(t * 10) * .3, .6] }, face: { eyes: 'squint', mouth: 'teeth', look: [-1, 0] } }; drawStick(ctx, w); officerCap(ctx, w, '#2a3a5a'); akita(ctx, lerp(360, 260, clamp((t - wt(7, 'shooed')) / .6)), G + 200, 400, { t, flip: -1, eyes: 'sad', collar: true }); label(ctx, 'SHOO!', 540, 260, 170, t, wt(7, 'shooed') - .2, '#e0392f'); }
  else { const f = townsJP(ctx, 0, { x: 700, y: G + 220, s: 600, flip: -1, arms: { L: [.3, -.1], R: [1.4, .6] }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }, 1); drawStick(ctx, f); hairBun(ctx, f); ctx.beginPath(); ctx.ellipse(520, G + 180, 70, 22, 0, 0, TAU); fillStroke(ctx, '#e8e0d0', 6); circle(ctx, 520, G + 160, 26); ctx.fillStyle = '#f6f6f0'; ctx.fill(); akita(ctx, 360, G + 200, 400, { t, eyes: 'happy', wag: true, collar: true }); label(ctx, 'FOOD', 540, 260, 170, t, wt(7, 'food') - .3, '#4ad06a'); }
} });
// [8] 1932 newspaper; Japan fell in love
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(8, 'all') - .1 ? 0 : 1;
  if (ph === 0) { bgFlat(ctx, '#d8c8a8', '#a8946a'); applyCam(ctx, cam, 1); newspaperJP(ctx, 540, 860, 820, 760, backOut(cue(t, wt(8, 'newspaper') - .3, .5))); chapterTag(ctx, t, S(8) + .05, '1932'); label(ctx, '1932', 540, 260, 150, t, wt(8, '1932') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#f8c8d8', '#e88aa8'); applyCam(ctx, cam, 1); for (let i = 0; i < 12; i++) { const a = t * 1.2 + i * TAU / 12; drawHeart(ctx, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 380, 50); } akita(ctx, 540, G + 40, 520, { sit: true, t, eyes: 'happy', collar: true }); label(ctx, 'ALL OF JAPAN', 540, 260, 130, t, wt(8, 'all') - .2, '#ffffff', wt(8, 'loyal') - .1); label(ctx, 'THE LOYAL DOG', 540, 260, 124, t, wt(8, 'loyal') - .1, '#ffd23a'); }
} });
// [9] 1934 bronze statue; Hachiko there to see it
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); shibuya(ctx, t, cam, { mood: 'spring' }); applyCam(ctx, cam, 1); statueBase(ctx, 400, G + 60, 340, 260); akita(ctx, 400, G - 200, 380, { sit: true, bronze: true, look: .4 }); akita(ctx, 800, G + 200, 340, { sit: true, t, eyes: t > wt(9, 'hachiko') ? 'happy' : 'normal', look: .3, flip: -1, collar: true });

  chapterTag(ctx, t, S(9) + .05, '1934'); label(ctx, 'A BRONZE STATUE', 540, 260, 112, t, wt(9, 'bronze') - .2, '#ffb43a', wt(9, 'hachiko') - .1); label(ctx, 'HE WAS THERE', 540, 260, 130, t, wt(9, 'hachiko') - .1, '#ffffff');
} });
// [10] kept waiting until 1935: 9 years 10 months
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .03, dz: 0 }); const ph = t < wt(10, '9') - .2 ? 0 : 1;
  if (ph === 0) { shibuya(ctx, t, cam, { mood: 'snow' }); applyCam(ctx, cam, 1); akita(ctx, 560, G + 200, 440, { sit: true, t, collar: true, eyes: 'closed', look: 0 }); const k = cue(t, wt(10, 'died') - .1, 1.2); tint(ctx, '#0a1020', k * .5); chapterTag(ctx, t, S(10) + .05, '1935'); label(ctx, 'STILL WAITING', 540, 260, 130, t, wt(10, 'kept') - .2, '#ffffff', wt(10, 'died') - .1); label(ctx, '1935', 540, 260, 160, t, wt(10, 'died') - .1, '#9a9aa8'); }
  else { bgFlat(ctx, '#2a2a3a', '#14141e'); applyCam(ctx, cam, 1); bigNum(ctx, '9 YEARS', 540, 760, 150, cue(t, wt(10, '9') - .2, .3), '#ffd23a'); bigNum(ctx, '10 MONTHS', 540, 960, 130, cue(t, wt(10, '10') - .2, .3), '#ffffff'); akita(ctx, 540, G + 200, 300, { sit: true, t, collar: true, look: .5 }); }
} });
// [11] today: one of Tokyo's most famous meeting spots
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); modernTokyo(ctx, t, cam); applyCam(ctx, cam, 1); statueBase(ctx, 540, G + 60, 360, 280); akita(ctx, 540, G - 220, 400, { sit: true, bronze: true, look: .4 });
  for (let i = 0; i < 6; i++) { const x = i < 3 ? 120 + i * 110 : 760 + (i - 3) * 110, o = townsJP(ctx, 0, { x, y: G + 260, s: 380, flip: i < 3 ? 1 : -1, arms: { L: [.3, -.1], R: i % 2 ? [2.4, .3] : { ik: [.3, -.45] } }, face: { eyes: 'happy', mouth: 'smile' } }, i); drawStick(ctx, o); if (i % 2 === 0) drawPhone(ctx, x + (i < 3 ? 60 : -60), G + 260 - 380 * .7, .6); }
  chapterTag(ctx, t, S(11) + .05, 'TODAY'); label(ctx, 'TODAY', 540, 260, 160, t, wt(11, 'today') - .2, '#ffffff', wt(11, 'famous') - .2); label(ctx, 'MEET AT HACHIKO', 540, 260, 110, t, wt(11, 'famous') - .2, '#ffd23a');
} });
