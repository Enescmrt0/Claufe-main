const SHOTS = [];
// [0] Einstein died 1955; his brain went missing for 40+ years
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const miss = t > wt(0, 'his') - .1;
  if (!miss) { roomWarm(ctx, t, cam); applyCam(ctx, cam, 1); einstein(ctx, { x: 540, y: G + 200, s: 780, arms: { L: [.3, -.1], R: [1.4, .6] }, face: { eyes: 'happy', mouth: 'smile' } }); chalkboard(ctx, 820, 520, 300, 200, ['E=mc²']); headline(ctx, 220, 560, 300, 'EINSTEIN\nDIES', -.1); chapterTag(ctx, t, .05, 'PRINCETON, 1955'); }
  else { bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } ctx.save(); ctx.setLineDash([24, 18]); drawBrainOutline(ctx, 540, 760, 300); ctx.restore(); qmark(ctx, 540, 760, 260, '#ffffff'); label(ctx, 'MISSING', 540, 260, 140, t, wt(0, 'missing') - .2, '#e0392f', wt(0, 'for') - .1); label(ctx, '40+ YEARS', 540, 260, 140, t, wt(0, 'for') - .1, '#ffffff'); }
} });
function drawBrainOutline(ctx, x, y, s) { ctx.beginPath(); ctx.ellipse(x, y, s, s * .72, 0, 0, TAU); ctx.lineWidth = 14; ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.stroke(); }
// [1] wanted to be cremated so nobody would worship his remains
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); riverScene(ctx, t, cam); applyCam(ctx, cam, 1); urn(ctx, 540, 1100, 360); for (let i = 0; i < 14; i++) { const k = ((t * .3 + i / 14) % 1); circle(ctx, 540 + k * 400 + Math.sin(i + t) * 30, 780 - k * 300 + i * 6, 6 + k * 4); ctx.fillStyle = 'rgba(160,160,170,' + (1 - k) + ')'; ctx.fill(); }
  label(ctx, 'CREMATED', 540, 260, 130, t, wt(1, 'cremated') - .2, '#ffffff', wt(1, 'so') - .1); label(ctx, 'NO SHRINE', 540, 260, 130, t, wt(1, 'worship') - .3, '#ffd23a');
} });
// [2] doctor Thomas Harvey quietly took the brain home
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const took = t > wt(2, 'quietly') - .2; morgue(ctx, t, cam); applyCam(ctx, cam, 1);
  if (!took) { steelTable(ctx, 640, 1180, 600); sheet(ctx, 640, 1150, 520); harvey(ctx, { x: 240, y: G + 180, s: 640, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'normal', mouth: 'flat', look: [1, 0] } }); label(ctx, 'THOMAS HARVEY', 540, 260, 110, t, wt(2, 'thomas') - .2, '#ffffff'); label(ctx, 'AUTOPSY', 540, 260, 130, t, wt(2, 'autopsy') - .3, '#9ad8c8', wt(2, 'thomas') - .2); }
  else { const k = clamp((t - wt(2, 'took')) / 1.4); harvey(ctx, { x: 300 + k * 500, y: G + 180, s: 640, lean: .08, arms: { L: { ik: [.3, -.5] }, R: { ik: [.36, -.55] } }, legs: { L: [.4 * Math.sin(t * 10), -.2], R: [-.4 * Math.sin(t * 10), -.2] }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }); jar(ctx, 300 + k * 500 + .33 * 640, G + 180 - .45 * 640, 200, t); for (let i = 0; i < 3; i++) sweat(ctx, 300 + k * 500 + 60 + i * 30, G + 180 - .95 * 640, 26); label(ctx, 'TOOK IT HOME', 540, 260, 120, t, wt(2, 'took') - .2, '#ff9ab0'); }
} });
// [3] cut into 240 pieces, kept in jars
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); roomWarm(ctx, t, cam, { wall: '#c8d8c8', win: false }); applyCam(ctx, cam, 1); const jars = t > wt(3, 'and') - .1;
  if (!jars) { drawBrain(ctx, 540, 760, 260); const k = clamp((t - wt(3, '240') + .3) / 1.2); for (let i = 1; i < 6; i++) line(ctx, 540 - 300 + i * 100, 480, 540 - 300 + i * 100, 480 + 560 * k, 6, '#ffffff'); for (let i = 1; i < 4; i++) line(ctx, 240, 560 + i * 110, 240 + 600 * k, 560 + i * 110, 6, '#ffffff'); label(ctx, '240 PIECES', 540, 260, 130, t, wt(3, '240') - .2, '#ffd23a'); }
  else { for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const i = r * 4 + c; if ((t - wt(3, 'and')) * 10 < i) continue; jar(ctx, 200 + c * 230, 640 + r * 300, 220, t); } label(ctx, 'IN JARS', 540, 260, 140, t, wt(3, 'jars') - .3, '#e8dc8a'); }
} });
// [4] people found out; he lost his job; but he kept the brain
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const kept = t > wt(4, 'but') - .1;
  if (!kept) { morgue(ctx, t, cam); applyCam(ctx, cam, 1); harvey(ctx, { x: 540, y: G + 200, s: 760, arms: { L: [.3, -.1], R: { ik: [.38, -.4] } }, face: { eyes: 'wide', mouth: 'o' } }); drawBox(ctx, 540 + .38 * 760, G + 200 - .4 * 760 + 60, 220, 140, '#d9a05b', 'DESK'); stamp(ctx, 540, 520, 'FIRED', cue(t, wt(4, 'lost') - .1, .2), '#e0392f', -.12); label(ctx, 'FOUND OUT', 540, 260, 120, t, wt(4, 'found') - .2, '#ffffff'); }
  else { roomWarm(ctx, t, cam); applyCam(ctx, cam, 1); harvey(ctx, { x: 420, y: G + 200, s: 760, arms: { L: { ik: [.25, -.5] }, R: { ik: [.42, -.5] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); jar(ctx, 420 + .38 * 760, G + 200 - .38 * 760, 260, t); drawHeart(ctx, 760, 460, 60); label(ctx, 'KEPT IT', 540, 260, 140, t, wt(4, 'kept') - .2, '#ff9ab0'); }
} });
// [5] moved house with him for decades; sat in a cider box under a beer cooler
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const cider = t > wt(5, 'at') - .1;
  if (!cider) { bgDay(ctx, t, cam, { hills: false }); applyCam(ctx, cam, 1); ctx.fillStyle = '#7ed05a'; ctx.fillRect(-1000, 1100, 3100, 1000); const k = (t - S(5)) * 260; for (let i = 0; i < 3; i++) { rrect(ctx, 60 + i * 400 - (k % 400), 700, 280, 400, 6); fillStroke(ctx, ['#e8c8a0', '#c8d8e8', '#e8d0d8'][i], 6); path(ctx, [[40 + i * 400 - (k % 400), 710], [200 + i * 400 - (k % 400), 580], [360 + i * 400 - (k % 400), 710]]); fillStroke(ctx, '#c85a3a', 6); } oldCar(ctx, 540, 1250, 620, '#3a6a9a'); jar(ctx, 560, 1060, 110, t); label(ctx, 'DECADES', 540, 260, 140, t, wt(5, 'decades') - .2, '#ffffff'); calendarFlip(ctx, 860, 480, 180, 1955 + Math.floor(clamp((t - S(5)) / 1.6) * 30)); }
  else { roomWarm(ctx, t, cam, { wall: '#9a8a7a', floor: '#6a5a4a', win: false }); applyCam(ctx, cam, 1); beerCooler(ctx, 540, 1000, 440, t); ciderBox(ctx, 540, 1230, 380); label(ctx, 'CIDER BOX', 540, 260, 130, t, wt(5, 'cider') - .2, '#ffd23a', wt(5, 'beer') - .2); label(ctx, 'UNDER A BEER COOLER', 540, 260, 84, t, wt(5, 'beer') - .2, '#9ad8ff'); }
} });
function calendarFlip(ctx, x, y, s, yr) { rrect(ctx, x - s / 2, y - s * .6, s, s * 1.1, 12); fillStroke(ctx, '#ffffff', 7); ctx.save(); rrect(ctx, x - s / 2, y - s * .6, s, s * .28, 12); ctx.fillStyle = '#c8322c'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); text(ctx, String(yr), x, y + s * .12, s * .3, INK, INK, 0); }
// [6] scientists found unusual features, nothing explained his genius
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const nope = t > wt(6, 'but') - .1; morgue(ctx, t, cam); applyCam(ctx, cam, 1);
  drawDesk(ctx, 540, G + 40, 820); microscope(ctx, 700, G - 150, 340); harvey(ctx, { x: 260, y: G + 180, s: 600, cols: ['#f6f6f2', '#f6f6f2'], arms: { L: [.3, -.1], R: [1.4, .3] }, face: { eyes: nope ? 'half' : 'wide', mouth: nope ? 'frown' : 'o', look: [1, 0] } });
  if (!nope) { drawBrain(ctx, 820, 560, 140, { glow: .6 }); label(ctx, 'UNUSUAL FEATURES', 540, 260, 96, t, wt(6, 'unusual') - .2, '#9ad8ff'); } else { qmark(ctx, 820, 560, 200, '#ffd23a'); label(ctx, 'GENIUS?', 540, 260, 140, t, wt(6, 'genius') - .3, '#ffd23a'); stamp(ctx, 540, 440, 'NO ANSWER', cue(t, wt(6, 'nothing') - .1, .2), '#e0392f', -.1); }
} });
// [7] 1997: drove across America with the brain in the trunk to meet the granddaughter
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); const meet = t > wt(7, 'to') - .1;
  if (!meet) { desertRoad(ctx, t, cam); applyCam(ctx, cam, 1); const bob = Math.sin(t * 20) * 3; oldCar(ctx, 560, 1250 + bob, 760, '#3a6a9a'); ctx.save(); ctx.translate(290, 1060 + bob); jar(ctx, 0, 0, 130, t); ctx.restore(); chapterTag(ctx, t, S(7) + .05, '1997'); label(ctx, 'ACROSS AMERICA', 540, 260, 110, t, wt(7, 'drove') - .2, '#ffffff', wt(7, 'brain') - .2); label(ctx, 'BRAIN IN THE TRUNK', 540, 260, 96, t, wt(7, 'brain') - .2, '#ff9ab0'); }
  else { roomWarm(ctx, t, cam, { wall: '#f2d8b0' }); applyCam(ctx, cam, 1); harvey(ctx, { x: 300, y: G + 180, s: 620, arms: { L: [.3, -.1], R: { ik: [.4, -.5] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }, true); jar(ctx, 300 + .4 * 620, G + 180 - .45 * 620, 200, t); evelyn(ctx, { x: 820, y: G + 180, s: 600, flip: -1, arms: { L: [.3, -.1], R: [2.4, -1.6] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }); label(ctx, 'GRANDDAUGHTER', 540, 260, 110, t, wt(7, 'granddaughter') - .3, '#c8a8ff'); }
} });
// [8] a year later he finally gave it back
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); morgue(ctx, t, cam); applyCam(ctx, cam, 1); harvey(ctx, { x: 360, y: G + 200, s: 720, arms: { L: [.3, -.1], R: { ik: [.45, -.48] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }, true); harvey(ctx, { x: 820, y: G + 200, s: 700, flip: -1, cols: ['#f6f6f2', '#f6f6f2'], arms: { L: [.3, -.1], R: { ik: [.45, -.48] } }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }); jar(ctx, 590, G + 200 - .4 * 720, 220, t); label(ctx, 'GAVE IT BACK', 540, 260, 120, t, wt(8, 'gave') - .2, '#7ee08a'); chapterTag(ctx, t, S(8) + .05, '1998');
} });
// [9] and his eyes? the eye doctor took them, locked in a New York bank vault
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); const v = t > wt(9, 'and', 1) - .1;
  if (!v) { bgFlat(ctx, '#2a2a3a', '#14141e'); applyCam(ctx, cam, 1); eyeball(ctx, 380, 820, 140, Math.sin(t * 2)); eyeball(ctx, 700, 820, 140, Math.sin(t * 2)); label(ctx, 'HIS EYES?', 540, 300, 140, t, wt(9, 'eyes') - .3, '#9ad8ff'); }
  else { vault(ctx, t, cam); applyCam(ctx, cam, 1); const k = ease(clamp((t - wt(9, 'locked') + .2) / .6)); rrect(ctx, 380, 760 + k * 120, 320, 220, 10); fillStroke(ctx, '#c8c8d0', 7); jar(ctx, 540, 920 + k * 120, 200, t, false); eyeball(ctx, 515, 830 + k * 120, 30, 1); eyeball(ctx, 565, 840 + k * 120, 30, -1); label(ctx, 'BANK VAULT', 540, 260, 130, t, wt(9, 'bank') - .2, '#ffd23a'); label(ctx, 'NEW YORK', 540, 400, 90, t, wt(9, 'new') - .2, '#ffffff'); }
} });
