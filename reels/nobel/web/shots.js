// ---------- "The scientist who dissolved two Nobel Prizes" (portrait Short) ----------
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
const SHOTS = [];
// [0] 1940: a scientist hid two Nobel Prizes by dissolving them in acid (medal splashes into the jar on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#2a1a3a', '#0e0814'); applyCam(ctx, cam, 1);
  const k = clamp(t / .5), d = clamp((t - wt(0, 'dissolving') + .3) / 1.4);
  jar(ctx, 540, 1250, 620, t, { medals: [d, d * .9], bubbles: d > 0 });
  if (k < 1) { medal(ctx, 440, 300 + 700 * easeIn(k), 80, { rot: t * 6 }); medal(ctx, 640, 240 + 760 * easeIn(k), 80, { rot: -t * 6 }); }
  chapterTag(ctx, t, .05, '1940'); label(ctx, '2 NOBEL PRIZES', 540, 230, 110, t, wt(0, 'two') - .2, '#ffd23a'); label(ctx, '...IN ACID', 540, 360, 110, t, wt(0, 'acid') - .2, '#ff9a3a');
} });
// [1] Nazis invading Denmark; two gold medals at Niels Bohr's institute in Copenhagen
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); const lab = t > wt(1, 'gold') - .3;
  if (!lab) { bgCity(ctx, t, cam); applyCam(ctx, cam, 1); flagDK(ctx, 120, 420, 200, t); const k = clamp((t - S(1)) / 1.6); for (let i = 0; i < 5; i++) soldier(ctx, { x: 1200 - k * 700 + i * 140, y: GY + 300, s: 340, flip: -1, arms: POSE.idle.arms, face: { eyes: 'squint', mouth: 'flat' } }); label(ctx, 'INVASION', 540, 260, 120, t, wt(1, 'invading') - .2, '#ff6a5a'); }
  else { labRoom(ctx, t, cam); medal(ctx, 420, 900, 110, { ribbon: true }); medal(ctx, 660, 900, 110, { ribbon: true }); chapterTag(ctx, t, wt(1, 'gold') - .2, 'COPENHAGEN'); label(ctx, '2 GOLD MEDALS', 540, 260, 110, t, wt(1, 'gold') - .3, '#ffd23a'); }
} });
// [2] they belonged to German physicists who opposed the Nazis; names engraved
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const eng = t > wt(2, 'names') - .3; bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  if (!eng) { physicist(ctx, { x: 300, y: G + 160, s: 560, arms: { L: [.3, -.1], R: [1.5, .1] }, face: { eyes: 'squint', mouth: 'frown' } }, 0); physicist(ctx, { x: 780, y: G + 160, s: 560, flip: -1, arms: { L: [.3, -.1], R: [1.5, .1] }, face: { eyes: 'squint', mouth: 'frown' } }, 1); text(ctx, 'VON LAUE', 300, 560, 54, '#ffffff', INK, 0); text(ctx, 'FRANCK', 780, 560, 54, '#ffffff', INK, 0); label(ctx, 'OPPOSED THE NAZIS', 540, 260, 90, t, wt(2, 'opposed') - .2, '#ffffff'); }
  else { medal(ctx, 540, 860, 340, { name: 'M. VON LAUE' }); magnifier(ctx, 700, 1000, 280, -.6); label(ctx, 'NAMES ON THE GOLD', 540, 260, 90, t, wt(2, 'names') - .3, '#ff6a5a'); }
} });
// [3] George de Hevesy dropped them into aqua regia
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); labRoom(ctx, t, cam);
  const dr = clamp((t - wt(3, 'dropped') + .1) / .5), d = clamp((t - wt(3, 'aqua') + .2) / 1.6);
  jar(ctx, 680, 980, 420, t, { medals: dr >= 1 ? [d, d * .9] : [], bubbles: dr >= 1, col: `rgba(255,${Math.round(220 - 80 * d)},${Math.round(120 - 90 * d)},.85)` });
  if (dr < 1) { medal(ctx, 640, 420 + 380 * easeIn(dr), 50, { rot: t * 5 }); medal(ctx, 720, 400 + 400 * easeIn(dr), 50, { rot: -t * 5 }); }
  hevesy(ctx, { x: 260, y: G + 160, s: 600, arms: { L: [.3, -.1], R: { ik: [.5, -.62] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } });
  label(ctx, 'GEORGE DE HEVESY', 540, 230, 90, t, wt(3, 'george') - .2, '#ffffff', wt(3, 'aqua') - .2); label(ctx, 'AQUA REGIA', 540, 230, 120, t, wt(3, 'aqua') - .2, '#ff9a3a'); if (t > wt(3, 'dissolves') - .3) label(ctx, 'DISSOLVES GOLD', 540, 350, 76, t, wt(3, 'dissolves') - .3, '#ffd23a');
} });
// [4] he left the orange jar on a shelf
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.7, dz: .08, x: 545, y: 760 }); labRoom(ctx, t, cam, { gap: true }); const k = ease(clamp((t - S(4)) / 1.0));
  jar(ctx, 545, 820 + (1 - k) * 300, 150, t, { col: 'rgba(240,140,30,.85)' });
  label(ctx, 'JUST A JAR', 540, 260, 120, t, wt(4, 'jar') - .3, '#ff9a3a'); label(ctx, 'ON A SHELF', 540, 380, 96, t, wt(4, 'shelf') - .3, '#ffffff');
} });
// [5] soldiers searched the building and walked right past it
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, shake: 4 }); labRoom(ctx, t, cam); jar(ctx, 545, 820, 150, t, { col: 'rgba(240,140,30,.85)' });
  const k = clamp((t - S(5)) / (S(6) - S(5))); for (let i = 0; i < 3; i++) soldier(ctx, { x: -150 + k * 1300 - i * 200, y: G + 200, s: 460, arms: POSE.idle.arms, face: { eyes: 'squint', mouth: 'flat', look: [i === 0 && k > .4 && k < .6 ? 0 : 1, 0] } });
  if (k > .55) { ctx.save(); ctx.globalAlpha = .9; circle(ctx, 545, 740, 120); ctx.lineWidth = 10; ctx.strokeStyle = '#7ee08a'; ctx.stroke(); ctx.restore(); }
  label(ctx, 'SEARCH!', 540, 260, 120, t, wt(5, 'searched') - .2, '#ff6a5a', wt(5, 'walked') - .2); label(ctx, 'WALKED RIGHT PAST', 540, 260, 90, t, wt(5, 'walked') - .2, '#7ee08a');
} });
// [6] after the war: gold back out, medals recast and returned
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const rc = t > wt(6, 'recast') - .3; bgFlat(ctx, rc ? '#2a6a4a' : '#5a4a2a', rc ? '#123a28' : '#2a2010'); applyCam(ctx, cam, 1);
  if (!rc) { jar(ctx, 380, 1180, 380, t, { level: .4, col: 'rgba(200,200,180,.5)' }); for (let i = 0; i < 6; i++) { const r = rng(i * 5 + 1); circle(ctx, 780 + (r() - .5) * 160, 1100 - r() * 120, 24); fillStroke(ctx, '#f2c22a', 5); } label(ctx, 'GOLD BACK OUT', 540, 260, 110, t, wt(6, 'gold') - .3, '#ffd23a'); }
  else { const k = backOut(cue(t, wt(6, 'recast') - .2, .4)); medal(ctx, 360, 860, 150 * k, { ribbon: true, name: 'VON LAUE' }); medal(ctx, 720, 860, 150 * k, { ribbon: true, name: 'FRANCK' }); for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 1180 + Math.sin(t * 3 + i) * 20, 26, t + i); label(ctx, 'RECAST & RETURNED', 540, 260, 90, t, wt(6, 'recast') - .3, '#7ee08a'); }
  chapterTag(ctx, t, S(6) + .05, 'AFTER THE WAR');
} });
// [7] and Hevesy later won a Nobel Prize of his own
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  hevesy(ctx, { x: 420, y: G + 160, s: 680, arms: { L: [2.5, .3], R: { ik: [.42, -.7] } }, face: { eyes: 'happy', mouth: 'grin' } }); medal(ctx, 420 + .42 * 680 + 30, G + 160 - .7 * 680 - 20, 90, { ribbon: true });
  label(ctx, 'HIS OWN', 540, 260, 130, t, wt(7, 'own') - .4, '#ffffff'); label(ctx, 'NOBEL PRIZE', 540, 390, 110, t, wt(7, 'nobel') - .2, '#ffffff');
} });
