import * as THREE from 'three';
import { makeHuman } from './human.js';
import { glowSprite, sparks } from './props.js';
import { mat, box, shadow, chip, cardboard, crate, building, gate, signPost, newspaper, qmark, hat, podium, table, folder, badge, officeChair, safe, checkMark } from './props2.js';
import { kf, lerp, smooth, easeOut, easeIn, easeInOut, range, clamp, V, cam, place, shake, ikArm } from './anim.js';

export const CAPTIONS = [
  [0.00, 'The man who'],
  [0.56, 'built one of the'],
  [1.28, 'most valuable companies'],
  [2.64, 'on Earth just'],
  [3.76, 'lost his job'],
  [4.96, 'And it may'],
  [5.36, 'have started with a'],
  [6.16, 'spy'],
  [6.72, 'For thirty-three years'],
  [8.16, 'Jensen Huang ran'],
  [9.44, 'Nvidia'],
  [10.48, 'the company whose'],
  [11.36, 'chips power artificial'],
  [12.80, 'intelligence'],
  [13.76, 'Those chips are'],
  [14.64, 'so powerful that'],
  [15.84, 'America restricts selling'],
  [17.44, 'them to China'],
  [18.40, 'Then'],
  [18.64, 'in October'],
  [19.52, 'the New York'],
  [20.24, 'Times reported something'],
  [21.60, 'strange'],
  [22.48, 'U.S'],
  [23.60, 'intelligence believed'],
  [24.80, 'that a businesswoman'],
  [26.00, 'whose company bought'],
  [27.04, 'Nvidia\'s chips'],
  [28.48, 'had been recruited'],
  [29.44, 'by Chinese intelligence'],
  [31.04, 'to get close'],
  [31.68, 'to him'],
  [32.24, 'China called it groundless'],
  [34.08, 'No one has'],
  [34.72, 'been charged'],
  [35.52, 'and her exact'],
  [36.24, 'role is still'],
  [37.04, 'unclear'],
  [37.68, 'But Huang reportedly'],
  [39.04, 'admitted to an affair'],
  [40.56, 'and the board'],
  [41.28, 'opened an investigation'],
  [42.80, 'Four days later'],
  [43.76, 'he resigned'],
  [44.64, 'Nvidia\'s board says'],
  [46.00, 'it has no'],
  [46.80, 'reason to believe'],
  [47.84, 'any secrets were'],
  [48.80, 'compromised'],
  [49.60, 'The suspicion alone'],
  [50.72, 'was enough', 51.81],
];
export const DURATION = 52.01;

export const FADES = [[37.48, 37.62, 37.7, 37.86]];

function idle(t, k = 1) { return Math.sin(t * 1.6) * 0.012 * k; }
const STAND = {
  lSh: [0.05, 0, 0.16], rSh: [0.05, 0, -0.16], lEl: [-0.25, 0, 0], rEl: [-0.25, 0, 0],
  lHip: [0, 0, 0.07], rHip: [0, 0, -0.07], lAn: [0, 0, -0.07], rAn: [0, 0, 0.07],
};
function standPose(h, t, extra = {}) {
  const p = { ...STAND, ...extra };
  p.chest = [idle(t) + (extra.chest?.[0] || 0), extra.chest?.[1] || 0, extra.chest?.[2] || 0];
  h.setPose(p);
}
// put a fist at a point given in the character's own space (x: + is its left side, z: + is forward)
function reach(h, k, local, pole) {
  const s = k === 'l' ? 1 : -1;
  h.root.updateMatrixWorld(true);
  const T = h.root.localToWorld(V(...local));
  const P = h.root.localToWorld(V(...(pole || [s * 0.7, 0.9, -0.2])));
  const hint = h.root.localToWorld(V(-s, 0, 0)).sub(h.root.getWorldPosition(V(0, 0, 0)));
  ikArm(h, k, T, P, hint);
}

