// ---------- "The night the Titanic sank" (landscape, ~5.5 min) ----------
// Shots are keyed to SENTENCES of script.json; every cue is looked up from the word timings (web/words.js).
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 1.2 : LN[i].s - .1;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const mk = (a, b, draw, tr = 'whip') => ({ start: S(a), end: S(b + 1), tr, draw });
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 960) + hh[0] + (o.px || 0) * lt, y: (o.y || 540) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .01 : o.dz) * lt, r: o.r || 0 }; };
const NAVY = { cols: ['#1d2a4f', '#1d2a4f'], hat: 'none', belt: false };
const CREW = { cols: ['#2a3550', '#2a3550'], hat: 'none', belt: false };
const PAXC = [PAL.red, PAL.green, PAL.purple, ['#8a5a3a', '#8a5a3a'], PAL.yellow, PAL.blue, ['#3f8a8a', '#3f8a8a']];
function officer(ctx, o) { const so = C(NAVY, o); drawStick(ctx, so); capHat(ctx, so); return so; }
function captain(ctx, o) { const so = C(NAVY, o); drawStick(ctx, so); whiteBeard(ctx, so); capHat(ctx, so); return so; }
function sailor(ctx, o) { const so = C(CREW, o); drawStick(ctx, so); capHat(ctx, so, '#2a3550', false); return so; }
function pax(ctx, i, o) { const so = C({ cols: PAXC[i % PAXC.length], hat: 'none', belt: false }, o); drawStick(ctx, so); if (i % 3 === 0) bonnet2(ctx, so); if (i % 3 === 1) topHat(ctx, so); return so; }
function bonnet2(ctx, o) { const s = o.s || 600; ctx.save(); ctx.translate(o.x, o.y); const hy = -.765 * s; ellipse(ctx, 0, hy - .17 * s, .26 * s, .06 * s); fillStroke(ctx, '#7a2a3a', Math.max(3, s * .01)); ctx.beginPath(); ctx.arc(0, hy - .17 * s, .13 * s, Math.PI, 0); ctx.closePath(); fillStroke(ctx, '#7a2a3a', Math.max(3, s * .01)); ctx.restore(); }
// wide exterior: the liner on the night sea. p = how far gone (0 afloat .. 1 just before the end)
function wide(ctx, t, cam, o = {}) {
  nightSky(ctx, t, cam, o.sky || {}); applyCam(ctx, cam, 1);
  if (o.behind) o.behind();
  const s = o.s || 1300, p = o.p || 0, x = o.x == null ? 960 : o.x;
  drawTitanic(ctx, x, SEA - s * .055, s, { rot: o.rot == null ? p * .2 : o.rot, sink: o.sink == null ? p * s * .075 : o.sink, lights: o.lights == null ? 1 : o.lights, smoke: o.smoke, split: o.split, settle: o.settle });
  if (o.mid) o.mid();
  seaFront(ctx, t, { calm: o.calm !== false });
  if (o.front) o.front();
}
// boat deck at night, seen from the side; inner() draws people in deck space (feet at y ≈ 40..120, x from -900 to 700)
function deck(ctx, t, cam, o, inner) {
  nightSky(ctx, t, cam, {}); applyCam(ctx, cam, 1); seaFront(ctx, t, { y: 640, calm: true });
  ctx.save(); ctx.translate(960, GY - 40); ctx.rotate(o.tilt || 0);
  const lit = o.lights == null ? 1 : o.lights;
  ctx.beginPath(); ctx.rect(-1500, -600, 2260, 600); fillStroke(ctx, lit > .3 ? '#e9e6dc' : '#4a4f66', 8);
  for (let i = 0; i < 9; i++) { rrect(ctx, -1380 + i * 240, -420, 130, 170, 12); fillStroke(ctx, lit > .3 ? '#ffd66e' : '#1b2238', 7); }
  path(ctx, [[-760, -600], [-800, -1100], [-520, -1100], [-480, -600]]); fillStroke(ctx, '#e0a244', 8);
  ctx.beginPath(); ctx.rect(-1500, 0, 2360, 700); fillStroke(ctx, '#a8845a', 8);
  for (let i = 0; i < 18; i++) line(ctx, -1500 + i * 140, 0, -1500 + i * 140, 700, 3, 'rgba(60,40,20,.3)');
  // davit and its lifeboat, hanging over the side
  const k = o.lower || 0, by = -150 + k * 520;
  if (o.boat !== false) {
    ctx.beginPath(); ctx.moveTo(800, 0); ctx.lineTo(800, -330); ctx.quadraticCurveTo(810, -420, 960, -410); ctx.lineWidth = 22; ctx.strokeStyle = '#f1efe8'; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke();
    line(ctx, 960, -410, 960, by - 40, 5, '#d9c9a3');
    lifeboat(ctx, 960, by, 420, o.inBoat == null ? 3 : o.inBoat, 0);
  }
  for (let i = 0; i < 8; i++) line(ctx, -1400 + i * 300, 0, -1400 + i * 300, -90, 8, '#6b3f22');
  if (inner) inner();
  ctx.restore();
  if (lit > .3) { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .1; ctx.fillStyle = '#ffcf7a'; ctx.fillRect(0, 0, 1920, 1080); ctx.restore(); }
}
const levelsAt = (k) => Array.from({ length: 16 }, (_, i) => clamp(k * 6 - i * .9)); // water spreading back from the bow

