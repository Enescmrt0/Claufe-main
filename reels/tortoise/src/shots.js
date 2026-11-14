import * as THREE from 'three';
import { makeToon, makeTortoise, stand, stripes, toon, ink, shade } from './toon.js';
import { ocean, ship, island, hold, barrel, crate, stairs, stove, table, plate, stink, lunchbox, calendar, fridge, redX, counter, tumbleweed, rowboat, tourBoat, camera as camProp, frypan, bowl, cactus, sign, box, cyl, ball } from './sets.js';
import { glowSprite, sparks } from './props.js';
import { kf, lerp, smooth, easeOut, easeIn, easeInOut, range, clamp, V, cam, place, shake } from './anim.js';
export const CAPTIONS = [[0.0, "Sailors", 0.56], [0.56, "used", 0.72], [0.72, "to", 0.88], [0.88, "stack", 1.2], [1.2, "giant", 1.6], [1.6, "tortoises", 2.24], [2.24, "in", 2.4], [2.4, "the", 2.48], [2.48, "bottom", 2.8], [2.8, "of", 2.88], [2.88, "their", 3.12], [3.12, "ships", 3.68], [3.68, "and", 3.92], [3.92, "leave", 4.24], [4.24, "them", 4.4], [4.4, "there", 4.64], [4.64, "for", 4.8], [4.8, "months.", 5.44], [5.44, "In", 5.68], [5.68, "the", 6.04], [6.04, "seventeen", 6.4], [6.4, "and", 6.88], [6.88, "eighteen", 7.36], [7.36, "hundreds,", 7.84], [7.84, "ships", 8.32], [8.32, "crossing", 8.72], [8.72, "the", 8.8], [8.8, "Pacific", 9.36], [9.36, "could", 9.52], [9.52, "be", 9.68], [9.68, "at", 9.84], [9.84, "sea", 10.24], [10.24, "for", 10.48], [10.48, "years,", 11.12], [11.12, "with", 11.36], [11.36, "no", 11.6], [11.6, "way", 11.76], [11.76, "to", 11.92], [11.92, "keep", 12.16], [12.16, "meat", 12.56], [12.56, "fresh.", 13.12], [13.12, "Salt", 13.44], [13.44, "pork", 13.76], [13.76, "rotted.", 14.32], [14.32, "Fish", 14.64], [14.64, "ran", 14.96], [14.96, "out.", 15.28], [15.28, "Crews", 15.76], [15.76, "got", 15.92], [15.92, "sick.", 16.4], [16.4, "But", 16.56], [16.56, "near", 16.8], [16.8, "the", 17.36], [17.36, "Gal\u00e1pagos", 17.92], [17.92, "Islands,", 18.56], [18.56, "they", 18.72], [18.72, "found", 19.04], [19.04, "the", 19.2], [19.2, "perfect", 19.6], [19.6, "lunchbox.", 20.48], [20.48, "A", 20.64], [20.64, "giant", 21.04], [21.04, "tortoise", 21.6], [21.6, "can", 21.76], [21.76, "survive", 22.24], [22.24, "for", 22.4], [22.4, "months,", 23.2], [23.2, "maybe", 23.6], [23.6, "up", 23.76], [23.76, "to", 24.0], [24.0, "a", 24.16], [24.16, "year,", 24.72], [24.72, "without", 25.12], [25.12, "eating", 25.52], [25.52, "or", 25.68], [25.68, "drinking", 26.16], [26.16, "anything.", 26.72], [26.72, "So", 26.96], [26.96, "whalers", 27.52], [27.52, "and", 27.68], [27.68, "pirates", 28.24], [28.24, "carried", 28.64], [28.64, "them", 28.8], [28.8, "on", 28.96], [28.96, "board", 29.36], [29.36, "by", 29.52], [29.52, "the", 29.6], [29.6, "hundreds,", 30.48], [30.48, "stacked", 30.96], [30.96, "them", 31.12], [31.12, "in", 31.28], [31.28, "the", 31.44], [31.44, "hold,", 32.08], [32.08, "and", 32.24], [32.24, "simply", 32.64], [32.64, "forgot", 33.04], [33.04, "about", 33.28], [33.28, "them.", 33.6], [33.6, "When", 33.84], [33.84, "the", 33.92], [33.92, "cook", 34.24], [34.24, "needed", 34.56], [34.56, "fresh", 34.88], [34.88, "meat,", 35.44], [35.44, "he", 35.6], [35.6, "just", 35.84], [35.84, "went", 36.08], [36.08, "downstairs.", 37.19], [37.04, "No", 37.28], [37.28, "fridge", 37.76], [37.76, "required.", 38.48], [38.48, "But", 38.64], [38.64, "the", 38.8], [38.8, "islands", 39.28], [39.28, "paid", 39.52], [39.52, "the", 39.68], [39.68, "price.", 40.32], [40.32, "Historians", 41.04], [41.04, "estimate", 41.6], [41.6, "that", 41.84], [41.84, "more", 42.08], [42.08, "than", 42.32], [42.32, "a", 42.56], [42.56, "hundred", 42.96], [42.96, "thousand", 43.44], [43.44, "tortoises", 44.08], [44.08, "were", 44.24], [44.24, "taken", 44.56], [44.56, "off", 44.8], [44.8, "the", 45.44], [45.44, "Gal\u00e1pagos.", 46.08], [46.08, "On", 46.32], [46.32, "some", 46.56], [46.56, "islands,", 47.36], [47.36, "every", 47.68], [47.68, "single", 48.08], [48.08, "one", 48.32], [48.32, "disappeared.", 49.2], [49.2, "The", 49.36], [49.36, "same", 49.6], [49.6, "trick", 49.92], [49.92, "that", 50.08], [50.08, "kept", 50.32], [50.32, "sailors", 50.96], [50.96, "alive", 51.6], [51.6, "nearly", 52.0], [52.0, "wiped", 52.4], [52.4, "the", 52.48], [52.48, "tortoises", 53.12], [53.12, "out", 53.28], [53.28, "forever.", 53.92], [53.92, "Today", 54.24], [54.24, "they're", 54.56], [54.56, "protected,", 55.36], [55.36, "and", 55.52], [55.52, "their", 55.76], [55.76, "numbers", 56.16], [56.16, "are", 56.32], [56.32, "slowly", 56.88], [56.88, "coming", 57.2], [57.2, "back.", 57.68], [57.68, "And", 57.84], [57.84, "ships", 58.24], [58.24, "still", 58.48], [58.48, "stop", 58.8], [58.8, "at", 58.96], [58.96, "the", 59.12], [59.12, "islands.", 60.23], [60.08, "Only", 60.48], [60.48, "now,", 60.96], [60.96, "they're", 61.28], [61.28, "full", 61.52], [61.52, "of", 61.68], [61.68, "people", 62.0], [62.0, "who", 62.16], [62.16, "just", 62.4], [62.4, "want", 62.56], [62.56, "to", 62.72], [62.72, "look", 62.88], [62.88, "at", 62.96], [62.96, "them.", 63.79]];
export const DURATION = 64.29;

