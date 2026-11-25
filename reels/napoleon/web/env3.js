// ---------- props for the landscape "sleep" film (1920x1080) ----------
const GY = 860; // ground line (feet)

// ----- screen-space helpers -----
function tint(ctx, col, a) { if (a <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = clamp(a); ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); }
// big label that pops in at time `at` (same clock as `now`); optional `out` time to pop out
function label(ctx, str, x, y, size, now, at, fill = '#fff', out = 1e9) {
  const k = clamp((now - at) / .16) * (1 - clamp((now - out) / .14)); if (k <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(x, y); const sc = .7 + .3 * backOut(clamp((now - at) / .16)); ctx.scale(sc, sc); ctx.globalAlpha = k;
  text(ctx, str, 0, 0, size, fill, INK, size * .2); text(ctx, str, 0, 0, size, fill, INK, 0); ctx.restore();
}
// chapter tag, top-left, visible for the first 2.6 s after `at`
function chapterTag(ctx, now, at, str) {
  const k = clamp((now - at) / .2) * (1 - clamp((now - at - 2.6) / .3)); if (k <= 0) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = k; ctx.translate(-60 * (1 - easeOut(clamp((now - at) / .2))), 0);
  ctx.font = '700 40px Poppins'; const w = ctx.measureText(str).width + 70;
  rrect(ctx, 70, 62, w, 76, 38); fillStroke(ctx, '#221c22', 0); rrect(ctx, 70, 62, w, 76, 38); ctx.lineWidth = 5; ctx.strokeStyle = '#ffd23a'; ctx.stroke();
  text(ctx, str, 70 + w / 2, 102, 40, '#ffd23a'); ctx.restore();
}

// ----- backgrounds -----
function groundBand(ctx, a, b) { ctx.fillStyle = a; ctx.fillRect(-2000, GY - 30, 6000, 2000); ctx.fillStyle = b; ctx.fillRect(-2000, GY + 90, 6000, 2000); line(ctx, -2000, GY - 30, 4000, GY - 30, 6); }
function bgDay(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#3ea6ee', o.bot || '#d3f0fb', -400, 900);
  if (o.sun !== false) { applyCam(ctx, cam, .1); drawSun(ctx, o.sunX || 1560, 190, 70, t, 1); }
  applyCam(ctx, cam, .14); drawCloud(ctx, 260 + t * 6, 230, 105, 1); drawCloud(ctx, 980 + t * 4, 150, 80, 2); drawCloud(ctx, 1720 + t * 5, 340, 70, 3, .9);
  if (o.hills !== false) { applyCam(ctx, cam, .35); ellipse(ctx, 380, GY + 80, 760, 300); fillStroke(ctx, '#58b85a', 6); ellipse(ctx, 1500, GY + 100, 820, 280); fillStroke(ctx, '#4aa652', 6); }
  applyCam(ctx, cam, 1); groundBand(ctx, o.grass || '#7ed05a', o.grass2 || '#63b548');
}
function drawStars(ctx, t, n = 60, seed = 5, a = 1) {
  const R = rng(seed);
  for (let i = 0; i < n; i++) { const x = R() * 2300 - 190, y = R() * 620 - 40, r = 2 + R() * 3.5; ctx.globalAlpha = a * (.45 + .55 * Math.abs(Math.sin(t * (1 + R() * 2) + i))); circle(ctx, x, y, r); ctx.fillStyle = '#fff8d8'; ctx.fill(); }
  ctx.globalAlpha = 1;
}
function drawMoon(ctx, x, y, r) {
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, r * .5, x, y, r * 3.2); g.addColorStop(0, 'rgba(255,245,200,.35)'); g.addColorStop(1, 'rgba(255,245,200,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 4, y - r * 4, r * 8, r * 8); ctx.restore();
  circle(ctx, x, y, r); fillStroke(ctx, '#fff6cf', 6); circle(ctx, x - r * .3, y - r * .2, r * .2); ctx.fillStyle = '#eadfae'; ctx.fill(); circle(ctx, x + r * .3, y + r * .3, r * .14); ctx.fill(); circle(ctx, x + r * .1, y - r * .45, r * .1); ctx.fill();
}
function bgNight(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#141a3a', o.bot || '#3a4486', -400, 900);
  applyCam(ctx, cam, .1); drawStars(ctx, t, 70, 5); if (o.moon !== false) drawMoon(ctx, o.moonX || 1560, 190, 66);
  if (o.hills !== false) { applyCam(ctx, cam, .35); ellipse(ctx, 380, GY + 80, 760, 300); fillStroke(ctx, '#27456a', 6); ellipse(ctx, 1500, GY + 100, 820, 280); fillStroke(ctx, '#223d60', 6); }
  applyCam(ctx, cam, 1); groundBand(ctx, o.grass || '#2f5a63', o.grass2 || '#274c56');
}
// interior. o: {night, win:[x,y,w,h]|false, wall, floor}
function bgRoom(ctx, t, cam, o = {}) {
  const n = !!o.night;
  applyCam(ctx, cam, 1);
  ctx.fillStyle = o.wall || (n ? '#3b3f6b' : '#f1dcc2'); ctx.fillRect(-2000, -2000, 6000, 2000 + GY - 30);
  ctx.fillStyle = o.floor || (n ? '#5a4a6a' : '#c08a56'); ctx.fillRect(-2000, GY - 30, 6000, 2000);
  for (let i = -6; i < 26; i++) line(ctx, i * 160, GY - 30, i * 160 - 70, H + 200, 3, 'rgba(30,10,40,.18)');
  ctx.fillStyle = n ? '#2c3054' : '#e2c9a8'; ctx.fillRect(-2000, GY - 62, 6000, 32); line(ctx, -2000, GY - 30, 4000, GY - 30, 6); line(ctx, -2000, GY - 62, 4000, GY - 62, 4);
  if (o.win !== false) {
    const [x, y, w, h] = o.win || [1340, 150, 380, 330];
    ctx.save(); rrect(ctx, x, y, w, h, 16); ctx.clip();
    const g = ctx.createLinearGradient(0, y, 0, y + h); if (n) { g.addColorStop(0, '#141a3a'); g.addColorStop(1, '#3a4486'); } else { g.addColorStop(0, '#3ea6ee'); g.addColorStop(1, '#d3f0fb'); }
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    if (n) { const R = rng(9); for (let i = 0; i < 14; i++) { circle(ctx, x + R() * w, y + R() * h, 2 + R() * 3); ctx.fillStyle = '#fff8d8'; ctx.fill(); } drawMoon(ctx, x + w * .7, y + h * .32, 38); }
    else { circle(ctx, x + w * .72, y + h * .3, 40); ctx.fillStyle = '#fff6c4'; ctx.fill(); drawCloud(ctx, x + w * .3, y + h * .6, 50, 4); }
    ctx.restore();
    rrect(ctx, x, y, w, h, 16); fillStroke(ctx, null, 12, '#8a5a34'); line(ctx, x + w / 2, y, x + w / 2, y + h, 8, '#8a5a34'); line(ctx, x, y + h / 2, x + w, y + h / 2, 8, '#8a5a34');
    rrect(ctx, x - 20, y + h, w + 40, 22, 8); fillStroke(ctx, '#a06a3c', 5);
  }
}
function drawBuilding(ctx, x, w, h, seed, lit = .5, night = true) {
  const y = GY - 30 - h; rrect(ctx, x, y, w, h + 6, 8); fillStroke(ctx, night ? '#27304f' : '#9fb3c8', 6);
  const R = rng(seed); const cols = Math.max(2, Math.floor(w / 62)), rows = Math.max(2, Math.floor(h / 78));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const on = R() < lit; rrect(ctx, x + 18 + c * (w - 36) / cols + 6, y + 22 + r * (h - 30) / rows, (w - 36) / cols - 14, (h - 30) / rows - 22, 5);
    ctx.fillStyle = on ? '#ffd96a' : (night ? '#1b2238' : '#dfeaf5'); ctx.fill();
  }
}
// o: {night=true, lit=.4}
function bgCity(ctx, t, cam, o = {}) {
  const n = o.night !== false, lit = o.lit == null ? .4 : o.lit;
  applyCam(ctx, cam, .08); drawSky(ctx, n ? '#141a3a' : '#3ea6ee', n ? '#3a4486' : '#d3f0fb', -400, 900);
  applyCam(ctx, cam, .1); if (n) { drawStars(ctx, t, 50, 6, 1 - lit * .7); drawMoon(ctx, 1640, 150, 56); } else drawSun(ctx, 1600, 170, 64, t, 1);
  applyCam(ctx, cam, .5); const R = rng(31); let x = -260; let i = 0;
  while (x < 2200) { const w = 150 + R() * 130, h = 260 + R() * 330; ctx.globalAlpha = .75; drawBuilding(ctx, x, w, h, 40 + i, lit, n); ctx.globalAlpha = 1; x += w + 14; i++; }
  applyCam(ctx, cam, 1); ctx.fillStyle = n ? '#2a2d3c' : '#6c7280'; ctx.fillRect(-2000, GY - 30, 6000, 2000); line(ctx, -2000, GY - 30, 4000, GY - 30, 6);
  for (let k = -4; k < 20; k++) { rrect(ctx, k * 190 + 30, GY + 120, 100, 12, 6); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.fill(); }
}
function bgFlat(ctx, top, bot) { ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }

