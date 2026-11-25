// ---------- "Why we say hello" (portrait Short) ----------
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const G = 1240;
const SHOTS = [];
// [0] if Bell had his way you'd answer the phone saying "ahoy!"
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#2f7de0', '#1a4a9a'); applyCam(ctx, cam, 1);
  oldPhone(ctx, 760, 1150, 420, { ring: t < wt(0, 'ahoy') - .3, t, lift: t > wt(0, 'answer') - .2 ? 1 : 0 });
  drawStick(ctx, { cols: PAL.red, hat: 'none', belt: false, x: 300, y: G + 160, s: 620, arms: { L: [.3, -.1], R: { ik: [.42, -.7] } }, face: { eyes: 'happy', mouth: 'grin', look: [1, 0] } });
  if (t > wt(0, 'ahoy') - .2) speech(ctx, 400, 520, 520, 200, 'AHOY!', 120, -1);
  label(ctx, 'ANSWER THE PHONE...', 540, 240, 80, t, .1, '#ffffff', wt(0, 'ahoy') - .2);
} });
// [1] 1876: the phone was invented, but no word for picking it up
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#7a5a3a' }); applyCam(ctx, cam, 1);
  oldPhone(ctx, 540, 1020, 480, { ring: true, t }); qmark(ctx, 850, 560, 150, '#ffd23a');
  chapterTag(ctx, t, S(1) + .05, '1876'); label(ctx, 'NO WORD FOR IT', 540, 250, 104, t, wt(1, 'word') - .3, '#ffffff');
} });
// [2] people weren't sure what to say; some asked "are you there?"
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgRoom(ctx, t, cam, { wall: '#b8c8d0', floor: '#7a5a3a' }); applyCam(ctx, cam, 1);
  oldPhone(ctx, 800, 1150, 380, { lift: 1 }); drawStick(ctx, { cols: PAL.purple, hat: 'none', belt: false, x: 340, y: G + 160, s: 600, arms: { L: [.3, -.1], R: { ik: [.42, -.7] } }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } });
  if (t > wt(2, 'are') - .2) speech(ctx, 520, 540, 640, 180, 'ARE YOU THERE?', 72, -1); else qmark(ctx, 540, 560, 120, '#ffffff');
  label(ctx, 'WHAT DO I SAY?', 540, 240, 100, t, S(2) + .05, '#ffd23a', wt(2, 'are') - .2);
} });
// [3] Bell wanted "ahoy", like sailors calling between ships
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const sea = t > wt(3, 'sailors') - .3;
  if (!sea) { bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1); bell_(ctx, { x: 420, y: G + 160, s: 680, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); speech(ctx, 700, 560, 440, 180, 'AHOY!', 110, -1); label(ctx, 'ALEXANDER GRAHAM BELL', 540, 240, 70, t, wt(3, 'bell') - .2, '#ffffff'); }
  else { bgDay(ctx, t, cam, { top: '#5ab0e8', bot: '#e8f4f8' }); applyCam(ctx, cam, 1); ctx.fillStyle = '#2a7ab8'; ctx.fillRect(-500, GY + 100, 2100, 1200); sailBoat(ctx, 220, GY + 140, 360, t); sailBoat(ctx, 860, GY + 160, 320, t + 1); speech(ctx, 300, 560, 360, 150, 'AHOY!', 90, 1); speech(ctx, 800, 660, 360, 150, 'AHOY!', 90, -1); label(ctx, 'LIKE SAILORS', 540, 240, 110, t, wt(3, 'sailors') - .3, '#ffffff'); }
} });
// [4] his rival Edison suggested something else: hello
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  edison(ctx, { x: 400, y: G + 160, s: 680, arms: { L: [.3, -.1], R: [2.6, .2] }, face: { eyes: 'happy', mouth: 'smug' } }); drawBulb(ctx, 160, 600, 90, 1);
  if (t > wt(4, 'hello') - .2) speech(ctx, 720, 620, 460, 190, 'HELLO!', 110, -1, '#fff6c8');
  label(ctx, 'THOMAS EDISON', 540, 240, 100, t, wt(4, 'thomas') - .2, '#ffffff');
} });
// [5] back then hello meant "hey, look over here!"
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgDay(ctx, t, cam); applyCam(ctx, cam, 1);
  drawStick(ctx, { cols: PAL.green, hat: 'none', belt: false, x: 260, y: G + 160, s: 560, arms: { L: [.3, -.1], R: [2.6, .3] }, face: { eyes: 'wide', mouth: 'o' } }); drawStick(ctx, { cols: PAL.blue, hat: 'none', belt: false, x: 860, y: G + 160, s: 520, flip: -1, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'flat', look: [-1, 0] } });
  if (t > wt(5, 'hey') - .2) speech(ctx, 440, 560, 560, 180, 'HEY! OVER HERE!', 64, -1);
  label(ctx, 'NOT A GREETING', 540, 240, 100, t, wt(5, 'barely') - .2, '#ffffff', wt(5, 'hey') - .2);
} });
// [6] Edison's word won and spread with the telephone
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); bgFlat(ctx, '#3a8ad8', '#1f5aa0'); applyCam(ctx, cam, 1);
  const n = Math.floor(clamp((t - S(6)) / 1.6) * 12); for (let i = 0; i < n; i++) { const x = 140 + (i % 4) * 270, y = 640 + Math.floor(i / 4) * 260; oldPhone(ctx, x, y + 120, 160); text(ctx, 'HELLO!', x, y - 80, 40, '#ffd23a', INK, 0); }
  label(ctx, 'HELLO WON', 540, 240, 130, t, wt(6, 'won') - .2, '#ffd23a');
} });
// [7] phone operators were nicknamed "hello girls"
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgRoom(ctx, t, cam, { wall: '#d8d0bc', floor: '#6a5a4a' }); applyCam(ctx, cam, 1);
  switchboard(ctx, 540, 1060, 900, 460, t); for (let i = 0; i < 3; i++) { const so = { cols: ['#2a2a44', '#ffffff'], hat: 'none', belt: false, x: 260 + i * 280, y: G + 200, s: 420, arms: { L: { ik: [-.2, -.6] }, R: { ik: [.25, -.65] } }, face: { eyes: 'happy', mouth: 'smile', look: [0, -1] } }; drawStick(ctx, so); headphones(ctx, so); }
  label(ctx, '"HELLO GIRLS"', 540, 240, 120, t, wt(7, 'hello') - .2, '#ffd23a');
} });
// [8] and Bell kept answering with "ahoy" for the rest of his life
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgFlat(ctx, '#2a3f5f', '#1a2840'); applyCam(ctx, cam, 1);
  oldPhone(ctx, 800, 1150, 380, { lift: 1 }); bell_(ctx, { x: 360, y: G + 160, s: 660, arms: { L: [.3, -.1], R: { ik: [.42, -.7] } }, face: { eyes: 'squint', mouth: 'smug', look: [1, 0] } });
  if (t > wt(8, 'ahoy') - .2) speech(ctx, 540, 560, 420, 170, 'AHOY!', 110, -1);
  label(ctx, 'STUBBORN', 540, 240, 120, t, wt(8, 'kept') - .2, '#ffd23a');
} });
