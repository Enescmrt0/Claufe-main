import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { Captions, EASE_INOUT, EASE_OUT, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Chip, FadeIn, Footnote, sec, seq } from '../../lib/explainer';
import { Pose, StickFigure } from '../../lib/stick';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short25Friction',
  durationInSeconds: 24.8,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#0f141c';
const GLOW = '#16324a';
const ICE = '#8fe3ff'; // accent (slippery)
const ORANGE = '#ff9d4d';
const RED = '#ff6b6b';
const GREEN = '#7ee08a';
const GOLD = '#f5c76e';
const GROUND_Y = 1190;

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-25-friction/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'Five seconds without friction would wreck your day.', start: 0.1, end: 2.6 },
  { text: "Second one. Your feet lose grip. You can't walk. You just slide.", start: 2.85, end: 6.16 },
  { text: 'Second two. Every car becomes a sled. No brakes, no steering.', start: 6.41, end: 10.06 },
  { text: 'Second three. Knots untie, and nails slip out of the walls.', start: 10.31, end: 13.55 },
  { text: 'Second four. Anything on a slope starts to slide.', start: 13.8, end: 16.51 },
  { text: 'Second five. Friction returns, and everything still moving slams to a halt.', start: 16.76, end: 21.01 },
  { text: 'Friction: the most underrated force on Earth.', start: 21.26, end: 23.63 },
];

const T = { hook: 0, s1: 2.75, s2: 6.31, s3: 10.21, s4: 13.7, s5: 16.66, final: 21.16, end: 24.8 };
const RETURN_AT = 1.75; // seconds into scene 5 when friction comes back

// =============================================================================
// PIECES
// =============================================================================
// A figure that has lost its footing: windmilling arms, feet scissoring.
const slipPose = (frame: number): Pose => {
  const a = frame / 3;
  return {
    lean: -20 + Math.sin(a / 2) * 12,
    lHand: [-74 + Math.cos(a) * 44, -118 + Math.sin(a) * 52],
    rHand: [74 + Math.cos(a + 2) * 44, -118 + Math.sin(a + 2) * 52],
    lFoot: [-44 + Math.sin(a / 1.5) * 34, 170],
    rFoot: [44 - Math.sin(a / 1.5) * 34, 170 - Math.max(0, Math.sin(a)) * 22],
    elbows: 'in',
  };
};

const Ground: React.FC<{ streak?: number; y?: number }> = ({ streak = 0, y = GROUND_Y }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
    <line x1={60} y1={y} x2={1020} y2={y} stroke={ICE} strokeWidth={6} strokeLinecap="round" opacity={0.55} />
    {streak !== 0
      ? Array.from({ length: 7 }, (_, i) => {
          const x = 1020 - ((i * 150 + streak) % 960);
          return <line key={i} x1={x} y1={y + 24} x2={x - 90} y2={y + 24} stroke={ICE} strokeWidth={5} strokeLinecap="round" opacity={0.35} />;
        })
      : null}
  </svg>
);

// Big second counter at the top: "SECOND 3" + five pips.
const SecondHud: React.FC<{ n: number; label?: string; color?: string }> = ({ n, label, color = ICE }) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, 0, 8));
  return (
    <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', transform: `scale(${1.25 - 0.25 * p})`, opacity: p }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, letterSpacing: 8, color: 'rgba(255,255,255,0.75)' }}>{label ?? 'SECOND'}</div>
      <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 190, lineHeight: 1, color }}>{n}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ width: 70, height: 12, borderRadius: 6, background: i <= n ? color : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>
    </div>
  );
};

const Car: React.FC<{ x: number; y: number; brake?: number }> = ({ x, y, brake = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-170} y={-120} width={340} height={80} rx={26} fill="#e04b4b" />
    <path d="M -100 -120 L -62 -186 L 70 -186 L 118 -120 Z" fill="#e04b4b" />
    <path d="M -76 -126 L -50 -172 L 0 -172 L 0 -126 Z M 14 -126 L 14 -172 L 62 -172 L 96 -126 Z" fill="#bfe9ff" />
    <rect x={-176} y={-104} width={16} height={30} rx={6} fill={RED} opacity={0.5 + 0.5 * brake} style={{ filter: `drop-shadow(0 0 ${14 * brake}px ${RED})` }} />
    <rect x={160} y={-104} width={16} height={26} rx={6} fill={GOLD} />
    {[-100, 100].map((wx) => (
      <g key={wx}>
        <circle cx={wx} cy={-36} r={38} fill="#1b1f2a" stroke="#c9d1e0" strokeWidth={6} />
        {/* locked wheels: the spokes never turn */}
        <path d={`M ${wx - 24} -36 L ${wx + 24} -36 M ${wx} -60 L ${wx} -12`} stroke="#c9d1e0" strokeWidth={6} strokeLinecap="round" />
      </g>
    ))}
  </g>
);

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const x = 250 + frame * 6.4; // already sliding on frame 0
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 210, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
        <div style={{ fontSize: 132, color: ICE }}>5 seconds</div>
        <div style={{ fontSize: 104, color: '#ffffff' }}>no friction</div>
      </div>
      <Ground streak={frame * 16} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {[0, 1, 2].map((i) => (
          <line key={i} x1={x - 170 - i * 40} y1={820 + i * 90} x2={x - 300 - i * 60} y2={820 + i * 90} stroke={ICE} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
        ))}
      </svg>
      <StickFigure x={x} y={GROUND_Y - 170 * 1.45} scale={1.45} pose={slipPose(frame)} face="ouch" />
    </AbsoluteFill>
  );
};

