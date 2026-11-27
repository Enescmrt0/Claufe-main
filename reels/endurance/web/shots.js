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
const walk = (t, a = .4) => ({ L: [.1 + Math.sin(t * 8) * a, -.15], R: [.1 - Math.sin(t * 8) * a, -.15] });
const sh = (f) => (s, e, tr, d) => SHOTS.push({ start: s, end: e, tr: tr || 'whip', draw: d });
// [0] 1914: 28 men; ship trapped, crushed, sunk
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(0, 'their') - .1 ? 0 : 1;
  if (ph === 0) { openSea(ctx, t, cam, { floes: 4 }); applyCam(ctx, cam, 1); endShip(ctx, 540, 1060 + Math.sin(t * 2) * 6, 900, { tilt: Math.sin(t * 1.3) * .02 }); chapterTag(ctx, t, .05, '1914'); label(ctx, '28 MEN', 540, 260, 150, t, wt(0, '28') - .2, '#ffffff'); label(ctx, 'TO ANTARCTICA', 540, 260, 110, t, wt(0, 'antarctica') - .2, '#9ad8ff'); }
  else { const k = t < wt(0, 'crushed') - .1 ? 0 : t < wt(0, 'sunk') - .1 ? 1 : 2; packIce(ctx, t, cam, { top: '#7a9ab4', bot: '#d8e4ec' }); applyCam(ctx, cam, 1); endShip(ctx, 540, 960 + (k === 2 ? clamp((t - wt(0, 'sunk')) / 1) * 500 : 0), 900, { crush: k ? 1 : 0, tilt: k === 2 ? .25 : k ? .08 : 0, sails: false }); for (let i = 0; i < 4; i++) floe(ctx, 140 + i * 260, 1000, 120, i * .2);
    label(ctx, ['TRAPPED', 'CRUSHED', 'SUNK'][k], 540, 260, 160, t, [wt(0, 'trapped'), wt(0, 'crushed'), wt(0, 'sunk')][k] - .15, '#e0392f'); }
} });
// [1] every one came home alive
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#f0c870', '#e08a4a'); applyCam(ctx, cam, 1); for (let i = 0; i < 14; i++) { const x = 80 + (i % 7) * 153, y = i < 7 ? 980 : 1300; crew(ctx, { x, y, s: 330, arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, i, .8); }
  bigNum(ctx, '28 / 28', 540, 560, 150, cue(t, wt(1, 'alive') - .3, .4), '#ffffff'); label(ctx, 'ALL ALIVE', 540, 260, 150, t, wt(1, 'every') - .2, '#ffffff');
} });
// [2] Ernest Shackleton and the Endurance
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .03, dz: 0 }); openSea(ctx, t, cam, { top: '#5aa0d8', bot: '#e8f4fa' }); applyCam(ctx, cam, 1); endShip(ctx, 620, 1000 + Math.sin(t * 2) * 6, 760, { name: false }); shack(ctx, { x: 260, y: G + 220, s: 720, arms: { L: [.3, -.1], R: [.6, -.9] }, face: { eyes: 'normal', mouth: 'smirk', look: [1, 0] } });
  label(ctx, 'ERNEST SHACKLETON', 540, 260, 96, t, wt(2, 'ernest') - .2, '#ffffff', wt(2, 'endurance') - .1); label(ctx, 'THE ENDURANCE', 540, 260, 116, t, wt(2, 'endurance') - .1, '#ffd23a');
} });
// [3] plan: first to walk across Antarctica
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(3, 'be') - .1 ? 0 : 1;
  if (ph === 0) { bgFlat(ctx, '#d8c8a8', '#a8946a'); applyCam(ctx, cam, 1); rrect(ctx, 200, 520, 680, 460, 10); fillStroke(ctx, '#f6efd8', 7); text(ctx, 'THE PLAN', 540, 600, 60, '#3a2a1a', INK, 0); shack(ctx, { x: 540, y: G + 220, s: 640, arms: { L: [.3, -.1], R: [2.0, .3] }, face: { eyes: 'squint', mouth: 'smirk' } }); label(ctx, 'A HUGE PLAN', 540, 260, 130, t, wt(3, 'huge') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#3a6a9a', '#24507a'); applyCam(ctx, cam, 1); ctx.beginPath(); ctx.ellipse(540, 900, 420, 360, .1, 0, TAU); fillStroke(ctx, '#f2f8fc', 8); path(ctx, [[180, 820], [60, 620], [120, 600], [220, 760]]); fillStroke(ctx, '#f2f8fc', 6); const k = clamp((t - wt(3, 'walk')) / 2.0); ctx.save(); ctx.setLineDash([24, 16]); ctx.beginPath(); ctx.moveTo(300, 620); ctx.quadraticCurveTo(560, 880, lerp(300, 820, k), lerp(620, 1180, k)); ctx.lineWidth = 10; ctx.strokeStyle = '#e0392f'; ctx.stroke(); ctx.restore(); text(ctx, 'ANTARCTICA', 540, 1340, 60, '#ffffff', INK, 10); label(ctx, 'WALK ACROSS IT', 540, 260, 110, t, wt(3, 'walk') - .2, '#ffffff', wt(3, 'continent') - .1); label(ctx, '~3,000 KM ON FOOT', 540, 260, 96, t, wt(3, 'continent') - .1, '#ffd23a'); }
} });
// [4] Dec 1914: left South Georgia
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(4, 'left') - .1 ? 0 : 1;
  if (ph === 0) { openSea(ctx, t, cam); applyCam(ctx, cam, 1); endShip(ctx, 540, 1060 + Math.sin(t * 2) * 6, 980, { name: true, flip: false }); chapterTag(ctx, t, S(4) + .05, 'DECEMBER 1914'); label(ctx, 'DECEMBER 1914', 540, 260, 116, t, wt(4, 'december') - .2, '#ffffff'); }
  else { seaMap(ctx, t, cam, { out: clamp((t - wt(4, 'left')) / 3) * .35 }); applyCam(ctx, cam, 1); label(ctx, 'SOUTH GEORGIA', 540, 260, 110, t, wt(4, 'south') - .3, '#ffd23a'); label(ctx, 'LAST STOP', 540, 260, 140, t, wt(4, 'left') - .1, '#ffffff', wt(4, 'south') - .3); }
} });
// [5] crew: sailors, scientists, photographer, 69 dogs, a stowaway
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); packIce(ctx, t, cam, { top: '#8ec8ea' }); applyCam(ctx, cam, 1); const st = [wt(5, 'sailors'), wt(5, 'scientists'), wt(5, 'photographer'), wt(5, '69'), wt(5, 'stowaway')]; const idx = st.filter(x => t > x - .15).length - 1;
  if (idx <= 0) { for (let i = 0; i < 3; i++) crew(ctx, { x: 240 + i * 300, y: G + 200, s: 520, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, i, .5); label(ctx, 'SAILORS', 540, 260, 150, t, st[0] - .15, '#ffffff'); }
  else if (idx === 1) { crew(ctx, { x: 380, y: G + 200, s: 600, arms: { L: [.3, -.1], R: [1.6, -.4] }, face: { eyes: 'normal', mouth: 'o' } }, 1); specs(ctx, { x: 380, y: G + 200, s: 600 }); rrect(ctx, 620, 860, 260, 180, 10); fillStroke(ctx, '#f6f1e8', 6); for (let i = 0; i < 4; i++) line(ctx, 650, 900 + i * 36, 850, 900 + i * 36, 4, '#8a8a9a'); label(ctx, 'SCIENTISTS', 540, 260, 140, t, st[1] - .15, '#9ad8ff'); }
  else if (idx === 2) { crew(ctx, { x: 340, y: G + 200, s: 600, arms: { L: { ik: [.35, -.45] }, R: { ik: [.4, -.45] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }, 2); rrect(ctx, 460, 560, 160, 130, 10); fillStroke(ctx, '#3a2a1a', 6); circle(ctx, 620, 625, 40); fillStroke(ctx, '#6a6a7a', 6); line(ctx, 500, 690, 470, 1240, 8); line(ctx, 580, 690, 610, 1240, 8); if (Math.sin(t * 4) > .7) burst(ctx, 640, 600, 70, 8, '#ffffff', 2); label(ctx, 'A PHOTOGRAPHER', 540, 260, 110, t, st[2] - .15, '#ffffff'); }
  else if (idx === 3) { for (let i = 0; i < 6; i++) sledDog(ctx, 140 + (i % 3) * 360 + (i > 2 ? 160 : 0), i > 2 ? 1300 : 1080, 300, t + i, i % 2 ? -1 : 1, ['#d8d0c0', '#8a7a6a', '#4a4a4a'][i % 3]); bigNum(ctx, '69', 540, 640, 200, cue(t, st[3] - .15, .3), '#ffd23a'); label(ctx, 'SLED DOGS', 540, 260, 140, t, st[3] - .15, '#ffffff'); }
  else { rrect(ctx, 260, 820, 560, 420, 12); fillStroke(ctx, '#8a6a42', 7); line(ctx, 260, 960, 820, 960, 5, 'rgba(0,0,0,.25)'); const pk = cue(t, st[4], .4); crew(ctx, { x: 540, y: 1200 - pk * 260, s: 420, arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'wide', mouth: 'grin' } }, 3); rrect(ctx, 260, 1000, 560, 240, 12); fillStroke(ctx, '#8a6a42', 7); label(ctx, '+1 STOWAWAY', 540, 260, 130, t, st[4] - .15, '#ffd23a'); }
} });
// [6] Weddell Sea, iciest on Earth
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); openSea(ctx, t, cam, { floes: 14, top: '#9ab8d0', bot: '#eef4f8' }); applyCam(ctx, cam, 1); endShip(ctx, 540, 1080 + Math.sin(t * 2) * 6, 760, {}); for (let i = 0; i < 5; i++) { const r = rng(i + 61); floe(ctx, ((r() * 1300 - t * 40) % 1300 + 1300) % 1300 - 100, 1250 + r() * 300, 110 + r() * 60, r()); }
  label(ctx, 'WEDDELL SEA', 540, 260, 130, t, wt(6, 'weddell') - .2, '#ffffff', wt(6, 'iciest') - .1); label(ctx, 'ICIEST ON EARTH', 540, 260, 110, t, wt(6, 'iciest') - .1, '#9ad8ff');
} });
// [7] Jan 1915: one day from landing, ice closed in
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(7, 'the', 1) - .1 ? 0 : 1;
  if (ph === 0) { seaMap(ctx, t, cam, { out: 1, pack: .3 }); applyCam(ctx, cam, 1); circle(ctx, 640, 1300, 22); ctx.fillStyle = '#4ad06a'; ctx.fill(); text(ctx, 'LANDING', 760, 1290, 34, '#4ad06a', INK, 7); chapterTag(ctx, t, S(7) + .05, 'JANUARY 1915'); label(ctx, '1 DAY AWAY', 540, 260, 140, t, wt(7, 'just') - .2, '#4ad06a'); }
  else { const k = clamp((t - wt(7, 'closed') + .3) / 1.4); openSea(ctx, t, cam, { top: '#9ab8d0', bot: '#eef4f8' }); applyCam(ctx, cam, 1); ctx.fillStyle = ICE; ctx.beginPath(); ctx.moveTo(-200, 900); ctx.lineTo(lerp(-200, 470, k), 900); ctx.lineTo(lerp(-200, 470, k), 2000); ctx.lineTo(-200, 2000); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(1300, 900); ctx.lineTo(lerp(1300, 610, k), 900); ctx.lineTo(lerp(1300, 610, k), 2000); ctx.lineTo(1300, 2000); ctx.closePath(); ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); endShip(ctx, 540, 1080, 760, { sails: false }); for (let i = 0; i < 6; i++) floe(ctx, lerp(-100 + i * 40, 300 + i * 40, k), 1150 + i * 90, 120, i * .1), floe(ctx, lerp(1180 - i * 40, 780 - i * 40, k), 1180 + i * 80, 120, i * .1 + .5); label(ctx, 'ICE CLOSED IN', 540, 260, 124, t, wt(7, 'closed') - .3, '#e0392f'); }
} });
// [8] like an almond in a chocolate bar
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(8, 'like') - .1 ? 0 : 1;
  if (ph === 0) { packIce(ctx, t, cam); applyCam(ctx, cam, 1); endShip(ctx, 540, 980, 700, { sails: false }); crew(ctx, { x: 540, y: G + 220, s: 560, arms: { L: [.3, -.1], R: [2.2, .5] }, face: { eyes: 'half', mouth: 'smirk' } }, 4, .4); label(ctx, 'ONE SAILOR SAID...', 540, 260, 100, t, S(8) + .05, '#ffffff'); }
  else { bgFlat(ctx, '#e8c8a0', '#c89a6a'); applyCam(ctx, cam, 1); rrect(ctx, 140, 620, 800, 520, 24); fillStroke(ctx, '#5a3420', 8); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { rrect(ctx, 170 + c * 192, 650 + r * 160, 170, 140, 14); fillStroke(ctx, '#6a4028', 5); } ctx.beginPath(); ctx.ellipse(540, 880, 70, 40, .3, 0, TAU); fillStroke(ctx, '#e0b070', 6); label(ctx, 'AN ALMOND', 540, 260, 140, t, wt(8, 'almond') - .2, '#ffffff', wt(8, 'chocolate') - .1); label(ctx, 'IN A CHOCOLATE BAR', 540, 260, 92, t, wt(8, 'chocolate') - .1, '#ffd23a'); }
} });
// [9] nine months drifting
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); seaMap(ctx, t, cam, { out: 1, pack: 1, drift: clamp((t - S(9)) / 2.2) * .6 }); applyCam(ctx, cam, 1); bigNum(ctx, '9 MONTHS', 540, 700, 110, cue(t, wt(9, '9') - .2, .3), '#ffffff'); label(ctx, 'DRIFTING', 540, 260, 150, t, wt(9, 'drifted') - .3, '#9ad8ff');
} });
// [10] football on the ice; dogs; winter no sun
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(10, 'trained') - .1 ? 0 : t < wt(10, 'in', 0) - .1 ? 1 : 2;
  if (ph === 0) { packIce(ctx, t, cam); applyCam(ctx, cam, 1); endShip(ctx, 820, 920, 520, { sails: false }); const bx = 540 + Math.sin(t * 2.2) * 260, by = 1180 - Math.abs(Math.sin(t * 4.4)) * 200; football(ctx, bx, by, 34, t); for (let i = 0; i < 4; i++) crew(ctx, { x: 160 + i * 250, y: G + 200, s: 440, flip: i % 2 ? -1 : 1, lean: Math.sin(t * 5 + i) * .1, legs: walk(t + i), arms: { L: [1.4, -.4], R: [1.4, -.4] }, face: { eyes: 'happy', mouth: 'grin' } }, i, .6); label(ctx, 'FOOTBALL', 540, 260, 150, t, wt(10, 'football') - .2, '#ffffff'); }
  else if (ph === 1) { packIce(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) sledDog(ctx, 300 + i * 220 + ((t * 120) % 200), 1160, 260, t + i, 1, ['#d8d0c0', '#8a7a6a', '#4a4a4a'][i]); crew(ctx, { x: 160, y: G + 200, s: 500, arms: { L: [.3, -.1], R: [2.0, .6] }, face: { eyes: 'normal', mouth: 'smile' } }, 1, .6); label(ctx, 'DOG TRAINING', 540, 260, 130, t, wt(10, 'trained') - .2, '#ffffff'); }
  else { packIce(ctx, t, cam, { night: true, aurora: true }); applyCam(ctx, cam, 1); endShip(ctx, 540, 960, 760, { sails: false }); for (let i = 0; i < 4; i++) { circle(ctx, 300 + i * 150, 920, 10); ctx.fillStyle = '#ffd66e'; ctx.fill(); } label(ctx, 'NO SUN FOR MONTHS', 540, 260, 100, t, wt(10, 'sun') - .3, '#9ad8ff'); }
} });
// [11] then the ice began to squeeze
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const k = cue(t, wt(11, 'squeeze') - .3, 1.2); const cam = camA(t, lt, { z: 1.04 + k * .06, dz: 0, shake: k * 8 }); packIce(ctx, t, cam); applyCam(ctx, cam, 1); endShip(ctx, 540, 980, 760, { sails: false });
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(540 + sd * lerp(700, 420, k), 1000); ctx.rotate(sd * -.25 * k); rrect(ctx, -300, -120, 600, 240, 10); fillStroke(ctx, ICE, 7); ctx.restore();}
  for (const sd of [-1, 1]) { const x0 = 540 + sd * 480, x1 = 540 + sd * 330; line(ctx, x0, 700, lerp(x0, x1, k), 700, 14, '#e0392f'); path(ctx, [[lerp(x0, x1, k), 670], [lerp(x0, x1, k) - sd * 40, 700], [lerp(x0, x1, k), 730]]); ctx.fillStyle = '#e0392f'; ctx.fill(); }
  label(ctx, 'SQUEEZE', 540, 260, 160, t, wt(11, 'squeeze') - .3, '#e0392f');
} });
// [12] groaned, cracked, beams bent like bows
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, shake: 9 }); bgFlat(ctx, '#5a4030', '#2a1a12'); applyCam(ctx, cam, 1); const k = cue(t, wt(12, 'bent') - .2, 1.0);
  for (let i = 0; i < 5; i++) { const x = 160 + i * 190; ctx.beginPath(); ctx.moveTo(x, 200); ctx.quadraticCurveTo(x + (i - 2) * 30 + k * 80 * (i % 2 ? 1 : -1), 720, x, 1240); ctx.lineWidth = 60; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 50; ctx.strokeStyle = '#8a5a32'; ctx.stroke(); }
  if (t > wt(12, 'cracked') - .1) for (let i = 0; i < 3; i++) { const x = 250 + i * 290; ctx.beginPath(); ctx.moveTo(x, 500); ctx.lineTo(x + 30, 600); ctx.lineTo(x - 20, 700); ctx.lineTo(x + 20, 800); ctx.lineWidth = 8; ctx.strokeStyle = '#ffffff'; ctx.stroke(); }
  crew(ctx, { x: 540, y: G + 220, s: 520, arms: { L: [2.8, -1.4], R: [2.8, -1.4] }, face: { eyes: 'wide', mouth: 'o' }, sweat: true }, 0, .7);
  label(ctx, 'GROAN...', 540, 260, 140, t, wt(12, 'groaned') - .2, '#ffffff', wt(12, 'cracked') - .1); label(ctx, 'CRACK!', 540, 260, 160, t, wt(12, 'cracked') - .1, '#e0392f', wt(12, 'bent') - .2); label(ctx, 'BENT LIKE BOWS', 540, 260, 110, t, wt(12, 'bent') - .2, '#ffd23a');
} });
// [13] Oct 27 1915: abandon ship
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); packIce(ctx, t, cam, { top: '#7a8ea4', bot: '#d0dce6' }); applyCam(ctx, cam, 1); endShip(ctx, 600, 960, 820, { crush: 1, tilt: .12, sails: false }); const ab = t > wt(13, 'abandon') - .15;
  shack(ctx, { x: 240, y: G + 220, s: 640, arms: ab ? { L: [.3, -.1], R: [1.6, .2] } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'squint', mouth: ab ? 'teeth' : 'flat', look: [1, 0] } }, .5);
  if (ab) for (let i = 0; i < 3; i++) { const k = clamp((t - wt(13, 'abandon') - i * .3) / 1.2); crew(ctx, { x: lerp(640, 900 + i * 40, k), y: lerp(980, G + 220, k), s: 380, legs: walk(t + i), arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'wide', mouth: 'o' } }, i + 1, .5); }
  chapterTag(ctx, t, S(13) + .05, '27 OCTOBER 1915'); label(ctx, 'OCTOBER 27, 1915', 540, 260, 100, t, wt(13, 'october') - .2, '#ffffff', wt(13, 'abandon') - .15); label(ctx, 'ABANDON SHIP', 540, 260, 130, t, wt(13, 'abandon') - .15, '#e0392f');
} });
// [14] a month later, Endurance sank
SHOTS.push({ start: S(14), end: S(15), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); packIce(ctx, t, cam, { top: '#8a9aac', bot: '#dae2ea' }); applyCam(ctx, cam, 1); const k = clamp((t - wt(14, 'sink') + .2) / 1.6);
  ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 1500, 1360); ctx.clip(); endShip(ctx, 600, 960 + k * 700, 760, { crush: 1, tilt: .3 + k * .3, sails: false }); ctx.restore(); ctx.beginPath(); ctx.ellipse(600, 960, 300, 40, 0, 0, TAU); ctx.fillStyle = SEAD; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
  for (let i = 0; i < 4; i++) crew(ctx, { x: 120 + i * 140, y: G + 220, s: 400, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'frown', look: [1, 0] } }, i, .7);
  label(ctx, '1 MONTH LATER', 540, 260, 120, t, S(14) + .05, '#ffffff', wt(14, 'sink') - .2); label(ctx, 'GONE', 540, 260, 170, t, wt(14, 'sink') - .2, '#e0392f');
} });
// [15] 28 men camping on floating ice, far from land
SHOTS.push({ start: S(15), end: S(16), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .02, dz: 0, y: 900 }); openSea(ctx, t, cam, { top: '#8aa0b4', bot: '#e0e8ee' }); applyCam(ctx, cam, 1); floe(ctx, 540, 1180 + Math.sin(t) * 6, 520, .3); for (let i = 0; i < 3; i++) tentP(ctx, 340 + i * 200, 1140, 160); for (let i = 0; i < 5; i++) crew(ctx, { x: 300 + i * 120, y: 1190, s: 200, shadow: false }, i, .7);
  label(ctx, 'CAMPING ON ICE', 540, 260, 120, t, wt(15, 'camping') - .2, '#ffffff', wt(15, 'far') - .1); label(ctx, 'FAR FROM LAND', 540, 260, 120, t, wt(15, 'far') - .1, '#9ad8ff');
} });
// [16] three lifeboats, thin tents, food
SHOTS.push({ start: S(16), end: S(17), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); packIce(ctx, t, cam); applyCam(ctx, cam, 1); const st = [wt(16, 'three'), wt(16, 'few'), wt(16, 'whatever')];
  if (t > st[0] - .2) for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = cue(t, st[0] + i * .2 - .2, .2); lifeboat(ctx, 220 + i * 320, 1000, 300, 0, t, { col: ['#c8b898', '#a8c0c8', '#c8a898'][i] }); ctx.restore(); }
  if (t > st[1] - .2) for (let i = 0; i < 2; i++) tentP(ctx, 320 + i * 440, 1260, 260, '#e8dcc0', Math.sin(t * 6) * .5);
  if (t > st[2] - .2) for (let i = 0; i < 4; i++) { rrect(ctx, 460 + i * 50 - 80, 1300 - (i % 2) * 40, 90, 60, 6); fillStroke(ctx, '#a87a4a', 5); }
  label(ctx, '3 LIFEBOATS', 540, 260, 140, t, st[0] - .2, '#ffffff', st[1] - .2); label(ctx, 'THIN TENTS', 540, 260, 140, t, st[1] - .2, '#ffffff', st[2] - .2); label(ctx, 'SAVED FOOD', 540, 260, 140, t, st[2] - .2, '#ffd23a');
} });
// [17] seals and penguins; eat the dogs
SHOTS.push({ start: S(17), end: S(18), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(17, 'when') - .1 ? 0 : 1; packIce(ctx, t, cam, ph ? { top: '#6a7a8e', bot: '#c8d0d8' } : {}); applyCam(ctx, cam, 1);
  if (ph === 0) { sealA(ctx, 760, 1120, 420, t); for (let i = 0; i < 4; i++) penguin(ctx, 120 + i * 110, 1300, 180, t + i); crew(ctx, { x: 460, y: G + 220, s: 520, arms: { L: [.3, -.1], R: [2.0, .3] }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }, 2, .8); label(ctx, 'SEALS', 540, 260, 150, t, wt(17, 'seals') - .2, '#ffffff', wt(17, 'penguins') - .1); label(ctx, 'PENGUINS', 540, 260, 150, t, wt(17, 'penguins') - .1, '#ffffff'); }
  else { sledDog(ctx, 760, 1180, 320, 0, -1, '#d8d0c0'); crew(ctx, { x: 360, y: G + 220, s: 560, arms: { L: [.3, -.1], R: [1.3, -.4] }, face: { eyes: 'half', mouth: 'frown', look: [1, .3] } }, 0, .9); tint(ctx, '#1a2030', .25); label(ctx, 'FOOD RAN LOW', 540, 260, 120, t, wt(17, 'food') - .2, '#ffffff', wt(17, 'eat') - .2); label(ctx, 'EVEN THE DOGS', 540, 260, 120, t, wt(17, 'eat') - .2, '#e0392f'); }
} });
// [18] five months drifting
SHOTS.push({ start: S(18), end: S(19), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); seaMap(ctx, t, cam, { out: 1, pack: .6, drift: .6 + clamp((t - S(18)) / 2) * .4 }); applyCam(ctx, cam, 1); bigNum(ctx, '5 MONTHS', 540, 700, 110, cue(t, wt(18, '5') - .2, .3), '#ffffff'); label(ctx, 'ON THE ICE', 540, 260, 140, t, wt(18, 'drifted') - .3, '#9ad8ff');
} });
// [19] April 1916: ice breaking under the tents
SHOTS.push({ start: S(19), end: S(20), tr: 'whip', draw(ctx, lt, t) {
  const k = cue(t, wt(19, 'break') - .2, 1.2); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: k * 10 }); packIce(ctx, t, cam, { cracks: k, top: '#8a9aac' }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 2; i++) { ctx.save(); ctx.translate(330 + i * 440, 1180 + (i ? k * 40 : -k * 30)); ctx.rotate((i ? .1 : -.08) * k); tentP(ctx, 0, 0, 240); ctx.restore(); } crew(ctx, { x: 540, y: G + 220, s: 520, arms: { L: [2.8, -1.4], R: [2.8, -1.4] }, face: { eyes: 'wide', mouth: 'o' } }, 1, .9);
  chapterTag(ctx, t, S(19) + .05, 'APRIL 1916'); label(ctx, 'APRIL 1916', 540, 260, 130, t, wt(19, 'april') - .2, '#ffffff', wt(19, 'break') - .2); label(ctx, 'THE ICE BREAKS', 540, 260, 120, t, wt(19, 'break') - .2, '#e0392f');
} });
// [20] jumped into lifeboats, rowed
SHOTS.push({ start: S(20), end: S(21), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); openSea(ctx, t, cam, { floes: 8, top: '#7a8ea4', bot: '#d8e2ea' }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 3; i++) { const x = 220 + i * 320, y = 1100 + (i % 2) * 140; lifeboat(ctx, x, y, 320, 4, t + i, { col: ['#c8b898', '#a8c0c8', '#c8a898'][i] }); const a = Math.sin(t * 5 + i); line(ctx, x - 140, y - 40, x - 200 - a * 40, y + 50, 8, '#8a6a42'); line(ctx, x + 140, y - 40, x + 200 + a * 40, y + 50, 8, '#8a6a42'); }
  label(ctx, 'ROW!', 540, 260, 170, t, wt(20, 'rowed') - .3, '#ffd23a');
} });
// [21] seven days, landed on Elephant Island
SHOTS.push({ start: S(21), end: S(22), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(21, 'they') - .1 ? 0 : 1;
  if (ph === 0) { seaMap(ctx, t, cam, { out: 1, drift: 1, boats: clamp((t - S(21)) / 2) }); applyCam(ctx, cam, 1); bigNum(ctx, '7 DAYS', 540, 700, 120, cue(t, wt(21, '7') - .2, .3), '#ffffff'); }
  else { beachEI(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(21, 'landed')) / 1.2); lifeboat(ctx, lerp(900, 700, k), 980, 300, 3, t, { col: '#c8b898' }); for (let i = 0; i < 3; i++) crew(ctx, { x: 200 + i * 180, y: G + 220, s: 460, arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, i, 1); label(ctx, 'ELEPHANT ISLAND', 540, 260, 110, t, wt(21, 'elephant') - .3, '#ffffff'); }
} });
// [22] first solid ground in 497 days
SHOTS.push({ start: S(22), end: S(23), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .04 }); beachEI(ctx, t, cam); applyCam(ctx, cam, 1); const kneel = { x: 540, y: G + 200, s: 600, lean: .5, arms: { L: { ik: [.3, .1] }, R: { ik: [.4, .05] } }, legs: { L: [1.4, -1.6], R: [1.0, -1.4] }, face: { eyes: 'closed', mouth: 'smile' } }; crew(ctx, kneel, 2, 1);
  const n = Math.round(497 * clamp((t - wt(22, '497') + .4) / 1.2)); bigNum(ctx, `${n} DAYS`, 540, 640, 120, cue(t, wt(22, '497') - .5, .3), '#ffd23a'); label(ctx, 'SOLID GROUND', 540, 260, 130, t, wt(22, 'solid') - .2, '#ffffff');
} });
// [23] nobody would look there
SHOTS.push({ start: S(23), end: S(24), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .02, dz: 0 }); seaMap(ctx, t, cam, {}); applyCam(ctx, cam, 1); ctx.save(); ctx.setLineDash([20, 14]); for (const [a, b] of [[[1000, 200], [1000, 1100]], [[600, 160], [1080, 300]]]) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.stroke(); } ctx.restore(); text(ctx, 'SHIPS', 960, 160, 34, 'rgba(255,255,255,.8)', INK, 0); circle(ctx, 300, 700, 60 + Math.sin(t * 4) * 8); ctx.lineWidth = 8; ctx.strokeStyle = '#e0392f'; ctx.stroke();
  label(ctx, 'NOBODY WILL LOOK', 540, 260, 104, t, wt(23, 'nobody') - .2, '#ffffff', wt(23, 'far') - .1); label(ctx, 'FAR FROM SHIPS', 540, 260, 116, t, wt(23, 'far') - .1, '#e0392f');
} });
// [24] Shackleton decides to get help
SHOTS.push({ start: S(24), end: S(25), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03 + lt * .03, dz: 0 }); beachEI(ctx, t, cam, { top: '#6a7a8e', bot: '#c8d0d8' }); applyCam(ctx, cam, 1); shack(ctx, { x: 540, y: G + 220, s: 760, arms: { L: [.3, -.1], R: [1.5, .2] }, face: { eyes: 'squint', mouth: 'flat' } }, .9);
  label(ctx, 'A DECISION', 540, 260, 140, t, wt(24, 'decision') - .2, '#ffffff', wt(24, 'get') - .2); label(ctx, 'GET HELP', 540, 260, 150, t, wt(24, 'get') - .2, '#ffd23a');
} });
// [25] five men, James Caird, to South Georgia
SHOTS.push({ start: S(25), end: S(26), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(25, 'towards') - .1 ? 0 : 1;
  if (ph === 0) { openSea(ctx, t, cam, { top: '#7a8ea4', bot: '#d8e2ea' }); applyCam(ctx, cam, 1); caird(ctx, 540, 1150, 620, t); for (let i = 0; i < 6; i++) { circle(ctx, 330 + i * 80, 1060, 26); fillStroke(ctx, '#f6f1e8', 4); } label(ctx, '+5 MEN', 540, 260, 150, t, wt(25, 'five') - .2, '#ffffff', wt(25, 'james') - .1); label(ctx, 'THE JAMES CAIRD', 540, 260, 110, t, wt(25, 'james') - .1, '#ffd23a'); text(ctx, '7 METRES', 540, 1330, 50, '#ffffff', INK, 8); }
  else { seaMap(ctx, t, cam, { caird: clamp((t - wt(25, 'towards')) / 1.4) * .3 }); applyCam(ctx, cam, 1); label(ctx, 'TO SOUTH GEORGIA', 540, 260, 104, t, wt(25, 'south') - .3, '#ffffff'); }
} });
// [26] 1,300 km, most dangerous ocean
SHOTS.push({ start: S(26), end: S(27), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(26, 'across') - .1 ? 0 : 1;
  if (ph === 0) { seaMap(ctx, t, cam, { caird: .3, dist: cue(t, wt(26, '1300') - .2, .3) }); applyCam(ctx, cam, 1); label(ctx, '1,300 KM', 540, 260, 150, t, wt(26, '1300') - .2, '#ffd23a'); }
  else { storm(ctx, t, cam, { h: 1 }); applyCam(ctx, cam, 1); caird(ctx, 540, waveY(540, t) + 20, 300, t); label(ctx, 'DEADLIEST OCEAN', 540, 260, 110, t, wt(26, 'dangerous') - .3, '#e0392f'); }
} });
// [27] waves like buildings; ice chipped off by hand
SHOTS.push({ start: S(27), end: S(28), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 6 }); const ph = t < wt(27, 'ice') - .1 ? 0 : 1;
  if (ph === 0) { storm(ctx, t, cam, { h: 1.9 }); applyCam(ctx, cam, 1); caird(ctx, 540, waveY(540, t, 0, 1.9) + 20, 240, t); label(ctx, 'WAVES LIKE BUILDINGS', 540, 260, 92, t, wt(27, 'waves') - .2, '#ffffff'); }
  else { storm(ctx, t, cam, { h: .5 }); applyCam(ctx, cam, 1); caird(ctx, 540, 1000, 640, t, { ice: 1 - .5 * cue(t, wt(27, 'chipped'), 1.4), rock: Math.sin(t * 2) * .06 }); crew(ctx, { x: 420, y: 960, s: 300, shadow: false, arms: { L: [.3, -.1], R: [2.2 + Math.sin(t * 14) * .5, .3] }, face: { eyes: 'squint', mouth: 'teeth' } }, 2, 1); label(ctx, 'ICE ON THE BOAT', 540, 260, 110, t, wt(27, 'ice') - .1, '#9ad8ff', wt(27, 'chipped') - .1); label(ctx, 'CHIP IT OFF', 540, 260, 130, t, wt(27, 'chipped') - .1, '#ffffff'); }
} });
// [28] Worsley, 4 sun sightings, found the island
SHOTS.push({ start: S(28), end: S(29), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(28, 'he', 0) - .1 ? 0 : 1;
  if (ph === 0) { bgFlat(ctx, '#4a5a6a', '#2a3440'); applyCam(ctx, cam, 1); ctx.save(); ctx.globalAlpha = .85; circle(ctx, 840, 420, 70); ctx.fillStyle = '#ffe6a0'; ctx.fill(); ctx.restore(); crew(ctx, { x: 420, y: G + 220, s: 680, arms: { L: { ik: [.35, -.55] }, R: { ik: [.4, -.55] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, -1] } }, 1, 1); sextant(ctx, 560, 640, 120, -.4); for (let i = 0; i < 4; i++) { const on = t > wt(28, 'four') - .2 + i * .15; circle(ctx, 300 + i * 160, 1380, 40); fillStroke(ctx, on ? '#ffd23a' : '#4a5a6a', 6); }
    label(ctx, 'FRANK WORSLEY', 540, 260, 116, t, wt(28, 'frank') - .3, '#ffffff', wt(28, 'four') - .2); label(ctx, 'SUN SEEN 4 TIMES', 540, 260, 104, t, wt(28, 'four') - .2, '#ffd23a'); }
  else { seaMap(ctx, t, cam, { caird: .3 + clamp((t - wt(28, 'found')) / 1.2) * .7 }); applyCam(ctx, cam, 1); label(ctx, 'FOUND IT', 540, 260, 150, t, wt(28, 'found') - .2, '#4ad06a'); }
} });
// [29] 16 days; South Georgia - wrong side
SHOTS.push({ start: S(29), end: S(30), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(29, 'but') - .1 ? 0 : 1;
  if (ph === 0) { beachEI(ctx, t, cam, { top: '#8ab0cc', bot: '#e4eef4' }); applyCam(ctx, cam, 1); caird(ctx, 780, 980, 380, t, { rock: .1 }); for (let i = 0; i < 3; i++) crew(ctx, { x: 160 + i * 170, y: G + 220, s: 420, lean: .1, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'half', mouth: 'smile' } }, i, 1); bigNum(ctx, '16 DAYS', 540, 640, 120, cue(t, wt(29, '16') - .2, .3), '#ffffff'); label(ctx, 'SOUTH GEORGIA', 540, 260, 110, t, wt(29, 'south') - .2, '#4ad06a'); }
  else { bgFlat(ctx, '#3a6a9a', '#24507a'); applyCam(ctx, cam, 1); ctx.beginPath(); ctx.ellipse(540, 900, 460, 160, -.25, 0, TAU); fillStroke(ctx, '#d8d0b0', 8); for (let i = 0; i < 5; i++) { path(ctx, [[260 + i * 120, 960 - i * 30], [320 + i * 120, 820 - i * 30], [380 + i * 120, 960 - i * 30]]); fillStroke(ctx, '#f2f6fa', 5); } circle(ctx, 240, 1060, 20); ctx.fillStyle = '#e0392f'; ctx.fill(); text(ctx, 'THEM', 240, 1130, 40, '#ffffff', INK, 8); circle(ctx, 840, 760, 20); ctx.fillStyle = '#4ad06a'; ctx.fill(); text(ctx, 'HELP', 840, 690, 40, '#ffffff', INK, 8); label(ctx, 'WRONG SIDE', 540, 260, 150, t, wt(29, 'wrong') - .2, '#e0392f'); }
} });
// [30] station on the other side, uncrossed mountains
SHOTS.push({ start: S(30), end: S(31), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); snowPeaks(ctx, t, cam); applyCam(ctx, cam, 1); ctx.fillStyle = '#e8eef4'; ctx.fillRect(-1000, 1000, 3100, 1100); line(ctx, -1000, 1000, 2100, 1000, 6);
  for (let i = 0; i < 3; i++) crew(ctx, { x: 360 + i * 180, y: G + 220, s: 420, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'o', look: [0, -1] } }, i, 1);
  label(ctx, 'OTHER SIDE', 540, 260, 140, t, wt(30, 'other') - .2, '#ffffff', wt(30, 'no') - .1); label(ctx, 'NEVER CROSSED', 540, 260, 124, t, wt(30, 'no') - .1, '#e0392f');
} });
// [31] Shackleton, Worsley, Crean walk; no map, no tent, screws in boots
SHOTS.push({ start: S(31), end: S(32), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(31, 'no') - .1 ? 0 : t < wt(31, 'screws') - .1 ? 1 : 2;
  if (ph < 2) { snowPeaks(ctx, t, cam); applyCam(ctx, cam, 1); ctx.fillStyle = '#f2f6fa'; ctx.fillRect(-1000, 1000, 3100, 1100); line(ctx, -1000, 1000, 2100, 1000, 6); const xs = [260, 520, 780]; const names = ['SHACKLETON', 'WORSLEY', 'CREAN'];
    xs.forEach((x, i) => { const o = { x: x + ((t * 40) % 60), y: G + 220, s: 520, lean: -.08, legs: walk(t + i), arms: { L: [.6, -.3], R: [.2, -.2] }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }; i === 0 ? shack(ctx, o, 1) : crew(ctx, o, i, 1); if (ph === 0) text(ctx, names[i], o.x, 1340, 36, '#3a4a5a', INK, 0); });
    if (ph === 0) label(ctx, '3 MEN WALK', 540, 260, 140, t, wt(31, 'walked') - .3, '#ffffff'); else label(ctx, 'NO MAP. NO TENT.', 540, 260, 110, t, wt(31, 'no') - .1, '#e0392f'); }
  else { bgFlat(ctx, '#d8e4ec', '#a8bccc'); applyCam(ctx, cam, 1); bootScrew(ctx, 540, 1000, 600); label(ctx, 'SCREWS FOR GRIP', 540, 260, 110, t, wt(31, 'screws') - .1, '#ffd23a'); }
} });
// [32] slid down on a coiled rope into the dark
SHOTS.push({ start: S(32), end: S(33), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > wt(32, 'slid') ? 6 : 2 }); slope(ctx, t, cam, { night: true }); applyCam(ctx, cam, 1); const k = clamp((t - wt(32, 'slid') + .1) / 3.0); const x = lerp(100, 1000, k), y = lerp(560, 1400, k) + 1;
  ropeCoil(ctx, x, y + 10, 110); for (let i = 0; i < 3; i++) { const o = { x: x - 60 + i * 60, y: y - 10 + i * 30, s: 300, shadow: false, lean: .9, arms: { L: [2.6, -.3], R: [2.6, -.3] }, face: { eyes: 'wide', mouth: 'o' } }; i === 0 ? shack(ctx, o, 1) : crew(ctx, o, i, 1); }
  for (let i = 0; i < 8; i++) { const r = rng(i + 3); circle(ctx, x - 100 - r() * 200, y - 60 - r() * 160 + 120, 10 + r() * 14); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fill(); }
  label(ctx, 'NIGHT FALLS', 540, 260, 130, t, wt(32, 'night') - .2, '#9ad8ff', wt(32, 'slid') - .1); label(ctx, 'SLIDE!', 540, 260, 170, t, wt(32, 'slid') - .1, '#ffd23a');
} });
// [33] 36 hours; 7 o'clock whistle
SHOTS.push({ start: S(33), end: S(34), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(33, 'they') - .1 ? 0 : 1;
  if (ph === 0) { snowPeaks(ctx, t, cam, { top: '#e8b48a', bot: '#f8e8d8' }); applyCam(ctx, cam, 1); ctx.fillStyle = '#f2f6fa'; ctx.fillRect(-1000, 1000, 3100, 1100); bigNum(ctx, '36 HOURS', 540, 700, 120, cue(t, wt(33, '36') - .2, .3), '#ffffff'); }
  else { station(ctx, t, cam, { whistle: clamp((t - wt(33, 'whistle') + .3) / 1.4) }); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) crew(ctx, { x: 160 + i * 130, y: G + 220, s: 420, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }, i, 1); clockTag && 0; label(ctx, '7:00 WHISTLE', 540, 260, 130, t, wt(33, '7') - .2, '#ffd23a'); }
} });
// [34] walked in filthy; manager didn't recognise him
SHOTS.push({ start: S(34), end: S(35), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); station(ctx, t, cam, { sign: false }); applyCam(ctx, cam, 1); const q = t > wt(34, 'did') - .15;
  for (let i = 0; i < 3; i++) { const o = { x: 200 + i * 150, y: G + 220, s: 480, legs: q ? undefined : walk(t + i), arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }; i === 0 ? shack(ctx, o, 1) : crew(ctx, o, i, 1); ctx.save(); ctx.globalAlpha = .35; for (let k = 0; k < 6; k++) { const r = rng(i * 10 + k); circle(ctx, o.x + (r() - .5) * 80, o.y - r() * 400, 16); ctx.fillStyle = '#3a2a1a'; ctx.fill(); } ctx.restore(); }
  const mo = { x: 840, y: G + 220, s: 560, flip: -1, cols: ['#3a3a4a', '#3a3a4a'], hat: 'none', belt: false, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: q ? 'wide' : 'normal', mouth: q ? 'o' : 'flat', look: [-1, 0] } }; drawStick(ctx, mo); moustache(ctx, mo); if (q) qmark(ctx, 900, 560, 110);
  label(ctx, 'FILTHY. BEARDED.', 540, 260, 110, t, wt(34, 'filthy') - .2, '#ffffff', wt(34, 'did') - .15); label(ctx, 'WHO ARE YOU?', 540, 260, 130, t, wt(34, 'did') - .15, '#ffd23a');
} });
// [35] job not done: 22 men still waiting
SHOTS.push({ start: S(35), end: S(36), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); beachEI(ctx, t, cam, { hut: true, top: '#7a8a9e', bot: '#ccd4dc' }); applyCam(ctx, cam, 1); for (let i = 0; i < 6; i++) crew(ctx, { x: 120 + i * 168, y: G + 220, s: 380, arms: { L: [.3, -.1], R: i === 2 ? [2.7, .3] : [.3, -.1] }, face: { eyes: 'half', mouth: 'flat', look: [0, -1] } }, i, 1);
  bigNum(ctx, '22 MEN', 540, 640, 120, cue(t, wt(35, 'twenty') - .2, .3), '#ffffff'); label(ctx, 'STILL WAITING', 540, 260, 130, t, wt(35, 'waiting') - .3, '#ffd23a');
} });
// [36] three attempts, ice blocked
SHOTS.push({ start: S(36), end: S(37), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); openSea(ctx, t, cam, { floes: 10, top: '#7a8ea4', bot: '#d8e2ea' }); applyCam(ctx, cam, 1); const n = [wt(36, 'tried'), wt(36, 'each'), wt(36, 'blocked')].filter(x => t > x - .1).length;
  steamer(ctx, 400 + Math.sin(t * 3) * 20, 1050, 700, { funnel: '#3a3a3a', lights: 0 }); for (let i = 0; i < 6; i++) floe(ctx, 760 + (i % 3) * 120, 1000 + i * 60, 160, i * .1);
  for (let i = 0; i < 3; i++) { const on = t > wt(36, 'three') - .1 + i * .5; text(ctx, on ? '✗' : '○', 340 + i * 200, 620, 120, on ? '#e0392f' : '#ffffff', INK, 10); }
  label(ctx, '3 ATTEMPTS', 540, 260, 140, t, wt(36, 'tried') - .2, '#ffffff', wt(36, 'blocked') - .2); label(ctx, 'BLOCKED BY ICE', 540, 260, 116, t, wt(36, 'blocked') - .2, '#e0392f');
} });
// [37] fourth try: the Yelcho
SHOTS.push({ start: S(37), end: S(38), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); openSea(ctx, t, cam, { top: '#8ab8dc', bot: '#eaf4fa' }); applyCam(ctx, cam, 1); yelcho(ctx, lerp(300, 620, clamp((t - S(37)) / 4)), 1060, 760, t);
  rrect(ctx, 760, 500, 240, 150, 8); fillStroke(ctx, '#ffffff', 5); ctx.fillStyle = '#d8322c'; ctx.fillRect(760, 575, 240, 75); ctx.fillStyle = '#2a4aa8'; ctx.fillRect(760, 500, 80, 75); circle(ctx, 800, 537, 14); ctx.fillStyle = '#ffffff'; ctx.fill(); rrect(ctx, 760, 500, 240, 150, 8); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke();
  label(ctx, 'ATTEMPT #4', 540, 260, 140, t, wt(37, 'fourth') - .2, '#ffffff', wt(37, 'yelcho') - .2); label(ctx, 'THE YELCHO', 540, 260, 140, t, wt(37, 'yelcho') - .2, '#ffd23a');
} });
// [38] Aug 30 1916: counted men, all alive
SHOTS.push({ start: S(38), end: S(39), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); beachEI(ctx, t, cam, { hut: true, top: '#7ab4e0', bot: '#eaf2f6' }); applyCam(ctx, cam, 1); yelcho(ctx, 860, 930, 300, t, 1); const yay = t > wt(38, 'every') - .1;
  for (let i = 0; i < 7; i++) crew(ctx, { x: 100 + i * 147, y: G + 220, s: 380, lean: yay ? Math.sin(t * 8 + i) * .1 : 0, arms: yay ? { L: [2.6, .3], R: [2.6, .3] } : { L: [.3, -.1], R: [2.0, .4] }, face: { eyes: yay ? 'happy' : 'wide', mouth: yay ? 'grin' : 'o' } }, i, 1);
  if (!yay) { const n = Math.min(22, Math.floor((t - wt(38, 'counted')) * 14) + 1); if (t > wt(38, 'counted')) bigNum(ctx, `${n}`, 540, 660, 160, 1, '#ffffff'); } else bigNum(ctx, '22 / 22', 540, 660, 140, cue(t, wt(38, 'every') - .1, .3), '#4ad06a');
  chapterTag(ctx, t, S(38) + .05, '30 AUGUST 1916'); label(ctx, 'AUGUST 30, 1916', 540, 260, 104, t, wt(38, 'august') - .2, '#ffffff', wt(38, 'every') - .1); label(ctx, 'ALL ALIVE', 540, 260, 150, t, wt(38, 'every') - .1, '#4ad06a');
} });
// [39] 2022: wreck found 3 km deep
SHOTS.push({ start: S(39), end: S(40), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); abyss(ctx, t, cam); applyCam(ctx, cam, 1); const k = cue(t, wt(39, 'found') - .2, 1.0); endShip(ctx, 540, 1280, 860, { sails: false, tilt: .04 }); tint(ctx, '#04101c', .55 * (1 - k * .6)); rov(ctx, 880, 640, 120, t); lightBeam(ctx, 820, 640, 2.4, 700, .3 * k);
  chapterTag(ctx, t, S(39) + .05, '2022'); label(ctx, '2022', 540, 260, 150, t, wt(39, '2022') - .2, '#ffffff', wt(39, 'found') - .2); label(ctx, 'FOUND', 540, 260, 160, t, wt(39, 'found') - .2, '#ffd23a', wt(39, '3') - .2); label(ctx, '3 KM DEEP', 540, 260, 140, t, wt(39, '3') - .2, '#9ad8ff');
} });
// [40] the name still there on the stern
SHOTS.push({ start: S(40), end: S(41), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.05 + lt * .05, dz: 0 }); abyss(ctx, t, cam); applyCam(ctx, cam, 1); rrect(ctx, 80, 700, 920, 520, 30); fillStroke(ctx, '#2a2a30', 8); for (let i = 0; i < 6; i++) line(ctx, 80, 760 + i * 80, 1000, 760 + i * 80, 4, 'rgba(255,255,255,.08)'); text(ctx, 'ENDURANCE', 540, 900, 120, '#e8c860', INK, 0); circle(ctx, 540, 1080, 50); ctx.lineWidth = 10; ctx.strokeStyle = '#c8a040'; ctx.stroke(); lightBeam(ctx, 1080, 600, 2.6, 900, .35);
  label(ctx, 'STILL THERE', 540, 260, 140, t, wt(40, 'still') - .2, '#ffd23a');
} });
// [41] the ship was lost, but not one of her men
SHOTS.push({ start: S(41), end: S(42), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); const ph = t < wt(41, 'but') - .1 ? 0 : 1;
  if (ph === 0) { abyss(ctx, t, cam); applyCam(ctx, cam, 1); endShip(ctx, 540, 1280, 860, { sails: false, tilt: .04 }); tint(ctx, '#04101c', .4); label(ctx, 'SHIP: LOST', 540, 260, 140, t, wt(41, 'lost') - .3, '#9a9aa8'); }
  else { bgFlat(ctx, '#f0c870', '#e08a4a'); applyCam(ctx, cam, 1); for (let i = 0; i < 14; i++) { const x = 80 + (i % 7) * 153, y = i < 7 ? 980 : 1300; const o = { x, y, s: 330, arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'happy', mouth: 'grin' } }; i === 3 ? shack(ctx, o, 1) : crew(ctx, o, i, 1); } label(ctx, 'MEN: 28 / 28', 540, 260, 130, t, wt(41, 'but') - .1, '#ffffff'); }
} });
