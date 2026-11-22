// Galeri stilindeki testler için gereken görsellerin listesini çıkarır:
//   npm run gorsel-listesi -- hangi-manifest-kizisin   → public/gorseller/<test>/LISTE.md
import fs from "node:fs";
import path from "node:path";
const kok = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const secilen = process.argv.slice(2);
const slug = (d) => d.replace(/\.json$/, "").toLowerCase()
  .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
  .replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
for (const f of fs.readdirSync(path.join(kok, "testler")).filter((x) => x.endsWith(".json"))) {
  const id = slug(f);
  if (secilen.length && !secilen.includes(id)) continue;
  const v = JSON.parse(fs.readFileSync(path.join(kok, "testler", f), "utf8"));
  if (v.stil !== "galeri") continue;
  const klasor = path.join(kok, "public", "gorseller", id);
  fs.mkdirSync(klasor, { recursive: true });
  const mevcut = new Set(fs.readdirSync(klasor).map((x) => x.replace(/\.(jpe?g|png|webp)$/i, "")));
  const satir = (ad, tarif) => `- [${mevcut.has(ad) ? "x" : " "}] \`${ad}.jpg\` — ${tarif}`;
  const out = [
    `# ${v.baslik} — görsel listesi`,
    "",
    `Görselleri bu klasöre (\`public/gorseller/${id}/\`) aşağıdaki adlarla koy. .jpg, .jpeg, .png veya .webp olabilir.`,
    "Yatay ya da kareye yakın fotoğraflar en iyi sonucu verir (ızgarada kırpılarak ortalanır). Telifsiz ya da kullanım hakkın olan görseller kullan.",
    "Eksik görselin yerinde emoji ve açıklama görünür, video yine çıkar.",
    "",
  ];
  v.sorular.forEach((q, i) => {
    out.push(`## Soru ${i + 1}: ${q.soru.replace(/\*/g, "")}`);
    q.secenekler.forEach((s, k) => out.push(satir(`s${String(i + 1).padStart(2, "0")}-${k + 1}`, `${typeof s === "string" ? s : s.metin} (${typeof s === "string" ? k + 1 : s.puan} puan)`)));
    out.push("");
  });
  (v.aralar ?? []).forEach((a, j) => {
    if (!a.secenekler) return;
    out.push(`## Mola ${j + 1}: ${a.metin.replace(/\*/g, "")}`);
    a.secenekler.forEach((s, k) => out.push(satir(`ara-${j + 1}-${k + 1}`, s.metin)));
    out.push("");
  });
  out.push("## Sonuç tablosu");
  v.sonuclar.forEach((r, k) => out.push(satir(`sonuc-${k + 1}`, `${r.ad} (kullanım hakkın olan bir görsel; yoksa boş bırak, emoji görünür)`)));
  const toplam = out.filter((x) => x.startsWith("- [")).length;
  const hazir = out.filter((x) => x.startsWith("- [x]")).length;
  out.splice(1, 0, "", `**Durum: ${hazir}/${toplam} görsel hazır.**`);
  fs.writeFileSync(path.join(klasor, "LISTE.md"), out.join("\n") + "\n");
  console.log(`✔ public/gorseller/${id}/LISTE.md (${hazir}/${toplam})`);
}
