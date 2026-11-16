// Sets and props for the tortoise short. Cel-shaded (toon) materials with ink outlines.
import * as THREE from 'three';
import { toon, ink, shade } from './toon.js';

export const box = (w, h, d, m, p = [0, 0, 0], r = [0, 0, 0]) => { const x = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); x.position.set(...p); x.rotation.set(...r); return x; };
export const cyl = (r1, r2, h, m, p = [0, 0, 0], r = [0, 0, 0], seg = 24) => { const x = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), m); x.position.set(...p); x.rotation.set(...r); return x; };
export const ball = (r, m, p = [0, 0, 0], s = [1, 1, 1], seg = 24) => { const x = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.7)), m); x.position.set(...p); x.scale.set(...s); return x; };

function canvasTex(w, h, draw, repeat = null) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  return t;
}
export function planks(base = '#9a6a3c', line = '#5b3a1f', rep = [4, 4], horizontal = true) {
  return canvasTex(256, 256, (g) => {
    g.fillStyle = base; g.fillRect(0, 0, 256, 256);
    g.strokeStyle = line; g.lineWidth = 5;
    for (let i = 0; i <= 4; i++) { g.beginPath(); horizontal ? (g.moveTo(0, i * 64), g.lineTo(256, i * 64)) : (g.moveTo(i * 64, 0), g.lineTo(i * 64, 256)); g.stroke(); }
    g.lineWidth = 3;
    for (let i = 0; i < 4; i++) { const o = (i * 97) % 256; g.beginPath(); horizontal ? (g.moveTo(o, i * 64), g.lineTo(o, i * 64 + 64)) : (g.moveTo(i * 64, o), g.lineTo(i * 64 + 64, o)); g.stroke(); }
    g.fillStyle = 'rgba(0,0,0,0.08)'; for (let i = 0; i < 40; i++) g.fillRect((i * 53) % 256, (i * 97) % 256, 30, 3);
  }, rep);
}
// flat plate with text
export function sign(lines, w, h, { bg = '#f3ead6', fg = '#2a1d12', border = '#5b3a1f', basic = false } = {}) {
  const t = canvasTex(512, Math.round(512 * h / w), (g, W, H) => {
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    if (border) { g.strokeStyle = border; g.lineWidth = 18; g.strokeRect(9, 9, W - 18, H - 18); }
    const tot = lines.reduce((a, l) => a + l[1] * 1.15, 0); let y = (H - tot) / 2;
    g.textAlign = 'center'; g.textBaseline = 'top';
    for (const [s, size, col] of lines) { g.font = `900 ${size}px Arial, Helvetica, sans-serif`; g.fillStyle = col || fg; g.fillText(s, W / 2, y + size * 0.08); y += size * 1.15; }
  });
  const m = basic ? new THREE.MeshBasicMaterial({ map: t, toneMapped: false }) : toon(0xffffff, { map: t });
  const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.userData.noInk = true; p.userData.tex = t;
  return p;
}

// ---------- ocean ----------
export function ocean(color = 0x2f86c9) {
  const tex = canvasTex(256, 256, (g) => {
    g.fillStyle = '#' + color.toString(16).padStart(6, '0'); g.fillRect(0, 0, 256, 256);
    g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 4; g.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const x = (i * 71) % 230, y = (i * 113) % 240; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 13, y - 7, x + 26, y); g.stroke(); }
  }, [60, 60]);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), toon(0xffffff, { map: tex }));
  m.rotation.x = -Math.PI / 2; m.receiveShadow = true; m.userData.noInk = true;
  m.tick = (t) => { tex.offset.set(t * 0.01, t * 0.006); };
  return m;
}

