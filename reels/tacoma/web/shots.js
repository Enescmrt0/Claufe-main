// ---------- "The bridge that danced itself apart" (Tacoma Narrows Bridge, 1940, portrait Short) ----------
// Shots are keyed to sentences of script.json; cues come from the word timings (web/words.js).
// Tubby the dog is the one life lost: he is remembered with a paw print, never shown in the fall.
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const DECK = 860;
const bounce = (t, amp) => (x) => Math.sin(x * .012 - t * 4) * amp * Math.sin(clamp((x - 140) / 800) * Math.PI);
const twistF = (t, amp) => (x) => Math.sin(t * 3.2) * amp * Math.cos((x - 540) * .005);
function engineer(ctx, o) { const so = C({ cols: ['#f6f6f2', '#f6f6f2'], hat: 'none', belt: false }, o); drawStick(ctx, so); specs(ctx, so); return so; }
function scene(ctx, t, cam, o = {}) { pugetSky(ctx, t, cam, o); applyCam(ctx, cam, 1); narrowsWater(ctx, t); cliffs(ctx); }

const SHOTS = [];
// [0] a brand-new bridge bounced so much people drove across it for fun (bouncing from frame 1)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); scene(ctx, t, cam);
  const deckAt = suspBridge(ctx, -100, 1180, DECK, bounce(t, 40));
  for (let i = 0; i < 3; i++) { const x = ((i * 380 + t * 160) % 1400) - 200; oldCar(ctx, x, deckAt(x) + 4, 150, ['#c8322c', '#2a5a8a', '#3a7a3a'][i], Math.cos(x * .012 - t * 4) * .2); }
  label(ctx, 'WHEEE!', 760, 560, 80, t, .4, '#ffd23a'); label(ctx, 'FOR FUN', 540, 260, 110, t, wt(0, 'fun') - .2, '#ffffff');
} });
// [1a] 1940: the Tacoma Narrows Bridge opens
SHOTS.push({ start: S(1), end: wt(1, 'it') - .05, tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); scene(ctx, t, cam);
  suspBridge(ctx, -100, 1180, DECK, bounce(t, 6));
  const cut = cue(t, wt(1, 'opened') - .1, .3);
  for (let i = 0; i < 5; i++) { const j = cut > 0 ? Math.abs(Math.sin(t * 6 + i)) * 14 : 0; drawStick(ctx, { cols: [PAL.red, PAL.blue, PAL.green, PAL.yellow, PAL.purple][i], hat: 'none', belt: false, x: 180 + i * 180, y: DECK - 18 - j, s: 220, arms: cut > 0 ? { L: [2.5, .3], R: [2.5, .3] } : POSE.idle.arms, face: { eyes: 'happy', mouth: 'grin' } }); }
  if (cut < 1) { line(ctx, 100, DECK - 120, 980 - cut * 400, DECK - 120, 10, '#e0392f'); }
  chapterTag(ctx, t, S(1) + .1, 'JULY 1940'); label(ctx, 'TACOMA NARROWS BRIDGE', 540, 260, 68, t, wt(1, 'tacoma') - .1, '#ffd23a'); label(ctx, 'WASHINGTON STATE', 540, 360, 56, t, wt(1, 'washington'), '#ffffff');
} });
// [1b] one of the longest, and one of the skinniest
SHOTS.push({ start: wt(1, 'it') - .05, end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .01 }); scene(ctx, t, cam);
  suspBridge(ctx, -100, 1180, DECK, bounce(t, 6));
  const l = cue(t, wt(1, 'longest') - .2, .4); if (l > 0) { ctx.globalAlpha = l; line(ctx, 60, DECK + 120, 1020, DECK + 120, 8, '#ffd23a'); for (const x of [60, 1020]) line(ctx, x, DECK + 96, x, DECK + 144, 8, '#ffd23a'); ctx.globalAlpha = 1; label(ctx, 'LONG', 540, DECK + 200, 70, t, wt(1, 'longest'), '#ffd23a'); }
  const s = cue(t, wt(1, 'skinniest') - .2, .4); if (s > 0) { ctx.save(); ctx.globalAlpha = s; rrect(ctx, 200, 1300, 680, 200, 20); ctx.fillStyle = 'rgba(10,20,40,.75)'; ctx.fill(); ctx.fillStyle = '#8a9aa8'; ctx.fillRect(240, 1390, 600, 22); text(ctx, "ONLY 2 LANES", 540, 1350, 54, '#ffffff', INK, 0); ctx.restore(); label(ctx, 'SKINNY', 540, 260, 110, t, wt(1, 'skinniest'), '#ff6a5a'); }
} });
// [2] from day one it moved, even in a light breeze
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); scene(ctx, t, cam); windLines(ctx, t, .5, 300, 760);
  suspBridge(ctx, -100, 1180, DECK, bounce(t, 30));
  label(ctx, 'LIGHT BREEZE', 540, 260, 90, t, wt(2, 'light') - .2, '#ffffff', wt(2, 'road')); label(ctx, 'UP... DOWN...', 540, 260, 90, t, wt(2, 'rose') - .1, '#ffd23a');
} });
// [3] Galloping Gertie: people lined up to ride it
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); scene(ctx, t, cam);
  const deckAt = suspBridge(ctx, -100, 1180, DECK, bounce(t, 50));
  for (let i = 0; i < 4; i++) { const x = 120 + i * 230; oldCar(ctx, x, deckAt(x) + 4, 150, ['#c8322c', '#2a5a8a', '#3a7a3a', '#d9a83a'][i], Math.cos(x * .012 - t * 4) * .25); }
  label(ctx, 'GALLOPING', 540, 240, 110, t, wt(3, 'galloping') - .1, '#ffd23a'); label(ctx, 'GERTIE', 540, 370, 130, t, wt(3, 'gertie') - .1, '#ffffff');
} });
// [4] everyone was sure it was safe
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .04 }); bgFlat(ctx, '#3fa35b', '#25703a'); applyCam(ctx, cam, 1);
  engineer(ctx, { x: 540, y: 1560, s: 820, arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'grin' } });
  stamp(ctx, 540, 420, 'SAFE', cue(t, wt(4, 'safe') - .1, .2), '#ffffff', -.1);
} });
// [5] four months later, a windy November morning: the bouncing changed
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015, shake: 5 }); scene(ctx, t, cam, { top: '#7a8a9a', bot: '#c8d0d8', wind: 60 }); windLines(ctx, t, 1.4, 260, 800);
  const ch = cue(t, wt(5, 'changed') - .3, .6);
  suspBridge(ctx, -100, 1180, DECK, bounce(t, 40 * (1 - ch)), twistF(t, ch * .9));
  chapterTag(ctx, t, S(5) + .1, 'NOVEMBER 7, 1940'); label(ctx, 'WINDY', 540, 260, 110, t, wt(5, 'windy') - .1, '#ffffff', wt(5, 'changed')); label(ctx, 'SOMETHING CHANGED', 540, 260, 80, t, wt(5, 'changed') - .1, '#ff6a5a');
} });
// [6] the road started to twist: one side up, the other side down (seen end-on)
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: 6 }); pugetSky(ctx, t, cam, { top: '#7a8a9a', bot: '#c8d0d8', wind: 60 }); applyCam(ctx, cam, 1); narrowsWater(ctx, t); windLines(ctx, t, 1.4, 260, 900);
  const a = Math.sin(t * 3.2) * .45 * cue(t, wt(6, 'twist') - .4, .6);
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.rect(540 + sx * 380 - 24, 300, 48, WL - 280); fillStroke(ctx, '#6a7a8a', 7); line(ctx, 540 + sx * 380, 320, 540 + sx * 300 * Math.cos(a), 760 + sx * 300 * Math.sin(a), 6); }
  ctx.save(); ctx.translate(540, 760); ctx.rotate(a); ctx.beginPath(); ctx.rect(-320, -28, 640, 56); fillStroke(ctx, '#8a9aa8', 8); oldCar(ctx, -60, -28, 180, '#2a2a30', 0, true); ctx.restore();
  label(ctx, 'TWIST', 540, 240, 130, t, wt(6, 'twist') - .1, '#ff6a5a'); label(ctx, 'UP', 200, 520, 80, t, wt(6, 'up') - .1, '#ffffff'); label(ctx, 'DOWN', 880, 520, 80, t, wt(6, 'down') - .1, '#ffffff');
} });
// [7] Coatsworth leaves his car (with Tubby) and crawls back on hands and knees
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .015, shake: 6 }); pugetSky(ctx, t, cam, { top: '#7a8a9a', bot: '#c8d0d8', wind: 60 }); applyCam(ctx, cam, 1); windLines(ctx, t, 1.2, 260, 700);
  const tilt = Math.sin(t * 3.2) * .12;
  ctx.save(); ctx.translate(540, 1160); ctx.rotate(tilt);
  ctx.beginPath(); ctx.rect(-900, 0, 1800, 120); fillStroke(ctx, '#8a9aa8', 8); for (let i = -8; i < 9; i++) line(ctx, i * 110, 30, i * 110 + 50, 30, 8, '#f4efe4');
  oldCar(ctx, 220, 0, 380, '#2a2a30', 0, true);
  const left = t > wt(7, 'left') - .2, k = clamp((t - wt(7, 'crawled')) / 3);
  if (!left) drawStick(ctx, { cols: ['#3a3a44', '#3a3a44'], hat: 'none', belt: false, x: 60, y: 0, s: 420, arms: POSE.idle.arms, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  else { const cr = Math.sin(t * 8) * .3; drawStick(ctx, { cols: ['#3a3a44', '#3a3a44'], hat: 'none', belt: false, x: lerp(40, -520, k), y: -10, s: 380, flip: -1, lean: 1.2, arms: { L: [1.4 + cr, .2], R: [1.4 - cr, .2] }, legs: { L: [1.3 + cr, -1.4], R: [1.3 - cr, -1.4] }, face: { eyes: 'squint', mouth: 'teeth' } }); }
  ctx.restore();
  label(ctx, 'LEONARD COATSWORTH', 540, 250, 64, t, wt(7, 'leonard') - .1, '#ffffff', wt(7, 'dog')); label(ctx, 'AND TUBBY', 540, 250, 90, t, wt(7, 'dog') - .1, '#ffd23a', wt(7, 'crawled')); label(ctx, 'HANDS & KNEES', 540, 250, 84, t, wt(7, 'crawled') - .1, '#ff6a5a');
} });
// [8] less than an hour later, the middle fell into the water
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const f = ease(cue(t, wt(8, 'fell') - .4, 1.4));
  const cam = camA(t, lt, { z: 1.0, dz: .01, shake: 4 + (f > 0 && f < 1 ? 12 : 0) }); scene(ctx, t, cam, { top: '#7a8a9a', bot: '#c8d0d8', wind: 60 });
  suspBridge(ctx, -100, 1180, DECK, (x) => bounce(t, 20)(x), twistF(t, .6 * (1 - f)), { gap: f > 0 ? [300, 780] : null });
  if (f > 0) { ctx.save(); ctx.translate(540, DECK + f * (WL - DECK + 60)); ctx.rotate(f * .4); ctx.beginPath(); ctx.rect(-240, -20, 480, 40); fillStroke(ctx, '#8a9aa8', 7); ctx.restore(); if (f > .8) { for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + (i - 6) * .2, d = (t - wt(8, 'fell') - .6) * 500; circle(ctx, 540 + Math.cos(a) * d, WL + Math.sin(a) * d * .8 + d * d * .002, 16); ctx.fillStyle = 'rgba(220,240,255,.85)'; ctx.fill(); } } }
  narrowsWater(ctx, t, {}); ctx.globalAlpha = 0; ctx.globalAlpha = 1;
  label(ctx, '< 1 HOUR LATER', 540, 250, 84, t, wt(8, 'less') - .1, '#ffffff', wt(8, 'fell'));
} });
// [9] Tubby was the only life lost (a gentle remembrance)
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .015, shake: 1 }); bgFlat(ctx, '#2a2f3a', '#14171e'); applyCam(ctx, cam, 1);
  rrect(ctx, 290, 520, 500, 500, 30); fillStroke(ctx, '#3a3f4a', 10); blackDog(ctx, 520, 860, 260);
  pawPrint(ctx, 540, 1150, 90, '#e6e6ea');
  label(ctx, 'TUBBY', 540, 330, 120, t, wt(9, 'tubby') - .1, '#ffffff'); label(ctx, 'THE ONLY LIFE LOST', 540, 450, 60, t, wt(9, 'only') - .1, '#c8c8d0');
} });
// [10] the wind wasn't even a storm: about 40 mph
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .02 }); bgFlat(ctx, '#7a8a9a', '#4a5a6a'); applyCam(ctx, cam, 1); windLines(ctx, t, .9, 300, 1300);
  drawGauge(ctx, 540, 800, 260, .38 + Math.sin(t * 4) * .02, 'MPH');
  label(ctx, 'NOT A STORM', 540, 260, 110, t, wt(10, 'storm') - .2, '#ffffff'); label(ctx, '~40 MPH', 540, 1220, 110, t, wt(10, 'forty') - .1, '#ffd23a');
} });
// [11] flat solid sides caught the wind like a wing; every twist made the next one bigger
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .015 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  const grow = clamp((t - wt(11, 'every')) / 2.5), wing = t < wt(11, 'wing') + .6;
  const amp = wing ? .08 : .1 + grow * .55, a = Math.sin(t * 4.2) * amp;
  for (let i = 0; i < 9; i++) { const y = 520 + i * 70, x = ((i * 190 + t * 900) % 1300) - 200; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 120, y + (y < 780 ? -40 : 40) * Math.sin(a * 3 + 1), x + 240, y); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(160,210,255,.8)'; ctx.stroke(); }
  wingSection(ctx, 540, 820, 640, a, !wing);
  if (wing) label(ctx, 'LIKE A WING', 540, 260, 100, t, wt(11, 'wing') - .3, '#ffd23a');
  else { label(ctx, 'BIGGER', 540, 260, 110, t, wt(11, 'bigger') - .5, '#ff6a5a'); text(ctx, '↻', 540, 1160, 140, '#ffd23a', INK, 0); }
  label(ctx, 'FLAT, SOLID SIDES', 540, 400, 60, t, wt(11, 'flat') - .1, '#ffffff', wt(11, 'wing') + .6);
} });
// [12] today, bridges are tested in wind tunnels first. thanks to Gertie
SHOTS.push({ start: S(12), end: S(13), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  windTunnel(ctx, 540, 760, 900, 420, t); ctx.save(); ctx.translate(600, 760); ctx.scale(.25, .25); suspBridge(ctx, -900, 900, 0, () => 0); ctx.restore();
  engineer(ctx, { x: 860, y: GY + 380, s: 440, flip: -1, arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'smile' } });
  label(ctx, 'WIND TUNNEL', 540, 260, 100, t, wt(12, 'wind') - .1, '#ffffff', wt(12, 'thanks')); label(ctx, 'THANKS, GERTIE', 540, 260, 100, t, wt(12, 'thanks') - .2, '#ffd23a');
} });
