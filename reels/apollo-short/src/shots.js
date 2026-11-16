import * as THREE from 'three';
import { makeToon, stand, toon, ink, shade } from './toon.js';
import { ocean, table, crate, sign, redX, box, cyl, ball } from './sets.js';
import { toSpace, earth, moon, stack, lm, vent, cabin, consoles, wallScreen, squareFilter, roundSocket, ductTape, sock, hose, bagPlastic, cardboard, co2Meter, capsule, radioWaves } from './space.js';
import { glowSprite, sparks } from './props.js';
import { kf, lerp, easeOut, easeInOut, range, clamp, V, cam, place, shake, ikArm } from './anim.js';
export const CAPTIONS = [[0.0, "In", 0.24], [0.24, "1970,", 1.59], [1.6, "three", 1.92], [1.92, "astronauts", 2.64], [2.64, "were", 2.8], [2.8, "saved", 3.12], [3.12, "by", 3.28], [3.28, "a", 3.44], [3.44, "sock", 3.92], [3.92, "and", 4.08], [4.08, "some", 4.24], [4.24, "duct", 4.64], [4.64, "tape.", 5.06], [5.06, "Two", 5.48], [5.48, "hundred", 5.9], [5.9, "thousand", 6.32], [6.32, "miles", 6.8], [6.8, "from", 7.04], [7.04, "Earth,", 7.76], [7.76, "an", 7.92], [7.92, "oxygen", 8.48], [8.48, "tank", 8.8], [8.8, "on", 8.96], [8.96, "Apollo", 9.6], [9.6, "13", 10.08], [10.08, "exploded.", 10.88], [10.88, "The", 10.96], [10.96, "crew", 11.36], [11.36, "squeezed", 11.92], [11.92, "into", 12.08], [12.08, "their", 12.24], [12.24, "tiny", 12.72], [12.72, "lunar", 13.12], [13.12, "module", 13.84], [13.84, "and", 14.08], [14.08, "used", 14.4], [14.4, "it", 14.56], [14.56, "as", 14.72], [14.72, "a", 14.88], [14.88, "lifeboat.", 15.52], [15.52, "But", 15.68], [15.68, "it", 15.76], [15.76, "was", 15.92], [15.92, "built", 16.16], [16.16, "for", 16.4], [16.4, "two", 16.64], [16.64, "people", 16.88], [16.88, "for", 17.12], [17.12, "two", 17.36], [17.36, "days.", 18.08], [18.08, "Now", 18.32], [18.32, "it", 18.48], [18.48, "had", 18.72], [18.72, "three,", 19.04], [19.04, "for", 19.28], [19.28, "four.", 19.76], [19.76, "And", 19.92], [19.92, "every", 20.16], [20.16, "breath", 20.56], [20.56, "filled", 20.88], [20.88, "the", 20.96], [20.96, "cabin", 21.36], [21.36, "with", 21.52], [21.52, "more", 21.76], [21.76, "carbon", 22.32], [22.32, "dioxide.", 23.2], [23.2, "The", 23.36], [23.36, "command", 23.76], [23.76, "module", 24.24], [24.24, "had", 24.4], [24.4, "spare", 24.8], [24.8, "air", 25.12], [25.12, "filters.", 26.0], [26.0, "But", 26.16], [26.16, "they", 26.32], [26.32, "were", 26.56], [26.56, "square,", 27.28], [27.28, "and", 27.44], [27.44, "the", 27.52], [27.52, "lunar", 27.92], [27.92, "module's", 28.48], [28.48, "holes", 28.88], [28.88, "were", 29.04], [29.04, "round.", 29.68], [29.68, "So", 29.92], [29.92, "engineers", 30.64], [30.64, "on", 30.8], [30.8, "the", 30.96], [30.96, "ground", 31.44], [31.44, "dumped", 32.16], [32.16, "everything", 32.48], [32.48, "the", 32.64], [32.64, "crew", 33.04], [33.04, "had", 33.28], [33.28, "on", 33.44], [33.44, "board", 33.84], [33.84, "onto", 34.16], [34.16, "a", 34.24], [34.24, "table.", 34.8], [34.8, "Plastic", 35.28], [35.28, "bags.", 35.84], [35.84, "Cardboard.", 36.48], [36.48, "Hoses.", 37.2], [37.2, "A", 37.36], [37.36, "sock.", 37.76], [37.76, "And", 37.92], [37.92, "duct", 38.24], [38.24, "tape.", 38.64], [38.64, "They", 38.72], [38.72, "built", 38.96], [38.96, "a", 39.04], [39.04, "square", 39.44], [39.44, "filter", 39.84], [39.84, "that", 40.08], [40.08, "fit", 40.32], [40.32, "a", 40.48], [40.48, "round", 40.8], [40.8, "hole,", 41.44], [41.44, "and", 41.68], [41.68, "read", 42.0], [42.0, "the", 42.16], [42.16, "instructions", 42.8], [42.8, "up", 43.04], [43.04, "to", 43.2], [43.2, "space.", 43.76], [43.76, "The", 43.92], [43.92, "crew", 44.24], [44.24, "built", 44.56], [44.56, "it,", 44.96], [44.96, "and", 45.12], [45.12, "the", 45.2], [45.2, "carbon", 45.68], [45.68, "dioxide", 46.48], [46.48, "started", 46.8], [46.8, "to", 46.96], [46.96, "fall.", 47.44], [47.44, "Four", 47.76], [47.76, "days", 48.0], [48.0, "after", 48.24], [48.24, "the", 48.4], [48.4, "explosion,", 49.59], [49.44, "all", 49.68], [49.68, "three", 50.0], [50.0, "splashed", 50.64], [50.64, "down", 50.88], [50.88, "safely", 51.28], [51.28, "in", 51.44], [51.44, "the", 51.52], [51.52, "Pacific.", 52.2]];
export const DURATION = 52.95;

