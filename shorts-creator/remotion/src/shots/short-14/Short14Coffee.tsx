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
  id: 'Short14Coffee',
  durationInSeconds: 45.6,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#15100c';
const GLOW = '#3a2616';
const COFFEE = '#c8894a'; // accent
const CREAM = '#f3d9b1';
const ADEN = '#f5c76e'; // adenosine (tiredness)
const CAF = '#8b5a2b'; // caffeine blocker
const RED = '#ff6b6b';
const GREEN = '#7ee08a';
const BLUE = '#6ea8ff';
const DIM = 'rgba(255,255,255,0.55)';

const sec = (s: number) => Math.round(s * 30);

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-14-coffee/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What happens when you quit coffee for thirty days?', start: 0.3, end: 2.67 },
  { text: "Caffeine works by blocking adenosine, your brain's tiredness signal.", start: 3.0, end: 6.99 },
  { text: 'Drink it every day, and your brain grows extra adenosine receptors to fight back.', start: 7.3, end: 12.04 },
  { text: 'Hour twelve. The caffeine is gone, and all those receptors light up at once.', start: 12.4, end: 16.69 },
  { text: 'Day one to two: headache, brain fog, and pure exhaustion. This is the peak.', start: 17.0, end: 21.57 },
  { text: 'Why the headache? Caffeine squeezes the blood vessels in your brain. Now they open back up.', start: 21.9, end: 26.96 },
  { text: 'Day nine. Withdrawal is mostly over, and your brain starts removing the extra receptors.', start: 27.3, end: 32.72 },
  { text: 'Week two. Deeper sleep. Caffeine was quietly cutting your deep sleep short.', start: 33.0, end: 37.08 },
  { text: 'Day thirty. Steady energy, no afternoon crash. Your baseline is back.', start: 37.4, end: 41.43 },
  { text: 'And your next cup? It hits like the very first one.', start: 41.8, end: 44.45 },
];

// Scene boundaries (seconds)
const T = {
  hook: 0,
  block: 2.9,
  grow: 7.2,
  hour12: 12.3,
  peak: 16.9,
  vessel: 21.8,
  day9: 27.2,
  sleep: 32.9,
  day30: 37.3,
  final: 41.7,
  end: 45.6,
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

const Chip: React.FC<{ text: string; color: string; x: number; y: number; at: number }> = ({ text, color, x, y, at }) => {
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
        padding: '18px 34px',
        borderRadius: 999,
        border: `3px solid ${color}`,
        background: `${color}22`,
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: 40,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

// Coffee mug with rising steam.
const Mug: React.FC<{ y: number; draw?: number; scale?: number }> = ({ y, draw = 1, scale = 1 }) => {
  const frame = useCurrentFrame();
  const steam = [0, 1, 2].map((i) => {
    const t = (frame / 45 + i / 3) % 1;
    return { x: 150 + i * 60, off: -t * 70, o: Math.sin(t * Math.PI) * 0.8 };
  });
  return (
    <div style={{ position: 'absolute', left: 540 - 210 * scale, top: y }}>
      <svg width={420 * scale} height={420 * scale} viewBox="0 0 420 420" style={{ overflow: 'visible', display: 'block' }}>
        {steam.map((s, i) => (
          <path
            key={i}
            d={`M ${s.x} ${130 + s.off} q 22 -30 0 -60 q -22 -30 0 -60`}
            fill="none"
            stroke={CREAM}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={s.o * draw}
          />
        ))}
        <path
          d="M 80 160 L 320 160 L 300 360 Q 296 390 266 390 L 134 390 Q 104 390 100 360 Z"
          fill={COFFEE}
          stroke={CREAM}
          strokeWidth={10}
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - prog(draw, 0, 0.7)}
          fillOpacity={prog(draw, 0.5, 1)}
        />
        <path
          d="M 316 200 Q 390 200 384 262 Q 378 320 306 316"
          fill="none"
          stroke={CREAM}
          strokeWidth={14}
          strokeLinecap="round"
          opacity={prog(draw, 0.6, 1)}
        />
        <ellipse cx={200} cy={172} rx={108} ry={14} fill="#5a3517" opacity={prog(draw, 0.6, 1)} />
      </svg>
    </div>
  );
};

// One adenosine receptor: a socket that can hold caffeine (square) or adenosine (circle).
type Occupant = 'none' | 'caf' | 'aden';
const Receptor: React.FC<{
  x: number;
  y: number;
  appear?: number; // 0..1
  occupant?: Occupant;
  occ?: number; // 0..1 drop-in progress
  glow?: number;
}> = ({ x, y, appear = 1, occupant = 'none', occ = 1, glow = 0 }) => {
  if (appear <= 0.01) return null;
  const s = EASE_OUT(appear);
  const glowColor = occupant === 'aden' ? ADEN : COFFEE;
  return (
    <div style={{ position: 'absolute', left: x - 80, top: y - 60, width: 160, height: 120, transform: `scale(${s})`, opacity: s }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 26,
          background: '#2a1e15',
          border: `5px solid ${glow > 0.05 ? glowColor : 'rgba(255,255,255,0.35)'}`,
          boxShadow: glow > 0.05 ? `0 0 ${40 * glow}px ${glowColor}` : 'none',
        }}
      />
      {/* socket notch */}
      <div style={{ position: 'absolute', left: 50, top: -5, width: 60, height: 60, background: BASE, borderRadius: '0 0 14px 14px' }} />
      {occupant !== 'none' && occ > 0.01 ? (
        <div
          style={{
            position: 'absolute',
            left: 55,
            top: 2 - (1 - EASE_OUT(occ)) * 140,
            width: 50,
            height: 50,
            borderRadius: occupant === 'aden' ? '50%' : 10,
            background: occupant === 'aden' ? ADEN : CAF,
            border: occupant === 'caf' ? `3px solid ${CREAM}` : 'none',
            opacity: Math.min(1, occ * 2),
            boxShadow: occupant === 'aden' ? `0 0 20px ${ADEN}` : 'none',
          }}
        />
      ) : null}
    </div>
  );
};