// ---------- cast ----------
const C = {
  jacket: mat(0x121214, { roughness: 0.38 }), blackLeg: mat(0x17181b, { roughness: 0.8 }), shoe: mat(0x0c0c0d, { roughness: 0.35 }),
  grey: mat(0xbfc3c9, { roughness: 0.8 }), black: mat(0x15110f, { roughness: 0.7 }), brown: mat(0x4a301f, { roughness: 0.85 }),
  wine: mat(0x7b2338, { roughness: 0.7 }), navy: mat(0x22305a, { roughness: 0.75 }), charcoal: mat(0x3a3d44, { roughness: 0.8 }),
  tan: mat(0x8a7558, { roughness: 0.8 }), teal: mat(0x1f5a5f, { roughness: 0.75 }), dark: mat(0x07080c, { roughness: 1 }),
};
const boss = () => makeHuman('plain', { mats: { cloth: C.jacket, legs: C.blackLeg, shoes: C.shoe, hair: C.grey }, head: { beard: false, glasses: true } });
const woman = () => makeHuman('plain', { mats: { cloth: C.wine, legs: C.blackLeg, shoes: C.shoe, hair: C.black }, head: { beard: false, long: true, quiff: false } });
const suit = (cloth, hair, head = {}) => makeHuman('plain', { mats: { cloth, legs: cloth, shoes: C.shoe, hair }, head: { beard: false, ...head } });
function shade() { // an anonymous silhouette in a hat
  const h = makeHuman('plain', { head: { beard: false, quiff: false } });
  h.root.traverse(o => { if (o.isMesh) o.material = C.dark; });
  const ht = hat(C.dark); ht.position.set(0, 0.185, 0); ht.rotation.x = -0.12; h.j.head.add(ht);
  return h;
}

// ============ 1: the boss outside the tower, holding his box ============
function s1({ makeStage }) {
  const scene = makeStage({ shadowSize: 5 });
  const b = building(); b.position.set(-0.3, 0, -7); scene.add(b);
  const man = boss(); scene.add(man.root);
  const bx = cardboard(); bx.position.set(0, 1.0, 0.36); scene.add(bx);
  const c = cam(40);
  return {
    scene, camera: c,
    update(t) {
      const k = easeInOut(range(t, 0.2, 3.6));
      standPose(man, t, { neck: [lerp(0.02, 0.3, k), 0, 0], head: [lerp(0, 0.12, k), 0, 0] });
      reach(man, 'l', [0.2, 0.98, 0.34]); reach(man, 'r', [-0.2, 0.98, 0.34]);
      man.setMouth(0);
      place(c, [lerp(1.4, 0.5, k), lerp(0.7, 1.4, k), lerp(7.2, 2.9, k)], [lerp(-0.1, 0, k), lerp(2.6, 1.22, k), 0]);
      return { dof: { focus: c.position.distanceTo(V(0, 1.4, 0)), aperture: 0.0025, maxblur: 0.008 } };
    },
  };
}

// ============ 2: a shadow with a question mark ============
function s2({ makeStage }) {
  const scene = makeStage({ shadowSize: 3, sun: 0.5 });
  const sp = shade(); sp.root.rotation.y = 0.55; scene.add(sp.root);
  const q = qmark(); q.position.set(0.42, 1.78, 0.2); q.scale.setScalar(1.25); scene.add(q);
  const gl = glowSprite(0xff3020, 0.9); gl.position.copy(q.position); scene.add(gl);
  const c = cam(34);
  return {
    scene, camera: c,
    update(t) {
      standPose(sp, t, { neck: [0.1, 0.2, 0] });
      const k = easeOut(range(t, 0, 1.8));
      q.rotation.y = Math.sin(t * 2.2) * 0.5; q.position.y = 1.78 + Math.sin(t * 3) * 0.02;
      gl.material.opacity = 0.35 + 0.15 * Math.sin(t * 6);
      place(c, [lerp(-0.5, -0.2, k), 1.5, lerp(3.4, 2.5, k)], [0.12, 1.5, 0]);
      return { exposure: 0.42, bloom: 1.0 };
    },
  };
}

// ============ 3a: 33 years in charge ============
function s3a({ makeStage }) {
  const scene = makeStage({ shadowSize: 5 });
  const b = building(); b.position.set(0.4, 0, -6.5); scene.add(b);
  const man = boss(); scene.add(man.root);
  const c = cam(36);
  return {
    scene, camera: c,
    update(t) {
      standPose(man, t, { neck: [-0.06, 0, 0] });
      reach(man, 'l', [0.21, 0.98, 0.03], [0.75, 1.15, -0.25]); reach(man, 'r', [-0.21, 0.98, 0.03], [-0.75, 1.15, -0.25]);
      man.setMouth(0.08);
      const a = lerp(-0.5, 0.35, easeInOut(range(t, 0, 2.7)));
      place(c, [Math.sin(a) * 3.3, 1.15, Math.cos(a) * 3.3], [0, 1.28, 0]);
      return { dof: { focus: 3.3, aperture: 0.003, maxblur: 0.008 } };
    },
  };
}

