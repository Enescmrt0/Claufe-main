import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./font";
import { Kart, solma, useGiris } from "./ortak";
import { golge, Guvenli, Ses } from "./sahneler";
import { Ara, HARF_RENKLERI, secenekMetni, secenekPuani, Sonuc, Soru } from "./tipler";

const SARI = "#FFD60A";

/** "*vurgulu*" kelimeleri sarı yapar */
export const Vurgulu: React.FC<{ metin: string }> = ({ metin }) => (
  <>
    {metin.split(/(\*[^*]+\*)/).map((p, i) =>
      p.startsWith("*") && p.endsWith("*") ? (
        <span key={i} style={{ color: SARI }}>
          {p.slice(1, -1)}
        </span>
      ) : (
        <React.Fragment key={i}>{p}</React.Fragment>
      ),
    )}
  </>
);

/** Fotoğraf ya da (fotoğraf yoksa) emoji + açıklamalı yer tutucu */
export const Karo: React.FC<{ gorsel?: string; emoji?: string; metin?: string; renk: string; style?: React.CSSProperties }> = ({
  gorsel,
  emoji,
  metin,
  renk,
  style,
}) => (
  <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", background: "#111", boxShadow: "0 10px 0 rgba(0,0,0,0.25)", ...style }}>
    {gorsel ? (
      <Img src={staticFile(gorsel)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${renk}, #1b1b3a)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: 16,
        }}
      >
        <div style={{ fontSize: 96, lineHeight: 1 }}>{emoji ?? "🖼️"}</div>
        {metin ? <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: "white", textAlign: "center", lineHeight: 1.1, opacity: 0.9 }}>{metin}</div> : null}
      </div>
    )}
  </div>
);

/** Numaralı kalp rozeti */
const Rozet: React.FC<{ no: number }> = ({ no }) => (
  <div style={{ position: "relative", width: 96, height: 90, flexShrink: 0 }}>
    <div style={{ position: "absolute", inset: 0, fontSize: 96, lineHeight: "90px", textAlign: "center" }}>❤️</div>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 10, fontFamily: FONT, fontSize: 40, fontWeight: 800, color: "white" }}>
      {no}
    </div>
  </div>
);

