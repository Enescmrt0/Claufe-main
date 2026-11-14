// ---------- "Why plane windows are round" (portrait Short, the de Havilland Comet) ----------
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
const ENG = { cols: ['#f6f1e8', '#f6f1e8'], hat: 'none', belt: false };
const INV = { cols: PAL.navy, hat: 'none', belt: false };
const PAX = { cols: PAL.red, hat: 'none', belt: false };
const skyUp = (ctx, t, cam, top = '#3ea6ee', bot = '#d3f0fb') => { applyCam(ctx, cam, .1); drawSky(ctx, top, bot, -400, 1900); applyCam(ctx, cam, .25); drawCloud(ctx, 200 + t * 30, 420, 110, 1); drawCloud(ctx, 900 + t * 20, 1500, 140, 2); drawCloud(ctx, 1400 - t * 10, 900, 90, 3); };
const seaBG = (ctx, t, cam, o = {}) => { applyCam(ctx, cam, .1); drawSky(ctx, o.top || '#3ea6ee', o.bot || '#d3f0fb', -400, 1150); applyCam(ctx, cam, .25); drawCloud(ctx, 260 + t * 20, 380, 100, 1); drawCloud(ctx, 1000 + t * 14, 250, 80, 2); applyCam(ctx, cam, .5); drawSea(ctx, 1150, t); };