export const FADES = [[38.3, 38.46, 38.5, 38.7]];

// ---------- helpers ----------
function look(scene, { top, mid, hor, key = 0xfff3e6, sun = 2.3, hemi = 0.75, sunDir = null, ground = 0x7f93ad }) {
  const u = scene.userData.sky.material.uniforms;
  if (top) { u.top.value.set(top); u.mid.value.set(mid); u.horizon.value.set(hor); u.floorC.value.set(hor); }
  const k = scene.userData.key; k.color.set(key); k.intensity = sun;
  if (sunDir) k.position.set(...sunDir);
  scene.traverse(o => { if (o.isHemisphereLight) { o.intensity = hemi; o.groundColor.set(ground); } });
}
const SKY_DAY = { top: 0x2f7fd8, mid: 0x62a7ee, hor: 0xbfe0f7 };
const SKY_GOLD = { top: 0x3f6fc0, mid: 0xf2a86a, hor: 0xffd59a };
const SKY_DUSK = { top: 0x231a4a, mid: 0x7a3f74, hor: 0xe98a5e };
const SKY_NIGHT = { top: 0x0b1030, mid: 0x1b2552, hor: 0x34407a };
const SKY_DAWN = { top: 0x4f8fd8, mid: 0xf6b98a, hor: 0xffe3b0 };

const sailor = () => makeToon({ shirt: stripes('#f4f1e8', '#2d4f9a', 9), hat: 'bandana', shoes: 0x3a2a1c });
const pirate = () => makeToon({ shirt: 0xa8322c, hat: 'pirate', beard: 0x2a1d17 });
const captain = () => makeToon({ shirt: 0x1d2a4f, hat: 'captain', beard: 0xdcd6ca, hair: 0xdcd6ca, belly: 1.12 });
const cook = () => makeToon({ shirt: 0xf4f1e8, hat: 'chef', belly: 1.25 });

// tortoise stack inside the hold: rows on the floor plus a second layer on top
function stackTortoises(scene, n2 = 3, origin = [0, 0, -1.8], extraTop = 2) {
  const list = [];
  for (let i = 0; i < 4; i++) { const t = makeTortoise(); t.root.position.set(origin[0] - 1.65 + i * 1.1, 0, origin[2]); t.root.rotation.y = 0.25 - i * 0.18; scene.add(t.root); list.push(t); }
  for (let i = 0; i < 3; i++) { const t = makeTortoise(); t.root.position.set(origin[0] - 1.1 + i * 1.1, 0, origin[2] + 1.2); t.root.rotation.y = -0.2 + i * 0.2; scene.add(t.root); list.push(t); }
  for (let i = 0; i < extraTop; i++) { const t = makeTortoise(); t.root.position.set(origin[0] - 1.1 + i * 1.1, 0.52, origin[2] - 0.1); t.root.rotation.y = 0.1 + i * 0.2; scene.add(t.root); list.push(t); }
  return list;
}
function animStack(list, t, mood = 0) {
  list.forEach((tt, i) => tt.pose({ stretch: 0.35 + 0.15 * Math.sin(t * 0.7 + i), yaw: Math.sin(t * 0.5 + i * 1.7) * 0.35, pitch: mood, blink: tt.blinkAt(t, i) }));
}
const carryPose = (h) => { h.reach('l', [0.3, 0.72, 0.3], [0.6, 0.6, -0.2]); h.reach('r', [-0.3, 0.72, 0.3], [-0.6, 0.6, -0.2]); };