// ============ 3b: the chip ============
function s3b({ makeStage }) {
  const scene = makeStage({ shadowSize: 2 });
  const ch = chip(); ch.scale.setScalar(5); scene.add(ch);
  const gl = glowSprite(0x60ff40, 1.6); scene.add(gl);
  const sp = sparks(140, { speed: 0.9, spread: 2.2, gravity: 0.15, life: 2.6, size: 0.03, dir: V(0, 1, 0), seed: 5, color: [0.4, 1, 0.3] });
  scene.add(sp);
  const c = cam(34);
  return {
    scene, camera: c,
    update(t) {
      const rise = easeOut(range(t, 0, 0.9));
      ch.position.set(0, lerp(0.75, 1.25, rise) + Math.sin(t * 1.5) * 0.02, 0);
      ch.rotation.set(0.95 + Math.sin(t * 0.9) * 0.08, t * 0.55, 0.0);
      const pw = range(t, 1.6, 2.4);
      ch.userData.glow.emissiveIntensity = 1.5 + pw * 3 + Math.sin(t * 8) * 0.4 * pw;
      gl.position.copy(ch.position); gl.material.opacity = 0.12 + 0.3 * pw;
      sp.position.copy(ch.position); sp.update(t - 1.9);
      const k = easeInOut(range(t, 0, 4.2));
      place(c, [lerp(0.5, -0.25, k), lerp(1.55, 1.45, k), lerp(2.6, 1.9, k)], [0, 1.22, 0]);
      return { bloom: 0.7 + pw * 0.6 };
    },
  };
}

// ============ 4: the export barrier ============
function s4({ makeStage }) {
  const scene = makeStage({ shadowSize: 4 });
  const road = box(6, 0.02, 1.1, mat(0x4b5563, { roughness: 0.9 }), [0, 0.01, 0]); road.receiveShadow = true; scene.add(road);
  const gt = gate(); gt.position.set(0.55, 0, 0.62); scene.add(gt);
  const usa = signPost([['USA', 190, '#ffffff']], { bg: '#24418f', w: 0.7, h: 0.36, pole: 1.75 }); usa.position.set(-0.75, 0, -0.75); scene.add(usa);
  const chn = signPost([['CHINA', 150, '#ffe14a']], { bg: '#c8201f', w: 0.7, h: 0.36, pole: 1.75 }); chn.position.set(1.0, 0, -0.75); scene.add(chn);
  const cr = crate(0.5); scene.add(cr);
  const ch = chip(); ch.scale.setScalar(2.6); ch.position.set(0, 0.52, 0); cr.add(ch);
  const c = cam(40);
  const TD = 1.75; // bar comes down
  return {
    scene, camera: c,
    update(t) {
      const x = lerp(-1.6, -0.12, easeOut(range(t, 0, TD + 0.25)));
      const bump = t > TD + 0.2 ? Math.exp(-(t - TD - 0.2) * 6) * Math.sin((t - TD - 0.2) * 40) * 0.02 : 0;
      cr.position.set(x - Math.abs(bump), 0, 0); cr.rotation.z = bump * 2;
      const d = range(t, TD - 0.35, TD);
      const bounce = t > TD ? Math.exp(-(t - TD) * 7) * Math.sin((t - TD) * 26) * 0.09 : 0;
      gt.bar.rotation.z = -lerp(1.35, 0, d * d) - Math.abs(bounce);
      gt.lamp.material.emissiveIntensity = t > TD - 0.2 ? 1.5 + 1.5 * Math.sin(t * 14) : 0;
      const k = easeInOut(range(t, 0, 4.4));
      const s = t > TD && t < TD + 0.4 ? shake(t * 9, 2.5) : [0, 0, 0];
      place(c, [lerp(-0.5, 0.25, k) + s[0], lerp(1.5, 1.35, k) + s[1], lerp(5.3, 4.6, k)], [0.1, 0.98, 0]);
      return { bloom: 0.5 };
    },
  };
}

