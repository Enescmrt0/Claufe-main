// ---------- "Why you can't tickle yourself" (portrait Short) ----------
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const G = 1240;
const BORED = { eyes: 'half', mouth: 'flat' }, LAUGH = { eyes: 'happy', mouth: 'grin' };
function me(ctx, o) { return drawStick(ctx, C({ cols: PAL.blue, hat: 'none', belt: false }, o)); }
function friend(ctx, o) { return drawStick(ctx, C({ cols: PAL.red, hat: 'none', belt: false }, o)); }
// laughing person: bouncing, swaying
function laughing(ctx, t, x, y, s, k = 1) {
  const b = Math.abs(Math.sin(t * 14)) * 18 * k; me(ctx, { x, y: y - b, s, lean: Math.sin(t * 7) * .12 * k, arms: { L: [1.0, 2.2], R: [1.0, 2.2] }, face: LAUGH, blush: true }); if (k > .3) laughLines(ctx, x, y - s * .77 - b, s * .26, t);
}
const SHOTS = [];
// [0] your own fingers can't tickle you (wiggling on frame 1, flat face)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#3a8ad8', '#1f5aa0'); applyCam(ctx, cam, 1);
  me(ctx, { x: 540, y: G + 140, s: 820, arms: { L: { ik: [-.18, -.42] }, R: { ik: [.18, -.42] } }, face: BORED });
  hand(ctx, 540 - .17 * 820, G + 140 - .42 * 820, 150, .9, t, 1); hand(ctx, 540 + .17 * 820, G + 140 - .42 * 820, 150, -.9, t, 1);
  label(ctx, "CAN'T TICKLE", 540, 260, 110, t, wt(0, 'can') - .1, '#ffffff'); label(ctx, 'YOURSELF', 540, 390, 120, t, wt(0, 'tickle') - .1, '#ffd23a');
} });
// [1] go ahead. try it. nothing.
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .03 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  const nth = t > wt(1, 'nothing') - .1;
  if (!nth) { me(ctx, { x: 540, y: G + 160, s: 800, arms: { L: [.3, -.1], R: { ik: [.12, -.5] } }, face: { eyes: 'happy', mouth: 'smile' } }); hand(ctx, 600, G + 160 - .5 * 800 - 60, 170, 0, t, 0); label(ctx, 'TRY IT', 540, 300, 140, t, wt(1, 'try') - .1, '#ffffff'); }
  else { bgFlat(ctx, '#6a6a7a', '#3a3a4a'); applyCam(ctx, cam, 1); me(ctx, { x: 540, y: G + 160, s: 800, arms: POSE.idle.arms, face: BORED }); label(ctx, '...NOTHING', 540, 300, 130, t, wt(1, 'nothing') - .1, '#c8c8d0'); }
} });
// [2] someone else does the same thing: can't stop laughing
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 5 }); bgFlat(ctx, '#ff7a9a', '#d0406a'); applyCam(ctx, cam, 1);
  const go = t > wt(2, 'someone') - .1, lol = t > wt(2, 'laughing') - .5;
  friend(ctx, { x: 830, y: G + 140, s: 560, flip: -1, arms: { L: { ik: [.32, -.42] }, R: { ik: [.3, -.3] } }, face: { eyes: 'happy', mouth: 'smirk' } });
  if (go) hand(ctx, 830 - .32 * 560, G + 140 - .42 * 560, 120, -1.3, t, 1);
  if (lol) { laughing(ctx, t, 380, G + 160, 640); haText(ctx, 540, 600, t, 4); } else me(ctx, { x: 380, y: G + 160, s: 640, arms: POSE.idle.arms, face: { eyes: 'wide', mouth: 'o' } });
  label(ctx, "CAN'T STOP", 540, 290, 120, t, wt(2, 'stop') - .2, '#ffffff');
} });
// [3] same fingers, same spot, totally different result
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#7a2a4a'; ctx.fillRect(540, 0, 540, 1920); applyCam(ctx, cam, 1); line(ctx, 540, -200, 540, 2200, 10);
  const diff = t > wt(3, 'totally') - .2;
  me(ctx, { x: 270, y: G + 80, s: 480, arms: { L: { ik: [-.18, -.42] }, R: [.3, -.1] }, face: BORED }); hand(ctx, 270 - .17 * 480, G + 80 - .42 * 480, 90, .9, t, 1);
  if (diff) laughing(ctx, t, 810, G + 80, 480); else me(ctx, { x: 810, y: G + 80, s: 480, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'smile' } });
  hand(ctx, 810 - .2 * 480, G + 80 - .42 * 480, 90, .9, t, 1);
  text(ctx, 'ME', 270, 640, 60, '#ffffff', INK, 0); text(ctx, 'FRIEND', 810, 640, 60, '#ffffff', INK, 0);
  label(ctx, 'SAME FINGERS', 540, 260, 96, t, S(3), '#ffffff', wt(3, 'spot') - .2); label(ctx, 'SAME SPOT', 540, 260, 110, t, wt(3, 'spot') - .2, '#ffffff', wt(3, 'totally') - .2); label(ctx, 'DIFFERENT!', 540, 260, 120, t, wt(3, 'totally') - .04, '#ffd23a');
} });
// [4] your brain is always predicting
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#7a4bc4', '#4a2c86'); applyCam(ctx, cam, 1);
  drawBrain(ctx, 540, 860, 300 + 8 * Math.sin(t * 4));
  for (let i = 0; i < 3; i++) { const a = t * 1.5 + i * TAU / 3; drawBulb(ctx, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 280, 80, 1); }
  label(ctx, 'YOUR BRAIN', 540, 260, 110, t, wt(4, 'brain') - .1, '#ffffff', wt(4, 'predicting') - .1); label(ctx, 'PREDICTING', 540, 260, 120, t, wt(4, 'predicting') - .1, '#ffd23a');
} });
// [5] every move: a copy of the command, used to predict the feeling
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  drawBrain(ctx, 540, 520, 200);
  const a = cue(t, wt(5, 'command') - .3, .4), b = cue(t, wt(5, 'copy') - .2, .5), c = cue(t, wt(5, 'predict') - .2, .4);
  if (a > 0) { copyDoc(ctx, 300, 950, 220 * backOut(a), 'MOVE'); dotted(ctx, [460, 650], [300, 800], a, '#ffffff'); hand(ctx, 300, 1180, 110, 0, t, a); }
  if (b > 0) { copyDoc(ctx, 300 + 480 * ease(b), 950, 220, 'COPY', '#ffe9a0', .08 * b); }
  if (c > 0) { label(ctx, 'PREDICTION:', 780, 1170, 52, t, wt(5, 'predict') - .2, '#ffd23a'); label(ctx, '"A TICKLE"', 780, 1240, 52, t, wt(5, 'feel') - .3, '#ffffff'); }
  label(ctx, 'COMMAND', 540, 230, 96, t, wt(5, 'command') - .3, '#ffffff', wt(5, 'copy') - .2); label(ctx, '+ A COPY', 540, 230, 110, t, wt(5, 'copy') - .2, '#ffd23a');
} });
// [6] feeling arrives as predicted: brain turns the volume down
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#1f6a6a', '#0f3a3a'); applyCam(ctx, cam, 1);
  const dn = ease(clamp((t - wt(6, 'volume') + .3) / .9)); knob(ctx, 540, 820, 230, 1 - .85 * dn);
  label(ctx, 'AS PREDICTED ✓', 540, 260, 90, t, wt(6, 'predicted') - .2, '#7ee08a', wt(6, 'volume') - .3); label(ctx, 'VOLUME DOWN', 540, 260, 110, t, wt(6, 'volume') - .3, '#ffd23a');
} });
// [7] someone else's fingers can't be predicted: the full feeling
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: 5 }); bgFlat(ctx, '#ff7a9a', '#d0406a'); applyCam(ctx, cam, 1);
  const full = t > wt(7, 'full') - .3;
  if (!full) { hand(ctx, 540, 840, 300, Math.sin(t * 3) * .3, t, 1, '#c88a60'); qmark(ctx, 250, 560, 140, '#ffffff'); qmark(ctx, 830, 620, 120, '#ffffff'); label(ctx, 'UNPREDICTABLE', 540, 260, 96, t, wt(7, 'predicted') - .3, '#ffffff'); }
  else { knob(ctx, 300, 760, 170, 1, 'FULL'); laughing(ctx, t, 760, G + 40, 520); haText(ctx, 600, 480, t, 3); label(ctx, 'FULL FEELING', 540, 260, 110, t, wt(7, 'full') - .3, '#ffd23a'); }
} });
// [8] scientists in London tested this with a robot
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); labRoom(ctx, t, cam);
  labCoat(ctx, { x: 220, y: G + 120, s: 520, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } });
  if (t > wt(8, 'robot') - .2) robotArm(ctx, 720, G - 30, 900, 930, 520, t, 1);
  chapterTag(ctx, t, S(8) + .05, 'LONDON'); label(ctx, 'SCIENTISTS', 540, 300, 110, t, wt(8, 'scientists') - .1, '#2a3f8f', wt(8, 'robot') - .2); label(ctx, '+ A ROBOT', 540, 300, 120, t, wt(8, 'robot') - .2, '#e0392f');
} });
// [9] a lever makes the robot tickle your own palm: barely ticklish
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); labRoom(ctx, t, cam);
  const ang = Math.sin(t * 6) * .5; lever(ctx, 300, G - 60, 260, ang);
  me(ctx, { x: 220, y: G + 160, s: 560, arms: { L: { ik: [.2, -.62] }, R: { ik: [.6, -.5] } }, face: t > wt(9, 'barely') - .2 ? BORED : { eyes: 'normal', mouth: 'flat', look: [1, 0] } });
  hand(ctx, 220 + .6 * 560 + 60, G + 160 - .5 * 560, 120, 1.9, t, 0);
  robotArm(ctx, 900, G - 30, 220 + .6 * 560 + 110, G + 160 - .5 * 560 - 30, 480, t, 1);
  label(ctx, 'LEVER → ROBOT', 540, 290, 96, t, wt(9, 'lever') - .1, '#2a3f8f', wt(9, 'barely') - .2); label(ctx, 'BARELY TICKLISH', 540, 290, 96, t, wt(9, 'barely') - .2, '#7a7a8a');
} });
// [10] a tiny delay, a fraction of a second, between move and touch
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  lever(ctx, 220, 980, 220, Math.sin(t * 6) * .5); robotArm(ctx, 860, 980, 760, 700, 360, t, 1);
  const k = cue(t, wt(10, 'delay') - .3, .4); if (k > 0) { drawClock(ctx, 540, 760, 120 * backOut(k), (t * 4) % 12, '#ffffff'); }
  dotted(ctx, [320, 900], [760, 900], clamp((t - S(10)) / 2), '#ffd23a');
  label(ctx, 'TINY DELAY', 540, 270, 110, t, wt(10, 'delay') - .3, '#ffd23a', wt(10, 'fraction') - .1); label(ctx, '~0.2 SECONDS', 540, 270, 110, t, wt(10, 'fraction') - .1, '#ffffff');
} });
// [11] suddenly it tickled
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .04, shake: 8 }); bgFlat(ctx, '#ffd36b', '#ff8a3a'); applyCam(ctx, cam, 1);
  laughing(ctx, t, 400, G + 160, 720); robotArm(ctx, 900, G - 30, 640, 820, 420, t, 1); haText(ctx, 540, 560, t, 5);
  label(ctx, 'IT TICKLES!', 540, 280, 130, t, S(11) + .05, '#e0392f');
} });
// [12] the prediction was off by just enough
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#7a4bc4', '#4a2c86'); applyCam(ctx, cam, 1);
  drawBrain(ctx, 540, 600, 190);
  for (let r = 3; r >= 1; r--) { circle(ctx, 540, 1000, r * 70); fillStroke(ctx, r % 2 ? '#ffffff' : '#e0392f', 6); }
  const k = ease(cue(t, S(12) + .2, .7)); circle(ctx, 540 + 120 * k, 1000 - 30 * k, 26); fillStroke(ctx, '#ffd23a', 6);
  if (k >= 1) { line(ctx, 540, 1000, 660, 970, 5, '#ffd23a'); }
  label(ctx, 'OFF BY', 540, 260, 110, t, wt(12, 'off') - .1, '#ffffff'); label(ctx, 'JUST ENOUGH', 540, 390, 110, t, wt(12, 'just') - .1, '#ffd23a');
} });
// [13] so technically you can tickle yourself
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#3a8ad8', '#1f5aa0'); applyCam(ctx, cam, 1);
  me(ctx, { x: 540, y: G + 140, s: 760, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 560 + Math.sin(t * 3 + i) * 20, 30, t + i);
  label(ctx, 'TECHNICALLY...', 540, 260, 100, t, wt(13, 'technically') - .1, '#ffffff', wt(13, 'can') - .1); label(ctx, 'YOU CAN!', 540, 260, 140, t, wt(13, 'can') - .1, '#ffd23a');
} });
// [14] you need a robot and a really slow connection
SHOTS.push({ start: S(14), end: S(15), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  laughing(ctx, t, 340, G + 160, 560, .7); robotArm(ctx, 900, G - 30, 560, 860, 420, t, 1);
  if (t > wt(14, 'slow') - .3) { spinner(ctx, 800, 600, 70, t); wifi(ctx, 540, 720, 200, 1); }
  label(ctx, 'A ROBOT', 540, 260, 110, t, wt(14, 'robot') - .2, '#ffffff', wt(14, 'slow') - .3); label(ctx, 'SLOW CONNECTION', 540, 260, 96, t, wt(14, 'slow') - .3, '#ffd23a');
} });