// 12-cell receptor grid: the middle row (indices 4..7) is the "original" set; the rest are extras.
const GRID = Array.from({ length: 12 }, (_, i) => {
  const r = Math.floor(i / 4);
  const c = i % 4;
  return { i, x: 540 + (c - 1.5) * 220, y: 560 + r * 200, extra: r !== 1 };
});

const Legend: React.FC<{ y: number; at?: number }> = ({ y, at = 0 }) => {
  const frame = useCurrentFrame();
  const o = prog(frame, at, at + 10);
  const Item: React.FC<{ shape: 'circle' | 'square'; color: string; text: string }> = ({ shape, color, text }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 34, height: 34, borderRadius: shape === 'circle' ? '50%' : 8, background: color, border: shape === 'square' ? `3px solid ${CREAM}` : 'none' }} />
      <span style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 32, color: 'rgba(255,255,255,0.85)' }}>{text}</span>
    </div>
  );
  return (
    <div style={{ position: 'absolute', top: y, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 50, opacity: o }}>
      <Item shape="circle" color={ADEN} text="adenosine = tired" />
      <Item shape="square" color={CAF} text="caffeine" />
    </div>
  );
};

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.05 * EASE_INOUT(prog(frame, 0, 110)) : 1.05 - 0.05 * EASE_INOUT(prog(frame, 0, 30));
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'QUIT COFFEE', color: '#ffffff' },
          { text: 'FOR 30 DAYS', color: COFFEE },
        ]}
        subtitle="here's what your brain does"
        y={260}
        size={112}
        warm={!loop}
      />
      <Mug y={640} draw={loop ? 1 : prog(frame, 0, 45)} scale={1.25} />
    </AbsoluteFill>
  );
};

const BlockScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cells = GRID.filter((g) => !g.extra);
  return (
    <FadeIn>
      <Kicker text="HOW CAFFEINE WORKS" color={COFFEE} at={4} />
      {cells.map((g, k) => (
        <Receptor key={g.i} x={g.x} y={760} occupant="caf" occ={prog(frame, sec(1.0) + k * 4, sec(1.6) + k * 4)} />
      ))}
      {/* adenosine bouncing off the blocked sockets */}
      {cells.map((g, k) => {
        const t = prog(frame, sec(2.0) + k * 5, sec(3.4) + k * 5);
        if (t <= 0) return null;
        const yy = 560 + Math.sin(t * Math.PI) * 110 - t * 90;
        return (
          <div
            key={`a${g.i}`}
            style={{ position: 'absolute', left: g.x - 25 + t * 40, top: yy, width: 50, height: 50, borderRadius: '50%', background: ADEN, opacity: 1 - t * 0.5, boxShadow: `0 0 20px ${ADEN}` }}
          />
        );
      })}
      <Legend y={940} at={6} />
      <Label text="tiredness signal: BLOCKED" y={1070} color={COFFEE} at={sec(2.4)} />
    </FadeIn>
  );
};

const GrowScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FadeIn>
      <Kicker text="YOUR BRAIN FIGHTS BACK" color={COFFEE} at={4} />
      {GRID.map((g, k) => {
        const appear = g.extra ? prog(frame, sec(2.4) + k * 3, sec(2.9) + k * 3) : 1;
        return <Receptor key={g.i} x={g.x} y={g.y} appear={appear} occupant="caf" occ={g.extra ? prog(frame, sec(3.6) + k * 2, sec(4.1) + k * 2) : 1} />;
      })}
      <Label text="+ EXTRA RECEPTORS" y={1130} color={COFFEE} size={56} at={sec(2.8)} />
    </FadeIn>
  );
};

const Hour12Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const out = prog(frame, sec(1.2), sec(2.2)); // caffeine leaves
  const fill = EASE_INOUT(prog(frame, sec(2.8), sec(4.0)));
  return (
    <FadeIn>
      <Kicker text="HOUR 12" color={ADEN} at={4} />
      {GRID.map((g, k) => {
        const aIn = prog(frame, sec(2.6) + (k % 6) * 3, sec(3.2) + (k % 6) * 3);
        return (
          <React.Fragment key={g.i}>
            <Receptor x={g.x} y={g.y} occupant={aIn > 0 ? 'aden' : 'caf'} occ={aIn > 0 ? aIn : 1 - out} glow={aIn} />
          </React.Fragment>
        );
      })}
      {/* tiredness meter */}
      <div style={{ position: 'absolute', left: 120, right: 120, top: 1050 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: ADEN, marginBottom: 12 }}>TIREDNESS</div>
        <div style={{ height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ width: `${10 + 90 * fill}%`, height: '100%', background: ADEN, borderRadius: 22 }} />
        </div>
      </div>
    </FadeIn>
  );
};

const PeakScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = prog(frame, 6, sec(2.0));
  // withdrawal intensity over days 0..9 (peaks day 1-2, fades by day 9)
  const W = 840;
  const H = 380;
  const pts = Array.from({ length: 61 }, (_, i) => {
    const d = (i / 60) * 9;
    const v = d < 1.5 ? Math.sin((d / 1.5) * (Math.PI / 2)) : Math.exp(-(d - 1.5) / 2.2);
    return [(d / 9) * W, H - v * (H - 30)];
  });
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const peakX = (1.5 / 9) * W;
  return (
    <FadeIn>
      <Kicker text="DAY 1–2 · THE PEAK" color={RED} at={4} />
      <div style={{ position: 'absolute', left: 120, top: 330 }}>
        <svg width={W} height={H + 60} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.3)" strokeWidth={4} />
          {[0, 2, 9].map((d) => (
            <text key={d} x={(d / 9) * W} y={H + 48} textAnchor="middle" fill={DIM} fontSize={32} fontFamily={FONT_MONO}>
              day {d}
            </text>
          ))}
          <path d={path} fill="none" stroke={RED} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
          <circle cx={peakX} cy={30} r={18} fill={RED} opacity={prog(frame, sec(1.4), sec(1.8))} />
          <text x={peakX + 34} y={42} fill={RED} fontSize={40} fontFamily={FONT_DISPLAY} fontWeight={700} opacity={prog(frame, sec(1.5), sec(1.9))}>
            PEAK
          </text>
        </svg>
      </div>
      <Chip text="HEADACHE" color={RED} x={330} y={860} at={sec(1.0)} />
      <Chip text="BRAIN FOG" color={ADEN} x={750} y={860} at={sec(1.6)} />
      <Chip text="EXHAUSTION" color={BLUE} x={540} y={980} at={sec(2.3)} />
    </FadeIn>
  );
};

