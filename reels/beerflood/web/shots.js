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
const worker = (ctx, o, k = 0) => { const so = Object.assign({ cols: [['#7a5a3a', '#f6f1e8'], ['#5a6a7a', '#f6f1e8'], ['#6a4a3a', '#d8c8a8']][k % 3], hat: 'none', belt: false }, o); drawStick(ctx, so); flatCap(ctx, so, ['#4a4a3a', '#3a3a4a', '#5a4a3a'][k % 3]); return so; };
const local = (ctx, o, k = 0) => { const so = Object.assign({ cols: [['#8a6a8a', '#8a6a8a'], ['#6a8a6a', '#f6f1e8'], ['#a86a4a', '#a86a4a'], ['#5a5a7a', '#d8c8a8']][k % 4], hat: 'none', belt: false }, o); drawStick(ctx, so); if (k % 2 === 0) bonnet(ctx, so); else flatCap(ctx, so, '#4a4a42'); return so; };
// [0] 1814: a wave of beer flooded London
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04, shake: 6 }); londonSt(ctx, t, cam); applyCam(ctx, cam, 1);
  const wx = lerp(-200, 1400, clamp((t - .2) / 4.2));
  for (let i = 0; i < 3; i++) local(ctx, { x: 360 + i * 250, y: G + 180, s: 470, flip: -1, lean: -.1, arms: { L: [2.8, -1.2], R: [2.8, -1.2] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }, i);
  beerWave(ctx, wx, G + 160, 720, t); chapterTag(ctx, t, .05, 'LONDON, 1814'); label(ctx, 'A WAVE OF BEER', 540, 260, 116, t, wt(0, 'wave') - .2, '#ffb43a');
} });
// [1] Horse Shoe Brewery: giant vat, half a million litres
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(1, 'giant') - .15 ? 0 : 1;
  if (p === 0) { brewery(ctx, t, cam); applyCam(ctx, cam, 1); label(ctx, 'HORSE SHOE BREWERY', 540, 260, 92, t, wt(1, 'horse') - .2, '#ffffff'); }
  else { breweryIn(ctx, t, cam); applyCam(ctx, cam, 1); vat(ctx, 540, G, 640, 1000, t, { lab: 'PORTER' }); worker(ctx, { x: 160, y: G + 180, s: 380, arms: { L: [.3, -.1], R: [2.6, -.5] }, face: { eyes: 'wide', mouth: 'o', look: [1, -1] } }, 0); label(ctx, 'GIANT VAT', 540, 260, 140, t, wt(1, 'giant') - .2, '#ffffff', wt(1, 'half') - .2); label(ctx, '500,000+ LITRES', 540, 260, 110, t, wt(1, 'half') - .2, '#ffb43a'); }
} });
// [2] held together by huge iron rings
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.25 + lt * .05, dz: 0, y: 760 }); breweryIn(ctx, t, cam); applyCam(ctx, cam, 1); vat(ctx, 540, G, 640, 1000, t, { lab: 'PORTER' }); const k = cue(t, wt(2, 'iron') - .1, .5); if (k > 0) { ctx.save(); ctx.globalAlpha = .7 * Math.sin(k * Math.PI); for (let i = 0; i < 6; i++) { const yy = G - 1000 * (.08 + i * .17); line(ctx, 220, yy, 860, yy, 30, '#ffd23a'); } ctx.restore(); } label(ctx, 'IRON RINGS', 540, 260, 140, t, wt(2, 'iron') - .2, '#c8ccd8');
} });
// [3] October 17: a ring slipped
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const sl = cue(t, wt(3, 'slipped') - .1, .5); const cam = camA(t, lt, { z: 1.15, dz: .04, y: 820, shake: sl > 0 && sl < 1 ? 10 : 2 }); breweryIn(ctx, t, cam); applyCam(ctx, cam, 1); vat(ctx, 540, G, 640, 1000, t, { lab: 'PORTER', slip: sl }); worker(ctx, { x: 900, y: G + 180, s: 420, flip: -1, arms: { L: [2.8, -1.4], R: [2.8, -1.4] }, face: { eyes: 'wide', mouth: 'o' }, sweat: true }, 1);
  chapterTag(ctx, t, S(3) + .05, '17 OCTOBER 1814'); label(ctx, 'OCTOBER 17', 540, 260, 130, t, wt(3, 'october') - .2, '#ffffff', wt(3, 'one') - .1); label(ctx, 'A RING SLIPPED', 540, 260, 116, t, wt(3, 'one') - .1, '#e0392f');
} });
// [4] an hour later, the whole vat burst
SHOTS.push({ start: S(4), end: S(5), tr: 'cut', draw(ctx, lt, t) {
  const b = cue(t, wt(4, 'burst') - .05, 1.2); const cam = camA(t, lt, { z: 1.02, dz: .02, shake: b > 0 ? 18 * (1 - b) + 3 : 2 }); breweryIn(ctx, t, cam); applyCam(ctx, cam, 1);
  if (b <= 0) { vat(ctx, 540, G, 640, 1000, t, { lab: 'PORTER', slip: 1, leak: clamp((t - S(4)) / 1.0) }); clockTag && 0; label(ctx, '1 HOUR LATER', 540, 260, 120, t, S(4) + .05, '#ffffff'); }
  else { beerFlood(ctx, lerp(G + 100, 600, Math.pow(b, .5)), t); vat(ctx, 540, G, 640, 1000, t, { burst: b }); burst(ctx, 540, 700, 360 * (1 - b * .5), 14, '#ffd23a', 6); label(ctx, 'BURST!', 540, 260, 170, t, wt(4, 'burst') - .1, '#e0392f'); }
} });
// [5] the blast smashed the other vats too
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 10 }); breweryIn(ctx, t, cam); applyCam(ctx, cam, 1);
  [180, 540, 900].forEach((x, i) => { const b = cue(t, wt(5, 'smashed') + i * .4, 1.0); vat(ctx, x, G, 320, 620, t, { burst: b, lab: '' }); if (b > 0 && b < 1) burst(ctx, x, 900, 160, 10, '#ffd23a', i + 2); });
  beerFlood(ctx, lerp(G + 80, 900, cue(t, wt(5, 'smashed'), 1.4)), t); label(ctx, 'THE OTHER VATS TOO', 540, 260, 96, t, wt(5, 'other') - .2, '#ffb43a');
} });
// [6] over a million litres broke through the brewery wall
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > wt(6, 'broke') ? 14 : 3 }); const br = cue(t, wt(6, 'broke'), 1.2); brewery(ctx, t, cam); applyCam(ctx, cam, 1);
  if (br > 0) { for (let i = 0; i < 14; i++) { const r = rng(i + 4); brickBlock(ctx, 540 + (r() - .5) * 600 * br + (r() - .5) * 200, 700 + br * br * 500 * r() - Math.sin(br * Math.PI) * 200 * r(), 70, 34, '#9a5a3a', br * 6 * r()); } beerWave(ctx, lerp(300, 1300, br), 1000, 700 * Math.min(1, br * 2), t); }
  label(ctx, '1,000,000+ LITRES', 540, 260, 104, t, wt(6, 'more') - .1, '#ffb43a', wt(6, 'broke') - .1); label(ctx, 'THROUGH THE WALL', 540, 260, 104, t, wt(6, 'broke') - .1, '#e0392f');
} });
// [7] a wave up to 15 feet high rushed into St Giles
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 8 }); stGilesRow(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - S(7)) / 3.6);
  const fig = local(ctx, { x: lerp(700, 980, k), y: 1240, s: 420, flip: 1, lean: .2, arms: { L: [2.8, -1.2], R: [2.8, -1.2] }, legs: POSE.run ? POSE.run.legs : undefined, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }, 0);
  beerWave(ctx, lerp(-300, 780, k), 1200, 960, t);
  if (t > wt(7, '15') - .2 && t < wt(7, 'rushed')) { line(ctx, 960, 1200, 960, 240, 6, '#ffffff'); text(ctx, '15 FT', 960, 210, 60, '#ffffff', INK, 10); } label(ctx, '15 FEET HIGH', 540, 260, 120, t, wt(7, '15') - .2, '#ffb43a', wt(7, 'rushed')); label(ctx, 'ST GILES', 540, 260, 140, t, wt(7, 'st') - .2, '#ffffff');
} });
// [8] crashed into houses, flooded cellars; eight people died
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); const p = t < wt(8, 'eight') - .15 ? 0 : 1;
  if (p === 0) { cellar(ctx, t, cam); applyCam(ctx, cam, 1); const lv = lerp(1300, 760, clamp((t - wt(8, 'flooded') + .5) / 1.6)); ctx.save(); ctx.beginPath(); ctx.rect(760, 180, 220, 140); ctx.clip(); ctx.fillStyle = BEER; ctx.fillRect(760, 180 + Math.max(0, 140 - (t - S(8)) * 80), 220, 140); ctx.restore(); if (t > S(8) + .2) { ctx.save(); ctx.beginPath(); ctx.moveTo(870, 320); ctx.quadraticCurveTo(840, 600, 820, lv); ctx.lineWidth = 50; ctx.strokeStyle = BEER; ctx.stroke(); ctx.restore(); } beerFlood(ctx, lv, t); label(ctx, 'CELLARS FLOODED', 540, 260, 110, t, wt(8, 'flooded') - .2, '#ffb43a'); }
  else { bgFlat(ctx, '#3a3a44', '#1a1a22'); applyCam(ctx, cam, 1); for (let i = 0; i < 8; i++) { const x = 190 + (i % 4) * 233, y = i < 4 ? 640 : 1040; ctx.save(); ctx.globalAlpha = cue(t, wt(8, 'eight') + i * .08, .2); circle(ctx, x, y - 140, 60); fillStroke(ctx, '#d8d8e0', 6); rrect(ctx, x - 60, y - 70, 120, 150, 40); fillStroke(ctx, '#d8d8e0', 6); ctx.restore(); } label(ctx, '8 PEOPLE DIED', 540, 260, 124, t, wt(8, 'eight') - .1, '#ffffff'); }
} });
// [9] some scooped beer in pots and pans
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .04 }); stGilesRow(ctx, t, cam, { top: '#9aaabc' }); applyCam(ctx, cam, 1); beerFlood(ctx, 1180, t);
  const dip = Math.sin(t * 4); local(ctx, { x: 260, y: 1300, s: 440, lean: .25 + dip * .1, arms: { L: { ik: [.3, .1] }, R: { ik: [.4, .05] } }, face: { eyes: 'happy', mouth: 'grin' } }, 1); pot(ctx, 420, 1200 + dip * 30, 150, 1); local(ctx, { x: 780, y: 1300, s: 440, flip: -1, lean: .2 - dip * .1, arms: { L: { ik: [.3, .1] }, R: { ik: [.4, .05] } }, face: { eyes: 'happy', mouth: 'smile' } }, 0); pan(ctx, 620, 1200 - dip * 30, 180, .2);
  label(ctx, 'POTS AND PANS', 540, 260, 120, t, wt(9, 'pots') - .3, '#ffb43a');
} });
// [10] court: act of God, nobody blamed
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); court(ctx, t, cam); applyCam(ctx, cam, 1); const jo = { x: 540, y: 1040, s: 560, cols: ['#2a2a2a', '#2a2a2a'], hat: 'none', belt: false, arms: { L: [.4, -.2], R: [2.4, .6] }, face: { eyes: 'half', mouth: 'flat' } }; drawStick(ctx, jo); judgeWig(ctx, jo); rrect(ctx, 140, 900, 800, 340, 10); fillStroke(ctx, '#5a3a22', 8); const g = cue(t, wt(10, 'god') - .1, .15); gavel(ctx, 760, 860, 120, -1 + g * .9);
  label(ctx, '"ACT OF GOD"', 540, 260, 130, t, wt(10, 'act') - .2, '#ffd23a', wt(10, 'nobody') - .1); stamp(ctx, 540, 440, 'NOBODY BLAMED', cue(t, wt(10, 'nobody') - .1, .2), '#e0392f', -.1);
} });
// [11] the brewery got its beer tax refunded
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); brewery(ctx, t, cam, { top: '#7ab4e0', bot: '#f0e8d8' }); applyCam(ctx, cam, 1);
  const own = { x: 300, y: G + 160, s: 560, cols: ['#3a3a4a', '#f6f1e8'], hat: 'none', belt: false, arms: { L: [.3, -.1], R: [2.7, .3] }, face: { eyes: 'happy', mouth: 'grin' } }; drawStick(ctx, own); topHat(ctx, own); moneyBag(ctx, 470, G - 60, 160);
  for (let i = 0; i < 5; i++) { const k = ((t * .8 + i / 5) % 1); coin(ctx, 600 + i * 80, 400 + k * 800, 30, t * 6 + i); } taxDoc(ctx, 760, 720, 420, 400, backOut(cue(t, wt(11, 'tax') - .3, .4)), '£7,250'); 
  label(ctx, 'TAX REFUNDED', 540, 260, 130, t, wt(11, 'tax') - .2, '#4ad06a');
} });
