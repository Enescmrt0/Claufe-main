// ---------- props for "Why plane windows are round" ----------
// jet airliner in side view, nose to +x. s = fuselage length in px. o: { win: 'square'|'round', rot, smoke, gear, crowd }
const JET_BLUE = '#2a5bb8';
function jetBodyPath(ctx, L, h) {
  ctx.beginPath();
  ctx.moveTo(-L * .5, -h * .2);
  ctx.lineTo(-L * .42, -h * .55); ctx.lineTo(L * .33, -h * .55);
  ctx.quadraticCurveTo(L * .5, -h * .52, L * .52, -h * .02);
  ctx.quadraticCurveTo(L * .5, h * .48, L * .33, h * .5);
  ctx.lineTo(-L * .3, h * .5);
  ctx.quadraticCurveTo(-L * .45, h * .42, -L * .5, -h * .2); ctx.closePath();
}
function drawJet(ctx, x, y, s, o = {}) {
  const L = s, h = s * .115, lw = Math.max(3, s * .006);
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  if (o.flip) ctx.scale(-1, 1);
  // far wing + tailplane (behind)
  path(ctx, [[-L * .02, h * .1], [-L * .2, h * .1], [-L * .3, -h * .1], [-L * .12, -h * .1]]); fillStroke(ctx, '#aeb8c4', lw);
  // fin
  path(ctx, [[-L * .36, -h * .5], [-L * .5, -h * 2.0], [-L * .44, -h * 2.05], [-L * .26, -h * .5]]); fillStroke(ctx, JET_BLUE, lw);
  // fuselage
  jetBodyPath(ctx, L, h); fillStroke(ctx, '#f4f6f8', lw);
  ctx.save(); jetBodyPath(ctx, L, h); ctx.clip();
  ctx.fillStyle = '#d9dee5'; ctx.fillRect(-L, h * .12, L * 2, h);                       // belly shade
  ctx.fillStyle = JET_BLUE; ctx.fillRect(-L, -h * .2, L * 2, h * .07); ctx.fillRect(-L, h * .14, L * 2, h * .05);
  ctx.restore();
  // windows
  const n = 13, wy = -h * .04, wr = h * .12;
  for (let i = 0; i < n; i++) {
    const wx = -L * .28 + i * (L * .52 / (n - 1));
    if (o.win === 'round') { ellipse(ctx, wx, wy, wr * .85, wr * 1.05); }
    else { ctx.beginPath(); ctx.rect(wx - wr * .9, wy - wr * .9, wr * 1.8, wr * 1.8); }
    fillStroke(ctx, '#1f2a3d', lw * .6);
    if (o.faces) { circle(ctx, wx, wy + wr * .2, wr * .55); ctx.fillStyle = '#f6f1e8'; ctx.fill(); }
  }
  // cockpit
  path(ctx, [[L * .42, -h * .32], [L * .47, -h * .3], [L * .49, -h * .1], [L * .42, -h * .14]]); fillStroke(ctx, '#1f2a3d', lw * .6);
  // near wing with buried engine intakes
  path(ctx, [[L * .12, h * .2], [-L * .1, h * .3], [-L * .26, h * 1.15], [-L * .16, h * 1.2], [L * .05, h * .45]]); fillStroke(ctx, '#c8d0d9', lw);
  ellipse(ctx, L * .1, h * .3, h * .16, h * .11); fillStroke(ctx, '#2a2f38', lw * .6);
  ellipse(ctx, L * .06, h * .4, h * .14, h * .1); fillStroke(ctx, '#2a2f38', lw * .6);
  // tailplane (near)
  path(ctx, [[-L * .36, -h * .25], [-L * .5, -h * .1], [-L * .52, h * .05], [-L * .4, -h * .05]]); fillStroke(ctx, '#c8d0d9', lw);
  if (o.gear) for (const gx of [L * .3, -L * .02]) { line(ctx, gx, h * .45, gx, h * .95, lw * 1.2); circle(ctx, gx, h * 1.02, h * .14); fillStroke(ctx, '#2a2a2e', lw * .6); }
  ctx.restore();
}
// smoke trail behind a point
function smokeTrail(ctx, pts, t, col = 'rgba(70,70,80,') {
  for (let i = 0; i < pts.length; i++) { const [px, py] = pts[i]; const k = i / pts.length; circle(ctx, px + Math.sin(t * 3 + i) * 6, py, 18 + k * 50); ctx.fillStyle = col + (0.55 * (1 - k)) + ')'; ctx.fill(); }
}
// the jet torn in two: k 0..1 how far apart
function drawJetBreak(ctx, x, y, s, k, t, rot = 0) {
  const L = s;
  for (const part of [0, 1]) {
    ctx.save();
    const dx = (part ? 1 : -1) * k * L * .18, dy = k * k * L * .35 * (part ? .8 : 1.1), r = (part ? 1 : -1) * k * .5;
    ctx.translate(x + dx, y + dy); ctx.rotate(rot + r);
    ctx.beginPath(); if (part) ctx.rect(-L * .02, -L, L * 2, L * 2); else ctx.rect(-L * 2, -L, L * 1.98, L * 2); ctx.clip();
    drawJet(ctx, 0, 0, s);
    ctx.restore();
  }
  const R = rng(9);
  for (let i = 0; i < 14; i++) { const a = R() * TAU, d = k * L * (.1 + R() * .4); ctx.save(); ctx.translate(x + Math.cos(a) * d, y + Math.sin(a) * d + k * k * 200); ctx.rotate(t * 5 + i); ctx.fillStyle = i % 2 ? '#d9dee5' : '#aeb8c4'; ctx.fillRect(-10, -6, 20, 12); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.strokeRect(-10, -6, 20, 12); ctx.restore(); }
}
// construction hard hat on a stick figure (same anchor maths as the rig: head centre at -.765 s, radius .19 s)
function hardhat(ctx, o, col = '#ffc21a') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0);
  const hy = -.765 * s + (o.bob || 0) * s;
  ctx.beginPath(); ctx.arc(0, hy - .03 * s, .2 * s, Math.PI, 0); ctx.closePath(); fillStroke(ctx, col, Math.max(4, s * .012));
  ctx.beginPath(); ctx.roundRect(-.26 * s, hy - .05 * s, .52 * s, .05 * s, .02 * s); fillStroke(ctx, col, Math.max(4, s * .012));
  line(ctx, 0, hy - .22 * s, 0, hy - .06 * s, s * .02, '#e0a010');
  ctx.restore();
}
function magnifier(ctx, x, y, s, rot = -.6) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  line(ctx, 0, 0, 0, s * .9, s * .16, '#6b3f22');
  circle(ctx, 0, -s * .45, s * .45); ctx.fillStyle = 'rgba(190,230,255,.45)'; ctx.fill(); ctx.lineWidth = s * .12; ctx.strokeStyle = INK; ctx.stroke();
  ctx.restore();
}
function qmark(ctx, x, y, s, col = '#ffd23a') { text(ctx, '?', x, y, s, col, INK, s * .12); text(ctx, '?', x, y, s, col, INK, 0); }
// big water tank (front glass), x,y = bottom centre
function tankFrame(ctx, x, y, w, h) {
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h, w, h, 30); ctx.roundRect(x - w / 2 + 18, y - h + 18, w - 36, h - 36, 18);
  ctx.fillStyle = '#3d4a5a'; ctx.fill('evenodd'); ctx.lineWidth = 10; ctx.strokeStyle = INK; ctx.stroke();
  for (let i = 1; i < 4; i++) line(ctx, x - w / 2 + i * w / 4, y - h + 8, x - w / 2 + i * w / 4, y - 8, 8, 'rgba(255,255,255,.12)');
}
function drawTank(ctx, x, y, w, h, t, level = 1) {
  rrect(ctx, x - w / 2, y - h, w, h, 30); fillStroke(ctx, '#3d4a5a', 10);
  ctx.save(); rrect(ctx, x - w / 2 + 18, y - h + 18, w - 36, h - 36, 18); ctx.clip();
  ctx.fillStyle = '#2b3a4c'; ctx.fillRect(x - w, y - h, w * 2, h);
  const top = y - 18 - (h - 36) * level;
  const g = ctx.createLinearGradient(0, top, 0, y); g.addColorStop(0, 'rgba(70,170,230,.75)'); g.addColorStop(1, 'rgba(20,90,160,.85)');
  ctx.fillStyle = g; ctx.fillRect(x - w, top, w * 2, h);
  ctx.beginPath(); for (let i = 0; i <= 40; i++) { const px = x - w / 2 + i * w / 40, py = top + Math.sin(i * .8 + t * 3) * 6; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.stroke();
  const R = rng(4); for (let i = 0; i < 16; i++) { const bx = x - w / 2 + R() * w, by = y - ((t * 120 * (0.5 + R()) + R() * h) % (h * level)); circle(ctx, bx, by, 4 + R() * 6); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 3; ctx.stroke(); }
  ctx.restore();
  for (let i = 1; i < 4; i++) line(ctx, x - w / 2 + i * w / 4, y - h + 8, x - w / 2 + i * w / 4, y - 8, 8, 'rgba(255,255,255,.12)');
}
function drawGauge(ctx, x, y, r, frac, lab) {
  circle(ctx, x, y, r); fillStroke(ctx, '#f4f1e8', 8);
  for (let i = 0; i <= 8; i++) { const a = Math.PI * .8 + i / 8 * Math.PI * 1.4; line(ctx, x + Math.cos(a) * r * .72, y + Math.sin(a) * r * .72, x + Math.cos(a) * r * .88, y + Math.sin(a) * r * .88, 5); }
  ctx.beginPath(); ctx.arc(x, y, r * .8, Math.PI * 1.85, Math.PI * 2.2); ctx.lineWidth = r * .1; ctx.strokeStyle = '#e0392f'; ctx.stroke();
  const a = Math.PI * .8 + clamp(frac) * Math.PI * 1.4; line(ctx, x, y, x + Math.cos(a) * r * .7, y + Math.sin(a) * r * .7, 9, '#e0392f');
  circle(ctx, x, y, r * .1); fillStroke(ctx, INK, 0);
  if (lab) text(ctx, lab, x, y + r * .45, r * .26, INK, INK, 0);
}
function drawCrane(ctx, x, y, armX, hookY) {
  const col = '#f2b52a';
  ctx.beginPath(); ctx.rect(x - 30, y - 1500, 60, 1500); fillStroke(ctx, col, 8);
  for (let i = 0; i < 15; i++) line(ctx, x - 30, y - i * 100, x + 30, y - i * 100 - 100, 5);
  ctx.beginPath(); ctx.rect(x - 200, y - 1560, armX - x + 260, 60); fillStroke(ctx, col, 8);
  line(ctx, armX, y - 1500, armX, hookY, 6, '#333');
  ctx.beginPath(); ctx.arc(armX, hookY + 20, 22, -Math.PI * .1, Math.PI * 1.1); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke();
}
// a square of fuselage skin with rivets and an opening; crack grows from the top-right corner
function drawPanel(ctx, x, y, w, opening, shape = 'square', crack = 0, glowAmt = 0, t = 0) {
  rrect(ctx, x - w / 2, y - w / 2, w, w, 24); fillStroke(ctx, '#d3d9e0', 10);
  ctx.save(); rrect(ctx, x - w / 2, y - w / 2, w, w, 24); ctx.clip();
  const g = ctx.createLinearGradient(x - w / 2, y - w / 2, x + w / 2, y + w / 2); g.addColorStop(0, 'rgba(255,255,255,.4)'); g.addColorStop(1, 'rgba(0,0,0,.08)'); ctx.fillStyle = g; ctx.fillRect(x - w, y - w, w * 2, w * 2);
  for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) { if (i % 8 && j % 8 && (i - 4) ** 2 + (j - 4) ** 2 > 0) continue; circle(ctx, x - w * .44 + i * w * .11, y - w * .44 + j * w * .11, 5); ctx.fillStyle = '#9aa4ae'; ctx.fill(); }
  ctx.restore();
  const o = opening;
  if (glowAmt > 0) {
    const pts = shape === 'square' ? [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => [x + a * o / 2, y + b * o / 2]) : [];
    ctx.save(); ctx.globalCompositeOperation = 'source-over';
    if (shape === 'square') for (const [px, py] of pts) { const rg = ctx.createRadialGradient(px, py, 0, px, py, o * .55); rg.addColorStop(0, `rgba(255,40,30,${.85 * glowAmt})`); rg.addColorStop(.5, `rgba(255,140,40,${.45 * glowAmt})`); rg.addColorStop(1, 'rgba(255,200,60,0)'); ctx.fillStyle = rg; ctx.fillRect(px - o, py - o, o * 2, o * 2); }
    else { const rg = ctx.createRadialGradient(x, y, o * .45, x, y, o * .9); rg.addColorStop(0, `rgba(255,190,60,${.4 * glowAmt})`); rg.addColorStop(1, 'rgba(255,220,90,0)'); ctx.fillStyle = rg; ctx.fillRect(x - o, y - o, o * 2, o * 2); }
    ctx.restore();
  }
  if (shape === 'square') { ctx.beginPath(); ctx.rect(x - o / 2, y - o / 2, o, o); } else { ctx.beginPath(); ctx.roundRect(x - o / 2, y - o * .62, o, o * 1.24, o * .5); }
  const sky = ctx.createLinearGradient(0, y - o / 2, 0, y + o / 2); sky.addColorStop(0, '#5fb6f0'); sky.addColorStop(1, '#cdeefc');
  ctx.fillStyle = sky; ctx.fill(); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.stroke();
  if (crack > 0) {
    const R = rng(21); const pts = [[x + o / 2, y - o / 2]]; let cx = x + o / 2, cy = y - o / 2;
    const n = Math.ceil(crack * 9);
    for (let i = 0; i < n; i++) { cx += 24 + R() * 22; cy -= 14 + R() * 26; cx += (R() - .5) * 20; pts.push([cx, cy]); }
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.lineWidth = 3; ctx.strokeStyle = '#fff'; ctx.stroke();
  }
}
// stress "flow lines" through a plate with a hole: they crowd at sharp corners, glide round a curve
function stressLines(ctx, x, y, w, o, shape, t, col = 'rgba(40,60,120,.55)') {
  const n = 15;
  ctx.save(); rrect(ctx, x - w / 2, y - w / 2, w, w, 24); ctx.clip();
  for (let i = 0; i < n; i++) {
    const y0 = (i / (n - 1) - .5) * w * .92; if (Math.abs(y0) < o * .08) continue;
    ctx.beginPath();
    for (let k = 0; k <= 60; k++) {
      const xx = (k / 60 - .5) * w; let yy = y0;
      const a = o / 2;
      if (shape === 'square') { const dx = Math.max(0, Math.abs(xx) - a * .2); const push = a * a / (dx * dx + y0 * y0 * .6 + a * a * .25); yy = y0 + Math.sign(y0) * Math.min(a * 1.1, push * a * .55) * (Math.abs(xx) < a * 1.4 ? 1 : 1); }
      else { const r2 = xx * xx + y0 * y0; yy = y0 * (1 + a * a / Math.max(r2, a * a * .9) * .9); }
      k ? ctx.lineTo(x + xx, y + yy) : ctx.moveTo(x + xx, y + yy);
    }
    ctx.lineWidth = 4; ctx.strokeStyle = col; ctx.setLineDash([18, 12]); ctx.lineDashOffset = -t * 60; ctx.stroke();
  }
  ctx.restore(); ctx.setLineDash([]);
}
// cross-section of the cabin; inflate 0..1 swells it, arrows push out
function drawSection(ctx, x, y, r, inflate, t) {
  const R = r * (1 + inflate * .1);
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * TAU, d0 = R + 20, d1 = R + 30 + inflate * 90;
    if (inflate < .05) break;
    ctx.save(); ctx.globalAlpha = clamp(inflate * 1.5);
    line(ctx, x + Math.cos(a) * d0, y + Math.sin(a) * d0, x + Math.cos(a) * d1, y + Math.sin(a) * d1, 12, '#e0392f');
    ctx.save(); ctx.translate(x + Math.cos(a) * (d1 + 10), y + Math.sin(a) * (d1 + 10)); ctx.rotate(a); path(ctx, [[14, 0], [-12, -16], [-12, 16]]); fillStroke(ctx, '#e0392f', 4); ctx.restore();
    ctx.restore();
  }
  circle(ctx, x, y, R); fillStroke(ctx, '#f4f6f8', 14);
  circle(ctx, x, y, R * .86); fillStroke(ctx, '#ffe9c9', 6);
  ctx.save(); circle(ctx, x, y, R * .86); ctx.clip();
  ctx.fillStyle = '#9a6a4a'; ctx.fillRect(x - R, y + R * .25, R * 2, R);
  for (const sx of [-.5, -.18, .18, .5]) {
    rrect(ctx, x + sx * R - R * .1, y - R * .05, R * .2, R * .32, 14); fillStroke(ctx, '#2a5bb8', 5);
    circle(ctx, x + sx * R, y - R * .14, R * .11); fillStroke(ctx, '#f6f1e8', 5);
    circle(ctx, x + sx * R - R * .035, y - R * .15, R * .018); ctx.fillStyle = INK; ctx.fill(); circle(ctx, x + sx * R + R * .035, y - R * .15, R * .018); ctx.fill();
  }
  ctx.restore();
  for (const s of [-1, 1]) { ellipse(ctx, x + s * R * .93, y - R * .15, R * .05, R * .09); fillStroke(ctx, '#5fb6f0', 5); }
}
// paper clip seen flat; bend in radians; snapped splits it
function drawClip(ctx, x, y, s, bend, snapped = 0, face = 'tired') {
  const seg = (sx, sy, len, a) => { ctx.save(); ctx.translate(sx, sy); ctx.rotate(a); ctx.beginPath(); ctx.roundRect(-len * .02, -s * .12, len, s * .24, s * .12); ctx.lineWidth = s * .05; ctx.strokeStyle = '#b8c2cc'; ctx.stroke(); ctx.lineWidth = s * .012; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); };
  const gap = snapped * 40;
  seg(x - gap, y, -s, 0);
  seg(x + gap, y + snapped * 30, s, bend + snapped * .4);
  if (!snapped) {
    // a little tired face on the bend
    circle(ctx, x - 22, y - 4, 7); ctx.fillStyle = INK; ctx.fill(); circle(ctx, x + 22, y - 4, 7); ctx.fill();
    line(ctx, x - 34, y - 18, x - 12, y - 14, 5); line(ctx, x + 12, y - 14, x + 34, y - 18, 5);
    ctx.beginPath(); ctx.arc(x, y + 26, 14, Math.PI * 1.15, Math.PI * 1.85); ctx.lineWidth = 5; ctx.stroke();
  } else { burst(ctx, x, y + 10, 70 * snapped, 9, '#ffd23a', 4); }
}
function runway(ctx, y, t) {
  ctx.fillStyle = '#7ed05a'; ctx.fillRect(-2000, y, 5080, 2000);
  ctx.fillStyle = '#4b4f57'; ctx.fillRect(-2000, y + 30, 5080, 260);
  for (let i = -10; i < 30; i++) { ctx.fillStyle = '#f4f1e8'; ctx.fillRect(i * 160 - (t * 0) % 160, y + 150, 90, 16); }
}
function controlTower(ctx, x, y) {
  ctx.beginPath(); ctx.rect(x - 40, y - 420, 80, 420); fillStroke(ctx, '#e8e2d4', 7);
  ctx.beginPath(); ctx.moveTo(x - 110, y - 420); ctx.lineTo(x + 110, y - 420); ctx.lineTo(x + 80, y - 540); ctx.lineTo(x - 80, y - 540); ctx.closePath(); fillStroke(ctx, '#7fc8ef', 7);
  ctx.beginPath(); ctx.rect(x - 90, y - 560, 180, 24); fillStroke(ctx, '#4a5568', 6);
}
function planeSeat(ctx, x, y, s) {
  rrect(ctx, x - s * .35, y - s * 1.2, s * .7, s * 1.2, s * .15); fillStroke(ctx, '#2a5bb8', 7);
  rrect(ctx, x - s * .45, y - s * .4, s * .9, s * .4, s * .1); fillStroke(ctx, '#2448a0', 7);
}
