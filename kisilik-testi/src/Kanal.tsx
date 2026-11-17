import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT, useFont } from "./font";
import { HARF_RENKLERI, HARFLER } from "./tipler";
import { HarfDairesi } from "./ortak";

export const KANAL_ADI = "Hangisisin?";
const R1 = "#FF9A62";
const R2 = "#FF4F81";
const R3 = "#7F5AF0";
const degrade = `linear-gradient(135deg, ${R1} 0%, ${R2} 55%, ${R3} 100%)`;

const Emoji: React.FC<{ e: string; x: number; y: number; boy: number; don?: number; op?: number }> = ({ e, x, y, boy, don = 0, op = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, fontSize: boy, transform: `translate(-50%,-50%) rotate(${don}deg)`, opacity: op, lineHeight: 1 }}>{e}</div>
);

/** YouTube profil fotoğrafı: 800x800 (yuvarlak kırpılır) */
export const KanalProfil: React.FC = () => {
  useFont();
  return (
  <AbsoluteFill style={{ background: degrade, fontFamily: FONT }}>
    <div
      style={{
        position: "absolute",
        left: 400,
        top: 390,
        width: 440,
        height: 440,
        transform: "translate(-50%,-50%) rotate(-6deg)",
        background: "white",
        borderRadius: 140,
        boxShadow: "0 22px 0 rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontSize: 400, fontWeight: 800, lineHeight: 1, marginTop: 50, background: degrade, WebkitBackgroundClip: "text", color: "transparent" }}>?</div>
      {/* konuşma balonu kuyruğu */}
      <div style={{ position: "absolute", bottom: -40, left: 90, width: 0, height: 0, borderLeft: "40px solid transparent", borderRight: "40px solid transparent", borderTop: "70px solid white", transform: "rotate(18deg)" }} />
    </div>
    <Emoji e="🍕" x={175} y={215} boy={120} don={-18} />
    <Emoji e="✨" x={630} y={185} boy={110} don={12} />
    <Emoji e="😏" x={640} y={590} boy={120} don={10} />
    <Emoji e="🌙" x={190} y={620} boy={100} don={-10} />
  </AbsoluteFill>
  );
};

/** YouTube banner: 2560x1440. Her cihazda görünen güvenli alan ortadaki 1546x423 */
export const KanalBanner: React.FC = () => {
  useFont();
  const serpiştir: [string, number, number, number, number][] = [
    ["🍕", 260, 380, 170, -15], ["🍣", 520, 1080, 150, 12], ["✨", 760, 300, 120, 0], ["🌸", 330, 760, 140, 8],
    ["😏", 2300, 360, 170, 12], ["🍰", 2060, 1080, 150, -10], ["🌙", 1820, 290, 130, -8], ["☕", 2250, 780, 150, 6],
    ["💜", 1040, 1180, 110, -6], ["🍲", 1530, 1190, 130, 10], ["🔮", 1300, 250, 120, 0],
  ];
  return (
    <AbsoluteFill style={{ background: degrade, fontFamily: FONT }}>
      {serpiştir.map(([e, x, y, b, d], i) => (
        <Emoji key={i} e={e} x={x} y={y} boy={b} don={d} op={0.9} />
      ))}
      {/* güvenli alan: x 507–2053, y 508–931 */}
      <div style={{ position: "absolute", left: 507, top: 508, width: 1546, height: 423, display: "flex", alignItems: "center", justifyContent: "center", gap: 60 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 210, fontWeight: 800, color: "white", lineHeight: 0.95, textShadow: "0 12px 0 rgba(0,0,0,0.18)" }}>{KANAL_ADI}</div>
          <div style={{ marginTop: 18, background: "white", borderRadius: 999, padding: "14px 48px", fontSize: 58, fontWeight: 800, color: "#333", boxShadow: "0 10px 0 rgba(0,0,0,0.15)" }}>
            Her gün yeni kişilik testi ✨
          </div>
          <div style={{ display: "flex", gap: 22, marginTop: 30 }}>
            {HARFLER.slice(0, 4).map((h, i) => (
              <HarfDairesi key={h} harf={h} renk={HARF_RENKLERI[i]} boy={84} />
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
