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
const walkL = (t, sp = 7, k = 0) => ({ legs: { L: [.5 * Math.sin(t * sp + k), -.25 - .25 * Math.max(0, Math.sin(t * sp + k))], R: [-.5 * Math.sin(t * sp + k), -.25 - .25 * Math.max(0, -Math.sin(t * sp + k))] } });
// [0] 1859: a broke businessman declared himself Emperor of the US; San Francisco went along
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const p = t < wt(0, 'and') - .1 ? 0 : 1;
  if (p === 0) { bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } norton(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [.9, -2.2], R: [2.4, .2] }, face: { eyes: 'squint', mouth: 'smug' === '' ? 'smile' : 'smirk' } }); chapterTag(ctx, t, .05, 'SAN FRANCISCO, 1859'); label(ctx, 'EMPEROR OF THE USA', 540, 260, 96, t, wt(0, 'emperor') - .2, '#ffd23a'); }
  else { sfStreet(ctx, t, cam); applyCam(ctx, cam, 1); norton(ctx, Object.assign({ x: 540, y: G + 200, s: 620, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'happy', mouth: 'smile' } }, walkL(t))); for (let i = 0; i < 4; i++) townsfolk(ctx, { x: [140, 300, 800, 960][i], y: G + 200 + (i % 2) * 30, s: 440, flip: i > 1 ? -1 : 1, arms: { L: [.3, -.1], R: [2.0 + Math.sin(t * 4 + i) * .2, -2.0] }, face: { eyes: 'happy', mouth: 'grin', look: [i > 1 ? -1 : 1, 0] } }, i); label(ctx, 'WENT ALONG', 540, 260, 130, t, wt(0, 'went') - .2, '#ffffff'); }
} });
// [1] Joshua Norton lost his fortune trying to buy up all the rice in the city
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); sfStreet(ctx, t, cam, { top: '#a8b0b8', sun: false }); applyCam(ctx, cam, 1); const lost = t > wt(1, 'fortune') - .2; for (let i = 0; i < 6; i++) riceSack(ctx, 600 + (i % 3) * 150, G - 20 - Math.floor(i / 3) * 140, 160);
  norton(ctx, { x: 300, y: G + 200, s: 660, arms: lost ? { L: [2.6, -1.6], R: [2.6, -1.6] } : { L: [.3, -.1], R: [1.6, .3] }, face: lost ? { eyes: 'wide', mouth: 'o' } : { eyes: 'happy', mouth: 'grin', look: [1, 0] } }, false); if (lost) for (let i = 0; i < 5; i++) { const k = ((t * .8 + i / 5) % 1); ctx.save(); ctx.globalAlpha = 1 - k; text(ctx, '$', 300 + Math.sin(i * 2) * 120, 600 - k * 300, 70, '#7ee08a', INK, 8); ctx.restore(); }
  label(ctx, 'JOSHUA NORTON', 540, 260, 120, t, wt(1, 'joshua') - .2, '#ffffff', wt(1, 'fortune') - .2); label(ctx, 'LOST IT ALL', 540, 260, 130, t, wt(1, 'fortune') - .2, '#e0392f', wt(1, 'rice') - .2); label(ctx, 'ON RICE', 540, 260, 140, t, wt(1, 'rice') - .2, '#ffd23a');
} });
// [2] he sent a letter naming himself Emperor Norton I; the paper printed it
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); const pr = t > wt(2, 'the', 1) - .1;
  if (!pr) { bgFlat(ctx, '#3a3f6b', '#2a2e52'); applyCam(ctx, cam, 1); drawDesk(ctx, 540, G + 40, 640); norton(ctx, { x: 400, y: G + 200, s: 640, arms: { L: [.3, -.1], R: { ik: [.38, -.4] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 1] } }, false); envelope(ctx, 680, G - 200, 140); label(ctx, 'A LETTER', 540, 260, 130, t, wt(2, 'letter') - .2, '#ffffff', wt(2, 'emperor') - .2); label(ctx, 'NORTON I', 540, 260, 140, t, wt(2, 'emperor') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#e8d8b8', '#c8b088'); applyCam(ctx, cam, 1); paperBig(ctx, 540, 820, 640, 'NORTON I\nEMPEROR OF\nTHE U.S.', -.05); stamp(ctx, 540, 1100, 'PRINTED', cue(t, wt(2, 'printed') - .1, .2), '#c8322c', -.1); }
} });
// [3] blue army uniform with gold epaulettes, a tall hat with a feather
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06 + lt * .03, dz: 0 }); bgFlat(ctx, '#2a4a8a', '#12245a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore(); }
  norton(ctx, { x: 540, y: G + 220, s: 860, arms: POSE.hips.arms, face: { eyes: 'squint', mouth: 'smirk' } }); if (t > wt(3, 'gold') - .2) for (const sd of [-1, 1]) sparkle(ctx, 540 + sd * .14 * 860, G + 220 - .6 * 860, 30 + 8 * Math.sin(t * 8)); if (t > wt(3, 'feather') - .3) sparkle(ctx, 640, 260, 40);
  label(ctx, 'BLUE UNIFORM', 540, 260, 110, t, wt(3, 'blue') - .2, '#9ad8ff', wt(3, 'gold') - .2); label(ctx, 'GOLD EPAULETTES', 540, 260, 104, t, wt(3, 'gold') - .2, '#ffd23a', wt(3, 'tall') - .2); label(ctx, '+ FEATHER HAT', 540, 260, 110, t, wt(3, 'tall') - .2, '#7ee08a');
} });
// [4] he ordered Congress to shut down; nobody listened
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const nob = t > wt(4, 'nobody') - .1;
  if (!nob) { sfStreet(ctx, t, cam); applyCam(ctx, cam, 1); norton(ctx, { x: 340, y: G + 200, s: 660, arms: { L: [.3, -.1], R: [2.2, -.2] }, face: { eyes: 'squint', mouth: 'teeth' } }); paperBig(ctx, 780, 760, 300, 'DECREE:\nCONGRESS\nCLOSED', .08); label(ctx, 'SHUT DOWN CONGRESS', 540, 260, 90, t, wt(4, 'congress') - .2, '#e0392f'); }
  else { bgFlat(ctx, '#8ab8e0', '#e8f0f2'); applyCam(ctx, cam, 1); capitol(ctx, 540, 1000, 860); for (let i = 0; i < 3; i++) { const k = ((t * .5 + i / 3) % 1); ctx.save(); ctx.globalAlpha = 1 - k; text(ctx, 'z', 640 + k * 80 + i * 40, 520 - k * 160, 60, '#ffffff', INK, 8); ctx.restore(); } label(ctx, 'NOBODY LISTENED', 540, 260, 104, t, wt(4, 'nobody') - .1, '#ffffff'); }
} });
// [5] but the city loved him; free meals; shops accepted his own money
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(5, 'restaurants') - .1 ? 0 : t < wt(5, 'and') - .1 ? 1 : 2;
  if (p === 0) { sfStreet(ctx, t, cam); applyCam(ctx, cam, 1); norton(ctx, Object.assign({ x: 540, y: G + 200, s: 640, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, walkL(t))); for (let i = 0; i < 4; i++) drawHeart(ctx, 200 + i * 220, 520 + Math.sin(t * 4 + i) * 20, 50); label(ctx, 'LOVED HIM', 540, 260, 140, t, wt(5, 'loved') - .2, '#ff9ab0'); }
  else if (p === 1) { bgFlat(ctx, '#f2d8a8', '#d8a868'); applyCam(ctx, cam, 1); rrect(ctx, 200, 1000, 680, 30, 6); fillStroke(ctx, '#f2f2ee', 6); for (const lx of [260, 820]) line(ctx, lx, 1030, lx, 1240, 12, '#7a5236'); ellipse(ctx, 540, 990, 120, 30); fillStroke(ctx, '#ffffff', 5); ellipse(ctx, 540, 970, 80, 30); fillStroke(ctx, '#c86a3a', 5); norton(ctx, { x: 540, y: 1000, s: 560, shadow: false, arms: { L: { ik: [-.25, -.35] }, R: { ik: [.25, -.35] } }, face: { eyes: 'happy', mouth: 'grin' } }); label(ctx, 'FREE MEALS', 540, 260, 130, t, wt(5, 'free') - .3, '#ffd23a'); }
  else { sfStreet(ctx, t, cam); applyCam(ctx, cam, 1); townsfolk(ctx, { x: 780, y: G + 200, s: 620, flip: -1, arms: { L: [.3, -.1], R: { ik: [.42, -.52] } }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }, 0); norton(ctx, { x: 300, y: G + 200, s: 640, arms: { L: [.3, -.1], R: { ik: [.42, -.52] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); nortonNote(ctx, 540, G + 200 - .52 * 640, 220, -.1); label(ctx, 'HIS OWN MONEY', 540, 260, 120, t, wt(5, 'money') - .3, '#7ee08a'); }
} });
// [6] arrested in 1867; public furious; chief let him go; officers saluted him
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(6, 'the') - .1 ? 0 : t < wt(6, 'the', 1) - .1 ? 1 : 2;
  sfStreet(ctx, t, cam); applyCam(ctx, cam, 1);
  if (p === 0) { cop(ctx, { x: 720, y: G + 200, s: 640, flip: -1, arms: { L: [.3, -.1], R: { ik: [.42, -.5] } }, face: { eyes: 'squint', mouth: 'flat', look: [-1, 0] } }, 0); norton(ctx, { x: 360, y: G + 200, s: 640, arms: { L: [2.6, -1.6], R: [1.6, .3] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }); chapterTag(ctx, t, wt(6, '1867') - .2, '1867'); label(ctx, 'ARRESTED', 540, 260, 140, t, wt(6, 'arrested') - .2, '#4a7ae0'); }
  else if (p === 1) { for (let i = 0; i < 5; i++) townsfolk(ctx, { x: 120 + i * 210, y: G + 200 + (i % 2) * 30, s: 480, lean: Math.sin(t * 9 + i) * .05, arms: { L: [.3, -.1], R: [2.6, .1 + Math.sin(t * 10 + i) * .2] }, face: { eyes: 'angry' === '' ? 'squint' : 'squint', mouth: 'teeth' } }, i); label(ctx, 'FURIOUS', 540, 260, 150, t, wt(6, 'furious') - .3, '#e0392f'); }
  else { cop(ctx, { x: 760, y: G + 200, s: 640, flip: -1, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } }, 1); norton(ctx, Object.assign({ x: 320 + (t - wt(6, 'the', 1)) * 40, y: G + 200, s: 640, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }, walkL(t))); label(ctx, 'LET GO', 540, 260, 140, t, wt(6, 'let') - .2, '#ffffff', wt(6, 'saluted') - .3); label(ctx, 'SALUTE!', 540, 260, 150, t, wt(6, 'saluted') - .3, '#ffd23a'); }
} });
// [7] uniform wore out; city government paid for a new one
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const paid = t > wt(7, 'the') - .1;
  if (!paid) { sfStreet(ctx, t, cam, { top: '#a8b0b8', sun: false }); applyCam(ctx, cam, 1); norton(ctx, { x: 540, y: G + 200, s: 760, arms: { L: [.3, -.1], R: [1.2, .4] }, face: { eyes: 'half', mouth: 'frown', look: [0, 1] } }); for (let i = 0; i < 5; i++) { const r = rng(i + 2); ctx.save(); ctx.translate(440 + r() * 200, G + 200 - (.35 + r() * .2) * 760); path(ctx, [[-14, -10], [14, -6], [8, 12], [-10, 8]]); ctx.fillStyle = '#c8b898'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); } label(ctx, 'WORN OUT', 540, 260, 140, t, wt(7, 'wore') - .2, '#c8a878'); }
  else { tailorShop(ctx, t, cam); applyCam(ctx, cam, 1); cityHall(ctx, 860, 760, 300); norton(ctx, { x: 420, y: G + 220, s: 760, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); for (let i = 0; i < 3; i++) sparkle(ctx, 300 + i * 120, 760 + Math.sin(t * 5 + i) * 40, 30); label(ctx, 'CITY PAID', 540, 260, 140, t, wt(7, 'paid') - .2, '#7ee08a'); }
} });
// [8] he ordered a bridge between San Francisco and Oakland; people laughed
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const laugh = t > wt(8, 'people') - .1;
  if (!laugh) { bayWater(ctx, t, cam); applyCam(ctx, cam, 1); norton(ctx, { x: 540, y: G + 220, s: 700, arms: { L: [.3, -.1], R: [2.2, -.1] }, face: { eyes: 'squint', mouth: 'smirk', look: [1, -1] } }); ctx.save(); ctx.setLineDash([22, 18]); line(ctx, 180, 900, 900, 900, 10, '#ffffff'); ctx.restore(); label(ctx, 'BUILD A BRIDGE', 540, 260, 110, t, wt(8, 'bridge') - .2, '#ffd23a'); }
  else { sfStreet(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 4; i++) townsfolk(ctx, { x: 160 + i * 250, y: G + 200, s: 520, lean: Math.sin(t * 12 + i) * .06, arms: { L: [1.4, -1.8], R: [1.4, -1.8] }, face: { eyes: 'happy', mouth: 'grin' } }, i); label(ctx, 'HA HA HA', 540, 260, 140, t, wt(8, 'laughed') - .3, '#ffffff'); }
} });
// [9] more than 60 years later, the Bay Bridge opened
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bayWater(ctx, t, cam, { top: '#f2a868', bot: '#fbe0b8' }); applyCam(ctx, cam, 1); bayBridge(ctx, 540, 900, 820, clamp((t - wt(9, 'bay') + .4) / 1.0), t); const yr = 1872 + Math.round(64 * clamp((t - S(9)) / .9)); text(ctx, String(yr), 540, 600, 110, '#ffffff', INK, 14); text(ctx, String(yr), 540, 600, 110, '#ffffff', INK, 0); for (let i = 0; i < 6; i++) { const k = ((t * .6 + i / 6) % 1); burst(ctx, 200 + i * 140, 400 + Math.sin(i * 2) * 60, 30 + k * 30, 8, ['#ffd23a', '#e0392f', '#3aa35b'][i % 3], i); }
  label(ctx, '60+ YEARS LATER', 540, 260, 110, t, wt(9, 'more') - .2, '#ffffff', wt(9, 'bay') - .2); label(ctx, 'BAY BRIDGE', 540, 260, 140, t, wt(9, 'bay') - .2, '#ffd23a');
} });
// [10] died 1880; as many as 30,000 came to the funeral of the man who ruled nothing
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .02, dz: 0 }); sfStreet(ctx, t, cam, { top: '#8a92a8', bot: '#d8d0c8', sun: false }); applyCam(ctx, cam, 1); coffinFlowers(ctx, 540, G - 40, 420); beaverHat(ctx, { x: 540, y: G - 60 + .765 * 200, s: 200 }); const n = Math.round(30000 * clamp((t - wt(10, '30000') + .3) / 1.0)); for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const k = clamp((t - wt(10, 'as') - (r * 9 + i) * .03) / .3); ctx.save(); ctx.globalAlpha = k; townsfolk(ctx, { x: 60 + i * 120 + (r % 2) * 60, y: 1360 + r * 150, s: 240 + r * 30, cols: ['#2a2a30', '#2a2a30'], arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'frown', look: [0, -1] } }, 0); ctx.restore(); }
  chapterTag(ctx, t, S(10) + .05, '1880'); label(ctx, n.toLocaleString('en-US') + ' PEOPLE', 540, 260, 120, t, wt(10, '30000') - .2, '#ffffff', wt(10, 'ruled') - .3); label(ctx, 'RULED NOTHING', 540, 260, 120, t, wt(10, 'ruled') - .3, '#ffd23a');
} });