// ============ A (0 - 5.44): a sailor stacks tortoises in the hold ============
function shotA({ makeStage }) {
  const scene = makeStage({ shadowSize: 5, sun: 0.6 });
  look(scene, { sun: 0.4, hemi: 0.55, key: 0xffd9a8, ground: 0x6a4a2a });
  const room = hold(); scene.add(room);
  const stack = stackTortoises(scene, 3, [0, 0, -1.9], 1);
  const s = sailor(); scene.add(s.root);
  const held = makeTortoise(); held.root.scale.setScalar(0.85); scene.add(held.root);
  const b1 = barrel(1); b1.position.set(2.2, 0, 0.6); scene.add(b1);
  const c = cam(42);
  return { scene, camera: c, update(t) {
    room.lamp.rotation.z = Math.sin(t * 1.3) * 0.12;
    animStack(stack, t);
    // walk in with a tortoise, lift it onto the stack at ~3.3 s
    const k = easeInOut(range(t, 0.0, 2.6));
    const x = lerp(1.7, 0.45, k), z = lerp(1.0, -0.55, k);
    s.root.position.set(x, 0, z); s.root.rotation.y = Math.PI + lerp(0.6, 0.0, k);
    if (t < 2.6) s.walk(t * 9, { chest: [0.15, 0, 0] }); else stand(s, t, { spine: [0.1, 0, 0] });
    const lift = easeInOut(range(t, 2.7, 3.5));
    const place2 = easeInOut(range(t, 3.5, 4.1));
    carryPose(s);
    s.root.updateMatrixWorld(true);
    const handP = s.root.localToWorld(V(0, 0.55, 0.32));
    const top = V(0.55, 0.52, -1.95);
    const p = handP.clone().lerp(top, place2); p.y += lift * 0.25 * (1 - place2);
    held.root.position.copy(p); held.root.rotation.y = Math.PI / 2 + s.root.rotation.y * (1 - place2) + place2 * (0.4 - Math.PI / 2);
    held.pose({ stretch: 0.2 + place2 * 0.4, walk: t < 3.5 ? t * 10 : null, blink: held.blinkAt(t, 9) });
    s.faceAt(t, t < 2.6 ? 'grin' : 'smile', t < 3.4, 2);
    // camera: close on a worried tortoise face, then pull back wide
    const pk = easeInOut(range(t, 0.0, 5.0));
    place(c, [lerp(-0.9, 0.3, pk), lerp(0.85, 1.75, pk), lerp(-0.3, 3.1, pk)], [lerp(-1.4, 0.0, pk), lerp(0.55, 0.75, pk), lerp(-1.6, -1.2, pk)]);
    return { dof: { focus: c.position.distanceTo(V(-1, 0.5, -1.5)), aperture: 0.002, maxblur: 0.006 }, bloom: 0.6, exposure: 1.05 };
  } };
}

// ============ B (5.44 - 10.2): the ship at sea ============
function shotB({ makeStage }) {
  const scene = makeStage({ shadowSize: 12, sunDir: [-8, 12, 6] });
  look(scene, { ...SKY_DAY, sun: 2.4, hemi: 0.9 });
  const sea = ocean(); scene.add(sea);
  const sh = ship(); scene.add(sh);
  const crew = [sailor(), captain()];
  crew[0].root.position.set(-0.4, 1.34, 1.2); crew[1].root.position.set(0.5, 1.34, -1.8); crew[1].root.rotation.y = 0.3;
  crew.forEach(h => sh.add(h.root));
  const c = cam(44);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    sh.position.set(0, -0.35 + Math.sin(t * 1.1) * 0.06, t * 0.9); sh.rotation.set(Math.sin(t * 0.8) * 0.03, 0, Math.sin(t * 1.1 + 1) * 0.04);
    crew.forEach((h, i) => { stand(h, t + i); h.faceAt(t, i ? 'smug' : 'neutral', false, i); });
    const k = easeInOut(range(t, 0, 4.8));
    const a = lerp(-0.9, 0.5, k), r = lerp(16, 10, k);
    place(c, [Math.sin(a) * r, lerp(9, 3.6, k), sh.position.z + Math.cos(a) * r], [0, 2.2, sh.position.z]);
    return { bloom: 0.3 };
  } };
}

// ============ C (10.2 - 16.4): the galley: rotten meat, no fish, sick crew ============
function shotC({ makeStage }) {
  const scene = makeStage({ shadowSize: 6, sun: 0.5 });
  look(scene, { sun: 0.4, hemi: 0.6, key: 0xffd9a8, ground: 0x6a4a2a });
  const room = hold({ w: 9, d: 5 }); scene.add(room);
  room.lamp.position.x = -1.2;
  const st = stove(); st.position.set(-3.0, 0, -1.6); scene.add(st);
  const ck = cook(); ck.root.position.set(-2.2, 0, -0.6); ck.root.rotation.y = 0.3; scene.add(ck.root);
  const meat = ball(0.09, toon(0x9a6b5a), [0, 0, 0], [1.3, 0.8, 1]); ink(meat, 0.006); scene.add(meat);
  const st1 = stink(); st1.scale.setScalar(0.55); scene.add(st1);
  const br = barrel(1.1, [['SALT', 70], ['PORK', 70]]); br.position.set(-0.4, 0, -1.3); scene.add(br);
  const st2 = stink(); st2.position.set(-0.4, 0.95, -1.3); st2.scale.setScalar(1.6); scene.add(st2);
  const flies = []; for (let i = 0; i < 4; i++) { const f = ball(0.018, toon(0x111111), [0, 0, 0]); scene.add(f); flies.push(f); }
  const tb = table(); tb.position.set(1.4, 0, -1.2); scene.add(tb);
  const pl = plate(); pl.position.set(1.3, 0.78, -1.1); scene.add(pl);
  const sk = sailor(); sk.root.position.set(2.9, 0, -0.9); sk.root.rotation.y = -0.5; scene.add(sk.root);
  const sk2 = makeToon({ shirt: 0x6a7a4a, hat: 'cap', beard: 0x4a3020 }); sk2.root.position.set(3.6, 0, -1.6); sk2.root.rotation.y = -0.4; scene.add(sk2.root);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    room.lamp.rotation.z = Math.sin(t * 1.2) * 0.1;
    stand(ck, t, { neck: [0.25, 0, 0], spine: [0.05, 0, 0] });
    const sniff = range(t, 0.6, 1.4) - range(t, 2.2, 2.6);
    ck.reach('r', [-0.12, lerp(0.7, 0.92, sniff), lerp(0.3, 0.3, sniff)]);
    ck.root.updateMatrixWorld(true);
    meat.position.copy(ck.j.rWr.getWorldPosition(V(0, 0, 0))).add(V(0, 0.07, 0));
    st1.position.copy(meat.position).add(V(0, 0.06, 0)); st1.tick(t);
    ck.faceAt(t, t > 1.3 ? 'sick' : 'neutral', t > 1.6, 1);
    st2.tick(t + 0.4);
    flies.forEach((f, i) => f.position.set(-0.4 + Math.sin(t * 7 + i * 2) * 0.3, 1.1 + Math.sin(t * 9 + i) * 0.12, -1.3 + Math.cos(t * 6 + i * 3) * 0.3));
    stand(sk, t, { spine: [0.35, 0, 0.1], neck: [0.3, 0, 0] });
    sk.reach('l', [0.1, 0.62, 0.12]); sk.reach('r', [-0.1, 0.62, 0.12]);
    sk.faceAt(t, 'sick', true, 3);
    stand(sk2, t + 1, { spine: [0.2, 0, -0.1], neck: [0.35, 0, 0] }); sk2.faceAt(t, 'sick', false, 5);
    // camera dollies along the galley, beat by beat (13.12 salt pork, 14.32 fish, 15.28 crews)
    const T = 10.2;
    const x = kf(t + T, [[10.2, -2.45], [12.8, -2.2], [13.3, -0.45], [14.2, -0.4], [14.6, 1.3], [15.1, 1.35], [15.6, 3.1], [16.4, 3.3]], easeInOut);
    const y = kf(t + T, [[10.2, 1.45], [13.3, 1.5], [14.6, 1.35], [15.6, 1.4]], easeInOut);
    const zc = kf(t + T, [[10.2, 2.1], [12.8, 1.5], [13.3, 1.0], [14.6, 0.5], [15.6, 1.4], [16.4, 1.2]], easeInOut);
    const ly = kf(t + T, [[10.2, 1.25], [13.3, 0.8], [14.6, 0.8], [15.6, 1.05]], easeInOut);
    place(c, [x, y, zc], [x - 0.05, ly, -1.2]);
    return { dof: { focus: Math.abs(zc + 1.2), aperture: 0.004, maxblur: 0.008 }, bloom: 0.7 };
  } };
}

