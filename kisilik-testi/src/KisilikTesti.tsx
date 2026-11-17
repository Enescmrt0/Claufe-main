import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { ArkaPlan } from "./ortak";
import { useFont } from "./font";
import { Giris, Kapanis, Kural, SonucSahnesi, SonucSorusu, SoruSahnesi } from "./sahneler";
import { FPS, sureleriAl, TestVerisi } from "./tipler";

export const KisilikTesti: React.FC<TestVerisi> = (v) => {
  useFont();
  const s = sureleriAl(v);
  const k = (sn: number) => Math.round(sn * FPS);
  const emojiler = v.sonuclar.map((r) => r.emoji);
  return (
    <AbsoluteFill lang="tr">
      <ArkaPlan renk1={v.tema?.renk1 ?? "#FF9A62"} renk2={v.tema?.renk2 ?? "#FF4F81"} emojiler={emojiler} />
      <Series>
        <Series.Sequence durationInFrames={k(s.giris)} name="Giriş">
          <Giris ustYazi={v.ustYazi ?? "KİŞİLİK TESTİ"} baslik={v.baslik} kanca={v.kanca} emojiler={emojiler} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={k(s.kural)} name="Kural">
          <Kural />
        </Series.Sequence>
        {v.sorular.map((soru, i) => (
          <Series.Sequence key={i} durationInFrames={k(s.soru)} name={`Soru ${i + 1}`}>
            <SoruSahnesi soru={soru} no={i + 1} toplam={v.sorular.length} sayimSn={s.sayim} />
          </Series.Sequence>
        ))}
        <Series.Sequence durationInFrames={k(s.sonucSorusu)} name="Hangi harf?">
          <SonucSorusu adet={v.sonuclar.length} />
        </Series.Sequence>
        {v.sonuclar.map((sonuc, i) => (
          <Series.Sequence key={i} durationInFrames={k(s.sonuc)} name={`Sonuç ${i + 1}`}>
            <SonucSahnesi sonuc={sonuc} i={i} />
          </Series.Sequence>
        ))}
        <Series.Sequence durationInFrames={k(s.kapanis)} name="Kapanış">
          <Kapanis metin={v.kapanis ?? "Ne çıktın? Yorumlara yaz!"} uyari={v.uyari} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
