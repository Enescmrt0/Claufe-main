// ---------- "The puzzle that made professors look silly" (Monty Hall, portrait Short) ----------
// Shots are keyed to sentences of script.json; cues come from the word timings (web/words.js).
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const MAR = { cols: PAL.purple, hat: 'none', belt: false };
const HOST = { cols: ['#22232a', '#22232a'], hat: 'none', belt: false };
const PLAYER = { cols: PAL.red, hat: 'none', belt: false };
const PROF = { cols: ['#3a3d44', '#3a3d44'], hat: 'none', belt: false };
const ERD = { cols: ['#6a5a4a', '#6a5a4a'], hat: 'none', belt: false };
function marilyn(ctx, o) { drawStick(ctx, C(MAR, o)); hairBun(ctx, o, '#c98a3a'); }
function host(ctx, o) { drawStick(ctx, C(HOST, o)); bowtie(ctx, o); }
function prof(ctx, o) { drawStick(ctx, C(PROF, o)); mortarboard(ctx, o); }
function erdos(ctx, o) { drawStick(ctx, C(ERD, o)); greyHair(ctx, o); specs(ctx, o); }
const DX = [270, 540, 810], DY = 1180, DW = 220, DH = 400;   // the three doors on stage
const BEHIND = ['goat', 'car', 'goat'];

