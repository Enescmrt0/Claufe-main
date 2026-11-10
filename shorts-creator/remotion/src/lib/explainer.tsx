// Explainer kit — shared pieces for the "what X does to your brain/body" shorts
// (short-17 onward). Frame-based only; every component is safe to mount inside a <Sequence>.
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { EASE_OUT, prog } from './shorts';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../fonts';

export const DIM = 'rgba(255,255,255,0.55)';

export const sec = (s: number) => Math.round(s * 30);
export const seq = (a: number, b: number) => ({ from: sec(a), durationInFrames: sec(b) - sec(a) });

export const FadeIn: React.FC<{ children: React.ReactNode; dur?: number }> = ({ children, dur = 8 }) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{ opacity: prog(frame, 0, dur) }}>{children}</AbsoluteFill>;
};

export const Label: React.FC<{ text: string; y: number; color?: string; size?: number; at?: number; mono?: boolean }> = ({
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

export const Chip: React.FC<{ text: string; color: string; x: number; y: number; at: number; size?: number }> = ({
  text,
  color,
  x,
  y,
  at,
  size = 40,
}) => {
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
        padding: '16px 34px',
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

// Horizontal meter: label on top, bar filled to `value` (0..1), optional right-hand note.
export const Meter: React.FC<{ y: number; label: string; value: number; color: string; note?: string; x?: number; w?: number }> = ({
  y,
  label,
  value,
  color,
  note,
  x = 120,
  w = 840,
}) => (
  <div style={{ position: 'absolute', left: x, width: w, top: y }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
      <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 42, color }}>{label}</span>
      {note ? <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 34, color: DIM }}>{note}</span> : null}
    </div>
    <div style={{ height: 48, borderRadius: 24, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
      <div style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%`, height: '100%', background: color, borderRadius: 24 }} />
    </div>
  </div>
);

const BRAIN_PATH =
  'M 150 30 C 110 0 40 10 30 70 C 0 90 5 160 50 180 C 60 225 130 230 150 200 C 170 230 240 225 250 180 C 295 160 300 90 270 70 C 260 10 190 0 150 30 Z';

// Brain with brightness (lit 0..1) and outer glow (0..1). `id` must be unique per mounted brain.
export const Brain: React.FC<{ id: string; x: number; y: number; size?: number; lit?: number; color: string; glow?: number; fill?: string }> = ({
  id,
  x,
  y,
  size = 360,
  lit = 1,
  color,
  glow = 0,
  fill = '#1a1a2a',
}) => (
  <div style={{ position: 'absolute', left: x - size / 2, top: y - size * 0.4 }}>
    <svg width={size} height={size * 0.8} viewBox="0 0 300 240" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={22} />
        </filter>
      </defs>
      <ellipse cx={150} cy={120} rx={150} ry={110} fill={color} opacity={0.7 * glow} filter={`url(#${id}-glow)`} />
      <path d={BRAIN_PATH} fill={fill} />
      <path d={BRAIN_PATH} fill={color} opacity={0.3 * lit} />
      <path d={BRAIN_PATH} fill="none" stroke={color} strokeWidth={8} opacity={0.35 + 0.65 * lit} />
      <path d="M 150 30 L 150 200" stroke={color} strokeWidth={5} opacity={0.25 + 0.4 * lit} />
      <path
        d="M 70 80 q 30 20 0 50 M 230 80 q -30 20 0 50 M 95 150 q 25 -10 40 10 M 205 150 q -25 -10 -40 10"
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.2 + 0.35 * lit}
      />
    </svg>
  </div>
);

// A pulse travelling along a wavy vertical nerve from (x, y1) to (x, y2); t in 0..1.
export const Nerve: React.FC<{ x: number; y1: number; y2: number; color: string; t: number; wiggle?: number }> = ({ x, y1, y2, color, t, wiggle = 36 }) => {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const k = i / 40;
    return [x + Math.sin(k * Math.PI * 3) * wiggle, y1 + (y2 - y1) * k];
  });
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'} ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  const [px, py] = pts[Math.min(40, Math.max(0, Math.round(t * 40)))];
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={10} strokeLinecap="round" />
      {t > 0 && t < 1 ? <circle cx={px} cy={py} r={24} fill={color} style={{ filter: `drop-shadow(0 0 16px ${color})` }} /> : null}
    </svg>
  );
};

// Small all-caps note above the captions (disclaimers, sources).
export const Footnote: React.FC<{ text: string; y?: number; at?: number }> = ({ text, y = 1250, at = 10 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: FONT_BODY,
        fontWeight: 500,
        fontSize: 28,
        letterSpacing: 2,
        color: 'rgba(255,255,255,0.6)',
        opacity: prog(frame, at, at + 14),
      }}
    >
      {text}
    </div>
  );
};

// A two-column checklist row (label + ✓/✗ cells), used for "has / lacks" comparisons.
export const CheckRow: React.FC<{ y: number; label: string; cells: boolean[]; at: number; good?: string; bad?: string; labelW?: number }> = ({
  y,
  label,
  cells,
  at,
  good = '#7ee08a',
  bad = '#ff6b6b',
  labelW = 420,
}) => {
  const frame = useCurrentFrame();
  const rowP = EASE_OUT(prog(frame, at - 4, at + 8));
  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        right: 90,
        top: y,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 22,
        background: 'rgba(255,255,255,0.06)',
        opacity: rowP,
        transform: `translateX(${(1 - rowP) * -40}px)`,
      }}
    >
      <div style={{ width: labelW, paddingLeft: 36, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 46, color: '#fff' }}>{label}</div>
      {cells.map((ok, i) => {
        const p = EASE_OUT(prog(frame, at + i * 8, at + i * 8 + 10));
        return (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 72, color: ok ? good : bad, opacity: p, transform: `scale(${0.6 + 0.4 * p})` }}>
            {ok ? '✓' : '✗'}
          </div>
        );
      })}
    </div>
  );
};
