// ---------- "Why coffins used to have bells" (portrait Short) ----------
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
const ring = (t, at) => t > at ? Math.sin((t - at) * 26) * .45 * Math.exp(-(t - at) * 1.2) : 0;
function victorian(ctx, o, kind = 0) {
  const so = C({ cols: kind ? ['#5a3a5a', '#5a3a5a'] : ['#2a2a34', '#2a2a34'], hat: 'none', belt: false }, o); drawStick(ctx, so);
  if (kind) bonnet(ctx, so, '#e8d8e8'); else { topHat(ctx, so); moustache(ctx, so); } return so;
}
const SHOTS = [];
// [0] some people asked to be buried with a bell (bell rings on frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); graveyard(ctx, t, cam);
  headstone(ctx, 330, G, 300, 'R.I.P.'); const sw = ring(t, .05) + ring(t, wt(0, 'bell'));
  bellPost(ctx, 600, G, 620, sw);
  if (Math.abs(sw) > .1) { for (const d of [-1, 1]) for (let k = 0; k < 3; k++) line(ctx, 715 + d * (90 + k * 30), 700 - k * 30, 715 + d * (120 + k * 30), 680 - k * 40, 7, '#ffd23a'); }
  chapterTag(ctx, t, .05, 'THE 1800s'); label(ctx, 'BURIED', 540, 270, 120, t, wt(0, 'buried') - .1, '#ffffff'); label(ctx, 'WITH A BELL', 540, 400, 110, t, wt(0, 'bell') - .15, '#ffd23a');
} });
// [1] a real bell above the grave, a string down into the coffin and around their finger
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const dn = ease(clamp((t - wt(1, 'string') + .2) / 2.2));
  const cam = camA(t, lt, { z: 1.0 + .25 * dn, dz: .01, y: 900 + 560 * dn, x: 540 + 60 * dn });
  graveSky(ctx, t, cam); applyCam(ctx, cam, 1); soilSection(ctx);
  headstone(ctx, 300, SOIL - 10, 260, 'R.I.P.'); const [ax, ay] = bellPost(ctx, 560, SOIL - 10, 520, ring(t, wt(1, 'bell', 1)) * .6);
  coffin(ctx, 620, 1640, 760, 230, { inside: c => lying(c, 330, 0, 400, { eyes: 'x', mouth: 'flat' }) });
  const fx = 560, fy = 1560; ctx.save(); ctx.setLineDash([]); line(ctx, ax, ay, ax, SOIL - 10, 5, '#f2ecdc'); line(ctx, ax, SOIL, ax - 20, 1400, 5, '#f2ecdc'); line(ctx, ax - 20, 1400, fx, fy, 5, '#f2ecdc'); ctx.restore();
  if (t > wt(1, 'finger') - .3) { circle(ctx, fx, fy, 30 + 6 * Math.sin(t * 8)); ctx.lineWidth = 7; ctx.strokeStyle = '#ffd23a'; ctx.stroke(); }
  label(ctx, 'NOT DECORATION', 540, 260, 92, t, S(1), '#ffffff', wt(1, 'real') - .1); label(ctx, 'A REAL BELL', 540, 260, 104, t, wt(1, 'real') - .1, '#ffd23a', wt(1, 'string') - .1);
  label(ctx, 'STRING', 540, 260, 104, t, wt(1, 'string') - .1, '#ffffff', wt(1, 'finger') - .2); label(ctx, '→ FINGER', 540, 260, 104, t, wt(1, 'finger') - .2, '#ffd23a');
} });
// [2] people feared one thing even more than death
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03, shake: 4 }); graveyard(ctx, t, cam);
  for (let i = 0; i < 4; i++) { const tr = Math.sin(t * 40 + i) * 4; victorian(ctx, { x: 170 + i * 250 + tr, y: G + 120, s: 460, lean: -.05, arms: { L: [1.2, 2.2], R: [1.2, 2.2] }, face: { eyes: 'wide', mouth: 'o', look: [0, -.3] } }, i % 2); }
  for (let i = 0; i < 4; i++) sweat(ctx, 240 + i * 250, G - 360, 50, 1);
  label(ctx, 'FEARED MORE', 540, 300, 110, t, wt(2, 'feared') - .1, '#ffffff'); label(ctx, 'THAN DEATH', 540, 430, 110, t, wt(2, 'death') - .2, '#ff6a5a');
} });
// [3] waking up after it
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.25 + .2 * clamp(lt / 1.4), dz: 0, x: 420, y: 1000, shake: 2 }); bgFlat(ctx, '#050407', '#0d0810'); applyCam(ctx, cam, 1);
  const open = t > S(3) + .25;
  coffin(ctx, 560, 1000, 900, 300, { inside: c => lying(c, 380, 0, 520, { eyes: open ? 'wide' : 'half', mouth: open ? 'o' : 'flat', look: [0, -1] }) });
  darkness(ctx, .45);
  label(ctx, 'WAKING UP', 540, 360, 130, t, S(3) + .2, '#ff6a5a'); label(ctx, '...AFTER', 540, 500, 90, t, wt(3, 'after') - .1, '#ffffff');
} });
// [4] doctors lacked tools; newspapers loved "buried alive" stories
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); const np = t > wt(4, 'newspapers') - .15;
  if (!np) {
    bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#7a5a3a' }); applyCam(ctx, cam, 1);
    const so = victorian(ctx, { x: 400, y: G + 100, s: 560, arms: { L: [.3, -.1], R: { ik: [.4, -.62] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }); specs(ctx, so);
    magnifier(ctx, 400 + .4 * 560, G + 100 - .62 * 560, 110, -.6);
    lying(ctx, 1000, G + 20, 420, { eyes: 'x', mouth: 'flat' }); qmark(ctx, 800, 640, 120, '#ffd23a');
    label(ctx, 'NO MODERN TOOLS', 540, 280, 90, t, wt(4, 'doctors') - .1, '#ffffff');
  } else {
    bgFlat(ctx, '#7a2a2a', '#3a1018'); applyCam(ctx, cam, 1);
    const hs = [['BURIED', 'ALIVE!'], ['WOKE IN', 'COFFIN!'], ['SCRATCH', 'MARKS!']];
    hs.forEach((h, i) => { const k = backOut(cue(t, wt(4, 'newspapers') + i * .35, .3)); if (k > 0) newspaper(ctx, 220 + i * 320, 700 + (i % 2) * 260, 330 * k, h, (i - 1) * .2); });
    label(ctx, 'BURIED ALIVE!', 540, 300, 110, t, wt(4, 'buried') - .1, '#ffd23a');
  }
} });
// [5] so inventors got to work
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgRoom(ctx, t, cam, { wall: '#5a6a8a', floor: '#6a4a30' }); applyCam(ctx, cam, 1);
  drawDesk(ctx, 640, G - 60, 560); coffin(ctx, 640, G - 170, 480, 140, { col: '#8a5a3a' });
  const hit = Math.max(0, Math.sin(t * 9)); const so = { cols: ['#d8d0c0', '#d8d0c0'], hat: 'none', belt: false, x: 260, y: G + 100, s: 560, arms: { L: [.3, -.1], R: [1.4 + hit * .9, -.4] }, face: { eyes: 'happy', mouth: 'teeth', look: [1, 0] } };
  drawStick(ctx, so); greyHair(ctx, so); specs(ctx, so);
  if (hit > .9) burst(ctx, 470, G - 260, 60, 9, '#ffd23a', 3);
  drawBulb(ctx, 260, 520, 130, 1);
  label(ctx, 'INVENTORS', 540, 290, 120, t, wt(5, 'inventors') - .1, '#ffd23a');
} });
// [6] coffins with air tubes, flags that pop up, one with a ladder
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015, y: 1060 }); graveSky(ctx, t, cam); applyCam(ctx, cam, 1); soilSection(ctx);
  const st = t < wt(6, 'flags') - .2 ? 0 : t < wt(6, 'one') - .15 ? 1 : 2;
  const face = { eyes: 'wide', mouth: st ? 'grin' : 'smile', look: [0, -1] };
  coffin(ctx, 560, 1640, 760, 230, { inside: c => lying(c, 330, 0, 400, face) });
  if (st === 0) { rrect(ctx, 500, SOIL - 120, 50, 1440 - SOIL + 120, 10); fillStroke(ctx, '#9aa0aa', 6); rrect(ctx, 470, SOIL - 150, 110, 50, 12); fillStroke(ctx, '#9aa0aa', 6); for (let i = 0; i < 4; i++) { const y = 1400 - ((t * 300 + i * 120) % 500); circle(ctx, 525, y, 10); ctx.fillStyle = '#bfe8ff'; ctx.fill(); } label(ctx, 'AIR TUBES', 540, 300, 120, t, S(6), '#7fd0ff'); }
  if (st === 1) { const up = backOut(cue(t, wt(6, 'popped') - .1, .35)); line(ctx, 520, 1440, 520, SOIL - 20 - 260 * up, 10); ctx.save(); ctx.translate(520, SOIL - 20 - 260 * up); const wv = Math.sin(t * 10) * 10; path(ctx, [[0, 0], [190, 20 + wv], [180, 90 + wv], [0, 90]]); fillStroke(ctx, '#e0392f', 6); ctx.restore(); label(ctx, 'POP-UP FLAGS', 540, 300, 120, t, wt(6, 'flags') - .2, '#ff6a5a'); }
  if (st === 2) { ladderIn(ctx, 420, 1520, 560, SOIL - 220, 70); label(ctx, 'A LADDER?!', 540, 300, 130, t, wt(6, 'ladder') - .2, '#ffd23a'); }
} });
// [7] in America alone, more than a hundred patents
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3a7a', '#1a2450'); applyCam(ctx, cam, 1);
  const k = clamp((t - S(7) - .1) / (wt(7, 'patented') - S(7))); const n = Math.round(ease(k) * 100);
  for (let i = 0; i < Math.min(14, Math.ceil(k * 14)); i++) { const r = rng(i * 13 + 1); patentDoc(ctx, 140 + r() * 800, 620 + r() * 560, 260, (r() - .5) * .7, 'No. ' + (64000 + i * 3217)); }
  chapterTag(ctx, t, S(7) + .05, 'USA');
  label(ctx, n + (n >= 100 ? '+' : ''), 540, 360, 200, t, wt(7, 'more') - .3, '#ffd23a'); label(ctx, 'PATENTS', 540, 520, 100, t, wt(7, 'patented') - .2, '#ffffff');
} });
// [8] Germany: waiting mortuaries, strings on fingers, just in case
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); mortuary(ctx, t, cam);
  bellBoard(ctx, 540, 380, 5, -1, t);
  for (let i = 0; i < 3; i++) { const x = 220 + i * 330; sheetBody(ctx, x, 1090, 280); if (t > wt(8, 'strings') - .2) { ctx.save(); ctx.globalAlpha = cue(t, wt(8, 'strings') - .2, .4); line(ctx, x - 60, 1060, 315 + i * 90 + 90, 420, 3, '#5a4a3a'); ctx.restore(); } }
  const sl = t > wt(8, 'just') - .2; drawStick(ctx, { cols: ['#3a4a3a', '#3a4a3a'], hat: 'none', belt: false, x: 900, y: G + 120, s: 380, arms: POSE.idle.arms, face: { eyes: sl ? 'half' : 'normal', mouth: 'flat', look: [-1, -1] } });
  chapterTag(ctx, t, S(8) + .05, 'GERMANY'); label(ctx, 'WAITING MORTUARY', 540, 640, 76, t, wt(8, 'waiting') - .1, '#ffffff', wt(8, 'strings') - .1); label(ctx, 'JUST IN CASE', 540, 640, 96, t, wt(8, 'just') - .1, '#ffd23a');
} });
// [9] thousands of bodies went through them
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#3a3048', '#1e1828'); applyCam(ctx, cam, 1);
  const k = clamp((t - S(9)) / 1.6); const n = Math.floor(ease(k) * 60);
  for (let i = 0; i < n; i++) { const c = i % 6, r = Math.floor(i / 6); sheetBody(ctx, 160 + c * 152, 560 + r * 70, 120); }
  label(ctx, 'THOUSANDS', 540, 330, 130, t, wt(9, 'thousands') - .1, '#ffffff');
} });
// [10] not one of them ever woke up
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); mortuary(ctx, t, cam); bellBoard(ctx, 540, 380, 5, -1, t);
  for (let i = 0; i < 3; i++) sheetBody(ctx, 220 + i * 330, 1090, 280);
  drawStick(ctx, { cols: ['#3a4a3a', '#3a4a3a'], hat: 'none', belt: false, x: 900, y: G + 120, s: 380, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'flat', look: [-1, -1] } }); drawZs(ctx, 960, 760, t, 1);
  stamp(ctx, 540, 660, '0 WOKE UP', cue(t, wt(10, 'woke') - .1, .2), '#e0392f', -.12);
} });
// [11] no record of a single person saved by a safety coffin
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a3a7a', '#1a2450'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 9; i++) { const r = rng(i * 5 + 3); patentDoc(ctx, 180 + (i % 3) * 360 + (r() - .5) * 60, 560 + Math.floor(i / 3) * 260, 230, (r() - .5) * .5); }
  label(ctx, 'ALL THOSE PATENTS', 540, 300, 84, t, wt(11, 'despite') - .1, '#ffffff', wt(11, 'record') - .1);
  label(ctx, 'PEOPLE SAVED:', 540, 300, 96, t, wt(11, 'record') - .1, '#ffffff'); stamp(ctx, 540, 800, '0', cue(t, wt(11, 'single') - .1, .2), '#e0392f', -.1);
} });
// [12] some say that's where "saved by the bell" comes from
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); graveyard(ctx, t, cam);
  bellPost(ctx, 420, G, 600, ring(t, wt(12, 'bell') - .1)); headstone(ctx, 250, G, 240, 'R.I.P.');
  label(ctx, '"SAVED BY', 540, 290, 120, t, wt(12, 'saved') - .1, '#ffd23a'); label(ctx, 'THE BELL"', 540, 430, 120, t, wt(12, 'bell') - .1, '#ffd23a'); if (t > wt(12, 'comes') - .2) qmark(ctx, 880, 720, 150, '#ffffff');
} });
// [13] it isn't. that one comes from boxing
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03, shake: 4 }); const box = t > wt(13, 'that') - .15;
  if (!box) { graveyard(ctx, t, cam); bellPost(ctx, 420, G, 600, 0); stamp(ctx, 540, 600, 'MYTH', cue(t, S(13) + .1, .2), '#e0392f', -.15); return; }
  boxingRing(ctx, t, cam);
  const dz = Math.sin(t * 3) * .15; drawStick(ctx, { cols: ['#3a6ac8', '#ffffff'], hat: 'none', belt: false, x: 320, y: G + 40, s: 560, lean: -.2 + dz * .3, arms: { L: [2.6, .4], R: [2.4, .6] }, face: { eyes: 'spiral', mouth: 'grin' } });
  drawStick(ctx, { cols: ['#c8322c', '#c8322c'], hat: 'none', belt: false, x: 780, y: G + 40, s: 600, flip: -1, arms: { L: [1.4, -.6], R: [1.6, -1.2] }, face: { eyes: 'squint', mouth: 'teeth' } });
  bell(ctx, 900, 520, 70, ring(t, wt(13, 'boxing') - .3)); label(ctx, 'DING DING!', 540, 300, 110, t, wt(13, 'boxing') - .2, '#ffd23a'); label(ctx, 'BOXING', 540, 430, 120, t, wt(13, 'boxing'), '#ffffff');
} });
