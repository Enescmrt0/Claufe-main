// ---------- "The birds that guard a kingdom" (portrait Short) ----------
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
const hopAt = (t, k = 0) => Math.max(0, Math.sin(t * 5 + k * 1.7)) ** 6;
const SHOTS = [];
// [0] a castle pays a full-time keeper to look after a few birds
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); londonBG(ctx, t, cam);
  warder(ctx, { x: 300, y: G + 160, s: 560, arms: { L: [.3, -.1], R: { ik: [.36, -.5] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); meatPlate(ctx, 300 + .36 * 560 + 30, G + 160 - .5 * 560, 150);
  for (let i = 0; i < 3; i++) raven(ctx, 640 + i * 150, G + 140 + (i % 2) * 40, 200, { t, hop: hopAt(t, i), caw: i === 1 && t > wt(0, 'birds') - .1, flip: i === 2 ? -1 : 1 });
  chapterTag(ctx, t, .05, 'TOWER OF LONDON'); label(ctx, 'FULL-TIME JOB', 540, 290, 100, t, wt(0, 'full') - .1, '#ffffff'); label(ctx, '...FOR BIRDS', 540, 410, 100, t, wt(0, 'birds') - .15, '#ffd23a');
} });
// [1] his official title is the Ravenmaster
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .04 }); bgFlat(ctx, '#b8322c', '#6a1418'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .15; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .2); path(ctx, [[0, 0], [-80, -1400], [80, -1400]]); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore(); }
  const so = warder(ctx, { x: 540, y: G + 200, s: 820, arms: { L: [.3, -.1], R: { ik: [.3, -.58] } }, face: { eyes: 'squint', mouth: 'smug' } }); raven(ctx, 540 + .3 * 820 + 40, G + 200 - .58 * 820 + 30, 200, { t, caw: t > wt(1, 'ravenmaster') });
  label(ctx, 'OFFICIAL TITLE:', 540, 260, 70, t, S(1) + .05, '#ffffff'); label(ctx, 'RAVENMASTER', 540, 380, 116, t, wt(1, 'ravenmaster') - .1, '#ffd23a');
} });
// [2] always at least six ravens
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); londonBG(ctx, t, cam);
  const n = Math.min(6, Math.floor(clamp((t - wt(2, 'six') + .9) / 1.2) * 6.99));
  for (let i = 0; i < n; i++) raven(ctx, 110 + i * 172, 1080 - 20, 170, { t, hop: hopAt(t, i), flip: i % 2 ? -1 : 1 });
  label(ctx, 'AT LEAST', 540, 290, 90, t, wt(2, 'least') - .1, '#ffffff'); label(ctx, String(Math.max(n, 0)), 540, 450, 200, t, wt(2, 'six') - .6, '#ffd23a');
} });
// [3] if the ravens leave, the Tower falls, and the kingdom with it
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const fl = clamp((t - wt(3, 'tower') + .2) / 1.2), kf = clamp((t - wt(3, 'kingdom') + .2) / 1.0);
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: fl > 0 ? 10 : 3 }); londonBG(ctx, t, cam, { top: '#3a3048', bot: '#8a7a8a', fall: ease(fl), grass: '#4a6a4a' });
  const lv = clamp((t - wt(3, 'leave') + .2) / 1.5);
  for (let i = 0; i < 5; i++) raven(ctx, 200 + i * 160 + lv * 700, 1000 - lv * 900 - i * 40, 150, { t: t + i, fly: lv > 0 });
  if (fl > .2) for (let i = 0; i < 6; i++) puff(ctx, 300 + i * 100, 1100 - fl * 60, 60 + fl * 40, t, '#c8c0b0', i, .8);
  if (kf > 0) crown(ctx, 540, 520 + 500 * easeIn(kf), 220, kf * 2.5);
  chapterTag(ctx, t, S(3) + .05, 'THE LEGEND'); label(ctx, 'RAVENS LEAVE', 540, 290, 100, t, wt(3, 'ravens') - .1, '#ffffff', wt(3, 'tower') - .2); label(ctx, 'TOWER FALLS', 540, 290, 110, t, wt(3, 'tower') - .2, '#ff6a5a', wt(3, 'kingdom') - .2); label(ctx, 'KINGDOM FALLS', 540, 290, 104, t, wt(3, 'kingdom') - .2, '#ff6a5a');
} });
// [4] King Charles II was told to get rid of them, and refused
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam, { wall: '#5a2a3a', floor: '#3a2a22' }); applyCam(ctx, cam, 1);
  throne(ctx, 640, G + 100, 520); const no = t > wt(4, 'refused') - .2;
  kingCharles(ctx, { x: 640, y: G + 120, s: 600, arms: no ? { L: [.3, -.1], R: [1.6, .1] } : { L: [.3, -.1], R: [.3, -.1] }, face: no ? { eyes: 'squint', mouth: 'frown' } : { eyes: 'normal', mouth: 'flat', look: [-1, 0] } });
  const so = { cols: ['#3a3a44', '#3a3a44'], hat: 'none', belt: false, x: 220, y: G + 160, s: 480, lean: .1, arms: { L: [.3, -.1], R: [1.3, -.6] }, face: { eyes: 'normal', mouth: 'o', look: [1, 0] } }; drawStick(ctx, so); greyHair(ctx, so);
  if (!no && t > wt(4, 'get') - .2) { raven(ctx, 880, 700, 160, { t }); line(ctx, 780, 600, 980, 820, 18, '#e0392f'); line(ctx, 980, 600, 780, 820, 18, '#e0392f'); }
  chapterTag(ctx, t, S(4) + .05, 'KING CHARLES II'); label(ctx, '"GET RID OF THEM"', 540, 290, 84, t, wt(4, 'get') - .2, '#ffffff', wt(4, 'refused') - .2); stamp(ctx, 540, 330, 'NO.', cue(t, wt(4, 'refused') - .1, .2), '#e0392f', -.12);
} });
// [5] fresh meat, own quarters, a trim of flight feathers
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); londonBG(ctx, t, cam);
  const st = t < wt(5, 'own') - .15 ? 0 : t < wt(5, 'trim') - .15 ? 1 : 2;
  if (st === 0) { meatPlate(ctx, 540, G + 120, 300); for (let i = 0; i < 3; i++) raven(ctx, 300 + i * 220, G + 90, 200, { t, hop: hopAt(t * 1.6, i), flip: i === 2 ? -1 : 1 }); }
  if (st === 1) { ravenHouse(ctx, 540, G + 60, 420); raven(ctx, 860, G + 120, 220, { t, flip: -1, hop: hopAt(t, 2) }); }
  if (st === 2) { raven(ctx, 480, G + 160, 360, { t }); scissors(ctx, 420, G - 40, 200, .25 + .25 * Math.sin(t * 12)); for (let i = 0; i < 3; i++) { const k = (t * .7 + i / 3) % 1; ctx.save(); ctx.translate(560 + i * 80, G - 60 + k * 260); ctx.rotate(k * 4); ellipse(ctx, 0, 0, 30, 9); ctx.fillStyle = '#2e2c3e'; ctx.fill(); ctx.restore(); } }
  label(ctx, ['FRESH MEAT', 'THEIR OWN HOUSE', 'A FEATHER TRIM'][st], 540, 300, 100, t, [S(5), wt(5, 'own'), wt(5, 'trim')][st] - .15, ['#ff9a9a', '#ffffff', '#ffd23a'][st]);
} });
// [6] a few escaped anyway; the kingdom still stands
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); londonBG(ctx, t, cam); const k = clamp((t - wt(6, 'escaped') + .3) / 1.6);
  raven(ctx, 300 + k * 900, 1000 - k * 700, 190, { t, fly: k > 0, flip: 1 });
  warder(ctx, { x: 240, y: G + 160, s: 460, arms: { L: [2.3, .4], R: [2.6, .3] }, face: { eyes: 'wide', mouth: 'o', look: [1, -1] } });
  label(ctx, 'ESCAPED!', 540, 290, 120, t, wt(6, 'escaped') - .1, '#ff6a5a', wt(6, 'kingdom') - .15); label(ctx, 'STILL STANDING', 540, 290, 100, t, wt(6, 'kingdom') - .15, '#7ee08a'); if (t > wt(6, 'standing')) crown(ctx, 820, 560, 160, Math.sin(t * 3) * .1);
} });
// [7] but here's the twist
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .06, r: -.03 }); bgFlat(ctx, '#7a4bc4', '#3a1c66'); applyCam(ctx, cam, 1);
  raven(ctx, 540, 1200, 560, { t, caw: true }); qmark(ctx, 820, 600, 180, '#ffd23a');
  label(ctx, 'THE TWIST', 540, 320, 140, t, wt(7, 'twist') - .2, '#ffd23a');
} });
// [8] the Tower's historian: probably not ancient, maybe Victorian
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#7a5a3a' }); applyCam(ctx, cam, 1);
  const vic = t > wt(8, 'victorian') - .3;
  const so = { cols: ['#5a4a3a', '#5a4a3a'], hat: 'none', belt: false, x: 300, y: G + 160, s: 560, arms: { L: [.3, -.1], R: { ik: [.3, -.52] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }; drawStick(ctx, so); specs(ctx, so); greyHair(ctx, so);
  drawBook(ctx, 300 + .3 * 560 + 40, G + 160 - .52 * 560, 1.3, '#2a4a9a');
  if (!vic) { scroll(ctx, 780, 760, 300, 380, []); text(ctx, 'ANCIENT', 780, 720, 48, '#3a3530', INK, 0); text(ctx, 'LEGEND', 780, 790, 48, '#3a3530', INK, 0); if (t > wt(8, 'probably') - .1) { line(ctx, 650, 620, 910, 900, 16, '#e0392f'); } }
  else { const v = { cols: ['#2a2a34', '#2a2a34'], hat: 'none', belt: false, x: 800, y: G + 120, s: 460, flip: -1, arms: { L: [.3, -.1], R: [1.5, .2] }, face: { eyes: 'happy', mouth: 'grin' } }; drawStick(ctx, v); topHat(ctx, v); moustache(ctx, v); }
  chapterTag(ctx, t, S(8) + .05, 'TOWER HISTORIAN'); label(ctx, 'NOT ANCIENT?', 540, 300, 110, t, wt(8, 'ancient') - .2, '#ffffff', wt(8, 'victorian') - .3); label(ctx, 'VICTORIAN?', 540, 300, 120, t, wt(8, 'victorian') - .3, '#ffd23a');
} });
// [9] does the whole kingdom depend on six birds?
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  const tip = Math.sin(t * 1.5) * .08;
  scales(ctx, 540, 1200, 520, tip, c => crown(c, 0, -20, 170), c => { for (let i = 0; i < 6; i++) raven(c, -100 + (i % 3) * 100, -10 - Math.floor(i / 3) * 70, 90, { t: t + i }); });
  label(ctx, 'A WHOLE KINGDOM', 540, 290, 90, t, wt(9, 'whole') - .2, '#ffffff', wt(9, 'six') - .2); label(ctx, 'VS 6 BIRDS?', 540, 290, 110, t, wt(9, 'six') - .2, '#ffd23a');
} });
// [10] the Ravenmaster has the best answer
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .04 }); londonBG(ctx, t, cam); applyCam(ctx, cam, 1);
  warder(ctx, { x: 540, y: G + 200, s: 780, arms: { L: [.3, -.1], R: [2.7, .1] }, face: { eyes: 'happy', mouth: 'smirk' } }); raven(ctx, 820, G - 280, 180, { t, flip: -1 });
  label(ctx, 'THE BEST ANSWER', 540, 290, 100, t, wt(10, 'best') - .2, '#ffd23a');
} });
// [11] nobody knows, because nobody has dared to drop below six
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); londonBG(ctx, t, cam);
  for (let i = 0; i < 6; i++) raven(ctx, 110 + i * 172, 1060, 170, { t, hop: hopAt(t, i), flip: i % 2 ? -1 : 1 });
  warder(ctx, { x: 540, y: G + 220, s: 520, arms: { L: [1.4, -1.8], R: [1.4, -1.8] }, face: { eyes: 'squint', mouth: 'flat' } });
  const d = t > wt(11, 'dared') - .2;
  label(ctx, 'NOBODY KNOWS', 540, 290, 110, t, S(11), '#ffffff', wt(11, 'dared') - .2); label(ctx, 'NOBODY DARES', 540, 290, 110, t, wt(11, 'dared') - .2, '#ffd23a');
  if (d) label(ctx, 'NEVER BELOW 6', 540, 420, 80, t, wt(11, 'below') - .2, '#ff6a5a');
} });
