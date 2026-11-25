// ---------- props for "The scientist who dissolved two Nobel Prizes" (Copenhagen, 1940) ----------
function medal(ctx, x, y, r, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; const lw = Math.max(3, r * .07);
  if (o.ribbon) { path(ctx, [[-r * .5, -r * 2.2], [r * .5, -r * 2.2], [r * .25, -r * .8], [-r * .25, -r * .8]]); fillStroke(ctx, '#2a5aa8', lw); }
  circle(ctx, 0, 0, r); fillStroke(ctx, '#f2c22a', lw); circle(ctx, 0, 0, r * .8); ctx.lineWidth = lw * .6; ctx.strokeStyle = '#b8901a'; ctx.stroke();
  ctx.beginPath(); ctx.arc(r * .05, -r * .05, r * .42, Math.PI * .6, Math.PI * 1.9); ctx.lineWidth = lw * .8; ctx.strokeStyle = '#b8901a'; ctx.stroke(); circle(ctx, r * .2, -r * .15, r * .05); ctx.fillStyle = '#b8901a'; ctx.fill();
  if (o.name) text(ctx, o.name, 0, r * .55, r * .2, '#7a5a10', INK, 0);
  ctx.save(); ctx.globalAlpha *= .5; ellipse(ctx, -r * .4, -r * .4, r * .15, r * .08, -.6); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore();
  ctx.restore();
}
// glass jar with liquid; k = how orange the liquid is, medalsIn = list of [dissolve 0..1]
function jar(ctx, x, y, s, t, o = {}) {
  const w = s * .6, h = s;
  rrect(ctx, x - w / 2, y - h, w, h, s * .08); ctx.fillStyle = 'rgba(220,240,250,.35)'; ctx.fill();
  const lv = o.level == null ? .7 : o.level; ctx.save(); rrect(ctx, x - w / 2, y - h, w, h, s * .08); ctx.clip();
  ctx.fillStyle = o.col || 'rgba(255,170,40,.85)'; ctx.fillRect(x - w / 2, y - h * lv, w, h * lv);
  (o.medals || []).forEach((d, i) => { if (d < 1) medal(ctx, x - w * .15 + i * w * .3, y - h * .2 - i * h * .08, s * .12 * (1 - d * .9), { alpha: 1 - d, rot: t + i }); });
  if (o.bubbles) for (let i = 0; i < 10; i++) { const k = ((t * 1.2 + i / 10) % 1); circle(ctx, x - w * .35 + (i * 37 % 70) / 100 * w, y - h * .1 - k * h * lv * .9, s * .015 + (i % 3) * s * .005); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill(); }
  ctx.restore();
  rrect(ctx, x - w / 2, y - h, w, h, s * .08); ctx.lineWidth = Math.max(5, s * .02); ctx.strokeStyle = INK; ctx.stroke();
  rrect(ctx, x - w * .55, y - h - s * .1, w * 1.1, s * .12, s * .03); fillStroke(ctx, '#9a6a3a', Math.max(5, s * .02));
  ctx.save(); ctx.globalAlpha = .45; rrect(ctx, x - w * .38, y - h * .9, w * .1, h * .7, s * .03); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore();
}
function labRoom(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, 1); ctx.fillStyle = o.wall || '#d8d0bc'; ctx.fillRect(-800, -800, 2700, 2040); ctx.fillStyle = o.floor || '#6a5a4a'; ctx.fillRect(-800, 1240, 2700, 900); line(ctx, -800, 1240, 1900, 1240, 7);
  for (const sy of [560, 820]) { rrect(ctx, -100, sy, 1300, 24, 4); fillStroke(ctx, '#8a6a4a', 6); for (let i = 0; i < 9; i++) { const r = rng(i * 3 + sy); if (o.gap && i === 4 && sy === 820) continue; const jx = 20 + i * 125, jh = 90 + r() * 70; rrect(ctx, jx, sy - jh, 70, jh, 10); ctx.fillStyle = ['rgba(120,200,255,.6)', 'rgba(160,255,160,.6)', 'rgba(255,160,200,.6)', 'rgba(255,230,140,.6)'][i % 4]; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); rrect(ctx, jx - 4, sy - jh - 14, 78, 16, 4); fillStroke(ctx, '#7a5a3a', 4); } }
  rrect(ctx, 200, 980, 680, 30, 6); fillStroke(ctx, '#7a5a3a', 6); line(ctx, 240, 1010, 240, 1240, 12); line(ctx, 840, 1010, 840, 1240, 12);
}
function soldier(ctx, o) { const so = Object.assign({ cols: ['#5a6050', '#5a6050'], hat: 'none', belt: true }, o); drawStick(ctx, so); const s = so.s; ctx.save(); ctx.translate(so.x, so.y); ctx.scale(so.flip || 1, 1); const hy = -.765 * s; ctx.beginPath(); ctx.moveTo(-.22 * s, hy - .02 * s); ctx.quadraticCurveTo(-.22 * s, hy - .28 * s, 0, hy - .28 * s); ctx.quadraticCurveTo(.22 * s, hy - .28 * s, .22 * s, hy - .02 * s); ctx.lineTo(.26 * s, hy + .02 * s); ctx.lineTo(-.26 * s, hy + .02 * s); ctx.closePath(); fillStroke(ctx, '#4a5044', Math.max(3, s * .011)); ctx.restore(); return so; }
function hevesy(ctx, o) { const so = Object.assign({ cols: ['#ffffff', '#ffffff'], hat: 'none', belt: false }, o); drawStick(ctx, so); specs(ctx, so); moustache(ctx, so); return so; }
function physicist(ctx, o, k = 0) { const so = Object.assign({ cols: k ? ['#3a4a6a', '#3a4a6a'] : ['#4a3a3a', '#4a3a3a'], hat: 'none', belt: false }, o); drawStick(ctx, so); if (k) specs(ctx, so); else moustache(ctx, so); return so; }
function flagDK(ctx, x, y, w, t) { const wv = Math.sin(t * 5) * w * .03; ctx.save(); ctx.translate(x, y); line(ctx, 0, 0, 0, w * 1.4, 8); path(ctx, [[0, 0], [w, wv], [w, w * .66 + wv], [0, w * .66]]); fillStroke(ctx, '#c8102e', 6); line(ctx, w * .36, wv * .4, w * .36, w * .66 + wv * .4, w * .1, '#ffffff'); line(ctx, 0, w * .33, w, w * .33 + wv, w * .1, '#ffffff'); ctx.restore(); }
function flask(ctx, x, y, s, col) { path(ctx, [[x - s * .1, y - s], [x + s * .1, y - s], [x + s * .1, y - s * .6], [x + s * .4, y], [x - s * .4, y], [x - s * .1, y - s * .6]]); fillStroke(ctx, 'rgba(220,240,250,.5)', 6); ctx.save(); path(ctx, [[x - s * .25, y - s * .35], [x + s * .25, y - s * .35], [x + s * .4, y], [x - s * .4, y]]); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
function nobelCert(ctx, x, y, s, name) { rrect(ctx, x - s * .45, y - s * .6, s * .9, s * 1.2, 10); fillStroke(ctx, '#f5efd8', 6); text(ctx, 'NOBEL PRIZE', x, y - s * .42, s * .1, '#7a5a10', INK, 0); text(ctx, name, x, y - s * .25, s * .08, INK, INK, 0); medal(ctx, x, y + s * .15, s * .22); }