// ----- furniture & objects -----
// side-view bed, x,y = bottom centre. o: {sleeper:'closed'|'open'|null, blanket, s}
function drawBed(ctx, x, y, s = 1, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ellipse(ctx, 0, 0, 330, 22); ctx.fillStyle = 'rgba(40,20,30,.22)'; ctx.fill();
  rrect(ctx, -310, -250, 44, 250, 12); fillStroke(ctx, '#8a5a34', 6); rrect(ctx, 270, -150, 36, 150, 10); fillStroke(ctx, '#8a5a34', 6);
  rrect(ctx, -290, -130, 580, 80, 22); fillStroke(ctx, '#f6f1e8', 6);
  ellipse(ctx, -200, -150, 80, 36, -.08); fillStroke(ctx, '#ffffff', 6);
  if (o.sleeper) {
    circle(ctx, -190, -196, 62); fillStroke(ctx, '#f6f2ea', 6);
    ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.lineCap = 'round';
    if (o.sleeper === 'closed') { for (const ex of [-214, -168]) { ctx.beginPath(); ctx.arc(ex, -200, 13, .2, Math.PI - .2); ctx.stroke(); } ctx.beginPath(); ctx.arc(-190, -178, 10, .3, Math.PI - .3); ctx.stroke(); }
    else { for (const ex of [-214, -168]) { circle(ctx, ex, -202, 15); fillStroke(ctx, '#fff', 5); circle(ctx, ex, -202, 6); ctx.fillStyle = INK; ctx.fill(); } ellipse(ctx, -190, -170, 8, 10); fillStroke(ctx, '#5a1e24', 4); }
    ellipse(ctx, 40, -150, 200, 62); fillStroke(ctx, o.blanket || '#5b8def', 6);
  }
  rrect(ctx, -130, -150, 420, 100, 26); fillStroke(ctx, o.blanket || '#5b8def', 6);
  rrect(ctx, -130, -150, 420, 30, 14); fillStroke(ctx, '#ffffff', 5);
  rrect(ctx, -290, -56, 580, 34, 10); fillStroke(ctx, '#a06a3c', 6);
  ctx.restore();
}
function drawZs(ctx, x, y, t, s = 1, col = '#ffffff') {
  for (let i = 0; i < 3; i++) { const k = (t * .55 + i / 3) % 1; ctx.save(); ctx.globalAlpha = Math.sin(k * Math.PI); text(ctx, 'z', x + k * 90 * s + Math.sin(k * 6) * 10, y - k * 150 * s, (34 + k * 46) * s, col, INK, 8 * s); ctx.restore(); }
}
// analogue clock; hour 0..24 (float)
function drawClock(ctx, x, y, r, hour, col = '#ffffff') {
  circle(ctx, x, y, r); fillStroke(ctx, col, 8); circle(ctx, x, y, r * .86); fillStroke(ctx, '#f3f6fb', 3);
  for (let i = 0; i < 12; i++) { const a = i * TAU / 12; line(ctx, x + Math.cos(a) * r * .7, y + Math.sin(a) * r * .7, x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8, 5); }
  const ha = -Math.PI / 2 + (hour % 12) / 12 * TAU, ma = -Math.PI / 2 + (hour % 1) * TAU;
  line(ctx, x, y, x + Math.cos(ha) * r * .45, y + Math.sin(ha) * r * .45, 11); line(ctx, x, y, x + Math.cos(ma) * r * .68, y + Math.sin(ma) * r * .68, 7, '#e0392f');
  circle(ctx, x, y, r * .07); ctx.fillStyle = INK; ctx.fill();
}
// digital clock plate "03:00"
function drawDigital(ctx, x, y, s, str, col = '#7dffb0') {
  rrect(ctx, x - 150 * s, y - 56 * s, 300 * s, 112 * s, 20 * s); fillStroke(ctx, '#1b1e2b', 7);
  text(ctx, str, x, y + 4 * s, 78 * s, col, INK, 0, 'Poppins');
}
function drawBrain(ctx, x, y, s, o = {}) {
  const col = o.col || '#f29bb0';
  if (o.glow) { ctx.save(); ctx.globalAlpha = o.glow * .5; circle(ctx, x, y, s * 1.35); ctx.fillStyle = o.glowCol || '#8fd8ff'; ctx.fill(); ctx.restore(); }
  const shape = () => { ctx.beginPath(); ctx.moveTo(x - s * .95, y + s * .1); ctx.bezierCurveTo(x - s * 1.1, y - s * .7, x - s * .3, y - s * .95, x + s * .15, y - s * .8); ctx.bezierCurveTo(x + s * .85, y - s * .85, x + s * 1.15, y - s * .2, x + s * .95, y + s * .2); ctx.bezierCurveTo(x + s * .9, y + s * .6, x + s * .3, y + s * .62, x + s * .1, y + s * .5); ctx.bezierCurveTo(x - s * .4, y + s * .7, x - s * .9, y + s * .55, x - s * .95, y + s * .1); ctx.closePath(); };
  ellipse(ctx, x + s * .55, y + s * .55, s * .34, s * .24, .2); fillStroke(ctx, o.col2 || '#e07f98', s * .05);
  rrect(ctx, x + s * .1, y + s * .5, s * .2, s * .42, s * .08); fillStroke(ctx, o.col2 || '#e07f98', s * .05);
  shape(); fillStroke(ctx, col, s * .06);
  ctx.save(); shape(); ctx.clip(); ctx.lineWidth = s * .045; ctx.strokeStyle = 'rgba(120,30,60,.45)'; ctx.lineCap = 'round';
  for (const [a, b, c, d, e, f] of [[-.7, -.2, -.4, -.6, -.1, -.25], [-.2, -.6, .1, -.2, .35, -.55], [.3, -.3, .6, -.5, .8, -.1], [-.6, .25, -.3, 0, 0, .25], [.1, .1, .4, .3, .7, .1], [-.3, .45, 0, .3, .3, .45]]) { ctx.beginPath(); ctx.moveTo(x + a * s, y + b * s); ctx.quadraticCurveTo(x + c * s, y + d * s, x + e * s, y + f * s); ctx.stroke(); }
  ctx.restore(); shape(); fillStroke(ctx, null, s * .06);
}
function drawBox(ctx, x, y, w, h, col = '#d9a05b', txt) {
  rrect(ctx, x - w / 2, y - h, w, h, 8); fillStroke(ctx, col, 6); line(ctx, x - w / 2, y - h * .72, x + w / 2, y - h * .72, 5); rrect(ctx, x - w * .16, y - h * .86, w * .32, h * .14, 4); fillStroke(ctx, '#fff3d6', 4);
  if (txt) text(ctx, txt, x, y - h * .34, h * .26, '#fff', INK, h * .06);
}
function drawCabinet(ctx, x, y, w, h, txt, col = '#7d8fb3') {
  rrect(ctx, x - w / 2, y - h, w, h, 12); fillStroke(ctx, col, 7);
  for (let i = 0; i < 3; i++) { rrect(ctx, x - w / 2 + 18, y - h + 18 + i * (h - 30) / 3, w - 36, (h - 30) / 3 - 14, 8); fillStroke(ctx, 'rgba(255,255,255,.25)', 5); rrect(ctx, x - 26, y - h + 40 + i * (h - 30) / 3, 52, 14, 7); fillStroke(ctx, '#f3f6fb', 4); }
  if (txt) text(ctx, txt, x, y - h - 40, 40, '#fff', INK, 9);
}
function drawDesk(ctx, x, y, w = 420) { rrect(ctx, x - w / 2, y - 190, w, 26, 8); fillStroke(ctx, '#a06a3c', 6); rrect(ctx, x - w / 2 + 20, y - 164, 22, 164, 6); fillStroke(ctx, '#8a5a34', 5); rrect(ctx, x + w / 2 - 42, y - 164, 22, 164, 6); fillStroke(ctx, '#8a5a34', 5); }
function drawLaptop(ctx, x, y, s = 1, glow = '#bfe4ff') { rrect(ctx, x - 90 * s, y - 130 * s, 180 * s, 120 * s, 10 * s); fillStroke(ctx, '#3a3f4d', 6); rrect(ctx, x - 76 * s, y - 118 * s, 152 * s, 96 * s, 6 * s); ctx.fillStyle = glow; ctx.fill(); rrect(ctx, x - 110 * s, y - 12 * s, 220 * s, 14 * s, 6 * s); fillStroke(ctx, '#8d94a8', 5); }
function drawBook(ctx, x, y, s = 1, col = '#e0392f') { rrect(ctx, x - 60 * s, y - 84 * s, 120 * s, 84 * s, 8 * s); fillStroke(ctx, col, 6); rrect(ctx, x - 50 * s, y - 76 * s, 14 * s, 68 * s, 4 * s); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill(); line(ctx, x - 20 * s, y - 56 * s, x + 40 * s, y - 56 * s, 5, '#fff'); line(ctx, x - 20 * s, y - 36 * s, x + 28 * s, y - 36 * s, 5, '#fff'); }
function drawPhone(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.save(); ctx.globalAlpha = .45; circle(ctx, 0, 0, 120 * s); ctx.fillStyle = '#9fd4ff'; ctx.fill(); ctx.restore(); rrect(ctx, -34 * s, -62 * s, 68 * s, 124 * s, 12 * s); fillStroke(ctx, '#23262f', 6); rrect(ctx, -26 * s, -50 * s, 52 * s, 100 * s, 6 * s); ctx.fillStyle = '#bfe4ff'; ctx.fill(); ctx.restore(); }
function drawCup(ctx, x, y, s = 1, t = 0) { rrect(ctx, x - 44 * s, y - 86 * s, 88 * s, 86 * s, 12 * s); fillStroke(ctx, '#ffffff', 6); ctx.beginPath(); ctx.arc(x + 48 * s, y - 46 * s, 24 * s, -1.3, 1.3); ctx.lineWidth = 10 * s; ctx.strokeStyle = INK; ctx.stroke(); ellipse(ctx, x, y - 82 * s, 36 * s, 8 * s); ctx.fillStyle = '#6b3d1f'; ctx.fill(); for (const dx of [-16, 14]) { ctx.beginPath(); ctx.moveTo(x + dx * s, y - 100 * s); for (let i = 1; i <= 8; i++) ctx.lineTo(x + dx * s + Math.sin(i * .9 + t * 3 + dx) * 9 * s, y - 100 * s - i * 11 * s); ctx.lineWidth = 6 * s; ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineCap = 'round'; ctx.stroke(); } }
function drawSofa(ctx, x, y, s = 1, col = '#c85a5a') { ellipse(ctx, x, y, 330 * s, 22 * s); ctx.fillStyle = 'rgba(40,20,30,.22)'; ctx.fill(); rrect(ctx, x - 300 * s, y - 250 * s, 600 * s, 190 * s, 40 * s); fillStroke(ctx, col, 7); rrect(ctx, x - 330 * s, y - 170 * s, 90 * s, 170 * s, 30 * s); fillStroke(ctx, col, 7); rrect(ctx, x + 240 * s, y - 170 * s, 90 * s, 170 * s, 30 * s); fillStroke(ctx, col, 7); rrect(ctx, x - 250 * s, y - 120 * s, 500 * s, 80 * s, 24 * s); fillStroke(ctx, '#d97070', 7); }
function drawHeart(ctx, x, y, s, col = '#ff5a6e') { ctx.beginPath(); ctx.moveTo(x, y + s * .9); ctx.bezierCurveTo(x - s * 1.5, y - s * .1, x - s * .8, y - s * 1.2, x, y - s * .45); ctx.bezierCurveTo(x + s * .8, y - s * 1.2, x + s * 1.5, y - s * .1, x, y + s * .9); fillStroke(ctx, col, Math.max(4, s * .1)); }
function drawShield(ctx, x, y, s, col = '#4fb0ff') { ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s * .8, y - s * .65); ctx.lineTo(x + s * .8, y); ctx.quadraticCurveTo(x + s * .7, y + s * .75, x, y + s); ctx.quadraticCurveTo(x - s * .7, y + s * .75, x - s * .8, y); ctx.lineTo(x - s * .8, y - s * .65); ctx.closePath(); fillStroke(ctx, col, Math.max(4, s * .1)); line(ctx, x - s * .3, y, x - s * .05, y + s * .28, s * .14, '#fff'); line(ctx, x - s * .05, y + s * .28, x + s * .38, y - s * .3, s * .14, '#fff'); }
function drawBulb(ctx, x, y, s, on = 1) { if (on > 0) { ctx.save(); ctx.globalAlpha = .5 * on; circle(ctx, x, y - s * .2, s * 1.6); ctx.fillStyle = '#fff3a0'; ctx.fill(); ctx.restore(); } circle(ctx, x, y - s * .2, s * .7); fillStroke(ctx, on > .5 ? '#ffe14d' : '#cfd3dc', Math.max(4, s * .09)); rrect(ctx, x - s * .3, y + s * .42, s * .6, s * .36, s * .08); fillStroke(ctx, '#8d94a8', Math.max(4, s * .08)); }
function drawRainCloud(ctx, x, y, s, t) { for (let i = 0; i < 6; i++) { const k = (t * 1.4 + i * .17) % 1; line(ctx, x - s * .9 + i * s * .36, y + s * .3 + k * s * 1.1, x - s * .96 + i * s * .36, y + s * .52 + k * s * 1.1, 6, '#6fb4ff'); } ctx.save(); cloudShape(ctx, x, y, s, 8); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke(); cloudShape(ctx, x, y, s, 8); ctx.fillStyle = '#8089a0'; ctx.fill(); ctx.restore(); }
function drawDumbbell(ctx, x, y, s = 1, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); line(ctx, -70 * s, 0, 70 * s, 0, 14 * s); for (const dx of [-80, 80]) { rrect(ctx, dx * s - 20 * s, -46 * s, 40 * s, 92 * s, 10 * s); fillStroke(ctx, '#4a4f5c', 6); } ctx.restore(); }
function drawBin(ctx, x, y, s = 1) { ctx.beginPath(); ctx.moveTo(x - 60 * s, y - 130 * s); ctx.lineTo(x + 60 * s, y - 130 * s); ctx.lineTo(x + 46 * s, y); ctx.lineTo(x - 46 * s, y); ctx.closePath(); fillStroke(ctx, '#8d94a8', 6); rrect(ctx, x - 70 * s, y - 146 * s, 140 * s, 20 * s, 8 * s); fillStroke(ctx, '#737a8e', 5); }
function meterH(ctx, x, y, w, h, frac, col = '#ffb347', back = 'rgba(255,255,255,.25)') { rrect(ctx, x, y, w, h, h / 2); ctx.fillStyle = back; ctx.fill(); ctx.save(); rrect(ctx, x, y, w, h, h / 2); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(x, y, w * clamp(frac), h); ctx.restore(); rrect(ctx, x, y, w, h, h / 2); fillStroke(ctx, null, 7); }
function meterV(ctx, x, y, w, h, frac, col = '#ffb347') { rrect(ctx, x, y, w, h, w / 2); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fill(); ctx.save(); rrect(ctx, x, y, w, h, w / 2); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(x, y + h * (1 - clamp(frac)), w, h); ctx.restore(); rrect(ctx, x, y, w, h, w / 2); fillStroke(ctx, null, 7); }
// grid of day cells; `filled` cells are coloured
function drawDays(ctx, x, y, cols, rows, cell, filled, col = '#ffd23a') { for (let i = 0; i < cols * rows; i++) { const cx = x + (i % cols) * cell, cy = y + Math.floor(i / cols) * cell; rrect(ctx, cx, cy, cell - 6, cell - 6, 5); ctx.fillStyle = i < filled ? col : 'rgba(255,255,255,.22)'; ctx.fill(); } }
function drawDNA(ctx, x, y, h, t, s = 1) { for (let i = 0; i <= 14; i++) { const k = i / 14, a = k * 6 + t * 1.5; const x1 = x + Math.sin(a) * 60 * s, x2 = x - Math.sin(a) * 60 * s, yy = y + k * h; line(ctx, x1, yy, x2, yy, 6, 'rgba(255,255,255,.6)'); circle(ctx, x1, yy, 14 * s); fillStroke(ctx, '#ff8fc7', 5); circle(ctx, x2, yy, 14 * s); fillStroke(ctx, '#6fd0ff', 5); } }
function drawCar(ctx, x, y, s, spin = 0, col = '#e0392f') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ellipse(ctx, 0, 0, 230, 18); ctx.fillStyle = 'rgba(40,20,30,.22)'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-110, -128); ctx.lineTo(-64, -206); ctx.lineTo(78, -206); ctx.lineTo(132, -128); ctx.closePath(); fillStroke(ctx, col, 7); rrect(ctx, -200, -132, 400, 92, 30); fillStroke(ctx, col, 7);
  ctx.beginPath(); ctx.moveTo(-84, -134); ctx.lineTo(-54, -190); ctx.lineTo(4, -190); ctx.lineTo(4, -134); ctx.closePath(); fillStroke(ctx, '#c8ecff', 5); ctx.beginPath(); ctx.moveTo(20, -134); ctx.lineTo(20, -190); ctx.lineTo(70, -190); ctx.lineTo(106, -134); ctx.closePath(); fillStroke(ctx, '#c8ecff', 5);
  rrect(ctx, 182, -112, 20, 30, 8); fillStroke(ctx, '#ffe14d', 5);
  for (const wx of [-118, 118]) { circle(ctx, wx, -38, 44); fillStroke(ctx, '#2a2630', 7); circle(ctx, wx, -38, 20); fillStroke(ctx, '#c9d1e0', 5); for (let i = 0; i < 3; i++) { const a = spin + i * TAU / 3; line(ctx, wx, -38, wx + Math.cos(a) * 36, -38 + Math.sin(a) * 36, 6, '#c9d1e0'); } }
  ctx.restore();
}
function drawShop(ctx, x, w, h, col, sign, open = 1) {
  const y = GY - 30 - h; rrect(ctx, x, y, w, h + 6, 10); fillStroke(ctx, col, 7);
  rrect(ctx, x + 20, y + 110, w - 40, h - 130, 8); fillStroke(ctx, open ? '#ffe9a8' : '#3a3f55', 6); rrect(ctx, x + w / 2 - 44, y + h - 150, 88, 150, 8); fillStroke(ctx, open ? '#fff6d8' : '#2a2e42', 6);
  rrect(ctx, x + 14, y + 20, w - 28, 70, 14); fillStroke(ctx, '#221c22', 6); text(ctx, sign, x + w / 2, y + 57, 38, open ? '#7dffb0' : '#6b7186');
}
function drawPowerPlant(ctx, x, y, s, t, power = 1) {
  for (const dx of [-150, 150]) { ctx.beginPath(); ctx.moveTo(x + (dx - 110) * s, y); ctx.quadraticCurveTo(x + (dx - 50) * s, y - 190 * s, x + (dx - 80) * s, y - 380 * s); ctx.lineTo(x + (dx + 80) * s, y - 380 * s); ctx.quadraticCurveTo(x + (dx + 50) * s, y - 190 * s, x + (dx + 110) * s, y); ctx.closePath(); fillStroke(ctx, '#c9cdd8', 7);
    for (let i = 0; i < 4; i++) { const k = ((t * .35 * power + i / 4) % 1); puff(ctx, x + dx * s + Math.sin(i * 3 + k * 4) * 40 * s, y - (400 + k * 380) * s, (50 + k * 90) * s * (.5 + .5 * power), t, '#eef1f6', 7 + i, (1 - k) * .9); } }
  rrect(ctx, x - 90 * s, y - 150 * s, 180 * s, 150 * s, 8 * s); fillStroke(ctx, '#8d94a8', 7);
}

