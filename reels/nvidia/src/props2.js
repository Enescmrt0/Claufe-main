// Props for the Nvidia story short. Everything is boxes, cylinders and canvas-text labels.
import * as THREE from 'three';
import { materials } from './materials.js';

export const shadow = o => { o.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); return o; };
export const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, ...o });
export const box = (w, h, d, m, p = [0, 0, 0], r = [0, 0, 0]) => {
  const x = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); x.position.set(...p); x.rotation.set(...r); return x;
};
export const cyl = (r1, r2, h, m, p = [0, 0, 0], r = [0, 0, 0], seg = 28) => {
  const x = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), m); x.position.set(...p); x.rotation.set(...r); return x;
};

// flat plate with text drawn on a canvas. lines: [[text, sizePx, color?], ...] laid out top to bottom
export function label(lines, w, h, { bg = '#ffffff', fg = '#111111', px = 512, border = null, align = 'center', basic = false } = {}) {
  const c = document.createElement('canvas'); c.width = px; c.height = Math.round(px * h / w);
  const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);
  if (border) { g.strokeStyle = border; g.lineWidth = px * 0.035; g.strokeRect(px * 0.02, px * 0.02, c.width - px * 0.04, c.height - px * 0.04); }
  const total = lines.reduce((a, l) => a + l[1] * 1.18, 0);
  let y = (c.height - total) / 2;
  g.textAlign = align; g.textBaseline = 'top';
  for (const [text, size, col] of lines) {
    g.font = `900 ${size}px Arial, Helvetica, sans-serif`; g.fillStyle = col || fg;
    g.fillText(text, align === 'center' ? c.width / 2 : px * 0.07, y + size * 0.09); y += size * 1.18;
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  const m = basic ? new THREE.MeshBasicMaterial({ map: t }) : new THREE.MeshStandardMaterial({ map: t, roughness: 0.8 });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
  mesh.userData.canvas = c;
  return mesh;
}

// ---------- computer chip (about 0.12 m square, lies flat, top is +y) ----------
export function chip() {
  const g = new THREE.Group();
  const pcb = mat(0x1f7a3a, { roughness: 0.45 });
  const gold = mat(0xe2b23a, { metalness: 1, roughness: 0.3 });
  const die = new THREE.MeshPhysicalMaterial({ color: 0xcfd3d8, metalness: 1, roughness: 0.2, clearcoat: 0.6 });
  const glow = new THREE.MeshStandardMaterial({ color: 0x76ff5a, emissive: 0x58ff3a, emissiveIntensity: 2.2, roughness: 0.4 });
  g.add(box(0.12, 0.008, 0.12, pcb));
  g.add(box(0.07, 0.012, 0.07, die, [0, 0.01, 0]));
  g.add(box(0.03, 0.002, 0.03, glow, [0, 0.0175, 0]));
  for (let i = 0; i < 9; i++) for (const s of [-1, 1]) {
    const o = -0.048 + i * 0.012;
    g.add(box(0.006, 0.004, 0.014, gold, [o, 0.005, s * 0.05]));
    g.add(box(0.014, 0.004, 0.006, gold, [s * 0.05, 0.005, o]));
  }
  for (let i = 0; i < 4; i++) { // glowing traces from the die to the corners
    const a = Math.PI / 4 + i * Math.PI / 2;
    const tr = box(0.018, 0.0015, 0.003, glow, [Math.cos(a) * 0.047, 0.0048, Math.sin(a) * 0.047], [0, -a, 0]); g.add(tr);
  }
  g.userData.glow = glow;
  return shadow(g);
}

export function cardboard(w = 0.36, h = 0.26, d = 0.28) {
  const g = new THREE.Group();
  g.add(box(w, h, d, mat(0xb98a55, { roughness: 0.9 })));
  g.add(box(w * 0.16, 0.004, d + 0.004, mat(0xd9c39a, { roughness: 0.7 }), [0, h / 2, 0]));
  g.add(box(w + 0.004, 0.02, d + 0.004, mat(0xa87b48, { roughness: 0.9 }), [0, h / 2 - 0.035, 0]));
  return shadow(g);
}

