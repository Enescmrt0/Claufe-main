// ---------- "The bombs steered by pigeons" (portrait Short, Project Pigeon) ----------
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
const SKIN = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'none', belt: false };
const ARMY = { cols: ['#5a6a3a', '#5a6a3a'], hat: 'none', belt: false };
const NAVY = { cols: PAL.navy, hat: 'none', belt: false };
function skinner(ctx, o) { drawStick(ctx, C(SKIN, o)); sideHair(ctx, o); specs(ctx, o); }
function officer(ctx, o) { drawStick(ctx, C(ARMY, o)); officerCap(ctx, o); }
const peckAt = (t, rate = 9, ph = 0) => Math.max(0, Math.sin(t * rate + ph)) ** 2;
const skyBG = (ctx, t, cam) => { applyCam(ctx, cam, .1); drawSky(ctx, '#3ea6ee', '#d3f0fb', -400, 1900); applyCam(ctx, cam, .3); for (let i = 0; i < 5; i++) drawCloud(ctx, ((i * 380 - t * 500) % 2100 + 2100) % 2100 - 300, 300 + i * 290, 110 + (i % 2) * 40, i + 1); };

const SHOTS = [];
// [0] WW2: a bomb steered by pigeons (in action on frame 1: the bomb glides past the clouds)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .05 }); skyBG(ctx, t, cam); applyCam(ctx, cam, 1);
  bomber(ctx, 300 + t * 60, 330, 360, t);
  drawBomb(ctx, 560, 900 + Math.sin(t * 2) * 15, 740, { rot: .08, t });
  const k = backOut(cue(t, wt(0, 'pigeons') - .1, .3)); if (k > 0) { ctx.save(); ctx.translate(770, 640); ctx.scale(k, k); drawPigeon(ctx, 0, 0, 260, { peck: peckAt(t) }); ctx.restore(); }
  chapterTag(ctx, t, .05, 'WORLD WAR 2');
  label(ctx, 'PIGEON PILOTS', 540, 1180, 84, t, wt(0, 'steer'), '#ffd23a');
} });
// [1] B. F. Skinner: not an engineer, a psychologist
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const o = { x: 540, y: GY + 400, s: 660, arms: POSE.hips.arms, face: { eyes: 'normal', mouth: 'smirk' } };
  skinner(ctx, o);
  drawPigeon(ctx, 540 + .12 * 660, GY + 400 - .62 * 660, 140, { peck: peckAt(t, 4) * .3 });
  label(ctx, 'B. F. SKINNER', 540, 250, 96, t, wt(1, 'skinner'), '#ffd23a');
  const eng = cue(t, wt(1, 'engineer'), .2), psy = cue(t, wt(1, 'psychologist') - .1, .2);
  if (eng > 0 && psy <= 0) { ctx.save(); ctx.globalAlpha = eng; iconWrench(ctx, 870, 700, 90); line(ctx, 800, 630, 940, 770, 18, '#e0392f'); ctx.restore(); }
  if (psy > 0) { drawBrain(ctx, 870, 700, 120); label(ctx, 'PSYCHOLOGIST', 540, 360, 70, t, wt(1, 'psychologist'), '#ffffff'); }
} });
// [2a] 1940s: no computer small enough to guide a weapon
SHOTS.push({ start: S(2), end: wt(2, 'so') - .05, tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  bigComputer(ctx, 540, GY + 260, 980, 820, t);
  drawBomb(ctx, 840, GY + 230, 230, { t });
  const o = { x: 230, y: GY + 300, s: 380, flip: 1, arms: { L: [.5, -1.2], R: [.5, -1.2] }, face: { eyes: 'wide', look: [1, 0], mouth: 'o' } };
  drawStick(ctx, C(SKIN, o)); specs(ctx, o);
  chapterTag(ctx, t, S(2) + .05, '1940s');
  label(ctx, 'COMPUTER', 540, 280, 96, t, wt(2, 'computers'), '#ffffff');
  label(ctx, 'TOO BIG', 540, 400, 110, t, wt(2, 'small'), '#ff5a4a');
} });
// [2b] so Skinner had a strange idea
SHOTS.push({ start: wt(2, 'so') - .05, end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .03 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  const o = { x: 540, y: GY + 320, s: 760, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'wide', mouth: 'grin' } };
  skinner(ctx, o);
  const k = cue(t, wt(2, 'strange'), .3); drawBulb(ctx, 540, 330, 100 * backOut(k), k);
  drawPigeon(ctx, 820, GY + 320, 220, { peck: 0, look: 'back' }); qmark(ctx, 870, 900, 110 * backOut(cue(t, wt(2, 'idea'), .25)));
} });
// [3] pigeons can be trained to peck at almost anything
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgFlat(ctx, '#7ec8ef', '#3ea6ee'); applyCam(ctx, cam, 1);
  const things = [['🔴', 300, 560], ['', 780, 560], ['', 300, 1060], ['', 780, 1060]];
  // four little stations: a button, a card, a key, a bell
  const st = Math.floor(clamp((t - wt(3, 'peck')) / 1.4) * 4);
  for (let i = 0; i < 4; i++) {
    const [, x, y] = things[i]; const on = i <= st && t > wt(3, 'trained');
    rrect(ctx, x - 190, y - 200, 380, 400, 30); fillStroke(ctx, on ? '#f6f1e8' : '#d8e8f2', 8);
    if (i === 0) { circle(ctx, x + 70, y + 110, 44); fillStroke(ctx, '#e0392f', 7); }
    if (i === 1) { rrect(ctx, x + 30, y + 40, 120, 90, 10); fillStroke(ctx, '#ffd23a', 6); text(ctx, 'A', x + 90, y + 85, 60, INK, INK, 0); }
    if (i === 2) { circle(ctx, x + 80, y + 110, 40); fillStroke(ctx, '#3fa35b', 7); star5(ctx, x + 80, y + 110, 24, 0, '#fff'); }
    if (i === 3) { ellipse(ctx, x + 80, y + 105, 50, 30); fillStroke(ctx, '#7a4bc4', 7); }
    drawPigeon(ctx, x - 40, y + 170, 230, { peck: on ? peckAt(t, 12, i) : 0, blink: on ? 0 : 1 });
  }
  label(ctx, 'PECK!', 540, 300, 130, t, wt(3, 'peck'), '#ffd23a');
  label(ctx, 'ANYTHING', 540, 1430, 80, t, wt(3, 'anything'), '#ffffff');
} });
// [4] three pigeons inside the nose of a bomb, each with a screen
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const zoom = ease(cue(t, wt(4, 'inside'), 1.2));
  const cam = camA(t, lt, { z: 1.0 + zoom * .0, dz: .01 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  if (zoom < 1) { ctx.save(); ctx.globalAlpha = 1 - zoom; drawBomb(ctx, 540, 900, 900, { t }); ctx.restore(); }
  if (zoom > 0) {
    ctx.save(); ctx.globalAlpha = zoom;
    ctx.beginPath(); ctx.ellipse(540, 860, 470, 560, 0, 0, TAU); fillStroke(ctx, '#7a8a5a', 14);
    ctx.beginPath(); ctx.ellipse(540, 860, 420, 510, 0, 0, TAU); fillStroke(ctx, '#3a4426', 8);
    const scr = cue(t, wt(4, 'screen'), .3);
    for (let i = 0; i < 3; i++) {
      const y = 520 + i * 300;
      drawScreen(ctx, 690, y, 230, 170, Math.sin(t + i) * .3, 0, {});
      if (scr < 1) { ctx.save(); ctx.globalAlpha = 1 - scr; rrect(ctx, 575, y - 85, 230, 170, 14); ctx.fillStyle = '#111'; ctx.fill(); ctx.restore(); }
      drawPigeon(ctx, 420, y + 110, 210, { peck: scr > 0 ? peckAt(t, 8, i * 2) : 0 });
    }
    ctx.restore();
  }
  label(ctx, '3 PIGEONS', 540, 220, 90, t, wt(4, 'three'), '#ffd23a');
} });
// [5] the target drifts, the pigeons peck, the bomb steers back on course
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const drift = cue(t, wt(5, 'drifted'), .8), fix = ease(cue(t, wt(5, 'steered'), 1.0));
  const tx = -.8 * drift * (1 - fix);
  const pk = t > wt(5, 'pecked') && fix < 1 ? peckAt(t, 10) : 0;
  drawScreen(ctx, 540, 640, 760, 560, tx, 0, { peck: pk });
  drawPigeon(ctx, 280, 1180, 330, { peck: pk });
  // little course diagram: bomb heading bends back toward the target
  const ang = -.5 * drift * (1 - fix) + .0;
  ctx.save(); ctx.translate(780, 1120); ctx.rotate(ang); drawBomb(ctx, 0, 0, 300, { t }); ctx.restore();
  label(ctx, 'OFF CENTER', 540, 230, 80, t, wt(5, 'drifted'), '#ff6a6a', wt(5, 'pecked'));
  label(ctx, 'PECK = STEER', 540, 230, 80, t, wt(5, 'pecks'), '#7ee08a');
} });
// [6] three pigeons: if one got distracted, the other two outvote it
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#7ec8ef', '#3ea6ee'); applyCam(ctx, cam, 1);
  const dis = cue(t, wt(6, 'distracted') - .2, .3);
  for (let i = 0; i < 3; i++) {
    const x = 220 + i * 320, y = 900;
    drawScreen(ctx, x, 560, 230, 170, i === 1 && dis ? .6 : 0, 0);
    const mid = i === 1 && dis > 0;
    drawPigeon(ctx, x - 20, y + 220, 250, { peck: mid ? 0 : peckAt(t, 9, i), look: mid ? 'back' : 'fwd', flip: mid });
    if (mid) { crumbs(ctx, x - 160, y + 220, 120); }
    const vt = cue(t, wt(6, 'outvote') - .2, .3);
    if (vt > 0) { ctx.save(); ctx.globalAlpha = vt; circle(ctx, x, 1300, 60); fillStroke(ctx, mid ? '#e0392f' : '#3fa35b', 8); text(ctx, mid ? 'NO' : 'YES', x, 1300, 40, '#fff', INK, 0); ctx.restore(); }
  }
  label(ctx, '2 vs 1', 540, 300, 140, t, wt(6, 'outvote'), '#ffd23a');
} });
// [7] military officials could barely keep a straight face
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const lol = cue(t, wt(7, 'some'), .3);
  [[160, 1], [400, 1], [640, -1]].forEach(([x, f], i) => {
    const sh = lol > 0 ? Math.sin(t * 30 + i) * .012 : 0;
    const o = { x, y: GY + 280, s: 500, flip: f, bob: sh, arms: lol > 0 ? { L: [2.1, .9], R: [2.1, .9] } : POSE.hips.arms, face: lol > 0 ? { eyes: 'squint', mouth: 'teeth' } : { eyes: 'normal', mouth: 'flat', look: [1, 0] } };
    officer(ctx, o); if (lol > .5) sweat(ctx, x + 70, GY + 280 - .9 * 500, 40, 1);
  });
  const so = { x: 890, y: GY + 300, s: 460, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } };
  skinner(ctx, so); drawPigeon(ctx, 830, GY + 300 - .64 * 460, 120, { peck: peckAt(t, 6) * .4, flip: true });
  label(ctx, 'MILITARY', 540, 280, 96, t, wt(7, 'military'), '#ffffff');
  label(ctx, 'PFFT', 330, 520, 110, t, wt(7, 'barely'), '#ffd23a');
} });
// [8] but the pigeons kept pecking the target
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .04 }); bgFlat(ctx, '#3fa35b', '#25703a'); applyCam(ctx, cam, 1);
  const pk = peckAt(t, 11);
  drawScreen(ctx, 540, 640, 760, 560, 0, 0, { peck: pk });
  drawPigeon(ctx, 300, 1200, 340, { peck: pk });
  label(ctx, 'BULLSEYE', 540, 260, 110, t, wt(8, 'target') - .1, '#ffd23a');
} });
// [9] it still wasn't enough
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .03 }); bgFlat(ctx, '#6a7a8a', '#3a4450'); applyCam(ctx, cam, 1);
  const o = { x: 540, y: GY + 320, s: 760, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'frown', look: [0, .6], browAng: -.3 } };
  skinner(ctx, o); drawRainCloud(ctx, 540, 330, 240, t);
  drawPigeon(ctx, 800, GY + 320, 200, { blink: 1 });
} });
// [10] 1944: cancelled; the money went to other weapons
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  folderDoc(ctx, 540, 760, 560, 'PROJECT PIGEON');
  stamp(ctx, 540, 800, 'CANCELLED', cue(t, wt(10, 'cancelled'), .2));
  const fly = ease(cue(t, wt(10, 'money'), 1.0));
  if (fly > 0) { moneyBag(ctx, lerp(540, 900, fly), lerp(1260, 1500, fly), 160, fly * .6); bomber(ctx, 900, 1560, 260, t); }
  chapterTag(ctx, t, S(10) + .05, '1944');
} });
// [11] the Navy brought it back, and cancelled it again
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  const back = cue(t, wt(11, 'back'), .3), again = cue(t, wt(11, 'cancelled'), .2);
  const o = { x: 300, y: GY + 300, s: 520, arms: back > 0 && again <= 0 ? { L: [.3, -.1], R: [2.5, .3] } : POSE.hips.arms, face: { eyes: again > 0 ? 'half' : 'happy', mouth: again > 0 ? 'flat' : 'grin' } };
  drawStick(ctx, C(NAVY, o)); officerCap(ctx, o, '#1d2a4f');
  folderDoc(ctx, 720, 760, 460, 'PROJECT ORCON');
  stamp(ctx, 720, 800, 'AGAIN', again, '#e0392f', .12);
  label(ctx, 'NAVY', 540, 280, 110, t, wt(11, 'navy'), '#ffffff');
  label(ctx, '1948 - 1953', 540, 400, 70, t, wt(11, 'years'), '#ffd23a');
} });
// [12] 2024, eighty years later, a prize for his work
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); bgFlat(ctx, '#2a1d4a', '#4a2f6e'); applyCam(ctx, cam, 1);
  frame(ctx, 540, 720, 520, 640, () => { const o = { x: 540, y: 1000, s: 620, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'smile' } }; skinner(ctx, o); drawPigeon(ctx, 540, 1000 - .95 * 620, 130, {}); });
  const yr = Math.round(lerp(1944, 2024, ease(cue(t, wt(12, 'eighty') - .4, 1.2))));
  drawDigital(ctx, 540, 260, 1.2, String(yr), '#7dffb0');
  const tr = backOut(cue(t, wt(12, 'prize'), .4)); if (tr > 0) { ctx.save(); ctx.translate(800, 1180); ctx.scale(tr, tr); trophy(ctx, 0, 0, 260, t); ctx.restore(); }
  label(ctx, '80 YEARS LATER', 540, 1150, 70, t, wt(12, 'years'), '#ffffff', wt(12, 'prize'));
} });
// [13] the Ig Nobel Prize
SHOTS.push({ start: S(13), end: S(14), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .04 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  const R = rng(3); for (let i = 0; i < 40; i++) { const x = R() * 1080, y = ((t * 300 * (0.5 + R()) + R() * 1900) % 1900); ctx.save(); ctx.translate(x, y); ctx.rotate(t * 3 + i); ctx.fillStyle = ['#e0392f', '#2f63c9', '#3fa35b', '#7a4bc4'][i % 4]; ctx.fillRect(-10, -5, 20, 10); ctx.restore(); }
  trophy(ctx, 540, 1180, 420, t);
  drawPigeon(ctx, 540, 1180 - .9 * 420, 260, { wing: .5 + .5 * Math.sin(t * 8) });
  for (let i = 0; i < 2; i++) drawPigeon(ctx, 200 + i * 680, 1300, 200, { flip: i === 1, wing: .5 + .5 * Math.sin(t * 9 + i) });
  label(ctx, 'IG NOBEL', 540, 300, 150, t, wt(13, 'ig'), '#e0392f');
  label(ctx, 'PRIZE', 540, 450, 110, t, wt(13, 'prize'), '#ffffff');
} });
