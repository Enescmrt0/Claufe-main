import React from "react";
import { AbsoluteFill, Html5Audio, interpolate, Sequence, Series, staticFile, useVideoConfig } from "remotion";
import { ArkaPlan } from "./ortak";
import { useFont } from "./font";
import { CevapAnahtari, SonrakiTest, DetayliSonuc, Giris, Kapanis, Kural, PuanTablosu, SonucSahnesi, SonucSorusu, SoruSahnesi } from "./sahneler";
import { ANAHTAR_SAYFA, VARSAYILAN_SONRAKI_TESTLER, puanSiniri, sahneKareleri, soruIleAcilir, sonucAraliklari, sureleriAl, TestVerisi } from "./tipler";

/** Sahnenin başında ilgili ses kaydını çalar (varsa) */
const Anlatim: React.FC<{ v: TestVerisi; ad: string; gecikme?: number }> = ({ v, ad, gecikme = 4 }) => {
  const klip = v._klipler?.[ad];
  if (!klip) return null;
  return (
    <Sequence from={gecikme} layout="none" name={`Ses: ${ad}`}>
      <Html5Audio src={staticFile(klip.dosya)} volume={1} />
    </Sequence>
  );
};

export const KisilikTesti: React.FC<TestVerisi> = (v) => {
  useFont();
  return (
    <AbsoluteFill lang="tr">
      <ArkaPlan renk1={v.tema?.renk1 ?? "#FF9A62"} renk2={v.tema?.renk2 ?? "#FF4F81"} emojiler={v.sonuclar.map((x) => x.emoji)} />
      <TestAkisi v={v} />
      {v.muzik ? <Muzik dosya={v.muzik} ses={v.muzikSes ?? 0.18} /> : null}
    </AbsoluteFill>
  );
};

/** Döngüde çalan arka plan müziği; başta ve sonda yumuşakça açılıp kapanır */
export const Muzik: React.FC<{ dosya: string; ses: number }> = ({ dosya, ses }) => {
  const { durationInFrames, fps } = useVideoConfig();
  return (
    <Html5Audio
      src={staticFile(dosya)}
      loop
      volume={(f) => ses * interpolate(f, [0, fps, durationInFrames - 2 * fps, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
    />
  );
};

/** Bir testin tüm sahneleri (arka plan hariç). Derlemelerde de kullanılır. */
export const TestAkisi: React.FC<{ v: TestVerisi }> = ({ v }) => {
  const s = sureleriAl(v);
  const r = sahneKareleri(v);
  const emojiler = v.sonuclar.map((x) => x.emoji);
  const [enAz, enCok] = puanSiniri(v);
  const araliklar = sonucAraliklari(v);
  const soruAcilisi = soruIleAcilir(v);
  return (
      <Series>
        {!soruAcilisi ? (
          <Series.Sequence durationInFrames={r.giris} name="Giriş">
            <Giris ustYazi={v.ustYazi ?? "KİŞİLİK TESTİ"} baslik={v.baslik} kanca={v.kanca} emojiler={emojiler} />
            <Anlatim v={v} ad="giris" />
          </Series.Sequence>
        ) : null}
        {!soruAcilisi && !v._kuralYok ? (
          <Series.Sequence durationInFrames={r.kural} name="Kural">
            <Kural metin={v.kural} />
            <Anlatim v={v} ad="kural" />
          </Series.Sequence>
        ) : null}
        {v.sorular.map((soru, i) => (
          <Series.Sequence key={i} durationInFrames={r.sorular[i]} name={`Soru ${i + 1}`}>
            <SoruSahnesi
              soru={soru} no={i + 1} toplam={v.sorular.length} sayimSn={s.sayim} puanSn={s.puan} puanHemen={v.puanZamani === "hemen"}
              acilisBasligi={soruAcilisi && i === 0 ? v.baslik : undefined}
              puanGizli={v.puanZamani === "sonda"}
            />
            <Anlatim v={v} ad={`soru-${i + 1}`} gecikme={2} />
          </Series.Sequence>
        ))}
        {r.anahtar.map((kare, p) => (
          <Series.Sequence key={`a${p}`} durationInFrames={kare} name={`Cevap anahtarı ${p + 1}`}>
            <CevapAnahtari
              sorular={v.sorular.slice(p * ANAHTAR_SAYFA, (p + 1) * ANAHTAR_SAYFA)}
              bas={p * ANAHTAR_SAYFA}
              sayfa={p + 1}
              sayfaSayisi={r.anahtar.length}
            />
          </Series.Sequence>
        ))}
        <Series.Sequence durationInFrames={r.puanTopla} name="Puanını topla">
          <SonucSorusu enAz={enAz} enCok={enCok} />
          <Anlatim v={v} ad="puan-topla" />
        </Series.Sequence>
        {v.puanTablosu ? (
          <Series.Sequence durationInFrames={r.tablo} name="Puan tablosu">
            <PuanTablosu sonuclar={v.sonuclar} araliklar={araliklar} />
          </Series.Sequence>
        ) : null}
        {v.sonuclar.map((sonuc, i) => (
          <Series.Sequence key={i} durationInFrames={r.sonuclar[i]} name={`Sonuç ${i + 1}`}>
            {sonuc.detay ? (
              <DetayliSonuc sonuc={sonuc} i={i} aralik={araliklar[i]} />
            ) : (
              <SonucSahnesi sonuc={sonuc} i={i} aralik={araliklar[i]} />
            )}
            <Anlatim v={v} ad={`sonuc-${i + 1}`} />
          </Series.Sequence>
        ))}
        {!v._kapanisYok ? (
          <Series.Sequence durationInFrames={r.sonraki} name="Sıradaki test">
            <SonrakiTest secenekler={v.sonrakiTestler ?? VARSAYILAN_SONRAKI_TESTLER} />
          </Series.Sequence>
        ) : null}
        {!v._kapanisYok ? (
          <Series.Sequence durationInFrames={r.kapanis} name="Kapanış">
            <Kapanis metin={v.kapanis ?? "Ne çıktın? Yorumlara yaz!"} uyari={v.uyari} />
            <Anlatim v={v} ad="kapanis" />
          </Series.Sequence>
        ) : null}
      </Series>
  );
};
