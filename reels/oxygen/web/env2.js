// ---------- props for the "oxygen" reel (outdoor world, flames, car, mountain, diagrams) ----------
const GROUND = 1240;

// sky + sun + clouds + hills + grass. o: {skyTop, skyBot, sun, grass, grassDark, hills}
function outdoorBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.skyTop || '#3ea6ee', o.skyBot || '#d3f0fb');
  if (o.sun !== false) { applyCam(ctx, cam, .1); drawSun(ctx, 870, 250, 78, t, o.sunPow || 1); }
  applyCam(ctx, cam, .14);
  drawCloud(ctx, 150 + t * 6, 300, 115, 1); drawCloud(ctx, 700 + t * 4, 170, 85, 2); drawCloud(ctx, 1080 + t * 5, 470, 70, 3, .9);
  if (o.hills !== false) {
    applyCam(ctx, cam, .35);
    ellipse(ctx, 180, GROUND + 60, 620, 330); fillStroke(ctx, o.hillA || '#58b85a', 6);
    ellipse(ctx, 930, GROUND + 80, 560, 280); fillStroke(ctx, o.hillB || '#4aa652', 6);
  }
  applyCam(ctx, cam, 1);
  ctx.fillStyle = o.grass || '#7ed05a'; ctx.fillRect(-2000, GROUND - 40, 5080, 3000);
  ctx.fillStyle = o.grassDark || '#63b548'; ctx.fillRect(-2000, GROUND + 150, 5080, 3000);
  line(ctx, -2000, GROUND - 40, 3080, GROUND - 40, 6);
}

// O2 molecule: two joined atoms. pop 0..1 bursts it away.
function drawO2(ctx, x, y, r, pop = 0, col = '#6fd0ff') {
  if (pop >= 1) return;
  if (pop > 0) { ctx.save(); ctx.globalAlpha = 1 - pop; burst(ctx, x, y, r * (1 + pop * 1.6), 9, '#ffffff', Math.round(x + y), .5); ctx.restore(); return; }
  circle(ctx, x - r * .55, y, r); fillStroke(ctx, col, r * .16);
  circle(ctx, x + r * .55, y, r); fillStroke(ctx, col, r * .16);
  circle(ctx, x - r * .85, y - r * .35, r * .25); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fill();
  circle(ctx, x + r * .25, y - r * .35, r * .25); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fill();
}

