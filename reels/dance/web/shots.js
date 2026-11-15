// ---------- "The town that couldn't stop dancing" (Strasbourg 1518, portrait Short) ----------
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
const FOLK = [PAL.green, PAL.blue, PAL.red, PAL.yellow, PAL.purple, ['#8a5a3a', '#8a5a3a'], ['#3f8a8a', '#3f8a8a']];
const HATS = [bonnet, floppyHat, hood, null];
// one dancer. i picks colours and hat; tired 0..1 droops the arms and changes the face
function dancer(ctx, i, x, y, s, t, tired = 0, o = {}) {
  const d = dancePose(t * (7 - tired * 2) + i * 1.9, tired);
  const face = tired > .6 ? { eyes: 'half', mouth: 'o', browAng: -.3 } : tired > .25 ? { eyes: 'wide', mouth: 'frown' } : { eyes: o.calm ? 'normal' : 'wide', mouth: o.calm ? 'flat' : 'o' };
  const so = C({ cols: FOLK[i % FOLK.length], hat: 'none', belt: false, x, y, s, flip: i % 2 ? -1 : 1 }, C(d, { face: o.face || face }));
  drawStick(ctx, so); const h = o.hat === undefined ? HATS[i % 4] : o.hat; if (h) h(ctx, so, ['#f6f1e8', '#7a2a3a', '#5a4a3a'][i % 3]);
  if (tired > .3) sweat(ctx, x + s * .16, y - s * .9, s * .09, 1);
  return so;
}
const troffea = (ctx, x, y, s, t, tired = 0, face) => dancer(ctx, 0, x, y, s, t, tired, { hat: bonnet, face });
function doctor(ctx, o) { const so = C({ cols: ['#2a2a3a', '#2a2a3a'], hat: 'none', belt: false }, o); drawStick(ctx, so); floppyHat(ctx, so, '#1a1a2a'); specs(ctx, so); }
function musician(ctx, x, y, s, t, kind) {
  const b = Math.sin(t * 8) * .01;
  const so = { cols: ['#c8322c', '#f2b52a'], hat: 'none', belt: false, x, y, s, bob: b, arms: kind === 'lute' ? { L: { ik: [-.1, -.45] }, R: { ik: [.16, -.38 + Math.sin(t * 16) * .02] } } : { L: [1.2 + Math.sin(t * 16) * .5, .6], R: [1.2 - Math.sin(t * 16) * .5, .6] }, face: { eyes: 'happy', mouth: 'grin' } };
  drawStick(ctx, so); floppyHat(ctx, so, '#3fa35b');
  if (kind === 'lute') lute(ctx, x + .06 * s, y - .42 * s, s * .22, -.9); else drum(ctx, x, y - .08 * s, s * .3);
}