const S1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 20) * 120;
  return (
    <AbsoluteFill>
      <SecondHud n={1} />
      <Ground streak={frame * 14} />
      <StickFigure x={540 + drift} y={GROUND_Y - 170 * 1.2} scale={1.2} pose={slipPose(frame + 20)} face="ouch" />
      <Chip text="NO GRIP" color={ICE} x={540} y={520} at={sec(1.0)} size={52} />
    </AbsoluteFill>
  );
};

const S2Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const x = -220 + frame * 12.5; // constant speed: nothing can slow it down
  const ROAD = 1120;
  return (
    <AbsoluteFill>
      <SecondHud n={2} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <rect x={0} y={ROAD - 20} width={1080} height={110} fill="#1c2431" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={i * 150 + 20} y={ROAD + 30} width={80} height={10} rx={5} fill="rgba(255,255,255,0.35)" />
        ))}
        {/* stop sign + stop line */}
        <rect x={756} y={770} width={12} height={330} fill="#8b93a7" />
        <polygon points="762,700 804,718 822,760 804,802 762,820 720,802 702,760 720,718" fill={RED} stroke="#ffffff" strokeWidth={6} />
        <text x={762} y={774} textAnchor="middle" fill="#ffffff" fontSize={36} fontFamily={FONT_DISPLAY} fontWeight={700}>
          STOP
        </text>
        <rect x={690} y={ROAD - 20} width={14} height={110} fill="#ffffff" opacity={0.8} />
        <Car x={x} y={ROAD + 40} brake={0.6 + 0.4 * Math.sin(frame / 2)} />
      </svg>
      <Chip text="NO BRAKES" color={RED} x={330} y={540} at={sec(1.9)} size={46} />
      <Chip text="NO STEERING" color={ORANGE} x={740} y={540} at={sec(2.6)} size={46} />
    </AbsoluteFill>
  );
};

const S3Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const untie = EASE_INOUT(prog(frame, sec(0.9), sec(1.9)));
  const nail = EASE_INOUT(prog(frame, sec(1.9), sec(2.5)));
  const fall = prog(frame, sec(2.4), sec(3.1));
  return (
    <AbsoluteFill>
      <SecondHud n={3} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {/* knot: two rope ends joined by a loop that slips open */}
        <g stroke="#e0b070" strokeWidth={22} strokeLinecap="round" fill="none">
          <path d={`M 70 880 L ${250 - untie * 90} 880`} />
          <path d={`M ${330 + untie * 90} 880 L 510 880`} />
          <ellipse cx={290} cy={880} rx={62 * (1 - untie) + 4} ry={48 * (1 - untie) + 4} opacity={1 - untie} />
          <path d={`M ${250 - untie * 90} 880 q 40 ${-60 * (1 - untie)} 80 0`} opacity={1 - untie} />
        </g>
        <text x={290} y={1010} textAnchor="middle" fill="#ffffff" fontSize={40} fontFamily={FONT_DISPLAY} fontWeight={700}>
          KNOTS
        </text>
        {/* wall, nail and a picture that drops */}
        <rect x={600} y={620} width={420} height={420} rx={18} fill="#1c2431" stroke="rgba(255,255,255,0.2)" strokeWidth={4} />
        <g transform={`translate(${810 + nail * 110} ${690 + nail * 30}) rotate(${nail * 28})`}>
          <rect x={-8} y={-6} width={70} height={12} rx={4} fill="#c9d1e0" />
          <rect x={-18} y={-16} width={14} height={32} rx={4} fill="#c9d1e0" />
        </g>
        <g transform={`translate(810 ${800 + fall * fall * 420}) rotate(${fall * 26})`} opacity={1 - prog(fall, 0.85, 1)}>
          <rect x={-110} y={-90} width={220} height={180} rx={10} fill="#f3e3c2" stroke="#8a6a3a" strokeWidth={12} />
          <path d="M -90 60 L -30 -10 L 10 30 L 40 0 L 90 60 Z" fill={ICE} />
          <circle cx={50} cy={-40} r={20} fill={GOLD} />
        </g>
        <text x={626} y={672} textAnchor="start" fill="#ffffff" fontSize={40} fontFamily={FONT_DISPLAY} fontWeight={700}>
          NAILS
        </text>
      </svg>
      <Chip text="FRICTION HELD THEM" color={GOLD} x={540} y={540} at={sec(1.2)} size={42} />
    </AbsoluteFill>
  );
};