export const FADES = [];

// ---------- helpers ----------
const look = (scene, o) => {
  const u = scene.userData.sky.material.uniforms;
  if (o.top) { u.top.value.set(o.top); u.mid.value.set(o.mid); u.horizon.value.set(o.hor); u.floorC.value.set(o.hor); }
  scene.userData.key.intensity = o.sun ?? 2.3;
  scene.traverse(x => { if (x.isHemisphereLight) x.intensity = o.hemi ?? .75; });
};
const astro = (i) => makeToon({ shirt: 0xf2f2ee, pants: 0xdedede, hat: 'snoopy', hair: null, shoes: 0x2a2d33, glasses: false, scale: 1 });
const engineer = (i) => makeToon({ shirt: [0xf6f6f2, 0xe9eef6, 0xf6f1e4][i % 3], hair: [0x2a1d17, 0x6a3d22, 0x111111][i % 3], glasses: i % 2 === 0 });
const pop = (t, at, d = .3) => easeOut(range(t, at, at + d));
const popScale = (obj, t, at, s = 1) => { const k = pop(t, at); obj.scale.setScalar(.001 + s * k * (1 + .2 * Math.sin(range(t, at, at + .5) * Math.PI))); obj.visible = k > 0; };
// space backdrop with Earth far away
function spaceStage(makeStage, o = {}) {
  const scene = makeStage({ shadowSize: 6, sunDir: [-6, 3, 5] }); toSpace(scene);
  if (o.earth !== false) { const e = earth(o.earthR || 6); e.position.set(...(o.earthPos || [-9, -4, -26])); scene.add(e); scene.userData.earth = e; }
  return scene;
}
const follow = (scene, c) => { scene.userData.stars.position.copy(c.position); };

