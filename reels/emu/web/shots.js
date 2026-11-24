// ---------- "The Great Emu War" (portrait Short) ----------
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
const herd = (ctx, t, n, x0, y0, o = {}) => { for (let i = 0; i < n; i++) { const r = rng(i * 13 + 7); const x = x0 + r() * (o.w || 900) + (o.vx || 0) * t * (.7 + r() * .5), y = y0 + r() * (o.h || 120); emu(ctx, ((x % 1500) + 1500) % 1500 - 200, y, (o.s || 200) * (.8 + r() * .4), { t, run: o.run == null ? 1 : o.run, seed: i * 1.3, flip: o.flip || (r() > .5 ? 1 : -1), peck: o.peck && r() > .4, scared: o.scared }); } };
// [0] Australia sent soldiers with machine guns to fight birds, and the birds won
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const won = t > wt(0, 'birds', 1) - .15; const cam = camA(t, lt, { z: 1.0, dz: .03, shake: won ? 6 : 3 }); outback(ctx, t, cam);
  if (!won) { digger(ctx, { x: 260, y: G + 140, s: 520, arms: { L: { ik: [.3, -.42] }, R: { ik: [.42, -.46] } }, face: { eyes: 'squint', mouth: 'teeth', look: [1, 0] } }); lewisGun(ctx, 300, G - 120, 380, { fire: t > wt(0, 'machine') - .1, t }); emu(ctx, 860, G + 120, 520, { t, flip: -1, look: -1 }); }
  else { herd(ctx, t, 6, 600, G + 40, { s: 300, flip: -1, run: 1, vx: -40, w: 500 }); digger(ctx, { x: 240, y: G + 140, s: 460, lean: -.2, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'wide', mouth: 'o' } }); }
  chapterTag(ctx, t, .05, 'AUSTRALIA, 1932'); label(ctx, 'ARMY VS BIRDS', 540, 280, 110, t, wt(0, 'war') - .2, '#ffffff', wt(0, 'birds', 1) - .15); label(ctx, 'BIRDS WON', 540, 280, 130, t, wt(0, 'birds', 1) - .15, '#ffd23a');
} });
// [1] after WWI, veterans got land in Western Australia to grow wheat
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); outback(ctx, t, cam, { wheat: t > wt(1, 'wheat') - .5 });
  for (let i = 0; i < 3; i++) { const so = digger(ctx, { x: 220 + i * 320, y: G + 220, s: 420, cols: ['#9a8a5a', '#f2e6c8'], arms: i === 1 ? { L: [.3, -.1], R: [2.4, .3] } : POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile' } }); }
  chapterTag(ctx, t, S(1) + .05, 'WESTERN AUSTRALIA'); label(ctx, 'WWI VETERANS', 540, 280, 110, t, wt(1, 'veterans') - .2, '#ffffff', wt(1, 'wheat') - .3); label(ctx, '+ WHEAT FARMS', 540, 280, 110, t, wt(1, 'wheat') - .3, '#ffd23a');
} });
// [2] then about 20,000 emus showed up
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); outback(ctx, t, cam, { wheat: true });
  const k = clamp((t - wt(2, '20') + .3) / 1.4); const n = Math.floor(k * 22);
  for (let i = 0; i < n; i++) { const r = rng(i * 7 + 3); emu(ctx, -100 + r() * 1280, 900 + r() * 420, 150 + r() * 160, { t, peck: true, seed: i, flip: r() > .5 ? 1 : -1 }); }
  label(ctx, Math.round(k * 20000).toLocaleString('en-US'), 540, 280, 150, t, wt(2, '20') - .3, '#ffd23a'); label(ctx, 'EMUS', 540, 420, 110, t, wt(2, 'emus') - .2, '#ffffff');
} });
// [3] huge, 50 km/h, love wheat
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const st = t < wt(3, 'run') - .15 ? 0 : t < wt(3, 'love') - .15 ? 1 : 2; const cam = camA(t, lt, { z: 1.02, dz: .02, shake: st === 1 ? 6 : 3 });
  if (st === 0) { outback(ctx, t, cam); emu(ctx, 680, G + 140, 900, { t, flip: -1 }); drawStick(ctx, { cols: PAL.blue, hat: 'none', belt: false, x: 220, y: G + 140, s: 540, arms: { L: [.3, -.1], R: [2.3, .3] }, face: { eyes: 'wide', mouth: 'o', look: [1, -1] } }); label(ctx, 'HUGE', 540, 280, 140, t, wt(3, 'huge') - .2, '#ffffff'); }
  if (st === 1) { outback(ctx, t * 6, cam); for (let i = 0; i < 6; i++) line(ctx, -100, 760 + i * 80, 300 + i * 60, 760 + i * 80, 8, 'rgba(255,255,255,.7)'); emu(ctx, 560, G + 120, 640, { t, run: 1.8 }); label(ctx, '50 KM/H', 540, 280, 140, t, wt(3, 'run') - .15, '#ffd23a'); }
  if (st === 2) { outback(ctx, t, cam, { wheat: true }); for (let i = 0; i < 3; i++) emu(ctx, 260 + i * 290, G + 140, 460, { t, peck: true, seed: i, flip: i === 2 ? -1 : 1 }); for (let i = 0; i < 4; i++) drawHeart(ctx, 260 + i * 200, 620 + Math.sin(t * 4 + i) * 20, 60); label(ctx, '♥ WHEAT', 540, 280, 140, t, wt(3, 'love') - .15, '#f2c25a'); }
} });
// [4] the army sent Major Meredith, two soldiers, two machine guns, 10,000 rounds
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); outback(ctx, t, cam);
  const m = cue(t, wt(4, 'major') - .2, .3), so = cue(t, wt(4, 'soldiers') - .2, .3), gn = cue(t, wt(4, 'machine') - .3, .3), am = cue(t, wt(4, '10') - .3, .3);
  if (m > 0) { const o = digger(ctx, { x: 540, y: G + 180, s: 520 * backOut(m), arms: POSE.hips.arms, face: { eyes: 'squint', mouth: 'smug' } }); moustache(ctx, o); }
  if (so > 0) for (const x of [230, 850]) digger(ctx, { x, y: G + 200, s: 420 * backOut(so), arms: { L: [.3, -.1], R: [2.9, .1] }, face: { eyes: 'normal', mouth: 'flat' } });
  if (gn > 0) { lewisGun(ctx, 60, 820, 300 * gn); lewisGun(ctx, 1020, 820, 300 * gn, { flip: -1 }); }
  if (am > 0) for (let i = 0; i < 4; i++) ammoCrate(ctx, 260 + i * 190, G + 230, 170 * backOut(clamp(am * 4 - i)));
  label(ctx, 'MAJOR MEREDITH', 540, 280, 96, t, wt(4, 'major') - .2, '#ffffff', wt(4, '10') - .3); label(ctx, '10,000 ROUNDS', 540, 280, 110, t, wt(4, '10') - .3, '#ffd23a');
  if (t > wt(4, 'soldiers') - .2 && t < wt(4, '10') - .3) label(ctx, '2 SOLDIERS · 2 GUNS', 540, 400, 70, t, wt(4, 'soldiers') - .2, '#ffd23a');
} });
// [5] day one: the emus saw the guns, split up and ran
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); outback(ctx, t, cam); const sp = clamp((t - wt(5, 'split') + .1) / 1.4);
  for (let i = 0; i < 10; i++) { const r = rng(i * 5 + 1); const a = r() * TAU; emu(ctx, 620 + Math.cos(a) * sp * 900 + (r() - .5) * 200, 1040 + r() * 260 + Math.sin(a) * sp * 120, 220, { t, run: sp > 0 ? 1.5 : 0, flip: Math.cos(a) > 0 ? 1 : -1, scared: t > wt(5, 'saw') - .1, seed: i }); }
  lewisGun(ctx, 60, 900, 300); chapterTag(ctx, t, S(5) + .05, 'DAY 1'); label(ctx, 'SPLIT UP', 540, 280, 120, t, wt(5, 'split') - .2, '#ffffff', wt(5, 'ran') - .15); label(ctx, '...AND RAN', 540, 280, 120, t, wt(5, 'ran') - .15, '#ffd23a');
} });
// [6] ambush near a dam: about a thousand emus walking toward them
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); outback(ctx, t, cam, { top: '#e88a4a', bot: '#ffd8a0' }); dam(ctx, 700, 1120, 640);
  const k = clamp((t - wt(6, 'thousand') + .6) / 2); for (let i = 0; i < 26; i++) { const r = rng(i * 3 + 11); emu(ctx, 1300 - k * 380 + r() * 400 - (i % 5) * 60, 980 + r() * 340, 140 + r() * 100, { t, run: .45, flip: -1, seed: i }); }
  digger(ctx, { x: 160, y: G + 220, s: 380, arms: { L: { ik: [.3, -.42] }, R: { ik: [.42, -.46] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }); lewisGun(ctx, 190, G + 60, 260);
  chapterTag(ctx, t, S(6) + .05, 'THE AMBUSH'); label(ctx, '~1,000 EMUS', 540, 280, 120, t, wt(6, 'thousand') - .3, '#ffd23a');
} });
// [7] they opened fire; after only a few fell, the gun jammed
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const jam = t > wt(7, 'jammed') - .15; const cam = camA(t, lt, { z: 1.04, dz: .03, shake: !jam ? 9 : 3 }); outback(ctx, t, cam, { top: '#e88a4a', bot: '#ffd8a0' });
  herd(ctx, t, 8, 560, G - 60, { s: 230, flip: jam ? -1 : 1, run: 1.2, vx: jam ? -10 : 60, w: 500, h: 200 });
  const so = digger(ctx, { x: 240, y: G + 220, s: 480, arms: { L: { ik: [.3, -.42] }, R: { ik: [.42, -.46] } }, face: jam ? { eyes: 'x', mouth: 'frown' } : { eyes: 'squint', mouth: 'teeth' } }); lewisGun(ctx, 270, G + 10, 340, { fire: !jam, jam, t });
  label(ctx, 'OPEN FIRE!', 540, 280, 120, t, wt(7, 'fire') - .2, '#ff6a5a', wt(7, 'jammed') - .15); stamp(ctx, 540, 360, 'JAMMED', cue(t, wt(7, 'jammed') - .1, .2), '#e0392f', -.12);
} });
// [8] a machine gun on a truck: too slow, too bumpy to aim
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const bumpy = t > wt(8, 'bumpy') - .3; const cam = camA(t, lt, { z: 1.0, dz: .02, shake: bumpy ? 8 : 3 }); outback(ctx, t * 3, cam);
  const slow = t > wt(8, 'slow') - .2; herd(ctx, t, 5, 600 + (slow ? (t - wt(8, 'slow')) * 220 : 0), G + 20, { s: 240, run: 1.5, w: 400, flip: 1 });
  const by = truck(ctx, 330, G + 120, 520, t, bumpy ? 1 : .4); digger(ctx, { x: 220, y: G - 70 + by, s: 260, lean: Math.sin(t * 17) * .2, arms: { L: [2.4, .3], R: { ik: [.4, -.45] } }, face: { eyes: 'spiral', mouth: 'teeth' } }); lewisGun(ctx, 240, G - 200 + by, 200, { rot: Math.sin(t * 19) * .4, fire: bumpy, t });
  label(ctx, 'GUN ON A TRUCK', 540, 280, 100, t, wt(8, 'truck') - .2, '#ffffff', wt(8, 'slow') - .2); label(ctx, 'TOO SLOW', 540, 280, 120, t, wt(8, 'slow') - .2, '#ff6a5a', wt(8, 'bumpy') - .3); label(ctx, 'TOO BUMPY', 540, 280, 120, t, wt(8, 'bumpy') - .3, '#ffd23a');
} });
// [9] after a week the army pulled out
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); outback(ctx, t, cam, { top: '#8aa0b8', bot: '#e0c8a8', sun: false });
  const k = clamp((t - wt(9, 'pulled') + .3) / 1.6); truck(ctx, 540 - k * 900, G + 120, 480, t, .3); for (let i = 0; i < 4; i++) emu(ctx, 700 + i * 120, G + 100 + (i % 2) * 40, 260, { t, peck: i % 2 === 0, seed: i, flip: -1 });
  chapterTag(ctx, t, S(9) + .05, '1 WEEK LATER'); label(ctx, 'RETREAT', 540, 280, 130, t, wt(9, 'pulled') - .2, '#ff6a5a');
} });
// [10] second try: almost a thousand birds claimed, about ten bullets per emu
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const bp = t > wt(10, 'ten') - .3;
  if (!bp) { outback(ctx, t, cam); for (let i = 0; i < 2; i++) digger(ctx, { x: 300 + i * 480, y: G + 200, s: 460, arms: POSE.hips.arms, face: { eyes: 'squint', mouth: 'smug' } }); label(ctx, 'ROUND 2', 540, 280, 130, t, wt(10, 'second') - .2, '#ffffff', wt(10, 'almost') - .2); label(ctx, '~1,000 CLAIMED', 540, 280, 100, t, wt(10, 'almost') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#5a4a3a', '#2a2018'); applyCam(ctx, cam, 1); emu(ctx, 760, 1180, 520, { t, flip: -1 }); const n = Math.floor(clamp((t - wt(10, 'ten') + .3) / 1.2) * 10); for (let i = 0; i < n; i++) bullet(ctx, 140 + (i % 5) * 90, 760 + Math.floor(i / 5) * 200, 160); text(ctx, '=', 610, 900, 110, '#ffffff', INK, 0); label(ctx, '10 BULLETS', 540, 280, 120, t, wt(10, 'ten') - .3, '#ffd23a'); label(ctx, 'PER EMU', 540, 410, 100, t, wt(10, 'emu') - .2, '#ffffff'); }
} });
// [11] but the emus were still there
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); outback(ctx, t, cam, { wheat: true });
  for (let i = 0; i < 14; i++) { const r = rng(i * 9 + 2); emu(ctx, -80 + r() * 1240, 900 + r() * 420, 170 + r() * 150, { t, peck: true, seed: i, flip: r() > .5 ? 1 : -1 }); }
  label(ctx, 'STILL THERE', 540, 280, 130, t, wt(11, 'still') - .2, '#ffd23a');
} });
// [12] Meredith: with the bullet-carrying capacity of these birds, an army could face anyone
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  const so = digger(ctx, { x: 300, y: G + 200, s: 600, arms: { L: [.3, -.1], R: [2.0, .4] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }); moustache(ctx, so);
  emu(ctx, 800, G + 160, 640, { t, flip: -1 }); if (t > wt(12, 'army') - .2) { ctx.save(); ctx.translate(800, G - 460); ctx.rotate(-.1); rrect(ctx, -110, -40, 220, 80, 8); fillStroke(ctx, '#6a7a4a', 6); text(ctx, 'ARMY', 0, 0, 44, '#ffffff', INK, 0); ctx.restore(); }
  label(ctx, '"BULLETPROOF"', 540, 280, 110, t, wt(12, 'bullet') - .2, '#ffd23a', wt(12, 'army') - .2); label(ctx, 'COULD BEAT', 540, 280, 110, t, wt(12, 'army') - .2, '#ffffff'); label(ctx, 'ANY ARMY', 540, 410, 110, t, wt(12, 'world') - .4, '#ffd23a');
} });
// [13] farmers had better luck with bounties and fences
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); outback(ctx, t, cam, { wheat: true }); const fc = t > wt(13, 'fences') - .2;
  if (fc) fence(ctx, -60, 1140, G + 60, 200);
  for (let i = 0; i < 3; i++) emu(ctx, 760 + i * 150, G - 30, 230, { t, flip: -1, scared: fc, seed: i });
  drawStick(ctx, { cols: ['#6a5a3a', '#f2e6c8'], hat: 'none', belt: false, x: 240, y: G + 220, s: 460, arms: { L: [.3, -.1], R: [2.2, .2] }, face: { eyes: 'happy', mouth: 'grin' } }); if (!fc) moneyBag(ctx, 380, 960, 140);
  label(ctx, 'BOUNTIES', 540, 280, 120, t, wt(13, 'bounties') - .2, '#7ee08a', wt(13, 'fences') - .2); label(ctx, '+ FENCES', 540, 280, 120, t, wt(13, 'fences') - .2, '#ffffff');
} });
// [14] the emus? still running around Australia today
SHOTS.push({ start: S(14), end: S(15), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); outback(ctx, t * 2, cam, { top: '#ff9a5a', bot: '#ffd8a0' });
  herd(ctx, t, 7, 0, G - 40, { s: 300, run: 1.3, vx: 260, w: 1200, h: 220, flip: 1 });
  label(ctx, 'STILL WINNING', 540, 280, 120, t, wt(14, 'still') - .2, '#ffd23a'); trophy(ctx, 540, 640, 140, t);
} });
