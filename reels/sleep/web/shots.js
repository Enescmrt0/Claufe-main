// ---------- "What if you never needed sleep?" (landscape, ~5 min) ----------
// Shots are keyed to SENTENCES of script.json, and every cue is looked up from the word
// timings (web/words.js), so nothing here is timed by hand:
//   mk(a, b, draw)   a shot covering sentences a..b
//   wt(line, 'word') the time that word is spoken
const ME = { cols: PAL.blue, hat: 'none', belt: false };
const BOSS = { cols: PAL.red, hat: 'none', belt: true };
const KID = { cols: PAL.yellow, hat: 'none', belt: false };
const GREEN = { cols: PAL.green, hat: 'none', belt: false };
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 1.0 : LN[i].s - .1;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const mk = (a, b, draw, tr = 'whip') => ({ start: S(a), end: S(b + 1), tr, draw });
const cue = (t, at, d = .2) => clamp((t - at) / d);
// standard camera: gentle handheld drift + slow push-in. o: {x, y, z, dz, px}
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 960) + hh[0] + (o.px || 0) * lt, y: (o.y || 540) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: 0 }; };
const FLAT = ['#20305c', '#3b4f8f'];
// glowing eyes in a bush (something is watching)
function lurker(ctx, x, y, a = 1) { ctx.save(); ctx.globalAlpha = a; ellipse(ctx, x, y, 170, 110); fillStroke(ctx, '#16304a', 6); ellipse(ctx, x - 90, y + 30, 120, 80); fillStroke(ctx, '#16304a', 6); for (const ex of [-34, 34]) { ellipse(ctx, x + ex, y - 10, 20, 12, ex > 0 ? -.3 : .3); ctx.fillStyle = '#ffe14d'; ctx.fill(); circle(ctx, x + ex, y - 10, 5); ctx.fillStyle = INK; ctx.fill(); } ctx.restore(); }
function strike(ctx, x, y, w, k) { if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); line(ctx, x - w / 2, y + 6, x - w / 2 + w * clamp(k), y - 6, 14, '#ff5a5a'); ctx.restore(); }

const SHOTS = [];

// ===== 0. HOOK =====
// [0] twenty-six years asleep
SHOTS.push(mk(0, 0, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: [150, 150, 340, 300] });
  drawBed(ctx, 820, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 640, 560, t, 1.2);
  const n = Math.round(26 * easeOut(cue(t, wt(0, 'about'), 1.3)));
  label(ctx, n + ' YEARS', 1440, 330, 150, t, wt(0, 'about'), '#ffd23a'); label(ctx, 'ASLEEP', 1440, 470, 70, t, wt(0, 'asleep'));
}));
// [1-2] what if you never needed to? no yawning, no alarm clocks, no wasted nights
SHOTS.push(mk(1, 2, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: [150, 150, 340, 300] });
  const up = cue(t, wt(1, 'never'), .18);
  drawBed(ctx, 820, GY - 14 * Math.sin(up * Math.PI), 1.3, { sleeper: up > 0 ? 'open' : 'closed' });
  if (up > 0 && up < 1) { ctx.save(); ctx.globalAlpha = 1 - up; burst(ctx, 580, 600, 150 * up + 40, 10, '#fff7c0', 4); ctx.restore(); }
  label(ctx, 'NO YAWNING', 1430, 270, 76, t, wt(2, 'yawning'), '#7ee08a');
  label(ctx, 'NO ALARM CLOCKS', 1430, 400, 76, t, wt(2, 'alarm'), '#7ee08a');
  label(ctx, 'NO WASTED NIGHTS', 1430, 530, 76, t, wt(2, 'wasted'), '#7ee08a');
}));
// [3] the greatest upgrade
SHOTS.push(mk(3, 3, (ctx, lt, t) => {
  const cam = camA(t, lt); bgDay(ctx, t, cam);
  const up = cue(t, wt(3, 'upgrade'), .25);
  drawStick(ctx, C(ME, { x: 960, y: GY, s: 560, squash: 1 - .06 * Math.sin(up * Math.PI), arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }));
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + t; sparkle(ctx, 960 + Math.cos(a) * 330, 470 + Math.sin(a) * 250, 40 + 14 * Math.sin(t * 5 + i), .5 + .5 * Math.sin(t * 4 + i)); }
  label(ctx, 'THE GREATEST UPGRADE', 960, 150, 96, t, wt(3, 'greatest'), '#ffd23a');
}));
// [4] sleep is hiding a few secrets
SHOTS.push(mk(4, 4, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); bgRoom(ctx, t, cam, { night: true, win: [150, 150, 340, 300] });
  drawBed(ctx, 900, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 720, 560, t, 1.2); tint(ctx, '#0a0820', .25);
  for (let i = 0; i < 3; i++) label(ctx, '?', 1180 + i * 170, 330 - (i % 2) * 70, 190, t, wt(4, 'secrets') + i * .14, '#ffd23a');
}));