// ============ 5: the newspaper ============
function s5({ makeStage }) {
  const scene = makeStage({ shadowSize: 2 });
  const np = newspaper(); scene.add(np);
  const c = cam(34);
  return {
    scene, camera: c,
    update(t) {
      const k = easeOut(range(t, 0.0, 1.0));
      np.position.set(0, 1.42, lerp(-9, 0, k));
      np.rotation.set(-0.06, Math.sin(t * 0.8) * 0.05, (1 - k) * Math.PI * 5 + 0.05);
      const p = easeInOut(range(t, 1.0, 4.0));
      place(c, [0, lerp(1.4, 1.5, p), lerp(1.75, 1.25, p)], [0, lerp(1.4, 1.5, p), 0]);
      return {};
    },
  };
}

// ============ 6a: the analyst and the file ============
function s6a({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 });
  const ag = suit(C.charcoal, C.brown); scene.add(ag.root);
  const f = folder([['CLASSIFIED', 76, '#c01818']]); scene.add(f);
  const c = cam(34);
  return {
    scene, camera: c,
    update(t) {
      standPose(ag, t, { neck: [0.32, 0, 0], head: [0.1, 0, 0] });
      reach(ag, 'l', [0.2, 1.08, 0.36]); reach(ag, 'r', [-0.2, 1.08, 0.36]);
      ag.setMouth(0);
      f.position.set(0, 1.1, 0.4); f.rotation.set(0.75, 0, 0);
      const k = easeInOut(range(t, 0, 2.3));
      place(c, [lerp(0.7, 0.3, k), lerp(1.55, 1.5, k), lerp(2.7, 1.9, k)], [0, lerp(1.3, 1.25, k), 0.1]);
      return { dof: { focus: c.position.distanceTo(V(0, 1.2, 0.3)), aperture: 0.003, maxblur: 0.008 } };
    },
  };
}

// ============ 6b: the businesswoman and her crates of chips ============
function s6b({ makeStage }) {
  const scene = makeStage({ shadowSize: 4 });
  const w = woman(); w.root.position.set(-0.42, 0, 0.1); w.root.rotation.y = 0.25; scene.add(w.root);
  const lab = [['AI CHIPS', 92, '#1f7a3a']];
  const crates = [];
  const spots = [[0.45, 0, 0], [0.98, 0, -0.05], [0.7, 0.52, -0.02]];
  spots.forEach((p, i) => { const cr = crate(0.5, lab); cr.rotation.y = [-0.1, 0.12, 0.05][i]; scene.add(cr); crates.push(cr); });
  const c = cam(38);
  return {
    scene, camera: c,
    update(t) {
      standPose(w, t, { neck: [0, -0.25, 0] });
      reach(w, 'l', [0.21, 0.98, 0.03], [0.75, 1.15, -0.25]);
      w.setMouth(0.05);
      crates.forEach((cr, i) => {
        const t0 = 0.25 + i * 0.75, d = t - t0;
        const y = d < 0 ? 6 : Math.max(0, 5 * (1 - range(d, 0, 0.32) ** 2));
        const sq = d > 0.32 ? Math.exp(-(d - 0.32) * 9) * Math.sin((d - 0.32) * 30) * 0.05 : 0;
        cr.position.set(spots[i][0], spots[i][1] + y, spots[i][2]); cr.scale.set(1 + sq, 1 - sq, 1 + sq);
      });
      const k = easeInOut(range(t, 0, 3.6));
      place(c, [lerp(-0.3, 0.35, k), 1.3, lerp(4.9, 4.3, k)], [0.22, 0.98, 0]);
      return { dof: { focus: 4.5, aperture: 0.0015, maxblur: 0.006 } };
    },
  };
}

