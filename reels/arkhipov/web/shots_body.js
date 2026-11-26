const SHOTS = [];
const phase = (t, ...cuts) => { let i = 0; while (i < cuts.length && t >= cuts[i]) i++; return i; };
const quake = (t, at, d = .6, a = 18) => { const k = clamp(1 - (t - at) / d); return t >= at ? k * a : 0; };
function charges(ctx, t, t0, n, cx, cy, spread) { for (let i = 0; i < n; i++) { const r = rng(i * 13 + 5); const tb = t0 + i * .45; const x = cx + (r() - .5) * spread, y0 = -50; if (t < tb) depthCharge(ctx, x, lerp(y0, cy + (r() - .5) * 300, clamp((t - tb + 1.2) / 1.2)), 22, t); else depthCharge(ctx, x, cy + (r() - .5) * 300, 40, t, clamp((t - tb) / .8)); } }
// [0] submarine with a nuclear torpedo; Americans bombing; captain wants to fire; only you can stop him
SHOTS.push({ start: S(0), end: S(1), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(0, 'americans') - .1, wt(0, 'captain') - .3, wt(0, 'only') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); deepSea(ctx, t, cam, { surface: 120 }); subHull(ctx, 560, 1000, 1000, t); glow(ctx, 540, 1000, 600, 'rgba(120,200,255,', .08); }
  else if (p === 1) { const q = quake(t, wt(0, 'bombing') - .05) + quake(t, wt(0, 'you', 1) + .1); const cam = camA(t, lt, { z: 1.04, dz: .03, shake: 3 }); cam.x += q * Math.sin(t * 60); cam.y += q * Math.cos(t * 47); subInterior(ctx, t, cam, { light: 'red', swing: .3 }); for (let i = 0; i < 3; i++) sailorR(ctx, { x: 200 + i * 340, y: 1650, s: 900, lean: Math.sin(t * 9 + i) * .06, arms: { L: [2.2, .5], R: [2.2, .5] }, face: { eyes: 'wide', mouth: 'o', look: [0, -1] }, sweat: true }); }
  else if (p === 2) { const cam = camA(t, lt, { z: 1.08, dz: .05, shake: 4 }); subInterior(ctx, t, cam, { light: 'red' }); savitsky(ctx, { x: 540, y: 2250, s: 1750, arms: { L: [.2, -.1], R: [1.4, .4] }, face: { eyes: 'angry', mouth: 'shout' }, sweat: true }); }
  else { const cam = camA(t, lt, { z: 1.1, dz: .05 }); subInterior(ctx, t, cam, { light: 'red' }); arkhipov(ctx, { x: 540, y: 2250, s: 1800, face: { eyes: 'half', mouth: 'flat', look: [-.5, 0] }, sweat: true }); }
  vig(ctx, .5);
} });
// [1] October 1962; hiding near Cuba; no word from Moscow in days
SHOTS.push({ start: S(1), end: S(2), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(1, 'your') - .1, wt(1, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); cubaMap(ctx, t, cam, .7 + .3 * clamp((t - wt(1, 'cuban')) / 1.2)); chapterTag(ctx, t, S(1) + .05, 'OCTOBER 1962'); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.0, dz: .04 }); deepSea(ctx, t, cam, { surface: -100 }); subHull(ctx, 540, 1000, 900, t); for (let i = 0; i < 5; i++) { const r = rng(i + 3); ctx.save(); ctx.globalAlpha = .4; ellipse(ctx, r() * 1080, 300 + r() * 1300, 30, 12); ctx.fillStyle = '#9ac8e0'; ctx.fill(); ctx.restore(); } }
  else { const cam = camA(t, lt, { z: 1.06, dz: .04 }); subInterior(ctx, t, cam, { light: 'green' }); sailorR(ctx, { x: 420, y: 1900, s: 1300, hat: headset, arms: { L: [.3, -.1], R: { ik: [.25, -.62] } }, face: { eyes: 'half', mouth: 'frown', look: [1, 0] } }); ctx.save(); ctx.translate(800, 1100); rrect(ctx, -170, -120, 340, 240, 12); fillStroke(ctx, '#2a2a24', 8); ctx.beginPath(); for (let x = -150; x <= 150; x += 6) ctx.lineTo(x, Math.sin(x * .3 + t * 40) * 30 * (Math.sin(x * 7.1 + t * 13) > 0 ? 1 : .3)); ctx.lineWidth = 4; ctx.strokeStyle = '#7ee08a'; ctx.stroke(); ctx.restore(); text(ctx, 'MOSCOW: — —', 800, 900, 40, '#7ee08a', INK, 0); }
  vig(ctx, .5);
} });
// [2] batteries dying; AC dead; over 45 °C; sailors fainting
SHOTS.push({ start: S(2), end: S(3), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(2, 'the', 1) - .1, wt(2, 'its') - .1, wt(2, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.04, dz: .04 }); subInterior(ctx, t, cam, { light: 'dim' }); applyCam(ctx, cam, 1); battery(ctx, 540, 760, 640, 300, lerp(.35, .08, clamp((t - S(2)) / 1.2))); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.04, dz: .03 }); subInterior(ctx, t, cam, { light: 'dim', steam: true }); applyCam(ctx, cam, 1); fan(ctx, 820, 620, 150, .3 + Math.max(0, 1.5 - (t - wt(2, 'air'))) * t); arkhipov(ctx, { x: 340, y: 1800, s: 1150, arms: { L: [.3, -.1], R: [2.6, -1.4] }, face: { eyes: 'half', mouth: 'frown', look: [1, -1] }, sweat: true }); }
  else if (p === 2) { const cam = camA(t, lt, { z: 1.06, dz: .04 }); subInterior(ctx, t, cam, { light: 'red', steam: true }); applyCam(ctx, cam, 1); const v = lerp(.5, .9, clamp((t - wt(2, 'over')) / .9)); thermo(ctx, 360, 1100, 760, v, t > wt(2, '45') - .1 ? '45°C' : ''); }
  else { const cam = camA(t, lt, { z: 1.02, dz: .03 }); subInterior(ctx, t, cam, { light: 'red', steam: true }); const k = easeIn(clamp((t - wt(2, 'fainting')) / .6)); sailorR(ctx, { x: 640 + k * 120, y: 1640, s: 900, lean: k * 1.2, arms: { L: [.4 + k, -.2], R: [.4 + k, -.2] }, face: { eyes: k > .3 ? 'closed' : 'half', mouth: 'o' }, sweat: true }); sailorR(ctx, { x: 220, y: 1700, s: 900, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] }, sweat: true, hairCol: '#2a1a14' }); }
  vig(ctx, .5);
} });
// [3] American warships find you; depth charges all around the hull
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(3, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); applyCam(ctx, cam, .08); drawSky(ctx, '#7a9ab8', '#d8e0e8', -400, 1300); applyCam(ctx, cam, .4); drawSea(ctx, 860, t, 2400, ['#5a8aa8', '#2a6a8a', '#1a4a6a']); applyCam(ctx, cam, 1); destroyer(ctx, 300, 980, 620, t, 1); destroyer(ctx, 820, 900, 420, t, -1); destroyer(ctx, 700, 1200, 820, t, -1); for (let i = 0; i < 2; i++) usSailor(ctx, { x: 560 + i * 120, y: 1120, s: 160, shadow: false, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'normal', mouth: 'flat' } }); }
  else { const q = [0, 1, 2, 3].reduce((a, i) => a + quake(t, wt(3, 'and') + .4 + i * .45, .5, 16), 0); const cam = camA(t, lt, { z: 1.0, dz: .02 }); cam.x += q * Math.sin(t * 70); cam.y += q * Math.cos(t * 53); deepSea(ctx, t, cam, { surface: 140 }); destroyer(ctx, 300, 130, 360, t, 1); destroyer(ctx, 760, 120, 300, t, -1); subHull(ctx, 540, 1150, 900, t); charges(ctx, t, wt(3, 'and') + .4, 5, 540, 1050, 900); }
  vig(ctx, .45);
} });
// [4] captain thinks war has started; orders the nuclear torpedo made ready
SHOTS.push({ start: S(4), end: S(5), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(4, 'he') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.08, dz: .05, shake: 5 }); subInterior(ctx, t, cam, { light: 'red', swing: .25 }); savitsky(ctx, { x: 540, y: 2250, s: 1750, face: { eyes: 'wide', mouth: 'o', look: [0, -1] }, sweat: true }); }
  else { const cam = camA(t, lt, { z: 1.02, dz: .04 }); torpedoRoom(ctx, t, cam); applyCam(ctx, cam, 1); const k = ease(clamp((t - wt(4, 'torpedo') + .4) / 1.2)); nukeTorpedo(ctx, lerp(380, 600, k), 1020, 860, t); for (let i = 0; i < 2; i++) sailorR(ctx, { x: 160 + i * 760, y: 1700, s: 800, flip: i ? -1 : 1, arms: { L: { ik: [.35, -.45] }, R: { ik: [.35, -.4] } }, face: { eyes: 'angry', mouth: 'teeth' === '' ? 'flat' : 'frown', look: [1, 0] }, sweat: true }); }
  vig(ctx, .55);
} });
// [5] "We will die, but we will sink them all"
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.12 + lt * .06, dz: 0, shake: 7 }); subInterior(ctx, t, cam, { light: 'red', swing: .2 }); savitsky(ctx, { x: 560, y: 2350, s: 2000, arms: { L: [.2, -.1], R: [2.4, -.3] }, face: { eyes: 'angry', mouth: 'shout' }, sweat: true }); vig(ctx, .65);
} });
// [6] firing needs three officers; captain yes; political officer yes
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(6, 'the') - .1, wt(6, 'the', 1) - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); subInterior(ctx, t, cam, { light: 'dim' }); applyCam(ctx, cam, 1); const k = clamp((t - wt(6, 'three') + .1) / .6); const who = [savitsky, maslennikov, arkhipov]; for (let i = 0; i < 3; i++) if (k * 3 > i) who[i](ctx, { x: 200 + i * 340, y: 1500, s: 720, face: { eyes: i === 0 ? 'angry' : i === 1 ? 'normal' : 'half', mouth: 'flat', look: [0, 0] }, arms: POSE.idle.arms }); text(ctx, '3', 540, 330, 200, '#ffd23a', INK, 24); text(ctx, '3', 540, 330, 200, '#ffd23a', INK, 0); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.06, dz: .04 }); subInterior(ctx, t, cam, { light: 'red' }); savitsky(ctx, { x: 420, y: 2250, s: 1700, face: { eyes: 'angry', mouth: 'grin' }, sweat: true }); applyCam(ctx, cam, 1); voteCard(ctx, 860, 560, 300, 360, 'CAPTAIN', 'yes', (t - wt(6, 'yes') + .1) / .3); }
  else { const cam = camA(t, lt, { z: 1.06, dz: .04 }); subInterior(ctx, t, cam, { light: 'red' }); maslennikov(ctx, { x: 420, y: 2250, s: 1700, face: { eyes: 'normal', mouth: 'flat', look: [1, 0] }, sweat: true }); applyCam(ctx, cam, 1); voteCard(ctx, 860, 560, 300, 360, 'POLITICAL', 'yes', (t - wt(6, 'yes', 1) + .1) / .3); }
  vig(ctx, .5);
} });
// [7] you say no
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.14 + lt * .04, dz: 0, shake: 1 }); subInterior(ctx, t, cam, { light: 'red', swing: .02 }); arkhipov(ctx, { x: 520, y: 2400, s: 2050, face: { eyes: 'half', mouth: 'flat', look: [.5, 0], brow: -.2 }, sweat: true }); applyCam(ctx, cam, 1); voteCard(ctx, 860, 520, 280, 340, 'ARKHIPOV', 'no', (t - wt(7, 'no') + .1) / .25); vig(ctx, .6);
} });
// [8] you argue, calm him down; the sub rises, surrounded by American ships
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(8, 'finally') - .1, wt(8, 'surrounded') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.04, dz: .03 }); subInterior(ctx, t, cam, { light: 'dim' }); const calm = t > wt(8, 'calm') - .1; savitsky(ctx, { x: 720, y: 1800, s: 1150, flip: -1, arms: calm ? { L: [2.6, -1.6], R: [2.6, -1.6] } : { L: [.3, -.1], R: [1.6, .2] }, face: calm ? { eyes: 'closed', mouth: 'frown' } : { eyes: 'angry', mouth: 'shout' }, sweat: true }); arkhipov(ctx, { x: 300, y: 1800, s: 1150, arms: { L: [.3, -.1], R: { ik: [.4, -.62] } }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] }, sweat: true }); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); deepSea(ctx, t, cam, { night: true, surface: 300 }); const k = ease(clamp((t - wt(8, 'rises') + .3) / 1.6)); subHull(ctx, 540, lerp(1300, 330, k), 900, t); for (let i = 0; i < 10; i++) { const r = rng(i + 1); circle(ctx, 300 + r() * 500, lerp(1400, 400, k) + r() * 200 - ((t * 200) % 200), 8 + r() * 10); ctx.fillStyle = 'rgba(200,240,255,.5)'; ctx.fill(); } }
  else { const cam = camA(t, lt, { z: 1.0, dz: .03 }); nightSurface(ctx, t, cam); applyCam(ctx, cam, 1); subHull(ctx, 540, 1060, 760, t); for (const [x, y, s, f] of [[160, 900, 420, 1], [920, 880, 380, -1], [200, 1300, 560, 1], [900, 1320, 600, -1]]) { destroyer(ctx, x, y, s, t, f); searchlight(ctx, x, y - s * .2, Math.atan2(1060 - (y - s * .2), 540 - x), 700, t); } }
  vig(ctx, .5);
} });
// [9] back home, no hero; "better if you'd gone down with your ship"
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(9, 'one') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .03 }); moscowRoom(ctx, t, cam); applyCam(ctx, cam, 1); admiralR(ctx, { x: 760, y: 1650, s: 980, flip: -1, arms: POSE.hips.arms }); arkhipov(ctx, { x: 300, y: 1680, s: 980, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }); chapterTag(ctx, t, S(9) + .05, 'MOSCOW'); }
  else { const cam = camA(t, lt, { z: 1.1, dz: .05 }); moscowRoom(ctx, t, cam); admiralR(ctx, { x: 560, y: 2250, s: 1750, arms: { L: [.2, -.1], R: [1.6, .3] }, face: { eyes: 'angry', mouth: 'frown', moustache: '#9a9a9a', look: [-1, 0] } }); }
  vig(ctx, .5);
} });
// [10] secret for forty years; died 1998
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(10, 'die') - .3);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .05 }); archive(ctx, t, cam); applyCam(ctx, cam, 1); paperDoc(ctx, 540, 1000, 560, -.05, 'B-59 · 27.10.1962', { stamp: 'SECRET' }); }
  else { const cam = camA(t, lt, { z: 1.02, dz: .04 }); graveSnow(ctx, t, cam); applyCam(ctx, cam, 1); stoneGrave(ctx, 540, 1180, 460, 560, ['V. ARKHIPOV', '1926 – 1998']); chapterTag(ctx, t, wt(10, '1998') - .1, '1998'); }
  vig(ctx, .45);
} });
// [11] 2002: it comes out; a historian: "Vasili Arkhipov saved the world"
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(11, 'and') - .1, wt(11, 'guy') - .4);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); conference(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 6; i++) person(ctx, { x: 100 + i * 180, y: 1700, s: 560, coat: ['#4a4a52', '#5a3a3a', '#3a4a5a'][i % 3], hair: i % 2 ? 'side' : 'crop', hairCol: ['#b8b8b8', '#4a3a2a', '#8a6a4a'][i % 3], flip: 1, face: { eyes: 'wide', mouth: 'o', look: [0, -1] } }); for (let i = 0; i < 3; i++) if (Math.sin(t * 7 + i * 2) > .9) burst(ctx, 200 + i * 340, 700, 80, 8, '#ffffff', 2); chapterTag(ctx, t, S(11) + .05, 'HAVANA, 2002'); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.06, dz: .04 }); conference(ctx, t, cam); applyCam(ctx, cam, 1); historian(ctx, { x: 540, y: 1600, s: 1100, arms: { L: { ik: [-.25, -.4] }, R: { ik: [.25, -.4] } }, face: { eyes: 'normal', mouth: t > wt(11, 'says') ? 'o' : 'flat' } }); podium(ctx, 540, 1600, 560); }
  else { const cam = camA(t, lt, { z: 1.02 + lt * .03, dz: 0 }); bgFlat(ctx, '#e8b878', '#7a4a2a'); applyCam(ctx, cam, 1); glow(ctx, 540, 700, 900, 'rgba(255,240,200,', .45); for (let i = 0; i < 14; i++) { ctx.save(); ctx.globalAlpha = .08; ctx.translate(540, 700); ctx.rotate(i / 14 * TAU + t * .1); path(ctx, [[0, 0], [-70, -1500], [70, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); } arkhipov(ctx, { x: 540, y: 2250, s: 1700, face: { eyes: 'half', mouth: 'smile', look: [0, 0] } }); }
  vig(ctx, .45);
} });
