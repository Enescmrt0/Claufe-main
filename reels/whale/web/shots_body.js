const SHOTS = [];
const WX = 580, WY = G - 30, WS = 1050;
// [0] 1970, Oregon had a dead whale problem; so they decided to blow it up
SHOTS.push({ start: S(0), end: S(1), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const bl = t > wt(0, 'blow') - .05; beachBG(ctx, t, cam); applyCam(ctx, cam, 1);
  whale(ctx, WX, WY, WS, t, { x: true }); stink(ctx, WX - 100, WY - 300, 300, t);
  boss(ctx, holdNose({ x: 180, y: G + 170, s: 520, face: { eyes: bl ? 'happy' : 'squint', mouth: bl ? 'grin' : 'frown', look: [1, 0] } }));
  worker(ctx, holdNose({ x: 920, y: G + 190, s: 500, flip: -1, face: { eyes: 'squint', mouth: 'flat', look: [-1, 0] } }));
  if (bl) { boom(ctx, WX, WY - 160, 420, clamp((t - wt(0, 'blow')) / 1.2), t); tint(ctx, '#ffffff', 1 - clamp((t - wt(0, 'blow')) / .25)); }
  chapterTag(ctx, t, .05, 'OREGON, 1970'); label(ctx, 'DEAD WHALE', 540, 260, 130, t, wt(0, 'dead') - .2, '#ffffff', wt(0, 'blow') - .1); label(ctx, 'BLOW IT UP', 540, 260, 130, t, wt(0, 'blow') - .05, '#ffb02a');
} });
// [1] huge sperm whale washed up in Florence; the smell was unbearable
SHOTS.push({ start: S(1), end: S(2), tr: 'whip', draw(ctx, lt, t) {
  const sm = t > wt(1, 'smell') - .2; const cam = camA(t, lt, { z: sm ? 1.06 : .98, dz: .03 });
  beachBG(ctx, t, cam); applyCam(ctx, cam, 1); whale(ctx, WX, WY, 1000, t);
  if (!sm) { local(ctx, { x: 160, y: G + 160, s: 380, arms: { L: [.3, -.1], R: [2.2, .4] }, face: { eyes: 'wide', mouth: 'o', look: [1, -1] } }, 0); label(ctx, 'SPERM WHALE', 540, 260, 120, t, wt(1, 'sperm') - .2, '#ffffff', wt(1, 'beach') - .2); label(ctx, '14 METERS · 8 TONS', 540, 400, 64, t, wt(1, 'whale') - .1, '#ffd23a', wt(1, 'beach') - .2); label(ctx, 'FLORENCE, OREGON', 540, 260, 104, t, wt(1, 'beach') - .2, '#ffd23a'); }
  else { stink(ctx, WX - 150, WY - 280, 420, t); for (let i = 0; i < 3; i++) local(ctx, holdNose({ x: 160 + i * 360, y: G + 170 + (i % 2) * 30, s: 470, flip: i === 2 ? -1 : 1, lean: Math.sin(t * 9 + i) * .05, face: { eyes: 'x', mouth: 'teeth' } }), i + 1); label(ctx, 'UNBEARABLE', 540, 260, 130, t, wt(1, 'unbearable') - .2, '#9ad84a'); }
} });
// [2] beaches counted as highways, so the job went to the highway department
SHOTS.push({ start: S(2), end: S(3), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const dep = t > wt(2, 'job') - .2; beachBG(ctx, t, cam); applyCam(ctx, cam, 1);
  if (!dep) { signPost(ctx, 540, G - 80, 640, 240, 'BEACH =\nHIGHWAY', 84); const k = backOut(clamp((t - wt(2, 'highways') + .2) / .3)); if (k > 0) { ctx.save(); ctx.translate(540, 360); ctx.scale(k, k); hwyShield(ctx, 0, 0, 220); ctx.restore(); } local(ctx, { x: 180, y: G + 200, s: 420, arms: { L: [.3, -.1], R: [1.6, .2] }, face: { eyes: 'wide', mouth: 'o', look: [1, -1] } }, 2); label(ctx, 'COUNTED AS HIGHWAYS', 540, 1160, 70, t, wt(2, 'counted') - .2, '#ffd23a'); }
  else { whale(ctx, 820, WY - 120, 600, t); for (let i = 0; i < 3; i++) worker(ctx, { x: 160 + i * 220, y: G + 180 - (i % 2) * 30, s: 480, arms: i === 1 ? { L: [.3, -.1], R: [2.6, .2] } : POSE.hips.arms, face: { eyes: i === 1 ? 'happy' : 'normal', mouth: i === 1 ? 'grin' : 'smile', look: [1, 0] } }); label(ctx, 'HIGHWAY DEPT.', 540, 260, 120, t, wt(2, 'highway', 1) - .3, '#f27a1a'); }
} });
// [3] their plan? half a ton of dynamite
SHOTS.push({ start: S(3), end: S(4), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.04, dz: .05 }); bgFlat(ctx, '#ffd36b', '#f2a93a'); applyCam(ctx, cam, 1);
  for (let i = 0; i < 12; i++) { ctx.save(); ctx.globalAlpha = .2; ctx.translate(540, 820); ctx.rotate(i / 12 * TAU + t * .3); path(ctx, [[0, 0], [-80, -1500], [80, -1500]]); ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.restore(); }
  const n = Math.floor(clamp((t - wt(3, 'half') + .1) / 1.0) * 12); for (let i = 0; i < n; i++) { const row = Math.floor(i / 4), c = i % 4; dynCrate(ctx, 230 + c * 205 + row * 20, G - 20 - row * 160, 190); }
  boss(ctx, { x: 540, y: n > 4 ? 760 : G + 160, s: n > 4 ? 340 : 600, arms: { L: [2.4, .3], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } });
  label(ctx, 'THE PLAN?', 540, 260, 130, t, S(3) + .05, '#ffffff', wt(3, 'half') - .1); label(ctx, 'HALF A TON', 540, 260, 140, t, wt(3, 'half') - .1, '#e0392f'); label(ctx, 'OF DYNAMITE', 540, 400, 90, t, wt(3, 'dynamite') - .2, '#ffffff');
} });
// [4] blast turns the whale into tiny pieces, seagulls clean up the rest (the plan, as a chalk sketch)
SHOTS.push({ start: S(4), end: S(5), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .02 }); bgFlat(ctx, '#2a4a3a', '#1a3428'); applyCam(ctx, cam, 1);
  rrect(ctx, 60, 360, 960, 860, 20); ctx.lineWidth = 22; ctx.strokeStyle = '#8a5a3a'; ctx.stroke(); text(ctx, 'THE PLAN', 540, 450, 70, '#f2f2e8', INK, 0);
  const tp = wt(4, 'tiny') - .3, sg = wt(4, 'seagulls') - .2;
  if (t < tp) { ctx.save(); ctx.globalAlpha = .9; whale(ctx, 560, 980, 680, t, { col: '#e8e8e0' }); ctx.restore(); boom(ctx, 560, 880, 260, clamp((t - wt(4, 'blast')) / 1.2), t); }
  else { const k = easeOut(clamp((t - tp) / .6)); for (let i = 0; i < 40; i++) { const r = rng(i * 7 + 1); const px = 560 + (r() - .5) * 700 * k, py = 980 - r() * 300 * k; const eaten = t > sg && (i * .05 + sg + .3) < t; if (!eaten) blubber(ctx, px, py, 16); } if (t > sg) for (let i = 0; i < 4; i++) { const k2 = clamp((t - sg - i * .2) / 1.4); gull(ctx, 140 + k2 * 800 + i * 40, 640 + Math.sin(k2 * 6 + i) * 60 + i * 70, .55, Math.sin(t * 14 + i), 1); } }
  label(ctx, 'TINY PIECES', 540, 260, 120, t, wt(4, 'tiny') - .2, '#ffffff', wt(4, 'seagulls') - .2); label(ctx, 'SEAGULLS EAT IT', 540, 260, 110, t, wt(4, 'seagulls') - .2, '#ffd23a');
  label(ctx, '✓', 900, 520, 120, t, wt(4, 'rest') - .2, '#7ee08a');
} });
// [5] a crowd gathered to watch; news cameras were rolling
SHOTS.push({ start: S(5), end: S(6), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const news = t > wt(5, 'news') - .2; beachBG(ctx, t, cam); applyCam(ctx, cam, 1);
  whale(ctx, 900, 1000, 520, t);
  if (!news) { for (let i = 0; i < 7; i++) local(ctx, { x: 90 + i * 130, y: G + 120 + (i % 2) * 50, s: 330, flip: 1, bob: Math.sin(t * 5 + i) * .01, arms: i % 3 ? POSE.idle.arms : { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: i % 2 ? 'grin' : 'smile', look: [1, 0] } }, i); label(ctx, 'A CROWD', 540, 260, 130, t, wt(5, 'crowd') - .2, '#ffffff'); }
  else { newsCam(ctx, 330, G + 160, 420, t); local(ctx, { x: 160, y: G + 200, s: 470, arms: { L: [.3, -.1], R: { ik: [.42, -.6] } }, face: { eyes: 'squint', mouth: 'flat', look: [1, 0] } }, 4); local(ctx, { x: 780, y: G + 200, s: 520, flip: -1, cols: ['#c84a3a', '#c84a3a'], arms: { L: [.3, -.1], R: { ik: [.3, -.62] } }, face: { eyes: 'normal', mouth: 'grin', look: [-1, 0] } }, 0); micAt(ctx, 780 - .3 * 520, G + 200 - .66 * 520, 120, .3); label(ctx, 'NEWS CAMERAS', 540, 260, 110, t, wt(5, 'news') - .2, '#ff5a4a'); text(ctx, '● REC', 900, 380, 54, Math.sin(t * 6) > 0 ? '#ff3a2a' : '#5a1a1a', INK, 0); }
} });
// [6] then they pushed the button
SHOTS.push({ start: S(6), end: S(7), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.08, dz: .08, shake: 2 }); beachBG(ctx, t, cam, { dunes: false }); applyCam(ctx, cam, 1);
  const k = easeIn(clamp((t - wt(6, 'pushed') + .05) / .25)); const hy = G - 20 - 150 - 165 * (1 - k);
  worker(ctx, { x: 420, y: G + 60, s: 560, arms: { L: [2.4, .3], R: { ik: [(545 - 420) / 560, (hy - G - 60) / 560] } }, face: { eyes: k > .9 ? 'squint' : 'wide', mouth: k > .9 ? 'teeth' : 'o', look: [1, 1] } });
  plunger(ctx, 640, G - 20, 300, k); if (k > .95) burst(ctx, 640, hy, 120, 10, '#ffd23a', 2);
  label(ctx, '3', 540, 300, 160, t, S(6), '#ffffff', S(6) + .4); label(ctx, '2', 540, 300, 160, t, S(6) + .4, '#ffffff', S(6) + .8); label(ctx, '1', 540, 300, 160, t, S(6) + .8, '#ffd23a', wt(6, 'button'));
} });
// [7] chunks of whale flew hundreds of meters, rained down on the crowd
SHOTS.push({ start: S(7), end: S(8), tr: 'whip', draw(ctx, lt, t) {
  const rain = t > wt(7, 'rained') - .2; const cam = camA(t, lt, { z: rain ? 1.02 : .95, dz: .02, shake: rain ? 6 : 10 }); beachBG(ctx, t, cam, { top: '#a8b8c8' }); applyCam(ctx, cam, 1);
  if (!rain) { const k = clamp((t - S(7)) / 1.8); whale(ctx, WX, WY, 900, t, { gone: 1 }); boom(ctx, WX, WY - 200, 600, k * .9 + .1, t); for (let i = 0; i < 18; i++) { const r = rng(i * 5 + 2); const vx = (r() - .5) * 1400, vy = -900 - r() * 700, tt = k * 1.6; blubber(ctx, WX + vx * tt, WY - 200 + vy * tt + 900 * tt * tt, 22 + r() * 30, t * 4 + i); } tint(ctx, '#fff6d8', 1 - clamp((t - S(7)) / .3)); label(ctx, 'BOOM', 540, 260, 170, t, S(7) + .05, '#ffb02a', wt(7, 'hundreds') - .2); label(ctx, 'HUNDREDS OF METERS', 540, 260, 84, t, wt(7, 'hundreds') - .2, '#ffffff'); }
  else { for (let i = 0; i < 6; i++) { const r = rng(i * 13 + 5); const run = (t - wt(7, 'rained')) * 260; local(ctx, { x: 120 + i * 170 - run * (i % 2 ? 1 : -1) * .3, y: G + 120 + (i % 3) * 40, s: 380, flip: i % 2 ? -1 : 1, lean: .1, arms: { L: [2.6, .2], R: [2.6, .2] }, legs: { L: [.6 * Math.sin(t * 16 + i), -.3], R: [-.6 * Math.sin(t * 16 + i), -.3] }, face: { eyes: 'wide', mouth: 'teeth' } }, i); } for (let i = 0; i < 16; i++) { const r = rng(i * 3 + 9); const k = ((t - wt(7, 'rained')) * (.7 + r() * .4) + r()) % 1; blubber(ctx, r() * 1080, -100 + k * 1300, 20 + r() * 26, t * 3 + i); } label(ctx, 'IT RAINED WHALE', 540, 260, 104, t, wt(7, 'rained') - .2, '#ff9ab0'); }
} });
// [8] one huge piece crushed the roof of a brand new car
SHOTS.push({ start: S(8), end: S(9), tr: 'whip', draw(ctx, lt, t) {
  const hit = wt(8, 'crushed'); const cam = camA(t, lt, { z: 1.02, dz: .03, shake: t > hit && t < hit + .5 ? 14 : 3 }); beachBG(ctx, t, cam, { top: '#a8b8c8', dunes: false }); applyCam(ctx, cam, 1);
  const k = clamp((t - hit + .5) / .5); const crush = easeOut(clamp((t - hit) / .12)); car70(ctx, 560, G + 20, 1.6, crush, '#3a8a6a');
  if (k < 1) blubber(ctx, 540, -200 + 640 * easeIn(k), 130, t); else blubber(ctx, 540, G - 200 + crush * 70, 130, .4);
  if (t > hit && t < hit + .4) burst(ctx, 540, G - 260, 260, 12, '#ffd23a', 2);
  local(ctx, { x: 170, y: G + 220, s: 470, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: crush > .5 ? { eyes: 'wide', mouth: 'o' } : { eyes: 'happy', mouth: 'grin', look: [1, 0] } }, 3);
  label(ctx, 'BRAND NEW CAR', 540, 260, 110, t, wt(8, 'brand') - .2, '#7ee08a'); label(ctx, 'CRUSHED', 540, 260, 140, t, hit, '#e0392f', wt(8, 'brand') - .2);
} });
// [9] the seagulls were scared away; most of the whale was still on the beach
SHOTS.push({ start: S(9), end: S(10), tr: 'whip', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); const still = t > wt(9, 'most') - .2; beachBG(ctx, t, cam, { top: '#a8b8c8' }); applyCam(ctx, cam, 1);
  if (!still) { for (let i = 0; i < 6; i++) { const k = clamp((t - S(9) - i * .1) / 1.6); gull(ctx, [160, 420, 700, 300, 860, 560][i] + k * 500, [980, 760, 1020, 560, 640, 900][i] - k * 800, .7, Math.sin(t * 18 + i), 1, 1); } label(ctx, 'SCARED AWAY', 540, 260, 120, t, wt(9, 'scared') - .2, '#ffffff'); }
  else { whale(ctx, WX, WY, 860, t, { gone: .9, x: true }); stink(ctx, WX - 80, WY - 260, 300, t); worker(ctx, { x: 170, y: G + 200, s: 480, arms: { L: [2.6, -1.6], R: [2.6, -1.6] }, face: { eyes: 'half', mouth: 'frown' } }); boss(ctx, { x: 930, y: G + 200, s: 480, flip: -1, arms: POSE.hips.arms, face: { eyes: 'wide', mouth: 'flat' } }); sweat(ctx, 960, G + 200 - .9 * 480, 40); label(ctx, 'STILL THERE', 540, 260, 130, t, wt(9, 'still') - .2, '#ffd23a'); }
} });
// [10] today Florence has a park named after it: Exploding Whale Memorial Park
SHOTS.push({ start: S(10), end: S(11), tr: 'cut', draw(ctx, lt, t) {
  const cam = camA(t, lt, { z: 1.0, dz: .03 }); beachBG(ctx, t, cam, { top: '#5ab0e8' }); applyCam(ctx, cam, 1);
  const k = backOut(clamp((t - wt(10, 'exploding') + .2) / .4)); ctx.save(); ctx.translate(540, G - 60); ctx.scale(Math.max(.01, k), Math.max(.01, k)); ctx.scale(1.15, 1.15); signPost(ctx, 0, 0, 900, 320, 'EXPLODING WHALE\nMEMORIAL PARK', 80, '#7a4a2a', '#ffe8b0'); ctx.restore();
  if (k < .1) { for (let i = 0; i < 3; i++) local(ctx, { x: 220 + i * 320, y: G + 180, s: 440, arms: { L: [.3, -.1], R: [2.4, .3] }, face: { eyes: 'happy', mouth: 'grin' } }, i); label(ctx, 'TODAY', 540, 260, 130, t, S(10) + .05, '#ffffff', wt(10, 'park') - .2); label(ctx, 'A PARK...', 540, 260, 130, t, wt(10, 'park') - .2, '#ffd23a'); }
  else { confettiRain(ctx, t); gull(ctx, 300 + Math.sin(t) * 40, 400, .6, Math.sin(t * 12), 1); gull(ctx, 820, 480 + Math.sin(t * 2) * 30, .5, Math.sin(t * 12 + 1), -1); }
} });