// ============ A (0 - 5.06): a sock and duct tape float in space ============
function shotA({ makeStage }) {
  const scene = spaceStage(makeStage, { earthPos: [2, -3.5, -14], earthR: 5 });
  const sk = sock(1.6); scene.add(sk); const dt = ductTape(1.6); scene.add(dt);
  const st = stack(.6); st.position.set(-1.6, 2.2, -8); st.rotation.set(.3, .9, 0); scene.add(st);
  const gl = glowSprite(0xffffff, 2.2); gl.position.set(0, 0, -.5); scene.add(gl);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    sk.position.set(-.55, .25 + Math.sin(t * 1.3) * .08, 0); sk.rotation.set(t * .4, t * .7, .3);
    dt.position.set(.6, -.35 + Math.sin(t * 1.1 + 1) * .08, .2); dt.rotation.set(.5 + t * .3, t * .5, 0);
    st.rotation.y = .9 + t * .05;
    gl.material.opacity = .15 + .1 * Math.sin(t * 3);
    const k = easeInOut(range(t, 0, 5));
    place(c, [lerp(.3, .1, k), lerp(.4, .2, k), lerp(6.2, 5.0, k)], [0, 0, 0]); follow(scene, c);
    return { bloom: .6, dof: { focus: c.position.length(), aperture: .002, maxblur: .006 } };
  } };
}
// ============ B (5.06 - 10.88): 200,000 miles out, the tank explodes ============
function shotB({ makeStage }) {
  const scene = spaceStage(makeStage, { earthPos: [-6, -3, -40], earthR: 3 });
  const mn = moon(4); mn.position.set(10, 6, -60); scene.add(mn);
  const st = stack(1); scene.add(st);
  const T0 = 10.08 - 5.06;
  const flash = glowSprite(0xffe2b0, 5); scene.add(flash);
  const sp = sparks(160, { speed: 2.4, spread: 1.2, gravity: 0, life: 1.6, size: .08, dir: V(0, 1, 0), seed: 5, color: [1, .8, .5] }); scene.add(sp);
  const vt = vent(); scene.add(vt);
  const lbl = sign([['200,000 MILES', 68, '#ffffff'], ['FROM EARTH', 50, '#9fc4ff']], 2.6, .9, { bg: '#0a1028', border: '#9fc4ff', basic: true }); scene.add(lbl);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    st.position.set(0, 0, 0); st.rotation.set(.15, -1.35 + t * .02, .05);
    st.updateMatrixWorld(true);
    const bayW = st.csm.localToWorld(V(0, .65, -.2));
    const it = t - T0;
    flash.position.copy(bayW); flash.material.opacity = it > 0 ? Math.max(0, 1 - it * 1.6) : 0; flash.scale.setScalar(2 + Math.max(0, it) * 4);
    sp.position.copy(bayW); sp.update(it);
    st.csm.panel.position.set(it * 1.4, .61 + Math.max(0, it) * 1.8, -.2 + it * .3); st.csm.panel.rotation.set(it * 3, it * 2, 0); st.csm.panel.visible = true; if (it <= 0) { st.csm.panel.position.set(0, .61, -.2); st.csm.panel.rotation.set(0, 0, 0); }
    vt.position.copy(bayW); vt.update(it); vt.visible = it > 0;
    const k = easeInOut(range(t, 0, T0));
    const s = it > 0 && it < .6 ? shake(t * 12, 6) : [0, 0, 0];
    place(c, [lerp(-4, -5.4, k) + s[0], lerp(2.0, 1.4, k) + s[1], lerp(10.5, 8.2, k)], [-.7, .6, 0]); follow(scene, c);
    c.updateMatrixWorld(true); lbl.position.copy(c.position).add(V(0, 1.5, -7.5).applyQuaternion(c.quaternion)); lbl.quaternion.copy(c.quaternion); lbl.visible = t > .4 && t < T0 - .3;
    return { bloom: it > 0 ? 1.2 : .5, exposure: it > 0 && it < .2 ? 1.6 : 1 };
  } };
}
// ============ C (10.88 - 15.52): three men squeeze into the tiny lunar module ============
function shotC({ makeStage }) {
  const scene = makeStage({ shadowSize: 4, sun: .6 }); look(scene, { top: 0x101318, mid: 0x15181e, hor: 0x1a1d24, sun: .8, hemi: .7 });
  const cb = cabin(); scene.add(cb);
  const crew = [0, 1, 2].map(astro); crew.forEach(h => scene.add(h.root));
  const lbl = sign([['LUNAR MODULE', 54, '#ffd23a']], 1.6, .3, { bg: '#2a2d33', border: null, basic: true }); lbl.position.set(0, 2.15, -1.22); scene.add(lbl);
  const c = cam(44);
  return { scene, camera: c, update(t) {
    cb.setLights(.6, 1, t);
    crew.forEach((h, i) => {
      const enter = easeOut(range(t, .2 + i * .5, 1.2 + i * .5));
      h.root.position.set(lerp(2.6, -.8 + i * .8, enter), .35 + Math.sin(t * 1.4 + i) * .05, lerp(1.6, -.3 + (i % 2) * .25, enter));
      h.root.rotation.set(0, lerp(-1.2, (i - 1) * -.3, enter), (1 - enter) * .3);
      stand(h, t + i, { lHip: [-.3, 0, .1], rHip: [-.2, 0, -.1], lKn: [.5, 0, 0], rKn: [.4, 0, 0] });
      h.faceAt(t, i === 1 ? 'worried' : 'shock', i === 0, i);
    });
    crew[0].reach('r', [-.1, 1.2, .35]);
    const k = easeInOut(range(t, 0, 4.6));
    place(c, [lerp(.4, 0, k), 1.3, lerp(5.6, 4.9, k)], [0, 1.0, -.4]);
    return { bloom: .8 };
  } };
}
// ============ D (15.52 - 19.76): built for two people for two days. Now three, for four ============
function shotD({ makeStage }) {
  const scene = spaceStage(makeStage, { earthPos: [5, -5, -30], earthR: 4 });
  const l = lm(1.2); scene.add(l);
  const s1 = sign([['2 PEOPLE', 88, '#ffffff'], ['2 DAYS', 88, '#7ee08a']], 1.5, .75, { bg: '#1a2440', border: '#7ee08a', basic: true }); scene.add(s1);
  const s2 = sign([['3 PEOPLE', 88, '#ffffff'], ['4 DAYS', 88, '#ff6a5a']], 1.5, .75, { bg: '#3a1418', border: '#ff6a5a', basic: true }); scene.add(s2);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    l.position.set(0, -1.1, 0); l.rotation.set(.1, t * .35, 0);
    const T = 15.52, now = 18.08 - T;
    s1.position.set(0, 1.75, .4); popScale(s1, t, .5); if (t > now - .05) s1.visible = false;
    s2.position.set(0, 1.75, .4); popScale(s2, t, now); s2.rotation.z = t > now ? Math.sin((t - now) * 30) * .05 * Math.max(0, 1 - (t - now) * 2) : 0;
    const k = easeInOut(range(t, 0, 4.2));
    place(c, [lerp(1.2, .4, k), lerp(.6, .4, k), lerp(7.6, 6.6, k)], [0, .4, 0]); follow(scene, c);
    return { bloom: .5 };
  } };
}
// ============ E (19.76 - 23.2): every breath adds carbon dioxide ============
function shotE({ makeStage }) {
  const scene = makeStage({ shadowSize: 3, sun: .6 }); look(scene, { top: 0x101318, mid: 0x15181e, hor: 0x1a1d24, sun: .8, hemi: .7 });
  const cb = cabin(); scene.add(cb);
  const h = astro(0); scene.add(h.root);
  const bubbles = []; for (let i = 0; i < 14; i++) { const b = ball(.05 + (i % 4) * .02, new THREE.MeshStandardMaterial({ color: 0x9aa39a, transparent: true, opacity: .7, roughness: .4 }), [0, 0, 0]); scene.add(b); bubbles.push(b); }
  const mt = co2Meter(1.4); scene.add(mt);
  const c = cam(36);
  return { scene, camera: c, update(t) {
    cb.setLights(.7, 0, t);
    h.root.position.set(-.25, .2, .2); h.root.rotation.y = .3; stand(h, t, { neck: [.05, 0, 0] });
    const br = .5 + .5 * Math.sin(t * 3.2); h.faceAt(t, br > .5 ? 'worried' : 'neutral', t > 2, 1);
    h.root.updateMatrixWorld(true); const mouth = h.j.head.localToWorld(V(0, -.05, .22));
    bubbles.forEach((b, i) => { const k = ((t * .45 + i / 14) % 1); b.position.copy(mouth).add(V(Math.sin(i * 2.1 + t) * .3 * k + k * .4, k * 1.3, Math.cos(i * 1.7) * .1)); b.material.opacity = .7 * (1 - k); });
    
    mt.set(lerp(.25, .85, easeInOut(range(t, .3, 3.3))));
    const k = easeInOut(range(t, 0, 3.4));
    place(c, [lerp(.6, .4, k), 1.45, lerp(3.9, 3.3, k)], [.1, 1.3, 0]);
    c.updateMatrixWorld(true); mt.position.copy(c.position).add(V(0, .58, -2.6).applyQuaternion(c.quaternion)); mt.quaternion.copy(c.quaternion);
    return { bloom: .7, dof: { focus: 3.4, aperture: .002, maxblur: .006 } };
  } };
}
// ============ F (23.2 - 29.68): spare filters are square; the holes are round ============
function shotF({ makeStage }) {
  const scene = makeStage({ shadowSize: 3, sun: .7 }); look(scene, { top: 0x101318, mid: 0x15181e, hor: 0x1a1d24, sun: .9, hemi: .8 });
  const cb = cabin(); scene.add(cb);
  const filters = [0, 1, 2, 3].map(i => { const f = squareFilter(1); scene.add(f); return f; });
  const sock2 = roundSocket(1.4); sock2.position.set(.55, 1.25, -1.2); scene.add(sock2);
  const held = squareFilter(1.2); scene.add(held);
  const X = redX(.5); scene.add(X);
  const h = astro(1); scene.add(h.root);
  const c = cam(40);
  const TB = 26.0 - 23.2, TS = 26.56 - 23.2, TR = 29.04 - 23.2;
  return { scene, camera: c, update(t) {
    cb.setLights(.7, 0, t);
    filters.forEach((f, i) => { f.position.set(-1.0 + (i % 2) * .55, .3 + Math.floor(i / 2) * .52, -.6); f.rotation.y = .3; popScale(f, t, .3 + i * .15); });
    h.root.position.set(-.75, .1, .2); h.root.rotation.y = -.7; stand(h, t);
    // try to push the square filter into the round hole: bump, bump, fail
    const tryK = range(t, TS, TS + 2.4), bump = Math.max(0, Math.sin(tryK * Math.PI * 4)) * (tryK > 0 && tryK < 1 ? 1 : 0);
    const hp = V(lerp(-.2, .48, easeInOut(range(t, TB, TS))) - bump * .08, 1.25, -1.0 + bump * .12);
    held.position.copy(hp); held.rotation.set(0, 0, Math.sin(t * 6) * .05 * tryK);
    h.reach('r', [-.1, 1.0, .5]); h.reach('l', [.2, 1.0, .5]);
    h.root.updateMatrixWorld(true); ikArm(h, 'r', hp.clone().add(V(-.2, 0, .1)), h.root.localToWorld(V(-.6, .8, -.2)), V(1, 0, 0), .2, .2); ikArm(h, 'l', hp.clone().add(V(-.15, -.1, .2)), h.root.localToWorld(V(.6, .8, -.2)), V(-1, 0, 0), .2, .2);
    h.faceAt(t, t > TR ? 'angry' : t > TS ? 'worried' : 'neutral', t > TR, 2);
    X.position.set(.55, 1.3, -.7); X.lookAt(c.position); popScale(X, t, TR - .1, 1);
    const sh = bump > .8 ? shake(t * 9, 2) : [0, 0, 0];
    const k = easeInOut(range(t, 0, 6.4));
    place(c, [lerp(-.5, .3, k) + sh[0], 1.45 + sh[1], lerp(3.6, 2.9, k)], [lerp(-.5, .3, k), 1.05, -.9]);
    return { bloom: .6 };
  } };
}
// ============ G (29.68 - 34.8): engineers dump everything onto a table ============
function shotG({ makeStage }) {
  const scene = makeStage({ shadowSize: 4 }); look(scene, { top: 0x2a3440, mid: 0x3a4656, hor: 0x56657a, sun: 1.8, hemi: .9 });
  const ws = wallScreen(6, 2.6); ws.position.set(0, 2.6, -3.2); scene.add(ws);
  const cs = consoles(4); cs.position.set(0, 0, -2.2); scene.add(cs);
  const tb = table(1.8, 1.0, .78); scene.add(tb);
  const items = [bagPlastic(1), cardboard(1.1), hose(1), sock(1), ductTape(1), bagPlastic(.8), cardboard(.9)]; items.forEach(x => scene.add(x));
  const bx = crate(.5); scene.add(bx);
  const eng = [0, 1, 2, 3].map(engineer); eng.forEach(h => scene.add(h.root));
  const c = cam(40);
  const TD = 31.44 - 29.68;
  return { scene, camera: c, update(t) {
    const tip = easeInOut(range(t, TD - .3, TD + .5));
    bx.position.set(.2, .82 + .7 * (1 - tip * .3), -.05); bx.rotation.set(0, 0, -tip * 1.9);
    items.forEach((x, i) => { const d = range(t, TD + .1 + i * .08, TD + .55 + i * .08); const tx = -.65 + i * .22, tz = -.15 + (i % 3) * .14; x.position.set(lerp(.1, tx, d), lerp(1.4, .8 + .02, d * d), lerp(0, tz, d)); x.rotation.y = i + d * 2; x.visible = t > TD; });
    eng.forEach((h, i) => { const a = (i / 4) * Math.PI * 2 + .6; h.root.position.set(Math.cos(a) * 1.15, 0, Math.sin(a) * .85 + .1); h.root.lookAt(0, 0, 0); stand(h, t + i, { spine: [.15, 0, 0], neck: [.35, 0, 0] }); h.faceAt(t, t > TD + .6 ? 'shock' : 'neutral', i === 2, i); });
    const k = easeInOut(range(t, 0, 5.1));
    place(c, [lerp(.4, 1.0, k), lerp(3.0, 2.7, k), lerp(4.6, 4.0, k)], [0, .85, 0]);
    return { bloom: .5 };
  } };
}
// ============ H (34.8 - 38.64): bags, cardboard, hoses, a sock, duct tape ============
function shotH({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 }); look(scene, { top: 0x2a3440, mid: 0x3a4656, hor: 0x56657a, sun: 1.9, hemi: .9 });
  const tb = table(3.2, 1.0, .78); scene.add(tb);
  const T = 34.8, at = [34.8, 35.84, 36.48, 37.2, 37.76].map(x => x - T);
  const items = [bagPlastic(1), cardboard(1.1), hose(1), sock(1.1), ductTape(1.2)]; items.forEach(x => scene.add(x));
  const c = cam(36);
  return { scene, camera: c, update(t) {
    items.forEach((x, i) => { const px = -1.2 + i * .6; x.position.set(px, .9 + (i === 3 ? .05 : 0), 0); const k = pop(t, at[i] - .05, .25); x.scale.setScalar(.001 + k * [1, 1.1, 1, 1.1, 1.2][i] * (1 + .2 * Math.sin(range(t, at[i], at[i] + .5) * Math.PI))); x.rotation.y = Math.sin(t * 1.2 + i) * .3 + (i === 4 ? 0 : 0); });
    // camera slides along the table to each new item
    const cx = kf(t, at.map((a, i) => [a + .1, -1.2 + i * .6]), easeInOut);
    place(c, [cx + .1, 1.6, 2.5], [cx, .95, 0]);
    return { bloom: .5, dof: { focus: 2.6, aperture: .003, maxblur: .008 } };
  } };
}
// ============ I (38.64 - 43.76): square filter fit to a round hole, instructions read up to space ============
function shotI({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 }); look(scene, { top: 0x2a3440, mid: 0x3a4656, hor: 0x56657a, sun: 1.9, hemi: .9 });
  const tb = table(1.8, 1.0, .78); scene.add(tb);
  const f = squareFilter(1.3); scene.add(f); const cb = cardboard(1.4); scene.add(cb); const hs = hose(1.2); scene.add(hs); const rs = roundSocket(.9); scene.add(rs);
  const tape = ductTape(1); scene.add(tape);
  const strips = []; for (let i = 0; i < 4; i++) { const s = box(.08, .02, .7, toon(0xa8adb4)); scene.add(s); strips.push(s); }
  const eng = [engineer(0), engineer(1)]; eng.forEach(h => scene.add(h.root));
  const radio = engineer(2); scene.add(radio.root);
  const clip = box(.3, .4, .02, toon(0xf4efe4)); scene.add(clip);
  const waves = radioWaves(); scene.add(waves);
  const c = cam(40);
  const TR = 41.68 - 38.64;
  return { scene, camera: c, update(t) {
    f.position.set(-.1, 1.0, 0); f.rotation.y = .4; cb.position.set(.25, 1.0, .05); cb.rotation.set(Math.PI / 2, .3, 0); hs.position.set(.4, .8, 0); rs.position.set(.65, 1.0, 0); rs.rotation.y = -.6;
    tape.position.set(-.05 + Math.sin(t * 4) * .15, 1.0 + Math.cos(t * 4) * .2, .3); tape.rotation.set(t * 4, 0, 0);
    strips.forEach((s, i) => { const k = pop(t, .4 + i * .6, .3); s.position.set(-.05 + i * .12, 1.0, 0); s.rotation.set(Math.PI / 2, 0, .3); s.scale.set(1, 1, k + .001); s.visible = k > 0; });
    eng.forEach((h, i) => { h.root.position.set(i ? .8 : -.8, 0, .45); h.root.lookAt(0, 0, 0); stand(h, t + i, { spine: [.15, 0, 0], neck: [.3, 0, 0] }); h.reach('r', [-.05, .95, .5]); h.reach('l', [.05, .95, .5]); h.faceAt(t, 'neutral', true, i); });
    radio.root.position.set(1.6, 0, -.6); radio.root.rotation.y = -.5; stand(radio, t, { neck: [.25, 0, 0] }); radio.reach('r', [-.1, 1.1, .35]); radio.faceAt(t, 'smile', false, 3); radio.setMouth?.(0);
    radio.root.updateMatrixWorld(true); clip.position.copy(radio.j.rWr.getWorldPosition(V(0, 0, 0))).add(V(0, .12, 0)); clip.lookAt(radio.j.head.getWorldPosition(V(0, 0, 0)));
    waves.position.set(1.7, 1.9, -.5); waves.update(t); waves.visible = t > TR;
    const k = easeInOut(range(t, 0, 5.1));
    place(c, [lerp(-.3, .6, k), lerp(2.2, 2.3, k), lerp(3.6, 4.2, k)], [lerp(.1, .6, k), 1.0, 0]);
    return { bloom: .6 };
  } };
}
// ============ J (43.76 - 47.44): the crew builds it; CO2 falls ============
function shotJ({ makeStage }) {
  const scene = makeStage({ shadowSize: 3, sun: .7 }); look(scene, { top: 0x101318, mid: 0x15181e, hor: 0x1a1d24, sun: .9, hemi: .8 });
  const cb = cabin(); scene.add(cb);
  const crew = [0, 1, 2].map(astro); crew.forEach(h => scene.add(h.root));
  const box1 = squareFilter(1.1); scene.add(box1); const hs = hose(.9); scene.add(hs);
  const strips = []; for (let i = 0; i < 3; i++) { const s = box(.07, .02, .62, toon(0xa8adb4)); scene.add(s); strips.push(s); }
  const mt = co2Meter(1.4); scene.add(mt);
  const c = cam(40);
  const TF = 46.48 - 43.76;
  return { scene, camera: c, update(t) {
    cb.setLights(.7, 0, t);
    crew.forEach((h, i) => { h.root.position.set(-.9 + i * .9, .2, .1 + (i % 2) * .2); h.root.rotation.y = (1 - i) * .35; stand(h, t + i); h.faceAt(t, t > TF ? 'happy' : 'neutral', i === 1 && t < TF, i); });
    box1.position.set(0, 1.25, .5); box1.rotation.set(.2, t * .3, 0); hs.position.set(.15, 1.0, .5);
    strips.forEach((s, i) => { s.position.set(-.1 + i * .1, 1.25, .5); s.rotation.set(Math.PI / 2, 0, .3); s.visible = t > .3 + i * .4; });
    crew[1].root.updateMatrixWorld(true); ikArm(crew[1], 'r', V(-.15, 1.2, .55), V(-.3, 1, -.3), V(1, 0, 0), .2, .2); ikArm(crew[1], 'l', V(.15, 1.2, .55), V(.3, 1, -.3), V(-1, 0, 0), .2, .2);
    mt.set(lerp(.85, .2, easeInOut(range(t, TF - .4, TF + 1.0))));
    const k = easeInOut(range(t, 0, 3.6));
    place(c, [0, 1.45, lerp(4.6, 4.0, k)], [0, 1.2, 0]);
    c.updateMatrixWorld(true); mt.position.copy(c.position).add(V(0, .75, -2.8).applyQuaternion(c.quaternion)); mt.quaternion.copy(c.quaternion);
    return { bloom: .7 };
  } };
}
// ============ K (47.44 - end): four days later, splashdown in the Pacific ============
function shotK({ makeStage }) {
  const scene = makeStage({ shadowSize: 6, sunDir: [-5, 8, 4] }); look(scene, { top: 0x2f7fd8, mid: 0x62a7ee, hor: 0xbfe0f7, sun: 2.4, hemi: .95 });
  const sea = ocean(0x2f8fd0); scene.add(sea);
  const cp = capsule(.8); scene.add(cp);
  const splash = sparks(120, { speed: 2.2, spread: 1.0, gravity: -5, life: 1.2, size: .12, dir: V(0, 1, 0), seed: 8, color: [.9, .97, 1] }); scene.add(splash);
  const ring = new THREE.Mesh(new THREE.RingGeometry(.5, .7, 40), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, side: THREE.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = .02; scene.add(ring);
  const c = cam(42);
  const TS = 50.0 - 47.44;
  return { scene, camera: c, update(t) {
    sea.tick(t);
    cp.setChutes(easeOut(range(t, 0, .6)));
    const y = t < TS ? lerp(7, .1, range(t, 0, TS)) : .1 + Math.sin((t - TS) * 2) * .05;
    cp.position.set(0, y, 0); cp.rotation.z = Math.sin(t * 1.3) * .05;
    const it = t - TS; splash.position.set(0, .1, 0); splash.update(it);
    ring.scale.setScalar(it > 0 ? 1 + it * 3 : .001); ring.material.opacity = it > 0 ? Math.max(0, .8 - it * .5) : 0;
    const camY = t < TS ? Math.max(1.6, y + .6) : 1.6;
    place(c, [lerp(3.4, 5.0, range(t, 0, 5)), camY, lerp(6.5, 8.5, range(t, 0, 5))], [0, t < TS ? y + 1.5 : 1.2, 0]);
    return { bloom: .5 };
  } };
}

export const SHOTS = [
  { start: 0.0, end: 5.06, build: shotA },
  { start: 5.06, end: 10.88, build: shotB },
  { start: 10.88, end: 15.52, build: shotC },
  { start: 15.52, end: 19.76, build: shotD },
  { start: 19.76, end: 23.2, build: shotE },
  { start: 23.2, end: 29.68, build: shotF },
  { start: 29.68, end: 34.8, build: shotG },
  { start: 34.8, end: 38.64, build: shotH },
  { start: 38.64, end: 43.76, build: shotI },
  { start: 43.76, end: 47.44, build: shotJ },
  { start: 47.44, end: DURATION + 1, build: shotK },
];