// ---------- sailing ship (bow toward +z, deck at y = 1.3) ----------
export function ship({ hull = 0x7a4a26, trim = 0x2a1b10, sail = 0xf2ead2, flag = 0x1a1716 } = {}) {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(-3.2, 1.35); shape.lineTo(-3.4, 1.9); shape.lineTo(-2.4, 1.9); shape.lineTo(-2.3, 1.35);
  shape.lineTo(2.6, 1.35); shape.quadraticCurveTo(3.6, 1.45, 4.1, 1.9); shape.quadraticCurveTo(3.3, 0.2, 2.2, 0);
  shape.lineTo(-2.6, 0); shape.quadraticCurveTo(-3.2, 0.3, -3.2, 1.35);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 2.0, bevelEnabled: true, bevelThickness: 0.25, bevelSize: 0.15, bevelSegments: 3, curveSegments: 12 });
  geo.translate(0, 0, -1.0); geo.rotateY(-Math.PI / 2);
  const hm = toon(0xffffff, { map: planks('#8a5530', '#4a2a14', [0.6, 0.6]) });
  const h = new THREE.Mesh(geo, hm); g.add(h);
  g.add(box(2.0, 0.08, 6.2, toon(0xb98552), [0, 1.3, 0.1]));
  g.add(box(2.3, 0.14, 0.12, toon(trim), [0, 1.86, -2.9]));
  for (const s of [-1, 1]) { g.add(box(0.1, 0.35, 6.0, toon(trim), [s * 1.08, 1.5, 0.2])); }
  for (let i = 0; i < 5; i++) for (const s of [-1, 1]) g.add(cyl(0.11, 0.11, 0.05, toon(0x2a1b10), [s * 1.2, 0.95, -2 + i], [0, 0, Math.PI / 2], 14));
  const masts = [[0, 1.0, 5.4], [0, -1.4, 4.4]];
  for (const [x, z, H] of masts) {
    g.add(cyl(0.08, 0.1, H, toon(0x5b3a1f), [x, 1.3 + H / 2, z]));
    for (const [y, w] of [[1.3 + H * 0.45, 2.3], [1.3 + H * 0.82, 1.7]]) {
      const sg = new THREE.CylinderGeometry(2.4, 2.4, H * 0.32, 20, 1, true, -w / 4.8, w / 2.4);
      const s = new THREE.Mesh(sg, toon(sail, { side: THREE.DoubleSide })); s.position.set(0, y, z - 2.2); g.add(s);
      g.add(cyl(0.035, 0.035, w + 0.4, toon(0x5b3a1f), [0, y + H * 0.16, z + 0.1], [0, 0, Math.PI / 2]));
    }
  }
  const f = box(0.02, 0.35, 0.55, toon(flag), [0, 1.3 + 5.4 + 0.15, 1.0 - 0.3]); g.add(f);
  ink(g, 0.025); shade(g);
  return g;
}

// ---------- island ----------
export function cactus(h = 1.4, m = toon(0x5e9a46)) {
  const g = new THREE.Group();
  g.add(cyl(0.09, 0.12, h * 0.55, toon(0x8a6a42), [0, h * 0.27, 0], [0, 0, 0], 10));
  const pads = [[0, h * 0.62, 0, 0], [0.18, h * 0.82, 0.02, 0.5], [-0.2, h * 0.78, 0, -0.5], [0.05, h * 1.0, 0, 0.15], [0.32, h * 1.02, 0.03, 0.8], [-0.3, h * 0.98, 0, -0.7]];
  for (const [x, y, z, r] of pads) { const p = ball(0.17, m, [x, y, z], [1, 1.25, 0.35]); p.rotation.z = r; g.add(p); }
  ink(g, 0.012); shade(g);
  return g;
}
export function rock(s = 0.4, c = 0x5d5a55) { const r = ball(s, toon(c), [0, s * 0.35, 0], [1.2, 0.7, 1], 10); ink(r, 0.012); return shade(r); }
export function island({ sand = 0xe2c98f, grass = 0x7fb24f, cacti = true } = {}) {
  const g = new THREE.Group();
  const beach = ball(14, toon(sand), [0, -13.75, 0], [1, 1, 1], 64); beach.receiveShadow = true; g.add(beach);
  const hill = ball(9, toon(grass), [-3, -6.6, -12], [1.4, 1, 1], 48); g.add(hill);
  const hill2 = ball(7, toon(0x6a9d43), [8, -5.2, -16], [1.3, 1, 1], 40); g.add(hill2);
  const volc = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 9, 8, 32), toon(0x6f6656)); volc.position.set(-10, 2, -32); g.add(volc);
  g.add(cyl(2.25, 2.25, 0.2, toon(0x3d3830), [-10, 6.05, -32]));
  if (cacti) for (const [x, z, h] of [[-3.2, -3.2, 1.6], [2.8, -4.2, 1.9], [-5.5, -6.5, 2.2], [5.6, -7.5, 1.7], [0.6, -7.8, 2.0]]) { const c = cactus(h); c.position.set(x, 0, z); c.rotation.y = x; g.add(c); }
  for (const [x, z, s] of [[-2, 1.4, 0.35], [3.2, 0.6, 0.5], [-4.2, -1.2, 0.6], [1.5, -2.5, 0.3]]) { const r = rock(s); r.position.set(x, 0, z); g.add(r); }
  ink(hill, 0.04); ink(hill2, 0.04); ink(volc, 0.06);
  shade(g);
  return g;
}

