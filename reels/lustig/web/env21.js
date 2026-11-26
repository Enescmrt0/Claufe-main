// ---------- props for "The tower that grows in summer" (Eiffel Tower) ----------
const IRON = '#8a5a3a', IRON2 = '#6a4228';
// Eiffel Tower standing on (x,y), height h. o: {grow (1 = normal), lean (px at top), hot (0..1 side glow), side (-1|1)}
function eiffel(ctx, x, y, h, o = {}) {
  const H = h * (o.grow || 1), lean = o.lean || 0;
  const half = yy => { const k = yy / H; return k < .3 ? h * (.36 - .7 * k * .78) : k < .62 ? h * (.196 - (k - .3) * .36) : h * (.08 - (k - .62) * .19); };
  const P = (yy, sd) => [x + sd * Math.max(h * .008, half(yy)) + lean * (yy / H) ** 2, y - yy];
  const col = o.col || IRON, lw = Math.max(3, h * .007);
  // legs + arch
  for (const sd of [-1, 1]) {
    ctx.beginPath(); const pts = []; for (let i = 0; i <= 24; i++) pts.push(P(H * .62 * i / 24, sd)); ctx.moveTo(...pts[0]); pts.forEach(p => ctx.lineTo(...p));
    const inner = []; for (let i = 24; i >= 0; i--) { const yy = H * .62 * i / 24, w = Math.max(0, half(yy) - h * (yy < H * .3 ? .1 : .05)); inner.push([x + sd * w + lean * (yy / H) ** 2, y - yy]); } inner.forEach(p => ctx.lineTo(...p)); ctx.closePath(); fillStroke(ctx, col, lw);
  }
  ctx.beginPath(); ctx.moveTo(...P(H * .02, -1).map((v, i) => i ? v : v + h * .1)); ctx.quadraticCurveTo(x + lean * .01, y - H * .26, P(H * .02, 1)[0] - h * .1, y - H * .02); ctx.lineWidth = lw * 2.2; ctx.strokeStyle = INK; ctx.stroke();
  // upper shaft
  ctx.beginPath(); for (let i = 0; i <= 20; i++) ctx.lineTo(...P(H * (.62 + .36 * i / 20), -1)); for (let i = 20; i >= 0; i--) ctx.lineTo(...P(H * (.62 + .36 * i / 20), 1)); ctx.closePath(); fillStroke(ctx, col, lw);
  // lattice crosses
  ctx.save(); ctx.lineWidth = Math.max(2, h * .003); ctx.strokeStyle = 'rgba(30,20,20,.55)';
  for (let i = 0; i < 26; i++) { const y0 = H * i / 26, y1 = H * (i + 1) / 26; if (y1 > H * .98) break; const a = P(y0, -1), b = P(y1, 1), c = P(y0, 1), d = P(y1, -1); if (y0 < H * .3 && y0 > H * .02) continue; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.moveTo(...c); ctx.lineTo(...d); ctx.stroke(); }
  ctx.restore();
  // platforms
  for (const [k, w] of [[.3, .5], [.62, .3]]) { const yy = H * k; const l = P(yy, -1), r = P(yy, 1); rrect(ctx, l[0] - h * .03, l[1] - h * .03, r[0] - l[0] + h * .06, h * .035, 3); fillStroke(ctx, IRON2, lw); }
  const tp = P(H * .98, 0); rrect(ctx, tp[0] - h * .02, tp[1] - h * .03, h * .04, h * .03, 2); fillStroke(ctx, IRON2, lw); line(ctx, tp[0], tp[1] - h * .03, tp[0] + lean * .02, tp[1] - h * .08, lw * 1.2);
  if (o.hot && !o._g) { ctx.save(); const sd = o.side || 1; ctx.beginPath(); ctx.rect(sd > 0 ? x + lean * .3 : x - h, y - H * 1.2, h, H * 1.3); ctx.clip(); ctx.globalAlpha = .55 * o.hot; eiffel(ctx, x, y, h, Object.assign({}, o, { col: '#ff5a1a', _g: 1 })); ctx.restore(); }
  return P(H, 0);
}
function parisBG(ctx, t, cam, o = {}) {
  applyCam(ctx, cam, .08); drawSky(ctx, o.top || '#5ab0e8', o.bot || '#d8eef8', -400, 1300);
  if (o.sun) { applyCam(ctx, cam, .1); drawSun(ctx, o.sun[0], o.sun[1], 80, t, 1); }
  if (o.moon) { applyCam(ctx, cam, .1); drawStars(ctx, t, 50, 4, .8); drawMoon(ctx, o.moon[0], o.moon[1], 64); }
  applyCam(ctx, cam, .14); if (!o.night) { drawCloud(ctx, 160 + t * 6, 420, 80, 1, .9); drawCloud(ctx, 860 + t * 4, 560, 60, 2, .9); }
  applyCam(ctx, cam, .4); for (let i = 0; i < 9; i++) { const r = rng(i * 5 + 2), w = 110 + r() * 60, hh = 140 + r() * 80, x = -60 + i * 140; rrect(ctx, x, 1170 - hh, w, hh, 3); fillStroke(ctx, o.night ? '#4a4a6a' : '#e8dcc4', 5); ctx.fillStyle = o.night ? '#2a2a40' : '#5a6a8a'; ctx.fillRect(x - 4, 1170 - hh - 26, w + 8, 28); for (let k = 0; k < 3; k++) { ctx.fillStyle = o.night ? '#ffd86a' : '#6a7a9a'; ctx.fillRect(x + 16 + k * (w - 40) / 3, 1170 - hh + 30, 18, 30); } }
  applyCam(ctx, cam, 1); ctx.fillStyle = o.snow ? '#f2f6fa' : (o.night ? '#2f5a43' : '#6ab85a'); ctx.fillRect(-1000, 1240, 3000, 1000); line(ctx, -1000, 1240, 3000, 1240, 7);
  if (o.snow) for (let i = 0; i < 40; i++) { const r = rng(i * 9 + 1); circle(ctx, ((r() * 1200 + t * 30 * (r() + .5)) % 1200) - 60, (r() * 1300 + t * 120 * (r() + .5)) % 1300, 4 + r() * 5); ctx.fillStyle = '#ffffff'; ctx.fill(); }
}
function ironBar(ctx, x, y, w, h = 60, hot = 0) { rrect(ctx, x, y - h / 2, w, h, 8); fillStroke(ctx, lerpC('#8a8f98', '#ff6a2a', hot), 6); for (let i = 1; i < 4; i++) circle(ctx, x + i * w / 4, y, 8), ctx.fillStyle = 'rgba(0,0,0,.35)', ctx.fill(); }
function lerpC(a, b, k) { const A = hex2rgb(a), B = hex2rgb(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`; }
function rivet(ctx, x, y, r) { circle(ctx, x, y, r); fillStroke(ctx, '#b8a080', Math.max(3, r * .2)); circle(ctx, x - r * .3, y - r * .3, r * .25); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fill(); }
function flame(ctx, x, y, s, t) { for (let i = 0; i < 3; i++) { const k = 1 - i * .28, wob = Math.sin(t * 14 + i) * s * .05; ctx.beginPath(); ctx.moveTo(x - s * .3 * k, y); ctx.quadraticCurveTo(x - s * .35 * k, y - s * .5 * k, x + wob, y - s * k); ctx.quadraticCurveTo(x + s * .35 * k, y - s * .5 * k, x + s * .3 * k, y); ctx.closePath(); ctx.fillStyle = ['#ff5a2a', '#ffa02a', '#ffe06a'][i]; ctx.fill(); if (!i) { ctx.lineWidth = 5; ctx.strokeStyle = INK; ctx.stroke(); } } }
function weight(ctx, x, y, s, txt) { path(ctx, [[x - s * .5, y], [x - s * .35, y - s * .8], [x + s * .35, y - s * .8], [x + s * .5, y]]); fillStroke(ctx, '#4a4a54', 7); circle(ctx, x, y - s * .9, s * .12); ctx.lineWidth = 10; ctx.strokeStyle = INK; ctx.stroke(); text(ctx, txt, x, y - s * .38, s * .2, '#ffffff', INK, 0); }
function gustave(ctx, o) { const so = Object.assign({ cols: ['#2a2a34', '#2a2a34'], hat: 'none', belt: false }, o); drawStick(ctx, so); const s = so.s; ctx.save(); ctx.translate(so.x, so.y); ctx.scale(so.flip || 1, 1); ctx.beginPath(); ctx.moveTo(-.13 * s, -.74 * s); ctx.quadraticCurveTo(0, -.5 * s, .13 * s, -.74 * s); ctx.quadraticCurveTo(0, -.66 * s, -.13 * s, -.74 * s); ctx.fillStyle = '#8a8a8a'; ctx.fill(); ctx.lineWidth = Math.max(3, s * .01); ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); topHat(ctx, so); return so; }
function blueprint(ctx, x, y, w, h, t) { rrect(ctx, x - w / 2, y - h / 2, w, h, 8); fillStroke(ctx, '#2a5aa8', 6); ctx.save(); ctx.globalAlpha = .25; for (let i = 1; i < 8; i++) { line(ctx, x - w / 2 + i * w / 8, y - h / 2, x - w / 2 + i * w / 8, y + h / 2, 2, '#ffffff'); line(ctx, x - w / 2, y - h / 2 + i * h / 8, x + w / 2, y - h / 2 + i * h / 8, 2, '#ffffff'); } ctx.restore(); eiffel(ctx, x, y + h * .42, h * .8, { col: 'rgba(255,255,255,.0)', lean: Math.sin(t * 2) * 20 }); }
