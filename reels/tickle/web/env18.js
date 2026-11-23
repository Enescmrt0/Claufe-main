// ---------- props for "Why you can't tickle yourself" ----------
// cartoon hand: palm centre (x,y), size s, rot, wiggle 0..1 (fingers waggling), skin colour
function hand(ctx, x, y, s, rot = 0, t = 0, wig = 0, col = '#f2c9a0') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  for (let i = 0; i < 4; i++) {
    const a = -.45 + i * .3 + Math.sin(t * 22 + i * 1.7) * .22 * wig, L = s * (i === 0 || i === 3 ? .5 : .6);
    ctx.save(); ctx.rotate(a); rrect(ctx, -s * .07, -s * .2 - L, s * .14, L + s * .1, s * .07); fillStroke(ctx, col, Math.max(4, s * .03)); ctx.restore();
  }
  ctx.save(); ctx.rotate(-1.2 + Math.sin(t * 18) * .15 * wig); rrect(ctx, -s * .07, -s * .45, s * .14, s * .38, s * .07); fillStroke(ctx, col, Math.max(4, s * .03)); ctx.restore();
  ellipse(ctx, 0, 0, s * .3, s * .26); fillStroke(ctx, col, Math.max(4, s * .03));
  rrect(ctx, -s * .16, s * .15, s * .32, s * .5, s * .08); fillStroke(ctx, col, Math.max(4, s * .03));
  ctx.restore();
}
function laughLines(ctx, x, y, r, t, col = '#ffd23a') {
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU + .3, k = .5 + .5 * Math.sin(t * 14 + i); ctx.save(); ctx.globalAlpha = k; line(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r, x + Math.cos(a) * (r + 50), y + Math.sin(a) * (r + 50), 9, col); ctx.restore(); }
}
function haText(ctx, x, y, t, n = 3) { for (let i = 0; i < n; i++) { const r = rng(i * 11 + 3); text(ctx, 'HA', x + (r() - .5) * 420, y + (r() - .5) * 240 + Math.sin(t * 9 + i) * 14, 60 + r() * 40, '#ffd23a', INK, 10); text(ctx, 'HA', x + (r() - .5) * 420, y + (r() - .5) * 240 + Math.sin(t * 9 + i) * 14, 60 + r() * 40, '#ffd23a', INK, 0); } }
// robot arm on a base at (x,y), reaching to (tx,ty) with a feather tip
function robotArm(ctx, x, y, tx, ty, s, t, wig = 0) {
  rrect(ctx, x - s * .3, y - s * .14, s * .6, s * .14, s * .04); fillStroke(ctx, '#7a8aa8', 6);
  const ex = (x + tx) / 2 + s * .1, ey = Math.min(y, ty) - s * .45;
  line(ctx, x, y - s * .12, ex, ey, s * .12, INK); line(ctx, x, y - s * .12, ex, ey, s * .08, '#b8c4d8');
  line(ctx, ex, ey, tx, ty, s * .1, INK); line(ctx, ex, ey, tx, ty, s * .06, '#b8c4d8');
  for (const [px, py] of [[x, y - s * .12], [ex, ey]]) { circle(ctx, px, py, s * .07); fillStroke(ctx, '#e0392f', 5); }
  feather(ctx, tx, ty, s * .5, -.6 + Math.sin(t * 25) * .3 * wig);
}
function feather(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(s * .3, -s * .5, 0, -s); ctx.quadraticCurveTo(-s * .3, -s * .5, 0, 0); fillStroke(ctx, '#ffffff', 5);
  line(ctx, 0, s * .1, 0, -s * .95, 4); for (let i = 1; i < 6; i++) { line(ctx, 0, -i * s * .16, s * .14, -i * s * .16 - s * .08, 3); line(ctx, 0, -i * s * .16, -s * .14, -i * s * .16 - s * .08, 3); }
  ctx.restore();
}
function lever(ctx, x, y, s, ang) {
  rrect(ctx, x - s * .4, y - s * .2, s * .8, s * .2, s * .05); fillStroke(ctx, '#5a6a8a', 6);
  ctx.save(); ctx.translate(x, y - s * .2); ctx.rotate(ang); line(ctx, 0, 0, 0, -s * .7, s * .08); circle(ctx, 0, -s * .75, s * .1); fillStroke(ctx, '#e0392f', 5); ctx.restore();
}
function knob(ctx, x, y, r, frac, lab = 'VOLUME') {
  for (let i = 0; i <= 10; i++) { const a = -Math.PI * 1.25 + i / 10 * Math.PI * 1.5; line(ctx, x + Math.cos(a) * r * 1.15, y + Math.sin(a) * r * 1.15, x + Math.cos(a) * r * 1.35, y + Math.sin(a) * r * 1.35, 7, i / 10 <= frac ? '#7ee08a' : 'rgba(255,255,255,.3)'); }
  circle(ctx, x, y, r); fillStroke(ctx, '#3a3d4a', 8); const a = -Math.PI * 1.25 + frac * Math.PI * 1.5; line(ctx, x, y, x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8, 12, '#ffd23a');
  text(ctx, lab, x, y + r * 1.75, r * .32, '#ffffff', INK, 0);
}
function copyDoc(ctx, x, y, s, title, col = '#ffffff', rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s / 2, -s * .65, s, s * 1.3, 10); fillStroke(ctx, col, 6);
  text(ctx, title, 0, -s * .45, s * .16, '#2a2a3a', INK, 0); for (let i = 0; i < 5; i++) line(ctx, -s * .35, -s * .2 + i * s * .15, s * (.35 - (i % 2) * .15), -s * .2 + i * s * .15, 5, '#9aa0b0');
  ctx.restore();
}
function spinner(ctx, x, y, r, t) { for (let i = 0; i < 10; i++) { const a = i / 10 * TAU + t * 3; ctx.save(); ctx.globalAlpha = .15 + .85 * (i / 10); circle(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r, r * .14); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } }
function wifi(ctx, x, y, s, bars = 1) { for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(x, y, s * (.15 + i * .28), -Math.PI * .75, -Math.PI * .25); ctx.lineWidth = s * .12; ctx.lineCap = 'round'; ctx.strokeStyle = i < bars ? '#ffffff' : 'rgba(255,255,255,.22)'; ctx.stroke(); } }
function labRoom(ctx, t, cam) {
  applyCam(ctx, cam, 1); ctx.fillStyle = '#dfe8ef'; ctx.fillRect(-800, -800, 2700, 2040); ctx.fillStyle = '#9aa8b8'; ctx.fillRect(-800, 1240, 2700, 900); line(ctx, -800, 1240, 1900, 1240, 7);
  for (let i = 0; i < 4; i++) { rrect(ctx, 60 + i * 260, 560, 200, 260, 10); fillStroke(ctx, '#ffffff', 5); for (let k = 0; k < 3; k++) { rrect(ctx, 90 + i * 260 + k * 50, 700 - k * 20, 34, 100 + k * 20, 12); fillStroke(ctx, ['#7fd0ff', '#ff9ad0', '#9ae07a'][k], 4); } }
}
function labCoat(ctx, o) { const so = C({ cols: ['#ffffff', '#ffffff'], hat: 'none', belt: false }, o); drawStick(ctx, so); specs(ctx, so); return so; }
