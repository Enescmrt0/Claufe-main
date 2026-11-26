// ---------- props for the Titanic film (landscape 1920x1080) ----------
const SEA = 700; // horizon line for the wide sea shots
function nightSky(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .05); drawSky(ctx, o.top || '#070b1e', o.bot || '#1c2a52', -300, SEA + 40);
  applyCam(ctx, cam, .08); drawStars(ctx, t, o.stars == null ? 110 : o.stars, 5, o.starA == null ? 1 : o.starA);
}
// sea drawn in front of ships (hides what is under the waterline). calm = glassy
function seaFront(ctx, t, o = {}) {
  const y = o.y || SEA, top = o.top || '#0e2244', bot = o.bot || '#050b1c';
  const g = ctx.createLinearGradient(0, y, 0, y + 500); g.addColorStop(0, top); g.addColorStop(1, bot);
  ctx.fillStyle = g; ctx.fillRect(-2000, y, 6000, 2000);
  const R = rng(4); ctx.lineCap = 'round';
  for (let i = 0; i < (o.calm ? 16 : 46); i++) { const x = R() * 2600 - 300, yy = y + 14 + R() * 360, w = 40 + R() * 90; ctx.globalAlpha = (o.calm ? .1 : .22) * (.5 + .5 * Math.sin(t * 1.2 + i)); line(ctx, x + Math.sin(t * .6 + i) * 12, yy, x + w, yy, 4, o.glint || '#9fc4ff'); }
  ctx.globalAlpha = 1;
}
// RMS Titanic, side view, bow to +x. Local units: length = 1, deck line y = 0, waterline y = .055.
function titanicBody(ctx, lights, smokeT) {
  const lw = .0028, lit = lights > 0 ? `rgba(255,214,110,${lights})` : '#27304a';
  // masts
  line(ctx, .37, -.03, .35, -.24, .004, '#c9a05b'); line(ctx, -.39, -.03, -.41, -.22, .004, '#c9a05b');
  line(ctx, .35, -.22, -.41, -.2, .0012, 'rgba(255,255,255,.25)');
  // funnels (raked back)
  for (const [i, fx] of [-.19, -.065, .06, .185].entries()) {
    path(ctx, [[fx - .02, -.085], [fx - .032, -.185], [fx + .006, -.185], [fx + .018, -.085]]); fillStroke(ctx, '#e0a244', lw);
    path(ctx, [[fx - .029, -.16], [fx - .032, -.185], [fx + .006, -.185], [fx + .009, -.16]]); fillStroke(ctx, '#15151a', lw);
    if (smokeT != null && i > 0) for (let k = 0; k < 5; k++) { const q = (smokeT * .25 + k / 5) % 1; circle(ctx, fx - .015 - q * .16, -.2 - q * .07, .012 + q * .03); ctx.fillStyle = `rgba(60,60,70,${.5 * (1 - q)})`; ctx.fill(); }
  }
  // superstructure
  ctx.beginPath(); ctx.rect(-.29, -.085, .56, .028); fillStroke(ctx, '#f1efe8', lw);
  ctx.beginPath(); ctx.rect(-.33, -.058, .66, .03); fillStroke(ctx, '#f6f4ee', lw);
  for (let i = 0; i < 30; i++) { ctx.fillStyle = lit; ctx.fillRect(-.31 + i * .021, -.05, .011, .012); }
  for (let i = 0; i < 24; i++) { ctx.fillStyle = lit; ctx.fillRect(-.27 + i * .022, -.078, .01, .01); }
  // lifeboats on the boat deck
  for (const bx of [-.25, -.2, -.15, .1, .15, .2]) { ellipse(ctx, bx, -.092, .02, .006); ctx.fillStyle = '#f6f4ee'; ctx.fill(); ctx.lineWidth = lw * .7; ctx.strokeStyle = INK; ctx.stroke(); }
  // hull
  const hull = () => { ctx.beginPath(); ctx.moveTo(-.5, -.03); ctx.lineTo(.485, -.03); ctx.lineTo(.5, -.036); ctx.lineTo(.478, .1); ctx.lineTo(-.46, .1); ctx.quadraticCurveTo(-.5, .08, -.5, -.03); ctx.closePath(); };
  hull(); fillStroke(ctx, '#17171c', lw);
  ctx.save(); hull(); ctx.clip();
  ctx.fillStyle = '#8f2a22'; ctx.fillRect(-.6, .06, 1.2, .1);
  ctx.fillStyle = '#f1efe8'; ctx.fillRect(-.6, -.031, 1.2, .012); ctx.fillStyle = '#d9a83a'; ctx.fillRect(-.6, -.019, 1.2, .003);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 44; i++) { circle(ctx, -.45 + i * .021, .0 + r * .024, .0034); ctx.fillStyle = lit; ctx.fill(); }
  ctx.restore();
  hull(); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke();
}
// o: { rot (bow down +), sink (px), lights 0..1, smoke: t|null, split 0..1, glow }
function drawTitanic(ctx, x, y, s, o = {}) {
  const lights = o.lights == null ? 1 : o.lights;
  const part = (clipFn, rot, dx, dy) => { ctx.save(); ctx.translate(x + dx, y + dy + (o.sink || 0)); ctx.rotate(rot); ctx.scale(s, s); if (clipFn) { ctx.beginPath(); clipFn(); ctx.clip(); } titanicBody(ctx, lights, o.smoke); ctx.restore(); };
  if (!o.split) part(null, o.rot || 0, 0, 0);
  else {
    const k = o.split;
    part(() => ctx.rect(-.02, -1, 2, 2), (o.rot || 0) + k * .25, k * s * .02, k * s * .1);   // bow half dives
    part(() => ctx.rect(-2, -1, 1.98, 2), (o.rot || 0) - k * .45 + (o.settle || 0), -k * s * .03, k * s * .02); // stern falls back, then rises
  }
  if (lights > 0 && o.glow !== false) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .18 * lights; const g = ctx.createRadialGradient(x, y + (o.sink || 0), 10, x, y + (o.sink || 0), s * .55); g.addColorStop(0, '#ffd27a'); g.addColorStop(1, 'rgba(255,210,122,0)'); ctx.fillStyle = g; ctx.fillRect(x - s, y - s, s * 2, s * 2); ctx.restore(); }
}
function steamer(ctx, x, y, s, o = {}) { // small one-funnel ship (Carpathia / Californian), bow to +x unless flip
  ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s); const lw = .006, lit = o.lights === 0 ? '#27304a' : '#ffd66e';
  line(ctx, .3, -.05, .29, -.3, .008, '#c9a05b'); line(ctx, -.3, -.05, -.31, -.28, .008, '#c9a05b');
  path(ctx, [[-.04, -.12], [-.05, -.3], [.03, -.3], [.04, -.12]]); fillStroke(ctx, o.funnel || '#c8322c', lw);
  path(ctx, [[-.047, -.25], [-.05, -.3], [.03, -.3], [.033, -.25]]); fillStroke(ctx, '#15151a', lw);
  if (o.smoke != null) for (let k = 0; k < 5; k++) { const q = (o.smoke * .3 + k / 5) % 1; circle(ctx, -.02 - q * .3, -.33 - q * .12, .03 + q * .06); ctx.fillStyle = `rgba(70,70,80,${.5 * (1 - q)})`; ctx.fill(); }
  ctx.beginPath(); ctx.rect(-.25, -.12, .5, .07); fillStroke(ctx, '#f1efe8', lw);
  for (let i = 0; i < 10; i++) { ctx.fillStyle = lit; ctx.fillRect(-.22 + i * .045, -.1, .022, .025); }
  ctx.beginPath(); ctx.moveTo(-.5, -.05); ctx.lineTo(.5, -.06); ctx.lineTo(.46, .12); ctx.lineTo(-.45, .12); ctx.closePath(); fillStroke(ctx, '#1b1b22', lw);
  ctx.restore();
}
function iceberg(ctx, x, y, s, o = {}) { // x,y = waterline centre; o.under shows the mass below; o.dark = night silhouette
  const c1 = o.dark ? '#27365a' : '#eaf6ff', c2 = o.dark ? '#1b2746' : '#b9dcf2';
  if (o.under) { path(ctx, [[x - s * .8, y], [x - s * 1.0, y + s * .7], [x - s * .5, y + s * 1.5], [x + s * .3, y + s * 1.7], [x + s * .95, y + s * .9], [x + s * .7, y]]); ctx.fillStyle = 'rgba(150,200,235,.45)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(220,240,255,.5)'; ctx.stroke(); }
  path(ctx, [[x - s * .62, y], [x - s * .4, y - s * .45], [x - s * .12, y - s * .3], [x + s * .1, y - s * .85], [x + s * .38, y - s * .4], [x + s * .6, y]]); fillStroke(ctx, c1, 7);
  path(ctx, [[x + s * .1, y - s * .85], [x + s * .38, y - s * .4], [x + s * .6, y], [x + s * .12, y]]); ctx.fillStyle = c2; ctx.fill();
}
function lifeboat(ctx, x, y, s, n = 6, t = 0, o = {}) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.5 + x) * 3); ctx.rotate(Math.sin(t * 1.1 + x) * .03);
  for (let i = 0; i < n; i++) { const hx = -s * .36 + i * (s * .72 / Math.max(1, n - 1 || 1)); circle(ctx, n === 1 ? 0 : hx, -s * .2, s * .075); fillStroke(ctx, '#f6f1e8', Math.max(2, s * .014)); ctx.beginPath(); ctx.roundRect((n === 1 ? 0 : hx) - s * .05, -s * .14, s * .1, s * .14, s * .03); fillStroke(ctx, o.cols ? o.cols[i % o.cols.length] : ['#8a5a3a', '#3f5a8a', '#7a3a4a'][i % 3], Math.max(2, s * .012)); }
  ctx.beginPath(); ctx.moveTo(-s * .5, -s * .09); ctx.lineTo(s * .5, -s * .09); ctx.quadraticCurveTo(s * .46, s * .1, s * .3, s * .1); ctx.lineTo(-s * .3, s * .1); ctx.quadraticCurveTo(-s * .46, s * .1, -s * .5, -s * .09); ctx.closePath(); fillStroke(ctx, o.col || '#f1efe8', Math.max(3, s * .018));
  ctx.restore();
}
function rocket(ctx, x, y0, k, t, col = '#ffffff') { // k 0..1.4: climbs, bursts, fades
  if (k <= 0 || k > 1.5) return; const top = y0 - 420;
  if (k < 1) { const y = lerp(y0, top, easeOut(k)); line(ctx, x, y + 60, x, y, 5, 'rgba(255,240,200,.8)'); circle(ctx, x, y, 7); ctx.fillStyle = col; ctx.fill(); }
  else { const q = (k - 1) / .5; ctx.save(); ctx.globalAlpha = 1 - q; for (let i = 0; i < 14; i++) { const a = i / 14 * TAU; line(ctx, x + Math.cos(a) * 20, top + Math.sin(a) * 20, x + Math.cos(a) * (40 + q * 120), top + Math.sin(a) * (40 + q * 120) + q * q * 40, 5, col); } ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, top, 0, x, top, 300); g.addColorStop(0, 'rgba(255,255,255,.5)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - 300, top - 300, 600, 600); ctx.restore(); }
}
// hull cross-section with 16 compartments. levels[i] 0..1 water in each (index 0 = bow). x = centre, w = length
function hullDiagram(ctx, x, y, w, levels, o = {}) {
  const h = w * .16, x0 = x - w / 2, n = 16, cw = w * .94 / n;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.translate(-x, -y);
  const hull = () => { ctx.beginPath(); ctx.moveTo(x0, y - h * .5); ctx.lineTo(x0 + w, y - h * .5); ctx.lineTo(x0 + w * .965, y + h * .5); ctx.lineTo(x0 + w * .03, y + h * .5); ctx.closePath(); };
  hull(); fillStroke(ctx, '#f4efe4', 8);
  ctx.save(); hull(); ctx.clip();
  for (let i = 0; i < n; i++) { const cx = x0 + w * .97 - (i + 1) * cw, lv = levels[i] || 0; if (lv > 0) { ctx.fillStyle = o.waterCol || '#3a9ae0'; ctx.fillRect(cx, y + h * .5 - h * lv, cw, h * lv); } }
  for (let i = 0; i <= n; i++) { const cx = x0 + w * .97 - i * cw; line(ctx, cx, y - h * (o.open ? .22 : .5), cx, y + h * .5, 6, '#3a3d44'); }
  ctx.restore(); hull(); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
  if (o.nums) for (let i = 0; i < Math.min(n, o.nums); i++) { const cx = x0 + w * .97 - (i + .5) * cw; text(ctx, String(i + 1), cx, y - h * .5 - 34, 34, o.numCol ? o.numCol(i) : '#ffffff', INK, 8); text(ctx, String(i + 1), cx, y - h * .5 - 34, 34, o.numCol ? o.numCol(i) : '#ffffff', INK, 0); }
  ctx.restore();
}
function iceTray(ctx, x, y, w, levels) {
  const n = levels.length, cw = w / n, h = w * .14;
  for (let i = 0; i < n; i++) { const cx = x - w / 2 + i * cw; ctx.beginPath(); ctx.rect(cx, y - h, cw, h); ctx.fillStyle = '#e8eef2'; ctx.fill(); ctx.fillStyle = '#5fb6f0'; ctx.fillRect(cx + 6, y - h * levels[i] * .92, cw - 12, h * levels[i] * .92); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.strokeRect(cx, y - h, cw, h); }
}
function peopleIcons(ctx, x, y, n, per, size, col, lit = n) { for (let i = 0; i < n; i++) { const px = x + (i % per) * size * 1.1, py = y + Math.floor(i / per) * size * 1.5; ctx.globalAlpha = i < lit ? 1 : .22; circle(ctx, px, py, size * .28); ctx.fillStyle = col; ctx.fill(); ctx.beginPath(); ctx.roundRect(px - size * .26, py + size * .34, size * .52, size * .62, size * .2); ctx.fill(); } ctx.globalAlpha = 1; }
function boatIcons(ctx, x, y, n, per, size, col = '#f1efe8') { for (let i = 0; i < n; i++) { const px = x + (i % per) * size * 1.25, py = y + Math.floor(i / per) * size * .7; ctx.beginPath(); ctx.moveTo(px - size * .5, py); ctx.lineTo(px + size * .5, py); ctx.quadraticCurveTo(px + size * .4, py + size * .3, px + size * .25, py + size * .3); ctx.lineTo(px - size * .25, py + size * .3); ctx.quadraticCurveTo(px - size * .4, py + size * .3, px - size * .5, py); ctx.closePath(); fillStroke(ctx, col, 4); } }
// headwear for the stick rig
function capHat(ctx, o, col = '#1d2a4f', badge = true) {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.scale(o.flip || 1, 1); ctx.rotate(o.lean || 0); const hy = -.765 * s + (o.bob || 0) * s;
  ctx.beginPath(); ctx.arc(0, hy - .06 * s, .2 * s, Math.PI * 1.05, Math.PI * 1.95); ctx.closePath(); fillStroke(ctx, '#f6f4ee', Math.max(3, s * .011));
  ctx.beginPath(); ctx.rect(-.19 * s, hy - .13 * s, .38 * s, .06 * s); fillStroke(ctx, col, Math.max(3, s * .011));
  ellipse(ctx, .08 * s, hy - .07 * s, .16 * s, .028 * s, .08); fillStroke(ctx, '#15151a', Math.max(3, s * .01));
  if (badge) { circle(ctx, 0, hy - .1 * s, .022 * s); fillStroke(ctx, '#e8c04a', Math.max(2, s * .007)); }
  ctx.restore();
}
function whiteBeard(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s; ctx.beginPath(); ctx.arc(0, hy + .02 * s, .19 * s, Math.PI * .08, Math.PI * .92); ctx.quadraticCurveTo(0, hy + .04 * s, .19 * s * Math.cos(Math.PI * .08), hy + .02 * s + .19 * s * Math.sin(Math.PI * .08)); ctx.closePath(); fillStroke(ctx, '#f6f4ee', Math.max(3, s * .01)); ctx.restore(); }
function topHat(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s; ctx.beginPath(); ctx.rect(-.13 * s, hy - .42 * s, .26 * s, .26 * s); fillStroke(ctx, '#15151a', Math.max(3, s * .011)); ctx.beginPath(); ctx.rect(-.22 * s, hy - .18 * s, .44 * s, .04 * s); fillStroke(ctx, '#15151a', Math.max(3, s * .011)); ctx.restore(); }
function headphones(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s; ctx.beginPath(); ctx.arc(0, hy, .21 * s, Math.PI * 1.1, Math.PI * 1.9); ctx.lineWidth = .025 * s; ctx.strokeStyle = INK; ctx.stroke(); for (const sd of [-1, 1]) { ellipse(ctx, sd * .2 * s, hy + .01 * s, .04 * s, .07 * s); fillStroke(ctx, '#3a3d44', Math.max(3, s * .01)); } ctx.restore(); }
function violin(ctx, x, y, s, rot = -.9) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.rect(-s * .03, -s * .75, s * .06, s * .45); fillStroke(ctx, '#3a2414', 4); ellipse(ctx, 0, 0, s * .17, s * .3); fillStroke(ctx, '#b5651d', 5); ctx.restore(); }
// interior helpers
function shipRoom(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, 1); ctx.save(); ctx.translate(960, 540); ctx.rotate(o.tilt || 0); ctx.translate(-960, -540);
  const g = ctx.createLinearGradient(0, 0, 0, 900); g.addColorStop(0, o.wall || '#d9c9a3'); g.addColorStop(1, o.wall2 || '#bda77a'); ctx.fillStyle = g; ctx.fillRect(-600, -600, 3200, 1500);
  for (let i = 0; i < 16; i++) line(ctx, -300 + i * 170, -600, -300 + i * 170, GY, 4, 'rgba(90,60,30,.18)');
  ctx.fillStyle = o.floor || '#8a5a3a'; ctx.fillRect(-600, GY, 3200, 900); for (let i = 0; i < 20; i++) line(ctx, -400 + i * 150, GY, -520 + i * 170, GY + 400, 4, 'rgba(40,20,10,.25)');
  if (o.port) for (const px of o.port) { circle(ctx, px, 300, 80); fillStroke(ctx, '#0b1430', 16, '#b8873a'); circle(ctx, px + 24, 280, 5); ctx.fillStyle = '#fff'; ctx.fill(); }
}
function endRoom(ctx) { ctx.restore(); }
function telegraph(ctx, x, y, s, hand = 0) { ctx.beginPath(); ctx.rect(x - s * .12, y - s * 1.2, s * .24, s * 1.2); fillStroke(ctx, '#b8873a', 7); circle(ctx, x, y - s * 1.35, s * .42); fillStroke(ctx, '#f4efe4', 9, '#b8873a'); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; line(ctx, x + Math.cos(a) * s * .3, y - s * 1.35 + Math.sin(a) * s * .3, x + Math.cos(a) * s * .4, y - s * 1.35 + Math.sin(a) * s * .4, 5); } line(ctx, x, y - s * 1.35, x + Math.cos(hand) * s * .5, y - s * 1.35 + Math.sin(hand) * s * .5, 12, '#c8322c'); }
function helm(ctx, x, y, r, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU; line(ctx, 0, 0, Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.25, 12, '#6b3f22'); } circle(ctx, 0, 0, r); ctx.lineWidth = 22; ctx.strokeStyle = '#8a5530'; ctx.stroke(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); circle(ctx, 0, 0, r * .2); fillStroke(ctx, '#b8873a', 6); ctx.restore(); }
function morseKey(ctx, x, y, s, down = 0) { ctx.beginPath(); ctx.rect(x - s * .5, y - s * .12, s, s * .12); fillStroke(ctx, '#3a2414', 6); ctx.save(); ctx.translate(x - s * .3, y - s * .2); ctx.rotate(.12 - down * .12); ctx.beginPath(); ctx.rect(0, -s * .04, s * .7, s * .08); fillStroke(ctx, '#b8873a', 5); circle(ctx, s * .72, -s * .1, s * .1); fillStroke(ctx, '#15151a', 5); ctx.restore(); }
function zap(ctx, x, y, s, t, col = '#ffe14d') { for (let i = 0; i < 3; i++) { const k = (t * 1.5 + i / 3) % 1; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(x, y, s * (.3 + k), -Math.PI * .75, -Math.PI * .25); ctx.lineWidth = 8; ctx.strokeStyle = col; ctx.stroke(); } ctx.globalAlpha = 1; }
// North Atlantic chart
function seaChart(ctx, o = {}) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#16335e'); g.addColorStop(1, '#0c1e3c'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  for (let i = 0; i < 12; i++) { line(ctx, i * 180, 0, i * 180, 1080, 2, 'rgba(255,255,255,.06)'); line(ctx, 0, i * 110, 1920, i * 110, 2, 'rgba(255,255,255,.06)'); }
  path(ctx, [[1500, 0], [1920, 0], [1920, 520], [1760, 470], [1690, 330], [1560, 260], [1600, 120]]); fillStroke(ctx, '#4f8a55', 6);            // Europe
  path(ctx, [[1560, 250], [1640, 180], [1700, 240], [1680, 330], [1600, 330]]); fillStroke(ctx, '#5a9a60', 6);                                   // Britain
  path(ctx, [[0, 0], [420, 0], [470, 180], [360, 330], [300, 520], [180, 640], [120, 900], [0, 940]]); fillStroke(ctx, '#4f8a55', 6);              // North America
  path(ctx, [[520, 250], [640, 230], [660, 330], [560, 360]]); fillStroke(ctx, '#5a9a60', 6);                                                    // Newfoundland
}
const MAP = { soton: [1650, 330], ny: [280, 560], wreck: [700, 500] };
function dotted(ctx, a, b, k, col = '#ffd23a') { const n = 40; for (let i = 0; i < n * clamp(k); i++) { const q = i / n; circle(ctx, lerp(a[0], b[0], q), lerp(a[1], b[1], q) - Math.sin(q * Math.PI) * 60, 6); ctx.fillStyle = col; ctx.fill(); } }
function clockTag(ctx, str, col = '#ffd23a') { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = '700 46px Poppins'; const w = ctx.measureText(str).width + 60; rrect(ctx, 1920 - w - 70, 62, w, 80, 40); ctx.fillStyle = 'rgba(10,12,24,.75)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = col; ctx.stroke(); text(ctx, str, 1920 - w / 2 - 70, 104, 46, col, INK, 0); ctx.restore(); }
function thermo(ctx, x, y, h, frac, col = '#5fb6f0') { rrect(ctx, x - 26, y - h, 52, h, 26); fillStroke(ctx, '#f4efe4', 8); circle(ctx, x, y + 30, 56); fillStroke(ctx, col, 8); ctx.fillStyle = col; ctx.fillRect(x - 12, y - h * frac, 24, h * frac + 10); for (let i = 0; i <= 8; i++) line(ctx, x + 30, y - i * h / 8.5 - 10, x + 52, y - i * h / 8.5 - 10, 5); }
