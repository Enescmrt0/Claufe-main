// ---------- "The city standing on trees" (portrait Short) ----------
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const WY = 1000, MUD = 1280;
const SHOTS = [];
const venetian = (ctx, o, k = 0) => drawStick(ctx, C({ cols: [['#7a3a2a', '#7a3a2a'], ['#3a5a7a', '#3a5a7a'], ['#6a7a3a', '#6a7a3a']][k % 3], hat: 'none', belt: false }, o));
// [0] an entire city standing on trees for 1000+ years (cross-section on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const dn = ease(clamp((t - wt(0, 'trees') + .3) / 1.2)); const cam = camA(t, lt, { z: 1.0, dz: .02, y: 960 + 260 * dn });
  lagoonSky(ctx, t, cam); applyCam(ctx, cam, 1); underCity(ctx, WY, MUD, 40, 1040, { slab: true, len: 480, n: 16, top: MUD - 120 }); palazzi(ctx, 20, 1060, MUD - 170, 3);
  lagoonWater(ctx, WY, t, { depth: 0 }); gondola(ctx, 760, WY, 300, t);
  label(ctx, 'A CITY ON TREES', 540, 260, 100, t, wt(0, 'trees') - .2, '#ffd23a'); label(ctx, '1000+ YEARS', 540, 390, 90, t, wt(0, 'thousand') - .2, '#ffffff');
} });
// [1] trees with no branches, hammered upside down into the mud
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#3a7a8a', '#1a3a4a'); applyCam(ctx, cam, 1);
  ctx.fillStyle = '#5a4a3a'; ctx.fillRect(-500, 1180, 2100, 1000); line(ctx, -500, 1180, 1600, 1180, 6);
  const bare = t > wt(1, 'branches') + .35, flip = ease(cue(t, wt(1, 'upside') - .2, .5)), sink = clamp((t - wt(1, 'mud') + .6) / 1.2);
  const by = 1180 - (448 - 220 * sink) * flip; if (flip < .5) tree(ctx, 540, 1180, 640, { bare, rot: Math.PI * flip * 2 * .5 }); else pile(ctx, 540, by, 470, 90); if (bare && flip < .5) for (let i = 0; i < 3; i++) { const k = clamp((t - wt(1, 'branches') - .35) / .8); circle(ctx, 450 + i * 90, 640 + k * 500, 50 * (1 - k * .5)); ctx.fillStyle = '#3a8a4a'; ctx.fill(); }
  const hit = Math.max(0, Math.sin(t * 9)); if (flip > .9) { mallet(ctx, 760, by + 60, 200, -1.22 + .7 * (1 - hit)); if (hit > .95) burst(ctx, 540, by - 10, 60, 9, '#ffd23a', 4); }
  label(ctx, 'NO BRANCHES', 540, 260, 110, t, wt(1, 'branches') - .2, '#ffffff', wt(1, 'upside') - .2); label(ctx, 'UPSIDE DOWN', 540, 260, 110, t, wt(1, 'upside') - .2, '#ffd23a');
} });
// [2] settlers on the lagoon: soft mud and sand, anything heavy would sink
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1020 }); lagoonSky(ctx, t, cam, { top: '#8ac0d8', bot: '#e8e0c8' }); applyCam(ctx, cam, 1);
  ctx.fillStyle = '#2aa0a8'; ctx.fillRect(-1000, WY, 3000, MUD - WY); ctx.fillStyle = '#6a5a42'; ctx.fillRect(-1000, MUD, 3000, 2000); line(ctx, -1000, MUD, 3000, MUD, 6); line(ctx, -1000, WY, 3000, WY, 6);
  for (let i = 0; i < 3; i++) venetian(ctx, { x: 200 + i * 130, y: WY - 10, s: 300, arms: i === 1 ? { L: [.3, -.1], R: [2.2, .2] } : POSE.idle.arms, face: { eyes: 'normal', mouth: 'flat', look: [1, .5] } }, i);
  ctx.beginPath(); ctx.moveTo(110, WY - 20); ctx.quadraticCurveTo(320, WY + 40, 520, WY - 20); ctx.closePath(); fillStroke(ctx, '#7a5236', 5);
  const sk = clamp((t - wt(2, 'sink') + .8) / 1.4); const by = WY - 60 + (MUD + 120 - WY + 60) * easeIn(sk);
  rrect(ctx, 700, by - 140, 220, 140, 8); fillStroke(ctx, '#c8c0b0', 6); text(ctx, 'HEAVY', 810, by - 70, 40, '#3a3530', INK, 0);
  ctx.fillStyle = '#6a5a42'; if (by > MUD) { ctx.fillRect(680, MUD, 260, 300); for (let i = 0; i < 4; i++) circle(ctx, 720 + i * 60, MUD - 4, 12), ctx.fill(); }
  chapterTag(ctx, t, S(2) + .05, 'VENICE LAGOON'); label(ctx, 'SOFT MUD', 540, 270, 110, t, wt(2, 'soft') - .2, '#c8a070', wt(2, 'sink') - .3); label(ctx, 'SINK!', 540, 270, 140, t, wt(2, 'sink') - .3, '#ff6a5a');
} });
// [3] forests cut, trunks sharpened, driven deep, packed tight like solid ground
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015, y: 1020 }); const st = t < wt(3, 'sharpened') - .15 ? 0 : t < wt(3, 'drove') - .15 ? 1 : 2;
  if (st < 2) {
    bgDay(ctx, t, cam); applyCam(ctx, cam, 1);
    if (st === 0) { const n = Math.floor(clamp((t - S(3) - .2) / 1.4) * 8); for (let i = 0; i < 8; i++) tree(ctx, 80 + i * 130, GY + 300, 360, { rot: i < n ? Math.PI / 2 * .98 : 0 }); axe(ctx, 900, GY + 240, 240, -.8 + Math.max(0, Math.sin(t * 8)) * 1.2); label(ctx, 'CUT FORESTS', 540, 270, 110, t, wt(3, 'forests') - .2, '#ffffff'); }
    else { ctx.save(); ctx.translate(540, 900); ctx.rotate(-Math.PI / 2); pile(ctx, -60, -380, 760, 120); ctx.restore(); axe(ctx, 300, 1060, 260, -.4 + Math.max(0, Math.sin(t * 10)) * .9); for (let i = 0; i < 5; i++) { const k = (t * 1.3 + i * .2) % 1; ellipse(ctx, 220 - k * 80, 980 + k * 200, 16, 8, k * 5); ctx.fillStyle = '#d8a060'; ctx.fill(); } label(ctx, 'SHARPEN', 540, 270, 120, t, wt(3, 'sharpened') - .2, '#ffd23a'); }
  } else {
    lagoonSky(ctx, t, cam); applyCam(ctx, cam, 1); const pk = clamp((t - wt(3, 'drove') + .2) / (wt(3, 'solid') - wt(3, 'drove') + .3));
    underCity(ctx, WY, MUD, 60, 1020, { posts: pk, n: 18, len: 480, top: MUD - 120 }); lagoonWater(ctx, WY, t, { depth: 0 });
    label(ctx, 'DRIVE THEM DEEP', 540, 270, 96, t, wt(3, 'drove') - .15, '#ffffff', wt(3, 'packed') - .2); label(ctx, 'PACKED TIGHT', 540, 270, 110, t, wt(3, 'packed') - .2, '#ffd23a');
  }
} });
// [4] then they built stone on top
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1020 }); lagoonSky(ctx, t, cam); applyCam(ctx, cam, 1);
  const sl = cue(t, wt(4, 'stone') - .2, .3), up = ease(clamp((t - wt(4, 'top') + .1) / .9));
  underCity(ctx, WY, MUD, 60, 1020, { n: 18, len: 480, top: MUD - 120, slab: sl > 0 });
  if (up > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-200, -200, 1500, MUD - 170 + 200); ctx.clip(); ctx.translate(0, (1 - up) * 600); palazzi(ctx, 40, 1040, MUD - 170, 7); ctx.restore(); }
  lagoonWater(ctx, WY, t, { depth: 0 }); label(ctx, 'STONE ON TOP', 540, 270, 110, t, wt(4, 'stone') - .2, '#ffffff');
} });
// [5] Santa Maria della Salute: said to stand on over a million posts
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1080 }); lagoonSky(ctx, t, cam, { sunX: 200 }); applyCam(ctx, cam, 1);
  underCity(ctx, WY, MUD, 40, 1040, { n: 34, len: 460, top: MUD - 120, slab: true }); salute(ctx, 540, MUD - 170, 620); lagoonWater(ctx, WY, t, { depth: 0 });
  const k = ease(clamp((t - wt(5, 'million') + 1.2) / 1.4)); const n = Math.round(k * 1000000);
  chapterTag(ctx, t, S(5) + .05, 'SANTA MARIA DELLA SALUTE'); label(ctx, n.toLocaleString('en-US') + (k >= 1 ? '+' : ''), 540, 270, 110, t, wt(5, 'said') - .2, '#ffd23a'); label(ctx, 'WOODEN POSTS', 540, 390, 80, t, wt(5, 'wooden') - .2, '#ffffff');
} });
// [6] but wood in water rots. everyone knows that
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#2aa0a8', '#145a64'); applyCam(ctx, cam, 1);
  const r = clamp((t - wt(6, 'rots') + .2) / 1.2); pile(ctx, 540, 520, 720, 150, r);
  for (let i = 0; i < 6; i++) if (r > i / 6) { circle(ctx, 480 + (i % 2) * 120, 700 + i * 80, 22 + i * 3); ctx.fillStyle = '#3a4a1a'; ctx.fill(); }
  label(ctx, 'WOOD + WATER', 540, 270, 100, t, wt(6, 'wood') - .2, '#ffffff', wt(6, 'rots') - .2); label(ctx, '= ROT', 540, 270, 140, t, wt(6, 'rots') - .2, '#a8d06a');
} });
// [7] a post in a wet garden turns to mush in a few years
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgDay(ctx, t, cam, { top: '#8aa8c0', bot: '#d8e0e8' }); applyCam(ctx, cam, 1); drawRainCloud(ctx, 760, 420, 1.2, t);
  const k = clamp((t - wt(7, 'few') + .4) / 1.4); const yr = 1 + Math.floor(k * 4.99);
  ctx.save(); ctx.translate(540, GY + 280); ctx.scale(1, 1 - .6 * k); pile(ctx, 0, -420, 520, 110, k); ctx.restore();
  if (k > .8) { ellipse(ctx, 540, GY + 290, 150, 30); ctx.fillStyle = '#4a4a1a'; ctx.fill(); }
  label(ctx, 'WET GARDEN', 540, 270, 100, t, wt(7, 'wet') - .2, '#ffffff', wt(7, 'few') - .3); label(ctx, 'YEAR ' + yr, 540, 270, 110, t, wt(7, 'few') - .3, '#ffd23a', wt(7, 'mush') - .1); label(ctx, 'MUSH', 540, 270, 140, t, wt(7, 'mush') - .1, '#a8d06a');
} });
// [8] so why hasn't Venice collapsed?
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); lagoonSky(ctx, t, cam, { top: '#ff9a5a', bot: '#ffd8a0', sunY: 520 }); applyCam(ctx, cam, 1);
  palazzi(ctx, 0, 1080, WY, 5); salute(ctx, 760, WY, 360); lagoonWater(ctx, WY, t); gondola(ctx, 300, WY + 40, 280, t);
  qmark(ctx, 540, 620, 160, '#ffffff'); label(ctx, "WHY HASN'T IT", 540, 270, 100, t, S(8) + .05, '#ffffff'); label(ctx, 'COLLAPSED?', 540, 390, 110, t, wt(8, 'collapsed') - .2, '#ff6a5a');
} });
// [9] because rot needs oxygen
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); bgFlat(ctx, '#3a8ad8', '#1f5aa0'); applyCam(ctx, cam, 1);
  o2Bubble(ctx, 540, 820, 230 * backOut(cue(t, wt(9, 'oxygen') - .3, .4)));
  label(ctx, 'ROT NEEDS', 540, 290, 120, t, wt(9, 'rot') - .1, '#ffffff'); label(ctx, 'OXYGEN', 540, 420, 130, t, wt(9, 'oxygen') - .2, '#bfe8ff');
} });
// [10] fungi and bacteria need air; deep in the mud there's almost none
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const deep = t > wt(10, 'deep') - .2; const cam = camA(t, lt, { z: 1.0, dz: .02 });
  if (!deep) { bgFlat(ctx, '#bfe8ff', '#7fc0e8'); applyCam(ctx, cam, 1); pile(ctx, 540, 600, 600, 140); for (let i = 0; i < 5; i++) microbe(ctx, 300 + (i % 2) * 480, 700 + i * 90, 50, t + i, { fork: true, col: ['#9ad86a', '#ff9ad0', '#ffd86a'][i % 3] }); for (let i = 0; i < 8; i++) { const k = (t * .5 + i / 8) % 1; o2Bubble(ctx, 120 + i * 120, 1100 - k * 700, 26); } label(ctx, 'NEED AIR', 540, 270, 120, t, wt(10, 'air') - .2, '#2a5a8a'); label(ctx, 'FUNGI & BACTERIA', 540, 400, 70, t, wt(10, 'fungi') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#3a2e22', '#1a140e'); applyCam(ctx, cam, 1); pile(ctx, 540, 520, 700, 140); for (let i = 0; i < 4; i++) microbe(ctx, 280 + (i % 2) * 520, 760 + i * 100, 50, t + i, { sad: true, col: '#7a8a5a' }); o2Bubble(ctx, 830, 600, 70, 1); label(ctx, 'DEEP MUD:', 540, 270, 100, t, wt(10, 'deep') - .2, '#ffffff'); label(ctx, 'ALMOST NO AIR', 540, 400, 90, t, wt(10, 'none') - .4, '#ff6a5a'); }
} });
// [11] the posts sit there, in the dark, for centuries
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1020 }); lagoonSky(ctx, t, cam, { top: '#141a3a', bot: '#3a4486', sun: false }); applyCam(ctx, cam, .1); drawMoon(ctx, 840, 300, 60); applyCam(ctx, cam, 1);
  underCity(ctx, WY, MUD, 40, 1040, { n: 18, len: 480, top: MUD - 120, slab: true, mud: '#3a2e22' }); palazzi(ctx, 20, 1060, MUD - 170, 3, { lit: true }); lagoonWater(ctx, WY, t, { depth: 0, col: '#1a5a6a' });
  const yr = Math.round(1400 + clamp((t - S(11)) / (S(12) - S(11))) * 620);
  label(ctx, String(yr), 540, 270, 140, t, S(11) + .05, '#ffd23a'); label(ctx, 'FOR CENTURIES', 540, 410, 90, t, wt(11, 'centuries') - .2, '#ffffff');
} });
// [12] the real danger isn't the water. it's air
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#2aa0a8'; ctx.fillRect(0, 0, 540, 1920); ctx.fillStyle = '#c8e8ff'; ctx.fillRect(540, 0, 540, 1920); applyCam(ctx, cam, 1);
  const air = t > wt(12, 'air') - .3;
  pile(ctx, 270, 600, 560, 110); text(ctx, 'WATER', 270, 1250, 70, '#ffffff', INK, 0); stamp(ctx, 270, 900, 'OK', cue(t, wt(12, 'water') - .1, .2), '#2a8a4a', -.1);
  pile(ctx, 810, 600, 560, 110, air ? .9 : 0); o2Bubble(ctx, 810, 500, 70); text(ctx, 'AIR', 810, 1250, 70, INK, INK, 0); if (air) stamp(ctx, 810, 900, 'DANGER', cue(t, wt(12, 'air') - .2, .2), '#e0392f', .1);
  label(ctx, 'THE REAL DANGER', 540, 270, 96, t, S(12) + .05, '#ffffff');
} });
// [13] as long as the foundations stay underwater, Venice stays standing
SHOTS.push({ start: S(13), end: S(14), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02, y: 1000 }); lagoonSky(ctx, t, cam, { top: '#ff9a5a', bot: '#ffd8a0', sunY: 480 }); applyCam(ctx, cam, 1);
  underCity(ctx, WY, MUD, 40, 1040, { n: 18, len: 480, top: MUD - 120, slab: true }); palazzi(ctx, 20, 1060, MUD - 170, 9); lagoonWater(ctx, WY, t, { depth: 0 }); gondola(ctx, 700, WY, 300, t);
  label(ctx, 'KEEP IT UNDERWATER', 540, 270, 84, t, wt(13, 'underwater') - .3, '#bfe8ff', wt(13, 'venice') - .2); label(ctx, 'VENICE STANDS', 540, 270, 110, t, wt(13, 'venice') - .2, '#ffd23a');
} });
