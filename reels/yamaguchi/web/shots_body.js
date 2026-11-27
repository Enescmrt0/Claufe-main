const SHOTS = [];
// [0] one man survived both atomic bombs
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); bgFlat(ctx, '#3a3a44', '#1a1a22'); applyCam(ctx, cam, 1);
  mushroom(ctx, 230, 1000, 520, 1, t); mushroom(ctx, 850, 1000, 520, 1, t + 2); yama(ctx, { x: 540, y: G + 200, s: 720, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'normal', mouth: 'flat' } });
  label(ctx, 'ONE MAN', 540, 260, 140, t, .05, '#ffffff', wt(0, 'both') - .1); label(ctx, 'BOTH BOMBS', 540, 260, 140, t, wt(0, 'both') - .1, '#ffd23a');
} });
// [1] August 1945, engineer Tsutomu Yamaguchi, Hiroshima, business trip
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(1, 'an') - .1 ? 0 : 1;
  if (p === 0) { japanMap(ctx, t, cam, {}); applyCam(ctx, cam, 1); chapterTag(ctx, t, S(1) + .05, 'AUGUST 1945'); label(ctx, 'AUGUST 1945', 540, 260, 130, t, wt(1, 'august') - .2, '#ffffff'); }
  else { jpTown(ctx, t, cam); applyCam(ctx, cam, 1); yama(ctx, { x: 520, y: G + 200, s: 700, arms: { L: [.3, -.1], R: [.6, -.6] }, face: { eyes: 'normal', mouth: 'smile' } }); rrect(ctx, 610, 1010, 150, 110, 10); fillStroke(ctx, '#6a4a2a', 6); line(ctx, 650, 1010, 650, 980, 8); line(ctx, 720, 1010, 720, 980, 8); line(ctx, 650, 980, 720, 980, 8);
    label(ctx, 'ENGINEER', 540, 260, 140, t, wt(1, 'engineer') - .2, '#ffffff', wt(1, 'tsutomu') - .1); label(ctx, 'TSUTOMU YAMAGUCHI', 540, 260, 92, t, wt(1, 'tsutomu') - .1, '#ffd23a', wt(1, 'hiroshima') - .1); label(ctx, 'IN HIROSHIMA', 540, 260, 120, t, wt(1, 'hiroshima') - .1, '#ffffff'); }
} });
// [2] last day, walking to the shipyard, heard a plane
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); shipyard(ctx, t, cam); applyCam(ctx, cam, 1); const pl = t > wt(2, 'when') - .1;
  if (pl) b29(ctx, lerp(-200, 700, clamp((t - wt(2, 'when')) / 1.6)), 180, 260, t);
  const k = clamp((t - S(2)) / 3); yama(ctx, { x: lerp(260, 520, pl ? .7 : k), y: G + 200, s: 640, lean: pl ? -.05 : 0, arms: pl ? { L: [.3, -.1], R: [.3, -.1] } : POSE.idle.arms, legs: undefined, face: pl ? { eyes: 'wide', mouth: 'o', look: [0, -1] } : { eyes: 'normal', mouth: 'flat', look: [1, 0] } });
  label(ctx, 'LAST DAY', 540, 260, 140, t, wt(2, 'last') - .2, '#ffffff', wt(2, 'heard') - .1); label(ctx, 'A PLANE', 540, 260, 140, t, wt(2, 'heard') - .1, '#ffd23a');
} });
// [3] then a flash brighter than the sun
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const f = cue(t, wt(3, 'flash') - .1, .15); const cam = camA(t, lt, { z: 1.02, dz: .05, shake: f > 0 ? 6 : 1 }); jpTown(ctx, t, cam, { top: '#f8f0d8', bot: '#fffaf0' }); applyCam(ctx, cam, 1);
  drawSun(ctx, 820, 200, 60, t, 1); circle(ctx, 300, 500, 60 + f * 120); ctx.fillStyle = '#ffffff'; ctx.fill();
  flashW(ctx, f * (1 - clamp((t - wt(3, 'flash') - .3) / 1.2) * .6)); label(ctx, 'BRIGHTER THAN THE SUN', 540, 260, 84, t, wt(3, 'brighter') - .2, '#ffd23a');
} });
// [4] 3 km away; thrown to the ground, burned
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > wt(4, 'blast') && t < wt(4, 'burned') ? 14 : 2 }); const p = t < wt(4, 'the', 0) - .1 ? 0 : 1;
  if (p === 0) { japanMap(ctx, t, cam, { h: 1 }); applyCam(ctx, cam, 1); const H = [460, 720]; mushroom(ctx, H[0], H[1], 220, 1, t); distRing(ctx, H[0], H[1], 140, cue(t, wt(4, '3') - .2, .6), '3 KM'); label(ctx, '3 KM AWAY', 540, 260, 140, t, wt(4, '3') - .2, '#ffd23a'); }
  else { jpTown(ctx, t, cam, { top: '#a89880', bot: '#d8c8a8', ground: '#7a7268' }); applyCam(ctx, cam, 1); mushroom(ctx, 260, 1000, 640, 1, t); for (let i = 0; i < 6; i++) { const k = ((t * .6 + i / 6) % 1); ctx.save(); ctx.globalAlpha = .4 * (1 - k); circle(ctx, 1100 - k * 1300, 1000 - i * 40, 50 + k * 60); ctx.fillStyle = '#c8b8a0'; ctx.fill(); ctx.restore(); } const d = cue(t, wt(4, 'threw') - .1, .4);
    drawStick(ctx, { x: 480, y: G + 200 - Math.sin(d * Math.PI) * 120, s: 600, cols: ['#e8e4d8', '#e8e4d8'], hat: 'none', belt: false, lean: d * 1.35, arms: { L: [2.6, -.6], R: [2.6, -.6] }, face: { eyes: 'closed', mouth: 'teeth' } }); label(ctx, 'THROWN DOWN', 540, 260, 120, t, wt(4, 'threw') - .2, '#ffffff', wt(4, 'burned') - .1); label(ctx, 'BURNED', 540, 260, 150, t, wt(4, 'burned') - .1, '#e0392f'); }
} });
// [5] night in a shelter; next day train home
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); const p = t < wt(5, 'next') - .15 ? 0 : 1;
  if (p === 0) { shelterIn(ctx, t, cam); applyCam(ctx, cam, 1); yama(ctx, { x: 540, y: G + 200, s: 620, bandage: true, arms: { L: [.5, -.6], R: [.5, -.6] }, face: { eyes: 'half', mouth: 'flat' } }); label(ctx, 'A SHELTER', 540, 260, 140, t, wt(5, 'shelter') - .3, '#ffffff'); }
  else { trainScene(ctx, t, cam); applyCam(ctx, cam, 1); ctx.save(); ctx.beginPath(); rrect(ctx, 340, 690, 190, 180, 14); ctx.clip(); yama(ctx, { x: 435, y: 1180, s: 460, bandage: true, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }); ctx.restore(); label(ctx, 'TRAIN HOME', 540, 260, 140, t, wt(5, 'train') - .3, '#ffffff'); }
} });
// [6] home was Nagasaki
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.05 + lt * .06, dz: 0 }); japanMap(ctx, t, cam, { route: clamp((t - S(6)) / 1.0), h: 1 }); applyCam(ctx, cam, 1); label(ctx, 'NAGASAKI', 540, 260, 150, t, wt(6, 'nagasaki') - .2, '#e0392f');
} });
// [7] August 9, bandaged, back to work
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); office(ctx, t, cam); applyCam(ctx, cam, 1); deskJ(ctx, 760, G + 40, 460); yama(ctx, { x: 380, y: G + 200, s: 680, bandage: true, arms: { L: [.3, -.1], R: [.4, -.3] }, face: { eyes: 'normal', mouth: 'flat', look: [1, 0] } });
  chapterTag(ctx, t, S(7) + .05, '9 AUGUST 1945'); label(ctx, 'AUGUST 9', 540, 260, 140, t, wt(7, 'august') - .2, '#ffffff', wt(7, 'went') - .1); label(ctx, 'BACK TO WORK', 540, 260, 130, t, wt(7, 'went') - .1, '#ffd23a');
} });
// [8] told his boss; boss: one bomb can't destroy a city
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); office(ctx, t, cam); applyCam(ctx, cam, 1); const b = t > wt(8, 'his', 1) - .1;
  yama(ctx, { x: 300, y: G + 200, s: 640, bandage: true, arms: b ? { L: [.3, -.1], R: [.3, -.1] } : { L: [2.4, -.4], R: [2.6, .4] }, face: { eyes: b ? 'normal' : 'wide', mouth: b ? 'flat' : 'o', look: [1, 0] } });
  boss(ctx, { x: 800, y: G + 200, s: 640, flip: -1, arms: { L: [.3, -.1], R: b ? [2.4, .5] : [.3, -.1] }, face: b ? { eyes: 'squint', mouth: 'smirk', look: [-1, 0] } : { eyes: 'normal', mouth: 'flat', look: [-1, 0] } });
  if (!b) { rrect(ctx, 160, 420, 400, 150, 30); fillStroke(ctx, '#ffffff', 6); text(ctx, 'ONE FLASH...', 360, 495, 50, '#2a2a3a', INK, 0); label(ctx, 'HE TOLD HIS BOSS', 540, 260, 104, t, wt(8, 'told') - .2, '#ffffff'); }
  else { rrect(ctx, 460, 400, 560, 200, 30); fillStroke(ctx, '#ffffff', 6); text(ctx, 'ONE BOMB?', 740, 465, 54, '#2a2a3a', INK, 0); text(ctx, 'IMPOSSIBLE.', 740, 535, 54, '#e0392f', INK, 0); label(ctx, '"IMPOSSIBLE"', 540, 260, 140, t, wt(8, 'one') - .2, '#e0392f'); }
} });
// [9] at that moment, the second bomb over Nagasaki
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const f = cue(t, wt(9, 'exploded') - .1, .15); const cam = camA(t, lt, { z: 1.03, dz: .04, shake: f > 0 ? 12 : 1 }); office(ctx, t, cam, { flash: f }); applyCam(ctx, cam, 1); deskJ(ctx, 540, G + 40, 460);
  yama(ctx, { x: 300, y: G + 200, s: 640, bandage: true, arms: f > 0 ? { L: [2.6, -1.4], R: [2.6, -1.4] } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'o', look: [1, -.5] } }); boss(ctx, { x: 800, y: G + 200, s: 640, flip: -1, arms: f > 0 ? { L: [2.6, -1.4], R: [2.6, -1.4] } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'o', look: [-.5, -.5] } });
  flashW(ctx, f * (1 - clamp((t - wt(9, 'exploded') - .2) / 1.0) * .7)); label(ctx, 'THE SECOND BOMB', 540, 260, 108, t, wt(9, 'second') - .2, '#e0392f');
} });
// [10] again 3 km away; again he survived
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(10, 'and') - .15 ? 0 : 1;
  if (p === 0) { japanMap(ctx, t, cam, { h: 1, n: 1 }); applyCam(ctx, cam, 1); mushroom(ctx, 460, 720, 200, 1, t); mushroom(ctx, 250, 980, 200, 1, t + 1); distRing(ctx, 250, 980, 140, cue(t, wt(10, '3') - .2, .6), '3 KM'); label(ctx, '3 KM. AGAIN.', 540, 260, 130, t, wt(10, '3') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#5a6a7a', '#2a3440'); applyCam(ctx, cam, 1); yama(ctx, { x: 540, y: G + 200, s: 760, bandage: true, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'normal', mouth: 'flat' } }); label(ctx, 'SURVIVED. TWICE.', 540, 260, 116, t, wt(10, 'survived') - .3, '#ffffff'); }
} });
// [11] lived to 93; spoke out against nuclear weapons
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .015, dz: 0 }); bgFlat(ctx, '#e8dcc4', '#b8a888'); applyCam(ctx, cam, 1); const old = { x: 420, y: G + 200, s: 660, cols: ['#4a4a52', '#4a4a52'], arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'normal', mouth: 'flat' } };
  drawStick(ctx, Object.assign({ hat: 'none', belt: false }, old)); greyHair(ctx, old); roundGlasses(ctx, old); podium2(ctx, 720, G + 200, 400); for (let i = 0; i < 4; i++) crane2(ctx, 200 + i * 230, 500 + Math.sin(t + i) * 30, 60, t + i, .9);
  if (t > wt(11, 'speaking') - .2) noNukes(ctx, 820, 640, 90 * backOut(cue(t, wt(11, 'speaking') - .2, .4)));
  label(ctx, 'LIVED TO 93', 540, 260, 140, t, wt(11, '93') - .3, '#ffffff', wt(11, 'speaking') - .2); label(ctx, 'NO MORE BOMBS', 540, 260, 130, t, wt(11, 'speaking') - .2, '#ffd23a');
} });
