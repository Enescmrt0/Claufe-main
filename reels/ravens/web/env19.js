// ---------- props for "The birds that guard a kingdom" (Tower of London ravens) ----------
// raven standing at (x,y) feet, size s, facing right (flip -1 left). o: {hop, fly, flap, t, caw, look}
function raven(ctx, x, y, s, o = {}) {
  const t = o.t || 0, f = o.flip || 1;
  ctx.save(); ctx.translate(x, y - (o.hop || 0) * s * .25); ctx.scale(f, 1);
  const B = '#1b1a24', B2 = '#2e2c3e';
  if (!o.fly) { line(ctx, -s * .06, -s * .02, -s * .08, -s * .22, Math.max(3, s * .03), '#3a3840'); line(ctx, s * .06, -s * .02, s * .04, -s * .22, Math.max(3, s * .03), '#3a3840'); }
  path(ctx, [[-s * .3, -s * .42], [-s * .62, -s * .3], [-s * .6, -s * .4]]); fillStroke(ctx, B, Math.max(3, s * .025));
  ellipse(ctx, 0, -s * .42, s * .34, s * .22, -.25); fillStroke(ctx, B, Math.max(3, s * .025));
  const fl = o.fly ? Math.sin(t * 16) : 0;
  ctx.save(); ctx.translate(-s * .02, -s * .48); ctx.rotate(o.fly ? -1.2 * fl - .3 : .15);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-s * .25, o.fly ? -s * .45 : s * .05, -s * .48, o.fly ? -s * .4 : s * .06); ctx.quadraticCurveTo(-s * .2, s * .14, 0, 0); fillStroke(ctx, B2, Math.max(3, s * .022)); ctx.restore();
  circle(ctx, s * .28, -s * .66, s * .15); fillStroke(ctx, B, Math.max(3, s * .025));
  const open = o.caw ? .5 + .5 * Math.sin(t * 20) : 0;
  path(ctx, [[s * .4, -s * .7], [s * .66, -s * .64 - open * s * .05], [s * .4, -s * .6]]); fillStroke(ctx, '#5a5a66', Math.max(3, s * .02));
  if (open > .2) { path(ctx, [[s * .4, -s * .62], [s * .62, -s * .58 + open * s * .06], [s * .4, -s * .57]]); fillStroke(ctx, '#5a5a66', Math.max(3, s * .02)); }
  circle(ctx, s * .32, -s * .69, s * .045); ctx.fillStyle = '#ffffff'; ctx.fill(); circle(ctx, s * .335, -s * .69, s * .022); ctx.fillStyle = INK; ctx.fill();
  ctx.restore();
}
// the White Tower: square keep with four corner turrets and lead cupolas, curtain wall in front
function whiteTower(ctx, x, y, s, o = {}) {
  const w = s, h = s * .72, fall = o.fall || 0;
  ctx.save(); ctx.translate(x, y);
  if (fall) { ctx.translate(0, fall * s * .15); ctx.rotate(fall * .12); }
  rrect(ctx, -w / 2, -h, w, h, 6); fillStroke(ctx, '#ece4d2', Math.max(4, s * .008));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const wx = -w * .34 + c * w * .226, wy = -h * .82 + r * h * .26; ctx.beginPath(); ctx.moveTo(wx - w * .03, wy + h * .1); ctx.lineTo(wx - w * .03, wy); ctx.arc(wx, wy, w * .03, Math.PI, 0); ctx.lineTo(wx + w * .03, wy + h * .1); ctx.closePath(); ctx.fillStyle = '#3a3850'; ctx.fill(); }
  for (const sx of [-1, 1]) for (const tall of [0]) {
    const tx = sx * w * .46; rrect(ctx, tx - w * .07, -h - w * .18, w * .14, h * .5, 4); fillStroke(ctx, '#ece4d2', Math.max(4, s * .008));
    ctx.beginPath(); ctx.moveTo(tx - w * .075, -h - w * .18); ctx.quadraticCurveTo(tx - w * .08, -h - w * .3, tx, -h - w * .34); ctx.quadraticCurveTo(tx + w * .08, -h - w * .3, tx + w * .075, -h - w * .18); ctx.closePath(); fillStroke(ctx, '#6a7078', Math.max(4, s * .008));
    line(ctx, tx, -h - w * .34, tx, -h - w * .42, Math.max(3, s * .006));
  }
  for (let i = 0; i < 9; i++) { rrect(ctx, -w * .38 + i * w * .085, -h - w * .05, w * .05, w * .05, 2); fillStroke(ctx, '#ece4d2', Math.max(3, s * .006)); }
  line(ctx, -w * .01, -h - w * .05, -w * .01, -h - w * .24, Math.max(3, s * .006));
  ctx.save(); ctx.translate(-w * .01, -h - w * .24); const wv = Math.sin((o.t || 0) * 6) * w * .01; path(ctx, [[0, 0], [w * .16, wv], [w * .16, w * .09 + wv], [0, w * .09]]); fillStroke(ctx, '#2a4a9a', 4); line(ctx, 0, w * .045, w * .16, w * .045 + wv, 6, '#e0392f'); line(ctx, w * .08, 0, w * .08, w * .09, 6, '#e0392f'); ctx.restore();
  ctx.restore();
}
function curtainWall(ctx, y, col = '#d8ccb0') {
  ctx.fillStyle = col; ctx.fillRect(-800, y - 160, 2700, 260); line(ctx, -800, y - 160, 1900, y - 160, 6);
  for (let i = 0; i < 30; i++) { rrect(ctx, -800 + i * 90, y - 200, 50, 44, 3); fillStroke(ctx, col, 5); }
  for (let r = 0; r < 3; r++) for (let i = 0; i < 26; i++) { ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 3; ctx.strokeRect(-800 + i * 110 + (r % 2) * 55, y - 150 + r * 60, 110, 60); }
}
function londonBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#7ab8e8', o.bot || '#dbe9f2', -400, 1300);
  applyCam(ctx, cam, .14); drawCloud(ctx, 160 + t * 8, 330, 90, 1, .9); drawCloud(ctx, 840 + t * 5, 470, 70, 2, .9);
  applyCam(ctx, cam, .4); whiteTower(ctx, 560, 1080, 500, { t, fall: o.fall || 0 });
  applyCam(ctx, cam, 1); curtainWall(ctx, 1160); ctx.fillStyle = o.grass || '#5aa85a'; ctx.fillRect(-1000, 1240, 3000, 1000); line(ctx, -1000, 1240, 3000, 1240, 7);
}
// Yeoman Warder (Beefeater-style) undress uniform: navy tunic with red trim, Tudor bonnet
function warder(ctx, o) {
  const so = Object.assign({ cols: ['#1d2a5a', '#1d2a5a'], hat: 'none', belt: false, vest: '#c8322c' }, o); drawStick(ctx, so);
  const s = so.s; ctx.save(); ctx.translate(so.x, so.y); ctx.scale(so.flip || 1, 1); const hy = -.765 * s;
  ellipse(ctx, 0, hy - .15 * s, .26 * s, .05 * s); fillStroke(ctx, '#1d2a5a', Math.max(3, s * .011)); ctx.beginPath(); ctx.ellipse(0, hy - .19 * s, .17 * s, .07 * s, 0, Math.PI, 0); fillStroke(ctx, '#1d2a5a', Math.max(3, s * .011)); line(ctx, -.16 * s, hy - .17 * s, .16 * s, hy - .17 * s, s * .02, '#c8322c');
  ctx.beginPath(); ctx.ellipse(0, hy + .14 * s, .12 * s, .1 * s, 0, 0, Math.PI); ctx.fillStyle = '#e8e8ec'; ctx.fill(); ctx.lineWidth = Math.max(3, s * .01); ctx.strokeStyle = INK; ctx.stroke();
  ctx.restore(); return so;
}
function crown(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  path(ctx, [[-s * .5, 0], [-s * .5, -s * .5], [-s * .25, -s * .25], [0, -s * .6], [s * .25, -s * .25], [s * .5, -s * .5], [s * .5, 0]]); fillStroke(ctx, '#f2c22a', Math.max(4, s * .05));
  for (const dx of [-.5, 0, .5]) { circle(ctx, dx * s, dx ? -s * .52 : -s * .62, s * .06); fillStroke(ctx, '#e0392f', 3); }
  rrect(ctx, -s * .52, -s * .1, s * 1.04, s * .14, 4); fillStroke(ctx, '#d8a020', Math.max(4, s * .04));
  ctx.restore();
}
function kingCharles(ctx, o) {
  const so = Object.assign({ cols: ['#8a1a3a', '#8a1a3a'], hat: 'none', belt: false }, o); const s = so.s;
  ctx.save(); ctx.translate(so.x, so.y); for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) { circle(ctx, sd * .17 * s, -.82 * s + i * .08 * s, .07 * s); fillStroke(ctx, '#3a2418', Math.max(3, s * .01)); } ctx.restore();
  drawStick(ctx, so); crown(ctx, so.x, so.y - .93 * s, .24 * s); moustache(ctx, so); return so;
}
function throne(ctx, x, y, s) { rrect(ctx, x - s * .35, y - s * 1.1, s * .7, s * 1.1, 14); fillStroke(ctx, '#b8322c', 7); rrect(ctx, x - s * .45, y - s * .4, s * .9, s * .4, 10); fillStroke(ctx, '#d8a020', 7); }
function meatPlate(ctx, x, y, s) { ellipse(ctx, x, y, s * .5, s * .14); fillStroke(ctx, '#e8e8ec', 5); for (let i = 0; i < 3; i++) { ellipse(ctx, x - s * .2 + i * s * .2, y - s * .06, s * .12, s * .07, .3); fillStroke(ctx, '#c84a4a', 4); } }
function ravenHouse(ctx, x, y, s) { rrect(ctx, x - s / 2, y - s * .6, s, s * .6, 8); fillStroke(ctx, '#7a5236', 6); path(ctx, [[x - s * .6, y - s * .6], [x, y - s], [x + s * .6, y - s * .6]]); fillStroke(ctx, '#3a3a44', 6); for (let i = 0; i < 6; i++) line(ctx, x - s * .45 + i * s * .18, y - s * .55, x - s * .45 + i * s * .18, y - s * .05, 4, '#2a2a30'); }
function scissors(ctx, x, y, s, open = .3) { ctx.save(); ctx.translate(x, y); for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * open); line(ctx, 0, 0, s * .8, 0, s * .08, '#b8c0c8'); circle(ctx, -s * .2, sd * s * .12, s * .12); ctx.lineWidth = s * .05; ctx.strokeStyle = '#e0392f'; ctx.stroke(); ctx.restore(); } circle(ctx, 0, 0, s * .04); ctx.fillStyle = INK; ctx.fill(); ctx.restore(); }
function scales(ctx, x, y, s, tip = 0, L, R) { line(ctx, x, y, x, y - s, 10); ctx.save(); ctx.translate(x, y - s); ctx.rotate(tip); line(ctx, -s * .6, 0, s * .6, 0, 10); for (const sd of [-1, 1]) { line(ctx, sd * s * .6, 0, sd * s * .6, s * .3, 4); ctx.save(); ctx.translate(sd * s * .6, s * .3); ctx.rotate(-tip); ellipse(ctx, 0, 0, s * .25, s * .06); fillStroke(ctx, '#d8a020', 5); (sd < 0 ? L : R)(ctx); ctx.restore(); } ctx.restore(); rrect(ctx, x - s * .25, y - 12, s * .5, 24, 8); fillStroke(ctx, '#d8a020', 6); }
