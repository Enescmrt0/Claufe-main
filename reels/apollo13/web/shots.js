// ---------- "Apollo 13: Four Days to Get Home" (landscape, ~5.3 min) ----------
// Shots are keyed to SENTENCES of script.json; every cue is looked up from the word timings (web/words.js).
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 1.6 : LN[i].s - .1;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const mk = (a, b, draw, tr = 'whip') => ({ start: S(a), end: S(b + 1), tr, draw });
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 960) + hh[0] + (o.px || 0) * lt, y: (o.y || 540) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .01 : o.dz) * lt, r: o.r || 0 }; };
const pop = (t, at) => ease(cue(t, at, .25)) * (1 + .15 * Math.sin(clamp((t - at) / .25) * Math.PI));
const CH = { 0: ['APRIL 13, 1970', 'THE BANG'], 5: ['APRIL 11', 'A ROUTINE MISSION'], 11: ['55 HOURS IN', 'WHAT BLEW UP'], 17: ['10:10 PM', 'LOSING THE SHIP'], 22: ['11:00 PM', 'THE LIFEBOAT'], 27: ['DAY 3', 'GOING AROUND'], 32: ['DAY 3', 'THE SQUARE PEG'], 41: ['DAY 4', 'COLD'], 47: ['APRIL 17', 'WAKING THE SHIP'], 52: ['1:07 PM', 'SPLASHDOWN'], 58: ['AFTER', 'A SUCCESSFUL FAILURE'] };
function chap(ctx, t, i) { const c = CH[i]; if (!c) return; chapterTag(ctx, t, S(i) + .1, c[0]); const k = cue(t, S(i) + .15, .3) * (1 - cue(t, S(i) + 2.3, .4)); if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = k; text(ctx, c[1], 75, 186, 50, '#ffffff', INK, 12, 'Poppins', 700, 'left'); text(ctx, c[1], 75, 186, 50, '#ffffff', INK, 0, 'Poppins', 700, 'left'); ctx.restore(); }
const AST = { cols: ['#f2f2ec', '#f2f2ec'], hat: 'none', belt: false };
const CREW3 = [['LOVELL', 520], ['HAISE', 960], ['SWIGERT', 1400]];
function crew(ctx, t, o = {}) { CREW3.forEach(([n, x], i) => { astro(ctx, { x: (o.xs ? o.xs[i] : x), y: (o.y || GY + 80) + Math.sin(t * 1.3 + i * 2) * (o.float == null ? 8 : o.float), s: o.s || 520, arms: o.arms ? o.arms(i) : POSE.idle.arms, face: o.face ? o.face(i) : { eyes: 'normal', mouth: 'flat' }, lean: o.lean || 0 }); if (o.names) label(ctx, n, (o.xs ? o.xs[i] : x), (o.y || GY + 80) - (o.s || 520) * 1.08, 44, t, o.names[i], '#ffd23a'); }); }
function mc(ctx, t, cam, o = {}) {
  missionControl(ctx, t, cam, { track: o.track, wall: o.wall, inner() {
    const n = o.n || 4;
    for (let i = 0; i < n; i++) controller(ctx, { x: 300 + i * (1320 / Math.max(1, n - 1)), y: GY + 120 + (o.jump ? -Math.abs(Math.sin(t * 8 + i)) * 40 * o.jump : 0), s: 520, cols: i === o.lead ? ['#f6f6f2', '#f6f6f2'] : ['#eef2f6', '#eef2f6'], tieCol: ['#2a4a7a', '#7a2a2a', '#2a6a4a', '#5a3a7a'][i % 4], specs: i % 3 === 1, face: o.face ? o.face(i) : { eyes: 'normal', mouth: 'flat' }, arms: o.arms ? o.arms(i) : POSE.idle.arms });
    consoleRow(ctx, GY + 220, t, 6, o.lit !== false);
    if (o.front) o.front();
  } });
}
function bubble(ctx, x, y, str, size = 56, k = 1, tail = 'left') { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = `700 ${size}px Poppins`; const w = ctx.measureText(str).width + size * 1.4, h = size * 2; rrect(ctx, -w / 2, -h / 2, w, h, h / 2); fillStroke(ctx, '#ffffff', 7); const tx = tail === 'left' ? -w / 4 : w / 4; path(ctx, [[tx - 24, h / 2 - 4], [tx - 50 * (tail === 'left' ? 1 : -1), h / 2 + 60], [tx + 24, h / 2 - 4]]); fillStroke(ctx, '#ffffff', 7); ctx.fillStyle = '#ffffff'; ctx.fillRect(tx - 20, h / 2 - 12, 40, 14); text(ctx, str, 0, 2, size, INK, INK, 0); ctx.restore(); }
function cross(ctx, x, y, s, k) { if (k <= 0) return; line(ctx, x - s, y - s, x - s + 2 * s * clamp(k * 2), y - s + 2 * s * clamp(k * 2), 22, '#e0392f'); if (k > .5) line(ctx, x + s, y - s, x + s - 2 * s * clamp(k * 2 - 1), y - s + 2 * s * clamp(k * 2 - 1), 22, '#e0392f'); }
function flash(ctx, k) { if (k <= 0) return; ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = k; ctx.fillStyle = '#fff6d8'; ctx.fillRect(0, 0, 1920, 1080); ctx.restore(); }
function timer(ctx, x, y, str, col = '#ffd23a') { rrect(ctx, x - 230, y - 90, 460, 180, 30); fillStroke(ctx, '#14161c', 8); text(ctx, str, x, y + 4, 110, col, INK, 0); }
function bolt(ctx, x, y, s, col = '#ffd23a') { path(ctx, [[x - s * .1, y - s * .5], [x + s * .25, y - s * .5], [x + s * .05, y - s * .05], [x + s * .3, y - s * .05], [x - s * .2, y + s * .55], [x - s * .02, y + s * .08], [x - s * .25, y + s * .08]]); fillStroke(ctx, col, 7); }
function drop(ctx, x, y, s, col = '#5fb6f0') { ctx.beginPath(); ctx.moveTo(x, y - s * .5); ctx.bezierCurveTo(x + s * .45, y, x + s * .4, y + s * .45, x, y + s * .45); ctx.bezierCurveTo(x - s * .4, y + s * .45, x - s * .45, y, x, y - s * .5); fillStroke(ctx, col, 7); }
function o2bubble(ctx, x, y, s) { circle(ctx, x, y, s / 2); fillStroke(ctx, '#cfe6ff', 7); text(ctx, 'O₂', x, y + 4, s * .4, '#2f5aa8', INK, 0); }
function clipboard(ctx, x, y, s, lines = [], ticks = 0) { rrect(ctx, x - s * .4, y - s * .55, s * .8, s * 1.1, 14); fillStroke(ctx, '#b98552', 7); rrect(ctx, x - s * .34, y - s * .46, s * .68, s * .96, 8); fillStroke(ctx, '#f4efe4', 5); rrect(ctx, x - s * .12, y - s * .6, s * .24, s * .1, 6); fillStroke(ctx, '#9aa0a8', 5); lines.forEach((l, i) => { const yy = y - s * .32 + i * s * .14; text(ctx, l, x - s * .26, yy, s * .07, INK, INK, 0, 'Poppins', 700, 'left'); if (i < ticks) text(ctx, '✓', x + s * .24, yy, s * .09, '#2a8a4a', INK, 0); }); }
function sofa(ctx, x, y, w) { rrect(ctx, x - w / 2, y - 260, w, 200, 40); fillStroke(ctx, '#b0603a', 8); rrect(ctx, x - w / 2 - 40, y - 160, w + 80, 160, 30); fillStroke(ctx, '#c8703f', 8); }
function room70s(ctx, t, cam) { bgRoom(ctx, t, cam, { wall: '#e6c98a', floor: '#8a5a3a' }); applyCam(ctx, cam, 1); for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? 'rgba(160,90,30,.12)' : 'rgba(255,255,255,.06)'; ctx.fillRect(i * 170, -200, 85, GY + 170); } }
function blueSky(ctx, t, cam) { applyCam(ctx, cam, .05); drawSky(ctx, '#3ea6ee', '#c9ecfb', -300, 1100); applyCam(ctx, cam, .2); for (let i = 0; i < 5; i++) drawCloud(ctx, ((i * 450 + t * 15) % 2400) - 200, 180 + (i % 3) * 120, 110, i + 1); applyCam(ctx, cam, 1); }
function clapper(ctx, x, y, s, k = 1) { ctx.beginPath(); ctx.rect(x - s / 2, y - s * .3, s, s * .6); fillStroke(ctx, '#22252c', 8); ctx.save(); ctx.translate(x - s / 2, y - s * .3); ctx.rotate(-.35 * (1 - k)); ctx.beginPath(); ctx.rect(0, -s * .14, s, s * .14); fillStroke(ctx, '#ffffff', 7); for (let i = 0; i < 6; i++) { path(ctx, [[i * s / 6, -s * .14], [i * s / 6 + s / 12, -s * .14], [i * s / 6 + s / 6, 0], [i * s / 6 + s / 12, 0]]); ctx.fillStyle = INK; ctx.fill(); } ctx.restore(); text(ctx, 'APOLLO 13 (1995)', x, y, s * .08, '#ffffff', INK, 0); }