const VesselScene: React.FC = () => {
  const frame = useCurrentFrame();
  // narrow while "caffeine squeezes", then widen on "open back up"
  const widen = EASE_INOUT(prog(frame, sec(3.4), sec(4.4)));
  const half = 40 + 70 * widen;
  const flow = (frame * 6) % 120;
  return (
    <FadeIn>
      <Kicker text="WHY THE HEADACHE" color={RED} at={4} />
      <Label text={widen < 0.5 ? 'WITH CAFFEINE: SQUEEZED' : 'NOW: WIDE OPEN'} y={420} color={widen < 0.5 ? COFFEE : RED} size={48} at={4} />
      <div style={{ position: 'absolute', left: 90, top: 560 }}>
        <svg width={900} height={360} style={{ overflow: 'visible', display: 'block' }}>
          <defs>
            <clipPath id="vessel">
              <rect x={0} y={180 - half} width={900} height={half * 2} rx={half} />
            </clipPath>
          </defs>
          <rect x={0} y={180 - half} width={900} height={half * 2} rx={half} fill="#5c1a1a" />
          <g clipPath="url(#vessel)">
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={((i * 120 + flow) % 1020) - 60} cy={180 + ((i % 3) - 1) * half * 0.45} r={18 + 8 * widen} fill={RED} opacity={0.9} />
            ))}
          </g>
          <rect x={0} y={180 - half} width={900} height={half * 2} rx={half} fill="none" stroke={RED} strokeWidth={8} />
          {/* pressure arrows when widening */}
          {[-1, 1].map((dir) => (
            <text key={dir} x={450} y={180 + dir * (half + 70) + 14} textAnchor="middle" fill={RED} fontSize={56} fontFamily={FONT_DISPLAY} fontWeight={700} opacity={widen}>
              {dir < 0 ? '↑' : '↓'}
            </text>
          ))}
        </svg>
      </div>
      <Label text="more blood flow → pressure → headache" y={1040} color={RED} size={38} at={sec(4.0)} />
    </FadeIn>
  );
};

const Day9Scene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <FadeIn>
      <Kicker text="DAY 9" color={GREEN} at={4} />
      <Chip text="WITHDRAWAL: MOSTLY OVER ✓" color={GREEN} x={540} y={300} at={sec(0.8)} />
      {GRID.map((g, k) => {
        const gone = g.extra ? prog(frame, sec(2.8) + k * 3, sec(3.4) + k * 3) : 0;
        return <Receptor key={g.i} x={g.x} y={g.y} appear={1 - gone} />;
      })}
      <Label text="extra receptors: removed" y={1130} color={GREEN} at={sec(3.6)} />
    </FadeIn>
  );
};

const SleepScene: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = EASE_INOUT(prog(frame, sec(1.2), sec(2.6)));
  const Bar: React.FC<{ y: number; label: string; deep: number; color: string }> = ({ y, label, deep, color }) => (
    <div style={{ position: 'absolute', left: 100, right: 100, top: y }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, color }}>{label}</div>
      <div style={{ marginTop: 14, height: 70, borderRadius: 18, overflow: 'hidden', display: 'flex', background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ width: `${deep * 100}%`, background: BLUE, display: 'flex', alignItems: 'center', paddingLeft: 18, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 28, color: '#0d1512', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          deep sleep
        </div>
        <div style={{ flex: 1, background: 'rgba(110,168,255,0.25)' }} />
      </div>
    </div>
  );
  return (
    <FadeIn>
      <Kicker text="WEEK 2" color={BLUE} at={4} />
      <Bar y={480} label="WITH CAFFEINE" deep={0.22} color={COFFEE} />
      <Bar y={760} label="WITHOUT" deep={0.22 + 0.16 * grow} color={BLUE} />
      <Label text="DEEPER SLEEP" y={1060} color={BLUE} size={60} at={sec(1.6)} />
    </FadeIn>
  );
};

const Day30Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = prog(frame, 6, sec(2.2));
  const W = 840;
  const H = 360;
  const spiky = Array.from({ length: 81 }, (_, i) => {
    const t = i / 80;
    const v = 0.5 + 0.38 * Math.sin(t * Math.PI * 4 - 0.6) * (0.7 + 0.3 * Math.cos(t * 9));
    return [t * W, H - v * H];
  });
  const steady = Array.from({ length: 81 }, (_, i) => {
    const t = i / 80;
    return [t * W, H - (0.66 + 0.04 * Math.sin(t * Math.PI * 2)) * H];
  });
  const d = (pts: number[][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return (
    <FadeIn>
      <Kicker text="DAY 30" color={GREEN} at={4} />
      <div style={{ position: 'absolute', left: 120, top: 380 }}>
        <svg width={W} height={H + 60} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.3)" strokeWidth={4} />
          {['8am', '2pm', '10pm'].map((l, i) => (
            <text key={l} x={(i / 2) * W} y={H + 48} textAnchor="middle" fill={DIM} fontSize={32} fontFamily={FONT_MONO}>
              {l}
            </text>
          ))}
          <path d={d(spiky)} fill="none" stroke="rgba(200,137,74,0.7)" strokeWidth={8} strokeDasharray="1" pathLength={1} strokeDashoffset={1 - draw} />
          <path d={d(steady)} fill="none" stroke={GREEN} strokeWidth={11} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(frame, sec(1.2), sec(2.8))} />
        </svg>
      </div>
      <Chip text="with coffee: spikes & crashes" color={COFFEE} x={540} y={880} at={sec(0.8)} />
      <Chip text="now: steady energy" color={GREEN} x={540} y={990} at={sec(2.0)} />
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
      GENERAL INFO · NOT MEDICAL ADVICE · EVERYONE IS DIFFERENT
    </div>
  );
};

