// ---------- "The man who sold the Eiffel Tower twice" (portrait Short) ----------
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
const TW = { x: 760, y: 1100, h: 560 };
// [0] in 1925 a man sold the Eiffel Tower, then tried to sell it again
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); parisBG(ctx, t, cam, { sun: [900, 320] }); applyCam(ctx, cam, .5); eiffel(ctx, 760, 1180, 760); applyCam(ctx, cam, 1);
  lustig(ctx, { x: 260, y: G + 160, s: 560, arms: { L: [.3, -.1], R: { ik: [.42, -.5] } }, face: { eyes: 'happy', mouth: 'smug', look: [1, 0] } });
  poisson(ctx, { x: 620, y: G + 180, s: 520, flip: -1, arms: { L: [.3, -.1], R: { ik: [.4, -.5] } }, face: { eyes: 'happy', mouth: 'grin', look: [-1, 0] } });
  forgedDoc(ctx, 440, G - 120, 150, -.2);
  const ag = t > wt(0, 'again') - .2; stamp(ctx, 540, 640, ag ? 'SOLD AGAIN?!' : 'SOLD', cue(t, ag ? wt(0, 'again') - .15 : wt(0, 'sold') - .1, .2), '#e0392f', -.12);
  chapterTag(ctx, t, .05, 'PARIS, 1925');
} });
// [1] Lustig read the tower was rusting and costing a fortune
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const rust = t > wt(1, 'rusting') - .3;
  if (!rust) { bgRoom(ctx, t, cam, { wall: '#c8b89a', floor: '#7a5a3a' }); applyCam(ctx, cam, 1); lustig(ctx, { x: 540, y: G + 160, s: 620, arms: { L: { ik: [-.25, -.55] }, R: { ik: [.25, -.55] } }, face: { eyes: 'squint', mouth: 'smirk', look: [0, 1] } }); rrect(ctx, 360, G + 160 - .7 * 620, 360, 220, 6); fillStroke(ctx, '#f2ecdc', 6); text(ctx, 'LE JOURNAL', 540, G + 160 - .7 * 620 + 40, 44, '#2a2a2a', INK, 0); text(ctx, 'TOWER RUSTING!', 540, G + 160 - .7 * 620 + 110, 38, '#c8322c', INK, 0); label(ctx, 'VICTOR LUSTIG', 540, 240, 110, t, wt(1, 'victor') - .2, '#ffd23a'); label(ctx, 'CON MAN', 540, 370, 80, t, wt(1, 'con') - .2, '#ffffff'); }
  else { parisBG(ctx, t, cam, { top: '#8aa0b8', bot: '#d8d0c8' }); applyCam(ctx, cam, 1); eiffel(ctx, 540, G, 820, { col: '#7a4a2a' }); for (let i = 0; i < 12; i++) { const r = rng(i * 5 + 1); circle(ctx, 400 + r() * 280, 500 + r() * 700, 14 + r() * 14); ctx.fillStyle = 'rgba(200,90,30,.85)'; ctx.fill(); } for (let i = 0; i < 6; i++) { const k = ((t * .7 + i / 6) % 1); banknote(ctx, 200 + i * 140, 400 + k * 800, 120, k * 4 + i); } label(ctx, 'RUSTING', 540, 240, 120, t, wt(1, 'rusting') - .3, '#c86a2a', wt(1, 'fortune') - .3); label(ctx, 'COSTING A FORTUNE', 540, 240, 84, t, wt(1, 'fortune') - .3, '#7ee08a'); }
} });
// [2] forged government papers, posed as a top official
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const off = t > wt(2, 'posed') - .2;
  if (!off) { bgRoom(ctx, t, cam, { night: true }); applyCam(ctx, cam, 1); drawDesk(ctx, 640, G - 40, 620); const st = Math.max(0, Math.sin(t * 8)); forgedDoc(ctx, 640, G - 260, 260, 0, clamp((t - S(2) - .6) / .3)); lustig(ctx, { x: 280, y: G + 160, s: 580, arms: { L: [.3, -.1], R: { ik: [.5, -.6 + st * .08] } }, face: { eyes: 'squint', mouth: 'smirk', look: [1, 1] } }); drawLantern(ctx, 900, 820, 1.2, 1, t); label(ctx, 'FORGED PAPERS', 540, 240, 104, t, wt(2, 'forged') - .2, '#ffd23a'); }
  else { bgFlat(ctx, '#2a4aa8', '#12245a'); applyCam(ctx, cam, 1); lustig(ctx, { x: 540, y: G + 200, s: 760, arms: POSE.hips.arms, face: { eyes: 'happy', mouth: 'smug' } }, true); label(ctx, 'TOP OFFICIAL', 540, 260, 120, t, wt(2, 'official') - .3, '#ffffff'); }
} });
// [3] five scrap dealers in a fancy hotel; the city will sell the tower for scrap
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); const scrap = t > wt(3, 'scrap', 1) - .3;
  if (!scrap) { hotelRoom(ctx, t, cam); lustig(ctx, { x: 540, y: 1040, s: 420, arms: { L: [.3, -.1], R: [1.3, -.6] }, face: { eyes: 'squint', mouth: 'smirk' } }, true); grandTable(ctx, 540, 1080, 800); for (let i = 0; i < 5; i++) dealer(ctx, { x: 160 + i * 190, y: G + 40 - (i % 2) * 60, s: 360, flip: i > 2 ? -1 : 1, arms: POSE.idle.arms, face: { eyes: t > wt(3, 'secret') - .2 ? 'wide' : 'normal', mouth: t > wt(3, 'secret') - .2 ? 'o' : 'flat', look: [0, -1] } }, i); chapterTag(ctx, t, S(3) + .05, 'HÔTEL DE CRILLON'); label(ctx, '5 SCRAP DEALERS', 540, 240, 96, t, wt(3, 'five') - .2, '#ffffff', wt(3, 'secret') - .2); label(ctx, 'A SECRET...', 540, 240, 120, t, wt(3, 'secret') - .2, '#ffd23a'); }
  else { parisBG(ctx, t, cam, { top: '#8aa0b8', bot: '#d8d0c8' }); applyCam(ctx, cam, 1); const k = ease(clamp((t - wt(3, 'scrap', 1) + .3) / 1)); ctx.save(); ctx.globalAlpha = 1 - k; eiffel(ctx, 540, G, 820); ctx.restore(); scrapPile(ctx, 540, G, 400 * k + 1); label(ctx, 'SOLD FOR SCRAP', 540, 240, 104, t, wt(3, 'scrap', 1) - .3, '#c86a2a'); }
} });
// [4] one dealer, André Poisson, wanted it badly
SHOTS.push({ start: S(4), end: S(5), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .05 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 10; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 900); ctx.rotate(i / 10 * TAU + t * .3); path(ctx, [[0, 0], [-90, -1400], [90, -1400]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  poisson(ctx, { x: 540, y: G + 220, s: 780, arms: { L: [2.3, .4], R: [2.3, .4] }, face: { eyes: 'happy', mouth: 'grin' } }); eiffel(ctx, 880, 700, 260); for (let i = 0; i < 3; i++) drawHeart(ctx, 760 + i * 90, 420 + Math.sin(t * 4 + i) * 20, 40);
  label(ctx, 'ANDRÉ POISSON', 540, 240, 110, t, wt(4, 'andr') - .2, '#ffffff', wt(4, 'wanted') - .2); label(ctx, 'WANTS IT', 540, 240, 130, t, wt(4, 'wanted') - .2, '#c8322c');
} });
// [5] Poisson got suspicious; Lustig "confessed" he was corrupt and wanted a bribe
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .03 }); hotelRoom(ctx, t, cam); const conf = t > wt(5, 'confessed') - .2;
  poisson(ctx, { x: 760, y: G + 160, s: 600, flip: -1, arms: POSE.hips.arms, face: conf ? { eyes: 'wide', mouth: 'o', look: [-1, 0] } : { eyes: 'squint', mouth: 'flat', look: [-1, 0] } });
  lustig(ctx, { x: 280, y: G + 160, s: 600, lean: conf ? .12 : 0, arms: conf ? { L: [.3, -.1], R: [1.5, .9] } : POSE.idle.arms, face: conf ? { eyes: 'squint', mouth: 'smirk', look: [1, 0] } : { eyes: 'wide', mouth: 'flat', look: [1, 0] } }, true);
  if (!conf) qmark(ctx, 820, 560, 120, '#ffd23a'); else if (t > wt(5, 'bribe') - .3) speech2(ctx, 380, 560, 420, 160, 'a little bribe?', 50, -1);
  label(ctx, 'SUSPICIOUS', 540, 240, 120, t, wt(5, 'suspicious') - .2, '#ff9a5a', wt(5, 'confessed') - .2); label(ctx, '"I\'M CORRUPT"', 540, 240, 110, t, wt(5, 'confessed') - .2, '#ffd23a');
} });
// [6] that made him believable; Poisson paid; Lustig fled to Austria with a suitcase of cash
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const flee = t > wt(6, 'fled') - .3;
  if (!flee) { hotelRoom(ctx, t, cam); poisson(ctx, { x: 760, y: G + 160, s: 600, flip: -1, arms: { L: [.3, -.1], R: { ik: [.45, -.5] } }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }); lustig(ctx, { x: 280, y: G + 160, s: 600, arms: { L: [.3, -.1], R: { ik: [.45, -.5] } }, face: { eyes: 'happy', mouth: 'grin', look: [1, 0] } }, true); for (let i = 0; i < 4; i++) banknote(ctx, 470 + i * 40, 880 - i * 20, 130, -.2 + i * .1); label(ctx, 'BELIEVABLE', 540, 240, 120, t, wt(6, 'believable') - .3, '#ffffff', wt(6, 'paid') - .2); label(ctx, 'PAID!', 540, 240, 140, t, wt(6, 'paid') - .2, '#7ee08a'); }
  else { bgDay(ctx, t * 3, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(6, 'fled') + .3) / 2); train(ctx, 640 + k * 300, GY + 300, 520, t); lustig(ctx, { x: 220 + k * 200, y: G + 200, s: 460, lean: .15, arms: { L: [.3, -.1], R: [2.4, .3] }, legs: { L: [.6 * Math.sin(t * 14), -.3], R: [-.6 * Math.sin(t * 14), -.3] }, face: { eyes: 'happy', mouth: 'grin' } }); suitcase(ctx, 140 + k * 200, G + 120, 180, 1, t); label(ctx, '→ AUSTRIA', 540, 240, 120, t, wt(6, 'austria') - .3, '#ffd23a'); }
} });
// [7] Poisson was too embarrassed to go to the police
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); bgCity(ctx, t, cam); applyCam(ctx, cam, 1);
  rrect(ctx, 640, 640, 360, 600, 10); fillStroke(ctx, '#2a3a6a', 7); text(ctx, 'POLICE', 820, 700, 60, '#ffffff', INK, 0); rrect(ctx, 720, 780, 200, 460, 6); fillStroke(ctx, '#5a3a22', 6);
  poisson(ctx, { x: 360, y: G + 200, s: 600, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'half', mouth: 'frown' }, blush: true });
  label(ctx, 'TOO EMBARRASSED', 540, 240, 96, t, wt(7, 'embarrassed') - .3, '#ff9ab0');
} });
// [8] so Lustig came back and ran the same scam again
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); hotelRoom(ctx, t, cam); lustig(ctx, { x: 540, y: 1040, s: 420, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'happy', mouth: 'smug' } }, true); grandTable(ctx, 540, 1080, 800);
  for (let i = 0; i < 5; i++) dealer(ctx, { x: 160 + i * 190, y: G + 40 - (i % 2) * 60, s: 360, flip: i > 2 ? -1 : 1, arms: POSE.idle.arms, face: { eyes: 'wide', mouth: 'o', look: [0, -1] } }, i + 1);
  stamp(ctx, 540, 520, 'AGAIN!', cue(t, wt(8, 'again') - .2, .2), '#e0392f', -.1); label(ctx, 'HE CAME BACK', 540, 240, 110, t, wt(8, 'came') - .2, '#ffd23a');
} });
// [9] a dealer called the police; Lustig slipped away just in time
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 5 }); const esc = t > wt(9, 'slipped') - .3;
  hotelRoom(ctx, t, cam); applyCam(ctx, cam, 1);
  if (!esc) { gendarme(ctx, { x: 760, y: G + 160, s: 600, flip: -1, arms: { L: [.3, -.1], R: [2.6, .2] }, face: { eyes: 'squint', mouth: 'teeth' } }); dealer(ctx, { x: 360, y: G + 180, s: 520, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'wide', mouth: 'o', look: [1, 0] } }, 0); label(ctx, 'POLICE!', 540, 240, 140, t, wt(9, 'police') - .3, '#4a7ae0'); }
  else { const k = clamp((t - wt(9, 'slipped') + .3) / 1.2); lustig(ctx, { x: 150 - k * 120, y: 840 - k * 60, s: 380, lean: -.3, arms: { L: [2.6, .2], R: [2.4, .3] }, legs: { L: [.8, -.4], R: [.2, -.2] }, face: { eyes: 'wide', mouth: 'grin' } }, true); gendarme(ctx, { x: 700, y: G + 160, s: 560, flip: -1, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'x', mouth: 'o' } }); label(ctx, 'JUST IN TIME', 540, 240, 120, t, wt(9, 'just') - .3, '#ffd23a'); }
} });
// [10] he finally ended up in Alcatraz, for printing fake money
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); const cell = t > wt(10, 'printing') - .3;
  if (!cell) { alcatraz(ctx, t, cam); label(ctx, 'ALCATRAZ', 540, 260, 140, t, wt(10, 'alcatraz') - .3, '#ffffff'); }
  else { bgFlat(ctx, '#5a5a6a', '#2a2a34'); applyCam(ctx, cam, 1); lustig(ctx, { x: 540, y: G + 160, s: 640, cols: ['#e8e8e8', '#2a2a34'], arms: { L: [.3, -.1], R: { ik: [.4, -.5] } }, face: { eyes: 'half', mouth: 'smirk' } }); banknote(ctx, 540 + .4 * 640 + 60, G + 160 - .5 * 640, 160, -.2, 'FAKE'); bars(ctx, 120, 960, 420, 1400); label(ctx, 'FAKE MONEY', 540, 260, 120, t, wt(10, 'fake') - .3, '#7ee08a'); }
} });
