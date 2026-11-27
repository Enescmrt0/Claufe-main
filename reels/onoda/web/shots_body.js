const SHOTS = [];
const ph = (t, ...cuts) => { let i = 0; while (i < cuts.length && t >= cuts[i]) i++; return i; };
const walk = (t, sp = 8, k = 0) => ({ legs: { L: [.5 * Math.sin(t * sp + k), -.25 - .25 * Math.max(0, Math.sin(t * sp + k))], R: [-.5 * Math.sin(t * sp + k), -.25 - .25 * Math.max(0, -Math.sin(t * sp + k))] } });
const sneak = (t) => ({ legs: { L: [.4 * Math.sin(t * 5) + .3, -.8], R: [-.4 * Math.sin(t * 5) + .3, -.8] }, lean: .15 });
// [0] fought WWII for 29 years after it ended; a backpacker and an old bookseller stopped him (hook + foreshadow)
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(0, 'and') - .1); const cam = camA(t, lt, { z: 1.02, dz: .04 });
  if (p === 0) { jungle(ctx, t, cam); applyCam(ctx, cam, 1); const k = (t - S(0)) * 40; onoda(ctx, Object.assign({ x: 380 + k, y: G + 200, s: 720, arms: { L: [.3, -.1], R: { ik: [.25, -.55] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }, sneak(t)), 1); rifleJ(ctx, 380 + k + .25 * 720, G + 200 - .55 * 720, 420, -.3); const yr = 1945 + Math.round(29 * clamp((t - wt(0, '29') + .2) / 1.4)); calendarYr(ctx, 860, 420, 220, yr); label(ctx, '29 YEARS', 540, 260, 140, t, wt(0, '29') - .2, '#ffd23a'); }
  else { homeJapan(ctx, t, cam); applyCam(ctx, cam, 1); suzuki(ctx, Object.assign({ x: 300, y: G + 200, s: 640, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, walk(t, 7))); bookseller(ctx, { x: 790, y: G + 200, s: 620, flip: -1, arms: { L: [.3, -.1], R: [1.5, .5] }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } }); label(ctx, 'A BACKPACKER', 540, 260, 110, t, wt(0, 'backpacker') - .2, '#ff9a5a', wt(0, 'old') - .2); label(ctx, '+ A BOOKSELLER', 540, 260, 110, t, wt(0, 'old') - .2, '#ffd23a'); }
} });
// [1] 1944: sent to a jungle island in the Philippines; orders: never surrender
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(1, 'japan') - .1, wt(1, 'his') - .1); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { bgFlat(ctx, '#f2f2ee', '#d8d0c0'); applyCam(ctx, cam, 1); circle(ctx, 540, 760, 260); ctx.fillStyle = '#d8322c'; ctx.fill(); chapterTag(ctx, t, S(1) + .05, '1944'); soldierJ(ctx, Object.assign({ x: 540, y: G + 220, s: 720, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'normal', mouth: 'flat' } }, walk(t, 6))); }
  else if (p === 1) { islandMap(ctx, t, cam, clamp((t - wt(1, 'island') + .3) / .4)); plane(ctx, 200 + (t - wt(1, 'japan')) * 160, 360, 260); label(ctx, 'HIROO ONODA', 540, 260, 110, t, wt(1, 'hiroo') - .2, '#ffffff'); }
  else { jungle(ctx, t, cam); applyCam(ctx, cam, 1); onoda(ctx, { x: 360, y: G + 200, s: 680, arms: { L: [.3, -.1], R: [2.0, -2.1] }, face: { eyes: 'normal', mouth: 'flat', look: [1, 0] } }); soldierJ(ctx, { x: 790, y: G + 200, s: 700, flip: -1, cols: ['#6a5a3a', '#6a5a3a'], arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'angry' === 'x' ? 'x' : 'squint', mouth: 'teeth', look: [-1, 0] } }); stamp(ctx, 540, 520, 'NEVER SURRENDER', cue(t, wt(1, 'never') - .1, .2), '#c8322c', -.1); }
} });
// [2] a year later the war ended; nobody could convince him
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(2, 'but') - .1); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1); for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 760); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } calendarYr(ctx, 540, 640, 300, 1945); for (let i = 0; i < 3; i++) soldierJ(ctx, { x: 200 + i * 340, y: G + 220, s: 520, arms: { L: [2.5, .3], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'grin' }, bob: Math.abs(Math.sin(t * 8 + i)) * -.03 }, i); label(ctx, 'WAR OVER', 540, 260, 140, t, wt(2, 'ended') - .3, '#ffffff'); }
  else { jungle(ctx, t, cam); applyCam(ctx, cam, 1); onoda(ctx, { x: 540, y: G + 220, s: 760, arms: POSE.hips.arms, headTilt: Math.sin(t * 7) * .1, face: { eyes: 'squint', mouth: 'frown' } }); for (let i = 0; i < 3; i++) qmark(ctx, 220 + i * 320, 420 + Math.sin(t * 4 + i) * 20, 90, '#ffffff'); label(ctx, 'NOT CONVINCED', 540, 260, 110, t, wt(2, 'nobody') - .2, '#ff9a5a'); }
} });
// [3] planes dropped leaflets: the war is over; he decided they were enemy tricks
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(3, 'he') - .1); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { jungle(ctx, t, cam, { front: false }); applyCam(ctx, cam, 1); const k = (t - S(3)); plane(ctx, -100 + k * 380, 280, 300); for (let i = 0; i < 10; i++) { const r = rng(i + 3); const tt = k - r() * 1.2; if (tt < 0) continue; leaflet(ctx, -100 + (k - tt) * 380 + Math.sin(tt * 3 + i) * 60, 300 + tt * 320, 90, tt * 2 + i); } onoda(ctx, { x: 540, y: G + 200, s: 600, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'wide', mouth: 'o', look: [0, -1] } }); label(ctx, 'LEAFLETS', 540, 260, 110, t, wt(3, 'leaflets') - .2, '#ffffff'); }
  else { jungle(ctx, t, cam); applyCam(ctx, cam, 1); onoda(ctx, { x: 420, y: G + 220, s: 760, arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 0] } }); leaflet(ctx, 420 + .42 * 760, G + 220 - .55 * 760, 260, .1); stamp(ctx, 540, 500, 'FAKE!', cue(t, wt(3, 'enemy') - .1, .2), '#c8322c', -.12); label(ctx, 'ENEMY TRICKS', 540, 260, 120, t, wt(3, 'tricks') - .4, '#e0392f'); }
} });
// [4] he stayed; decades of raids for food; raids killed about 30 islanders
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(4, 'for') - .1, wt(4, 'and', 1) - .1); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { jungle(ctx, t, cam, { top: '#3a4a6a', bot: '#6a7a6a', sun: false, dark: .25 }); applyCam(ctx, cam, 1); campfire(ctx, 540, G - 20, 160, t); onoda(ctx, { x: 300, y: G + 200, s: 600, arms: { L: [1.4, -.2], R: [1.4, -.2] }, legs: { L: [1.5, -2.4], R: [1.4, -2.3] }, face: { eyes: 'half', mouth: 'flat', look: [1, 1] } }, 1); soldierJ(ctx, { x: 780, y: G + 200, s: 600, flip: -1, arms: { L: [1.4, -.2], R: [1.4, -.2] }, legs: { L: [1.5, -2.4], R: [1.4, -2.3] }, face: { eyes: 'half', mouth: 'flat', look: [-1, 1] } }, 1); label(ctx, 'HE STAYED', 540, 260, 130, t, wt(4, 'stayed') - .3, '#ffffff'); }
  else if (p === 1) { jungle(ctx, t, cam, { front: false }); applyCam(ctx, cam, 1); for (let i = 0; i < 5; i++) { rrect(ctx, 600 + i * 70, 1040, 20, 80, 4); fillStroke(ctx, '#5a8a3a', 3); circle(ctx, 610 + i * 70, 1020, 30); fillStroke(ctx, '#e8b84a', 4); } for (let i = 0; i < 3; i++) soldierJ(ctx, Object.assign({ x: 160 + i * 170 + (t - wt(4, 'for')) * 60, y: G + 200 + (i % 2) * 30, s: 500, arms: { L: [.3, -.1], R: [1.2, .4] }, face: { eyes: 'squint', mouth: 'flat' } }, sneak(t + i)), i); const yr = 1950 + Math.round(20 * clamp((t - wt(4, 'decades') + .2) / 2)); calendarYr(ctx, 880, 380, 200, yr); label(ctx, 'DECADES', 540, 260, 140, t, wt(4, 'decades') - .2, '#ffd23a'); }
  else { jungle(ctx, t, cam, { top: '#5a3a3a', bot: '#8a6a5a', sun: false, dark: .3 }); applyCam(ctx, cam, 1); for (let i = 0; i < 30; i++) { const k = clamp((t - wt(4, 'killed') - i * .03) / .3); ctx.save(); ctx.globalAlpha = .25 + .55 * k; drawStick(ctx, { x: 90 + (i % 10) * 100, y: 760 + Math.floor(i / 10) * 220, s: 200, cols: ['#c8a878', '#c8a878'], hat: 'none', belt: false, shadow: false, arms: POSE.idle.arms, face: { eyes: 'closed', mouth: 'flat' }, breathe: false }); ctx.restore(); } label(ctx, '~30 ISLANDERS KILLED', 540, 260, 90, t, wt(4, 'killed') - .2, '#ff7a6a'); }
} });
// [5] one by one his men surrendered or died; by 1972 he was alone
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(5, 'by', 1) - .1); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  jungle(ctx, t, cam, { top: '#6a7a8a', bot: '#a8b0a0', sun: false }); applyCam(ctx, cam, 1);
  if (p === 0) { for (let i = 0; i < 3; i++) { const fade = clamp((t - wt(5, 'one') - .4 - i * .5) / .4); ctx.save(); ctx.globalAlpha = 1 - fade; soldierJ(ctx, { x: 200 + i * 340, y: G + 200, s: 560, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'frown' } }, i); ctx.restore(); } label(ctx, 'ONE BY ONE', 540, 260, 130, t, wt(5, 'one') - .2, '#ffffff'); }
  else { onoda(ctx, Object.assign({ x: 540 + Math.sin(t * .8) * 40, y: G + 220, s: 720, arms: { L: [.2, -.1], R: [.2, -.1] }, face: { eyes: 'half', mouth: 'frown', look: [Math.sin(t * 2), 0] } }, walk(t, 4)), 1); calendarYr(ctx, 860, 420, 200, 1972); label(ctx, 'ALONE', 540, 260, 150, t, wt(5, 'alone') - .3, '#9ad8ff'); }
} });
// [6] 1974: backpacker Norio Suzuki goes looking; his list: Onoda, a panda, the Yeti  (rehook)
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(6, 'his') - .1); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { homeJapan(ctx, t, cam); applyCam(ctx, cam, 1); suzuki(ctx, Object.assign({ x: 300 + (t - S(6)) * 70, y: G + 200, s: 700, arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'grin', look: [1, 0] } }, walk(t, 7))); chapterTag(ctx, t, S(6) + .05, '1974'); label(ctx, 'NORIO SUZUKI', 540, 260, 120, t, wt(6, 'norio') - .2, '#ff9a5a'); }
  else { bgFlat(ctx, '#9ad8ff', '#5ab0e8'); applyCam(ctx, cam, 1); checklist(ctx, 540, 360, 640, ['ONODA', 'A PANDA', 'THE YETI'], [false, false, false]); const k1 = clamp((t - wt(6, 'panda') + .2) / .3), k2 = clamp((t - wt(6, 'yeti') + .2) / .3); if (k1 > 0) { ctx.save(); ctx.globalAlpha = k1; panda(ctx, 260, 1180, 160); ctx.restore(); } if (k2 > 0) { ctx.save(); ctx.globalAlpha = k2; yeti(ctx, 820, 1300, 300, t); ctx.restore(); } suzuki(ctx, { x: 540, y: G + 260, s: 420, arms: { L: [.3, -.1], R: [2.4, -1.4] }, face: { eyes: 'happy', mouth: 'grin' } }); }
} });
// [7] he found Onoda in four days
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); jungle(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - S(7)) / .6); suzuki(ctx, { x: 300, y: G + 200, s: 640, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'wide', mouth: 'grin', look: [1, 0] } }); onoda(ctx, { x: 820, y: G + 200, s: 660, flip: -1, arms: { L: [.3, -.1], R: { ik: [.25, -.55] } }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }, 1); rifleJ(ctx, 820 - .25 * 660, G + 200 - .55 * 660, 380, Math.PI + .3); checklist(ctx, 540, 260, 360, ['ONODA'], [k > .9]); label(ctx, '4 DAYS', 540, 260, 130, t, wt(7, '4') - .2, '#ffd23a');
} });
// [8] Onoda still refused; only his commanding officer could order that
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(8, 'only') - .1); const cam = camA(t, lt, { z: 1.06, dz: .04 }); jungle(ctx, t, cam, { top: '#6a8a9a', bot: '#c8d8c0' }); applyCam(ctx, cam, 1);
  if (p === 0) { onoda(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [1.4, -2.3], R: [1.4, -2.3] }, headTilt: Math.sin(t * 8) * .08, face: { eyes: 'angry' === 'x' ? 'x' : 'squint', mouth: 'frown' } }, 1); stamp(ctx, 540, 500, 'REFUSED', cue(t, wt(8, 'refused') - .1, .2), '#c8322c', -.1); }
  else { onoda(ctx, { x: 320, y: G + 220, s: 680, arms: { L: [.3, -.1], R: [2.4, -.4] }, face: { eyes: 'normal', mouth: 'flat', look: [1, -1] } }, 1); thought(ctx, 760, 520, 260, 480, 700); soldierJ(ctx, { x: 760, y: 700, s: 300, shadow: false, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'squint', mouth: 'flat' } }); label(ctx, 'ONLY HIS OFFICER', 540, 260, 100, t, wt(8, 'commanding') - .3, '#ffd23a'); }
} });
// [9] Suzuki flew home and tracked down that officer; now a bookseller
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(9, 'he') - .1); const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { homeJapan(ctx, t, cam); applyCam(ctx, cam, 1); plane(ctx, 1100 - (t - S(9)) * 300, 300, 260, -1); suzuki(ctx, Object.assign({ x: 200 + (t - S(9)) * 120, y: G + 200, s: 620, lean: .1, arms: { L: [.6, -.4], R: [.6, -.4] }, face: { eyes: 'squint', mouth: 'grin', look: [1, 0] } }, walk(t, 12))); label(ctx, 'TRACKED HIM DOWN', 540, 260, 96, t, wt(9, 'tracked') - .2, '#ffffff'); }
  else { bookshop(ctx, t, cam); applyCam(ctx, cam, 1); bookseller(ctx, { x: 540, y: G + 220, s: 760, arms: { L: [.3, -.1], R: { ik: [.4, -.5] } }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }); rrect(ctx, 540 + .4 * 760 - 60, G + 220 - .5 * 760 - 50, 120, 90, 6); fillStroke(ctx, '#2f63c9', 5); label(ctx, 'A BOOKSELLER', 540, 260, 120, t, wt(9, 'bookseller') - .3, '#ffd23a'); }
} });
// [10] the old man flew to the island and read Onoda his new orders: the war is over
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const p = ph(t, wt(10, 'and') - .1); const cam = camA(t, lt, { z: 1.02, dz: .04 });
  if (p === 0) { islandMap(ctx, t, cam); plane(ctx, 1000 - (t - S(10)) * 280, 600 + (t - S(10)) * 80, 240, -1); }
  else { jungle(ctx, t, cam, { top: '#e8a868', bot: '#f8e0b0', sunY: 700 }); applyCam(ctx, cam, 1); bookseller(ctx, { x: 340, y: G + 200, s: 680, cols: ['#8a7a4a', '#8a7a4a'], arms: { L: { ik: [.2, -.55] }, R: { ik: [.42, -.58] } }, face: { eyes: 'normal', mouth: t > wt(10, 'war', 0) ? 'o' : 'flat', look: [0, 1] } }); leaflet(ctx, 340 + .33 * 680, G + 200 - .6 * 680, 220, -.05, 'ORDERS: WAR OVER'); onoda(ctx, { x: 800, y: G + 200, s: 680, flip: -1, arms: POSE.idle.arms, face: t > wt(10, 'over', 0) - .1 ? { eyes: 'wide', mouth: 'o', look: [-1, 0] } : { eyes: 'normal', mouth: 'flat', look: [-1, 0] } }, 1); label(ctx, 'THE WAR IS OVER', 540, 260, 110, t, wt(10, 'war') - .2, '#ffffff'); }
} });
// [11] Onoda saluted, and finally handed over his sword (cut right after the payoff)
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04 + lt * .03, dz: 0 }); jungle(ctx, t, cam, { top: '#e8a868', bot: '#f8e0b0', sunY: 760 }); applyCam(ctx, cam, 1); const give = t > wt(11, 'handed') - .2; const k = clamp((t - wt(11, 'handed') + .2) / .6);
  onoda(ctx, { x: 560, y: G + 230, s: 800, arms: give ? { L: [.3, -.1], R: { ik: [.42 - k * .05, -.45] } } : { L: [.3, -.1], R: [2.4, -2.3] }, face: { eyes: 'half', mouth: 'flat', look: [-.5, 0] } }, 1); if (give) katana(ctx, 560 + .4 * 800 - k * 120, G + 230 - .45 * 800, 520, -.05); label(ctx, 'SALUTE', 540, 260, 140, t, wt(11, 'saluted') - .3, '#ffffff', wt(11, 'handed') - .2); label(ctx, 'THE SWORD', 540, 260, 140, t, wt(11, 'sword') - .3, '#ffd23a'); chapterTag(ctx, t, S(11) + .05, 'MARCH 1974');
} });