// ============ D (16.4 - 20.48): the Galápagos, and the perfect lunchbox ============
function shotD({ makeStage }) {
  const scene = makeStage({ shadowSize: 8, sunDir: [-6, 7, 5] });
  look(scene, { ...SKY_GOLD, sun: 2.6, key: 0xffd8a0, hemi: 0.8 });
  const sea = ocean(0x2a8ac2); sea.position.y = -0.3; scene.add(sea);
  const isl = island(); scene.add(isl);
  const tt = makeTortoise(); tt.root.position.set(0.2, 0.02, -0.4); tt.root.rotation.y = 0.5; scene.add(tt.root);
  const cc = cactus(1.3); cc.position.set(0.95, 0, 0.35); scene.add(cc);
  const cp = captain(); cp.root.position.set(-1.4, 0.02, 0.6); cp.root.rotation.y = 0.9; scene.add(cp.root);
  const lb = lunchbox(); scene.add(lb);
  const spk = sparks(70, { speed: 0.9, spread: 2, gravity: -0.6, life: 0.9, size: 0.07, dir: V(0, 1, 0), seed: 4, color: [1, 0.85, 0.35] }); scene.add(spk);
  const sh = ship(); sh.position.set(-7, -0.6, -14); sh.rotation.y = 1.2; scene.add(sh);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    tt.pose({ stretch: 0.9, yaw: 0.55, pitch: -0.15, chew: t * 9, blink: tt.blinkAt(t, 2) });
    stand(cp, t, { neck: [0, 0.3, 0] });
    cp.reach('r', [-0.08, 0.9, 0.3]); cp.reach('l', [0.12, 0.6, 0.18]);
    const pop = easeOut(range(t, 3.2, 3.55));
    cp.faceAt(t, t > 3.1 ? 'grin' : 'smug', false, 4);
    lb.position.set(0.2, 1.45 + Math.sin(t * 3) * 0.03, -0.4); lb.scale.setScalar(0.001 + pop * 1.4 * (1 + 0.2 * Math.sin(range(t, 3.2, 3.9) * Math.PI))); lb.rotation.y = Math.sin(t * 2) * 0.3;
    spk.position.copy(lb.position); spk.update(t - 3.2);
    // fly in from the sea to the beach
    const k = easeOut(range(t, 0, 2.8));
    place(c, [lerp(-2, -0.6, k), lerp(5.5, 1.35, k), lerp(14, 3.6, k)], [lerp(-1, 0, k), lerp(1.2, 0.85, k), lerp(-6, -0.2, k)]);
    return { bloom: 0.6 };
  } };
}

// ============ E (20.48 - 26.72): months without food or water ============
function shotE({ makeStage }) {
  const scene = makeStage({ shadowSize: 5, sunDir: [-5, 8, 6] });
  look(scene, { ...SKY_GOLD, sun: 2.4, key: 0xffdcae, hemi: 0.85 });
  const isl = island({ cacti: false }); scene.add(isl);
  const sea = ocean(0x2a8ac2); sea.position.y = -0.3; scene.add(sea);
  const tt = makeTortoise(); tt.root.position.set(0, 0.02, 0); tt.root.rotation.y = 0.25; scene.add(tt.root);
  const cal = calendar(); cal.position.set(-0.75, 1.15, -0.5); cal.rotation.y = 0.3; scene.add(cal);
  const post = cyl(0.03, 0.03, 1.1, toon(0x6a4a2a), [-0.75, 0.55, -0.53]); scene.add(post);
  const bw = bowl(); bw.position.set(0.55, 0.02, 0.75); scene.add(bw);
  const c = cam(38);
  return { scene, camera: c, update(t) {
    const T = 20.48;
    // months flip from "months" (22.4) to "year" (24.2); "?" lands on "maybe up to a year"
    const m = Math.floor(clamp(range(t + T, 22.3, 24.3) * 12, 0, 11));
    cal.setMonth(m, t + T > 24.3);
    cal.rotation.z = t + T > 22.3 && t + T < 24.3 ? Math.sin(t * 40) * 0.02 : 0;
    tt.pose({ stretch: 0.45, yaw: Math.sin(t * 0.6) * 0.25, pitch: 0.1, blink: tt.blinkAt(t, 1) });
    const k = easeInOut(range(t, 0, 6.2));
    place(c, [lerp(1.6, 0.9, k), lerp(1.1, 0.95, k), lerp(2.9, 2.2, k)], [lerp(-0.1, -0.2, k), 0.62, 0]);
    return { dof: { focus: c.position.distanceTo(V(0, 0.5, 0)), aperture: 0.003, maxblur: 0.008 }, bloom: 0.5 };
  } };
}

