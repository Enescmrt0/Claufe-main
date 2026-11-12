// ---------- "What if all the oxygen in the air vanished for five seconds?" ----------
// Shot times are seconds of the voiceover (audio/words_ref.json).
const ME = { cols: PAL.blue, hat: 'none', belt: false };
const C = (base, extra) => Object.assign({}, base, extra);
const handheld = (t, a = 4) => shake(t * .35, a, 1, 2);
const THROAT = { L: { ik: [-.03, -.6], bend: -1 }, R: { ik: [.03, -.6] } };
// 16 oxygen molecules floating around the character: [x, y, r, phase]
const MOLS = (() => { const R = rng(21); return Array.from({ length: 16 }, () => [130 + R() * 820, 340 + R() * 600, 30 + R() * 14, R()]); })();

const SHOTS = [];

// A  0.0–3.2  hook: the air is full of oxygen, then every molecule pops ("vanished" 1.68)
SHOTS.push({ start: 0, end: 3.2, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 940 + hh[1], z: 1.02 + lt * .03, r: Math.sin(t * .5) * .005 };
  outdoorBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const gone = lt > 1.68;
  drawStick(ctx, C(ME, {
    x: 540, y: GROUND, s: 700, bob: Math.sin(t * 4) * .008,
    arms: gone ? THROAT : { L: [.9, .2], R: [.9, .2] },
    face: gone ? { eyes: 'wide', mouth: 'o', browUp: 1 } : { eyes: 'happy', mouth: 'smile' },
  }));
  MOLS.forEach(([x, y, r, ph], i) => {
    const pop = clamp((lt - 1.68 - ph * .35) / .22);
    drawO2(ctx, x + Math.sin(t * 1.3 + i) * 18, y + Math.cos(t * 1.1 + i * 2) * 14, r, pop);
  });
  label(ctx, 'OXYGEN: 0%', 540, 290, 96, lt, 1.9, '#ff6a6a');
} });

// B  3.2–5.4  "drop dead" (4.32): falls over. "You wouldn't" (4.88): springs back up
SHOTS.push({ start: 3.2, end: 5.4, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .02, r: 0 };
  outdoorBG(ctx, t, cam, { sun: false });
  applyCam(ctx, cam, 1);
  const fall = kf(lt, [[.5, 0], [1.08, 1, easeIn], [1.6, 1], [1.8, 0, backOut]]);
  const up = lt > 1.74;
  const sq = up ? kf(lt, [[1.74, .8], [2.0, 1, backOut]]) : 1;
  drawStick(ctx, C(ME, {
    x: 450, y: GROUND, s: 620, lean: fall * 1.3, squash: sq,
    arms: up ? { L: [1.7, .9], R: [1.7, .9] } : THROAT,
    face: up ? { eyes: 'normal', mouth: 'smile', browUp: 1 } : { eyes: fall > .6 ? 'x' : 'wide', mouth: 'o' },
  }));
  if (lt > 1.08 && lt < 1.75) puff(ctx, 800, GROUND - 30, 120 * clamp((lt - 1.08) / .3), t, '#f3efe6', 3, 1 - clamp((lt - 1.3) / .4));
  label(ctx, 'NOPE', 760, 430, 130, lt, 1.76, '#7ee08a');
} });

// C  5.4–7.4  holding your breath: the stopwatch sails past five seconds
SHOTS.push({ start: 5.4, end: 7.4, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 950 + hh[1], z: 1.03 + lt * .03, r: 0 };
  outdoorBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  drawStick(ctx, C(ME, {
    x: 400, y: GROUND + 40, s: 760, blush: true, bob: Math.sin(t * 9) * .004,
    arms: { L: [.5, -1.9], R: { ik: [.3, -.66] } },
    face: { eyes: 'wide', mouth: 'flat', browUp: .5 },
  }));
  const secs = Math.floor(5 + lt * 15);
  drawStopwatch(ctx, 800, 560, 150, secs / 60, secs + ' s');
  label(ctx, 'HOLD IT', 760, 300, 84, lt, .25);
} });