// ===== 1. THE GOOD NEWS =====
// [5-6] eight extra hours a day = 122 extra days a year
SHOTS.push(mk(5, 6, (ctx, lt, t) => {
  bgFlat(ctx, FLAT[0], FLAT[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const g = cue(t, wt(6, 'eight'), .5);
  // 24 h ring: 16 h awake (gold) + 8 h asleep (blue -> gold)
  ctx.lineWidth = 70; ctx.lineCap = 'butt';
  ctx.beginPath(); ctx.arc(480, 530, 230, -Math.PI / 2, -Math.PI / 2 + TAU * 2 / 3); ctx.strokeStyle = '#ffd23a'; ctx.stroke();
  ctx.beginPath(); ctx.arc(480, 530, 230, -Math.PI / 2 + TAU * 2 / 3, -Math.PI / 2 + TAU); ctx.strokeStyle = mix('#6f8fe8', '#ffd23a', g); ctx.stroke();
  circle(ctx, 480, 530, 266); fillStroke(ctx, null, 7); circle(ctx, 480, 530, 194); fillStroke(ctx, null, 7);
  text(ctx, '24 h', 480, 520, 96, '#fff', INK, 14); text(ctx, '24 h', 480, 520, 96, '#fff');
  label(ctx, '+8 H A DAY', 480, 860, 80, t, wt(6, 'eight'), '#ffd23a');
  const n = Math.round(122 * cue(t, wt(6, 'hundred'), 1.5));
  drawDays(ctx, 960, 250, 14, 9, 60, n);
  label(ctx, n + ' EXTRA DAYS', 1378, 860, 80, t, wt(6, 'hundred'), '#ffd23a');
  chapterTag(ctx, t, S(5), '1 · THE GOOD NEWS');
}));
// [7] four more months, every single year
SHOTS.push(mk(7, 7, (ctx, lt, t) => {
  bgFlat(ctx, FLAT[0], FLAT[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const M = 'JFMAMJJASOND';
  for (let i = 0; i < 12; i++) { rrect(ctx, 150 + i * 136, 380, 120, 150, 16); fillStroke(ctx, '#e9eef9', 7); rrect(ctx, 150 + i * 136, 380, 120, 40, 12); fillStroke(ctx, '#e0392f', 6); text(ctx, M[i], 210 + i * 136, 478, 64, INK); }
  for (let i = 0; i < 4; i++) { const k = backOut(cue(t, wt(7, 'four') + i * .12, .2)); if (k <= 0) continue; ctx.save(); ctx.translate(754 + i * 136, 665); ctx.scale(k, k); rrect(ctx, -60, -75, 120, 150, 16); fillStroke(ctx, '#ffd23a', 7); text(ctx, '+', 0, 4, 90, INK); ctx.restore(); }
  label(ctx, '+4 MONTHS', 960, 190, 130, t, wt(7, 'four'), '#ffd23a'); label(ctx, 'EVERY YEAR', 960, 860, 76, t, wt(7, 'every'));
}));
// [8] learn a language, write a novel, answer your emails
SHOTS.push(mk(8, 8, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { win: false });
  drawStick(ctx, C(ME, { x: 300, y: GY, s: 500, arms: { L: [.3, -.1], R: [1.5, .9] }, face: { eyes: 'happy', mouth: 'grin' } }));
  const a = wt(8, 'language'), b = wt(8, 'novel'), c = wt(8, 'emails');
  label(ctx, 'HOLA!', 760, 300, 70, t, a, '#7ee08a'); label(ctx, 'BONJOUR!', 860, 420, 70, t, a + .15, '#6fd0ff'); label(ctx, 'CIAO!', 740, 540, 70, t, a + .3, '#ffd23a');
  const kb = backOut(cue(t, b, .25)); if (kb > 0) { applyCam(ctx, cam, 1); drawBook(ctx, 1220, GY - 60, 2.6 * kb, '#e0392f'); }
  label(ctx, 'MY NOVEL', 1220, 430, 56, t, b + .2);
  const kc = backOut(cue(t, c, .25)); if (kc > 0) { applyCam(ctx, cam, 1); drawLaptop(ctx, 1620, GY - 40, 1.9 * kc); }
  label(ctx, 'INBOX: 0', 1620, 430, 60, t, c + .2, '#7ee08a');
}));
// [9] more than two decades of waking time
SHOTS.push(mk(9, 9, (ctx, lt, t) => {
  bgFlat(ctx, FLAT[0], FLAT[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const g = cue(t, wt(9, 'two'), .6);
  rrect(ctx, 220, 470, 1480, 110, 55); ctx.fillStyle = '#ffd23a'; ctx.fill();
  ctx.save(); rrect(ctx, 220, 470, 1480, 110, 55); ctx.clip(); ctx.fillStyle = mix('#6f8fe8', '#fff3a0', g); ctx.fillRect(220 + 1480 * 2 / 3, 470, 1480 / 3, 110); ctx.restore();
  rrect(ctx, 220, 470, 1480, 110, 55); fillStroke(ctx, null, 8);
  text(ctx, 'AWAKE', 700, 528, 56, INK); text(ctx, g < .5 ? 'ASLEEP' : 'AWAKE TOO', 1450, 528, 50, INK);
  label(ctx, 'A LIFETIME', 960, 380, 64, t, S(9) + .2); label(ctx, '+20 YEARS', 1450, 720, 120, t, wt(9, 'two'), '#ffd23a');
  drawStick(ctx, C(ME, { x: 1450, y: 470, s: 230, shadow: false, arms: g > .3 ? { L: [2.5, .3], R: [2.5, .3] } : POSE.idle.arms, face: { eyes: 'happy', mouth: 'grin' } }));
}));

// ===== 2. THE FIRST NIGHT =====
// [10-11] magic: midnight, and fresh as noon
SHOTS.push(mk(10, 11, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true });
  const mid = t >= wt(11, 'midnight');
  drawDigital(ctx, 420, 250, 1.1, mid ? '00:00' : '23:59');
  const st = Math.sin(t * 2.4) * .12;
  drawStick(ctx, C(ME, { x: 900, y: GY, s: 560, arms: { L: [2.5 + st, .3], R: [2.5 - st, .3] }, face: { eyes: 'happy', mouth: 'grin' } }));
  for (let i = 0; i < 5; i++) sparkle(ctx, 620 + i * 140, 330 + Math.sin(t * 3 + i * 2) * 60, 34, .4 + .6 * Math.abs(Math.sin(t * 3 + i)));
  label(ctx, 'FRESH AS NOON', 960, 130, 84, t, wt(11, 'fresh'), '#ffd23a');
  chapterTag(ctx, t, S(10), '2 · THE FIRST NIGHT');
}));
// [12-13] three in the morning: the night is very, very long
SHOTS.push(mk(12, 13, (ctx, lt, t) => {
  const far = ease(cue(t, wt(13, 'night'), 2.2));
  const cam = camA(t, lt, { z: lerp(1.06, .9, far), dz: 0 }); bgCity(ctx, t, cam, { lit: .08 });
  drawStick(ctx, C(ME, { x: 960, y: GY, s: 400, arms: POSE.idle.arms, face: { eyes: 'normal', look: [Math.sin(t * 1.4), 0], mouth: 'flat' } }));
  ctx.setTransform(1, 0, 0, 1, 0, 0); drawDigital(ctx, 320, 210, 1.1, '03:00');
  label(ctx, 'VERY,', 1250, 200, 90, t, wt(13, 'very')); label(ctx, 'VERY', 1500, 200, 90, t, wt(13, 'very', 1)); label(ctx, 'LONG', 1740, 200, 90, t, wt(13, 'long'), '#ffd23a');
}));
// [14] the body clock keeps ticking: hungry, cold and low on schedule
SHOTS.push(mk(14, 14, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: false });
  const cold = t > wt(14, 'cold') && t < wt(14, 'low');
  const sh = cold ? shake(t, 7, 4)[0] : 0;
  drawStick(ctx, C(ME, { x: 960 + sh, y: GY, s: 560, arms: cold ? { L: { ik: [.04, -.5], bend: -1 }, R: { ik: [-.04, -.5] } } : POSE.idle.arms, face: { eyes: t > wt(14, 'low') ? 'half' : 'normal', mouth: 'flat' } }));
  applyCam(ctx, cam, 1); drawClock(ctx, 960 + sh, GY - 250, 62, 3 + t * .6);
  label(ctx, 'BODY CLOCK', 960, 130, 80, t, wt(14, 'body'), '#ffd23a');
  label(ctx, 'HUNGRY', 420, 420, 84, t, wt(14, 'hungry')); label(ctx, 'COLD', 1500, 330, 84, t, wt(14, 'cold'), '#8fd8ff'); label(ctx, 'LOW', 1500, 560, 84, t, wt(14, 'low'), '#b9c4d6');
}));
// [15] around 4 a.m. body temperature dips
SHOTS.push(mk(15, 15, (ctx, lt, t) => {
  bgFlat(ctx, '#141a3a', '#3a4486'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const X = h => 260 + h / 24 * 1400, Y = h => 500 + 150 * Math.cos((h - 4) / 24 * TAU);
  line(ctx, 260, 760, 1660, 760, 6, 'rgba(255,255,255,.5)');
  for (const [h, s] of [[0, 'MIDNIGHT'], [6, '6 AM'], [12, 'NOON'], [18, '6 PM'], [24, 'MIDNIGHT']]) { line(ctx, X(h), 750, X(h), 775, 6, 'rgba(255,255,255,.6)'); text(ctx, s, X(h), 812, 34, 'rgba(255,255,255,.75)'); }
  const d = cue(t, S(15) + .3, 2.4); ctx.beginPath();
  for (let i = 0; i <= 96 * d; i++) { const h = i / 4; i ? ctx.lineTo(X(h), Y(h)) : ctx.moveTo(X(h), Y(h)); }
  ctx.lineWidth = 14; ctx.strokeStyle = '#ff8a5c'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  const k = cue(t, wt(15, 'four'), .2); if (k > 0) { circle(ctx, X(4), Y(4), 26 * backOut(k)); fillStroke(ctx, '#8fd8ff', 7); }
  label(ctx, 'BODY TEMPERATURE', 960, 150, 80, t, wt(15, 'body')); label(ctx, '4 AM: LOWEST', X(4) + 250, Y(4) + 10, 64, t, wt(15, 'four'), '#8fd8ff');
}));

// ===== 3. THE MYSTERY =====
// [16-17] why do we sleep at all? think how risky it is
SHOTS.push(mk(16, 17, (ctx, lt, t) => {
  const cam = camA(t, lt); bgNight(ctx, t, cam, { moonX: 360 });
  const risk = cue(t, wt(17, 'risky'), .4);
  lurker(ctx, 1560, GY - 110, risk);
  drawStick(ctx, C(ME, { x: 820, y: GY, s: 540, arms: risk > .5 ? POSE.idle.arms : { L: [.3, -.1], R: { ik: [.05, -.64] } }, face: risk > .5 ? { eyes: 'wide', look: [1, 0], mouth: 'o' } : { eyes: 'normal', look: [.3, -.6], mouth: 'flat', browOne: 1 } }));
  label(ctx, 'WHY?', 960, 170, 170, t, wt(16, 'why'), '#ffd23a', wt(17, 'think'));
  label(ctx, 'RISKY', 1200, 200, 120, t, wt(17, 'risky'), '#ff6a6a');
  chapterTag(ctx, t, S(16), '3 · THE MYSTERY');
}));
// [18] an animal lies still: can't eat, escape, or watch for danger
SHOTS.push(mk(18, 18, (ctx, lt, t) => {
  const cam = camA(t, lt); bgNight(ctx, t, cam, { moon: false });
  lurker(ctx, 1620, GY - 110, 1); drawCatLoaf(ctx, 780, GY, 2.3); drawZs(ctx, 560, 600, t, 1.2);
  const W3 = [['EAT', 'eat', 520], ['ESCAPE', 'escape', 960], ['WATCH', 'watch', 1420]];
  for (const [s, w, x] of W3) { label(ctx, s, x, 190, 90, t, wt(18, w)); strike(ctx, x, 190, s.length * 62, cue(t, wt(18, w) + .25, .2)); }
}));
// [19] evolution should have deleted sleep long ago
SHOTS.push(mk(19, 19, (ctx, lt, t) => {
  bgFlat(ctx, '#1b1e2b', '#2a3050'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  rrect(ctx, 460, 190, 1000, 560, 26); fillStroke(ctx, '#eef1f8', 8); rrect(ctx, 460, 190, 1000, 80, 26); fillStroke(ctx, '#3a4a7a', 8);
  text(ctx, 'evolution', 960, 232, 44, '#fff');
  rrect(ctx, 640, 340, 190, 220, 18); fillStroke(ctx, '#8fb3ff', 7); text(ctx, 'zZ', 735, 440, 90, '#fff', INK, 10); text(ctx, 'sleep', 735, 610, 46, INK);
  const click = t >= wt(19, 'deleted');
  rrect(ctx, 980, 400, 340, 110, 26); fillStroke(ctx, click ? '#b02a2a' : '#e0392f', 8); text(ctx, 'DELETE', 1150, 458, 62, '#fff');
  const k = ease(cue(t, S(19) + .3, wt(19, 'deleted') - S(19) - .3)); const cx = lerp(1500, 1180, k), cy = lerp(800, 480, k);
  path(ctx, [[cx, cy], [cx, cy + 70], [cx + 20, cy + 52], [cx + 36, cy + 86], [cx + 50, cy + 78], [cx + 34, cy + 46], [cx + 58, cy + 46]]); fillStroke(ctx, '#fff', 6);
  const e = cue(t, wt(19, 'deleted') + .35, .2); if (e > 0) { ctx.save(); ctx.translate(960, 660); ctx.scale(backOut(e), backOut(e)); rrect(ctx, -420, -52, 840, 104, 20); fillStroke(ctx, '#ffd23a', 8); text(ctx, 'ERROR: STILL NEEDED', 0, 4, 60, INK); ctx.restore(); }
}));
// [20] every animal ever studied sleeps. even jellyfish
SHOTS.push(mk(20, 20, (ctx, lt, t) => {
  const cam = camA(t, lt); bgNight(ctx, t, cam, { moon: false });
  drawCatLoaf(ctx, 330, GY, 1.5); drawZs(ctx, 220, 640, t, .8);
  drawElephant(ctx, 860, GY, .62); drawZs(ctx, 1010, 580, t + .3, .9);
  line(ctx, 1150, 150, 1420, 150, 14, '#5a3c22'); drawBat(ctx, 1290, 150, .8, t); drawZs(ctx, 1370, 400, t + .6, .8);
  const j = cue(t, wt(20, 'jellyfish'), .3);
  if (j > 0) { ctx.save(); ctx.globalAlpha = .35 * j; circle(ctx, 1660, 470, 230); ctx.fillStyle = '#8fd8ff'; ctx.fill(); ctx.restore(); ctx.save(); ctx.globalAlpha = j; drawJelly(ctx, 1660, 470 + Math.sin(t * 1.5) * 16, 1.5, t); ctx.restore(); drawZs(ctx, 1760, 400, t + .1, .9); }
  label(ctx, 'EVERY ANIMAL', 700, 150, 84, t, wt(20, 'every')); label(ctx, 'EVEN JELLYFISH', 1560, 800, 60, t, wt(20, 'jellyfish'), '#ff8fd0');
}));
// [21] elephants about two hours, bats close to twenty
SHOTS.push(mk(21, 21, (ctx, lt, t) => {
  const cam = camA(t, lt); bgNight(ctx, t, cam, { moon: false });
  drawElephant(ctx, 500, GY, .95); drawZs(ctx, 740, 480, t, 1.1);
  line(ctx, 1180, 170, 1680, 170, 16, '#5a3c22'); drawBat(ctx, 1430, 170, 1.25, t); drawZs(ctx, 1560, 520, t + .4, 1);
  label(ctx, '2 H', 500, 170, 150, t, wt(21, 'two'), '#ffd23a'); label(ctx, '20 H', 1130, 520, 150, t, wt(21, 'twenty'), '#ffd23a');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (t > wt(21, 'two')) meterH(ctx, 320, 260, 360, 34, cue(t, wt(21, 'two'), .4) * 2 / 24, '#8fb3ff');
  if (t > wt(21, 'twenty')) meterH(ctx, 950, 620, 360, 34, cue(t, wt(21, 'twenty'), .6) * 20 / 24, '#8fb3ff');
}));
// [22] but nobody gets zero: sleep must be doing something essential
SHOTS.push(mk(22, 22, (ctx, lt, t) => {
  const cam = camA(t, lt); bgNight(ctx, t, cam);
  drawStick(ctx, C(ME, { x: 420, y: GY, s: 520, arms: { L: [1.7, .9], R: [1.7, .9] }, face: { eyes: 'normal', mouth: 'flat', browUp: 1 } }));
  label(ctx, '0 H', 1100, 330, 260, t, wt(22, 'zero'), '#fff');
  const k = cue(t, wt(22, 'zero') + .3, .25); if (k > 0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = k; circle(ctx, 1100, 330, 210); ctx.lineWidth = 26; ctx.strokeStyle = '#ff5a5a'; ctx.stroke(); line(ctx, 950, 480, 1250, 180, 26, '#ff5a5a'); ctx.restore(); }
  label(ctx, 'ESSENTIAL', 1100, 660, 120, t, wt(22, 'essential'), '#ffd23a');
}));

// ===== 4. JOB ONE: CLEANING =====
const WASTE = (() => { const R = rng(77); return Array.from({ length: 30 }, () => { const a = R() * TAU, d = Math.sqrt(R()); return [960 + Math.cos(a) * d * 250, 470 + Math.sin(a) * d * 160, 12 + R() * 10, R()]; }); })();
const BRAINBG = ['#2a1d4a', '#4a2f6e'];
// [23-24] while you're awake, brain cells produce waste
SHOTS.push(mk(23, 24, (ctx, lt, t) => {
  bgFlat(ctx, BRAINBG[0], BRAINBG[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawBrain(ctx, 960, 480, 320 + Math.sin(t * 2) * 4);
  const k = cue(t, wt(24, 'produce'), LN[24].e - wt(24, 'produce') + .4);
  WASTE.forEach(([x, y, r, ph]) => { const a = backOut(clamp((k - ph * .8) / .12)); if (a > 0) { circle(ctx, x, y, r * a); fillStroke(ctx, '#8b9a6a', 4); } });
  label(ctx, 'JOB #1: CLEANING', 960, 110, 90, t, wt(23, 'cleaning'), '#ffd23a'); label(ctx, 'WASTE BUILDS UP', 960, 900, 60, t, wt(24, 'waste'), '#c8d6a0');
  chapterTag(ctx, t, S(23), '4 · CLEANING');
}));
// [25] during deep sleep, fluid washes through and flushes it away
SHOTS.push(mk(25, 25, (ctx, lt, t) => {
  bgFlat(ctx, '#141a3a', '#2a2f6e'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const k = cue(t, wt(25, 'fluid'), 2.4), wx = lerp(560, 1380, k);
  drawBrain(ctx, 960, 480, 320, { glow: k > 0 && k < 1 ? .6 : 0 });
  WASTE.forEach(([x, y, r]) => { if (x > wx) { circle(ctx, x, y, r); fillStroke(ctx, '#8b9a6a', 4); } });
  if (k > 0 && k < 1) { ctx.save(); ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(wx - 120, 250); for (let i = 0; i <= 12; i++) ctx.lineTo(wx + Math.sin(i * .9 + t * 6) * 26, 250 + i * 40); ctx.lineTo(wx - 120, 730); ctx.closePath(); ctx.fillStyle = '#6fd0ff'; ctx.fill(); ctx.restore(); }
  label(ctx, 'DEEP SLEEP', 960, 110, 90, t, wt(25, 'deep'), '#8fd8ff'); label(ctx, 'FLUSHED AWAY', 960, 900, 64, t, wt(25, 'flush'), '#7ee08a');
}));
// [26] a cleaning crew that clocks in when you clock out
SHOTS.push(mk(26, 26, (ctx, lt, t) => {
  bgFlat(ctx, '#141a3a', '#2a2f6e'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawBrain(ctx, 820, 560, 300);
  [[640, 330], [840, 280], [1030, 340]].forEach(([x, y], i) => {
    const sw = Math.sin(t * 5 + i * 2) * 40;
    line(ctx, x + 60 + sw, y - 110, x + 110 + sw, y + 10, 10, '#a06a3c'); rrect(ctx, x + 80 + sw, y, 70, 22, 8); fillStroke(ctx, '#ffd23a', 5);
    drawStick(ctx, C([GREEN, KID, BOSS][i], { x, y: y + 40, s: 260, shadow: false, bob: Math.sin(t * 5 + i) * .01, arms: { L: [.4, -.2], R: { ik: [.2 + sw / 260 * .5, -.5] } }, face: { eyes: 'happy', mouth: 'smile' } }));
  });
  drawDigital(ctx, 1500, 420, 1.2, t < wt(26, 'clock', 1) ? 'IN' : 'OUT', t < wt(26, 'clock', 1) ? '#7dffb0' : '#ff8a8a');
  label(ctx, 'NIGHT CREW', 1500, 250, 70, t, wt(26, 'cleaning'), '#ffd23a');
}));

// ===== 5. JOB TWO: FILING =====
const BOXCOL = ['#d9a05b', '#e07f5b', '#7fb37a', '#6f9fd6', '#c58bd6'];
// [27-28] new memories land in temporary storage
SHOTS.push(mk(27, 28, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { win: false });
  drawDesk(ctx, 560, GY, 560);
  for (let i = 0; i < 5; i++) { const k = cue(t, wt(28, 'collects') + i * .32, .3); if (k <= 0) continue; const x = 400 + (i % 3) * 160 + (i > 2 ? 80 : 0), y = GY - 190 - (i > 2 ? 110 : 0); drawBox(ctx, x, lerp(-200, y, easeIn(k)), 140, 110, BOXCOL[i]); }
  drawStick(ctx, C(ME, { x: 1380, y: GY, s: 540, arms: { L: [.3, -.1], R: [1.5, .9] }, face: { eyes: 'happy', look: [-1, 0], mouth: 'smile' } }));
  label(ctx, 'JOB #2: FILING', 960, 110, 90, t, wt(27, 'filing'), '#ffd23a'); label(ctx, 'TEMPORARY STORAGE', 560, 300, 56, t, wt(28, 'temporary'));
  chapterTag(ctx, t, S(27), '5 · FILING');
}));
// [29] at night the important ones move to long-term storage
SHOTS.push(mk(29, 29, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: [800, 110, 320, 250] });
  drawDesk(ctx, 430, GY, 520); drawCabinet(ctx, 1560, GY, 300, 420, 'LONG-TERM'); drawBin(ctx, 1020, GY, 1.1);
  for (let i = 0; i < 5; i++) {
    const keep = i !== 1 && i !== 3; const k = ease(cue(t, wt(29, 'replays') + i * .45, .7));
    const x0 = 290 + (i % 3) * 140 + (i > 2 ? 70 : 0), y0 = GY - 190 - (i > 2 ? 100 : 0), x1 = keep ? 1560 : 1020, y1 = keep ? GY - 200 - i * 20 : GY - 120;
    if (k >= 1) continue; drawBox(ctx, lerp(x0, x1, k), lerp(y0, y1, k) - Math.sin(k * Math.PI) * 260, 124 * (1 - k * .3), 98 * (1 - k * .3), BOXCOL[i]);
  }
  label(ctx, 'REPLAY', 430, 300, 70, t, wt(29, 'replays'), '#8fd8ff'); label(ctx, 'KEEP WHAT MATTERS', 1500, 250, 54, t, wt(29, 'important'), '#7ee08a');
}));
// [30] sleeping after studying beats cramming
SHOTS.push(mk(30, 30, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: false });
  drawBed(ctx, 520, GY, 1.1, { sleeper: 'closed' }); drawZs(ctx, 360, 600, t, 1); drawBook(ctx, 700, GY - 150, 1.1, '#7fb37a');
  drawDesk(ctx, 1480, GY, 420); drawLaptop(ctx, 1560, GY - 190, 1); drawCup(ctx, 1380, GY - 190, 1, t);
  drawStick(ctx, C(KID, { x: 1220, y: GY, s: 500, lean: .08, arms: { L: [.5, -.3], R: [1.2, .6] }, face: { eyes: 'spiral', mouth: 'flat' }, t }));
  label(ctx, 'A+', 520, 300, 190, t, wt(30, 'beats'), '#7ee08a'); label(ctx, 'C-', 1500, 300, 190, t, wt(30, 'cramming'), '#ff8a8a');
  ctx.setTransform(1, 0, 0, 1, 0, 0); line(ctx, 960, 180, 960, 800, 6, 'rgba(255,255,255,.3)');
}));

