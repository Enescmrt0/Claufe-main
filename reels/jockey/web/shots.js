const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 3) => shake(t * .35, a, 1, 2);
const LN = []; WORDS.forEach(w => { const m = LN[w.line] || (LN[w.line] = { s: w.s, e: w.e }); m.e = w.e; });
const NL = LN.length;
const S = i => i <= 0 ? 0 : i >= NL ? LN[NL - 1].e + 0.9 : LN[i].s - .08;
const norm = w => w.toLowerCase().replace(/[^a-z0-9%]/g, '');
const wt = (line, word, nth = 0) => { const ws = WORDS.filter(w => w.line === line && norm(w.w).startsWith(word)); return ws.length ? ws[Math.min(nth, ws.length - 1)].s : LN[line].s; };
const cue = (t, at, d = .2) => clamp((t - at) / d);
const camA = (t, lt, o = {}) => { const hh = handheld(t, o.shake == null ? 3 : o.shake); return { x: (o.x || 540) + hh[0], y: (o.y || 960) + hh[1], z: (o.z || 1.02) + (o.dz == null ? .012 : o.dz) * lt, r: o.r || 0 }; };
const SHOTS = [];
const owner = (ctx, o) => { const so = Object.assign({ cols: ['#3a3a4a', '#3a3a4a'], hat: 'none', belt: false }, o); drawStick(ctx, so); bowler(ctx, so); moustache(ctx, so); return so; };
// [0] 1923: a jockey won while already dead
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 4 }); trackBG(ctx, t, cam, { cheer: true }); applyCam(ctx, cam, 1); const dead = t > wt(0, 'already') - .1;
  racehorse(ctx, 520, 1320, 700, t, { num: '7', rider: riderFn({ slump: dead ? 1 : 0 }) });
  chapterTag(ctx, t, .05, '1923'); label(ctx, 'JOCKEY WINS', 540, 260, 130, t, wt(0, 'jockey') - .2, '#ffffff', wt(0, 'already') - .1); label(ctx, '...WHILE DEAD', 540, 260, 140, t, wt(0, 'already') - .1, '#e0392f');
} });
// [1] Frank Hayes, 22, stable hand, never won
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); stableIn(ctx, t, cam); applyCam(ctx, cam, 1); const fo = { x: 380, y: G + 220, s: 700, cols: ['#8a6a4a', '#8a6a4a'], hat: 'none', belt: true, arms: { L: [.3, -.1], R: { ik: [.35, -.35] } }, face: { eyes: 'normal', mouth: t > wt(1, 'he', 0) - .1 ? 'frown' : 'smile' } }; drawStick(ctx, fo); flatCap(ctx, fo, '#5a4a3a'); pitchfork(ctx, 560, G + 180, 620, .15);
  label(ctx, 'FRANK HAYES', 540, 260, 130, t, wt(1, 'frank') - .2, '#ffffff', wt(1, '22') - .1); label(ctx, '22, STABLE HAND', 540, 260, 108, t, wt(1, '22') - .1, '#ffd23a', wt(1, 'never') - .1); label(ctx, 'WINS: 0', 540, 260, 150, t, wt(1, 'never') - .1, '#e0392f');
} });
// [2] big chance: Sweet Kiss at Belmont Park
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); trackBG(ctx, t, cam, { speed: 0 }); applyCam(ctx, cam, 1);
  racehorse(ctx, 640, 1300, 720, t, { gallop: 0, num: '7' }); silksMan(ctx, { x: 240, y: G + 220, s: 620, arms: { L: [2.6, .3], R: [2.6, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); if (t > wt(2, 'sweet') - .2) { for (let i = 0; i < 3; i++) drawHeart(ctx, 800 + i * 50, 620 - ((t * 60 + i * 40) % 120), 30); }
  label(ctx, 'BIG CHANCE', 540, 260, 140, t, wt(2, 'big') - .2, '#ffffff', wt(2, 'sweet') - .1); label(ctx, 'SWEET KISS', 540, 260, 140, t, wt(2, 'sweet') - .1, '#ff8ab0', wt(2, 'belmont') - .1); label(ctx, 'BELMONT PARK, NY', 540, 260, 104, t, wt(2, 'belmont') - .1, '#ffffff');
} });
// [3] nobody believed: 20 to 1
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); bgFlat(ctx, '#3a5a3a', '#1a2a1a'); applyCam(ctx, cam, 1); const hi = t > wt(3, 'odds') - .2 ? 3 : -1;
  oddsBoard(ctx, 540, 800, 900, 640, [['BLUE BOY', '2-1'], ['GALLANT', '3-1'], ['LUCKY STAR', '5-1'], ['SWEET KISS', '20-1']], hi, t);
  label(ctx, 'NOBODY BELIEVED', 540, 260, 108, t, wt(3, 'nobody') - .2, '#ffffff', wt(3, 'odds') - .2); label(ctx, '20 TO 1', 540, 260, 150, t, wt(3, '20') - .3, '#ffd23a');
} });
// [4] crash diet to make the weight
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); stableIn(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(4, 'lost') + .2) / 1.6);
  silksMan(ctx, { x: 640, y: G + 160, s: 600, arms: { L: [.5, -.4], R: [.5, -.4] }, face: { eyes: 'half', mouth: 'frown' }, sweat: k > .3 }); weighScale(ctx, 860, G + 200, 440, lerp(.75, .35, k)); if (k > .3) sweat(ctx, 700, G + 160 - .95 * 600, 36);
  rrect(ctx, 110, 900, 220, 300, 10); fillStroke(ctx, '#f6f1e8', 6); text(ctx, 'DIET', 220, 950, 40, '#3a3a3a', INK, 0); for (let i = 0; i < 3; i++) { text(ctx, ['WATER', 'WATER', 'NOTHING'][i], 220, 1020 + i * 50, 30, '#6a6a6a', INK, 0); }
  label(ctx, 'WEIGHT LIMIT', 540, 260, 124, t, wt(4, 'weight') - .2, '#ffffff', wt(4, 'brutal') - .1); label(ctx, 'CRASH DIET', 540, 260, 140, t, wt(4, 'brutal') - .1, '#e0392f');
} });
// [5] race began: 12 jumps, Sweet Kiss flying
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: 5 }); trackBG(ctx, t, cam); applyCam(ctx, cam, 1); const hx = 1300 - ((t * 900) % 1800); hurdle(ctx, hx, 1300, 280);
  const jp = clamp((520 - hx + 260) / 520); for (let i = 0; i < 2; i++) racehorse(ctx, 180 + i * 90, 1200 + i * 40, 420, t + i * .3, { col: ['#3a2a1a', '#a87a4a'][i], num: ['3', '5'][i], rider: riderFn() }); racehorse(ctx, 600, 1320, 620, t, { jump: hx < 860 && hx > 340 ? jp : 0, num: '7', rider: riderFn() });
  label(ctx, 'THE RACE BEGINS', 540, 260, 110, t, S(5) + .05, '#ffffff', wt(5, '12') - .2); label(ctx, '12 JUMPS', 540, 260, 140, t, wt(5, '12') - .2, '#ffd23a', wt(5, 'flying') - .2); label(ctx, 'FLYING', 540, 260, 150, t, wt(5, 'flying') - .2, '#4ad06a');
} });
// [6] mid race: heart attack
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); const ha = cue(t, wt(6, 'heart') - .2, .8); bgFlat(ctx, ha > 0 ? '#5a1a1a' : '#2a3a2a', '#1a0a0a'); applyCam(ctx, cam, 1);
  ekg(ctx, 540, 1080, 860, 340, t, ha); const s = 1 + Math.max(0, Math.sin(t * 7)) * .08 * (1 - ha); ctx.save(); ctx.translate(540, 620); ctx.scale(s, s); drawHeart(ctx, 0, 0, 150, ha > .5 ? '#7a2a2a' : '#ff5a6e'); ctx.restore(); if (ha > .5) { ctx.beginPath(); ctx.moveTo(540, 540); ctx.lineTo(510, 610); ctx.lineTo(560, 650); ctx.lineTo(530, 720); ctx.lineWidth = 10; ctx.strokeStyle = INK; ctx.stroke(); }
  label(ctx, 'MID RACE', 540, 260, 150, t, wt(6, 'middle') - .2, '#ffffff', wt(6, 'heart') - .2); label(ctx, 'HEART ATTACK', 540, 260, 130, t, wt(6, 'heart') - .2, '#e0392f');
} });
// [7] slumped forward but stayed in the saddle
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.1, dz: .03, y: 860 }); trackBG(ctx, t, cam); applyCam(ctx, cam, 1); racehorse(ctx, 540, 1380, 820, t, { num: '7', rider: riderFn({ slump: cue(t, wt(7, 'slumped') - .2, .5) }) });
  label(ctx, 'SLUMPED', 540, 260, 150, t, wt(7, 'slumped') - .2, '#ffffff', wt(7, 'stayed') - .1); label(ctx, 'STILL IN THE SADDLE', 540, 260, 96, t, wt(7, 'stayed') - .1, '#ffd23a');
} });
// [8] Sweet Kiss kept running, jump after jump, dead man on her back
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .02, shake: 4 }); trackBG(ctx, t, cam); applyCam(ctx, cam, 1); const hx = 1300 - ((t * 900) % 1300); hurdle(ctx, hx, 1300, 280); const jp = clamp((520 - hx + 260) / 520);
  racehorse(ctx, 560, 1320, 640, t, { jump: hx < 860 && hx > 340 ? jp : 0, num: '7', rider: riderFn({ slump: 1 }) });
  label(ctx, 'JUMP AFTER JUMP', 540, 260, 110, t, wt(8, 'jump') - .2, '#ffffff', wt(8, 'dead') - .2); label(ctx, 'A DEAD RIDER', 540, 260, 130, t, wt(8, 'dead') - .2, '#e0392f');
} });
// [9] crossed the finish line first
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 3 }); trackBG(ctx, t, cam, { speed: .3, cheer: true }); applyCam(ctx, cam, 1); const k = clamp((t - S(9)) / 1.6); finishPost(ctx, 620, 1100, 420);
  racehorse(ctx, lerp(200, 900, k), 1320, 600, t, { num: '7', rider: riderFn({ slump: 1 }) }); racehorse(ctx, lerp(-200, 420, k), 1220, 420, t + .3, { col: '#3a2a1a', num: '3', rider: riderFn() });
  stamp(ctx, 540, 640, '1ST', cue(t, wt(9, 'first') - .15, .2), '#ffd23a', -.12); label(ctx, 'FIRST!', 540, 260, 170, t, wt(9, 'first') - .2, '#ffd23a');
} });
// [10] owner congratulates, finds him dead
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); trackBG(ctx, t, cam, { speed: 0 }); applyCam(ctx, cam, 1); const sh = t > wt(10, 'he', 0) - .1;
  racehorse(ctx, 680, 1320, 640, t, { gallop: 0, num: '7', rider: riderFn({ slump: 1 }) });
  owner(ctx, { x: 240, y: G + 220, s: 600, arms: sh ? { L: [2.8, -1.4], R: [2.8, -1.4] } : { L: [.3, -.1], R: [2.0, .3] }, face: sh ? { eyes: 'wide', mouth: 'o', look: [1, 0] } : { eyes: 'happy', mouth: 'grin', look: [1, 0] } }); if (sh) sweat(ctx, 280, G + 220 - .95 * 600, 40);
  label(ctx, 'CONGRATS!', 540, 260, 150, t, wt(10, 'congratulate') - .4, '#ffffff', wt(10, 'he', 0) - .1); label(ctx, 'HE WAS DEAD', 540, 260, 140, t, wt(10, 'he', 0) - .1, '#e0392f');
} });
// [11] buried in silks; horse renamed Sweet Kiss of Death
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); const ph = t < wt(11, 'and') - .1 ? 0 : 1;
  if (ph === 0) { bgFlat(ctx, '#8a9aa8', '#c8d0c8'); applyCam(ctx, cam, 1); ctx.fillStyle = '#5a8a4a'; ctx.fillRect(-1000, 1100, 3100, 1000); line(ctx, -1000, 1100, 2100, 1100, 6); graveStone(ctx, 540, 1180, 420, 560, ['FRANK', 'HAYES', '1923']); ctx.save(); ctx.translate(540, 1210); rrect(ctx, -150, -40, 300, 70, 20); fillStroke(ctx, '#2a8a4a', 6); ctx.restore(); label(ctx, 'BURIED IN HIS SILKS', 540, 260, 96, t, wt(11, 'buried') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#2a1a2a', '#0a0a12'); applyCam(ctx, cam, 1); racehorse(ctx, 540, 1320, 700, t, { gallop: 0, col: '#4a2a2a' }); newspaper(ctx, 540, 600, 760, 460, ['SWEET KISS', 'OF DEATH'], 'NEVER RACED AGAIN', backOut(cue(t, wt(11, 'sweet') - .3, .4))); label(ctx, 'A NEW NAME', 540, 260, 140, t, wt(11, 'new') - .2, '#ffd23a'); }
} });
