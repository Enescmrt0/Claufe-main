// ---------- props for "The city standing on trees" (Venice) ----------
const PALAZZO = ['#e8a87c', '#d8705a', '#f2d29a', '#c8a0c8', '#e8c8a0', '#b8d0c8'];
function lagoonSky(ctx, t, cam, o = {}) { applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#5ab0e8', o.bot || '#ffe4c0', -400, 1300); if (o.sun !== false) { applyCam(ctx, cam, .1); drawSun(ctx, o.sunX || 860, o.sunY || 300, 70, t, 1); } applyCam(ctx, cam, .14); drawCloud(ctx, 180 + t * 6, 380, 80, 1, .9); drawCloud(ctx, 820 + t * 4, 520, 60, 2, .9); }
// a row of palazzi standing on the waterline wy, from x0 to x1
function palazzi(ctx, x0, x1, wy, seed = 1, o = {}) {
  const r = rng(seed); let x = x0;
  while (x < x1) {
    const w = 130 + r() * 90, h = 260 + r() * 220, col = PALAZZO[Math.floor(r() * PALAZZO.length)];
    rrect(ctx, x, wy - h, w, h, 4); fillStroke(ctx, col, 6);
    ctx.fillStyle = '#a84a3a'; ctx.fillRect(x - 6, wy - h - 14, w + 12, 18); line(ctx, x - 6, wy - h - 14, x + w + 6, wy - h - 14, 5);
    const cols = Math.max(2, Math.floor(w / 50)), rows = Math.max(2, Math.floor(h / 90));
    for (let i = 0; i < rows; i++) for (let k = 0; k < cols; k++) { const wx = x + (k + .5) * w / cols, wy2 = wy - h + 50 + i * (h - 70) / rows; ctx.beginPath(); ctx.moveTo(wx - 12, wy2 + 40); ctx.lineTo(wx - 12, wy2 + 10); ctx.arc(wx, wy2 + 10, 12, Math.PI, 0); ctx.lineTo(wx + 12, wy2 + 40); ctx.closePath(); ctx.fillStyle = o.lit ? '#ffd86a' : '#3a3a50'; ctx.fill(); }
    x += w + 4;
  }
}
function lagoonWater(ctx, wy, t, o = {}) {
  if (o.depth === 0) { ctx.save(); ctx.globalAlpha = .55; ctx.fillStyle = o.col || '#2aa0a8'; ctx.fillRect(-1000, wy, 3000, 112); ctx.restore(); } else { ctx.fillStyle = o.col || '#2aa0a8'; ctx.fillRect(-1000, wy, 3000, (o.depth || 2400)); } line(ctx, -1000, wy, 3000, wy, 6);
  ctx.save(); ctx.globalAlpha = .35; for (let i = 0; i < 14; i++) { const y = wy + 20 + (i % 4) * 26, x = ((i * 157 + t * 40) % 1300) - 100; line(ctx, x, y, x + 60, y, 5, '#ffffff'); } ctx.restore();
}
// cross-section under the city: water, then mud with posts, a stone slab on top
function underCity(ctx, wy, mudY, x0, x1, o = {}) {
  ctx.fillStyle = '#2aa0a8'; ctx.fillRect(-1000, wy, 3000, mudY - wy);
  ctx.fillStyle = o.mud || '#5a4a3a'; ctx.fillRect(-1000, mudY, 3000, 2400); line(ctx, -1000, mudY, 3000, mudY, 6);
  ctx.fillStyle = 'rgba(0,0,0,.12)'; for (let i = 0; i < 30; i++) { const r = rng(i * 3 + 1); ellipse(ctx, r() * 1200 - 60, mudY + 80 + r() * 700, 20 + r() * 26, 8 + r() * 8); ctx.fill(); }
  const n = o.n || 14, ph = o.posts == null ? 1 : o.posts;
  for (let i = 0; i < n; i++) { const k = clamp(ph * n - i); if (k <= 0) continue; const x = x0 + (i + .5) * (x1 - x0) / n, L = (o.len || 420) * k; pile(ctx, x, (o.top || mudY - 40), L, (x1 - x0) / n * .78, o.rot || 0); }
  if (o.slab) { rrect(ctx, x0 - 20, (o.top || mudY - 40) - 50, x1 - x0 + 40, 50, 6); fillStroke(ctx, '#eeeae0', 6); }
}
function pile(ctx, x, y, L, w, rot = 0) {
  ctx.save(); ctx.translate(x, y); rrect(ctx, -w / 2, 0, w, L - w * .6, 4); fillStroke(ctx, rot ? lerpCol('#a8743a', '#4a5a2a', rot) : '#a8743a', 5);
  path(ctx, [[-w / 2, L - w * .6], [w / 2, L - w * .6], [0, L]]); fillStroke(ctx, rot ? lerpCol('#a8743a', '#4a5a2a', rot) : '#a8743a', 5);
  line(ctx, -w * .15, 10, -w * .15, L - w * .8, 3, 'rgba(0,0,0,.25)'); ctx.restore();
}
function lerpCol(a, b, k) { const A = hex2rgb(a), B = hex2rgb(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; }
function tree(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  rrect(ctx, -s * .07, -s * .7, s * .14, s * .7, 6); fillStroke(ctx, '#8a5a32', Math.max(4, s * .02));
  if (!o.bare) { circle(ctx, 0, -s * .82, s * .3); fillStroke(ctx, '#3a8a4a', Math.max(4, s * .02)); circle(ctx, -s * .2, -s * .68, s * .2); fillStroke(ctx, '#3a8a4a', Math.max(4, s * .02)); circle(ctx, s * .2, -s * .68, s * .2); fillStroke(ctx, '#3a8a4a', Math.max(4, s * .02)); }
  ctx.restore();
}
function gondola(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 2) * 6); ctx.rotate(Math.sin(t * 1.5) * .02);
  ctx.beginPath(); ctx.moveTo(-s * .55, -s * .18); ctx.quadraticCurveTo(-s * .3, s * .05, 0, s * .04); ctx.quadraticCurveTo(s * .35, s * .05, s * .55, -s * .22); ctx.lineTo(s * .5, -s * .1); ctx.quadraticCurveTo(0, -s * .02, -s * .5, -s * .08); ctx.closePath(); fillStroke(ctx, '#1a1a22', 5);
  path(ctx, [[s * .52, -s * .2], [s * .6, -s * .3], [s * .58, -s * .2]]); fillStroke(ctx, '#d8d8e0', 4);
  const so = { cols: ['#ffffff', '#1a1a22'], hat: 'none', belt: false, x: -s * .25, y: -s * .06, s: s * .5, arms: { L: { ik: [.2, -.5] }, R: { ik: [.3, -.6] } }, face: { eyes: 'happy', mouth: 'smile' } }; drawStick(ctx, so);
  ctx.beginPath(); ctx.ellipse(-s * .25, -s * .06 - .765 * s * .5 - .12 * s * .5, .2 * s * .5, .04 * s * .5, 0, 0, TAU); fillStroke(ctx, '#e8d070', 3);
  line(ctx, -s * .25 + .25 * s * .5, -s * .06 - .55 * s * .5, s * .1, s * .2, 6, '#7a5236');
  ctx.restore();
}
// Santa Maria della Salute: octagonal drum + big dome + small dome
function salute(ctx, x, y, s) {
  rrect(ctx, x - s * .5, y - s * .45, s, s * .45, 6); fillStroke(ctx, '#f2eee4', 6);
  for (let i = 0; i < 5; i++) { rrect(ctx, x - s * .4 + i * s * .2 - 10, y - s * .4, 20, s * .35, 4); fillStroke(ctx, '#e0dccc', 4); }
  rrect(ctx, x - s * .3, y - s * .7, s * .6, s * .25, 6); fillStroke(ctx, '#f2eee4', 6);
  ctx.beginPath(); ctx.arc(x, y - s * .7, s * .3, Math.PI, 0); fillStroke(ctx, '#c8ccd0', 6); rrect(ctx, x - s * .06, y - s * 1.12, s * .12, s * .12, 4); fillStroke(ctx, '#f2eee4', 5); line(ctx, x, y - s * 1.12, x, y - s * 1.22, 6);
  for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sd * s * .3, y - s * .6); ctx.quadraticCurveTo(x + sd * s * .42, y - s * .55, x + sd * s * .5, y - s * .45); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); circle(ctx, x + sd * s * .42, y - s * .55, s * .04); fillStroke(ctx, '#f2eee4', 4); }
  ctx.beginPath(); ctx.arc(x + s * .62, y - s * .45, s * .14, Math.PI, 0); fillStroke(ctx, '#c8ccd0', 5); rrect(ctx, x + s * .48, y - s * .45, s * .28, s * .45, 4); fillStroke(ctx, '#f2eee4', 5);
}
function microbe(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); const wob = Math.sin(t * 6 + x) * .08;
  ctx.beginPath(); for (let i = 0; i <= 20; i++) { const a = i / 20 * TAU, r = s * (1 + .12 * Math.sin(a * 5 + t * 4)); i ? ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r * (1 + wob)) : ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); fillStroke(ctx, o.col || '#9ad86a', Math.max(3, s * .08));
  const sad = o.sad; circle(ctx, -s * .3, -s * .15, s * .16); ctx.fillStyle = '#fff'; ctx.fill(); circle(ctx, s * .3, -s * .15, s * .16); ctx.fill(); circle(ctx, -s * .28, -s * .12, s * .08); ctx.fillStyle = INK; ctx.fill(); circle(ctx, s * .32, -s * .12, s * .08); ctx.fill();
  ctx.beginPath(); if (sad) ctx.arc(0, s * .4, s * .25, Math.PI * 1.15, Math.PI * 1.85); else ctx.arc(0, s * .15, s * .25, Math.PI * .15, Math.PI * .85); ctx.lineWidth = Math.max(3, s * .07); ctx.strokeStyle = INK; ctx.stroke();
  if (o.fork) { line(ctx, s * .9, 0, s * 1.5, -s * .5, Math.max(3, s * .07)); for (let k = -1; k <= 1; k++) line(ctx, s * 1.5, -s * .5, s * 1.5 + k * s * .12, -s * .8, Math.max(3, s * .05)); }
  ctx.restore();
}
function o2Bubble(ctx, x, y, r, crossed = 0) { circle(ctx, x, y, r); ctx.fillStyle = 'rgba(190,230,255,.85)'; ctx.fill(); ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.stroke(); text(ctx, 'O₂', x, y + r * .05, r * .8, '#2a5a8a', INK, 0); if (crossed) { ctx.save(); ctx.globalAlpha = crossed; line(ctx, x - r, y - r, x + r, y + r, 16, '#e0392f'); ctx.restore(); } }
function mallet(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); line(ctx, 0, 0, 0, -s, s * .08, '#8a5a32'); rrect(ctx, -s * .28, -s * 1.15, s * .56, s * .26, 8); fillStroke(ctx, '#6a4a2a', 6); ctx.restore(); }
function axe(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); line(ctx, 0, 0, 0, -s, s * .07, '#8a5a32'); path(ctx, [[0, -s * .95], [s * .3, -s * 1.05], [s * .32, -s * .7], [0, -s * .8]]); fillStroke(ctx, '#b8c0c8', 5); ctx.restore(); }