// ============ 6c: the handler behind her, and the man she is sent to ============
function s6c({ makeStage }) {
  const scene = makeStage({ shadowSize: 5 });
  const w = woman(); w.root.position.set(0, 0, 0); scene.add(w.root);
  const sp = shade(); sp.root.position.set(-0.46, 0, -0.35); sp.root.rotation.y = 0.5; scene.add(sp.root);
  const man = boss(); man.root.position.set(1.25, 0, 0.1); man.root.rotation.y = -0.45; scene.add(man.root);
  const c = cam(34);
  return {
    scene, camera: c,
    update(t) {
      const turn = easeInOut(range(t, 2.3, 3.2));
      w.root.rotation.y = lerp(0, 0.75, turn);
      standPose(w, t, { neck: [0, lerp(-0.3, 0, turn), 0] });
      w.setMouth(0);
      // the shadow leans in and puts a hand on her shoulder
      const lean = easeOut(range(t, 0.2, 1.1));
      standPose(sp, t + 1, { spine: [0.12 * lean, 0, -0.1 * lean], neck: [0.1, -0.3 * lean, 0] });
      sp.root.updateMatrixWorld(true); w.root.updateMatrixWorld(true);
      const shoulder = w.j.rSh.getWorldPosition(V(0, 0, 0)).add(V(-0.02, 0.07, -0.03));
      const rest = sp.root.localToWorld(V(0.26, 0.8, 0.05));
      const tgt = rest.lerp(shoulder, lean);
      ikArm(sp, 'l', tgt, sp.root.localToWorld(V(0.8, 1.0, -0.3)), V(-1, 0, 0));
      standPose(man, t + 2, { neck: [0, 0.2, 0] });
      man.setMouth(0.06);
      const k = easeInOut(range(t, 1.9, 3.3));
      place(c, [lerp(-0.25, 0.62, k), lerp(1.5, 1.45, k), lerp(3.0, 5.6, k)], [lerp(-0.12, 0.5, k), lerp(1.38, 1.12, k), 0]);
      return { dof: { focus: c.position.distanceTo(V(0, 1.4, 0)), aperture: 0.002, maxblur: 0.007 } };
    },
  };
}

// ============ 7a: the denial at the podium ============
function s7a({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 });
  const p = podium(); p.position.set(0, 0, 0.42); scene.add(p);
  const sm = suit(C.navy, C.black, { glasses: true }); scene.add(sm.root);
  const c = cam(34);
  return {
    scene, camera: c,
    update(t) {
      const wag = Math.sin(t * 9) * 0.3;
      standPose(sm, t, { neck: [0, Math.sin(t * 7) * 0.22, 0] });
      reach(sm, 'l', [0.22, 1.12, 0.3]);
      reach(sm, 'r', [-0.3 + wag * 0.3, 1.5, 0.32], [-0.9, 1.0, 0]);
      sm.setMouth(0.25 + 0.2 * Math.sin(t * 11));
      const k = easeOut(range(t, 0, 1.8));
      place(c, [lerp(0.5, 0.25, k), 1.45, lerp(3.3, 2.8, k)], [0, 1.25, 0.2]);
      return { dof: { focus: 2.9, aperture: 0.002, maxblur: 0.007 } };
    },
  };
}

// ============ 7b: nobody charged, role unclear ============
function s7b({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 });
  const w = woman(); scene.add(w.root);
  const q = qmark(0xffd21f); q.position.set(0, 2.2, 0); q.scale.setScalar(1.15); scene.add(q);
  const c = cam(34);
  return {
    scene, camera: c,
    update(t) {
      standPose(w, t, {});
      w.setMouth(0);
      const pop = easeOut(range(t, 1.3, 1.75));
      q.scale.setScalar(0.001 + 1.15 * pop * (1 + 0.25 * Math.sin(Math.min(1, range(t, 1.3, 2.1)) * Math.PI)));
      q.rotation.y = Math.sin(t * 1.8) * 0.6; q.position.y = 2.2 + Math.sin(t * 2.4) * 0.025;
      const a = lerp(0.45, -0.3, easeInOut(range(t, 0, 3.6)));
      place(c, [Math.sin(a) * 3.3, 1.6, Math.cos(a) * 3.3], [0, 1.62, 0]);
      return { dof: { focus: 3.3, aperture: 0.002, maxblur: 0.007 }, bloom: 0.6 };
    },
  };
}

