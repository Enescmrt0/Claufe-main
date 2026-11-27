const SHOTS = [];
// [0] 897: a pope put a dead pope on trial
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); basilica(ctx, t, cam); applyCam(ctx, cam, 1); corpsePope(ctx, 760, G + 40, 640, t); stephen(ctx, { x: 270, y: G + 200, s: 620, arms: { L: [.3, -.1], R: [2.2, -.1] }, face: { eyes: 'squint', mouth: 'teeth', look: [1, 0] } }); chapterTag(ctx, t, .05, 'ROME, 897'); label(ctx, 'POPE VS', 540, 260, 130, t, wt(0, 'pope') - .2, '#ffffff', wt(0, 'dead') - .1); label(ctx, 'DEAD POPE', 540, 260, 140, t, wt(0, 'dead') - .1, '#9ac84a', wt(0, 'trial') - .2); label(ctx, 'ON TRIAL', 540, 260, 140, t, wt(0, 'trial') - .2, '#ffd23a');
} });
// [1] Formosus dead nine months; Stephen VI hated him
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(1, 'a', 0) - .1 ? 0 : 1;
  if (p === 0) { romeRiver(ctx, t, cam, { top: '#8a92a8', bot: '#d8d0c8', bridge: false }); applyCam(ctx, cam, 1); rrect(ctx, 380, 760, 320, 400, 30); fillStroke(ctx, '#9a98b0', 8); text(ctx, 'FORMOSUS', 540, 880, 44, '#3a3a4a', INK, 0); text(ctx, '† 896', 540, 960, 50, '#3a3a4a', INK, 0); label(ctx, 'POPE FORMOSUS', 540, 260, 110, t, wt(1, 'formosus') - .2, '#ffffff', wt(1, '9') - .2); label(ctx, 'DEAD 9 MONTHS', 540, 260, 110, t, wt(1, '9') - .2, '#9ac84a'); }
  else { bgFlat(ctx, '#c8322c', '#5a1a1a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#000'; ctx.fill(); ctx.restore(); } stephen(ctx, { x: 540, y: G + 220, s: 800, arms: { L: [1.4, -2.3], R: [1.4, -2.3] }, face: { eyes: 'angry' === '' ? 'squint' : 'squint', mouth: 'teeth' } }); label(ctx, 'STEPHEN VI', 540, 260, 130, t, wt(1, 'stephen') - .2, '#ffffff', wt(1, 'hated') - .2); label(ctx, 'HATED HIM', 540, 260, 140, t, wt(1, 'hated') - .2, '#ffd23a'); }
} });
// [2] dug up, dressed in papal robes, propped up on a throne
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(2, 'dressed') - .1 ? 0 : t < wt(2, 'and') - .1 ? 1 : 2;
  if (p === 0) { romeRiver(ctx, t, cam, { top: '#3a3a5a', bot: '#7a7a8a', sunY: 1200, bridge: false }); applyCam(ctx, cam, 1); rrect(ctx, 600, 760, 280, 360, 26); fillStroke(ctx, '#7a789a', 8); ctx.fillStyle = '#5a4030'; ctx.fillRect(140, 1100, 420, 160); for (let i = 0; i < 2; i++) deacon(ctx, { x: 160 + i * 300, y: G + 200, s: 520, lean: Math.sin(t * 6 + i) * .15, arms: { L: { ik: [.3, -.3] }, R: { ik: [.4, -.35] } }, face: { eyes: 'squint', mouth: 'teeth' } }); label(ctx, 'DUG UP', 540, 260, 150, t, wt(2, 'dug') - .2, '#c8a878'); }
  else if (p === 1) { basilica(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(2, 'dressed')) / .8); ctx.save(); ctx.globalAlpha = k; mitre(ctx, { x: 540, y: G + 160, s: 700 }); ctx.restore(); drawStick(ctx, { x: 540, y: G + 160, s: 700, cols: ['#e8e0d0', '#e8e0d0'], hat: 'none', belt: false, arms: { L: [.5, -.3], R: [.5, -.3] }, face: { eyes: 'x', mouth: 'o' } }); deacon(ctx, { x: 220, y: G + 200, s: 520, arms: { L: [.3, -.1], R: [1.5, .4] }, face: { eyes: 'wide', mouth: 'flat', look: [1, 0] } }); label(ctx, 'PAPAL ROBES', 540, 260, 130, t, wt(2, 'papal') - .2, '#ffd23a'); }
  else { basilica(ctx, t, cam); applyCam(ctx, cam, 1); corpsePope(ctx, 540, G + 40, 720, t); label(ctx, 'ON A THRONE', 540, 260, 130, t, wt(2, 'throne') - .3, '#ffd23a'); }
} });
// [3] a young deacon stood next to the corpse to answer for him
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); basilica(ctx, t, cam); applyCam(ctx, cam, 1); corpsePope(ctx, 680, G + 40, 620, t); deacon(ctx, { x: 300, y: G + 200, s: 600, arms: { L: [.3, -.1], R: { ik: [.4, -.4] } }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] }, sweat: true }); sweat(ctx, 330, G + 200 - .95 * 600, 36); label(ctx, 'THE DEACON', 540, 260, 130, t, wt(3, 'deacon') - .2, '#ffffff', wt(3, 'answer') - .2); label(ctx, 'ANSWERS FOR HIM', 540, 260, 110, t, wt(3, 'answer') - .2, '#ffd23a');
} });
// [4] Stephen screamed accusations; the body said nothing
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, shake: t < wt(4, 'the', 1) ? 5 : 1 }); basilica(ctx, t, cam); applyCam(ctx, cam, 1); const silent = t > wt(4, 'the', 1) - .1;
  stephen(ctx, { x: 280, y: G + 200, s: 640, lean: silent ? 0 : .12, arms: { L: [.3, -.1], R: [2.3, -.2 + Math.sin(t * 12) * .2] }, face: silent ? { eyes: 'squint', mouth: 'flat', look: [1, 0] } : { eyes: 'squint', mouth: 'teeth', look: [1, 0] } }); corpsePope(ctx, 780, G + 40, 600, t);
  if (!silent) { speechB(ctx, 380, 520, 420, 160, 'PERJURY!', 64); label(ctx, 'ACCUSATIONS', 540, 260, 120, t, wt(4, 'accusations') - .3, '#e0392f'); } else { speechB(ctx, 780, 520, 260, 140, '...', 70); label(ctx, 'SAID NOTHING', 540, 260, 120, t, wt(4, 'nothing') - .3, '#ffffff'); }
} });
function speechB(ctx, x, y, w, h, str, size) { rrect(ctx, x - w / 2, y - h / 2, w, h, 28); fillStroke(ctx, '#ffffff', 6); path(ctx, [[x - 20, y + h / 2 - 3], [x, y + h / 2 + 40], [x + 20, y + h / 2 - 3]]); ctx.fillStyle = '#ffffff'; ctx.fill(); text(ctx, str, x, y, size, '#2a1a1a', INK, 0); }
// [5] surprisingly, the dead man lost
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .05 }); basilica(ctx, t, cam); applyCam(ctx, cam, 1); corpsePope(ctx, 540, G + 40, 740, t); stamp(ctx, 540, 560, 'GUILTY', cue(t, wt(5, 'lost') - .1, .2), '#c8322c', -.12); label(ctx, 'SURPRISINGLY...', 540, 260, 110, t, S(5) + .05, '#ffffff');
} });
// [6] decisions canceled; three blessing fingers cut off; thrown into the Tiber
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(6, 'they') - .1 ? 0 : t < wt(6, 'and') - .1 ? 1 : 2;
  if (p === 0) { bgFlat(ctx, '#e8d8b8', '#c8b088'); applyCam(ctx, cam, 1); scrollDecree(ctx, 540, 820, 600, 600, ['DECREES OF', 'FORMOSUS', '', '', ''], 1); const k = clamp((t - wt(6, 'canceled') + .2) / .3); if (k > 0) { line(ctx, 300, 600, 300 + 480 * k, 600 + 440 * k, 26, '#c8322c'); line(ctx, 780, 600, 780 - 480 * k, 600 + 440 * k, 26, '#c8322c'); } label(ctx, 'CANCELED', 540, 260, 140, t, wt(6, 'canceled') - .3, '#e0392f'); }
  else if (p === 1) { bgFlat(ctx, '#5a3a3a', '#2a1a1a'); applyCam(ctx, cam, 1); hand3(ctx, 540, 860, 360); const k = clamp((t - wt(6, 'cut') + .1) / .3); if (k > 0) { ctx.save(); ctx.globalAlpha = .8; line(ctx, 300, 760, 300 + 480 * k, 760, 20, '#c8c8d0'); ctx.restore(); } label(ctx, '3 BLESSING FINGERS', 540, 260, 96, t, wt(6, 'three') - .2, '#ffffff'); }
  else { romeRiver(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(6, 'threw')) / 1.0); drawStick(ctx, { x: lerp(540, 600, k), y: lerp(940, 1300, k) - Math.sin(k * Math.PI) * 160, s: 300, cols: ['#e8e0d0', '#e8e0d0'], hat: 'none', belt: false, shadow: false, lean: k * 3, face: { eyes: 'x', mouth: 'o' } }); if (k > .9) { burst(ctx, 600, 1200, 90, 10, '#bfe6ff', 2); } for (let i = 0; i < 2; i++) deacon(ctx, { x: 360 + i * 360, y: 960, s: 300, shadow: false, arms: { L: [.3, -.1], R: [2.2, .4] }, face: { eyes: 'squint', mouth: 'smirk' } }); label(ctx, 'INTO THE TIBER', 540, 260, 110, t, wt(6, 'tiber') - .3, '#9ad8ff'); }
} });
// [7] not long after, the basilica collapsed
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const col = wt(7, 'collapsed') - .1; const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > col - .6 ? 14 : 2 }); basilica(ctx, t, cam, { crack: clamp((t - wt(7, 'basilica')) / .8) }); applyCam(ctx, cam, 1); rubble(ctx, t, col - .4, 18); if (t > col) { for (let i = 0; i < 5; i++) puff(ctx, 140 + i * 200, 1140, 140, t, '#c8b898', i, .8 * clamp((t - col) / .4)); } label(ctx, 'COLLAPSED', 540, 260, 140, t, col, '#e0392f');
} });
// [8] people saw it as a sign; Rome turned against Stephen
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const turn = t > wt(8, 'rome') - .1; romeRiver(ctx, t, cam, { top: turn ? '#5a3a4a' : '#e8a868', bot: turn ? '#a86a5a' : '#f8e0c0', bridge: false }); applyCam(ctx, cam, 1); crowdMob(ctx, t, 6, G + 200, 460, turn); if (!turn) { qmark(ctx, 540, 560, 130, '#ffd23a'); label(ctx, 'A SIGN', 540, 260, 150, t, wt(8, 'sign') - .3, '#ffffff'); } else { stephen(ctx, { x: 540, y: 760, s: 320, shadow: false, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'wide', mouth: 'o' }, sweat: true }); label(ctx, 'AGAINST STEPHEN', 540, 260, 104, t, wt(8, 'against') - .2, '#e0392f'); }
} });
// [9] within months, imprisoned and strangled
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); prisonCell(ctx, t, cam); applyCam(ctx, cam, 1); stephen(ctx, { x: 540, y: G + 200, s: 720, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'half', mouth: 'frown' } }); bars2(ctx, 140, 940, 260, 1260); const dark = clamp((t - wt(9, 'strangled')) / .6); tint(ctx, '#000000', dark * .6); label(ctx, 'PRISON', 540, 260, 150, t, wt(9, 'prison') - .3, '#9a9aa8', wt(9, 'strangled') - .2); label(ctx, 'THE END OF STEPHEN', 540, 260, 96, t, wt(9, 'strangled') - .2, '#e0392f');
} });
// [10] a monk pulled Formosus out of the river; reburied in St Peter's
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(10, 'and') - .1 ? 0 : 1;
  if (p === 0) { romeRiver(ctx, t, cam, { bridge: false }); applyCam(ctx, cam, 1); const k = clamp((t - wt(10, 'pulled')) / 1.2); monk(ctx, { x: 360, y: 1010, s: 520, lean: .2 - k * .2, arms: { L: { ik: [.35, -.15] }, R: { ik: [.45, -.2] } }, face: { eyes: 'squint', mouth: 'teeth' } }); drawStick(ctx, { x: lerp(620, 540, k), y: lerp(1260, 1010, k), s: 320, cols: ['#e8e0d0', '#e8e0d0'], hat: 'none', belt: false, shadow: false, lean: -1.4 + k * .6, face: { eyes: 'x', mouth: 'o' } }); label(ctx, 'A MONK', 540, 260, 140, t, wt(10, 'monk') - .2, '#ffffff'); }
  else { romeRiver(ctx, t, cam, { top: '#6ab4e8', bot: '#e8f2f4', sunY: 300, bridge: false }); applyCam(ctx, cam, 1); stPeters(ctx, 540, 900, 760); monk(ctx, { x: 260, y: G + 200, s: 520, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'happy', mouth: 'smile' } }); label(ctx, "SAINT PETER'S", 540, 260, 120, t, wt(10, 'saint') - .3, '#ffd23a'); }
} });
// [11] a later pope made it official: no more putting dead people on trial
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); basilica(ctx, t, cam, { top: '#e8c890', bot: '#a8885a' }); applyCam(ctx, cam, 1); pope(ctx, { x: 300, y: G + 200, s: 640, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'squint', mouth: 'flat' } }, 0); scrollDecree(ctx, 760, 760, 360, 420, ['RULE #1:', 'NO TRIALS', 'FOR THE', 'DEAD'], backOut(clamp((t - wt(11, 'official') + .2) / .4))); stamp(ctx, 540, 1060, 'OFFICIAL', cue(t, wt(11, 'no') - .1, .2), '#c8322c', -.1);
} });