const SHOTS = [];
// ===================== 1. THE BANG =====================
// [0] 200,000 miles from Earth, three men hear a loud bang
SHOTS.push(mk(0, 0, (ctx, lt, t) => {
  const b = wt(0, 'bang'), hit = cue(t, b - .05, .1) * (1 - cue(t, b + .1, .5));
  const cam = camA(t, lt, { dz: .02, shake: 2 + hit * 30 }); space(ctx, t, cam);
  earth(ctx, 230, 760, 110, t); moon(ctx, 1720, 260, 70);
  stack(ctx, lerp(620, 820, clamp(t / 4)), 520, 520, t, { vent: cue(t, b, 1) * .6 });
  label(ctx, '200,000 MILES FROM EARTH', 960, 160, 70, t, .2, '#ffffff', b - .1); label(ctx, 'BANG!', 960, 180, 160, t, b - .05, '#ff6a5a');
  flash(ctx, hit * .8); chap(ctx, t, 0);
}, 'cut'));
// [1] the spacecraft shudders; warning lights flash
SHOTS.push(mk(1, 1, (ctx, lt, t) => {
  const al = t > wt(1, 'warning') - .1 && Math.floor(t * 4) % 2 === 0;
  const cam = camA(t, lt, { dz: .02, shake: t < wt(1, 'warning') ? 16 : 6 });
  cabin(ctx, t, cam, { lights: (r, c) => al ? (r + c) % 2 === 0 : (r * c) % 3 !== 1 });
  warnLight(ctx, 1460, 640, 300, al);
  crew(ctx, t, { xs: [380, 760, 1140], face: () => ({ eyes: 'wide', mouth: 'o' }), arms: () => ({ L: [1.4, .3], R: [1.4, .3] }) });
  label(ctx, 'SHUDDER', 960, 140, 100, t, wt(1, 'shudders') - .2, '#ffffff', wt(1, 'warning') - .1);
}));
// [2] one of them picks up the radio
SHOTS.push(mk(2, 2, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.05, dz: .04, shake: 3 }); cabin(ctx, t, cam, { lights: (r, c) => (r + c + Math.floor(t * 4)) % 2 === 0 });
  astro(ctx, { x: 760, y: GY + 320, s: 880, arms: { L: [.3, -.1], R: [2.2, 1.5] }, face: { eyes: 'normal', mouth: 'flat', look: [1, 0] } });
  micAt(ctx, 900, 330, 260, -.4);
  label(ctx, 'JIM LOVELL', 760, 120, 70, t, wt(2, 'one') - .1, '#ffd23a', wt(2, 'most') - .1); label(ctx, 'THE MOST FAMOUS UNDERSTATEMENT', 960, 120, 64, t, wt(2, 'most') - .1, '#ffffff');
}));
// [3] Houston, we've had a problem
SHOTS.push(mk(3, 3, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.02, dz: .05, shake: 1 }); mc(ctx, t, cam, { face: () => ({ eyes: 'wide', mouth: 'o' }) });
  bubble(ctx, 960, 560, '"HOUSTON, WE\'VE HAD A PROBLEM."', 64, pop(t, wt(3, 'houston') - .1), 'left');
}, 'cut'));
// [4] four days; hundreds of people on the ground refuse to give up
SHOTS.push(mk(4, 4, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); mc(ctx, t, cam, { n: 5, face: () => ({ eyes: 'squint', mouth: 'flat' }), arms: i => t > wt(4, 'refuse') ? { L: [.3, -.1], R: [2.4, .3] } : POSE.idle.arms });
  label(ctx, '4 DAYS', 960, 560, 160, t, wt(4, 'four') - .1, '#ffd23a', wt(4, 'few') - .1); label(ctx, 'HUNDREDS ON THE GROUND', 960, 560, 90, t, wt(4, 'few') - .1, '#ffffff');
}));
// ===================== 2. A ROUTINE MISSION =====================
// [5] Apollo 13: supposed to be the third Moon landing
SHOTS.push(mk(5, 5, (ctx, lt, t) => {
  const cam = camA(t, lt, { y: 540 - lt * 120, dz: .01 }); blueSky(ctx, t, cam);
  ctx.fillStyle = '#c8b48a'; ctx.fillRect(-800, GY + 40, 3600, 1000);
  const up = ease(clamp((t - S(5) - .6) / 4)) * 700; saturnV(ctx, 960, GY + 40 - up, 820, t, 1);
  label(ctx, 'APOLLO 13', 960, 150, 120, t, wt(5, 'apollo') - .1, '#ffffff'); label(ctx, '3RD MOON LANDING', 960, 280, 70, t, wt(5, 'third') - .1, '#ffd23a');
  chap(ctx, t, 5);
}, 'cut'));
// [6] people were bored; TV barely covered the launch
SHOTS.push(mk(6, 6, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); room70s(ctx, t, cam);
  sofa(ctx, 700, GY + 60, 700);
  for (let i = 0; i < 2; i++) drawStick(ctx, { cols: [[PAL.green, PAL.purple][i][0] || '#3aa35b', [PAL.green, PAL.purple][i][0] || '#3aa35b'], hat: 'none', belt: false, x: 560 + i * 280, y: GY + 40, s: 440, lean: .1, arms: i ? { L: [2.6, 1.8], R: [.3, -.1] } : POSE.idle.arms, face: { eyes: 'squint', mouth: i ? 'o' : 'flat' } });
  const off = t > wt(6, 'tv') - .1;
  crt(ctx, 1420, 500, 380, () => { if (!off) { ctx.fillStyle = '#e8e8e0'; ctx.fillRect(1100, 300, 700, 500); saturnV(ctx, 1420, 640, 300, t, 1); } else { const R = rng(Math.floor(t * 20)); for (let i = 0; i < 300; i++) { ctx.fillStyle = R() > .5 ? '#ddd' : '#333'; ctx.fillRect(1230 + R() * 380, 350 + R() * 290, 8, 8); } } });
  label(ctx, 'ZZZ...', 640, 240, 90, t, wt(6, 'bored') - .1, '#ffffff', wt(6, 'tv') - .1); label(ctx, 'BARELY ON TV', 640, 240, 90, t, wt(6, 'tv') - .1, '#ffd23a');
}));
// [7] the crew: Lovell, Haise, Swigert
SHOTS.push(mk(7, 7, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#2f5aa8', '#1a2f6a'); applyCam(ctx, cam, 1);
  crew(ctx, t, { y: GY + 160, s: 620, float: 0, face: () => ({ eyes: 'happy', mouth: 'smile' }), names: [wt(7, 'jim') - .1, wt(7, 'fred') - .1, wt(7, 'jack') - .1] });
  label(ctx, 'COMMANDER', 520, 120, 54, t, wt(7, 'commander') - .1, '#ffffff');
}));
// [8] Swigert wasn't even supposed to be there
SHOTS.push(mk(8, 8, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.05, dz: .04 }); bgFlat(ctx, '#2f5aa8', '#1a2f6a'); applyCam(ctx, cam, 1);
  ctx.save(); ctx.globalAlpha = .35; circle(ctx, 960, 560, 420); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore();
  astro(ctx, { x: 960, y: GY + 200, s: 700, face: { eyes: 'wide', mouth: 'smirk' }, arms: { L: [.9, -2.2], R: [.9, -2.2] } }); qmark(ctx, 1300, 380, 220);
  label(ctx, 'SWIGERT', 960, 120, 90, t, S(8) + .1, '#ffd23a');
}));
// [9-10] Mattingly exposed to measles, swapped out; he never got sick
SHOTS.push(mk(9, 10, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#3fa35b', '#25703a'); applyCam(ctx, cam, 1);
  const sw = ease(cue(t, wt(9, 'swapped') - .2, .8));
  const m = astro(ctx, { x: lerp(700, 380, sw), y: GY + 160, s: 600, face: { eyes: t > wt(10, 'never') ? 'squint' : 'wide', mouth: 'frown' } });
  if (t > wt(9, 'measles') - .1) measles(ctx, m);
  astro(ctx, { x: lerp(1500, 1220, sw), y: GY + 160, s: 600, face: { eyes: 'happy', mouth: 'grin' }, arms: sw > .5 ? { L: [.3, -.1], R: [2.5, .3] } : POSE.idle.arms });
  if (sw > 0) { text(ctx, '⇄', 800, 520, 160, '#ffd23a', INK, 0); }
  label(ctx, 'KEN MATTINGLY', 520, 120, 66, t, wt(9, 'ken') - .1, '#ffffff', wt(9, 'measles') - .1); label(ctx, 'MEASLES?', 520, 120, 90, t, wt(9, 'measles') - .1, '#ff6a5a', wt(9, 'swapped') - .1); label(ctx, 'SWAPPED OUT', 960, 120, 90, t, wt(9, 'swapped') - .1, '#ffd23a', wt(10, 'never') - .1);
  label(ctx, 'SWIGERT', 1220, 300, 50, t, wt(9, 'swapped') + .2, '#ffffff');
  stamp(ctx, 520, 300, 'NEVER GOT SICK', cue(t, wt(10, 'never'), .2), '#e0392f', -.12);
}));
// ===================== 3. WHAT BLEW UP =====================
// [11] mission control asks the crew to stir the oxygen tanks
SHOTS.push(mk(11, 11, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); mc(ctx, t, cam, { lead: 1, face: () => ({ eyes: 'normal', mouth: 'smile' }), arms: i => i === 1 ? { L: [.3, -.1], R: [2.2, 1.5] } : POSE.idle.arms });
  bubble(ctx, 860, 560, 'PLEASE STIR THE TANKS', 54, pop(t, wt(11, 'stir') - .2), 'left');
  label(ctx, 'ROUTINE CHORE', 960, 380, 70, t, wt(11, 'routine') - .1, '#ffd23a');
  chap(ctx, t, 11);
}, 'cut'));
// [12] Swigert flips the switch
SHOTS.push(mk(12, 12, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.1, dz: .06, shake: 1 }); bgFlat(ctx, '#4a4f58', '#2a2d33'); applyCam(ctx, cam, 1);
  const on = t > wt(12, 'switch') - .1;
  toggleSwitch(ctx, 960, 560, 420, on); text(ctx, 'O₂ FANS', 960, 200, 64, '#ffffff', INK, 0);
  const hx = lerp(1300, 1010, ease(cue(t, wt(12, 'flips') - .3, .5))); circle(ctx, hx, on ? 380 : 720, 60); fillStroke(ctx, '#f2f2ec', 7);
}, 'cut'));
// [13] sixteen seconds later, tank two explodes
SHOTS.push(mk(13, 13, (ctx, lt, t) => {
  const ex = wt(13, 'explodes'), k = cue(t, ex - .05, .1), sec = Math.min(16, Math.floor((t - S(13)) / (ex - S(13)) * 16));
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: 2 + (1 - cue(t, ex + .2, .8)) * k * 30 }); bgFlat(ctx, '#14161c', '#06070a'); applyCam(ctx, cam, 1);
  if (k < 1) { o2Tank(ctx, 1260, 560, 220, t, { cut: true, fan: true, hot: (t - S(13)) / (ex - S(13)), shake: (t - S(13)) / (ex - S(13)) }); timer(ctx, 520, 540, '0:' + String(sec).padStart(2, '0')); }
  else { for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, d = (t - ex) * 900; ctx.save(); ctx.translate(1260 + Math.cos(a) * d, 560 + Math.sin(a) * d); ctx.rotate(t * 6 + i); ctx.beginPath(); ctx.rect(-30, -14, 60, 28); fillStroke(ctx, '#d8dbe0', 5); ctx.restore(); } circle(ctx, 1260, 560, 240 * (1 - cue(t, ex + .3, 1))); ctx.fillStyle = '#ffb12a'; ctx.fill(); timer(ctx, 520, 540, '0:16', '#ff6a5a'); }
  label(ctx, 'EXPLODES', 1260, 150, 120, t, ex - .05, '#ff6a5a'); flash(ctx, k * (1 - cue(t, ex + .1, .4)));
}, 'cut'));
// [14] years earlier: dropped two inches; 28-volt switches run at 65
SHOTS.push(mk(14, 14, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgRoom(ctx, t, cam, { wall: '#cfd6dc', floor: '#8a8f98' }); applyCam(ctx, cam, 1);
  const volts = t > wt(14, 'and') - .1, d = ease(cue(t, wt(14, 'dropped'), .25)), bump = Math.sin(clamp((t - wt(14, 'dropped') - .25) / .3) * Math.PI) * 10;
  if (!volts) { line(ctx, 960, -100, 960, 300 + d * 60, 8); o2Tank(ctx, 960, 520 + d * 60 - bump, 200, t, { lab: 'TANK 2' }); for (let i = 0; i < 3; i++) drawStick(ctx, { cols: ['#f6f6f2', '#f6f6f2'], hat: 'none', belt: false, x: 300 + i * 220 + (i > 1 ? 1000 : 0), y: GY + 40, s: 420, face: { eyes: d > .5 ? 'wide' : 'normal', mouth: d > .5 ? 'o' : 'flat' } }); label(ctx, '~2 INCHES', 1340, 600, 80, t, wt(14, 'two') - .1, '#ffd23a'); }
  else { rrect(ctx, 360, 260, 500, 500, 30); fillStroke(ctx, '#ffffff', 8); text(ctx, 'BUILT FOR', 610, 360, 50, INK, INK, 0); text(ctx, '28 V', 610, 520, 150, '#2a8a4a', INK, 0); if (t > wt(14, 'but') - .1) { rrect(ctx, 1060, 260, 500, 500, 30); fillStroke(ctx, '#ffe0dc', 8); text(ctx, 'RUN AT', 1310, 360, 50, INK, INK, 0); text(ctx, '65 V', 1310, 520, 150 * pop(t, wt(14, '65') - .1), '#e0392f', INK, 0); zap(ctx, 1310, 680, 90, t); } }
  label(ctx, 'YEARS EARLIER', 960, 120, 80, t, S(14) + .05, '#ffffff', wt(14, 'and') - .1); label(ctx, 'HEATER SWITCHES', 960, 120, 80, t, wt(14, 'heater') - .1, '#ffffff');
}));
// [15] they welded shut and cooked the wiring
SHOTS.push(mk(15, 15, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.05, dz: .04 }); bgFlat(ctx, '#2a1a14', '#140a08'); applyCam(ctx, cam, 1);
  o2Tank(ctx, 960, 560, 300, t, { cut: true, burnt: t > wt(15, 'cooked'), hot: .5 + .5 * Math.sin(t * 6) * cue(t, wt(15, 'cooked'), .4) });
  if (t > wt(15, 'cooked')) for (let i = 0; i < 4; i++) zap(ctx, 860 + i * 70, 420 + (i % 2) * 120, 60, t + i);
  label(ctx, 'WELDED SHUT', 960, 120, 100, t, wt(15, 'welded') - .1, '#ffd23a', wt(15, 'cooked') - .1); label(ctx, 'WIRING COOKED', 960, 120, 100, t, wt(15, 'cooked') - .1, '#ff6a5a');
}));
// [16] like a bomb with no timer; until someone stirred it
SHOTS.push(mk(16, 16, (ctx, lt, t) => {
  const st = t > wt(16, 'until') - .1;
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: st ? 6 : 2 }); bgFlat(ctx, '#14161c', '#06070a'); applyCam(ctx, cam, 1);
  o2Tank(ctx, 960, 560, 260, t, { cut: true, burnt: true, fan: st, shake: st ? .6 : 0 });
  if (!st) { timer(ctx, 960, 180, '--:--', '#7a7f88'); } else zap(ctx, 960, 560, 160, t);
  label(ctx, 'MONTHS', 400, 300, 90, t, wt(16, 'months') - .1, '#ffffff'); label(ctx, 'A BOMB', 1520, 300, 90, t, wt(16, 'bomb') - .1, '#ff6a5a'); label(ctx, 'UNTIL...', 960, 960, 90, t, wt(16, 'until') - .1, '#ffd23a');
}));
// ===================== 4. LOSING THE SHIP =====================
// [17] a whole panel blew off the service module
SHOTS.push(mk(17, 17, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02, shake: 4 }); space(ctx, t, cam);
  stack(ctx, 900, 560, 760, t, { panel: ease(clamp((t - wt(17, 'blew') + .2) / 2)), vent: .8 });
  label(ctx, 'SERVICE MODULE', 560, 900, 60, t, wt(17, 'service') - .1, '#ffffff'); label(ctx, 'A WHOLE PANEL', 960, 120, 90, t, wt(17, 'panel') - .1, '#ff6a5a');
  chap(ctx, t, 17);
}, 'cut'));
// [18] out of the window: a cloud of gas streaming into space
SHOTS.push(mk(18, 18, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); cabin(ctx, t, cam, { wx: 1300, wy: 420, window: (x, y, r) => { for (let i = 0; i < 20; i++) { const q = ((t * .5 + i / 20) % 1); ctx.globalAlpha = (1 - q) * .8 * cue(t, wt(18, 'cloud') - .3, .5); circle(ctx, x - r + q * r * 2.4, y + Math.sin(i * 3) * r * .5, 20 + q * 70); ctx.fillStyle = '#e8eef8'; ctx.fill(); } ctx.globalAlpha = 1; } });
  astro(ctx, { x: 860, y: GY + 160, s: 640, flip: 1, face: { eyes: t > wt(18, 'bad') - .1 ? 'wide' : 'normal', mouth: 'o', look: [1, -1] } });
  label(ctx, 'LOVELL', 860, 120, 70, t, wt(18, 'lovell') - .1, '#ffd23a', wt(18, 'cloud') - .1); label(ctx, 'GAS, STREAMING OUT', 960, 120, 80, t, wt(18, 'cloud') - .1, '#ffffff');
}));
// [19] it's their oxygen: it makes their electricity and water
SHOTS.push(mk(19, 19, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#2f5aa8', '#1a2f6a'); applyCam(ctx, cam, 1);
  o2bubble(ctx, 420, 540, 300 * pop(t, wt(19, 'oxygen') - .1));
  if (t > wt(19, 'electricity') - .2) { text(ctx, '→', 760, 520, 140, '#ffffff', INK, 0); bolt(ctx, 1080, 540, 300 * pop(t, wt(19, 'electricity') - .2)); }
  if (t > wt(19, 'water') - .2) { text(ctx, '+', 1300, 520, 140, '#ffffff', INK, 0); drop(ctx, 1560, 540, 300 * pop(t, wt(19, 'water') - .2)); }
  label(ctx, 'THEIR OXYGEN', 960, 140, 100, t, wt(19, 'oxygen') - .2, '#ffffff', wt(19, 'electricity') - .2); label(ctx, 'POWER + WATER', 960, 140, 100, t, wt(19, 'electricity') - .2, '#ffd23a');
}));
// [20] the gauges fall; the command module has a few hours of power left
SHOTS.push(mk(20, 20, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#3a3f4a', '#1a1d24'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 3; i++) { const f = lerp(.9, .08, ease(clamp((t - wt(20, 'one') - i * .5) / 2.2))); drawGauge(ctx, 420 + i * 540, 520, 200, f, ['O₂ 1', 'O₂ 2', 'POWER'][i]); }
  label(ctx, 'ONE BY ONE', 960, 140, 90, t, wt(20, 'one') - .1, '#ffffff', wt(20, 'command') - .1); label(ctx, 'A FEW HOURS OF POWER', 960, 140, 90, t, wt(20, 'few') - .1, '#ff6a5a');
  label(ctx, 'THEIR ONLY WAY HOME', 960, 800, 64, t, wt(20, 'only') - .1, '#ffd23a');
}));
// [21] the Moon landing is over. can they get home alive?
SHOTS.push(mk(21, 21, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); space(ctx, t, cam);
  moon(ctx, 560, 540, 260); cross(ctx, 560, 540, 220, cue(t, wt(21, 'over') - .2, .5));
  if (t > wt(21, 'can') - .2) { earth(ctx, 1380, 540, 220 * pop(t, wt(21, 'can') - .2), t); qmark(ctx, 1640, 300, 200); }
  label(ctx, 'LANDING: OVER', 560, 140, 90, t, wt(21, 'moon') - .1, '#ff6a5a'); label(ctx, 'HOME ALIVE?', 1380, 140, 100, t, wt(21, 'can') - .1, '#ffd23a');
}));
// ===================== 5. THE LIFEBOAT =====================
// [22] one place left to go: the lunar module, Aquarius
SHOTS.push(mk(22, 22, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .03, x: 960 + lt * 25 }); space(ctx, t, cam); earth(ctx, 1700, 860, 140, t);
  const k = cue(t, wt(22, 'lunar') - .2, .4);
  stack(ctx, 700, 560, 820, t, { panel: 1, vent: .3 });
  if (k > 0) { ctx.save(); ctx.globalAlpha = .4 * k; circle(ctx, 700 + 820 * .55, 560, 230); ctx.fillStyle = '#ffd23a'; ctx.fill(); ctx.restore(); }
  label(ctx, 'LUNAR MODULE', 1150, 160, 80, t, wt(22, 'lunar') - .1, '#ffffff', wt(22, 'aquarius') - .1); label(ctx, '"AQUARIUS"', 1150, 160, 110, t, wt(22, 'aquarius') - .1, '#ffd23a');
  chap(ctx, t, 22);
}, 'cut'));
// [23-24] built for two men for two days; now three men for four
SHOTS.push(mk(23, 24, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#2a2f4a', '#161a2e'); applyCam(ctx, cam, 1);
  const now = t > S(24);
  const n = now ? 3 : 2, days = now ? 4 : 2;
  for (let i = 0; i < n; i++) astro(ctx, { x: 300 + i * 200, y: 820, s: 340, face: { eyes: now ? 'squint' : 'happy', mouth: now ? 'frown' : 'smile' } });
  for (let d = 0; d < days; d++) { rrect(ctx, 1040 + d * 190, 380, 160, 180, 16); fillStroke(ctx, d >= 2 ? '#ff9a8a' : '#ffffff', 7); text(ctx, 'DAY', 1120 + d * 190, 420, 34, INK, INK, 0); text(ctx, String(d + 1), 1120 + d * 190, 500, 80, INK, INK, 0); }
  label(ctx, now ? '3 MEN · 4 DAYS' : 'BUILT FOR 2 MEN · 2 DAYS', 960, 140, 84, t, now ? S(24) : wt(23, 'built') - .1, now ? '#ff6a5a' : '#ffffff');
}));
// [25] power down the command module; move into a vehicle the size of two phone booths
SHOTS.push(mk(25, 25, (ctx, lt, t) => {
  const booths = t > wt(25, 'vehicle') - .2;
  const cam = camA(t, lt, { dz: .02 });
  if (!booths) { space(ctx, t, cam); const off = t > wt(25, 'powers') + .3; stack(ctx, 800, 560, 900, t, { panel: 1, cmLit: !off, lmLit: true }); label(ctx, 'POWER DOWN', 960, 140, 100, t, wt(25, 'powers') - .1, '#ffffff', wt(25, 'save') - .1); label(ctx, 'SAVE IT FOR THE END', 960, 140, 90, t, wt(25, 'save') - .1, '#ffd23a'); }
  else { bgFlat(ctx, '#3a3f6a', '#1f2340'); applyCam(ctx, cam, 1); phoneBooth(ctx, 760, GY + 120, 620); phoneBooth(ctx, 1160, GY + 120, 620); crew(ctx, t, { xs: [700, 960, 1200], y: GY + 100, s: 380, float: 6 }); label(ctx, '2 PHONE BOOTHS', 960, 120, 100, t, wt(25, 'size') - .1, '#ffd23a'); }
}));
// [26] like using your lifeboat as the whole ship
SHOTS.push(mk(26, 26, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .03 }); nightSky(ctx, t, cam); applyCam(ctx, cam, 1);
  lifeboat(ctx, 960, 700, 640, 3, t); seaFront(ctx, t, { calm: true, y: 760 });
  label(ctx, 'LIFEBOAT = WHOLE SHIP', 960, 160, 90, t, wt(26, 'lifeboat') - .2, '#ffd23a');
}));
// ===================== 6. GOING AROUND =====================
// [27] they can't just turn around
SHOTS.push(mk(27, 27, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); space(ctx, t, cam); earth(ctx, 260, 780, 120, t); moon(ctx, 1640, 300, 90);
  stack(ctx, 960, 540, 520, t, { panel: 1, rot: Math.sin(t * 2) * .05 });
  ctx.beginPath(); ctx.arc(960, 540, 300, -Math.PI * .1, Math.PI * 1.1, true); ctx.lineWidth = 16; ctx.strokeStyle = '#ffd23a'; ctx.stroke(); path(ctx, [[640, 560], [660, 640], [600, 620]]); ctx.fillStyle = '#ffd23a'; ctx.fill();
  cross(ctx, 960, 400, 160, cue(t, wt(27, 'space') - .2, .5));
  label(ctx, 'U-TURN?', 960, 120, 100, t, wt(27, 'turn') - .2, '#ffffff', wt(27, 'space') - .1); label(ctx, 'NOT IN SPACE', 960, 120, 100, t, wt(27, 'space') - .1, '#ff6a5a');
  chap(ctx, t, 27);
}, 'cut'));
// [28] swing around the Moon, gravity throws them home like a slingshot
SHOTS.push(mk(28, 28, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .01 }); space(ctx, t, cam); earth(ctx, 300, 560, 150, t); moon(ctx, 1500, 520, 110);
  const p = trajectory(ctx, 300, 560, 1500, 520, ease(clamp((t - S(28)) / (S(29) - S(28) - .3))));
  stack(ctx, p[0], p[1], 120, t, { panel: 1 });
  label(ctx, 'AROUND THE MOON', 960, 140, 90, t, wt(28, 'swing') - .1, '#ffffff', wt(28, 'slingshot') - .1); label(ctx, 'SLINGSHOT', 960, 140, 120, t, wt(28, 'slingshot') - .1, '#ffd23a');
}));
// [29-30] behind the Moon: no radio. farther from home than any humans ever
SHOTS.push(mk(29, 30, (ctx, lt, t) => {
  const far = t > S(30);
  const cam = camA(t, lt, { z: far ? 1.0 : 1.04, dz: far ? -.05 : .02 }); space(ctx, t, cam);
  if (!far) { earth(ctx, 200, 540, 90, t); moon(ctx, 1100, 540, 300); stack(ctx, 1560, 540, 260, t, { panel: 1 }); for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(200, 540, 140 + i * 60 + (t * 80) % 60, -.4, .4); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(125,255,176,.7)'; ctx.stroke(); } cross(ctx, 1560, 300, 80, cue(t, wt(29, 'lose') - .1, .4)); label(ctx, 'NO RADIO', 1560, 160, 90, t, wt(29, 'lose') - .1, '#ff6a5a'); }
  else { earth(ctx, 200, 540, 36, t); moon(ctx, 1500, 540, 140); stack(ctx, 1760, 540, 110, t, { panel: 1 }); dotted(ctx, [240, 540], [1700, 540], cue(t, S(30), 1.5), '#ffd23a'); label(ctx, 'FARTHEST HUMANS EVER', 960, 160, 90, t, wt(30, 'farther') - .1, '#ffd23a'); }
}));
// [31] fire the LM engine to speed up, out the other side, headed for Earth
SHOTS.push(mk(31, 31, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .03, shake: t > wt(31, 'fire') ? 5 : 2 }); space(ctx, t, cam); moon(ctx, 1600, 900, 380);
  stack(ctx, lerp(1150, 850, clamp((t - S(31)) / 6)), 460, 620, t, { panel: 1, rot: Math.PI, lmFlame: cue(t, wt(31, 'fire') - .1, .3) * (1 - cue(t, wt(31, 'come'), .4)) });
  if (t > wt(31, 'headed') - .3) earth(ctx, 200, 300, 110 * pop(t, wt(31, 'headed') - .3), t);
  label(ctx, 'ENGINE BURN', 960, 120, 90, t, wt(31, 'fire') - .1, '#ffd23a', wt(31, 'headed') - .3); label(ctx, 'HEADED FOR EARTH', 960, 120, 90, t, wt(31, 'headed') - .2, '#ffffff');
}));
// ===================== 7. THE SQUARE PEG =====================
// [32-33] a new problem: the air. every breath adds carbon dioxide
SHOTS.push(mk(32, 33, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); cabin(ctx, t, cam, { dark: .4 });
  crew(ctx, t, { xs: [380, 700, 1020], face: i => ({ eyes: t > wt(33, 'too') ? 'squint' : 'normal', mouth: 'flat' }) });
  for (let i = 0; i < 3; i++) { const q = ((t * .7 + i * .33) % 1); ctx.globalAlpha = (1 - q) * .7; circle(ctx, [380, 700, 1020][i] + 60 + q * 80, GY + 80 - 520 * .72 - q * 60, 20 + q * 30); ctx.fillStyle = '#c8c8c8'; ctx.fill(); ctx.globalAlpha = 1; }
  co2Meter(ctx, 1500, 900, 600, lerp(.2, .75, clamp((t - S(32)) / (S(34) - S(32)))));
  label(ctx, 'THE AIR', 960, 120, 110, t, wt(32, 'air') - .1, '#ffffff', wt(33, 'carbon') - .1); label(ctx, 'CARBON DIOXIDE', 960, 120, 100, t, wt(33, 'carbon') - .1, '#ff6a5a', wt(33, 'too') - .1); label(ctx, 'TOO MUCH = PASS OUT', 960, 120, 90, t, wt(33, 'too') - .1, '#ff6a5a');
  chap(ctx, t, 32);
}, 'cut'));
// [34] the LM's filters were made for two people, filling up fast
SHOTS.push(mk(34, 34, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.05, dz: .03 }); bgFlat(ctx, '#3a3f4a', '#1a1d24'); applyCam(ctx, cam, 1);
  const f = clamp((t - wt(34, 'filling')) / 1.4);
  filterBox(ctx, 760, 540, 440, 'round', lerpColor('#e8e8e0', '#4a3a2a', .2 + f * .7));
  co2Meter(ctx, 1380, 860, 560, lerp(.6, .82, f));
  label(ctx, 'MADE FOR 2', 760, 140, 90, t, wt(34, 'made') - .1, '#ffffff', wt(34, 'filling') - .1); label(ctx, 'FILLING UP FAST', 760, 140, 90, t, wt(34, 'filling') - .1, '#ff6a5a');
}));
// [35-36] the CM has spare filters... square. the LM's holes are round
SHOTS.push(mk(35, 36, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#2f5aa8', '#1a2f6a'); applyCam(ctx, cam, 1);
  const sq = t > wt(36, 'square') - .2, rd = t > wt(36, 'round') - .2;
  for (let i = 0; i < 3; i++) filterBox(ctx, 360 + i * 60, 560 - i * 40, 300, 'square');
  if (!sq) label(ctx, 'PLENTY OF SPARES', 600, 140, 80, t, wt(35, 'plenty') - .1, '#ffffff', wt(35, 'there') - .1);
  if (!sq && t > wt(35, 'there') - .1) qmark(ctx, 1300, 540, 260);
  if (sq) label(ctx, 'SQUARE', 480, 140, 110, t, wt(36, 'square') - .2, '#ffd23a');
  if (rd) { hole(ctx, 1400, 560, 320, 'round'); label(ctx, 'ROUND', 1400, 140, 110, t, wt(36, 'round') - .2, '#ff6a5a'); const b = cue(t, wt(36, 'round') + .4, .4); if (b > 0) { filterBox(ctx, lerp(900, 1310, b) - Math.sin(clamp((t - wt(36, 'round') - .8) / .4) * Math.PI) * 60, 560, 280, 'square', '#fff4c0'); } }
}));
// [37] engineers dump everything on board onto a table: bags, cardboard, hoses, a sock, duct tape
SHOTS.push(mk(37, 37, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgRoom(ctx, t, cam, { wall: '#cfd6dc', floor: '#8a8f98' }); applyCam(ctx, cam, 1);
  for (let i = 0; i < 4; i++) controller(ctx, { x: 340 + i * 420, y: GY - 40, s: 460, tieCol: ['#2a4a7a', '#7a2a2a', '#2a6a4a', '#5a3a7a'][i], specs: i % 2 === 0, face: { eyes: 'wide', mouth: 'o', look: [0, 1] }, tie: true });
  rrect(ctx, 160, 700, 1600, 70, 10); fillStroke(ctx, '#b98552', 8); ctx.beginPath(); ctx.rect(200, 770, 40, 300); ctx.rect(1680, 770, 40, 300); fillStroke(ctx, '#8a5a30', 6);
  const it = [['plastic', (k) => plasticBag(ctx, 380, 640, 200 * k)], ['cardboard', (k) => cardboard(ctx, 680, 650, 240 * k, -.1)], ['hoses', (k) => hose(ctx, 980, 660, 260 * k)], ['sock', (k) => sock(ctx, 1260, 620, 200 * k, .4)], ['duct', (k) => ductTape(ctx, 1520, 650, 130 * k)]];
  it.forEach(([w, f]) => { const k = pop(t, wt(37, w) - .15); if (k > 0) f(k); });
  label(ctx, 'ON THE GROUND', 960, 120, 84, t, S(37) + .05, '#ffffff', wt(37, 'plastic') - .2);
  const names = ['BAGS', 'CARDBOARD', 'HOSES', 'A SOCK', 'DUCT TAPE']; ['plastic', 'cardboard', 'hoses', 'sock', 'duct'].forEach((w, i) => label(ctx, names[i], 960, 120, 110, t, wt(37, w) - .15, '#ffd23a', i < 4 ? wt(37, ['cardboard', 'hoses', 'sock', 'duct'][i]) - .15 : 1e9));
}));
// [38] build a square filter that fits a round hole, using only that pile
SHOTS.push(mk(38, 38, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#2a2f4a', '#161a2e'); applyCam(ctx, cam, 1);
  filterBox(ctx, 560, 520, 340, 'square'); text(ctx, '→', 960, 500, 160, '#ffd23a', INK, 0); hole(ctx, 1360, 520, 340, 'round');
  label(ctx, 'SQUARE → ROUND', 960, 140, 100, t, wt(38, 'square') - .1, '#ffffff'); label(ctx, 'ONLY THAT PILE', 960, 800, 80, t, wt(38, 'only') - .1, '#ffd23a');
  qmark(ctx, 960, 300, 140);
}));
// [39] they figure it out and read the instructions up, step by step
SHOTS.push(mk(39, 39, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); mc(ctx, t, cam, { lead: 1, face: i => ({ eyes: 'happy', mouth: i === 1 ? 'o' : 'smile' }), front: () => clipboard(ctx, 1560, 520, 520, ['CUT THE BAG', 'TAPE THE CARD', 'FIT THE HOSE', 'ADD THE SOCK', 'SEAL IT'], Math.floor(clamp((t - wt(39, 'step') + .6) / 1.2) * 5)) });
  label(ctx, 'STEP BY STEP', 760, 140, 90, t, wt(39, 'step') - .2, '#ffd23a', 1e9);
  label(ctx, 'FIGURED IT OUT', 760, 140, 90, t, wt(39, 'figure') - .1, '#ffffff', wt(39, 'step') - .2);
}));
// [40] the crew builds it; the carbon dioxide starts to fall
SHOTS.push(mk(40, 40, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); cabin(ctx, t, cam, { dark: .45 });
  const k = clamp((t - S(40)) / (wt(40, 'carbon') - S(40)));
  mailbox(ctx, 760, 540, 380, k);
  co2Meter(ctx, 1500, 900, 600, lerp(.82, .3, ease(cue(t, wt(40, 'starts') - .2, 1.2))));
  label(ctx, 'THE "MAILBOX"', 760, 140, 90, t, wt(40, 'builds') - .1, '#ffd23a', wt(40, 'carbon') - .1); label(ctx, 'CO₂ FALLING', 960, 140, 100, t, wt(40, 'carbon') - .1, '#7dffb0');
}));
// ===================== 8. COLD =====================
// [41] to save power, almost everything is off. no heaters
SHOTS.push(mk(41, 41, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); const off = clamp((t - wt(41, 'almost')) / 1.2);
  cabin(ctx, t, cam, { dark: .4 + off * .5, lights: (r, c) => (r * 10 + c) / 40 > off });
  crew(ctx, t, { xs: [400, 760, 1120], face: () => ({ eyes: 'normal', mouth: 'flat' }) });
  label(ctx, 'SWITCHED OFF', 960, 120, 100, t, wt(41, 'switched') - .1, '#ffffff', wt(41, 'no') - .1); label(ctx, 'NO HEATERS', 960, 120, 110, t, wt(41, 'no') - .1, '#5fb6f0');
  chap(ctx, t, 41);
}, 'cut'));
// [42] the cabin gets close to freezing; water condenses on the walls
SHOTS.push(mk(42, 42, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); cabin(ctx, t, cam, { dark: .8, lights: () => false, cold: .3 + .7 * cue(t, wt(42, 'freezing') - .3, 1) });
  thermo(ctx, 1560, 820, 520, lerp(.5, .12, ease(cue(t, wt(42, 'close'), 1.5))));
  crew(ctx, t, { xs: [400, 760, 1120], arms: () => ({ L: [1.2, 2.4], R: [1.2, 2.4] }), face: () => ({ eyes: 'squint', mouth: 'teeth' }) });
  label(ctx, 'CLOSE TO FREEZING', 960, 120, 90, t, wt(42, 'close') - .1, '#5fb6f0', wt(42, 'water') - .1); label(ctx, 'WET WALLS', 960, 120, 100, t, wt(42, 'water') - .1, '#ffffff');
}));
// [43-44] barely sleep, drink very little. Haise gets a fever
SHOTS.push(mk(43, 44, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); cabin(ctx, t, cam, { dark: .85, lights: () => false, cold: .8 });
  const fev = t > wt(44, 'haise') - .1;
  crew(ctx, t, { xs: [400, 760, 1120], face: i => (fev && i === 1) ? { eyes: 'spiral', mouth: 'frown' } : { eyes: 'squint', mouth: 'flat' }, lean: .1 });
  if (!fev) { label(ctx, 'BARELY SLEEP', 960, 120, 90, t, wt(43, 'barely') - .1, '#ffffff', wt(43, 'drink') - .1); label(ctx, 'LITTLE WATER', 960, 120, 90, t, wt(43, 'drink') - .1, '#5fb6f0'); drop(ctx, 1540, 560, 160 * pop(t, wt(43, 'drink'))); }
  else { thermo(ctx, 1560, 800, 480, .92, '#e0392f'); label(ctx, 'HAISE: FEVER', 960, 120, 90, t, wt(44, 'haise') - .1, '#ff6a5a', wt(44, 'cold') - .1); label(ctx, 'COLD · EXHAUSTED', 960, 120, 90, t, wt(44, 'cold') - .1, '#ffffff'); }
}));
// [45] the trajectory drifts; fire the engine by hand, steering by the edge of the Earth
SHOTS.push(mk(45, 45, (ctx, lt, t) => {
  const hand = t > wt(45, 'to') - .1;
  const cam = camA(t, lt, { dz: .02, shake: hand ? 4 : 2 });
  if (!hand) { space(ctx, t, cam); earth(ctx, 300, 560, 150, t); const dr = clamp((t - S(45)) / 2); dotted(ctx, [1700, 560], [480, 560 - 200 * dr], 1, '#ff6a5a'); stack(ctx, 1600, 540, 200, t, { panel: 1, rot: Math.PI }); label(ctx, 'DRIFTING', 960, 140, 100, t, wt(45, 'drifting') - .3, '#ff6a5a'); }
  else { cabin(ctx, t, cam, { dark: .8, lights: () => false, cold: .5, wx: 1100, wy: 420, window: (x, y, r) => { earth(ctx, x, y + r * 1.6 + Math.sin(t * 2) * 10, r * 1.4, t); line(ctx, x - r, y, x + r, y, 4, '#ffd23a'); line(ctx, x, y - r, x, y + r, 4, '#ffd23a'); } }); astro(ctx, { x: 560, y: GY + 140, s: 640, arms: { L: [1.6, .6], R: [1.4, .4] }, face: { eyes: 'squint', mouth: 'teeth', look: [1, -1] } }); label(ctx, 'BY HAND', 560, 120, 100, t, wt(45, 'hand') - .2, '#ffd23a', wt(45, 'steering') - .1); label(ctx, 'AIM: EDGE OF EARTH', 960, 120, 84, t, wt(45, 'steering') - .1, '#ffffff'); }
}));
// [46] it works
SHOTS.push(mk(46, 46, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .03 }); mc(ctx, t, cam, { jump: 1, face: () => ({ eyes: 'happy', mouth: 'grin' }), arms: () => ({ L: [2.5, .3], R: [2.5, .3] }) });
  stamp(ctx, 960, 400, 'IT WORKS', cue(t, S(46) + .1, .2), '#2a8a4a', -.1);
}, 'cut'));
// ===================== 9. WAKING THE SHIP =====================
// [47-48] the CM has been frozen and dead for days; nobody has restarted one in flight; no checklist
SHOTS.push(mk(47, 48, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); const nl = t > S(48);
  if (!nl) { space(ctx, t, cam); earth(ctx, 300, 760, 260, t); stack(ctx, 1100, 460, 780, t, { panel: 1, cmLit: false }); for (let i = 0; i < 6; i++) { path(ctx, [[1080 + i * 22, 420 + 120], [1090 + i * 22, 420 + 170 + (i % 2) * 30], [1100 + i * 22, 420 + 120]]); ctx.fillStyle = '#cfe9ff'; ctx.fill(); } label(ctx, 'FROZEN & DEAD', 960, 140, 100, t, wt(47, 'frozen') - .1, '#5fb6f0'); }
  else { bgFlat(ctx, '#3a3f4a', '#1a1d24'); applyCam(ctx, cam, 1); clipboard(ctx, 960, 560, 640, ['', '', '', '']); text(ctx, '?', 960, 560, 260, '#c8c8d0', INK, 0); label(ctx, 'NEVER DONE IN FLIGHT', 960, 120, 84, t, wt(48, 'nobody') - .1, '#ffffff', wt(48, 'there') - .1); label(ctx, 'NO CHECKLIST', 960, 120, 100, t, wt(48, 'there') - .1, '#ff6a5a'); }
  chap(ctx, t, 47); if (!nl)
}, 'cut'));
// [49] Ken Mattingly works in a simulator for hours to wake the ship up
SHOTS.push(mk(49, 49, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); cabin(ctx, t, cam, { lights: (r, c) => ((r * 10 + c + Math.floor(t * 2)) % 7) > 2, window: (x, y, r) => { ctx.fillStyle = '#3a3d44'; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); text(ctx, 'SIMULATOR', x, y, 40, '#ffd23a', INK, 0); } });
  const m = astro(ctx, { x: 700, y: GY + 140, s: 640, arms: { L: [1.5, .5], R: [1.3, .3 + Math.sin(t * 6) * .3] }, face: { eyes: 'squint', mouth: 'flat' } });
  const hrs = Math.min(20, Math.floor((t - S(49)) * 1.6)); timer(ctx, 1460, 860, hrs + ' HRS');
  label(ctx, 'KEN MATTINGLY', 960, 120, 90, t, wt(49, 'ken') - .1, '#ffd23a', wt(49, 'works') - .1); label(ctx, 'LEFT BEHIND (MEASLES)', 960, 120, 70, t, wt(49, 'left') - .1, '#ffffff', wt(49, 'works') - .1); label(ctx, 'HOURS IN A SIMULATOR', 960, 120, 84, t, wt(49, 'works') - .1, '#ffffff', wt(49, 'figuring') - .1); label(ctx, 'BARELY ANY POWER', 960, 120, 84, t, wt(49, 'figuring') - .1, '#ff6a5a');
}));
// [50] his procedure works
SHOTS.push(mk(50, 50, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); bgFlat(ctx, '#3fa35b', '#25703a'); applyCam(ctx, cam, 1);
  clipboard(ctx, 700, 540, 640, ['POWER UP', 'BUS A', 'BUS B', 'GUIDANCE', 'RADIO'], 5);
  astro(ctx, { x: 1400, y: GY + 160, s: 620, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  stamp(ctx, 700, 300, 'IT WORKS', cue(t, wt(50, 'works') - .1, .2), '#2a8a4a', -.1);
}));
// [51] back into the command module; goodbye to the lifeboat
SHOTS.push(mk(51, 51, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); space(ctx, t, cam); earth(ctx, 260, 820, 300, t);
  const sep = ease(clamp((t - wt(51, 'goodbye') + .2) / 2.5));
  stack(ctx, 760 - sep * 120, 480, 760, t, { panel: 1, lm: false, noSM: true });
  ctx.save(); ctx.translate(sep * 620, -sep * 80); ctx.rotate(sep * .3); stack(ctx, 760, 480, 760, t, { panel: 1, noSM: true, cmHide: true }); ctx.restore();
  label(ctx, 'BACK IN THE CAPSULE', 960, 140, 84, t, wt(51, 'climbs') - .1, '#ffffff', wt(51, 'goodbye') - .1); label(ctx, 'GOODBYE, AQUARIUS', 960, 140, 100, t, wt(51, 'goodbye') - .1, '#ffd23a');
}));
// ===================== 10. SPLASHDOWN =====================
// [52] reentry: wrapped in fire, the radio goes silent
SHOTS.push(mk(52, 52, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02, shake: 8 }); applyCam(ctx, cam, .05); drawSky(ctx, '#0b1030', '#3a2a5a', -300, 1200); applyCam(ctx, cam, 1);
  capsule(ctx, 960, 480, 420, t, { fire: 1, rot: -.3 });
  if (t > wt(52, 'radio') - .1) { rrect(ctx, 1480, 250, 160, 110, 14); fillStroke(ctx, '#3a3d44', 7); circle(ctx, 1525, 305, 30); fillStroke(ctx, '#9aa0a8', 5); line(ctx, 1600, 250, 1630, 180, 6); cross(ctx, 1560, 300, 90, cue(t, wt(52, 'silent') - .1, .4)); }
  label(ctx, 'WRAPPED IN FIRE', 960, 120, 90, t, wt(52, 'wrapped') - .1, '#ffb12a', wt(52, 'radio') - .1); label(ctx, 'RADIO SILENCE', 960, 120, 100, t, wt(52, 'radio') - .1, '#ffffff');
  chap(ctx, t, 52);
}, 'cut'));
// [53-54] normally about four minutes. four minutes pass. nothing
SHOTS.push(mk(53, 54, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02, shake: 1 }); bgFlat(ctx, '#14161c', '#06070a'); applyCam(ctx, cam, 1);
  const el = clamp((t - S(53)) / (wt(54, 'pass') - S(53))) * 240 + Math.max(0, t - wt(54, 'pass')) * 12;
  const mm = Math.floor(el / 60), ss = Math.floor(el % 60);
  timer(ctx, 960, 520, mm + ':' + String(ss).padStart(2, '0'), el > 240 ? '#ff6a5a' : '#ffd23a');
  label(ctx, 'NORMAL: ~4 MINUTES', 960, 200, 80, t, wt(53, 'normally') - .1, '#ffffff', wt(54, 'four') - .1); label(ctx, '...NOTHING', 960, 820, 100, t, wt(54, 'nothing') - .1, '#ff6a5a');
}));
// [55] mission control is completely still
SHOTS.push(mk(55, 55, (ctx, lt, t) => {
  const cam = camA(t, lt, { z: 1.0, dz: .06, shake: 0 }); mc(ctx, t, cam, { track: .98, face: () => ({ eyes: 'wide', mouth: 'flat' }), arms: i => i % 2 ? { L: [1.2, 2.4], R: [1.2, 2.4] } : POSE.idle.arms });
  label(ctx, 'COMPLETELY STILL', 960, 300, 90, t, wt(55, 'completely') - .1, '#ffffff');
}, 'cut'));
// [56] then a voice: the parachutes are open
SHOTS.push(mk(56, 56, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02, y: 540 + lt * 15 }); blueSky(ctx, t, cam);
  const k = ease(cue(t, wt(56, 'parachutes') - .2, .8));
  capsule(ctx, 960, 840 + lt * 6, 200, t, { burnt: true }); parachutes(ctx, 960, 770 + lt * 6, 420, k, t);
  label(ctx, '"...A VOICE"', 960, 160, 90, t, wt(56, 'voice') - .2, '#ffffff', wt(56, 'parachutes') - .1); label(ctx, 'PARACHUTES OPEN!', 960, 160, 100, t, wt(56, 'parachutes') - .1, '#ffd23a');
}, 'cut'));
// [57] splashdown in the Pacific; Lovell, Haise and Swigert are home
SHOTS.push(mk(57, 57, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); blueSky(ctx, t, cam);
  const sp = cue(t, wt(57, 'splashes') - .2, .3), names = t > wt(57, 'jim') - .2;
  ocean(ctx, t, 760); carrier(ctx, 1550, 760, 600); heli(ctx, 1200 + Math.sin(t) * 30, 300, 260, t);
  capsule(ctx, 760, 760 - (1 - sp) * 500, 220, t, { burnt: true }); if (sp < 1) parachutes(ctx, 760, 680 - (1 - sp) * 500, 440, 1, t);
  if (sp > 0) for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + (i - 6) * .22, d = (t - wt(57, 'splashes')) * 360; if (d > 0 && d < 300) { circle(ctx, 760 + Math.cos(a) * d, 760 + Math.sin(a) * d * .7 + d * d * .004, 14); ctx.fillStyle = 'rgba(230,245,255,.9)'; ctx.fill(); } }
  label(ctx, 'PACIFIC OCEAN', 960, 140, 80, t, wt(57, 'pacific') - .1, '#ffffff', wt(57, 'jim') - .2); label(ctx, 'LOVELL · HAISE · SWIGERT', 960, 140, 80, t, wt(57, 'jim') - .2, '#ffd23a', wt(57, 'home') - .1); label(ctx, 'HOME.', 960, 140, 150, t, wt(57, 'home') - .1, '#ffffff');
}));
// ===================== 11. A SUCCESSFUL FAILURE =====================
// [58] never landed on the Moon; NASA calls it a successful failure
SHOTS.push(mk(58, 58, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); space(ctx, t, cam); moon(ctx, 560, 540, 280);
  stamp(ctx, 1260, 520, 'SUCCESSFUL FAILURE', cue(t, wt(58, 'successful') - .1, .2), '#2a8a4a', -.08);
  label(ctx, 'NEVER LANDED', 560, 140, 90, t, wt(58, 'never') - .1, '#ffffff'); label(ctx, 'NASA:', 1260, 300, 70, t, wt(58, 'nasa') - .1, '#ffd23a');
  chap(ctx, t, 58);
}, 'cut'));
// [59] "failure is not an option" was written for the movie
SHOTS.push(mk(59, 59, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#2a1a3a', '#140a20'); applyCam(ctx, cam, 1);
  text(ctx, '"FAILURE IS NOT AN OPTION"', 960, 300, 76, '#ffffff', INK, 16); text(ctx, '"FAILURE IS NOT AN OPTION"', 960, 300, 76, '#ffffff', INK, 0);
  const m = t > wt(59, 'written') - .2; if (m) clapper(ctx, 960, 680, 560, cue(t, wt(59, 'movie') - .1, .2));
  label(ctx, 'WRITTEN FOR THE MOVIE', 960, 940, 70, t, wt(59, 'written') - .1, '#ffd23a');
}));
// [60] what really happened was quieter: one problem at a time
SHOTS.push(mk(60, 60, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); mc(ctx, t, cam, { face: () => ({ eyes: 'normal', mouth: 'smile' }), front: () => clipboard(ctx, 1560, 520, 520, ['POWER', 'OXYGEN', 'CO₂ FILTER', 'COURSE', 'RESTART'], Math.floor(clamp((t - wt(60, 'solved')) / 2.5) * 5)) });
  label(ctx, 'NO PANIC', 760, 140, 90, t, wt(60, 'people') - .1, '#ffffff', wt(60, 'solved') - .1); label(ctx, 'ONE PROBLEM AT A TIME', 760, 140, 80, t, wt(60, 'solved') - .1, '#ffd23a');
}));
// [61] a tank of oxygen nearly killed them; a sock, duct tape and people who wouldn't quit brought them home
SHOTS.push(mk(61, 61, (ctx, lt, t) => {
  const cam = camA(t, lt, { dz: .02 }); bgFlat(ctx, '#2f5aa8', '#1a2f6a'); applyCam(ctx, cam, 1);
  const second = t > wt(61, 'a', 1) - .1;
  if (!second) { o2Tank(ctx, 960, 520, 240, t, { burnt: true }); label(ctx, 'NEARLY KILLED THEM', 960, 140, 90, t, wt(61, 'nearly') - .1, '#ff6a5a'); }
  else { sock(ctx, 520, 520, 260 * pop(t, wt(61, 'sock') - .1), .3); ductTape(ctx, 960, 520, 220 * pop(t, wt(61, 'duct') - .1)); if (t > wt(61, 'people') - .2) for (let i = 0; i < 3; i++) controller(ctx, { x: 1320 + i * 140, y: 760, s: 300, specs: i === 1, face: { eyes: 'happy', mouth: 'smile' } }); label(ctx, 'BROUGHT THEM HOME', 960, 140, 90, t, wt(61, 'brought') - .1, '#ffd23a'); }
  label(ctx, 'APOLLO 13 · APRIL 1970', 960, 960, 54, t, wt(61, 'home') + .2, '#ffffff');
}));