// ============ 8a: the admission ============
function s8a({ makeStage }) {
  const scene = makeStage({ shadowSize: 3, sun: 1.7 });
  const man = boss(); scene.add(man.root);
  const c = cam(32);
  return {
    scene, camera: c,
    update(t) {
      const k = easeInOut(range(t, 0.1, 1.2));
      standPose(man, t, { spine: [0.1 * k, 0, 0], neck: [0.3 * k, 0, 0], head: [0.18 * k, 0, 0] });
      man.root.updateMatrixWorld(true);
      const brow = man.j.head.localToWorld(V(-0.03, 0.15, 0.15));
      const rest = man.root.localToWorld(V(-0.26, 0.8, 0.05));
      ikArm(man, 'r', rest.lerp(brow, k), man.root.localToWorld(V(-0.9, 0.9, 0.3)), V(1, 0, 0));
      man.setMouth(0);
      const p = easeOut(range(t, 0, 2.8));
      place(c, [lerp(0.75, 0.5, p), 1.5, lerp(2.9, 2.3, p)], [0, 1.42, 0]);
      return { dof: { focus: c.position.distanceTo(V(0, 1.5, 0)), aperture: 0.003, maxblur: 0.008 }, exposure: 0.85 };
    },
  };
}

// ============ 8b: the board ============
function s8b({ makeStage }) {
  const scene = makeStage({ shadowSize: 5 });
  const tb = table(2.5, 0.9); tb.position.set(0, 0, 0.55); scene.add(tb);
  const people = [
    [suit(C.charcoal, C.grey, { glasses: true }), -0.9], [suit(C.navy, C.brown, { long: true, quiff: false }), -0.3],
    [suit(C.tan, C.black), 0.3], [suit(C.teal, C.grey, { long: true, quiff: false }), 0.9],
  ];
  people.forEach(([h, x], i) => { h.root.position.set(x, 0, -0.15); h.root.rotation.y = -x * 0.25; scene.add(h.root); });
  const f = folder([['INVESTIGATION', 62, '#c01818']]); f.scale.setScalar(1.7); scene.add(f);
  const c = cam(44);
  const TS = 0.72;
  return {
    scene, camera: c,
    update(t) {
      people.forEach(([h], i) => {
        standPose(h, t + i * 1.7, { neck: [0.28, 0, 0], spine: [0.08, 0, 0] });
        reach(h, 'l', [0.17, 0.83, 0.42]); reach(h, 'r', [-0.17, 0.83, 0.42]);
        h.setMouth(0);
      });
      const d = range(t, TS - 0.3, TS);
      f.position.set(0, 0.78 + (1 - d * d) * 1.3, 0.66); f.rotation.set(0, 0.12, (1 - d) * 0.5);
      const s = t > TS && t < TS + 0.35 ? shake(t * 10, 3) : [0, 0, 0];
      const k = easeOut(range(t, 0, 2.2));
      place(c, [lerp(0.5, 0.2, k) + s[0], lerp(2.0, 1.85, k) + s[1], lerp(4.5, 4.1, k)], [0, 0.98, 0.2]);
      return {};
    },
  };
}

// ============ 9: the badge on the desk ============
function s9({ makeStage }) {
  const scene = makeStage({ shadowSize: 4 });
  const tb = table(1.6, 0.8); tb.position.set(0, 0, 0.3); scene.add(tb);
  const bd = badge(); scene.add(bd);
  const man = boss(); man.root.rotation.y = Math.PI; scene.add(man.root);
  const c = cam(36);
  return {
    scene, camera: c,
    update(t) {
      const d = range(t, 0.05, 0.35);
      const b = t > 0.35 ? Math.exp(-(t - 0.35) * 9) * Math.abs(Math.sin((t - 0.35) * 22)) * 0.05 : 0;
      bd.position.set(0.05, 0.765 + (1 - d * d) * 0.5 + b, 0.42); bd.rotation.set(0, 0.35 + (1 - d) * 1.5, 0);
      const w = t * 5.2, sw = Math.sin(w) * 0.42;
      man.root.position.set(0.1, 0, -1.3 - t * 0.85);
      man.setPose({
        lHip: [-sw, 0, 0.05], rHip: [sw, 0, -0.05], lKn: [Math.max(0, -Math.cos(w)) * 0.7, 0, 0], rKn: [Math.max(0, Math.cos(w)) * 0.7, 0, 0],
        lSh: [sw * 0.8, 0, 0.14], rSh: [-sw * 0.8, 0, -0.14], lEl: [-0.3, 0, 0], rEl: [-0.3, 0, 0], neck: [0.2, 0, 0], drop: -Math.abs(Math.sin(w)) * 0.02,
      });
      const k = easeInOut(range(t, 0, 1.8));
      place(c, [lerp(0.5, 0.42, k), lerp(1.25, 1.3, k), lerp(1.75, 1.6, k)], [0.06, 0.95, -0.3]);
      return { dof: { focus: c.position.distanceTo(V(0.05, 0.77, 0.42)), aperture: 0.006, maxblur: 0.009 } };
    },
  };
}

