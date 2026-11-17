import React from "react";
import { AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./font";
import { Hap, HarfDairesi, Kart, solma, useGiris } from "./ortak";
import { HARF_RENKLERI, HARFLER, Sonuc, Soru } from "./tipler";

/** Shorts güvenli alanı: üstte başlık, altta açıklama/müzik, sağda butonlar */
const Guvenli: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill
    style={{
      padding: "190px 90px 430px 90px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      fontFamily: FONT,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

const golge = "0 6px 0 rgba(0,0,0,0.18)";
const Ses: React.FC<{ ad: string; kare?: number; ses?: number }> = ({ ad, kare = 0, ses = 0.6 }) => (
  <Sequence from={kare} layout="none">
    <Html5Audio src={staticFile(`sfx/${ad}.wav`)} volume={ses} />
  </Sequence>
);

export const Giris: React.FC<{ ustYazi: string; baslik: string; kanca?: string; emojiler: string[] }> = ({
  ustYazi,
  baslik,
  kanca,
  emojiler,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = useGiris(0);
  const b = useGiris(8);
  const c = useGiris(18);
  return (
    <Guvenli style={{ opacity: interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }) }}>
      <Ses ad="whoosh" />
      <Ses ad="pop" kare={8} />
      <div style={{ transform: `scale(${a})` }}>
        <Hap>{ustYazi}</Hap>
      </div>
      <div
        style={{
          fontSize: baslik.length > 18 ? 118 : 140,
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          lineHeight: 1.0,
          textShadow: "0 10px 0 rgba(0,0,0,0.2)",
          transform: `scale(${b}) rotate(${(1 - b) * -8}deg)`,
        }}
      >
        {baslik}
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {emojiler.map((e, i) => {
          const s = useGiris(14 + i * 4, 8);
          const zipla = Math.abs(Math.sin((frame + i * 7) / 7)) * 18;
          return (
            <div key={i} style={{ fontSize: 120, transform: `scale(${s}) translateY(${-zipla}px)` }}>
              {e}
            </div>
          );
        })}
      </div>
      {kanca ? (
        <Kart style={{ transform: `translateY(${(1 - c) * 300}px)`, opacity: c, padding: "30px 44px" }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: "#222", textAlign: "center", lineHeight: 1.15 }}>{kanca}</div>
        </Kart>
      ) : null}
    </Guvenli>
  );
};

export const Kural: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = useGiris(0);
  const b = useGiris(10);
  return (
    <Guvenli style={{ opacity: solma(frame, durationInFrames) }}>
      <Ses ad="pop" />
      <div style={{ fontSize: 150, transform: `scale(${a}) rotate(${Math.sin(frame / 5) * 8}deg)` }}>👆</div>
      <div style={{ fontSize: 96, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.05, textShadow: golge, transform: `scale(${a})` }}>
        Aklına ilk geleni seç!
      </div>
      <Kart style={{ transform: `scale(${b})`, padding: "30px 44px" }}>
        <div style={{ fontSize: 54, fontWeight: 800, color: "#222", textAlign: "center", lineHeight: 1.15 }}>
          En çok seçtiğin harfi aklında tut 🧠
        </div>
      </Kart>
    </Guvenli>
  );
};

