import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import {
  BigTitle,
  Captions,
  EASE_INOUT,
  EASE_OUT,
  Kicker,
  ProgressBar,
  ShortsBackdrop,
  VoLine,
  prog,
} from '../../lib/shorts';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short13Weed',
  durationInSeconds: 38.6,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#0d1512';
const GLOW = '#163328';
const LEAF = '#7ee08a'; // THC / accent
const BLISS = '#f5c76e'; // anandamide (the body's own key)
const DOPA = '#ff7aa8'; // dopamine
const BRAKE = '#6ea8ff'; // GABA brake
const DIM = 'rgba(255,255,255,0.55)';

const sec = (s: number) => Math.round(s * 30);

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-13-weed/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'Why does weed get you high?', start: 0.30, end: 1.71 },
  { text: 'It comes down to one molecule: THC.', start: 2.80, end: 5.42 },
  { text: 'Your brain already has locks for it: CB1 receptors.', start: 6.30, end: 9.88 },
  { text: 'Normally, your own key fits them. Anandamide, the bliss molecule.', start: 10.20, end: 14.19 },
  { text: 'THC is a copycat. It fits the same lock.', start: 14.90, end: 17.97 },
  { text: 'It releases the brake on your reward system,', start: 18.90, end: 21.29 },
  { text: "and dopamine floods in. That's the high.", start: 21.50, end: 23.87 },
  { text: 'CB1 locks are everywhere, so everything shifts.', start: 24.90, end: 28.10 },
  { text: 'Your own key is cleared in minutes. THC lingers for hours.', start: 29.90, end: 33.57 },
  { text: 'Not a hack. Your own system, turned way up.', start: 34.60, end: 37.10 },
];

// =============================================================================
// SHARED PIECES
// =============================================================================
const FadeIn: React.FC<{ children: React.ReactNode; dur?: number; outAt?: number }> = ({ children, dur = 8, outAt }) => {
  const frame = useCurrentFrame();
  const out = outAt === undefined ? 1 : 1 - prog(frame, outAt, outAt + 8);
  return <AbsoluteFill style={{ opacity: prog(frame, 0, dur) * out }}>{children}</AbsoluteFill>;
};

