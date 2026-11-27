// ---------- props for "The job of waking up a whole town" (Victorian/Edwardian mill town) ----------
const ST = 1240; // pavement line
function nightDawn(ctx, t, cam, k = 0) { // k 0 = deep night, 1 = dawn
  applyCam(ctx, cam, .08); drawSky(ctx, mix('#0b1030', '#5a78c0', k), mix('#26305e', '#ffc89a', k), -400, 1100);
  applyCam(ctx, cam, .1); drawStars(ctx, t, 60, 5, 1 - k); if (k < .6) drawMoon(ctx, 820, 260, 60);
}
// a terrace of brick houses; lit[i] 0..1 lights the upstairs window of house i. returns window centres
function terrace(ctx, x0, n, w, h, lit = [], o = {}) {
  const wins = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + i * w, y = ST - h;
    ctx.beginPath(); ctx.rect(x, y, w, h); fillStroke(ctx, o.brick || '#9a4a32', 7);
    for (let r = 0; r < h / 34; r++) line(ctx, x + 4, y + 20 + r * 34, x + w - 4, y + 20 + r * 34, 2, 'rgba(60,20,10,.35)');
    path(ctx, [[x - 6, y], [x + w / 2, y - 60], [x + w + 6, y]]); fillStroke(ctx, '#3a3440', 7);
    ctx.beginPath(); ctx.rect(x + w * .62, y - 90, 34, 60); fillStroke(ctx, '#7a3a26', 6);
    const wx = x + w / 2, wy = y + h * .3, ww = w * .42, wh = h * .22;
    rrect(ctx, wx - ww / 2, wy - wh / 2, ww, wh, 6); fillStroke(ctx, (lit[i] || 0) > .5 ? '#ffd96a' : '#1b2238', 7);
    line(ctx, wx, wy - wh / 2, wx, wy + wh / 2, 5); line(ctx, wx - ww / 2, wy, wx + ww / 2, wy, 5);
    ctx.beginPath(); ctx.rect(wx - ww / 2 - 10, wy + wh / 2, ww + 20, 12); fillStroke(ctx, '#e8dcc0', 5);
    rrect(ctx, x + w * .12, ST - h * .34, w * .26, h * .34, 4); fillStroke(ctx, ['#2a4a6a', '#4a2a3a', '#2a4a3a'][i % 3], 6);
    rrect(ctx, x + w * .52, ST - h * .3, w * .34, h * .16, 4); fillStroke(ctx, '#1b2238', 6);
    wins.push([wx, wy, ww, wh]);
  }
  return wins;
}
function cobbles(ctx, col = '#4a4650') { ctx.fillStyle = col; ctx.fillRect(-2000, ST, 5080, 2000); const R = rng(3); for (let i = 0; i < 120; i++) { ellipse(ctx, R() * 1400 - 160, ST + 20 + R() * 700, 30, 12); ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fill(); } ctx.fillStyle = '#6a6470'; ctx.fillRect(-2000, ST, 5080, 26); }
function gasLamp(ctx, x, y, on = 1, t = 0) {
  line(ctx, x, y, x, y - 520, 16, '#2a2a30'); path(ctx, [[x - 40, y - 520], [x + 40, y - 520], [x + 26, y - 600], [x - 26, y - 600]]); fillStroke(ctx, on ? '#ffe9a0' : '#3a3a44', 6);
  ctx.beginPath(); ctx.moveTo(x - 46, y - 600); ctx.lineTo(x, y - 640); ctx.lineTo(x + 46, y - 600); ctx.closePath(); fillStroke(ctx, '#2a2a30', 6);
  if (on) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y - 560, 10, x, y - 560, 260); g.addColorStop(0, `rgba(255,220,140,${.35 + .05 * Math.sin(t * 9)})`); g.addColorStop(1, 'rgba(255,220,140,0)'); ctx.fillStyle = g; ctx.fillRect(x - 300, y - 820, 600, 600); ctx.restore(); }
}
// the knocker-up: a stick figure in a shawl and bonnet. pole: angle of the bamboo pole (radians from vertical), or null
function knocker(ctx, o, pole = null, len = 760) {
  const s = o.s || 600;
  if (pole != null) { const hx = o.x + (o.flip || 1) * .2 * s, hy = o.y - .55 * s; line(ctx, hx - Math.sin(pole) * 120, hy + Math.cos(pole) * 120, hx + Math.sin(pole) * len, hy - Math.cos(pole) * len, 12, '#c9a05b'); line(ctx, hx + Math.sin(pole) * len, hy - Math.cos(pole) * len, hx + Math.sin(pole) * (len + 30), hy - Math.cos(pole) * (len + 30), 10, '#6b4a2a'); }
  const so = Object.assign({ cols: ['#5a3a4a', '#5a3a4a'], hat: 'none', belt: false }, o); drawStick(ctx, so);
  ctx.save(); ctx.translate(o.x, o.y); ctx.scale(o.flip || 1, 1); ctx.rotate(o.lean || 0); const hy = -.765 * s + (o.bob || 0) * s;
  path(ctx, [[-.16 * s, -.6 * s], [.16 * s, -.6 * s], [.2 * s, -.42 * s], [0, -.36 * s], [-.2 * s, -.42 * s]]); fillStroke(ctx, '#2a4a6a', Math.max(3, s * .011));
  ctx.beginPath(); ctx.arc(0, hy - .02 * s, .21 * s, Math.PI * 1.02, Math.PI * 1.98); ctx.closePath(); fillStroke(ctx, '#1f1a22', Math.max(3, s * .011));
  ellipse(ctx, 0, hy - .16 * s, .25 * s, .05 * s); fillStroke(ctx, '#1f1a22', Math.max(3, s * .011));
  ctx.restore();
  return so;
}
function flatCap(ctx, o, col = '#5a5a62') { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.scale(o.flip || 1, 1); const hy = -.765 * s; ctx.beginPath(); ctx.arc(0, hy - .02 * s, .2 * s, Math.PI * 1.05, Math.PI * 1.95); ctx.closePath(); fillStroke(ctx, col, Math.max(3, s * .011)); ellipse(ctx, .12 * s, hy - .1 * s, .14 * s, .035 * s, .1); fillStroke(ctx, col, Math.max(3, s * .011)); ctx.restore(); }
function nightcap(ctx, o, col = '#e6e0f0') { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0); const hy = -.765 * s; ctx.beginPath(); ctx.moveTo(-.19 * s, hy - .05 * s); ctx.quadraticCurveTo(0, hy - .4 * s, .32 * s, hy - .2 * s); ctx.lineTo(.19 * s, hy - .05 * s); ctx.closePath(); fillStroke(ctx, col, Math.max(3, s * .011)); circle(ctx, .33 * s, hy - .19 * s, .04 * s); fillStroke(ctx, '#ffffff', Math.max(3, s * .009)); ctx.restore(); }
function peaShooter(ctx, x, y, s, rot = -.4) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(ctx, 0, -s * .04, s, s * .08, s * .04); fillStroke(ctx, '#c9a05b', 5); ctx.restore(); }
function pea(ctx, x, y, r = 10) { circle(ctx, x, y, r); fillStroke(ctx, '#6ab04a', 4); }
function factory(ctx, x, y, w, h, t, clockH = 6) {
  ctx.beginPath(); ctx.rect(x - w / 2, y - h, w, h); fillStroke(ctx, '#8a3a2a', 8);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { rrect(ctx, x - w / 2 + 30 + c * (w - 60) / 6, y - h + 40 + r * 120, (w - 60) / 6 - 24, 80, 6); fillStroke(ctx, '#ffd96a', 5); }
  for (const cx of [x - w * .3, x + w * .32]) { ctx.beginPath(); ctx.rect(cx - 30, y - h - 260, 60, 260); fillStroke(ctx, '#6a2a1a', 7); for (let k = 0; k < 4; k++) { const q = (t * .25 + k / 4) % 1; circle(ctx, cx + q * 80, y - h - 280 - q * 200, 30 + q * 50); ctx.fillStyle = `rgba(80,80,90,${.5 * (1 - q)})`; ctx.fill(); } }
  drawClock(ctx, x, y - h - 80, 80, clockH, '#f4efe4');
}
function factoryGate(ctx, x, y, w, open = 0) { for (let i = 0; i < 12; i++) { const gx = x - w / 2 + i * w / 12 + (i < 6 ? -1 : 1) * open * w * .3; line(ctx, gx, y, gx, y - 420, 10, '#2a2a30'); } line(ctx, x - w / 2, y - 380, x + w / 2, y - 380, 10, '#2a2a30'); line(ctx, x - w / 2, y - 60, x + w / 2, y - 60, 10, '#2a2a30'); }
function oldAlarm(ctx, x, y, s, t = 0, broken = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(broken * .3);
  for (const sd of [-1, 1]) { line(ctx, sd * s * .5, s * .45, sd * s * .7, s * .8, s * .06, '#2a2a30'); circle(ctx, sd * s * .45, -s * .8, s * .25); fillStroke(ctx, '#d9a83a', 7); }
  circle(ctx, 0, 0, s * .8); fillStroke(ctx, '#d9a83a', 8); circle(ctx, 0, 0, s * .64); fillStroke(ctx, '#fbf8f0', 6);
  line(ctx, 0, 0, 0, -s * .45, 8); line(ctx, 0, 0, s * .32, 0, 8); circle(ctx, 0, 0, s * .06); ctx.fillStyle = INK; ctx.fill();
  if (broken > 0) { ctx.beginPath(); for (let i = 0; i <= 30; i++) { const a = i * .5, r = 6 + i * 4 * broken; i ? ctx.lineTo(Math.cos(a) * r + s * .7, Math.sin(a) * r - s * .9 - i * 3 * broken) : ctx.moveTo(s * .7, -s * .9); } ctx.lineWidth = 6; ctx.strokeStyle = '#8a8f98'; ctx.stroke(); }
  ctx.restore();
}
function priceTag(ctx, x, y, s, str) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.2); path(ctx, [[0, 0], [s * .3, -s * .3], [s * 1.6, -s * .3], [s * 1.6, s * .3], [s * .3, s * .3]]); fillStroke(ctx, '#f4efe4', 6); circle(ctx, s * .22, 0, s * .07); ctx.fillStyle = INK; ctx.fill(); text(ctx, str, s * .95, 2, s * .38, '#c8322c', INK, 0); ctx.restore(); }
function penny(ctx, x, y, r) { circle(ctx, x, y, r); fillStroke(ctx, '#c8783a', Math.max(3, r * .12)); circle(ctx, x, y, r * .7); ctx.lineWidth = Math.max(2, r * .06); ctx.strokeStyle = '#8a4a1a'; ctx.stroke(); text(ctx, '1d', x, y + 2, r * .7, '#8a4a1a', INK, 0); }
function bedInWindow(ctx, wx, wy, ww, wh, t, awake = 0) { // a sleeper seen through an upstairs window
  ctx.save(); rrect(ctx, wx - ww / 2, wy - wh / 2, ww, wh, 6); ctx.clip();
  ctx.fillStyle = awake ? '#ffd96a' : '#1b2238'; ctx.fillRect(wx - ww, wy - wh, ww * 2, wh * 2);
  if (awake > .3) { circle(ctx, wx, wy + wh * .1, wh * .32); fillStroke(ctx, '#f6f1e8', 5); circle(ctx, wx - wh * .1, wy + wh * .06, 4); ctx.fillStyle = INK; ctx.fill(); circle(ctx, wx + wh * .1, wy + wh * .06, 4); ctx.fill(); }
  ctx.restore();
}