export function crate(s = 0.5, text = null) {
  const M = materials();
  const g = new THREE.Group();
  g.add(box(s, s, s, M.wood, [0, s / 2, 0]));
  for (const x of [-1, 1]) for (const z of [-1, 1]) g.add(box(s * 0.09, s * 1.02, s * 0.09, M.woodDark, [x * s * 0.47, s / 2, z * s * 0.47]));
  for (const y of [0.06, 0.94]) g.add(box(s * 1.03, s * 0.09, s * 1.03, M.woodDark, [0, s * y, 0]));
  if (text) { const l = label(text, s * 0.62, s * 0.4, { bg: '#f3ead6', border: '#1f7a3a' }); l.position.set(0, s / 2, s / 2 + 0.003); g.add(l); }
  return shadow(g);
}

// glass office tower with a window grid, base at y = 0
export function building(w = 3.2, h = 9, d = 3) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 512;
  const x = c.getContext('2d');
  x.fillStyle = '#5f8fb8'; x.fillRect(0, 0, 256, 512);
  for (let r = 0; r < 16; r++) for (let q = 0; q < 6; q++) {
    x.fillStyle = (r * 7 + q * 3) % 5 === 0 ? '#cfe6f7' : '#86b4d8';
    x.fillRect(8 + q * 41, 8 + r * 31.5, 33, 23);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const g = new THREE.Group();
  g.add(box(w, h, d, new THREE.MeshStandardMaterial({ map: t, roughness: 0.35, metalness: 0.2 }), [0, h / 2, 0]));
  g.add(box(w * 1.06, 0.25, d * 1.06, mat(0x3c4750), [0, h + 0.12, 0]));
  g.add(box(w * 1.04, 0.5, d * 1.04, mat(0x3c4750), [0, 0.25, 0]));
  return shadow(g);
}

// border barrier: .bar is the pivot (rotation.z = 0 closed/horizontal, ~1.35 open)
export function gate() {
  const g = new THREE.Group();
  const grey = mat(0x4d5560, { metalness: 0.5, roughness: 0.4 });
  g.add(box(0.16, 1.0, 0.16, grey, [0, 0.5, 0]));
  g.add(box(0.24, 0.1, 0.24, grey, [0, 0.05, 0]));
  const bar = new THREE.Group(); bar.position.set(0, 0.9, 0.1); g.add(bar);
  for (let i = 0; i < 8; i++) bar.add(box(0.2, 0.09, 0.05, mat(i % 2 ? 0xf2f2f2 : 0xd92b2b, { roughness: 0.5 }), [-0.1 - i * 0.2, 0, 0]));
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.06, 20, 14), new THREE.MeshStandardMaterial({ color: 0xff3030, emissive: 0xff2020, emissiveIntensity: 0 }));
  lamp.position.set(0, 1.07, 0); g.add(lamp);
  g.bar = bar; g.lamp = lamp;
  return shadow(g);
}

export function signPost(lines, { bg = '#ffffff', fg = '#111', w = 0.9, h = 0.42, pole = 1.5, border = null } = {}) {
  const g = new THREE.Group();
  g.add(cyl(0.03, 0.03, pole, mat(0x59616b, { metalness: 0.6, roughness: 0.4 }), [0, pole / 2, 0]));
  g.add(box(w + 0.05, h + 0.05, 0.03, mat(0x2b3138), [0, pole + h / 2 - 0.05, 0]));
  const l = label(lines, w, h, { bg, fg, border }); l.position.set(0, pole + h / 2 - 0.05, 0.017); g.add(l);
  return shadow(g);
}

export function newspaper() {
  const w = 0.62, h = 0.86;
  const c = document.createElement('canvas'); c.width = 620; c.height = 860;
  const x = c.getContext('2d');
  x.fillStyle = '#f1ece0'; x.fillRect(0, 0, 620, 860);
  x.fillStyle = '#151515'; x.textAlign = 'center'; x.textBaseline = 'top';
  x.font = '900 78px Georgia, "Times New Roman", serif'; x.fillText('THE NEWS', 310, 26);
  x.fillRect(30, 122, 560, 5); x.fillRect(30, 162, 560, 2);
  x.font = '700 20px Arial, sans-serif'; x.fillText('OCTOBER 29, 2026', 310, 134);
  x.font = '900 66px Arial, Helvetica, sans-serif';
  ['REPORT:', 'CHIP BOSS', 'WAS SPY', 'TARGET'].forEach((s, i) => x.fillText(s, 310, 186 + i * 72));
  x.fillStyle = '#8f8a80';
  for (let col = 0; col < 2; col++) for (let r = 0; r < 17; r++) x.fillRect(34 + col * 286, 500 + r * 20, 266 - ((r * 37 + col * 11) % 60), 9);
  x.fillStyle = '#c9c2b2'; x.fillRect(34, 500, 266, 150);
  x.fillStyle = '#8f8a80'; x.beginPath(); x.arc(167, 550, 30, 0, 7); x.fill(); x.fillRect(117, 590, 100, 60);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  const g = new THREE.Group();
  const page = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }));
  g.add(page);
  g.add(box(w, h, 0.012, mat(0xe2dccd, { roughness: 0.9 }), [0, 0, -0.008]));
  return shadow(g);
}

