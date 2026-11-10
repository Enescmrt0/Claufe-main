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
  id: 'Short16LastSeconds',
  durationInSeconds: 41,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#0a0e1a';
const GLOW = '#18234a';
const CYAN = '#7fd8ff'; // accent
const VIOLET = '#b79bff'; // gamma
const GOLD = '#f5c76e';
const RED = '#ff6b6b';
const DIM = 'rgba(255,255,255,0.55)';

const sec = (s: number) => Math.round(s * 30);

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-16-last-seconds/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What does your brain do in its final seconds?', start: 0.3, end: 2.56 },
  { text: 'When the heart stops, blood flow to the brain stops too.', start: 2.9, end: 5.91 },
  { text: 'Within about ten to twenty seconds, consciousness fades.', start: 6.25, end: 9.32 },
  { text: "But the brain doesn't just switch off. In some recordings, it surges.", start: 9.7, end: 13.56 },
  { text: 'Scientists saw a burst of gamma waves, the same waves linked to memory and dreaming.', start: 13.9, end: 18.68 },
  { text: "It might be why some survivors describe their life flashing before their eyes. We don't know for sure.", start: 19.0, end: 24.55 },
  { text: 'Hearing may be the last sense to go. Dying brains can still respond to sound.', start: 24.9, end: 29.49 },
  { text: 'Minutes later, one final wave sweeps across the brain, as neurons lose their charge.', start: 29.85, end: 35.27 },
  { text: "Your brain's last act may not be silence, but one final spark.", start: 35.7, end: 39.58 },
];

const T = {
  hook: 0,
  heart: 2.8,
  fade: 6.15,
  surge: 9.6,
  gamma: 13.8,
  flash: 18.9,
  hearing: 24.8,
  wave: 29.75,
  final: 35.6,
  end: 41,
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

const Chip: React.FC<{ text: string; color: string; x: number; y: number; at: number; size?: number }> = ({ text, color, x, y, at, size = 40 }) => {
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

const BRAIN_PATH =
  'M 150 30 C 110 0 40 10 30 70 C 0 90 5 160 50 180 C 60 225 130 230 150 200 C 170 230 240 225 250 180 C 295 160 300 90 270 70 C 260 10 190 0 150 30 Z';

// Brain with adjustable brightness (0 dark .. 1 lit), glow color and an optional sweep (0..1 left to right going dark).
const Brain: React.FC<{ x: number; y: number; size?: number; lit?: number; color?: string; glow?: number; sweep?: number; id: string }> = ({
  x,
  y,
  size = 380,
  lit = 1,
  color = CYAN,
  glow = 0,
  sweep,
  id,
}) => (
  <div style={{ position: 'absolute', left: x - size / 2, top: y - size * 0.4 }}>
    <svg width={size} height={size * 0.8} viewBox="0 0 300 240" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={22} />
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d={BRAIN_PATH} />
        </clipPath>
      </defs>
      <ellipse cx={150} cy={120} rx={150} ry={110} fill={color} opacity={0.7 * glow} filter={`url(#${id}-glow)`} />
      <path d={BRAIN_PATH} fill="#141c36" />
      <path d={BRAIN_PATH} fill={color} opacity={0.3 * lit} />
      {sweep !== undefined ? (
        <g clipPath={`url(#${id}-clip)`}>
          <rect x={0} y={0} width={300 * sweep} height={240} fill="#0a0e1a" opacity={0.85} />
          <rect x={300 * sweep - 14} y={0} width={28} height={240} fill={GOLD} opacity={sweep > 0.01 && sweep < 0.99 ? 0.95 : 0} style={{ filter: `drop-shadow(0 0 14px ${GOLD})` }} />
        </g>
      ) : null}
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

// One ECG beat shape over a unit width.
const beat = (k: number) => {
  if (k < 0.3) return 0;
  if (k < 0.36) return -0.12;
  if (k < 0.42) return 1;
  if (k < 0.48) return -0.35;
  if (k < 0.62) return 0;
  if (k < 0.72) return 0.18 * Math.sin(((k - 0.62) / 0.1) * Math.PI);
  return 0;
};

// Scrolling ECG: beats until `stopAt` (0..1 across the width), flat after.
const Ecg: React.FC<{ x: number; y: number; w: number; h: number; draw: number; beats: number; flatFrom: number; color: string }> = ({ x, y, w, h, draw, beats, flatFrom, color }) => {
  const N = 240;
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const k = i / N;
    const v = k < flatFrom ? beat((k * beats) % 1) : 0;
    return [k * w, h / 2 - v * (h / 2 - 6)];
  });
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'} ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <svg width={w} height={h} style={{ overflow: 'visible', display: 'block' }}>
        <path d={d} fill="none" stroke={color} strokeWidth={8} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
      </svg>
    </div>
  );
};

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.05 * EASE_INOUT(prog(frame, 0, 150)) : 1.05 - 0.05 * EASE_INOUT(prog(frame, 0, 30));
  const pulse = 0.75 + 0.25 * Math.sin(frame / 6);
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: "YOUR BRAIN'S", color: '#ffffff' },
          { text: 'LAST SECONDS', color: CYAN },
        ]}
        subtitle="what science has recorded"
        y={260}
        size={108}
        warm={!loop}
      />
      <Brain id="hook" x={540} y={830} size={440} lit={1} glow={0.5 * pulse} />
    </AbsoluteFill>
  );
};

const HeartScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = prog(frame, 4, sec(2.4));
  const stopped = prog(frame, sec(1.9), sec(2.3));
  return (
    <FadeIn>
      <Kicker text="THE HEART STOPS" color={RED} at={4} />
      <Ecg x={110} y={420} w={860} h={260} draw={draw} beats={5} flatFrom={0.6} color={RED} />
      <Brain id="heart" x={540} y={960} size={320} lit={1 - 0.6 * stopped} />
      <Chip text="BLOOD FLOW: STOPPED" color={RED} x={540} y={1140} at={sec(1.9)} />
    </FadeIn>
  );
};

const FadeScene: React.FC = () => {
  const frame = useCurrentFrame();
  // counter runs 0 -> 20 "seconds" across the scene (time-compressed)
  const k = prog(frame, sec(0.4), sec(3.0));
  const secs = Math.round(k * 20);
  const aware = 1 - EASE_INOUT(k);
  return (
    <FadeIn>
      <Kicker text="10–20 SECONDS" color={CYAN} at={4} />
      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 150, color: '#fff' }}>
        {String(secs).padStart(2, '0')}
        <span style={{ fontSize: 60, color: DIM }}> s</span>
      </div>
      <Brain id="fade" x={540} y={760} size={360} lit={0.15 + 0.85 * aware} glow={0.3 * aware} />
      <div style={{ position: 'absolute', left: 140, right: 140, top: 1010 }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 42, color: CYAN, marginBottom: 12 }}>AWARENESS</div>
        <div style={{ height: 46, borderRadius: 23, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ width: `${4 + 96 * aware}%`, height: '100%', background: CYAN, borderRadius: 23 }} />
        </div>
      </div>
    </FadeIn>
  );
};

// EEG trace: quiet, then a dense high-frequency burst.
const SurgeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 880;
  const H = 300;
  const N = 400;
  const burstAt = 0.52;
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const k = i / N;
    const env = k < burstAt ? 0.06 : Math.sin(Math.min(1, (k - burstAt) / 0.4) * Math.PI) * 0.95 + 0.08;
    const v = env * (Math.sin(k * 260) * 0.7 + Math.sin(k * 173 + 1.3) * 0.3);
    return [k * W, H / 2 - v * (H / 2 - 8)];
  });
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'} ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  const draw = prog(frame, 6, sec(3.4));
  const burst = prog(frame, sec(2.2), sec(2.8));
  return (
    <FadeIn>
      <Kicker text="BUT THEN…" color={VIOLET} at={4} />
      <div style={{ position: 'absolute', left: 100, top: 400, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: DIM }}>brain activity (EEG)</div>
      <div style={{ position: 'absolute', left: 100, top: 460 }}>
        <svg width={W} height={H} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.15)" strokeWidth={3} />
          <path d={d} fill="none" stroke={VIOLET} strokeWidth={5} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} style={{ filter: `drop-shadow(0 0 10px ${VIOLET})` }} />
        </svg>
      </div>
      <Brain id="surge" x={540} y={960} size={320} lit={0.2 + 0.8 * burst} color={VIOLET} glow={burst * (0.6 + 0.3 * Math.sin(frame / 3))} />
      <Label text="A SURGE" y={1120} color={VIOLET} size={64} at={sec(2.5)} />
    </FadeIn>
  );
};

const GammaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rings = [0, 1, 2].map((i) => ((frame / 40 + i / 3) % 1));
  return (
    <FadeIn>
      <Kicker text="GAMMA WAVES" color={VIOLET} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {rings.map((r, i) => (
          <ellipse key={i} cx={540} cy={640} rx={200 + r * 260} ry={150 + r * 200} fill="none" stroke={VIOLET} strokeWidth={6} opacity={(1 - r) * 0.7} />
        ))}
      </svg>
      <Brain id="gamma" x={540} y={640} size={400} lit={1} color={VIOLET} glow={0.7 + 0.2 * Math.sin(frame / 3)} />
      <Chip text="MEMORY" color={GOLD} x={340} y={1000} at={sec(2.9)} size={46} />
      <Chip text="DREAMING" color={CYAN} x={730} y={1000} at={sec(3.7)} size={46} />
      <Label text="the same waves, in the final moments" y={1130} color={DIM} size={34} at={sec(1.0)} />
    </FadeIn>
  );
};

