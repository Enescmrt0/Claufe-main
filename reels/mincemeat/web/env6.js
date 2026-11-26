// ---------- props for the Monty Hall reel ----------
const DOORCOL = ['#e0392f', '#2f63c9', '#3fa35b'];
function drawGoat(ctx, x, y, s, t = 0, o = {}) { // x,y = feet centre
  ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
  const lw = Math.max(3, s * .025), chew = Math.sin(t * 9) * s * .01;
  for (const lx of [-.28, -.12, .14, .3]) line(ctx, lx * s, -.32 * s, lx * s, 0, lw * 1.6);
  ellipse(ctx, 0, -.42 * s, .42 * s, .2 * s); fillStroke(ctx, '#f2ede2', lw);
  ellipse(ctx, -.4 * s, -.5 * s, .07 * s, .05 * s, -.6); fillStroke(ctx, '#f2ede2', lw);
  ctx.save(); ctx.translate(.38 * s, -.66 * s);
  path(ctx, [[-.04 * s, -.12 * s], [-.12 * s, -.3 * s], [.0, -.16 * s]]); fillStroke(ctx, '#c9b08a', lw);
  path(ctx, [[.06 * s, -.12 * s], [.04 * s, -.32 * s], [.12 * s, -.14 * s]]); fillStroke(ctx, '#c9b08a', lw);
  ellipse(ctx, .06 * s, 0, .16 * s, .12 * s, .3); fillStroke(ctx, '#f2ede2', lw);
  ellipse(ctx, -.12 * s, -.04 * s, .09 * s, .035 * s, .5); fillStroke(ctx, '#f2ede2', lw);
  circle(ctx, .06 * s, -.03 * s, .03 * s); ctx.fillStyle = INK; ctx.fill();
  path(ctx, [[.12 * s, .08 * s + chew], [.17 * s, .2 * s + chew], [.08 * s, .12 * s + chew]]); fillStroke(ctx, '#d9d2c2', lw * .7);
  ctx.restore(); ctx.restore();
}
function drawCarIcon(ctx, x, y, s, col = '#ffd23a') { // x,y = wheels baseline centre
  const lw = Math.max(3, s * .025);
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(-.5 * s, -.12 * s); ctx.lineTo(-.5 * s, -.28 * s); ctx.quadraticCurveTo(-.46 * s, -.34 * s, -.3 * s, -.36 * s);
  ctx.lineTo(-.18 * s, -.52 * s); ctx.lineTo(.18 * s, -.52 * s); ctx.lineTo(.32 * s, -.36 * s); ctx.quadraticCurveTo(.5 * s, -.34 * s, .52 * s, -.24 * s); ctx.lineTo(.52 * s, -.12 * s); ctx.closePath();
  fillStroke(ctx, col, lw);
  path(ctx, [[-.14 * s, -.48 * s], [-.02 * s, -.48 * s], [-.02 * s, -.37 * s], [-.24 * s, -.37 * s]]); fillStroke(ctx, '#bfe4ff', lw * .7);
  path(ctx, [[.02 * s, -.48 * s], [.15 * s, -.48 * s], [.26 * s, -.37 * s], [.02 * s, -.37 * s]]); fillStroke(ctx, '#bfe4ff', lw * .7);
  for (const wx of [-.3, .3]) { circle(ctx, wx * s, -.1 * s, .11 * s); fillStroke(ctx, '#2a2a2e', lw); circle(ctx, wx * s, -.1 * s, .045 * s); ctx.fillStyle = '#c8c8c8'; ctx.fill(); }
  ctx.restore();
}
// door: x,y bottom centre; open 0..1 swings it; behind 'car'|'goat'|null; xray 0..1 shows what is behind through it
function drawDoor(ctx, x, y, w, h, num, open = 0, behind = null, o = {}) {
  const lw = Math.max(4, w * .03), col = o.col || DOORCOL[(num - 1) % 3];
  rrect(ctx, x - w / 2 - lw * 2, y - h - lw * 2, w + lw * 4, h + lw * 2, lw * 2); fillStroke(ctx, '#4a2c1c', lw);
  ctx.save(); ctx.beginPath(); ctx.rect(x - w / 2, y - h, w, h); ctx.clip();
  const g = ctx.createLinearGradient(0, y - h, 0, y); g.addColorStop(0, '#2a1d3a'); g.addColorStop(1, '#4a3a5a'); ctx.fillStyle = g; ctx.fillRect(x - w / 2, y - h, w, h);
  if (behind && (open > 0 || o.xray)) {
    ctx.globalAlpha = open > 0 ? 1 : o.xray;
    if (behind === 'car') { drawCarIcon(ctx, x, y - h * .1, w * .9); if (o.t != null) for (let i = 0; i < 4; i++) star5(ctx, x - w * .35 + i * w * .23, y - h * .75 + Math.sin(o.t * 4 + i) * 8, w * .05, o.t + i); }
    else if (behind === 'goat') drawGoat(ctx, x - w * .05, y - h * .08, w * .75, o.t || 0);
    ctx.globalAlpha = 1;
  }
  ctx.restore();
  const pw = w * (1 - open);
  if (pw > 2) {
    ctx.globalAlpha = o.xray && !open ? 1 - o.xray * .7 : 1;
    ctx.beginPath(); ctx.rect(x - w / 2, y - h, pw, h); fillStroke(ctx, col, lw);
    if (pw > w * .3) {
      rrect(ctx, x - w / 2 + pw * .14, y - h * .9, pw * .72, h * .36, 10); fillStroke(ctx, 'rgba(255,255,255,.18)', lw * .6);
      rrect(ctx, x - w / 2 + pw * .14, y - h * .48, pw * .72, h * .38, 10); fillStroke(ctx, 'rgba(255,255,255,.18)', lw * .6);
      circle(ctx, x - w / 2 + pw * .82, y - h * .5, w * .045); fillStroke(ctx, '#e8c04a', lw * .5);
      if (num) { circle(ctx, x - w / 2 + pw / 2, y - h * .72, w * .17 * (pw / w)); fillStroke(ctx, '#ffffff', lw * .6); text(ctx, String(num), x - w / 2 + pw / 2, y - h * .72, w * .2 * (pw / w), INK, INK, 0); }
    }
    ctx.globalAlpha = 1;
  }
  if (o.pick) { ctx.save(); ctx.globalAlpha = o.pick; ctx.lineWidth = lw * 2; ctx.strokeStyle = '#ffd23a'; rrect(ctx, x - w / 2 - lw * 4, y - h - lw * 4, w + lw * 8, h + lw * 6, lw * 3); ctx.stroke(); ctx.restore(); }
}
function bowtie(ctx, o, col = '#e0392f') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.scale(o.flip || 1, 1);
  const y = -.6 * s;
  path(ctx, [[0, y], [-.07 * s, y - .035 * s], [-.07 * s, y + .035 * s]]); fillStroke(ctx, col, Math.max(3, s * .01));
  path(ctx, [[0, y], [.07 * s, y - .035 * s], [.07 * s, y + .035 * s]]); fillStroke(ctx, col, Math.max(3, s * .01));
  circle(ctx, 0, y, .018 * s); fillStroke(ctx, col, Math.max(3, s * .01));
  ctx.restore();
}
function hairBun(ctx, o, col = '#5a3a22', bun = true) {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0);
  const hy = -.765 * s + (o.bob || 0) * s;
  if (bun) { circle(ctx, 0, hy - .215 * s, .075 * s); fillStroke(ctx, col, Math.max(4, s * .012)); }
  ctx.beginPath(); ctx.arc(0, hy, .19 * s, Math.PI * 1.08, Math.PI * 1.92); ctx.lineWidth = .045 * s; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.stroke();
  ctx.restore();
}
function greyHair(ctx, o) {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0);
  const hy = -.765 * s;
  for (const side of [-1, 1]) for (let i = 0; i < 3; i++) { circle(ctx, side * (.17 + i * .012) * s, hy - (.1 - i * .07) * s, .045 * s); fillStroke(ctx, '#e6e6e6', Math.max(3, s * .009)); }
  ctx.restore();
}
function specs(ctx, o) {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.scale(o.flip || 1, 1);
  const hy = -.765 * s;
  for (const side of [-1, 1]) { circle(ctx, side * .072 * s, hy - .005 * s, .058 * s); ctx.lineWidth = .012 * s; ctx.strokeStyle = INK; ctx.stroke(); }
  line(ctx, -.014 * s, hy - .01 * s, .014 * s, hy - .01 * s, .012 * s);
  ctx.restore();
}
function mortarboard(ctx, o, col = '#221c22') {
  const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(o.lean || 0);
  const hy = -.765 * s - .17 * s;
  path(ctx, [[-.26 * s, hy], [0, hy - .08 * s], [.26 * s, hy], [0, hy + .08 * s]]); fillStroke(ctx, col, Math.max(3, s * .01), '#000');
  ctx.beginPath(); ctx.rect(-.12 * s, hy, .24 * s, .07 * s); fillStroke(ctx, col, Math.max(3, s * .01), '#000');
  line(ctx, 0, hy, .2 * s, hy + .02 * s, s * .01, '#ffd23a'); line(ctx, .2 * s, hy + .02 * s, .2 * s, hy + .14 * s, s * .012, '#ffd23a');
  ctx.restore();
}
function envelope(ctx, x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.rect(-s / 2, -s * .32, s, s * .64); fillStroke(ctx, '#fbf8f0', Math.max(3, s * .05));
  ctx.beginPath(); ctx.moveTo(-s / 2, -s * .32); ctx.lineTo(0, s * .05); ctx.lineTo(s / 2, -s * .32); ctx.lineWidth = Math.max(3, s * .04); ctx.strokeStyle = INK; ctx.stroke();
  ctx.fillStyle = '#e0392f'; ctx.fillRect(s * .26, -s * .26, s * .14, s * .12);
  ctx.restore();
}
function magazine(ctx, x, y, s, rot = 0, headline = 'THE PUZZLE') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  rrect(ctx, -s * .38, -s * .5, s * .76, s, 10); fillStroke(ctx, '#fbf8f0', 7);
  ctx.fillStyle = '#e0392f'; ctx.fillRect(-s * .38, -s * .5, s * .76, s * .17);
  text(ctx, 'MAGAZINE', 0, -s * .415, s * .09, '#fff', INK, 0);
  text(ctx, headline, 0, -s * .22, s * .085, INK, INK, 0);
  for (let i = 0; i < 3; i++) drawDoor(ctx, -s * .2 + i * s * .2, s * .1, s * .14, s * .22, i + 1, 0, null);
  for (let i = 0; i < 5; i++) { ctx.fillStyle = '#b8b0a0'; ctx.fillRect(-s * .3, s * .2 + i * s * .05, s * (.6 - (i % 2) * .15), s * .02); }
  ctx.restore();
}
function micAt(ctx, x, y, s, rot = -.4) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  line(ctx, 0, 0, 0, s * .9, s * .22, '#2a2a2e');
  circle(ctx, 0, -s * .1, s * .28); fillStroke(ctx, '#9aa1a9', 5);
  ctx.restore();
}
function crt(ctx, x, y, s, inner) { // x,y = centre of the screen
  rrect(ctx, x - s * .62, y - s * .5, s * 1.24, s * 1.05, s * .08); fillStroke(ctx, '#d9d2bf', 8);
  ctx.save(); rrect(ctx, x - s * .5, y - s * .4, s, s * .74, s * .06); ctx.fillStyle = '#0d1a14'; ctx.fill(); ctx.clip(); inner(); ctx.restore();
  rrect(ctx, x - s * .5, y - s * .4, s, s * .74, s * .06); ctx.lineWidth = 8; ctx.strokeStyle = INK; ctx.stroke();
  rrect(ctx, x - s * .3, y + s * .55, s * .6, s * .1, 8); fillStroke(ctx, '#bfb7a2', 6);
  circle(ctx, x + s * .45, y + s * .45, s * .03); ctx.fillStyle = '#7dffb0'; ctx.fill();
}
function stage(ctx, t, cam) {
  applyCam(ctx, cam, .2);
  const g = ctx.createLinearGradient(0, -200, 0, 1400); g.addColorStop(0, '#3a1a5a'); g.addColorStop(1, '#7a2a6a'); ctx.fillStyle = g; ctx.fillRect(-1000, -1000, 3080, 3000);
  ctx.save(); ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 5; i++) { const a = Math.sin(t * .8 + i * 1.7) * .25; ctx.save(); ctx.translate(100 + i * 220, -100); ctx.rotate(a); const gg = ctx.createLinearGradient(0, 0, 0, 1400); gg.addColorStop(0, 'rgba(255,230,170,.22)'); gg.addColorStop(1, 'rgba(255,230,170,0)'); ctx.fillStyle = gg; ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(20, 0); ctx.lineTo(180, 1400); ctx.lineTo(-180, 1400); ctx.fill(); ctx.restore(); }
  ctx.restore();
  for (let i = 0; i < 18; i++) { circle(ctx, 40 + i * 60, 120, 10); ctx.fillStyle = (Math.floor(t * 6) + i) % 2 ? '#ffd23a' : '#ff8a3a'; ctx.fill(); }
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#2a1238'; ctx.fillRect(-1000, 1240, 3080, 1200);
  ctx.fillStyle = '#ffd23a'; ctx.fillRect(-1000, 1240, 3080, 14);
}
function fracLabel(ctx, x, y, s, num, den, col = '#ffd23a') {
  text(ctx, String(num), x, y - s * .55, s, col, INK, s * .18); text(ctx, String(num), x, y - s * .55, s, col, INK, 0);
  line(ctx, x - s * .45, y, x + s * .45, y, s * .12); line(ctx, x - s * .45, y, x + s * .45, y, s * .06, col);
  text(ctx, String(den), x, y + s * .55, s, col, INK, s * .18); text(ctx, String(den), x, y + s * .55, s, col, INK, 0);
}