const SHOTS = [];
// [0a] the Comet cruises, then starts to fall (in action on frame 1)
SHOTS.push({ start: S(0), end: wt(0, 'and') - .05, tr: 'whip', draw(ctx, lt, t) {
  const fall = cue(t, wt(0, 'falling'), 1.3);
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 3 + fall * 8 }); skyUp(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const x = 540 + Math.sin(t) * 20 + fall * 60, y = 820 + fall * fall * 520;
  if (fall > 0) { const pts = []; for (let i = 0; i < 14; i++) pts.push([x - 420 * Math.cos(.5 * fall) - i * 34, y - 120 * fall - i * 30 * fall]); smokeTrail(ctx, pts, t); }
  drawJet(ctx, x, y, 880, { rot: fall * .55 + Math.sin(t * 2) * .02 });
  if (fall > .2) { burst(ctx, x - 140, y - 60, 60 + Math.sin(t * 20) * 8, 9, '#ff8a3a', 3); }
  label(ctx, 'FIRST JET AIRLINER', 540, 330, 74, t, wt(0, 'first'), '#ffd23a', wt(0, 'falling') + .4);
} });
// [0b] the reason was the shape of a window
SHOTS.push({ start: wt(0, 'and') - .05, end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .05 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  const k = backOut(cue(t, wt(0, 'shape') - .1, .3));
  drawPanel(ctx, 540, 820, 560 * Math.max(.01, k), 230 * Math.max(.01, k), 'square', 0, 0, t);
  qmark(ctx, 820, 470, 220 * backOut(cue(t, wt(0, 'window'), .25)));
} });
// [1a] 1952: the Comet takes off
SHOTS.push({ start: S(1), end: wt(1, 'it') - .05, tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); applyCam(ctx, cam, .1); drawSky(ctx, '#3ea6ee', '#d3f0fb', -400, 1300);
  applyCam(ctx, cam, .2); drawCloud(ctx, 300 + t * 10, 300, 100, 1); drawCloud(ctx, 900, 500, 70, 2);
  applyCam(ctx, cam, .6); controlTower(ctx, 860, 1320);
  applyCam(ctx, cam, 1); runway(ctx, 1300, t);
  const go = clamp((t - wt(1, 'launched')) / 2.2);
  const x = -200 + go * go * 1400 + lt * 40, y = 1300 - 60 - go * go * 520;
  drawJet(ctx, x, y, 760, { rot: -go * .22, gear: go < .6 });
  for (const [i, px] of [[0, 150], [1, 300]]) drawStick(ctx, C(i ? ENG : INV, { x: px, y: 1560, s: 360, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }));
  chapterTag(ctx, t, S(1) + .1, '1952');
  label(ctx, 'de HAVILLAND COMET', 540, 300, 70, t, wt(1, 'havilland'), '#ffd23a');
} });
// [1b] higher and faster than anything else
SHOTS.push({ start: wt(1, 'it') - .05, end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); applyCam(ctx, cam, .1); drawSky(ctx, '#1f78d6', '#9fd4f6', -400, 1900);
  applyCam(ctx, cam, .4); for (let i = 0; i < 4; i++) drawCloud(ctx, ((i * 420 - t * 900) % 2200 + 2200) % 2200 - 400, 1450 + (i % 2) * 140, 160, i + 1);
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 8; i++) { const yy = 650 + i * 50, xx = ((i * 330 - t * 1800) % 1600 + 1600) % 1600 - 300; line(ctx, xx, yy, xx + 160, yy, 6, 'rgba(255,255,255,.7)'); }
  drawJet(ctx, 540, 860 + Math.sin(t * 2) * 10, 900, { rot: -.04, faces: true });
  label(ctx, 'HIGHER', 300, 380, 96, t, wt(1, 'higher'), '#ffd23a');
  label(ctx, 'FASTER', 780, 380, 96, t, wt(1, 'faster'), '#7ee08a');
  meterV(ctx, 990, 600, 40, 600, cue(t, wt(1, 'higher'), 1.2), '#ffd23a');
} });
// [2] people called it the future
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.05, dz: .03 }); bgDay(ctx, t, cam, { hills: false });
  applyCam(ctx, cam, .4); drawJet(ctx, 540 + Math.sin(t) * 10, 520, 640, { rot: -.05 });
  applyCam(ctx, cam, 1);
  const cols = [PAL.red, PAL.blue, PAL.green, PAL.yellow, PAL.purple];
  cols.forEach((c, i) => { const j = Math.abs(Math.sin(t * 6 + i)) * 30; drawStick(ctx, { cols: c, hat: 'none', belt: false, x: 140 + i * 200, y: GY + 60 - j, s: 420, arms: { L: [2.6, .2], R: [2.6, .2] }, face: { eyes: 'happy', mouth: 'grin' } }); });
  label(ctx, 'THE FUTURE', 540, 300, 120, t, wt(2, 'future') - .05, '#ffd23a');
  for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 260 + Math.sin(t * 3 + i) * 20, 22, t + i);
} });
// [3] January 1954: one breaks apart over the sea near Italy
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const brk = cue(t, wt(3, 'broke'), 1.8);
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 3 + (brk > 0 && brk < .5 ? 16 : 0) }); seaBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const x = 560 + lt * 20, y = 640;
  if (brk <= 0) drawJet(ctx, x, y, 760, { rot: .02 });
  else { drawJetBreak(ctx, x, y, 760, brk, t); if (brk < .5) burst(ctx, x, y, 200 * (1 - brk), 13, '#ffb347', 6); }
  tint(ctx, '#ff3a2a', brk > 0 && brk < .3 ? .2 * (1 - brk / .3) : 0);
  chapterTag(ctx, t, S(3) + .1, 'JANUARY 1954');
  label(ctx, 'ITALY', 840, 1060, 70, t, wt(3, 'italy'), '#ffffff');
} });
// [4a] investigators couldn't find the cause
SHOTS.push({ start: S(4), end: wt(4, 'and') - .05, tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); bgRoom(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const R = rng(7); for (let i = 0; i < 7; i++) { ctx.save(); ctx.translate(200 + i * 120, GY + 40 + (i % 2) * 30); ctx.rotate(R() - .5); ctx.beginPath(); ctx.rect(-50, -30, 100 + R() * 40, 60); fillStroke(ctx, i % 2 ? '#d9dee5' : '#aeb8c4', 6); ctx.restore(); }
  const o1 = { x: 330, y: GY + 120, s: 560, arms: { L: [.3, -.1], R: { ik: [.25, -.62] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 1] }, lean: .12 };
  drawStick(ctx, C(INV, o1)); magnifier(ctx, o1.x + .27 * 560, o1.y - .66 * 560, 70);
  drawStick(ctx, C(INV, { x: 760, y: GY + 120, s: 560, flip: -1, arms: { L: [.9, -2.2], R: [.9, -2.2] }, face: { eyes: 'normal', look: [-1, 0], mouth: 'frown', browAng: .3 } }));
  qmark(ctx, 330, 620, 150 * backOut(cue(t, wt(4, 'couldn'), .25))); qmark(ctx, 760, 580, 150 * backOut(cue(t, wt(4, 'cause'), .25)));
} });
// [4b] after a few changes the Comets went back into service
SHOTS.push({ start: wt(4, 'and') - .05, end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); applyCam(ctx, cam, .1); drawSky(ctx, '#3ea6ee', '#d3f0fb', -400, 1300);
  applyCam(ctx, cam, 1); runway(ctx, 1300, t);
  const go = clamp((t - wt(4, 'went')) / 1.6);
  drawJet(ctx, 300 + go * go * 900, 1240 - go * go * 420, 700, { rot: -go * .2, gear: go < .6 });
  const st = backOut(cue(t, wt(4, 'service') - .1, .25));
  if (st > 0) { ctx.save(); ctx.translate(560, 520); ctx.rotate(-.12); ctx.scale(st, st); rrect(ctx, -330, -80, 660, 160, 24); ctx.lineWidth = 16; ctx.strokeStyle = '#3fa35b'; ctx.stroke(); text(ctx, 'BACK IN SERVICE', 0, 0, 66, '#3fa35b', INK, 0); ctx.restore(); }
} });
// [5] two weeks later, another one went down
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const dn = cue(t, wt(5, 'down') - .4, 1.2);
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 3 + dn * 10 }); seaBG(ctx, t, cam, { top: '#3a4a7a', bot: '#a3a8c4' });
  applyCam(ctx, cam, 1);
  const x = 520 + dn * 80, y = 600 + dn * dn * 600;
  if (dn > 0) { const pts = []; for (let i = 0; i < 12; i++) pts.push([x - 300 - i * 30, y - 200 * dn - i * 26 * dn]); smokeTrail(ctx, pts, t); }
  drawJet(ctx, x, y, 760, { rot: dn * .7 });
  tint(ctx, '#ff2a2a', .1 * dn);
  chapterTag(ctx, t, S(5) + .05, '2 WEEKS LATER');
} });
// [6] engineers did something nobody had ever done
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .02 }); bgRoom(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const idea = cue(t, wt(6, 'something'), .3);
  [[230, 1], [540, -1], [850, -1]].forEach(([x, f], i) => { const o = { x, y: GY + 130, s: 560, flip: i === 0 ? 1 : f, arms: idea > 0 && i === 1 ? { L: [.3, -.1], R: [2.6, .2] } : { L: [.5, -1.2], R: [.5, -1.2] }, face: { eyes: idea > 0 ? 'wide' : 'normal', look: [i === 0 ? 1 : -1, 0], mouth: idea > 0 ? 'grin' : 'flat' } }; drawStick(ctx, C(ENG, o)); hardhat(ctx, o); });
  drawBulb(ctx, 540, 400, 90 * backOut(idea), idea);
} });
// [7] a whole Comet in a water tank; the cabin pumped up and down, flight after flight
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01, y: 980 }); bgFlat(ctx, '#3a4250', '#20262f');
  applyCam(ctx, cam, 1);
  const lower = clamp((t - wt(7, 'put')) / 1.6), fill = clamp((t - wt(7, 'water') + .2) / 1.0);
  drawTank(ctx, 540, 1500, 1000, 760, t, fill * .92);
  const pump = t > wt(7, 'pumped') ? Math.sin((t - wt(7, 'pumped')) * 9) : 0;
  const jy = lerp(250, 1180, easeOut(lower));
  ctx.save(); ctx.translate(540, jy); ctx.scale(1, 1 + pump * .05); drawJet(ctx, 0, 0, 820); ctx.restore();
  if (lower < 1) drawCrane(ctx, 980, 1500, 540, jy - 130);
  tankFrame(ctx, 540, 1500, 1000, 760);
  ctx.save(); rrect(ctx, 58, 758, 964, 724, 18); ctx.clip(); ctx.fillStyle = `rgba(40,140,210,${.35 * fill})`; ctx.fillRect(0, 1500 - 18 - 724 * fill * .92, 1080, 1000); ctx.restore();
  drawGauge(ctx, 220, 420, 120, .45 + pump * .4, 'PSI');
  const flights = Math.floor(clamp((t - wt(7, 'over')) / (S(8) - wt(7, 'over') + 1.2)) * 2100);
  if (t > wt(7, 'over')) { drawDigital(ctx, 720, 420, 1.1, String(flights).padStart(4, '0'), '#7dffb0'); text(ctx, 'FLIGHTS', 720, 520, 46, '#ffffff', INK, 0); }
} });
// [8] after about three thousand flights, the metal tore open
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const rip = cue(t, wt(8, 'tore'), .25);
  const cam = camA(t, lt, { z: 1.08 + rip * .1, dz: .02, y: 980, shake: rip > 0 && rip < 1 ? 20 : 3 }); bgFlat(ctx, '#3a4250', '#20262f');
  applyCam(ctx, cam, 1);
  drawTank(ctx, 540, 1500, 1000, 760, t, .92);
  const pump = Math.sin(t * 11);
  ctx.save(); ctx.translate(540, 1180); ctx.scale(1, 1 + pump * .05 * (1 - rip)); drawJet(ctx, 0, 0, 820); ctx.restore();
  ctx.save(); rrect(ctx, 58, 758, 964, 724, 18); ctx.clip(); ctx.fillStyle = 'rgba(40,140,210,.35)'; ctx.fillRect(0, 1500 - 18 - 724 * .92, 1080, 1000); ctx.restore();
  if (rip > 0) { burst(ctx, 470, 1110, 140 * (1 - rip * .4), 12, '#ffffff', 8, .4); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i - 4.5) * .2; const d = 60 + (t - wt(8, 'tore')) * 600; circle(ctx, 470 + Math.cos(a) * d, 1110 + Math.sin(a) * d, 12); ctx.fillStyle = 'rgba(120,200,255,.8)'; ctx.fill(); } }
  tankFrame(ctx, 540, 1500, 1000, 760);
  const n = Math.round(lerp(2100, 3000, clamp((t - S(8)) / (wt(8, 'flights') - S(8) + .1))));
  drawDigital(ctx, 720, 420, 1.1, String(n).padStart(4, '0'), n >= 3000 ? '#ff7d7d' : '#7dffb0'); text(ctx, 'FLIGHTS', 720, 520, 46, '#ffffff', INK, 0);
  label(ctx, 'RIP!', 300, 470, 130, t, wt(8, 'tore'), '#ff6a6a');
} });
// [9] the crack started at the sharp corner of a small square opening in the roof
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .03, dz: 0 }); bgFlat(ctx, '#2a3f8f', '#1a2556');
  applyCam(ctx, cam, 1);
  const crack = clamp((t - wt(9, 'crack')) / 1.6);
  drawPanel(ctx, 540, 860, 640, 230, 'square', crack, 0, t);
  const ring = cue(t, wt(9, 'corner'), .3);
  if (ring > 0) { ctx.beginPath(); ctx.arc(540 + 115, 860 - 115, 70 + Math.sin(t * 8) * 6, 0, TAU); ctx.lineWidth = 12; ctx.strokeStyle = '#ff4a3a'; ctx.globalAlpha = ring; ctx.stroke(); ctx.globalAlpha = 1; }
  label(ctx, 'SHARP CORNER', 540, 330, 86, t, wt(9, 'sharp'), '#ff6a6a');
  label(ctx, 'IN THE ROOF', 540, 1290, 60, t, wt(9, 'roof'), '#ffffff');
} });
// [10a] every climb swells the cabin like a balloon
SHOTS.push({ start: S(10), end: wt(10, 'sharp') - .05, tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); skyUp(ctx, t * .5, cam, '#1f78d6', '#9fd4f6');
  applyCam(ctx, cam, 1);
  const inf = .5 + .5 * Math.sin((t - S(10)) * 2.2 - 1.2);
  drawSection(ctx, 540, 860, 300, cue(t, wt(10, 'swells'), .4) * inf, t);
  label(ctx, 'PRESSURE', 540, 330, 100, t, wt(10, 'swells'), '#ff6a6a');
  const up = cue(t, wt(10, 'climbs') - .2, .4); if (up > 0) { ctx.save(); ctx.globalAlpha = up; path(ctx, [[960, 560], [900, 660], [1020, 660]]); fillStroke(ctx, '#ffd23a', 6); ctx.fillStyle = '#ffd23a'; ctx.fillRect(940, 660, 40, 200); ctx.strokeRect(940, 660, 40, 200); ctx.restore(); }
} });
// [10b] sharp corners collect all that stress in one tiny spot, again and again
SHOTS.push({ start: wt(10, 'sharp') - .05, end: wt(10, 'until') - .05, tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .03, dz: 0 }); bgFlat(ctx, '#f4efe4', '#e2d9c6');
  applyCam(ctx, cam, 1);
  const pulse = .55 + .45 * Math.max(0, Math.sin((t - wt(10, 'again')) * 7));
  const heat = cue(t, wt(10, 'collect'), .6) * (t > wt(10, 'again') ? pulse : 1);
  drawPanel(ctx, 540, 860, 680, 240, 'square', 0, heat, t);
  stressLines(ctx, 540, 860, 680, 240, 'square', t);
  label(ctx, 'STRESS', 540, 340, 110, t, wt(10, 'stress'), '#ff5a4a');
  label(ctx, 'AGAIN', 300, 1300, 70, t, wt(10, 'again'), '#ff5a4a'); label(ctx, '& AGAIN', 760, 1300, 70, t, wt(10, 'again', 1), '#ff5a4a');
} });
// [10c] until the metal gets tired and cracks (paper clip)
SHOTS.push({ start: wt(10, 'until') - .05, end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.05, dz: .02 }); bgFlat(ctx, '#ffd36b', '#f2a93a');
  applyCam(ctx, cam, 1);
  const snap = cue(t, wt(10, 'cracks'), .25);
  drawClip(ctx, 540, 860, 300, snap ? .5 : Math.sin(t * 9) * .7, snap);
  if (!snap) sweat(ctx, 640, 760, 70, 1);
  label(ctx, 'METAL FATIGUE', 540, 340, 90, t, wt(10, 'tired'), '#ffffff');
} });
// [11] round corners spread it out
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .03, dz: 0 }); bgFlat(ctx, '#e6f6ea', '#c6e8cf');
  applyCam(ctx, cam, 1);
  drawPanel(ctx, 540, 860, 680, 240, 'round', 0, .8, t);
  stressLines(ctx, 540, 860, 680, 240, 'round', t, 'rgba(30,110,60,.55)');
  label(ctx, 'SPREAD OUT', 540, 340, 110, t, wt(11, 'spread'), '#3fa35b');
} });
// [12] that's why the window next to your seat today has no corners
SHOTS.push({ start: S(12), end: S(13), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .025, x: 560 }); bgFlat(ctx, '#e9e4da', '#d3cbbb');
  applyCam(ctx, cam, 1);
  // cabin wall with a round window; clouds drift past outside
  ctx.save(); ctx.beginPath(); ctx.roundRect(560, 470, 300, 420, 150); ctx.clip();
  drawSky(ctx, '#3ea6ee', '#d3f0fb', 470, 900); drawCloud(ctx, 800 - ((t * 120) % 700), 700, 90, 2); drawCloud(ctx, 1100 - ((t * 80) % 900), 820, 70, 3);
  ctx.restore();
  ctx.beginPath(); ctx.roundRect(560, 470, 300, 420, 150); ctx.lineWidth = 26; ctx.strokeStyle = '#bdb4a2'; ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
  planeSeat(ctx, 360, 1300, 300);
  drawStick(ctx, C(PAX, { x: 360, y: 1300, s: 640, arms: { L: [.3, -.1], R: [.3, -.1] }, legs: { L: [1.3, -1.3], R: [1.3, -1.3] }, face: { eyes: t > wt(12, 'corner') - .3 ? 'happy' : 'normal', look: [1, -.3], mouth: 'smile' } }));
  const st = backOut(cue(t, wt(12, 'corner'), .3));
  if (st > 0) { ctx.save(); ctx.translate(900, 420); ctx.scale(st, st); circle(ctx, 0, 0, 70); fillStroke(ctx, '#3fa35b', 8); line(ctx, -30, 2, -8, 26, 14, '#fff'); line(ctx, -8, 26, 34, -24, 14, '#fff'); ctx.restore(); }
  label(ctx, 'NO CORNERS', 540, 330, 100, t, wt(12, 'single'), '#3fa35b');
} });
