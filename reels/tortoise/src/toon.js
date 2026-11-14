// Cartoon cast for story shorts: big flat white heads with drawn faces, pear bodies, black stick limbs,
// ink outlines and cel shading. Joint names match human.js so ikArm / setPose work the same way.
import * as THREE from 'three';
import { ikArm, V } from './anim.js';

// ---------- cel shading + ink ----------
let _grad;
function gradient() {
  if (_grad) return _grad;
  const d = new Uint8Array([95, 95, 95, 255, 175, 175, 175, 255, 255, 255, 255, 255]);
  _grad = new THREE.DataTexture(d, 3, 1, THREE.RGBAFormat);
  _grad.minFilter = _grad.magFilter = THREE.NearestFilter; _grad.needsUpdate = true;
  return _grad;
}
export const toon = (color, o = {}) => new THREE.MeshToonMaterial({ color, gradientMap: gradient(), ...o });

const INK = new THREE.ShaderMaterial({
  uniforms: { thick: { value: 0.012 } },
  vertexShader: `uniform float thick; void main(){ vec3 p = position + normal * thick; gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
  fragmentShader: `void main(){ gl_FragColor = vec4(0.06, 0.05, 0.07, 1.0); }`,
  side: THREE.BackSide,
});
const inkMats = new Map();
// add an inverted-hull outline (thickness in metres) to a mesh, or to every mesh in a group
export function ink(obj, thick = 0.012) {
  if (!inkMats.has(thick)) { const m = INK.clone(); m.uniforms.thick.value = thick; inkMats.set(thick, m); }
  const meshes = [];
  obj.traverse(c => { if (c.isMesh && !c.userData.noInk && !c.userData.isInk) meshes.push(c); });
  for (const m of meshes) {
    const o = new THREE.Mesh(m.geometry, inkMats.get(thick));
    o.userData.isInk = true; o.castShadow = false; o.receiveShadow = false;
    m.add(o);
  }
  return obj;
}
export function shade(o) { o.traverse(c => { if (c.isMesh && !c.userData.isInk) { c.castShadow = true; c.receiveShadow = true; } }); return o; }

const sph = (r, m, p = [0, 0, 0], s = [1, 1, 1], seg = 32) => {
  const x = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.7)), m); x.position.set(...p); x.scale.set(...s); return x;
};
const stick = (len, r, m) => { // limb along -Y from the joint
  const x = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), m); x.position.y = -len / 2; return x;
};

// ---------- faces ----------
const faceCache = new Map();
// expression: neutral smile grin worried shock smug sad sick blink happy angry; flags: sweat
function drawFace(expr, sweat) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512;
  const g = c.getContext('2d');
  g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = g.fillStyle = '#141015';
  const EX = [182, 330], EY = 205;
  const dot = (x, y, r) => { g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); };
  const line = (pts, w = 12) => { g.lineWidth = w; g.beginPath(); g.moveTo(...pts[0]); for (const p of pts.slice(1)) g.lineTo(...p); g.stroke(); };
  const curve = (a, ctrl, b, w = 12) => { g.lineWidth = w; g.beginPath(); g.moveTo(...a); g.quadraticCurveTo(...ctrl, ...b); g.stroke(); };
  // brows
  const brow = { neutral: [0, 0], smile: [-4, 0], grin: [-6, 0], happy: [-8, 0], worried: [10, -14], sad: [10, -14], shock: [-18, 0],
    smug: [6, 8], sick: [8, -8], blink: [0, 0], angry: [8, 16] }[expr] || [0, 0];
  for (const [i, x] of EX.entries()) {
    const s = i ? 1 : -1, tilt = brow[1] * s;
    line([[x - 40, EY - 66 + brow[0] * 1.3 - tilt * 0.7], [x + 40, EY - 66 + brow[0] * 1.3 + tilt * 0.7]], 15);
  }
  // eyes
  for (const x of EX) {
    if (expr === 'blink') line([[x - 28, EY], [x + 28, EY]], 13);
    else if (expr === 'happy') curve([x - 30, EY + 8], [x, EY - 30], [x + 30, EY + 8], 13);
    else if (expr === 'shock') { g.fillStyle = '#fff'; dot(x, EY, 46); g.fillStyle = '#141015'; g.lineWidth = 10; g.beginPath(); g.arc(x, EY, 46, 0, 7); g.stroke(); dot(x, EY, 15); }
    else if (expr === 'smug') { dot(x, EY + 6, 27); g.fillStyle = '#fff'; g.fillRect(x - 36, EY - 40, 72, 40); g.fillStyle = '#141015'; line([[x - 34, EY], [x + 34, EY]], 11); }
    else dot(x, EY, expr === 'worried' || expr === 'sad' ? 25 : 28);
  }
  // mouth
  const MY = 340; g.save(); g.translate(256, MY); g.scale(1.45, 1.45); g.translate(-256, -MY);
  if (expr === 'smile') curve([200, MY - 6], [256, MY + 34], [312, MY - 6]);
  else if (expr === 'happy') curve([196, MY - 10], [256, MY + 44], [316, MY - 10]);
  else if (expr === 'grin' ) { g.beginPath(); g.moveTo(186, MY - 16); g.quadraticCurveTo(256, MY + 70, 326, MY - 16); g.closePath(); g.fill();
    g.fillStyle = '#fff'; g.fillRect(206, MY - 10, 100, 18); g.fillStyle = '#141015'; for (const x of [238, 274]) line([[x, MY - 10], [x, MY + 8]], 5); }
  else if (expr === 'worried' || expr === 'sick') { g.lineWidth = 10; g.beginPath(); for (let i = 0; i <= 8; i++) { const x = 206 + i * 12.5, y = MY + (i % 2 ? -7 : 7); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
  else if (expr === 'shock') { g.beginPath(); g.ellipse(256, MY + 6, 22, 30, 0, 0, 7); g.fill(); }
  else if (expr === 'sad') curve([212, MY + 14], [256, MY - 18], [300, MY + 14]);
  else if (expr === 'smug') curve([226, MY + 4], [276, MY + 16], [312, MY - 12], 11);
  else if (expr === 'angry') line([[214, MY + 8], [298, MY + 8]], 12);
  else line([[226, MY], [286, MY]], 11);
  g.restore();
  if (expr === 'sick') { g.fillStyle = 'rgba(120,200,90,0.55)'; g.fillRect(150, 250, 212, 180); }
  if (sweat) { g.fillStyle = '#6cc7ff'; g.beginPath(); g.moveTo(388, 120); g.quadraticCurveTo(414, 168, 404, 184); g.arc(388, 176, 18, 0.3, Math.PI - 0.1); g.quadraticCurveTo(366, 160, 388, 120); g.fill();
    g.strokeStyle = '#141015'; g.lineWidth = 5; g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
function faceTex(expr, sweat) {
  const k = expr + (sweat ? '+s' : '');
  if (!faceCache.has(k)) faceCache.set(k, drawFace(expr, sweat));
  return faceCache.get(k);
}

// ---------- stripes / patterns for clothes ----------
export function stripes(a, b, n = 7, vertical = false) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); g.fillStyle = a; g.fillRect(0, 0, 128, 128); g.fillStyle = b;
  for (let i = 0; i < n; i++) vertical ? g.fillRect(i * 128 / n, 0, 64 / n, 128) : g.fillRect(0, i * 128 / n, 128, 64 / n);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

// ---------- hats ----------
function hatMesh(kind, R) {
  const g = new THREE.Group();
  if (kind === 'captain') {
    const m = toon(0x1d2a4f), w = toon(0xf4f1e8), gold = toon(0xe0b43c);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.95, R * 0.82, R * 0.42, 32), w); top.position.y = R * 0.2; g.add(top);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.84, R * 0.84, R * 0.2, 32), m); band.position.y = R * 0.04; g.add(band);
    const peak = sph(R * 0.62, m, [0, -R * 0.02, R * 0.58], [1, 0.12, 0.7]); g.add(peak);
    g.add(sph(R * 0.11, gold, [0, R * 0.12, R * 0.82], [1, 1, 0.4]));
  } else if (kind === 'pirate') {
    const m = toon(0x1a1716);
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.25, R * 1.25, R * 0.07, 3), m); brim.rotation.y = Math.PI / 2; g.add(brim);
    const crown = sph(R * 0.82, m, [0, R * 0.12, 0], [1, 0.62, 1]); g.add(crown);
    const skull = sph(R * 0.13, toon(0xf4f1e8), [0, R * 0.28, R * 0.66], [1, 1, 0.4]); g.add(skull);
  } else if (kind === 'chef') {
    const w = toon(0xfbfaf6);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.86, R * 0.86, R * 0.3, 32), w); band.position.y = R * 0.08; g.add(band);
    for (const [x, z] of [[0, 0], [0.32, 0.1], [-0.32, 0.1], [0, -0.3], [0.15, 0.3], [-0.2, -0.2]]) g.add(sph(R * 0.48, w, [x * R, R * 0.55, z * R]));
  } else if (kind === 'bandana') {
    const m = toon(0xc8322c);
    g.add(sph(R * 1.03, m, [0, -R * 0.08, -R * 0.02], [1, 0.62, 1.02]));
    const knot = sph(R * 0.14, m, [R * 0.3, -R * 0.08, -R * 0.95]); g.add(knot);
    const tail = sph(R * 0.12, m, [R * 0.38, -R * 0.38, -R * 1.0], [0.7, 2, 0.5]); g.add(tail);
  } else if (kind === 'ranger') {
    const m = toon(0x9a7a4a), b = toon(0x4a3824);
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(R * 1.45, R * 1.45, R * 0.06, 40), m));
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.6, R * 0.8, R * 0.5, 4), m); crown.rotation.y = Math.PI / 4; crown.position.y = R * 0.26; g.add(crown);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.81, R * 0.81, R * 0.1, 32), b); band.position.y = R * 0.06; g.add(band);
  } else if (kind === 'sun') {
    const m = toon(0xf2d27a);
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(R * 1.5, R * 1.5, R * 0.05, 40), m));
    g.add(sph(R * 0.82, m, [0, R * 0.05, 0], [1, 0.55, 1]));
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.83, R * 0.83, R * 0.1, 32), toon(0xd8504a)); band.position.y = R * 0.06; g.add(band);
  } else if (kind === 'cap') {
    const m = toon(0x2f7fd0);
    g.add(sph(R * 1.0, m, [0, -R * 0.02, 0], [1, 0.6, 1]));
    g.add(sph(R * 0.7, m, [0, -R * 0.12, R * 0.7], [1, 0.1, 0.8]));
  }
  return g;
}

// ---------- character ----------
// opts: { shirt: color | texture, pants, hat, hair (color|null), beard (color|null), height scale, belly }
export function makeToon(opts = {}) {
  const R = 0.2;
  const shirtMat = opts.shirt?.isTexture ? toon(0xffffff, { map: opts.shirt }) : toon(opts.shirt ?? 0x3f7fd0);
  const pantsMat = toon(opts.pants ?? 0x2b2f3a);
  const black = toon(0x17141a);
  const root = new THREE.Group();
  const inner = new THREE.Group(); inner.scale.setScalar(opts.scale ?? 1); root.add(inner);
  const HIP = 0.55;
  const pelvis = new THREE.Group(); pelvis.position.y = HIP; inner.add(pelvis);
  const spine = new THREE.Group(); pelvis.add(spine);
  const chest = new THREE.Group(); chest.position.y = 0.22; spine.add(chest);
  const j = { root, pelvis, spine, chest };
  // pear body: lower part on spine (pants colour at the bottom), upper on chest
  const belly = opts.belly ?? 1;
  const prof = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24, y = -0.08 + t * 0.56;
    const r = (0.035 + Math.sin(Math.min(1, t * 1.25) * Math.PI * 0.62) * (0.2 * belly) * (1 - t * 0.45)) * (t > 0.93 ? Math.sqrt(1 - (t - 0.93) / 0.07 * 0.85) : 1);
    prof.push(new THREE.Vector2(Math.max(0.001, r), y));
  }
  prof[0].x = 0.001;
  const bodyG = new THREE.LatheGeometry(prof, 40); bodyG.scale(1, 1, 0.82);
  const body = new THREE.Mesh(bodyG, shirtMat); spine.add(body);
  // neck + head
  const neck = new THREE.Group(); neck.position.y = 0.26; chest.add(neck);
  { const nm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.08, 10), black); nm.position.y = 0.03; neck.add(nm); }
  const head = new THREE.Group(); head.position.y = 0.03 + R * 0.88; neck.add(head);
  const skull = sph(R, toon(0xfbfbf8), [0, 0, 0], [0.97, 1, 0.92], 48); head.add(skull);
  const faceG = new THREE.SphereGeometry(R * 1.006, 40, 30, Math.PI / 2 - 0.95, 1.9, 0.62, 1.55);
  const faceM = new THREE.MeshBasicMaterial({ map: faceTex('neutral'), transparent: true, depthWrite: false, toneMapped: false });
  const face = new THREE.Mesh(faceG, faceM); face.scale.copy(skull.scale); face.userData.noInk = true; face.renderOrder = 2; head.add(face);
  if (opts.hair !== null) {
    const hairM = toon(opts.hair ?? 0x2a1d17);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(R * 1.035, 40, 20, 0, Math.PI * 2, 0, 1.05), hairM);
    cap.scale.set(0.97, 1, 0.94); cap.rotation.x = -0.32; head.add(cap);
    if (opts.longHair) head.add(sph(R * 0.95, hairM, [0, -R * 0.35, -R * 0.35], [1.0, 1.0, 0.7]));
    if (opts.bun) head.add(sph(R * 0.32, hairM, [0, R * 0.95, -R * 0.35]));
  }
  if (opts.beard) { const b = sph(R * 0.62, toon(opts.beard), [0, -R * 0.8, R * 0.38], [1.1, 0.5, 0.6]); b.userData.beard = true; head.add(b); }
  if (opts.glasses) {
    const gm = new THREE.MeshBasicMaterial({ color: 0x141015 });
    for (const s of [-1, 1]) { const r = new THREE.Mesh(new THREE.TorusGeometry(R * 0.26, R * 0.035, 8, 28), gm); r.position.set(s * R * 0.24, R * 0.18, R * 0.95); r.userData.noInk = true; head.add(r); }
  }
  if (opts.hat) { const h = hatMesh(opts.hat, R); h.position.y = R * 0.78; h.rotation.x = -0.12; head.add(h); }
  j.neck = neck; j.head = head;
  // arms + legs
  for (const s of [1, -1]) {
    const k = s > 0 ? 'l' : 'r';
    const sh = new THREE.Group(); sh.position.set(s * 0.15, 0.17, 0); chest.add(sh);
    sh.add(stick(0.2, 0.017, black));
    const el = new THREE.Group(); el.position.y = -0.2; sh.add(el);
    el.add(sph(0.017, black)); el.add(stick(0.2, 0.017, black));
    const wr = new THREE.Group(); wr.position.y = -0.2; el.add(wr);
    wr.add(sph(0.045, black));
    j[k + 'Sh'] = sh; j[k + 'El'] = el; j[k + 'Wr'] = wr;
    const hip = new THREE.Group(); hip.position.set(s * 0.075, -0.02, 0); pelvis.add(hip);
    hip.add(stick(0.26, 0.018, black));
    const kn = new THREE.Group(); kn.position.y = -0.26; hip.add(kn);
    kn.add(sph(0.018, black)); kn.add(stick(0.25, 0.018, black));
    const an = new THREE.Group(); an.position.y = -0.25; kn.add(an);
    an.add(sph(0.05, toon(opts.shoes ?? 0x17141a), [0, -0.015, 0.035], [0.85, 0.55, 1.6]));
    j[k + 'Hip'] = hip; j[k + 'Kn'] = kn; j[k + 'An'] = an;
  }
  ink(body, 0.008); ink(skull, 0.007);
  head.children.forEach(c => { if (c !== skull && c !== face && !c.userData.isInk) ink(c, 0.006); });
  shade(root);
  face.castShadow = false;
  let cur = '';
  const human = {
    root, j, R,
    setPose(p = {}) {
      for (const k of ['pelvis', 'spine', 'chest', 'neck', 'head', 'lSh', 'lEl', 'lWr', 'rSh', 'rEl', 'rWr', 'lHip', 'lKn', 'lAn', 'rHip', 'rKn', 'rAn']) {
        const v = p[k] || [0, 0, 0];
        j[k].rotation.set(v[0], v[1], v[2], 'YXZ');
      }
      j.pelvis.position.y = HIP + (p.drop || 0);
    },
    face(expr = 'neutral', sweat = false) {
      const k = expr + sweat;
      if (k !== cur) { faceM.map = faceTex(expr, sweat); faceM.needsUpdate = true; cur = k; }
    },
    // face with automatic blinks driven by time t (seconds)
    faceAt(t, expr = 'neutral', sweat = false, seed = 0) {
      const ph = (t + seed * 1.37) % 3.1;
      this.face(ph > 2.95 && expr !== 'shock' ? 'blink' : expr, sweat);
    },
    // put a hand at a point given in the character's local space (x: + = its left, z: + = forward)
    reach(k, local, pole) {
      const s = k === 'l' ? 1 : -1;
      root.updateMatrixWorld(true);
      const sc = inner.scale.x;
      const T = inner.localToWorld(V(...local));
      const P = inner.localToWorld(V(...(pole || [s * 0.5, 0.5, -0.25])));
      const hint = V(-s, 0, 0).applyQuaternion(root.getWorldQuaternion(new THREE.Quaternion()));
      ikArm(human, k, T, P, hint, 0.2 * sc, 0.2 * sc);
    },
    // walk cycle (phase in radians) layered on a pose
    walk(ph, extra = {}) {
      const sw = Math.sin(ph) * 0.5;
      this.setPose({
        lHip: [-sw, 0, 0.04], rHip: [sw, 0, -0.04], lKn: [Math.max(0, -Math.cos(ph)) * 0.8, 0, 0], rKn: [Math.max(0, Math.cos(ph)) * 0.8, 0, 0],
        lSh: [sw * 0.9, 0, 0.18], rSh: [-sw * 0.9, 0, -0.18], lEl: [-0.35, 0, 0], rEl: [-0.35, 0, 0],
        drop: -Math.abs(Math.cos(ph)) * 0.025, ...extra,
      });
    },
  };
  human.setPose({});
  return human;
}

// relaxed stand with a small breathing sway
export const STAND = { lSh: [0.04, 0, 0.2], rSh: [0.04, 0, -0.2], lEl: [-0.2, 0, 0], rEl: [-0.2, 0, 0], lHip: [0, 0, 0.03], rHip: [0, 0, -0.03] };
export function stand(h, t, extra = {}) {
  const b = Math.sin(t * 1.7) * 0.015;
  h.setPose({ ...STAND, ...extra, chest: [b + (extra.chest?.[0] || 0), extra.chest?.[1] || 0, extra.chest?.[2] || 0] });
}

// ---------- giant tortoise ----------
function shellTex(base, line) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d'); g.fillStyle = base; g.fillRect(0, 0, 512, 256);
  g.strokeStyle = line; g.lineWidth = 7; g.lineJoin = 'round';
  const hex = (cx, cy, r) => { g.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + Math.PI / 6; g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 1.15); } g.closePath(); g.stroke(); };
  for (let row = 0; row < 4; row++) for (let i = 0; i < 9; i++) hex(i * 64 + (row % 2) * 32, 28 + row * 66, 34);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = THREE.RepeatWrapping;
  return t;
}
export function makeTortoise(opts = {}) {
  const root = new THREE.Group();
  const body = new THREE.Group(); root.add(body);
  const skin = toon(opts.skin ?? 0x8d8b78);
  const shellM = toon(0xffffff, { map: shellTex(opts.shell ?? '#6d5a3a', opts.lines ?? '#3e321f') });
  const shell = new THREE.Mesh(new THREE.SphereGeometry(0.5, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), shellM);
  shell.scale.set(0.95, 0.72, 1.18); shell.position.y = 0.3; body.add(shell);
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.49, 0.47, 0.08, 40), toon(0x4e4029));
  rim.scale.set(0.95, 1, 1.18); rim.position.y = 0.29; body.add(rim);
  body.add(sph(0.45, skin, [0, 0.27, 0], [0.92, 0.25, 1.12]));
  const neck = new THREE.Group(); neck.position.set(0, 0.32, 0.5); body.add(neck);
  const neckM = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.32, 16), skin); neckM.rotation.x = Math.PI / 2 - 0.5; neckM.position.set(0, 0.07, 0.12); neck.add(neckM);
  const head = new THREE.Group(); head.position.set(0, 0.16, 0.28); neck.add(head);
  head.add(sph(0.12, skin, [0, 0, 0.02], [0.9, 0.8, 1.15]));
  const eyes = [];
  for (const s of [-1, 1]) {
    const w = sph(0.035, toon(0xfbfbf8), [s * 0.065, 0.045, 0.08]); head.add(w);
    const p = sph(0.019, new THREE.MeshBasicMaterial({ color: 0x141015 }), [s * 0.072, 0.048, 0.108]); p.userData.noInk = true; head.add(p);
    const lid = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 8, 0, Math.PI * 2, 0, 1.0), skin); lid.position.copy(w.position); lid.rotation.x = 0.4; head.add(lid);
    eyes.push({ w, p, lid });
  }
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.008, 6, 20, Math.PI * 0.8), new THREE.MeshBasicMaterial({ color: 0x141015 }));
  mouth.rotation.set(0, 0, Math.PI * 1.1); mouth.position.set(0, -0.01, 0.12); mouth.userData.noInk = true; head.add(mouth);
  const legs = [];
  for (const [x, z] of [[0.33, 0.33], [-0.33, 0.33], [0.33, -0.33], [-0.33, -0.33]]) {
    const L = new THREE.Group(); L.position.set(x, 0.25, z); body.add(L);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 0.26, 14), skin); m.position.y = -0.11; L.add(m);
    L.add(sph(0.095, skin, [0, -0.23, 0.02], [1, 0.5, 1.15]));
    legs.push(L);
  }
  const tail = sph(0.05, skin, [0, 0.26, -0.57], [0.8, 0.6, 1.4]); body.add(tail);
  ink(body, 0.01);
  shade(root);
  const t = {
    root, body, head, neck, legs, eyes, mouth,
    // pose: { stretch 0..1 (neck out), yaw, pitch, walk phase, blink 0..1, sweat }
    pose({ stretch = 0.6, yaw = 0, pitch = 0, walk = null, blink = 0, chew = 0 } = {}) {
      neck.position.z = 0.36 + stretch * 0.16; neck.rotation.set(-pitch, yaw, 0);
      head.rotation.x = chew ? Math.sin(chew) * 0.08 : 0;
      for (const e of eyes) e.lid.rotation.x = 0.4 + blink * 1.6;
      legs.forEach((L, i) => { L.rotation.x = walk == null ? 0 : Math.sin(walk + (i === 0 || i === 3 ? 0 : Math.PI)) * 0.35; });
      body.position.y = walk == null ? 0 : Math.abs(Math.sin(walk)) * 0.012;
    },
    blinkAt(time, seed = 0) { const ph = (time + seed * 0.77) % 2.6; return ph > 2.45 ? 1 : 0; },
  };
  t.pose();
  return t;
}
