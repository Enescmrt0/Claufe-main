// ---------- props for the pigeon-guided bomb reel ----------
// cartoon pigeon, side view facing +x. x,y = feet. o: { peck 0..1, flip, look:'fwd'|'back', blink, wing 0..1 }
function drawPigeon(ctx, x, y, s, o = {}) {
  const lw = Math.max(3, s * .03), pk = o.peck || 0;
  ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1); if (o.rot) ctx.rotate(o.rot);
  // legs
  for (const lx of [-.06, .06]) { line(ctx, lx * s, -.22 * s, lx * s, 0, lw * .9, '#e8783a'); line(ctx, lx * s - .05 * s, 0, lx * s + .07 * s, 0, lw * .8, '#e8783a'); }
  // tail + body
  path(ctx, [[-.32 * s, -.42 * s], [-.62 * s, -.5 * s], [-.6 * s, -.36 * s]]); fillStroke(ctx, '#6e7684', lw);
  ellipse(ctx, -.05 * s, -.42 * s, .33 * s, .24 * s, -.15); fillStroke(ctx, '#a9b1bd', lw);
  // wing
  ctx.save(); ctx.translate(-.08 * s, -.46 * s); ctx.rotate(-(o.wing || 0) * 1.1);
  ellipse(ctx, -.06 * s, 0, .22 * s, .12 * s, -.2); fillStroke(ctx, '#8b94a2', lw);
  line(ctx, -.2 * s, .02 * s, -.02 * s, -.02 * s, lw * .7); line(ctx, -.22 * s, .06 * s, -.04 * s, .03 * s, lw * .7);
  ctx.restore();
  // neck + head (peck moves the head forward and down)
  const hx = (.22 + pk * .14) * s, hy = (-.7 + pk * .3) * s;
  ctx.beginPath(); ctx.moveTo(.08 * s, -.55 * s); ctx.quadraticCurveTo(.2 * s, -.6 * s, hx - .06 * s, hy + .06 * s); ctx.lineTo(hx + .02 * s, hy + .1 * s); ctx.quadraticCurveTo(.24 * s, -.42 * s, .16 * s, -.36 * s); ctx.closePath();
  const ng = ctx.createLinearGradient(.08 * s, -.6 * s, .2 * s, -.4 * s); ng.addColorStop(0, '#5fbf8a'); ng.addColorStop(1, '#8a5fbf'); ctx.fillStyle = ng; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke();
  circle(ctx, hx, hy, .13 * s); fillStroke(ctx, '#9aa3b0', lw);
  path(ctx, [[hx + .11 * s, hy - .02 * s], [hx + .24 * s, hy + .03 * s], [hx + .11 * s, hy + .05 * s]]); fillStroke(ctx, '#3a3a3e', lw * .7);
  circle(ctx, hx + .14 * s, hy - .015 * s, .025 * s); ctx.fillStyle = '#f2ede2'; ctx.fill();
  const ex = hx + (o.look === 'back' ? -.02 : .04) * s, ey = hy - .03 * s;
  circle(ctx, ex, ey, .045 * s); fillStroke(ctx, '#ffb347', lw * .6);
  if ((o.blink || 0) > .5) line(ctx, ex - .04 * s, ey, ex + .04 * s, ey, lw * .8);
  else { circle(ctx, ex + (o.look === 'back' ? -.012 : .012) * s, ey, .022 * s); ctx.fillStyle = INK; ctx.fill(); }
  ctx.restore();
}
// glide bomb, side view, nose to +x. x,y = centre; s = length. o: { cut 0..1 (cutaway nose), t, peck }
function drawBomb(ctx, x, y, s, o = {}) {
  const lw = Math.max(4, s * .01), h = s * .2;
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  path(ctx, [[-s * .42, -h * .1], [-s * .56, -h * .9], [-s * .46, -h * .9], [-s * .3, -h * .2]]); fillStroke(ctx, '#5f6b45', lw);
  path(ctx, [[-s * .42, h * .1], [-s * .56, h * .9], [-s * .46, h * .9], [-s * .3, h * .2]]); fillStroke(ctx, '#5f6b45', lw);
  ctx.beginPath(); ctx.moveTo(-s * .5, -h * .3); ctx.lineTo(s * .18, -h * .5); ctx.quadraticCurveTo(s * .5, -h * .45, s * .52, 0); ctx.quadraticCurveTo(s * .5, h * .45, s * .18, h * .5); ctx.lineTo(-s * .5, h * .3); ctx.closePath();
  fillStroke(ctx, '#7a8a5a', lw);
  path(ctx, [[-s * .08, h * .1], [-s * .3, h * .1], [-s * .4, h * .9], [-s * .22, h * .9]]); fillStroke(ctx, '#6a7a4a', lw);
  ctx.fillStyle = '#e8c04a'; ctx.fillRect(-s * .1, -h * .48, s * .04, h * .96);
  // nose window with pigeon faces
  ellipse(ctx, s * .36, -h * .05, s * .1, h * .28); fillStroke(ctx, '#bfe4ff', lw * .8);
  ctx.save(); ellipse(ctx, s * .36, -h * .05, s * .1, h * .28); ctx.clip();
  for (let i = 0; i < 3; i++) drawPigeon(ctx, s * (.3 + i * .045), h * .2, s * .09, { peck: Math.max(0, Math.sin((o.t || 0) * 10 + i * 2)) * .8 });
  ctx.restore();
  ctx.restore();
}
// TV-like guidance screen. tx,ty = target offset (-1..1); peckAt: flash spot
function drawScreen(ctx, x, y, w, h, tx, ty, o = {}) {
  rrect(ctx, x - w / 2 - 18, y - h / 2 - 18, w + 36, h + 36, 22); fillStroke(ctx, '#3a3d44', 8);
  ctx.save(); rrect(ctx, x - w / 2, y - h / 2, w, h, 14); ctx.clip();
  const g = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2); g.addColorStop(0, '#9fd4f6'); g.addColorStop(.55, '#d3f0fb'); g.addColorStop(.56, '#2a8ac2'); g.addColorStop(1, '#1a5f9a'); ctx.fillStyle = g; ctx.fillRect(x - w, y - h, w * 2, h * 2);
  const sx = x + tx * w * .4, sy = y + h * .06 + ty * h * .3, ss = w * .16;
  path(ctx, [[sx - ss, sy], [sx + ss, sy], [sx + ss * .7, sy + ss * .3], [sx - ss * .8, sy + ss * .3]]); fillStroke(ctx, '#4a4f5a', 4);
  ctx.beginPath(); ctx.rect(sx - ss * .3, sy - ss * .45, ss * .5, ss * .45); fillStroke(ctx, '#5a606c', 4);
  line(ctx, sx + ss * .05, sy - ss * .45, sx + ss * .05, sy - ss * .8, 4);
  ctx.globalAlpha = .7; line(ctx, x - w / 2, y, x + w / 2, y, 3, '#ffffff'); line(ctx, x, y - h / 2, x, y + h / 2, 3, '#ffffff');
  circle(ctx, x, y, w * .08); ctx.lineWidth = 4; ctx.strokeStyle = '#ffffff'; ctx.stroke(); ctx.globalAlpha = 1;
  if (o.peck) { burst(ctx, sx, sy - ss * .1, w * .07 * o.peck, 8, '#ffd23a', 3); }
  ctx.fillStyle = 'rgba(0,0,0,.08)'; for (let i = 0; i < h; i += 8) ctx.fillRect(x - w / 2, y - h / 2 + i, w, 3);
  ctx.restore();
}
function officerCap(ctx, o, col = '#5a6a3a') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.scale(o.flip || 1, 1); ctx.rotate(o.lean || 0);
  const hy = -.765 * s;
  ellipse(ctx, 0, hy - .16 * s, .23 * s, .08 * s); fillStroke(ctx, col, Math.max(3, s * .011));
  ctx.beginPath(); ctx.rect(-.17 * s, hy - .17 * s, .34 * s, .07 * s); fillStroke(ctx, '#3a4426', Math.max(3, s * .011));
  ellipse(ctx, .06 * s, hy - .1 * s, .17 * s, .03 * s, .1); fillStroke(ctx, '#2a2a2a', Math.max(3, s * .011));
  circle(ctx, 0, hy - .15 * s, .025 * s); fillStroke(ctx, '#e8c04a', Math.max(2, s * .008));
  ctx.restore();
}
function sideHair(ctx, o, col = '#3a2a22') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s;
  for (const side of [-1, 1]) { ellipse(ctx, side * .17 * s, hy - .03 * s, .04 * s, .09 * s, side * .2); fillStroke(ctx, col, Math.max(3, s * .009)); }
  ctx.restore();
}
function bigComputer(ctx, x, y, w, h, t) {
  for (let i = 0; i < 4; i++) {
    const cx = x - w / 2 + i * w / 4;
    ctx.beginPath(); ctx.rect(cx + 8, y - h, w / 4 - 16, h); fillStroke(ctx, '#8a94a4', 8);
    for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) { circle(ctx, cx + 40 + c * (w / 4 - 70) / 3, y - h + 60 + r * (h - 220) / 6, 11); ctx.fillStyle = (Math.floor(t * 6 + r * 3 + c * 5 + i * 7) % 3) ? '#ffd23a' : '#e0392f'; ctx.fill(); }
    for (let k = 0; k < 2; k++) { circle(ctx, cx + 60 + k * 70, y - 110, 30); fillStroke(ctx, '#3a3d44', 6); }
  }
}
function stamp(ctx, x, y, str, k, col = '#e0392f', rot = -.15) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const sc = 1 + (1 - k) * 1.5; ctx.scale(sc, sc); ctx.globalAlpha = Math.min(1, k * 2);
  const w = str.length * 52 + 80;
  rrect(ctx, -w / 2, -70, w, 140, 20); ctx.lineWidth = 16; ctx.strokeStyle = col; ctx.stroke();
  text(ctx, str, 0, 4, 84, col, INK, 0);
  ctx.restore();
}
function folderDoc(ctx, x, y, s, title) {
  ctx.save(); ctx.translate(x, y);
  rrect(ctx, -s * .5, -s * .66, s * .3, s * .1, 10); fillStroke(ctx, '#d9b25f', 6);
  rrect(ctx, -s * .5, -s * .6, s, s * 1.2, 16); fillStroke(ctx, '#e8c876', 7);
  text(ctx, title, 0, -s * .35, s * .11, INK, INK, 0);
  drawPigeon(ctx, -s * .05, s * .3, s * .45, {});
  ctx.restore();
}
function moneyBag(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ellipse(ctx, 0, 0, s * .45, s * .5); fillStroke(ctx, '#c9a25a', Math.max(3, s * .05));
  path(ctx, [[-s * .15, -s * .45], [-s * .25, -s * .7], [s * .25, -s * .7], [s * .15, -s * .45]]); fillStroke(ctx, '#c9a25a', Math.max(3, s * .05));
  text(ctx, '$', 0, s * .05, s * .5, '#3a8a3a', INK, 0);
  ctx.restore();
}
function trophy(ctx, x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.rect(-s * .3, -s * .1, s * .6, s * .1); fillStroke(ctx, '#7a4a2a', 6);
  ctx.beginPath(); ctx.rect(-s * .08, -s * .35, s * .16, s * .25); fillStroke(ctx, '#e8c04a', 6);
  ctx.beginPath(); ctx.moveTo(-s * .32, -s * .9); ctx.lineTo(s * .32, -s * .9); ctx.quadraticCurveTo(s * .3, -s * .4, 0, -s * .35); ctx.quadraticCurveTo(-s * .3, -s * .4, -s * .32, -s * .9); ctx.closePath(); fillStroke(ctx, '#ffd23a', 6);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.arc(sd * s * .36, -s * .72, s * .1, sd > 0 ? -Math.PI / 2 : Math.PI / 2, sd > 0 ? Math.PI / 2 : Math.PI * 1.5, sd < 0); ctx.lineWidth = s * .04; ctx.strokeStyle = INK; ctx.stroke(); }
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .3 + .2 * Math.sin(t * 5); circle(ctx, -s * .12, -s * .75, s * .06); ctx.fillStyle = '#fff'; ctx.fill(); ctx.restore();
  ctx.restore();
}
function frame(ctx, x, y, w, h, draw) {
  rrect(ctx, x - w / 2 - 22, y - h / 2 - 22, w + 44, h + 44, 12); fillStroke(ctx, '#b8873a', 8);
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.fillStyle = '#f2e6c8'; ctx.fill(); ctx.clip(); draw(); ctx.restore();
  ctx.beginPath(); ctx.rect(x - w / 2, y - h / 2, w, h); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
}
function bomber(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y);
  ellipse(ctx, 0, 0, s * .5, s * .08); fillStroke(ctx, '#7a8a6a', 6);
  path(ctx, [[-s * .1, 0], [s * .1, 0], [s * .02, s * .38], [-s * .12, s * .38]]); fillStroke(ctx, '#6a7a5a', 6);
  path(ctx, [[-s * .1, 0], [s * .1, 0], [s * .02, -s * .38], [-s * .12, -s * .38]]); fillStroke(ctx, '#6a7a5a', 6);
  path(ctx, [[-s * .42, 0], [-s * .5, -s * .16], [-s * .44, -s * .16], [-s * .36, 0]]); fillStroke(ctx, '#6a7a5a', 6);
  for (const e of [-.22, .22]) { circle(ctx, s * .04, e * s, s * .05); fillStroke(ctx, '#3a3d44', 5); ctx.save(); ctx.translate(s * .1, e * s); ctx.rotate(t * 40); line(ctx, 0, -s * .09, 0, s * .09, 6); ctx.restore(); }
  ctx.restore();
}
function crumbs(ctx, x, y, s) { const R = rng(5); for (let i = 0; i < 7; i++) { ellipse(ctx, x + (R() - .5) * s, y + (R() - .5) * s * .3, s * .08, s * .05, R()); fillStroke(ctx, '#e8b86a', 3); } }
