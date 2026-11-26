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
// [0] 1859, America and Britain almost went to war. Over one pig.
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const p = t > wt(0, 'over') - .15; const cam = camA(t, lt, { z: p ? 1.12 : 1.0, dz: .03, shake: p ? 3 : 4 }); islandBG(ctx, t, cam); applyCam(ctx, cam, 1);
  if (!p) { flagUS(ctx, 60, 520, 180, t); flagUK(ctx, 840, 520, 180, t); yank(ctx, { x: 200, y: G + 170, s: 520, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'squint', mouth: 'teeth', look: [1, 0] } }); musket(ctx, 200 + .2 * 520, G + 170 - .5 * 520, 300, -.1); redcoat(ctx, { x: 880, y: G + 170, s: 520, flip: -1, arms: { L: [.3, -.1], R: [1.6, .3] }, face: { eyes: 'squint', mouth: 'teeth', look: [-1, 0] } }); ctx.save(); ctx.translate(880 - .2 * 520, G + 170 - .5 * 520); ctx.scale(-1, 1); musket(ctx, 0, 0, 300, -.1); ctx.restore(); label(ctx, 'USA', 260, 720, 80, t, wt(0, 'america') - .2, '#4a7ae0'); label(ctx, 'BRITAIN', 820, 720, 80, t, wt(0, 'britain') - .2, '#e0392f'); label(ctx, 'ALMOST WAR', 540, 260, 130, t, wt(0, 'war') - .2, '#ffd23a'); }
  else { pig(ctx, 500, G - 20, 2.2, t, { happy: true }); label(ctx, 'OVER ONE PIG', 540, 260, 130, t, wt(0, 'pig') - .2, '#ff9ab0'); }
  chapterTag(ctx, t, .05, '1859');
} });
// [1] San Juan Island: both claimed it; settlers side by side
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const side = t > wt(1, 'settlers') - .2;
  if (!side) { islandMap(ctx, t, cam, { hl: '#f2b04a' }); const k = backOut(clamp((t - wt(1, 'claimed') + .2) / .3)); if (k > 0) { ctx.save(); ctx.translate(530, 640); ctx.scale(k, k); flagUS(ctx, -60, -140, 90, t); ctx.restore(); ctx.save(); ctx.translate(640, 640); ctx.scale(k, k); flagUK(ctx, -30, -140, 90, t); ctx.restore(); } label(ctx, 'SAN JUAN ISLAND', 540, 150, 100, t, wt(1, 'san') - .2, '#ffffff', wt(1, 'claimed') - .2); label(ctx, 'BOTH CLAIMED IT', 540, 150, 100, t, wt(1, 'claimed') - .2, '#ffd23a'); }
  else { islandBG(ctx, t, cam); applyCam(ctx, cam, 1); line(ctx, 540, 1060, 540, 1500, 8, '#7a5236'); fence(ctx, 540, 540, 1240, 180); cutlar(ctx, { x: 270, y: G + 170, s: 560, arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }); hbcMan(ctx, { x: 810, y: G + 170, s: 560, flip: -1, arms: { L: [.3, -.1], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }); label(ctx, 'SIDE BY SIDE', 540, 260, 120, t, wt(1, 'side') - .2, '#ffffff'); }
} });
// [2] farmer Lyman Cutlar found a pig eating his potatoes; so he shot it
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const shot = wt(2, 'shot'); const cam = camA(t, lt, { z: 1.0, dz: .03, shake: t > shot && t < shot + .4 ? 14 : 3 }); islandBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const pot = t > wt(2, 'pig') - .2; potatoPatch(ctx, 420, 1040, 1150, pot ? clamp((t - wt(2, 'eating')) / 1.6) * .6 : 0);
  if (pot) pig(ctx, 760, G + 40, 1.4, t, { eat: t < shot, dead: t > shot + .1 ? easeOut(clamp((t - shot - .1) / .3)) : 0, flip: -1 });
  const ang = t > wt(2, 'so') - .2; cutlar(ctx, { x: 220, y: G + 180, s: 600, arms: ang ? { L: [1.3, -.4], R: [1.5, -.2] } : POSE.hips.arms, face: ang ? { eyes: 'squint', mouth: 'teeth', look: [1, 0] } : { eyes: pot ? 'wide' : 'normal', mouth: pot ? 'o' : 'smile', look: [1, 0] } });
  if (ang) musket(ctx, 220 + .22 * 600, G + 180 - .52 * 600, 340, 0, t > shot && t < shot + .3 ? 1 : 0);
  label(ctx, 'LYMAN CUTLAR', 540, 260, 110, t, wt(2, 'lyman') - .2, '#ffffff', wt(2, 'pig') - .2); label(ctx, 'EATING HIS POTATOES', 540, 260, 84, t, wt(2, 'pig') - .2, '#f2c86a', shot - .2); label(ctx, 'BANG!', 540, 260, 160, t, shot - .05, '#e0392f');
} });
// [3] the pig belonged to a British company. Cutlar offered $10, British wanted $100
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); islandBG(ctx, t, cam); applyCam(ctx, cam, 1);
  const off = t > wt(3, 'offered') - .2, hun = t > wt(3, 'wanted') - .1;
  hbcMan(ctx, { x: 790, y: G + 170, s: 600, flip: -1, arms: hun ? { L: [.3, -.1], R: [2.6, .2] } : POSE.hips.arms, face: hun ? { eyes: 'squint', mouth: 'teeth', look: [-1, 0] } : { eyes: 'wide', mouth: 'frown', look: [-1, 0] } });
  if (off) cutlar(ctx, { x: 260, y: G + 170, s: 600, arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: hun ? 'wide' : 'happy', mouth: hun ? 'o' : 'smile', look: [1, 0] } }); else { pig(ctx, 300, G + 60, 1.1, t, { dead: 1 }); }
  if (off) priceTag(ctx, 470, 720, 220, '$10', '#3aa35b'); if (hun) priceTag(ctx, 640, 520, 300, '$100', '#c8322c');
  label(ctx, 'BRITISH COMPANY', 540, 260, 104, t, wt(3, 'british') - .2, '#ffffff', wt(3, 'offered') - .2); label(ctx, 'HUDSON\'S BAY CO.', 540, 380, 70, t, wt(3, 'company') - .2, '#9ad89a', wt(3, 'offered') - .2);
} });
// [4] they threatened to arrest him; so the Americans sent in soldiers
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const sol = t > wt(4, 'americans') - .2; islandBG(ctx, t, cam); applyCam(ctx, cam, 1);
  if (!sol) { hbcMan(ctx, { x: 780, y: G + 170, s: 600, flip: -1, arms: { L: [.3, -.1], R: { ik: [.42, -.55] } }, face: { eyes: 'squint', mouth: 'smirk', look: [-1, 0] } }); warrant(ctx, 780 - .42 * 600, G + 170 - .6 * 600, 220, .1); cutlar(ctx, { x: 240, y: G + 170, s: 560, arms: POSE.handsUp.arms, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }); sweat(ctx, 290, G + 170 - .95 * 560, 40); label(ctx, 'ARREST HIM!', 540, 260, 120, t, wt(4, 'arrest') - .2, '#e0392f'); }
  else { const k = clamp((t - wt(4, 'americans') + .2) / 1.4); flagUS(ctx, 80 + k * 120, 560, 160, t); for (let i = 0; i < 4; i++) yank(ctx, { x: 120 + i * 210 + k * 120, y: G + 150 + (i % 2) * 40, s: 440, arms: { L: [.3, -.1], R: [.3, -.1] }, legs: { L: [.4 * Math.sin(t * 10 + i), -.2], R: [-.4 * Math.sin(t * 10 + i), -.2] }, face: { eyes: 'squint', mouth: 'flat' } }, i === 3); label(ctx, 'SOLDIERS', 540, 260, 130, t, wt(4, 'soldiers') - .2, '#4a7ae0'); label(ctx, 'CAPT. PICKETT', 540, 400, 70, t, wt(4, 'soldiers') + .2, '#ffffff'); }
} });
// [5] the British answered with warships
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .04 }); applyCam(ctx, cam, .08); drawSky(ctx, '#6a9ac8', '#e0e8ec', -400, 1300); applyCam(ctx, cam, .3); drawSea(ctx, 820, t, 2400, ['#6aa8c8', '#2a78a0', '#1a5a80']); applyCam(ctx, cam, 1);
  const k = easeOut(clamp((t - S(5)) / 1.6)); for (let i = 0; i < 3; i++) drawShip(ctx, 1300 - k * 700 + i * 280 - (i === 1 ? 140 : 0), 1080 + i * 80, .55 + i * .12, t, { hull: '#2a2a34', stripe: '#e8e8e8', flag: '#c8322c', ph: i });
  label(ctx, 'WARSHIPS', 540, 260, 140, t, wt(5, 'warships') - .2, '#e0392f');
} });
// [6] 400 American troops + 14 cannons vs 5 British warships with 2,000+ men
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); const uk = t > wt(6, 'faced') - .2;
  if (!uk) { islandBG(ctx, t, cam); applyCam(ctx, cam, 1); flagUS(ctx, 860, 480, 150, t); for (let r = 0; r < 3; r++) for (let i = 0; i < 6; i++) yank(ctx, { x: 120 + i * 150 + r * 50, y: 1080 + r * 90, s: 220 + r * 40, arms: POSE.idle.arms, face: { eyes: 'squint', mouth: 'flat' } }); const nc = Math.floor(clamp((t - wt(6, '14') + .1) / .8) * 4); for (let i = 0; i < nc; i++) drawCannon(ctx, 170 + i * 250, 1430, .6, -.15); const n = Math.round(400 * clamp((t - wt(6, '400') + .2) / .6)); label(ctx, n + ' TROOPS', 540, 260, 120, t, wt(6, '400') - .2, '#4a7ae0'); label(ctx, '14 CANNONS', 540, 400, 90, t, wt(6, '14') - .2, '#ffffff'); }
  else { applyCam(ctx, cam, .08); drawSky(ctx, '#6a9ac8', '#e0e8ec', -400, 1300); applyCam(ctx, cam, .3); drawSea(ctx, 760, t, 2400, ['#6aa8c8', '#2a78a0', '#1a5a80']); applyCam(ctx, cam, 1); for (let i = 0; i < 5; i++) drawShip(ctx, 120 + (i % 3) * 400 + (i > 2 ? 200 : 0), 960 + (i > 2 ? 260 : 0), .42 + (i > 2 ? .12 : 0), t, { hull: '#2a2a34', stripe: '#e8e8e8', flag: '#c8322c', ph: i }); const n = Math.round(2000 * clamp((t - wt(6, '2000') + .2) / .6)); label(ctx, '5 WARSHIPS', 540, 260, 120, t, wt(6, 'five') - .2, '#e0392f'); label(ctx, n.toLocaleString('en-US') + '+ MEN', 540, 400, 100, t, wt(6, '2000') - .2, '#ffffff'); }
} });
// [7] British governor wanted to land troops and fight
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, shake: 5 }); bgFlat(ctx, '#c84a3a', '#6a1a1a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 12; i++) { ctx.save(); ctx.globalAlpha = .15; ctx.translate(540, 760); ctx.rotate(i / 12 * TAU + t * .4); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  governor(ctx, { x: 540, y: G + 200, s: 760, lean: Math.sin(t * 10) * .03, arms: { L: [.9, -2.2], R: [2.6, .1] }, face: { eyes: 'squint', mouth: 'teeth' } });
  label(ctx, 'THE GOVERNOR', 540, 260, 110, t, wt(7, 'governor') - .2, '#ffffff', wt(7, 'fight') - .2); label(ctx, 'FIGHT!', 540, 260, 170, t, wt(7, 'fight') - .2, '#ffd23a');
} });
// [8] the admiral refused: no war between two great nations over a pig
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const p = t > wt(8, 'over') - .2; islandBG(ctx, t, cam, { sun: false }); applyCam(ctx, cam, 1);
  admiral(ctx, { x: 360, y: G + 180, s: 640, arms: { L: [1.4, -2.3], R: [1.4, -2.3] }, face: p ? { eyes: 'squint', mouth: 'smirk', look: [1, 0] } : { eyes: 'half', mouth: 'flat', look: [1, 0] } });
  if (t > wt(8, 'saying') - .2) speech2(ctx, 760, 520, 500, 170, p ? 'over a PIG?' : 'no war.', 60, -1);
  if (p) pig(ctx, 820, G + 60, 1.2, t, { happy: true, flip: -1 });
  if (t < wt(8, 'saying') - .2) stamp(ctx, 740, 640, 'REFUSED', cue(t, wt(8, 'refused') - .1, .2), '#e0392f', -.12); label(ctx, 'THE ADMIRAL', 540, 260, 120, t, wt(8, 'admiral') - .2, '#ffffff', wt(8, 'refused') - .1); label(ctx, 'TWO GREAT NATIONS', 540, 260, 90, t, wt(8, 'two') - .2, '#ffd23a', wt(8, 'over') - .2);
} });
function speech2(ctx, x, y, w, h, str, size, tail = -1) { rrect(ctx, x - w / 2, y - h / 2, w, h, 28); fillStroke(ctx, '#ffffff', 6); path(ctx, [[x + tail * w * .1, y + h / 2 - 3], [x + tail * w * .28, y + h / 2 + 50], [x + tail * w * .26 - tail * 50, y + h / 2 - 3]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); text(ctx, str, x, y, size, '#2a1a1a', INK, 0); }
// [9] both armies stayed 12 years without firing a shot
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); islandBG(ctx, t, cam); applyCam(ctx, cam, 1);
  campfire(ctx, 540, G - 30, 160, t);
  yank(ctx, { x: 260, y: G + 170, s: 520, arms: { L: [.3, -.1], R: { ik: [.4, -.5] } }, face: { eyes: 'happy', mouth: 'grin', look: [1, 0] } }); redcoat(ctx, { x: 820, y: G + 170, s: 520, flip: -1, arms: { L: [.3, -.1], R: { ik: [.4, -.5] } }, face: { eyes: 'happy', mouth: 'grin', look: [-1, 0] } });
  const yr = 1860 + Math.floor(12 * clamp((t - wt(9, '12') + .2) / 1.4)); if (t > wt(9, '12') - .3) calFlip(ctx, 540, 560, 260, Math.min(1872, yr));
  label(ctx, 'BOTH ARMIES STAYED', 540, 260, 90, t, wt(9, 'both') - .2, '#ffffff', wt(9, '12') - .3); label(ctx, '12 YEARS', 540, 260, 130, t, wt(9, '12') - .3, '#ffd23a', wt(9, 'without') - .2); label(ctx, '0 SHOTS FIRED', 540, 260, 110, t, wt(9, 'without') - .2, '#7ee08a');
} });
// [10] 1872: the German Kaiser settled it; island went to America; only casualty was the pig
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(10, 'island') - .2 ? 0 : t < wt(10, 'and') - .2 ? 1 : 2;
  if (ph === 0) { bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#6a4a2a' }); applyCam(ctx, cam, 1); drawDesk(ctx, 760, G - 40, 440); kaiser(ctx, { x: 330, y: G + 180, s: 640, arms: { L: [.3, -.1], R: [2.2, .3] }, face: { eyes: 'squint', mouth: 'flat' } }); const k = clamp((t - wt(10, 'settled')) / .2); gavel(ctx, 820, G - 240, 260, k); if (k >= 1 && t < wt(10, 'settled') + .4) burst(ctx, 760, G - 240, 140, 10, '#ffd23a', 2); label(ctx, 'THE KAISER', 540, 260, 120, t, wt(10, 'kaiser') - .3, '#ffffff', wt(10, 'settled') - .2); label(ctx, 'SETTLED', 540, 260, 140, t, wt(10, 'settled') - .2, '#ffd23a'); chapterTag(ctx, t, S(10) + .05, '1872'); }
  else if (ph === 1) { islandMap(ctx, t, cam, { hl: '#9ac8f0' }); const k = backOut(clamp((t - wt(10, 'island') + .2) / .3)); ctx.save(); ctx.translate(580, 700); ctx.scale(k * 1.4, k * 1.4); flagUS(ctx, -40, -150, 110, t); ctx.restore(); label(ctx, '→ USA', 540, 150, 130, t, wt(10, 'america') - .3, '#4a7ae0'); }
  else { islandBG(ctx, t, cam, { top: '#f2b07a', bot: '#f8e0c0', sun: false }); applyCam(ctx, cam, 1); pigGrave(ctx, 540, G - 20, 420); pig(ctx, 640, 640 + Math.sin(t * 2) * 20, 1.1, t, { halo: true, happy: true, flip: -1 }); label(ctx, 'ONLY CASUALTY', 540, 260, 110, t, wt(10, 'only') - .2, '#ffffff', wt(10, 'pig') - .2); label(ctx, 'THE PIG', 540, 260, 140, t, wt(10, 'pig') - .2, '#ff9ab0'); }
} });
