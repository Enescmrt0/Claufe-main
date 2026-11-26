const SHOTS = [];
// [0] in 1943, a dead man fooled Hitler
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .04 }); const f = t > wt(0, 'fooled') - .15;
  if (!f) { spainBeach(ctx, t, cam); applyCam(ctx, cam, 1); corpse(ctx, 700, 1120, 520, t, { uniform: true, vest: true }); briefcase(ctx, 900, 1200, 170); label(ctx, 'A DEAD MAN', 540, 260, 130, t, wt(0, 'dead') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#7a2a2a', '#3a1414'); applyCam(ctx, cam, 1); hitler(ctx, { x: 540, y: G + 180, s: 720, arms: { L: { ik: [-.2, -.42] }, R: { ik: [.2, -.42] } }, face: { eyes: 'wide', mouth: 'grin', look: [0, 1] } }); folderDocB(ctx, 540, G + 180 - .42 * 720, 260); label(ctx, 'FOOLED HITLER', 540, 260, 120, t, wt(0, 'fooled') - .15, '#ffd23a'); }
  chapterTag(ctx, t, .05, '1943');
} });
function folderDocB(ctx, x, y, s) { rrect(ctx, x - s / 2, y - s * .35, s, s * .7, 8); fillStroke(ctx, '#f4ecd0', 6); text(ctx, 'TOP SECRET', x, y - s * .2, s * .1, '#c8322c', INK, 0); for (let i = 0; i < 4; i++) line(ctx, x - s * .38, y - s * .05 + i * s * .08, x + s * .38, y - s * .05 + i * s * .08, 3, '#9a9488'); }
// [1] Allies wanted Sicily; obvious target; Germans knew it
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); medMap(ctx, t, cam, { hl: 'sicily' });
  mapArrow(ctx, 380, 1260, 610, 950, clamp((t - wt(1, 'invade') + .2) / .8), '#2a7ae0', -80);
  if (t > wt(1, 'obvious') - .2) { const k = .5 + .5 * Math.sin(t * 8); ctx.save(); ctx.globalAlpha = k; circle(ctx, 620, 945, 110); ctx.lineWidth = 12; ctx.strokeStyle = '#e0392f'; ctx.stroke(); ctx.restore(); }
  if (t > wt(1, 'germans') - .2) { hitler(ctx, { x: 860, y: 560, s: 300, flip: -1, arms: { L: [.3, -.1], R: [1.7, .1] }, face: { eyes: 'squint', mouth: 'smirk', look: [-1, 1] } }); }
  label(ctx, 'ALLIES → SICILY', 540, 1480, 90, t, wt(1, 'invade') - .2, '#2a7ae0', wt(1, 'obvious') - .2); label(ctx, 'OBVIOUS TARGET', 540, 150, 100, t, wt(1, 'obvious') - .2, '#ffd23a', wt(1, 'germans') - .2); label(ctx, 'GERMANS KNEW', 540, 150, 110, t, wt(1, 'germans') - .2, '#ffffff');
} });
// [2] British spies got a body and turned him into an officer who never existed: Major William Martin
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const off = t > wt(2, 'turned') - .2; spyRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  if (!off) { slab(ctx, 680, 1000, 560); corpse(ctx, 760, 990, 360, t, { cols: ['#d8d8d8', '#d8d8d8'] }); sheetOver(ctx, 780, 1000, 360); spy(ctx, { x: 150, y: G + 160, s: 560, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }, 0); spy(ctx, { x: 960, y: G + 220, s: 480, flip: -1, arms: POSE.hips.arms, face: { eyes: 'normal', mouth: 'smirk', look: [-1, 0] } }, 1); label(ctx, 'BRITISH SPIES', 540, 260, 110, t, wt(2, 'british') - .2, '#ffffff', wt(2, 'body') - .2); label(ctx, 'A BODY', 540, 260, 130, t, wt(2, 'body') - .2, '#d8d8d8'); }
  else { martin(ctx, { x: 540, y: G + 200, s: 760, arms: { L: [.3, -.1], R: [2.5, -1.9] }, face: { eyes: 'half', mouth: 'flat', blink: .7 } }); stamp(ctx, 540, 1080, 'NEVER EXISTED', cue(t, wt(2, 'never') - .1, .2), '#e0392f', -.12); label(ctx, 'AN OFFICER', 540, 260, 120, t, wt(2, 'officer') - .2, '#ffffff', wt(2, 'major') - .2); label(ctx, 'MAJOR WILLIAM MARTIN', 540, 260, 84, t, wt(2, 'major') - .2, '#ffd23a'); }
} });
// [3] fake life: love letters, theater tickets, a bank letter about money he owed
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#5a7a9a', '#2a3a5a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .12; ctx.translate(540, 760); ctx.rotate(i / 10 * TAU + t * .2); path(ctx, [[0, 0], [-90, -1500], [90, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  martin(ctx, { x: 540, y: G + 200, s: 560, arms: { L: [1.2, -.3], R: [1.2, -.3] }, face: { eyes: 'half', mouth: 'flat', blink: .7 } });
  const pop = (at) => backOut(clamp((t - at) / .3));
  let k = pop(wt(3, 'love') - .1); if (k > 0) { ctx.save(); ctx.translate(230, 620); ctx.scale(k, k); loveLetter(ctx, 0, 0, 260, -.15); ctx.restore(); }
  k = pop(wt(3, 'fiance') - .1); if (k > 0) { ctx.save(); ctx.translate(230, 900); ctx.scale(k, k); rrect(ctx, -90, -110, 180, 220, 6); fillStroke(ctx, '#ffffff', 6); rrect(ctx, -70, -90, 140, 150, 4); fillStroke(ctx, '#c8d8e0', 4); drawStick(ctx, { x: 0, y: 110, s: 220, cols: ['#e05a8a', '#e05a8a'], hat: 'none', belt: false, shadow: false, face: { eyes: 'happy', mouth: 'smile' } }); text(ctx, 'PAM', 0, 88, 30, INK, INK, 0); ctx.restore(); }
  k = pop(wt(3, 'theater') - .1); if (k > 0) { ctx.save(); ctx.translate(850, 620); ctx.scale(k, k); ticket(ctx, 0, 0, 260, .2); ticket(ctx, 20, 60, 260, .1); ctx.restore(); }
  k = pop(wt(3, 'letter', 1) - .1); if (k > 0) { ctx.save(); ctx.translate(850, 900); ctx.scale(k, k); bankLetter(ctx, 0, 0, 300, .1); ctx.restore(); }
  label(ctx, 'A FAKE LIFE', 540, 260, 130, t, wt(3, 'fake') - .2, '#ffffff', wt(3, 'love') - .2); label(ctx, 'LOVE LETTERS', 540, 260, 110, t, wt(3, 'love') - .2, '#ff9ab0', wt(3, 'theater') - .2); label(ctx, 'THEATRE TICKETS', 540, 260, 100, t, wt(3, 'theater') - .2, '#f2c84a', wt(3, 'even') - .2); label(ctx, 'EVEN A BANK BILL', 540, 260, 100, t, wt(3, 'even') - .2, '#7ee08a');
} });
// [4] chained to him, a briefcase of secret letters saying the invasion would hit Greece
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const gr = t > wt(4, 'saying') - .2; const cam = camA(t, lt, { z: 1.04, dz: .04 });
  if (!gr) { spyRoom(ctx, t, cam); applyCam(ctx, cam, 1); const m = martin(ctx, { x: 360, y: G + 200, s: 680, arms: { L: [.3, -.1], R: [.6, -.2] }, face: { eyes: 'half', mouth: 'flat', blink: .7 } }); chain(ctx, 360 + .26 * 680, G + 200 - .34 * 680, 720, 960, t); briefcase(ctx, 780, 1180, 300, t > wt(4, 'secret') - .2); label(ctx, 'CHAINED', 540, 260, 130, t, wt(4, 'chained') - .2, '#c8c8d0', wt(4, 'briefcase') - .2); label(ctx, 'SECRET LETTERS', 540, 260, 110, t, wt(4, 'briefcase') - .1, '#e0392f'); }
  else { medMap(ctx, t, cam, { hl: 'greece' }); mapArrow(ctx, 380, 1260, 900, 760, clamp((t - wt(4, 'invasion') + .2) / .8), '#2a7ae0', -160); folderDocB(ctx, 300, 420, 300); stamp(ctx, 540, 1460, 'FAKE PLAN', cue(t, wt(4, 'greece') - .1, .2), '#e0392f', -.08); label(ctx, '"GREECE"', 540, 150, 120, t, wt(4, 'greece') - .2, '#ffd23a'); }
} });
// [5] a submarine slipped him into the sea off Spain
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); nightSea(ctx, t, cam, 900);
  submarine(ctx, 600, 1060, 900, t); for (let i = 0; i < 2; i++) spy(ctx, { x: 520 + i * 120, y: 1000, s: 220, arms: { L: [1.4, -.2], R: [1.4, -.2] }, face: { eyes: 'squint', mouth: 'flat' } }, 0);
  const k = clamp((t - wt(5, 'slipped')) / 1.2); corpse(ctx, 400 - k * 200, 1060 + k * 140 + Math.sin(t * 2) * 8, 260, t, { uniform: true, vest: true });
  label(ctx, 'HMS SERAPH', 540, 260, 110, t, wt(5, 'submarine') - .2, '#c8d8ff', wt(5, 'sea') - .2); label(ctx, 'OFF SPAIN', 540, 260, 120, t, wt(5, 'sea') - .1, '#ffd23a'); chapterTag(ctx, t, S(5) + .05, 'APRIL 30, 1943');
} });
// [6] washed ashore; the letters were copied for German spies, and sent to Hitler
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const ph = t < wt(6, 'letters') - .2 ? 0 : t < wt(6, 'sent') - .2 ? 1 : 2; const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (ph === 0) { spainBeach(ctx, t, cam); applyCam(ctx, cam, 1); corpse(ctx, 800, 1140, 440, t, { uniform: true, vest: true }); briefcase(ctx, 920, 1220, 150, false); fisherman(ctx, { x: 150, y: G + 200, s: 520, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'wide', mouth: 'o', look: [1, 1] } }); label(ctx, 'WASHED ASHORE', 540, 260, 110, t, wt(6, 'washed') - .2, '#ffffff'); chapterTag(ctx, t, S(6) + .05, 'HUELVA, SPAIN'); }
  else if (ph === 1) { bgRoom(ctx, t, cam, { night: true }); applyCam(ctx, cam, 1); drawDesk(ctx, 540, G - 40, 700); folderDocB(ctx, 600, G - 300, 300); germanSpy(ctx, { x: 260, y: G + 160, s: 600, arms: { L: { ik: [.25, -.6] }, R: { ik: [.4, -.62] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 1] } }); camera(ctx, 260 + .33 * 600, G + 160 - .64 * 600, 120, Math.sin(t * 10) > .7 ? 1 : 0); label(ctx, 'COPIED', 540, 260, 130, t, wt(6, 'copied') - .2, '#ffffff', wt(6, 'german') - .2); label(ctx, 'GERMAN SPIES', 540, 260, 110, t, wt(6, 'german') - .2, '#ff7a5a'); }
  else { medMap(ctx, t, cam, {}); const k = ease(clamp((t - wt(6, 'sent') + .2) / 1.0)); const x = lerp(40, 700, k), y = lerp(720, 330, k) - Math.sin(k * Math.PI) * 120; envelope(ctx, x, y, 140, k * .4); label(ctx, '→ HITLER', 540, 150, 120, t, wt(6, 'hitler') - .3, '#ffd23a'); }
} });
function camera(ctx, x, y, s, flash = 0) { rrect(ctx, x - s / 2, y - s * .32, s, s * .64, s * .1); fillStroke(ctx, '#3a3a44', 5); circle(ctx, x, y, s * .22); fillStroke(ctx, '#6a8ac8', 5); if (flash > 0) burst(ctx, x + s * .3, y - s * .4, s * .5 * flash, 10, '#fff6b0', 2); }
// [7] Hitler believed it; sent troops and tanks to Greece
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const tk = t > wt(7, 'sent') - .2;
  if (!tk) { bgFlat(ctx, '#7a2a2a', '#3a1414'); applyCam(ctx, cam, 1); hitler(ctx, { x: 540, y: G + 180, s: 760, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); label(ctx, 'HE BELIEVED IT', 540, 260, 110, t, wt(7, 'believed') - .2, '#ffd23a'); }
  else { medMap(ctx, t, cam, { hl: 'greece' }); for (let i = 0; i < 5; i++) { const k = ease(clamp((t - wt(7, 'sent') - i * .15) / 1.4)); panzer(ctx, lerp(560 + i * 40, 880 + (i % 3) * 50, k), lerp(380 + i * 30, 640 + Math.floor(i / 3) * 80, k), 90); } label(ctx, 'TROOPS + TANKS', 540, 150, 100, t, wt(7, 'troops') - .2, '#ffffff', wt(7, 'greece') - .2); label(ctx, '→ GREECE', 540, 150, 120, t, wt(7, 'greece') - .2, '#ffd23a'); }
} });
// [8] Allies landed in Sicily that summer; many troops in the wrong place
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const wr = t > wt(8, 'many') - .2;
  if (!wr) { spainBeach(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) landingCraft(ctx, 200 + i * 340, 960 + i * 20, 260, t); for (let i = 0; i < 4; i++) { const k = clamp((t - wt(8, 'landed') - i * .15) / 1.5); tommy(ctx, { x: 160 + i * 230 + k * 40, y: G + 160, s: 420, lean: .1, arms: { L: [.3, -.1], R: [2.4, .3] }, legs: { L: [.5 * Math.sin(t * 12 + i), -.3], R: [-.5 * Math.sin(t * 12 + i), -.3] }, face: { eyes: 'happy', mouth: 'grin' } }); } label(ctx, 'SICILY', 540, 260, 140, t, wt(8, 'sicily') - .2, '#ffd23a'); chapterTag(ctx, t, S(8) + .05, 'JULY 1943'); }
  else { medMap(ctx, t, cam, { hl: 'greece' }); for (let i = 0; i < 5; i++) panzer(ctx, 880 + (i % 3) * 50, 640 + Math.floor(i / 3) * 80, 90); qmark(ctx, 930, 520, 130, '#ffd23a'); mapArrow(ctx, 380, 1260, 610, 950, 1, '#2a7ae0', -80); label(ctx, 'WRONG PLACE', 540, 150, 120, t, wt(8, 'wrong') - .2, '#e0392f'); }
} });
// [9] message to Churchill: Mincemeat swallowed, rod, line and sinker
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const fish = t > wt(9, 'rod') - .2;
  if (!fish) { bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#6a4a2a' }); applyCam(ctx, cam, 1); churchill(ctx, { x: 300, y: G + 180, s: 640, arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: t > wt(9, 'mincemeat') ? 'happy' : 'normal', mouth: t > wt(9, 'mincemeat') ? 'grin' : 'flat', look: [1, 0] } }); telegram(ctx, 760, 760, 520, 380, ['MINCEMEAT', 'SWALLOWED'], backOut(clamp((t - wt(9, 'message') + .1) / .3))); label(ctx, 'CHURCHILL', 540, 260, 120, t, wt(9, 'churchill') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#5ab0e8', '#1a5a8a'); applyCam(ctx, cam, 1); hookFish(ctx, 600, 1000, 240, t, clamp((t - wt(9, 'rod')) / .8)); label(ctx, 'ROD', 540, 260, 130, t, wt(9, 'rod') - .2, '#ffffff', wt(9, 'line') - .2); label(ctx, 'LINE', 540, 260, 130, t, wt(9, 'line') - .2, '#ffffff', wt(9, 'sinker') - .2); label(ctx, 'AND SINKER', 540, 260, 130, t, wt(9, 'sinker') - .2, '#ffd23a'); }
} });
// [10] the dead man was Glyndwr Michael, a homeless Welshman; name added to his grave in 1998
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const gv = t > wt(10, 'in', 0) - .2 && t > wt(10, 'glynd') + 1;
  if (!gv) { bgFlat(ctx, '#4a4a5a', '#24242e'); applyCam(ctx, cam, 1); drawStick(ctx, { x: 540, y: G + 200, s: 760, cols: ['#6a5a4a', '#6a5a4a'], hat: 'none', belt: false, arms: { L: [.2, -.1], R: [.2, -.1] }, face: { eyes: 'half', mouth: 'flat' } }); flatCap(ctx, { x: 540, y: G + 200, s: 760 }, '#4a4038'); label(ctx, 'HOMELESS WELSHMAN', 540, 260, 90, t, wt(10, 'homeless') - .2, '#ffffff', wt(10, 'named') - .1); label(ctx, 'GLYNDŴR MICHAEL', 540, 260, 104, t, wt(10, 'named') - .1, '#ffd23a'); }
  else { cemetery(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(10, 'added') + .3) / .6); grave(ctx, 540, 1160, 640, 640, ['WILLIAM MARTIN', 'ROYAL MARINES', 'DIED 1943', 'GLYNDŴR MICHAEL', 'SERVED AS', 'MAJOR WILLIAM MARTIN'], k); label(ctx, '1998', 540, 260, 140, t, wt(10, '1998') - .2, '#ffffff', wt(10, 'real') - .2); label(ctx, 'HIS REAL NAME', 540, 260, 110, t, wt(10, 'real') - .2, '#ffd23a'); }
} });
