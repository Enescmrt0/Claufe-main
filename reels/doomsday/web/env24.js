// ---------- props for "Doomsday: Friday, 13 November 2026" (von Foerster, 1960) ----------
function calPage(ctx, x, y, s, top, big, bottom, col = '#e0392f', rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  rrect(ctx, -s / 2, -s * .6, s, s * 1.2, s * .06); fillStroke(ctx, '#ffffff', Math.max(5, s * .02));
  ctx.save(); rrect(ctx, -s / 2, -s * .6, s, s * .3, s * .06); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(-s / 2, -s * .6, s, s * .3); ctx.restore(); line(ctx, -s / 2, -s * .3, s / 2, -s * .3, Math.max(5, s * .02));
  for (const dx of [-.25, .25]) { rrect(ctx, dx * s - s * .03, -s * .7, s * .06, s * .18, s * .03); fillStroke(ctx, '#9aa0aa', 4); }
  text(ctx, top, 0, -s * .45, s * .13, '#ffffff', INK, 0); text(ctx, big, 0, s * .1, s * .42, INK, INK, 0); text(ctx, bottom, 0, s * .45, s * .11, '#5a5a6a', INK, 0);
  ctx.restore();
}
function journal(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s * .38, -s * .5, s * .76, s, 8); fillStroke(ctx, '#f2ece0', 6);
  ctx.fillStyle = '#c8322c'; ctx.fillRect(-s * .38, -s * .5, s * .76, s * .16); line(ctx, -s * .38, -s * .34, s * .38, -s * .34, 5);
  text(ctx, 'JOURNAL · 1960', 0, -s * .42, s * .07, '#ffffff', INK, 0); text(ctx, 'DOOMSDAY:', 0, -s * .2, s * .1, INK, INK, 0); text(ctx, 'FRIDAY, 13 NOV', 0, -s * .08, s * .07, INK, INK, 0); text(ctx, 'A.D. 2026', 0, s * .02, s * .07, INK, INK, 0);
  for (let i = 0; i < 7; i++) line(ctx, -s * .3, s * .14 + i * s * .045, s * (.3 - (i % 3) * .08), s * .14 + i * s * .045, 3, '#9a9488');
  ctx.restore();
}
// population chart. kind: 'hyper' (curve to infinity) or 'real' (bends over). k = how much of it is drawn (0..1)
function popChart(ctx, x, y, w, h, k, kind = 'hyper', o = {}) {
  rrect(ctx, x - 30, y - h - 30, w + 60, h + 90, 16); fillStroke(ctx, o.bg || '#1f2a44', 6);
  line(ctx, x, y, x + w, y, 6, '#ffffff'); line(ctx, x, y, x, y - h, 6, '#ffffff');
  const xs = o.years || ['0', '1000', '1960', '2026'];
  xs.forEach((s, i) => text(ctx, s, x + i * w / (xs.length - 1), y + 34, 30, '#c8d0e0', INK, 0));
  const f = u => kind === 'hyper' ? Math.min(1.25, .02 / Math.max(.001, 1.02 - u)) : .04 + .62 / (1 + Math.exp(-(u - .55) * 11)) - Math.max(0, u - .85) ** 2 * 3;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y - h - 30, w + 10, h + 40); ctx.clip();
  ctx.beginPath(); const N = 120; for (let i = 0; i <= N * k; i++) { const u = i / N, v = f(u); const px = x + u * w, py = y - Math.min(h * 1.3, v * h); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.lineWidth = 12; ctx.strokeStyle = o.col || '#ff5a4a'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  if (o.inf && k > .97) { text(ctx, '∞', x + w - 10, y - h - 50, 120, '#ffd23a', INK, 14); text(ctx, '∞', x + w - 10, y - h - 50, 120, '#ffd23a', INK, 0); }
}
// growth-rate hump: rises to a peak in the 1960s then falls
function rateChart(ctx, x, y, w, h, k) {
  rrect(ctx, x - 30, y - h - 30, w + 60, h + 90, 16); fillStroke(ctx, '#1f2a44', 6); line(ctx, x, y, x + w, y, 6, '#ffffff'); line(ctx, x, y, x, y - h, 6, '#ffffff');
  ['1900', '1960s', '2024'].forEach((s, i) => text(ctx, s, x + i * w / 2, y + 34, 30, '#c8d0e0', INK, 0));
  ctx.save(); ctx.beginPath(); for (let i = 0; i <= 100 * k; i++) { const u = i / 100, v = Math.exp(-(((u - .5) / .26) ** 2)) * .9 + .05 - u * .08; const px = x + u * w, py = y - v * h; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 12; ctx.strokeStyle = '#7ee08a'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore();
  if (k > .55) { circle(ctx, x + w * .5, y - .93 * h, 16); fillStroke(ctx, '#ffd23a', 5); }
}
function crowdedGlobe(ctx, x, y, r, t, dens = 1) {
  circle(ctx, x, y, r); fillStroke(ctx, '#2f7de0', 8);
  ctx.save(); circle(ctx, x, y, r); ctx.clip(); for (const [dx, dy, rr] of [[-.3, -.2, .35], [.35, .1, .3], [-.1, .45, .22]]) { ellipse(ctx, x + dx * r, y + dy * r, rr * r, rr * r * .7); ctx.fillStyle = '#3aa35b'; ctx.fill(); } ctx.restore();
  const n = Math.floor(44 * dens); for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + (i / 44 - .5) * Math.PI * 1.9, rr = r + 4; const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr; ctx.save(); ctx.translate(px, py); ctx.rotate(a + Math.PI / 2); rrect(ctx, -11, -50, 22, 46, 9); fillStroke(ctx, KCOL[i % 8], 4); circle(ctx, 0, -64, 17); fillStroke(ctx, '#ffffff', 4); ctx.restore(); }
}
function asteroid(ctx, x, y, r, t) { ctx.save(); ctx.translate(x, y); ctx.rotate(t); ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = i / 10 * TAU, rr = r * (.85 + .15 * Math.sin(i * 3.1)); i ? ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } ctx.closePath(); fillStroke(ctx, '#8a7a6a', 6); circle(ctx, r * .3, -r * .2, r * .18); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fill(); ctx.restore(); }
function foerster(ctx, o) { const so = Object.assign({ cols: ['#4a4a5a', '#4a4a5a'], hat: 'none', belt: false }, o); drawStick(ctx, so); specs(ctx, so); const s = so.s; ctx.save(); ctx.translate(so.x, so.y); for (const sd of [-1, 1]) { ellipse(ctx, sd * .17 * s, -.83 * s, .05 * s, .08 * s); fillStroke(ctx, '#d8d0c0', Math.max(3, s * .01)); } ctx.restore(); return so; }
function warnTri(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); path(ctx, [[0, -s], [s * .9, s * .6], [-s * .9, s * .6]]); fillStroke(ctx, '#ffd23a', Math.max(5, s * .06)); text(ctx, '!', 0, s * .1, s * .9, INK, INK, 0); ctx.restore(); }
function family(ctx, x, y, s, kids) { const P = [PAL.blue, PAL.red]; drawStick(ctx, { cols: P[0], hat: 'none', belt: false, x: x - s * .22, y, s, arms: POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile' } }); drawStick(ctx, { cols: P[1], hat: 'none', belt: false, x: x + s * .22, y, s, arms: POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile' } }); for (let i = 0; i < kids; i++) drawStick(ctx, { cols: [PAL.green, PAL.yellow, PAL.purple, PAL.navy, PAL.green, PAL.yellow][i], hat: 'none', belt: false, x: x - (kids - 1) * s * .14 + i * s * .28, y: y + s * .12, s: s * .5, arms: POSE.idle.arms, face: { eyes: 'happy', mouth: 'smile' } }); }
function phone(ctx, x, y, s, t) { rrect(ctx, x - s * .3, y - s * .55, s * .6, s * 1.1, s * .08); fillStroke(ctx, '#1a1a22', 7); rrect(ctx, x - s * .26, y - s * .5, s * .52, s, s * .05); ctx.fillStyle = '#2a3f6a'; ctx.fill(); ctx.save(); rrect(ctx, x - s * .26, y - s * .5, s * .52, s, s * .05); ctx.clip(); for (let i = 0; i < 5; i++) { const yy = y - s * .5 + ((i * s * .3 - t * s * .6) % (s * 1.5) + s * 1.5) % (s * 1.5) - s * .2; rrect(ctx, x - s * .22, yy, s * .44, s * .24, 10); ctx.fillStyle = ['#ff7a9a', '#7fd0ff', '#ffd86a', '#9ae07a', '#c8a0ff'][i]; ctx.fill(); } ctx.restore(); }
