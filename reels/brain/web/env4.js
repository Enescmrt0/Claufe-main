// ---------- props for the "panic attack" reel (portrait 1080x1920) ----------
const PG = 1240; // ground line (feet) in portrait

// supermarket: wall, two shelf units full of products, tiled floor
function storeBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, 1);
  ctx.fillStyle = o.wall || '#fdf1dc'; ctx.fillRect(-2000, -2000, 5080, 2000 + PG - 40);
  ctx.fillStyle = '#ffd23a'; ctx.fillRect(-2000, 150, 5080, 46); ctx.fillStyle = '#e0392f'; ctx.fillRect(-2000, 196, 5080, 14);
  const R = rng(o.seed || 17); const COL = ['#e0392f', '#2f63c9', '#f2b52a', '#3fa35b', '#7a4bc4', '#ff8fc7', '#4db5f0'];
  for (const sx of [40, 580]) {
    rrect(ctx, sx, 300, 460, PG - 340, 12); fillStroke(ctx, '#c9a37a', 7);
    for (let r = 0; r < 4; r++) {
      const sy = 320 + r * 215; rrect(ctx, sx + 14, sy, 432, 195, 6); ctx.fillStyle = '#8a6a48'; ctx.fill();
      let x = sx + 24; while (x < sx + 420) { const w = 34 + R() * 34, h = 90 + R() * 80; rrect(ctx, x, sy + 190 - h, w, h, 6); fillStroke(ctx, COL[Math.floor(R() * COL.length)], 4); rrect(ctx, x + 5, sy + 190 - h * .62, w - 10, h * .22, 3); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill(); x += w + 8; }
      rrect(ctx, sx + 6, sy + 190, 448, 16, 5); fillStroke(ctx, '#e9d3b4', 4);
    }
  }
  ctx.fillStyle = o.floor || '#e6e9ef'; ctx.fillRect(-2000, PG - 40, 5080, 3000); line(ctx, -2000, PG - 40, 3080, PG - 40, 6);
  for (let i = -6; i < 16; i++) line(ctx, i * 150, PG - 40, i * 150 - 220, H + 400, 3, 'rgba(30,10,40,.12)');
  for (let j = 1; j < 6; j++) line(ctx, -2000, PG - 40 + j * j * 22, 3080, PG - 40 + j * j * 22, 3, 'rgba(30,10,40,.1)');
}
function drawMilk(ctx, x, y, s = 1, rot = 0) { // x,y = bottom centre
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  path(ctx, [[-44, -150], [0, -196], [44, -150]]); fillStroke(ctx, '#ffffff', 6); rrect(ctx, -44, -150, 88, 150, 8); fillStroke(ctx, '#ffffff', 6);
  rrect(ctx, -44, -100, 88, 56, 0); ctx.fillStyle = '#4db5f0'; ctx.fill(); line(ctx, -44, -100, 44, -100, 5); line(ctx, -44, -44, 44, -44, 5); text(ctx, 'MILK', 0, -70, 26, '#fff');
  ctx.restore();
}
function drawCheckout(ctx, x, y) { // x = left edge
  rrect(ctx, x, y - 250, 560, 250, 16); fillStroke(ctx, '#9fb3c8', 7); rrect(ctx, x - 20, y - 280, 600, 40, 12); fillStroke(ctx, '#3a3f4d', 6);
  rrect(ctx, x + 380, y - 430, 150, 130, 12); fillStroke(ctx, '#23262f', 6); rrect(ctx, x + 394, y - 416, 122, 86, 6); ctx.fillStyle = '#7dffb0'; ctx.fill(); rrect(ctx, x + 440, y - 300, 30, 24, 4); fillStroke(ctx, '#23262f', 5);
}
// rotating warning light; on 0..1
function drawSiren(ctx, x, y, s, on, t) {
  if (on > 0) { ctx.save(); ctx.translate(x, y - s * .5); ctx.rotate(t * 5); ctx.globalAlpha = .55 * on; for (let i = 0; i < 2; i++) { ctx.rotate(Math.PI); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(s * 3, -s * .9); ctx.lineTo(s * 3, s * .9); ctx.closePath(); ctx.fillStyle = '#ff5a5a'; ctx.fill(); } ctx.restore(); }
  ctx.beginPath(); ctx.arc(x, y - s * .35, s * .6, Math.PI, 0); ctx.lineTo(x + s * .6, y); ctx.lineTo(x - s * .6, y); ctx.closePath(); fillStroke(ctx, on > .3 ? '#ff4a4a' : '#8a3a3a', Math.max(4, s * .08));
  rrect(ctx, x - s * .8, y, s * 1.6, s * .3, s * .08); fillStroke(ctx, '#3a3f4d', Math.max(4, s * .08));
  if (on > .3) { ellipse(ctx, x - s * .2, y - s * .55, s * .14, s * .22, -.5); ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fill(); }
}
// cartoon tiger head; ghost = dashed outline only ("no tiger here")
function drawTiger(ctx, x, y, s, ghost = false) {
  if (ghost) { ctx.save(); ctx.setLineDash([s * .14, s * .12]); circle(ctx, x, y, s); ctx.lineWidth = s * .08; ctx.strokeStyle = 'rgba(255,255,255,.85)'; ctx.stroke(); for (const sd of [-1, 1]) { circle(ctx, x + sd * s * .72, y - s * .78, s * .3); ctx.stroke(); } ctx.restore(); return; }
  for (const sd of [-1, 1]) { circle(ctx, x + sd * s * .72, y - s * .78, s * .3); fillStroke(ctx, '#f08a2a', s * .07); circle(ctx, x + sd * s * .72, y - s * .78, s * .14); ctx.fillStyle = '#ffd9b0'; ctx.fill(); }
  circle(ctx, x, y, s); fillStroke(ctx, '#f08a2a', s * .07);
  ctx.save(); circle(ctx, x, y, s); ctx.clip(); for (const sd of [-1, 1]) for (let i = 0; i < 3; i++) { path(ctx, [[x + sd * s * 1.05, y - s * .5 + i * s * .42], [x + sd * s * .5, y - s * .38 + i * s * .42], [x + sd * s * 1.05, y - s * .22 + i * s * .42]]); ctx.fillStyle = INK; ctx.fill(); } path(ctx, [[x - s * .14, y - s * 1.05], [x, y - s * .55], [x + s * .14, y - s * 1.05]]); ctx.fill(); ctx.restore();
  ellipse(ctx, x, y + s * .42, s * .48, s * .36); fillStroke(ctx, '#fff3e0', s * .05);
  for (const sd of [-1, 1]) { ellipse(ctx, x + sd * s * .38, y - s * .12, s * .16, s * .2); fillStroke(ctx, '#ffe14d', s * .05); ellipse(ctx, x + sd * s * .38, y - s * .12, s * .05, s * .17); ctx.fillStyle = INK; ctx.fill(); line(ctx, x + sd * s * .18, y - s * .42, x + sd * s * .6, y - s * .34, s * .07); }
  path(ctx, [[x - s * .12, y + s * .26], [x + s * .12, y + s * .26], [x, y + s * .4]]); ctx.fillStyle = INK; ctx.fill();
  path(ctx, [[x - s * .22, y + s * .56], [x - s * .12, y + s * .74], [x - s * .02, y + s * .56]]); fillStroke(ctx, '#fff', s * .04); path(ctx, [[x + s * .22, y + s * .56], [x + s * .12, y + s * .74], [x + s * .02, y + s * .56]]); fillStroke(ctx, '#fff', s * .04);
}
function drawBolt(ctx, x, y, s, col = '#ffd23a', rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); path(ctx, [[0, -s], [s * .5, -s * .12], [s * .1, -s * .12], [s * .42, s], [-s * .5, s * .1], [-s * .08, s * .1]]); fillStroke(ctx, col, Math.max(3, s * .1)); ctx.restore(); }
// thought bubble at (x,y) with tail going down-left toward (tx,ty)
function thought(ctx, x, y, s, tx, ty) { for (let i = 1; i <= 2; i++) { circle(ctx, lerp(tx, x - s * .7, i / 3), lerp(ty, y + s * .6, i / 3), s * (.06 + i * .04)); fillStroke(ctx, '#ffffff', 6); } ctx.save(); cloudShape(ctx, x, y, s, 12); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.stroke(); cloudShape(ctx, x, y, s, 12); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