// 3D question mark, about 0.45 tall, centred on its middle
export function qmark(color = 0xff3b30) {
  const m = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9, roughness: 0.35 });
  const g = new THREE.Group();
  const arc = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.036, 16, 40, Math.PI * 1.45), m);
  arc.rotation.z = -Math.PI * 0.45; arc.position.set(0, 0.11, 0); g.add(arc);
  g.add(cyl(0.036, 0.036, 0.1, m, [0, -0.035, 0]));
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 20, 14), m); dot.position.set(0, -0.17, 0); g.add(dot);
  return shadow(g);
}

export function hat(m) {
  const g = new THREE.Group();
  g.add(cyl(0.105, 0.115, 0.11, m, [0, 0.06, 0]));
  g.add(cyl(0.2, 0.2, 0.014, m, [0, 0.005, 0]));
  return shadow(g);
}

export function podium() {
  const g = new THREE.Group();
  const wood = mat(0x2a3c66, { roughness: 0.5 });
  g.add(box(0.7, 1.05, 0.45, wood, [0, 0.525, 0]));
  g.add(box(0.8, 0.05, 0.55, mat(0x1b2747), [0, 1.08, 0], [0.12, 0, 0]));
  g.add(cyl(0.008, 0.008, 0.3, mat(0x222222), [0.12, 1.25, 0.05], [0.25, 0, 0]));
  const mic = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 12), mat(0x222222)); mic.position.set(0.12, 1.41, 0.09); g.add(mic);
  g.add(box(0.36, 0.36, 0.01, mat(0xd9dde5, { metalness: 0.6, roughness: 0.3 }), [0, 0.62, 0.228]));
  return shadow(g);
}

export function table(w = 2.4, d = 0.9, h = 0.76, color = 0x6b4a33) {
  const g = new THREE.Group();
  const m = mat(color, { roughness: 0.45 });
  g.add(box(w, 0.06, d, m, [0, h - 0.03, 0]));
  for (const x of [-1, 1]) for (const z of [-1, 1]) g.add(box(0.07, h - 0.06, 0.07, mat(0x2b2b2e), [x * (w / 2 - 0.1), (h - 0.06) / 2, z * (d / 2 - 0.1)]));
  return shadow(g);
}

export function folder(text) {
  const g = new THREE.Group();
  g.add(box(0.44, 0.02, 0.32, mat(0xd9b25f, { roughness: 0.8 })));
  g.add(box(0.12, 0.02, 0.04, mat(0xd9b25f, { roughness: 0.8 }), [0.14, 0, -0.17]));
  const l = label(text, 0.34, 0.14, { bg: '#fff', fg: '#c01818', border: '#c01818' });
  l.rotation.x = -Math.PI / 2; l.position.set(0, 0.0105, 0.02); g.add(l);
  return shadow(g);
}

export function badge() {
  const g = new THREE.Group();
  g.add(box(0.16, 0.008, 0.24, mat(0xf6f6f6, { roughness: 0.4 })));
  const l = label([['CEO', 150, '#111']], 0.14, 0.09, { bg: '#f6f6f6' }); l.rotation.x = -Math.PI / 2; l.position.set(0, 0.0045, 0.06); g.add(l);
  g.add(box(0.16, 0.0085, 0.05, mat(0x58b72c, { roughness: 0.4 }), [0, 0, -0.095]));
  g.add(box(0.07, 0.009, 0.07, mat(0xb9c0c8), [0, 0, -0.02]));
  g.add(box(0.05, 0.012, 0.03, mat(0x777f88, { metalness: 0.8, roughness: 0.3 }), [0, 0.002, -0.13]));
  return shadow(g);
}