// ============ F (26.72 - 30.48): pirates carry them aboard by the hundreds ============
function shotF({ makeStage }) {
  const scene = makeStage({ shadowSize: 9, sunDir: [-6, 8, 5] });
  look(scene, { ...SKY_GOLD, sun: 2.4, key: 0xffdcae, hemi: 0.85 });
  const isl = island({ cacti: true }); scene.add(isl);
  const sea = ocean(0x2a8ac2); sea.position.y = -0.3; scene.add(sea);
  const sh = ship(); sh.position.set(6.5, -0.5, -9); sh.rotation.y = -0.6; scene.add(sh);
  const crew = [pirate(), sailor(), makeToon({ shirt: 0x3d6b3a, hat: 'pirate', beard: 0x6a3d22 }), sailor()];
  const tort = crew.map(() => { const t = makeTortoise(); t.root.scale.setScalar(0.8); return t; });
  crew.forEach((h, i) => { scene.add(h.root); scene.add(tort[i].root); });
  const boat = rowboat(); boat.position.set(4.2, -0.15, 1.2); boat.rotation.y = 0.4; scene.add(boat);
  for (let i = 0; i < 3; i++) { const t = makeTortoise(); t.root.scale.setScalar(0.55); t.root.position.set(-0.45 + i * 0.45, 0.2, 0); t.root.rotation.y = 1.4; boat.add(t.root); }
  const c = cam(42);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    crew.forEach((h, i) => {
      const x = -3.2 + i * 1.5 + t * 0.75, z = 0.4 - i * 0.55;
      h.root.position.set(x, 0.02, z); h.root.rotation.y = Math.PI / 2 + 0.15;
      h.walk(t * 8 + i * 1.3, { chest: [-0.12, 0, 0], neck: [-0.1, 0, 0] });
      carryPose(h);
      h.faceAt(t, i % 2 ? 'worried' : 'grin', i % 2 === 1, i);
      h.root.updateMatrixWorld(true);
      const p = h.root.localToWorld(V(0, 0.5 + Math.abs(Math.sin(t * 8 + i)) * 0.02, 0.32));
      tort[i].root.position.copy(p); tort[i].root.rotation.y = h.root.rotation.y + Math.PI / 2;
      tort[i].pose({ stretch: 0.5, walk: t * 12 + i, yaw: Math.sin(t * 3 + i) * 0.3, blink: tort[i].blinkAt(t, i) });
    });
    const cx = -0.95 + t * 0.75;
    place(c, [cx + 0.9, 1.35, 4.4 - t * 0.1], [cx - 0.1, 0.75, -0.4]);
    return { bloom: 0.5 };
  } };
}

// ============ G (30.48 - 33.6): stacked in the hold, and forgotten ============
function shotG({ makeStage }) {
  const scene = makeStage({ shadowSize: 5, sun: 0.6 });
  look(scene, { sun: 0.4, hemi: 0.55, key: 0xffd9a8, ground: 0x6a4a2a });
  const room = hold(); scene.add(room);
  const stack = stackTortoises(scene, 3, [0, 0, -1.9], 3);
  const more = []; for (let i = 0; i < 3; i++) { const t = makeTortoise(); t.root.position.set(-1.6 + i * 1.2, 0, 0.0); t.root.rotation.y = 0.4 - i * 0.3; scene.add(t.root); more.push(t); }
  const st = stairs(); st.position.set(2.3, 0, 1.9); st.rotation.y = Math.PI; scene.add(st);
  const s = sailor(); scene.add(s.root);
  const c = cam(44);
  return { scene, camera: c, update(t) {
    room.lamp.rotation.z = Math.sin(t * 1.3) * 0.12;
    const dark = easeInOut(range(t, 2.1, 2.6));
    room.lamp.light.intensity = 6 * (1 - dark * 0.75);
    animStack(stack, t, 0); animStack(more, t + 3, 0);
    // dust off hands, then walk to the stairs
    const k = easeInOut(range(t, 0.9, 2.3));
    s.root.position.set(lerp(1.0, 2.2, k), 0, lerp(0.9, 1.6, k)); s.root.rotation.y = lerp(0, 0.6, k);
    if (t < 0.9) { stand(s, t); s.reach('l', [0.05, 0.75, 0.25]); s.reach('r', [-0.05, 0.75 + Math.sin(t * 30) * 0.03, 0.27]); }
    else s.walk(t * 9);
    s.faceAt(t, 'smile', false, 1);
    const pk = easeOut(range(t, 0, 3.1));
    place(c, [lerp(-1.2, -0.6, pk), lerp(2.2, 1.9, pk), lerp(3.4, 2.9, pk)], [0.2, 0.55, -0.8]);
    return { exposure: 1.05 - dark * 0.35, bloom: 0.7 };
  } };
}

