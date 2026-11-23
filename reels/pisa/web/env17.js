// ---------- props for "How they saved the Leaning Tower" ----------
const MARBLE = '#f4efe2', MARBLE_SH = '#d9d0bc';
// the tower, pivoting at its base centre (x,y). ang>0 leans right. o: {cables, levels, crack}
function pisaTower(ctx, x, y, h, ang = .09, o = {}) {
  const w = h * .3, lv = o.levels || 8, base = h * .17, top = h * .12, mid = (h - base - top) / 6;
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  const storeys = []; let yy = 0;
  for (let i = 0; i < 8; i++) { const sh = i === 0 ? base : i === 7 ? top : mid; storeys.push([yy, sh, i === 7 ? w * .74 : w]); yy -= sh; }
  for (let i = 0; i < Math.min(lv, 8); i++) {
    const [y0, sh, ww] = storeys[i];
    rrect(ctx, -ww / 2, y0 - sh, ww, sh, 4); fillStroke(ctx, MARBLE, Math.max(4, h * .006));
    ctx.save(); ctx.globalAlpha = .5; ctx.fillStyle = MARBLE_SH; ctx.fillRect(ww * .18, y0 - sh + 3, ww * .32 - 3, sh - 6); ctx.restore();
    const n = i === 0 ? 5 : i === 7 ? 4 : 6, aw = ww / n;
    for (let k = 0; k < n; k++) {
      const ax = -ww / 2 + aw * (k + .5), ah = sh * (i === 0 ? .62 : .64), ay = y0 - sh * .14;
      ctx.beginPath(); ctx.moveTo(ax - aw * .3, ay); ctx.lineTo(ax - aw * .3, ay - ah + aw * .3); ctx.arc(ax, ay - ah + aw * .3, aw * .3, Math.PI, 0); ctx.lineTo(ax + aw * .3, ay); ctx.closePath();
      ctx.fillStyle = i === 0 ? '#c9bfa8' : '#5a5468'; ctx.fill(); ctx.lineWidth = Math.max(2, h * .003); ctx.strokeStyle = INK; ctx.stroke();
    }
    line(ctx, -ww / 2 - 6, y0 - sh, ww / 2 + 6, y0 - sh, Math.max(5, h * .009));
  }
  if (lv >= 8) { ctx.beginPath(); ctx.moveTo(-w * .37, yy); ctx.quadraticCurveTo(0, yy - top * .55, w * .37, yy); fillStroke(ctx, '#c8b89a', Math.max(4, h * .006)); }
  if (o.cables) { for (const yy2 of [-h * .45, -h * .55]) { ctx.save(); ctx.globalAlpha = o.cables; line(ctx, -w / 2, yy2, -w / 2 - h * .9, -h * .08, Math.max(4, h * .006), '#5a6070'); ctx.restore(); } for (const yy2 of [-h * .45, -h * .55]) { rrect(ctx, -w / 2 - 8, yy2 - 10, w + 16, 20, 6); fillStroke(ctx, '#7a8090', 4); } }
  if (o.crack) { ctx.save(); ctx.globalAlpha = o.crack; path(ctx, [[w * .1, -base * .2], [w * .2, -base * .5], [w * .05, -base * .8], [w * .22, -base * 1.2]], false); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
// cathedral dome behind, blue sky, green lawn
function piazza(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#3ea6ee', o.bot || '#d3f0fb', -400, 1300);
  if (o.sun !== false) { applyCam(ctx, cam, .1); drawSun(ctx, 860, 260, 70, t, 1); }
  applyCam(ctx, cam, .14); drawCloud(ctx, 160 + t * 8, 380, 90, 1); drawCloud(ctx, 760 + t * 5, 520, 70, 2);
  applyCam(ctx, cam, .4);
  rrect(ctx, -120, 980, 560, 260, 8); fillStroke(ctx, '#ece4d2', 6); for (let i = 0; i < 7; i++) { ctx.beginPath(); ctx.arc(-80 + i * 80, 1060, 22, Math.PI, 0); ctx.lineTo(-58 + i * 80, 1130); ctx.lineTo(-102 + i * 80, 1130); ctx.closePath(); ctx.fillStyle = '#8a8070'; ctx.fill(); }
  ctx.beginPath(); ctx.arc(160, 980, 120, Math.PI, 0); fillStroke(ctx, '#c8a46a', 6); line(ctx, 160, 860, 160, 820, 8);
  applyCam(ctx, cam, 1); ctx.fillStyle = o.grass || '#5ab85a'; ctx.fillRect(-1000, o.gy || 1240, 3000, 2000); line(ctx, -1000, o.gy || 1240, 3000, o.gy || 1240, 7);
}
// cross-section of the ground under the tower: soft clay under the right (south) side
function groundSection(ctx, y0, o = {}) {
  ctx.fillStyle = '#9a7a4a'; ctx.fillRect(-1000, y0, 3000, 2400);
  ctx.save(); ctx.beginPath(); ctx.ellipse(o.softX || 700, y0 + 260, 420, 230, 0, 0, TAU); ctx.fillStyle = '#6a5a7a'; ctx.fill(); ctx.restore();
  if (o.softLabel) { text(ctx, 'SOFT CLAY', o.softX || 700, y0 + 280, 46, '#ffffff', INK, 10); text(ctx, 'SOFT CLAY', o.softX || 700, y0 + 280, 46, '#ffffff', INK, 0); }
  ctx.fillStyle = '#5ab85a'; ctx.fillRect(-1000, y0 - 16, 3000, 24); line(ctx, -1000, y0 - 16, 3000, y0 - 16, 7);
}
function drillRig(ctx, x, y, len, ang, t, on = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
  rrect(ctx, -60, -70, 120, 90, 12); fillStroke(ctx, '#f2b52a', 6); circle(ctx, -30, 30, 18); fillStroke(ctx, '#333', 5); circle(ctx, 30, 30, 18); fillStroke(ctx, '#333', 5);
  rrect(ctx, -9, 10, 18, len, 6); fillStroke(ctx, '#9aa0aa', 5);
  for (let d = 20; d < len; d += 26) { const ph = (d + t * 200 * on) % 26; line(ctx, -10, 10 + d - ph * .3, 10, 22 + d - ph * .3, 4, '#5a606a'); }
  ctx.restore();
}
function soilPile(ctx, x, y, s) { if (s <= 1) return; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.quadraticCurveTo(x, y - s * 1.2, x + s, y); ctx.closePath(); fillStroke(ctx, '#9a7a4a', 6); }
function leadBlocks(ctx, x, y, n) { for (let i = 0; i < n; i++) { rrect(ctx, x - 90 + (i % 3) * 60, y - 40 - Math.floor(i / 3) * 40, 56, 38, 4); fillStroke(ctx, '#6a6e7a', 5); } }
function concreteRing(ctx, x, y, w) { rrect(ctx, x - w / 2, y - 30, w, 60, 8); fillStroke(ctx, '#b8b8b0', 6); for (let i = 0; i < 8; i++) circle(ctx, x - w / 2 + 20 + i * (w - 40) / 7, y, 5), ctx.fillStyle = '#8a8a84', ctx.fill(); }
function frost(ctx, x, y, w, t) { ctx.save(); ctx.globalAlpha = .75; rrect(ctx, x - w / 2, y, w, 220, 30); ctx.fillStyle = '#bfe8ff'; ctx.fill(); ctx.restore(); for (let i = 0; i < 7; i++) { const sx = x - w / 2 + 40 + i * (w - 80) / 6, sy = y + 60 + (i % 2) * 70; ctx.save(); ctx.translate(sx, sy); ctx.rotate(t + i); for (let k = 0; k < 3; k++) { ctx.rotate(Math.PI / 3); line(ctx, -22, 0, 22, 0, 5, '#ffffff'); } ctx.restore(); } }
function warnSign(ctx, x, y, s, txt = '!') { ctx.save(); ctx.translate(x, y); path(ctx, [[0, -s], [s * .9, s * .6], [-s * .9, s * .6]]); fillStroke(ctx, '#ffd23a', Math.max(5, s * .06)); text(ctx, txt, 0, s * .1, s * .9, INK, INK, 0); ctx.restore(); }
function barrier(ctx, x0, x1, y) { for (let x = x0; x <= x1; x += (x1 - x0) / 3) { line(ctx, x, y, x, y - 110, 10); } rrect(ctx, x0 - 10, y - 110, x1 - x0 + 20, 36, 6); fillStroke(ctx, '#ffffff', 5); ctx.save(); rrect(ctx, x0 - 10, y - 110, x1 - x0 + 20, 36, 6); ctx.clip(); for (let x = x0 - 40; x < x1 + 40; x += 60) { path(ctx, [[x, y - 110], [x + 30, y - 110], [x + 6, y - 74], [x - 24, y - 74]]); ctx.fillStyle = '#e0392f'; ctx.fill(); } ctx.restore(); }
function rulerV(ctx, x, y, h, mark) { rrect(ctx, x - 30, y - h, 60, h, 6); fillStroke(ctx, '#ffd23a', 5); for (let i = 0; i <= 10; i++) line(ctx, x - 30, y - h + i * h / 10, x - (i % 5 ? 10 : 0), y - h + i * h / 10, 4); }
function camera(ctx, x, y, s, flash = 0) { rrect(ctx, x - s / 2, y - s * .32, s, s * .64, s * .1); fillStroke(ctx, '#3a3a44', 5); circle(ctx, x, y, s * .22); fillStroke(ctx, '#6a8ac8', 5); if (flash > 0) burst(ctx, x + s * .3, y - s * .4, s * .5 * flash, 10, '#ffffff', 2); }