export function officeChair() {
  const g = new THREE.Group();
  const blk = mat(0x1c1d20, { roughness: 0.6 }), met = mat(0x9aa1a9, { metalness: 0.9, roughness: 0.3 });
  for (let i = 0; i < 5; i++) { const a = i * Math.PI * 2 / 5; g.add(box(0.34, 0.035, 0.05, met, [Math.cos(a) * 0.17, 0.06, Math.sin(a) * 0.17], [0, -a, 0])); g.add(cyl(0.03, 0.03, 0.03, blk, [Math.cos(a) * 0.33, 0.03, Math.sin(a) * 0.33], [Math.PI / 2, 0, 0], 12)); }
  g.add(cyl(0.03, 0.03, 0.4, met, [0, 0.27, 0]));
  const top = new THREE.Group(); top.position.y = 0.5; g.add(top);
  top.add(box(0.52, 0.09, 0.5, blk, [0, 0, 0]));
  top.add(box(0.5, 0.72, 0.08, blk, [0, 0.45, -0.25], [-0.1, 0, 0]));
  for (const s of [-1, 1]) { top.add(box(0.05, 0.2, 0.05, met, [s * 0.28, 0.13, -0.02])); top.add(box(0.07, 0.035, 0.3, blk, [s * 0.28, 0.24, 0])); }
  g.top = top;
  return shadow(g);
}

// safe: .door is the hinge pivot (rotation.y = 0 closed, -1.9 open), .lamp lights green
export function safe() {
  const g = new THREE.Group();
  const steel = new THREE.MeshPhysicalMaterial({ color: 0x5c6670, metalness: 0.9, roughness: 0.38, clearcoat: 0.3 });
  const dark = mat(0x22272d, { metalness: 0.6, roughness: 0.5 });
  const W = 1.0, H = 1.15, D = 0.8, T = 0.07;
  g.add(box(W, T, D, steel, [0, T / 2, 0])); g.add(box(W, T, D, steel, [0, H - T / 2, 0]));
  g.add(box(T, H, D, steel, [-W / 2 + T / 2, H / 2, 0])); g.add(box(T, H, D, steel, [W / 2 - T / 2, H / 2, 0]));
  g.add(box(W, H, T, steel, [0, H / 2, -D / 2 + T / 2]));
  g.add(box(W - 2 * T, H - 2 * T, 0.01, dark, [0, H / 2, -D / 2 + T + 0.006]));
  g.add(box(W - 2 * T, 0.03, D - 0.2, dark, [0, 0.42, -0.05]));
  const door = new THREE.Group(); door.position.set(-W / 2, 0, D / 2); g.add(door);
  door.add(box(W, H, T, steel, [W / 2, H / 2, T / 2]));
  const dial = cyl(0.11, 0.11, 0.04, mat(0xd4d8dd, { metalness: 1, roughness: 0.25 }), [W / 2, H * 0.58, T + 0.02], [Math.PI / 2, 0, 0]); door.add(dial);
  door.add(cyl(0.03, 0.03, 0.06, dark, [W / 2, H * 0.58, T + 0.05], [Math.PI / 2, 0, 0]));
  const handle = new THREE.Group(); handle.position.set(W * 0.78, H * 0.58, T + 0.03); door.add(handle);
  for (let i = 0; i < 3; i++) handle.add(box(0.26, 0.03, 0.03, mat(0xd4d8dd, { metalness: 1, roughness: 0.25 }), [0, 0, 0], [0, 0, i * Math.PI / 3]));
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.045, 20, 14), new THREE.MeshStandardMaterial({ color: 0x2a3a2a, emissive: 0x30ff50, emissiveIntensity: 0 }));
  lamp.position.set(W / 2, H * 0.86, T + 0.02); door.add(lamp);
  g.door = door; g.lamp = lamp; g.handle = handle; g.size = [W, H, D];
  return shadow(g);
}

// big tick in a green disc
export function checkMark(r = 0.22) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#27b84a'; x.beginPath(); x.arc(128, 128, 122, 0, 7); x.fill();
  x.strokeStyle = '#fff'; x.lineWidth = 30; x.lineCap = 'round'; x.lineJoin = 'round';
  x.beginPath(); x.moveTo(68, 134); x.lineTo(112, 176); x.lineTo(190, 86); x.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.CircleGeometry(r, 40), new THREE.MeshBasicMaterial({ map: t, alphaTest: 0.5, side: THREE.DoubleSide, toneMapped: false }));
}
