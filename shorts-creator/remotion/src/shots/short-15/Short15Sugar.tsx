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
  id: 'Short15Sugar',
  durationInSeconds: 38,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#160f1a';
const GLOW = '#3a1f3f';
const PINK = '#ff8fc7'; // accent
const SUGAR = '#fff3e6';
const GOLD = '#f5c76e';
const DOPA = '#ff7aa8';
const GREEN = '#7ee08a';
const BLUE = '#6ea8ff';
const RED = '#ff6b6b';
const DIM = 'rgba(255,255,255,0.55)';

const sec = (s: number) => Math.round(s * 30);

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-15-sugar/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'Why do we love sugar so much?', start: 0.3, end: 1.96 },
  { text: 'For most of human history, sweet meant one thing: safe, fast energy.', start: 2.3, end: 6.4 },
  { text: 'Ripe fruit was rare, so your brain learned to want it badly.', start: 6.75, end: 9.76 },
  { text: 'Sugar hits the sweet receptors on your tongue, and your brain releases dopamine.', start: 10.1, end: 14.41 },
  { text: "But here's the twist. Your gut can sense sugar too, and it messages your brain in seconds.", start: 14.75, end: 19.81 },
  { text: "That's one reason sweeteners never feel quite the same. Your gut can tell.", start: 20.15, end: 24.1 },
  { text: 'Then comes the spike. Blood sugar rises, insulin pulls it down, and you can crash.', start: 24.45, end: 29.49 },
  { text: 'The crash makes you crave more, and the loop starts again.', start: 29.85, end: 32.73 },
  { text: 'Your brain is running ancient software, in a world full of candy.', start: 33.1, end: 36.6 },
];

const T = {
  hook: 0,
  ancient: 2.2,
  rare: 6.65,
  tongue: 10.0,
  gut: 14.65,
  sweetener: 20.05,
  spike: 24.35,
  loop: 29.75,
  final: 33.0,
  end: 38.0,
};

// =============================================================================
// SHARED PIECES
// =============================================================================
const FadeIn: React.FC<{ children: React.ReactNode; dur?: number }> = ({ children, dur = 8 }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: prog(frame, 0, dur) }}>{children}</AbsoluteFill>;
};

const Label: React.FC<{ text: string; y: number; color?: string; size?: number; at?: number; mono?: boolean }> = ({
  text,
  y,
  color = '#ffffff',
  size = 44,
  at = 0,
  mono = false,
}) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, at, at + 12));
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
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

