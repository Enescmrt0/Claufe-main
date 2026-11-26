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
// [0] a US army unit went to war with balloons, speakers and paint
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); field(ctx, t, cam); applyCam(ctx, cam, 1); const p = t < wt(0, 'balloons') - .1 ? 0 : t < wt(0, 'speakers') - .1 ? 1 : t < wt(0, 'paint') - .1 ? 2 : 3;
  if (p === 0) { for (let i = 0; i < 4; i++) gi(ctx, { x: 150 + i * 260, y: G + 160, s: 560, arms: { L: [.3, -.1], R: [2.3, .2] }, face: { eyes: 'happy', mouth: 'grin' } }, i); chapterTag(ctx, t, .05, 'WORLD WAR II'); }
  else if (p === 1) { const k = clamp((t - wt(0, 'balloons')) / .8); tank(ctx, 600, G - 20, 700, { inflate: .2 + .8 * k, rubber: true, t }); pump(ctx, 150, G + 40, 300, Math.abs(Math.sin(t * 8))); gi(ctx, { x: 220, y: G + 180, s: 520, arms: { L: { ik: [-.1, -.7] }, R: { ik: [.05, -.7] } }, face: { eyes: 'squint', mouth: 'teeth' } }, 0); label(ctx, 'BALLOONS', 540, 260, 140, t, wt(0, 'balloons') - .2, '#ff9ab0'); }
  else if (p === 2) { truckG(ctx, 540, G - 20, 700, { speakers: true }); soundWaves(ctx, 400, G - 520, 400, t); label(ctx, 'SPEAKERS', 540, 260, 140, t, wt(0, 'speakers') - .2, '#ffd23a'); }
  else { artist(ctx, { x: 300, y: G + 180, s: 600, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }, 0); rrect(ctx, 600, 600, 340, 440, 6); fillStroke(ctx, '#f6f2e6', 7); tank(ctx, 770, 900, 260, {}); line(ctx, 680, 1040, 640, 1240, 10, '#7a5236'); line(ctx, 860, 1040, 900, 1240, 10, '#7a5236'); label(ctx, 'AND PAINT', 540, 260, 140, t, wt(0, 'paint') - .2, '#7ee08a'); }
} });
// [1] the Ghost Army: ~1,100 men, many artists and designers
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const art = t > wt(1, 'many') - .1;
  if (!art) { bgFlat(ctx, '#3a4a3a', '#1a221a'); applyCam(ctx, cam, 1); for (let i = 0; i < 28; i++) { const k = clamp((t - S(1) - i * .03) / .3); ctx.save(); ctx.globalAlpha = .35 + .5 * k; gi(ctx, { x: 80 + (i % 7) * 150, y: 760 + Math.floor(i / 7) * 160, s: 260, shadow: false, face: { eyes: 'normal', mouth: 'smile' } }, i); ctx.restore(); } label(ctx, 'GHOST ARMY', 540, 260, 140, t, wt(1, 'ghost') - .2, '#e8f2ff'); label(ctx, '1,100 MEN', 540, 400, 90, t, wt(1, '1100') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#f2d8a8', '#d8a868'); applyCam(ctx, cam, 1); artist(ctx, { x: 260, y: G + 200, s: 620, arms: { L: [.3, -.1], R: { ik: [.42, -.62] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }, 1); rrect(ctx, 480, 560, 300, 400, 6); fillStroke(ctx, '#f6f2e6', 7); for (let i = 0; i < 6; i++) { circle(ctx, 560 + (i % 3) * 70, 700 + Math.floor(i / 3) * 120, 34); ctx.fillStyle = ['#e0392f', '#2f7de0', '#f2b52a', '#3aa35b', '#7a4bc4', '#ff9ab0'][i]; ctx.fill(); } artist(ctx, { x: 860, y: G + 200, s: 600, flip: -1, arms: { L: [.3, -.1], R: [1.4, .4] }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } }, 2); label(ctx, 'ARTISTS', 540, 260, 140, t, wt(1, 'artists') - .2, '#e0392f', wt(1, 'designers') - .2); label(ctx, '& DESIGNERS', 540, 260, 130, t, wt(1, 'designers') - .2, '#2f7de0'); }
} });
// [2] their job was to pretend to be someone else
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); bgFlat(ctx, '#2a2a3a', '#14141e'); applyCam(ctx, cam, 1); for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .1; ctx.translate(540, 760); ctx.rotate(i / 6 * TAU + t * .2); path(ctx, [[0, 0], [-90, -1500], [90, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  gi(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [.3, -.1], R: { ik: [.1, -.75] } }, face: { eyes: 'squint', mouth: 'smirk' } }, 1); const k = clamp((t - wt(2, 'pretend')) / .5); patchBadge(ctx, 540 - .14 * 780, G + 220 - .52 * 780, 120, k > .5 ? '#c8322c' : '#2a4a8a', k > .5 ? '6' : '23');
  ctx.save(); ctx.translate(540 + .1 * 780, G + 220 - .78 * 780); rrect(ctx, -110, -40, 220, 80, 30); ctx.fillStyle = 'rgba(30,30,40,.9)'; ctx.fill(); circle(ctx, -50, 0, 22); circle(ctx, 50, 0, 22); ctx.fillStyle = '#f6f2ea'; ctx.fill(); ctx.restore();
  label(ctx, 'PRETEND', 540, 260, 140, t, wt(2, 'pretend') - .2, '#ffd23a');
} });
// [3] inflated rubber tanks, trucks and cannons that looked real from the air
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const air = t > wt(3, 'that') - .1;
  if (!air) { field(ctx, t, cam); applyCam(ctx, cam, 1); const k1 = clamp((t - wt(3, 'tanks') + .3) / .6), k2 = clamp((t - wt(3, 'trucks') + .2) / .6), k3 = clamp((t - wt(3, 'cannons') + .2) / .6); tank(ctx, 300, G - 40, 460, { inflate: .1 + .9 * k1, rubber: true, t }); truckG(ctx, 800, G - 60, 380, {}); ctx.save(); ctx.translate(800, G - 60); ctx.scale(1, .1 + .9 * k2); ctx.translate(-800, -(G - 60)); ctx.restore(); if (k3 > 0) { ctx.save(); ctx.translate(560, G + 160); ctx.scale(1, k3); drawCannon(ctx, 0, 0, .9, -.2); ctx.restore(); } gi(ctx, { x: 120, y: G + 220, s: 420, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, 2); label(ctx, 'RUBBER TANKS', 540, 260, 120, t, wt(3, 'rubber') - .2, '#ff9ab0'); }
  else { topField(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 6; i++) tankTop(ctx, 220 + (i % 3) * 300, 700 + Math.floor(i / 3) * 400, 220, .1 * i); plane(ctx, 540 + Math.sin(t) * 60, 300, 360, t); label(ctx, 'LOOKS REAL', 540, 1560, 120, t, wt(3, 'real') - .3, '#ffffff'); }
} });
// [4] speaker trucks blasted recordings of engines and soldiers, heard miles away
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); field(ctx, t, cam, { top: '#1a2444', bot: '#4a5a7a', sun: false }); applyCam(ctx, cam, 1); truckG(ctx, 380, G - 20, 620, { speakers: true }); soundWaves(ctx, 300, G - 480, 500, t, '#ffd23a'); soundWaves(ctx, 460, G - 480, 650, t + .3, '#ffffff');
  const far = t > wt(4, 'heard') - .2; if (far) { for (let i = 0; i < 2; i++) gi(ctx, { x: 800 + i * 120, y: 1080, s: 220, flip: -1, cols: ['#5a5a5a', '#5a5a5a'], arms: { L: [.3, -.1], R: [2.4, -1.2] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }, 2); label(ctx, 'MILES AWAY', 540, 260, 130, t, wt(4, 'miles') - .2, '#ffd23a'); } else { label(ctx, 'VROOM ♪ CLANK', 540, 260, 110, t, wt(4, 'recordings') - .2, '#ffffff'); }
} });
// [5] radio operators sent fake messages; fake gossip in French cafes
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const cafeOn = t > wt(5, 'and') - .1;
  if (!cafeOn) { bgFlat(ctx, '#4a5a4a', '#2a342a'); applyCam(ctx, cam, 1); drawDesk(ctx, 540, G + 40, 820); radioG(ctx, 700, G - 150, 300, t); gi(ctx, { x: 340, y: G + 200, s: 640, noHelmet: true, arms: { L: [.3, -.1], R: { ik: [.42, -.42] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }, 0); headset2(ctx, 340, G + 200, 640); for (let i = 0; i < 3; i++) { const k = ((t * .8 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - k; text(ctx, '· — ·', 760 + k * 200, 700 - k * 300, 50, '#7ee08a', INK, 0); ctx.restore(); } label(ctx, 'FAKE MESSAGES', 540, 260, 110, t, wt(5, 'fake') - .2, '#7ee08a'); }
  else { cafe(ctx, t, cam); applyCam(ctx, cam, 1); cafeTable(ctx, 540, 1020, 380); gi(ctx, { x: 300, y: G + 200, s: 600, noHelmet: true, arms: { L: [.3, -.1], R: [1.5, .4] }, face: { eyes: 'squint', mouth: 'grin', look: [1, 0] } }, 1); frenchman(ctx, { x: 800, y: G + 200, s: 580, flip: -1, arms: { L: [.3, -.1], R: [1.2, .3] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }, 0); speech2b(ctx, 360, 520, 380, 150, '"6th Armored is here"', 36, 1); label(ctx, 'FAKE GOSSIP', 540, 260, 120, t, wt(5, 'gossip') - .2, '#ffd23a'); }
} });
function headset2(ctx, x, y, s) { const hy = y - .765 * s; ctx.beginPath(); ctx.arc(x, hy - .02 * s, .21 * s, Math.PI * 1.1, Math.PI * 1.9); ctx.lineWidth = s * .025; ctx.strokeStyle = '#2a2a2a'; ctx.stroke(); for (const sd of [-1, 1]) { ellipse(ctx, x + sd * .2 * s, hy + .02 * s, .04 * s, .06 * s); fillStroke(ctx, '#3a3a3a', 4); } }
function speech2b(ctx, x, y, w, h, str, size, tail = -1) { rrect(ctx, x - w / 2, y - h / 2, w, h, 28); fillStroke(ctx, '#ffffff', 6); path(ctx, [[x + tail * w * .1, y + h / 2 - 3], [x + tail * w * .28, y + h / 2 + 50], [x + tail * w * .26 - tail * 50, y + h / 2 - 3]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); text(ctx, str, x, y, size, '#2a1a1a', INK, 0); }
// [6] two French cyclists watched four soldiers lift a 40-ton tank; "Americans are very strong"
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); field(ctx, t, cam); applyCam(ctx, cam, 1); const lift = clamp((t - wt(6, 'lift') + .1) / .6); const said = t > wt(6, 'the', 0) - .1 && t > wt(6, 'tank');
  ctx.save(); ctx.translate(0, -lift * 160); tank(ctx, 560, G - 100, 560, { rubber: true, t }); ctx.restore(); for (let i = 0; i < 4; i++) gi(ctx, { x: 340 + i * 150, y: G + 200, s: 420, arms: { L: [2.8 - lift * .4, .2], R: [2.8 - lift * .4, .2] }, face: { eyes: 'happy', mouth: 'grin' } }, i);
  if (!said) { for (let i = 0; i < 2; i++) { bicycle(ctx, 120 + i * 120, G + 260, 240, 0); frenchman(ctx, { x: 120 + i * 120, y: G + 70, s: 300, arms: { L: [1.4, -.5], R: [1.4, -.5] }, face: { eyes: 'wide', mouth: 'o', look: [1, -1] } }, i); } label(ctx, '40 TONS?!', 540, 260, 140, t, wt(6, '40') - .2, '#ffd23a'); }
  else { speech2b(ctx, 680, 520, 560, 160, '"Americans are very strong"', 38, 1); frenchman(ctx, { x: 160, y: G + 220, s: 440, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'spiral', mouth: 'o' } }, 0); }
} });
// [7] more than 20 deceptions, pulling German forces away from the real attacks
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); warMap(ctx, t, cam); applyCam(ctx, cam, 1); const n = Math.round(20 * clamp((t - wt(7, '20') + .3) / .8)); for (let i = 0; i < n; i++) { const r = rng(i + 1); ctx.save(); ctx.globalAlpha = .9; tankTop(ctx, 120 + r() * 300, 300 + r() * 1100, 70, r()); ctx.restore(); }
  const k = clamp((t - wt(7, 'pulling') + .2) / 1.2); for (let i = 0; i < 4; i++) { ctx.save(); ctx.translate(lerp(820, 300, k) + i * 40, 600 + i * 160); ctx.rotate(Math.PI); tankTop(ctx, 0, 0, 80, 0); ctx.restore(); } if (k > .5) { path(ctx, [[760, 1500], [820, 1360], [880, 1500]]); ctx.fillStyle = '#3aa35b'; ctx.fill(); line(ctx, 820, 1500, 820, 1700, 30, '#3aa35b'); text(ctx, 'REAL ATTACK', 820, 1240, 44, '#2a6a3a', INK, 0); }
  label(ctx, '20+ DECEPTIONS', 540, 220, 110, t, wt(7, '20') - .2, '#ffffff');
} });
// [8] historians think they saved thousands of lives
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); field(ctx, t, cam, { top: '#e8a868', bot: '#f8e0b0', sun: false }); applyCam(ctx, cam, 1); for (let i = 0; i < 18; i++) gi(ctx, { x: 60 + (i % 9) * 120, y: 1100 + Math.floor(i / 9) * 180, s: 320 + Math.floor(i / 9) * 40, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, i); for (let i = 0; i < 5; i++) drawHeart(ctx, 200 + i * 170, 520 + Math.sin(t * 3 + i) * 20, 50); label(ctx, 'THOUSANDS OF LIVES', 540, 260, 96, t, wt(8, 'thousands') - .3, '#ff9ab0');
} });
// [9] secret for fifty years; Congressional Gold Medal in 2022
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const med = t > wt(9, 'in') - .1 && t > wt(9, 'years');
  if (!med) { bgFlat(ctx, '#3a3a3a', '#1a1a1a'); applyCam(ctx, cam, 1); rrect(ctx, 260, 560, 560, 420, 10); fillStroke(ctx, '#c8a878', 8); text(ctx, 'TOP SECRET', 540, 700, 70, '#c8322c', INK, 0); tank(ctx, 540, 940, 260, { rubber: true, t }); const yr = 1945 + Math.round(50 * clamp((t - wt(9, 'secret')) / 1.4)); text(ctx, String(yr), 540, 1120, 90, '#ffffff', INK, 12); text(ctx, String(yr), 540, 1120, 90, '#ffffff', INK, 0); label(ctx, '50 YEARS SECRET', 540, 260, 110, t, wt(9, 'secret') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#2a3a6a', '#14203a'); applyCam(ctx, cam, 1); goldMedal(ctx, 540, 760, 300, t); for (let i = 0; i < 3; i++) gi(ctx, { x: 200 + i * 340, y: G + 230, s: 380, cols: ['#4a4a52', '#4a4a52'], noHelmet: true, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'happy', mouth: 'smile' } }, i); for (let i = 0; i < 3; i++) greyHair(ctx, { x: 200 + i * 340, y: G + 230, s: 380 }); chapterTag(ctx, t, wt(9, '2022') - .1, '2022'); label(ctx, 'GOLD MEDAL', 540, 260, 130, t, wt(9, 'gold') - .3, '#ffd23a'); }
} });
