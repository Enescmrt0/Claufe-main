// Seslendirme metnini testten otomatik çıkarır.
//   npm run metin -- hangi-kahvesin   → seslendirme/hangi-kahvesin.txt (okunacak cümleler + dosya adları)
//   npm run seslendir -- hangi-kahvesin → (edge-tts kuruluysa) public/ses/hangi-kahvesin/*.mp3 kayıtlarını üretir
// Kendi sesinle okursan: her cümleyi .txt dosyasındaki adla (giris.mp3, soru-1.mp3 ...) public/ses/<test>/ klasörüne koy.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const kok = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const uret = args.includes("--uret");
// --motor=edge (Microsoft, internet gerekir) · --motor=espeak (internetsiz, MBROLA Türkçe sesleri)
const motor = (args.find((a) => a.startsWith("--motor=")) ?? "--motor=edge").slice(8);
const ses = (args.find((a) => a.startsWith("--ses=")) ?? (motor === "espeak" ? "--ses=mb-tr2" : "--ses=tr-TR-EmelNeural")).slice(6);
const secilen = args.filter((a) => !a.startsWith("--"));

const slug = (d) => d.replace(/\.json$/, "").toLowerCase()
  .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
  .replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
const temizle = (t) => t
  .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}‍️]/gu, "")
  .replace(/%/g, "yüzde ")
  .replace(/["“”]/g, "")
  .replace(/\s+/g, " ")
  .trim();
const puan = (s, i) => (typeof s === "string" ? i + 1 : s.puan);
const araliklar = (v) => {
  let az = 0, cok = 0;
  for (const q of v.sorular) { const p = q.secenekler.map(puan); az += Math.min(...p); cok += Math.max(...p); }
  const n = v.sonuclar.length, adim = (cok - az + 1) / n;
  return v.sonuclar.map((r, i) => r.aralik ?? [Math.round(az + i * adim), i === n - 1 ? cok : Math.round(az + (i + 1) * adim) - 1]);
};

export const klipler = (v) => {
  const ar = araliklar(v);
  const soruIleAcilir = v.acilis !== "baslik";
  const liste = [
    ...(soruIleAcilir ? [] : [
      ["giris", `${v.baslik} ${v.kanca ?? ""}`],
      ["kural", "Her cevabın bir puanı var. Aklına ilk geleni seç ve puanlarını topla!"],
    ]),
    ...v.sorular.map((q, i) => [`soru-${i + 1}`,
      i === 0 && soruIleAcilir ? `${v.baslik} Puanlarını topla! İlk soru: ${q.soru}`
      : `${i === v.sorular.length - 1 ? "Son soru!" : `Soru ${i + 1}.`} ${q.soru}`]),
    ["puan-topla", "Süre bitti! Şimdi puanlarını topla. Toplamın kaç?"],
    ...v.sonuclar.map((r, i) => {
      const [a, b] = ar[i];
      return [`sonuc-${i + 1}`, `${a === b ? `${a}` : `${a} ile ${b} arası`} puan aldıysan... ${r.ad}!`];
    }),
    ["kapanis", `${v.kapanis ?? "Ne çıktın? Yorumlara yaz!"} Puanını yorumlara yaz!`],
  ];
  return liste.map(([ad, metin]) => [ad, temizle(v.ses?.[ad] ?? metin)]);
};

const dosyalar = fs.readdirSync(path.join(kok, "testler")).filter((f) => f.endsWith(".json"))
  .filter((f) => !secilen.length || secilen.includes(slug(f)));
fs.mkdirSync(path.join(kok, "seslendirme"), { recursive: true });

for (const f of dosyalar) {
  const v = JSON.parse(fs.readFileSync(path.join(kok, "testler", f), "utf8"));
  const id = slug(f);
  const liste = klipler(v);
  const txt = [`# ${v.baslik} — seslendirme metni`, `# Kayıtları public/ses/${id}/ klasörüne bu adlarla koy (.mp3, .wav veya .m4a)`, "",
    ...liste.map(([ad, m]) => `${ad}.mp3\n${m}\n`)].join("\n");
  fs.writeFileSync(path.join(kok, "seslendirme", `${id}.txt`), txt);
  console.log("✔ Metin:", `seslendirme/${id}.txt`);
  if (uret) {
    const klasor = path.join(kok, "public", "ses", id);
    fs.mkdirSync(klasor, { recursive: true });
    for (const [ad, metin] of liste) {
      for (const eski of ["mp3", "wav", "m4a"]) fs.rmSync(path.join(klasor, `${ad}.${eski}`), { force: true });
      if (motor === "espeak") {
        execFileSync("espeak-ng", ["-v", ses, "-s", "175", "-p", "55", "-w", path.join(klasor, `${ad}.wav`), metin], { stdio: "ignore" });
      } else {
        execFileSync("edge-tts", ["--voice", ses, "--rate=+8%", "--text", metin, "--write-media", path.join(klasor, `${ad}.mp3`)], { stdio: "inherit" });
      }
      console.log("  🎙", ad);
    }
  }
}