// teardrop flame; lit 0..1 scales it down to nothing
function flame(ctx, x, y, s, t, lit = 1, cols = ['#ff7a1a', '#ffd23a'], seed = 0) {
  if (lit <= 0.02) return;
  const w = Math.sin(t * 17 + seed) * .08 + Math.sin(t * 29 + seed * 2) * .05;
  const h = s * lit * (1 + Math.sin(t * 23 + seed) * .08);
  ctx.save(); ctx.translate(x, y); ctx.rotate(w);
  ctx.beginPath(); ctx.moveTo(0, -h); ctx.bezierCurveTo(h * .55, -h * .45, h * .42, 0, 0, 0); ctx.bezierCurveTo(-h * .42, 0, -h * .55, -h * .45, 0, -h);
  fillStroke(ctx, cols[0], Math.max(3, s * .05));
  ctx.beginPath(); ctx.moveTo(0, -h * .62); ctx.bezierCurveTo(h * .28, -h * .28, h * .2, 0, 0, 0); ctx.bezierCurveTo(-h * .2, 0, -h * .28, -h * .28, 0, -h * .62);
  ctx.fillStyle = cols[1]; ctx.fill();
  ctx.restore();
}
// thin smoke wisp rising from a wick; a 0..1 opacity, t for drift
function wisp(ctx, x, y, s, t, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a * .8; ctx.beginPath(); ctx.moveTo(x, y);
  for (let i = 1; i <= 12; i++) ctx.lineTo(x + Math.sin(i * .9 + t * 3) * s * .12 * (i / 12), y - i * s / 12);
  ctx.lineWidth = s * .07; ctx.strokeStyle = '#e9e6ee'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
}
function drawCandle(ctx, x, y, s, t, lit = 1) {
  rrect(ctx, x - s * .22, y - s, s * .44, s, s * .06); fillStroke(ctx, '#fff3d6', 6);
  ctx.save(); rrect(ctx, x - s * .22, y - s, s * .44, s, s * .06); ctx.clip(); ctx.fillStyle = 'rgba(30,10,40,.14)'; ctx.fillRect(x + s * .05, y - s, s * .3, s); ctx.restore();
  ellipse(ctx, x, y, s * .4, s * .09); fillStroke(ctx, '#c9a24a', 6);
  line(ctx, x, y - s, x, y - s * 1.14, 6);
  flame(ctx, x, y - s * 1.1, s * .62, t, lit, ['#ff7a1a', '#ffd23a'], 1);
}
function drawStove(ctx, x, y, s, t, lit = 1) {
  rrect(ctx, x - s * .75, y - s * .5, s * 1.5, s * .5, s * .06); fillStroke(ctx, '#d9dde6', 6);
  rrect(ctx, x - s * .55, y - s * .34, s * .3, s * .14, s * .04); fillStroke(ctx, '#3a3f4d', 5);
  circle(ctx, x + s * .45, y - s * .27, s * .08); fillStroke(ctx, '#e0392f', 5);
  rrect(ctx, x - s * .5, y - s * .58, s, s * .08, s * .03); fillStroke(ctx, '#3a3f4d', 5);
  for (let i = -2; i <= 2; i++) flame(ctx, x + i * s * .17, y - s * .58, s * .26, t, lit, ['#2f8bff', '#bfe4ff'], i + 3);
  // pot
  rrect(ctx, x - s * .42, y - s * 1.12, s * .84, s * .42, s * .06); fillStroke(ctx, '#8d94a8', 6);
  rrect(ctx, x - s * .5, y - s * 1.16, s, s * .08, s * .04); fillStroke(ctx, '#737a8e', 5);
  line(ctx, x - s * .5, y - s * .98, x - s * .64, y - s * .98, 8); line(ctx, x + s * .5, y - s * .98, x + s * .64, y - s * .98, 8);
}
function drawCampfire(ctx, x, y, s, t, lit = 1) {
  for (const a of [-.35, .35]) { ctx.save(); ctx.translate(x, y - s * .08); ctx.rotate(a); rrect(ctx, -s * .7, -s * .09, s * 1.4, s * .18, s * .08); fillStroke(ctx, '#8a5a2c', 6); ctx.restore(); }
  flame(ctx, x - s * .22, y - s * .12, s * .7, t, lit, ['#ff5a1a', '#ffb12a'], 4);
  flame(ctx, x + s * .22, y - s * .12, s * .75, t, lit, ['#ff5a1a', '#ffb12a'], 5);
  flame(ctx, x, y - s * .12, s * 1.05, t, lit, ['#ff7a1a', '#ffd23a'], 6);
  for (let i = 0; i < 5; i++) { const a = -Math.PI * (.1 + i * .2); circle(ctx, x + Math.cos(a) * s * .78, y + Math.sin(a) * s * .12 + s * .06, s * .1); fillStroke(ctx, '#9aa0ad', 5); }
}
// side-view car heading right; spin = wheel rotation (radians)
function drawCar(ctx, x, y, s, spin = 0, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ellipse(ctx, 0, 0, 230, 18); ctx.fillStyle = 'rgba(40,20,30,.22)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-110, -128); ctx.lineTo(-64, -206); ctx.lineTo(78, -206); ctx.lineTo(132, -128); ctx.closePath(); fillStroke(ctx, o.col || '#e0392f', 7);
  rrect(ctx, -200, -132, 400, 92, 30); fillStroke(ctx, o.col || '#e0392f', 7);
  ctx.beginPath(); ctx.moveTo(-84, -134); ctx.lineTo(-54, -190); ctx.lineTo(4, -190); ctx.lineTo(4, -134); ctx.closePath(); fillStroke(ctx, '#c8ecff', 5);
  ctx.beginPath(); ctx.moveTo(20, -134); ctx.lineTo(20, -190); ctx.lineTo(70, -190); ctx.lineTo(106, -134); ctx.closePath(); fillStroke(ctx, '#c8ecff', 5);
  rrect(ctx, 182, -112, 20, 30, 8); fillStroke(ctx, '#ffe14d', 5);
  rrect(ctx, -204, -112, 16, 30, 8); fillStroke(ctx, '#ff5a5a', 5);
  for (const wx of [-118, 118]) {
    circle(ctx, wx, -38, 44); fillStroke(ctx, '#2a2630', 7);
    circle(ctx, wx, -38, 20); fillStroke(ctx, '#c9d1e0', 5);
    for (let i = 0; i < 3; i++) { const a = spin + i * TAU / 3; line(ctx, wx, -38, wx + Math.cos(a) * 36, -38 + Math.sin(a) * 36, 6, '#c9d1e0'); }
  }
  ctx.restore();
}
function drawMountain(ctx, ax, ay, base, half) {
  path(ctx, [[ax - half, base], [ax, ay], [ax + half, base]]); fillStroke(ctx, '#8f8aa8', 7);
  ctx.save(); path(ctx, [[ax - half, base], [ax, ay], [ax + half, base]]); ctx.clip();
  ctx.fillStyle = 'rgba(30,10,40,.16)'; ctx.fillRect(ax, ay, half, base - ay);
  const sh = (base - ay) * .22; const k = half / (base - ay);
  path(ctx, [[ax - sh * k, ay + sh], [ax, ay], [ax + sh * k, ay + sh], [ax + sh * k * .5, ay + sh * .8], [ax, ay + sh * 1.15], [ax - sh * k * .5, ay + sh * .8]]); ctx.fillStyle = '#ffffff'; ctx.fill();
  ctx.restore();
  path(ctx, [[ax - half, base], [ax, ay], [ax + half, base]]); fillStroke(ctx, null, 7);
}
function drawStopwatch(ctx, x, y, r, frac, label) {
  rrect(ctx, x - r * .14, y - r * 1.28, r * .28, r * .26, r * .06); fillStroke(ctx, '#c9d1e0', 6);
  circle(ctx, x, y, r); fillStroke(ctx, '#ffffff', 8);
  circle(ctx, x, y, r * .86); fillStroke(ctx, '#f3f6fb', 4);
  for (let i = 0; i < 12; i++) { const a = i * TAU / 12; line(ctx, x + Math.cos(a) * r * .72, y + Math.sin(a) * r * .72, x + Math.cos(a) * r * .82, y + Math.sin(a) * r * .82, 5); }
  const a = -Math.PI / 2 + frac * TAU; line(ctx, x, y, x + Math.cos(a) * r * .66, y + Math.sin(a) * r * .66, 9, '#e0392f');
  circle(ctx, x, y, r * .08); ctx.fillStyle = INK; ctx.fill();
  if (label) text(ctx, label, x, y + r * 1.42, r * .5, '#fff', INK, r * .1);
}
function drawGlass(ctx, x, y, s, level = 1) {
  const g = () => { ctx.beginPath(); ctx.moveTo(x - s * .4, y - s); ctx.lineTo(x - s * .32, y); ctx.lineTo(x + s * .32, y); ctx.lineTo(x + s * .4, y - s); ctx.closePath(); };
  ctx.save(); g(); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.fillRect(x - s, y - s, s * 2, s);
  ctx.fillStyle = '#4db5f0'; ctx.fillRect(x - s, y - s * .86 * level, s * 2, s * .86 * level); ctx.restore();
  g(); fillStroke(ctx, null, 7);
}
function drawRock(ctx, x, y, s, crack = 0, seed = 7) {
  const R = rng(seed); const pts = [];
  for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI; const rr = s * (.8 + R() * .3); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr * .8]); }
  path(ctx, pts); fillStroke(ctx, '#9a95a6', 7);
  ctx.save(); path(ctx, pts); ctx.clip(); ctx.fillStyle = 'rgba(30,10,40,.16)'; ctx.fillRect(x + s * .15, y - s, s, s); ctx.restore();
  if (crack > 0) { ctx.beginPath(); ctx.moveTo(x - s * .1, y - s * .78); ctx.lineTo(x + s * .08, y - s * .5); ctx.lineTo(x - s * .12, y - s * .3); ctx.lineTo(x + s * .05, y - s * .02 * (1 - crack)); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.globalAlpha = crack; ctx.stroke(); ctx.globalAlpha = 1; }
}
// screen-space tint (dark mood, flashes)
function tint(ctx, col, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
// big on-screen label, pops in at `at`
function label(ctx, str, x, y, size, lt, at, fill = '#fff') {
  const k = clamp((lt - at) / .16); if (k <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x, y); const sc = .7 + .3 * backOut(k); ctx.scale(sc, sc); ctx.globalAlpha = k;
  text(ctx, str, 0, 0, size, fill, INK, size * .2); text(ctx, str, 0, 0, size, fill, INK, 0); ctx.restore();
}
