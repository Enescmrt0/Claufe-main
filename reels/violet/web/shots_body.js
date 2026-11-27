const SHOTS = [];
// [0] three disasters, three sister ships; she survived all of them
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const surv = t > wt(0, 'and') - .1;
  if (!surv) { ocean(ctx, t, cam, { hz: 1000 }); applyCam(ctx, cam, 1); const n = 1 + Math.floor(clamp((t - wt(0, 'three', 1) + .1) / .8) * 3); for (let i = 0; i < Math.min(3, n); i++) liner(ctx, 540, 520 + i * 260, 760, t, { hospital: i === 2, name: ['OLYMPIC', 'TITANIC', 'BRITANNIC'][i] }); label(ctx, '3 DISASTERS', 540, 260, 130, t, wt(0, 'disasters') - .3, '#e0392f'); }
  else { bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 800); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } violet(ctx, { x: 540, y: G + 220, s: 820, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); label(ctx, 'SURVIVED ALL 3', 540, 260, 120, t, wt(0, 'survived') - .2, '#ffffff'); }
} });
// [1] 1911: stewardess on the Olympic, biggest ship in the world, crashed into a warship
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const p = t < wt(1, 'the', 1) - .1 ? 0 : t < wt(1, 'when') - .1 ? 1 : 2;
  if (p === 0) { bgFlat(ctx, '#e8d8b8', '#c8b088'); applyCam(ctx, cam, 1); violet(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'happy', mouth: 'smile' } }); chapterTag(ctx, t, S(1) + .05, '1911'); label(ctx, 'STEWARDESS', 540, 260, 130, t, wt(1, 'stewardess') - .2, '#ffffff'); }
  else if (p === 1) { ocean(ctx, t, cam); applyCam(ctx, cam, 1); liner(ctx, 540, 1000, 1000, t, { name: 'OLYMPIC' }); label(ctx, 'BIGGEST SHIP', 540, 260, 120, t, wt(1, 'biggest') - .2, '#ffd23a'); }
  else { const hit = wt(1, 'warship') - .1; const cam2 = camA(t, lt, { z: 1.0, dz: .02, shake: t > hit && t < hit + .5 ? 14 : 2 }); ocean(ctx, t, cam2); applyCam(ctx, cam2, 1); const k = clamp((t - wt(1, 'when')) / (hit - wt(1, 'when') + .01)); liner(ctx, 580, 1000, 900, t, { name: 'OLYMPIC', dent: t > hit }); warship(ctx, lerp(-200, 220, k), 1060, 460, t); if (t > hit && t < hit + .5) burst(ctx, 260, 980, 160, 12, '#ffd23a', 2); label(ctx, 'CRASH!', 540, 260, 150, t, wt(1, 'crashed') - .1, '#e0392f'); }
} });
// [2] the Olympic limped home; Violet was fine
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const fine = t > wt(2, 'violet') - .1;
  if (!fine) { ocean(ctx, t, cam, { top: '#a8b8c8', sun: false }); applyCam(ctx, cam, 1); liner(ctx, 540 - (t - S(2)) * 40, 1000, 900, t, { name: 'OLYMPIC', dent: true, tilt: .03 }); label(ctx, 'LIMPED HOME', 540, 260, 120, t, wt(2, 'limped') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#bfe6ff', '#7ab8e0'); applyCam(ctx, cam, 1); violet(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [.3, -.1], R: [2.4, -.3] }, face: { eyes: 'happy', mouth: 'smile' } }); label(ctx, 'FINE', 540, 260, 150, t, wt(2, 'fine') - .2, '#7ee08a'); }
} });
// [3] a year later she joined its sister ship: the Titanic
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .04 }); ocean(ctx, t, cam); applyCam(ctx, cam, 1); liner(ctx, 540, 1000, 1000, t, { name: 'TITANIC' }); violet(ctx, { x: 220, y: G + 200, s: 420, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }); chapterTag(ctx, t, S(3) + .05, '1912'); label(ctx, 'THE TITANIC', 540, 260, 140, t, wt(3, 'titanic') - .3, '#ffffff');
} });
// [4] hit the iceberg; ordered into a lifeboat; an officer handed her a baby
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const p = t < wt(4, 'she') - .1 ? 0 : t < wt(4, 'and') - .1 ? 1 : 2;
  if (p === 0) { ocean(ctx, t, cam, { night: true }); applyCam(ctx, cam, 1); iceberg(ctx, 260, 900, 300, {}); liner(ctx, 640, 960, 900, t, { name: 'TITANIC', lights: true, tilt: .02 }); label(ctx, 'ICEBERG', 540, 260, 140, t, wt(4, 'iceberg') - .3, '#bfe6ff'); }
  else if (p === 1) { ocean(ctx, t, cam, { night: true, hz: 1100 }); applyCam(ctx, cam, 1); liner(ctx, 540, 880, 1400, t, { name: 'TITANIC', lights: true, tilt: .05, sink: 40 }); lifeboat(ctx, 540, 1300, 520, 5, t); label(ctx, 'LIFEBOAT', 540, 260, 140, t, wt(4, 'lifeboat') - .3, '#ffffff'); }
  else { ocean(ctx, t, cam, { night: true }); applyCam(ctx, cam, 1); officer(ctx, { x: 760, y: G + 200, s: 660, flip: -1, arms: { L: [.3, -.1], R: { ik: [.45, -.5] } }, face: { eyes: 'wide', mouth: 'flat', look: [-1, 0] } }); violet(ctx, { x: 320, y: G + 200, s: 660, arms: { L: { ik: [.25, -.5] }, R: { ik: [.4, -.52] } }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }); baby(ctx, 540, G + 200 - .52 * 660, 180, t); label(ctx, 'A BABY', 540, 260, 150, t, wt(4, 'baby') - .2, '#ff9ab0'); }
} });
// [5] next morning on the rescue ship a woman grabbed the baby and left without a word
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const grab = t > wt(5, 'grabbed') - .1;
  ocean(ctx, t, cam, { top: '#f2b07a', bot: '#f8e0c0', sunX: 200, sunY: 820 }); applyCam(ctx, cam, 1); steamer(ctx, 860, 980, 420, {}); ctx.fillStyle = '#7a5a3a'; ctx.fillRect(-100, 1080, 1300, 40); line(ctx, -100, 1080, 1200, 1080, 6);
  violet(ctx, { x: 300, y: G + 200, s: 640, arms: grab ? { L: [2.6, -1.6], R: [2.6, -1.6] } : { L: { ik: [.25, -.5] }, R: { ik: [.4, -.52] } }, face: grab ? { eyes: 'wide', mouth: 'o', look: [1, 0] } : { eyes: 'happy', mouth: 'smile' } });
  const mk = clamp((t - wt(5, 'woman') + .1) / .5), lk = clamp((t - wt(5, 'left') + .1) / 1.0); mother(ctx, { x: lerp(1100, 680, mk) + lk * 500, y: G + 200, s: 640, flip: lk > 0 ? 1 : -1, arms: grab ? { L: { ik: [.25, -.5] }, R: { ik: [.4, -.52] } } : { L: [.3, -.1], R: [1.6, .4] }, legs: mk < 1 || lk > 0 ? { L: [.6 * Math.sin(t * 14), -.3], R: [-.6 * Math.sin(t * 14), -.3] } : undefined, face: { eyes: 'squint', mouth: 'flat', look: [-1, 0] } });
  baby(ctx, grab ? lerp(1100, 680, mk) + lk * 500 + (lk > 0 ? 1 : -1) * .3 * 640 : 520, G + 200 - .52 * 640, 170, t); label(ctx, 'RESCUE SHIP', 540, 260, 120, t, wt(5, 'rescue') - .2, '#ffffff', wt(5, 'woman') - .2); label(ctx, 'NOT A WORD', 540, 260, 130, t, wt(5, 'without') - .2, '#ffd23a');
} });
// [6] 1916: a nurse on the third sister, the Britannic, now a hospital ship
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const ship = t > wt(6, 'the', 1) - .1;
  if (!ship) { bgFlat(ctx, '#d8e8e0', '#a8c8b8'); applyCam(ctx, cam, 1); violet(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [.3, -.1], R: [1.6, .5] }, face: { eyes: 'normal', mouth: 'smile' } }, true); chapterTag(ctx, t, S(6) + .05, '1916 · WORLD WAR ONE'); label(ctx, 'NURSE', 540, 260, 150, t, wt(6, 'nurse') - .2, '#e0392f'); }
  else { ocean(ctx, t, cam); applyCam(ctx, cam, 1); liner(ctx, 540, 1000, 1000, t, { name: 'BRITANNIC', hospital: true }); label(ctx, 'HOSPITAL SHIP', 540, 260, 120, t, wt(6, 'hospital') - .2, '#3aa35b'); }
} });
// [7] it hit a mine and sank in under an hour
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const boom = wt(7, 'mine') - .05; const cam = camA(t, lt, { z: 1.0, dz: .02, shake: t > boom && t < boom + .6 ? 16 : 2 }); ocean(ctx, t, cam, { top: '#8a9aa8', sun: false }); applyCam(ctx, cam, 1); const sink = clamp((t - wt(7, 'sank')) / 1.2);
  liner(ctx, 540, 1000, 1000, t, { name: 'BRITANNIC', hospital: true, tilt: .12 * sink, sink: sink * 120 }); if (t < boom) mine(ctx, 840, 1160, 50, t); else if (t < boom + .6) { burst(ctx, 820, 1020, 220, 14, '#ffb02a', 3); puff(ctx, 820, 960, 160, t, '#8a8a92', 1, .8); }
  const m = Math.round(55 * clamp((t - wt(7, 'under') + .2) / .6)); label(ctx, 'MINE!', 540, 260, 150, t, boom, '#e0392f', wt(7, 'sank') - .1); label(ctx, m + ' MINUTES', 540, 260, 130, t, wt(7, 'sank') - .1, '#ffffff');
} });
// [8] before running she went back for her toothbrush; she had missed it after the Titanic
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, r: Math.sin(t * 2) * .03 }); const tb = t > wt(8, 'her') - .1;
  bgFlat(ctx, '#d8c8b0', '#a8906a'); applyCam(ctx, cam, 1); rrect(ctx, 600, 820, 360, 420, 8); fillStroke(ctx, '#f2ece0', 7); rrect(ctx, 640, 860, 280, 140, 6); fillStroke(ctx, '#bfe6ff', 5);
  if (!tb) { violet(ctx, Object.assign({ x: 300 + (t - S(8)) * 80, y: G + 200, s: 660, lean: .1, arms: { L: [.3, -.1], R: [2.2, .2] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }, { legs: { L: [.6 * Math.sin(t * 14), -.3], R: [-.6 * Math.sin(t * 14), -.3] } }), true); label(ctx, 'WENT BACK', 540, 260, 130, t, wt(8, 'went') - .2, '#ffffff'); }
  else { violet(ctx, { x: 400, y: G + 200, s: 720, arms: { L: [.3, -.1], R: { ik: [.4, -.62] } }, face: { eyes: 'happy', mouth: 'grin' } }, true); toothbrush(ctx, 400 + .4 * 720, G + 200 - .62 * 720, 300, -.5, 1); label(ctx, 'HER TOOTHBRUSH', 540, 260, 110, t, wt(8, 'toothbrush') - .3, '#5ab0e8'); }
} });
// [9] lifeboat pulled toward the spinning propellers; so she jumped
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 5 }); ocean(ctx, t, cam, { top: '#8a9aa8', sun: false, hz: 700 }); applyCam(ctx, cam, 1); ctx.fillStyle = '#f6f6f2'; ctx.fillRect(-100, 200, 1300, 600); ctx.fillStyle = '#3aa35b'; ctx.fillRect(-100, 600, 1300, 40); propeller(ctx, 720, 1000, 240, t); const jump = t > wt(9, 'so') - .1; const k = clamp((t - wt(9, 'being')) / 2); lifeboat(ctx, lerp(260, 520, k), 1180, 460, jump ? 2 : 4, t, {});
  if (jump) { const kk = clamp((t - wt(9, 'jumped') + .2) / .6); violet(ctx, { x: lerp(340, 160, kk), y: lerp(1080, 1300, kk) - Math.sin(kk * Math.PI) * 240, s: 420, lean: -.6, arms: { L: [2.6, .2], R: [2.6, .2] }, legs: { L: [.8, -.4], R: [.3, -.2] }, face: { eyes: 'wide', mouth: 'teeth' } }, true); }
  label(ctx, 'PROPELLERS', 540, 260, 130, t, wt(9, 'propellers') - .3, '#e0392f', wt(9, 'so') - .1); label(ctx, 'JUMP!', 540, 260, 150, t, wt(9, 'jumped') - .2, '#ffd23a');
} });
// [10] dragged under, hit her head, survived; years later a fractured skull was found
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t < wt(10, 'but') - .1 ? 0 : t < wt(10, 'years') - .1 ? 1 : 2;
  if (p === 0) { underwater(ctx, t, cam); applyCam(ctx, cam, 1); ellipse(ctx, 540, 260, 500, 80); fillStroke(ctx, '#e8e4d8', 7); violet(ctx, { x: 540, y: 980 - Math.sin(t * 2) * 30, s: 600, lean: Math.sin(t * 1.5) * .3, arms: { L: [2.2, .4], R: [1.8, .6] }, legs: { L: [.5, -.3], R: [.2, -.2] }, face: { eyes: t > wt(10, 'hit') ? 'x' : 'wide', mouth: 'o' } }, true); if (Math.abs(t - wt(10, 'head')) < .3) burst(ctx, 540, 450, 120, 10, '#ffd23a', 2); label(ctx, 'DRAGGED UNDER', 540, 260, 110, t, wt(10, 'dragged') - .2, '#ffffff'); }
  else if (p === 1) { ocean(ctx, t, cam, { top: '#f2b07a', bot: '#f8e0c0', sunY: 820 }); applyCam(ctx, cam, 1); lifeboat(ctx, 540, 1180, 600, 5, t); violet(ctx, { x: 540, y: 1100, s: 360, shadow: false, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'smile' } }, true); label(ctx, 'SURVIVED', 540, 260, 140, t, wt(10, 'survived') - .3, '#7ee08a'); }
  else { bgFlat(ctx, '#2a3a4a', '#121a24'); applyCam(ctx, cam, 1); skullXray(ctx, 380, 760, 420, clamp((t - wt(10, 'fractured') + .2) / .6)); doctor(ctx, { x: 820, y: G + 200, s: 640, flip: -1, arms: { L: [.3, -.1], R: [1.4, .6] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }); label(ctx, 'FRACTURED SKULL', 540, 260, 100, t, wt(10, 'fractured') - .2, '#ff7a6a'); }
} });
// [11] she kept working at sea for decades; Miss Unsinkable
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); ocean(ctx, t, cam, { top: '#f2a868', bot: '#fbe0b8', sunY: 760 }); applyCam(ctx, cam, 1); liner(ctx, 760, 960, 600, t, {}); violet(ctx, { x: 360, y: G + 220, s: 780, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'happy', mouth: 'smug' === '' ? 'smile' : 'smile' } }); const k = backOut(clamp((t - wt(11, 'miss') + .2) / .4)); if (k > 0) { ctx.save(); ctx.translate(780, 560); ctx.scale(k, k); badge(ctx, 0, 0, 150, '3/3', '#3aa35b'); ctx.restore(); } label(ctx, 'DECADES AT SEA', 540, 260, 110, t, wt(11, 'decades') - .3, '#ffffff', wt(11, 'miss') - .2); label(ctx, 'MISS UNSINKABLE', 540, 260, 110, t, wt(11, 'miss') - .2, '#ffd23a');
} });
