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
const phase = (t, ...cuts) => { let i = 0; while (i < cuts.length && t >= cuts[i]) i++; return i; };
const push = (cam, k) => camA(0, 0, cam); // unused helper guard
function chestXCU(ctx, t, coat, medal, k, lt) {
  bgFlat(ctx, '#2a2018', '#120c08'); const cam = { x: 540, y: 960, z: 1.0 + lt * .02, r: 0 }; applyCam(ctx, cam, 1);
  ctx.fillStyle = coat; ctx.fillRect(60, -200, 960, 2400); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(640, -200, 380, 2400);
  path(ctx, [[60, -200], [420, -200], [540, 700], [60, 900]]); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fill(); line(ctx, 420, -200, 540, 700, 10); line(ctx, 660, -200, 540, 700, 10);
  path(ctx, [[440, -200], [640, -200], [540, 600]]); fillStroke(ctx, '#f2ece0', 8); path(ctx, [[510, -200], [570, -200], [580, 400], [540, 470], [500, 400]]); fillStroke(ctx, '#8a2a2a', 6);
  for (let i = 0; i < 3; i++) { circle(ctx, 560, 900 + i * 220, 22); fillStroke(ctx, '#3a2a1e', 5); }
  const ms = 260, y = lerp(-200, 900, easeOut(clamp(k))); medal(ctx, 470, y, ms);
  ctx.save(); ctx.translate(470, y - 1.45 * ms); rrect(ctx, 60, -95, 900, 190, 80); fillStroke(ctx, '#1e2a3a', 10); line(ctx, 200, -95, 200, 95, 26, '#d8b04a'); ellipse(ctx, 0, 0, 130, 120); fillStroke(ctx, '#f4f2ee', 10); ctx.restore();
}
// [0] Hitler's most trusted spy; 27 agents; none exist
SHOTS.push({ start: S(0), end: S(1), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(0, 'you', 1) - .1, wt(0, 'exists') - .25);
  if (p === 0) { const cam = camA(t, lt, { z: 1.04, dz: .03, shake: 2 }); londonOffice(ctx, t, cam); deskLamp(ctx, 860, 1060, 300, 1); garbo(ctx, { x: 470, y: 1900, s: 1250, arms: { L: [.3, -.2], R: { ik: [.3, -.35] } }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }); radioSet(ctx, 840, 1300, 360, t, 1); grade(ctx, '#1a2a4a', .22); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.0, dz: .05 }); bgFlat(ctx, '#3a2a1e', '#1a120c'); applyCam(ctx, cam, 1); const k = clamp((t - wt(0, '27') + .2) / 1.4); corkBoard(ctx, 540, 820, 980, 1100, 27, t, k); text(ctx, String(Math.max(1, Math.round(27 * k))), 900, 220, 90, '#ffd23a', INK, 14); text(ctx, String(Math.max(1, Math.round(27 * k))), 900, 220, 90, '#ffd23a', INK, 0); glow(ctx, 540, 600, 700, 'rgba(255,220,160,', .15); }
  else { const cam = camA(t, lt, { z: 1.06, dz: .06 }); londonOffice(ctx, t, cam); garbo(ctx, { x: 540, y: 2350, s: 1900, face: { eyes: 'half', mouth: 'smile', look: [-.6, 0], brow: -.2 } }); grade(ctx, '#1a2a4a', .28); }
  vig(ctx, .45);
} });
// [1] 1941; chicken farmer from Spain; hates the Nazis
SHOTS.push({ start: S(1), end: S(2), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(1, 'you') - .1, wt(1, 'and') - .05);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); spainFarm(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 9; i++) chicken(ctx, 80 + i * 115, 1180 + (i % 3) * 50, 1.3, t, i % 2 ? 1 : -1); chapterTag(ctx, t, S(1) + .05, 'SPAIN, 1941'); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.04, dz: .03 }); spainFarm(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 520, y: 1720, s: 1100, coat: '#8a6a4a', tie: null, collar: 'v', arms: { L: [.3, -.1], R: { ik: [.36, -.42] } }, face: { eyes: 'half', mouth: 'smile', look: [1, 1] } }); chicken(ctx, 520 + .36 * 1100 + 30, 1720 - .42 * 1100 + 60, 2.2, 0, -1); for (let i = 0; i < 4; i++) chicken(ctx, 110 + i * 70, 1400 + (i % 2) * 40, 1.6, t, 1); }
  else { const cam = camA(t, lt, { z: 1.1, dz: .05, shake: 3 }); spainFarm(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 540, y: 2250, s: 1750, coat: '#8a6a4a', face: { eyes: 'angry', mouth: 'frown', look: [0, 1] }, arms: { L: { ik: [-.12, -.45] }, R: { ik: [.12, -.45] } } }); ctx.save(); ctx.translate(540, 2250 - .45 * 1750); ctx.rotate(Math.sin(t * 20) * .03); rrect(ctx, -230, -150, 460, 300, 6); fillStroke(ctx, '#e8e0c8', 6); eagle(ctx, 0, -10, 200, '#2a2a2a'); line(ctx, -200, -130, 200, 130, 16, '#c8322c'); ctx.restore(); grade(ctx, '#c84a1a', .12); }
  vig(ctx, .4);
} });
// [2] offer to spy for the British; turned down; again and again
SHOTS.push({ start: S(2), end: S(3), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(2, 'they') - .1, wt(2, 'again') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); embassy(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 300, y: 1560, s: 820, hat: fedoraH, arms: { L: [.3, -.1], R: [1.5, .5] }, face: { eyes: 'normal', mouth: 'smile', look: [1, 0] } }); civvy(ctx, { x: 640, y: 1500, s: 760, flip: -1, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'flat', look: [-1, 0], moustache: '#8a6a4a' } }); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.08, dz: .04 }); embassy(ctx, t, cam); applyCam(ctx, cam, 1); civvy(ctx, { x: 560, y: 2200, s: 1700, headTilt: Math.sin(t * 9) * .08, face: { eyes: 'half', mouth: 'frown', moustache: '#8a6a4a' } }); }
  else { const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgFlat(ctx, '#5a5a62', '#2a2a30'); applyCam(ctx, cam, 1); const n = 1 + Math.floor(clamp((t - wt(2, 'again') + .1) / .9) * 3); for (let i = 0; i < n; i++) paperDoc(ctx, 380 + i * 160, 760 + i * 70, 520, -.15 + i * .12, 'APPLICATION', { stamp: 'REJECTED' }); garbo(ctx, { x: 260, y: 1700, s: 900, hat: fedoraH, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'closed', mouth: 'frown' } }); grade(ctx, '#2a3a5a', .2); }
  vig(ctx, .45);
} });
// [3] go to the Germans; say you're moving to London
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(3, 'and') - .1, wt(3, 'london') - .2);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); desk2(ctx, 540, 1240, 760); germanOff(ctx, { x: 540, y: 1260, s: 640, face: { eyes: 'half', mouth: 'flat', look: [-1, 1] }, arms: { L: { ik: [-.25, -.42] }, R: { ik: [.25, -.42] } } }); desk2(ctx, 540, 1240, 760); garbo(ctx, { x: 170, y: 1800, s: 1000, hat: fedoraH, arms: POSE.idle.arms, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }); deskLamp(ctx, 800, 1210, 220, 1); grade(ctx, '#4a1a0a', .15); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.06, dz: .04 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 520, y: 2200, s: 1700, hat: fedoraH, arms: { L: [.3, -.1], R: [1.6, .8] }, face: { eyes: 'half', mouth: 'smile', look: [1, 0], brow: .3 } }); grade(ctx, '#4a1a0a', .18); }
  else { const cam = camA(t, lt, { z: 1.1, dz: .05 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); germanOff(ctx, { x: 560, y: 2200, s: 1700, face: { eyes: 'wide', mouth: 'o', look: [-1, 0], brow: .5 } }); grade(ctx, '#4a1a0a', .18); }
  vig(ctx, .5);
} });
// [4] hired; go to Lisbon; make everything up with a guide, a map, old newsreels
SHOTS.push({ start: S(4), end: S(5), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(4, 'but') - .1, wt(4, 'make') - .1, wt(4, 'tourist') - .15, wt(4, 'map') - .1, wt(4, 'old') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.05, dz: .05 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); germanOff(ctx, { x: 760, y: 1700, s: 1000, flip: -1, arms: { L: [.3, -.1], R: { ik: [.42, -.48] } }, face: { eyes: 'happy' === 'x' ? 'normal' : 'normal', mouth: 'smile', look: [-1, 0] } }); garbo(ctx, { x: 300, y: 1700, s: 1000, hat: fedoraH, arms: { L: [.3, -.1], R: { ik: [.42, -.48] } }, face: { eyes: 'half', mouth: 'smile', look: [1, 0] } }); for (let i = 0; i < 4; i++) cash(ctx, 520 + i * 18, 1700 - .5 * 1000 - i * 14, 150, -.2 + i * .1); grade(ctx, '#4a1a0a', .15); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.0, dz: .04 }); lisbonRoom(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 540, y: 1720, s: 980, hat: fedoraH, arms: { L: [.3, -.1], R: [.3, -.1] }, face: { eyes: 'half', mouth: 'smile', look: [0, -1] } }); chapterTag(ctx, t, wt(4, 'lisbon') - .1, 'LISBON'); }
  else if (p === 2) { const cam = camA(t, lt, { z: 1.08, dz: .04 }); lisbonRoom(ctx, t, cam); applyCam(ctx, cam, 1); desk2(ctx, 540, 1240, 900); typewriter(ctx, 540, 1215, 420, t); garbo(ctx, { x: 540, y: 1250, s: 560, shadow: false, arms: { L: { ik: [-.2, -.25] }, R: { ik: [.2, -.25] } }, face: { eyes: 'half', mouth: 'smile', look: [0, 1] } }); desk2(ctx, 540, 1240, 900); typewriter(ctx, 540, 1215, 420, t); }
  else if (p === 3) { const cam = camA(t, lt, { z: 1.12, dz: .06 }); bgFlat(ctx, '#7a5a3a', '#3a2a1a'); applyCam(ctx, cam, 1); guidebook(ctx, 540, 860, 700, -.08); glow(ctx, 540, 800, 700, 'rgba(255,230,180,', .25); }
  else if (p === 4) { const cam = camA(t, lt, { z: 1.08, dz: .05 }); bgFlat(ctx, '#e8d8b0', '#c8a878'); applyCam(ctx, cam, 1); rrect(ctx, 140, 260, 800, 1060, 10); fillStroke(ctx, '#f2ead0', 8); ctx.save(); ctx.fillStyle = '#8ab8d0'; ctx.fillRect(160, 280, 760, 1020); ctx.restore(); ukShape(ctx, 540, 800, 900); text(ctx, 'LONDON', 640, 1060, 40, '#7a2a1a', INK, 0); circle(ctx, 610, 1110, 12); ctx.fillStyle = '#c8322c'; ctx.fill(); }
  else { const cam = camA(t, lt, { z: 1.02, dz: .03 }); bgFlat(ctx, '#1a1614', '#0a0808'); applyCam(ctx, cam, 1); projector(ctx, 170, 1240, 300, t, 1); rrect(ctx, 400, 360, 620, 460, 6); ctx.fillStyle = 'rgba(240,235,220,.85)'; ctx.fill(); ctx.save(); ctx.globalAlpha = .7; ctx.fillStyle = '#3a3a3a'; rrect(ctx, 650, 470, 50, 280, 2); ctx.fill(); path(ctx, [[650, 470], [675, 420], [700, 470]]); ctx.fill(); ctx.fillRect(420, 700, 580, 100); circle(ctx, 675, 520, 18); ctx.fillStyle = '#e8e2d0'; ctx.fill(); ctx.restore(); text(ctx, 'NEWSREEL', 710, 400, 34, '#3a3a3a', INK, 0); if (Math.sin(t * 40) > .6) { ctx.save(); ctx.globalAlpha = .1; ctx.fillStyle = '#fff'; ctx.fillRect(400, 360, 620, 460); ctx.restore(); } garbo(ctx, { x: 300, y: 1900, s: 1000, shadow: false, face: { eyes: 'half', mouth: 'flat', look: [1, -1] } }); }
  vig(ctx, .45);
} });
// [5] never been to Britain; reports full of mistakes; the Germans love them
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(5, 'your') - .1, wt(5, 'the', 0) - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.04, dz: .04 }); lisbonRoom(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 540, y: 1800, s: 1150, arms: { L: [1.6, -1.9], R: [1.6, -1.9] }, face: { eyes: 'half', mouth: 'smile', look: [0, 0], brow: .4 } }); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.1, dz: .05 }); bgFlat(ctx, '#5a4a3a', '#2a2018'); applyCam(ctx, cam, 1); paperDoc(ctx, 540, 860, 1100, -.04, 'REPORT: GLASGOW'); const k = clamp((t - wt(5, 'mistakes') + .3) / .8); for (let i = 0; i < 3; i++) if (k > i / 3) { ctx.save(); ellipse(ctx, 520 + (i % 2) * 60, 700 + i * 170, 320, 50, -.05); ctx.lineWidth = 9; ctx.strokeStyle = '#d8322c'; ctx.stroke(); ctx.restore(); } text(ctx, '"they drink a litre of wine"', 540, 1150, 44, '#d8322c', INK, 0); }
  else { const cam = camA(t, lt, { z: 1.06, dz: .04 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); germanOff(ctx, { x: 540, y: 2100, s: 1500, arms: { L: { ik: [-.15, -.5] }, R: { ik: [.15, -.5] } }, face: { eyes: 'closed', mouth: 'grin' } }); paperDoc(ctx, 540, 2100 - .5 * 1500, 420, .05, 'REPORT'); for (let i = 0; i < 3; i++) sparkle(ctx, 260 + i * 280, 420 + (i % 2) * 120, 40 + 10 * Math.sin(t * 6 + i)); grade(ctx, '#4a1a0a', .15); }
  vig(ctx, .45);
} });
// [6] codebreakers catch Germans hunting a convoy that doesn't exist; they come for you
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(6, 'catch') - .1, wt(6, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .04 }); bletchley(ctx, t, cam); applyCam(ctx, cam, 1); desk2(ctx, 540, 1180, 1000, '#4a3424'); for (let i = 0; i < 3; i++) codebreaker(ctx, { x: 220 + i * 320, y: 1230, s: 520, shadow: false, coat: ['#8a5a6a', '#4a5a7a', '#6a7a4a'][i], hairCol: ['#7a4a2a', '#1e1a20', '#c8a060'][i], arms: { L: { ik: [-.2, -.3] }, R: { ik: [.2, -.3] } }, face: { eyes: 'normal', mouth: 'flat', look: [0, 1] } }); desk2(ctx, 540, 1180, 1000, '#4a3424'); for (let i = 0; i < 3; i++) paperDoc(ctx, 220 + i * 320, 1150, 160, .1 * i - .1, ''); grade(ctx, '#3a4a2a', .12); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.0, dz: .05 }); seaHunt(ctx, t, cam); text(ctx, 'CONVOY?', 540, 1010, 50, '#ffffff', INK, 0); }
  else { const cam = camA(t, lt, { z: 1.08, dz: .05 }); lisbonRoom(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 560, y: 2200, s: 1700, face: { eyes: 'wide', mouth: 'o', look: [-1, 0] } }); ctx.save(); ctx.globalAlpha = .85; person(ctx, { x: 120, y: 1700, s: 1100, coat: '#1a1a1e', pants: '#1a1a1e', hat: fedoraH, sil: true, face: { eyes: 'half', mouth: 'flat' } }); ctx.restore(); grade(ctx, '#1a2a3a', .2); }
  vig(ctx, .5);
} });
// [7] work for London; spy ring grows to 27; Germany pays their salaries
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(7, 'your') - .1, wt(7, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .03 }); londonOffice(ctx, t, cam); applyCam(ctx, cam, 1); britOff(ctx, { x: 820, y: 1650, s: 900, flip: -1, arms: { L: [.3, -.1], R: { ik: [.42, -.5] } }, face: { eyes: 'normal', mouth: 'smile', look: [-1, 0] } }); garbo(ctx, { x: 330, y: 1650, s: 900, arms: { L: [.3, -.1], R: { ik: [.42, -.5] } }, face: { eyes: 'half', mouth: 'smile', look: [1, 0] } }); chapterTag(ctx, t, S(7) + .05, 'LONDON, 1942'); grade(ctx, '#1a2a4a', .15); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.0, dz: .04 }); bgFlat(ctx, '#3a2a1e', '#1a120c'); applyCam(ctx, cam, 1); const k = clamp((t - wt(7, 'grows') + .1) / 1.6); corkBoard(ctx, 540, 740, 980, 1020, 27, t, k); garbo(ctx, { x: 160, y: 1900, s: 900, arms: { L: [.3, -.1], R: [2.3, .2] }, face: { eyes: 'half', mouth: 'smile', look: [1, -1] } }); glow(ctx, 540, 600, 700, 'rgba(255,220,160,', .15); }
  else { const cam = camA(t, lt, { z: 1.06, dz: .04 }); londonOffice(ctx, t, cam); applyCam(ctx, cam, 1); desk2(ctx, 540, 1300, 900); garbo(ctx, { x: 540, y: 1330, s: 640, shadow: false, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'closed', mouth: 'grin' } }); desk2(ctx, 540, 1300, 900); for (let i = 0; i < 14; i++) { const r = rng(i * 3 + 1); const k = ((t - wt(7, 'germany')) * (.6 + r() * .4) + r()) % 1; cash(ctx, 100 + r() * 880, -100 + k * 1350, 150, t * 2 + i); } }
  vig(ctx, .45);
} });
// [8] June 1944; hours before D-Day you warn Berlin: Normandy; too late to matter; now they trust you
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(8, 'hours') - .1, wt(8, 'landing') - .2, wt(8, 'too') - .1, wt(8, 'but') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); channelMap(ctx, t, cam, {}); for (let i = 0; i < 12; i++) { const r = rng(i + 2); ctx.save(); ctx.translate(200 + r() * 300, 560 + r() * 300 + (t - S(8)) * 30); rrect(ctx, -26, -8, 52, 16, 6); fillStroke(ctx, '#4a4a52', 3); ctx.restore(); } grade(ctx, '#0a1430', .45); chapterTag(ctx, t, S(8) + .05, 'JUNE 1944'); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.06, dz: .04 }); londonOffice(ctx, t, cam); applyCam(ctx, cam, 1); desk2(ctx, 540, 1300, 900); garbo(ctx, { x: 420, y: 1330, s: 680, shadow: false, hat: headset, arms: { L: { ik: [.1, -.3] }, R: { ik: [.4, -.3] } }, face: { eyes: 'half', mouth: 'flat', look: [1, 1] } }); desk2(ctx, 540, 1300, 900); radioSet(ctx, 700, 1290, 340, t, 1); clock2(ctx, 900, 330, 100, 3, 0); grade(ctx, '#0a1430', .3); }
  else if (p === 2) { const cam = camA(t, lt, { z: 1.0, dz: .04 }); channelMap(ctx, t, cam, { hl: 'normandy' }); fatArrow(ctx, 330, 520, 330, 960, clamp((t - wt(8, 'landing') + .2) / .6), '#2a7ae0'); grade(ctx, '#0a1430', .2); }
  else if (p === 3) { const cam = camA(t, lt, { z: 1.06, dz: .04 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); desk2(ctx, 540, 1300, 900); soldierG(ctx, { x: 540, y: 1330, s: 640, shadow: false, hat: headset, lean: .2, arms: { L: { ik: [-.2, -.3] }, R: { ik: [.2, -.3] } }, face: { eyes: 'closed', mouth: 'o' } }); desk2(ctx, 540, 1300, 900); radioSet(ctx, 260, 1290, 300, t, 1); clock2(ctx, 880, 330, 100, 8, 0); text(ctx, 'z', 720 + Math.sin(t * 2) * 10, 760 - (t * 40 % 80), 60, '#ffffff', INK, 8); grade(ctx, '#4a2a0a', .15); }
  else { const cam = camA(t, lt, { z: 1.08, dz: .04 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); germanOff(ctx, { x: 540, y: 2150, s: 1600, arms: { L: { ik: [-.15, -.5] }, R: { ik: [.15, -.5] } }, face: { eyes: 'happy' === '' ? 'normal' : 'wide', mouth: 'grin' } }); paperDoc(ctx, 540, 2150 - .5 * 1600, 440, .04, 'AGENT GARBO', { stamp: 'TRUSTED', scol: '#2a8a3a' }); grade(ctx, '#4a1a0a', .15); }
  vig(ctx, .5);
} });
// [9] three days later: Normandy is a trick; the real invasion is coming at Calais
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(9, 'you') - .1, wt(9, 'real') - .3);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); bgFlat(ctx, '#1a2a4a', '#0a1020'); applyCam(ctx, cam, 1); calendar2(ctx, 540, 820, 420, 'JUNE 9'); glow(ctx, 540, 800, 600, 'rgba(200,220,255,', .12); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.12, dz: .05 }); londonOffice(ctx, t, cam); applyCam(ctx, cam, 1); garbo(ctx, { x: 540, y: 2250, s: 1800, hat: headset, face: { eyes: 'half', mouth: 'smile', look: [1, 0], brow: .3 } }); grade(ctx, '#0a1430', .3); }
  else { const cam = camA(t, lt, { z: 1.0, dz: .04 }); channelMap(ctx, t, cam, { hl: 'calais' }); line(ctx, 230, 990, 430, 1130, 14, '#c8322c'); line(ctx, 430, 990, 230, 1130, 14, '#c8322c'); fatArrow(ctx, 820, 420, 860, 720, clamp((t - wt(9, 'calais') + .3) / .5), '#e0392f'); }
  vig(ctx, .45);
} });
// [10] Hitler believes you; keeps armies waiting at Calais for weeks
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(10, 'he') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.08, dz: .05 }); abwehr(ctx, t, cam); applyCam(ctx, cam, 1); hitler2(ctx, { x: 540, y: 2150, s: 1600, arms: { L: [.3, -.1], R: [1.9, .3] }, face: { eyes: t > wt(10, 'believes') ? 'half' : 'wide', mouth: t > wt(10, 'believes') ? 'smile' : 'o', look: [1, 0] } }); grade(ctx, '#4a1a0a', .2); }
  else { const cam = camA(t, lt, { z: 1.02, dz: .03 }); applyCam(ctx, cam, .08); drawSky(ctx, '#8a9aaa', '#d8d8d0', -400, 1300); applyCam(ctx, cam, .3); drawSea(ctx, 700, t, 400, ['#7aa0b8', '#4a7a98', '#3a6a88']); applyCam(ctx, cam, 1); ctx.fillStyle = '#d8c8a0'; ctx.fillRect(-1000, 960, 3100, 1600); line(ctx, -1000, 960, 2100, 960, 6); for (let i = 0; i < 4; i++) panzer2(ctx, 140 + i * 270, 1080 + (i % 2) * 30, 200); for (let i = 0; i < 5; i++) soldierG(ctx, { x: 120 + i * 210, y: 1520 + (i % 2) * 60, s: 520, lean: Math.sin(t + i) * .03, arms: i % 2 ? POSE.hips.arms : POSE.idle.arms, face: { eyes: i % 2 ? 'half' : 'closed', mouth: 'flat', look: [-1, 0] } }); const wk = 1 + Math.floor(clamp((t - wt(10, 'weeks') + .6) / 1.0) * 5); calendar2(ctx, 880, 400, 240, 'WEEK ' + wk); chapterTag(ctx, t, wt(10, 'calais') - .1, 'CALAIS'); }
  vig(ctx, .4);
} });
// [11] Iron Cross from Germany; MBE from Britain; two medals from both sides of the same war
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(11, 'and') - .1, wt(11, 'two') - .1);
  if (p === 0) { chestXCU(ctx, t, '#6a4a34', ironCross, (t - wt(11, 'iron') + .5) / .6, lt); text(ctx, 'IRON CROSS', 540, 1500, 64, '#d8d8d8', INK, 0); grade(ctx, '#4a1a0a', .12); }
  else if (p === 1) { chestXCU(ctx, t, '#6a4a34', mbeMedal, (t - wt(11, 'member') + .5) / .6, lt); text(ctx, 'M.B.E.', 540, 1500, 70, '#f2c8d8', INK, 0); }
  else { const cam = camA(t, lt, { z: 1.0, dz: .05 }); londonOffice(ctx, t, cam); applyCam(ctx, cam, 1); const s = 1500, y = 2100; garbo(ctx, { x: 540, y, s, arms: { L: [.2, -.1], R: [.2, -.1] }, face: { eyes: 'half', mouth: 'smile', look: [0, 0], brow: -.1 } }); ironCross(ctx, 540 - .1 * s, y - .38 * s, 70); mbeMedal(ctx, 540 + .02 * s, y - .38 * s, 70); grade(ctx, '#2a1a0a', .1); }
  vig(ctx, .45);
} });
