// ---------- props for "Mike the Headless Chicken" (Fruita, Colorado, 1945) ----------
// chicken standing at feet (x,y), size s, facing right. o: {headless, walk, t, flip, peck, preen, flap, blink}
function chicken(ctx, x, y, s, o = {}) {
  const t = o.t || 0, f = o.flip || 1, ph = t * 9 * (o.walk || 0);
  ctx.save(); ctx.translate(x, y - (o.walk ? Math.abs(Math.sin(ph)) * s * .03 : 0)); ctx.scale(f, 1);
  const lw = Math.max(3, s * .014);
  for (const k of [0, 1]) { const sw = o.walk ? Math.sin(ph + k * Math.PI) * s * .08 : (k ? s * .04 : -s * .04); line(ctx, -s * .02 + k * s * .06, -s * .3, sw + k * s * .04, 0, s * .025, '#e8a02a'); for (const d of [-1, 0, 1]) line(ctx, sw + k * s * .04, 0, sw + k * s * .04 + s * .07, d * s * .03, lw, '#e8a02a'); }
  // tail
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(-s * .28, -s * .5); ctx.rotate(-1.1 + i * .3); ellipse(ctx, 0, -s * .14, s * .06, s * .17); fillStroke(ctx, ['#3a3a44', '#7a3a2a', '#3a3a44'][i], lw); ctx.restore(); }
  // body
  ctx.beginPath(); ctx.ellipse(0, -s * .45, s * .3, s * .22, -.15, 0, TAU); fillStroke(ctx, '#ffffff', lw);
  const flap = o.flap ? Math.sin(t * 20) * .6 : (o.preen ? .4 + Math.sin(t * 6) * .2 : 0);
  ctx.save(); ctx.translate(-s * .02, -s * .48); ctx.rotate(-flap); ellipse(ctx, -s * .02, s * .03, s * .17, s * .1, .2); fillStroke(ctx, '#f2ece0', lw); ctx.restore();
  // neck
  const pk = o.peck ? Math.max(0, Math.sin(t * 7)) : 0, pr = o.preen ? 1 : 0;
  const nx = s * .2 + pk * s * .14 - pr * s * .1, ny = -s * .78 + pk * s * .34 + pr * s * .12;
  ctx.beginPath(); ctx.moveTo(s * .14, -s * .58); ctx.quadraticCurveTo(s * .26, -s * .64, nx, ny); ctx.lineWidth = s * .13; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = s * .13 - lw * 2; ctx.strokeStyle = '#ffffff'; ctx.stroke();
  if (o.headless) { ellipse(ctx, nx, ny - s * .02, s * .058, s * .03); fillStroke(ctx, '#f2c0b0', lw * .8); for (let i = 0; i < 3; i++) line(ctx, nx - s * .04 + i * s * .04, ny - s * .05, nx - s * .05 + i * s * .05, ny - s * .1, lw * .7, '#f2ece0'); }
  else {
    circle(ctx, nx + s * .02, ny - s * .06, s * .11); fillStroke(ctx, '#ffffff', lw);
    for (let i = 0; i < 3; i++) { circle(ctx, nx - s * .03 + i * s * .05, ny - s * .17 - (i === 1 ? s * .02 : 0), s * .04); fillStroke(ctx, '#e0392f', lw * .7); }
    path(ctx, [[nx + s * .12, ny - s * .08], [nx + s * .2, ny - s * .05], [nx + s * .12, ny - s * .02]]); fillStroke(ctx, '#f2b52a', lw * .8);
    ellipse(ctx, nx + s * .1, ny + s * .03, s * .025, s * .045); fillStroke(ctx, '#e0392f', lw * .6);
    if (!o.blink) { circle(ctx, nx + s * .05, ny - s * .08, s * .022); ctx.fillStyle = INK; ctx.fill(); }
  }
  ctx.restore();
  return [x + f * (o.headless ? 0 : 0), y];
}
function farmBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#5ab0e8', o.bot || '#e8f4ff', -400, 1300);
  if (o.sun !== false) { applyCam(ctx, cam, .1); drawSun(ctx, 880, 300, 70, t, 1); }
  applyCam(ctx, cam, .14); drawCloud(ctx, 160 + t * 6, 420, 80, 1, .9); drawCloud(ctx, 760 + t * 4, 540, 60, 2, .9);
  applyCam(ctx, cam, .3); ellipse(ctx, 300, 1200, 700, 220); fillStroke(ctx, '#7ab85a', 6); ellipse(ctx, 980, 1210, 560, 180); fillStroke(ctx, '#6aa84a', 6);
  applyCam(ctx, cam, .5); barn(ctx, 820, 1180, 360);
  applyCam(ctx, cam, 1); ctx.fillStyle = o.ground || '#c8a060'; ctx.fillRect(-1000, 1240, 3000, 1000); line(ctx, -1000, 1240, 3000, 1240, 7);
  for (let x = -100; x < 1200; x += 130) { line(ctx, x, 1240, x, 1130, 10, '#8a5a32'); } line(ctx, -100, 1160, 1200, 1160, 7, '#8a5a32'); line(ctx, -100, 1200, 1200, 1200, 7, '#8a5a32');
}
function barn(ctx, x, y, s) { path(ctx, [[x - s * .5, y], [x - s * .5, y - s * .55], [x - s * .3, y - s * .8], [x + s * .3, y - s * .8], [x + s * .5, y - s * .55], [x + s * .5, y]]); fillStroke(ctx, '#c8322c', 6); rrect(ctx, x - s * .18, y - s * .4, s * .36, s * .4, 4); fillStroke(ctx, '#f2ece0', 5); line(ctx, x - s * .18, y - s * .4, x + s * .18, y, 4); line(ctx, x + s * .18, y - s * .4, x - s * .18, y, 4); }
function farmer(ctx, o) { const so = Object.assign({ cols: ['#3a5a9a', '#3a5a9a'], hat: 'none', belt: false }, o); drawStick(ctx, so); const s = so.s; ctx.save(); ctx.translate(so.x, so.y); ctx.scale(so.flip || 1, 1); const hy = -.765 * s; ctx.beginPath(); ctx.ellipse(0, hy - .15 * s, .3 * s, .05 * s, 0, 0, TAU); fillStroke(ctx, '#e8c86a', Math.max(3, s * .011)); ctx.beginPath(); ctx.ellipse(0, hy - .19 * s, .15 * s, .09 * s, 0, Math.PI, 0); fillStroke(ctx, '#e8c86a', Math.max(3, s * .011)); line(ctx, -.15 * s, hy - .17 * s, .15 * s, hy - .17 * s, s * .02, '#c8322c'); ctx.restore(); return so; }
function axeTool(ctx, x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); line(ctx, 0, 0, 0, -s, s * .07, '#8a5a32'); path(ctx, [[0, -s * .95], [s * .3, -s * 1.05], [s * .32, -s * .7], [0, -s * .8]]); fillStroke(ctx, '#b8c0c8', 5); ctx.restore(); }
function eyedropper(ctx, x, y, s, rot = 0, drip = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s * .06, -s * .5, s * .12, s * .55, s * .05); fillStroke(ctx, 'rgba(220,240,255,.9)', 4); ctx.save(); ctx.beginPath(); ctx.rect(-s * .06, -s * .2, s * .12, s * .25); ctx.clip(); ctx.fillStyle = '#ffffff'; ctx.fillRect(-s * .06, -s * .2, s * .12, s * .25); ctx.restore(); ellipse(ctx, 0, -s * .55, s * .09, s * .12); fillStroke(ctx, '#e0392f', 4); path(ctx, [[-s * .03, s * .05], [s * .03, s * .05], [0, s * .14]]); fillStroke(ctx, 'rgba(220,240,255,.9)', 3); if (drip > 0) { ellipse(ctx, 0, s * .2 + drip * s * .3, s * .03, s * .045); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke(); } ctx.restore(); }
function sideshow(ctx, t, cam) {
  applyCam(ctx, cam, .08); bgFlat(ctx, '#3a1a4a', '#1a0a24'); applyCam(ctx, cam, .2);
  for (let i = 0; i < 6; i++) { ctx.save(); ctx.globalAlpha = .14; ctx.beginPath(); ctx.moveTo(540, -200); ctx.lineTo(-200 + i * 300, 1500); ctx.lineTo(-80 + i * 300, 1500); ctx.closePath(); ctx.fillStyle = '#fff6c8'; ctx.fill(); ctx.restore(); }
  applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.beginPath(); ctx.moveTo(-60 + i * 130, 160); ctx.lineTo(10 + i * 130, 160); ctx.lineTo(-25 + i * 130, 260); ctx.closePath(); ctx.fillStyle = i % 2 ? '#e0392f' : '#ffffff'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
  rrect(ctx, 140, 1080, 800, 160, 10); fillStroke(ctx, '#c8322c', 7); for (let i = 0; i < 9; i++) { circle(ctx, 180 + i * 90, 1100, 10); ctx.fillStyle = '#ffd86a'; ctx.fill(); }
  ctx.fillStyle = '#2a1a2a'; ctx.fillRect(-500, 1240, 2100, 900); line(ctx, -500, 1240, 1600, 1240, 7);
}
function signBoard(ctx, x, y, w, h, lines, col = '#f2c25a') { rrect(ctx, x - w / 2, y - h / 2, w, h, 16); fillStroke(ctx, col, 8); lines.forEach((l, i) => text(ctx, l, x, y - h / 2 + h * (i + .7) / (lines.length + .4), h / (lines.length + .9) * .85, '#2a1a1a', INK, 0)); for (let i = 0; i < 12; i++) { const a = i / 12; const px = x - w / 2 + (w * ((a * 4) % 1)), py = i < 3 ? y - h / 2 : i < 6 ? y + h / 2 : null; } }
function lifeMag(ctx, x, y, s, rot = 0, t = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s * .4, -s * .55, s * .8, s * 1.1, 8); fillStroke(ctx, '#f2ece0', 6); rrect(ctx, -s * .36, -s * .52, s * .3, s * .16, 3); ctx.fillStyle = '#e0392f'; ctx.fill(); text(ctx, 'LIFE', -s * .21, -s * .44, s * .12, '#ffffff', INK, 0); chicken(ctx, s * .05, s * .45, s * .8, { headless: true, t }); ctx.restore(); }
function microscope(ctx, x, y, s) { rrect(ctx, x - s * .35, y - s * .1, s * .7, s * .1, 6); fillStroke(ctx, '#3a3d4a', 5); line(ctx, x + s * .15, y - s * .1, x + s * .15, y - s * .7, s * .08); ctx.save(); ctx.translate(x, y - s * .7); ctx.rotate(-.5); rrect(ctx, -s * .07, -s * .3, s * .14, s * .5, 6); fillStroke(ctx, '#e8e8f0', 5); ctx.restore(); rrect(ctx, x - s * .25, y - s * .35, s * .5, s * .06, 4); fillStroke(ctx, '#9aa0b0', 4); }
function syringe(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s * .5, -s * .08, s * .7, s * .16, 6); fillStroke(ctx, 'rgba(220,240,255,.9)', 4); line(ctx, -s * .5, 0, -s * .75, 0, s * .05); line(ctx, -s * .75, -s * .1, -s * .75, s * .1, s * .05); line(ctx, s * .2, 0, s * .45, 0, s * .025, '#9aa0b0'); ctx.restore(); }
function motelRoom(ctx, t, cam) { bgRoom(ctx, t, cam, { night: true, wall: '#3a3a5a', floor: '#4a3a4a' }); applyCam(ctx, cam, 1); rrect(ctx, 700, 420, 260, 300, 10); fillStroke(ctx, '#1a1a3a', 7); drawStars(ctx, t, 6, 9, .9); drawBed(ctx, 300, 1180, 1.2, {}); }
function bunting(ctx, y, t) { for (let i = 0; i < 12; i++) { const x = -40 + i * 100; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 80, y); ctx.lineTo(x + 40, y + 80 + Math.sin(t * 3 + i) * 6); ctx.closePath(); ctx.fillStyle = ['#e0392f', '#ffd23a', '#2f7de0', '#3aa35b'][i % 4]; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); } line(ctx, -60, y, 1200, y, 5); }
// side view of a chicken head with the brain, highlighting the brain stem
function brainDiagram(ctx, x, y, s, k = 0, cut = 0) {
  ctx.save(); ctx.translate(x, y);
  circle(ctx, 0, 0, s * .5); fillStroke(ctx, '#ffffff', 7); for (let i = 0; i < 3; i++) { circle(ctx, -s * .2 + i * s * .2, -s * .52, s * .12); fillStroke(ctx, '#e0392f', 6); }
  path(ctx, [[s * .45, -s * .1], [s * .8, 0], [s * .45, s * .1]]); fillStroke(ctx, '#f2b52a', 6);
  ellipse(ctx, -s * .05, -s * .08, s * .28, s * .2); fillStroke(ctx, cut ? 'rgba(242,155,176,.25)' : '#f29bb0', 5);
  rrect(ctx, -s * .12, s * .05, s * .14, s * .45 + s * .4, s * .06); fillStroke(ctx, k ? '#ffd23a' : '#f29bb0', 5);
  if (cut) { ctx.save(); ctx.setLineDash([18, 12]); line(ctx, -s * .9, s * .05, s * .9, -s * .2, 7, '#e0392f'); ctx.restore(); }
  ctx.restore();
}
