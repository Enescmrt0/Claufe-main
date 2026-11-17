import React from "react";
import { Composition, Still } from "remotion";
import { KanalBanner, KanalProfil } from "./Kanal";
import { KisilikTesti } from "./KisilikTesti";
import { FPS, toplamKare, TestVerisi } from "./tipler";

// testler/ klasöründeki her .json dosyası otomatik olarak ayrı bir video olur.
declare const require: { context: (d: string, r: boolean, re: RegExp) => { keys(): string[]; (k: string): unknown } };
const ctx = require.context("../testler", false, /\.json$/);

export const slug = (dosya: string) =>
  dosya
    .replace(/^.*\//, "")
    .replace(/\.json$/, "")
    .toLowerCase()
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const RemotionRoot: React.FC = () => (
  <>
    <Still id="kanal-profil" component={KanalProfil} width={800} height={800} />
    <Still id="kanal-banner" component={KanalBanner} width={2560} height={1440} />
    {ctx.keys().map((k) => {
      const veri = ctx(k) as TestVerisi;
      return (
        <Composition
          key={k}
          id={slug(k)}
          component={KisilikTesti as unknown as React.FC<Record<string, unknown>>}
          width={1080}
          height={1920}
          fps={FPS}
          durationInFrames={toplamKare(veri)}
          defaultProps={veri as unknown as Record<string, unknown>}
          calculateMetadata={({ props }: { props: Record<string, unknown> }) => ({ durationInFrames: toplamKare(props as unknown as TestVerisi) })}
        />
      );
    })}
  </>
);