// D  7.4–9.8  the air as a box of molecules: one column in five is oxygen ("fifth" 8.8)
SHOTS.push({ start: 7.4, end: 9.8, tr: 'whip', draw(ctx, lt, t) {
  const cam = { x: 540, y: 960, z: 1 + lt * .015, r: 0 };
  applyCam(ctx, cam, 1); drawSky(ctx, '#3ea6ee', '#d3f0fb');
  rrect(ctx, 150, 440, 780, 660, 46); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.fill(); rrect(ctx, 150, 440, 780, 660, 46); fillStroke(ctx, null, 8);
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
    const ox = c === 2; const x = 250 + c * 145 + Math.sin(t * 2 + r * 3 + c) * 8, y = 520 + r * 125 + Math.cos(t * 1.7 + c * 2 + r) * 8;
    drawO2(ctx, x, y, 30, ox ? clamp((lt - 1.4 - r * .05) / .2) : 0, ox ? '#6fd0ff' : '#b9c4d6');
  }
  label(ctx, 'AIR', 540, 340, 110, lt, 0);
  label(ctx, '1/5 GONE', 540, 1175, 90, lt, 1.62, '#ff6a6a');
} });

// E  9.8–13.3  ears pop (10.56), then rocket 2 km up the mountain (11.4–12.2)
SHOTS.push({ start: 9.8, end: 13.3, tr: 'whip', draw(ctx, lt, t) {
  const up = kf(lt, [[1.5, 0], [2.4, 1]]);
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: lerp(980, 800, up) + hh[1], z: 1.0, r: 0 };
  applyCam(ctx, cam, .08); drawSky(ctx, '#3ea6ee', '#d3f0fb');
  applyCam(ctx, cam, .14); drawCloud(ctx, 150 + t * 6, 420, 110, 1); drawCloud(ctx, 900 + t * 4, 620, 80, 2);
  applyCam(ctx, cam, 1);
  drawMountain(ctx, 640, 300, GROUND, 760);
  ctx.fillStyle = '#7ed05a'; ctx.fillRect(-2000, GROUND - 10, 5080, 3000); line(ctx, -2000, GROUND - 10, 3080, GROUND - 10, 6);
  const x = lerp(260, 500, up), y = lerp(GROUND, 540, up);
  const flying = up > 0 && up < 1;
  if (flying) for (let i = 0; i < 4; i++) line(ctx, x - 60 + i * 40, y + 30 + i * 12, x - 110 + i * 40, y + 150 + i * 12, 8, '#ffffff');
  const pop = clamp((lt - .76) / .45);
  drawStick(ctx, C(ME, {
    x, y, s: 300, lean: flying ? .25 : 0,
    arms: flying ? { L: [2.6, .2], R: [2.6, .2] } : (pop > 0 && pop < 1 ? { L: { ik: [-.16, -.76], bend: -1 }, R: { ik: [.16, -.76] } } : { L: [.3, -.1], R: [.3, -.1] }),
    face: flying ? { eyes: 'wide', mouth: 'o' } : (pop > 0 && pop < 1 ? { eyes: 'squint', mouth: 'o' } : { eyes: 'normal', mouth: up >= 1 ? 'o' : 'flat' }),
  }));
  if (pop > 0 && pop < 1) for (const sd of [-1, 1]) { ctx.save(); ctx.globalAlpha = 1 - pop; burst(ctx, x + sd * 90, y - 230, 46 + pop * 30, 8, '#ffd23a', 5 + sd); ctx.restore(); }
  if (lt < 1.5) label(ctx, 'POP', 540, 420, 110, lt, .78, '#ffd23a');
  label(ctx, '2 KM UP', 760, 330, 84, lt, 2.2);
} });

// F  13.3–17.0  candles (15.12), stoves (15.76), campfires (16.24) go out one by one
SHOTS.push({ start: 13.3, end: 17.0, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 990 + hh[1], z: 1.02 + lt * .02, r: 0 };
  outdoorBG(ctx, t, cam, { skyTop: '#2f6fc0', skyBot: '#f7c9a0', sun: false });
  applyCam(ctx, cam, 1);
  const T = [1.82, 2.46, 2.94];
  const lit = T.map(a => 1 - clamp((lt - a) / .14));
  const smoke = (i, x, y) => wisp(ctx, x, y, 230, t, clamp((lt - T[i]) / .2));
  drawCandle(ctx, 220, GROUND + 20, 260, t, lit[0]); smoke(0, 220, GROUND + 20 - 300);
  drawStove(ctx, 540, GROUND + 30, 230, t, lit[1]); smoke(1, 540, GROUND + 30 - 150);
  drawCampfire(ctx, 860, GROUND + 30, 190, t, lit[2]); smoke(2, 860, GROUND - 20);
  label(ctx, 'NO OXYGEN', 540, 320, 88, lt, 1.2);
  label(ctx, 'NO FIRE', 540, 430, 100, lt, 1.5, '#ff6a6a');
} });

