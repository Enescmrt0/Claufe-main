// ---------- props for "The birthday bet" (the birthday paradox) ----------
const KCOL = ['#e0392f', '#2f7de0', '#3aa35b', '#f2b52a', '#8a4fd0', '#ff7a3a', '#1fb5b0', '#e05a9a'];
const BDAYS = ['JAN 9', 'FEB 2', 'MAR 14', 'APR 30', 'MAY 7', 'JUN 21', 'JUL 4', 'AUG 18', 'SEP 3', 'OCT 27', 'NOV 11', 'DEC 5', 'JAN 25', 'FEB 19', 'MAR 14', 'MAY 28', 'JUN 2', 'JUL 16', 'AUG 8', 'SEP 23', 'OCT 1', 'NOV 30', 'DEC 19'];
const MATCH = [2, 14];
// 23 kids in four rows (back row smaller). returns [{x,y,s,i}]
function kidSpots(y0 = 1000) {
  const rows = [5, 6, 6, 6], out = []; let i = 0;
  rows.forEach((n, r) => { const s = 172 + r * 28, y = y0 + r * 170; for (let k = 0; k < n; k++) out.push({ x: 540 + (k - (n - 1) / 2) * (r === 0 ? 170 : 165), y, s, i: i++ }); });
  return out;
}
function drawKids(ctx, t, spots, o = {}) {
  for (const p of spots) {
    const on = o.hi ? o.hi(p.i) : 0, laugh = o.laugh ? Math.abs(Math.sin(t * 9 + p.i)) : 0;
    const face = o.face ? o.face(p.i) : { eyes: on ? 'wide' : 'normal', mouth: on ? 'o' : 'smile', look: [0, 0] };
    if (on) { ctx.save(); ctx.globalAlpha = .45 * on; circle(ctx, p.x, p.y - p.s * .72, p.s * .42); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore(); }
    drawStick(ctx, { cols: [KCOL[p.i % 8], KCOL[p.i % 8]], hat: 'none', belt: false, x: p.x, y: p.y - laugh * 10, s: p.s, arms: o.arms ? o.arms(p.i) : POSE.idle.arms, face });
  }
}
function dateTag(ctx, x, y, str, k = 1, col = '#ffffff') { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k * 1.35, k * 1.35); rrect(ctx, -78, -34, 156, 62, 14); fillStroke(ctx, col, 5); text(ctx, str, 0, 0, 30, INK, INK, 0); ctx.restore(); }
function cake(ctx, x, y, s, t = 0) {
  rrect(ctx, x - s * .5, y - s * .45, s, s * .45, s * .06); fillStroke(ctx, '#f4c6d8', Math.max(4, s * .03));
  ctx.beginPath(); ctx.moveTo(x - s * .5, y - s * .3); for (let i = 0; i <= 8; i++) ctx.quadraticCurveTo(x - s * .5 + (i - .5) * s / 8, y - s * .2, x - s * .5 + i * s / 8, y - s * .3); ctx.lineWidth = s * .03; ctx.strokeStyle = '#fff'; ctx.stroke();
  for (const dx of [-.25, 0, .25]) { ctx.beginPath(); ctx.rect(x + dx * s - s * .025, y - s * .62, s * .05, s * .17); fillStroke(ctx, '#7ac8ff', Math.max(3, s * .015)); ellipse(ctx, x + dx * s, y - s * .67 + Math.sin(t * 12 + dx * 9) * 2, s * .03, s * .055); ctx.fillStyle = '#ffb12a'; ctx.fill(); }
}
function calendarGrid(ctx, x, y, w, filled = 0, mark = []) {
  const cols = 21, rows = Math.ceil(365 / cols), c = w / cols;
  rrect(ctx, x - w / 2 - 20, y - 20, w + 40, rows * c + 40, 20); fillStroke(ctx, '#ffffff', 7);
  for (let d = 0; d < 365; d++) { const cx = x - w / 2 + (d % cols) * c, cy = y + Math.floor(d / cols) * c; ctx.fillStyle = d < filled ? '#ffd23a' : (mark.includes(d) ? '#e0392f' : '#e8ecf2'); ctx.fillRect(cx + 2, cy + 2, c - 4, c - 4); }
}
function dollarBill(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s / 2, -s * .22, s, s * .44, s * .04); fillStroke(ctx, '#8fd18a', Math.max(4, s * .025)); ellipse(ctx, 0, 0, s * .12, s * .15); fillStroke(ctx, '#5aa95a', 3); text(ctx, '$5', 0, 0, s * .16, '#1f5a2a', INK, 0); text(ctx, '5', -s * .38, -s * .12, s * .1, '#1f5a2a', INK, 0); text(ctx, '5', s * .38, s * .12, s * .1, '#1f5a2a', INK, 0); ctx.restore(); }
function coin(ctx, x, y, r, spin = 0, face = 'H') { const sx = Math.cos(spin); ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(.06, Math.abs(sx)), 1); circle(ctx, 0, 0, r); fillStroke(ctx, sx > 0 ? '#ffd23a' : '#e8b820', 8); circle(ctx, 0, 0, r * .78); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(34,28,34,.4)'; ctx.stroke(); text(ctx, sx > 0 ? face : (face === 'H' ? 'T' : 'H'), 0, 4, r * .9, INK, INK, 0); ctx.restore(); }
// pair web: n points on a circle, draws the first k pair lines (in a fixed order)
function pairWeb(ctx, cx, cy, R, n, k, hiPair = null, onlyFrom = -1) {
  const P = []; for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + i / n * TAU; P.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]); }
  let c = 0; ctx.lineWidth = 3;
  for (let i = 0; i < n && c < k; i++) for (let j = i + 1; j < n && c < k; j++) { if (onlyFrom >= 0 && i !== onlyFrom) continue; ctx.strokeStyle = `hsla(${(c * 7) % 360},80%,62%,.75)`; ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]); ctx.lineTo(P[j][0], P[j][1]); ctx.stroke(); c++; }
  if (hiPair) line(ctx, P[hiPair[0]][0], P[hiPair[0]][1], P[hiPair[1]][0], P[hiPair[1]][1], 12, '#ffd23a');
  P.forEach(([x, y], i) => { circle(ctx, x, y, 30); fillStroke(ctx, KCOL[i % 8], 6); circle(ctx, x - 9, y - 4, 4); ctx.fillStyle = INK; ctx.fill(); circle(ctx, x + 9, y - 4, 4); ctx.fill(); });
  return P;
}
function oddsBar(ctx, x, y, w, h, frac, col, lab, top) { rrect(ctx, x, y - h, w, h, 16); ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.fill(); if (frac > .01) { rrect(ctx, x, y - h * frac, w, h * frac, 16); fillStroke(ctx, col, 7); } text(ctx, top, x + w / 2, y - h * frac - 50, 70, col, INK, 14); text(ctx, top, x + w / 2, y - h * frac - 50, 70, col, INK, 0); text(ctx, lab, x + w / 2, y + 60, 54, '#ffffff', INK, 0); }