const SHOTS = [];
// [0a] 1990: a woman answers a puzzle in a magazine
SHOTS.push({ start: S(0), end: wt(0, 'and') - .05, tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  drawDesk(ctx, 540, GY + 40, 640);
  const o = { x: 380, y: GY + 120, s: 640, arms: { L: [.3, -.1], R: { ik: [.3, -.5] } }, face: { eyes: 'normal', look: [1, .6], mouth: 'smile' } };
  marilyn(ctx, o);
  magazine(ctx, 700, GY - 160, 300 * backOut(cue(t, wt(0, 'magazine') - .1, .3)), -.08);
  chapterTag(ctx, t, .05, '1990');
  label(ctx, 'GAME SHOW PUZZLE', 540, 330, 76, t, wt(0, 'game'), '#ffd23a');
} });
// [0b] about ten thousand people wrote in to tell her she was wrong
SHOTS.push({ start: wt(0, 'and') - .05, end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03, shake: 4 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const pile = clamp((t - wt(0, 'ten')) / 2.0);
  const o = { x: 540, y: GY + 300, s: 600, arms: POSE.handsUp.arms, face: { eyes: 'wide', mouth: 'o', browUp: 1 } };
  marilyn(ctx, o);
  const R = rng(3);
  for (let i = 0; i < 46; i++) { const sp = .7 + R() * .6, x0 = R() * 1080, ph = ((t - wt(0, 'and')) * sp + R()) % 1.4; if (t < wt(0, 'about')) break; envelope(ctx, x0 + Math.sin(t * 2 + i) * 30, -100 + ph * 1500, 70 + R() * 30, R() * 6 + t * (R() - .5) * 2); }
  for (let i = 0; i < Math.floor(pile * 30); i++) { const R2 = rng(i + 10); envelope(ctx, 200 + R2() * 680, GY + 140 - (i % 10) * 18 - Math.floor(i / 10) * 12, 90, (R2() - .5) * .8); }
  label(ctx, '10,000 LETTERS', 540, 300, 92, t, wt(0, 'ten'), '#ffffff');
  label(ctx, 'WRONG!', 540, 430, 110, t, wt(0, 'wrong'), '#ff5a4a');
} });
// [1] her name was Marilyn vos Savant; the puzzle went like this
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .03, y: 900 }); bgFlat(ctx, '#7a4bc4', '#4a2c86'); applyCam(ctx, cam, 1);
  const o = { x: 540, y: GY + 160, s: 820, arms: { L: [.9, -2.2], R: [.9, -2.2] }, face: { eyes: 'normal', mouth: 'smirk' } };
  marilyn(ctx, o);
  label(ctx, 'MARILYN', 540, 300, 110, t, wt(1, 'marilyn'), '#ffd23a');
  label(ctx, 'VOS SAVANT', 540, 420, 86, t, wt(1, 'vos'), '#ffffff');
  for (let i = 0; i < 3; i++) star5(ctx, 200 + i * 340, 600 + Math.sin(t * 3 + i) * 15, 26, t + i);
} });
// [2] three doors: one car, two goats
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); stage(ctx, t, cam);
  const xr = [0, 1, 2].map(i => i === 1 ? cue(t, wt(2, 'car') - .1, .25) * (1 - cue(t, wt(2, 'goats') + .9, .3)) : cue(t, wt(2, 'goats') - .15, .25) * (1 - cue(t, LN[2].e + .4, .3)));
  for (let i = 0; i < 3; i++) { const pop = backOut(cue(t, wt(2, 'three') + i * .12 - .2, .3)); if (pop <= 0) continue; ctx.save(); ctx.translate(DX[i], DY); ctx.scale(pop, pop); drawDoor(ctx, 0, 0, DW, DH, i + 1, 0, BEHIND[i], { xray: xr[i], t }); ctx.restore(); }
  label(ctx, '3 DOORS', 540, 330, 110, t, wt(2, 'three'), '#ffd23a');
  label(ctx, '1 CAR', 330, 470, 80, t, wt(2, 'car'), '#ffd23a'); label(ctx, '2 GOATS', 760, 470, 80, t, wt(2, 'goats'), '#ffffff');
} });
// [3] you pick a door; the host, who knows, opens another and shows a goat
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01 }); stage(ctx, t, cam);
  const pick = cue(t, wt(3, 'pick'), .25), open = easeOut(cue(t, wt(3, 'opens') + .1, .6));
  for (let i = 0; i < 3; i++) drawDoor(ctx, DX[i], DY, DW, DH, i + 1, i === 2 ? open : 0, BEHIND[i], { pick: i === 0 ? pick : 0, t });
  const knows = cue(t, wt(3, 'knows'), .3) * (1 - cue(t, wt(3, 'opens'), .3));
  const ho = { x: 960, y: 1600, s: 520, flip: -1, arms: { L: [.3, -.1], R: { ik: [.3, -.55] } }, face: { eyes: knows > 0 ? 'half' : 'normal', look: [-1, -.3], mouth: 'smirk' } };
  host(ctx, ho); micAt(ctx, 960 - .3 * 520, 1600 - .58 * 520, 70, .4);
  if (knows > 0) { ctx.save(); ctx.globalAlpha = knows; thought(ctx, 820, 560, 150, 920, 1150); drawCarIcon(ctx, 820, 600, 170); ctx.restore(); }
  const po = { x: 140, y: 1640, s: 520, arms: pick > 0 ? { L: [.3, -.1], R: { ik: [.35, -.7] } } : POSE.idle.arms, face: { eyes: 'normal', look: [1, -.5], mouth: 'smile' } };
  drawStick(ctx, C(PLAYER, po));
  label(ctx, 'YOUR PICK', 270, 690, 64, t, wt(3, 'pick'), '#ffd23a');
  label(ctx, 'GOAT!', 810, 690, 80, t, wt(3, 'goat') - .1, '#ffffff');
} });
// [4] do you want to switch?
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.12, dz: .04, y: 980 }); stage(ctx, t, cam);
  const o = { x: 540, y: 1700, s: 820, arms: { L: [.5, -1.2], R: [.5, -1.2] }, face: { eyes: 'wide', mouth: 'o', look: [0, -.4] } };
  drawStick(ctx, C(PLAYER, o)); sweat(ctx, 680, 1700 - .9 * 820, 60, 1);
  label(ctx, 'SWITCH?', 540, 380, 150, t, wt(4, 'switch') - .1, '#ffd23a');
} });
// [5] Marilyn: always switch, it doubles your chances
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .02 }); bgFlat(ctx, '#7a4bc4', '#4a2c86'); applyCam(ctx, cam, 1);
  const o = { x: 380, y: GY + 160, s: 760, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } };
  marilyn(ctx, o);
  label(ctx, 'ALWAYS', 680, 400, 110, t, wt(5, 'always'), '#ffffff'); label(ctx, 'SWITCH', 680, 530, 120, t, wt(5, 'switch'), '#ffd23a');
  label(ctx, 'x2', 760, 820, 220, t, wt(5, 'doubles'), '#7ee08a');
} });
// [6] letters pour in; a thousand from people with PhDs
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const R = rng(5);
  for (let i = 0; i < 40; i++) { const x0 = R() * 1080, ph = (t * (.6 + R() * .5) + R()) % 1.3; envelope(ctx, x0, -100 + ph * 1500, 70 + R() * 30, R() * 6 + t); }
  const phd = cue(t, wt(6, 'people'), .3);
  [[230, -1], [540, 1], [850, 1]].forEach(([x, f], i) => { const o = { x, y: GY + 130 + i % 2 * 20, s: 520, flip: i === 0 ? 1 : -1, arms: { L: [.3, -.1], R: { ik: [.28, -.55] } }, face: { eyes: 'squint', mouth: 'frown', browAng: .35 } }; if (phd > 0 || i === 1) { prof(ctx, o); envelope(ctx, x + (i === 0 ? 1 : -1) * .28 * 520, GY + 130 - .55 * 520, 90 * Math.max(.3, phd), .2); } });
  label(ctx, '~1,000', 540, 330, 120, t, wt(6, 'thousand'), '#ffd23a'); label(ctx, 'PhDs', 540, 470, 110, t, wt(6, 'phds'), '#ffffff');
} });
// [7] most of them said she was wrong
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .04, shake: 6 }); bgFlat(ctx, '#e0392f', '#8a1f1a'); applyCam(ctx, cam, 1);
  [[260, 1], [540, 1], [820, -1]].forEach(([x, f], i) => { const jab = Math.sin(t * 14 + i) * .15; const o = { x, y: GY + 140, s: 560, flip: f, arms: { L: [.3, -.1], R: [1.7 + jab, .2] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .4 } }; prof(ctx, o); });
  label(ctx, 'WRONG!', 540, 400, 170, t, wt(7, 'wrong') - .1, '#ffffff');
} });
// [8] but she was right
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .04 }); bgFlat(ctx, '#3fa35b', '#25703a'); applyCam(ctx, cam, 1);
  const o = { x: 480, y: GY + 300, s: 760, arms: POSE.hips.arms, face: { eyes: 'smug', mouth: 'smirk' } };
  marilyn(ctx, o);
  const st = backOut(cue(t, wt(8, 'right') - .1, .25)); if (st > 0) { ctx.save(); ctx.translate(840, 720); ctx.scale(st, st); circle(ctx, 0, 0, 90); fillStroke(ctx, '#ffffff', 10); line(ctx, -40, 4, -10, 34, 20, '#3fa35b'); line(ctx, -10, 34, 44, -30, 20, '#3fa35b'); ctx.restore(); }
  label(ctx, 'RIGHT', 540, 300, 150, t, wt(8, 'right'), '#ffffff');
} });
// [9] your first pick: 1 in 3, and nothing the host does changes that
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01 }); stage(ctx, t, cam);
  const open = easeOut(cue(t, wt(9, 'host'), .5));
  for (let i = 0; i < 3; i++) drawDoor(ctx, DX[i], DY, DW, DH, i + 1, i === 2 ? open : 0, BEHIND[i], { pick: i === 0 ? 1 : 0, t });
  const f1 = backOut(cue(t, wt(9, 'one'), .3)); if (f1 > 0) { ctx.save(); ctx.translate(270, 560); ctx.scale(f1, f1); fracLabel(ctx, 0, 0, 120, 1, 3); ctx.restore(); }
  const br = cue(t, wt(9, 'one') + .4, .3);
  if (br > 0 && open < .5) { ctx.save(); ctx.globalAlpha = br * (1 - open * 2); path(ctx, [[560, 720], [560, 680], [1060, 680], [1060, 720]], false); ctx.lineWidth = 12; ctx.strokeStyle = '#7ee08a'; ctx.stroke(); fracLabel(ctx, 810, 520, 110, 2, 3, '#7ee08a'); ctx.restore(); }
  if (t > wt(9, 'nothing')) { ctx.save(); ctx.translate(270, 330); text(ctx, 'LOCKED', 0, 0, 70, '#ffd23a', INK, 14); text(ctx, 'LOCKED', 0, 0, 70, '#ffd23a', INK, 0); ctx.restore(); }
} });
// [10] the other two thirds now sit behind the one closed door
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); stage(ctx, t, cam);
  for (let i = 0; i < 3; i++) drawDoor(ctx, DX[i], DY, DW, DH, i + 1, i === 2 ? 1 : 0, BEHIND[i], { pick: i === 0 ? 1 : 0, t });
  ctx.save(); ctx.translate(270, 560); fracLabel(ctx, 0, 0, 120, 1, 3); ctx.restore();
  const mv = ease(cue(t, wt(10, 'sit'), .8));
  const x = lerp(810, 540, mv), y = 520;
  fracLabel(ctx, x, y, lerp(110, 140, mv), 2, 3, '#7ee08a');
  const gl = cue(t, wt(10, 'closed') - .2, .3); if (gl > 0) { ctx.save(); ctx.globalAlpha = gl * (.6 + .4 * Math.sin(t * 8)); rrect(ctx, 540 - DW / 2 - 24, DY - DH - 24, DW + 48, DH + 30, 20); ctx.lineWidth = 16; ctx.strokeStyle = '#7ee08a'; ctx.stroke(); ctx.restore(); }
} });
// [11] imagine 100 doors; the host opens 98 goats; would you really stay?
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01 }); stage(ctx, t, cam);
  const n0 = wt(11, 'hundred') - .2, op = wt(11, 'opens');
  const pickI = 23, keepI = 77;
  for (let i = 0; i < 100; i++) {
    const r = Math.floor(i / 10), c = i % 10, x = 135 + c * 90, y = 520 + r * 92;
    const pop = cue(t, n0 + (r + c) * .03, .2); if (pop <= 0) continue;
    const o = (i !== pickI && i !== keepI) ? easeOut(cue(t, op + .1 + ((i * 37) % 100) / 100 * .9, .25)) : 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(pop, pop);
    drawDoor(ctx, 0, 0, 62, 78, null, o, o > 0 ? 'goat' : null, { pick: i === pickI && t > wt(11, 'pick') ? 1 : 0, col: DOORCOL[i % 3], t });
    ctx.restore();
  }
  label(ctx, '100 DOORS', 540, 330, 100, t, wt(11, 'hundred'), '#ffd23a', wt(11, 'ninety') - .1);
  label(ctx, '98 GOATS', 540, 330, 100, t, wt(11, 'ninety'), '#ffffff');
  if (t > wt(11, 'would')) { const k = .6 + .4 * Math.sin(t * 8); ctx.save(); ctx.globalAlpha = k; rrect(ctx, 135 + 7 * 90 - 45, 520 + 7 * 92 - 96, 90, 106, 12); ctx.lineWidth = 10; ctx.strokeStyle = '#7ee08a'; ctx.stroke(); ctx.restore(); label(ctx, 'STAY?', 540, 1560, 90, t, wt(11, 'would'), '#ffd23a'); }
} });
// [12a] even Paul Erdős refused to believe it
SHOTS.push({ start: S(12), end: wt(12, 'until') - .05, tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const shakeH = t > wt(12, 'refused') ? Math.sin(t * 12) * .15 : 0;
  const o = { x: 540, y: GY + 320, s: 700, headTilt: shakeH, arms: { L: [.9, -2.2], R: [.9, -2.2] }, face: { eyes: t > wt(12, 'refused') ? 'squint' : 'normal', mouth: t > wt(12, 'refused') ? 'frown' : 'flat', browAng: .3 } };
  erdos(ctx, o);
  label(ctx, 'PAUL ERDŐS', 540, 280, 96, t, wt(12, 'paul'), '#ffd23a');
  label(ctx, 'FAMOUS MATHEMATICIAN', 540, 390, 54, t, wt(12, 'famous'), '#ffffff');
  label(ctx, 'NOPE', 860, 700, 100, t, wt(12, 'refused'), '#ff5a4a');
} });
// [12b] until he watched a computer play the game over and over
SHOTS.push({ start: wt(12, 'until') - .05, end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const t0 = wt(12, 'computer'), games = Math.max(0, Math.floor((t - t0) * 9));
  crt(ctx, 540, 720, 640, () => {
    const g = games % 3, R = rng(games + 1), car = Math.floor(R() * 3);
    for (let i = 0; i < 3; i++) { const open = (t - t0) * 9 % 1 > .5; drawDoor(ctx, 380 + i * 160, 820, 110, 190, i + 1, open ? 1 : 0, i === car ? 'car' : 'goat', { col: '#2f8a5a', t }); }
    const sw = Math.round(games * 2 / 3), st = games - sw;
    text(ctx, 'SWITCH ' + sw, 400, 520, 46, '#7dffb0', INK, 0); text(ctx, 'STAY ' + st, 690, 520, 46, '#ff9a9a', INK, 0);
  });
  const o = { x: 220, y: GY + 210, s: 560, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'wide', look: [1, -.6], mouth: 'o' } };
  erdos(ctx, o);
  label(ctx, 'OVER & OVER', 540, 290, 80, t, wt(12, 'over'), '#ffd23a');
} });
// [13] the car kept being behind the other door
SHOTS.push({ start: S(13), end: S(14), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); stage(ctx, t, cam);
  drawDoor(ctx, 300, DY, DW, DH, 1, 1, 'goat', { pick: 1, t });
  drawDoor(ctx, 760, DY, DW, DH, 2, easeOut(cue(t, wt(13, 'car') - .1, .4)), 'car', { t });
  const o = { x: 540, y: 1680, s: 520, arms: POSE.handsUp.arms, face: { eyes: 'happy', mouth: 'grin' } };
  if (t > wt(13, 'other')) { drawStick(ctx, C(PLAYER, o)); }
  label(ctx, 'SWITCH WINS', 540, 340, 110, t, wt(13, 'other'), '#7ee08a');
  if (t > wt(13, 'car')) for (let i = 0; i < 6; i++) star5(ctx, 640 + i * 50, 600 + Math.sin(t * 5 + i) * 30, 24, t * 2 + i);
} });
