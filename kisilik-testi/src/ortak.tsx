import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./font";

export const useGiris = (gecikme = 0, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - gecikme, fps, config: { damping, mass: 0.7 } });
};

/** Hareketli degrade arka plan + süzülen emojiler */
export const ArkaPlan: React.FC<{ renk1: string; renk2: string; emojiler: string[] }> = ({ renk1, renk2, emojiler }) => {
  const frame = useCurrentFrame();
  const aci = 160 + Math.sin(frame / 90) * 20;
  const parcalar = Array.from({ length: 14 }, (_, i) => {
    const x = (i * 137) % 1000 + 40;
    const hiz = 0.6 + ((i * 53) % 10) / 12;
    const y = 1980 - ((frame * hiz * 2 + i * 260) % 2200);
    const boy = 70 + ((i * 37) % 60);
    const don = Math.sin((frame + i * 40) / 40) * 20;
    return (
      <div key={i} style={{ position: "absolute", left: x, top: y, fontSize: boy, opacity: 0.22, transform: `rotate(${don}deg)` }}>
        {emojiler[i % emojiler.length]}
      </div>
    );
  });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(${aci}deg, ${renk1}, ${renk2})`, overflow: "hidden" }}>
      {parcalar}
    </AbsoluteFill>
  );
};

export const Kart: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      background: "white",
      borderRadius: 48,
      padding: "48px 52px",
      boxShadow: "0 24px 0 rgba(0,0,0,0.12), 0 30px 60px rgba(0,0,0,0.18)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Hap: React.FC<{ children: React.ReactNode; renk?: string; arka?: string; style?: React.CSSProperties }> = ({
  children,
  renk = "white",
  arka = "rgba(0,0,0,0.25)",
  style,
}) => (
  <div
    style={{
      display: "inline-block",
      padding: "12px 34px",
      borderRadius: 999,
      background: arka,
      color: renk,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 44,
      letterSpacing: 2,
      ...style,
    }}
  >
    {children}
  </div>
);

export const HarfDairesi: React.FC<{ harf: string; renk: string; boy?: number }> = ({ harf, renk, boy = 96 }) => (
  <div
    style={{
      width: boy,
      height: boy,
      borderRadius: boy,
      background: renk,
      color: "white",
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: boy * 0.55,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.18)",
    }}
  >
    {harf}
  </div>
);

export const solma = (frame: number, toplam: number, kenar = 6) =>
  interpolate(frame, [0, kenar, toplam - kenar, toplam], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
