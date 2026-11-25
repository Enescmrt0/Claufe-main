// ---------- "The beard tax" (portrait Short) ----------
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
const boyar = (ctx, o, len = 1, cut = 0, col = '#7a4a2a', hat = '#7a2a3a') => { const so = C({ cols: ['#8a2a3a', '#c8a040'], hat: 'none', belt: false }, o); drawStick(ctx, so); beardOn(ctx, so, len, col, cut); boyarHat(ctx, so, hat); return so; };
// [0] men once had to pay a tax just to keep their beards (token flips on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#c8322c', '#6a1014'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .15; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore(); }
  boyar(ctx, { x: 330, y: G + 160, s: 640, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } }, face: { eyes: 'squint', mouth: 'frown', look: [1, 0] } }, 1.3);
  beardToken(ctx, 820, 720, 150, Math.sin(t) * .1, t * 3);
  label(ctx, 'BEARD TAX', 540, 250, 140, t, wt(0, 'tax') - .2, '#ffd23a');
} });
// [1] 1698: Peter the Great back from Western Europe
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgDay(ctx, t, cam); applyCam(ctx, cam, 1);
  for (let i = 0; i < 3; i++) windmill(ctx, 640 + i * 180, GY + 260, 320, t + i);
  peter(ctx, { x: 300, y: G + 180, s: 680, arms: { L: [.3, -.1], R: [2.2, .3] }, face: { eyes: 'happy', mouth: 'smug' } });
  chapterTag(ctx, t, S(1) + .05, 'RUSSIA, 1698'); label(ctx, 'PETER THE GREAT', 540, 260, 100, t, wt(1, 'peter') - .2, '#ffd23a', wt(1, 'western') - .2); label(ctx, 'BACK FROM EUROPE', 540, 260, 90, t, wt(1, 'western') - .2, '#ffffff');
} });
// [2] he wanted Russia to look modern; beards looked old fashioned
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); kremlinBG(ctx, t, cam);
  peter(ctx, { x: 260, y: G + 180, s: 600, arms: { L: [.9, -2.2], R: [1.6, .2] }, face: { eyes: 'squint', mouth: 'frown', look: [1, 0] } });
  boyar(ctx, { x: 760, y: G + 180, s: 600, flip: -1, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'flat', look: [-1, 0] } }, 1.4);
  label(ctx, 'MODERN!', 540, 260, 120, t, wt(2, 'modern') - .2, '#7ee08a', wt(2, 'beards') - .2); label(ctx, 'BEARDS = OLD', 540, 260, 120, t, wt(2, 'beards') - .2, '#ff6a5a');
} });
// [3] at a welcome party he shaved his nobles himself
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03, shake: 6 }); bgRoom(ctx, t, cam, { wall: '#8a3a2a', floor: '#5a3a22' }); applyCam(ctx, cam, 1);
  const cut = clamp((t - wt(3, 'shaved') + .2) / 1.0); const sw = Math.sin(t * 14);
  peter(ctx, { x: 330, y: G + 180, s: 640, arms: { L: [.3, -.1], R: { ik: [.52, -.68 + sw * .05] } }, face: { eyes: 'happy', mouth: 'grin', look: [1, 0] } }); razor(ctx, 330 + .52 * 640 + 40, G + 180 - .68 * 640 + sw * 30, 180, -.3);
  boyar(ctx, { x: 800, y: G + 180, s: 600, flip: -1, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }, 1.3, cut);
  if (cut > 0) for (let i = 0; i < 6; i++) { const k = ((t * 1.4 + i / 6) % 1); ctx.save(); ctx.translate(760 + (i % 3) * 40, 760 + k * 460); ctx.rotate(k * 6); ellipse(ctx, 0, 0, 22, 9); ctx.fillStyle = '#7a4a2a'; ctx.fill(); ctx.restore(); }
  label(ctx, 'HE SHAVED THEM', 540, 260, 100, t, wt(3, 'razor') - .3, '#ffffff'); label(ctx, 'HIMSELF', 540, 380, 110, t, wt(3, 'himself') - .3, '#ffd23a');
} });
// [4] then he made it law: shave, or pay
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#3a2a1a', '#1a1008'); applyCam(ctx, cam, 1);
  lawScroll(ctx, 540, 820, 700 * backOut(cue(t, wt(4, 'law') - .3, .35)), 560, ['LAW', 'SHAVE', 'OR PAY']);
  label(ctx, 'NEW LAW', 540, 260, 130, t, wt(4, 'law') - .3, '#ffd23a');
} });
// [5] rich merchants paid up to 100 rubles a year
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); kremlinBG(ctx, t, cam);
  const so = boyar(ctx, { x: 330, y: G + 180, s: 620, arms: { L: [.3, -.1], R: { ik: [.4, -.55] } }, face: { eyes: 'squint', mouth: 'frown' } }, 1.5, 0, '#5a3a22', '#2a4a7a'); moneyBag(ctx, 330 + .4 * 620 + 40, G + 180 - .55 * 620, 160);
  const k = ease(clamp((t - wt(5, '100') + .4) / 1.0)); for (let i = 0; i < Math.floor(k * 10); i++) ruble(ctx, 760 + (i % 3) * 90, 1150 - Math.floor(i / 3) * 70, 44, i);
  label(ctx, Math.round(100 * k) + ' RUBLES', 540, 260, 110, t, wt(5, '100') - .4, '#ffd23a'); label(ctx, 'EVERY YEAR', 540, 380, 90, t, wt(5, 'year') - .2, '#ffffff');
} });
// [6] pay and you got a beard token to carry
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .04 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  beardToken(ctx, 540, 820, 300 * backOut(cue(t, wt(6, 'token') - .3, .35)), Math.sin(t) * .08, Math.sin(t * 1.5) * .5);
  label(ctx, 'A BEARD TOKEN', 540, 260, 110, t, wt(6, 'token') - .3, '#ffd23a', wt(6, 'carry') - .2); label(ctx, 'CARRY IT ALWAYS', 540, 260, 96, t, wt(6, 'carry') - .2, '#ffffff');
} });
// [7] written on it: the beard is a useless burden
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .05 }); bgFlat(ctx, '#5a3a1a', '#2a1a08'); applyCam(ctx, cam, 1);
  beardToken(ctx, 540, 820, 320, -.05, Math.PI);
  label(ctx, '"THE BEARD IS', 540, 240, 96, t, wt(7, 'beard') - .3, '#ffffff'); label(ctx, 'A USELESS BURDEN"', 540, 360, 90, t, wt(7, 'useless') - .3, '#ffd23a');
} });
// [8] Russia didn't get rid of the beard tax until 1772
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); kremlinBG(ctx, t, cam, { top: '#ff9a5a', bot: '#ffd8a0' });
  const k = ease(clamp((t - wt(8, '1772') + .2) / .8)); for (let i = 0; i < 3; i++) boyar(ctx, { x: 200 + i * 340, y: G + 200, s: 460, arms: k > .5 ? { L: [2.4, .3], R: [2.4, .3] } : POSE.idle.arms, face: k > .5 ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'normal', mouth: 'flat' } }, .6 + .9 * k);
  label(ctx, 'TAX ENDED: 1772', 540, 260, 104, t, wt(8, '1772') - .3, '#ffd23a');
} });