// ===== 6. JOB THREE: REPAIR =====
// [31-32] deep sleep releases growth hormone to rebuild muscle and tissue
SHOTS.push(mk(31, 32, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: [140, 130, 320, 260] });
  drawBed(ctx, 760, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 580, 560, t, 1.1);
  ctx.setTransform(1, 0, 0, 1, 0, 0); const k = cue(t, wt(32, 'growth'), 1.6);
  meterV(ctx, 1500, 260, 100, 440, .12 + .78 * k, '#7ee08a');
  label(ctx, 'JOB #3: REPAIR', 960, 110, 90, t, wt(31, 'repair'), '#ffd23a');
  label(ctx, 'GROWTH HORMONE', 1550, 760, 44, t, wt(32, 'growth'), '#7ee08a'); label(ctx, 'MUSCLE + TISSUE', 1250, 330, 50, t, wt(32, 'muscle'));
  chapterTag(ctx, t, S(31), '6 · REPAIR');
}));
// [33] the immune system restocks its defenses
SHOTS.push(mk(33, 33, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: [140, 130, 320, 260] });
  drawBed(ctx, 960, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 780, 560, t, 1.1);
  for (let i = 0; i < 5; i++) { const k = backOut(cue(t, wt(33, 'restock') + i * .16, .22)); if (k > 0) { const a = Math.PI + (i + .5) / 5 * Math.PI; drawShield(ctx, 960 + Math.cos(a) * 520, 660 + Math.sin(a) * 380 + Math.sin(t * 3 + i) * 8, 70 * k); } }
  label(ctx, 'IMMUNE SYSTEM', 960, 110, 84, t, wt(33, 'immune'), '#8fd8ff');
}));
// [34] even the heart gets a break: blood pressure drops at night
SHOTS.push(mk(34, 34, (ctx, lt, t) => {
  bgFlat(ctx, '#2a1430', '#3a2a5e'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const k = cue(t, wt(34, 'drops'), 1.4); const rate = lerp(7.5, 5, k); const beat = 1 + .08 * Math.max(0, Math.sin(t * rate)) ** 6;
  drawHeart(ctx, 640, 520, 190 * beat);
  label(ctx, 'A BREAK FOR THE HEART', 960, 120, 76, t, wt(34, 'break'), '#ffd23a');
  text(ctx, 'BLOOD PRESSURE', 1340, 380, 50, '#fff', INK, 10); text(ctx, 'BLOOD PRESSURE', 1340, 380, 50, '#fff');
  const bp = Math.round(lerp(120, 104, k)); text(ctx, String(bp), 1340, 540, 220, k > .5 ? '#7ee08a' : '#fff', INK, 26); text(ctx, String(bp), 1340, 540, 220, k > .5 ? '#7ee08a' : '#fff');
  label(ctx, 'LOWER AT NIGHT', 1340, 720, 56, t, wt(34, 'night'), '#7ee08a');
}));
// [35] dreaming sleep takes the sting out of painful memories
SHOTS.push(mk(35, 35, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: false });
  drawBed(ctx, 620, GY, 1.3, { sleeper: 'closed' });
  for (const [x, y, r] of [[900, 520, 22], [980, 450, 34]]) { circle(ctx, x, y, r); fillStroke(ctx, '#ffffff', 6); }
  ctx.save(); cloudShape(ctx, 1320, 360, 250, 12); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.stroke(); cloudShape(ctx, 1320, 360, 250, 12); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore();
  const k = cue(t, wt(35, 'sting'), 1.2);
  ctx.save(); ctx.globalAlpha = 1 - k * .85; drawRainCloud(ctx, 1320, 300, 120 * (1 - k * .5), t); ctx.restore();
  if (k > .5) drawHeart(ctx, 1320, 330, 70 * backOut(clamp((k - .5) / .3)), '#ffb3c0');
  label(ctx, 'DREAMS', 1320, 110, 90, t, wt(35, 'dreaming'), '#c9a8ff');
}));