/** Galeri stili soru: üstte soru, 2×3 fotoğraf; geri sayımdan sonra her fotoğrafın üstünde "PUAN xx" */
export const GaleriSoru: React.FC<{ soru: Soru; no: number; sayimSn: number; puanSn: number; gorseller: (string | undefined)[]; kanal: string }> = ({
  soru,
  no,
  sayimSn,
  puanSn,
  gorseller,
  kanal,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const puanBas = durationInFrames - Math.round(puanSn * fps);
  const sayimBas = puanBas - Math.round(sayimSn * fps);
  const a = useGiris(0);
  const kalanOran = interpolate(frame, [sayimBas, puanBas], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const acik = frame >= puanBas;
  const cikis = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: cikis }}>
      <Ses ad="whoosh" ses={0.5} />
      {soru.secenekler.map((_, i) => (
        <Ses key={i} ad="pop" kare={6 + i * 4} ses={0.35} />
      ))}
      {Array.from({ length: Math.round(sayimSn) }, (_, i) => (
        <Ses key={`t${i}`} ad="tik" kare={sayimBas + i * fps} ses={0.6} />
      ))}
      <Ses ad="ding" kare={puanBas} ses={0.45} />

      {/* sol şerit: süre çubuğu, puan açılınca "PUANLARINI TOPLA" */}
      <div style={{ position: "absolute", left: 52, top: 200, bottom: 90, width: 54, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {acik ? (
          <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: 40, fontWeight: 800, color: SARI, letterSpacing: 6, textShadow: golge }}>
            PUANLARINI TOPLA
          </div>
        ) : (
          <div style={{ width: 30, height: "100%", borderRadius: 30, background: "rgba(255,255,255,0.25)", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
            <div
              style={{
                width: "100%",
                height: `${kalanOran * 100}%`,
                borderRadius: 30,
                background: kalanOran > 0.35 ? "#06D6A0" : kalanOran > 0.15 ? SARI : "#FF4D6D",
              }}
            />
          </div>
        )}
      </div>
      {/* sağ şerit: kanal adı */}
      <div style={{ position: "absolute", right: 52, top: 200, bottom: 90, width: 54, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ writingMode: "vertical-rl", fontSize: 30, fontWeight: 800, color: "rgba(255,255,255,0.55)", letterSpacing: 4 }}>{kanal}</div>
      </div>

      {/* üst: rozet + soru */}
      <div style={{ position: "absolute", left: 150, right: 150, top: 36, height: 150, display: "flex", alignItems: "center", gap: 24, transform: `scale(${a})` }}>
        <Rozet no={no} />
        <div style={{ flex: 1, fontSize: 54, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.08, textShadow: golge, textTransform: "uppercase" }}>
          <Vurgulu metin={soru.soru} />
        </div>
      </div>

      {/* 2×3 fotoğraflar */}
      <div style={{ position: "absolute", left: 150, right: 150, top: 200, bottom: 70, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 24 }}>
        {soru.secenekler.map((sec, i) => {
          const g = useGiris(6 + i * 4, 12);
          const p = useGiris(puanBas + i * 3, 10);
          const emoji = typeof sec === "string" ? undefined : sec.emoji;
          return (
            <div key={i} style={{ position: "relative", transform: `scale(${g})` }}>
              <Karo gorsel={gorseller[i]} emoji={emoji} metin={secenekMetni(sec)} renk={HARF_RENKLERI[i % HARF_RENKLERI.length]} style={{ position: "absolute", inset: 0 }} />
              {acik ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 22,
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: Math.min(1, p * 1.5),
                  }}
                >
                  <div style={{ fontSize: 56, fontWeight: 800, color: "white", lineHeight: 1, textShadow: "0 4px 0 rgba(0,0,0,0.5)" }}>PUAN</div>
                  <div style={{ fontSize: 120, fontWeight: 800, color: SARI, lineHeight: 1, transform: `scale(${p})`, textShadow: "0 6px 0 rgba(0,0,0,0.5)" }}>
                    {secenekPuani(sec, i)}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Sorular arasındaki etkileşim molası */
export const AraSahne: React.FC<{ ara: Ara; gorseller: (string | undefined)[] }> = ({ ara, gorseller }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const a = useGiris(0);
  const b = useGiris(10);
  const ok = Math.abs(Math.sin(frame / 6)) * 24;
  return (
    <Guvenli style={{ opacity: solma(frame, durationInFrames), gap: 36 }}>
      <Ses ad="pop" />
      <div style={{ fontSize: 80, fontWeight: 800, color: "white", textAlign: "center", lineHeight: 1.05, textShadow: golge, transform: `scale(${a})`, textTransform: "uppercase" }}>
        <Vurgulu metin={ara.metin} />
      </div>
      {ara.tip === "tercih" && ara.secenekler ? (
        <div style={{ display: "flex", gap: 40, alignItems: "center", transform: `scale(${b})` }}>
          {ara.secenekler.slice(0, 2).map((s, i) => (
            <React.Fragment key={i}>
              {i === 1 ? <div style={{ fontSize: 70, fontWeight: 800, color: SARI, textShadow: golge }}>VS</div> : null}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <Karo gorsel={gorseller[i]} emoji={s.emoji} renk={HARF_RENKLERI[i]} style={{ width: 520, height: 340 }} />
                <div style={{ fontSize: 46, fontWeight: 800, color: "white", textShadow: golge }}>{s.metin}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: 140, transform: `translateY(${ok}px) scale(${b})` }}>👇</div>
      )}
      <Kart style={{ transform: `scale(${b})`, padding: "18px 40px" }}>
        <div style={{ fontSize: 46, fontWeight: 800, color: "#222" }}>{ara.tip === "tercih" ? "Hangisi? Yorumlara yaz 👇" : "Yorumlara yaz 💬"}</div>
      </Kart>
    </Guvenli>
  );
};

/** Final: tüm sonuçlar puan aralıklarıyla, fotoğraflı kartlarda */
export const GaleriSonuclar: React.FC<{ sonuclar: Sonuc[]; araliklar: [number, number][]; gorseller: (string | undefined)[]; altYazi: string }> = ({
  sonuclar,
  araliklar,
  gorseller,
  altYazi,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const alt = useGiris(10 + sonuclar.length * 6);
  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: solma(frame, durationInFrames), padding: "50px 150px 40px", display: "flex", flexDirection: "column", gap: 26 }}>
      <Ses ad="tada" ses={0.5} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gridAutoRows: "1fr", gap: 22 }}>
        {sonuclar.map((r, i) => {
          const g = useGiris(6 + i * 6, 12);
          const [x, y] = araliklar[i];
          const renk = HARF_RENKLERI[i % HARF_RENKLERI.length];
          return (
            <div key={i} style={{ display: "flex", borderRadius: 24, overflow: "hidden", background: renk, transform: `scale(${g})`, boxShadow: "0 8px 0 rgba(0,0,0,0.25)" }}>
              <Karo gorsel={gorseller[i]} emoji={r.emoji} renk={renk} style={{ width: "42%", height: "100%", borderRadius: 0, boxShadow: "none" }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <div style={{ fontSize: 44, fontWeight: 800, color: "white", background: "rgba(0,0,0,0.35)", borderRadius: 999, padding: "4px 26px" }}>
                  {x === y ? x : `${x}–${y}`}
                </div>
                <div style={{ fontSize: 62, fontWeight: 800, color: "white", textShadow: "0 5px 0 rgba(0,0,0,0.35)", textAlign: "center", lineHeight: 1.05 }}>
                  {r.ad.toLocaleUpperCase("tr")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", fontSize: 54, fontWeight: 800, color: "white", textShadow: golge, transform: `scale(${alt})`, textTransform: "uppercase" }}>
        <Vurgulu metin={altYazi} />
      </div>
    </AbsoluteFill>
  );
};
