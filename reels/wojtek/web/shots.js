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
// [0] 1942: the Polish army enlisted a bear
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); desert(ctx, t, cam); applyCam(ctx, cam, 1);
  for (let i = 0; i < 2; i++) soldierP(ctx, { x: 180 + i * 720, y: G + 160, s: 520, flip: i ? -1 : 1, arms: { L: [.3, -.1], R: [2.9, -.5] }, face: { eyes: 'normal', mouth: 'smile' } }, i);
  bear(ctx, { x: 540, y: G + 180, s: 640, t, cap: 1, arms: [.3, 2.9], mouth: 'smile' });
  chapterTag(ctx, t, .05, '1942'); label(ctx, 'POLISH ARMY', 540, 260, 120, t, wt(0, 'polish') - .2, '#ffffff', wt(0, 'bear') - .1); label(ctx, '+1 BEAR', 540, 260, 150, t, wt(0, 'bear') - .1, '#ffd23a');
} });
// [1] soldiers in Iran buy a cub from a boy; named Wojtek
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); desert(ctx, t, cam, { tents: false }); applyCam(ctx, cam, 1); const named = t > wt(1, 'they') - .1;
  if (!named) { drawStick(ctx, { x: 260, y: G + 180, s: 420, cols: ['#e8d8b0', '#e8d8b0'], hat: 'none', belt: false, arms: { L: [.3, -.1], R: [1.6, -.2] }, face: { eyes: 'normal', mouth: 'smile', look: [1, 0] } }); ctx.save(); ctx.beginPath(); ctx.arc(390, 1130, 70, 0, TAU); ctx.restore(); bear(ctx, { x: 420, y: G + 180, s: 200, pose: 'sit', t, eyes: 'normal', mouth: 'o' }); soldierP(ctx, { x: 760, y: G + 180, s: 560, flip: -1, arms: { L: [.3, -.1], R: [1.5, .1] }, face: { eyes: 'wide', mouth: 'smile' } }, 1); text(ctx, 'IRAN', 540, 500, 70, '#ffffff', INK, 10); label(ctx, 'A TINY CUB', 540, 260, 130, t, wt(1, 'tiny') - .2, '#ffd23a'); }
  else { bear(ctx, { x: 540, y: G + 140, s: 380, pose: 'sit', t, eyes: 'happy', mouth: 'smile' }); for (let i = 0; i < 5; i++) { const a = t * 1.5 + i * TAU / 5; drawHeart(ctx, 540 + Math.cos(a) * 300, 850 + Math.sin(a) * 120, 40); } label(ctx, 'WOJTEK', 540, 260, 160, t, wt(1, 'wojtek') - .3, '#ffd23a', wt(1, 'smiling') - .1); label(ctx, '"SMILING WARRIOR"', 540, 260, 100, t, wt(1, 'smiling') - .1, '#ffffff'); }
} });
// [2] milk from a vodka bottle, later beer
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.05, dz: .05 }); bgFlat(ctx, '#7ac0e8', '#d8eef6'); applyCam(ctx, cam, 1); const beer = t > wt(2, 'later') - .1;
  bear(ctx, { x: 540, y: G + 160, s: beer ? 620 : 560, pose: 'sit', t, eyes: beer ? 'happy' : 'closed', mouth: beer ? 'smile' : 'o' });
  if (!beer) { bottle(ctx, 700, 690, 280, '#cfe8f0', '#ffffff', .75 - lt * .05, -2.0, 'VODKA'); label(ctx, 'MILK', 540, 260, 140, t, wt(2, 'milk') - .2, '#ffffff', wt(2, 'vodka') - .2); label(ctx, 'IN A VODKA BOTTLE', 540, 260, 96, t, wt(2, 'vodka') - .2, '#ffd23a'); }
  else { bottle(ctx, 720, 860, 300, '#8a5a2a', '#e8a830', .8, -.3, 'PIWO'); burst(ctx, 820, 600, 40, 8, '#fff6c0', 3); label(ctx, 'THEN... BEER', 540, 260, 140, t, wt(2, 'later') - .1, '#ffb43a'); }
} });
// [3] wrestled soldiers, ate cigarettes
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03, shake: t < wt(3, 'and') ? 6 : 2 }); desert(ctx, t, cam); applyCam(ctx, cam, 1); const cig = t > wt(3, 'and') - .1;
  if (!cig) { const w = Math.sin(t * 6); bear(ctx, { x: 620, y: G + 180, s: 640, t, lean: -.15 + w * .08, arms: [2.2, 2.2], mouth: 'smile', eyes: 'happy' }); soldierP(ctx, { x: 360, y: G + 180, s: 560, lean: .2 + w * .1, arms: { L: [2.2, .2], R: [2.2, .2] }, face: { eyes: 'squint', mouth: 'teeth' } }, 0); for (let i = 0; i < 3; i++) puff(ctx, 300 + i * 220, G + 160, 70, t, '#e8d8b0', i, .7); label(ctx, 'WRESTLING', 540, 260, 140, t, wt(3, 'wrestled') - .2, '#ffffff'); }
  else { soldierP(ctx, { x: 280, y: G + 180, s: 560, arms: { L: [.3, -.1], R: [1.6, -.4] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }, 2); const k = clamp((t - wt(3, 'ate')) / .4); cigarette(ctx, lerp(440, 640, k), lerp(700, 760, k), 120, 0, 1 - k, t); bear(ctx, { x: 720, y: G + 180, s: 600, t, flip: -1, arms: [.4, 1.4], mouth: k > .9 ? 'smile' : 'o', eyes: k > .9 ? 'happy' : 'normal' }); label(ctx, 'ATE CIGARETTES', 540, 260, 110, t, wt(3, 'cigarettes') - .3, '#ffd23a'); }
} });
// [4] 1944: sail to Italy; no pets allowed
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); dockScene(ctx, t, cam); applyCam(ctx, cam, 1);
  soldierP(ctx, { x: 860, y: G + 160, s: 480, flip: -1, arms: { L: [.3, -.1], R: [2.0, .6] }, face: { eyes: 'squint', mouth: 'frown' } }, 1); officerCap(ctx, { x: 860, y: G + 160, s: 480, flip: -1 });
  bear(ctx, { x: 420, y: G + 170, s: 520, t, pose: 'four', mouth: 'o' }); chapterTag(ctx, t, S(4) + .05, '1944');
  label(ctx, 'TO ITALY', 540, 260, 140, t, wt(4, 'italy') - .3, '#ffffff', wt(4, 'pets') - .2); label(ctx, 'NO PETS', 540, 260, 150, t, wt(4, 'pets') - .2, '#e0392f'); if (t > wt(4, 'not') - .1) banSign(ctx, 420, 700, 160 * backOut(cue(t, wt(4, 'not') - .1, .3)), (c, r) => {});
} });
// [5] so the army made him a soldier: Private Wojtek, name, number, rations
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); bgFlat(ctx, '#8a9a6a', '#5a6a42'); applyCam(ctx, cam, 1);
  const rows = [['RANK', t > wt(5, 'private') - .1 ? 'PRIVATE' : ''], ['NAME', t > wt(5, 'name') - .1 ? 'WOJTEK' : ''], ['NUMBER', t > wt(5, 'number') - .1 ? '#  ✓' : ''], ['RATIONS', t > wt(5, 'rations') - .1 ? 'DOUBLE' : '']];
  paperBook(ctx, 540, 640, 760, 520, rows, backOut(cue(t, S(5), .4)));
  bear(ctx, { x: 540, y: G + 220, s: 520, t, cap: 1, arms: [2.6, .3], mouth: 'smile', eyes: 'normal' }); label(ctx, 'A SOLDIER', 540, 260, 140, t, wt(5, 'soldier') - .2, '#ffd23a', wt(5, 'private') - .1); label(ctx, 'PRIVATE WOJTEK', 540, 260, 110, t, wt(5, 'private') - .1, '#ffffff');
} });
// [6] Monte Cassino: guns needed shells
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .04, shake: 5 }); hillBattle(ctx, t, cam); applyCam(ctx, cam, 1); const fire = ((t - S(6)) % 1.1) / .4;
  howitzer(ctx, 560, G - 60, 560, t, fire); soldierP(ctx, { x: 260, y: G + 160, s: 480, arms: { L: [2.6, -1.4], R: [2.6, -1.4] }, face: { eyes: 'squint', mouth: 'teeth' } }, 0); soldierP(ctx, { x: 880, y: G + 160, s: 460, flip: -1, arms: { L: [.3, -.1], R: [1.6, -.2] }, face: { eyes: 'wide', mouth: 'o' } }, 2);
  chapterTag(ctx, t, S(6) + .05, 'MONTE CASSINO, 1944'); label(ctx, 'NEED SHELLS', 540, 260, 130, t, wt(6, 'needed') - .2, '#ffd23a');
} });
// [7] according to the soldiers, Wojtek carried heavy ammunition crates
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, shake: 3 }); hillBattle(ctx, t, cam); applyCam(ctx, cam, 1); const x = 820 - clamp((t - wt(7, 'carried')) / 2.2) * 360;
  for (let i = 0; i < 3; i++) ammoCrate(ctx, 940 - i * 30, G + 100 - i * 70, 180, 90); bear(ctx, { x, y: G + 180, s: 620, t, flip: -1, walk: true, arms: [2.95, 2.95], mouth: 'smile', eyes: 'happy' }); ammoCrate(ctx, x, G + 180 - 620 * .98, 220, 110, Math.sin(t * 8) * .04);
  soldierP(ctx, { x: 200, y: G + 160, s: 480, arms: { L: [.3, -.1], R: [2.7, .3] }, face: { eyes: 'wide', mouth: 'grin' } }, 1);
  label(ctx, 'SOLDIERS SAY...', 540, 260, 110, t, S(7) + .05, '#ffffff', wt(7, 'carried') - .1); label(ctx, 'AMMO CRATES', 540, 260, 130, t, wt(7, 'carried') - .1, '#ffd23a');
} });
// [8] new unit badge: bear carrying a shell
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .03, dz: 0 }); bgFlat(ctx, '#3a4a2a', '#1a2412'); applyCam(ctx, cam, 1); for (let i = 0; i < 12; i++) { ctx.save(); ctx.globalAlpha = .08; ctx.translate(540, 800); ctx.rotate(i / 12 * TAU + t * .2); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore(); }
  badge22(ctx, 540, 800, 300, t, backOut(cue(t, wt(8, 'badge') - .2, .5))); label(ctx, 'NEW BADGE', 540, 260, 140, t, wt(8, 'badge') - .3, '#ffd23a');
} });
// [9] promoted to corporal
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.05, dz: .04 }); desert(ctx, t, cam, { top: '#4a9ae0', bot: '#f8e8c8' }); applyCam(ctx, cam, 1);
  bear(ctx, { x: 540, y: G + 200, s: 760, t, cap: 'corp', arms: [2.6, .3], mouth: 'smile', eyes: 'happy' }); chevrons(ctx, 380, 760, 110, 2, backOut(cue(t, wt(9, 'corporal') - .2, .4)));
  for (const x of [120, 960]) soldierP(ctx, { x, y: G + 160, s: 440, flip: x > 500 ? -1 : 1, arms: { L: [2.6, -1.4], R: [2.6, -1.4] }, face: { eyes: 'happy', mouth: 'grin' } }, x > 500 ? 1 : 0);
  label(ctx, 'CORPORAL', 540, 260, 150, t, wt(9, 'promoted') - .2, '#ffd23a');
} });
// [10] retired to Edinburgh Zoo
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); zoo(ctx, t, cam, { fence: false }); applyCam(ctx, cam, 1); bear(ctx, { x: 520, y: 1080, s: 520, pose: 'four', t, walk: true, eyes: 'normal', mouth: 'smile' }); line(ctx, -100, 1120, 1200, 1120, 10, '#5a5a5a'); for (let x = -60; x < 1180; x += 70) line(ctx, x, 1120, x, 1250, 8, '#5a5a5a');
  rrect(ctx, 720, 560, 300, 120, 10); fillStroke(ctx, '#2a5a3a', 6); text(ctx, 'EDINBURGH', 870, 600, 40, '#ffffff', INK, 0); text(ctx, 'ZOO', 870, 648, 40, '#ffd23a', INK, 0);
  chapterTag(ctx, t, S(10) + .05, 'SCOTLAND'); label(ctx, 'RETIRED', 540, 260, 150, t, wt(10, 'retired') - .2, '#ffffff');
} });
// [11] old comrades visited, spoke Polish, climbed in to wrestle him
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .015, dz: 0, shake: t > wt(11, 'climbed') ? 4 : 2 }); zoo(ctx, t, cam, { fence: false }); applyCam(ctx, cam, 1); const climb = t > wt(11, 'some') - .1;
  if (!climb) { bear(ctx, { x: 540, y: 1060, s: 600, t, arms: [.4, .4], eyes: 'normal', mouth: 'o' }); line(ctx, -100, 1120, 1200, 1120, 10, '#5a5a5a'); for (let x = -60; x < 1180; x += 70) line(ctx, x, 1120, x, 1250, 8, '#5a5a5a'); for (let i = 0; i < 3; i++) { soldierP(ctx, { x: 200 + i * 340, y: G + 220, s: 460, cols: [['#4a4a52', '#4a4a52'], ['#5a4a3a', '#5a4a3a'], ['#3a4a5a', '#3a4a5a']][i], arms: { L: [.3, -.1], R: [2.6, .2] }, face: { eyes: 'happy', mouth: 'grin' } }, i); greyHair && 0; }
    if (t > wt(11, 'spoke') - .1) { rrect(ctx, 300, 520, 480, 140, 30); fillStroke(ctx, '#ffffff', 6); text(ctx, 'CZEŚĆ, WOJTEK!', 540, 590, 50, '#2a2a6a', INK, 0); } label(ctx, 'OLD COMRADES', 540, 260, 120, t, S(11) + .05, '#ffffff'); }
  else { const w = Math.sin(t * 6); bear(ctx, { x: 600, y: 1080, s: 640, t, lean: -.12 + w * .08, arms: [2.2, 2.2], eyes: 'happy', mouth: 'smile' }); soldierP(ctx, { x: 380, y: 1080, s: 520, cols: ['#4a4a52', '#4a4a52'], lean: .2 + w * .1, arms: { L: [2.2, .2], R: [2.2, .2] }, face: { eyes: 'happy', mouth: 'grin' } }, 0); line(ctx, -100, 1120, 1200, 1120, 10, '#5a5a5a'); for (let x = -60; x < 1180; x += 70) line(ctx, x, 1120, x, 1250, 8, '#5a5a5a'); label(ctx, 'ROUND 2', 540, 260, 150, t, wt(11, 'climbed') - .2, '#ffd23a'); }
} });