// ===== 7. THE SLEEP METER =====
// [36-38] adenosine builds up every hour you're awake; the more, the sleepier
SHOTS.push(mk(36, 38, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { win: false });
  const k = cue(t, wt(37, 'every'), LN[38].e - wt(37, 'every'));
  drawStick(ctx, C(ME, { x: 820, y: GY, s: 540, lean: k * .06, headTilt: k * .12, arms: POSE.idle.arms, face: { eyes: k > .7 ? 'half' : 'normal', blink: k > .85 ? Math.max(0, Math.sin(t * 4)) : 0, mouth: k > .5 ? 'flat' : 'smile' } }));
  applyCam(ctx, cam, 1); drawClock(ctx, 1500, 420, 170, 7 + k * 16);
  ctx.setTransform(1, 0, 0, 1, 0, 0); meterH(ctx, 520, 190, 600, 56, .08 + .84 * k, mix('#ffd23a', '#ff6a3a', k));
  label(ctx, 'ADENOSINE', 820, 130, 60, t, wt(37, 'adenosine'), '#ffd23a'); label(ctx, 'SLEEPY', 1500, 700, 90, t, wt(38, 'sleepier'), '#b9c4d6');
  chapterTag(ctx, t, S(36), '7 · THE SLEEP METER');
}));
// [39] coffee doesn't remove it, it just hides the meter
SHOTS.push(mk(39, 39, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { win: false });
  const hid = cue(t, wt(39, 'hides'), .25);
  drawStick(ctx, C(ME, { x: 820, y: GY, s: 540, bob: hid * Math.sin(t * 22) * .004, arms: POSE.idle.arms, face: { eyes: hid > .5 ? 'wide' : 'half', mouth: hid > .5 ? 'grin' : 'flat' } }));
  const kc = backOut(cue(t, wt(39, 'coffee'), .25)); if (kc > 0) drawCup(ctx, 1440, GY - 40, 2.6 * kc, t);
  ctx.setTransform(1, 0, 0, 1, 0, 0); meterH(ctx, 520, 190, 600, 56, .92, '#ff6a3a');
  if (hid > 0) { ctx.save(); ctx.translate(0, -160 * (1 - easeOut(hid))); rrect(ctx, 490, 160, 660, 116, 24); fillStroke(ctx, '#6b3d1f', 8); text(ctx, 'HIDDEN', 820, 222, 64, '#f3d9b1'); ctx.restore(); }
  label(ctx, 'STILL THERE', 820, 340, 50, t, wt(39, 'hides') + .4, '#ffb347');
}));
// [40] only sleep resets it to zero
SHOTS.push(mk(40, 40, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true });
  drawBed(ctx, 820, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 640, 560, t, 1.2);
  const k = cue(t, wt(40, 'resets'), 1.0);
  ctx.setTransform(1, 0, 0, 1, 0, 0); meterH(ctx, 520, 190, 600, 56, .92 * (1 - k), '#ff6a3a');
  label(ctx, 'ADENOSINE', 820, 130, 60, t, S(40)); label(ctx, 'RESET: 0', 820, 340, 80, t, wt(40, 'zero'), '#7ee08a');
}));