// ============ 10: nothing reported stolen ============
function s10({ makeStage }) {
  const scene = makeStage({ shadowSize: 3 });
  const sf = safe(); sf.position.set(0, 0.35, 0); scene.add(sf);
  scene.add(shadow(box(1.2, 0.35, 0.95, mat(0x3d444c, { roughness: 0.6 }), [0, 0.175, 0])));
  const ch = chip(); ch.scale.setScalar(3.2); ch.position.set(0, 0.5, 0.05); ch.rotation.x = 0.5; sf.add(ch);
  const ck = checkMark(0.3); ck.position.set(0.0, 1.95, 0.45); ck.renderOrder = 10; scene.add(ck);
  const c = cam(36);
  const TC = 1.5;
  return {
    scene, camera: c,
    update(t) {
      const d = easeInOut(range(t, 0.25, TC));
      sf.door.rotation.y = lerp(-1.95, 0, d);
      sf.handle.rotation.z = easeInOut(range(t, TC, TC + 0.6)) * Math.PI * 1.5;
      const lit = range(t, TC + 0.55, TC + 0.7);
      sf.lamp.material.emissiveIntensity = lit * 3;
      const pop = easeOut(range(t, 2.1, 2.5));
      ck.scale.setScalar(0.001 + pop * (1 + 0.2 * Math.sin(range(t, 2.1, 2.9) * Math.PI)));
      const s = t > TC && t < TC + 0.25 ? shake(t * 10, 2) : [0, 0, 0];
      const k = easeInOut(range(t, 0, 4.6));
      place(c, [lerp(1.3, 0.75, k) + s[0], lerp(1.5, 1.4, k) + s[1], lerp(4.3, 3.7, k)], [0, 1.12, 0]);
      ck.lookAt(c.position);
      return { bloom: 0.6 };
    },
  };
}

// ============ 11: the empty chair ============
function s11({ makeStage }) {
  const scene = makeStage({ shadowSize: 4, sun: 1.9 });
  const b = building(); b.position.set(0.6, 0, -7.5); scene.add(b);
  const ch = officeChair(); ch.scale.setScalar(1.25); scene.add(ch);
  // the leather jacket left over the backrest
  const jk = new THREE.Group(); jk.position.set(0, 0.62, -0.26); ch.top.add(jk);
  jk.add(box(0.56, 0.5, 0.13, C.jacket, [0, 0, 0], [-0.1, 0, 0]));
  for (const s of [-1, 1]) jk.add(box(0.11, 0.5, 0.1, C.jacket, [s * 0.3, -0.12, 0.02], [-0.1, 0, s * 0.12]));
  shadow(jk);
  const c = cam(36);
  return {
    scene, camera: c,
    update(t) {
      ch.top.rotation.y = 0.9 - easeOut(range(t, 0, 2.6)) * 1.15;
      const k = easeOut(range(t, 0, 2.6));
      place(c, [lerp(0.5, 0.8, k), lerp(1.2, 1.35, k), lerp(2.7, 3.6, k)], [0, 0.9, 0]);
      return { dof: { focus: c.position.distanceTo(V(0, 0.8, 0)), aperture: 0.004, maxblur: 0.009 }, exposure: 0.9 };
    },
  };
}

export const SHOTS = [
  { start: 0.0, end: 4.9, build: s1 },
  { start: 4.9, end: 6.7, build: s2 },
  { start: 6.7, end: 9.4, build: s3a },
  { start: 9.4, end: 13.72, build: s3b },
  { start: 13.72, end: 18.38, build: s4 },
  { start: 18.38, end: 22.45, build: s5 },
  { start: 22.45, end: 24.8, build: s6a },
  { start: 24.8, end: 28.45, build: s6b },
  { start: 28.45, end: 32.22, build: s6c },
  { start: 32.22, end: 34.05, build: s7a },
  { start: 34.05, end: 37.66, build: s7b },
  { start: 37.66, end: 40.52, build: s8a },
  { start: 40.52, end: 42.78, build: s8b },
  { start: 42.78, end: 44.62, build: s9 },
  { start: 44.62, end: 49.58, build: s10 },
  { start: 49.58, end: DURATION + 1, build: s11 },
];
