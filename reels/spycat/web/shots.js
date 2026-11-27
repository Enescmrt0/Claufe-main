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
// [0] 1960s: the CIA turned a cat into a spy
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); bgFlat(ctx, '#2a3a4a', '#121a24'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .1; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  cat(ctx, 400, G - 40, 2.0, t, { sit: true, antenna: true, ear: true, eyes: 'normal' }); ctx.save(); ctx.translate(400 + 93 * 2.0, G - 40 - 105 * 2.0); rrect(ctx, -60, -18, 120, 34, 16); ctx.fillStyle = '#15151a'; ctx.fill(); ctx.restore(); chapterTag(ctx, t, .05, '1960s'); label(ctx, 'CIA', 540, 260, 150, t, wt(0, 'cia') - .2, '#ffffff', wt(0, 'spy') - .3); label(ctx, 'SPY CAT', 540, 260, 150, t, wt(0, 'spy') - .3, '#ffd23a');
} });
// [1] cats wander anywhere; nobody suspects a cat
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); park(ctx, t, cam, { street: false }); applyCam(ctx, cam, 1); const k = (t - S(1)) * 90; cat(ctx, 160 + k, G + 60, 1.4, t, { walk: true }); russian(ctx, { x: 820, y: G + 200, s: 600, flip: -1, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'flat', look: [-1, 1] } }, 0); if (t > wt(1, 'nobody') - .2) { for (let i = 0; i < 3; i++) drawHeart(ctx, 760 + i * 60, 520 + Math.sin(t * 4 + i) * 20, 30); } label(ctx, 'GOES ANYWHERE', 540, 260, 110, t, wt(1, 'wander') - .3, '#ffffff', wt(1, 'nobody') - .2); label(ctx, 'NO SUSPICION', 540, 260, 120, t, wt(1, 'nobody') - .2, '#ffd23a');
} });
// [2] microphone in the ear, transmitter at the skull, antenna along the tail
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const xr = t > wt(2, 'microphone') - .2;
  if (!xr) { lab(ctx, t, cam); applyCam(ctx, cam, 1); opTable(ctx, 540, 1080, 520); cat(ctx, 560, 1054, 1.1, t, { eyes: 'sleep' }); surgeon(ctx, { x: 240, y: G + 200, s: 600, arms: { L: [.3, -.1], R: { ik: [.45, -.5] } }, face: { eyes: 'normal', mouth: 'flat', look: [1, 1] } }); surgeon(ctx, { x: 860, y: G + 200, s: 600, flip: -1, arms: { L: [.3, -.1], R: { ik: [.45, -.5] } }, face: { eyes: 'normal', mouth: 'flat', look: [-1, 1] } }); label(ctx, 'SURGERY', 540, 260, 140, t, wt(2, 'surgeons') - .2, '#9ad8c8'); }
  else { bgFlat(ctx, '#1a2a3a', '#0a121c'); applyCam(ctx, cam, 1); xray(ctx, 540, 820, 940, 760, t, [clamp((t - wt(2, 'microphone') + .1) / .3), clamp((t - wt(2, 'transmitter') + .1) / .3), clamp((t - wt(2, 'antenna') + .1) / .3)]); }
} });
// [3] Operation Acoustic Kitty
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.06, dz: .05 }); bgFlat(ctx, '#2a3a4a', '#121a24'); applyCam(ctx, cam, 1); rrect(ctx, 200, 420, 680, 720, 10); fillStroke(ctx, '#e8c876', 8); rrect(ctx, 200, 380, 240, 60, 8); fillStroke(ctx, '#d8b25f', 6); cat(ctx, 560, 1000, 1.6, t, { sit: true, antenna: true, eyes: 'happy' });
  label(ctx, 'OPERATION', 540, 260, 110, t, wt(3, 'operation') - .2, '#ffffff'); label(ctx, 'ACOUSTIC KITTY', 540, 380, 110, t, wt(3, 'acoustic') - .2, '#ffd23a');
} });
// [4] problem: whenever the cat got hungry it wandered off to find food
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); park(ctx, t, cam, { street: false }); applyCam(ctx, cam, 1); const off = t > wt(4, 'it', 0) - .1 && t > wt(4, 'hungry'); bench(ctx, 260, G + 100, 360); russian(ctx, { x: 200, y: G + 60, s: 460, arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'smile' } }, 0);
  const k = off ? (t - wt(4, 'wandered')) * 160 : 0; cat(ctx, 520 + k, G + 120, 1.3, t, { walk: off, antenna: true, eyes: off ? 'happy' : 'normal' }); fishBowl(ctx, 980, G + 60, 220); if (t > wt(4, 'hungry') - .2) thought(ctx, 760, 520, 220, 640, 820), ctx.save(), ctx.translate(760, 520), ctx.beginPath(), ctx.ellipse(0, 0, 60, 26, 0, 0, TAU), ctx.fillStyle = '#9aa8b8', ctx.fill(), path(ctx, [[60, 0], [100, -26], [100, 26]]), ctx.fill(), ctx.restore(); qmark(ctx, 260, 640, 90, '#ffd23a');
  label(ctx, 'A PROBLEM', 540, 260, 130, t, wt(4, 'problem') - .3, '#e0392f', wt(4, 'whenever') - .2); label(ctx, 'HUNGRY CAT', 540, 260, 130, t, wt(4, 'hungry') - .2, '#ffd23a');
} });
// [5] reportedly operated again to stop it feeling hungry
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); lab(ctx, t, cam); applyCam(ctx, cam, 1); opTable(ctx, 540, 1080, 520); cat(ctx, 560, 1054, 1.1, t, { eyes: 'sleep', antenna: true }); surgeon(ctx, { x: 240, y: G + 200, s: 600, arms: { L: [.3, -.1], R: { ik: [.45, -.5] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 1] } }); stamp(ctx, 540, 520, 'SURGERY #2', cue(t, wt(5, 'operated') - .1, .2), '#2a7a6a', -.1); label(ctx, '"NO MORE HUNGER"', 540, 260, 104, t, wt(5, 'stop') - .2, '#ffd23a'); label(ctx, 'REPORTEDLY', 540, 1500 - 380, 60, t, wt(5, 'reportedly') - .2, '#ffffff', wt(5, 'stop') - .2);
} });
// [6] said to have cost around $20 million
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#2a5a3a', '#12301e'); applyCam(ctx, cam, 1); const n = Math.round(14 * clamp((t - wt(6, 'cost') + .2) / 1.0)); for (let i = 0; i < 5; i++) moneyStack(ctx, 160 + i * 190, G - 20, 160, Math.min(n, 3 + i * 2)); cat(ctx, 540, 820, 1.3, t, { sit: true, antenna: true, eyes: 'happy' });
  const m = Math.round(20 * clamp((t - wt(6, '20') + .2) / .6)); label(ctx, '$' + m + ' MILLION', 540, 260, 130, t, wt(6, 'cost') - .2, '#7ee08a'); label(ctx, '(REPORTEDLY)', 540, 400, 60, t, wt(6, 'said') - .2, '#ffffff');
} });
// [7] first real mission: listen in on two men on a park bench near the Soviet embassy
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); park(ctx, t, cam, { street: false }); applyCam(ctx, cam, 1); bench(ctx, 680, G + 120, 440); russian(ctx, { x: 590, y: G + 80, s: 460, arms: { L: [.3, -.1], R: [1.4, .4] }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }, 0); russian(ctx, { x: 780, y: G + 80, s: 460, flip: -1, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'normal', mouth: 'o', look: [-1, 0] } }, 1); if (t > wt(7, 'listen') - .2) { speechB(ctx, 680, 560, 300, 120, '... · ...', 46); }
  chapterTag(ctx, t, S(7) + .05, 'WASHINGTON, D.C.'); label(ctx, 'FIRST MISSION', 540, 260, 120, t, wt(7, 'first') - .2, '#ffd23a', wt(7, 'listen') - .2); label(ctx, 'SOVIET EMBASSY', 540, 260, 110, t, wt(7, 'soviet') - .2, '#e0392f');
} });
function speechB(ctx, x, y, w, h, str, size) { rrect(ctx, x - w / 2, y - h / 2, w, h, 28); fillStroke(ctx, '#ffffff', 6); path(ctx, [[x - 20, y + h / 2 - 3], [x, y + h / 2 + 40], [x + 20, y + h / 2 - 3]]); ctx.fillStyle = '#ffffff'; ctx.fill(); text(ctx, str, x, y, size, '#2a1a1a', INK, 0); }
// [8] they let the cat out of a van; it walked across the street
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); park(ctx, t, cam); applyCam(ctx, cam, 1); const door = clamp((t - wt(8, 'let') + .1) / .4); van(ctx, 260, 1170, 520, door); const k = clamp((t - wt(8, 'walked') + .2) / 1.4); cat(ctx, lerp(100, 520, k), lerp(1150, 1300, k), 1.0, t, { walk: k > 0 && k < 1, antenna: true }); cia(ctx, { x: 120, y: 1100, s: 360, shadow: false, arms: { L: [.3, -.1], R: [2.2, .5] }, face: { eyes: 'normal', mouth: 'smile' } }, 0); label(ctx, 'GO, KITTY', 540, 260, 130, t, wt(8, 'let') - .2, '#ffffff', wt(8, 'walked') - .2); label(ctx, 'CROSSING...', 540, 260, 130, t, wt(8, 'walked') - .2, '#ffd23a');
} });
// [9] and was hit by a taxi
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const hit = wt(9, 'taxi') - .1; const cam = camA(t, lt, { z: 1.06, dz: .03, shake: t > hit && t < hit + .4 ? 16 : 2 }); park(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - S(9)) / (hit - S(9) + .01)); taxi(ctx, lerp(1400, 640, k), 1360, 560, -1); text(ctx, 'TAXI', lerp(1400, 640, k), 1360 - 560 * .56, 28, INK, INK, 0); if (t < hit) cat(ctx, 540, 1300, 1.0, t, { antenna: true, eyes: 'wide' }); else { burst(ctx, 540, 1180, 200, 12, '#ffd23a', 3); tint(ctx, '#ffffff', 1 - clamp((t - hit) / .25)); } label(ctx, 'TAXI!', 540, 260, 170, t, hit, '#f2c22a');
} });
// [10] that's how one former CIA officer told it; others say the cat lived and the equipment was removed
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const lived = t > wt(10, 'others') - .1;
  if (!lived) { bgFlat(ctx, '#e8d8b8', '#c8b088'); applyCam(ctx, cam, 1); cia(ctx, { x: 540, y: G + 220, s: 780, shades: false, arms: { L: [.3, -.1], R: [1.6, .6] }, face: { eyes: 'squint', mouth: 'smirk' } }, 1); greyHair(ctx, { x: 540, y: G + 220, s: 780 }); label(ctx, 'ONE VERSION', 540, 260, 120, t, wt(10, 'least') - .3, '#ffffff'); }
  else { bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } cat(ctx, 540, G - 20, 2.4, t, { sit: true, eyes: 'happy' }); if (t > wt(10, 'equipment') - .2) { const kk = clamp((t - wt(10, 'equipment')) / .8); ctx.save(); ctx.translate(820 + kk * 200, 600 - kk * 200); ctx.rotate(kk * 3); line(ctx, 0, 0, 0, -90, 6, '#8a8a92'); circle(ctx, 0, -92, 10); ctx.fillStyle = '#e0392f'; ctx.fill(); ctx.restore(); } for (let i = 0; i < 3; i++) drawHeart(ctx, 300 + i * 220, 400 + Math.sin(t * 3 + i) * 20, 40); label(ctx, 'IT LIVED', 540, 260, 140, t, wt(10, 'lived') - .3, '#ffffff'); }
} });
// [11] a secret memo concluded spy cats were not practical
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); bgFlat(ctx, '#3a3a44', '#1a1a22'); applyCam(ctx, cam, 1); memo(ctx, 540, 800, 760, -.04); stamp(ctx, 540, 1000, 'NOT PRACTICAL', cue(t, wt(11, 'not') - .1, .2), '#c8322c', -.12); cat(ctx, 860, G + 20, .9, t, { sit: true, eyes: 'happy' }); label(ctx, 'SECRET MEMO', 540, 260, 120, t, wt(11, 'secret') - .3, '#ffffff');
} });
