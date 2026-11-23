// ---------- props for "Why coffins used to have bells" ----------
const SOIL = 1080; // ground surface in cross-section shots
function graveSky(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#15112e', o.bot || '#4a3a78', -400, 1200);
  applyCam(ctx, cam, .1); drawStars(ctx, t, 60, 9, .8); drawMoon(ctx, o.moonX || 820, 300, 90);
  applyCam(ctx, cam, .2); for (let i = 0; i < 3; i++) drawCloud(ctx, ((140 + i * 420 + t * 12) % 1500) - 200, 420 + i * 60, 70, i + 2, .25);
}
// graveyard surface: hills, fence, a few tilted headstones, ground band
function graveyard(ctx, t, cam, o = {}) {
  graveSky(ctx, t, cam, o);
  applyCam(ctx, cam, .35); ellipse(ctx, 200, 1180, 700, 260); fillStroke(ctx, '#2a2550', 6); ellipse(ctx, 980, 1200, 640, 240); fillStroke(ctx, '#251f48', 6);
  applyCam(ctx, cam, .6);
  for (let i = 0; i < 14; i++) { const x = -60 + i * 90; line(ctx, x, 1060, x, 940, 8, '#1a1530'); circle(ctx, x, 934, 9); ctx.fillStyle = '#1a1530'; ctx.fill(); }
  line(ctx, -80, 970, 1200, 970, 8, '#1a1530'); line(ctx, -80, 1030, 1200, 1030, 8, '#1a1530');
  for (const [x, r, s] of [[110, -.12, .7], [930, .1, .8], [700, -.05, .55]]) headstone(ctx, x, 1100, 150 * s, '', r, '#6a6788');
  applyCam(ctx, cam, 1);
  ctx.fillStyle = o.ground || '#2d4a3a'; ctx.fillRect(-1000, o.gy || 1240, 3000, 2000); line(ctx, -1000, o.gy || 1240, 3000, o.gy || 1240, 7);
}
function headstone(ctx, x, y, s, txt = 'R.I.P.', rot = 0, col = '#9a98b0') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(-s * .5, 0); ctx.lineTo(-s * .5, -s * .9); ctx.arc(0, -s * .9, s * .5, Math.PI, 0); ctx.lineTo(s * .5, 0); ctx.closePath(); fillStroke(ctx, col, Math.max(4, s * .04));
  if (txt) text(ctx, txt, 0, -s * .85, s * .24, '#3a3850', INK, 0);
  ctx.restore();
}
function bell(ctx, x, y, r, rot = 0, col = '#e8b830') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  line(ctx, 0, 0, 0, r * .25, Math.max(4, r * .08));
  ctx.beginPath(); ctx.moveTo(-r * .35, r * .3); ctx.quadraticCurveTo(-r * .45, r * 1.1, -r * .8, r * 1.3); ctx.lineTo(r * .8, r * 1.3); ctx.quadraticCurveTo(r * .45, r * 1.1, r * .35, r * .3); ctx.quadraticCurveTo(0, r * .1, -r * .35, r * .3); ctx.closePath();
  fillStroke(ctx, col, Math.max(4, r * .07)); ctx.save(); ctx.globalAlpha = .35; ellipse(ctx, -r * .25, r * .7, r * .1, r * .3, .2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
  circle(ctx, Math.sin(rot * 3) * r * .2, r * 1.38, r * .14); fillStroke(ctx, '#7a5a20', Math.max(3, r * .05));
  ctx.restore();
}
// wooden post with an arm and a hanging bell. returns the string anchor point
function bellPost(ctx, x, y, h, swing = 0) {
  rrect(ctx, x - 14, y - h, 28, h, 6); fillStroke(ctx, '#7a5236', 6);
  rrect(ctx, x - 14, y - h, 150, 24, 6); fillStroke(ctx, '#7a5236', 6);
  bell(ctx, x + 115, y - h + 22, 52, swing);
  const ax = x + 115 + Math.sin(-swing) * 90, ay = y - h + 22 + Math.cos(swing) * 92;
  return [ax, ay];
}
function soilSection(ctx, y0 = SOIL) {
  ctx.fillStyle = '#5a3a26'; ctx.fillRect(-1000, y0, 3000, 2400);
  ctx.fillStyle = '#4a3020'; for (let i = 0; i < 40; i++) { const r = rng(i * 7.3); ellipse(ctx, r() * 1200 - 60, y0 + 60 + r() * 900, 18 + r() * 30, 9 + r() * 12); ctx.fill(); }
  ctx.fillStyle = '#3a8a4a'; ctx.fillRect(-1000, y0 - 18, 3000, 26); line(ctx, -1000, y0 - 18, 3000, y0 - 18, 7);
}
// the classic six-sided coffin, lying on its side in cross-section, head to the left
function coffin(ctx, x, y, w, h, o = {}) {
  ctx.save(); ctx.translate(x, y);
  const pts = [[-w / 2, 0], [-w * .3, -h / 2], [w / 2, -h * .36], [w / 2, h * .36], [-w * .3, h / 2]];
  path(ctx, pts); fillStroke(ctx, o.col || '#6a3a22', 8);
  if (o.inside) { ctx.save(); path(ctx, pts.map(([a, b]) => [a * .9, b * .78])); ctx.fillStyle = '#2a1a14'; ctx.fill(); ctx.clip(); o.inside(ctx); ctx.restore(); }
  else { path(ctx, pts.map(([a, b]) => [a * .86, b * .7])); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.stroke(); }
  ctx.restore();
}
// a stick person lying down, head to the left, feet at (x,y)
function lying(ctx, x, y, s, face, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2);
  drawStick(ctx, Object.assign({ cols: ['#e8e2d6', '#e8e2d6'], hat: 'none', belt: false, x: 0, y: 0, s, shadow: false, arms: { L: [.2, 0], R: [.2, 0] }, legs: { L: [0, 0], R: [0, 0] }, face }, o));
  ctx.restore();
}
function newspaper(ctx, x, y, s, head, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  rrect(ctx, -s / 2, -s * .65, s, s * 1.3, 8); fillStroke(ctx, '#f2ecdc', 6);
  text(ctx, 'THE DAILY', 0, -s * .52, s * .1, '#3a3530', INK, 0); line(ctx, -s * .42, -s * .44, s * .42, -s * .44, 3);
  text(ctx, head[0], 0, -s * .3, s * .15, '#c8322c', INK, 0); if (head[1]) text(ctx, head[1], 0, -s * .14, s * .15, '#c8322c', INK, 0);
  rrect(ctx, -s * .42, -s * .02, s * .38, s * .36, 4); ctx.fillStyle = '#b8b0a0'; ctx.fill();
  for (let i = 0; i < 7; i++) { line(ctx, s * .02, -s * .0 + i * s * .055, s * .42, -s * .0 + i * s * .055, 3, '#8a8478'); line(ctx, -s * .42, s * .4 + i * s * .03, s * .42, s * .4 + i * s * .03, 3, '#8a8478'); }
  ctx.restore();
}
function patentDoc(ctx, x, y, s, rot = 0, n = '') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  rrect(ctx, -s / 2, -s * .65, s, s * 1.3, 6); fillStroke(ctx, '#f5efd8', 5);
  text(ctx, 'PATENT', 0, -s * .5, s * .14, '#2a3a6a', INK, 0); if (n) text(ctx, n, 0, -s * .34, s * .09, '#5a5a6a', INK, 0);
  ctx.save(); ctx.translate(0, s * .08); coffin(ctx, 0, 0, s * .6, s * .24, { col: '#8a5a3a' }); ctx.restore();
  line(ctx, 0, -s * .04, 0, -s * .26, 3); bell(ctx, 0, -s * .3, s * .06);
  circle(ctx, s * .3, s * .48, s * .1); fillStroke(ctx, '#c8322c', 4);
  ctx.restore();
}
function ladderIn(ctx, x0, y0, x1, y1, w = 40) {
  const a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a) * w / 2, ny = Math.cos(a) * w / 2, L = Math.hypot(x1 - x0, y1 - y0);
  line(ctx, x0 + nx, y0 + ny, x1 + nx, y1 + ny, 8, '#c89a5a'); line(ctx, x0 - nx, y0 - ny, x1 - nx, y1 - ny, 8, '#c89a5a');
  for (let d = 30; d < L; d += 50) { const px = x0 + (x1 - x0) * d / L, py = y0 + (y1 - y0) * d / L; line(ctx, px + nx, py + ny, px - nx, py - ny, 6, '#c89a5a'); }
}
// German waiting mortuary: long hall, beds with sheeted bodies, strings to a bell board
function mortuary(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#d8d0bc'; ctx.fillRect(-800, -800, 2700, 1980); ctx.fillStyle = '#8a7a66'; ctx.fillRect(-800, 1180, 2700, 1200); line(ctx, -800, 1180, 1900, 1180, 7);
  for (let i = 0; i < 4; i++) { const x = 30 + i * 300; ctx.beginPath(); ctx.moveTo(x, 760); ctx.lineTo(x, 520); ctx.arc(x + 70, 520, 70, Math.PI, 0); ctx.lineTo(x + 140, 760); ctx.closePath(); fillStroke(ctx, '#3a4a7a', 6); line(ctx, x + 70, 450, x + 70, 760, 4, '#2a2a3a'); line(ctx, x, 620, x + 140, 620, 4, '#2a2a3a'); }
}
function sheetBody(ctx, x, y, w) {
  rrect(ctx, x - w / 2, y, w, 26, 6); fillStroke(ctx, '#7a6a5a', 5); line(ctx, x - w / 2 + 14, y + 26, x - w / 2 + 14, y + 90, 8); line(ctx, x + w / 2 - 14, y + 26, x + w / 2 - 14, y + 90, 8);
  ctx.beginPath(); ctx.moveTo(x - w / 2 + 4, y); ctx.quadraticCurveTo(x - w * .38, y - 70, x - w * .2, y - 40); ctx.quadraticCurveTo(x, y - 50, x + w * .2, y - 42); ctx.quadraticCurveTo(x + w * .4, y - 56, x + w / 2 - 4, y); ctx.closePath(); fillStroke(ctx, '#f4f2ec', 6);
}
function bellBoard(ctx, x, y, n, ringing = -1, t = 0) {
  rrect(ctx, x - n * 45, y - 70, n * 90, 140, 14); fillStroke(ctx, '#6a4a30', 7);
  for (let i = 0; i < n; i++) bell(ctx, x - n * 45 + 45 + i * 90, y - 50, 30, i === ringing ? Math.sin(t * 30) * .5 : 0);
}
function boxingRing(ctx, t, cam) {
  applyCam(ctx, cam, .2); bgFlat(ctx, '#1a1a2a', '#2a1a2a'); applyCam(ctx, cam, .2);
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.beginPath(); ctx.moveTo(100 + i * 180, -100); ctx.lineTo(-100 + i * 220, 1400); ctx.lineTo(60 + i * 220, 1400); ctx.closePath(); ctx.fillStyle = '#fff6c8'; ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 24; i++) { circle(ctx, (i * 53) % 1100, 960 + (i % 3) * 40, 26); ctx.fillStyle = '#120e1c'; ctx.fill(); }
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#3a6ac8'; ctx.fillRect(-200, 1240, 1500, 800); line(ctx, -200, 1240, 1300, 1240, 7);
  for (const x of [40, 1040]) { rrect(ctx, x - 18, 760, 36, 480, 8); fillStroke(ctx, '#c8322c', 6); }
  for (const [y, c] of [[860, '#ffffff'], [960, '#e0392f'], [1060, '#ffffff']]) line(ctx, 40, y, 1040, y, 12, c);
}
function boxGlove(ctx, x, y, s, col = '#d8302a') { ellipse(ctx, x, y, s * .5, s * .42); fillStroke(ctx, col, Math.max(4, s * .06)); ellipse(ctx, x - s * .35, y + s * .05, s * .18, s * .22); fillStroke(ctx, col, Math.max(4, s * .06)); }
