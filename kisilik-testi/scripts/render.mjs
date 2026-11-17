// Kullanım:
//   npm run render                       → testler/ içindeki TÜM testleri cikti/ klasörüne MP4 olarak çıkarır
//   npm run render -- hangi-yemeksin     → sadece o testi çıkarır
//   npm run kapak                        → her test için kapak görseli (PNG) çıkarır
//   npm run kanal                        → kanal profil fotoğrafı + banner (kanal/ klasörüne)
import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia, renderStill } from "@remotion/renderer";

// Kendi bilgisayarında Remotion tarayıcıyı kendisi indirir; istersen CHROME_YOLU ile kendi Chrome'unu ver.
const browserExecutable = process.env.CHROME_YOLU || null;

const kok = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const args = process.argv.slice(2);
const kapak = args.includes("--kapak");
const secilen = args.filter((a) => !a.startsWith("--"));

console.log("Proje paketleniyor...");
const serveUrl = await bundle({ entryPoint: path.join(kok, "src/index.ts"), publicDir: path.join(kok, "public") });
const tumu = await getCompositions(serveUrl, { browserExecutable });
const kanalModu = args.includes("--kanal");
if (kanalModu) {
  fs.mkdirSync(path.join(kok, "kanal"), { recursive: true });
  for (const composition of tumu.filter((c) => c.id.startsWith("kanal-"))) {
    const cikti = path.join(kok, "kanal", `${composition.id}.png`);
    await renderStill({ composition, serveUrl, output: cikti, browserExecutable });
    console.log("✔", cikti);
  }
  process.exit(0);
}
const hepsi = tumu.filter((c) => !c.id.startsWith("kanal-"));
const liste = secilen.length ? hepsi.filter((c) => secilen.includes(c.id)) : hepsi;
if (!liste.length) {
  console.error("Test bulunamadı. Mevcut testler:", hepsi.map((c) => c.id).join(", "));
  process.exit(1);
}
fs.mkdirSync(path.join(kok, "cikti"), { recursive: true });

for (const composition of liste) {
  if (kapak) {
    const cikti = path.join(kok, "cikti", `${composition.id}-kapak.png`);
    await renderStill({ composition, serveUrl, output: cikti, frame: 50, browserExecutable });
    console.log("✔ Kapak:", cikti);
  } else {
    const cikti = path.join(kok, "cikti", `${composition.id}.mp4`);
    console.log(`▶ ${composition.id} (${(composition.durationInFrames / composition.fps).toFixed(1)} sn)`);
    let son = -1;
    await renderMedia({
      composition,
      serveUrl,
      codec: "h264",
      crf: 18,
      browserExecutable,
      logLevel: process.env.LOG || 'info',
      outputLocation: cikti,
      onProgress: ({ progress }) => {
        const p = Math.floor(progress * 10);
        if (p !== son) { son = p; process.stdout.write(` %${p * 10}`); }
      },
    });
    console.log("\n✔ Video:", cikti);
  }
}
