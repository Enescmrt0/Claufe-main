// ---------- props for "The bridge that danced itself apart" (Tacoma Narrows, 1940) ----------
const WL = 1180; // water line
function pugetSky(ctx, t, cam, o = {}) { applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#5fb6f0', o.bot || '#e6f2fa', -400, 1300); applyCam(ctx, cam, .14); for (let i = 0; i < 4; i++) drawCloud(ctx, ((i * 330 + t * (o.wind || 8)) % 1500) - 200, 200 + (i % 2) * 120, 100, i + 1, .9); }
function narrowsWater(ctx, t, o = {}) {
  const g = ctx.createLinearGradient(0, WL, 0, WL + 800); g.addColorStop(0, o.top || '#3a7aa8'); g.addColorStop(1, o.bot || '#1a4a6a'); ctx.fillStyle = g; ctx.fillRect(-2000, WL, 5080, 2000);
  ctx.lineCap = 'round'; for (let i = 0; i < 18; i++) { const x = ((i * 157 + t * 40) % 1400) - 160, y = WL + 30 + (i * 53) % 500; line(ctx, x, y, x + 60, y, 5, 'rgba(255,255,255,.35)'); }
}
function cliffs(ctx) { path(ctx, [[-300, WL + 40], [-300, 700], [40, 760], [150, 900], [210, WL + 40]]); fillStroke(ctx, '#4a7a4a', 8); path(ctx, [[1380, WL + 40], [1380, 720], [1050, 780], [930, 920], [870, WL + 40]]); fillStroke(ctx, '#4a7a4a', 8); for (const [x, y] of [[-40, 740], [40, 730], [1100, 760], [1220, 740]]) { path(ctx, [[x - 40, y], [x, y - 120], [x + 40, y]]); fillStroke(ctx, '#2f5a3a', 5); } }
// side view of the span between x0..x1. deckY = rest height. wave(x) -> vertical offset; twist(x) -> -1..1 edge tilt
function suspBridge(ctx, x0, x1, deckY, wave, twist = () => 0, o = {}) {
  const towers = [x0 + (x1 - x0) * .18, x1 - (x1 - x0) * .18], top = deckY - 420;
  for (const tx of towers) { ctx.beginPath(); ctx.rect(tx - 22, top, 44, WL - top + 20); fillStroke(ctx, '#6a7a8a', 7); line(ctx, tx - 22, top + 100, tx + 22, top + 100, 6, INK); line(ctx, tx - 22, top + 260, tx + 22, top + 260, 6, INK); }
  const N = 60, pts = [];
  for (let i = 0; i <= N; i++) { const x = lerp(x0, x1, i / N); pts.push([x, deckY + wave(x), twist(x)]); }
  // main cable
  ctx.beginPath(); for (let i = 0; i <= N; i++) { const x = lerp(x0, x1, i / N); let y; if (x < towers[0]) y = lerp(deckY - 40, top, (x - x0) / (towers[0] - x0)); else if (x > towers[1]) y = lerp(top, deckY - 40, (x - towers[1]) / (x1 - towers[1])); else { const q = (x - towers[0]) / (towers[1] - towers[0]); y = top + Math.sin(q * Math.PI) * 340 + wave(x) * .6; } i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); if (i % 3 === 0 && x > towers[0] && x < towers[1]) pts[i].cy = y; } ctx.lineWidth = 9; ctx.strokeStyle = INK; ctx.stroke();
  for (const p of pts) if (p.cy != null) line(ctx, p[0], p.cy, p[0], p[1] - 14, 3, 'rgba(34,28,34,.7)');
  // deck as a band: near edge and far edge separate when it twists
  if (o.gap) { const [ga, gb] = o.gap; ctx.save(); ctx.beginPath(); ctx.rect(-2000, -2000, ga + 2000, 5000); ctx.rect(gb, -2000, 4000, 5000); ctx.clip(); }
  ctx.beginPath(); pts.forEach(([x, y, tw], i) => { const yy = y - 16 - tw * 34; i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }); for (let i = N; i >= 0; i--) { const [x, y, tw] = pts[i]; ctx.lineTo(x, y + 16 + tw * 34); } ctx.closePath(); fillStroke(ctx, '#8a9aa8', 7);
  ctx.beginPath(); pts.forEach(([x, y, tw], i) => { const yy = y - 16 - tw * 34; i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }); ctx.lineWidth = 10; ctx.strokeStyle = '#d8dee4'; ctx.stroke();
  if (o.gap) ctx.restore();
  return (x) => { const i = clamp(Math.round((x - x0) / (x1 - x0) * N), 0, N); return pts[i][1] - 16 - pts[i][2] * 34; };
}
function oldCar(ctx, x, y, s, col = '#2a2a30', rot = 0, dog = false) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(-s * .5, 0); ctx.lineTo(-s * .5, -s * .22); ctx.quadraticCurveTo(-s * .44, -s * .28, -s * .28, -s * .3); ctx.lineTo(-s * .18, -s * .5); ctx.lineTo(s * .16, -s * .5); ctx.lineTo(s * .28, -s * .3); ctx.quadraticCurveTo(s * .48, -s * .28, s * .5, -s * .16); ctx.lineTo(s * .5, 0); ctx.closePath(); fillStroke(ctx, col, Math.max(4, s * .025));
  rrect(ctx, -s * .14, -s * .46, s * .14, s * .14, 6); fillStroke(ctx, '#bfe4ff', Math.max(3, s * .02)); rrect(ctx, s * .02, -s * .46, s * .13, s * .14, 6); fillStroke(ctx, '#bfe4ff', Math.max(3, s * .02));
  if (dog) { ctx.save(); ctx.beginPath(); ctx.rect(s * .02, -s * .46, s * .13, s * .14); ctx.clip(); circle(ctx, s * .09, -s * .36, s * .055); ctx.fillStyle = '#1f1a1a'; ctx.fill(); ellipse(ctx, s * .055, -s * .4, s * .02, s * .04); ctx.fill(); ctx.restore(); }
  for (const wx of [-.3, .3]) { circle(ctx, wx * s, 0, s * .1); fillStroke(ctx, '#15151a', Math.max(3, s * .02)); circle(ctx, wx * s, 0, s * .04); ctx.fillStyle = '#c8c8c8'; ctx.fill(); }
  ctx.restore();
}
function windLines(ctx, t, strength = 1, y0 = 300, y1 = 1100, col = 'rgba(255,255,255,.75)') { for (let i = 0; i < 14 * strength; i++) { const y = y0 + ((i * 97) % (y1 - y0)), x = ((i * 211 + t * 700 * strength) % 1600) - 300, w = 80 + strength * 120; ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + w / 2, y - 18 * Math.sin(t * 3 + i), x + w, y); ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke(); } ctx.globalAlpha = 1; }
function blackDog(ctx, x, y, s) { ellipse(ctx, x, y - s * .35, s * .42, s * .22); fillStroke(ctx, '#1f1a1a', 5); circle(ctx, x + s * .42, y - s * .55, s * .2); fillStroke(ctx, '#1f1a1a', 5); ellipse(ctx, x + s * .33, y - s * .6, s * .08, s * .16, .4); fillStroke(ctx, '#2a2222', 4); for (const lx of [-.25, -.1, .15, .3]) line(ctx, x + lx * s, y - s * .2, x + lx * s, y, s * .07, '#1f1a1a'); circle(ctx, x + s * .48, y - s * .58, s * .03); ctx.fillStyle = '#fff'; ctx.fill(); path(ctx, [[x - s * .4, y - s * .4], [x - s * .6, y - s * .55], [x - s * .42, y - s * .32]]); ctx.fillStyle = '#1f1a1a'; ctx.fill(); }
function pawPrint(ctx, x, y, s, col = '#ffffff') { ellipse(ctx, x, y + s * .15, s * .32, s * .26); ctx.fillStyle = col; ctx.fill(); for (const [dx, dy] of [[-.32, -.18], [-.12, -.36], [.12, -.36], [.32, -.18]]) { ellipse(ctx, x + dx * s, y + dy * s, s * .11, s * .14); ctx.fill(); } }
function wingSection(ctx, x, y, w, rot = 0, flat = false) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); if (flat) { ctx.beginPath(); ctx.rect(-w / 2, -w * .06, w, w * .12); fillStroke(ctx, '#8a9aa8', 8); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.rect(sx * w / 2 - (sx > 0 ? w * .04 : 0), -w * .16, w * .04, w * .3); fillStroke(ctx, '#6a7a8a', 6); } } else { ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.bezierCurveTo(-w * .4, -w * .2, w * .3, -w * .14, w / 2, 0); ctx.bezierCurveTo(w * .2, w * .04, -w * .4, w * .06, -w / 2, 0); fillStroke(ctx, '#d8dee4', 8); } ctx.restore(); }
function windTunnel(ctx, x, y, w, h, t) { rrect(ctx, x - w / 2, y - h / 2, w, h, 30); fillStroke(ctx, '#5a6a7a', 10); rrect(ctx, x - w / 2 + 30, y - h / 2 + 30, w - 60, h - 60, 16); fillStroke(ctx, '#cfe6f4', 6); ctx.save(); ctx.translate(x - w / 2 + 70, y); ctx.rotate(t * 20); for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ellipse(ctx, 0, -40, 18, 40); fillStroke(ctx, '#3a3d44', 4); } ctx.restore(); circle(ctx, x - w / 2 + 70, y, 14); fillStroke(ctx, '#e0392f', 4); }