const Label: React.FC<{ text: string; x: number; y: number; color?: string; size?: number; at?: number; mono?: boolean }> = ({
  text,
  x,
  y,
  color = '#ffffff',
  size = 40,
  at = 0,
  mono = false,
}) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, at, at + 12));
  return (
    <div
      style={{
        position: 'absolute',
        left: x - 400,
        width: 800,
        top: y,
        textAlign: 'center',
        fontFamily: mono ? FONT_MONO : FONT_DISPLAY,
        fontWeight: 700,
        fontSize: size,
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 14}px)`,
        textShadow: '0 3px 20px rgba(0,0,0,0.6)',
      }}
    >
      {text}
    </div>
  );
};

// pointy-top hexagon
const hex = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

// Simplified THC skeleton: three fused rings + a pentyl tail, drawn on.
const Molecule: React.FC<{ color: string; draw: number; scale?: number }> = ({ color, draw, scale = 1 }) => {
  const r = 70;
  const w = r * Math.sqrt(3);
  const rings = [
    [0, 0],
    [w, 0],
    [w * 1.5, r * 1.5],
  ];
  const tail = `M ${w * 1.5 + w / 2} ${r * 1.5 + r / 2} l 50 30 l 50 -30 l 50 30 l 50 -30 l 50 30`;
  return (
    <svg width={630 * scale} height={280 * scale} viewBox="-130 -95 630 280" style={{ overflow: 'visible', display: 'block' }}>
      {rings.map(([cx, cy], i) => (
        <polygon
          key={i}
          points={hex(cx, cy, r)}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - prog(draw, i * 0.18, i * 0.18 + 0.45)}
        />
      ))}
      <path
        d={tail}
        fill="none"
        stroke={color}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - prog(draw, 0.55, 1)}
      />
      <text x={-r * 1.6} y={-r * 0.2} fill={color} fontSize={46} fontFamily={FONT_MONO} fontWeight={700} opacity={prog(draw, 0.7, 1)}>
        OH
      </text>
    </svg>
  );
};

// A receptor "lock": a U-shaped socket.
const Receptor: React.FC<{ glow: number; color?: string }> = ({ glow, color = LEAF }) => (
  <svg width={520} height={420} viewBox="0 0 520 420" style={{ overflow: 'visible' }}>
    <defs>
      <filter id="rglow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation={18 * glow} />
      </filter>
    </defs>
    <path
      d="M 40 40 L 40 300 Q 40 380 120 380 L 400 380 Q 480 380 480 300 L 480 40 L 360 40 L 360 250 L 160 250 L 160 40 Z"
      fill={color}
      opacity={0.55 * glow}
      filter="url(#rglow)"
    />
    <path
      d="M 40 40 L 40 300 Q 40 380 120 380 L 400 380 Q 480 380 480 300 L 480 40 L 360 40 L 360 250 L 160 250 L 160 40 Z"
      fill="#1b2a24"
      stroke={glow > 0.05 ? color : 'rgba(255,255,255,0.45)'}
      strokeWidth={8}
    />
    <text x={260} y={340} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize={44} fontFamily={FONT_MONO} fontWeight={700}>
      CB1
    </text>
  </svg>
);

const Key: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div
    style={{
      width: 180,
      height: 200,
      borderRadius: 26,
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: label.length > 4 ? 24 : 52,
      color: '#0d1512',
      boxShadow: `0 0 40px ${color}88`,
    }}
  >
    {label}
  </div>
);

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.05 * EASE_INOUT(prog(frame, 0, 120)) : 1.05 - 0.05 * EASE_INOUT(prog(frame, 0, 30));
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'WHY DOES WEED', color: '#ffffff' },
          { text: 'GET YOU HIGH?', color: LEAF },
        ]}
        subtitle="the brain science in 40 seconds"
        y={260}
        size={104}
        warm={!loop}
      />
      <div style={{ position: 'absolute', left: 540 - 630 * 0.6, top: 780 }}>
        <Molecule color={LEAF} draw={loop ? 1 : prog(frame, 0, 60)} scale={1.2} />
      </div>
    </AbsoluteFill>
  );
};

const ThcScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FadeIn>
      <Kicker text="MEET THC" color={LEAF} at={4} />
      <div style={{ position: 'absolute', left: 540 - 630 * 0.6, top: 480, transform: `scale(${0.95 + 0.05 * EASE_OUT(prog(frame, 0, 40))})` }}>
        <Molecule color={LEAF} draw={1} scale={1.2} />
      </div>
      <Label text="THC" x={540} y={900} size={120} color={LEAF} at={10} />
      <Label text="Δ9-tetrahydrocannabinol" x={540} y={1040} size={38} color={DIM} at={22} mono />
    </FadeIn>
  );
};

const LockScene: React.FC = () => {
  const frame = useCurrentFrame();
  // anandamide key drops into the lock at ~4.2s into the scene
  const drop = EASE_OUT(prog(frame, sec(5.4), sec(6.2)));
  const glow = prog(frame, sec(6.1), sec(6.7));
  return (
    <FadeIn>
      <Kicker text="YOUR BRAIN HAS LOCKS" color={LEAF} at={4} />
      <AbsoluteFill style={{ alignItems: 'center', top: 620 }}>
        <Receptor glow={glow} color={BLISS} />
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 450, top: 330 + drop * 360, opacity: prog(frame, sec(4.6), sec(5.2)) }}>
        <Key label="ANANDAMIDE" color={BLISS} />
      </div>
      <Label text="your body's own key" x={540} y={1110} size={40} color={BLISS} at={sec(6.5)} />
    </FadeIn>
  );
};

const CopycatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fly = EASE_INOUT(prog(frame, sec(1.0), sec(2.2)));
  const glow = prog(frame, sec(2.1), sec(2.7));
  const pulse = glow * (0.85 + 0.15 * Math.sin(frame / 4));
  return (
    <FadeIn>
      <Kicker text="THC IS A COPYCAT" color={LEAF} at={4} />
      <AbsoluteFill style={{ alignItems: 'center', top: 620 }}>
        <Receptor glow={pulse} color={LEAF} />
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: 450 + (1 - fly) * 330,
          top: 690 - (1 - fly) * 420,
          transform: `rotate(${(1 - fly) * 35}deg)`,
        }}
      >
        <Key label="THC" color={LEAF} />
      </div>
      <Label text="same lock · different key" x={540} y={1110} size={40} color={LEAF} at={sec(2.6)} />
    </FadeIn>
  );
};

// Brake (GABA) lifts -> dopamine burst.
const DopamineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const lift = EASE_OUT(prog(frame, sec(1.0), sec(2.0)));
  const burst = prog(frame, sec(3.2), sec(5.6));
  const dots = Array.from({ length: 46 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const d = 60 + ((i * 53) % 260);
    return { x: Math.cos(a) * d, y: Math.sin(a) * d * 0.8, delay: (i % 9) * 0.05 };
  });
  return (
    <FadeIn>
      <Kicker text="RELEASE THE BRAKE" color={DOPA} at={4} />
      {/* reward neuron */}
      <div
        style={{
          position: 'absolute',
          left: 540 - 130,
          top: 760 - 130,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${DOPA}${burst > 0 ? 'cc' : '55'} 0%, ${DOPA}22 70%)`,
          border: `6px solid ${DOPA}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 34,
          color: '#fff',
          textAlign: 'center',
        }}
      >
        REWARD
        <br />
        NEURON
      </div>
      {/* GABA brake bar */}
      <div
        style={{
          position: 'absolute',
          left: 540 - 220,
          top: 560 - lift * 260,
          width: 440,
          height: 70,
          borderRadius: 18,
          background: BRAKE,
          opacity: 1 - lift * 0.75,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 34,
          color: '#0d1512',
          transform: `rotate(${-lift * 12}deg)`,
        }}
      >
        GABA BRAKE
      </div>
      {/* dopamine dots */}
      {dots.map((d, i) => {
        const p = EASE_OUT(prog(burst, d.delay, d.delay + 0.6));
        if (p <= 0) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 540 + d.x * p * 1.5 - 13,
              top: 760 + d.y * p * 1.5 - 13,
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: DOPA,
              opacity: 1 - 0.4 * p,
              boxShadow: `0 0 18px ${DOPA}`,
            }}
          />
        );
      })}
      <Label text="DOPAMINE ↑" x={540} y={1130} size={72} color={DOPA} at={sec(3.4)} />
    </FadeIn>
  );
};

const REGIONS: { name: string; effect: string; color: string }[] = [
  { name: 'Reward circuit', effect: 'euphoria', color: DOPA },
  { name: 'Hippocampus', effect: 'short-term memory blurs', color: BLISS },
  { name: 'Cerebellum', effect: 'coordination slips', color: BRAKE },
  { name: 'Hypothalamus', effect: 'the munchies', color: LEAF },
];

const RegionsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FadeIn>
      <Kicker text="WHERE IT HITS" color={LEAF} at={4} />
      {REGIONS.map((r, i) => {
        const p = EASE_OUT(prog(frame, 14 + i * 22, 30 + i * 22));
        return (
          <div
            key={r.name}
            style={{
              position: 'absolute',
              left: 90,
              right: 90,
              top: 400 + i * 190,
              height: 150,
              borderRadius: 26,
              background: 'rgba(255,255,255,0.06)',
              borderLeft: `14px solid ${r.color}`,
              padding: '0 40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              opacity: p,
              transform: `translateX(${(1 - p) * -60}px)`,
            }}
          >
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 52, color: r.color }}>{r.name}</div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 38, color: 'rgba(255,255,255,0.85)' }}>→ {r.effect}</div>
          </div>
        );
      })}
    </FadeIn>
  );
};

const LastsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = EASE_INOUT(prog(frame, 16, 80));
  const Bar: React.FC<{ y: number; label: string; sub: string; color: string; frac: number }> = ({ y, label, sub, color, frac }) => (
    <div style={{ position: 'absolute', left: 90, right: 90, top: y }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 50, color }}>{label}</div>
      <div style={{ marginTop: 16, height: 54, borderRadius: 27, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div style={{ width: `${frac * 100}%`, height: '100%', background: color, borderRadius: 27 }} />
      </div>
      <div style={{ marginTop: 12, fontFamily: FONT_MONO, fontWeight: 500, fontSize: 34, color: DIM }}>{sub}</div>
    </div>
  );
  return (
    <FadeIn>
      <Kicker text="WHY IT LASTS" color={LEAF} at={4} />
      <Bar y={480} label="ANANDAMIDE" sub="broken down by FAAH · minutes" color={BLISS} frac={0.08 * grow} />
      <Bar y={800} label="THC" sub="lingers · hours" color={LEAF} frac={0.92 * grow} />
    </FadeIn>
  );
};

const Disclaimer: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: 1270,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: FONT_BODY,
        fontWeight: 500,
        fontSize: 28,
        letterSpacing: 2,
        color: 'rgba(255,255,255,0.6)',
        opacity: prog(frame, 10, 24),
      }}
    >
      EDUCATION ONLY · EFFECTS VARY · FOLLOW LOCAL LAWS
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short13Weed: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence from={0} durationInFrames={sec(2.6)}>
      <HookScene />
    </Sequence>
    <Sequence from={sec(2.6)} durationInFrames={sec(3.4)}>
      <ThcScene />
    </Sequence>
    <Sequence from={sec(6.0)} durationInFrames={sec(8.6)}>
      <LockScene />
    </Sequence>
    <Sequence from={sec(14.6)} durationInFrames={sec(4.0)}>
      <CopycatScene />
    </Sequence>
    <Sequence from={sec(18.6)} durationInFrames={sec(6.0)}>
      <DopamineScene />
    </Sequence>
    <Sequence from={sec(24.6)} durationInFrames={sec(5.0)}>
      <RegionsScene />
    </Sequence>
    <Sequence from={sec(29.6)} durationInFrames={sec(4.6)}>
      <LastsScene />
    </Sequence>
    <Sequence from={sec(34.2)} durationInFrames={sec(4.4)}>
      <HookScene loop />
      <Disclaimer />
    </Sequence>
    <Captions lines={LINES} y={1400} accent={LEAF} />
    <ProgressBar color={LEAF} />
  </AbsoluteFill>
);

export default Short13Weed;
