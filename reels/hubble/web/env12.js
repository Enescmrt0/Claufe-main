// ---------- props for "The horse that could do math" (Clever Hans, Berlin, 1900s) ----------
// cartoon horse, side view facing +x. x,y = feet line centre; s = body length. o: { tap 0..1 (front hoof up), head (nod angle), blink, look }
function drawHorse(ctx, x, y, s, o = {}) {
  const lw = Math.max(4, s * .012), body = '#a8693a', dark = '#6a3a1a', hoof = '#2a2020';
  ctx.save(); ctx.translate(x - s * .16, y); if (o.flip) ctx.scale(-1, 1);
  const leg = (lx, lift, back) => { const ky = -s * .3, fy = -lift * s * .16; ctx.beginPath(); ctx.moveTo(lx, -s * .55); ctx.lineTo(lx + (back ? -s * .02 : s * .02) + lift * s * .06, ky + fy * .4); ctx.lineTo(lx + lift * s * .1, fy); ctx.lineWidth = s * .07; ctx.strokeStyle = body; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.globalCompositeOperation = 'destination-over'; ctx.globalCompositeOperation = 'source-over'; rrect(ctx, lx + lift * s * .1 - s * .045, fy - s * .04, s * .09, s * .05, s * .015); fillStroke(ctx, hoof, lw * .7); };
  leg(-s * .32, 0, true); leg(s * .22, 0, false);
  // tail
  ctx.beginPath(); ctx.moveTo(-s * .45, -s * .66); ctx.quadraticCurveTo(-s * .68, -s * .55 + Math.sin((o.t || 0) * 3) * s * .03, -s * .6, -s * .3); ctx.lineWidth = s * .06; ctx.strokeStyle = dark; ctx.lineCap = 'round'; ctx.stroke();
  // body
  ellipse(ctx, 0, -s * .66, s * .5, s * .2); fillStroke(ctx, body, lw);
  leg(-s * .22, 0, true); leg(s * .32, o.tap || 0, false);
  // neck + head
  ctx.save(); ctx.translate(s * .36, -s * .78); ctx.rotate(o.head || 0);
  ctx.beginPath(); ctx.moveTo(-s * .1, s * .08); ctx.lineTo(s * .08, -s * .32); ctx.lineTo(s * .22, -s * .26); ctx.lineTo(s * .1, s * .14); ctx.closePath(); fillStroke(ctx, body, lw);
  for (let i = 0; i < 5; i++) { circle(ctx, s * (.02 + i * .03), -s * (.3 - i * .08) - s * .02, s * .045); ctx.fillStyle = dark; ctx.fill(); }
  ctx.save(); ctx.translate(s * .2, -s * .3); ctx.rotate(.5);
  rrect(ctx, -s * .07, -s * .06, s * .34, s * .16, s * .07); fillStroke(ctx, body, lw);
  path(ctx, [[-s * .02, -s * .06], [s * .02, -s * .17], [s * .06, -s * .05]]); fillStroke(ctx, body, lw * .8);
  const blink = o.blink || 0;
  ellipse(ctx, s * .05, -s * .01, s * .028, s * .028 * (1 - blink * .9)); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = lw * .5; ctx.strokeStyle = INK; ctx.stroke();
  if (blink < .5) { circle(ctx, s * .055 + (o.look || 0) * s * .01, -s * .01, s * .014); ctx.fillStyle = INK; ctx.fill(); }
  circle(ctx, s * .24, s * .04, s * .012); ctx.fillStyle = INK; ctx.fill();
  if (o.blinders) { rrect(ctx, s * .0, -s * .07, s * .12, s * .1, s * .02); fillStroke(ctx, '#1f1a22', lw * .7); }
  ctx.restore(); ctx.restore();
  ctx.restore();
}
function chalkboard(ctx, x, y, w, h, lines, col = '#ffffff') {
  rrect(ctx, x - w / 2 - 16, y - h / 2 - 16, w + 32, h + 32, 10); fillStroke(ctx, '#8a5530', 8); rrect(ctx, x - w / 2, y - h / 2, w, h, 6); fillStroke(ctx, '#23402f', 6);
  lines.forEach((l, i) => text(ctx, l, x, y - h / 2 + h * (i + .5) / lines.length, Math.min(h / lines.length * .7, 120), col, INK, 0));
}
function moustache(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s + .05 * s; for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sd * .05 * s, hy, .055 * s, .022 * s, sd * .3, 0, TAU); ctx.fillStyle = '#e6e6e6'; ctx.fill(); ctx.lineWidth = Math.max(2, s * .006); ctx.strokeStyle = INK; ctx.stroke(); } ctx.restore(); }
function bowler(ctx, o, col = '#2a2420') { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s; ctx.beginPath(); ctx.arc(0, hy - .14 * s, .16 * s, Math.PI, 0); ctx.closePath(); fillStroke(ctx, col, Math.max(3, s * .011)); ellipse(ctx, 0, hy - .14 * s, .24 * s, .04 * s); fillStroke(ctx, col, Math.max(3, s * .011)); ctx.restore(); }
function notebook(ctx, x, y, s, rot = -.2) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s * .35, -s * .45, s * .7, s * .9, 8); fillStroke(ctx, '#f4efe4', 5); for (let i = 0; i < 5; i++) line(ctx, -s * .25, -s * .28 + i * s * .14, s * .25, -s * .28 + i * s * .14, 3, '#9aa4b0'); ctx.restore(); }
function woodScreen(ctx, x, y, w, h) { for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.rect(x - w / 2 + i * w / 3, y - h, w / 3, h); fillStroke(ctx, '#b98552', 7); line(ctx, x - w / 2 + i * w / 3 + 20, y - h + 20, x - w / 2 + i * w / 3 + 20, y - 20, 4, 'rgba(90,50,20,.3)'); } }
function letterTile(ctx, x, y, s, ch, on = 1) { ctx.save(); ctx.globalAlpha = on; rrect(ctx, x - s / 2, y - s / 2, s, s, s * .15); fillStroke(ctx, '#f4efe4', 6); text(ctx, ch, x, y + 2, s * .7, INK, INK, 0); ctx.restore(); }
function scoreBar(ctx, x, y, w, h, frac, col, lab) { rrect(ctx, x, y - h, w, h, 14); ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fill(); rrect(ctx, x, y - h * frac, w, h * frac, 14); fillStroke(ctx, col, 7); text(ctx, lab, x + w / 2, y - h * frac - 60, 90, col, INK, 18); text(ctx, lab, x + w / 2, y - h * frac - 60, 90, col, INK, 0); }
function berlinStreet(ctx, t, cam) {
  applyCam(ctx, cam, .08); drawSky(ctx, '#7fb8e6', '#f2e6d0', -400, 1300); applyCam(ctx, cam, .14); drawCloud(ctx, 260 + t * 6, 220, 100, 1); drawCloud(ctx, 900 + t * 4, 160, 80, 2);
  applyCam(ctx, cam, .5);
  for (let i = 0; i < 5; i++) { const x = -120 + i * 280, h = 560 + (i % 2) * 140; ctx.beginPath(); ctx.rect(x, 1240 - h, 260, h); fillStroke(ctx, ['#e8d8b8', '#d8c0a0', '#e0ccb0'][i % 3], 7); for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { rrect(ctx, x + 26 + c * 78, 1240 - h + 50 + r * 120, 50, 80, 6); fillStroke(ctx, '#5a7a9a', 5); } path(ctx, [[x - 10, 1240 - h], [x + 130, 1240 - h - 70], [x + 270, 1240 - h]]); fillStroke(ctx, '#8a3a2a', 6); }
  applyCam(ctx, cam, 1); ctx.fillStyle = '#b8a888'; ctx.fillRect(-2000, 1240, 5080, 2000); const R = rng(5); for (let i = 0; i < 60; i++) { ellipse(ctx, R() * 1300 - 100, 1270 + R() * 600, 34, 12); ctx.fillStyle = 'rgba(80,60,40,.18)'; ctx.fill(); }
}
