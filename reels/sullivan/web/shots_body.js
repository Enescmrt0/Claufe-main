const SHOTS = [];
const strikes = [wt(2, 'lightning'), wt(3, 'hit'), wt(4, 'hit'), wt(5, 'lightning'), wt(7, 'struck'), wt(8, 'hit'), wt(9, 'hit')];
const nStrike = t => strikes.filter(x => t > x - .05).length;
const zapK = (t, at) => { const k = t - at; return k > 0 && k < .5 ? 1 - k / .5 : 0; };
// [0] one man hit by lightning 7 times
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const z = Math.sin(t * 4.5) > .9 ? 1 : 0; const cam = camA(t, lt, { z: 1.02, dz: .03, shake: z * 10 }); forest(ctx, t, cam, { rain: true, flash: z * .5 }); applyCam(ctx, cam, 1);
  if (z) bolt(ctx, 520, -200, 540, G + 220 - 720, Math.floor(t * 5), 16); roy(ctx, { x: 540, y: G + 220, s: 720, t, arms: z ? { L: [2.6, -.4], R: [2.6, -.4] } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: z ? 'x' : 'normal', mouth: z ? 'teeth' : 'flat' }, smoke: 1 });
  tally(ctx, Math.min(7, Math.floor(t * 2.2)), t); label(ctx, '7 TIMES', 540, 260, 150, t, wt(0, '7') - .2, '#ffd23a', wt(0, 'survived') - .1); label(ctx, 'SURVIVED ALL', 540, 260, 130, t, wt(0, 'survived') - .1, '#4ad06a');
} });
// [1] Roy Sullivan, park ranger in Virginia
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); forest(ctx, t, cam, { top: '#6ab4ec', bot: '#e8f2f0', ground: '#5a8a4a' }); applyCam(ctx, cam, 1); roy(ctx, { x: 540, y: G + 220, s: 760, t, arms: { L: [.3, -.1], R: [2.2, .4] }, face: { eyes: 'happy', mouth: 'smile' } });
  label(ctx, 'ROY SULLIVAN', 540, 260, 130, t, wt(1, 'roy') - .2, '#ffffff', wt(1, 'park') - .1); label(ctx, 'PARK RANGER', 540, 260, 140, t, wt(1, 'park') - .1, '#4ad06a', wt(1, 'virginia') - .1); label(ctx, 'VIRGINIA, USA', 540, 260, 120, t, wt(1, 'virginia') - .1, '#ffffff');
} });
// [2] 1942: lookout tower, leg burned, toenail off
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const s0 = strikes[0], zz = zapK(t, s0); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: zz * 14 }); const ph = t < wt(2, 'it', 0) - .1 ? 0 : 1; forest(ctx, t, cam, { flash: zz * .6 }); applyCam(ctx, cam, 1);
  if (ph === 0) { lookout(ctx, 540, 1000, 760); roy(ctx, { x: 540, y: 1000 - 760 * .7, s: 200, t, shadow: false, arms: { L: [2.6, -.4], R: [2.6, -.4] }, face: { eyes: t > s0 ? 'x' : 'normal', mouth: 'o' }, smoke: t > s0 ? 1 : 0 }); if (zz) bolt(ctx, 500, -200, 540, 1000 - 760 * 1.3, 2, 16); chapterTag(ctx, t, S(2) + .05, '1942'); label(ctx, 'STRIKE #1', 540, 260, 150, t, s0 - .1, '#ffd23a'); }
  else { bgFlat(ctx, '#3a4454', '#1a2030'); applyCam(ctx, cam, 1); ctx.save(); ctx.translate(540, 1000); rrect(ctx, -90, -500, 180, 470, 60); fillStroke(ctx, '#8a9a6a', 7); line(ctx, -20, -480, 10, -60, 18, '#e0392f'); rrect(ctx, -110, -40, 280, 120, 50); fillStroke(ctx, '#f2d8c0', 7); circle(ctx, 130, 10, 34); ctx.save(); ctx.globalAlpha = t > wt(2, 'blew') ? 0 : 1; ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); if (t > wt(2, 'blew')) { const k = clamp((t - wt(2, 'blew')) / .8); ctx.save(); ctx.translate(670 + k * 200, 1010 - k * 400); ctx.rotate(k * 8); ctx.beginPath(); ctx.ellipse(0, 0, 30, 20, 0, 0, TAU); fillStroke(ctx, '#ffffff', 5); ctx.restore(); } label(ctx, 'LEG BURNED', 540, 260, 140, t, wt(2, 'burned') - .2, '#e0392f', wt(2, 'blew') - .1); label(ctx, 'TOENAIL: GONE', 540, 260, 124, t, wt(2, 'blew') - .1, '#ffffff'); }
  tally(ctx, nStrike(t), t);
} });
// [3] 1969: driving truck, eyebrows burned off
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const s1 = strikes[1], zz = zapK(t, s1); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: zz * 14 }); forest(ctx, t, cam, { flash: zz * .6, trees: true }); applyCam(ctx, cam, 1); const ph = t < wt(3, 'burned') - .15 ? 0 : 1;
  if (ph === 0) { truck(ctx, 540, G + 40, 760, t); roy(ctx, { x: 700, y: G - 150, s: 300, shadow: false, t, arms: { L: [1.5, -.2], R: [1.5, -.2] }, face: { eyes: t > s1 ? 'x' : 'normal', mouth: t > s1 ? 'o' : 'flat' } }); if (zz) bolt(ctx, 600, -200, 680, G - 300, 4, 16); chapterTag(ctx, t, S(3) + .05, '1969'); label(ctx, 'STRIKE #2', 540, 260, 150, t, s1 - .1, '#ffd23a'); }
  else { bgFlat(ctx, '#4a5a6a', '#2a3440'); applyCam(ctx, cam, 1); roy(ctx, { x: 540, y: G + 600, s: 1300, t, noBrows: true, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'flat' }, smoke: 1 }); label(ctx, 'NO EYEBROWS', 540, 260, 130, t, wt(3, 'eyebrows') - .3, '#e0392f'); }
  tally(ctx, nStrike(t), t);
} });
// [4] a year later: in his own yard, burned shoulder
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const s2 = strikes[2], zz = zapK(t, s2); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: zz * 14 }); forest(ctx, t, cam, { flash: zz * .6, trees: false, ground: '#6a9a4a' }); applyCam(ctx, cam, 1); yardHouse(ctx, 260, 1000, 420);
  if (zz) bolt(ctx, 640, -200, 620, G + 220 - 640, 6, 16); roy(ctx, { x: 640, y: G + 220, s: 640, t, noBrows: true, arms: t > s2 ? { L: [2.6, -.4], R: [.6, -.3] } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: t > s2 ? 'x' : 'normal', mouth: t > s2 ? 'teeth' : 'smile' }, smoke: t > s2 ? 1 : 0 });
  if (t > wt(4, 'shoulder') - .2) { ctx.save(); ctx.globalAlpha = .8; circle(ctx, 580, G + 220 - 640 * .55, 40); ctx.fillStyle = '#e05a2a'; ctx.fill(); ctx.restore(); }
  chapterTag(ctx, t, S(4) + .05, '1970'); label(ctx, 'IN HIS OWN YARD', 540, 260, 110, t, wt(4, 'own') - .3, '#ffffff', wt(4, 'burned') - .1); label(ctx, 'SHOULDER', 540, 260, 150, t, wt(4, 'burned') - .1, '#e0392f'); tally(ctx, nStrike(t), t);
} });
// [5] 1972: inside ranger station, hair on fire
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const s3 = strikes[3], zz = zapK(t, s3); const cam = camA(t, lt, { z: 1.03, dz: .03, shake: zz * 14 }); stationIn(ctx, t, cam, { flash: zz > 0 }); applyCam(ctx, cam, 1); const fire = cue(t, wt(5, 'set') - .2, .3);
  if (zz) bolt(ctx, 810, 300, 560, G + 220 - 640, 8, 14); roy(ctx, { x: 540, y: G + 220, s: 680, t, fire, noBrows: true, arms: fire ? { L: [2.8, -1.4], R: [2.8, -1.4] } : { L: [.3, -.1], R: [1.4, -.3] }, face: { eyes: fire ? 'wide' : 'normal', mouth: fire ? 'o' : 'flat' } });
  chapterTag(ctx, t, S(5) + .05, '1972'); label(ctx, 'INSIDE!', 540, 260, 150, t, wt(5, 'inside') - .2, '#ffffff', wt(5, 'set') - .2); label(ctx, 'HAIR ON FIRE', 540, 260, 130, t, wt(5, 'set') - .2, '#ff7a2a'); tally(ctx, nStrike(t), t);
} });
// [6] kept a bucket of water in the truck
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); forest(ctx, t, cam, { top: '#7ab4e0', bot: '#e8f0f0', trees: false, ground: '#8a8478' }); applyCam(ctx, cam, 1); truck(ctx, 660, G + 40, 700, t); bucket(ctx, 520, G - 120, 140, 1); roy(ctx, { x: 240, y: G + 220, s: 620, t, noBrows: true, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } });
  label(ctx, 'A BUCKET OF WATER', 540, 260, 96, t, wt(6, 'bucket') - .2, '#9ad8ff', wt(6, 'just') - .1); label(ctx, 'JUST IN CASE', 540, 260, 130, t, wt(6, 'just') - .1, '#ffffff'); tally(ctx, nStrike(t), t);
} });
// [7] 1973: struck again, hair on fire again
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const s4 = strikes[4], zz = zapK(t, s4); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: zz * 14 }); forest(ctx, t, cam, { flash: zz * .6, rain: true }); applyCam(ctx, cam, 1); const fire = t > wt(7, 'hair') - .2; const dump = cue(t, wt(7, 'again', 1) - .1, .5);
  if (zz) bolt(ctx, 520, -200, 540, G + 220 - 680, 9, 16); roy(ctx, { x: 540, y: G + 220, s: 680, t, fire: fire && dump < .6 ? 1 : 0, smoke: dump > .6 ? 1 : 0, noBrows: true, arms: fire ? { L: [2.8, -1.4], R: [2.8, -1.4] } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: t > s4 ? 'wide' : 'normal', mouth: fire ? 'o' : 'flat' } });
  if (dump > 0) { bucket(ctx, 600, 480, 120, 0, 2.6); ctx.save(); ctx.globalAlpha = .7 * (1 - dump * .5); ctx.fillStyle = '#5ab0e8'; ctx.fillRect(470, 500, 140, 300 * dump); ctx.restore(); }
  chapterTag(ctx, t, S(7) + .05, '1973'); label(ctx, 'STRIKE #5', 540, 260, 150, t, s4 - .1, '#ffd23a', wt(7, 'again', 1) - .1); label(ctx, 'AGAIN!', 540, 260, 170, t, wt(7, 'again', 1) - .1, '#ff7a2a'); tally(ctx, nStrike(t), t);
} });
// [8] 1976: on patrol, hurt ankle
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const s5 = strikes[5], zz = zapK(t, s5); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: zz * 14 }); forest(ctx, t, cam, { flash: zz * .6 }); applyCam(ctx, cam, 1); const hurt = t > wt(8, 'hurt') - .2;
  if (zz) bolt(ctx, 520, -200, 560, G + 220 - 640, 11, 16); roy(ctx, { x: 540, y: G + 220, s: 640, t, noBrows: true, lean: hurt ? -.1 : 0, legs: hurt ? { L: [.1, -.04], R: [1.2, -1.4] } : { L: [.1 + Math.sin(t * 6) * .3, -.1], R: [.1 - Math.sin(t * 6) * .3, -.1] }, arms: hurt ? { L: [1.8, .3], R: [1.0, .6] } : { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: hurt ? 'squint' : 'normal', mouth: hurt ? 'teeth' : 'flat' } });
  if (hurt) { ctx.save(); ctx.globalAlpha = .8; circle(ctx, 640, G + 100, 40); ctx.lineWidth = 8; ctx.strokeStyle = '#e0392f'; ctx.stroke(); ctx.restore(); }
  chapterTag(ctx, t, S(8) + .05, '1976'); label(ctx, 'ON PATROL', 540, 260, 150, t, wt(8, 'patrol') - .3, '#ffffff', wt(8, 'hurt') - .2); label(ctx, 'ANKLE', 540, 260, 160, t, wt(8, 'hurt') - .2, '#e0392f'); tally(ctx, nStrike(t), t);
} });
// [9] 1977: fishing; bear steals fish; hit it with a stick
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const s6 = strikes[6], zz = zapK(t, s6); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: zz * 14 }); pond(ctx, t, cam, { flash: zz * .6 }); applyCam(ctx, cam, 1); const br = t > wt(9, 'then') - .15, sw = t > wt(9, 'he', 1) - .1;
  if (zz) bolt(ctx, 320, -200, 300, G + 220 - 600, 13, 16);
  if (br) { const k = cue(t, wt(9, 'bear') - .3, .8); bear(ctx, { x: lerp(1200, 820, k), y: G + 200, s: 640, t, flip: -1, arms: [2.0, 1.2], mouth: sw ? 'o' : 'smile', eyes: sw ? 'closed' : 'normal', lean: sw ? .15 : 0 }); fish(ctx, lerp(1000, 700, k), 900, 120, .3); }
  roy(ctx, { x: 300, y: G + 220, s: 600, t, noBrows: true, fire: t > s6 && t < s6 + 1.2 ? 1 : 0, smoke: t > s6 + 1.2 ? 1 : 0, arms: sw ? { L: [.3, -.1], R: [2.4 - Math.sin(t * 12) * .8, .3] } : { L: { ik: [.4, -.2] }, R: { ik: [.45, -.25] } }, face: { eyes: sw ? 'squint' : t > s6 ? 'x' : 'normal', mouth: sw ? 'teeth' : 'flat', look: [1, 0] } });
  if (sw) { const a = -1.2 + Math.sin(t * 12) * .6; line(ctx, 420, 760, 420 + Math.cos(a) * 300, 760 + Math.sin(a) * 300, 14, '#6a4a2a'); } else rod(ctx, 400, 860, 420, -.6, [820, 1240]);
  chapterTag(ctx, t, S(9) + .05, '1977'); label(ctx, 'FISHING', 540, 260, 150, t, wt(9, 'fishing') - .3, '#ffffff', wt(9, 'bear') - .2); label(ctx, 'A BEAR?!', 540, 260, 160, t, wt(9, 'bear') - .2, '#ffd23a', wt(9, 'he', 1) - .1); label(ctx, 'BONK', 540, 260, 170, t, wt(9, 'he', 1) - .1, '#e0392f'); tally(ctx, nStrike(t), t);
} });
// [10] people avoided him during storms
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); forest(ctx, t, cam, { rain: true, trees: false, ground: '#6a7a5a' }); applyCam(ctx, cam, 1); const k = clamp((t - wt(10, 'avoiding') + .2) / 1.0);
  roy(ctx, { x: 540, y: G + 220, s: 600, t, noBrows: true, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'half', mouth: 'flat' } }); for (let i = 0; i < 4; i++) { const sd = i < 2 ? -1 : 1, o = { x: 540 + sd * (220 + (i % 2) * 140) + sd * k * 400, y: G + 220, s: 460, flip: sd, cols: [['#8a4a3a', '#8a4a3a'], ['#3a5a7a', '#3a5a7a'], ['#5a6a3a', '#5a6a3a'], ['#7a5a7a', '#7a5a7a']][i], hat: 'none', belt: false, lean: sd * .15, legs: { L: [.1 + Math.sin(t * 8 + i) * .4, -.1], R: [.1 - Math.sin(t * 8 + i) * .4, -.1] }, arms: { L: [2.6, -.4], R: [2.6, -.4] }, face: { eyes: 'wide', mouth: 'o', look: [-sd, 0] } }; drawStick(ctx, o); }
  label(ctx, 'STAY AWAY', 540, 260, 150, t, wt(10, 'avoiding') - .2, '#ffffff');
} });
// [11] world record; burned hats on display
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); bgFlat(ctx, '#2a2a3a', '#14141e'); applyCam(ctx, cam, 1); const ph = t < wt(11, 'and') - .1 ? 0 : 1; tally(ctx, 7, t, 560);
  if (ph === 0) { ctx.save(); ctx.translate(540, 1000); path(ctx, [[-160, -260], [160, -260], [120, -60], [-120, -60]]); fillStroke(ctx, '#ffd23a', 8); rrect(ctx, -40, -60, 80, 120, 6); fillStroke(ctx, '#e8c030', 7); rrect(ctx, -140, 60, 280, 60, 10); fillStroke(ctx, '#5a3a22', 7); ctx.restore(); label(ctx, 'WORLD RECORD', 540, 260, 130, t, wt(11, 'world') - .3, '#ffd23a'); }
  else { displayCase(ctx, 540, 1200, 760, 460); bigHat(ctx, 360, 1080, 560); bigHat(ctx, 720, 1080, 560); label(ctx, 'BURNED HATS', 540, 260, 140, t, wt(11, 'burned') - .3, '#ffffff'); }
} });