const S4Scene: React.FC = () => {
  const frame = useCurrentFrame();
  // everything on the slope accelerates from rest (x = a t^2)
  const t = Math.max(0, frame - sec(0.7)) / 30;
  const d = 0.5 * 190 * t * t;
  const LOCAL_Y = 1000;
  return (
    <AbsoluteFill>
      <SecondHud n={4} />
      <AbsoluteFill style={{ transform: 'rotate(24deg)', transformOrigin: '540px 900px' }}>
        <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
          <line x1={-200} y1={LOCAL_Y} x2={1400} y2={LOCAL_Y} stroke={ICE} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
          <rect x={120 + d * 0.9} y={LOCAL_Y - 110} width={120} height={110} rx={10} fill="#c8894a" stroke="#f3d9b1" strokeWidth={6} />
          <circle cx={340 + d * 1.1} cy={LOCAL_Y - 44} r={44} fill={ORANGE} />
        </svg>
        <StickFigure x={560 + d} y={LOCAL_Y - 170 * 1.05} scale={1.05} pose={slipPose(frame)} face="ouch" />
      </AbsoluteFill>
      <Chip text="EVERYTHING SLIDES DOWNHILL" color={ICE} x={540} y={540} at={sec(1.2)} size={38} />
    </AbsoluteFill>
  );
};

const S5Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const R = sec(RETURN_AT);
  const moving = Math.min(frame, R);
  const x = 200 + moving * 9; // slides, then stops dead when friction returns
  const hit = prog(frame, R, R + 6);
  const settle = prog(frame, R + 6, R + 26);
  const back = frame >= R;
  const pose: Pose = back
    ? { lean: 70 * EASE_OUT(hit) * (1 - 0.75 * settle), lHand: [70, -60], rHand: [96, -30], lFoot: [-30, 170], rFoot: [20, 170], elbows: 'in' }
    : slipPose(frame);
  const flash = back ? 1 - prog(frame, R, R + 10) : 0;
  return (
    <AbsoluteFill>
      <SecondHud n={5} color={back ? GREEN : ICE} label={back ? 'FRICTION IS BACK' : 'SECOND'} />
      <AbsoluteFill style={{ background: '#ffffff', opacity: 0.35 * flash }} />
      <Ground streak={back ? 0 : frame * 16} />
      {/* dust where everything bites into the ground again */}
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {back
          ? Array.from({ length: 7 }, (_, i) => {
              const k = prog(frame, R, R + 22);
              return <circle key={i} cx={x - 40 + i * 26 + k * (i - 3) * 30} cy={GROUND_Y - 10 - k * (20 + (i % 3) * 22)} r={16 + k * 18} fill="#c9d1e0" opacity={0.5 * (1 - k)} />;
            })
          : null}
      </svg>
      <StickFigure x={x} y={GROUND_Y - 170 * 1.2} scale={1.2} pose={pose} face="ouch" />
      <Chip text="EVERYTHING STOPS AT ONCE" color={RED} x={540} y={540} at={R + 4} size={42} />
    </AbsoluteFill>
  );
};

const FinalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, 2, 14));
  const star = frame / 9;
  return (
    <FadeIn dur={6}>
      <div style={{ position: 'absolute', top: 230, left: 40, right: 40, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 150, color: GREEN, textTransform: 'uppercase', opacity: p, transform: `scale(${0.8 + 0.2 * p})`, textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>Friction</div>
      <Chip text="THE MOST UNDERRATED FORCE" color={GOLD} x={540} y={440} at={sec(0.9)} size={44} />
      <Ground />
      <StickFigure x={540} y={GROUND_Y - 170 * 1.45} scale={1.45} pose={{ lHand: [-30, -150], rHand: [58, -40], lean: 6 + Math.sin(frame / 10) * 5 }} face="neutral" />
      {/* dizzy stars circling the head */}
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {[0, 1, 2].map((i) => {
          const a = star + (i * Math.PI * 2) / 3;
          return <circle key={i} cx={548 + Math.cos(a) * 96} cy={GROUND_Y - 170 * 1.45 - 290 + Math.sin(a) * 26} r={12} fill={GOLD} opacity={0.6 + 0.4 * Math.sin(a)} />;
        })}
      </svg>
      <Footnote text="A SIMPLIFIED THOUGHT EXPERIMENT" y={1320} />
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short25Friction: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.s1)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.s1, T.s2)}>
      <S1Scene />
    </Sequence>
    <Sequence {...seq(T.s2, T.s3)}>
      <S2Scene />
    </Sequence>
    <Sequence {...seq(T.s3, T.s4)}>
      <S3Scene />
    </Sequence>
    <Sequence {...seq(T.s4, T.s5)}>
      <S4Scene />
    </Sequence>
    <Sequence {...seq(T.s5, T.final)}>
      <S5Scene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <FinalScene />
    </Sequence>
    <Captions lines={LINES} y={1440} accent={ICE} />
    <ProgressBar color={ICE} />
  </AbsoluteFill>
);

export default Short25Friction;
