// ---------- "Hubble is falling" (portrait Short) ----------
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
// [0] the most famous telescope is falling out of the sky; NASA asks for help (falling on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .04, shake: 4 }); spaceBG(ctx, t, cam, { limbY: 1400 - 120 * clamp(t / 4), glow: .3 });
  const fy = 760 + clamp(t / 4) * 140; hubble(ctx, 540, fy, 620, { rot: -.2 + Math.sin(t * .8) * .06, door: .5 });
  for (let i = 0; i < 3; i++) line(ctx, 260 + i * 260, fy - 300 - ((t * 400 + i * 120) % 200), 260 + i * 260, fy - 160 - ((t * 400 + i * 120) % 200), 6, 'rgba(255,255,255,.5)');
  label(ctx, 'FALLING', 540, 260, 140, t, wt(0, 'falling') - .2, '#ff6a5a', wt(0, 'nasa') - .2); label(ctx, 'NASA: HELP!', 540, 260, 130, t, wt(0, 'nasa') - .2, '#ffd23a');
} });
// [1] in orbit since 1990, the size of a school bus
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const bus = t > wt(1, 'school') - .3; spaceBG(ctx, t, cam, { limbY: 1300 });
  hubble(ctx, 540, bus ? 620 : 820, 640, { rot: -.05, door: .5 }); if (bus) { schoolBus(ctx, 540, 1080, 640); text(ctx, '=', 540, 900, 90, '#ffffff', INK, 0); }
  chapterTag(ctx, t, S(1) + .05, 'SINCE 1990'); label(ctx, 'SINCE 1990', 540, 260, 110, t, wt(1, '1990') - .3, '#ffffff', wt(1, 'school') - .3); label(ctx, 'SCHOOL BUS SIZE', 540, 260, 96, t, wt(1, 'school') - .3, '#ffd23a');
} });
// [2] galaxies so far away their light left before Earth existed
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + .3 * clamp(lt / 3), dz: 0 }); applyCam(ctx, cam, .05); bgFlat(ctx, '#05071a', '#0d0a24'); applyCam(ctx, cam, .2); drawStars(ctx, t, 120, 4, 1); applyCam(ctx, cam, 1);
  const cols = ['#c8a0ff', '#7fd0ff', '#ffb0d0', '#ffe08a', '#a0ffd0'];
  for (let i = 0; i < 9; i++) { const r = rng(i * 5 + 9); galaxy(ctx, 140 + r() * 800, 520 + r() * 760, 90 + r() * 110, t, cols[i % 5], r() * 3); }
  label(ctx, 'LIGHT OLDER', 540, 260, 110, t, wt(2, 'light') - .3, '#ffffff'); label(ctx, 'THAN EARTH', 540, 380, 110, t, wt(2, 'earth') - .3, '#ffd23a');
} });
// [3] there's a tiny bit of air up there, and it drags Hubble lower every day
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const drag = t > wt(3, 'drags') - .3; spaceBG(ctx, t, cam, { limbY: 1350 });
  const k = drag ? clamp((t - wt(3, 'drags') + .3) / 1.6) : 0; molecules(ctx, t, drag ? 30 : 14, -60, 1140, 420, 1100, -1);
  hubble(ctx, 540, 760 + 120 * k, 560, { rot: .04 + .05 * k }); if (drag) for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha = .6; line(ctx, 840 + i * 30, 720 + i * 40 + 120 * k, 1000 + i * 30, 720 + i * 40 + 120 * k, 6, '#bfe8ff'); ctx.restore(); }
  label(ctx, 'A LITTLE AIR', 540, 260, 110, t, wt(3, 'tiny') - .3, '#bfe8ff', wt(3, 'drags') - .3); label(ctx, 'DRAG ↓', 540, 260, 130, t, wt(3, 'drags') - .3, '#ff6a5a'); if (drag) label(ctx, 'LOWER EVERY DAY', 540, 380, 70, t, wt(3, 'lower') - .3, '#ffffff');
} });
// [4] no engine; shuttle astronauts used to fix it and push it back up
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); spaceBG(ctx, t, cam, { limbY: 1400 }); const sh = t > wt(4, 'space') - .3;
  if (!sh) { hubble(ctx, 540, 780, 600, { rot: -.05 }); line(ctx, 780, 660, 1000, 900, 18, '#e0392f'); line(ctx, 1000, 660, 780, 900, 18, '#e0392f'); label(ctx, 'NO ENGINE', 540, 260, 130, t, wt(4, 'engine') - .3, '#ff6a5a'); }
  else { const up = t > wt(4, 'push') - .3; const k = up ? ease(clamp((t - wt(4, 'push') + .3) / 1.2)) : 0; shuttle(ctx, 360, 980 - 120 * k, 560, -.05); hubble(ctx, 720, 720 - 120 * k, 380, { rot: -.08 }); spacesuit(ctx, { x: 640, y: 1000 - 120 * k, s: 240, arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'grin' } }); if (up) flameJet(ctx, 80, 980 - 120 * k, 200, t); label(ctx, up ? 'PUSH IT UP!' : 'ASTRONAUT FIXES', 540, 260, up ? 120 : 96, t, up ? wt(4, 'push') - .3 : wt(4, 'astronauts') - .3, up ? '#7ee08a' : '#ffffff'); }
} });
// [5] the last visit was 2009; nobody can reach it now
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); spaceBG(ctx, t, cam, { limbY: 1400 }); const nb = t > wt(5, 'nobody') - .3;
  hubble(ctx, 540, 760, 560, { rot: -.06 }); if (!nb) { bigCal(ctx, 540, 1110, 220, 'LAST VISIT', '2009'); label(ctx, 'LAST VISIT: 2009', 540, 260, 96, t, wt(5, '2009') - .3, '#ffffff'); }
  else { ctx.save(); ctx.globalAlpha = .7; ctx.beginPath(); ctx.arc(540, 760, 380, 0, TAU); ctx.setLineDash([20, 18]); ctx.lineWidth = 8; ctx.strokeStyle = '#ff6a5a'; ctx.stroke(); ctx.restore(); label(ctx, 'UNREACHABLE', 540, 260, 120, t, wt(5, 'nobody') - .3, '#ff6a5a'); }
} });
// [6] NASA estimates re-entry around 2033
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const k = clamp((t - S(6)) / (S(7) - S(6))); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 3 + 6 * k }); spaceBG(ctx, t, cam, { limbY: 1250 - 200 * k, glow: k });
  hubble(ctx, 540, 700 + 260 * k, 520, { rot: .2 * k }); if (k > .4) { ctx.save(); ctx.globalAlpha = (k - .4) * 1.6; flameJet(ctx, 760, 760 + 260 * k, 260, t, Math.PI * 1.25); ctx.restore(); }
  bigCal(ctx, 860, 540, 200, '~ YEAR', '2033', '#e0392f'); label(ctx, 'RE-ENTRY', 400, 270, 120, t, wt(6, 'fall') - .3, '#ff6a5a');
} });
// [7] on October 29th NASA asked companies for ideas
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a3f8f', '#1a2556'); applyCam(ctx, cam, 1);
  rfiDoc(ctx, 540, 820, 560 * backOut(cue(t, S(7) + .1, .35)), -.04);
  for (let i = 0; i < 3; i++) drawBulb(ctx, 200 + i * 340, 1260, 70, Math.sin(t * 4 + i) > 0 ? 1 : .3);
  chapterTag(ctx, t, S(7) + .05, 'OCT 29, 2026'); label(ctx, 'IDEAS WANTED', 540, 260, 110, t, wt(7, 'ideas') - .3, '#ffd23a');
} });
// [8] three options: boost it higher, repair & upgrade, or a safe ocean splashdown
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const st = t < wt(8, 'repair') - .15 ? 0 : t < wt(8, 'steer') - .15 ? 1 : 2; const cam = camA(t, lt, { z: 1.02, dz: .02 });
  if (st === 0) { spaceBG(ctx, t, cam, { limbY: 1400 }); const k = ease(clamp((t - wt(8, 'push') + .3) / 1)); servicer(ctx, 300, 900 - 200 * k, 280, t, [470, 800 - 200 * k]); hubble(ctx, 640, 800 - 200 * k, 460, { rot: -.05 }); flameJet(ctx, 160, 900 - 200 * k, 160, t); }
  if (st === 1) { spaceBG(ctx, t, cam, { limbY: 1400 }); hubble(ctx, 600, 800, 560, { rot: -.05 }); servicer(ctx, 260, 1000, 240, t, [520, 840 + Math.sin(t * 6) * 20]); if (Math.sin(t * 9) > .8) burst(ctx, 520, 840, 40, 8, '#ffd23a', 2); }
  if (st === 2) { oceanScene(ctx, t, cam); const k = clamp((t - wt(8, 'steer') + .1) / 1.6); hubble(ctx, 300 + 380 * k, 300 + 600 * k, 360, { rot: .6 }); if (k < 1) flameJet(ctx, 300 + 380 * k + 120, 300 + 600 * k - 80, 220, t, -2.2); else for (let i = 0; i < 6; i++) { const a = -Math.PI * (.15 + i * .14); line(ctx, 680, 900, 680 + Math.cos(a) * 180, 900 + Math.sin(a) * 180, 12, '#bfe8ff'); } }
  label(ctx, ['1. BOOST IT', '2. FIX & UPGRADE', '3. SAFE SPLASHDOWN'][st], 540, 260, [120, 96, 84][st], t, [S(8), wt(8, 'repair'), wt(8, 'steer')][st] - .15, ['#7ee08a', '#ffd23a', '#7fd0ff'][st]);
} });
// [9] companies have until November 30th
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#3a1018', '#12060a'); applyCam(ctx, cam, 1);
  bigCal(ctx, 540, 860, 520, 'DEADLINE', 'NOV 30', '#e0392f'); drawClock(ctx, 860, 1200, 90, (t * 6) % 12, '#ffffff');
  label(ctx, 'DEADLINE', 540, 270, 130, t, wt(9, 'until') - .3, '#ffd23a');
} });
// [10] NASA said no before: expensive, and a bad docking could break it
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const st = t < wt(10, 'expensive') - .2 ? 0 : t < wt(10, 'bad') - .2 ? 1 : 2; const cam = camA(t, lt, { z: 1.02, dz: .02, shake: st === 2 ? 8 : 3 });
  if (st === 0) { bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1); rfiDoc(ctx, 540, 820, 480, -.05); stamp(ctx, 540, 880, 'NO', cue(t, wt(10, 'no') - .1, .2), '#e0392f', -.15); label(ctx, 'SAID NO BEFORE', 540, 260, 100, t, wt(10, 'said') - .3, '#ffffff'); }
  if (st === 1) { bgFlat(ctx, '#2a5a3a', '#12301e'); applyCam(ctx, cam, 1); moneyBag(ctx, 540, 900, 380, Math.sin(t * 3) * .1); label(ctx, 'EXPENSIVE', 540, 260, 130, t, wt(10, 'expensive') - .2, '#7ee08a'); }
  if (st === 2) { spaceBG(ctx, t, cam, { limbY: 1400 }); hubble(ctx, 620, 760, 520, { rot: -.1 + Math.sin(t * 20) * .04 }); servicer(ctx, 260, 820, 240, t, [400, 780]); burst(ctx, 410, 780, 90, 10, '#ff6a5a', 3); label(ctx, 'RISKY DOCKING', 540, 260, 110, t, wt(10, 'bad') - .2, '#ff6a5a'); }
} });
// [11] any mission must fly by 2032
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); spaceBG(ctx, t, cam, { limbY: 1400 }); const k = ease(clamp((t - S(11)) / 1.4));
  hubble(ctx, 700, 700, 420, { rot: -.05 }); shuttle(ctx, 200 + 260 * k, 1080 - 260 * k, 360, -.4);
  bigCal(ctx, 290, 560, 200, 'FLY BY', '2032', '#2a4a9a'); label(ctx, 'FLY BY 2032', 540, 260, 120, t, wt(11, '2032') - .3, '#ffd23a');
} });
// [12] a second life, or a final splash
SHOTS.push({ start: S(12), end: S(13), tr: 'cut', draw(ctx, lt, t) {
  const sp = t > wt(12, 'final') - .3; const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (!sp) { spaceBG(ctx, t, cam, { limbY: 1400 }); hubble(ctx, 540, 760, 600, { rot: -.08 + Math.sin(t) * .03, door: .5 + .2 * Math.sin(t * 2) }); for (let i = 0; i < 5; i++) star5(ctx, 160 + i * 190, 1120 + Math.sin(t * 3 + i) * 20, 26, t + i); label(ctx, 'SECOND LIFE?', 540, 260, 120, t, wt(12, 'second') - .3, '#7ee08a'); }
  else { oceanScene(ctx, t, cam); hubble(ctx, 540, 860, 360, { rot: .5 }); for (let i = 0; i < 7; i++) { const a = -Math.PI * (.1 + i * .13); line(ctx, 540, 900, 540 + Math.cos(a) * 220, 900 + Math.sin(a) * 220, 12, '#bfe8ff'); } label(ctx, 'OR A SPLASH?', 540, 260, 120, t, wt(12, 'final') - .3, '#7fd0ff'); }
} });
