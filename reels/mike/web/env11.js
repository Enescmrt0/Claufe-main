// ---------- props for "The sweetest disaster in history" (Boston, 1919) ----------
const MOL = '#5a2e12', MOL2 = '#7a3e18', MOLHI = '#b8743a';
function winterSky(ctx, t, cam, o = {}) { applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#8fb0d0', o.bot || '#e6eef4', -400, 1300); applyCam(ctx, cam, .14); drawCloud(ctx, 200 + t * 6, 260, 110, 1, .9); drawCloud(ctx, 860 + t * 4, 180, 90, 2, .9); }
function harborGround(ctx, y = 1240) { ctx.fillStyle = '#8a8478'; ctx.fillRect(-2000, y, 5080, 2000); ctx.fillStyle = '#a8a294'; ctx.fillRect(-2000, y, 5080, 22); const R = rng(4); for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ellipse(ctx, R() * 1300 - 100, y + 30 + R() * 600, 40, 10); ctx.fill(); } }
// the big tank. x = centre, y = ground, w/h px. o: { drips, split 0..1, paint 0..1 (brown), rivets 0..1 popping }
function molTank(ctx, x, y, w, h, t, o = {}) {
  const paint = o.paint == null ? 1 : o.paint, split = o.split || 0;
  const col = mix('#9aa3ac', '#6a3a1e', paint);
  const half = (side) => {
    ctx.save(); ctx.translate(x + side * split * w * .35, y); ctx.rotate(side * split * .35);
    ctx.beginPath(); if (side < 0) ctx.rect(-w / 2, -h, w / 2, h); else ctx.rect(0, -h, w / 2, h); fillStroke(ctx, col, 8);
    for (let r = 1; r < 6; r++) line(ctx, side < 0 ? -w / 2 : 0, -h * r / 6, side < 0 ? 0 : w / 2, -h * r / 6, 5, 'rgba(0,0,0,.25)');
    for (let r = 1; r < 6; r++) for (let c = 0; c < 6; c++) { const rx = (side < 0 ? -w / 2 : 0) + 12 + c * (w / 2 - 24) / 5; circle(ctx, rx, -h * r / 6, 5); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fill(); }
    ctx.restore();
  };
  if (split > 0) { ctx.save(); ctx.fillStyle = MOL; ellipse(ctx, x, y, w * (.5 + split * 1.4), h * .1 * (1 + split)); ctx.fill(); ctx.restore(); }
  half(-1); half(1);
  ctx.beginPath(); ctx.ellipse(x, y - h, w / 2 * (1 - split * .3), w * .07, 0, Math.PI, 0); fillStroke(ctx, mix('#b8c0c8', '#7a4a2a', paint), 8);
  if (o.drips) for (let i = 0; i < 7; i++) { const dx = x - w * .4 + i * w * .13, k = (t * .7 + i * .37) % 1; line(ctx, dx, y - h * (.3 + (i % 3) * .2), dx, y - h * (.3 + (i % 3) * .2) + 40 + k * 40, 10, MOL); circle(ctx, dx, y - h * (.3 + (i % 3) * .2) + 50 + k * 120 + k * k * 200, 9); ctx.fillStyle = MOL; ctx.fill(); }
  if (o.rivets) { const R = rng(Math.floor(t * 8)); for (let i = 0; i < 6; i++) { const a = R() * TAU, d = 40 + R() * 300 * o.rivets; circle(ctx, x + Math.cos(a) * (w / 2 + d * .4), y - h * R() + Math.sin(a) * d * .3, 8); ctx.fillStyle = '#3a3a40'; ctx.fill(); if (R() > .5) burst(ctx, x + (R() - .5) * w, y - h * R(), 26, 7, '#ffe14d', i); } }
  if (o.label) { ctx.save(); ctx.translate(x, y - h * .55); text(ctx, o.label, 0, 0, w * .09, '#f4efe4', INK, 0); ctx.restore(); }
}
// the brown wave: front at x (moving right), height h, ground y
function molWave(ctx, x, y, h, t) {
  ctx.beginPath(); ctx.moveTo(-600, y + 40); ctx.lineTo(-600, y - h * .55);
  for (let i = 0; i <= 30; i++) { const q = i / 30, px = lerp(-600, x, q); ctx.lineTo(px, y - h * (.55 + .45 * Math.pow(q, 3)) + Math.sin(q * 14 + t * 6) * 10); }
  ctx.quadraticCurveTo(x + h * .5, y - h * 1.05, x + h * .35, y - h * .55); ctx.quadraticCurveTo(x + h * .55, y - h * .1, x + h * .2, y + 40); ctx.closePath();
  const g = ctx.createLinearGradient(0, y - h, 0, y); g.addColorStop(0, MOLHI); g.addColorStop(.25, MOL2); g.addColorStop(1, MOL); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
  for (let i = 0; i < 6; i++) { const q = (t * .6 + i / 6) % 1; ctx.globalAlpha = .5; line(ctx, x - 500 + q * 400, y - h * (.4 + i * .08), x - 420 + q * 400, y - h * (.4 + i * .08), 8, MOLHI); } ctx.globalAlpha = 1;
}
function elRailway(ctx, x0, x1, y, bend = 0, t = 0, train = true) {
  for (let px = x0; px <= x1; px += 160) { const b = Math.max(0, 1 - Math.abs(px - (x0 + x1) / 2) / 300) * bend; line(ctx, px, 1240, px + b * 60, y + b * 80, 16, '#3a3d44'); line(ctx, px - 60, y + 60 + b * 80, px + 60 + b * 60, y + b * 80, 8, '#3a3d44'); }
  ctx.beginPath(); ctx.moveTo(x0 - 80, y); for (let px = x0; px <= x1 + 80; px += 20) { const b = Math.max(0, 1 - Math.abs(px - (x0 + x1) / 2) / 300) * bend; ctx.lineTo(px, y + b * 120); } ctx.lineWidth = 26; ctx.strokeStyle = '#3a3d44'; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
  if (train) { const tx = x0 + ((t * 120) % (x1 - x0 + 600)) - 300; rrect(ctx, tx, y - 120, 260, 110, 14); fillStroke(ctx, '#2a5a3a', 7); for (let i = 0; i < 4; i++) { rrect(ctx, tx + 20 + i * 60, y - 100, 40, 40, 6); fillStroke(ctx, '#ffd96a', 4); } }
}
function brickBlock(ctx, x, y, w, h, col = '#9a5a3a', rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.rect(-w / 2, -h, w, h); fillStroke(ctx, col, 7);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { rrect(ctx, -w / 2 + 20 + c * (w - 40) / 3, -h + 30 + r * (h - 60) / 3, (w - 40) / 3 - 20, (h - 60) / 3 - 26, 4); fillStroke(ctx, '#2a3a5a', 4); }
  ctx.restore();
}
function pail(ctx, x, y, s, full = 1) { ctx.beginPath(); ctx.moveTo(x - s * .4, y - s); ctx.lineTo(x + s * .4, y - s); ctx.lineTo(x + s * .3, y); ctx.lineTo(x - s * .3, y); ctx.closePath(); fillStroke(ctx, '#9aa1a9', 5); if (full) { ellipse(ctx, x, y - s * .95, s * .38, s * .08); ctx.fillStyle = MOL; ctx.fill(); } ctx.beginPath(); ctx.arc(x, y - s, s * .42, Math.PI, 0); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); }
function paintRoller(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); line(ctx, 0, 0, 0, s * 1.2, s * .1, '#6b3f22'); rrect(ctx, -s * .5, -s * .2, s, s * .4, s * .1); fillStroke(ctx, '#6a3a1e', 5); ctx.restore(); }
function bigThermo(ctx, x, y, h, frac, col) { rrect(ctx, x - 30, y - h, 60, h, 30); fillStroke(ctx, '#f4efe4', 8); circle(ctx, x, y + 34, 60); fillStroke(ctx, col, 8); ctx.fillStyle = col; ctx.fillRect(x - 14, y - h * frac, 28, h * frac + 10); }
function nurseCap(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s; ctx.beginPath(); ctx.rect(-.15 * s, hy - .25 * s, .3 * s, .1 * s); fillStroke(ctx, '#ffffff', Math.max(3, s * .01)); ctx.fillStyle = '#e0392f'; ctx.fillRect(-.03 * s, hy - .24 * s, .06 * s, .08 * s); ctx.fillRect(-.05 * s, hy - .22 * s, .1 * s, .04 * s); ctx.restore(); }
function sailorCap2(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s; ctx.beginPath(); ctx.arc(0, hy - .12 * s, .16 * s, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#ffffff', Math.max(3, s * .01)); ctx.beginPath(); ctx.rect(-.17 * s, hy - .14 * s, .34 * s, .04 * s); fillStroke(ctx, '#ffffff', Math.max(3, s * .01)); ctx.restore(); }
function clipboardRules(ctx, x, y, s, k = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.05); rrect(ctx, -s * .4, -s * .55, s * .8, s * 1.1, 14); fillStroke(ctx, '#b8873a', 7); rrect(ctx, -s * .34, -s * .46, s * .68, s * .94, 6); fillStroke(ctx, '#fbf8f0', 5); text(ctx, 'BUILDING', 0, -s * .36, s * .1, INK, INK, 0); text(ctx, 'RULES', 0, -s * .24, s * .1, INK, INK, 0); for (let i = 0; i < 4; i++) { ctx.globalAlpha = clamp(k * 4 - i); ctx.beginPath(); ctx.rect(-s * .26, -s * .08 + i * s * .14, s * .07, s * .07); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); line(ctx, -s * .25, -s * .05 + i * s * .14, -s * .22, -s * .02 + i * s * .14, 6, '#3fa35b'); line(ctx, -s * .22, -s * .02 + i * s * .14, -s * .17, -s * .1 + i * s * .14, 6, '#3fa35b'); ctx.fillStyle = '#b8b0a0'; ctx.fillRect(-s * .12, -s * .06 + i * s * .14, s * .36, s * .03); } ctx.globalAlpha = 1; ctx.restore(); }
function sweetSmell(ctx, x, y, t, a = 1) { for (let i = 0; i < 4; i++) { const k = (t * .4 + i / 4) % 1; ctx.save(); ctx.globalAlpha = a * (1 - k) * .8; ctx.beginPath(); for (let j = 0; j <= 20; j++) { const yy = y - k * 260 - j * 10; const xx = x + (i - 1.5) * 60 + Math.sin(j * .6 + t * 3 + i) * 18; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.lineWidth = 8; ctx.strokeStyle = MOLHI; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore(); } }
