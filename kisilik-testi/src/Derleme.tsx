import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { useFont } from "./font";
import { TestAkisi } from "./KisilikTesti";
import { ArkaPlan } from "./ortak";
import { Giris, Kapanis, Kural } from "./sahneler";
import { derlemeKareleri, derlemeTesti, DerlemeVerisi } from "./tipler";

/** Birden fazla testi arka arkaya oynatan uzun video */
export const Derleme: React.FC<DerlemeVerisi> = (d) => {
  useFont();
  const testler = d._testler ?? [];
  const r = derlemeKareleri(d);
  // girişte her testin ilk sonuç emojisi
  const kapakEmojileri = testler.map((t) => t.sonuclar[0]?.emoji ?? "✨");
  const tumEmojiler = testler.flatMap((t) => t.sonuclar.map((x) => x.emoji));
  return (
    <AbsoluteFill lang="tr">
      <Series>
        <Series.Sequence durationInFrames={r.giris} name="Giriş">
          <ArkaPlan renk1="#FF9A62" renk2="#FF4F81" emojiler={tumEmojiler} />
          <Giris ustYazi={d.ustYazi ?? `${testler.length} TEST BİR ARADA`} baslik={d.baslik} kanca={d.kanca} emojiler={kapakEmojileri} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={r.kural} name="Kural">
          <ArkaPlan renk1="#FF9A62" renk2="#FF4F81" emojiler={tumEmojiler} />
          <Kural metin={d.kural} />
        </Series.Sequence>
        {testler.map((t, j) => {
          const v = derlemeTesti(d, t, j, testler.length);
          return (
            <Series.Sequence key={j} durationInFrames={r.testler[j]} name={`Test ${j + 1}: ${t.baslik}`}>
              <ArkaPlan renk1={t.tema?.renk1 ?? "#FF9A62"} renk2={t.tema?.renk2 ?? "#FF4F81"} emojiler={t.sonuclar.map((x) => x.emoji)} />
              <TestAkisi v={v} />
            </Series.Sequence>
          );
        })}
        <Series.Sequence durationInFrames={r.kapanis} name="Kapanış">
          <ArkaPlan renk1="#FF9A62" renk2="#FF4F81" emojiler={tumEmojiler} />
          <Kapanis metin={d.kapanis ?? "Hangi testte ne çıktın? Yorumlara yaz!"} uyari={d.uyari} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
