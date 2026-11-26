const SHOTS = [];
const phase = (t, ...cuts) => { let i = 0; while (i < cuts.length && t >= cuts[i]) i++; return i; };
function vcMedal(ctx, x, y, s) { ctx.save(); ctx.translate(x, y); line(ctx, 0, -s * 1.4, 0, -s * .6, s * .5, '#9a1a2a'); for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate(i * Math.PI / 2); path(ctx, [[-s * .1, -s * .08], [-s * .3, -s * .55], [s * .3, -s * .55], [s * .1, -s * .08]]); ctx.fillStyle = '#a8784a'; ctx.fill(); ctx.lineWidth = s * .03; ctx.strokeStyle = INK; ctx.stroke(); ctx.restore(); } circle(ctx, 0, 0, s * .16); fillStroke(ctx, '#8a5a3a', s * .03); ctx.restore(); }
function ridgeMap(ctx, t, cam, k) { applyCam(ctx, cam, .08); drawSky(ctx, '#e8a868', '#f8e8c8', -400, 1300); applyCam(ctx, cam, 1); path(ctx, [[-200, 1500], [-200, 900], [150, 780], [540, 700], [930, 760], [1300, 880], [1300, 1500]]); fillStroke(ctx, '#a8824a', 7); const F = [[250, 745, 'FORT LOCKHART'], [540, 700, 'SARAGARHI'], [830, 735, 'FORT GULISTAN']]; F.forEach(([x, y, n], i) => { postFort(ctx, x, y, i === 1 ? 180 : 240, { t }); text(ctx, n, x, y + 80, i === 1 ? 42 : 30, i === 1 ? '#ffd23a' : '#ffffff', INK, 8); text(ctx, n, x, y + 80, i === 1 ? 42 : 30, i === 1 ? '#ffd23a' : '#ffffff', INK, 0); }); flashBeam(ctx, 560, 560, 270, 600, k * (.5 + .5 * Math.sin(t * 9))); flashBeam(ctx, 560, 560, 820, 600, k * (.5 + .5 * Math.sin(t * 9 + 1))); }
// [0] one of 21 soldiers in a tiny stone outpost; 10,000 men coming up the hill
SHOTS.push({ start: S(0), end: S(1), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(0, 'tiny') - .2, wt(0, 'coming') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.08, dz: .05 }); frontier(ctx, t, cam, { sunX: 300 }); sikh(ctx, { x: 540, y: 2250, s: 1750, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }, 0); }
  else if (p === 1) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); frontier(ctx, t, cam); applyCam(ctx, cam, 1); postFort(ctx, 540, 1180, 820, { t }); }
  else { const cam = camA(t, lt, { z: 1.0, dz: .04 }); frontier(ctx, t, cam, { horde: clamp((t - wt(0, 'coming')) / 1.4) }); applyCam(ctx, cam, 1); postFort(ctx, 820, 1350, 420, { t }); }
  vig(ctx, .4);
} });
// [1] 1897, northwest frontier; Saragarhi, a signal tower between two forts
SHOTS.push({ start: S(1), end: S(2), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(1, 'your') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .03 }); frontier(ctx, t, cam, { top: '#e8a060', bot: '#f8e0b0', sunY: 620 }); applyCam(ctx, cam, 1); for (let i = 0; i < 3; i++) sikh(ctx, { x: 200 + i * 340, y: 1500, s: 640, arms: i === 1 ? { L: [.3, -.1], R: [2.4, .3] } : POSE.idle.arms, face: { eyes: 'half', mouth: 'flat', look: [1, 0] } }, i); chapterTag(ctx, t, S(1) + .05, 'NORTHWEST FRONTIER, 1897'); }
  else { const cam = camA(t, lt, { z: 1.0, dz: .03 }); ridgeMap(ctx, t, cam, clamp((t - wt(1, 'signal')) / .5)); }
  vig(ctx, .4);
} });
// [2] pass messages with flashes of sunlight from a mirror
SHOTS.push({ start: S(2), end: S(3), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); fortInside(ctx, t, cam); applyCam(ctx, cam, 1); const fl = t > wt(2, 'flashes') - .1 ? Math.max(0, Math.sin(t * 9)) : 0;
  sikh(ctx, { x: 340, y: 1800, s: 1150, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } }, face: { eyes: 'half', mouth: 'flat', look: [1, -1] } }, 1); heliograph(ctx, 800, 1500, 620, t, fl); flashBeam(ctx, 800, 1066, 1200, 500, fl);
  vig(ctx, .4);
} });
// [3] hills turn black with tribesmen; signalman: we're under attack
SHOTS.push({ start: S(3), end: S(4), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(3, 'your') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.0, dz: .04, shake: 3 }); frontier(ctx, t, cam, { horde: .3 + .7 * clamp((t - S(3)) / 2) }); applyCam(ctx, cam, 1); for (let i = 0; i < 4; i++) tribesman(ctx, { x: 120 + i * 280, y: 1700 + (i % 2) * 60, s: 700, arms: { L: [.3, -.1], R: [2.5, .3] }, face: { eyes: 'angry', mouth: 'shout' } }, i); }
  else { const cam = camA(t, lt, { z: 1.06, dz: .04 }); fortInside(ctx, t, cam); applyCam(ctx, cam, 1); const fl = Math.max(0, Math.sin(t * 11)); sikh(ctx, { x: 360, y: 2050, s: 1450, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } }, face: { eyes: 'wide', mouth: 'flat', look: [1, -1] }, sweat: true }, 1); heliograph(ctx, 860, 1400, 520, t, fl); morseTape(ctx, 540, 420, 760, 'UNDER ATTACK', (t - wt(3, 'under') + .2) / .6); }
  vig(ctx, .45);
} });
// [4] reply: help can't get through; Ishar Singh decides not to surrender
SHOTS.push({ start: S(4), end: S(5), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(4, 'so') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.06, dz: .04 }); fortInside(ctx, t, cam); applyCam(ctx, cam, 1); sikh(ctx, { x: 540, y: 2250, s: 1750, face: { eyes: 'wide', mouth: 'o', look: [-1, -1] } }, 1); morseTape(ctx, 540, 420, 860, "HELP CAN'T GET THROUGH", (t - wt(4, 'help') + .2) / .8, '#ff9a7a'); }
  else { const cam = camA(t, lt, { z: 1.1, dz: .05 }); fortInside(ctx, t, cam, { top: '#d88a5a' }); applyCam(ctx, cam, 1); sikh(ctx, { x: 540, y: 2300, s: 1850, stripes: true, arms: { L: [.2, -.1], R: [1.5, .5] }, face: { eyes: 'angry', mouth: 'flat' } }, 2); chapterTag(ctx, t, wt(4, 'ishar') - .1, 'HAVILDAR ISHAR SINGH'); }
  vig(ctx, .5);
} });
// [5] hours: 21 rifles hold back an army; charge after charge breaks
SHOTS.push({ start: S(5), end: S(6), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(5, 'charge') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .03, shake: 4 }); fortInside(ctx, t, cam); applyCam(ctx, cam, 1); for (let i = 0; i < 4; i++) { const f = Math.sin(t * 6 + i * 1.7) > .8 ? 1 : 0; sikh(ctx, { x: 140 + i * 270, y: 1400, s: 620, arms: { L: { ik: [.3, -.62] }, R: { ik: [.1, -.6] } }, face: { eyes: 'angry', mouth: 'flat', look: [1, 0] } }, i); rifle(ctx, 140 + i * 270 + .05 * 620, 1400 - .62 * 620, 300, -.05, f); } const n = Math.round(lerp(1, 7, clamp((t - S(5)) / 3))); text(ctx, n + ' HOURS', 880, 380, 54, '#ffd23a', INK, 10); text(ctx, n + ' HOURS', 880, 380, 54, '#ffd23a', INK, 0); }
  else { const cam = camA(t, lt, { z: 1.0, dz: .03, shake: 6 }); frontier(ctx, t, cam, { horde: .6 }); applyCam(ctx, cam, 1); postFort(ctx, 820, 1200, 560, { t }); for (let i = 0; i < 7; i++) { const w = ((t - wt(5, 'charge')) * .7 + i * .14) % 1; const back = w > .6; const x = back ? lerp(620, 80, (w - .6) / .4) : lerp(40, 620, w / .6); tribesman(ctx, { x: x - i * 40, y: 1500 + (i % 3) * 70, s: 420, flip: back ? -1 : 1, lean: back ? -.1 : .1, arms: { L: [2.4, .3], R: [2.4, .3] }, legs: { L: [.5 * Math.sin(t * 14 + i), -.2], R: [-.5 * Math.sin(t * 14 + i), -.2] }, face: { eyes: back ? 'wide' : 'angry', mouth: back ? 'o' : 'shout' } }, i); } for (let i = 0; i < 3; i++) if (Math.sin(t * 8 + i * 2) > .7) burst(ctx, 700 + i * 80, 1000, 50, 8, '#ffd23a', 2); }
  vig(ctx, .45);
} });
// [6] hidden by smoke, they break through a wall
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .04, shake: 8 }); frontier(ctx, t, cam, { top: '#8a7a6a', bot: '#c8b098' }); applyCam(ctx, cam, 1); const k = clamp((t - wt(6, 'break')) / .4); postFort(ctx, 540, 1250, 900, { t, breach: k }); for (let i = 0; i < 7; i++) { const kk = ((t * .35 + i / 7) % 1); puff(ctx, 80 + i * 150 + kk * 40, 1250 - kk * 600, 110 + kk * 120, t, '#6a6058', i, (1 - kk) * .85); } if (k > 0) for (let i = 0; i < 4; i++) tribesman(ctx, { x: 160 + i * 90 + k * 40, y: 1400 + i * 30, s: 420, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'angry', mouth: 'shout' } }, i); vig(ctx, .55);
} });
// [7] friends fall one by one; signalman keeps flashing every detail
SHOTS.push({ start: S(7), end: S(8), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(7, 'and') - .1);
  if (p === 0) { const cam = camA(t, lt, { z: 1.02, dz: .03 }); fortInside(ctx, t, cam, { smoke: 1, top: '#8a7a6a' }); applyCam(ctx, cam, 1); const alive = Math.round(lerp(21, 6, clamp((t - S(7)) / 2))); for (let i = 0; i < 21; i++) { const r = rng(i * 3 + 2); ctx.save(); ctx.globalAlpha = i < alive ? 1 : .18; sikh(ctx, { x: 70 + (i % 7) * 156, y: 1150 + Math.floor(i / 7) * 180, s: 300, shadow: false, face: { eyes: 'half', mouth: 'flat' } }, i); ctx.restore(); } text(ctx, String(alive), 900, 300, 120, '#ffffff', INK, 14); text(ctx, String(alive), 900, 300, 120, '#ffffff', INK, 0); }
  else { const cam = camA(t, lt, { z: 1.08, dz: .05, shake: 3 }); fortInside(ctx, t, cam, { smoke: .8, top: '#8a6a5a' }); applyCam(ctx, cam, 1); const fl = Math.max(0, Math.sin(t * 12)); heliograph(ctx, 800, 1500, 600, t, fl); sikh(ctx, { x: 360, y: 2100, s: 1500, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } }, face: { eyes: 'angry', mouth: 'flat', look: [1, -1] }, sweat: true, scar: true }, 1); morseTape(ctx, 540, 420, 820, 'ENEMY INSIDE. 6 LEFT.', (t - wt(7, 'signalman')) / 1.2); }
  vig(ctx, .5);
} });
// [8] last message: permission to put down the mirror and pick up his rifle
SHOTS.push({ start: S(8), end: S(9), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(8, 'and') - .1);
  const cam = camA(t, lt, { z: 1.1, dz: .05 }); fortInside(ctx, t, cam, { smoke: .9, top: '#7a5a4a' }); applyCam(ctx, cam, 1);
  if (p === 0) { const fl = Math.max(0, Math.sin(t * 12)); heliograph(ctx, 820, 1500, 560, t, fl); sikh(ctx, { x: 420, y: 2250, s: 1700, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } }, face: { eyes: 'half', mouth: 'flat', look: [1, 0] }, scar: true }, 1); morseTape(ctx, 540, 420, 900, 'PERMISSION TO TAKE UP RIFLE', (t - wt(8, 'permission') + .2) / 1.2); }
  else { sikh(ctx, { x: 540, y: 2250, s: 1700, arms: { L: { ik: [-.1, -.6] }, R: { ik: [.3, -.55] } }, face: { eyes: 'angry', mouth: 'flat' }, scar: true }, 1); rifle(ctx, 540 - .1 * 1700, 2250 - .58 * 1700, 900, -.25); }
  vig(ctx, .55);
} });
// [9] the signal goes dark
SHOTS.push({ start: S(9), end: S(10), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .03, dz: 0 }); frontier(ctx, t, cam, { top: '#3a2a4a', bot: '#c86a4a', sunY: 1000 }); applyCam(ctx, cam, 1); postFort(ctx, 540, 1150, 560, { t, flag: false }); const on = t < wt(9, 'dark') - .1; if (on) { glow(ctx, 600, 700, 200, 'rgba(255,255,220,', .8 * Math.max(0, Math.sin(t * 10))); } for (let i = 0; i < 4; i++) { const k = ((t * .2 + i / 4) % 1); puff(ctx, 480 + i * 40, 900 - k * 500, 60 + k * 80, t, '#4a4048', i, (1 - k) * .6); } tint(ctx, '#000000', clamp((t - wt(9, 'dark')) / .8) * .5); vig(ctx, .6);
} });
// [10] all 21 die at their posts; not one surrenders
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0 + lt * .02, dz: 0 }); bgFlat(ctx, '#e8a868', '#5a2a1a'); applyCam(ctx, cam, 1); glow(ctx, 540, 600, 900, 'rgba(255,230,180,', .45); for (let i = 0; i < 21; i++) { const row = i < 7 ? 0 : i < 14 ? 1 : 2; const c = i % 7; const k = clamp((t - S(10) - i * .06) / .4); ctx.save(); ctx.globalAlpha = k; sikh(ctx, { x: 110 + c * 143, y: 760 + row * 300, s: 380 + row * 40, face: { eyes: 'half', mouth: 'flat' } }, i); ctx.restore(); } text(ctx, '21', 540, 330, 160, '#ffffff', INK, 18); text(ctx, '21', 540, 330, 160, '#ffffff', INK, 0); vig(ctx, .45);
} });
// [11] no Victoria Cross for Indian soldiers; all 21 got the highest award allowed; remembered every 12 September
SHOTS.push({ start: S(11), end: S(12), tr: 'cut', draw(ctx, lt, t) {
  const p = phase(t, wt(11, 'all') - .5, wt(11, 'and') - .1);
  const cam = camA(t, lt, { z: 1.02, dz: .03 });
  if (p === 0) { bgFlat(ctx, '#3a2a2a', '#140c0c'); applyCam(ctx, cam, 1); vcMedal(ctx, 540, 900, 300); text(ctx, 'VICTORIA CROSS', 540, 1180, 60, '#e8d8b8', INK, 0); const k = clamp((t - wt(11, 'couldnt') + .1) / .3); if (k > 0) { line(ctx, 260, 500, 260 + 560 * k, 500 + 560 * k, 30, '#d8322c'); } }
  else if (p === 1) { bgFlat(ctx, '#2a3a5a', '#101828'); applyCam(ctx, cam, 1); for (let i = 0; i < 21; i++) { const k = clamp((t - wt(11, 'all') - .4 - i * .08) / .3); if (k <= 0) continue; ctx.save(); ctx.globalAlpha = k; medalIOM(ctx, 130 + (i % 7) * 137, 560 + Math.floor(i / 7) * 330, 70); ctx.restore(); } text(ctx, 'INDIAN ORDER OF MERIT', 540, 300, 52, '#f2e6c8', INK, 0); }
  else { frontier(ctx, t, cam, { top: '#e8a868', bot: '#f8e8c8', sunX: 300, sunY: 500 }); applyCam(ctx, cam, 1); memorial(ctx, 540, 1180, 700); for (let i = 0; i < 4; i++) sikh(ctx, { x: 120 + i * 280 + (i > 1 ? 120 : 0), y: 1600, s: 600, arms: { L: [.3, -.1], R: [2.0, -2.2] }, face: { eyes: 'half', mouth: 'flat', look: [0, -1] } }, i); chapterTag(ctx, t, wt(11, '12') - .2, '12 SEPTEMBER'); }
  vig(ctx, .45);
} });
