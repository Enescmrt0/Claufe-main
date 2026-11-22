import React from "react";
import { Composition, Still } from "remotion";
import { KanalBanner, KanalProfil } from "./Kanal";
import { KisilikTesti } from "./KisilikTesti";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile } from "remotion";
import { derlemeToplamKare, DerlemeVerisi, FPS, klipAdlari, toplamKare, TestVerisi } from "./tipler";
import { Derleme } from "./Derleme";

// testler/ klasöründeki her .json dosyası otomatik olarak ayrı bir video olur.
declare const require: { context: (d: string, r: boolean, re: RegExp) => { keys(): string[]; (k: string): unknown } };
const ctx = require.context("../testler", false, /\.json$/);
// derlemeler/ klasöründeki her .json, birden fazla testi birleştiren uzun bir video olur.
const derlemeCtx = require.context("../derlemeler", false, /\.json$/);

export const slug = (dosya: string) =>
  dosya
    .replace(/^.*\//, "")
    .replace(/\.json$/, "")
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** public/ses/<test>/ klasöründeki kayıtları bulur (mp3, wav veya m4a) ve sürelerini ölçer */
const klipleriBul = async (id: string, v: TestVerisi) => {
  const klipler: NonNullable<TestVerisi["_klipler"]> = {};
  if (!v.seslendirme) return klipler;
  for (const ad of klipAdlari(v)) {
    for (const uzanti of ["mp3", "wav", "m4a"]) {
      const dosya = `ses/${id}/${ad}.${uzanti}`;
      try {
        const sure = await getAudioDurationInSeconds(staticFile(dosya));
        klipler[ad] = { dosya, sure };
        break;
      } catch {
        // bu uzantıda dosya yok, sıradakini dene
      }
    }
  }
  return klipler;
};

/** public/gorseller/<test>/ klasöründeki görselleri bulur: sNN-K, sonuc-N, ara-N-K (.jpg/.jpeg/.png/.webp) */
const gorselleriBul = async (id: string, v: TestVerisi) => {
  const bulunan: Record<string, string> = {};
  if (v.stil !== "galeri") return bulunan;
  const adlar: string[] = [];
  v.sorular.forEach((q, i) => q.secenekler.forEach((_, k) => adlar.push(`s${String(i + 1).padStart(2, "0")}-${k + 1}`)));
  v.sonuclar.forEach((_, k) => adlar.push(`sonuc-${k + 1}`));
  (v.aralar ?? []).forEach((a, j) => (a.secenekler ?? []).forEach((_, k) => adlar.push(`ara-${j + 1}-${k + 1}`)));
  await Promise.all(
    adlar.map(async (ad) => {
      for (const uzanti of ["jpg", "jpeg", "png", "webp"]) {
        const yol = `gorseller/${id}/${ad}.${uzanti}`;
        try {
          const r = await fetch(staticFile(yol), { method: "HEAD" });
          if (r.ok) {
            bulunan[ad] = yol;
            return;
          }
        } catch {
          // yok, sıradakini dene
        }
      }
    }),
  );
  // JSON'da elle yazılmış yollar önceliklidir
  v.sorular.forEach((q, i) =>
    q.secenekler.forEach((sec, k) => {
      if (typeof sec !== "string" && sec.gorsel) bulunan[`s${String(i + 1).padStart(2, "0")}-${k + 1}`] = sec.gorsel;
    }),
  );
  v.sonuclar.forEach((r, k) => {
    if (r.gorsel) bulunan[`sonuc-${k + 1}`] = r.gorsel;
  });
  return bulunan;
};

export const RemotionRoot: React.FC = () => (
  <>
    <Still id="kanal-profil" component={KanalProfil} width={800} height={800} />
    <Still id="kanal-banner" component={KanalBanner} width={2560} height={1440} />
    {derlemeCtx.keys().map((k) => {
      const d = derlemeCtx(k) as DerlemeVerisi;
      const testMap = Object.fromEntries(ctx.keys().map((t) => [slug(t), ctx(t) as TestVerisi]));
      const eksik = d.testler.filter((t) => !testMap[t]);
      if (eksik.length) throw new Error(`Derleme ${k}: bulunamayan test(ler): ${eksik.join(", ")}`);
      const veri: DerlemeVerisi = { ...d, _testler: d.testler.map((t) => testMap[t]) };
      return (
        <Composition
          key={`d-${k}`}
          id={slug(k)}
          component={Derleme as unknown as React.FC<Record<string, unknown>>}
          width={d.format === "dikey" ? 1080 : 1920}
          height={d.format === "dikey" ? 1920 : 1080}
          fps={FPS}
          durationInFrames={derlemeToplamKare(veri)}
          defaultProps={veri as unknown as Record<string, unknown>}
        />
      );
    })}
    {ctx.keys().map((k) => {
      const veri = ctx(k) as TestVerisi;
      return (
        <Composition
          key={k}
          id={slug(k)}
          component={KisilikTesti as unknown as React.FC<Record<string, unknown>>}
          width={veri.format === "yatay" ? 1920 : 1080}
          height={veri.format === "yatay" ? 1080 : 1920}
          fps={FPS}
          durationInFrames={toplamKare(veri)}
          defaultProps={veri as unknown as Record<string, unknown>}
          calculateMetadata={async ({ props }: { props: Record<string, unknown> }) => {
            const v = props as unknown as TestVerisi;
            const _klipler = await klipleriBul(slug(k), v);
            const _gorseller = await gorselleriBul(slug(k), v);
            const yeni = { ...v, _klipler, _gorseller };
            return { durationInFrames: toplamKare(yeni), props: yeni as unknown as Record<string, unknown> };
          }}
        />
      );
    })}
  </>
);
