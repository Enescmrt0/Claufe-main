const SHOTS = [];
// [0] 1807: Napoleon was defeated. By rabbits.
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const r = t > wt(0, 'by') - .1;
  if (!r) { campField(ctx, t, cam); applyCam(ctx, cam, 1); flagFR(ctx, 820, 420, 170, t); napoleon(ctx, { x: 460, y: G + 200, s: 760, arms: POSE.hips.arms, face: { eyes: 'squint', mouth: 'smirk' } }); stamp(ctx, 540, 520, 'DEFEATED', cue(t, wt(0, 'defeated') - .1, .2), '#e0392f', -.12); chapterTag(ctx, t, .05, '1807'); }
  else { bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } rabbit(ctx, 540, G - 40, 3.2, t, { happy: true }); label(ctx, 'BY RABBITS', 540, 260, 140, t, wt(0, 'rabbits') - .2, '#ffffff'); }
} });
// [1] just signed a peace treaty; celebrate with a rabbit hunt
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const hunt = t > wt(1, 'and') - .1;
  if (!hunt) { campField(ctx, t, cam); applyCam(ctx, cam, 1); drawDesk(ctx, 540, G + 40, 640); napoleon(ctx, { x: 540, y: G + 60, s: 560, shadow: false, arms: { L: [.3, -.1], R: { ik: [.3, -.32] } }, face: { eyes: 'happy', mouth: 'smile', look: [0, 1] } }); drawDesk(ctx, 540, G + 40, 640); treaty(ctx, 480, G - 280, 240, -.1); label(ctx, 'PEACE TREATY', 540, 260, 120, t, wt(1, 'peace') - .2, '#ffffff'); }
  else { meadow(ctx, t, cam); applyCam(ctx, cam, 1); napoleon(ctx, { x: 360, y: G + 200, s: 680, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); musketR(ctx, 360 + .26 * 680, G + 200 - .7 * 680, 380, -1.1); rabbit(ctx, 820, G + 40, 1.3, t, { hop: (t * 1.5) % 1 }); label(ctx, 'RABBIT HUNT!', 540, 260, 130, t, wt(1, 'rabbit') - .2, '#ffd23a'); }
} });
// [2] Berthier gathered hundreds of rabbits; some accounts say up to 3,000
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const many = t > wt(2, 'some') - .1;
  if (!many) { meadow(ctx, t, cam); applyCam(ctx, cam, 1); berthier(ctx, { x: 320, y: G + 200, s: 680, arms: { L: [.3, -.1], R: [1.6, .4] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); for (let i = 0; i < 3; i++) cage(ctx, 680 + (i % 2) * 180, G - 20 - Math.floor(i / 2) * 140, 200); for (let i = 0; i < 4; i++) rabbit(ctx, 640 + i * 90, G - 60 - (i % 2) * 140, .9, t, { col: bunnyCol(i) }); label(ctx, 'BERTHIER', 540, 260, 130, t, wt(2, 'louis') - .2, '#ffffff', wt(2, 'hundreds') - .2); label(ctx, 'HUNDREDS', 540, 260, 140, t, wt(2, 'hundreds') - .2, '#ffd23a'); }
  else { meadow(ctx, t, cam); applyCam(ctx, cam, 1); for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) cage(ctx, 120 + c * 170, 1000 + r * 110, 140); for (let i = 0; i < 10; i++) rabbit(ctx, 100 + i * 100, 1500, .6, t, { col: bunnyCol(i), hop: (t * 2 + i * .3) % 1 }); const n = Math.round(lerp(300, 3000, clamp((t - wt(2, '3000') + .4) / .8))); label(ctx, 'UP TO ' + n.toLocaleString('en-US'), 540, 260, 120, t, wt(2, 'some') - .1, '#ffffff'); }
} });
// [3] the hunters lined up; the cages opened
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); meadow(ctx, t, cam); applyCam(ctx, cam, 1); const op = clamp((t - wt(3, 'opened') + .3) / .4);
  for (let i = 0; i < 4; i++) cage(ctx, 640 + (i % 2) * 220, G - 10 - Math.floor(i / 2) * 150, 200, op);
  for (let i = 0; i < 3; i++) { hunter(ctx, { x: 120 + i * 150, y: G + 200, s: 480, arms: { L: { ik: [.32, -.56] }, R: { ik: [.12, -.55] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }, i); musketR(ctx, 120 + i * 150 + .05 * 480, G + 200 - .58 * 480, 260, -.1); }
  label(ctx, 'HUNTERS READY', 540, 260, 110, t, wt(3, 'hunters') - .2, '#ffffff', wt(3, 'cages') - .2); label(ctx, 'OPEN!', 540, 260, 150, t, wt(3, 'cages') - .2, '#ffd23a');
} });
// [4] the rabbits didn't run away; they ran straight at Napoleon
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); meadow(ctx, t, cam); applyCam(ctx, cam, 1); const at = t > wt(4, 'they') - .1;
  if (!at) { for (let i = 0; i < 6; i++) rabbit(ctx, 380 + i * 110, G + 40 + (i % 2) * 50, .9, t, { col: bunnyCol(i), flip: -1 }); napoleon(ctx, { x: 160, y: G + 200, s: 520, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'normal', mouth: 'flat', look: [1, 0] } }); qmark(ctx, 820, 560, 120, '#ffffff'); label(ctx, "DIDN'T RUN", 540, 260, 130, t, wt(4, 'didnt') - .2, '#ffffff'); }
  else { const k = clamp((t - wt(4, 'they')) / 1.4); horde(ctx, t, 26, 900, G + 60, 400, 300, G + 120, k, 1.05); napoleon(ctx, { x: 220, y: G + 200, s: 640, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }); label(ctx, 'AT NAPOLEON!', 540, 260, 130, t, wt(4, 'straight') - .2, '#e0392f'); }
} });
// [5] hundreds swarmed his legs, climbing up his coat
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05, shake: 5 }); meadow(ctx, t, cam); applyCam(ctx, cam, 1); const nx = 540, ny = G + 220, s = 780;
  napoleon(ctx, { x: nx, y: ny, s, lean: Math.sin(t * 9) * .06, arms: { L: [2.6, Math.sin(t * 12) * .3], R: [2.4, .3] }, legs: { L: [.3 * Math.sin(t * 14), -.2], R: [-.3 * Math.sin(t * 14), -.2] }, face: { eyes: 'x', mouth: 'teeth' }, sweat: true });
  for (let i = 0; i < 14; i++) { const r = rng(i + 9); rabbit(ctx, nx - 300 + r() * 600, ny - 10 + r() * 40, 1.05, t, { hop: (t * 2.5 + r()) % 1, col: bunnyCol(i), flip: r() > .5 ? 1 : -1, happy: true }); }
  const climb = clamp((t - wt(5, 'climbing') + .2) / 1); for (let i = 0; i < 4; i++) { const yy = ny - lerp(.1, .45 + i * .06, climb) * s; rabbit(ctx, nx + (i % 2 ? 60 : -60), yy, .8, t, { col: bunnyCol(i + 2), tilt: i % 2 ? -1.2 : 1.2, flip: i % 2 ? -1 : 1, happy: true }); }
  label(ctx, 'SWARMED', 540, 260, 140, t, wt(5, 'swarmed') - .2, '#ffffff', wt(5, 'climbing') - .2); label(ctx, 'CLIMBING HIS COAT', 540, 260, 100, t, wt(5, 'climbing') - .2, '#ffd23a');
} });
// [6] his men tried to chase them off with whips and sticks
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 3 }); meadow(ctx, t, cam); applyCam(ctx, cam, 1);
  for (let i = 0; i < 3; i++) { const x = 200 + i * 340; hunter(ctx, { x, y: G + 200, s: 540, lean: Math.sin(t * 10 + i) * .1, arms: { L: [.3, -.1], R: [2.2 + Math.sin(t * 12 + i) * .6, .3] }, face: { eyes: 'angry' === 'x' ? 'x' : 'squint', mouth: 'teeth' } }, i); whip(ctx, x + .2 * 540, G + 200 - .9 * 540, 300, t + i); }
  for (let i = 0; i < 12; i++) { const r = rng(i + 30); rabbit(ctx, ((r() * 1200 + t * 120 * (r() > .5 ? 1 : -1)) % 1200 + 1200) % 1200 - 60, G + 40 + r() * 200, .75, t, { hop: (t * 2.4 + r()) % 1, col: bunnyCol(i), flip: r() > .5 ? 1 : -1, happy: true }); }
  label(ctx, 'WHIPS & STICKS', 540, 260, 110, t, wt(6, 'whips') - .2, '#ffffff');
} });
// [7] nothing worked; the emperor retreated to his carriage
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); meadow(ctx, t, cam); applyCam(ctx, cam, 1); const ret = t > wt(7, 'the') - .1;
  if (!ret) { stamp(ctx, 540, 520, 'NOTHING WORKED', cue(t, wt(7, 'nothing') - .1, .2), '#e0392f', -.12); horde(ctx, t, 18, 540, G + 120, 900, 540, G + 120, 0, .75); hunter(ctx, { x: 540, y: G + 220, s: 600, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'x', mouth: 'o' } }, 1); }
  else { impCarriage(ctx, 800, G + 60, 520, t); const k = clamp((t - wt(7, 'retreated') + .2) / 1.2); napoleon(ctx, { x: lerp(200, 700, k), y: G + 200, s: 520, lean: .25, arms: { L: [2.6, .2], R: [2.6, .2] }, legs: { L: [.7 * Math.sin(t * 16), -.4], R: [-.7 * Math.sin(t * 16), -.4] }, face: { eyes: 'wide', mouth: 'teeth' }, sweat: true }); horde(ctx, t, 14, -100, G + 120, 300, lerp(100, 600, k), G + 120, clamp(k * 1.2), .7); label(ctx, 'RETREAT!', 540, 260, 140, t, wt(7, 'retreated') - .2, '#ffd23a'); }
} });
// [8] rabbits split into two groups, surrounded the carriage, some jumped inside
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); meadow(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(8, 'split') + .1) / 1.6); impCarriage(ctx, 540, G + 40, 620, t, { shake: t > wt(8, 'jumped') ? 4 : 1, door: clamp((t - wt(8, 'jumped') + .2) / .3) });
  horde(ctx, t, 12, 540, G + 300, 200, 160, G + 140, k, .75); horde(ctx, t, 12, 540, G + 300, 200, 920, G + 140, k, .75);
  if (t > wt(8, 'jumped') - .2) for (let i = 0; i < 3; i++) { const kk = clamp((t - wt(8, 'jumped') - i * .2) / .5); rabbit(ctx, lerp(700, 580 + i * 30, kk), G - 60 - Math.sin(kk * Math.PI) * 220 - kk * 180, .6, t, { col: bunnyCol(i), flip: -1, happy: true }); }
  label(ctx, 'TWO GROUPS', 540, 260, 130, t, wt(8, 'split') - .2, '#ffffff', wt(8, 'surrounded') - .2); label(ctx, 'SURROUNDED', 540, 260, 130, t, wt(8, 'surrounded') - .2, '#e0392f', wt(8, 'jumped') - .2); label(ctx, 'INSIDE!', 540, 260, 150, t, wt(8, 'jumped') - .2, '#ffd23a');
} });
// [9] why? Berthier bought tame rabbits from farmers; they thought Napoleon brought dinner
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const din = t > wt(9, 'they') - .1;
  if (!din) { meadow(ctx, t, cam, { top: '#f2c28a', bot: '#f8e8c8' }); applyCam(ctx, cam, 1); hutch(ctx, 800, G - 10, 300); farmer2(ctx, { x: 560, y: G + 200, s: 600, flip: -1, arms: { L: [.3, -.1], R: { ik: [.42, -.5] } }, face: { eyes: 'happy', mouth: 'grin', look: [-1, 0] } }); berthier(ctx, { x: 200, y: G + 200, s: 600, arms: { L: [.3, -.1], R: { ik: [.42, -.5] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); coins(ctx, 380, G - 120, 140); rabbit(ctx, 800, G - 60, .7, t, {}); qmark(ctx, 540, 380, 110, '#ffffff'); label(ctx, 'TAME RABBITS', 540, 260, 120, t, wt(9, 'tame') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#ff9ab0', '#e05a8a'); applyCam(ctx, cam, 1); thought(ctx, 700, 560, 300, 420, 900); lettuce(ctx, 700, 620, 160); rabbit(ctx, 360, G + 40, 2.2, t, { happy: true, hop: (t * 1.4) % 1 }); for (let i = 0; i < 3; i++) drawHeart(ctx, 260 + i * 120, 820 + Math.sin(t * 4 + i) * 20, 40); label(ctx, 'DINNER?!', 540, 260, 150, t, wt(9, 'dinner') - .3, '#ffffff'); }
} });
// [10] the man who conquered half of Europe, chased off the field by bunnies; per one of his generals
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(10, 'chased') - .1 ? 0 : t < wt(10, 'at') - .1 ? 1 : 2;
  if (p === 0) { bgFlat(ctx, '#2a4aa8', '#12245a'); applyCam(ctx, cam, 1); napoleon(ctx, { x: 540, y: G + 220, s: 820, arms: POSE.hips.arms, face: { eyes: 'squint', mouth: 'smug' } }); label(ctx, 'HALF OF EUROPE', 540, 260, 110, t, wt(10, 'conquered') - .2, '#ffd23a'); }
  else if (p === 1) { meadow(ctx, t, cam); applyCam(ctx, cam, 1); const k = (t - wt(10, 'chased')) * 260; impCarriage(ctx, 600 + k, G + 60, 520, t, { spin: t * 10 }); horde(ctx, t, 20, 100, G + 160, 300, 600 + k - 300, G + 160, 1, .75); label(ctx, 'BY BUNNIES', 540, 260, 140, t, wt(10, 'bunnies') - .3, '#ff9ab0'); }
  else { bgFlat(ctx, '#f2e6c8', '#d8c090'); applyCam(ctx, cam, 1); rrect(ctx, 300, 560, 480, 620, 10); fillStroke(ctx, '#7a2a2a', 8); rrect(ctx, 340, 600, 400, 540, 6); fillStroke(ctx, '#f6f0dc', 5); text(ctx, 'MEMOIRS', 540, 680, 54, '#3a2a1a', INK, 0); for (let i = 0; i < 6; i++) line(ctx, 380, 760 + i * 60, 700, 760 + i * 60, 4, '#a8a090'); rabbit(ctx, 820, G + 40, 1.1, t, { happy: true }); }
} });
