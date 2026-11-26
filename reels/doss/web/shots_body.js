const SHOTS = [];
const phase = (t, ...cuts) => { let i = 0; while (i < cuts.length && t >= cuts[i]) i++; return i; };
// [0] a soldier in one of the bloodiest battles; refuses to touch a gun
SHOTS.push({ start: S(0), end: S(1), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(0, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03, shake: 5 }); ridgeTop(ctx, t, cam); applyCam(ctx, cam, 1); blast(ctx, 300, 900, 300, ((t - S(0)) * .8) % 1.4, t); blast(ctx, 820, 950, 240, ((t - S(0)) * .8 + .7) % 1.4, t); for (let i = 0; i < 3; i++) { const f = Math.sin(t * 7 + i * 2) > .8 ? 1 : 0; gi(ctx, { x: 180 + i * 360, y: 1650, s: 760, arms: { L: { ik: [.32, -.58] }, R: { ik: [.12, -.55] } }, face: { eyes: 'angry', mouth: 'shout', look: [1, 0] } }, i); gunM1(ctx, 180 + i * 360 + .05 * 760, 1650 - .58 * 760, 380, -.08, f); } }
  else { const cam = camA(t, lt, { z: 1.08, dz: .05 }); ridgeTop(ctx, t, cam); doss(ctx, { x: 540, y: 2200, s: 1700, arms: { L: [1.6, -1.9], R: [1.6, -1.9] }, face: { eyes: 'normal', mouth: 'flat', look: [0, 0] }, headTilt: Math.sin(t * 6) * .06 }); }
  vig(ctx, .5);
} });
// [1] 1945, Okinawa; army medic; faith says never kill
SHOTS.push({ start: S(1), end: S(2), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(1, 'youre') - .1, wt(1, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); cliff(ctx, t, cam); chapterTag(ctx, t, S(1) + .05, 'OKINAWA, 1945'); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.04, dz: .04 }); ridgeTop(ctx, t, cam, { top: '#8a7a6a' }); applyCam(ctx, cam, 1); doss(ctx, { x: 540, y: 1750, s: 1100, arms: { L: [.3, -.1], R: [.4, -.2] }, face: { eyes: 'normal', mouth: 'smile', look: [0, 0] } }); rrect(ctx, 540 + .2 * 1100, 1750 - .38 * 1100, 160, 120, 14); fillStroke(ctx, '#6a6a42', 6); }
  else { const cam = camA(t, lt, { z: 1.1, dz: .05 }); barracks(ctx, t, cam); doss(ctx, { x: 540, y: 2250, s: 1750, hat: null, hair: 'side', hairCol: '#5a3a22', arms: { L: { ik: [-.1, -.55] }, R: { ik: [.1, -.55] } }, face: { eyes: 'closed', mouth: 'flat' } }); bible(ctx, 540, 2250 - .5 * 1750, 360, 0); }
  vig(ctx, .45);
} });
// [2] called a coward; boots thrown while he prays; try to get him kicked out
SHOTS.push({ start: S(2), end: S(3), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(2, 'they') - .1, wt(2, 'they', 1) - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .03 }); barracks(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) gi(ctx, { x: 200 + i * 340, y: 1650, s: 800, hat: null, hair: 'crop', hairCol: ['#5a3a22', '#c8a060', '#1e1a20'][i], arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'angry', mouth: 'grin', look: [0, 0] } }, i); text(ctx, 'COWARD!', 540, 420, 110, '#e0392f', INK, 14); text(ctx, 'COWARD!', 540, 420, 110, '#e0392f', INK, 0); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.04, dz: .03 }); barracks(ctx, t, cam); applyCam(ctx, cam, 1); doss(ctx, { x: 540, y: 1500, s: 760, hat: null, hair: 'side', hairCol: '#5a3a22', legs: { L: [1.4, -2.2], R: [1.4, -2.2] }, arms: { L: { ik: [-.08, -.5] }, R: { ik: [.08, -.5] } }, face: { eyes: 'closed', mouth: 'flat' } }); for (let i = 0; i < 5; i++) { const k = clamp((t - wt(2, 'throw') - i * .22) / .5); if (k <= 0) continue; const x = lerp(i % 2 ? 1150 : -100, 470 + i * 30, k), y = lerp(500, 1050 + i * 20, k) - Math.sin(k * Math.PI) * 220; boot(ctx, x, y, 110, k * 8 + i); } }
  else { const cam = camA(t, lt, { z: 1.06, dz: .04 }); barracks(ctx, t, cam); applyCam(ctx, cam, 1); gi(ctx, { x: 540, y: 2200, s: 1650, hat: (c, H) => officerCap2(c, H, '#6a6a42'), face: { eyes: 'half', mouth: 'smirk' === '' ? 'flat' : 'frown' } }, 0); paperDoc(ctx, 540, 2200 - .5 * 1650, 420, -.05, 'DISCHARGE', { stamp: 'UNFIT?' }); }
  vig(ctx, .45);
} });
// [3] climb a cliff the soldiers call Hacksaw Ridge
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .04 }); cliff(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 9; i++) { const r = rng(i + 4); const y = 1200 - ((t - S(3)) * 60 * (.6 + r() * .4) + r() * 600) % 800; gi(ctx, { x: 440 + (i % 5) * 70, y, s: 150, shadow: false, arms: { L: [2.6, .2], R: [2.4, .3] }, legs: { L: [.6, -.6], R: [.2, -.2] }, face: { eyes: 'normal', mouth: 'flat' } }, i); } chapterTag(ctx, t, wt(3, 'hacksaw') - .2, 'HACKSAW RIDGE'); vig(ctx, .4);
} });
// [4] at the top the Japanese counterattack; company runs back down
SHOTS.push({ start: S(4), end: S(5), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(4, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 9 }); ridgeTop(ctx, t, cam, { top: '#5a3a3a' }); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) blast(ctx, 200 + i * 340, 950 + (i % 2) * 120, 300, ((t - S(4)) * .9 + i * .45) % 1.4, t); for (let i = 0; i < 10; i++) { const r = rng(i + 8); if (Math.sin(t * 9 + i * 3) > .85) burst(ctx, r() * 1080, 700 + r() * 200, 30, 8, '#ffd23a', 2); } }
  else { const cam = camA(t, lt, { z: 1.0, dz: .03, shake: 5 }); ridgeTop(ctx, t, cam, { edge: 760, top: '#5a3a3a' }); applyCam(ctx, cam, 1); for (let i = 0; i < 4; i++) { const k = clamp((t - wt(4, 'and') - i * .2) / 1.4); gi(ctx, { x: lerp(120 + i * 120, 900, k), y: 1500 + i * 60 + k * 300, s: 560, lean: .2, arms: { L: [2.6, .2], R: [2.6, .2] }, legs: { L: [.6 * Math.sin(t * 15 + i), -.3], R: [-.6 * Math.sin(t * 15 + i), -.3] }, face: { eyes: 'wide', mouth: 'shout' } }, i); } }
  vig(ctx, .5);
} });
// [5] dozens of wounded men still up there; so you stay
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(5, 'so') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); ridgeTop(ctx, t, cam, { top: '#3a2a3a', bot: '#8a6060' }); applyCam(ctx, cam, 1); for (let i = 0; i < 8; i++) wounded(ctx, 200 + (i % 4) * 230 + (i > 3 ? 80 : 0), 1150 + Math.floor(i / 4) * 280, 380, i); }
  else { const cam = camA(t, lt, { z: 1.12, dz: .05 }); ridgeTop(ctx, t, cam, { top: '#3a2a3a', bot: '#8a6060' }); doss(ctx, { x: 540, y: 2300, s: 1850, face: { eyes: 'half', mouth: 'flat', look: [-.6, 0], brow: -.3 }, stubble: true, sweat: true }); }
  vig(ctx, .55);
} });
// [6] alone, under fire: drag them to the edge, tie them into a rope, lower them down
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(6, 'tie') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03, shake: 4 }); ridgeTop(ctx, t, cam, { top: '#3a2a3a', bot: '#8a6060', edge: 900 }); applyCam(ctx, cam, 1); const k = clamp((t - wt(6, 'drag')) / 2); const x = lerp(160, 700, k); wounded(ctx, x - 160, 1450, 520, 1); doss(ctx, { x: x + 120, y: 1520, s: 820, flip: -1, lean: -.25, arms: { L: { ik: [.35, -.25] }, R: { ik: [.3, -.3] } }, legs: { L: [.6 * Math.sin(t * 8), -.3], R: [-.6 * Math.sin(t * 8), -.3] }, face: { eyes: 'angry', mouth: 'teeth' === '' ? 'flat' : 'grin' }, stubble: true, sweat: true }); for (let i = 0; i < 6; i++) { const r = rng(i * 3); line(ctx, -100, 300 + r() * 600 + ((t * 900 + i * 200) % 300), 1200, 340 + r() * 600 + ((t * 900 + i * 200) % 300), 2, 'rgba(255,220,120,.35)'); } }
  else { const cam = camA(t, lt, { z: 1.0, dz: .03 }); cliff(ctx, t, cam, { top: '#3a2a3a', bot: '#7a5a5a' }); applyCam(ctx, cam, 1); doss(ctx, { x: 470, y: 560, s: 620, arms: { L: { ik: [.1, -.35] }, R: { ik: [.2, -.3] } }, face: { eyes: 'angry', mouth: 'flat' }, sweat: true }); const k = clamp((t - wt(6, 'lower')) / 1.4); rope(ctx, 560, 380, 600, 700 + k * 400, 0); ctx.save(); ctx.translate(600, 740 + k * 400); ctx.rotate(Math.sin(t * 2) * .1); gi(ctx, { x: 0, y: 330, s: 520, shadow: false, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'closed', mouth: 'frown' } }, 2); ctx.restore(); }
  vig(ctx, .5);
} });
// [7] every time you pray: Lord, please help me get one more
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.14 + lt * .04, dz: 0 }); ridgeTop(ctx, t, cam, { top: '#1a1a2a', bot: '#5a3a4a' }); applyCam(ctx, cam, 1); glow(ctx, 540, 700, 700, 'rgba(255,230,180,', .2); doss(ctx, { x: 540, y: 2350, s: 1900, arms: { L: { ik: [-.08, -.55] }, R: { ik: [.08, -.55] } }, face: { eyes: 'closed', mouth: 'flat' }, stubble: true, sweat: true }); vig(ctx, .6);
} });
// [8] about 75 men saved; some of them the same men who called you a coward
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(8, 'some') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); cliff(ctx, t, cam, { top: '#e8a060', bot: '#f8e0b0' }); applyCam(ctx, cam, 1); const n = Math.round(75 * clamp((t - wt(8, 'saved') + .3) / 1.4)); for (let i = 0; i < Math.min(n, 24); i++) wounded(ctx, 80 + (i % 6) * 190, 1350 + Math.floor(i / 6) * 90, 200, i); text(ctx, String(n), 540, 300, 180, '#ffffff', INK, 22); text(ctx, String(n), 540, 300, 180, '#ffffff', INK, 0); }
  else { const cam = camA(t, lt, { z: 1.08, dz: .05 }); cliff(ctx, t, cam, { top: '#e8a060', bot: '#f8e0b0' }); applyCam(ctx, cam, 1); gi(ctx, { x: 540, y: 2250, s: 1750, arms: { L: [.2, -.1], R: [.4, -.2] }, face: { eyes: 'half', mouth: 'frown', look: [0, -1], brow: .5 }, stubble: true }, 1); ctx.save(); ellipse(ctx, 540 + .2 * 1750, 2250 - .25 * 1750, 90, 60); ctx.fillStyle = '#f2f2ee'; ctx.fill(); ctx.restore(); }
  vig(ctx, .45);
} });
// [9] grenade tears into legs; sniper shatters arm; still gives his stretcher away
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(9, 'and') - .1, wt(9, 'still') - .3);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > wt(9, 'grenade') ? 10 : 2 }); ridgeTop(ctx, t, cam, { top: '#4a3a3a' }); applyCam(ctx, cam, 1); const k = (t - wt(9, 'grenade')) / .9; doss(ctx, { x: 540, y: 1600, s: 900, lean: k > 0 ? -clamp(k) * .5 : 0, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: k > 0 ? 'closed' : 'wide', mouth: k > 0 ? 'shout' : 'o' }, stubble: true }); blast(ctx, 620, 1520, 380, k, t); chapterTag(ctx, t, S(9) + .05, 'WEEKS LATER'); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.08, dz: .04 }); ridgeTop(ctx, t, cam, { top: '#4a3a3a' }); doss(ctx, { x: 540, y: 2250, s: 1750, arms: { L: [.2, -.1], R: [1.4, -2.0] }, face: { eyes: 'half', mouth: 'frown' }, stubble: true, sweat: true }); applyCam(ctx, cam, 1); if (Math.abs(t - wt(9, 'shatters')) < .25) burst(ctx, 860, 1120, 120, 10, '#ffd23a', 2); }
  else { const cam = camA(t, lt, { z: 1.02, dz: .03 }); ridgeTop(ctx, t, cam, { top: '#6a4a4a' }); applyCam(ctx, cam, 1); stretcher(ctx, 700, 1450, 520); wounded(ctx, 700, 1440, 400, 2); doss(ctx, { x: 260, y: 1650, s: 820, arms: { L: [.3, -.1], R: [1.5, .2] }, legs: { L: [.4, -.1], R: [.1, 0] }, face: { eyes: 'half', mouth: 'smile', look: [1, 0] }, stubble: true }); }
  vig(ctx, .5);
} });
// [10] October: Truman gives the Medal of Honor; the first to a man who refused to carry a gun
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(10, 'president') - .2, wt(10, 'the', 1) - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); whiteHouse(ctx, t, cam); chapterTag(ctx, t, S(10) + .05, 'OCTOBER 1945'); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.04, dz: .04 }); whiteHouse(ctx, t, cam); applyCam(ctx, cam, 1); truman(ctx, { x: 760, y: 1700, s: 1000, flip: -1, arms: { L: [.3, -.1], R: { ik: [.4, -.62] } }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } }); doss(ctx, { x: 330, y: 1720, s: 1000, hat: null, hair: 'side', hairCol: '#5a3a22', arms: POSE.idle.arms, face: { eyes: 'normal', mouth: 'smile', look: [1, 0] } }); medalHonor(ctx, 330, 1720 - .52 * 1000 + Math.max(0, 1 - (t - wt(10, 'puts'))) * -100, 70); }
  else { const cam = camA(t, lt, { z: 1.04 + lt * .03, dz: 0 }); whiteHouse(ctx, t, cam); applyCam(ctx, cam, 1); glow(ctx, 540, 900, 800, 'rgba(255,240,200,', .25); doss(ctx, { x: 540, y: 2250, s: 1750, hat: null, hair: 'side', hairCol: '#5a3a22', face: { eyes: 'half', mouth: 'smile', look: [0, 0] } }); medalHonor(ctx, 540, 2250 - .43 * 1750, 120); }
  vig(ctx, .45);
} });
