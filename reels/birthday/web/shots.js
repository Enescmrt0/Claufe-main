// ---------- "The birthday bet" (the birthday paradox, portrait Short) ----------
// Shots are keyed to sentences of script.json; cues come from the word timings (web/words.js).
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const KIDS = kidSpots(990);
const pop = (t, at) => ease(cue(t, at, .25)) * (1 + .15 * Math.sin(clamp((t - at) / .25) * Math.PI));
function teacher(ctx, o) { const so = C({ cols: ['#2a4a7a', '#2a4a7a'], hat: 'none', belt: false }, o); drawStick(ctx, so); specs(ctx, so); return so; }
function classroom(ctx, t, cam) { bgRoom(ctx, t, cam, { wall: '#f2e2c4', floor: '#c89a62' }); applyCam(ctx, cam, 1); }

const SHOTS = [];
// [0] 23 strangers; better than even chance two share a birthday (match lights up at once)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); classroom(ctx, t, cam);
  const m = cue(t, wt(0, 'share') - .2, .3);
  drawKids(ctx, t, KIDS, { hi: i => MATCH.includes(i) ? m : 0 });
  if (m > 0) { for (const i of MATCH) { const p = KIDS[i]; cake(ctx, p.x, p.y - p.s * 1.2, 150 * m, t); } }
  label(ctx, '23', 540, 330, 220, t, .1, '#ffd23a', wt(0, 'better') - .1); label(ctx, '> 50%', 540, 330, 200, t, wt(0, 'better') - .1, '#ffffff');
  label(ctx, 'SAME BIRTHDAY', 540, 520, 70, t, wt(0, 'share') - .1, '#ffd23a');
} });
// [1] most think you'd need far more: 365 days vs 23 people
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgFlat(ctx, '#5a8ad8', '#2f5aa8'); applyCam(ctx, cam, 1);
  const fill = Math.round(23 * ease(cue(t, wt(1, 'twentythree') - .1, 1.2)));
  calendarGrid(ctx, 540, 640, 860, fill);
  drawStick(ctx, { cols: ['#f6f6f2', '#f6f6f2'], hat: 'none', belt: false, x: 540, y: 1720, s: 420, arms: { L: [.3, -.1], R: [2.4, 1.6] }, face: { eyes: 'squint', mouth: 'flat', look: [0, -1] } });
  if (t < wt(1, 'there')) qmark(ctx, 790, 1300, 160);
  label(ctx, 'FAR MORE?', 540, 260, 110, t, wt(1, 'far') - .1, '#ffffff', wt(1, 'three') - .1); label(ctx, '365 DAYS', 540, 260, 120, t, wt(1, 'three') - .1, '#ffffff', wt(1, 'twentythree') - .1); label(ctx, '23 = 3 WEEKS', 540, 260, 110, t, wt(1, 'twentythree') - .1, '#ffd23a');
} });
// [2] so try it as a bet
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); bgFlat(ctx, '#3fa35b', '#25703a'); applyCam(ctx, cam, 1);
  dollarBill(ctx, 540, 900, 700 * pop(t, wt(2, 'bet') - .3), Math.sin(t * 3) * .08);
  label(ctx, 'THE BET', 540, 380, 150, t, wt(2, 'bet') - .2, '#ffd23a');
} });
// [3] a teacher walks into a class of 23: five dollars says two of you share a birthday
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); classroom(ctx, t, cam);
  const say = t > wt(3, 'five') - .2;
  chalkboard(ctx, 540, 420, 760, 300, say ? ['$5 SAYS', '2 OF YOU', 'SHARE A BIRTHDAY'] : ['CLASS OF 23']);
  drawKids(ctx, t, KIDS.slice(5), {});
  const wx = lerp(-150, 880, ease(clamp((t - S(3)) / 1.4)));
  teacher(ctx, { x: wx, y: 1060, s: 520, flip: -1, arms: say ? { L: [.3, -.1], R: [2.4, .3] } : POSE.idle.arms, face: { eyes: 'happy', mouth: say ? 'smirk' : 'smile' } });
  if (say) dollarBill(ctx, wx - 190, 640, 190 * pop(t, wt(3, 'five')), -.3);
  label(ctx, 'TEACHER', 540, 200, 80, t, wt(3, 'teacher') - .1, '#ffffff', wt(3, 'five') - .2);
} });
// [4] the class laughs. easy money
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.05, dz: .04, shake: 5 }); classroom(ctx, t, cam);
  drawKids(ctx, t, KIDS, { laugh: true, face: i => ({ eyes: 'happy', mouth: 'teeth' }), arms: i => i % 2 ? { L: [.6, -2], R: [.6, -2] } : { L: [2.4, .3], R: [.3, -.1] } });
  label(ctx, 'HA HA HA', 540, 330, 130, t, wt(4, 'laughs') - .1, '#ffffff'); label(ctx, 'EASY MONEY', 540, 500, 110, t, wt(4, 'easy') - .1, '#8fd18a');
} });
// [5] they go around the room, one by one
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); classroom(ctx, t, cam);
  const k = Math.floor((t - S(5)) / ((S(6) - S(5)) / 14));
  drawKids(ctx, t, KIDS, { hi: i => (i === k ? 1 : 0) });
  for (let i = 0; i < Math.min(k + 1, 14); i++) { const p = KIDS[i]; if (MATCH[1] === i) continue; dateTag(ctx, p.x, p.y - p.s * 1.25, BDAYS[i], i === k ? pop(t, S(5) + i * (S(6) - S(5)) / 14) : .8); }
  label(ctx, 'ONE BY ONE', 540, 300, 110, t, wt(5, 'one') - .1, '#ffffff');
} });
// [6] about half the time, the teacher wins
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); classroom(ctx, t, cam);
  const m = cue(t, wt(6, 'teacher') - .2, .3);
  drawKids(ctx, t, KIDS, { hi: i => MATCH.includes(i) ? 1 : 0, face: i => MATCH.includes(i) ? { eyes: 'wide', mouth: 'o' } : { eyes: m > 0 ? 'wide' : 'normal', mouth: m > 0 ? 'frown' : 'smile' } });
  for (const i of MATCH) { const p = KIDS[i]; dateTag(ctx, p.x, p.y - p.s * 1.25, BDAYS[i], pop(t, S(6)), '#ffd23a'); }
  label(ctx, '~HALF THE TIME', 540, 300, 100, t, wt(6, 'half') - .1, '#ffffff'); if (m > 0) stamp(ctx, 540, 520, 'TEACHER WINS', m, '#e0392f', -.08);
} });
// [7] not someone who matches YOU, but ANY pair anywhere
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgFlat(ctx, '#2a2f4a', '#161a2e'); applyCam(ctx, cam, 1);
  const any = t > wt(7, 'any') - .2;
  const k = any ? Math.round(253 * ease(clamp((t - wt(7, 'any') + .2) / 2.2))) : Math.round(22 * clamp((t - wt(7, 'matches')) / 1));
  pairWeb(ctx, 540, 1000, 400, 23, k, null, any ? -1 : 0);
  label(ctx, 'NOT JUST YOU', 540, 300, 100, t, wt(7, 'not') - .1, '#ffffff', wt(7, 'any') - .2); label(ctx, 'ANY PAIR', 540, 300, 130, t, wt(7, 'any') - .1, '#ffd23a');
  if (!any) label(ctx, 'YOU', 540, 520, 60, t, wt(7, 'you') - .1, '#ffd23a');
} });
// [8] with 23 people there are 253 different pairs (counter)
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02 }); bgFlat(ctx, '#2a2f4a', '#161a2e'); applyCam(ctx, cam, 1);
  const k = Math.round(253 * ease(clamp((t - S(8)) / Math.max(.5, wt(8, 'two') - S(8) + .6))));
  pairWeb(ctx, 540, 1080, 380, 23, 253);
  text(ctx, String(k), 540, 330, 220, '#ffd23a', INK, 24); text(ctx, String(k), 540, 330, 220, '#ffd23a', INK, 0);
  label(ctx, 'PAIRS', 540, 500, 90, t, S(8) + .1, '#ffffff');
} });
// [9] 253 chances for a match
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); bgFlat(ctx, '#ffcf3a', '#f0a020'); applyCam(ctx, cam, 1);
  const R = rng(9); for (let i = 0; i < 60; i++) { const x = R() * 1080, y = 640 + R() * 1100, d = cue(t, S(9) + i * .03, .2); if (d > 0) dateTag(ctx, x, y, 'MATCH?', d * .9, i % 7 === 3 ? '#8fd18a' : '#ffffff'); }
  label(ctx, '253 CHANCES', 540, 330, 120, t, wt(9, 'two') - .1, '#ffffff');
} });
// [10] 30 people ~70%, 50 people almost certain
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .015 }); bgFlat(ctx, '#2a2f4a', '#161a2e'); applyCam(ctx, cam, 1);
  const a = ease(cue(t, S(10), .4)), b = ease(cue(t, wt(10, 'seventy') - .3, .6)), c = ease(cue(t, wt(10, 'fifty') - .2, .6));
  oddsBar(ctx, 120, 1500, 230, 900, .507 * a, '#ffd23a', '23', '50%');
  if (b > 0) oddsBar(ctx, 425, 1500, 230, 900, .706 * b, '#ff9a3a', '30', '70%');
  if (c > 0) oddsBar(ctx, 730, 1500, 230, 900, .97 * c, '#e0392f', '50', '97%');
  label(ctx, 'PEOPLE IN THE ROOM', 540, 1680, 50, t, S(10), '#c8c8d0'); label(ctx, 'ALMOST CERTAIN', 540, 300, 100, t, wt(10, 'certain') - .2, '#ffffff');
} });
// [11] next time you're in a room with 23 people, you can make the bet
SHOTS.push({ start: S(11), end: S(12), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .025 }); bgRoom(ctx, t, cam, { wall: '#3a3f6a', floor: '#6a4a8a' }); applyCam(ctx, cam, 1);
  drawKids(ctx, t, KIDS.slice(5), { face: () => ({ eyes: 'happy', mouth: 'smile' }) });
  drawStick(ctx, { cols: ['#f6f6f2', '#f6f6f2'], hat: 'none', belt: false, x: 540, y: 1820, s: 560, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'smirk' } });
  if (t > wt(11, 'bet') - .3) dollarBill(ctx, 760, 1130, 220 * pop(t, wt(11, 'bet') - .3), -.3);
  label(ctx, 'MAKE THE BET', 540, 300, 110, t, wt(11, 'make') - .1, '#ffd23a');
} });
// [12] still a coin flip
SHOTS.push({ start: S(12), end: S(13), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgFlat(ctx, '#5a8ad8', '#2f5aa8'); applyCam(ctx, cam, 1);
  const u = clamp((t - S(12)) / (S(13) - S(12)));
  coin(ctx, 540, 1000 - Math.sin(u * Math.PI) * 420, 170, t * 14, 'H');
  label(ctx, 'STILL A', 540, 300, 100, t, wt(12, 'still') - .1, '#ffffff'); label(ctx, 'COIN FLIP', 540, 430, 130, t, wt(12, 'coin') - .1, '#ffd23a');
} });
// [13] half the time you're the one paying five dollars
SHOTS.push({ start: S(13), end: S(14), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); classroom(ctx, t, cam);
  drawKids(ctx, t, KIDS.slice(5), { laugh: t > wt(13, 'paying') - .2, face: () => ({ eyes: 'happy', mouth: 'grin' }) });
  drawStick(ctx, { cols: ['#f6f6f2', '#f6f6f2'], hat: 'none', belt: false, x: 380, y: 1820, s: 560, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'squint', mouth: 'frown' } });
  const fly = ease(clamp((t - wt(13, 'paying')) / .8)); dollarBill(ctx, lerp(620, 900, fly), lerp(1300, 900, fly), 200, fly * 2);
  label(ctx, 'HALF THE TIME...', 540, 300, 90, t, S(13) + .05, '#ffffff', wt(13, 'paying') - .1); label(ctx, '-$5', 540, 300, 160, t, wt(13, 'paying') - .1, '#e0392f');
} });