// G  17.0–20.4  a car's engine cuts out ("cut out" 18.0) and it rolls to a stop
SHOTS.push({ start: 17.0, end: 20.4, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.0 + lt * .015, r: 0 };
  outdoorBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  ctx.fillStyle = '#4a4f5c'; ctx.fillRect(-2000, GROUND - 20, 5080, 170); line(ctx, -2000, GROUND - 20, 3080, GROUND - 20, 6);
  for (let i = -4; i < 14; i++) { rrect(ctx, i * 160 + 20, GROUND + 56, 90, 12, 6); ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fill(); }
  const x = kf(lt, [[0, -160], [1.0, 400, v => v], [2.5, 620, easeOut]]);
  const dead = lt > 1.0;
  const cough = dead ? shake(t, 6 * (1 - clamp((lt - 1.0) / 1.2)), 3)[0] : 0;
  drawCar(ctx, x + cough, GROUND + 90, 1.15, x / 50);
  if (dead) for (let i = 0; i < 3; i++) { const k = ((lt - 1.0) * .9 + i / 3) % 1; puff(ctx, x + 230 + k * 60, GROUND - 40 - k * 220, 40 + k * 60, t, '#8d93a3', 4 + i, 1 - k); }
  label(ctx, 'ENGINE OFF', 540, 320, 92, lt, 1.05, '#ff6a6a');
  label(ctx, 'FUEL NEEDS OXYGEN', 540, 440, 58, lt, 1.9);
} });

// H  20.4–22.9  five seconds later the oxygen floods back ("back" 22.4)
SHOTS.push({ start: 20.4, end: 22.9, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 540 + hh[0], y: 940 + hh[1], z: 1.03 + lt * .02, r: 0 };
  outdoorBG(ctx, t, cam);
  applyCam(ctx, cam, 1);
  const back = lt > 1.95;
  drawStick(ctx, C(ME, {
    x: 540, y: GROUND, s: 700, blush: !back, squash: back ? kf(lt, [[1.95, .92], [2.2, 1, backOut]]) : 1,
    arms: back ? { L: [2.5, .3], R: [2.5, .3] } : { L: [.3, -.1], R: [.3, -.1] },
    face: back ? { eyes: 'happy', mouth: 'grin' } : { eyes: 'wide', mouth: 'flat' },
  }));
  MOLS.forEach(([x, y, r, ph], i) => {
    const k = easeOut(clamp((lt - .9 - ph * .6) / .5)); if (k <= 0) return;
    const sx = x < 540 ? -200 : 1280;
    drawO2(ctx, lerp(sx, x, k) + Math.sin(t * 1.3 + i) * 18, lerp(y - 200, y, k) + Math.cos(t * 1.1 + i * 2) * 14, r, 0);
  });
  label(ctx, 'OXYGEN: 21%', 540, 290, 92, lt, 2.0, '#7ee08a');
} });

// I  22.9–25.4  the candle stays out: poking it does nothing
SHOTS.push({ start: 22.9, end: 25.4, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 3);
  const cam = { x: 560 + hh[0], y: 960 + hh[1], z: 1.04 + lt * .03, r: 0 };
  outdoorBG(ctx, t, cam, { skyTop: '#2f6fc0', skyBot: '#f7c9a0', sun: false });
  applyCam(ctx, cam, 1);
  drawCandle(ctx, 660, GROUND + 20, 400, t, 0);
  wisp(ctx, 660, GROUND + 20 - 460, 260, t, 1 - clamp(lt / 2.2) * .7);
  const poke = kf(lt, [[.9, 0], [1.2, 1], [1.45, .6], [1.7, 1], [2.0, .3]]);
  drawStick(ctx, C(ME, {
    x: 380, y: GROUND + 30, s: 640, lean: .1, armLen: 1.3,
    arms: { L: [.3, -.1], R: { ik: [lerp(.2, .4, poke), lerp(-.45, -.68, poke)] } },
    face: { eyes: 'half', look: [.7, .2], mouth: 'flat', browOne: 1 },
  }));
  label(ctx, 'STILL OUT', 400, 330, 88, lt, 1.25);
} });

