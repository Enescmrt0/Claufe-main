// ---------- props for "Apollo 13: Four Days to Get Home" (landscape film) ----------
const SPACE_TOP = '#03040c', SPACE_BOT = '#0b1030';
function space(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .03); drawSky(ctx, o.top || SPACE_TOP, o.bot || SPACE_BOT, -400, 1500);
  applyCam(ctx, cam, .06); drawStars(ctx, t, o.stars || 90, 5, 1); ctx.save(); ctx.translate(0, 560); drawStars(ctx, t, o.stars || 90, 11, 1); ctx.restore();
  applyCam(ctx, cam, 1);
}
function earth(ctx, x, y, r, t = 0) {
  ctx.save(); circle(ctx, x, y, r); ctx.fillStyle = '#2f7de0'; ctx.fill(); ctx.clip();
  const R = rng(4); ctx.fillStyle = '#3aa35b';
  for (let i = 0; i < 7; i++) { const a = R() * TAU, d = R() * r * .8; ellipse(ctx, x + Math.cos(a) * d + ((t * 6) % (r * 2)) - r * .2, y + Math.sin(a) * d, r * (.15 + R() * .25), r * (.1 + R() * .18), R() * 3); ctx.fill(); }
  ctx.globalAlpha = .7; ctx.fillStyle = '#ffffff'; for (let i = 0; i < 6; i++) { const a = R() * TAU, d = R() * r; ellipse(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, r * .3, r * .05, R()); ctx.fill(); }
  ctx.globalAlpha = .35; ctx.fillStyle = '#000'; circle(ctx, x + r * .45, y + r * .2, r * 1.05); ctx.fill();
  ctx.restore(); circle(ctx, x, y, r); ctx.lineWidth = Math.max(4, r * .03); ctx.strokeStyle = INK; ctx.stroke();
}
function moon(ctx, x, y, r) {
  ctx.save(); circle(ctx, x, y, r); ctx.fillStyle = '#c9c6bd'; ctx.fill(); ctx.clip();
  const R = rng(8); for (let i = 0; i < 14; i++) { const a = R() * TAU, d = R() * r * .9; circle(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d, r * (.05 + R() * .12)); ctx.fillStyle = '#a7a39a'; ctx.fill(); }
  ctx.globalAlpha = .3; ctx.fillStyle = '#000'; circle(ctx, x + r * .5, y + r * .15, r); ctx.fill(); ctx.restore();
  circle(ctx, x, y, r); ctx.lineWidth = Math.max(4, r * .03); ctx.strokeStyle = INK; ctx.stroke();
}
// the docked stack, side view facing +x: CM cone (nose), SM cylinder with a bay panel, LM on the CM's nose
// o: { panel: 0 attached .. 1 blown away, vent: 0..1 gas cloud, lm: true, lmLit, cmLit, flame (SM / LM engine) }
function stack(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); const lw = Math.max(4, s * .012);
  if (o.vent > 0) { for (let i = 0; i < 26; i++) { const q = ((t * .6 + i / 26) % 1), a = -1.2 - q * .8 + Math.sin(i * 7) * .4, d = q * s * 1.4 * o.vent; ctx.globalAlpha = (1 - q) * .55 * o.vent; circle(ctx, -s * .1 + Math.cos(a) * d * .4, -s * .2 + Math.sin(a) * d, s * (.04 + q * .14)); ctx.fillStyle = '#e8eef8'; ctx.fill(); } ctx.globalAlpha = 1; }
  if (o.flame) { const f = o.flame * (1 + .15 * Math.sin(t * 40)); path(ctx, [[-s * .62, -s * .07], [-s * .62 - s * .4 * f, 0], [-s * .62, s * .07]]); ctx.fillStyle = '#ffb12a'; ctx.fill(); path(ctx, [[-s * .62, -s * .04], [-s * .62 - s * .22 * f, 0], [-s * .62, s * .04]]); ctx.fillStyle = '#fff4c0'; ctx.fill(); }
  // service module
  if (!o.noSM) {
    path(ctx, [[-s * .62, -s * .06], [-s * .55, -s * .1], [-s * .55, s * .1], [-s * .62, s * .06]]); fillStroke(ctx, '#55585e', lw);
    ctx.beginPath(); ctx.rect(-s * .55, -s * .16, s * .5, s * .32); fillStroke(ctx, '#e4e6ea', lw);
    for (let i = 1; i < 5; i++) line(ctx, -s * .55 + i * s * .1, -s * .16, -s * .55 + i * s * .1, s * .16, lw * .5, 'rgba(34,28,34,.35)');
    const p = o.panel || 0;
    if (p > 0) { ctx.beginPath(); ctx.rect(-s * .4, -s * .16, s * .2, s * .26); ctx.fillStyle = '#2a2420'; ctx.fill(); for (let i = 0; i < 6; i++) line(ctx, -s * .38 + i * s * .03, -s * .1, -s * .37 + i * s * .03, s * .06, lw * .6, ['#c8322c', '#e0a244', '#8a8a8a'][i % 3]); }
    ctx.save(); ctx.translate(-s * .3 + p * s * .2, -s * .16 - p * s * .9); ctx.rotate(p * 3.5); ctx.globalAlpha = 1 - p * .6; ctx.beginPath(); ctx.rect(-s * .1, 0, s * .2, s * .26); fillStroke(ctx, '#cfd2d8', lw); ctx.restore();
    line(ctx, -s * .5, -s * .16, -s * .5, -s * .28, lw * .8); rrect(ctx, -s * .56, -s * .34, s * .12, s * .06, 4); fillStroke(ctx, '#c8cbd2', lw * .6);
  }
  // command module (cone pointing +x)
  if (!o.cmHide) { path(ctx, [[-s * .05, -s * .17], [s * .2, -s * .05], [s * .2, s * .05], [-s * .05, s * .17]]); fillStroke(ctx, '#d8dbe0', lw);
  rrect(ctx, s * .04, -s * .08, s * .05, s * .05, 3); fillStroke(ctx, o.cmLit === false ? '#2a3040' : '#ffd66e', lw * .6); }
  if (o.lm !== false) {
    // lunar module docked nose-to-nose: gold-foil descent stage + grey ascent stage, legs folded
    ctx.save(); ctx.translate(s * .2, 0);
    ctx.beginPath(); ctx.rect(s * .0, -s * .05, s * .04, s * .1); fillStroke(ctx, '#9aa0a8', lw * .7);
    path(ctx, [[s * .04, -s * .14], [s * .2, -s * .17], [s * .24, -s * .05], [s * .24, s * .05], [s * .2, s * .17], [s * .04, s * .14]]); fillStroke(ctx, '#b9bcc4', lw);
    rrect(ctx, s * .07, -s * .07, s * .05, s * .05, 3); fillStroke(ctx, o.lmLit === false ? '#2a3040' : '#ffd66e', lw * .6);
    ctx.beginPath(); ctx.rect(s * .24, -s * .2, s * .2, s * .4); fillStroke(ctx, '#d9a83a', lw);
    for (let i = 0; i < 5; i++) line(ctx, s * .26, -s * .16 + i * s * .08, s * .42, -s * .14 + i * s * .08, lw * .4, 'rgba(120,70,10,.5)');
    for (const sd of [-1, 1]) line(ctx, s * .44, sd * s * .18, s * .56, sd * s * .27, lw * .8, '#9aa0a8');
    if (o.lmFlame) { const f = o.lmFlame * (1 + .15 * Math.sin(t * 40)); path(ctx, [[s * .44, -s * .06], [s * .44 + s * .4 * f, 0], [s * .44, s * .06]]); ctx.fillStyle = '#ffb12a'; ctx.fill(); path(ctx, [[s * .44, -s * .03], [s * .44 + s * .2 * f, 0], [s * .44, s * .03]]); ctx.fillStyle = '#fff4c0'; ctx.fill(); }
    ctx.restore();
  }
  ctx.restore();
}
function saturnV(ctx, x, y, s, t, flame = 0) {
  ctx.save(); ctx.translate(x, y); const lw = Math.max(4, s * .012);
  if (flame) { const f = flame * (1 + .1 * Math.sin(t * 30)); ellipse(ctx, 0, s * .1 + s * .25 * f, s * .09, s * .3 * f); ctx.fillStyle = '#ffb12a'; ctx.fill(); ellipse(ctx, 0, s * .05 + s * .15 * f, s * .05, s * .18 * f); ctx.fillStyle = '#fff4c0'; ctx.fill(); for (let i = 0; i < 10; i++) { const q = ((t * .8 + i / 10) % 1); ctx.globalAlpha = (1 - q) * .7; circle(ctx, (i % 2 ? 1 : -1) * q * s * .5, s * .3 + q * s * .2, s * (.05 + q * .12)); ctx.fillStyle = '#efe8dc'; ctx.fill(); } ctx.globalAlpha = 1; }
  ctx.beginPath(); ctx.rect(-s * .06, -s * .55, s * .12, s * .55); fillStroke(ctx, '#f4f4f0', lw);
  for (const [y0, h] of [[-.5, .05], [-.32, .04], [-.12, .05]]) { ctx.fillStyle = INK; ctx.fillRect(-s * .06, y0 * s, s * .12, h * s); }
  path(ctx, [[-s * .045, -s * .55], [0, -s * .7], [s * .045, -s * .55]]); fillStroke(ctx, '#f4f4f0', lw); line(ctx, 0, -s * .7, 0, -s * .78, lw);
  for (const sd of [-1, 1]) { path(ctx, [[sd * s * .06, -s * .08], [sd * s * .1, 0], [sd * s * .06, 0]]); fillStroke(ctx, INK, lw * .5); }
  ctx.restore();
}
// mission control room: rows of consoles with green screens, big wall map. inner(depthRow) draws people
function missionControl(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .4); ctx.fillStyle = '#2a2f3a'; ctx.fillRect(-800, -800, 3600, 2600);
  rrect(ctx, 260, 70, 1400, 380, 10); fillStroke(ctx, '#0d1a14', 8);
  ctx.save(); ctx.beginPath(); ctx.rect(270, 80, 1380, 360); ctx.clip();
  ctx.strokeStyle = 'rgba(125,255,176,.25)'; ctx.lineWidth = 2; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(270 + i * 100, 80); ctx.lineTo(270 + i * 100, 440); ctx.stroke(); }
  ctx.beginPath(); for (let x = 270; x <= 1650; x += 10) { const y = 260 + Math.sin(x * .006) * 120; x === 270 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.lineWidth = 4; ctx.strokeStyle = '#7dffb0'; ctx.stroke();
  const q = (o.track == null ? (t * .03) % 1 : o.track); circle(ctx, 270 + q * 1380, 260 + Math.sin((270 + q * 1380) * .006) * 120, 12); ctx.fillStyle = '#ffd23a'; ctx.fill();
  if (o.wall) o.wall(); ctx.restore();
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#5a5248'; ctx.fillRect(-800, GY - 30, 3600, 1200);
  if (o.inner) o.inner();
}
function consoleRow(ctx, y, t, n = 6, lit = 1) {
  for (let i = 0; i < n; i++) { const x = 140 + i * 300; rrect(ctx, x, y - 160, 260, 170, 12); fillStroke(ctx, '#9aa0a0', 7); rrect(ctx, x + 40, y - 140, 180, 100, 8); fillStroke(ctx, lit ? '#103a26' : '#0b1410', 5); if (lit) for (let k = 0; k < 4; k++) line(ctx, x + 60, y - 120 + k * 20, x + 60 + 40 + ((i * 37 + k * 53 + Math.floor(t * 3) * 11) % 100), y - 120 + k * 20, 4, '#7dffb0'); for (let k = 0; k < 5; k++) { circle(ctx, x + 40 + k * 45, y - 22, 8); ctx.fillStyle = ['#e0392f', '#ffd23a', '#7dffb0', '#ffffff', '#5fb6f0'][(k + i) % 5]; ctx.fill(); } }
}
function controller(ctx, o) { const so = Object.assign({ cols: ['#f6f6f2', '#f6f6f2'], hat: 'none', belt: false }, o); drawStick(ctx, so); headphones(ctx, so); if (so.tie !== false) { ctx.save(); ctx.translate(so.x, so.y); const s = so.s || 600; path(ctx, [[0, -.6 * s], [-.02 * s, -.48 * s], [0, -.42 * s], [.02 * s, -.48 * s]]); fillStroke(ctx, so.tieCol || '#2a4a7a', 3); ctx.restore(); } if (so.specs) specs(ctx, so); return so; }
function astro(ctx, o) { const so = Object.assign({ cols: ['#f2f2ec', '#f2f2ec'], hat: 'none', belt: false }, o); drawStick(ctx, so); if (so.cap) headphones(ctx, so); return so; }
// cramped cabin with a window and a panel. o: { cold 0..1 frost, dark, window: fn(x,y,r) }
function cabin(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, 1); const dark = o.dark || 0;
  ctx.fillStyle = lerpColor('#8a8f98', '#3a3f4a', dark); ctx.fillRect(-600, -600, 3200, 2400);
  for (let i = 0; i < 9; i++) line(ctx, -200 + i * 280, -600, -200 + i * 280, 2000, 5, 'rgba(0,0,0,.15)');
  // window
  const wx = o.wx || 1460, wy = o.wy || 330, wr = 200;
  ctx.save(); path(ctx, [[wx - wr, wy - wr * .7], [wx + wr, wy - wr * .9], [wx + wr * .9, wy + wr * .8], [wx - wr * .9, wy + wr * .7]]); ctx.fillStyle = '#050714'; ctx.fill(); ctx.clip(); drawStars(ctx, t, 30, 3, 1); if (o.window) o.window(wx, wy, wr); ctx.restore();
  path(ctx, [[wx - wr, wy - wr * .7], [wx + wr, wy - wr * .9], [wx + wr * .9, wy + wr * .8], [wx - wr * .9, wy + wr * .7]]); ctx.lineWidth = 16; ctx.strokeStyle = '#2a2d33'; ctx.stroke();
  // panel
  rrect(ctx, 120, 120, 900, 380, 16); fillStroke(ctx, lerpColor('#4a4f58', '#22252c', dark), 8);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) { const on = o.lights ? o.lights(r, c) : (dark < .5); circle(ctx, 180 + c * 85, 180 + r * 85, 18); ctx.fillStyle = on ? ['#ffd23a', '#7dffb0', '#e0392f', '#ffffff'][(r * 3 + c) % 4] : '#1a1c22'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = INK; ctx.stroke(); }
  ctx.fillStyle = '#3a3d44'; ctx.fillRect(-600, GY - 30, 3200, 1200);
  if (o.cold > 0) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = o.cold * .28; ctx.fillStyle = '#9ad0ff'; ctx.fillRect(0, 0, 1920, 1080); ctx.globalAlpha = o.cold; const R = rng(3); for (let i = 0; i < 40; i++) { const x = R() * 1920, y = R() * 1080; circle(ctx, x, y + ((t * 20 * R()) % 30), 5 + R() * 6); ctx.fillStyle = 'rgba(220,240,255,.55)'; ctx.fill(); } ctx.restore(); }
}
function lerpColor(a, b, k) { const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16); const ch = (s) => Math.round(lerp((pa >> s) & 255, (pb >> s) & 255, clamp(k))); return `rgb(${ch(16)},${ch(8)},${ch(0)})`; }
function warnLight(ctx, x, y, s, on, lab = 'MASTER ALARM') { rrect(ctx, x - s / 2, y - s * .3, s, s * .6, 10); fillStroke(ctx, on ? '#ff3a2a' : '#5a1a1a', 7); if (on) { ctx.save(); ctx.globalAlpha = .35; circle(ctx, x, y, s * .9); ctx.fillStyle = '#ff3a2a'; ctx.fill(); ctx.restore(); } text(ctx, lab, x, y, s * .13, on ? '#ffffff' : '#a86a6a', INK, 0); }
function o2Tank(ctx, x, y, r, t, o = {}) {
  const sh = o.shake ? Math.sin(t * 50) * o.shake * 8 : 0; ctx.save(); ctx.translate(x + sh, y);
  circle(ctx, 0, 0, r); fillStroke(ctx, o.hot ? lerpColor('#d8dbe0', '#ff7a3a', o.hot) : '#d8dbe0', 8);
  ctx.beginPath(); ctx.rect(-r * .08, -r * 1.2, r * .16, r * .25); fillStroke(ctx, '#9aa0a8', 6);
  if (o.cut) { ctx.save(); circle(ctx, 0, 0, r * .8); ctx.clip(); ctx.fillStyle = '#cfe6ff'; ctx.fillRect(-r, -r, 2 * r, 2 * r); ctx.beginPath(); ctx.moveTo(0, -r); ctx.lineTo(0, r * .6); ctx.lineWidth = 10; ctx.strokeStyle = '#8a8a8a'; ctx.stroke(); for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const yy = -r * .7 + k * r * .07; ctx.lineTo(r * (.1 + i * .08) * Math.sin(k * 1.3 + i), yy); } ctx.lineWidth = 6; ctx.strokeStyle = o.burnt ? '#2a2020' : '#e0a244'; ctx.stroke(); } if (o.fan) { ctx.save(); ctx.translate(0, r * .5); ctx.rotate(t * 20); for (let k = 0; k < 3; k++) { ctx.rotate(TAU / 3); ellipse(ctx, 0, -r * .12, r * .05, r * .12); fillStroke(ctx, '#5a5f68', 4); } ctx.restore(); } ctx.restore(); }
  text(ctx, o.lab || 'O₂ TANK 2', 0, -r * 1.42, r * .2, '#ffffff', INK, 0); ctx.restore();
}
function toggleSwitch(ctx, x, y, s, on) { rrect(ctx, x - s * .5, y - s * .5, s, s, s * .12); fillStroke(ctx, '#3a3d44', 7); circle(ctx, x, y, s * .16); fillStroke(ctx, '#9aa0a8', 5); const a = on ? -.6 : .6; line(ctx, x, y, x + Math.sin(a) * s * .1, y - Math.cos(a) * s * .38 * (on ? 1 : -1), s * .1, '#d8dbe0'); circle(ctx, x + Math.sin(a) * s * .1, y - Math.cos(a) * s * .38 * (on ? 1 : -1), s * .08); fillStroke(ctx, '#ffffff', 4); }
function filterBox(ctx, x, y, s, shape = 'square', col = '#d9d9d2') { if (shape === 'square') { rrect(ctx, x - s / 2, y - s / 2, s, s, s * .06); fillStroke(ctx, col, 8); for (let i = 1; i < 6; i++) line(ctx, x - s / 2 + i * s / 6, y - s / 2 + 10, x - s / 2 + i * s / 6, y + s / 2 - 10, 3, 'rgba(34,28,34,.35)'); } else { circle(ctx, x, y, s / 2); fillStroke(ctx, col, 8); for (let i = 1; i < 6; i++) { circle(ctx, x, y, s / 2 * i / 6); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(34,28,34,.3)'; ctx.stroke(); } } }
function hole(ctx, x, y, s, shape = 'round') { if (shape === 'round') { circle(ctx, x, y, s / 2); } else { ctx.beginPath(); ctx.rect(x - s / 2, y - s / 2, s, s); } ctx.fillStyle = '#14161c'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = '#9aa0a8'; ctx.stroke(); }
function sock(ctx, x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.moveTo(-s * .15, -s * .5); ctx.lineTo(s * .15, -s * .5); ctx.lineTo(s * .15, s * .1); ctx.quadraticCurveTo(s * .5, s * .15, s * .5, s * .35); ctx.lineTo(-s * .05, s * .35); ctx.quadraticCurveTo(-s * .15, s * .3, -s * .15, s * .1); ctx.closePath(); fillStroke(ctx, '#f4f0e6', 6); line(ctx, -s * .15, -s * .38, s * .15, -s * .38, 6, '#2f7de0'); ctx.restore(); }
function ductTape(ctx, x, y, s) { circle(ctx, x, y, s / 2); fillStroke(ctx, '#9aa0a8', 7); circle(ctx, x, y, s * .26); fillStroke(ctx, '#c8a070', 5); circle(ctx, x, y, s * .2); ctx.fillStyle = '#3a3d44'; ctx.fill(); path(ctx, [[x + s * .4, y + s * .3], [x + s * .9, y + s * .4], [x + s * .85, y + s * .55], [x + s * .35, y + s * .45]]); fillStroke(ctx, '#9aa0a8', 5); }
function plasticBag(ctx, x, y, s) { path(ctx, [[x - s * .4, y - s * .3], [x + s * .4, y - s * .35], [x + s * .45, y + s * .35], [x - s * .45, y + s * .3]]); ctx.fillStyle = 'rgba(220,235,255,.6)'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); }
function cardboard(ctx, x, y, s, rot = .1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.beginPath(); ctx.rect(-s / 2, -s * .35, s, s * .7); fillStroke(ctx, '#c89a62', 6); text(ctx, 'FLIGHT PLAN', 0, 0, s * .1, '#5a3a1a', INK, 0); ctx.restore(); }
function hose(ctx, x, y, s) { ctx.beginPath(); ctx.moveTo(x - s * .5, y); ctx.bezierCurveTo(x - s * .2, y - s * .4, x + s * .1, y + s * .4, x + s * .5, y); ctx.lineWidth = s * .12; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = s * .08; ctx.strokeStyle = '#4a7aa8'; ctx.stroke(); }
// the "mailbox": square filter taped into a bag with a hose into the round socket
function mailbox(ctx, x, y, s, k = 1) {
  ctx.save(); ctx.translate(x, y);
  if (k > 0) filterBox(ctx, 0, 0, s * .6, 'square');
  if (k > .25) { ctx.globalAlpha = clamp((k - .25) * 4); cardboard(ctx, -s * .38, 0, s * .4, 1.57); cardboard(ctx, s * .38, 0, s * .4, -1.57); ctx.globalAlpha = 1; }
  if (k > .5) { ctx.globalAlpha = clamp((k - .5) * 4); plasticBag(ctx, 0, 0, s * 1.2); ctx.globalAlpha = 1; }
  if (k > .7) { ctx.globalAlpha = clamp((k - .7) * 4); for (const yy of [-.25, .25]) { ctx.beginPath(); ctx.rect(-s * .55, yy * s - s * .04, s * 1.1, s * .08); fillStroke(ctx, '#9aa0a8', 4); } ctx.globalAlpha = 1; }
  if (k > .85) { ctx.globalAlpha = clamp((k - .85) * 6); hose(ctx, s * .85, s * .2, s * .6); ctx.globalAlpha = 1; }
  ctx.restore();
}
function co2Meter(ctx, x, y, h, frac, danger = .7) { rrect(ctx, x - 50, y - h, 100, h, 20); fillStroke(ctx, '#20232a', 8); ctx.fillStyle = 'rgba(224,57,47,.25)'; ctx.fillRect(x - 42, y - h + 8, 84, h * (1 - danger) - 8); const col = frac > danger ? '#e0392f' : frac > .45 ? '#ffb12a' : '#7dffb0'; rrect(ctx, x - 36, y - h * frac, 72, h * frac - 8, 14); fillStroke(ctx, col, 5); text(ctx, 'CO₂', x, y + 50, 46, '#ffffff', INK, 0); }
function phoneBooth(ctx, x, y, s) { rrect(ctx, x - s * .25, y - s, s * .5, s, 10); fillStroke(ctx, '#c8322c', 8); for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) { ctx.beginPath(); ctx.rect(x - s * .19 + c * s * .2, y - s * .82 + r * s * .2, s * .18, s * .17); fillStroke(ctx, '#cfe6f4', 5); } rrect(ctx, x - s * .2, y - s * .97, s * .4, s * .08, 6); fillStroke(ctx, '#1f1a1a', 5); text(ctx, 'PHONE', x, y - s * .93, s * .06, '#ffffff', INK, 0); }
function capsule(ctx, x, y, s, t, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
  if (o.fire > 0) { for (let i = 0; i < 18; i++) { const q = ((t * 1.5 + i / 18) % 1); ctx.globalAlpha = (1 - q) * o.fire; circle(ctx, (Math.sin(i * 3.1) * .45) * s * (1 + q * .6), s * .3 - q * s * 1.4, s * (.18 + q * .3)); ctx.fillStyle = ['#ff7a2a', '#ffb12a', '#ffe08a'][i % 3]; ctx.fill(); } ctx.globalAlpha = 1; }
  path(ctx, [[-s * .12, -s * .4], [s * .12, -s * .4], [s * .5, s * .25], [-s * .5, s * .25]]); fillStroke(ctx, o.burnt ? '#8a7a68' : '#d8dbe0', Math.max(4, s * .02));
  ellipse(ctx, 0, s * .27, s * .52, s * .08); fillStroke(ctx, o.fire > 0 ? '#ff9a3a' : '#6a4a2a', Math.max(4, s * .02));
  rrect(ctx, -s * .05, -s * .2, s * .1, s * .1, 4); fillStroke(ctx, '#2a3040', 4);
  ctx.restore();
}
function parachutes(ctx, x, y, s, k = 1, t = 0) { for (let i = -1; i <= 1; i++) { const cx = x + i * s * .55, cy = y - s * 1.1 * k + Math.abs(i) * s * .12, r = s * .32 * k; if (k <= .05) continue; line(ctx, x, y, cx - r, cy, 3, 'rgba(34,28,34,.6)'); line(ctx, x, y, cx + r, cy, 3, 'rgba(34,28,34,.6)'); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0); ctx.closePath(); ctx.clip(); for (let k2 = 0; k2 < 8; k2++) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, Math.PI + k2 * Math.PI / 8, Math.PI + (k2 + 1) * Math.PI / 8); ctx.fillStyle = k2 % 2 ? '#e0392f' : '#ffffff'; ctx.fill(); } ctx.restore(); ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0); ctx.closePath(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); } }
function ocean(ctx, t, y = 760) { const g = ctx.createLinearGradient(0, y, 0, y + 600); g.addColorStop(0, '#2a7ac0'); g.addColorStop(1, '#134a7a'); ctx.fillStyle = g; ctx.fillRect(-800, y, 3600, 1200); for (let i = 0; i < 24; i++) { const x = ((i * 173 + t * 30) % 2200) - 140, yy = y + 30 + (i * 47) % 300; line(ctx, x, yy, x + 70, yy, 5, 'rgba(255,255,255,.4)'); } }
function carrier(ctx, x, y, s) { path(ctx, [[x - s * .5, y - s * .05], [x + s * .5, y - s * .05], [x + s * .42, y + s * .05], [x - s * .45, y + s * .05]]); fillStroke(ctx, '#6a7380', 6); ctx.beginPath(); ctx.rect(x + s * .1, y - s * .14, s * .1, s * .09); fillStroke(ctx, '#7a838e', 5); }
function heli(ctx, x, y, s, t) { ellipse(ctx, x, y, s * .3, s * .14); fillStroke(ctx, '#e8e8e0', 5); line(ctx, x + s * .25, y, x + s * .6, y - s * .05, s * .05); line(ctx, x - s * .4 * Math.cos(t * 30), y - s * .2, x + s * .4 * Math.cos(t * 30), y - s * .2, 5); line(ctx, x, y - s * .14, x, y - s * .2, 5); }
function measles(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const R = rng(2); for (let i = 0; i < 9; i++) { circle(ctx, (R() - .5) * .26 * s, -.765 * s + (R() - .4) * .22 * s, s * .014); ctx.fillStyle = '#e0392f'; ctx.fill(); } ctx.restore(); }
function trajectory(ctx, ex, ey, mx, my, k, col = '#ffd23a', free = true) {
  // outbound leg from Earth to the Moon, around the back, then home: drawn as dots up to k (0..1)
  const pts = []; for (let i = 0; i <= 120; i++) { const q = i / 120; let x, y; if (q < .42) { const u = q / .42; x = lerp(ex + 80, mx - 70, u); y = lerp(ey - 30, my - 80, u) - Math.sin(u * Math.PI) * 60; } else if (q < .58) { const a = -Math.PI / 2 + (q - .42) / .16 * Math.PI; x = mx + Math.cos(a) * 110 - 70 * (1 - Math.cos(a)) * 0; y = my + Math.sin(a) * 110; } else { const u = (q - .58) / .42; x = lerp(mx - 70, ex + 80, u); y = lerp(my + 80, ey + 30, u) + Math.sin(u * Math.PI) * 60; } pts.push([x, y]); }
  const n = Math.floor(pts.length * clamp(k)); for (let i = 0; i < n; i += 2) { circle(ctx, pts[i][0], pts[i][1], 6); ctx.fillStyle = col; ctx.fill(); }
  return pts[Math.max(0, n - 1)];
}
