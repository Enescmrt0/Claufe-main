// Space and mission props for the Apollo 13 short. Cel-shaded with ink outlines, like the rest of the cartoon kit.
import * as THREE from 'three';
import { toon, ink, shade } from './toon.js';
import { box, cyl, ball, sign } from './sets.js';

const tex = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };

// star field on a big sphere around the origin (follow the camera with .position)
export function stars(n = 1400, r = 60) {
  const pos = new Float32Array(n * 3); let s = 7;
  const R = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < n; i++) { const u = R() * 2 - 1, a = R() * Math.PI * 2, q = Math.sqrt(1 - u * u); pos.set([Math.cos(a) * q * r, u * r, Math.sin(a) * q * r], i * 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, sizeAttenuation: true, toneMapped: false, transparent: true, opacity: .9 }));
  p.frustumCulled = false; return p;
}
// make a stage into space: black sky, hard sunlight, no ground shadows
export function toSpace(scene) {
  const u = scene.userData.sky.material.uniforms;
  u.top.value.set(0x02030a); u.mid.value.set(0x050816); u.horizon.value.set(0x0a1028); u.floorC.value.set(0x02030a);
  scene.traverse(o => { if (o.isHemisphereLight) { o.intensity = .35; o.color.set(0x8fa6ff); o.groundColor.set(0x101020); } if (o.isMesh && o.material && o.material.isShadowMaterial) o.visible = false; });
  scene.userData.key.intensity = 3.0; scene.userData.key.position.set(-6, 3, 5);
  const st = stars(); scene.add(st); scene.userData.stars = st;
}
export function earth(r = 3) {
  const t = tex(1024, 512, (g, W, H) => {
    g.fillStyle = '#2f7fd0'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#5fae4a'; for (const [x, y, rx, ry] of [[220, 200, 110, 150], [300, 330, 70, 90], [560, 170, 160, 90], [640, 300, 80, 120], [860, 330, 90, 60], [880, 180, 60, 40]]) { g.beginPath(); g.ellipse(x, y, rx, ry, .3, 0, 7); g.fill(); }
    g.fillStyle = '#f2f2f2'; g.fillRect(0, 0, W, 34); g.fillRect(0, H - 40, W, 40);
    g.fillStyle = 'rgba(255,255,255,.75)'; for (let i = 0; i < 40; i++) { g.beginPath(); g.ellipse((i * 137) % W, (i * 71) % H, 50 + (i % 5) * 14, 10, (i % 3) * .4, 0, 7); g.fill(); }
  });
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 64, 40), new THREE.MeshStandardMaterial({ map: t, roughness: .8, emissive: 0x0a1a3a, emissiveIntensity: .4 }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(r * 1.04, 48, 32), new THREE.MeshBasicMaterial({ color: 0x6fb7ff, transparent: true, opacity: .18, side: THREE.BackSide }));
  m.add(halo); return m;
}
export function moon(r = 1.6) {
  const t = tex(512, 256, (g, W, H) => { g.fillStyle = '#b9b6ae'; g.fillRect(0, 0, W, H); for (let i = 0; i < 60; i++) { g.fillStyle = i % 3 ? 'rgba(90,88,84,.35)' : 'rgba(255,255,255,.25)'; g.beginPath(); g.arc((i * 97) % W, (i * 53) % H, 4 + (i % 7) * 4, 0, 7); g.fill(); } });
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 32), toon(0xffffff, { map: t })); ink(m, .02); return m;
}
// Command + service module, nose toward +z. .panel is the bay-4 panel (detachable), .bay the dark hole behind it
export function csm(s = 1) {
  const g = new THREE.Group();
  const silver = toon(0xd9dde3), dark = toon(0x2a2d33), white = toon(0xf4f4f0);
  const sm = cyl(.6, .6, 1.6, silver, [0, 0, -.2], [Math.PI / 2, 0, 0], 32); g.add(sm);
  for (let i = 0; i < 6; i++) g.add(box(.02, .02, 1.58, dark, [Math.cos(i) * .6, Math.sin(i) * .6, -.2]));
  const bell = cyl(.18, .42, .6, dark, [0, 0, -1.3], [Math.PI / 2, 0, 0], 24); g.add(bell);
  const cm = new THREE.Mesh(new THREE.ConeGeometry(.62, .95, 32), toon(0xe8eaee)); cm.rotation.x = Math.PI / 2; cm.position.z = 1.07; g.add(cm);
  const dish = new THREE.Group(); dish.position.set(0, -.7, -.9); g.add(dish);
  dish.add(cyl(.02, .02, .5, dark, [0, -.25, 0])); for (let i = 0; i < 4; i++) dish.add(ball(.12, white, [((i % 2) - .5) * .26, -.55, (Math.floor(i / 2) - .5) * .26], [1, .3, 1]));
  const bay = box(.5, .02, .9, toon(0x15161a), [0, .59, -.2]); g.add(bay);
  const panel = box(.52, .03, .92, silver, [0, .61, -.2]); g.add(panel);
  g.add(box(.3, .06, .1, white, [0, 0, 1.58]));
  ink(g, .012); shade(g);
  g.scale.setScalar(s); g.panel = panel; g.bay = bay; return g;
}
// Lunar module "Aquarius", top toward +y. gold descent stage, grey ascent stage, four legs
export function lm(s = 1) {
  const g = new THREE.Group();
  const gold = toon(0xd9a63a), grey = toon(0xb8bcc2), dark = toon(0x2a2d33);
  const foil = tex(256, 256, (c, W, H) => { c.fillStyle = '#d9a63a'; c.fillRect(0, 0, W, H); for (let i = 0; i < 40; i++) { c.strokeStyle = i % 2 ? 'rgba(255,240,170,.5)' : 'rgba(120,80,20,.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo((i * 53) % W, 0); c.lineTo((i * 97) % W, H); c.stroke(); } });
  const ds = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, .5, 8), toon(0xffffff, { map: foil })); ds.position.y = .55; g.add(ds);
  const as = new THREE.Group(); as.position.y = 1.05; g.add(as);
  as.add(box(.8, .55, .7, grey, [0, .27, 0])); as.add(cyl(.32, .32, .45, grey, [0, .55, -.1], [0, 0, 0], 8));
  for (const sx of [-1, 1]) { const w = box(.18, .16, .02, toon(0x1a2440), [sx * .18, .38, .36], [0, 0, 0]); w.rotation.z = sx * .15; as.add(w); }
  as.add(box(.24, .24, .04, dark, [0, .12, .36]));
  as.add(cyl(.02, .02, .4, dark, [.3, .85, 0]));
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4; const leg = cyl(.03, .03, 1.0, grey, [Math.cos(a) * .7, .3, Math.sin(a) * .7], [Math.sin(a) * .5, 0, -Math.cos(a) * .5]); g.add(leg); g.add(cyl(.14, .16, .04, grey, [Math.cos(a) * .95, -.15, Math.sin(a) * .95])); }
  ink(g, .012); shade(g);
  g.scale.setScalar(s); return g;
}
// the docked stack: CSM nose-to-nose with the LM
export function stack(s = 1) {
  const g = new THREE.Group();
  const c = csm(1); g.add(c);
  const l = lm(.9); l.rotation.x = -Math.PI / 2; l.position.z = 1.55 + 1.15; g.add(l);
  g.scale.setScalar(s); g.csm = c; g.lm = l; return g;
}
// venting gas: a cone of drifting white puffs from a point. update(t)
export function vent(n = 70) {
  const g = new THREE.Group(); const mats = []; const parts = [];
  for (let i = 0; i < n; i++) { const m = new THREE.MeshBasicMaterial({ color: 0xeef4ff, transparent: true, opacity: .5, depthWrite: false }); const p = new THREE.Mesh(new THREE.SphereGeometry(.08, 10, 8), m); g.add(p); parts.push([p, m, ((i * 37) % 100) / 100, ((i * 53) % 100) / 100 - .5, ((i * 71) % 100) / 100 - .5]); }
  g.update = (t) => parts.forEach(([p, m, ph, dx, dz]) => { const k = (t * .35 + ph) % 1; p.position.set(dx * k * 2.2, k * 3.2, dz * k * 2.2); p.scale.setScalar(.5 + k * 3); m.opacity = t < 0 ? 0 : .45 * (1 - k); });
  return g;
}
// grey cabin interior, open toward +z. lights 0..1, red warning
export function cabin(o = {}) {
  const g = new THREE.Group();
  const wall = toon(o.wall ?? 0x8a9098, { side: THREE.DoubleSide });
  const W = 3.4, H = 2.4, D = 2.6;
  const back = box(W, H, .05, wall, [0, H / 2, -D / 2]); g.add(back);
  for (const sx of [-1, 1]) g.add(box(.05, H, D, wall, [sx * W / 2, H / 2, 0]));
  g.add(box(W, .05, D, toon(0x5a6068), [0, 0, 0])); g.add(box(W, .05, D, toon(0x6a7078), [0, H, 0]));
  const lamps = [];
  const panel = new THREE.Group(); panel.position.set(0, 1.45, -D / 2 + .06); g.add(panel);
  panel.add(box(2.6, 1.1, .06, toon(0x3a3f46)));
  for (let r = 0; r < 5; r++) for (let c = 0; c < 12; c++) {
    const m = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: (r + c) % 4 === 0 ? 0xff3020 : 0x30ff60, emissiveIntensity: .0 });
    const l = new THREE.Mesh(new THREE.BoxGeometry(.1, .06, .02), m); l.position.set(-1.1 + c * .2, .38 - r * .19, .045); panel.add(l); lamps.push([m, (r + c) % 4 === 0, r * 7 + c]);
  }
  const win = box(.6, .45, .04, new THREE.MeshBasicMaterial({ color: 0x050816 }), [1.2, 1.9, -D / 2 + .05]); g.add(win);
  ink(g, .01); shade(g);
  g.setLights = (k, alarm = 0, t = 0) => lamps.forEach(([m, red, i]) => { m.emissiveIntensity = red ? (alarm ? (Math.sin(t * 14 + i) > 0 ? 3 : .3) : k * .6) : k * (1 + .3 * Math.sin(t * 3 + i)); });
  g.window = win; g.size = [W, H, D];
  return g;
}
// mission control: a row of consoles with green screens, a big wall screen
export function consoles(n = 3, o = {}) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const c = new THREE.Group(); c.position.x = (i - (n - 1) / 2) * 1.25; g.add(c);
    c.add(box(1.15, .75, .7, toon(0x8a9098), [0, .375, 0]));
    const top = box(1.15, .5, .25, toon(0x6a7078), [0, .95, -.22], [-.35, 0, 0]); c.add(top);
    const scr = box(.5, .3, .02, new THREE.MeshStandardMaterial({ color: 0x0a1a10, emissive: 0x30ff70, emissiveIntensity: .7 }), [0, .98, -.1], [-.35, 0, 0]); scr.userData.noInk = true; c.add(scr);
  }
  ink(g, .012); shade(g); return g;
}
export function wallScreen(w = 5, h = 2.2) {
  const t = tex(1024, 450, (g, W, H) => { g.fillStyle = '#071423'; g.fillRect(0, 0, W, H); g.strokeStyle = 'rgba(80,200,255,.25)'; for (let i = 0; i < 20; i++) { g.beginPath(); g.moveTo(i * 52, 0); g.lineTo(i * 52, H); g.stroke(); } g.fillStyle = '#2f7fd0'; g.beginPath(); g.arc(200, 225, 70, 0, 7); g.fill(); g.fillStyle = '#b9b6ae'; g.beginPath(); g.arc(820, 225, 36, 0, 7); g.fill(); g.strokeStyle = '#ffd23a'; g.lineWidth = 6; g.setLineDash([16, 12]); g.beginPath(); g.moveTo(270, 225); g.bezierCurveTo(500, 60, 760, 80, 860, 200); g.bezierCurveTo(900, 300, 700, 380, 270, 240); g.stroke(); });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, toneMapped: false })); m.userData.noInk = true; return m;
}
// filters: the square command-module cartridge and the round lunar-module socket
export function squareFilter(s = 1) { const g = new THREE.Group(); g.add(box(.5, .5, .32, toon(0x9aa1a9))); for (let i = 0; i < 4; i++) g.add(box(.42, .02, .34, toon(0x5a6068), [0, -.18 + i * .12, 0])); g.add(box(.12, .1, .1, toon(0x2a2d33), [0, 0, .2])); ink(g, .01); shade(g); g.scale.setScalar(s); return g; }
export function roundSocket(s = 1) { const g = new THREE.Group(); g.add(box(.9, .9, .1, toon(0x8a9098))); const ring = new THREE.Mesh(new THREE.TorusGeometry(.24, .05, 12, 40), toon(0x3a3f46)); ring.position.z = .06; g.add(ring); g.add(cyl(.2, .2, .02, toon(0x101114), [0, 0, .055], [Math.PI / 2, 0, 0], 32)); ink(g, .01); shade(g); g.scale.setScalar(s); return g; }
export function ductTape(s = 1) { const g = new THREE.Group(); const r = new THREE.Mesh(new THREE.TorusGeometry(.14, .06, 14, 36), toon(0xa8adb4)); g.add(r); g.add(cyl(.09, .09, .1, toon(0xc8a46a), [0, 0, 0], [Math.PI / 2, 0, 0], 24)); ink(g, .008); shade(g); g.scale.setScalar(s); return g; }
export function sock(s = 1) { const g = new THREE.Group(); const m = toon(0xf4f4f0); g.add(cyl(.08, .08, .34, m, [0, .17, 0], [0, 0, 0], 16)); const foot = cyl(.08, .08, .22, m, [0, 0, .1], [Math.PI / 2, 0, 0], 16); g.add(foot); g.add(ball(.08, m, [0, 0, .22])); g.add(cyl(.085, .085, .06, toon(0xc8322c), [0, .3, 0], [0, 0, 0], 16)); ink(g, .008); shade(g); g.scale.setScalar(s); return g; }
export function hose(s = 1) { const pts = []; for (let i = 0; i <= 20; i++) pts.push(new THREE.Vector3(Math.sin(i * .5) * .25, i * .03, Math.cos(i * .4) * .2)); const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, .045, 10), toon(0x3a5a8a)); const g = new THREE.Group(); g.add(m); ink(g, .008); shade(g); g.scale.setScalar(s); return g; }
export function bagPlastic(s = 1) { const m = new THREE.Mesh(new THREE.SphereGeometry(.22, 20, 14), new THREE.MeshPhysicalMaterial({ color: 0xdfefff, transmission: .5, roughness: .2, transparent: true, opacity: .6 })); m.scale.set(1, .7, .8); const g = new THREE.Group(); g.add(m); g.scale.setScalar(s); return g; }
export function cardboard(s = 1) { const g = new THREE.Group(); g.add(box(.5, .02, .35, toon(0xc9a06a))); g.add(box(.3, .022, .02, toon(0x8a6a3a), [0, 0, 0])); ink(g, .008); shade(g); g.scale.setScalar(s); return g; }
// CO2 meter: label plate with a bar; set(frac 0..1)
export function co2Meter(w = 1.6) {
  const g = new THREE.Group();
  g.add(box(w, .5, .06, toon(0x2a2d33)));
  const back = box(w * .9, .2, .02, new THREE.MeshBasicMaterial({ color: 0x111111 }), [0, -.06, .04]); back.userData.noInk = true; g.add(back);
  const barM = new THREE.MeshBasicMaterial({ color: 0x3fd06a, toneMapped: false }); const bar = new THREE.Mesh(new THREE.BoxGeometry(1, .18, .02), barM); bar.position.z = .05; bar.position.y = -.06; bar.userData.noInk = true; g.add(bar);
  const l = sign([['CO₂', 70, '#ffffff']], .5, .16, { bg: '#2a2d33', border: null, basic: true }); l.position.set(-w * .3, .15, .04); g.add(l);
  ink(g, .01);
  g.set = (f) => { f = Math.max(.02, Math.min(1, f)); bar.scale.x = w * .9 * f; bar.position.x = -w * .45 + w * .45 * f; barM.color.set(f > .66 ? 0xff3a2a : f > .4 ? 0xffc23a : 0x3fd06a); };
  return g;
}
// capsule with parachutes; chute 0..1 opens them
export function capsule(s = 1) {
  const g = new THREE.Group();
  const cm = new THREE.Mesh(new THREE.ConeGeometry(.62, .95, 32), toon(0xb9b2a4)); cm.position.y = .47; g.add(cm);
  g.add(cyl(.63, .6, .12, toon(0x6a5a4a), [0, 0, 0], [0, 0, 0], 32));
  const chutes = [], lines = [];
  for (let i = 0; i < 3; i++) {
    const a = (i - 1) * .55, c = new THREE.Group(); c.position.set(Math.sin(a) * 1.4, 3.6, Math.cos(a) * .2); c.rotation.z = -a * .8; g.add(c);
    const cvs = tex(256, 128, (x, W, H) => { for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#f4f4f0' : '#e8642a'; x.fillRect(k * W / 8, 0, W / 8, H); } });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.4), toon(0xffffff, { map: cvs, side: THREE.DoubleSide })); c.add(dome);
    for (let k = 0; k < 6; k++) { const ang = k / 6 * Math.PI * 2; const A = new THREE.Vector3(Math.cos(ang) * .9, .3, Math.sin(ang) * .9).applyEuler(c.rotation).add(c.position), B = new THREE.Vector3(0, .9, 0); const d = A.clone().sub(B); const ln = new THREE.Mesh(new THREE.CylinderGeometry(.008, .008, d.length(), 4), toon(0x333333)); ln.position.copy(A).add(B).multiplyScalar(.5); ln.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); ln.userData.line = true; g.add(ln); lines.push(ln); }
    chutes.push(c);
  }
  ink(cm, .012); shade(g);
  g.setChutes = (k) => { chutes.forEach(c => { c.scale.setScalar(.05 + k * .95); c.visible = k > .01; }); lines.forEach(l => l.visible = k > .7); };
  g.scale.setScalar(s); return g;
}
export function radioWaves(n = 4) {
  const g = new THREE.Group(); const rings = [];
  for (let i = 0; i < n; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(1, .03, 8, 48, Math.PI * .6), new THREE.MeshBasicMaterial({ color: 0x7ee08a, transparent: true, toneMapped: false })); r.rotation.z = Math.PI * .2; g.add(r); rings.push(r); }
  g.update = (t) => rings.forEach((r, i) => { const k = (t * .7 + i / n) % 1; r.scale.setScalar(.2 + k * 1.6); r.material.opacity = 1 - k; });
  return g;
}
export function rocketFlame(len = 1) { const m = new THREE.Mesh(new THREE.ConeGeometry(.3, len, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0xffb04a, transparent: true, opacity: .85, toneMapped: false, depthWrite: false })); m.userData.noInk = true; return m; }