// Film strip of "memory" frames sliding past.
const FlashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const off = (frame * 7) % 300;
  const icons = [
    // sun
    <circle key="s" cx={110} cy={85} r={36} fill={GOLD} />,
    // house
    <path key="h" d="M 60 120 L 60 80 L 110 40 L 160 80 L 160 120 Z" fill={CYAN} />,
    // heart
    <path key="l" d="M 110 130 C 30 80 60 30 110 62 C 160 30 190 80 110 130 Z" fill={RED} />,
    // mountain
    <path key="m" d="M 40 125 L 95 50 L 125 90 L 150 65 L 185 125 Z" fill={VIOLET} />,
    // star
    <path key="t" d="M 110 35 L 126 78 L 172 80 L 136 108 L 148 152 L 110 126 L 72 152 L 84 108 L 48 80 L 94 78 Z" fill={GOLD} />,
  ];
  const unsure = prog(frame, sec(4.3), sec(4.7));
  return (
    <FadeIn>
      <Kicker text="LIFE FLASHING BY?" color={GOLD} at={4} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 420, height: 230, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', borderTop: '6px dashed rgba(255,255,255,0.35)', borderBottom: '6px dashed rgba(255,255,255,0.35)' }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ position: 'absolute', left: i * 300 - off - 40, top: 30, width: 220, height: 170, borderRadius: 16, background: '#141c36', border: '4px solid rgba(255,255,255,0.4)' }}>
            <svg width={220} height={170}>{icons[i % icons.length]}</svg>
          </div>
        ))}
      </div>
      <Brain id="flash" x={540} y={900} size={320} lit={1} color={VIOLET} glow={0.5} />
      <Chip text="A HYPOTHESIS · NOT PROVEN" color={GOLD} x={540} y={1090} at={sec(4.3)} size={38} />
      <div style={{ position: 'absolute', top: 1180, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_BODY, fontWeight: 500, fontSize: 30, color: DIM, opacity: unsure }}>
        based on a handful of recordings
      </div>
    </FadeIn>
  );
};

const HearingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const respond = prog(frame, sec(3.0), sec(3.5));
  const arcs = [0, 1, 2, 3].map((i) => ((frame / 36 + i / 4) % 1));
  return (
    <FadeIn>
      <Kicker text="THE LAST SENSE?" color={CYAN} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {arcs.map((a, i) => {
          const x = 120 + a * 250;
          const r = 60 + a * 60;
          return <path key={i} d={`M ${x} ${700 - r} Q ${x + r * 0.7} 700 ${x} ${700 + r}`} fill="none" stroke={CYAN} strokeWidth={10} strokeLinecap="round" opacity={(1 - a) * 0.9} />;
        })}
        {/* speaker dot */}
        <circle cx={100} cy={700} r={22} fill={CYAN} />
      </svg>
      <Brain id="hear" x={680} y={700} size={380} lit={0.3 + 0.7 * respond} glow={respond * (0.5 + 0.2 * Math.sin(frame / 4))} />
      <Chip text="HEARING" color={CYAN} x={540} y={980} at={sec(0.6)} size={52} />
      <Label text="the brain still responds to sound" y={1110} color={DIM} size={36} at={sec(3.1)} />
    </FadeIn>
  );
};

const WaveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = EASE_INOUT(prog(frame, sec(1.6), sec(4.6)));
  return (
    <FadeIn>
      <Kicker text="MINUTES LATER" color={GOLD} at={4} />
      <Brain id="wave" x={540} y={700} size={460} lit={1 - 0.75 * sweep} color={CYAN} sweep={sweep} />
      <Label text="ONE FINAL WAVE" y={1000} color={GOLD} size={60} at={sec(1.4)} />
      <Label text="neurons lose their charge" y={1100} color={DIM} size={36} at={sec(3.6)} />
    </FadeIn>
  );
};

const Footnote: React.FC = () => {
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
      FROM EEG RECORDINGS · STILL BEING STUDIED
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const seq = (a: number, b: number) => ({ from: sec(a), durationInFrames: sec(b) - sec(a) });

const Short16LastSeconds: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.heart)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.heart, T.fade)}>
      <HeartScene />
    </Sequence>
    <Sequence {...seq(T.fade, T.surge)}>
      <FadeScene />
    </Sequence>
    <Sequence {...seq(T.surge, T.gamma)}>
      <SurgeScene />
    </Sequence>
    <Sequence {...seq(T.gamma, T.flash)}>
      <GammaScene />
    </Sequence>
    <Sequence {...seq(T.flash, T.hearing)}>
      <FlashScene />
    </Sequence>
    <Sequence {...seq(T.hearing, T.wave)}>
      <HearingScene />
    </Sequence>
    <Sequence {...seq(T.wave, T.final)}>
      <WaveScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <Footnote />
    </Sequence>
    <Captions lines={LINES} y={1420} accent={CYAN} />
    <ProgressBar color={CYAN} />
  </AbsoluteFill>
);

export default Short16LastSeconds;
