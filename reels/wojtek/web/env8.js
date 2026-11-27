// ---------- props for the dancing plague reel (Strasbourg, 1518) ----------
const TG = 1240; // street level
function timberHouse(ctx, x, w, h, seed, col = '#f2e6c8') {
  const R = rng(seed), y = TG - h, lw = 7;
  ctx.beginPath(); ctx.rect(x, y, w, h); fillStroke(ctx, col, lw);
  path(ctx, [[x - 18, y], [x + w / 2, y - w * .55], [x + w + 18, y]]); fillStroke(ctx, ['#a9412c', '#8a4a2c', '#7a3a2a'][seed % 3], lw);
  const b = '#5a3a22';
  for (let i = 1; i < 3; i++) line(ctx, x, y + h * i / 3, x + w, y + h * i / 3, 10, b);
  line(ctx, x + w / 2, y, x + w / 2, y + h * 2 / 3, 10, b);
  line(ctx, x, y, x + w / 2, y + h / 3, 8, b); line(ctx, x + w, y, x + w / 2, y + h / 3, 8, b);
  for (const wx of [.25, .75]) { rrect(ctx, x + w * wx - w * .09, y + h * .4, w * .18, h * .18, 4); fillStroke(ctx, R() < .5 ? '#ffd96a' : '#6a8aa8', 5); }
  rrect(ctx, x + w * .4, TG - h * .26, w * .2, h * .26, 6); fillStroke(ctx, '#6b3f22', 6);
}
function townBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .1); drawSky(ctx, o.top || '#5fb6f0', o.bot || '#fbe9c4', -400, 1300);
  if (o.sun !== false) { applyCam(ctx, cam, .12); drawSun(ctx, 860, 300, 70, t, 1); }
  applyCam(ctx, cam, .3);
  // cathedral spire far away
  ctx.beginPath(); ctx.rect(470, 560, 140, 700); fillStroke(ctx, '#c9a08a', 6); path(ctx, [[450, 560], [540, 240], [630, 560]]); fillStroke(ctx, '#b88a74', 6);
  applyCam(ctx, cam, .6);
  [[-120, 300, 520, 1], [200, 260, 430, 2], [640, 280, 480, 3], [930, 320, 540, 4]].forEach(([x, w, h, s], i) => timberHouse(ctx, x, w, h, s, i % 2 ? '#f2e6c8' : '#ead9b0'));
  applyCam(ctx, cam, 1);
  ctx.fillStyle = o.ground || '#b9a48a'; ctx.fillRect(-2000, TG, 5080, 2000);
  const R = rng(8); for (let i = 0; i < 70; i++) { ellipse(ctx, R() * 1500 - 200, TG + 30 + R() * 700, 38, 16); ctx.fillStyle = 'rgba(90,70,50,.18)'; ctx.fill(); }
  if (o.night) tint(ctx, '#1a1f4a', .35);
}
// headwear drawn over the stick rig (head centre at -.765 s, radius .19 s)
function bonnet(ctx, o, col = '#f6f1e8') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0); const hy = -.765 * s + (o.bob || 0) * s;
  ctx.beginPath(); ctx.arc(0, hy - .005 * s, .2 * s, Math.PI * 1.12, Math.PI * 1.88); ctx.quadraticCurveTo(0, hy - .16 * s, -.2 * s * Math.cos(Math.PI * .12), hy - .005 * s - .2 * s * Math.sin(Math.PI * .12)); ctx.closePath(); fillStroke(ctx, col, Math.max(3, s * .011));
  ctx.restore();
}
function floppyHat(ctx, o, col = '#7a2a3a') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0); const hy = -.765 * s + (o.bob || 0) * s;
  ellipse(ctx, .02 * s, hy - .17 * s, .24 * s, .09 * s, -.12); fillStroke(ctx, col, Math.max(3, s * .011));
  ctx.restore();
}
function hood(ctx, o, col = '#5a4a3a') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s + (o.bob || 0) * s;
  ctx.beginPath(); ctx.arc(0, hy, .21 * s, Math.PI * .85, Math.PI * 2.15); ctx.lineWidth = .05 * s; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke();
  ctx.restore();
}
// dancing pose for the stick rig: phase p (radians), tired 0..1
function dancePose(p, tired = 0) {
  const a = Math.sin(p), b = Math.cos(p), up = 1 - tired * .7;
  return {
    arms: { L: [(1.6 + a * .9) * up + .3, .3 + b * .3], R: [(1.6 - a * .9) * up + .3, .3 - b * .3] },
    legs: { L: [Math.max(0, a) * .9 + .1, -Math.max(0, a) * 1.1 - .04], R: [Math.max(0, -a) * .9 + .1, -Math.max(0, -a) * 1.1 - .04] },
    bob: -Math.abs(b) * .02 * up, lean: a * .08,
  };
}
function note(ctx, x, y, s, col = '#221c22', rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ellipse(ctx, 0, 0, s * .3, s * .22, -.4); ctx.fillStyle = col; ctx.fill();
  line(ctx, s * .26, -s * .05, s * .26, -s * .95, s * .1, col); path(ctx, [[s * .26, -s * .95], [s * .7, -s * .7], [s * .26, -s * .6]]); ctx.fillStyle = col; ctx.fill();
  ctx.restore();
}
function notes(ctx, x, y, t, n = 5, col = '#221c22', spread = 300) { for (let i = 0; i < n; i++) { const k = (t * .5 + i / n) % 1; ctx.globalAlpha = 1 - k; note(ctx, x + Math.sin(i * 2.3 + t) * spread * k, y - k * 420, 46 + i % 2 * 14, col, Math.sin(t * 3 + i) * .3); } ctx.globalAlpha = 1; }
function lute(ctx, x, y, s, rot = -.5) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.rect(-s * .06, -s * 1.0, s * .12, s * .7); fillStroke(ctx, '#6b3f22', 5);
  ellipse(ctx, 0, 0, s * .34, s * .42); fillStroke(ctx, '#d9a05b', 6); circle(ctx, 0, -s * .05, s * .11); fillStroke(ctx, '#3a2414', 4);
  ctx.restore();
}
function drum(ctx, x, y, s) { ctx.beginPath(); ctx.rect(x - s * .4, y - s * .5, s * .8, s * .5); fillStroke(ctx, '#c8322c', 6); ellipse(ctx, x, y - s * .5, s * .4, s * .12); fillStroke(ctx, '#f2e6c8', 6); for (let i = 0; i < 4; i++) line(ctx, x - s * .4 + i * s * .2, y - s * .45, x - s * .3 + i * s * .2, y, 4, '#e8c04a'); }
function woodStage(ctx, x, y, w, h) {
  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.rect(x - w / 2 + 20 + i * (w - 80) / 4, y, 40, h); fillStroke(ctx, '#6b3f22', 6); }
  ctx.beginPath(); ctx.rect(x - w / 2, y - 46, w, 56); fillStroke(ctx, '#b98552', 7);
  for (let i = 1; i < 8; i++) line(ctx, x - w / 2 + i * w / 8, y - 46, x - w / 2 + i * w / 8, y + 10, 4, '#7a4c26');
}
function banner(ctx, x, y, w, str, col = '#c8322c') { ctx.beginPath(); ctx.moveTo(x - w / 2, y); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + 110); ctx.lineTo(x, y + 80); ctx.lineTo(x - w / 2, y + 110); ctx.closePath(); fillStroke(ctx, col, 6); text(ctx, str, x, y + 44, 44, '#fff', INK, 0); }
function banSign(ctx, x, y, r, inner) { circle(ctx, x, y, r); fillStroke(ctx, '#ffffff', 8); ctx.save(); circle(ctx, x, y, r * .9); ctx.clip(); inner(); ctx.restore(); circle(ctx, x, y, r); ctx.lineWidth = r * .16; ctx.strokeStyle = '#e02a24'; ctx.stroke(); line(ctx, x - r * .68, y - r * .68, x + r * .68, y + r * .68, r * .16, '#e02a24'); }
function mountains(ctx, t, cam) {
  applyCam(ctx, cam, .1); drawSky(ctx, '#f6b98a', '#ffe9c4', -400, 1300);
  applyCam(ctx, cam, .25); path(ctx, [[-200, 1300], [250, 520], [560, 1000], [820, 440], [1300, 1300]]); fillStroke(ctx, '#8a94b0', 8);
  path(ctx, [[190, 620], [250, 520], [320, 640], [270, 610], [240, 650]]); fillStroke(ctx, '#fff', 5); path(ctx, [[760, 550], [820, 440], [890, 560], [830, 530]]); fillStroke(ctx, '#fff', 5);
  applyCam(ctx, cam, .6); ellipse(ctx, 540, 1500, 1100, 420); fillStroke(ctx, '#6aa85a', 8);
  applyCam(ctx, cam, 1); ctx.fillStyle = '#7ec06a'; ctx.fillRect(-2000, TG, 5080, 2000);
}
function shrine(ctx, x, y, s) {
  ctx.beginPath(); ctx.rect(x - s * .35, y - s * .7, s * .7, s * .7); fillStroke(ctx, '#e8dcc0', 7);
  path(ctx, [[x - s * .45, y - s * .7], [x, y - s * 1.15], [x + s * .45, y - s * .7]]); fillStroke(ctx, '#a9412c', 7);
  ctx.beginPath(); ctx.moveTo(x - s * .14, y); ctx.lineTo(x - s * .14, y - s * .32); ctx.arc(x, y - s * .32, s * .14, Math.PI, 0); ctx.lineTo(x + s * .14, y); ctx.closePath(); fillStroke(ctx, '#3a2414', 6);
  line(ctx, x, y - s * 1.15, x, y - s * 1.45, 9); line(ctx, x - s * .1, y - s * 1.34, x + s * .1, y - s * 1.34, 9);
  circle(ctx, x, y - s * .2, s * .05); ctx.fillStyle = '#ffd96a'; ctx.fill();
}
function scroll(ctx, x, y, w, h, lines) {
  rrect(ctx, x - w / 2, y - h / 2, w, h, 10); fillStroke(ctx, '#f2e6c8', 7);
  for (const yy of [y - h / 2, y + h / 2]) { rrect(ctx, x - w / 2 - 20, yy - 16, w + 40, 32, 16); fillStroke(ctx, '#d9c79a', 6); }
  lines.forEach((l, i) => text(ctx, l[0], x, y - h / 2 + 80 + i * (l[2] || 70), l[1], l[3] || INK, INK, 0));
}