const SHOTS = [];
// [0] summer 1518: a woman steps into the street and starts dancing (dancing from frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .012 }); townBG(ctx, t, cam);
  drawStick(ctx, { cols: FOLK[5], hat: 'none', belt: false, x: 170, y: TG + 60, s: 420, arms: POSE.idle.arms, face: { eyes: 'wide', look: [1, 0], mouth: 'o' } });
  drawStick(ctx, { cols: FOLK[1], hat: 'none', belt: false, x: 930, y: TG + 80, s: 420, flip: -1, arms: { L: [.5, -1.2], R: [.5, -1.2] }, face: { eyes: 'normal', look: [-1, 0], mouth: 'flat', browOne: 1 } });
  troffea(ctx, 540, TG + 260, 640, t, 0);
  chapterTag(ctx, t, .05, 'SUMMER 1518');
  label(ctx, 'STRASBOURG', 540, 300, 96, t, wt(0, 'strasbourg'), '#ffd23a');
  const days = Math.min(6, 1 + Math.floor(clamp((t - wt(0, 'didn')) / 1.4) * 6));
  if (t > wt(0, 'didn')) { label(ctx, 'DAY ' + days, 540, 430, 90, t, wt(0, 'didn'), '#ffffff'); }
} });
// [1] her name was Frau Troffea
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .04, y: 900 }); bgFlat(ctx, '#3fa35b', '#25703a'); applyCam(ctx, cam, 1);
  troffea(ctx, 540, 1560, 860, t, 0);
  label(ctx, 'FRAU TROFFEA', 540, 300, 100, t, wt(1, 'frau'), '#ffd23a');
} });
// [2] no music, no celebration; she just danced for hours and hours
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const night = cue(t, wt(2, 'hours'), 1.4);
  const cam = camA(t, lt, { z: 1.0, dz: .012 }); townBG(ctx, t, cam, { sun: night < .5 });
  troffea(ctx, 540, TG + 260, 640, t, night * .5);
  tint(ctx, '#1a1f4a', night * .45);
  const m = cue(t, wt(2, 'music') - .1, .25) * (1 - cue(t, wt(2, 'she'), .2));
  if (m > 0) { ctx.save(); ctx.globalAlpha = m; banSign(ctx, 300, 420, 120, () => note(ctx, 285, 460, 110)); ctx.restore(); }
  const c2 = cue(t, wt(2, 'celebration') - .1, .25) * (1 - cue(t, wt(2, 'she'), .2));
  if (c2 > 0) { ctx.save(); ctx.globalAlpha = c2; banSign(ctx, 780, 420, 120, () => { for (let i = 0; i < 9; i++) { ctx.fillStyle = ['#e0392f', '#2f63c9', '#f2b52a'][i % 3]; ctx.fillRect(700 + i * 18, 370 + (i * 37) % 90, 16, 26); } }); ctx.restore(); }
  if (t > wt(2, 'hours')) { drawClock(ctx, 540, 400, 110, (t - wt(2, 'hours')) * 9, '#ffffff'); }
} });
// [3] within a week, more than thirty people joined her
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .012 }); townBG(ctx, t, cam);
  const n = Math.floor(clamp((t - S(3)) / (wt(3, 'joined') - S(3))) * 11);
  const spots = [[250, 150], [830, 170], [130, 330], [960, 350], [390, 400], [700, 420], [220, 560], [870, 580], [540, 620], [60, 480], [1020, 520]];
  spots.slice(0, n).forEach(([x, dy], i) => dancer(ctx, i + 1, x, TG + dy, 380 + dy * .2, t));
  troffea(ctx, 540, TG + 250, 480, t, .2);
  const cnt = Math.round(clamp((t - S(3)) / (wt(3, 'joined') - S(3))) * 34);
  label(ctx, '+' + cnt, 540, 320, 150, t, S(3) + .1, '#ffd23a');
  chapterTag(ctx, t, S(3) + .05, '1 WEEK');
} });
// [4] within a month, by some accounts, hundreds
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); townBG(ctx, t, cam);
  for (let r = 0; r < 7; r++) for (let c = 0; c < 9; c++) { const i = r * 9 + c; dancer(ctx, i, 60 + c * 125 + (r % 2) * 60, TG + 40 + r * 95, 200 + r * 22, t, (i % 5) * .12, { hat: i % 3 ? null : undefined }); }
  label(ctx, 'ABOUT 400?', 540, 320, 110, t, wt(4, 'hundreds') - .1, '#ffd23a');
  chapterTag(ctx, t, S(4) + .05, '1 MONTH');
} });
// [5] the doctors: hot blood; the cure was obvious
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const hot = cue(t, wt(5, 'hot'), .3);
  doctor(ctx, { x: 250, y: GY + 320, s: 600, arms: { L: [.3, -.1], R: [2.2, .5] }, face: { eyes: 'half', mouth: 'smirk' } });
  doctor(ctx, { x: 830, y: GY + 320, s: 600, flip: -1, arms: POSE.hips.arms, face: { eyes: 'normal', mouth: 'flat', look: [-1, 0] } });
  if (hot > 0) { ctx.save(); ctx.globalAlpha = hot; ctx.beginPath(); ctx.moveTo(540, 520); ctx.bezierCurveTo(440, 660, 470, 760, 540, 760); ctx.bezierCurveTo(610, 760, 640, 660, 540, 520); fillStroke(ctx, '#e0392f', 8); for (let i = 0; i < 3; i++) { const k = (t * .8 + i / 3) % 1; ctx.globalAlpha = hot * (1 - k); line(ctx, 480 + i * 60, 500 - k * 120, 490 + i * 60 + Math.sin(t * 6 + i) * 14, 440 - k * 120, 8, '#ff8a3a'); } ctx.restore(); }
  label(ctx, '"HOT BLOOD"', 540, 300, 100, t, wt(5, 'hot'), '#ff6a5a');
  label(ctx, 'THE CURE?', 540, 420, 80, t, wt(5, 'cure'), '#ffffff');
} });
// [6] more dancing
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .05, shake: 5 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  doctor(ctx, { x: 540, y: 1560, s: 860, arms: POSE.handsUp.arms, face: { eyes: 'happy', mouth: 'grin' } });
  label(ctx, 'MORE DANCING', 540, 320, 120, t, wt(6, 'more'), '#e0392f');
} });
// [7] two guild halls cleared, a wooden stage, paid musicians
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .012 }); townBG(ctx, t, cam);
  const st = backOut(cue(t, wt(7, 'built'), .4)), mu = cue(t, wt(7, 'paid'), .3);
  if (st > 0) { ctx.save(); ctx.translate(540, TG + 120); ctx.scale(1, st); woodStage(ctx, 0, 0, 760, 150); ctx.restore(); }
  if (mu > 0) { ctx.save(); ctx.globalAlpha = mu; musician(ctx, 300, TG + 76, 360, t, 'lute'); musician(ctx, 780, TG + 76, 360, t, 'drum'); notes(ctx, 540, TG - 300, t, 6, '#221c22'); ctx.restore(); }
  for (let i = 0; i < 5; i++) dancer(ctx, i, 140 + i * 200, TG + 480 + (i % 2) * 60, 400, t, .25);
  if (t < wt(7, 'built')) banner(ctx, 540, 420, 520, 'GUILD HALL x2');
  if (mu > 0) for (let i = 0; i < 3; i++) { const k = clamp((t - wt(7, 'paid') - i * .15) / .5); circle(ctx, lerp(540, 300 + i * 240, k), lerp(380, TG - 330, k), 26); fillStroke(ctx, '#ffd23a', 5); }
  label(ctx, 'OFFICIAL DANCE FLOOR', 540, 300, 70, t, wt(7, 'stage'), '#ffd23a');
} });
// [8] it made things worse; the music drew more people in
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 5 }); townBG(ctx, t, cam);
  woodStage(ctx, 540, TG + 120, 760, 150); musician(ctx, 300, TG + 76, 360, t, 'lute'); musician(ctx, 780, TG + 76, 360, t, 'drum'); notes(ctx, 540, TG - 300, t, 8, '#221c22', 420);
  const inn = clamp((t - wt(8, 'drew')) / 1.4);
  for (let i = 0; i < 12; i++) { const side = i % 2 ? 1 : -1; const tx = 100 + (i * 83) % 880; dancer(ctx, i, lerp(540 + side * 900, tx, i < 5 ? 1 : inn), TG + 420 + (i % 3) * 70, 360, t, .2); }
  label(ctx, 'WORSE', 540, 320, 150, t, wt(8, 'worse') - .1, '#ff5a4a');
} });
// [9] people collapsed from exhaustion; historians still argue how many died
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .015 }); townBG(ctx, t, cam, { sun: false, top: '#8a7a9a', bot: '#e8c8b0' });
  tint(ctx, '#2a1f3a', .25);
  const fall = cue(t, wt(9, 'collapsed'), .5);
  for (let i = 0; i < 4; i++) dancer(ctx, i + 1, 150 + i * 260, TG + 200 + (i % 2) * 50, 420, t * .6, .8);
  // one dancer tips over and lies down
  const so = { cols: FOLK[2], hat: 'none', belt: false, x: 540, y: TG + 520, s: 480, lean: fall * 1.5, arms: POSE.idle.arms, face: { eyes: 'spiral', mouth: 'o' }, t };
  ctx.save(); ctx.translate(fall * 200, -fall * 60); drawStick(ctx, so); ctx.restore();
  const arg = cue(t, wt(9, 'historians'), .3);
  if (arg > 0) { ctx.save(); ctx.globalAlpha = arg; scroll(ctx, 540, 470, 620, 300, [['CHRONICLE', 60, 70], ['how many?', 54, 70, '#c8322c'], ['? ? ?', 70, 80, '#c8322c']]); ctx.restore(); }
  label(ctx, 'EXHAUSTION', 540, 300, 100, t, wt(9, 'exhaustion'), '#ffffff', wt(9, 'historians'));
} });
// [10a] the city bans public music and dancing
SHOTS.push({ start: S(10), end: wt(10, 'and', 1) - .05, tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); townBG(ctx, t, cam);
  banSign(ctx, 320, 560, 190 * backOut(cue(t, wt(10, 'music') - .1, .3)), () => note(ctx, 300, 620, 170));
  banSign(ctx, 760, 560, 190 * backOut(cue(t, wt(10, 'dancing') - .1, .3)), () => { const d = dancePose(t * 7); drawStick(ctx, C({ cols: FOLK[0], hat: 'none', belt: false, x: 760, y: 720, s: 330, shadow: false }, d)); });
  musician(ctx, 540, TG + 300, 460, 0, 'lute');
  label(ctx, 'BANNED', 540, 280, 130, t, wt(10, 'banned'), '#e02a24');
} });
// [10b] the dancers are sent to a shrine in the mountains
SHOTS.push({ start: wt(10, 'and', 1) - .05, end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); mountains(ctx, t, cam);
  shrine(ctx, 780, TG + 40, 420);
  const k = clamp((t - wt(10, 'sent')) / 2.4);
  for (let i = 0; i < 5; i++) dancer(ctx, i, lerp(-300, 520, k) - i * 130 + 260, TG + 300 + (i % 2) * 50, 380, t * .8, .5);
  label(ctx, 'SHRINE', 780, 420, 80, t, wt(10, 'shrine'), '#ffffff');
} });
// [11] slowly, it stopped
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .02 }); mountains(ctx, t, cam);
  shrine(ctx, 780, TG + 40, 420);
  const stop = ease(cue(t, wt(11, 'slowly'), 1.0));
  for (let i = 0; i < 3; i++) { const d = dancePose((wt(11, 'slowly') + (t - wt(11, 'slowly')) * (1 - stop)) * 5 + i * 2, .6 + stop * .4); const so = C({ cols: FOLK[i], hat: 'none', belt: false, x: 200 + i * 220, y: TG + 320 + (i % 2) * 50, s: 440, face: stop > .8 ? { eyes: 'happy', mouth: 'smile' } : { eyes: 'half', mouth: 'o' } }, stop > .95 ? { arms: POSE.idle.arms } : d); drawStick(ctx, so); if (i === 0) bonnet(ctx, so); }
  label(ctx, 'PHEW', 400, 380, 120, t, wt(11, 'stopped') + .1, '#7ee08a');
} });
// [12] to this day, nobody knows exactly what caused it
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  const so = { cols: ['#6a5a4a', '#6a5a4a'], hat: 'none', belt: false, x: 540, y: 1560, s: 720, arms: { L: [1.4, -1.6], R: [1.4, -1.6] }, face: { eyes: 'normal', mouth: 'flat', look: [0, -.6], browOne: 1 } };
  drawStick(ctx, so); specs(ctx, so);
  const qs = [[220, 420], [540, 330], [860, 420], [330, 640], [750, 640]];
  qs.forEach(([x, y], i) => qmark(ctx, x, y + Math.sin(t * 3 + i) * 12, 150 * backOut(cue(t, wt(12, 'nobody') + i * .12, .25)), ['#ffd23a', '#ff6a6a', '#7ee08a', '#ffffff', '#ffd23a'][i]));
} });
// [13] the cure was the worst possible idea
SHOTS.push({ start: S(13), end: S(14), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); townBG(ctx, t, cam);
  woodStage(ctx, 540, TG + 120, 760, 150); musician(ctx, 300, TG + 76, 360, t, 'lute'); musician(ctx, 780, TG + 76, 360, t, 'drum'); notes(ctx, 540, TG - 300, t, 6);
  doctor(ctx, { x: 540, y: TG + 520, s: 520, arms: { L: [.9, -2.2], R: [.9, -2.2] }, face: { eyes: 'normal', mouth: 'flat', look: [0, -.5] } });
  for (let i = 0; i < 4; i++) dancer(ctx, i + 1, 120 + i * 280, TG + 560 + (i % 2) * 40, 340, t, .5);
  stamp(ctx, 540, 480, 'WORST IDEA', cue(t, wt(13, 'worst'), .2));
} });