// J  25.4–30.5  the scary version: every oxygen atom. water (28.88) and rock (29.36) fall apart
SHOTS.push({ start: 25.4, end: 30.5, tr: 'whip', draw(ctx, lt, t) {
  const hh = handheld(t, 5);
  const cam = { x: 540 + hh[0], y: 960 + hh[1], z: 1.02 + lt * .012, r: Math.sin(t * .7) * .006 };
  outdoorBG(ctx, t, cam, { skyTop: '#3a2a6a', skyBot: '#c98aa0', sun: false, grass: '#5f9a55', grassDark: '#4c8247', hillA: '#4f8a55', hillB: '#437a4c' });
  applyCam(ctx, cam, 1);
  // water: the glass empties into rising gas
  const w = clamp((lt - 3.48) / .5);
  drawGlass(ctx, 300, GROUND + 20, 330, 1 - w);
  if (w > 0) for (let i = 0; i < 9; i++) { const k = clamp((lt - 3.48 - i * .05) / .9); if (k > 0 && k < 1) { circle(ctx, 300 + Math.sin(i * 2.3) * 90 * k, GROUND - 200 - k * 520, 22 + k * 16); ctx.globalAlpha = 1 - k; fillStroke(ctx, '#ffffff', 5); ctx.globalAlpha = 1; } }
  // rock: cracks, then crumbles
  const crack = clamp((lt - 3.96) / .25), crumble = clamp((lt - 4.3) / .6);
  if (crumble <= 0) drawRock(ctx, 790, GROUND + 20, 210, crack);
  else for (let i = 0; i < 9; i++) { const a = -Math.PI * (.1 + i * .1); const d = 60 + crumble * (90 + i * 22); const px = 790 + Math.cos(a) * d, py = Math.min(GROUND + 10, GROUND - 60 + Math.sin(a) * d * (1 - crumble) + crumble * crumble * 120); drawRock(ctx, px, py, 46 - i * 2, 0, 11 + i); }
  tint(ctx, '#1a0b2e', .28);
  label(ctx, 'EVERY OXYGEN ATOM', 540, 300, 70, lt, 1.6, '#ff6a6a');
  label(ctx, 'WATER', 300, 760, 62, lt, 2.6); label(ctx, '89% oxygen', 300, 835, 44, lt, 2.8, '#bfe4ff');
  label(ctx, 'ROCK', 790, 760, 62, lt, 3.0); label(ctx, '~46% oxygen', 790, 835, 44, lt, 3.2, '#bfe4ff');
} });

// K  30.5–34.8  "so would you" (31.12): the body is about 65% oxygen (32.48), then poof (33.5)
SHOTS.push({ start: 30.5, end: 34.8, tr: 'cut', draw(ctx, lt, t) {
  const hh = handheld(t, 5);
  const cam = { x: 540 + hh[0], y: 950 + hh[1], z: 1.03 + lt * .02, r: 0 };
  outdoorBG(ctx, t, cam, { skyTop: '#3a2a6a', skyBot: '#c98aa0', sun: false, grass: '#5f9a55', grassDark: '#4c8247', hillA: '#4f8a55', hillB: '#437a4c' });
  applyCam(ctx, cam, 1);
  const gone = clamp((lt - 3.02) / .45);
  const fill = kf(lt, [[1.5, 0], [2.2, .65]]);
  // body meter
  rrect(ctx, 790, 520, 110, 600, 30); ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fill();
  ctx.save(); rrect(ctx, 790, 520, 110, 600, 30); ctx.clip(); ctx.fillStyle = '#6fd0ff'; ctx.fillRect(790, 1120 - 600 * fill, 110, 600 * fill); ctx.restore();
  rrect(ctx, 790, 520, 110, 600, 30); fillStroke(ctx, null, 8);
  if (gone < 1) drawStick(ctx, C(ME, {
    x: 420, y: GROUND, s: 680, alpha: 1 - gone, bob: Math.sin(t * 14) * .004 * (lt > .6 ? 1 : 0),
    arms: { L: { ik: [-.13, -.47], bend: -1 }, R: { ik: [.13, -.47] } },
    face: { eyes: 'wide', look: [0, .8], mouth: lt > .6 ? 'o' : 'flat', browUp: 1 },
  }));
  if (gone > 0) MOLS.forEach(([mx, my, r, ph], i) => {
    const a = i / 16 * TAU, d = gone * (160 + ph * 260);
    drawO2(ctx, 420 + Math.cos(a) * d, 760 + Math.sin(a) * d, r, clamp((lt - 3.5 - ph * .3) / .3));
  });
  if (gone > 0 && gone < 1) puff(ctx, 420, 820, 260 * gone, t, '#f3efe6', 9, 1 - gone);
  tint(ctx, '#1a0b2e', .28);
  label(ctx, 'AND YOU', 400, 310, 96, lt, .62, '#ff6a6a');
  label(ctx, '65%', 845, 430, 110, lt, 1.98, '#6fd0ff');
} });