// ===== 8. WITHOUT SLEEP =====
// [41] what happens when sleep is taken away
SHOTS.push(mk(41, 41, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true });
  drawStick(ctx, C(ME, { x: 960, y: GY, s: 560, lean: Math.sin(t * 1.3) * .03, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'flat' } }));
  const n = Math.round(24 * cue(t, S(41) + .4, LN[41].e - S(41) - .4));
  ctx.setTransform(1, 0, 0, 1, 0, 0); drawDigital(ctx, 420, 260, 1.2, n + ' H'); tint(ctx, '#0a0820', .2);
  label(ctx, 'HOURS AWAKE', 420, 150, 46, t, S(41) + .3); label(ctx, 'NO SLEEP', 960, 120, 90, t, wt(41, 'taken'), '#ff8a8a');
  chapterTag(ctx, t, S(41), '8 · WITHOUT SLEEP');
}));
// [42] after 24 hours awake you react as if legally drunk
SHOTS.push(mk(42, 42, (ctx, lt, t) => {
  const cam = camA(t, lt); bgCity(ctx, t, cam, { lit: .3 });
  const x = 200 + lt * 250; drawCar(ctx, x, GY + 40 + Math.sin(lt * 4.2) * 30, 1.15, x / 50);
  label(ctx, '24 H AWAKE', 620, 170, 96, t, wt(42, 'twenty')); label(ctx, '=', 1010, 170, 96, t, wt(42, 'as')); label(ctx, 'LEGALLY DRUNK', 1420, 170, 86, t, wt(42, 'legally'), '#ff8a8a');
}));
// [43] microsleeps: the brain steals tiny naps
SHOTS.push(mk(43, 43, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { win: false });
  const nap = t > wt(43, 'tiny') && Math.sin((t - wt(43, 'tiny')) * 3.2) > .1 ? 1 : 0;
  drawDesk(ctx, 1160, GY, 520); drawLaptop(ctx, 1160, GY - 190, 1.5);
  drawStick(ctx, C(ME, { x: 720, y: GY, s: 540, lean: nap * .14, headTilt: nap * .35, arms: { L: [.3, -.1], R: [1.3, .5] }, face: { eyes: 'normal', blink: nap, mouth: 'flat' } }));
  if (nap) drawZs(ctx, 880, 380, t * 2, .7);
  label(ctx, 'MICROSLEEP', 960, 120, 96, t, wt(43, 'microsleeps'), '#c9a8ff'); label(ctx, 'A FEW SECONDS', 1480, 330, 54, t, wt(43, 'few'));
}));
const SEPIA = ['#5a4630', '#8a6e48'];
// [44] 1964: Randy Gardner stays awake for eleven days
SHOTS.push(mk(44, 44, (ctx, lt, t) => {
  bgFlat(ctx, SEPIA[0], SEPIA[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  label(ctx, '1964', 420, 250, 220, t, S(44) + .1, '#f3e3c2');
  drawStick(ctx, C(KID, { x: 420, y: 830, s: 440, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'flat' } }));
  const n = Math.round(11 * cue(t, wt(44, 'eleven'), 1.0)); drawDays(ctx, 800, 420, 11, 1, 92, n, '#ffd23a');
  label(ctx, 'RANDY GARDNER, 17', 1300, 300, 60, t, wt(44, 'randy')); label(ctx, n + ' DAYS AWAKE', 1300, 620, 100, t, wt(44, 'eleven'), '#ffd23a');
}));
// [45] by the end he struggled to finish simple sentences
SHOTS.push(mk(45, 45, (ctx, lt, t) => {
  bgFlat(ctx, SEPIA[0], SEPIA[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawStick(ctx, C(KID, { x: 520, y: 830, s: 520, lean: Math.sin(t * 1.1) * .05, arms: POSE.idle.arms, face: { eyes: 'spiral', mouth: 'o' }, t }));
  rrect(ctx, 860, 220, 800, 300, 60); fillStroke(ctx, '#fff', 8); path(ctx, [[900, 470], [800, 560], [1000, 500]]); fillStroke(ctx, '#fff', 8); rrect(ctx, 880, 440, 160, 70, 0); ctx.fillStyle = '#fff'; ctx.fill();
  const s = 'the...  uh...  um...'; const k = Math.floor(cue(t, S(45) + .3, LN[45].e - S(45) - .3) * s.length);
  text(ctx, s.slice(0, k), 1260, 372, 76, INK);
}));
// [46] Guinness stopped accepting attempts: too dangerous
SHOTS.push(mk(46, 46, (ctx, lt, t) => {
  bgFlat(ctx, '#1b1e2b', '#2a3050'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  rrect(ctx, 610, 220, 700, 520, 26); fillStroke(ctx, '#2f63c9', 10); rrect(ctx, 650, 260, 60, 440, 10); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fill();
  text(ctx, 'RECORDS', 1000, 400, 96, '#ffd23a'); text(ctx, 'longest time awake', 1000, 520, 46, '#fff');
  const k = cue(t, wt(46, 'stopped'), .18); if (k > 0) { ctx.save(); ctx.translate(980, 480); ctx.rotate(-.18); ctx.scale(1.8 - .8 * easeOut(k), 1.8 - .8 * easeOut(k)); ctx.globalAlpha = k; rrect(ctx, -330, -90, 660, 180, 20); ctx.lineWidth = 16; ctx.strokeStyle = '#ff5a5a'; ctx.stroke(); text(ctx, 'CLOSED', 0, 6, 140, '#ff5a5a'); ctx.restore(); }
  label(ctx, 'TOO DANGEROUS', 960, 860, 80, t, wt(46, 'dangerous'), '#ff8a8a');
}));
// [47] a rare inherited disease in which people lose the ability to sleep: always fatal
SHOTS.push(mk(47, 47, (ctx, lt, t) => {
  bgFlat(ctx, '#0f1020', '#1c1e36'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawDNA(ctx, 520, 190, 560, t * .5, 1.3);
  label(ctx, 'A RARE INHERITED DISEASE', 1220, 380, 62, t, wt(47, 'rare')); label(ctx, 'NO SLEEP AT ALL', 1220, 500, 62, t, wt(47, 'ability'), '#b9c4d6'); label(ctx, 'ALWAYS FATAL', 1220, 660, 90, t, wt(47, 'always'), '#ff8a8a');
}));

// ===== 9. NATURE'S WORKAROUNDS =====
function jobBadges(ctx, x, y, r, t, on = [1, 1, 1]) {
  const P = [[-1, '#ffd23a', (bx, by) => iconBroom(ctx, bx - r * .1, by, r * .7)], [0, '#d9a05b', (bx, by) => drawBox(ctx, bx, by + r * .45, r * 1.0, r * .85, '#f3d9b1')], [1, '#8fd8ff', (bx, by) => iconWrench(ctx, bx, by + r * .15, r * .75)]];
  P.forEach(([dx, col, fn], i) => { if (on[i] <= 0) return; const bx = x + dx * r * 3, by = y + Math.sin(t * 2.4 + i * 2) * 10; ctx.save(); ctx.globalAlpha = clamp(on[i]); iconBadge(ctx, bx, by, r * backOut(clamp(on[i])), col, () => fn(bx, by)); ctx.restore(); });
}
// [48-49] it means doing all three jobs while awake, and nature has tried
SHOTS.push(mk(48, 49, (ctx, lt, t) => {
  const cam = camA(t, lt); bgDay(ctx, t, cam);
  drawStick(ctx, C(ME, { x: 960, y: GY, s: 520, arms: { L: [2.3, .4], R: [2.3, .4] }, face: { eyes: 'wide', look: [0, -1], mouth: 'o' } }));
  ctx.setTransform(1, 0, 0, 1, 0, 0); jobBadges(ctx, 960, 250, 86, t, [cue(t, wt(48, 'those'), .2), cue(t, wt(48, 'those') + .15, .2), cue(t, wt(48, 'those') + .3, .2)]);
  label(ctx, 'ALL OF IT, WHILE AWAKE', 1470, 470, 56, t, wt(49, 'while'), '#ffd23a'); label(ctx, 'NATURE HAS TRIED', 960, 110, 80, t, wt(49, 'nature'));
  chapterTag(ctx, t, S(48), '9 · NATURE TRIED');
}));
// [50] dolphins sleep with half the brain at a time
SHOTS.push(mk(50, 50, (ctx, lt, t) => {
  bgFlat(ctx, '#2f9fd8', '#0b3f73'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < 5; i++) { ctx.beginPath(); for (let x = -40; x <= 1960; x += 40) { const y = 180 + i * 190 + Math.sin(x * .012 + t * 1.6 + i) * 16; x < 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.stroke(); }
  drawDolphin(ctx, 760 + Math.sin(t * .8) * 40, 560 + Math.sin(t * 1.6) * 26, 1.6, Math.sin(t * 1.6) * .08);
  const left = Math.floor((t - S(50)) / 1.3) % 2 === 0; const k = cue(t, wt(50, 'half'), .2);
  if (k > 0) { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(1480, 360, 150 * backOut(k), sd < 0 ? Math.PI / 2 : -Math.PI / 2, sd < 0 ? Math.PI * 1.5 : Math.PI / 2); ctx.closePath(); fillStroke(ctx, (sd < 0) === left ? '#ffd23a' : '#3a4a7a', 8); } text(ctx, left ? 'AWAKE' : 'ASLEEP', 1400, 360, 34, INK); text(ctx, left ? 'ASLEEP' : 'AWAKE', 1562, 360, 34, left ? '#fff' : INK); }
  label(ctx, 'HALF A BRAIN AT A TIME', 960, 110, 80, t, wt(50, 'half'), '#ffd23a');
}));
// [51] some seabirds nap in mid-flight
SHOTS.push(mk(51, 51, (ctx, lt, t) => {
  const cam = camA(t, lt, { px: 20 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#d3f0fb', -400, 1300);
  applyCam(ctx, cam, .3); drawCloud(ctx, 300 - t * 30 % 400 + 200, 260, 120, 1); drawCloud(ctx, 1300 - (t * 40) % 500, 700, 150, 2); drawCloud(ctx, 1750 - (t * 26) % 300, 200, 90, 3);
  applyCam(ctx, cam, 1); const nap = t > wt(51, 'nap') && Math.sin((t - wt(51, 'nap')) * 3) > 0;
  drawSeabird(ctx, 900, 520 + Math.sin(t * 1.4) * 30, 1.7, Math.sin(t * 3) * .5, nap ? 0 : 1); if (nap) drawZs(ctx, 1060, 440, t * 2, .9, '#3a4a7a');
  label(ctx, 'NAPS IN MID-FLIGHT', 960, 880, 80, t, wt(51, 'nap'), '#ffd23a');
}));
// [52] rare genes: thriving on four to six hours
SHOTS.push(mk(52, 52, (ctx, lt, t) => {
  bgFlat(ctx, FLAT[0], FLAT[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawDNA(ctx, 420, 180, 600, t * .6, 1.4);
  drawStick(ctx, C(GREEN, { x: 1380, y: 840, s: 480, arms: { L: [2.5, .3], R: [.3, -.1] }, face: { eyes: 'happy', mouth: 'grin' } }));
  label(ctx, 'RARE GENES', 420, 110, 76, t, wt(52, 'genes'), '#ff8fc7'); label(ctx, '4 TO 6 HOURS', 960, 330, 110, t, wt(52, 'four'), '#ffd23a'); label(ctx, 'AND FINE', 960, 470, 60, t, wt(52, 'six') + .4);
}));
// [53] but zero? no animal has ever pulled that off
SHOTS.push(mk(53, 53, (ctx, lt, t) => {
  const cam = camA(t, lt); bgNight(ctx, t, cam);
  const no = t > wt(53, 'no'); const sh = no ? Math.sin(t * 9) * 14 : 0;
  drawCatLoaf(ctx, 380 + sh, GY, 1.6); drawElephant(ctx, 1000 - sh, GY, .7, 0); ctx.save(); drawJelly(ctx, 1560 + sh, 560, 1.2, t); ctx.restore();
  label(ctx, 'ZERO?', 960, 170, 200, t, wt(53, 'zero'), '#ffd23a'); label(ctx, 'NOBODY', 960, 380, 110, t, wt(53, 'no'), '#ff8a8a');
}));

// ===== 10. THE EXTRA HOURS =====
// [54-56] say evolution solved it. what would you actually do? be honest
SHOTS.push(mk(54, 56, (ctx, lt, t) => {
  const honest = ease(cue(t, wt(56, 'be'), .5));
  const cam = camA(t, lt, { z: lerp(1.02, 1.5, honest), dz: 0, y: lerp(540, 470, honest), x: lerp(960, 900, honest) }); bgRoom(ctx, t, cam, { night: true });
  drawStick(ctx, C(ME, { x: 900, y: GY, s: 560, arms: honest > .3 ? POSE.hips.arms : POSE.idle.arms, face: honest > .3 ? { eyes: 'half', mouth: 'smirk', browOne: 1 } : { eyes: 'normal', look: [.4, -.7], mouth: 'smile' } }));
  label(ctx, 'AWAKE ALL NIGHT', 500, 150, 64, t, wt(54, 'awake'), '#fff', wt(56, 'be')); label(ctx, 'PERFECTLY HEALTHY', 500, 250, 64, t, wt(54, 'perfectly'), '#7ee08a', wt(56, 'be'));
  label(ctx, '?', 1260, 300, 260, t, wt(55, 'what'), '#ffd23a', wt(56, 'be')); label(ctx, 'BE HONEST', 1400, 250, 90, t, wt(56, 'be'), '#ffd23a');
  chapterTag(ctx, t, S(54), '10 · THE EXTRA HOURS');
}));
// [57] month one: books, projects, the gym at 2 a.m.
SHOTS.push(mk(57, 57, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: false });
  const b = backOut(cue(t, wt(57, 'books'), .25)), p = backOut(cue(t, wt(57, 'projects'), .25)), g = cue(t, wt(57, 'gym'), .25);
  if (b > 0) for (let i = 0; i < 4; i++) drawBook(ctx, 360 + (i % 2) * 20, GY - i * 70 * b, 1.6 * b, ['#e0392f', '#3fa35b', '#2f63c9', '#f2b52a'][i]);
  if (p > 0) { drawDesk(ctx, 900, GY, 420 * p); drawLaptop(ctx, 900, GY - 190, 1.5 * p, '#c8ffd8'); }
  const lift = g > 0 ? .5 + .5 * Math.sin(t * 6) : 0;
  drawStick(ctx, C(ME, { x: 1500, y: GY, s: 520, arms: g > 0 ? { L: { ik: [-.2, -.62 - lift * .3], bend: -1 }, R: { ik: [.2, -.62 - lift * .3] } } : POSE.idle.arms, face: { eyes: g > 0 ? 'squint' : 'happy', mouth: g > 0 ? 'teeth' : 'smile' } }));
  if (g > 0) { applyCam(ctx, cam, 1); drawDumbbell(ctx, 1500, GY - (.62 + lift * .3) * 520, 2.2); ctx.setTransform(1, 0, 0, 1, 0, 0); drawDigital(ctx, 1500, 150, .9, '02:00'); }
  label(ctx, 'MONTH 1: EVERYTHING', 760, 130, 76, t, wt(57, 'everything'), '#ffd23a');
}));
// [58-59] after that: scroll. more hours aren't better hours
SHOTS.push(mk(58, 59, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: false });
  drawSofa(ctx, 960, GY, 1.15);
  drawStick(ctx, C(ME, { x: 960, y: GY - 30, s: 500, shadow: false, legs: { L: [1.25, -1.25], R: [1.25, -1.25] }, arms: { L: [.5, -.4], R: { ik: [.06, -.47] } }, headTilt: .12, face: { eyes: 'half', look: [.2, 1], mouth: 'flat' } }));
  applyCam(ctx, cam, 1); drawPhone(ctx, 960 + .06 * 500, GY - 30 - .47 * 500, .9, -.2);
  const n = Math.round(1 + cue(t, wt(58, 'scroll'), 3.5) * 7);
  label(ctx, 'SCROLL', 500, 200, 150, t, wt(58, 'scroll'), '#8fd8ff'); label(ctx, n + ' H LATER', 500, 360, 60, t, wt(58, 'scroll') + .3);
  label(ctx, 'MORE HOURS', 1460, 200, 80, t, wt(59, 'more')); label(ctx, 'NOT BETTER HOURS', 1460, 320, 70, t, wt(59, 'better'), '#ffd23a');
}));

// ===== 11. IF NOBODY SLEPT =====
// [60-61] cities never switch off: shops, schools, offices around the clock
SHOTS.push(mk(60, 61, (ctx, lt, t) => {
  const on = ease(cue(t, wt(61, 'never'), 1.2));
  const cam = camA(t, lt); bgCity(ctx, t, cam, { lit: lerp(.12, 1, on) });
  [['SHOP', 'shops', 120, '#c85a5a'], ['SCHOOL', 'schools', 720, '#5a8ac8'], ['OFFICE', 'offices', 1320, '#6aa86a']].forEach(([s, w, x, col]) => drawShop(ctx, x, 480, 380, col, t >= wt(61, w) ? s + ' 24H' : s, t >= wt(61, w) ? 1 : 0));
  ctx.setTransform(1, 0, 0, 1, 0, 0); drawDigital(ctx, 960, 130, .9, '03:00');
  label(ctx, 'AROUND THE CLOCK', 960, 880, 70, t, wt(61, 'around'), '#ffd23a');
  chapterTag(ctx, t, S(60), '11 · IF NOBODY SLEPT');
}));
// [62] bedrooms disappear, and so does the mattress industry
SHOTS.push(mk(62, 62, (ctx, lt, t) => {
  const cam = camA(t, lt);
  if (t < wt(62, 'and')) {
    bgRoom(ctx, t, cam, {}); const k = cue(t, wt(62, 'disappear'), .3);
    if (k < .5) drawBed(ctx, 960, GY, 1.4, {}); if (k > 0 && k < 1) puff(ctx, 960, GY - 150, 320 * k + 60, t, '#f3efe6', 5, 1 - k);
    label(ctx, 'BEDROOM', 960, 130, 90, t, S(62) + .2); strike(ctx, 960, 130, 520, cue(t, wt(62, 'disappear'), .2));
  } else {
    bgCity(ctx, t, cam, { night: false, lit: 0 }); drawShop(ctx, 660, 600, 420, '#b9a04a', 'MATTRESSES', 0);
    const k = cue(t, wt(62, 'mattress') + .3, .2); if (k > 0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(960, 560); ctx.rotate(-.12); ctx.scale(1.6 - .6 * easeOut(k), 1.6 - .6 * easeOut(k)); rrect(ctx, -280, -80, 560, 160, 18); fillStroke(ctx, '#fff', 10, '#ff5a5a'); text(ctx, 'CLOSED', 0, 6, 120, '#ff5a5a'); ctx.restore(); }
  }
}));
// [63] the night shift would just be called work
SHOTS.push(mk(63, 63, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: [1500, 130, 300, 250] });
  [[360, KID], [860, GREEN], [1360, ME]].forEach(([x, who], i) => { drawDesk(ctx, x + 150, GY, 360); drawLaptop(ctx, x + 150, GY - 190, 1.1); drawStick(ctx, C(who, { x: x - 60, y: GY, s: 420, arms: { L: [.5, -.4], R: [1.2 + Math.sin(t * 10 + i) * .1, .7] }, face: { eyes: 'normal', look: [1, .3], mouth: 'flat' } })); });
  ctx.setTransform(1, 0, 0, 1, 0, 0); rrect(ctx, 520, 90, 880, 150, 24); fillStroke(ctx, '#221c22', 8, '#ffd23a');
  const k = cue(t, wt(63, 'called'), .25);
  text(ctx, 'NIGHT', 760, 170, 90, k > .5 ? '#6b7186' : '#ffd23a'); text(ctx, 'SHIFT', 1130, 170, 90, k > .5 ? '#6b7186' : '#ffd23a'); strike(ctx, 940, 170, 720, k);
  label(ctx, 'WORK', 960, 340, 130, t, wt(63, 'work'), '#fff');
}));
// [64] power plants run flat out all night
SHOTS.push(mk(64, 64, (ctx, lt, t) => {
  const cam = camA(t, lt); bgNight(ctx, t, cam, { moonX: 260 });
  drawPowerPlant(ctx, 820, GY, 1.15, t, 1.8);
  ctx.setTransform(1, 0, 0, 1, 0, 0); meterH(ctx, 1260, 330, 500, 60, .2 + .8 * cue(t, wt(64, 'flat'), .8), '#ff6a3a');
  label(ctx, 'POWER DEMAND', 1510, 260, 54, t, wt(64, 'power')); label(ctx, 'LIGHTS NEVER OFF', 1510, 500, 60, t, wt(64, 'lights'), '#ffd23a');
}));
// [65] nocturnal animals lose the darkness
SHOTS.push(mk(65, 65, (ctx, lt, t) => {
  const cam = camA(t, lt); bgCity(ctx, t, cam, { lit: 1 });
  line(ctx, 500, GY - 240, 1420, GY - 240, 22, '#5a3c22');
  drawOwl(ctx, 960, GY - 240, 1.7, t > wt(65, 'lose') ? 1 : 0); tint(ctx, '#fff3a0', .12);
  label(ctx, 'WHERE DID THE DARK GO?', 960, 120, 72, t, wt(65, 'darkness'), '#ffd23a');
}));
// [66-67] the catch: the eight free hours may not stay free
SHOTS.push(mk(66, 67, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { win: false });
  const turned = i => cue(t, wt(67, 'work') + i * .18, .2);
  const sad = t > wt(67, 'work') + .8;
  drawStick(ctx, C(ME, { x: 480, y: GY, s: 520, arms: sad ? POSE.idle.arms : { L: [2.3, .4], R: [2.3, .4] }, face: sad ? { eyes: 'half', mouth: 'frown' } : { eyes: 'happy', mouth: 'grin' } }));
  drawStick(ctx, C(BOSS, { x: 1520, y: GY, s: 560, flip: -1, arms: { L: [.3, -.1], R: [1.5, .9] }, face: { eyes: 'half', mouth: 'smirk' } }));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  for (let i = 0; i < 8; i++) { const k = turned(i); rrect(ctx, 610 + i * 92, 250, 80, 80, 14); fillStroke(ctx, mix('#ffd23a', '#8d94a8', k), 7); text(ctx, k > .5 ? 'W' : 'F', 650 + i * 92, 293, 44, INK); }
  label(ctx, '8 FREE HOURS', 976, 150, 80, t, wt(66, 'eight'), '#ffd23a', wt(67, 'work') + .9); label(ctx, '8 MORE WORK HOURS', 976, 150, 72, t, wt(67, 'work') + 1.0, '#b9c4d6');
  label(ctx, 'THE CATCH', 976, 440, 70, t, wt(66, 'catch'), '#ff8a8a');
}));

