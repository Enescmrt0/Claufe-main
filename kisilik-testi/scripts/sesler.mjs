// Basit efekt seslerini (tık, pop, ding, whoosh) kod ile üretir → public/sfx/*.wav
import fs from "node:fs";
const SR = 44100;
const wav = (name, samples) => {
  const n = samples.length, buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  samples.forEach((s, i) => buf.writeInt16LE(Math.max(-1, Math.min(1, s)) * 32767, 44 + i * 2));
  fs.writeFileSync(new URL(`../public/sfx/${name}.wav`, import.meta.url), buf);
};
const gen = (dur, f) => Array.from({ length: Math.floor(dur * SR) }, (_, i) => f(i / SR));
// tık: kısa yüksek tıklama
wav("tik", gen(0.06, t => Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 90) * 0.6));
// pop: aşağı kayan frekans
wav("pop", gen(0.14, t => Math.sin(2 * Math.PI * (900 - 2500 * t) * t) * Math.exp(-t * 30) * 0.7));
// ding: iki harmonikli zil
wav("ding", gen(1.2, t => (Math.sin(2 * Math.PI * 1318 * t) + 0.5 * Math.sin(2 * Math.PI * 2637 * t) + 0.3 * Math.sin(2 * Math.PI * 1976 * t)) * Math.exp(-t * 3.5) * 0.35));
// whoosh: filtrelenmiş gürültü, şişip sönen
let lp = 0;
wav("whoosh", gen(0.45, t => { lp += 0.15 * ((Math.random() * 2 - 1) - lp); return lp * Math.sin(Math.PI * t / 0.45) ** 2 * 1.6; }));
// tada: yükselen arpej
const notes = [523, 659, 784, 1047];
wav("tada", gen(1.4, t => notes.reduce((a, f, k) => { const st = k * 0.09; return t < st ? a : a + Math.sin(2 * Math.PI * f * (t - st)) * Math.exp(-(t - st) * 2.5) * 0.22; }, 0)));
console.log("Sesler public/sfx klasörüne yazıldı.");
