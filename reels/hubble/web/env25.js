// ---------- props for "Hubble is falling" (NASA asks for rescue ideas, Oct–Nov 2026) ----------
function spaceBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .05); bgFlat(ctx, '#05071a', '#141a3a'); applyCam(ctx, cam, .05); drawStars(ctx, t, 90, 7, 1); drawStars(ctx, t * .5, 60, 21, .6);
  if (o.limb !== false) { applyCam(ctx, cam, .3); earthLimb(ctx, o.limbY || 1500, t, o.glow); }
  applyCam(ctx, cam, 1);
}
function earthLimb(ctx, y, t, glow = 0) {
  const R = 1600, cx = 540, cy = y + R;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R + 40, 0, TAU); ctx.fillStyle = `rgba(120,190,255,${.25 + glow * .3})`; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = '#2f6ad0'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip(); for (const [dx, dy, rr] of [[-500, 120, 300], [300, 80, 260], [700, 260, 200], [-80, 260, 160]]) { ellipse(ctx, cx + dx - (t * 8) % 2000 + 600, y + dy, rr, rr * .3); ctx.fillStyle = '#3aa35b'; ctx.fill(); } for (let i = 0; i < 5; i++) { ellipse(ctx, ((i * 330 - t * 14) % 1500) - 100, y + 60 + (i % 2) * 120, 160, 30); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fill(); } ctx.restore();
}
// Hubble: silver tube, aperture door, two blue solar wings. (x,y) centre, s = length, rot
function hubble(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const lw = Math.max(4, s * .01);
  for (const sd of [-1, 1]) { ctx.save(); ctx.translate(-s * .05, sd * s * .2); line(ctx, 0, -sd * s * .08, 0, 0, lw * 1.4, '#9aa0aa'); rrect(ctx, -s * .26, -s * .07 + (sd > 0 ? s * .02 : -s * .02), s * .52, s * .14, 4); fillStroke(ctx, '#2a4a9a', lw); for (let i = 1; i < 6; i++) line(ctx, -s * .26 + i * s * .52 / 6, -s * .07 + (sd > 0 ? s * .02 : -s * .02), -s * .26 + i * s * .52 / 6, s * .07 + (sd > 0 ? s * .02 : -s * .02), 2, '#7a9ae0'); ctx.restore(); }
  rrect(ctx, -s * .5, -s * .11, s * .62, s * .22, s * .03); fillStroke(ctx, '#d8dce4', lw);
  rrect(ctx, s * .1, -s * .13, s * .3, s * .26, s * .03); fillStroke(ctx, '#b8bcc8', lw);
  for (let i = 0; i < 4; i++) line(ctx, -s * .45 + i * s * .14, -s * .11, -s * .45 + i * s * .14, s * .11, 2, 'rgba(0,0,0,.25)');
  ctx.save(); ctx.translate(-s * .5, -s * .11); ctx.rotate(-(o.door == null ? .5 : o.door)); rrect(ctx, -s * .02, -s * .2, s * .04, s * .22, 3); fillStroke(ctx, '#d8dce4', lw * .8); ctx.restore();
  ellipse(ctx, -s * .5, 0, s * .02, s * .1); ctx.fillStyle = '#1a1a2a'; ctx.fill();
  if (o.label) text(ctx, 'HST', -s * .2, 0, s * .07, '#5a6070', INK, 0);
  ctx.restore();
}
function shuttle(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const lw = Math.max(4, s * .012);
  path(ctx, [[-s * .2, s * .08], [s * .12, s * .3], [s * .25, s * .3], [s * .1, s * .08]]); fillStroke(ctx, '#e8e8ec', lw);
  ctx.beginPath(); ctx.moveTo(-s * .45, -s * .08); ctx.lineTo(s * .3, -s * .08); ctx.quadraticCurveTo(s * .5, -s * .06, s * .52, 0); ctx.quadraticCurveTo(s * .5, s * .08, s * .3, s * .08); ctx.lineTo(-s * .45, s * .08); ctx.closePath(); fillStroke(ctx, '#f2f2f4', lw);
  path(ctx, [[-s * .45, -s * .08], [-s * .5, -s * .25], [-s * .38, -s * .25], [-s * .25, -s * .08]]); fillStroke(ctx, '#e8e8ec', lw);
  ctx.beginPath(); ctx.moveTo(s * .38, s * .02); ctx.quadraticCurveTo(s * .5, s * .04, s * .52, 0); ctx.quadraticCurveTo(s * .5, s * .08, s * .3, s * .08); ctx.closePath(); ctx.fillStyle = '#2a2a30'; ctx.fill();
  for (let i = 0; i < 3; i++) { rrect(ctx, s * .32 + i * s * .04, -s * .06, s * .03, s * .03, 2); ctx.fillStyle = '#2a2a30'; ctx.fill(); }
  ctx.restore();
}
function spacesuit(ctx, o) { const so = Object.assign({ cols: ['#f2f2f4', '#f2f2f4'], hat: 'none', belt: false }, o); drawStick(ctx, so); const s = so.s; ctx.save(); ctx.translate(so.x, so.y); circle(ctx, 0, -.765 * s, .25 * s); ctx.lineWidth = Math.max(4, s * .02); ctx.strokeStyle = INK; ctx.stroke(); ctx.save(); ctx.globalAlpha = .25; circle(ctx, 0, -.765 * s, .25 * s); ctx.fillStyle = '#ffd86a'; ctx.fill(); ctx.restore(); ctx.restore(); return so; }
function schoolBus(ctx, x, y, s) { rrect(ctx, x - s * .5, y - s * .3, s, s * .26, s * .03); fillStroke(ctx, '#f2b52a', 6); rrect(ctx, x + s * .38, y - s * .2, s * .14, s * .16, s * .02); fillStroke(ctx, '#f2b52a', 6); for (let i = 0; i < 6; i++) { rrect(ctx, x - s * .45 + i * s * .13, y - s * .26, s * .1, s * .09, 4); fillStroke(ctx, '#bfe4ff', 4); } line(ctx, x - s * .5, y - s * .1, x + s * .52, y - s * .1, 5); for (const wx of [-.3, .3]) { circle(ctx, x + wx * s, y - s * .03, s * .06); fillStroke(ctx, '#2a2a30', 5); } }
function galaxy(ctx, x, y, r, t, col = '#c8a0ff', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot + t * .2); for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 40; i++) { const a = arm * Math.PI + i * .16, rr = i / 40 * r; ctx.globalAlpha = .9 - i / 50; circle(ctx, Math.cos(a) * rr, Math.sin(a) * rr * .55, r * .11 * (1 - i / 50)); ctx.fillStyle = col; ctx.fill(); } ctx.globalAlpha = 1; circle(ctx, 0, 0, r * .14); ctx.fillStyle = '#fff6d0'; ctx.fill(); ctx.restore(); }
function molecules(ctx, t, n, x0, x1, y0, y1, vx = -1) { for (let i = 0; i < n; i++) { const r = rng(i * 11 + 4); const x = x0 + (((r() * (x1 - x0) + vx * t * 160 * (.6 + r())) % (x1 - x0)) + (x1 - x0)) % (x1 - x0), y = y0 + r() * (y1 - y0); circle(ctx, x, y, 10); fillStroke(ctx, '#bfe8ff', 3); circle(ctx, x + 14, y + 4, 8); fillStroke(ctx, '#bfe8ff', 3); } }
function servicer(ctx, x, y, s, t, armTo) { rrect(ctx, x - s * .25, y - s * .2, s * .5, s * .4, s * .05); fillStroke(ctx, '#e8c86a', 6); for (const sd of [-1, 1]) { rrect(ctx, x + sd * s * .3 - (sd < 0 ? s * .4 : 0), y - s * .1, s * .4, s * .2, 4); fillStroke(ctx, '#2a4a9a', 5); } circle(ctx, x, y, s * .08); fillStroke(ctx, '#9aa0aa', 4); if (armTo) { const ex = (x + armTo[0]) / 2, ey = Math.min(y, armTo[1]) - s * .2; line(ctx, x, y - s * .2, ex, ey, s * .06); line(ctx, x, y - s * .2, ex, ey, s * .035, '#c8ccd4'); line(ctx, ex, ey, armTo[0], armTo[1], s * .05); line(ctx, ex, ey, armTo[0], armTo[1], s * .03, '#c8ccd4'); circle(ctx, ex, ey, s * .04); fillStroke(ctx, '#e0392f', 4); } }
function flameJet(ctx, x, y, s, t, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); for (let i = 0; i < 3; i++) { const k = 1 - i * .3, w = Math.sin(t * 30 + i) * s * .04; ctx.beginPath(); ctx.moveTo(0, -s * .12 * k); ctx.quadraticCurveTo(-s * .5 * k, w, -s * k, 0); ctx.quadraticCurveTo(-s * .5 * k, -w, 0, s * .12 * k); ctx.closePath(); ctx.fillStyle = ['#ff7a2a', '#ffb12a', '#fff0a0'][i]; ctx.fill(); } ctx.restore(); }
function oceanScene(ctx, t, cam) { applyCam(ctx, cam, .08); drawSky(ctx, '#ff9a5a', '#ffd8a0', -400, 1300); applyCam(ctx, cam, .1); drawSun(ctx, 540, 760, 90, t, 1); applyCam(ctx, cam, 1); ctx.fillStyle = '#1f6aa8'; ctx.fillRect(-500, 900, 2100, 1300); line(ctx, -500, 900, 1600, 900, 6); ctx.save(); ctx.globalAlpha = .4; for (let i = 0; i < 14; i++) { const x = ((i * 157 + t * 40) % 1300) - 100; line(ctx, x, 940 + (i % 5) * 60, x + 70, 940 + (i % 5) * 60, 5, '#ffffff'); } ctx.restore(); }
function rfiDoc(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s * .38, -s * .5, s * .76, s, 8); fillStroke(ctx, '#ffffff', 6); text(ctx, 'NASA', 0, -s * .38, s * .1, '#2a4a9a', INK, 0); text(ctx, 'REQUEST FOR', 0, -s * .24, s * .07, INK, INK, 0); text(ctx, 'INFORMATION', 0, -s * .15, s * .07, INK, INK, 0); hubble(ctx, 0, s * .06, s * .4, { door: .3 }); for (let i = 0; i < 4; i++) line(ctx, -s * .28, s * .24 + i * s * .06, s * (.28 - (i % 2) * .1), s * .24 + i * s * .06, 3, '#9aa0b0'); ctx.restore(); }
function bigCal(ctx, x, y, s, top, big, col = '#2a4a9a') { rrect(ctx, x - s / 2, y - s * .6, s, s * 1.1, s * .06); fillStroke(ctx, '#ffffff', 6); ctx.save(); rrect(ctx, x - s / 2, y - s * .6, s, s * .3, s * .06); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(x - s / 2, y - s * .6, s, s * .3); ctx.restore(); text(ctx, top, x, y - s * .45, s * .13, '#ffffff', INK, 0); text(ctx, big, x, y + s * .12, big.length > 4 ? s * .21 : s * .3, INK, INK, 0); }
