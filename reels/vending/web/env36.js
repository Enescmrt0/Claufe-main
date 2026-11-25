// ---------- props for "The 2,000-year-old vending machine" (Hero of Alexandria) ----------
function temple(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#5ab0e8', o.bot || '#f8e8c8', -400, 1300); applyCam(ctx, cam, .1); drawSun(ctx, 880, 300, 70, t, 1);
  applyCam(ctx, cam, .4); path(ctx, [[60, 700], [540, 480], [1020, 700]]); fillStroke(ctx, '#f2ead8', 7); rrect(ctx, 60, 700, 960, 50, 4); fillStroke(ctx, '#e8dcc4', 6);
  for (let i = 0; i < 6; i++) { rrect(ctx, 100 + i * 170, 750, 70, 420, 4); fillStroke(ctx, '#f2ead8', 6); for (let k = 1; k < 4; k++) line(ctx, 118 + i * 170 + k * 9, 760, 118 + i * 170 + k * 9, 1160, 2, 'rgba(0,0,0,.15)'); }
  rrect(ctx, 40, 1170, 1000, 70, 4); fillStroke(ctx, '#e8dcc4', 6);
  applyCam(ctx, cam, 1); ctx.fillStyle = '#d8c8a0'; ctx.fillRect(-1000, 1240, 3000, 1000); line(ctx, -1000, 1240, 3000, 1240, 7);
}
// the machine, front or cut-away. (x,y) base centre, s height. o: {cut, tilt (0..1), flow (0..1), coin: [x,y] local or null}
function heroMachine(ctx, x, y, s, t, o = {}) {
  const w = s * .5; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2 - 20, -20, w + 40, 20, 4); fillStroke(ctx, '#8a6a3a', 6);
  rrect(ctx, -w / 2, -s, w, s - 20, 14); fillStroke(ctx, o.cut ? '#f5ead2' : '#c8964a', 7);
  rrect(ctx, -w * .2, -s - 30, w * .4, 30, 6); fillStroke(ctx, '#a8763a', 6); rrect(ctx, -w * .08, -s - 34, w * .16, 12, 3); ctx.fillStyle = INK; ctx.fill();
  if (!o.cut) { for (let i = 0; i < 3; i++) line(ctx, -w / 2, -s * (.3 + i * .25), w / 2, -s * (.3 + i * .25), 4, 'rgba(0,0,0,.2)'); text(ctx, 'ΑΓΙΑΣΜΑ', 0, -s * .55, s * .06, '#5a3a1a', INK, 0); }
  else {
    const lv = .55; ctx.save(); ctx.beginPath(); ctx.rect(-w / 2 + 8, -s * lv, w - 16, s * lv - 28); ctx.fillStyle = 'rgba(90,170,230,.7)'; ctx.fill(); ctx.restore();
    const tilt = (o.tilt || 0) * .35; ctx.save(); ctx.translate(0, -s * .78); ctx.rotate(tilt); line(ctx, -w * .42, 0, w * .38, 0, 16, '#5a3a1a'); rrect(ctx, -w * .44, -24, w * .3, 24, 4); fillStroke(ctx, '#c87a3a', 6); circle(ctx, 0, 0, 10); ctx.fillStyle = INK; ctx.fill(); ctx.restore();
    const ry = -s * .78 + Math.sin(tilt) * w * .38; line(ctx, w * .36, ry, w * .36, -s * .22, 6, '#5a3a1a'); rrect(ctx, w * .3, -s * .22 - 4 + (o.tilt || 0) * -20, w * .12, 20, 4); fillStroke(ctx, '#3a3a44', 4);
    text(ctx, 'LEVER', -w * .1, -s * .86, s * .04, '#5a3a1a', INK, 0); text(ctx, 'VALVE', w * .2, -s * .16, s * .04, '#5a3a1a', INK, 0);
  }
  rrect(ctx, w / 2 - 4, -s * .22, 70, 22, 6); fillStroke(ctx, '#a8763a', 5);
  if (o.flow > 0) { ctx.save(); ctx.globalAlpha = o.flow; ctx.beginPath(); ctx.moveTo(w / 2 + 62, -s * .2); ctx.quadraticCurveTo(w / 2 + 90, -s * .12, w / 2 + 80, 0); ctx.lineWidth = 16; ctx.strokeStyle = '#5ab0e8'; ctx.stroke(); ctx.restore(); }
  if (o.coin) coinB(ctx, o.coin[0], o.coin[1], 26);
  ctx.restore();
}
function coinB(ctx, x, y, r, spin = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(.1, Math.abs(Math.cos(spin))), 1); circle(ctx, 0, 0, r); fillStroke(ctx, '#c87a3a', Math.max(3, r * .12)); circle(ctx, 0, 0, r * .7); ctx.lineWidth = Math.max(2, r * .06); ctx.strokeStyle = '#8a4a1a'; ctx.stroke(); text(ctx, 'Δ', 0, 2, r * .8, '#6a3a12', INK, 0); ctx.restore(); }
function hero(ctx, o) { const so = Object.assign({ cols: ['#f2ece0', '#f2ece0'], hat: 'none', belt: false }, o); drawStick(ctx, so); const s = so.s; ctx.save(); ctx.translate(so.x, so.y); ctx.scale(so.flip || 1, 1); const hy = -.765 * s; ctx.beginPath(); ctx.moveTo(-.16 * s, hy + .03 * s); ctx.quadraticCurveTo(-.15 * s, hy + .26 * s, 0, hy + .28 * s); ctx.quadraticCurveTo(.15 * s, hy + .26 * s, .16 * s, hy + .03 * s); ctx.quadraticCurveTo(0, hy + .13 * s, -.16 * s, hy + .03 * s); ctx.fillStyle = '#8a8a8a'; ctx.fill(); ctx.lineWidth = Math.max(3, s * .01); ctx.strokeStyle = INK; ctx.stroke(); path(ctx, [[-.2 * s, -.62 * s], [.18 * s, -.3 * s], [.12 * s, -.62 * s]]); ctx.fillStyle = '#2a6aa8'; ctx.fill(); ctx.restore(); return so; }
function scroll2(ctx, x, y, w, h, t) { rrect(ctx, x - w / 2, y - h / 2, w, h, 8); fillStroke(ctx, '#f2e6c0', 6); for (const sy of [y - h / 2, y + h / 2]) { rrect(ctx, x - w / 2 - 14, sy - 14, w + 28, 28, 14); fillStroke(ctx, '#a87a4a', 5); } heroMachine(ctx, x, y + h * .4, h * .7, t, { cut: true }); }
function modernVend(ctx, x, y, s, t, eat = 0) { rrect(ctx, x - s * .35, y - s, s * .7, s, 14); fillStroke(ctx, '#c8322c', 7); rrect(ctx, x - s * .3, y - s * .92, s * .42, s * .62, 8); fillStroke(ctx, '#d8ecf8', 5); for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { rrect(ctx, x - s * .27 + c * s * .13, y - s * .88 + r * s * .15, s * .1, s * .11, 4); ctx.fillStyle = ['#f2b52a', '#2f7de0', '#3aa35b', '#e0392f'][(r + c) % 4]; ctx.fill(); } rrect(ctx, x + s * .16, y - s * .8, s * .14, s * .3, 6); fillStroke(ctx, '#3a3a44', 5); rrect(ctx, x + s * .2, y - s * .74, s * .06, s * .1, 3); ctx.fillStyle = INK; ctx.fill(); rrect(ctx, x - s * .3, y - s * .22, s * .6, s * .12, 6); fillStroke(ctx, '#2a2a30', 5); if (eat) { ctx.save(); ctx.translate(x + s * .23, y - s * .72); ctx.scale(1, 1 - eat); coinB(ctx, 0, -s * .06, s * .045); ctx.restore(); } }
