// ---------- "egg-head" full-body character (reference style: dressed bodies, mitten hands, stubble) ----------
// person(ctx, o): o.x, o.y = feet; o.s = full height px; o.flip; o.lean
// o.coat, o.pants, o.shoes colours; o.collar ('v' | 'sailor' | 'high' | 'none'); o.buttons; o.belt
// o.arms {L:[a1,a2], R:[a1,a2]} (same angle convention as drawStick); o.legs {L:[a1,a2], R:[a1,a2]}
// o.face {eyes:'normal'|'half'|'wide'|'closed'|'angry', mouth:'flat'|'smile'|'o'|'frown'|'grin'|'shout', look:[x,y], brow:-1..1}
// o.hair: 'crop'|'side'|'bald'|'none'; o.hairCol; o.stubble; o.scar; o.blush; o.sweat; o.hat: function(ctx, H) drawn in head space
const SKIN = '#f4f0e8', SKIN_SH = '#dcd6ca';
function thickLimb(ctx, pts, w, col) { ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) ctx.lineTo(...pts[i]); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = w + .022; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke(); }
function limb2(ox, oy, side, a1, a2, l1, l2) { const ex = ox + side * Math.sin(a1) * l1, ey = oy + Math.cos(a1) * l1; const b = a1 + a2; return [[ox, oy], [ex, ey], [ex + side * Math.sin(b) * l2, ey + Math.cos(b) * l2]]; }
function person(ctx, o) {
  const s = o.s || 600, fl = o.flip || 1; const coat = o.coat || '#2a3a6a', pants = o.pants || '#1e2438', shoes = o.shoes || '#1a1a1e';
  ctx.save(); ctx.translate(o.x, o.y);
  if (o.shadow !== false) { ellipse(ctx, 0, 0, s * .2, s * .03); ctx.fillStyle = 'rgba(20,10,20,.25)'; ctx.fill(); }
  ctx.scale(s * fl, s); ctx.rotate(o.lean || 0);
  const legs = o.legs || { L: [.05, 0], R: [.05, 0] }, arms = o.arms || { L: [.15, -.1], R: [.15, -.1] };
  // legs (trousers) + shoes
  for (const [k, sd] of [['L', -1], ['R', 1]]) { const p = limb2(sd * .06, -.27, sd, legs[k][0], legs[k][1], .13, .13); thickLimb(ctx, p, .1, pants); ellipse(ctx, p[2][0] + sd * .025, p[2][1] + .005, .065, .03); fillStroke(ctx, shoes, .012); }
  // torso (coat): rounded trapezoid
  const torso = () => { ctx.beginPath(); ctx.moveTo(-.13, -.55); ctx.quadraticCurveTo(-.17, -.55, -.17, -.5); ctx.lineTo(-.18, -.27); ctx.quadraticCurveTo(-.18, -.22, -.13, -.22); ctx.lineTo(.13, -.22); ctx.quadraticCurveTo(.18, -.22, .18, -.27); ctx.lineTo(.17, -.5); ctx.quadraticCurveTo(.17, -.55, .13, -.55); ctx.closePath(); };
  torso(); ctx.fillStyle = coat; ctx.fill();
  ctx.save(); torso(); ctx.clip(); ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.fillRect(.06, -.6, .2, .5); ctx.fillStyle = 'rgba(255,255,255,.07)'; ctx.fillRect(-.2, -.6, .06, .5);
  if (o.collar === 'sailor') { path(ctx, [[-.1, -.55], [0, -.43], [.1, -.55]]); ctx.fillStyle = '#f2f2ee'; ctx.fill(); line(ctx, -.08, -.53, 0, -.45, .008, '#2a3a6a'); line(ctx, .08, -.53, 0, -.45, .008, '#2a3a6a'); }
  else if (o.collar === 'v' || o.collar == null) { path(ctx, [[-.06, -.55], [0, -.45], [.06, -.55]]); ctx.fillStyle = o.shirt || '#f2f2ee'; ctx.fill(); line(ctx, -.06, -.55, 0, -.45, .008); line(ctx, .06, -.55, 0, -.45, .008); if (o.tie) { path(ctx, [[-.012, -.53], [.012, -.53], [.018, -.46], [0, -.44], [-.018, -.46]]); ctx.fillStyle = o.tie; ctx.fill(); } }
  else if (o.collar === 'high') { rrect(ctx, -.07, -.56, .14, .04, .01); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fill(); }
  if (o.lamellar) { for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) { rrect(ctx, -.18 + c * .046 + (r % 2) * .023, -.53 + r * .05, .04, .045, .008); ctx.lineWidth = .005; ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.stroke(); circle(ctx, -.16 + c * .046 + (r % 2) * .023, -.51 + r * .05, .005); ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fill(); } }
  if (o.buttons) for (let i = 0; i < 4; i++) { circle(ctx, .035, -.43 + i * .05, .011); ctx.fillStyle = o.buttons; ctx.fill(); ctx.lineWidth = .005; ctx.strokeStyle = INK; ctx.stroke(); }
  if (o.belt) { ctx.fillStyle = o.belt; ctx.fillRect(-.2, -.3, .4, .035); rrect(ctx, -.025, -.305, .05, .045, .006); fillStroke(ctx, '#d8b04a', .006); }
  ctx.restore(); torso(); ctx.lineWidth = .013; ctx.strokeStyle = INK; ctx.stroke();
  if (o.cape) { /* reserved */ }
  // arms (sleeves) + mitten hands
  for (const [k, sd] of [['L', -1], ['R', 1]]) { let a1, a2; if (arms[k].ik) [a1, a2] = ik(sd, sd * .15, -.5, arms[k].ik[0], arms[k].ik[1], .14, .13, arms[k].bend || 1); else [a1, a2] = arms[k]; const p = limb2(sd * .15, -.5, sd, a1, a2, .14, .13); thickLimb(ctx, p, .075, o.sleeve || coat); if (o.cuff) { const [hx, hy] = p[2], [ex, ey] = p[1]; const u = .82; line(ctx, ex + (hx - ex) * u - .02, ey + (hy - ey) * u, ex + (hx - ex) * u + .02, ey + (hy - ey) * u, .02, o.cuff); } if (o.prop) o.prop(ctx, k, p[2], sd); ellipse(ctx, p[2][0], p[2][1] + .01, .042, .045); fillStroke(ctx, o.glove || '#f4f2ee', .011); }
  // head (egg)
  const H = { x: 0, y: -.79, rx: .2, ry: .24 };
  ctx.save(); ctx.translate(H.x, H.y); ctx.rotate(o.headTilt || 0); ctx.translate(-H.x, -H.y);
  const egg = () => { ctx.beginPath(); ctx.ellipse(H.x, H.y, H.rx, H.ry, 0, 0, TAU); };
  egg(); ctx.fillStyle = SKIN; ctx.fill(); ctx.save(); egg(); ctx.clip(); ctx.beginPath(); ctx.ellipse(H.x + .07, H.y + .05, H.rx, H.ry, 0, 0, TAU); ctx.rect(-1, -2, 2, 3); ctx.fillStyle = SKIN_SH; ctx.fill('evenodd');
  if (o.stubble) { const R = rng(7); for (let i = 0; i < 40; i++) { const a = R() * Math.PI * .8 + .15 * Math.PI, rr = .6 + R() * .38; ctx.beginPath(); ctx.arc(H.x + Math.cos(a) * H.rx * rr, H.y + .02 + Math.sin(a) * H.ry * rr * .8, .0032, 0, TAU); ctx.fillStyle = "rgba(40,30,30,.4)"; ctx.fill(); } }
  if (o.blush) { ellipse(ctx, H.x - .12, H.y + .07, .03, .016); ellipse(ctx, H.x + .12, H.y + .07, .03, .016); ctx.fillStyle = 'rgba(230,110,110,.35)'; ctx.fill(); }
  if (o.hair === 'crop' || o.hair === 'side') { ctx.beginPath(); ctx.moveTo(H.x - H.rx - .01, H.y + .02); ctx.quadraticCurveTo(H.x - H.rx - .02, H.y - H.ry - .04, H.x, H.y - H.ry - .02); ctx.quadraticCurveTo(H.x + H.rx + .03, H.y - H.ry, H.x + H.rx + .01, H.y + .01); for (let i = 0; i <= 8; i++) { const u = i / 8; const xx = H.x + H.rx - u * H.rx * 2; ctx.lineTo(xx, H.y - .09 + (i % 2) * .03 + (o.hair === 'side' ? u * .04 : 0)); } ctx.closePath(); ctx.fillStyle = o.hairCol || '#1e1a20'; ctx.fill(); ctx.lineWidth = .012; ctx.strokeStyle = INK; ctx.stroke(); }
  ctx.restore(); egg(); ctx.lineWidth = .014; ctx.strokeStyle = INK; ctx.stroke();
  if (o.scar) { line(ctx, H.x + .1, H.y + .04, H.x + .13, H.y + .01, .008, '#c84a4a'); line(ctx, H.x + .1, H.y + .015, H.x + .13, H.y + .035, .008, '#c84a4a'); }
  face2(ctx, H, o.face || {}); if (o.sweat) { ctx.save(); ctx.translate(H.x + .15, H.y - .12); path(ctx, [[0, -.035], [.02, 0], [0, .015], [-.02, 0]]); fillStroke(ctx, '#bfe6ff', .006); ctx.restore(); }
  if (o.hat) o.hat(ctx, H);
  ctx.restore(); ctx.restore();
}
function face2(ctx, H, f) {
  const e = f.eyes || 'normal', look = f.look || [0, 0], m = f.mouth || 'flat', ey = H.y + .0, ex = .075, br = f.brow || 0;
  for (const sd of [-1, 1]) { const x = H.x + sd * ex;
    if (e === 'closed') { ctx.beginPath(); ctx.arc(x, ey, .025, .2, Math.PI - .2); ctx.lineWidth = .011; ctx.strokeStyle = INK; ctx.stroke(); continue; }
    const rx = e === 'wide' ? .04 : .034, ry = e === 'wide' ? .042 : .03; ellipse(ctx, x, ey, rx, ry); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = .009; ctx.strokeStyle = INK; ctx.stroke();
    circle(ctx, x + look[0] * rx * .45, ey + look[1] * ry * .4 + (e === 'half' ? .006 : 0), e === 'wide' ? .011 : .014); ctx.fillStyle = INK; ctx.fill();
    if (e === 'half' || e === 'angry') { ctx.save(); ellipse(ctx, x, ey, rx + .002, ry + .002); ctx.clip(); ctx.fillStyle = SKIN; ctx.fillRect(x - rx - .01, ey - ry - .01, rx * 2 + .02, ry * (e === 'half' ? 1.05 : .8)); ctx.restore(); line(ctx, x - rx, ey - ry * (e === 'half' ? -.05 : .2) + (e === 'angry' ? -sd * .01 : 0), x + rx, ey - ry * (e === 'half' ? -.05 : .2) + (e === 'angry' ? sd * .01 : 0), .012); }
    // brow
    const by = ey - .06 - (e === 'wide' ? .015 : 0); const tilt = (e === 'angry' ? .35 : 0) + br * .3; ctx.save(); ctx.translate(x, by); ctx.rotate(sd * tilt); line(ctx, -.035, 0, .035, -.004, .016); ctx.restore(); }
  const mx = H.x + .01, my = H.y + .12; ctx.lineWidth = .011; ctx.strokeStyle = INK; ctx.lineCap = 'round';
  if (m === 'flat') line(ctx, mx - .025, my, mx + .02, my - .003, .011);
  else if (m === 'smile') { ctx.beginPath(); ctx.arc(mx, my - .03, .035, .5, Math.PI - .5); ctx.stroke(); }
  else if (m === 'frown') { ctx.beginPath(); ctx.arc(mx, my + .03, .03, Math.PI + .6, -.6); ctx.stroke(); }
  else if (m === 'o') { ellipse(ctx, mx, my, .016, .022); fillStroke(ctx, '#5a1e24', .009); }
  else if (m === 'grin' || m === 'shout') { ctx.beginPath(); ctx.moveTo(mx - .045, my - .012); ctx.quadraticCurveTo(mx, my - (m === 'shout' ? -.0 : .0), mx + .045, my - .012); ctx.quadraticCurveTo(mx + .03, my + (m === 'shout' ? .07 : .045), mx, my + (m === 'shout' ? .07 : .045)); ctx.quadraticCurveTo(mx - .03, my + (m === 'shout' ? .07 : .045), mx - .045, my - .012); ctx.closePath(); ctx.fillStyle = '#6a1e28'; ctx.fill(); ctx.lineWidth = .009; ctx.stroke(); ctx.save(); ctx.clip(); ctx.fillStyle = '#fff'; ctx.fillRect(mx - .05, my - .02, .1, .018); ctx.restore(); }
  if (f.pencil) { ctx.beginPath(); ctx.moveTo(mx - .05, my - .02); ctx.quadraticCurveTo(mx, my - .04, mx + .05, my - .02); ctx.lineWidth = .013; ctx.strokeStyle = f.pencil; ctx.stroke(); }
  if (f.brush) { rrect(ctx, mx - .028, my - .05, .056, .032, .006); ctx.fillStyle = f.brush; ctx.fill(); }
  if (f.moustache) { for (const sd of [-1, 1]) { ctx.beginPath(); ctx.ellipse(mx + sd * .028, my - .025, .032, .013, sd * .25, 0, TAU); ctx.fillStyle = f.moustache; ctx.fill(); } }
}
// hats in head space (H = {x,y,rx,ry})
function sailorCap(ctx, H) { ellipse(ctx, H.x, H.y - H.ry * .78, H.rx * 1.08, H.ry * .26); fillStroke(ctx, '#f6f6f2', .012); rrect(ctx, H.x - H.rx * .92, H.y - H.ry * .78, H.rx * 1.84, H.ry * .22, .01); fillStroke(ctx, '#1e2438', .012); }
function officerCap2(ctx, H, col = '#1e2a4f') { ellipse(ctx, H.x, H.y - H.ry * .82, H.rx * 1.12, H.ry * .3); fillStroke(ctx, col, .012); rrect(ctx, H.x - H.rx * .9, H.y - H.ry * .8, H.rx * 1.8, H.ry * .26, .01); fillStroke(ctx, '#15151e', .012); ctx.beginPath(); ctx.ellipse(H.x + .02, H.y - H.ry * .52, H.rx * .95, H.ry * .12, .05, 0, Math.PI); fillStroke(ctx, '#0e0e14', .01); circle(ctx, H.x, H.y - H.ry * .68, .028); fillStroke(ctx, '#e8c04a', .007); line(ctx, H.x - .006, H.y - H.ry * .68 - .012, H.x - .006, H.y - H.ry * .68 + .012, .006, '#1e2a4f'); }
function warHelm(ctx, H, col = '#3a4a6a', plume = '#3a8ae0') { ctx.beginPath(); ctx.ellipse(H.x, H.y - H.ry * .25, H.rx * 1.12, H.ry * .95, 0, Math.PI, 0); ctx.lineTo(H.x + H.rx * 1.12, H.y + H.ry * .35); ctx.lineTo(H.x + H.rx * .85, H.y + H.ry * .35); ctx.lineTo(H.x + H.rx * .85, H.y - H.ry * .25); ctx.lineTo(H.x - H.rx * .85, H.y - H.ry * .25); ctx.lineTo(H.x - H.rx * .85, H.y + H.ry * .35); ctx.lineTo(H.x - H.rx * 1.12, H.y + H.ry * .35); ctx.closePath(); fillStroke(ctx, col, .012); for (let i = -3; i <= 3; i++) line(ctx, H.x + i * .04, H.y - H.ry * 1.1 + Math.abs(i) * .02, H.x + i * .045, H.y - H.ry * .3, .006, 'rgba(0,0,0,.3)'); rrect(ctx, H.x - H.rx * 1.0, H.y - H.ry * .34, H.rx * 2, .03, .01); fillStroke(ctx, '#c8a84a', .008); ctx.save(); ctx.translate(H.x - .06, H.y - H.ry * 1.15); ctx.rotate(-.5); ellipse(ctx, 0, -.09, .03, .11); fillStroke(ctx, plume, .008); ctx.restore(); }