// ----- animals (simple cartoon shapes) -----
function drawElephant(ctx, x, y, s, asleep = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ellipse(ctx, 0, 0, 260, 20); ctx.fillStyle = 'rgba(40,20,30,.22)'; ctx.fill();
  for (const lx of [-150, -70, 60, 140]) { rrect(ctx, lx - 34, -130, 68, 130, 20); fillStroke(ctx, '#8f97a8', 6); }
  ellipse(ctx, 0, -230, 220, 150); fillStroke(ctx, '#9aa2b3', 7);
  ctx.beginPath(); ctx.moveTo(250, -250); ctx.bezierCurveTo(330, -200, 330, -60, 290, -20); ctx.lineWidth = 46; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = 34; ctx.strokeStyle = '#9aa2b3'; ctx.stroke();
  circle(ctx, 200, -290, 120); fillStroke(ctx, '#9aa2b3', 7); ellipse(ctx, 130, -290, 80, 110, -.15); fillStroke(ctx, '#848ca0', 7);
  if (asleep) { ctx.beginPath(); ctx.arc(250, -300, 16, .2, Math.PI - .2); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke(); } else { circle(ctx, 250, -305, 13); ctx.fillStyle = INK; ctx.fill(); }
  ctx.restore();
}
function drawBat(ctx, x, y, s, t = 0) { // hangs from (x,y)
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 1.2) * .06);
  line(ctx, -12, 0, -12, 40, 7); line(ctx, 12, 0, 12, 40, 7);
  ctx.beginPath(); ctx.moveTo(-70, 50); ctx.quadraticCurveTo(-90, 170, -10, 250); ctx.lineTo(10, 250); ctx.quadraticCurveTo(90, 170, 70, 50); ctx.closePath(); fillStroke(ctx, '#5b4a7a', 7);
  ellipse(ctx, 0, 140, 44, 80); fillStroke(ctx, '#6f5b94', 6); circle(ctx, 0, 250, 50); fillStroke(ctx, '#6f5b94', 6);
  path(ctx, [[-44, 280], [-30, 330], [-12, 292]]); fillStroke(ctx, '#6f5b94', 6); path(ctx, [[44, 280], [30, 330], [12, 292]]); fillStroke(ctx, '#6f5b94', 6);
  for (const ex of [-18, 18]) { ctx.beginPath(); ctx.arc(ex, 246, 10, Math.PI + .2, -.2); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); }
  ctx.restore();
}
function drawJelly(ctx, x, y, s, t = 0) {
  const p = Math.sin(t * 2.2) * .08;
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(x + i * 26 * s, y); for (let k = 1; k <= 10; k++) ctx.lineTo(x + i * 26 * s + Math.sin(k * .8 + t * 2.5 + i) * 12 * s, y + k * 20 * s); ctx.lineWidth = 9 * s; ctx.strokeStyle = '#ffb3e0'; ctx.lineCap = 'round'; ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(x, y, 100 * s * (1 + p), 86 * s * (1 - p), 0, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#ff8fd0', 7);
  for (const ex of [-30, 30]) { ctx.beginPath(); ctx.arc(x + ex * s, y - 30 * s, 10 * s, .2, Math.PI - .2); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); }
}
function drawDolphin(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-230, 10); ctx.quadraticCurveTo(-60, -120, 170, -40); ctx.quadraticCurveTo(250, -20, 290, 0); ctx.quadraticCurveTo(240, 30, 170, 40); ctx.quadraticCurveTo(-40, 100, -230, 10); ctx.closePath(); fillStroke(ctx, '#6f9fd6', 7);
  path(ctx, [[-20, -78], [-70, -170], [40, -92]]); fillStroke(ctx, '#5c8ac0', 7); path(ctx, [[-220, 10], [-320, -60], [-290, 10], [-320, 70]]); fillStroke(ctx, '#5c8ac0', 7);
  path(ctx, [[30, 50], [0, 120], [80, 60]]); fillStroke(ctx, '#5c8ac0', 6); circle(ctx, 180, -22, 10); ctx.fillStyle = INK; ctx.fill();
  ctx.restore();
}
function drawSeabird(ctx, x, y, s, flap = 0, eye = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(sd * 130, -90 - flap * 60, sd * 300, -10 + flap * 40); ctx.quadraticCurveTo(sd * 140, -30 - flap * 40, 0, 30); ctx.closePath(); fillStroke(ctx, '#2c2f3a', 7); }
  ellipse(ctx, 0, 14, 60, 34); fillStroke(ctx, '#2c2f3a', 7); circle(ctx, 52, -6, 30); fillStroke(ctx, '#2c2f3a', 7); path(ctx, [[76, -8], [130, 4], [76, 12]]); fillStroke(ctx, '#d8dbe4', 5);
  if (eye > .3) { circle(ctx, 60, -12, 8); ctx.fillStyle = '#fff'; ctx.fill(); } else line(ctx, 52, -12, 68, -12, 5, '#fff');
  ctx.restore();
}
function drawOwl(ctx, x, y, s, squint = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ellipse(ctx, 0, -110, 100, 130); fillStroke(ctx, '#9a6b3f', 7); ellipse(ctx, 0, -80, 60, 80); fillStroke(ctx, '#d9b98a', 5);
  path(ctx, [[-80, -210], [-60, -270], [-30, -220]]); fillStroke(ctx, '#9a6b3f', 6); path(ctx, [[80, -210], [60, -270], [30, -220]]); fillStroke(ctx, '#9a6b3f', 6);
  for (const ex of [-40, 40]) { circle(ctx, ex, -170, 38); fillStroke(ctx, '#fff6cf', 6); if (squint > .5) line(ctx, ex - 26, -170, ex + 26, -170, 8); else { circle(ctx, ex, -170, 16); ctx.fillStyle = INK; ctx.fill(); } }
  path(ctx, [[-12, -150], [12, -150], [0, -126]]); fillStroke(ctx, '#f2b52a', 5);
  ctx.restore();
}
function drawCatLoaf(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ellipse(ctx, 0, 0, 150, 14); ctx.fillStyle = 'rgba(40,20,30,.22)'; ctx.fill();
  ellipse(ctx, 10, -62, 130, 64); fillStroke(ctx, '#f0a24a', 7); circle(ctx, -92, -70, 56); fillStroke(ctx, '#f0a24a', 7);
  path(ctx, [[-138, -96], [-128, -150], [-100, -112]]); fillStroke(ctx, '#f0a24a', 6); path(ctx, [[-62, -114], [-52, -152], [-40, -100]]); fillStroke(ctx, '#f0a24a', 6);
  for (const ex of [-112, -78]) { ctx.beginPath(); ctx.arc(ex, -70, 10, .2, Math.PI - .2); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); }
  ctx.restore();
}
function drawFish(ctx, x, y, s, col = '#ffb347') { ellipse(ctx, x, y, 70 * s, 38 * s); fillStroke(ctx, col, 6); path(ctx, [[x - 60 * s, y], [x - 120 * s, y - 40 * s], [x - 120 * s, y + 40 * s]]); fillStroke(ctx, col, 6); ctx.beginPath(); ctx.arc(x + 34 * s, y - 6 * s, 8 * s, .2, Math.PI - .2); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
// simple pictograms for the three "jobs"
function iconBroom(ctx, x, y, s) { line(ctx, x - s * .5, y - s * .8, x + s * .2, y + s * .2, s * .12, '#a06a3c'); path(ctx, [[x, y + s * .1], [x + s * .5, y - s * .1], [x + s * .8, y + s * .7], [x + s * .1, y + s * .9]]); fillStroke(ctx, '#ffd23a', s * .08); }
function iconWrench(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.7); rrect(ctx, -s * .14, -s * .4, s * .28, s * 1.2, s * .1); fillStroke(ctx, '#c9d1e0', s * .08); ctx.beginPath(); ctx.arc(0, -s * .6, s * .34, -1.0, Math.PI + 1.0); ctx.lineWidth = s * .26; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = s * .14; ctx.strokeStyle = '#c9d1e0'; ctx.stroke(); ctx.restore(); }
function iconBadge(ctx, x, y, r, col, draw) { circle(ctx, x, y, r); fillStroke(ctx, col, 8); draw(); }
