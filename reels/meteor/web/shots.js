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
const napAnn = (ctx, t, o = {}) => ann(ctx, Object.assign({ x: 740, y: 1070, s: 520, lean: -1.45, arms: { L: [.5, -.4], R: [.5, -.4] }, legs: { L: [.2, -.1], R: [.2, -.1] }, face: { eyes: 'closed', mouth: 'o' }, shadow: false }, o));
// [0] 1954: napping, hit by a rock from space
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const hitT = wt(0, 'hit'); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > hitT && t < hitT + .6 ? 14 : 2 }); livingRoom(ctx, t, cam, { ceilHole: t > hitT - .3, dust: clamp((t - hitT) / 1.2) }); applyCam(ctx, cam, 1); couch(ctx, 480, G + 40, 560);
  const woke = t > hitT; napAnn(ctx, t, woke ? { face: { eyes: 'wide', mouth: 'o' } } : {}); if (!woke) drawZs(ctx, 300, 760, t, 1.2, '#3a3a5a');
  const k = clamp((t - hitT + .3) / .3); if (k > 0 && k < 1) meteorite(ctx, 500, lerp(0, 920, k), 50, t, 1); if (k >= 1) { meteorite(ctx, 640, 1180, 50, 0, 0); burst(ctx, 520, 940, 120 * (1 - clamp((t - hitT) / .4)), 10, '#ffd23a', 4); }
  chapterTag(ctx, t, .05, '1954'); label(ctx, 'TAKING A NAP', 540, 260, 126, t, wt(0, 'nap') - .3, '#ffffff', wt(0, 'hit') - .1); label(ctx, 'HIT FROM SPACE', 540, 260, 120, t, wt(0, 'hit') - .1, '#ffb43a');
} });
// [1] Ann Hodges, Sylacauga, Alabama
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); houseExt(ctx, t, cam); applyCam(ctx, cam, 1); ann(ctx, { x: 300, y: G + 220, s: 620, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'smile' } });
  label(ctx, 'ANN HODGES', 540, 260, 140, t, wt(1, 'ann') - .2, '#ffffff', wt(1, 'sylacauga') - .2); label(ctx, 'SYLACAUGA, ALABAMA', 540, 260, 94, t, wt(1, 'sylacauga') - .2, '#ffd23a');
} });
// [2] Nov 30: fireball over town
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); townAL(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(2, 'saw') + .6) / 2.4); fireball(ctx, lerp(1100, 300, k), lerp(180, 620, k), 30, -2.6, 600, t);
  for (let i = 0; i < 5; i++) { const o = { x: 140 + i * 200, y: G + 220, s: 440, cols: [['#6a7a9a', '#6a7a9a'], ['#9a5a4a', '#9a5a4a'], ['#5a6a4a', '#5a6a4a'], ['#7a6a9a', '#7a6a9a'], ['#4a5a6a', '#4a5a6a']][i], hat: 'none', belt: false, arms: { L: [.3, -.1], R: [2.7, -.2] }, face: { eyes: 'wide', mouth: 'o', look: [.5, -1] } }; drawStick(ctx, o); if (i % 2) flatCap(ctx, o, '#4a4a42'); }
  chapterTag(ctx, t, S(2) + .05, '30 NOVEMBER 1954'); label(ctx, 'NOVEMBER 30', 540, 260, 130, t, wt(2, 'november') - .2, '#ffffff', wt(2, 'fireball') - .2); label(ctx, 'A FIREBALL', 540, 260, 150, t, wt(2, 'fireball') - .2, '#ffb43a');
} });
// [3] something crashed through the roof
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const c = wt(3, 'crashed'); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > c && t < c + .7 ? 16 : 2 }); houseExt(ctx, t, cam, { hole: t > c }); applyCam(ctx, cam, 1); const k = clamp((t - c + .5) / .5);
  if (k < 1) meteorite(ctx, lerp(900, 640, k), lerp(-100, 520, k), 40, t, 1); else { burst(ctx, 640, 520, 140 * (1 - clamp((t - c) / .5)), 10, '#ffd23a', 4); for (let i = 0; i < 8; i++) { const r = rng(i + 3), q = clamp((t - c) / 1.0); rrect(ctx, 640 + (r() - .5) * 400 * q, 520 - Math.sin(q * Math.PI) * 200 * r() + q * q * 400, 26, 14, 3); fillStroke(ctx, '#6a6a72', 4); } }
  label(ctx, 'THROUGH THE ROOF', 540, 260, 104, t, wt(3, 'crashed') - .2, '#e0392f');
} });
// [4] grapefruit-sized meteorite; bounced off radio; hit her hip
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); const ph = t < wt(4, 'it', 1) - .1 ? 0 : 1;
  if (ph === 0) { bgFlat(ctx, '#2a2a3a', '#14141e'); applyCam(ctx, cam, 1); meteorite(ctx, 380, 860, 150, t * .3, .6); text(ctx, '=', 560, 860, 120, '#ffffff', INK, 10); grapefruit(ctx, 740, 860, 150); text(ctx, '4 KG', 380, 1100, 70, '#ffd23a', INK, 10); label(ctx, 'A METEORITE', 540, 260, 140, t, wt(4, 'meteorite') - .2, '#ffb43a', wt(4, 'grapefruit') - .1); label(ctx, 'GRAPEFRUIT SIZE', 540, 260, 116, t, wt(4, 'grapefruit') - .1, '#ffffff'); }
  else { const b = wt(4, 'bounced'), h = wt(4, 'slammed'); livingRoom(ctx, t, cam, { ceilHole: true, dust: .4 }); applyCam(ctx, cam, 1); couch(ctx, 480, G + 40, 560); radio(ctx, 880, G + 20, 220, cue(t, b, .2) * (1 - cue(t, b + .3, .4))); const hit = t > h - .1; napAnn(ctx, t, hit ? { face: { eyes: 'wide', mouth: 'teeth' }, bruise: cue(t, h, .4) } : {});
    let mx, my; if (t < b) { const q = clamp((t - S(4) - .6) / Math.max(.2, b - S(4) - .6)); mx = lerp(700, 880, q); my = lerp(0, G - 200, q); } else if (t < h) { const q = clamp((t - b) / (h - b)); mx = lerp(880, 560, q); my = G - 200 - Math.sin(q * Math.PI) * 300 + q * 180; } else { mx = 600; my = 1170; } meteorite(ctx, mx, my, 44, t * 4, t < h ? 1 : 0);
    if (t > b && t < b + .3) burst(ctx, 880, G - 200, 80, 8, '#ffffff', 2); if (hit && t < h + .4) burst(ctx, 560, 1000, 120, 10, '#ffd23a', 5);
    label(ctx, 'OFF THE RADIO', 540, 260, 120, t, b - .2, '#ffffff', h - .2); label(ctx, 'INTO HER HIP', 540, 260, 126, t, h - .2, '#e0392f'); }
} });
// [5] bruise the size of a pineapple
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); bgFlat(ctx, '#f0e0c8', '#d8c0a0'); applyCam(ctx, cam, 1); ann(ctx, { x: 360, y: G + 220, s: 720, bruise: 1, arms: { L: [.3, -.1], R: [.9, .6] }, face: { eyes: 'squint', mouth: 'teeth' } }); text(ctx, '=', 680, 1040, 110, '#3a3a3a', INK, 0); pineapple(ctx, 840, 1040, 260 * backOut(cue(t, wt(5, 'pineapple') - .3, .4)));
  ctx.save(); ctx.beginPath(); ctx.ellipse(446, G + 220 - 720 * .28, 100, 72, 0, 0, TAU); ctx.fillStyle = '#6a3a8a'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore();
  label(ctx, 'A HUGE BRUISE', 540, 260, 126, t, wt(5, 'bruise') - .2, '#9a5ac8', wt(5, 'pineapple') - .2); label(ctx, 'PINEAPPLE SIZE', 540, 260, 116, t, wt(5, 'pineapple') - .2, '#ffd23a');
} });
// [6] first person in history confirmed hit
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .03, dz: 0 }); bgFlat(ctx, '#1a1a3a', '#0a0a1a'); applyCam(ctx, cam, 1); drawStars(ctx, t, 80, 5, 1); circle(ctx, 540, 1900, 900); fillStroke(ctx, '#3a7ab0', 8);
  ann(ctx, { x: 540, y: 1060, s: 520, bruise: 1, arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); stamp(ctx, 540, 520, 'FIRST EVER', cue(t, wt(6, 'first') - .1, .25), '#ffd23a', -.12);
  label(ctx, 'FIRST IN HISTORY', 540, 260, 110, t, wt(6, 'first') - .2, '#ffffff', wt(6, 'confirmed') - .1); label(ctx, 'CONFIRMED', 540, 260, 150, t, wt(6, 'confirmed') - .1, '#4ad06a');
} });
// [7] Air Force took it for testing
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); houseExt(ctx, t, cam, { hole: true }); applyCam(ctx, cam, 1); const k = clamp((t - wt(7, 'took')) / 1.4);
  airman(ctx, { x: lerp(620, 960, k), y: G + 220, s: 600, flip: k > 0 ? 1 : -1, legs: k > 0 && k < 1 ? { L: [.1 + Math.sin(t * 8) * .4, -.15], R: [.1 - Math.sin(t * 8) * .4, -.15] } : undefined, arms: { L: [.3, -.1], R: [1.6, -.3] }, face: { eyes: 'squint', mouth: 'flat' } }); meteorite(ctx, lerp(620, 960, k) + 140, G + 220 - 600 * .5, 40, 0, 0);
  ann(ctx, { x: 280, y: G + 220, s: 600, bruise: 1, arms: { L: [.3, -.1], R: [1.6, .4] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  label(ctx, 'THE AIR FORCE', 540, 260, 124, t, wt(7, 'air') - .2, '#9ad8ff', wt(7, 'took') - .1); label(ctx, 'TAKEN AWAY', 540, 260, 140, t, wt(7, 'took') - .1, '#ffffff');
} });
// [8] landlady: it's mine, it fell on my house
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); houseExt(ctx, t, cam, { hole: true }); applyCam(ctx, cam, 1);
  landlady(ctx, { x: 760, y: G + 220, s: 620, flip: -1, arms: { L: [.3, -.1], R: [2.2 + Math.sin(t * 6) * .2, .4] }, face: { eyes: 'squint', mouth: 'teeth', look: [-1, 0] } }); ann(ctx, { x: 300, y: G + 220, s: 600, bruise: 1, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  rrect(ctx, 520, 440, 500, 160, 30); fillStroke(ctx, '#ffffff', 6); text(ctx, 'MY HOUSE.', 770, 500, 52, '#2a2a3a', INK, 0); text(ctx, 'MY ROCK!', 770, 560, 52, '#e0392f', INK, 0);
  label(ctx, 'THE LANDLADY', 540, 260, 130, t, wt(8, 'landlady') - .2, '#ffffff', wt(8, 'hers') - .2); label(ctx, '"IT\'S MINE!"', 540, 260, 140, t, wt(8, 'hers') - .2, '#e0392f');
} });
// [9] fought for months; Ann paid $500
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); const ph = t < wt(9, 'finally') - .1 ? 0 : 1; bgFlat(ctx, ph ? '#e8d8b0' : '#5a3a3a', ph ? '#c8b080' : '#2a1a1a'); applyCam(ctx, cam, 1);
  if (ph === 0) { const w = Math.sin(t * 7); landlady(ctx, { x: 720, y: G + 220, s: 600, flip: -1, lean: -.1 + w * .05, arms: { L: [.3, -.1], R: [2.0, .3] }, face: { eyes: 'squint', mouth: 'teeth', look: [-1, 0] } }); ann(ctx, { x: 360, y: G + 220, s: 600, lean: .1 - w * .05, arms: { L: [.3, -.1], R: [2.0, .3] }, face: { eyes: 'squint', mouth: 'teeth', look: [1, 0] } }); burst(ctx, 540, 640, 80, 9, '#ffd23a', 3); const m = 1 + Math.floor(clamp((t - wt(9, 'months') + .4) / 1.2) * 5); text(ctx, `MONTH ${m}`, 540, 1490, 64, '#ffffff', INK, 10); label(ctx, 'A FIGHT', 540, 260, 160, t, wt(9, 'fought') - .2, '#e0392f'); }
  else { ann(ctx, { x: 340, y: G + 220, s: 600, arms: { L: [.3, -.1], R: [1.5, .2] }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }); dollarStack(ctx, 560, G - 140, 240, backOut(cue(t, wt(9, '500') - .3, .4))); landlady(ctx, { x: 800, y: G + 220, s: 600, flip: -1, arms: { L: [.3, -.1], R: [1.5, .2] }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }); label(ctx, 'PAID $500', 540, 260, 150, t, wt(9, '500') - .3, '#4ad06a'); }
} });
// [10] nobody wanted to buy it
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); houseExt(ctx, t, cam, { top: '#8a9aac', bot: '#d8dce0' }); applyCam(ctx, cam, 1); rrect(ctx, 600, 1060, 340, 140, 8); fillStroke(ctx, '#c8a878', 6); meteorite(ctx, 770, 1030, 60, 0, 0); rrect(ctx, 640, 1110, 260, 70, 6); fillStroke(ctx, '#ffffff', 4); text(ctx, 'FOR SALE', 770, 1146, 38, '#e0392f', INK, 0);
  ann(ctx, { x: 360, y: G + 220, s: 600, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'frown' } }); drawZs(ctx, 900, 700, t, 1, '#ffffff');
  label(ctx, 'LOST INTEREST', 540, 260, 126, t, wt(10, 'lost') - .2, '#ffffff', wt(10, 'nobody') - .1); label(ctx, 'NO BUYERS', 540, 260, 150, t, wt(10, 'nobody') - .1, '#9a9aa8');
} });
// [11] gave it to a museum in Alabama
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); museumCase(ctx, t, cam); applyCam(ctx, cam, 1); meteorite(ctx, 540, 820, 110, 0, .4); ann(ctx, { x: 160, y: G + 260, s: 520, arms: { L: [.3, -.1], R: [2.2, .5] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } });
  label(ctx, 'TO A MUSEUM', 540, 260, 140, t, wt(11, 'museum') - .3, '#ffd23a', wt(11, 'still') - .2); label(ctx, 'STILL THERE', 540, 260, 140, t, wt(11, 'still') - .2, '#ffffff');
} });
