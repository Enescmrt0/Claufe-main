// YouTube'a yüklerken kopyalanacak metinleri hazırlar → yayin/<test>.txt
// (başlık, açıklama, etiketler ve sabitlenecek ilk yorum)
import fs from "node:fs";
import path from "node:path";
const kok = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const slug = (d) => d.replace(/\.json$/, "").toLowerCase()
  .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
  .replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
fs.mkdirSync(path.join(kok, "yayin"), { recursive: true });
// Uzun (yatay) videolar için YouTube bölümleri — süreler src/tipler.ts ile aynı mantık (seslendirmesiz)
const VARS = { giris: 3, kural: 2.5, soru: 7.5, sayim: 5, puan: 1.5, sonucSorusu: 3, tablo: 7, sonuc: 3.5, kapanis: 3.5 };
const zaman = (sn) => `${Math.floor(sn / 60)}:${String(Math.floor(sn % 60)).padStart(2, "0")}`;
const bolumler = (v) => {
  const s = { ...VARS, ...(v.sureler ?? {}) };
  const soruAcilisi = v.acilis !== "baslik";
  const kare = (sn) => Math.round(sn * 30) / 30;
  let t = 0;
  const liste = [[0, "Giriş"]];
  if (!soruAcilisi) t += kare(s.giris) + kare(s.kural);
  liste.push([t, "Sorular"]);
  v.sorular.forEach((_, i) => { t += kare(s.soru + (soruAcilisi && i === 0 ? 1 : 0)); });
  t += kare(s.sonucSorusu);
  if (v.puanTablosu) { liste.push([t, "Puan tablosu"]); t += kare(s.tablo); }
  v.sonuclar.forEach((r) => {
    liste.push([t, `${r.emoji} ${r.ad}`]);
    const metin = (r.slogan ?? "") + (r.detay ?? "") + (r.ozellikler ?? []).join("");
    t += kare(r.detay ? Math.max(s.sonuc, 5 + metin.length / 17) : s.sonuc);
  });
  return liste.map(([sn, ad]) => `${zaman(sn)} ${ad}`).join("\n");
};

for (const f of fs.readdirSync(path.join(kok, "testler")).filter((x) => x.endsWith(".json"))) {
  const v = JSON.parse(fs.readFileSync(path.join(kok, "testler", f), "utf8"));
  const emojiler = v.sonuclar.map((r) => r.emoji).join("");
  const metin = [
    "BAŞLIK",
    v.format === "yatay" ? `${v.baslik} ${emojiler} | Detaylı Kişilik Testi` : `${v.baslik} ${emojiler} #shorts`,
    "",
    "AÇIKLAMA",
    `${v.baslik} Her cevabın bir puanı var. Puanlarını topla, sonucunu öğren! ${emojiler}`,
    `${v.kanca ?? ""}`,
    "Kaç puan aldın? Yorumlara yaz 👇 Yeni testler için takip et ✨",
    "",
    ...(v.format === "yatay" ? ["", "BÖLÜMLER", bolumler(v)] : []),
    "",
    v.format === "yatay" ? "#kişiliktesti #test #hangisisin #kişilik" : "#kişiliktesti #test #hangisisin #shorts",
    ...(v.uyari ? ["", v.uyari] : []),
    "",
    "SABİTLENECEK İLK YORUM (videoyu yükler yüklemez sen at ve sabitle)",
    v.sabitYorum ?? "Ben ... çıktım! Sen kaç puan aldın? 👇",
  ].join("\n");
  fs.writeFileSync(path.join(kok, "yayin", `${slug(f)}.txt`), metin + "\n");
  console.log("✔", `yayin/${slug(f)}.txt`);
}
