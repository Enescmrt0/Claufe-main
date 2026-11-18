// YouTube'a yüklerken kopyalanacak metinleri hazırlar → yayin/<test>.txt
// (başlık, açıklama, etiketler ve sabitlenecek ilk yorum)
import fs from "node:fs";
import path from "node:path";
const kok = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const slug = (d) => d.replace(/\.json$/, "").toLowerCase()
  .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
  .replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
fs.mkdirSync(path.join(kok, "yayin"), { recursive: true });
for (const f of fs.readdirSync(path.join(kok, "testler")).filter((x) => x.endsWith(".json"))) {
  const v = JSON.parse(fs.readFileSync(path.join(kok, "testler", f), "utf8"));
  const emojiler = v.sonuclar.map((r) => r.emoji).join("");
  const metin = [
    "BAŞLIK",
    `${v.baslik} ${emojiler} #shorts`,
    "",
    "AÇIKLAMA",
    `${v.baslik} Her cevabın bir puanı var. Puanlarını topla, sonucunu öğren! ${emojiler}`,
    `${v.kanca ?? ""}`,
    "Kaç puan aldın? Yorumlara yaz 👇 Yeni testler için takip et ✨",
    "",
    "#kişiliktesti #test #hangisisin #shorts",
    ...(v.uyari ? ["", v.uyari] : []),
    "",
    "SABİTLENECEK İLK YORUM (videoyu yükler yüklemez sen at ve sabitle)",
    v.sabitYorum ?? "Ben ... çıktım! Sen kaç puan aldın? 👇",
  ].join("\n");
  fs.writeFileSync(path.join(kok, "yayin", `${slug(f)}.txt`), metin + "\n");
  console.log("✔", `yayin/${slug(f)}.txt`);
}