// ---------- ship's hold (interior box room, floor at y = 0, open toward +z) ----------
export function hold({ w = 6, d = 6, h = 2.8, lamp = true } = {}) {
  const g = new THREE.Group();
  const wall = toon(0xffffff, { map: planks('#8d5c33', '#4b2c15', [3, 1.5]), side: THREE.DoubleSide });
  const floorM = toon(0xffffff, { map: planks('#a7743f', '#5b3a1f', [3, 3], false) });
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(w, d), floorM); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; fl.userData.noInk = true; g.add(fl);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wall); back.position.set(0, h / 2, -d / 2); back.userData.noInk = true; g.add(back);
  for (const s of [-1, 1]) { const sw = new THREE.Mesh(new THREE.PlaneGeometry(d, h), wall); sw.rotation.y = -s * Math.PI / 2; sw.position.set(s * w / 2, h / 2, 0); sw.userData.noInk = true; g.add(sw); }
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(w, d), toon(0x5a3a1f, { side: THREE.DoubleSide })); ceil.rotation.x = Math.PI / 2; ceil.position.y = h; ceil.userData.noInk = true; g.add(ceil);
  for (let i = 0; i < 5; i++) g.add(box(w, 0.18, 0.2, toon(0x4a2a14), [0, h - 0.09, -d / 2 + 0.6 + i * 1.3]));
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) g.add(box(0.18, h, 0.2, toon(0x4a2a14), [s * (w / 2 - 0.09), h / 2, -d / 2 + 0.6 + i * 1.6]));
  let L = null;
  if (lamp) {
    L = new THREE.Group(); L.position.set(0.4, h - 0.2, -0.5); g.add(L);
    L.add(cyl(0.008, 0.008, 0.35, toon(0x222222), [0, -0.17, 0]));
    const body = new THREE.Group(); body.position.y = -0.4; L.add(body);
    body.add(cyl(0.09, 0.11, 0.06, toon(0x2a2a2a), [0, 0.12, 0]));
    body.add(cyl(0.11, 0.1, 0.05, toon(0x2a2a2a), [0, -0.12, 0]));
    const glass = cyl(0.085, 0.085, 0.2, new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: 0xffb340, emissiveIntensity: 2.5 }), [0, 0, 0]); glass.userData.noInk = true; body.add(glass);
    const pl = new THREE.PointLight(0xffb45a, 6, 9, 1.4); pl.position.y = -0.1; pl.castShadow = true; pl.shadow.mapSize.set(512, 512); body.add(pl);
    L.light = pl;
  }
  ink(g, 0.012); shade(g);
  g.lamp = L;
  return g;
}
export function barrel(s = 1, label = null) {
  const g = new THREE.Group();
  const prof = []; for (let i = 0; i <= 12; i++) { const t = i / 12; prof.push(new THREE.Vector2(0.27 + Math.sin(t * Math.PI) * 0.06, t * 0.8)); }
  const b = new THREE.Mesh(new THREE.LatheGeometry(prof, 24), toon(0xffffff, { map: planks('#9a6436', '#5a3518', [3, 1], false) })); g.add(b);
  for (const y of [0.12, 0.68]) g.add(cyl(0.32, 0.32, 0.05, toon(0x3c3c40), [0, y, 0]));
  g.add(cyl(0.27, 0.27, 0.02, toon(0x7a4c26), [0, 0.8, 0]));
  ink(g, 0.012);
  if (label) { const l = sign(label, 0.36, 0.2, { bg: '#efe2c4' }); l.position.set(0, 0.42, 0.335); g.add(l); }
  g.scale.setScalar(s); return shade(g);
}
export function crate(s = 0.6) {
  const g = new THREE.Group(); const m = toon(0xffffff, { map: planks('#b08250', '#5e3c1c', [1, 1]) });
  g.add(box(s, s, s, m, [0, s / 2, 0]));
  ink(g, 0.012); return shade(g);
}
export function stairs(n = 7, w = 0.9) {
  const g = new THREE.Group(); const m = toon(0x9a6a3c);
  for (let i = 0; i < n; i++) g.add(box(w, 0.06, 0.28, m, [0, 0.3 + i * 0.34, -i * 0.26]));
  for (const s of [-1, 1]) { const r = box(0.08, 0.1, Math.hypot(n * 0.26, n * 0.34) + 0.3, toon(0x5b3a1f), [s * w / 2, 0.3 + n * 0.17, -n * 0.13], [Math.atan2(0.34, 0.26), 0, 0]); g.add(r); }
  ink(g, 0.012); return shade(g);
}
export function stove() {
  const g = new THREE.Group(); const iron = toon(0x2e2c2e);
  g.add(box(1.0, 0.8, 0.7, iron, [0, 0.4, 0]));
  g.add(box(0.36, 0.26, 0.02, new THREE.MeshStandardMaterial({ color: 0xff7a2a, emissive: 0xff5a10, emissiveIntensity: 2 }), [0, 0.35, 0.36]));
  g.add(cyl(0.08, 0.08, 1.8, iron, [0.32, 1.7, -0.2]));
  const pot = new THREE.Group(); pot.position.set(-0.15, 0.8, 0); g.add(pot);
  pot.add(cyl(0.22, 0.18, 0.3, toon(0x55585e), [0, 0.15, 0]));
  ink(g, 0.012); return shade(g);
}
export function table(w = 1.4, d = 0.8, h = 0.75) {
  const g = new THREE.Group(); const m = toon(0x8a5a30);
  g.add(box(w, 0.06, d, m, [0, h, 0]));
  for (const x of [-1, 1]) for (const z of [-1, 1]) g.add(box(0.07, h, 0.07, toon(0x5b3a1f), [x * (w / 2 - 0.08), h / 2, z * (d / 2 - 0.08)]));
  ink(g, 0.01); return shade(g);
}
export function plate() {
  const g = new THREE.Group();
  g.add(cyl(0.2, 0.16, 0.03, toon(0xf0ece2), [0, 0.015, 0], [0, 0, 0], 28));
  const bone = toon(0xf6f1e2);
  g.add(cyl(0.008, 0.008, 0.26, bone, [0, 0.04, 0], [0, 0, Math.PI / 2], 6));
  for (let i = 0; i < 5; i++) g.add(cyl(0.005, 0.005, 0.1, bone, [-0.08 + i * 0.04, 0.04, 0], [Math.PI / 2, 0, 0], 6));
  const hd = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.09, 3), bone); hd.rotation.z = Math.PI / 2; hd.position.set(0.15, 0.04, 0); g.add(hd);
  const tl = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.06, 3), bone); tl.rotation.z = -Math.PI / 2; tl.position.set(-0.15, 0.04, 0); g.add(tl);
  ink(g, 0.006); return shade(g);
}
// three wavy green stink lines; .tick(t)
export function stink() {
  const g = new THREE.Group(); const m = new THREE.MeshBasicMaterial({ color: 0x7fd04a, transparent: true });
  const lines = [];
  for (let i = 0; i < 3; i++) {
    const pts = []; for (let k = 0; k <= 20; k++) pts.push(new THREE.Vector3(Math.sin(k * 0.6 + i) * 0.04, k * 0.022, 0));
    const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 30, 0.012, 6), m); tube.position.x = (i - 1) * 0.12; tube.userData.noInk = true; g.add(tube); lines.push(tube);
  }
  g.tick = (t) => lines.forEach((l, i) => { l.position.y = ((t * 0.25 + i * 0.33) % 1) * 0.15; l.scale.y = 1; });
  g.material = m;
  return g;
}
export function lunchbox() {
  const g = new THREE.Group(); const red = toon(0xd8382f);
  g.add(box(0.5, 0.34, 0.24, red, [0, 0, 0]));
  g.add(box(0.52, 0.06, 0.26, toon(0xb52a23), [0, 0.17, 0]));
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.018, 8, 20, Math.PI), toon(0x2a2a2a)); handle.position.y = 0.2; g.add(handle);
  const l = sign([['LUNCH', 64, '#ffffff']], 0.36, 0.12, { bg: '#d8382f', border: null }); l.position.set(0, -0.02, 0.122); g.add(l);
  ink(g, 0.012); return shade(g);
}
export function calendar() {
  const g = new THREE.Group();
  g.add(box(0.7, 0.85, 0.04, toon(0xf4efe4), [0, 0, 0]));
  g.add(box(0.72, 0.16, 0.06, toon(0xc8322c), [0, 0.38, 0.01]));
  for (const s of [-1, 1]) g.add(cyl(0.02, 0.02, 0.1, toon(0x444444), [s * 0.2, 0.46, 0.03]));
  const page = sign([['JAN', 150, '#2a1d12']], 0.62, 0.6, { bg: '#fbf8f0', border: null }); page.position.set(0, -0.06, 0.025); g.add(page);
  ink(g, 0.01); shade(g);
  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const cache = new Map();
  g.setMonth = (i, q = false) => {
    const k = i + (q ? '?' : '');
    if (!cache.has(k)) cache.set(k, sign([[MONTHS[i] + (q ? '?' : ''), 150, q ? '#c8322c' : '#2a1d12']], 0.62, 0.6, { bg: '#fbf8f0', border: null }).material);
    page.material = cache.get(k);
  };
  return g;
}
export function fridge() {
  const g = new THREE.Group(); const w = toon(0xeaf3f5);
  const b = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 1.1, 6, 20), w); b.scale.set(1, 1, 0.8); b.position.y = 0.93; g.add(b);
  g.add(box(0.05, 0.4, 0.05, toon(0xb8c2c6), [0.26, 1.05, 0.31]));
  g.add(box(0.7, 0.02, 0.02, toon(0xb8c2c6), [0, 0.95, 0.31]));
  ink(g, 0.012); return shade(g);
}
export function redX(r = 0.5) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d'); x.strokeStyle = '#e02a24'; x.lineWidth = 26; x.lineCap = 'round';
  x.beginPath(); x.arc(128, 128, 110, 0, 7); x.stroke();
  x.beginPath(); x.moveTo(60, 60); x.lineTo(196, 196); x.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthTest: false, toneMapped: false }));
  m.renderOrder = 20; m.userData.noInk = true; return m;
}
// mechanical counter like a tally clicker: .set(n)
export function counter(w = 1.6) {
  const g = new THREE.Group();
  g.add(box(w, w * 0.34, 0.2, toon(0xd7dade), [0, 0, 0]));
  g.add(box(w * 0.92, w * 0.26, 0.05, toon(0x2a2a2e), [0, 0, 0.1]));
  const screen = sign([['000,000', 120, '#ffffff']], w * 0.86, w * 0.22, { bg: '#1b1b1f', border: null, basic: true }); screen.position.z = 0.13; g.add(screen);
  g.add(cyl(0.07, 0.07, 0.12, toon(0xb8bec4), [w * 0.3, w * 0.2, 0]));
  ink(g, 0.015); shade(g);
  const cache = new Map();
  g.set = (n) => {
    const s = Math.round(n).toLocaleString('en-US').padStart(7, '0');
    if (!cache.has(s)) cache.set(s, sign([[s, 120, '#ffffff']], w * 0.86, w * 0.22, { bg: '#1b1b1f', border: null, basic: true }).material);
    screen.material = cache.get(s);
  };
  return g;
}
export function tumbleweed() {
  const g = new THREE.Group(); const m = new THREE.MeshBasicMaterial({ color: 0x8a6a3c });
  for (let i = 0; i < 9; i++) { const t = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.012, 6, 24), m); t.rotation.set(i * 0.7, i * 1.3, i * 0.4); g.add(t); }
  return g;
}
export function rowboat(color = 0x9a6a3c) {
  const g = new THREE.Group();
  const prof = []; for (let i = 0; i <= 10; i++) { const t = i / 10; prof.push(new THREE.Vector2(0.05 + Math.sin(t * Math.PI / 2) * 0.55, t * 0.45)); }
  const h = new THREE.Mesh(new THREE.LatheGeometry(prof, 24), toon(color, { side: THREE.DoubleSide })); h.scale.set(1, 1, 2.4); g.add(h);
  ink(g, 0.015); return shade(g);
}
// modern tour boat (bow +z): white hull, blue stripe, upper deck
export function tourBoat() {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(-3, 1.2); shape.lineTo(3.2, 1.2); shape.quadraticCurveTo(3.9, 1.0, 4.2, 1.3); shape.quadraticCurveTo(3.5, 0.1, 2.6, 0); shape.lineTo(-2.8, 0); shape.lineTo(-3, 1.2);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 2.2, bevelEnabled: true, bevelThickness: 0.15, bevelSize: 0.1, bevelSegments: 2 });
  geo.translate(0, 0, -1.1); geo.rotateY(-Math.PI / 2);
  g.add(new THREE.Mesh(geo, toon(0xf6f8fa)));
  g.add(box(2.4, 0.18, 7.0, toon(0x2f7fd0), [0, 0.75, 0.3]));
  g.add(box(2.1, 0.06, 6.4, toon(0xd9dde2), [0, 1.22, 0.2]));
  g.add(box(1.8, 1.0, 2.6, toon(0xf6f8fa), [0, 1.75, -1.4]));
  g.add(box(1.82, 0.4, 2.62, toon(0x6fb7e8), [0, 1.95, -1.4]));
  g.add(box(2.0, 0.08, 2.9, toon(0x2f7fd0), [0, 2.3, -1.4]));
  for (const s of [-1, 1]) g.add(box(0.05, 0.4, 6.2, toon(0xd9dde2), [s * 1.05, 1.45, 0.3]));
  ink(g, 0.022); return shade(g);
}
export function camera() {
  const g = new THREE.Group();
  g.add(box(0.14, 0.09, 0.06, toon(0x222428)));
  g.add(cyl(0.035, 0.035, 0.05, toon(0x111113), [0, 0, 0.05], [Math.PI / 2, 0, 0], 16));
  ink(g, 0.006); return g;
}
export function frypan() {
  const g = new THREE.Group();
  g.add(cyl(0.13, 0.11, 0.04, toon(0x2e2e30), [0, 0, 0], [0, 0, 0], 24));
  g.add(cyl(0.015, 0.015, 0.22, toon(0x5b3a1f), [0.22, 0, 0], [0, 0, Math.PI / 2], 8));
  ink(g, 0.006); return g;
}
export function bowl() {
  const g = new THREE.Group();
  const prof = []; for (let i = 0; i <= 8; i++) { const t = i / 8; prof.push(new THREE.Vector2(0.08 + t * 0.1, t * 0.08)); }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(prof, 20), toon(0x7a8a99, { side: THREE.DoubleSide })));
  ink(g, 0.006); return shade(g);
}