// ============ H (33.6 - 37.04): the cook just went downstairs ============
function shotH({ makeStage }) {
  const scene = makeStage({ shadowSize: 5, sun: 0.6 });
  look(scene, { sun: 0.35, hemi: 0.45, key: 0xffd9a8, ground: 0x5a3a20 });
  const room = hold(); scene.add(room);
  const st = stairs(); st.position.set(0.6, 0, 0.4); st.rotation.y = 0; scene.add(st);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.9, 2.8, 4, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff1c8, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  beam.position.set(0.6, 1.4, -1.0); beam.rotation.y = Math.PI / 4; beam.userData.noInk = true; scene.add(beam);
  const ck = cook(); scene.add(ck.root);
  const pan = frypan(); scene.add(pan);
  const ts = []; for (let i = 0; i < 3; i++) { const t = makeTortoise(); t.root.position.set(-1.0 + i * 1.05, 0, 1.55 - Math.abs(i - 1) * 0.25); t.root.rotation.y = Math.PI + (i - 1) * 0.3; scene.add(t.root); ts.push(t); }
  const drops = ts.map(() => { const d = ball(0.045, toon(0x6cc7ff), [0, 0, 0], [0.8, 1.2, 0.8]); ink(d, 0.006); scene.add(d); return d; });
  const c = cam(40);
  return { scene, camera: c, update(t) {
    room.lamp.rotation.z = Math.sin(t * 1.3) * 0.1;
    // walk down the 7 steps (rise 0.34, run 0.26), facing +z
    const u = 1 - easeInOut(range(t, 0.1, 2.5));
    const y = 0.33 + u * 6 * 0.34, z = 0.4 - u * 6 * 0.26;
    ck.root.position.set(0.6, u > 0.001 ? y : 0, z + (1 - u) * 0.35); ck.root.rotation.y = 0;
    ck.walk(t * 7, { neck: [0.2, 0, 0] });
    ck.reach('r', [-0.25, 1.0, 0.2], [-0.6, 0.6, -0.1]);
    ck.root.updateMatrixWorld(true);
    pan.position.copy(ck.j.rWr.getWorldPosition(V(0, 0, 0))).add(V(0.0, 0.05, 0)); pan.rotation.set(0, Math.PI / 2, 0.8);
    ck.faceAt(t, 'grin', false, 2);
    const scare = easeOut(range(t, 2.2, 2.6));
    ts.forEach((tt, i) => {
      tt.pose({ stretch: lerp(0.6, 0.05, scare), yaw: lerp(0, (i - 1) * -0.4, 0.6), pitch: -0.35, blink: tt.blinkAt(t, i) });
      tt.root.updateMatrixWorld(true);
      drops[i].position.copy(tt.root.localToWorld(V(0.18, 0.78, 0.5))); drops[i].scale.setScalar(scare * (1 + Math.sin(t * 6 + i) * 0.05));
    });
    // low camera behind the tortoises, looking up the stairs
    const k = easeInOut(range(t, 0, 3.4));
    place(c, [lerp(-0.4, -0.2, k), lerp(0.7, 0.9, k), lerp(3.4, 3.0, k)], [0.5, lerp(1.9, 1.05, k), -0.3]);
    return { bloom: 0.8 };
  } };
}

// ============ I (37.04 - 38.48): no fridge required ============
function shotI({ makeStage }) {
  const scene = makeStage({ shadowSize: 4, sun: 0.6 });
  look(scene, { sun: 0.4, hemi: 0.6, key: 0xffd9a8, ground: 0x6a4a2a });
  const room = hold(); scene.add(room);
  const fr = fridge(); fr.position.set(-0.42, 0, -0.6); scene.add(fr);
  const tt = makeTortoise(); tt.root.position.set(0.55, 0, -0.3); tt.root.rotation.y = -0.4; scene.add(tt.root);
  const X = redX(0.55); scene.add(X);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    room.lamp.rotation.z = Math.sin(t * 1.3) * 0.1;
    const pop = easeOut(range(t, 0.3, 0.55));
    X.scale.setScalar(0.001 + pop * (1 + 0.25 * Math.sin(range(t, 0.3, 0.8) * Math.PI)));
    tt.pose({ stretch: 0.9, yaw: lerp(0, -0.7, easeOut(range(t, 0.5, 0.9))), pitch: -0.1, blink: tt.blinkAt(t, 3) });
    place(c, [0.1, 1.25, 3.7 - t * 0.15], [0.05, 0.85, -0.4]);
    X.position.set(-0.42, 0.95, -0.1); X.lookAt(c.position);
    return { bloom: 0.6 };
  } };
}

// ============ J (38.48 - 40.32): the islands paid the price ============
function shotJ({ makeStage }) {
  const scene = makeStage({ shadowSize: 10, sunDir: [6, 3, -8] });
  look(scene, { ...SKY_DUSK, sun: 1.6, key: 0xff9a6a, hemi: 0.55, ground: 0x3a2a4a });
  const sea = ocean(0x2c4f8a); sea.position.y = -0.3; scene.add(sea);
  const isl = island({ grass: 0x5d7a46 }); scene.add(isl);
  const ships = [0, 1, 2].map(i => { const s = ship(); s.position.set(-6 + i * 6, -0.5, -18 - i * 4); s.rotation.y = 0.9; scene.add(s); return s; });
  const c = cam(44);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    ships.forEach((s, i) => { s.position.x = -6 + i * 6 + t * 0.6; s.rotation.z = Math.sin(t + i) * 0.03; });
    const k = easeInOut(range(t, 0, 1.9));
    place(c, [lerp(2.0, 1.2, k), lerp(2.4, 2.0, k), lerp(8, 6.8, k)], [0, 1.0, -6]);
    return { bloom: 0.7, exposure: 0.95 };
  } };
}