// =============================================================================
// DAY RAIL — persistent timeline (hour 12 → day 30), above the captions
// =============================================================================
const RAIL_STOPS: { at: number; day: number; label: string }[] = [
  { at: T.hour12, day: 0.5, label: 'HOUR 12' },
  { at: T.peak, day: 1.5, label: 'DAY 1–2' },
  { at: T.vessel, day: 2, label: 'DAY 2' },
  { at: T.day9, day: 9, label: 'DAY 9' },
  { at: T.sleep, day: 14, label: 'DAY 14' },
  { at: T.day30, day: 30, label: 'DAY 30' },
];
const railX = (day: number) => 100 + Math.sqrt(day / 30) * 880;

const DayRail: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  if (t < T.hour12 - 0.2 || t > T.final) return null;
  const o = prog(t, T.hour12 - 0.2, T.hour12 + 0.2) * (1 - prog(t, T.final - 0.3, T.final));
  let day = RAIL_STOPS[0].day;
  let label = RAIL_STOPS[0].label;
  for (let i = 0; i < RAIL_STOPS.length; i++) {
    const s = RAIL_STOPS[i];
    if (t >= s.at) {
      const prev = i > 0 ? RAIL_STOPS[i - 1].day : s.day;
      day = prev + (s.day - prev) * EASE_INOUT(prog(t, s.at, s.at + 0.8));
      label = s.label;
    }
  }
  const x = railX(day);
  return (
    <div style={{ position: 'absolute', top: 1230, left: 0, right: 0, height: 90, opacity: o }}>
      <div style={{ position: 'absolute', left: 100, right: 100, top: 40, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.15)' }} />
      <div style={{ position: 'absolute', left: 100, width: x - 100, top: 40, height: 8, borderRadius: 4, background: COFFEE }} />
      {[1, 9, 30].map((dd) => (
        <div key={dd} style={{ position: 'absolute', left: railX(dd) - 2, top: 30, width: 4, height: 28, background: 'rgba(255,255,255,0.35)' }} />
      ))}
      <div style={{ position: 'absolute', left: x - 18, top: 26, width: 36, height: 36, borderRadius: '50%', background: COFFEE, border: `5px solid ${CREAM}` }} />
      <div style={{ position: 'absolute', left: Math.min(Math.max(x - 120, 40), 800), width: 240, top: -14, textAlign: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: CREAM }}>
        {label}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const seq = (a: number, b: number) => ({ from: sec(a), durationInFrames: sec(b) - sec(a) });

const Short14Coffee: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.block)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.block, T.grow)}>
      <BlockScene />
    </Sequence>
    <Sequence {...seq(T.grow, T.hour12)}>
      <GrowScene />
    </Sequence>
    <Sequence {...seq(T.hour12, T.peak)}>
      <Hour12Scene />
    </Sequence>
    <Sequence {...seq(T.peak, T.vessel)}>
      <PeakScene />
    </Sequence>
    <Sequence {...seq(T.vessel, T.day9)}>
      <VesselScene />
    </Sequence>
    <Sequence {...seq(T.day9, T.sleep)}>
      <Day9Scene />
    </Sequence>
    <Sequence {...seq(T.sleep, T.day30)}>
      <SleepScene />
    </Sequence>
    <Sequence {...seq(T.day30, T.final)}>
      <Day30Scene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <Disclaimer />
    </Sequence>
    <DayRail />
    <Captions lines={LINES} y={1420} accent={COFFEE} />
    <ProgressBar color={COFFEE} />
  </AbsoluteFill>
);

export default Short14Coffee;