const Chip: React.FC<{ text: string; color: string; x: number; y: number; at: number; size?: number }> = ({ text, color, x, y, at, size = 42 }) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, at, at + 10));
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, 0) scale(${0.85 + 0.15 * p})`,
        opacity: p,
        padding: '18px 36px',
        borderRadius: 999,
        border: `3px solid ${color}`,
        background: `${color}22`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: size,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

// Isometric sugar cube with sparkles.
const SugarCube: React.FC<{ x: number; y: number; size?: number; draw?: number }> = ({ x, y, size = 260, draw = 1 }) => {
  const frame = useCurrentFrame();
  const s = size;
  const h = s * 0.5;
  const top = `${s / 2},0 ${s},${h / 2} ${s / 2},${h} 0,${h / 2}`;
  const left = `0,${h / 2} ${s / 2},${h} ${s / 2},${h + s * 0.62} 0,${h / 2 + s * 0.62}`;
  const right = `${s},${h / 2} ${s / 2},${h} ${s / 2},${h + s * 0.62} ${s},${h / 2 + s * 0.62}`;
  const sparkles = [
    [-0.25, 0.1, 0],
    [1.2, 0.0, 0.33],
    [1.05, 0.95, 0.66],
    [-0.15, 0.9, 0.5],
  ];
  const bob = Math.sin(frame / 18) * 10;
  return (
    <div style={{ position: 'absolute', left: x - s / 2, top: y + bob, opacity: draw, transform: `scale(${0.8 + 0.2 * EASE_OUT(draw)})` }}>
      <svg width={s} height={h + s * 0.62} style={{ overflow: 'visible', display: 'block' }}>
        <polygon points={top} fill={SUGAR} stroke="#e9d6c4" strokeWidth={4} strokeLinejoin="round" />
        <polygon points={left} fill="#ecdccb" stroke="#e0cbb6" strokeWidth={4} strokeLinejoin="round" />
        <polygon points={right} fill="#d9c4ae" stroke="#cdb59c" strokeWidth={4} strokeLinejoin="round" />
        {sparkles.map(([sx, sy, ph], i) => {
          const tw = 0.5 + 0.5 * Math.sin(frame / 7 + ph * 6.28);
          const r = 18 * tw + 6;
          const cx = sx * s;
          const cy = sy * (h + s * 0.62);
          return (
            <path
              key={i}
              d={`M ${cx} ${cy - r} L ${cx + r * 0.25} ${cy - r * 0.25} L ${cx + r} ${cy} L ${cx + r * 0.25} ${cy + r * 0.25} L ${cx} ${cy + r} L ${cx - r * 0.25} ${cy + r * 0.25} L ${cx - r} ${cy} L ${cx - r * 0.25} ${cy - r * 0.25} Z`}
              fill={PINK}
              opacity={0.4 + 0.6 * tw}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Simple brain blob (two hemispheres) with optional glow.
const Brain: React.FC<{ x: number; y: number; glow?: number; size?: number }> = ({ x, y, glow = 0, size = 300 }) => (
  <div style={{ position: 'absolute', left: x - size / 2, top: y - size * 0.4 }}>
    <svg width={size} height={size * 0.8} viewBox="0 0 300 240" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <filter id="bglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={20} />
        </filter>
      </defs>
      <ellipse cx={150} cy={120} rx={150} ry={110} fill={DOPA} opacity={0.6 * glow} filter="url(#bglow)" />
      <path
        d="M 150 30 C 110 0 40 10 30 70 C 0 90 5 160 50 180 C 60 225 130 230 150 200 C 170 230 240 225 250 180 C 295 160 300 90 270 70 C 260 10 190 0 150 30 Z"
        fill="#3b2140"
        stroke={glow > 0.05 ? DOPA : 'rgba(255,255,255,0.6)'}
        strokeWidth={8}
      />
      <path d="M 150 30 L 150 200" stroke={glow > 0.05 ? DOPA : 'rgba(255,255,255,0.45)'} strokeWidth={6} />
      <path d="M 70 80 q 30 20 0 50 M 230 80 q -30 20 0 50 M 95 150 q 25 -10 40 10 M 205 150 q -25 -10 -40 10" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={6} strokeLinecap="round" />
    </svg>
  </div>
);

// A pulse travelling along a vertical nerve from (x, y1) up to (x, y2).
const Nerve: React.FC<{ x: number; y1: number; y2: number; color: string; t: number; wiggle?: number }> = ({ x, y1, y2, color, t, wiggle = 40 }) => {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const k = i / 40;
    return [x + Math.sin(k * Math.PI * 3) * wiggle, y1 + (y2 - y1) * k];
  });
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'} ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  const idx = Math.min(40, Math.max(0, Math.round(t * 40)));
  const [px, py] = pts[idx];
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={10} strokeLinecap="round" />
      {t > 0 && t < 1 ? <circle cx={px} cy={py} r={24} fill={color} style={{ filter: `drop-shadow(0 0 16px ${color})` }} /> : null}
    </svg>
  );
};

const DopamineBurst: React.FC<{ x: number; y: number; t: number }> = ({ x, y, t }) => {
  if (t <= 0) return null;
  return (
    <>
      {Array.from({ length: 30 }, (_, i) => {
        const a = (i * 137.5 * Math.PI) / 180;
        const d = 60 + ((i * 47) % 200);
        const p = EASE_OUT(prog(t, (i % 6) * 0.05, (i % 6) * 0.05 + 0.6));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x + Math.cos(a) * d * p - 12,
              top: y + Math.sin(a) * d * 0.8 * p - 12,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: DOPA,
              opacity: p * (1 - 0.4 * p),
              boxShadow: `0 0 16px ${DOPA}`,
            }}
          />
        );
      })}
    </>
  );
};

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.05 * EASE_INOUT(prog(frame, 0, 140)) : 1.05 - 0.05 * EASE_INOUT(prog(frame, 0, 30));
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'WHY DO WE', color: '#ffffff' },
          { text: 'LOVE SUGAR?', color: PINK },
        ]}
        subtitle="your brain's oldest craving"
        y={260}
        size={118}
        warm={!loop}
      />
      <SugarCube x={540} y={720} size={300} draw={loop ? 1 : prog(frame, 0, 18)} />
    </AbsoluteFill>
  );
};

const AncientScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sun = EASE_OUT(prog(frame, 0, 30));
  return (
    <FadeIn>
      <Kicker text="100,000 YEARS AGO" color={GOLD} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <circle cx={800} cy={480 - sun * 60} r={90} fill={GOLD} opacity={0.9} />
        <path d="M 0 900 Q 270 840 540 880 T 1080 870 L 1080 1000 L 0 1000 Z" fill="#2c2233" />
        {/* tree */}
        <rect x={300} y={600} width={40} height={290} rx={10} fill="#6b4a32" />
        <ellipse cx={320} cy={580} rx={170} ry={120} fill="#2f5d3a" />
        {[
          [250, 560],
          [380, 600],
          [320, 520],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={22} fill={RED} opacity={prog(frame, 20 + i * 6, 30 + i * 6)} />
        ))}
      </svg>
      <Chip text="SWEET = SAFE, FAST ENERGY ⚡" color={GOLD} x={540} y={1060} at={sec(3.0)} size={40} />
    </FadeIn>
  );
};

const RareScene: React.FC = () => {
  const frame = useCurrentFrame();
  const want = EASE_INOUT(prog(frame, sec(1.6), sec(2.8)));
  const pulse = 1 + 0.08 * Math.sin(frame / 5) * prog(frame, 10, 30);
  return (
    <FadeIn>
      <Kicker text="RIPE FRUIT WAS RARE" color={GOLD} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <rect x={520} y={560} width={40} height={300} rx={10} fill="#6b4a32" />
        <ellipse cx={540} cy={540} rx={250} ry={150} fill="#2f5d3a" />
        <ellipse cx={540} cy={540} rx={250} ry={150} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={6} />
        <g transform={`translate(640 580) scale(${pulse})`}>
          <circle r={34} fill={RED} style={{ filter: `drop-shadow(0 0 24px ${RED})` }} />
          <path d="M 0 -34 q 6 -20 20 -24" stroke="#4a8b4a" strokeWidth={6} fill="none" />
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 140, right: 140, top: 960 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, color: PINK, marginBottom: 14 }}>WANT IT</div>
        <div style={{ height: 48, borderRadius: 24, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ width: `${8 + 92 * want}%`, height: '100%', background: PINK, borderRadius: 24 }} />
        </div>
      </div>
    </FadeIn>
  );
};

const TongueScene: React.FC = () => {
  const frame = useCurrentFrame();
  const lit = prog(frame, sec(1.1), sec(1.5));
  const travel = prog(frame, sec(1.6), sec(3.0));
  const dopa = prog(frame, sec(3.6), sec(5.0));
  return (
    <FadeIn>
      <Kicker text="TONGUE → BRAIN" color={PINK} at={4} />
      <Brain x={540} y={420} glow={dopa} />
      <Nerve x={540} y1={1000} y2={560} color={PINK} t={travel} />
      {/* tongue */}
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <path d="M 340 1000 Q 340 1180 540 1190 Q 740 1180 740 1000 Z" fill="#e0708f" stroke="#ffb3c8" strokeWidth={8} />
        <path d="M 540 1010 L 540 1150" stroke="#c4566f" strokeWidth={6} strokeLinecap="round" />
        {[
          [430, 1050],
          [650, 1050],
          [470, 1120],
          [610, 1120],
          [540, 1040],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={14 + 6 * lit} fill={lit > 0.05 ? GOLD : '#ffc2d2'} style={{ filter: lit > 0.05 ? `drop-shadow(0 0 12px ${GOLD})` : 'none' }} />
        ))}
      </svg>
      <DopamineBurst x={540} y={420} t={dopa} />
      <Label text="DOPAMINE" y={700} color={DOPA} size={64} at={sec(3.8)} />
    </FadeIn>
  );
};

const GutScene: React.FC = () => {
  const frame = useCurrentFrame();
  const gutGlow = prog(frame, sec(1.4), sec(2.0));
  const travel = prog(frame, sec(3.3), sec(4.1));
  const brainGlow = prog(frame, sec(4.0), sec(4.5));
  // gut as a looping tube
  const gut = 'M 380 900 C 380 830 700 830 700 900 C 700 960 380 960 380 1020 C 380 1080 700 1080 700 1140 C 700 1200 460 1200 460 1160';
  return (
    <FadeIn>
      <Kicker text="THE TWIST" color={GREEN} at={4} />
      <Brain x={540} y={380} glow={brainGlow} size={260} />
      <Nerve x={540} y1={790} y2={500} color={GREEN} t={travel} wiggle={30} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: -70, overflow: 'visible' }}>
        <path d={gut} fill="none" stroke={gutGlow > 0.05 ? GREEN : '#b06a7c'} strokeWidth={56} strokeLinecap="round" opacity={0.95} style={{ filter: gutGlow > 0.05 ? `drop-shadow(0 0 ${24 * gutGlow}px ${GREEN})` : 'none' }} />
        <path d={gut} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={20} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', left: 600, top: 690, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: DIM, opacity: prog(frame, sec(3.0), sec(3.4)) }}>
        vagus nerve
      </div>
      <Chip text="YOUR GUT SENSES SUGAR" color={GREEN} x={540} y={1210} at={sec(1.6)} size={38} />
      <Label text="message sent in seconds" y={515} color={GREEN} size={36} at={sec(4.2)} />
    </FadeIn>
  );
};

const SweetenerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const Cell: React.FC<{ ok: boolean; at: number }> = ({ ok, at }) => {
    const p = EASE_OUT(prog(frame, at, at + 10));
    return (
      <div style={{ width: 220, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 80, color: ok ? GREEN : RED, opacity: p, transform: `scale(${0.6 + 0.4 * p})` }}>
        {ok ? '✓' : '✗'}
      </div>
    );
  };
  const Row: React.FC<{ y: number; label: string; a: boolean; b: boolean; at: number }> = ({ y, label, a, b, at }) => (
    <div style={{ position: 'absolute', left: 90, right: 90, top: y, height: 150, display: 'flex', alignItems: 'center', borderRadius: 24, background: 'rgba(255,255,255,0.06)' }}>
      <div style={{ width: 260, paddingLeft: 36, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 46, color: '#fff' }}>{label}</div>
      <Cell ok={a} at={at} />
      <Cell ok={b} at={at + 8} />
    </div>
  );
  return (
    <FadeIn>
      <Kicker text="SUGAR VS SWEETENER" color={PINK} at={4} />
      <div style={{ position: 'absolute', left: 350, top: 470, display: 'flex' }}>
        {['SUGAR', 'SWEETENER'].map((h, i) => (
          <div key={h} style={{ width: 220, textAlign: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: i ? 30 : 36, color: i ? BLUE : PINK }}>
            {h}
          </div>
        ))}
      </div>
      <Row y={560} label="TONGUE" a b at={sec(0.6)} />
      <Row y={750} label="GUT" a b={false} at={sec(2.8)} />
      <Label text="your gut can tell" y={1000} color={GREEN} size={52} at={sec(3.0)} />
    </FadeIn>
  );
};

const SpikeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 860;
  const H = 440;
  const base = 0.55;
  // blood sugar over time: flat, spike, insulin drop, undershoot (crash), recover
  const curve = (k: number) => {
    if (k < 0.15) return base;
    if (k < 0.35) return base + 0.4 * Math.sin(((k - 0.15) / 0.2) * (Math.PI / 2));
    if (k < 0.7) return base + 0.4 - 0.62 * EASE_INOUT((k - 0.35) / 0.35);
    return base - 0.22 + 0.16 * EASE_INOUT(Math.min(1, (k - 0.7) / 0.3));
  };
  const pts = Array.from({ length: 81 }, (_, i) => [(i / 80) * W, H - curve(i / 80) * H]);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const draw = prog(frame, sec(0.6), sec(4.6));
  const peakX = 0.35 * W;
  const crashX = 0.7 * W;
  return (
    <FadeIn>
      <Kicker text="THE SPIKE" color={RED} at={4} />
      <div style={{ position: 'absolute', left: 110, top: 330 }}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: DIM, marginBottom: 10 }}>blood sugar</div>
        <svg width={W} height={H + 20} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={0} y1={H - base * H} x2={W} y2={H - base * H} stroke="rgba(255,255,255,0.25)" strokeWidth={4} strokeDasharray="14 12" />
          <path d={d} fill="none" stroke={PINK} strokeWidth={11} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
          <text x={peakX} y={H - (base + 0.4) * H - 30} textAnchor="middle" fill={PINK} fontSize={40} fontFamily={FONT_DISPLAY} fontWeight={700} opacity={prog(frame, sec(1.8), sec(2.2))}>
            SPIKE
          </text>
          <text x={crashX} y={H - (base - 0.22) * H + 70} textAnchor="middle" fill={RED} fontSize={44} fontFamily={FONT_DISPLAY} fontWeight={700} opacity={prog(frame, sec(4.2), sec(4.6))}>
            CRASH
          </text>
        </svg>
      </div>
      <Chip text="INSULIN ↓" color={BLUE} x={600} y={900} at={sec(2.9)} />
    </FadeIn>
  );
};

const LoopScene: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = [
    { t: 'SUGAR', c: PINK },
    { t: 'SPIKE', c: GOLD },
    { t: 'CRASH', c: RED },
    { t: 'CRAVING', c: DOPA },
  ];
  const R = 300;
  const cx = 540;
  const cy = 760;
  const spin = (frame / 30) * 40;
  return (
    <FadeIn>
      <Kicker text="THE LOOP" color={PINK} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={10} />
        <g transform={`rotate(${spin} ${cx} ${cy})`}>
          <path d={`M ${cx + R} ${cy} l -22 -30 m 22 30 l 26 -26`} stroke={PINK} strokeWidth={10} fill="none" strokeLinecap="round" />
          <path d={`M ${cx - R} ${cy} l 22 30 m -22 -30 l -26 26`} stroke={PINK} strokeWidth={10} fill="none" strokeLinecap="round" />
        </g>
      </svg>
      {nodes.map((n, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 2;
        const p = EASE_OUT(prog(frame, 6 + i * 9, 16 + i * 9));
        return (
          <div
            key={n.t}
            style={{
              position: 'absolute',
              left: cx + Math.cos(a) * R,
              top: cy + Math.sin(a) * R,
              transform: `translate(-50%, -50%) scale(${0.6 + 0.4 * p})`,
              opacity: p,
              padding: '18px 30px',
              borderRadius: 999,
              background: '#1f1424',
              border: `4px solid ${n.c}`,
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 40,
              color: n.c,
              whiteSpace: 'nowrap',
            }}
          >
            {n.t}
          </div>
        );
      })}
    </FadeIn>
  );
};

const FinalCaption: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: 1250,
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
      ANCIENT SOFTWARE · MODERN CANDY STORE
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const seq = (a: number, b: number) => ({ from: sec(a), durationInFrames: sec(b) - sec(a) });

const Short15Sugar: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.ancient)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.ancient, T.rare)}>
      <AncientScene />
    </Sequence>
    <Sequence {...seq(T.rare, T.tongue)}>
      <RareScene />
    </Sequence>
    <Sequence {...seq(T.tongue, T.gut)}>
      <TongueScene />
    </Sequence>
    <Sequence {...seq(T.gut, T.sweetener)}>
      <GutScene />
    </Sequence>
    <Sequence {...seq(T.sweetener, T.spike)}>
      <SweetenerScene />
    </Sequence>
    <Sequence {...seq(T.spike, T.loop)}>
      <SpikeScene />
    </Sequence>
    <Sequence {...seq(T.loop, T.final)}>
      <LoopScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <FinalCaption />
    </Sequence>
    <Captions lines={LINES} y={1420} accent={PINK} />
    <ProgressBar color={PINK} />
  </AbsoluteFill>
);

export default Short15Sugar;