// ============ K (40.32 - 46.08): more than a hundred thousand ============
function shotK({ makeStage }) {
  const scene = makeStage({ shadowSize: 10, sunDir: [6, 3, -8] });
  look(scene, { ...SKY_DUSK, sun: 1.6, key: 0xff9a6a, hemi: 0.6, ground: 0x3a2a4a });
  const sea = ocean(0x2c4f8a); sea.position.y = -0.3; scene.add(sea);
  const isl = island({ grass: 0x5d7a46 }); isl.position.set(0, 0, -6); scene.add(isl);
  const ct = counter(1.6); scene.add(ct);
  const boats = [];
  for (let i = 0; i < 6; i++) {
    const b = rowboat(); b.scale.setScalar(0.8);
    for (let j = 0; j < 2; j++) { const t = makeTortoise(); t.root.scale.setScalar(0.5); t.root.position.set(-0.2 + j * 0.4, 0.2, 0); t.root.rotation.y = 1.5; b.add(t.root); }
    scene.add(b); boats.push(b);
  }
  const sh = ship(); sh.position.set(-9, -0.5, -2); sh.rotation.y = -1.3; scene.add(sh);
  const c = cam(42);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    const T = 40.32;
    // counts during "a hundred thousand" (42.3 - 43.5), then holds
    const n = Math.pow(easeOut(range(t + T, 41.0, 43.5)), 1.6) * 100000;
    ct.set(n);
    ct.position.set(0.0, 2.5 + Math.sin(t * 1.5) * 0.04, 0.5); ct.rotation.set(0.05, Math.sin(t * 0.6) * 0.12, 0);
    boats.forEach((b, i) => { const ph = ((t * 0.12 + i / 6) % 1); b.position.set(lerp(1, -8, ph), -0.28 + Math.sin(t * 2 + i) * 0.03, lerp(-2.5, -1.2, ph) + (i % 2) * 1.4); b.rotation.y = -1.4; });
    const k = easeInOut(range(t, 0, 5.7));
    place(c, [lerp(0.6, -0.4, k), lerp(2.3, 2.6, k), lerp(4.6, 3.9, k)], [0, 2.1, 0]);
    return { bloom: 0.7, exposure: 0.95 };
  } };
}

// ============ L (46.08 - 49.2): islands where every one disappeared ============
function shotL({ makeStage }) {
  const scene = makeStage({ shadowSize: 8, sunDir: [6, 2.5, -8] });
  look(scene, { ...SKY_NIGHT, sun: 0.9, key: 0x8fa6ff, hemi: 0.5, ground: 0x1a1a3a });
  const sea = ocean(0x1f3466); sea.position.y = -0.3; scene.add(sea);
  const isl = island({ sand: 0xb8a37a, grass: 0x4a5f3c }); scene.add(isl);
  const tw = tumbleweed(); scene.add(tw);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    const x = lerp(-3.5, 3.5, range(t, 0.2, 3.1));
    tw.position.set(x, 0.24 + Math.abs(Math.sin(t * 5)) * 0.15, 0.6); tw.rotation.z = -t * 6;
    const k = easeInOut(range(t, 0, 3.1));
    place(c, [lerp(-0.6, 0.6, k), 0.55, 4.2], [0, 0.6, 0]);
    return { bloom: 0.5, exposure: 0.85 };
  } };
}

// ============ M (49.2 - 53.92): the trick nearly wiped them out ============
function shotM({ makeStage }) {
  const scene = makeStage({ shadowSize: 5, sun: 0.3 });
  look(scene, { sun: 0.2, hemi: 0.3, key: 0x8fa6ff, ground: 0x2a1a20 });
  const room = hold(); scene.add(room);
  room.lamp.light.intensity = 3.5;
  const stack = stackTortoises(scene, 3, [0, 0, -1.9], 3);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    room.lamp.rotation.z = Math.sin(t * 1.6) * 0.2;
    animStack(stack, t * 0.6, 0.15);
    const k = easeInOut(range(t, 0, 4.7));
    place(c, [lerp(0.2, -0.3, k), lerp(0.9, 1.9, k), lerp(0.6, 3.0, k)], [lerp(0.1, 0, k), lerp(0.6, 0.7, k), -1.8]);
    return { bloom: 0.9, exposure: 0.85 };
  } };
}

// ============ N (53.92 - 57.68): protected, numbers coming back ============
function shotN({ makeStage }) {
  const scene = makeStage({ shadowSize: 6, sunDir: [-7, 4, 5] });
  look(scene, { ...SKY_DAWN, sun: 2.4, key: 0xffd2a0, hemi: 0.9 });
  const sea = ocean(0x3a9ad0); sea.position.y = -0.3; scene.add(sea);
  const isl = island(); scene.add(isl);
  const rg = makeToon({ shirt: 0xb59a64, hat: 'ranger', hair: 0x6a3d22, longHair: true }); rg.root.position.set(-0.6, 0.02, 0.2); rg.root.rotation.y = 0.5; scene.add(rg.root);
  const big = makeTortoise(); big.root.position.set(0.9, 0.02, -0.6); big.root.rotation.y = -0.6; scene.add(big.root);
  const babies = []; for (let i = 0; i < 4; i++) { const b = makeTortoise({ shell: '#7a6640' }); b.root.scale.setScalar(0.38); scene.add(b.root); babies.push(b); }
  const sg = new THREE.Group(); scene.add(sg); sg.position.set(-1.5, 0, -0.9); sg.rotation.y = 0.4;
  sg.add(cyl(0.04, 0.04, 1.3, toon(0x6a4a2a), [0, 0.65, 0]));
  const pl = sign([['PROTECTED', 66, '#ffffff'], ['AREA', 66, '#ffffff']], 0.9, 0.42, { bg: '#2f6b3a', border: '#f3ead6' }); pl.position.set(0, 1.32, 0.03); sg.add(pl);
  ink(sg, 0.01); shade(sg);
  const c = cam(40);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    stand(rg, t, { spine: [0.2, 0, 0], neck: [0.3, 0, 0] }); rg.reach('r', [-0.15, 0.45, 0.35]); rg.faceAt(t, 'smile', false, 2);
    big.pose({ stretch: 0.8, yaw: -0.3, blink: big.blinkAt(t, 5) });
    babies.forEach((b, i) => { b.root.position.set(-0.3 + i * 0.32 + t * 0.06, 0.02, 0.75 + (i % 2) * 0.25); b.root.rotation.y = 1.4; b.pose({ stretch: 0.8, walk: t * 9 + i * 1.6, blink: b.blinkAt(t, i) }); });
    const k = easeInOut(range(t, 0, 3.7));
    place(c, [lerp(0.1, -0.1, k), lerp(1.15, 1.0, k), lerp(4.4, 3.8, k)], [-0.2, 0.6, 0]);
    return { bloom: 0.5, dof: { focus: c.position.distanceTo(V(0, 0.3, 0.8)), aperture: 0.003, maxblur: 0.008 } };
  } };
}

