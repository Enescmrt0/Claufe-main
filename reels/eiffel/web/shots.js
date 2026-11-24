// ---------- "The tower that grows in summer" (portrait Short) ----------
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const G = 1240, TH = 800;
const SHOTS = [];
const visitor = (ctx, o, k = 0) => drawStick(ctx, C({ cols: [PAL.blue, PAL.red, PAL.green, PAL.purple][k % 4], hat: 'none', belt: false }, o));
// [0] every summer the tower gets taller, nobody adds a piece
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); parisBG(ctx, t, cam, { sun: [880, 300], top: '#4aa8f0', bot: '#fff0c8' });
  const g = 1 + .07 * ease(clamp((t - .2) / 2.2)); const top = eiffel(ctx, 540, G, TH, { grow: g });
  ctx.save(); ctx.setLineDash([16, 12]); line(ctx, 160, G - TH, 940, G - TH, 5, 'rgba(255,255,255,.8)'); ctx.restore();
  if (g > 1.01) { line(ctx, 880, G - TH, 880, top[1], 10, '#ffd23a'); path(ctx, [[860, top[1] + 20], [880, top[1]], [900, top[1] + 20]], false); ctx.lineWidth = 10; ctx.strokeStyle = '#ffd23a'; ctx.stroke(); }
  chapterTag(ctx, t, .05, 'PARIS'); label(ctx, 'TALLER', 540, 230, 130, t, wt(0, 'taller') - .1, '#ffd23a'); label(ctx, 'EVERY SUMMER', 540, 350, 84, t, wt(0, 'summer') - .1, '#ffffff', wt(0, 'nobody') - .1); label(ctx, '0 NEW PIECES', 540, 350, 84, t, wt(0, 'nobody') - .1, '#ffffff');
} });
// [1] 7,000 tonnes of iron, millions of rivets
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#5a4a6a', '#2a2238'); applyCam(ctx, cam, 1);
  const rv = t > wt(1, 'rivets') - .6;
  if (!rv) { weight(ctx, 540, 1150, 520 * backOut(cue(t, wt(1, 'tonnes') - .4, .4)), '7,000 T'); label(ctx, '7,000 TONNES', 540, 280, 110, t, wt(1, '7') - .2, '#ffffff'); label(ctx, 'OF IRON', 540, 410, 90, t, wt(1, 'iron') - .2, '#c8a080'); }
  else { const n = Math.floor(clamp((t - wt(1, 'rivets') + .6) / 1.4) * 60); for (let i = 0; i < n; i++) { const r = rng(i * 7 + 5); rivet(ctx, 100 + r() * 880, 560 + r() * 680, 26 + r() * 16); } label(ctx, 'MILLIONS', 540, 280, 130, t, wt(1, 'millions') - .2, '#ffd23a'); label(ctx, 'OF RIVETS', 540, 410, 90, t, wt(1, 'rivets') - .2, '#ffffff'); }
} });
// [2] iron has a habit: warm it, it stretches
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const hot = clamp((t - wt(2, 'warm') + .2) / .8), st = ease(clamp((t - wt(2, 'stretches') + .2) / .8));
  ironBar(ctx, 540 - 300 - 80 * st, 820, 600 + 160 * st, 90, hot);
  if (hot > 0) for (let i = 0; i < 3; i++) flame(ctx, 340 + i * 200, 1000, 150 * hot, t + i);
  if (st > .1) { for (const sd of [-1, 1]) { const x = 540 + sd * (300 + 80 * st) + sd * 40; path(ctx, [[x, 790], [x + sd * 40, 820], [x, 850]], false); ctx.lineWidth = 10; ctx.strokeStyle = '#ffd23a'; ctx.stroke(); } }
  label(ctx, 'IRON HAS A HABIT', 540, 280, 90, t, wt(2, 'habit') - .3, '#ffffff', wt(2, 'warm') - .1); label(ctx, 'WARM →', 540, 280, 110, t, wt(2, 'warm') - .1, '#ff9a5a', wt(2, 'stretches') - .2); label(ctx, 'STRETCH!', 540, 280, 130, t, wt(2, 'stretches') - .2, '#ffd23a');
} });
// [3] a 1 m bar heated by 30 degrees grows less than half a millimetre
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#3a6a4a', '#1f3a2a'); applyCam(ctx, cam, 1);
  ironBar(ctx, 140, 760, 800, 70, clamp((t - wt(3, 'heated') + .2) / .8) * .5); text(ctx, '1 METER', 540, 680, 54, '#ffffff', INK, 0);
  thermo(ctx, 200, 1180, 300, clamp((t - wt(3, 'heated')) / 1), '#ff6a5a'); if (t > wt(3, '30') - .2) label(ctx, '+30°', 330, 1000, 70, t, wt(3, '30') - .2, '#ff9a5a');
  const mg = cue(t, wt(3, 'less') - .3, .3); if (mg > 0) { magnifier(ctx, 860, 900, 260 * mg, -.6); line(ctx, 940, 760, 948, 760, 70, '#ffd23a'); }
  label(ctx, 'NOT MUCH.', 540, 280, 120, t, S(3), '#ffffff', wt(3, 'less') - .3); label(ctx, '< 0.5 MM', 540, 280, 130, t, wt(3, 'less') - .3, '#ffd23a');
} });
// [4] but the tower is 300 m tall
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + .08 * clamp(lt / 2), dz: 0, y: 960 - 60 * clamp(lt / 2) }); parisBG(ctx, t, cam, { sun: [880, 300] });
  eiffel(ctx, 540, G, TH + 60); visitor(ctx, { x: 820, y: G + 10, s: 40, arms: { L: [2.4, .3], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'o' } });
  line(ctx, 960, G, 960, G - TH - 60, 8, '#ffd23a'); for (const yy of [G, G - TH - 60]) line(ctx, 930, yy, 990, yy, 8, '#ffd23a');
  label(ctx, '300 METERS', 540, 250, 120, t, wt(4, '300') - .2, '#ffd23a');
} });
// [5] winter vs summer: several centimeters taller, maybe up to 15
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgFlat(ctx, '#bcd8f0', '#e8f2fa'); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#ff9a4a'); g.addColorStop(1, '#ffe0a0'); ctx.fillStyle = g; ctx.fillRect(540, 0, 540, 1920); applyCam(ctx, cam, 1);
  ctx.fillStyle = '#f2f6fa'; ctx.fillRect(-200, G, 740, 900); ctx.fillStyle = '#6ab85a'; ctx.fillRect(540, G, 740, 900); line(ctx, -200, G, 1300, G, 7); line(ctx, 540, -100, 540, 2100, 8);
  for (let i = 0; i < 18; i++) { const r = rng(i * 3 + 7); circle(ctx, r() * 520, (r() * 1200 + t * 120) % 1240, 6); ctx.fillStyle = '#ffffff'; ctx.fill(); }
  const gr = 1 + .09 * ease(clamp((t - wt(5, 'hot') + .3) / 1.2)); eiffel(ctx, 270, G, 620); const tp = eiffel(ctx, 810, G, 620, { grow: gr });
  ctx.save(); ctx.setLineDash([14, 10]); line(ctx, 100, G - 620, 1000, G - 620, 5, 'rgba(40,40,60,.6)'); ctx.restore();
  text(ctx, 'WINTER', 270, 470, 60, '#2a4a7a', INK, 0); text(ctx, 'SUMMER', 810, 470, 60, '#c8322c', INK, 0);
  label(ctx, '+ SEVERAL CM', 540, 260, 100, t, wt(5, 'several') - .2, '#ffffff', wt(5, 'some') - .1); label(ctx, 'UP TO 15 CM?', 540, 260, 110, t, wt(5, 'some') - .1, '#ffd23a');
} });
// [6] and it doesn't grow evenly
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .04 }); parisBG(ctx, t, cam, { sun: [900, 330] });
  eiffel(ctx, 540, G, TH, { hot: clamp((t - S(6)) / .8), side: 1, lean: -40 * clamp((t - S(6)) / 1.5) });
  label(ctx, 'NOT EVENLY', 540, 250, 130, t, wt(6, 'evenly') - .3, '#ff6a5a');
} });
// [7] the sunny side stretches more, the top leans away from the sun and follows it all day
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const k = clamp((t - S(7) - .3) / (S(8) - S(7) - .6)); const a = Math.PI * (1 - k), sx = 540 + Math.cos(a) * 460, sy = 640 - Math.sin(a) * 380;
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); parisBG(ctx, t, cam, { sun: [sx, sy], top: k < .5 ? '#4aa8f0' : '#f0a05a', bot: '#fff0c8' });
  const side = Math.cos(a) > 0 ? 1 : -1; const lean = -Math.cos(a) * 90; eiffel(ctx, 540, G, TH, { hot: .8, side, lean });
  ctx.save(); ctx.beginPath(); ctx.arc(540, 640, 460, Math.PI, 2 * Math.PI); ctx.setLineDash([12, 14]); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.stroke(); ctx.restore();
  label(ctx, 'SUNNY SIDE STRETCHES', 540, 250, 72, t, wt(7, 'side') - .2, '#ffd23a', wt(7, 'leans') - .2); label(ctx, 'LEANS AWAY', 540, 250, 110, t, wt(7, 'leans') - .05, '#ffffff', wt(7, 'follows') - .2); label(ctx, 'FOLLOWS THE SUN', 540, 250, 100, t, wt(7, 'follows') - .2, '#ffd23a');
} });
// [8] at night it cools, shrinks, straightens
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); parisBG(ctx, t, cam, { night: true, moon: [860, 320], top: '#141a3a', bot: '#3a4486' });
  const k = ease(clamp((t - wt(8, 'cools') + .2) / 1.6)); eiffel(ctx, 540, G, TH, { lean: 60 * (1 - k), grow: 1.05 - .05 * k, col: '#7a5a4a' });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + t * .4; ctx.save(); ctx.globalAlpha = .4; circle(ctx, 540 + Math.cos(a) * 30, G - TH - 40 + Math.sin(a) * 10, 5); ctx.fillStyle = '#ffd86a'; ctx.fill(); ctx.restore(); }
  label(ctx, 'COOLS', 540, 250, 110, t, wt(8, 'cools') - .2, '#9ad8ff', wt(8, 'shrinks') - .1); label(ctx, 'SHRINKS', 540, 250, 110, t, wt(8, 'shrinks') - .1, '#9ad8ff', wt(8, 'straightens') - .1); label(ctx, 'STRAIGHTENS', 540, 250, 110, t, wt(8, 'straightens') - .1, '#ffffff');
} });
// [9] Gustave Eiffel planned for this: built to bend with heat and wind
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const bend = t > wt(9, 'designed') - .2;
  if (!bend) { bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#7a5a3a' }); applyCam(ctx, cam, 1); gustave(ctx, { x: 280, y: G + 160, s: 620, arms: { L: [.3, -.1], R: { ik: [.4, -.55] } }, face: { eyes: 'happy', mouth: 'smirk', look: [1, 0] } }); blueprint(ctx, 760, 760, 420, 520, t); chapterTag(ctx, t, S(9) + .05, 'GUSTAVE EIFFEL'); label(ctx, 'HE PLANNED IT', 540, 260, 100, t, wt(9, 'planned') - .2, '#ffffff'); }
  else { parisBG(ctx, t, cam, { top: '#8aa0b8', bot: '#d8e0e8' }); applyCam(ctx, cam, 1); windLines(ctx, t, 1, 400, 1100); eiffel(ctx, 540, G, TH, { lean: Math.sin(t * 2.5) * 50 }); label(ctx, 'BUILT TO BEND', 540, 250, 120, t, wt(9, 'bend') - .3, '#ffd23a'); }
} });
// [10] part of why it survived 130+ summers
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); parisBG(ctx, t, cam, { sun: [880, 320] });
  eiffel(ctx, 540, G, TH, { lean: Math.sin(t * 6) * 10 });
  const k = ease(clamp((t - S(10) - .1) / (S(11) - S(10) - .4))); const yr = Math.round(1889 + k * 137);
  label(ctx, String(yr), 540, 250, 140, t, S(10) + .05, '#ffd23a'); label(ctx, '130+ SUMMERS', 540, 390, 90, t, wt(10, '130') - .2, '#ffffff');
} });
// [11] visit in winter and in summer: not the same tower twice
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const sm = t > wt(11, 'summer') - .2;
  parisBG(ctx, t, cam, sm ? { sun: [880, 300], top: '#4aa8f0', bot: '#fff0c8' } : { snow: true, top: '#a8c0d8', bot: '#e8f0f8' });
  eiffel(ctx, 600, G, 700, { grow: sm ? 1.06 : 1 });
  visitor(ctx, { x: 220, y: G + 200, s: 460, arms: { L: [.3, -.1], R: { ik: [.36, -.6] } }, face: { eyes: 'happy', mouth: 'grin', look: [1, -1] } }, 1); camera3(ctx, 220 + .36 * 460 + 10, G + 200 - .6 * 460, 80);
  label(ctx, sm ? 'SUMMER' : 'WINTER', 540, 250, 120, t, sm ? wt(11, 'summer') - .2 : wt(11, 'winter') - .2, sm ? '#ffd23a' : '#9ad8ff', sm ? wt(11, 'same') - .2 : wt(11, 'summer') - .2); label(ctx, 'NOT THE SAME TOWER', 540, 250, 84, t, wt(11, 'same') - .2, '#ffffff');
} });
// [12] you've seen two slightly different ones
SHOTS.push({ start: S(12), end: S(13), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); parisBG(ctx, t, cam, { sun: [900, 300], top: '#ff9a5a', bot: '#ffd8a0' });
  eiffel(ctx, 300, G, 600); eiffel(ctx, 780, G, 600, { grow: 1.07, lean: -26, hot: .5, side: 1 });
  for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 560 + Math.sin(t * 3 + i) * 20, 26, t + i);
  label(ctx, 'TWO TOWERS', 540, 250, 130, t, wt(12, 'two') - .2, '#ffd23a'); label(ctx, '(SLIGHTLY DIFFERENT)', 540, 380, 64, t, wt(12, 'slightly') - .2, '#ffffff');
} });
function camera3(ctx, x, y, s) { rrect(ctx, x - s / 2, y - s * .32, s, s * .64, s * .1); fillStroke(ctx, '#3a3a44', 5); circle(ctx, x, y, s * .22); fillStroke(ctx, '#6a8ac8', 5); }