export const SoruSahnesi: React.FC<{ soru: Soru; no: number; toplam: number; sayimSn: number }> = ({ soru, no, toplam, sayimSn }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const a = useGiris(0);
  const sayimBas = durationInFrames - Math.round(sayimSn * fps);
  const kalan = Math.max(0, durationInFrames - frame);
  const sayimDevrede = frame >= sayimBas;
  const sayi = Math.ceil(kalan / fps);
  const cubuk = interpolate(frame, [sayimBas, durationInFrames - 4], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cikis = interpolate(frame, [durationInFrames - 6, durationInFrames], [0, -1200], { extrapolateLeft: "clamp" });
  const secenekBas = 12;
  const uzun = soru.secenekler.some((s) => s.length > 24);
  return (
    <Guvenli style={{ gap: 30, transform: `translateX(${cikis}px)` }}>
      <Ses ad="whoosh" ses={0.5} />
      {soru.secenekler.map((_, i) => (
        <Ses key={i} ad="pop" kare={secenekBas + i * 6} ses={0.45} />
      ))}
      {Array.from({ length: Math.round(sayimSn) }, (_, i) => (
        <Ses key={`t${i}`} ad="tik" kare={sayimBas + i * fps} ses={0.7} />
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 20, transform: `scale(${a})` }}>
        <Hap>
          SORU {no}/{toplam}
        </Hap>
        <div style={{ display: "flex", gap: 10 }}>
          {Array.from({ length: toplam }, (_, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: 22, background: i < no ? "white" : "rgba(255,255,255,0.35)" }} />
          ))}
        </div>
      </div>
      <Kart style={{ width: "100%", transform: `scale(${a})`, padding: "40px 44px" }}>
        <div style={{ fontSize: soru.soru.length > 34 ? 66 : 78, fontWeight: 800, color: "#222", textAlign: "center", lineHeight: 1.08 }}>
          {soru.soru}
        </div>
      </Kart>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 22 }}>
        {soru.secenekler.map((s, i) => {
          const g = useGiris(secenekBas + i * 6, 11);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                background: "rgba(255,255,255,0.95)",
                borderRadius: 999,
                padding: "14px 36px 14px 14px",
                transform: `translateX(${(1 - g) * (i % 2 ? 900 : -900)}px)`,
                boxShadow: `0 8px 0 ${HARF_RENKLERI[i]}`,
              }}
            >
              <HarfDairesi harf={HARFLER[i]} renk={HARF_RENKLERI[i]} boy={92} />
              <div style={{ fontSize: uzun ? 44 : 52, fontWeight: 800, color: "#222", lineHeight: 1.05 }}>{s}</div>
            </div>
          );
        })}
      </div>
      <div style={{ width: "100%", display: "flex", alignItems: "center", gap: 24, opacity: sayimDevrede ? 1 : 0.0 }}>
        <div style={{ flex: 1, height: 26, borderRadius: 26, background: "rgba(0,0,0,0.2)", overflow: "hidden" }}>
          <div style={{ width: `${cubuk * 100}%`, height: "100%", background: "white", borderRadius: 26 }} />
        </div>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 96,
            background: "white",
            color: "#222",
            fontSize: 64,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 + 0.25 * Math.max(0, 1 - ((frame - sayimBas) % fps) / 8)})`,
          }}
        >
          {sayi}
        </div>
      </div>
    </Guvenli>
  );
};

export const SonucSorusu: React.FC<{ adet: number }> = ({ adet }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = useGiris(0);
  return (
    <Guvenli style={{ opacity: solma(frame, durationInFrames) }}>
      <Ses ad="whoosh" />
      <div style={{ fontSize: 140, transform: `scale(${a})` }}>🤔</div>
      <div style={{ fontSize: 100, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.02, textShadow: golge, transform: `scale(${a})` }}>
        En çok hangi harfi seçtin?
      </div>
      <div style={{ display: "flex", gap: 26 }}>
        {Array.from({ length: adet }, (_, i) => {
          const g = useGiris(8 + i * 5, 8);
          const nabiz = 1 + Math.sin((frame - i * 6) / 4) * 0.06;
          return (
            <div key={i} style={{ transform: `scale(${g * nabiz})` }}>
              <HarfDairesi harf={HARFLER[i]} renk={HARF_RENKLERI[i]} boy={150} />
            </div>
          );
        })}
      </div>
    </Guvenli>
  );
};

export const SonucSahnesi: React.FC<{ sonuc: Sonuc; i: number }> = ({ sonuc, i }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = useGiris(0);
  const b = useGiris(8, 7);
  const c = useGiris(16);
  const renk = HARF_RENKLERI[i];
  return (
    <Guvenli style={{ opacity: solma(frame, durationInFrames, 5), gap: 30 }}>
      <Ses ad="ding" kare={6} ses={0.5} />
      <div style={{ display: "flex", alignItems: "center", gap: 20, transform: `scale(${a})` }}>
        <div style={{ fontSize: 58, fontWeight: 800, color: "white", textShadow: golge }}>Çoğunlukla</div>
        <HarfDairesi harf={HARFLER[i]} renk={renk} boy={100} />
        <div style={{ fontSize: 58, fontWeight: 800, color: "white", textShadow: golge }}>seçtiysen...</div>
      </div>
      <div
        style={{
          fontSize: 250,
          lineHeight: 1,
          transform: `scale(${b}) rotate(${(1 - b) * 40 + Math.sin(frame / 10) * 4}deg)`,
          filter: "drop-shadow(0 18px 0 rgba(0,0,0,0.15))",
        }}
      >
        {sonuc.emoji}
      </div>
      <Kart style={{ width: "100%", transform: `translateY(${(1 - c) * 400}px)`, borderBottom: `14px solid ${renk}` }}>
        <div style={{ fontSize: sonuc.ad.length > 14 ? 76 : 96, fontWeight: 800, color: renk, textAlign: "center", lineHeight: 1 }}>{sonuc.ad}</div>
        <div style={{ fontSize: 48, fontWeight: 600, color: "#333", textAlign: "center", lineHeight: 1.18, marginTop: 18 }}>{sonuc.aciklama}</div>
      </Kart>
    </Guvenli>
  );
};

export const Kapanis: React.FC<{ metin: string; uyari?: string }> = ({ metin, uyari }) => {
  const frame = useCurrentFrame();
  const a = useGiris(0);
  const b = useGiris(12);
  const ok = Math.abs(Math.sin(frame / 6)) * 30;
  return (
    <Guvenli>
      <Ses ad="tada" ses={0.5} />
      <div style={{ fontSize: 108, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.02, textShadow: golge, transform: `scale(${a})` }}>
        {metin}
      </div>
      <div style={{ fontSize: 170, transform: `translateY(${ok}px) scale(${a})` }}>👇</div>
      <Kart style={{ transform: `scale(${b})`, padding: "28px 44px" }}>
        <div style={{ fontSize: 52, fontWeight: 800, color: "#222", textAlign: "center" }}>Yeni testler için takip et! ✨</div>
      </Kart>
      {uyari ? (
        <div style={{ fontSize: 34, fontWeight: 600, color: "white", textAlign: "center", lineHeight: 1.25, opacity: b, maxWidth: 860, background: "rgba(0,0,0,0.25)", padding: "18px 28px", borderRadius: 24 }}>
          {uyari}
        </div>
      ) : null}
    </Guvenli>
  );
};