// ============ O (57.68 - end): ships still stop, full of people who want to look ============
function shotO({ makeStage }) {
  const scene = makeStage({ shadowSize: 10, sunDir: [-7, 9, 6] });
  look(scene, { ...SKY_DAY, sun: 2.5, hemi: 0.95 });
  const sea = ocean(0x2f8fd0); sea.position.y = -0.3; scene.add(sea);
  const isl = island({ cacti: false }); isl.position.set(0, 0, 4); isl.rotation.y = Math.PI; scene.add(isl);
  for (const [x, z, h] of [[-2.2, 3.6, 1.7], [2.6, 4.2, 1.5]]) { const cc = cactus(h); cc.position.set(x, 0, z); scene.add(cc); }
  const boat = tourBoat(); boat.position.set(0, -0.35, -7); boat.rotation.y = Math.PI / 2; scene.add(boat);
  const tourists = [], cams = [], flashes = [];
  const outfits = [[0xf2a03a, 'sun'], [0x3fb0a0, 'cap'], [0xe05a8a, 'sun'], [0x8a6ad8, 'cap'], [0xf2d23a, 'sun']];
  outfits.forEach(([col, hat], i) => {
    const h = makeToon({ shirt: col, hat, hair: i % 2 ? 0x6a3d22 : 0x2a1d17, glasses: i === 2 });
    h.root.position.set(-0.85, 1.25, -2.2 + i * 0.95); h.root.rotation.y = -Math.PI / 2; boat.add(h.root);
    // tourists stand at the rail facing +x of the boat, which is world +z after the boat rotation
    const cp = camProp(); scene.add(cp); cams.push(cp);
    const fl = glowSprite(0xffffff, 0.6); scene.add(fl); flashes.push(fl);
    tourists.push(h);
  });
  const tt = makeTortoise(); tt.root.position.set(0.3, 0.02, 2.6); tt.root.rotation.y = Math.PI; scene.add(tt.root);
  const c = cam(42);
  return { scene, camera: c, update(t) {
    sea.tick(t);
    boat.position.z = -7 + Math.sin(t * 0.9) * 0.05; boat.rotation.z = Math.sin(t * 1.1) * 0.02;
    boat.updateMatrixWorld(true);
    tourists.forEach((h, i) => {
      stand(h, t + i, { neck: [-0.05, 0, 0] });
      h.reach('l', [0.07, 1.1, 0.24], [0.5, 0.9, -0.1]); h.reach('r', [-0.07, 1.1, 0.24], [-0.5, 0.9, -0.1]);
      h.faceAt(t, t > 2.6 ? 'happy' : 'grin', false, i);
      h.root.updateMatrixWorld(true);
      cams[i].position.copy(h.root.localToWorld(V(0, 1.1, 0.3))); cams[i].quaternion.copy(h.root.getWorldQuaternion(new THREE.Quaternion()));
      const ph = (t * 1.3 + i * 0.37) % 1;
      flashes[i].position.copy(h.root.localToWorld(V(0, 1.13, 0.4))); flashes[i].material.opacity = ph < 0.08 ? 1 - ph / 0.08 : 0;
    });
    const T = 57.68;
    // first the boat arriving, then (at "Only now", 60.08) the tortoise watching them back
    if (t + T < 60.0) {
      const k = easeInOut(range(t, 0, 2.3));
      place(c, [lerp(3.6, 2.2, k), lerp(2.6, 2.2, k), lerp(-0.8, -2.6, k)], [-0.2, 2.0, -6.4]);
      tt.pose({ stretch: 0.6, blink: 0 });
    } else {
      const k = easeInOut(range(t + T, 60.0, 62.0));
      const turn = easeInOut(range(t + T, 62.5, 63.1));
      tt.pose({ stretch: lerp(0.4, 1.0, k), yaw: lerp(-0.1, -0.85, turn), pitch: lerp(-0.15, 0.05, turn), blink: tt.blinkAt(t, 1) });
      place(c, [lerp(1.05, 0.9, k), lerp(0.85, 0.72, k), lerp(0.55, 0.8, k)], [0.3, 0.55, 1.95]);
    }
    return { bloom: 0.6, dof: t + T > 60 ? { focus: c.position.distanceTo(tt.root.position) - 0.4, aperture: 0.004, maxblur: 0.01 } : undefined };
  } };
}

export const SHOTS = [
  { start: 0.0, end: 5.44, build: shotA },
  { start: 5.44, end: 10.2, build: shotB },
  { start: 10.2, end: 16.4, build: shotC },
  { start: 16.4, end: 20.48, build: shotD },
  { start: 20.48, end: 26.72, build: shotE },
  { start: 26.72, end: 30.48, build: shotF },
  { start: 30.48, end: 33.6, build: shotG },
  { start: 33.6, end: 37.04, build: shotH },
  { start: 37.04, end: 38.48, build: shotI },
  { start: 38.48, end: 40.32, build: shotJ },
  { start: 40.32, end: 46.08, build: shotK },
  { start: 46.08, end: 49.2, build: shotL },
  { start: 49.2, end: 53.92, build: shotM },
  { start: 53.92, end: 57.68, build: shotN },
  { start: 57.68, end: DURATION + 1, build: shotO },
];
