// ---------- "Napoleon was not short" (portrait Short) ----------
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
// [0] Napoleon wasn't actually short (stretches up on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#2a4aa8', '#12245a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .15; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  const k = ease(clamp((t - .2) / 1.0)); napoleon(ctx, { x: 540, y: G + 160, s: 380 + 380 * k, arms: POSE.hips.arms, face: { eyes: k < 1 ? 'wide' : 'squint', mouth: k < 1 ? 'o' : 'smug' } });
  label(ctx, 'NAPOLEON', 540, 230, 120, t, .05, '#ffffff', wt(0, 'short') - .3); label(ctx, "WASN'T SHORT", 540, 230, 120, t, wt(0, 'short') - .3, '#ffd23a');
} });
// [1] about 1.69 m: average or taller for a Frenchman of his time
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  heightChart(ctx, 540, G + 100, 900, t > wt(1, 'average') - .3 ? [[.72, 'AVG FRENCHMAN', '#9ab8ff']] : []);
  napoleon(ctx, { x: 330, y: G + 100, s: 900 * .75, arms: POSE.hips.arms, face: { eyes: 'squint', mouth: 'smug' } }); drawStick(ctx, { cols: ['#7a6a5a', '#7a6a5a'], hat: 'none', belt: false, x: 780, y: G + 100, s: 900 * .73, flip: -1, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'flat', look: [-1, 0] } });
  label(ctx, '1.69 M', 540, 230, 140, t, wt(1, '1') - .3, '#ffd23a');
} });
// [2] so where did the myth come from?
SHOTS.push({ start: S(2), end: S(3), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .06, r: -.02 }); bgFlat(ctx, '#7a4bc4', '#3a1c66'); applyCam(ctx, cam, 1);
  napoleon(ctx, { x: 520, y: 1320, s: 780, arms: { L: [.3, -.1], R: [2.9, -.6] }, face: { eyes: 'squint', mouth: 'frown', look: [1, -1] } }); qmark(ctx, 850, 620, 170, '#ffd23a');
  label(ctx, 'THE MYTH?', 540, 240, 140, t, wt(2, 'myth') - .3, '#ffffff');
} });
// [3] first, the numbers: French inches were longer than British inches
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#3a6a4a', '#1f3a2a'); applyCam(ctx, cam, 1);
  const a = cue(t, wt(3, 'french') - .3, .3), b = cue(t, wt(3, 'british') - .3, .3);
  if (a > 0) { ruler(ctx, 140, 760, 800 * a, 8, '#7fa8ff', 'FRENCH INCH  (2.71 CM)'); flagFR(ctx, 60, 560, 110, t); }
  if (b > 0) { ruler(ctx, 140, 1040, 750 * b, 8, '#ff9a9a', 'BRITISH INCH  (2.54 CM)'); }
  label(ctx, '1. THE NUMBERS', 540, 240, 110, t, S(3) + .05, '#ffd23a');
} });
// [4] "5 feet 2" in French units; the British read it as tiny
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const tiny = t > wt(4, 'tiny') - .4;
  rrect(ctx, 200, 520, 680, 220, 16); fillStroke(ctx, '#f5ecd0', 7); text(ctx, "5' 2\"", 540, 600, 110, '#2a1a1a', INK, 0); text(ctx, 'FRENCH UNITS', 540, 690, 40, '#7a6a4a', INK, 0);
  napoleon(ctx, { x: 540, y: G + 140, s: tiny ? 300 + 30 * Math.sin(t * 8) : 560, arms: POSE.hips.arms, face: { eyes: tiny ? 'wide' : 'squint', mouth: tiny ? 'o' : 'smug' } });
  if (tiny) drawStick(ctx, { cols: ['#c8322c', '#c8322c'], hat: 'none', belt: false, x: 860, y: G + 160, s: 560, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'grin', look: [-1, 1] } });
  label(ctx, 'READ AS... TINY', 540, 240, 100, t, wt(4, 'british') - .3, '#ff9a9a');
} });
// [5] the British loved to mock him: cartoons of a tiny angry man throwing tantrums
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 4 }); bgFlat(ctx, '#c8b89a', '#8a7a5a'); applyCam(ctx, cam, 1);
  cartoonFrame(ctx, 540, 860, 820, 760, () => { applyCam(ctx, cam, 1); ctx.fillStyle = '#f5ecd0'; ctx.fillRect(130, 480, 820, 760); drawStick(ctx, { cols: ['#c8322c', '#c8322c'], hat: 'none', belt: false, x: 780, y: 1160, s: 560, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'happy', mouth: 'grin', look: [-1, 1] } }); const j = Math.abs(Math.sin(t * 10)) * 20; napoleon(ctx, { x: 340, y: 1160 - j, s: 260, arms: { L: [2.6 + Math.sin(t * 12) * .3, .3], R: [2.6 - Math.sin(t * 12) * .3, .3] }, face: { eyes: 'squint', mouth: 'teeth' } }); tantrum(ctx, 340, 860 - j, t); });
  label(ctx, '2. BRITISH CARTOONS', 540, 240, 90, t, S(5) + .05, '#ffd23a');
} });
// [6] his nickname "the little corporal" was affection from his soldiers
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); campField(ctx, t, cam);
  napoleon(ctx, { x: 540, y: G + 160, s: 560, arms: POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile' } });
  for (let i = 0; i < 4; i++) { const x = [140, 300, 780, 940][i]; drawStick(ctx, { cols: ['#2a3a7a', '#f2ece0'], hat: 'none', belt: false, x, y: G + 200, s: 460, flip: x > 540 ? -1 : 1, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); }
  for (let i = 0; i < 3; i++) drawHeart(ctx, 360 + i * 180, 620 + Math.sin(t * 3 + i) * 20, 40);
  label(ctx, '3. "LE PETIT CAPORAL"', 540, 240, 84, t, wt(6, 'little') - .3, '#ffd23a'); label(ctx, '= A TERM OF LOVE', 540, 350, 70, t, wt(6, 'affection') - .3, '#ffffff');
} });
// [7] surrounded by his Imperial Guard, who had to be tall
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); campField(ctx, t, cam);
  for (let i = 0; i < 4; i++) grenadier(ctx, { x: [130, 320, 760, 950][i], y: G + 180, s: 620, arms: POSE.idle.arms, face: { eyes: 'squint', mouth: 'flat' } });
  napoleon(ctx, { x: 540, y: G + 180, s: 560, arms: POSE.hips.arms, face: { eyes: 'half', mouth: 'flat' } });
  label(ctx, 'TALL IMPERIAL GUARD', 540, 240, 84, t, wt(7, 'imperial') - .3, '#ffffff');
} });
// [8] the shortest thing about Napoleon was his temper
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05, shake: 6 }); bgFlat(ctx, '#e0392f', '#7a1018'); applyCam(ctx, cam, 1);
  const j = Math.abs(Math.sin(t * 10)) * 16; napoleon(ctx, { x: 540, y: G + 160 - j, s: 720, arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'squint', mouth: 'teeth' } }); tantrum(ctx, 540, 700 - j, t);
  label(ctx, 'SHORT TEMPER', 540, 240, 130, t, wt(8, 'temper') - .3, '#ffd23a');
} });
