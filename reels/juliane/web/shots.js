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
const walk = (t, a = .4) => ({ L: [.1 + Math.sin(t * 6) * a, -.15], R: [.1 - Math.sin(t * 6) * a, -.15] });
// [0] 1971: 17-year-old fell 3 km and lived
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); applyCam(ctx, cam, .08); drawSky(ctx, '#4a90d8', '#dceefa', -400, 1900); applyCam(ctx, cam, 1); for (let i = 0; i < 4; i++) drawCloud(ctx, ((i * 330 - t * 300) % 1400 + 1400) % 1400 - 200, 300 + i * 380, 120, i); canopyTop(ctx, t, cam, { y: 1500 });
  ctx.save(); ctx.translate(540, 820 + Math.sin(t * 3) * 20); ctx.rotate(Math.sin(t * 1.5) * .2); seatRow(ctx, 0, 0, 380); juliane(ctx, { x: 0, y: 10, s: 360, shadow: false, arms: { L: [2.6, -.6], R: [2.6, -.6] }, legs: { L: [1.4, -1.4], R: [1.4, -1.4] }, face: { eyes: 'wide', mouth: 'o' } }); ctx.restore();
  for (let i = 0; i < 5; i++) line(ctx, 380 + i * 80, 1100 - ((t * 900 + i * 90) % 400), 380 + i * 80, 1180 - ((t * 900 + i * 90) % 400), 5, 'rgba(255,255,255,.6)');
  chapterTag(ctx, t, .05, '1971'); label(ctx, 'AGE 17', 540, 260, 150, t, wt(0, '17') - .2, '#ffffff', wt(0, '3') - .2); label(ctx, 'FELL 3 KM', 540, 260, 150, t, wt(0, '3') - .2, '#ffd23a', wt(0, 'lived') - .2); label(ctx, '...AND LIVED', 540, 260, 140, t, wt(0, 'lived') - .2, '#4ad06a');
} });
// [1] Christmas Eve, Juliane and mother board flight over the rainforest
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(1, 'boarded') - .1 ? 0 : 1;
  if (ph === 0) { cabin(ctx, t, cam); applyCam(ctx, cam, 1); xmasTree(ctx, 900, G + 160, 260); juliane(ctx, { x: 360, y: G + 200, s: 620, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'happy', mouth: 'smile' } }); mother(ctx, { x: 620, y: G + 200, s: 660, flip: -1, arms: { L: [.3, -.1], R: [1.4, .3] }, face: { eyes: 'happy', mouth: 'smile', look: [-1, 0] } }); chapterTag(ctx, t, S(1) + .05, '24 DECEMBER 1971'); label(ctx, 'CHRISTMAS EVE', 540, 260, 124, t, wt(1, 'christmas') - .2, '#ffffff', wt(1, 'juliane') - .1); label(ctx, 'JULIANE KOEPCKE', 540, 260, 106, t, wt(1, 'juliane') - .1, '#ff8ab0'); }
  else { peruMap(ctx, t, cam, { k: clamp((t - wt(1, 'boarded')) / 2.2) * .55, plane: true }); applyCam(ctx, cam, 1); label(ctx, 'OVER THE RAINFOREST', 540, 260, 92, t, wt(1, 'peruvian') - .3, '#4ad06a'); }
} });
// [2] halfway: huge thunderstorm
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 6 }); const fl = Math.sin(t * 3.3) > .93 ? .6 : 0; stormSky(ctx, t, cam, { flash: fl }); applyCam(ctx, cam, 1); electra(ctx, 540, 900 + Math.sin(t * 4) * 30, 900, t, { rot: Math.sin(t * 2.6) * .08 }); if (fl) bolt(ctx, 200, 200, 300, 900, Math.floor(t * 3), 10);
  label(ctx, 'HALFWAY', 540, 260, 150, t, wt(2, 'halfway') - .2, '#ffffff', wt(2, 'huge') - .2); label(ctx, 'THUNDERSTORM', 540, 260, 124, t, wt(2, 'huge') - .2, '#9ad8ff');
} });
// [3] lightning hit, broke apart
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const h = cue(t, wt(3, 'hit') - .1, .15), b = clamp((t - wt(3, 'broke')) / 1.4); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: h > 0 ? 16 : 4 }); stormSky(ctx, t, cam, { flash: h * (1 - clamp((t - wt(3, 'hit')) / .6)) }); applyCam(ctx, cam, 1);
  if (b <= 0) { electra(ctx, 540, 900, 900, t); if (h > 0 && t < wt(3, 'hit') + .5) bolt(ctx, 420, -100, 560, 880, 7, 18); }
  else { ctx.save(); ctx.beginPath(); ctx.rect(-200, -400, 760, 2600); ctx.clip(); electra(ctx, 540 - b * 200, 900 + b * 300, 900, t, { rot: -b * .6 }); ctx.restore(); ctx.save(); ctx.beginPath(); ctx.rect(560, -400, 1000, 2600); ctx.clip(); electra(ctx, 540 + b * 220, 900 + b * 260, 900, t, { rot: b * .7 }); ctx.restore(); for (let i = 0; i < 10; i++) { const r = rng(i + 2); rrect(ctx, 540 + (r() - .5) * 600 * b, 900 + r() * 500 * b, 30, 20, 4); fillStroke(ctx, '#c8ccd4', 4); } burst(ctx, 550, 900, 160 * (1 - b * .5), 12, '#ffb43a', 3); }
  label(ctx, 'LIGHTNING', 540, 260, 150, t, wt(3, 'lightning') - .2, '#ffffff', wt(3, 'broke') - .1); label(ctx, 'BROKE APART', 540, 260, 140, t, wt(3, 'broke') - .1, '#e0392f');
} });
// [4] strapped in her row of seats, falling
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 5 }); applyCam(ctx, cam, .08); drawSky(ctx, '#3a4a5a', '#8a9aa8', -400, 1900); applyCam(ctx, cam, 1); for (let i = 0; i < 6; i++) { const y = ((i * 340 - t * 1200) % 2100 + 2100) % 2100 - 200; drawCloud(ctx, (i * 230) % 1080, y, 100, i); }
  ctx.save(); ctx.translate(540, 900); ctx.rotate(t * 1.3); seatRow(ctx, 0, 0, 480); juliane(ctx, { x: 0, y: 10, s: 440, shadow: false, arms: { L: [2.6, -.6], R: [2.6, -.6] }, legs: { L: [1.4, -1.4], R: [1.4, -1.4] }, face: { eyes: 'closed', mouth: 'o' } }); ctx.restore();
  label(ctx, 'STRAPPED IN', 540, 260, 140, t, wt(4, 'strapped') - .2, '#ffffff', wt(4, 'falling') - .1); label(ctx, 'FALLING', 540, 260, 160, t, wt(4, 'falling') - .1, '#ffd23a');
} });
// [5] crashed through trees, woke next day on the jungle floor
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); const ph = t < wt(5, 'and') - .1 ? 0 : 1;
  if (ph === 0) { jungle(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - S(5)) / 1.4); for (let i = 0; i < 14; i++) { const r = rng(i + 9); ctx.save(); ctx.translate(540 + (r() - .5) * 500, 200 + k * 900 * r()); ctx.rotate(t * 4 + i); ctx.beginPath(); ctx.ellipse(0, 0, 30, 14, 0, 0, TAU); fillStroke(ctx, '#3a8a3a', 4); ctx.restore(); } ctx.save(); ctx.translate(540, lerp(-100, 1100, k)); ctx.rotate(.6); seatRow(ctx, 0, 0, 380); ctx.restore(); label(ctx, 'THROUGH THE TREES', 540, 260, 100, t, wt(5, 'crashed') - .2, '#ffffff'); }
  else { jungle(ctx, t, cam, { top: '#7aa07a' }); applyCam(ctx, cam, 1); seatRow(ctx, 760, 1220, 360, .3); const k = cue(t, wt(5, 'woke') - .1, .8); juliane(ctx, { x: 420, y: G + 200, s: 560, lean: lerp(1.45, .3, k), arms: { L: [.5, -.4], R: [1.2, -.3] }, face: { eyes: k > .5 ? 'half' : 'closed', mouth: 'flat' } }); label(ctx, 'THE NEXT DAY', 540, 260, 130, t, wt(5, 'next') - .2, '#ffffff', wt(5, 'jungle') - .1); label(ctx, 'JUNGLE FLOOR', 540, 260, 130, t, wt(5, 'jungle') - .1, '#4ad06a'); }
} });
// [6] broken collarbone, deep cut, one shoe
SHOTS.push({ start: S(6), end: S(7), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04 }); jungle(ctx, t, cam); applyCam(ctx, cam, 1); const st = [wt(6, 'broken'), wt(6, 'deep'), wt(6, 'only')]; const i = st.filter(x => t > x - .15).length - 1;
  juliane(ctx, { x: 540, y: G + 200, s: 760, sling: i >= 0, cut: i >= 1, arms: { L: [.5, -.6], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'frown' } }); if (i >= 2) { shoe(ctx, 440, G + 190, 100); circle(ctx, 640, G + 190, 20); ctx.fillStyle = '#e8c8a0'; ctx.fill(); }
  if (i >= 0) { ctx.save(); ctx.globalAlpha = .9; circle(ctx, 500, 870, 60); ctx.lineWidth = 8; ctx.strokeStyle = '#e0392f'; ctx.stroke(); ctx.restore(); }
  label(ctx, 'BROKEN COLLARBONE', 540, 260, 96, t, st[0] - .15, '#ffffff', st[1] - .15); label(ctx, 'DEEP CUT', 540, 260, 150, t, st[1] - .15, '#e0392f', st[2] - .15); label(ctx, 'ONE SHOE', 540, 260, 150, t, st[2] - .15, '#ffd23a');
} });
// [7] father's rule: follow water downstream
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.03, dz: .03 }); const ph = t < wt(7, 'if') - .1 ? 0 : 1;
  if (ph === 0) { bgFlat(ctx, '#e8d8b0', '#c8b080'); applyCam(ctx, cam, 1); const fo = { x: 380, y: G + 200, s: 720, cols: ['#6a7a5a', '#6a7a5a'], hat: 'none', belt: false, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'normal', mouth: 'smile' } }; drawStick(ctx, fo); specs(ctx, fo); juliane(ctx, { x: 760, y: G + 200, s: 480, flip: -1, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } }); ctx.save(); ctx.globalAlpha = .25; ctx.fillStyle = '#fff6d8'; ctx.fillRect(-100, -100, 1300, 2200); ctx.restore(); label(ctx, "DAD'S RULE", 540, 260, 150, t, wt(7, 'father') - .2, '#ffffff'); }
  else { bgFlat(ctx, '#2a5a3a', '#1a3a24'); applyCam(ctx, cam, 1); const rows = [['LOST?', wt(7, 'lost')], ['FIND WATER', wt(7, 'find')], ['FOLLOW IT DOWNSTREAM', wt(7, 'downstream')], ['→ PEOPLE', wt(7, 'people')]]; rows.forEach((r, i) => { const k = cue(t, r[1] - .2, .3); if (k > 0) { ctx.save(); ctx.globalAlpha = k; text(ctx, r[0], 540, 560 + i * 170, i === 2 ? 70 : 96, i === 3 ? '#ffd23a' : '#ffffff', INK, 12); ctx.restore(); } }); }
} });
// [8] found a stream, followed it
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); river(ctx, t, cam); applyCam(ctx, cam, 1); const k = clamp((t - wt(8, 'followed')) / 1.6);
  juliane(ctx, { x: lerp(300, 620, k), y: 1220, s: 560, sling: true, cut: true, legs: walk(t), arms: { L: [.5, -.6], R: [.3, -.1] }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }); ctx.save(); ctx.globalAlpha = .7; ctx.fillStyle = '#5a6a3a'; ctx.fillRect(-100, 1180, 1300, 200); ctx.restore();
  for (let i = 0; i < 3; i++) { const x = 780 + i * 90; path(ctx, [[x, 640], [x + 50, 680], [x, 720]]); ctx.fillStyle = '#ffd23a'; ctx.fill(); }
  label(ctx, 'FIND A STREAM', 540, 260, 124, t, wt(8, 'found') - .2, '#9ad8ff', wt(8, 'followed') - .1); label(ctx, 'FOLLOW IT', 540, 260, 150, t, wt(8, 'followed') - .1, '#ffd23a');
} });
// [9] 11 days wading past crocodiles and piranhas
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); river(ctx, t, cam, {}); applyCam(ctx, cam, 1); const st = [wt(9, 'crocodiles'), wt(9, 'piranhas')];
  juliane(ctx, { x: 400, y: 1300, s: 560, sling: true, cut: true, legs: walk(t, .25), arms: { L: [.5, -.6], R: [.8, -.5] }, face: { eyes: t > st[0] - .2 ? 'wide' : 'half', mouth: 'flat', look: [1, 0] } }); ctx.save(); ctx.globalAlpha = .75; ctx.fillStyle = '#5a6a3a'; ctx.fillRect(-100, 1180, 1300, 300); ctx.restore();
  if (t > st[0] - .2) croc(ctx, 800, 1150, 560, t, -1); if (t > st[1] - .2) for (let i = 0; i < 4; i++) piranha(ctx, 620 + i * 110 + Math.sin(t * 4 + i) * 20, 1380 + (i % 2) * 60, 90, -1);
  const d = 1 + Math.floor(10 * clamp((t - S(9)) / (S(10) - S(9) - .6))); bigNum(ctx, `DAY ${d}`, 540, 600, 110, 1, '#ffffff');
  label(ctx, '11 DAYS', 540, 260, 150, t, wt(9, '11') - .2, '#ffffff', st[0] - .2); label(ctx, 'CROCODILES', 540, 260, 136, t, st[0] - .2, '#4ad06a', st[1] - .2); label(ctx, 'PIRANHAS', 540, 260, 150, t, st[1] - .2, '#e0392f');
} });
// [10] found a hut and boat; loggers found her
SHOTS.push({ start: S(10), end: S(11), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02, dz: .03 }); river(ctx, t, cam, { }); applyCam(ctx, cam, 1); const lg = t > wt(10, 'loggers') - .2;
  hutBoat(ctx, 300, 1080, 420); canoe(ctx, 700, 1120, 380, t); juliane(ctx, { x: 340, y: 1060, s: 420, sling: true, cut: true, lean: lg ? 0 : .2, arms: lg ? { L: [2.6, .3], R: [2.6, .3] } : { L: [.5, -.6], R: [.3, -.1] }, face: { eyes: lg ? 'happy' : 'half', mouth: lg ? 'smile' : 'flat' } });
  if (lg) for (let i = 0; i < 3; i++) { const o = { x: 680 + i * 150, y: G + 220, s: 520, flip: -1, cols: [['#8a4a3a', '#8a4a3a'], ['#5a6a3a', '#5a6a3a'], ['#3a5a7a', '#3a5a7a']][i], hat: 'none', belt: false, arms: { L: [.3, -.1], R: [1.8, .3] }, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }; drawStick(ctx, o); flatCap(ctx, o, '#4a3a2a'); }
  label(ctx, 'A HUT. A BOAT.', 540, 260, 120, t, wt(10, 'hut') - .2, '#ffffff', wt(10, 'loggers') - .2); label(ctx, 'FOUND!', 540, 260, 170, t, wt(10, 'loggers') - .2, '#4ad06a');
} });
// [11] 91 died; she was the only survivor; became a rainforest scientist
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.02 + lt * .02, dz: 0 }); const ph = t < wt(11, 'juliane') - .1 ? 0 : t < wt(11, 'and') - .1 ? 1 : 2;
  if (ph === 0) { bgFlat(ctx, '#2a2a34', '#121218'); applyCam(ctx, cam, 1); for (let i = 0; i < 92; i++) { const x = 140 + (i % 10) * 88, y = 520 + Math.floor(i / 10) * 86; circle(ctx, x, y, 26); ctx.fillStyle = '#5a5a66'; ctx.fill(); } label(ctx, '91 DIED', 540, 260, 150, t, wt(11, '91') - .2, '#ffffff'); }
  else if (ph === 1) { bgFlat(ctx, '#2a2a34', '#121218'); applyCam(ctx, cam, 1); for (let i = 0; i < 92; i++) { const x = 140 + (i % 10) * 88, y = 520 + Math.floor(i / 10) * 86; circle(ctx, x, y, 26); ctx.fillStyle = i === 91 ? '#ffd23a' : '#3a3a44'; ctx.fill(); if (i === 91) { ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke(); } } label(ctx, 'ONLY SURVIVOR', 540, 260, 124, t, wt(11, 'only') - .3, '#ffd23a'); }
  else { jungle(ctx, t, cam, { top: '#8ab08a' }); applyCam(ctx, cam, 1); const o = { x: 460, y: G + 200, s: 700, cols: ['#6a8a5a', '#6a8a5a'], arms: { L: [.3, -.1], R: { ik: [.4, -.45] } }, face: { eyes: 'happy', mouth: 'smile', look: [1, 0] } }; juliane(ctx, o); specs(ctx, o); ctx.save(); ctx.translate(640, 780); circle(ctx, 0, 0, 60); ctx.lineWidth = 12; ctx.strokeStyle = INK; ctx.stroke(); ctx.lineWidth = 7; ctx.strokeStyle = '#c8a040'; ctx.stroke(); line(ctx, 42, 42, 110, 110, 16, '#6a4a2a'); ctx.restore(); drawBat(ctx, 840, 600, 160, t); label(ctx, 'RAINFOREST SCIENTIST', 540, 260, 88, t, wt(11, 'rainforest') - .3, '#4ad06a'); }
} });