// ===== 12. WHAT YOU'D LOSE =====
// [68-69] no more dreams
SHOTS.push(mk(68, 69, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { night: true, win: false });
  drawBed(ctx, 620, GY, 1.3, { sleeper: 'closed' });
  const pop = cue(t, wt(69, 'dreams'), .25);
  if (pop < 1) { ctx.save(); ctx.globalAlpha = 1 - pop; for (const [x, y, r] of [[900, 520, 22], [980, 450, 34]]) { circle(ctx, x, y, r); fillStroke(ctx, '#ffffff', 6); } cloudShape(ctx, 1320, 360, 250 * (1 + pop * .3), 12); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.stroke(); cloudShape(ctx, 1320, 360, 250 * (1 + pop * .3), 12); ctx.fillStyle = '#ffffff'; ctx.fill(); for (let i = 0; i < 4; i++) star5(ctx, 1180 + i * 95, 330 + Math.sin(t * 3 + i) * 30, 34, t + i, ['#ffd23a', '#ff8fc7', '#8fd8ff', '#7ee08a'][i]); ctx.restore(); }
  if (pop > 0 && pop < 1) { ctx.save(); ctx.globalAlpha = 1 - pop; burst(ctx, 1320, 340, 200 + pop * 200, 12, '#ffffff', 9); ctx.restore(); }
  label(ctx, 'NO MORE DREAMS', 1320, 620, 80, t, wt(69, 'dreams'), '#c9a8ff');
  chapterTag(ctx, t, S(68), "12 · WHAT YOU'D LOSE");
}));
// [70] no more waking up with the answer
SHOTS.push(mk(70, 70, (ctx, lt, t) => {
  const cam = camA(t, lt); bgRoom(ctx, t, cam, { win: false });
  drawBed(ctx, 760, GY, 1.3, { sleeper: 'open' });
  const k = cue(t, wt(70, 'answer'), .2); applyCam(ctx, cam, 1); drawBulb(ctx, 540, 380, 110, k);
  const x = cue(t, wt(70, 'answer') + .6, .2); if (x > 0) { ctx.save(); ctx.globalAlpha = x; line(ctx, 420, 250, 660, 520, 26, '#ff5a5a'); line(ctx, 660, 250, 420, 520, 26, '#ff5a5a'); ctx.restore(); }
  label(ctx, 'SLEEP ON IT', 1380, 250, 90, t, wt(70, 'sleeping'), '#ffd23a'); label(ctx, 'WAKE UP WITH THE ANSWER', 1380, 380, 50, t, wt(70, 'waking'));
}));
// [71] no more ending a terrible day by closing your eyes
SHOTS.push(mk(71, 71, (ctx, lt, t) => {
  const cam = camA(t, lt); bgDay(ctx, t, cam, { sun: false, top: '#6f7f96', bot: '#b9c4d6', grass: '#6aa860', grass2: '#588f52' });
  const shut = cue(t, wt(71, 'closing'), .3);
  drawStick(ctx, C(ME, { x: 960, y: GY, s: 540, lean: -.03, arms: POSE.idle.arms, face: { eyes: 'normal', blink: shut, mouth: 'frown' } }));
  applyCam(ctx, cam, 1); drawRainCloud(ctx, 960, 190, 190, t); tint(ctx, '#1a1830', .15 + .3 * shut);
  label(ctx, 'A TERRIBLE DAY', 420, 330, 76, t, wt(71, 'terrible'), '#b9c4d6');
}));
// [72] that small, perfect moment when your head hits the pillow
SHOTS.push(mk(72, 72, (ctx, lt, t) => {
  const hit = cue(t, wt(72, 'pillow'), .25);
  const cam = camA(t, lt, { z: 1.08, dz: .03 }); bgRoom(ctx, t, cam, { night: true });
  drawBed(ctx, 880, GY + 10 * Math.sin(hit * Math.PI), 1.4, { sleeper: 'closed' });
  if (hit > 0 && hit < 1) puff(ctx, 640, 640, 150 * hit + 30, t, '#ffffff', 3, 1 - hit);
  if (hit >= 1) drawZs(ctx, 700, 560, t, 1.2);
  label(ctx, 'AHHH', 1320, 300, 150, t, wt(72, 'pillow'), '#c9a8ff');
}));
// [73] without that reset, life is one single day that never ends
SHOTS.push(mk(73, 73, (ctx, lt, t) => {
  bgFlat(ctx, '#3ea6ee', '#d3f0fb'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const a = -Math.PI / 2 + (t - S(73)) * 1.5; drawSun(ctx, 960 + Math.cos(a) * 620, 520 + Math.sin(a) * 330, 70, t, 1);
  const flip = ((t - S(73)) * .9) % 1;
  rrect(ctx, 660, 240, 600, 520, 30); fillStroke(ctx, '#ffffff', 10); rrect(ctx, 660, 240, 600, 130, 30); fillStroke(ctx, '#e0392f', 10);
  text(ctx, 'TODAY', 960, 560, 150, INK); text(ctx, 'DAY 1', 960, 310, 76, '#fff');
  ctx.save(); ctx.globalAlpha = 1 - flip; ctx.translate(0, -flip * 260); rrect(ctx, 660, 370, 600, 390, 0); ctx.fillStyle = '#f3f6fb'; ctx.fill(); text(ctx, 'TODAY', 960, 560, 150, '#9aa2b3'); ctx.restore();
  label(ctx, 'NEVER ENDS', 960, 880, 84, t, wt(73, 'never'), '#ffd23a');
}));

// ===== 13. SO? =====
// [74-75] would never sleeping make life longer? in hours, yes
SHOTS.push(mk(74, 75, (ctx, lt, t) => {
  bgFlat(ctx, FLAT[0], FLAT[1]); ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.lineWidth = 70; ctx.beginPath(); ctx.arc(480, 540, 230, 0, TAU); ctx.strokeStyle = '#ffd23a'; ctx.stroke(); circle(ctx, 480, 540, 266); fillStroke(ctx, null, 7); circle(ctx, 480, 540, 194); fillStroke(ctx, null, 7);
  text(ctx, '24 h', 480, 530, 96, '#fff', INK, 14); text(ctx, '24 h', 480, 530, 96, '#fff');
  label(ctx, 'A LONGER LIFE?', 1320, 330, 96, t, wt(74, 'longer')); label(ctx, 'IN HOURS: YES', 1320, 520, 110, t, wt(75, 'yes'), '#7ee08a');
  chapterTag(ctx, t, S(74), '13 · SO?');
}));
// [76] sleep isn't wasted time: it cleans, files and repairs
SHOTS.push(mk(76, 76, (ctx, lt, t) => {
  bgFlat(ctx, '#141a3a', '#2a2f6e'); ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawBrain(ctx, 960, 610, 230, { glow: .5 + .3 * Math.sin(t * 3) });
  jobBadges(ctx, 960, 260, 96, t, [cue(t, wt(76, 'cleans'), .2), cue(t, wt(76, 'files'), .2), cue(t, wt(76, 'repairs'), .2)]);
  label(ctx, 'CLEAN', 672, 400, 50, t, wt(76, 'cleans'), '#ffd23a'); label(ctx, 'FILE', 960, 400, 50, t, wt(76, 'files'), '#f3d9b1'); label(ctx, 'REPAIR', 1248, 400, 50, t, wt(76, 'repairs'), '#8fd8ff');
  label(ctx, 'NOT WASTED TIME', 960, 90, 76, t, wt(76, 'wasted'));
}));
// [77] it's maintenance, and everything that skips maintenance breaks down
SHOTS.push(mk(77, 77, (ctx, lt, t) => {
  const cam = camA(t, lt); bgDay(ctx, t, cam);
  ctx.fillStyle = '#6c7280'; ctx.fillRect(-2000, GY - 30, 6000, 170); line(ctx, -2000, GY - 30, 4000, GY - 30, 6);
  drawCar(ctx, 520, GY + 60, 1.2, 0, '#3fa35b'); for (let i = 0; i < 3; i++) sparkle(ctx, 380 + i * 140, GY - 240 + Math.sin(t * 3 + i * 2) * 20, 30, .5 + .5 * Math.sin(t * 4 + i));
  const b = cue(t, wt(77, 'skips'), .3);
  drawCar(ctx, 1400, GY + 60 + b * 8, 1.2, 0, '#8d6a5a'); if (b > 0) for (let i = 0; i < 3; i++) { const k = ((t * .7 + i / 3) % 1); puff(ctx, 1600 + k * 40, GY - 120 - k * 280, 50 + k * 80, t, '#5a5f6c', 4 + i, (1 - k) * b); }
  label(ctx, 'MAINTENANCE', 960, 130, 100, t, wt(77, 'maintenance'), '#ffd23a'); label(ctx, 'SKIPPED', 1400, 330, 70, t, wt(77, 'skips'), '#ff8a8a'); label(ctx, 'DONE', 520, 330, 70, t, wt(77, 'maintenance') + .4, '#7ee08a');
}));
// [78-79] next time you sleep in: your brain is working the night shift
SHOTS.push(mk(78, 79, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.02, dz: .012 }); bgRoom(ctx, t, cam, { win: [150, 130, 340, 280] });
  drawBed(ctx, 700, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 520, 560, t, 1.2);
  ctx.setTransform(1, 0, 0, 1, 0, 0); drawDigital(ctx, 1560, 780, .8, '10:30', '#ffb347');
  const k = backOut(cue(t, wt(79, 'brain'), .3));
  if (k > 0) {
    for (const [x, y, r] of [[900, 500, 20], [980, 430, 32]]) { circle(ctx, x, y, r * k); fillStroke(ctx, '#ffffff', 6); }
    ctx.save(); cloudShape(ctx, 1340, 340, 270 * k, 12); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.stroke(); cloudShape(ctx, 1340, 340, 270 * k, 12); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore();
    drawBrain(ctx, 1340, 330, 120 * k);
    [[1140, 370, GREEN], [1540, 370, KID]].forEach(([x, y, who], i) => { const sw = Math.sin(t * 5 + i * 2) * 20; line(ctx, x + (i ? -30 : 30) + sw, y - 100, x + (i ? -70 : 70) + sw, y - 10, 8, '#a06a3c'); drawStick(ctx, C(who, { x, y, s: 170 * k, shadow: false, flip: i ? -1 : 1, arms: { L: [.4, -.2], R: [1.3, .5] }, face: { eyes: 'happy', mouth: 'smile' } })); });
  }
  label(ctx, 'THE NIGHT SHIFT', 1500, 650, 76, t, wt(79, 'night'), '#ffd23a');
}, 'cut'));