const SHOTS = [];
// ===== 0. THE LAST MINUTE =====
// [0] the lookout sees a dark shape
SHOTS.push(mk(0, 0, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 }); nightSky(ctx, t, cam); applyCam(ctx, cam, 1);
  const k = cue(t, wt(0, 'sees'), 2.4);
  iceberg(ctx, 1350, 720, 60 + k * 150, { dark: true }); seaFront(ctx, t, { y: 720, calm: true });
  line(ctx, 420, 1080, 420, 200, 34, '#b8873a'); ctx.beginPath(); ctx.rect(250, 560, 340, 240); fillStroke(ctx, '#e9e6dc', 8); ctx.beginPath(); ctx.rect(230, 540, 380, 34); fillStroke(ctx, '#b8873a', 7);
  const o1 = sailor(ctx, { x: 360, y: 760, s: 420, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: k > .4 ? 'wide' : 'squint', look: [1, 0], mouth: k > .4 ? 'o' : 'flat' } });
  sailor(ctx, { x: 500, y: 760, s: 400, arms: POSE.idle.arms, face: { eyes: 'half', look: [1, 0], mouth: 'flat' } });
  ctx.beginPath(); ctx.rect(250, 660, 340, 140); fillStroke(ctx, '#e9e6dc', 8);
  clockTag(ctx, '11:39 PM'); chapterTag(ctx, t, .1, 'APRIL 14, 1912');
  label(ctx, 'FREDERICK FLEET, LOOKOUT', 420, 230, 46, t, wt(0, 'frederick'), '#ffffff', wt(0, 'sees') + .6);
}));
// [1-2] three bells, the telephone: iceberg, right ahead
SHOTS.push(mk(1, 2, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.06, dz: .02, shake: 6 }); bgFlat(ctx, '#0b1430', '#1c2a52'); applyCam(ctx, cam, 1);
  const ring = t > wt(1, 'rings') ? Math.sin((t - wt(1, 'rings')) * 22) * .35 * (1 - cue(t, wt(1, 'grabs'), .3)) : 0;
  ctx.save(); ctx.translate(520, 230); ctx.rotate(ring); line(ctx, 0, 0, 0, 60, 8, '#6b3f22'); ctx.beginPath(); ctx.moveTo(-90, 200); ctx.quadraticCurveTo(-80, 60, 0, 60); ctx.quadraticCurveTo(80, 60, 90, 200); ctx.closePath(); fillStroke(ctx, '#e8c04a', 8); circle(ctx, 0, 210, 20); fillStroke(ctx, '#b8873a', 6); ctx.restore();
  const call = t > wt(1, 'grabs');
  const o = sailor(ctx, { x: 960, y: GY + 120, s: 640, arms: call ? { L: [.3, -.1], R: { ik: [.2, -.74] } } : { L: [.3, -.1], R: [2.3, .6] }, face: { eyes: 'wide', mouth: t > S(2) ? 'teeth' : 'o', browUp: 1 } });
  if (call) { rrect(ctx, 960 + .16 * 640, GY + 120 - .86 * 640, 60, 150, 20); fillStroke(ctx, '#15151a', 6); }
  label(ctx, 'ICEBERG,', 1400, 330, 120, t, S(2) + .1, '#ffffff'); label(ctx, 'RIGHT AHEAD!', 1400, 470, 110, t, wt(2, 'right'), '#ff6a5a');
  clockTag(ctx, '11:39 PM');
}));
// [3-4] less than a minute; it doesn't make it
SHOTS.push(mk(3, 4, (ctx, lt, t) => {
  const hit = cue(t, S(4) + .5, .25);
  const cam = camA(t, lt, { dz: .01, shake: hit > 0 && hit < 1 ? 14 : 3 });
  const k = clamp((t - S(3)) / (S(4) + .5 - S(3)));
  wide(ctx, t, cam, { s: 1250, x: 620 + k * 330, smoke: t, front: () => iceberg(ctx, 1640, SEA + 6, 210, { dark: true }) });
  const sec = Math.max(0, Math.ceil(37 * (1 - k)));
  label(ctx, hit > 0 ? 'TOO LATE' : '0:' + String(sec).padStart(2, '0'), 960, 240, 140, t, wt(3, 'less'), hit > 0 ? '#ff6a5a' : '#ffd23a');
  tint(ctx, '#ffffff', hit > 0 && hit < 1 ? .25 * (1 - hit) : 0); clockTag(ctx, '11:40 PM');
}));
// [5] two hours and forty minutes that changed the rules of the sea
SHOTS.push(mk(5, 5, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 }); wide(ctx, t, cam, { s: 900, x: 1250, p: .15 });
  const k = ease(cue(t, wt(5, 'two'), 2.6)), m = Math.round(k * 160);
  label(ctx, Math.floor(m / 60) + ' h ' + String(m % 60).padStart(2, '0') + ' min', 620, 330, 150, t, wt(5, 'two'), '#ffd23a');
  label(ctx, 'THE NIGHT THE TITANIC SANK', 620, 480, 58, t, wt(5, 'change'), '#ffffff');
}));
// ===== 1. THE UNSINKABLE SHIP =====
// [6] Southampton, April 10
SHOTS.push(mk(6, 6, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01, px: 14 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#d3f0fb', -300, SEA + 40); applyCam(ctx, cam, .15); drawCloud(ctx, 300 + t * 6, 200, 110, 1); drawCloud(ctx, 1300 + t * 4, 150, 90, 2);
  applyCam(ctx, cam, 1); drawTitanic(ctx, 800 + lt * 26, SEA - 1300 * .055, 1300, { lights: 0, smoke: t, glow: false });
  seaFront(ctx, t, { top: '#2f8fd0', bot: '#125a96', glint: '#ffffff', calm: false });
  ctx.beginPath(); ctx.rect(-200, 880, 1100, 300); fillStroke(ctx, '#8a8f98', 8);
  for (let i = 0; i < 6; i++) { const j = Math.abs(Math.sin(t * 5 + i)) * 12; pax(ctx, i, { x: 110 + i * 130, y: 930 - j, s: 300, flip: 1, arms: { L: [.3, -.1], R: [2.5 + Math.sin(t * 9 + i) * .3, .4] }, face: { eyes: 'happy', mouth: 'grin' } }); }
  chapterTag(ctx, t, S(6) + .1, 'APRIL 10, 1912'); label(ctx, 'SOUTHAMPTON → NEW YORK', 960, 240, 80, t, wt(6, 'southampton'), '#ffffff');
}));
// [7] her size
SHOTS.push(mk(7, 7, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#d3f0fb', -300, 900); applyCam(ctx, cam, 1);
  ctx.fillStyle = '#7ec06a'; ctx.fillRect(-500, 800, 3000, 600);
  ctx.save(); ctx.translate(900, 745); ctx.scale(1500, 1500); titanicBody(ctx, 0, null); ctx.restore();
  const b = backOut(cue(t, wt(7, 'tall'), .4)); if (b > 0) { ctx.save(); ctx.translate(1780, 800); ctx.scale(1, b); ctx.beginPath(); ctx.rect(-70, -290, 140, 290); fillStroke(ctx, '#c9a08a', 7); for (let r = 0; r < 11; r++) for (let c = 0; c < 3; c++) { ctx.fillStyle = '#6a8aa8'; ctx.fillRect(-52 + c * 38, -278 + r * 26, 24, 16); } ctx.restore(); }
  const a = cue(t, wt(7, 'almost'), .5); if (a > 0) { ctx.globalAlpha = a; line(ctx, 150, 880, 1650, 880, 8, '#ffd23a'); for (const x of [150, 1650]) line(ctx, x, 860, x, 900, 8, '#ffd23a'); ctx.globalAlpha = 1; }
  label(ctx, '882 FEET', 900, 160, 70, t, wt(7, 'nine'), '#ffd23a'); label(ctx, '11 STORIES', 1640, 430, 54, t, wt(7, 'eleven'), '#ffffff'); label(ctx, '~2,200 PEOPLE', 900, 270, 80, t, wt(7, 'twenty'), '#ffffff');
}));
// [8] first class and third class
SHOTS.push(mk(8, 8, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 }); bgFlat(ctx, '#f4efe4', '#e2d9c6'); applyCam(ctx, cam, 1);
  ctx.fillStyle = '#7a2a3a'; ctx.fillRect(-200, -200, 1160, 1500); ctx.fillStyle = '#5a6a7a'; ctx.fillRect(960, -200, 1300, 1500);
  const m = cue(t, wt(8, 'millionaires') - .1, .2), f = cue(t, wt(8, 'families') - .1, .2);
  if (m > 0) { const o = { cols: ['#15151a', '#15151a'], hat: 'none', belt: false, x: 480, y: GY + 60, s: 560, arms: POSE.hips.arms, face: { eyes: 'half', mouth: 'smirk' } }; drawStick(ctx, o); topHat(ctx, o); drawChest(ctx, 760, GY + 60, 150, 1); label(ctx, 'FIRST CLASS', 480, 220, 72, t, wt(8, 'first'), '#ffd23a'); }
  if (f > 0) { pax(ctx, 0, { x: 1260, y: GY + 60, s: 480, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'smile' } }); pax(ctx, 3, { x: 1470, y: GY + 60, s: 500, arms: { L: [.3, -.1], R: [.2, -.05] }, face: { eyes: 'normal', mouth: 'smile' } }); drawStick(ctx, { cols: PAL.yellow, hat: 'none', belt: false, x: 1370, y: GY + 70, s: 300, arms: POSE.handsUp.arms, face: { eyes: 'happy', mouth: 'grin' } }); rrect(ctx, 1560, GY - 70, 190, 130, 14); fillStroke(ctx, '#8a5a3a', 7); line(ctx, 1620, GY - 70, 1620, GY + 60, 6); line(ctx, 1690, GY - 70, 1690, GY + 60, 6); label(ctx, 'THIRD CLASS', 1440, 220, 72, t, wt(8, 'third'), '#ffffff'); }
}));
// [9-10] sixteen compartments; she floats with four flooded
SHOTS.push(mk(9, 10, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008 }); bgFlat(ctx, '#16335e', '#0c1e3c'); applyCam(ctx, cam, 1);
  const n = Math.floor(clamp((t - wt(9, 'sixteen') + .5) / 1.6) * 16), four = clamp((t - wt(10, 'four') + .4) / 1.0);
  const lv = Array.from({ length: 16 }, (_, i) => i < 4 ? clamp(four * 4 - i) * .8 : 0);
  ctx.fillStyle = 'rgba(58,154,224,.25)'; ctx.fillRect(0, 600, 1920, 600);
  hullDiagram(ctx, 960, 560 + four * 16, 1500, lv, { nums: n, rot: four * .012, numCol: i => i < 4 && four > 0 ? '#5fb6f0' : '#ffffff' });
  label(ctx, '16 WATERTIGHT COMPARTMENTS', 960, 220, 70, t, wt(9, 'sixteen'), '#ffffff', S(10)); label(ctx, '4 FLOODED = STILL AFLOAT', 960, 220, 76, t, wt(10, 'four'), '#7ee08a');
}));
// [11] unsinkable
SHOTS.push(mk(11, 11, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.04, dz: .025 }); bgFlat(ctx, '#3a2a22', '#1c1410'); applyCam(ctx, cam, 1);
  const k = easeOut(cue(t, S(11), .5)); ctx.save(); ctx.translate(960, 540); ctx.rotate((1 - k) * 4 - .04); ctx.scale(k, k);
  rrect(ctx, -520, -400, 1040, 800, 10); fillStroke(ctx, '#f1ece0', 8); text(ctx, 'THE DAILY NEWS', 0, -310, 84, INK, INK, 0, 'Lora'); line(ctx, -470, -250, 470, -250, 6);
  const u = cue(t, wt(11, 'unsinkable') - .1, .15); if (u > 0) text(ctx, 'UNSINKABLE', 0, -120, 150, '#c8322c', INK, 0);
  ctx.save(); ctx.translate(0, 180); ctx.scale(760, 760); titanicBody(ctx, 0, null); ctx.restore(); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#b8b0a0'; ctx.fillRect(-470, 270 + i * 28, 940 - i * 120, 12); }
  ctx.restore();
}));
// [12-13] twenty lifeboats: room for 1,200 of 2,200. Legal.
SHOTS.push(mk(12, 13, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008 }); bgFlat(ctx, '#16335e', '#0c1e3c'); applyCam(ctx, cam, 1);
  const nb = Math.floor(clamp((t - wt(12, 'twenty') + .3) / 1.2) * 20); boatIcons(ctx, 260, 250, nb, 10, 110);
  const seats = cue(t, wt(12, 'room'), .8);
  peopleIcons(ctx, 250, 520, 22, 22, 62, '#ffd23a', Math.round(22 * cue(t, wt(12, 'twelve') - .6, .6)));
  if (seats > 0) { ctx.globalAlpha = seats; rrect(ctx, 215, 480, 62 * 1.1 * 12 + 20, 120, 20); ctx.lineWidth = 8; ctx.strokeStyle = '#7ee08a'; ctx.stroke(); ctx.globalAlpha = 1; }
  label(ctx, '20 LIFEBOATS', 960, 150, 70, t, wt(12, 'twenty'), '#ffffff');
  label(ctx, 'SEATS: ~1,200', 640, 690, 64, t, wt(12, 'twelve'), '#7ee08a'); label(ctx, 'ON BOARD: ~2,200', 1300, 690, 64, t, wt(13, 'half') - .3, '#ff6a5a');
  stamp(ctx, 960, 840, 'LEGAL', cue(t, wt(13, 'legal'), .2), '#7ee08a', -.08);
}));
// ===== 2. THE WARNINGS =====
// [14-15] ice warnings; nearly full speed
SHOTS.push(mk(14, 15, (ctx, lt, t) => {
  seaChart(ctx); const cam = camA(t, lt, { dz: .006 }); applyCam(ctx, cam, 1);
  const k = clamp((t - S(14)) / (S(16) - S(14))); const pos = [lerp(1500, 860, k), lerp(380, 480, k) - Math.sin(k * Math.PI) * 30];
  dotted(ctx, MAP.soton, MAP.ny, 1, 'rgba(255,255,255,.25)');
  for (const [i, [ix, iy]] of [[760, 430], [690, 520], [800, 560], [640, 450], [730, 600]].entries()) iceberg(ctx, ix, iy, 34, {});
  for (const [i, [sx, sy]] of [[1050, 620], [900, 300], [1180, 250]].entries()) { const on = cue(t, wt(14, 'warning', Math.min(i, 1)) - .4 + i * .5, .2); steamer(ctx, sx, sy, 110, { funnel: '#e0a244' }); if (on > 0) { zap(ctx, sx, sy - 50, 70, t + i); label(ctx, 'ICE!', sx + 90, sy - 80, 50, t, wt(14, 'warning') - .4 + i * .5, '#ffd23a'); } }
  ctx.save(); ctx.translate(pos[0], pos[1]); ctx.scale(-260, 260); titanicBody(ctx, 1, null); ctx.restore();
  chapterTag(ctx, t, S(14) + .1, 'SUNDAY, APRIL 14');
  if (t > S(15)) { drawGauge(ctx, 1560, 820, 130, .85 + Math.sin(t * 6) * .01, 'KNOTS'); label(ctx, '~22 KNOTS', 1560, 640, 60, t, S(15) + .1, '#ff6a5a'); }
}));
// [16-18] moonless, flat calm: an iceberg is almost invisible
SHOTS.push(mk(16, 18, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008, px: 10 }); nightSky(ctx, t, cam, { stars: 160 }); applyCam(ctx, cam, 1);
  const show = cue(t, S(18) + .2, 1.2);
  ctx.globalAlpha = .12 + show * .5; iceberg(ctx, 1280, SEA + 4, 240, { dark: true }); ctx.globalAlpha = 1;
  seaFront(ctx, t, { calm: true });
  if (show > 0) { ctx.globalAlpha = show; for (let i = 0; i < 7; i++) { const a = i / 6 * Math.PI; line(ctx, 1280 + Math.cos(a) * 300, SEA - 20 - Math.sin(a) * 330, 1280 + Math.cos(a) * 350, SEA - 20 - Math.sin(a) * 380, 6, '#ffd23a'); } ctx.globalAlpha = 1; }
  label(ctx, 'NO MOON', 500, 240, 84, t, wt(16, 'moonless'), '#ffffff'); label(ctx, 'NO WAVES', 500, 360, 84, t, wt(16, 'calm'), '#9fc4ff');
  label(ctx, 'ALMOST INVISIBLE', 1280, 240, 70, t, wt(18, 'invisible') - .2, '#ffd23a');
}));
// [19] no binoculars: locked away
SHOTS.push(mk(19, 19, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01 }); bgFlat(ctx, '#0b1430', '#1c2a52'); applyCam(ctx, cam, 1);
  sailor(ctx, { x: 420, y: GY + 100, s: 560, arms: { L: { ik: [-.08, -.7] }, R: { ik: [.08, -.7] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } });
  const c = cue(t, wt(19, 'locked') - .2, .3);
  ctx.beginPath(); ctx.rect(1100, 330, 520, 520); fillStroke(ctx, '#6b3f22', 9); ctx.beginPath(); ctx.rect(1140, 370, 440, 440); fillStroke(ctx, '#8a5530', 7);
  for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.rect(1360 + s2 * 70 - 45, 500, 90, 170); fillStroke(ctx, '#15151a', 7); circle(ctx, 1360 + s2 * 70, 690, 52); fillStroke(ctx, '#2a2a2e', 7); } ctx.beginPath(); ctx.rect(1330, 540, 60, 40); fillStroke(ctx, '#15151a', 6);
  if (c > 0) { ctx.globalAlpha = c; for (let i = 0; i < 5; i++) line(ctx, 1160 + i * 100, 370, 1160 + i * 100, 810, 12, '#3a3d44'); circle(ctx, 1360, 600, 60); fillStroke(ctx, '#e8c04a', 8); ctx.beginPath(); ctx.arc(1360, 560, 44, Math.PI, 0); ctx.lineWidth = 16; ctx.strokeStyle = '#9aa1a9'; ctx.stroke(); ctx.globalAlpha = 1; }
  label(ctx, 'NO BINOCULARS', 420, 220, 70, t, wt(19, 'binoculars') - .3, '#ffffff'); label(ctx, 'LOCKED. NO KEY.', 1360, 230, 70, t, wt(19, 'locked'), '#ff6a5a');
}));
// ===== 3. THE COLLISION =====
// [20] too close
SHOTS.push(mk(20, 20, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.04, dz: .03, shake: 5 }); nightSky(ctx, t, cam); applyCam(ctx, cam, 1);
  iceberg(ctx, 1100, 760, 420 + lt * 60, { dark: true }); seaFront(ctx, t, { y: 760, calm: true });
  path(ctx, [[-100, 1080], [300, 820], [500, 1080]]); fillStroke(ctx, '#17171c', 8);
  clockTag(ctx, '11:40 PM'); chapterTag(ctx, t, S(20) + .1, '11:40 PM'); label(ctx, 'TOO CLOSE', 560, 240, 110, t, wt(20, 'too') - .1, '#ff6a5a');
}));
// [21] the bridge: hard over, engines stop
SHOTS.push(mk(21, 21, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012, shake: 5 }); shipRoom(ctx, t, cam, { port: [300, 620, 940] });
  const turn = ease(cue(t, wt(21, 'turn') - .3, 1.0)), stop = ease(cue(t, wt(21, 'stop') - .3, .5));
  helm(ctx, 760, 560, 150, -turn * 3); sailor(ctx, { x: 760, y: GY + 60, s: 480, arms: { L: { ik: [-.2, -.5] }, R: { ik: [.2, -.5] } }, face: { eyes: 'wide', mouth: 'flat' } });
  telegraph(ctx, 1500, GY + 60, 200, -Math.PI / 2 + stop * 1.2 - .6);
  officer(ctx, { x: 1180, y: GY + 80, s: 560, arms: { L: [1.9, .3], R: [.3, -.1] }, face: { eyes: 'wide', mouth: 'teeth', browUp: 1 } });
  endRoom(ctx); label(ctx, 'HARD OVER!', 1180, 220, 80, t, wt(21, 'turn') - .4, '#ffd23a'); label(ctx, 'STOP', 1500, 330, 70, t, wt(21, 'stop'), '#ff6a5a'); clockTag(ctx, '11:40 PM');
}));
// [22] nothing happens, then the bow swings (seen from above)
SHOTS.push(mk(22, 22, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006 }); bgFlat(ctx, '#0e2244', '#050b1c'); applyCam(ctx, cam, 1);
  const sw = ease(cue(t, wt(22, 'slowly') - .2, 2.2)), adv = clamp((t - S(22)) / (S(23) - S(22)));
  iceberg(ctx, 1500, 500, 170, {}); ellipse(ctx, 1500, 500, 240, 110); ctx.fillStyle = 'rgba(160,210,240,.18)'; ctx.fill();
  ctx.save(); ctx.translate(400 + adv * 620, 600 - sw * 90); ctx.rotate(-sw * .28);
  ctx.beginPath(); ctx.moveTo(-330, -46); ctx.lineTo(240, -46); ctx.quadraticCurveTo(360, -30, 400, 0); ctx.quadraticCurveTo(360, 30, 240, 46); ctx.lineTo(-330, 46); ctx.quadraticCurveTo(-380, 0, -330, -46); ctx.closePath(); fillStroke(ctx, '#a8845a', 7);
  for (const fx of [-190, -70, 50, 170]) { ellipse(ctx, fx, 0, 30, 22); fillStroke(ctx, '#e0a244', 6); } ctx.restore();
  for (let i = 0; i < 6; i++) { const q = i / 6; ctx.globalAlpha = .3 * (1 - q); line(ctx, 60 + adv * 620 - q * 380, 600, 0 + adv * 620 - q * 380, 600, 20, '#9fc4ff'); } ctx.globalAlpha = 1;
  label(ctx, '. . .', 960, 220, 120, t, wt(22, 'nothing'), '#ffffff', wt(22, 'then')); label(ctx, 'TURNING', 960, 220, 100, t, wt(22, 'slowly'), '#ffd23a'); clockTag(ctx, '11:40 PM');
}));
// [23] a scrape along the right side, below the water
SHOTS.push(mk(23, 23, (ctx, lt, t) => {
  const k = clamp((t - wt(23, 'scrapes') + .3) / 2.2);
  const cam = camA(t, lt, { dz: .01, shake: k > 0 && k < 1 ? 9 : 3 }); nightSky(ctx, t, cam); applyCam(ctx, cam, 1);
  ctx.save(); ctx.translate(1300 - k * 500, 420); ctx.scale(2600, 2600); titanicBody(ctx, 1, null); ctx.restore();
  ctx.fillStyle = 'rgba(14,50,100,.72)'; ctx.fillRect(-500, 560, 3000, 900); line(ctx, -500, 560, 2500, 560, 6, 'rgba(160,210,255,.6)');
  iceberg(ctx, 1560, 560, 260, { under: true });
  if (k > 0 && k < 1) for (let i = 0; i < 9; i++) { const R = rng(i + Math.floor(t * 20)); burst(ctx, 1330 + R() * 60, 600 + R() * 60, 26 + R() * 30, 7, '#ffe14d', i); }
  label(ctx, 'NOT HEAD-ON', 560, 220, 80, t, wt(23, 'head') - .3, '#ffffff'); label(ctx, 'BELOW THE WATERLINE', 560, 330, 60, t, wt(23, 'below'), '#9fc4ff'); clockTag(ctx, '11:40 PM');
}));
// [24] a faint shudder; some sleep through it
SHOTS.push(mk(24, 24, (ctx, lt, t) => {
  const sh = cue(t, wt(24, 'faint'), .3) * (1 - cue(t, wt(24, 'faint') + 1.2, .4));
  const cam = camA(t, lt, { dz: .01, shake: 3 + sh * 5 }); shipRoom(ctx, t, cam, { port: [330], wall: '#c9b79a', wall2: '#a89474' });
  drawBed(ctx, 1150, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 960, 560, t, 1.2);
  ctx.beginPath(); ctx.rect(520, GY - 150, 220, 150); fillStroke(ctx, '#6b3f22', 8); ctx.beginPath(); ctx.rect(600, GY - 230, 56, 80); fillStroke(ctx, 'rgba(190,230,255,.6)', 6);
  for (let i = 0; i < 2; i++) { ctx.globalAlpha = sh; ellipse(ctx, 628, GY - 205, 14 + i * 12 + sh * 10, 4 + i * 3); ctx.lineWidth = 4; ctx.strokeStyle = '#3a9ae0'; ctx.stroke(); ctx.globalAlpha = 1; }
  endRoom(ctx); label(ctx, 'A FAINT SHUDDER', 620, 220, 76, t, wt(24, 'faint'), '#ffffff'); clockTag(ctx, '11:41 PM');
}));
// [25] not four compartments: at least five
SHOTS.push(mk(25, 25, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008 }); bgFlat(ctx, '#16335e', '#0c1e3c'); applyCam(ctx, cam, 1);
  const n = Math.floor(clamp((t - wt(25, 'not') + .2) / (wt(25, 'five') - wt(25, 'not') + .2)) * 5.2);
  const lv = Array.from({ length: 16 }, (_, i) => i < n ? .35 + .1 * Math.sin(t * 3 + i) : 0);
  ctx.fillStyle = 'rgba(58,154,224,.25)'; ctx.fillRect(0, 600, 1920, 600);
  hullDiagram(ctx, 960, 560, 1500, lv, { nums: 16, waterCol: '#e0483a', numCol: i => i < n ? '#ff6a5a' : '#ffffff' });
  label(ctx, 'LIMIT: 4', 560, 220, 90, t, wt(25, 'four') - .2, '#7ee08a'); label(ctx, 'OPEN: 5+', 1360, 220, 100, t, wt(25, 'five') - .2, '#ff6a5a'); clockTag(ctx, '11:45 PM');
}));
// ===== 4. THE VERDICT =====
// [26-27] Thomas Andrews does the arithmetic
SHOTS.push(mk(26, 27, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01 }); shipRoom(ctx, t, cam, { port: [300] });
  drawDesk(ctx, 1250, GY + 30, 760); rrect(ctx, 950, GY - 210, 600, 60, 8); fillStroke(ctx, '#9fc4ff', 7); ctx.save(); ctx.translate(1250, GY - 180); ctx.scale(520, 520); ctx.globalAlpha = .9; titanicBody(ctx, 0, null); ctx.restore();
  const o = { cols: ['#3a3d44', '#3a3d44'], hat: 'none', belt: false, x: 560, y: GY + 80, s: 600, arms: { L: [.3, -.1], R: { ik: [.3, -.45] } }, face: { eyes: 'normal', look: [1, .5], mouth: t > S(27) ? 'frown' : 'flat', browAng: -.25 } }; drawStick(ctx, o);
  endRoom(ctx); label(ctx, 'THOMAS ANDREWS, DESIGNER', 560, 200, 50, t, wt(26, 'thomas'), '#ffffff', S(27));
  label(ctx, '5', 1100, 300, 200, t, wt(27, 'five'), '#ff6a5a'); label(ctx, '>', 1300, 300, 160, t, wt(27, 'she'), '#ffffff'); label(ctx, '4', 1500, 300, 200, t, wt(27, 'four'), '#7ee08a');
  clockTag(ctx, '12:00 AM'); chapterTag(ctx, t, S(26) + .1, 'MIDNIGHT');
}));
// [28] like an ice-cube tray filled from one end
SHOTS.push(mk(28, 28, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006 }); bgFlat(ctx, '#16335e', '#0c1e3c'); applyCam(ctx, cam, 1);
  const k = clamp((t - S(28)) / (LN[28].e - S(28))); const lv = levelsAt(k * .75);
  ctx.fillStyle = 'rgba(58,154,224,.25)'; ctx.fillRect(0, 470, 1920, 800);
  hullDiagram(ctx, 960, 400 + k * 50, 1400, lv, { rot: k * .07, open: true });
  const tr = cue(t, wt(28, 'like'), .3); if (tr > 0) { ctx.globalAlpha = tr; const tl = Array.from({ length: 8 }, (_, i) => clamp((k - .45) * 9 - (7 - i) * .8)); ctx.save(); ctx.translate(960, 900); ctx.rotate(.05); iceTray(ctx, 0, 0, 900, tl); line(ctx, 420, -260, 420, -130, 16, '#5fb6f0'); ctx.restore(); ctx.globalAlpha = 1; label(ctx, 'ICE-CUBE TRAY', 960, 690, 54, t, wt(28, 'ice'), '#ffffff'); }
  label(ctx, 'WATER SPILLS OVER THE TOP', 960, 170, 64, t, wt(28, 'spill'), '#9fc4ff'); clockTag(ctx, '12:00 AM');
}));
// [29] two hours, at most
SHOTS.push(mk(29, 29, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#3a1a1a', '#1a0c0c'); applyCam(ctx, cam, 1);
  const q = (t * .3) % 1; ctx.save(); ctx.translate(560, 560);
  path(ctx, [[-170, -260], [170, -260], [20, 0], [170, 260], [-170, 260], [-20, 0]]); fillStroke(ctx, 'rgba(255,255,255,.12)', 12); path(ctx, [[-120, -200 + q * 60], [120, -200 + q * 60], [10, -10]]); ctx.fillStyle = '#ffd23a'; ctx.fill(); path(ctx, [[-150, 250], [150, 250], [0, 250 - 70 - q * 60]]); ctx.fill(); line(ctx, 0, -10, 0, 180, 6, '#ffd23a'); ctx.restore();
  label(ctx, '2 HOURS', 1260, 440, 190, t, wt(29, 'two') - .1, '#ffd23a'); label(ctx, 'AT MOST', 1260, 640, 110, t, wt(29, 'most') - .2, '#ffffff'); clockTag(ctx, '12:05 AM');
}));
// [30] the captain's two numbers
SHOTS.push(mk(30, 30, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 }); shipRoom(ctx, t, cam, { port: [330] });
  captain(ctx, { x: 520, y: GY + 100, s: 640, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'frown', look: [1, .4] } }); endRoom(ctx);
  label(ctx, '~2,200', 1300, 340, 170, t, wt(30, 'twenty') - .2, '#ffffff'); label(ctx, 'PEOPLE', 1300, 480, 60, t, wt(30, 'people'), '#ffffff');
  label(ctx, '~1,200', 1300, 680, 170, t, wt(30, 'twelve') - .2, '#ff6a5a'); label(ctx, 'SEATS', 1300, 820, 60, t, wt(30, 'twelve'), '#ff6a5a'); clockTag(ctx, '12:05 AM');
}));
// ===== 5. THE CALL FOR HELP =====
// [31] the wireless room
SHOTS.push(mk(31, 31, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 }); shipRoom(ctx, t, cam, { wall: '#b9c4a3', wall2: '#93a07a' });
  drawDesk(ctx, 960, GY + 30, 1100); const dn = Math.sin(t * 22) > 0 ? 1 : 0; morseKey(ctx, 900, GY - 160, 220, dn);
  ctx.beginPath(); ctx.rect(1150, GY - 420, 300, 260); fillStroke(ctx, '#3a2414', 8); for (let i = 0; i < 3; i++) { circle(ctx, 1210 + i * 90, GY - 330, 30); fillStroke(ctx, '#e8c04a', 6); } zap(ctx, 1300, GY - 460, 110, t);
  const a = { cols: ['#3a4a6a', '#3a4a6a'], hat: 'none', belt: false, x: 640, y: GY + 90, s: 560, arms: { L: [.3, -.1], R: { ik: [.34, -.4 + dn * .02] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, .4] } }; drawStick(ctx, a); headphones(ctx, a);
  const b = { cols: ['#5a4a3a', '#5a4a3a'], hat: 'none', belt: false, x: 1560, y: GY + 90, s: 520, flip: -1, arms: { L: [.5, -1.2], R: [.5, -1.2] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }; drawStick(ctx, b);
  endRoom(ctx); label(ctx, 'CQD', 760, 240, 130, t, wt(31, 'calling') - .2, '#ffd23a'); label(ctx, 'SOS', 1160, 240, 130, t, wt(31, 'help') - .1, '#ff6a5a');
  clockTag(ctx, '12:15 AM'); chapterTag(ctx, t, S(31) + .1, '12:15 AM');
}));
// [32-33] the Carpathia turns: 58 miles, about four hours
SHOTS.push(mk(32, 33, (ctx, lt, t) => {
  seaChart(ctx); const cam = camA(t, lt, { z: 1.25, x: 900, y: 560, dz: .004 }); applyCam(ctx, cam, 1);
  const w = MAP.wreck, c0 = [1150, 700], k = clamp((t - wt(32, 'turns')) / 6) * .35;
  for (let i = 0; i < 3; i++) { const q = (t * .6 + i / 3) % 1; circle(ctx, w[0], w[1], 20 + q * 130); ctx.lineWidth = 5; ctx.strokeStyle = `rgba(255,106,90,${1 - q})`; ctx.stroke(); }
  ctx.save(); ctx.translate(w[0], w[1] + 20); ctx.scale(-200, 200); ctx.rotate(-.08); titanicBody(ctx, 1, null); ctx.restore();
  dotted(ctx, c0, w, cue(t, wt(33, 'fifty') - .3, 1.2), '#7ee08a');
  steamer(ctx, lerp(c0[0], w[0], k), lerp(c0[1], w[1], k) - 10, 120, { flip: true, smoke: t });
  label(ctx, 'CARPATHIA', 1230, 800, 54, t, wt(32, 'carpathia'), '#7ee08a'); label(ctx, '58 MILES', 960, 250, 110, t, wt(33, 'fifty') - .2, '#ffffff'); label(ctx, '≈ 4 HOURS', 960, 380, 90, t, wt(33, 'four') - .3, '#ff6a5a'); clockTag(ctx, '12:25 AM');
}));
// [34-35] the Californian: close enough to see, radio operator asleep
SHOTS.push(mk(34, 35, (ctx, lt, t) => {
  if (t < S(35)) { const cam = camA(t, lt, { dz: .008 }); nightSky(ctx, t, cam); applyCam(ctx, cam, 1);
    for (let i = 0; i < 9; i++) { circle(ctx, 1380 + i * 16, SEA - 14 - (i % 3) * 5, 5); ctx.fillStyle = '#ffd66e'; ctx.fill(); }
    steamer(ctx, 520, SEA - 30, 760, { funnel: '#d8a0a0', lights: 1 }); seaFront(ctx, t, { calm: true });
    label(ctx, 'CALIFORNIAN', 520, 240, 80, t, wt(34, 'californian'), '#ffffff'); label(ctx, 'LIGHTS ON THE HORIZON', 1380, 560, 44, t, wt(34, 'lights') - .3, '#ffd23a');
  } else { const cam = camA(t, lt, { dz: .01 }); shipRoom(ctx, t, cam, { wall: '#7a84a3', wall2: '#5a6484', port: [330] }); tint(ctx, '#0b1430', .35);
    drawBed(ctx, 1200, GY, 1.3, { sleeper: 'closed' }); drawZs(ctx, 1010, 560, t, 1.2);
    drawDesk(ctx, 520, GY + 30, 520); morseKey(ctx, 520, GY - 160, 200, 0); const hp = { x: 660, y: GY - 60, s: 300 }; ctx.save(); ctx.translate(0, 230); headphones(ctx, hp); ctx.restore();
    endRoom(ctx); label(ctx, 'RADIO: OFF', 520, 240, 80, t, wt(35, 'bed') - .4, '#ff6a5a'); label(ctx, '11:30 PM', 1300, 240, 70, t, wt(35, 'ten'), '#ffffff'); }
  clockTag(ctx, '12:30 AM');
}));
// ===== 6. THE LIFEBOATS =====
// [36-37] the first lifeboat: 65 seats, fewer than 30 aboard
SHOTS.push(mk(36, 37, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008 }); const lower = ease(cue(t, wt(36, 'lowered') - .3, 3.2));
  deck(ctx, t, cam, { tilt: .012, lower: lower * .7, inBoat: 3 }, () => { officer(ctx, { x: 560, y: 60, s: 440, arms: { L: [.3, -.1], R: [1.8, .2] }, face: { eyes: 'normal', mouth: 'o', look: [1, 0] } }); for (let i = 0; i < 6; i++) pax(ctx, i, { x: -760 + i * 190, y: 70 + (i % 2) * 40, s: 400, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'flat', look: [1, 0] } }); });
  if (t > S(37)) { ctx.setTransform(1, 0, 0, 1, 0, 0); rrect(ctx, 120, 150, 1040, 250, 30); ctx.fillStyle = 'rgba(10,12,24,.8)'; ctx.fill(); peopleIcons(ctx, 170, 205, 65, 22, 38, '#ffd23a', Math.round(lerp(65, 28, ease(cue(t, wt(37, 'fewer') - .2, .8))))); }
  label(ctx, '65 SEATS', 420, 110, 60, t, wt(37, 'sixty'), '#ffffff'); label(ctx, 'FEWER THAN 30', 900, 110, 60, t, wt(37, 'fewer'), '#ff6a5a');
  clockTag(ctx, '12:45 AM'); chapterTag(ctx, t, S(36) + .1, '12:45 AM');
}));
// [38-40] warm bright deck against a black ocean: many stay
SHOTS.push(mk(38, 40, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006, px: 6 });
  deck(ctx, t, cam, { tilt: .015, lower: .75, inBoat: 3 }, () => { for (let i = 0; i < 7; i++) { const no = t > S(40) ? Math.sin(t * 9 + i) * .12 : 0; pax(ctx, i + 1, { x: -820 + i * 200, y: 70 + (i % 2) * 40, s: 400, headTilt: no, arms: i % 2 ? { L: [.5, -1.2], R: [.5, -1.2] } : POSE.idle.arms, face: { eyes: 'half', mouth: 'flat', look: [1, .3] } }); } });
  label(ctx, '"IT CAN\'T BE SINKING"', 760, 200, 66, t, wt(38, 'nobody') - .2, '#ffffff', S(39));
  label(ctx, 'WARM + BRIGHT', 560, 200, 66, t, wt(39, 'warm'), '#ffd23a', S(40)); label(ctx, 'BLACK + FREEZING', 1560, 760, 50, t, wt(39, 'black'), '#9fc4ff', S(40));
  label(ctx, 'MANY STAY', 760, 200, 90, t, wt(40, 'stay') - .4, '#ff6a5a'); clockTag(ctx, '12:55 AM');
}));
// [41] white rockets; the Californian watches and wonders
SHOTS.push(mk(41, 41, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006 }); const t0 = wt(41, 'fires');
  wide(ctx, t, cam, { s: 1000, x: 1250, p: .3, mid: () => { for (let i = 0; i < 4; i++) rocket(ctx, 1380, SEA - 150, (t - t0 - i * 1.6) / 1.1, t); } });
  path(ctx, [[-100, 1080], [-100, 800], [520, 800], [640, 1080]]); fillStroke(ctx, '#15151a', 8);
  for (let i = 0; i < 2; i++) sailor(ctx, { x: 170 + i * 200, y: 830, s: 360, arms: i ? { L: [.5, -1.2], R: [.5, -1.2] } : POSE.idle.arms, face: { eyes: 'normal', look: [1, -.3], mouth: 'flat', browOne: 1 } });
  if (t > wt(41, 'wonder')) qmark(ctx, 300, 340 + Math.sin(t * 3) * 8, 150);
  label(ctx, 'WHITE ROCKETS', 1300, 180, 70, t, wt(41, 'white'), '#ffffff'); clockTag(ctx, '1:00 AM');
}));
// [42] the band starts to play
SHOTS.push(mk(42, 42, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01 });
  deck(ctx, t, cam, { tilt: .03, boat: false }, () => { for (let i = 0; i < 4; i++) { const o = { cols: ['#15151a', '#15151a'], hat: 'none', belt: false, x: -420 + i * 260, y: 70, s: 460, bob: Math.sin(t * 4 + i) * .006, arms: { L: { ik: [-.12, -.6] }, R: { ik: [.14 + Math.sin(t * 6 + i) * .05, -.52] } }, face: { eyes: 'half', mouth: 'flat' } }; drawStick(ctx, o); bowtie(ctx, o, '#f6f4ee'); violin(ctx, o.x - .08 * 460, 70 - .62 * 460, 150, -1.0); } notes(ctx, 0, -520, t, 6, '#ffffff', 460); });
  label(ctx, 'THE BAND PLAYS ON', 960, 170, 80, t, wt(42, 'band') - .2, '#ffd23a'); clockTag(ctx, '1:10 AM');
}));
// ===== 7. THE SLOPE =====
// [43-44] the deck tilts; now the boats leave full
SHOTS.push(mk(43, 44, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008, shake: 6 }); const full = t > S(44);
  deck(ctx, t, cam, { tilt: .085, lower: full ? ease(cue(t, S(44), 2.5)) * .8 : 0, inBoat: 6 }, () => { for (let i = 0; i < 9; i++) { const run = Math.sin(t * 9 + i) * .5; pax(ctx, i, { x: -900 + i * 170 + (t - S(43)) * 40, y: 60 + (i % 3) * 36, s: 380, flip: 1, lean: .12, arms: { L: [1.2 + run, .5], R: [1.2 - run, .5] }, legs: { L: [.5 + run, -.6], R: [.5 - run, -.6] }, face: { eyes: 'wide', mouth: 'o' } }); } });
  label(ctx, 'NOW EVERYONE UNDERSTANDS', 900, 170, 64, t, wt(43, 'understands') - .5, '#ffffff', S(44)); label(ctx, 'FULL BOATS. TOO FEW.', 900, 170, 76, t, S(44) + .1, '#ff6a5a');
  clockTag(ctx, '1:30 AM'); chapterTag(ctx, t, S(43) + .1, '1:30 AM');
}));
// [45] the engineers keep the lights burning
SHOTS.push(mk(45, 45, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01, r: .04 }); shipRoom(ctx, t, cam, { wall: '#5a3a32', wall2: '#3a2220', floor: '#2a2a30', tilt: .06 });
  for (let i = 0; i < 3; i++) { circle(ctx, 420 + i * 420, 480, 170); fillStroke(ctx, '#3a3d44', 10); circle(ctx, 420 + i * 420, 480, 70); fillStroke(ctx, '#ff8a3a', 8); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .25 + .1 * Math.sin(t * 8 + i); circle(ctx, 420 + i * 420, 480, 240); ctx.fillStyle = '#ff7a2a'; ctx.fill(); ctx.restore(); }
  for (let i = 0; i < 3; i++) { const o = { cols: ['#5a5a62', '#5a5a62'], hat: 'none', belt: false, x: 620 + i * 420, y: GY + 80, s: 440, arms: { L: [1.4 + Math.sin(t * 8 + i) * .4, .6], R: [1.4 - Math.sin(t * 8 + i) * .4, .6] }, face: { eyes: 'squint', mouth: 'flat' } }; drawStick(ctx, o); sweat(ctx, o.x + 70, GY + 80 - .9 * 440, 40, 1); }
  ctx.fillStyle = 'rgba(40,120,200,.45)'; ctx.fillRect(-600, GY + 60, 3200, 600);
  endRoom(ctx); drawBulb(ctx, 1600, 260, 110, .7 + .3 * Math.sin(t * 20)); label(ctx, 'KEEP THE LIGHTS ON', 760, 190, 76, t, wt(45, 'lights') - .4, '#ffd23a'); clockTag(ctx, '1:40 AM');
}));
// [46] the operators keep sending
SHOTS.push(mk(46, 46, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 }); shipRoom(ctx, t, cam, { wall: '#b9c4a3', wall2: '#93a07a', tilt: .07 });
  drawDesk(ctx, 1060, GY + 30, 900); const dn = Math.sin(t * 24) > 0 ? 1 : 0; morseKey(ctx, 1000, GY - 160, 220, dn); zap(ctx, 1300, GY - 380, 110, t, '#ff6a5a');
  const a = { cols: ['#3a4a6a', '#3a4a6a'], hat: 'none', belt: false, x: 760, y: GY + 90, s: 560, arms: { L: [.3, -.1], R: { ik: [.34, -.4 + dn * .02] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, .4] } }; drawStick(ctx, a); headphones(ctx, a); sweat(ctx, 860, GY + 90 - .9 * 560, 46, 1);
  captain(ctx, { x: 300, y: GY + 110, s: 520, arms: { L: [.3, -.1], R: [1.2, .4] }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } });
  ctx.fillStyle = 'rgba(40,120,200,.4)'; ctx.fillRect(-600, GY + 130, 3200, 600);
  endRoom(ctx); label(ctx, 'SOS  SOS  SOS', 1250, 200, 90, t, wt(46, 'sending') - .3, '#ff6a5a'); clockTag(ctx, '1:50 AM');
}));
// [47] and the band keeps playing
SHOTS.push(mk(47, 47, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 });
  deck(ctx, t, cam, { tilt: .12, boat: false }, () => { for (let i = 0; i < 4; i++) { const o = { cols: ['#15151a', '#15151a'], hat: 'none', belt: false, x: -420 + i * 260, y: 70, s: 460, lean: -.1, arms: { L: { ik: [-.12, -.6] }, R: { ik: [.14 + Math.sin(t * 6 + i) * .05, -.52] } }, face: { eyes: 'half', mouth: 'flat' } }; drawStick(ctx, o); bowtie(ctx, o, '#f6f4ee'); violin(ctx, o.x - .08 * 460, 70 - .62 * 460, 150, -1.0); } notes(ctx, 0, -520, t, 5, '#ffffff', 460); });
  label(ctx, 'BY MOST ACCOUNTS', 960, 170, 60, t, wt(47, 'most') - .2, '#ffffff'); clockTag(ctx, '2:00 AM');
}));
// [48] 2:05: the last boat. More than 1,500 still on board
SHOTS.push(mk(48, 48, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006 }); const k = ease(cue(t, wt(48, 'lowered') - .4, 2.4));
  wide(ctx, t, cam, { s: 1250, p: .75, front: () => { lifeboat(ctx, lerp(1500, 1700, k), SEA + 60, 200, 6, t); lifeboat(ctx, 300, SEA + 130, 220, 6, t); lifeboat(ctx, 1780, SEA + 210, 240, 6, t); } });
  label(ctx, 'THE LAST LIFEBOAT', 960, 170, 76, t, wt(48, 'last') - .2, '#ffffff', wt(48, 'more')); label(ctx, '1,500+ STILL ON BOARD', 960, 170, 84, t, wt(48, 'more'), '#ff6a5a'); clockTag(ctx, '2:05 AM');
}));
// ===== 8. 2:20 =====
// [49-50] the stern rises; the lights go out
SHOTS.push(mk(49, 50, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006, shake: 5 }); const k = ease(clamp((t - S(49)) / (S(51) - S(49))));
  const fl = t > wt(50, 'flicker') ? (t < wt(50, 'go') ? (Math.sin(t * 60) > 0 ? 1 : .2) : 0) : 1;
  wide(ctx, t, cam, { s: 1250, x: 960 + k * 60, rot: lerp(.16, .42, k), sink: lerp(95, 190, k), lights: fl, front: () => { lifeboat(ctx, 300, SEA + 130, 220, 6, t); lifeboat(ctx, 1700, SEA + 190, 240, 6, t); } });
  tint(ctx, '#000010', fl === 0 ? .3 : 0); chapterTag(ctx, t, S(49) + .1, '2:17 AM'); clockTag(ctx, '2:18 AM');
  label(ctx, 'LIGHTS OUT', 960, 170, 90, t, wt(50, 'out') - .1, '#ffffff');
}));
// [51] she breaks in two
SHOTS.push(mk(51, 51, (ctx, lt, t) => {
  const k = easeOut(cue(t, wt(51, 'breaks'), 1.2));
  const cam = camA(t, lt, { dz: .01, shake: 4 + (k < 1 ? 14 : 0) });
  wide(ctx, t, cam, { s: 1250, x: 1020, rot: .42, sink: 190 + k * 40, lights: 0, split: k, front: () => { lifeboat(ctx, 300, SEA + 130, 220, 6, t); lifeboat(ctx, 1700, SEA + 190, 240, 6, t); } });
  tint(ctx, '#ffffff', k > 0 && k < .3 ? .2 : 0); tint(ctx, '#000010', .3); label(ctx, 'IN TWO', 960, 170, 110, t, wt(51, 'two') - .1, '#ff6a5a'); clockTag(ctx, '2:19 AM');
}));
// [52] 2:20: gone
SHOTS.push(mk(52, 52, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .005 }); const k = ease(clamp((t - S(52)) / 3.2));
  wide(ctx, t, cam, { s: 1250, x: 1020, rot: .42 + k * .5, sink: 230 + k * 900, lights: 0, split: 1, settle: k * .9, front: () => { for (let i = 0; i < 4; i++) { const q = (t * .25 + i / 4) % 1; ellipse(ctx, 1000, SEA + 70, 60 + q * 360, 14 + q * 60); ctx.lineWidth = 5; ctx.strokeStyle = `rgba(160,200,255,${.5 * (1 - q) * k})`; ctx.stroke(); } lifeboat(ctx, 300, SEA + 130, 220, 6, t); lifeboat(ctx, 1700, SEA + 190, 240, 6, t); } });
  tint(ctx, '#000010', .3); label(ctx, '2:20 AM', 960, 260, 190, t, wt(52, 'two'), '#ffffff'); label(ctx, '2 h 40 min AFTER THE ICEBERG', 960, 420, 56, t, wt(52, 'hours') - .3, '#ffd23a');
}, 'cut'));
// [53] minus two degrees
SHOTS.push(mk(53, 53, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01 }); nightSky(ctx, t, cam); applyCam(ctx, cam, 1); seaFront(ctx, t, { y: 560, calm: true });
  thermo(ctx, 620, 760, 520, lerp(.6, .12, ease(cue(t, wt(53, 'minus') - .6, 1.2))));
  label(ctx, '−2 °C', 1250, 430, 220, t, wt(53, 'minus') - .1, '#9fc4ff'); label(ctx, '28 °F', 1250, 620, 100, t, wt(53, 'colder'), '#ffffff'); clockTag(ctx, '2:20 AM');
}));
// [54] seven hundred people wait in the dark
SHOTS.push(mk(54, 54, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008, px: 8 }); nightSky(ctx, t, cam, { stars: 170 }); applyCam(ctx, cam, 1); seaFront(ctx, t, { y: 600, calm: true });
  lifeboat(ctx, 480, 700, 260, 6, t); lifeboat(ctx, 1500, 660, 200, 5, t); lifeboat(ctx, 1000, 880, 620, 7, t); lifeboat(ctx, 1750, 820, 240, 6, t); lifeboat(ctx, 160, 860, 300, 6, t);
  tint(ctx, '#000010', .25); label(ctx, '~700 PEOPLE', 960, 240, 110, t, wt(54, 'seven') - .2, '#ffffff'); clockTag(ctx, '3:00 AM');
}));
// ===== 9. THE RESCUE =====
// [55-56] a rocket on the horizon: the Carpathia, through the ice
SHOTS.push(mk(55, 56, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006 }); const dawn = clamp((t - S(55)) / (S(57) - S(55)));
  nightSky(ctx, t, cam, { top: mix('#070b1e', '#2a3a6a', dawn), bot: mix('#1c2a52', '#c98a6a', dawn), starA: 1 - dawn }); applyCam(ctx, cam, 1);
  rocket(ctx, 1400, SEA - 20, (t - wt(55, 'rocket') + .5) / 1.2, t, '#7ee08a');
  const k = ease(clamp((t - S(56) + 1) / 6)); for (const [ix, s2] of [[300, 90], [760, 60], [1150, 110], [1650, 80]]) iceberg(ctx, ix, SEA + 4, s2, { dark: dawn < .5 });
  steamer(ctx, lerp(1750, 1250, k), SEA - 20, lerp(160, 520, k), { flip: true, smoke: t });
  seaFront(ctx, t, { calm: true, top: mix('#0e2244', '#3a5a8a', dawn) }); lifeboat(ctx, 420, SEA + 150, 300, 6, t); lifeboat(ctx, 900, SEA + 240, 360, 6, t);
  label(ctx, 'CARPATHIA', 1250, 240, 100, t, wt(55, 'carpathia') - .1, '#7ee08a'); label(ctx, 'FULL SPEED THROUGH THE ICE', 1100, 370, 54, t, wt(56, 'ice') - .5, '#ffffff');
  clockTag(ctx, '4:00 AM'); chapterTag(ctx, t, S(55) + .1, '4:00 AM');
}));
// [57-58] by nine, every survivor is aboard: about 700; roughly 1,500 never came home
SHOTS.push(mk(57, 58, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .006 }); applyCam(ctx, cam, .08); drawSky(ctx, '#6a8ac8', '#ffd9a8', -300, SEA + 40); applyCam(ctx, cam, .12); drawSun(ctx, 1500, SEA - 60, 60, t, 1);
  applyCam(ctx, cam, 1); steamer(ctx, 900, SEA - 30, 900, { flip: true, smoke: t }); seaFront(ctx, t, { top: '#4a7ab0', bot: '#1c3a6a', glint: '#ffe9c4', calm: true });
  lifeboat(ctx, 520, SEA + 90, 240, 2, t); lifeboat(ctx, 1380, SEA + 110, 260, 1, t);
  label(ctx, '~700 SAVED', 620, 220, 110, t, wt(57, 'seven') - .2, '#7ee08a'); label(ctx, '~1,500 LOST', 1320, 220, 110, t, S(58) + .1, '#ff6a5a'); clockTag(ctx, '9:00 AM');
}));
// ===== 10. WHAT CHANGED =====
// [59] the world was furious
SHOTS.push(mk(59, 59, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012, shake: 5 }); bgFlat(ctx, '#7a2a2a', '#3a1010'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 7; i++) { const j = Math.abs(Math.sin(t * 8 + i)) * 20; pax(ctx, i, { x: 200 + i * 250, y: GY + 120 - j, s: 480, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'squint', mouth: 'teeth', browAng: .4 } }); }
  ctx.save(); ctx.translate(960, 250); ctx.rotate(-.04); rrect(ctx, -430, -110, 860, 220, 10); fillStroke(ctx, '#f1ece0', 8); text(ctx, 'HOW DID THIS HAPPEN?', 0, 0, 70, INK, INK, 0, 'Lora'); ctx.restore();
  chapterTag(ctx, t, S(59) + .1, 'AFTER');
}));
// [60] a lifeboat seat for every person
SHOTS.push(mk(60, 60, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008 }); bgFlat(ctx, '#16335e', '#0c1e3c'); applyCam(ctx, cam, 1);
  const k = clamp((t - S(60)) / 2.2); peopleIcons(ctx, 300, 300, 22, 22, 62, '#ffd23a'); boatIcons(ctx, 300, 520, Math.round(lerp(10, 22, k)), 22, 62, '#7ee08a');
  rrect(ctx, 260, 250, 62 * 1.1 * 22 + 40, 340, 24); ctx.lineWidth = 8; ctx.strokeStyle = `rgba(126,224,138,${k})`; ctx.stroke();
  label(ctx, 'A SEAT FOR EVERYONE', 960, 760, 90, t, wt(60, 'every') - .2, '#7ee08a'); label(ctx, 'RULE 1', 960, 160, 60, t, S(60) + .1, '#ffffff');
}));
// [61] radios staffed 24 hours a day
SHOTS.push(mk(61, 61, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01 }); shipRoom(ctx, t, cam, { wall: '#b9c4a3', wall2: '#93a07a' });
  drawDesk(ctx, 800, GY + 30, 900); morseKey(ctx, 760, GY - 160, 220, Math.sin(t * 18) > 0 ? 1 : 0); zap(ctx, 1000, GY - 380, 110, t, '#7ee08a');
  const a = { cols: ['#3a4a6a', '#3a4a6a'], hat: 'none', belt: false, x: 480, y: GY + 90, s: 560, arms: { L: [.3, -.1], R: { ik: [.34, -.4] } }, face: { eyes: 'normal', mouth: 'flat', look: [1, .4] } }; drawStick(ctx, a); headphones(ctx, a);
  endRoom(ctx); drawClock(ctx, 1500, 420, 170, t * 14, '#ffffff'); label(ctx, '24 HOURS A DAY', 1500, 700, 70, t, wt(61, 'twenty') - .2, '#7ee08a'); label(ctx, 'RULE 2', 960, 160, 60, t, S(61) + .1, '#ffffff');
}));
// [62] the ice patrol, still watching
SHOTS.push(mk(62, 62, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008, px: 10 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#d3f0fb', -300, SEA + 40); applyCam(ctx, cam, .15); drawCloud(ctx, 400 + t * 6, 220, 110, 1);
  applyCam(ctx, cam, 1); iceberg(ctx, 1380, SEA + 6, 300, {}); steamer(ctx, 520 + lt * 20, SEA - 24, 620, { funnel: '#f1efe8', lights: 0, smoke: t }); seaFront(ctx, t, { top: '#2f8fd0', bot: '#125a96', glint: '#ffffff', calm: false });
  ctx.save(); ctx.translate(1380, 400 + Math.sin(t * 3) * 8); circle(ctx, 0, 0, 90); ctx.lineWidth = 12; ctx.strokeStyle = '#e0392f'; ctx.stroke(); line(ctx, -120, 0, 120, 0, 8, '#e0392f'); line(ctx, 0, -120, 0, 120, 8, '#e0392f'); ctx.restore();
  label(ctx, 'INTERNATIONAL ICE PATROL', 760, 200, 70, t, wt(62, 'ice') - .3, '#ffffff'); label(ctx, 'STILL WATCHING TODAY', 760, 310, 56, t, wt(62, 'still'), '#ffd23a');
}));
// [63] the wreck, found in 1985
SHOTS.push(mk(63, 63, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .008, px: -8 }); bgFlat(ctx, '#04142a', '#010610'); applyCam(ctx, cam, 1);
  path(ctx, [[-200, 1300], [-200, 880], [500, 840], [1100, 900], [1700, 850], [2200, 900], [2200, 1300]]); fillStroke(ctx, '#1a2a3a', 8);
  ctx.save(); ctx.globalAlpha = .75; ctx.translate(1350, 800); ctx.rotate(.05); ctx.scale(1100, 1100); ctx.beginPath(); ctx.rect(-.02, -1, 2, 2); ctx.clip(); titanicBody(ctx, 0, null); ctx.restore();
  ctx.save(); ctx.globalAlpha = .75; ctx.translate(560, 830); ctx.rotate(-.2); ctx.scale(1100, 1100); ctx.beginPath(); ctx.rect(-2, -1, 1.9, 2); ctx.clip(); titanicBody(ctx, 0, null); ctx.restore();
  tint(ctx, '#04203a', .45);
  const sx = 900 + Math.sin(t * .6) * 160, sy = 380 + Math.sin(t * .9) * 30; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(sx + 200, sy + 330, 20, sx + 200, sy + 330, 420); g.addColorStop(0, 'rgba(200,230,255,.5)'); g.addColorStop(1, 'rgba(200,230,255,0)'); ctx.fillStyle = g; ctx.fillRect(sx - 300, sy - 100, 1000, 900); ctx.restore();
  rrect(ctx, sx - 90, sy - 46, 180, 92, 40); fillStroke(ctx, '#ffd23a', 8); circle(ctx, sx + 50, sy, 26); fillStroke(ctx, '#bfe4ff', 6);
  const R = rng(2); for (let i = 0; i < 40; i++) { circle(ctx, R() * 1920, (R() * 1080 + t * 20) % 1080, 3); ctx.fillStyle = 'rgba(200,230,255,.35)'; ctx.fill(); }
  label(ctx, 'FOUND: 1985', 960, 170, 100, t, wt(63, 'nineteen') - .2, '#ffffff'); label(ctx, '2+ MILES DOWN, IN TWO PIECES', 960, 290, 54, t, wt(63, 'two') - .2, '#9fc4ff');
}));
// [64-65] not the iceberg alone: the belief that nothing could go wrong
SHOTS.push(mk(64, 65, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .012 }); wide(ctx, t, cam, { s: 1000, x: 700, front: () => iceberg(ctx, 1560, SEA + 6, 230, { dark: true }) });
  const k = cue(t, wt(65, 'belief') - .2, .3);
  label(ctx, 'NOT THE ICEBERG ALONE', 960, 200, 80, t, wt(64, 'iceberg') - .3, '#ffffff', S(65));
  label(ctx, '"NOTHING CAN GO WRONG"', 960, 220, 96, t, wt(65, 'belief') - .2, '#ffd23a');
  if (k > 0) { ctx.setTransform(1, 0, 0, 1, 0, 0); line(ctx, 330, 226, 330 + 1260 * ease(cue(t, wt(65, 'wrong') - .2, .6)), 214, 14, '#ff5a5a'); }
}, 'cut'));
