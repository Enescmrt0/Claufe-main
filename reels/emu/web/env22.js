// ---------- props for "The Great Emu War" (Western Australia, 1932) ----------
// emu standing at feet (x,y), height s. o: {run (phase speed), t, flip, look, blink, scared, peck}
function emu(ctx, x, y, s, o = {}) {
  const t = o.t || 0, f = o.flip || 1, run = o.run || 0, ph = t * 12 * run + (o.seed || 0);
  ctx.save(); ctx.translate(x, y - Math.abs(Math.sin(ph)) * s * .04 * (run ? 1 : 0)); ctx.scale(f, 1);
  const lw = Math.max(3, s * .012), hipY = -s * .5;
  for (const k of [0, 1]) {
    const sw = run ? Math.sin(ph + k * Math.PI) : (k ? .05 : -.05);
    const kx = sw * s * .14 + s * .04, ky = hipY + s * .26, fx = sw * s * .24 - (run ? Math.max(0, -Math.cos(ph + k * Math.PI)) * s * .06 : 0), fy = run ? -Math.max(0, Math.cos(ph + k * Math.PI)) * s * .08 : 0;
    ctx.beginPath(); ctx.moveTo(0, hipY); ctx.lineTo(kx, ky); ctx.lineTo(fx, fy); ctx.lineWidth = s * .03; ctx.strokeStyle = k ? '#5a5a62' : '#6a6a72'; ctx.lineCap = 'round'; ctx.stroke();
    ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke(); for (const d of [-1, 0, 1]) line(ctx, fx, fy, fx + s * .06 + d * s * .015, fy + d * s * .02, lw, INK);
  }
  // shaggy body
  ctx.save(); ctx.rotate(-.12 + (run ? .1 : 0)); ctx.beginPath(); ctx.ellipse(-s * .02, -s * .62, s * .26, s * .17, 0, 0, TAU); ctx.fillStyle = '#5a4636'; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.stroke();
  for (let i = 0; i < 9; i++) { const a = Math.PI * .15 + i / 8 * Math.PI * .8; line(ctx, -s * .02 + Math.cos(a) * s * .24, -s * .62 + Math.sin(a) * s * .15, -s * .02 + Math.cos(a) * s * .29, -s * .62 + Math.sin(a) * s * .21 + s * .02, lw * .8, '#3a2c22'); }
  ctx.restore();
  // neck + head
  const lean = run ? .35 : (o.peck ? .7 * Math.max(0, Math.sin(t * 8)) : 0);
  const nx = s * .16 + lean * s * .2, ny = -s * .95 + lean * s * .25, hx = nx + s * .05, hy = ny - s * .04;
  ctx.beginPath(); ctx.moveTo(s * .16, -s * .66); ctx.quadraticCurveTo(s * .26 + lean * s * .1, -s * .8, nx, ny); ctx.lineWidth = s * .06; ctx.strokeStyle = '#4a5a8a'; ctx.stroke(); ctx.lineWidth = lw; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(s * .16, -s * .66); ctx.quadraticCurveTo(s * .26 + lean * s * .1, -s * .8, nx, ny); ctx.stroke();
  ellipse(ctx, hx, hy, s * .065, s * .05); fillStroke(ctx, '#5a6a9a', lw);
  path(ctx, [[hx + s * .05, hy - s * .015], [hx + s * .13, hy + s * .005], [hx + s * .05, hy + s * .02]]); fillStroke(ctx, '#3a3a40', lw * .8);
  const er = o.scared ? s * .03 : s * .022; circle(ctx, hx + s * .01, hy - s * .01, er); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = lw * .6; ctx.strokeStyle = INK; ctx.stroke();
  if (!o.blink) { circle(ctx, hx + s * .015 + (o.look || 0) * s * .006, hy - s * .01, er * .5); ctx.fillStyle = INK; ctx.fill(); }
  for (let i = 0; i < 3; i++) line(ctx, hx - s * .04, hy - s * .04, hx - s * .06 - i * s * .015, hy - s * .08 + i * s * .01, lw * .6, '#3a2c22');
  ctx.restore();
}
function outback(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#3a9ae8', o.bot || '#ffe0b0', -400, 1300);
  if (o.sun !== false) { applyCam(ctx, cam, .1); drawSun(ctx, o.sunX || 880, 300, 80, t, 1); }
  applyCam(ctx, cam, .14); drawCloud(ctx, 160 + t * 6, 420, 70, 1, .8);
  applyCam(ctx, cam, .35); ellipse(ctx, 260, 1220, 600, 160); fillStroke(ctx, '#c8703a', 6); ellipse(ctx, 940, 1230, 520, 140); fillStroke(ctx, '#b8602e', 6);
  for (const [x, s] of [[120, 1], [900, .8]]) gumTree(ctx, x, 1180, 320 * s);
  applyCam(ctx, cam, 1); ctx.fillStyle = o.ground || '#d8844a'; ctx.fillRect(-1000, 1240, 3000, 1000); line(ctx, -1000, 1240, 3000, 1240, 7);
  if (o.wheat) wheatField(ctx, 1240, t);
}
function gumTree(ctx, x, y, s) { line(ctx, x, y, x + s * .05, y - s * .7, s * .06, '#e8e0d0'); ctx.lineWidth = Math.max(3, s * .012); ctx.strokeStyle = INK; for (const [dx, dy, r] of [[0, -.8, .22], [-.2, -.68, .16], [.22, -.7, .17]]) { circle(ctx, x + dx * s, y + dy * s, r * s); ctx.fillStyle = '#7a9a5a'; ctx.fill(); ctx.stroke(); } }
function wheatField(ctx, y, t, x0 = -100, x1 = 1200, eaten = 0) {
  for (let x = x0; x < x1; x += 34) { if (eaten && ((x * 7) % 100) / 100 < eaten) continue; const sw = Math.sin(t * 2 + x * .02) * 8; line(ctx, x, y + 20, x + sw, y - 150, 5, '#c8a040'); ellipse(ctx, x + sw, y - 160, 9, 24, sw * .02); fillStroke(ctx, '#f2c25a', 4); }
}
function digger(ctx, o) { const so = Object.assign({ cols: ['#9a8a5a', '#9a8a5a'], hat: 'none', belt: true }, o); drawStick(ctx, so); slouchHat(ctx, so); return so; }
function slouchHat(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.scale(o.flip || 1, 1); const hy = -.765 * s; ctx.beginPath(); ctx.ellipse(0, hy - .14 * s, .3 * s, .055 * s, 0, 0, TAU); fillStroke(ctx, '#7a6a42', Math.max(3, s * .011)); ctx.beginPath(); ctx.ellipse(0, hy - .2 * s, .16 * s, .09 * s, 0, Math.PI, 0); fillStroke(ctx, '#7a6a42', Math.max(3, s * .011)); line(ctx, -.16 * s, hy - .16 * s, .16 * s, hy - .16 * s, s * .025, '#3a3020'); ctx.beginPath(); ctx.moveTo(.06 * s, hy - .14 * s); ctx.quadraticCurveTo(.28 * s, hy - .3 * s, .3 * s, hy - .14 * s); fillStroke(ctx, '#7a6a42', Math.max(3, s * .011)); ctx.restore(); }
// Lewis-style machine gun on a bipod, pointing right from (x,y)
function lewisGun(ctx, x, y, s, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(o.flip || 1, 1); ctx.rotate(o.rot || 0);
  line(ctx, s * .2, 0, s * .05, s * .35, s * .03); line(ctx, s * .2, 0, s * .35, s * .35, s * .03);
  rrect(ctx, -s * .3, -s * .08, s * .3, s * .1, s * .03); fillStroke(ctx, '#6a4a2a', 5);
  rrect(ctx, 0, -s * .1, s * .7, s * .12, s * .04); fillStroke(ctx, '#3a3d44', 5);
  ctx.beginPath(); ctx.ellipse(s * .12, -s * .16, s * .14, s * .04, 0, 0, TAU); fillStroke(ctx, '#2a2d34', 5);
  line(ctx, s * .7, -s * .04, s * .9, -s * .04, s * .04, '#2a2d34');
  if (o.fire) { burst(ctx, s * .98, -s * .04, s * .12 * (.7 + .3 * Math.sin((o.t || 0) * 60)), 8, '#ffd23a', 3); }
  if (o.jam) { ctx.save(); ctx.globalAlpha = .8; puff(ctx, s * .2, -s * .3, s * .12, o.t || 0, '#9a9a9a', 2, .8); ctx.restore(); }
  ctx.restore();
}
function truck(ctx, x, y, s, t, bump = 0) {
  const by = Math.sin(t * 22) * s * .02 * bump; ctx.save(); ctx.translate(x, y + by); ctx.rotate(Math.sin(t * 17) * .03 * bump);
  rrect(ctx, -s * .5, -s * .35, s * .62, s * .22, 6); fillStroke(ctx, '#6a7a4a', 6);
  rrect(ctx, s * .12, -s * .52, s * .3, s * .39, 10); fillStroke(ctx, '#6a7a4a', 6); rrect(ctx, s * .2, -s * .46, s * .16, s * .14, 6); fillStroke(ctx, '#bfe4ff', 4);
  rrect(ctx, s * .4, -s * .3, s * .12, s * .17, 6); fillStroke(ctx, '#5a6a3a', 6);
  for (const wx of [-s * .32, s * .32]) { circle(ctx, wx, -s * .1, s * .1); fillStroke(ctx, '#2a2a30', 6); circle(ctx, wx, -s * .1, s * .04); fillStroke(ctx, '#9a9aa0', 3); }
  ctx.restore(); return by;
}
function dam(ctx, x, y, w) { ctx.beginPath(); ctx.ellipse(x, y, w / 2, w * .1, 0, 0, TAU); ctx.fillStyle = '#4ab0d8'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); ctx.save(); ctx.globalAlpha = .5; line(ctx, x - w * .2, y - 4, x + w * .05, y - 4, 4, '#ffffff'); ctx.restore(); }
function ammoCrate(ctx, x, y, s, txt = '.303') { rrect(ctx, x - s / 2, y - s * .5, s, s * .5, 6); fillStroke(ctx, '#7a6a3a', 6); text(ctx, txt, x, y - s * .25, s * .18, '#2a2418', INK, 0); }
function bullet(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, -s * .12, -s * .1, s * .24, s * .5, 4); fillStroke(ctx, '#d8a83a', 4); ctx.beginPath(); ctx.moveTo(-s * .12, -s * .1); ctx.quadraticCurveTo(0, -s * .45, s * .12, -s * .1); fillStroke(ctx, '#b87a3a', 4); ctx.restore(); }
function fence(ctx, x0, x1, y, h = 160) { for (let x = x0; x <= x1; x += 120) { line(ctx, x, y, x, y - h, 12, '#7a5236'); } for (let k = 1; k <= 4; k++) line(ctx, x0, y - k * h / 5, x1, y - k * h / 5, 3, '#5a5a62'); }
