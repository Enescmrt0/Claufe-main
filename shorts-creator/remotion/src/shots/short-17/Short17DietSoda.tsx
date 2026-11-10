import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_INOUT, EASE_OUT, Kicker, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Brain, Chip, DIM, FadeIn, Footnote, Label, Meter, Nerve, sec, seq } from '../../lib/explainer';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short17DietSoda',
  durationInSeconds: 43,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#0b1318';
const GLOW = '#143240';
const ICE = '#8fe3ff'; // accent
const PINK = '#ff8fc7'; // sugar / reward
const GOLD = '#f5c76e';
const GREEN = '#7ee08a';
const RED = '#ff6b6b';

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-17-diet-soda/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What does diet soda actually do to your brain?', start: 0.3, end: 2.69 },
  { text: 'Zero sugar, zero calories. But its sweeteners can be hundreds of times sweeter than sugar.', start: 3.04, end: 8.39 },
  { text: 'Your tongue signals: sugar incoming. Your brain gets ready for the energy.', start: 8.74, end: 13.03 },
  { text: 'But the calories never arrive. Your brain got a promise, with no payoff.', start: 13.38, end: 17.43 },
  { text: 'Brain scans suggest the reward response is weaker than with real sugar.', start: 17.78, end: 21.96 },
  { text: "So in some studies, people crave more sweet food afterward. In others, they don't.", start: 22.31, end: 27.13 },
  { text: "Large studies also link heavy use to faster memory decline. But that's a correlation, not proof.", start: 27.48, end: 33.54 },
  { text: 'Regulators still consider these sweeteners safe at normal amounts.', start: 33.89, end: 37.54 },
  { text: "So it's not poison. But to your brain, it's not quite free either.", start: 37.89, end: 41.54 },
];

const T = { hook: 0, sweet: 2.94, tongue: 8.64, nocal: 13.28, reward: 17.68, crave: 22.21, memory: 27.38, safe: 33.79, final: 37.79, end: 43 };

// =============================================================================
// PIECES
// =============================================================================
const Can: React.FC<{ x: number; y: number; scale?: number; draw?: number }> = ({ x, y, scale = 1, draw = 1 }) => {
  const frame = useCurrentFrame();
  const bubbles = [0, 1, 2, 3, 4].map((i) => {
    const t = (frame / 50 + i / 5) % 1;
    return { x: 60 + ((i * 53) % 150), y: -t * 150, o: Math.sin(t * Math.PI), r: 8 + (i % 3) * 4 };
  });
  return (
    <div style={{ position: 'absolute', left: x - 130 * scale, top: y, opacity: draw, transform: `scale(${0.85 + 0.15 * EASE_OUT(draw)})` }}>
      <svg width={260 * scale} height={460 * scale} viewBox="0 0 260 460" style={{ overflow: 'visible', display: 'block' }}>
        {bubbles.map((b, i) => (
          <circle key={i} cx={b.x} cy={20 + b.y} r={b.r} fill="none" stroke={ICE} strokeWidth={4} opacity={b.o * 0.9} />
        ))}
        <path d="M 40 40 Q 40 20 70 20 L 190 20 Q 220 20 220 40 L 220 60 L 40 60 Z" fill="#aab8c2" />
        <rect x={30} y={56} width={200} height={360} rx={26} fill="#dfe8ee" />
        <rect x={30} y={150} width={200} height={170} fill={ICE} />
        <text x={130} y={232} textAnchor="middle" fontFamily={FONT_DISPLAY} fontWeight={700} fontSize={58} fill="#0b1318">
          DIET
        </text>
        <text x={130} y={286} textAnchor="middle" fontFamily={FONT_MONO} fontWeight={700} fontSize={30} fill="#0b1318">
          0 kcal
        </text>
        <rect x={30} y={56} width={36} height={360} rx={18} fill="#ffffff" opacity={0.35} />
        <path d="M 40 412 Q 40 440 70 440 L 190 440 Q 220 440 220 412 Z" fill="#aab8c2" />
      </svg>
    </div>
  );
};

const Tongue: React.FC<{ y: number; lit: number }> = ({ y, lit }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
    <path d={`M 340 ${y} Q 340 ${y + 180} 540 ${y + 190} Q 740 ${y + 180} 740 ${y} Z`} fill="#e0708f" stroke="#ffb3c8" strokeWidth={8} />
    <path d={`M 540 ${y + 10} L 540 ${y + 150}`} stroke="#c4566f" strokeWidth={6} strokeLinecap="round" />
    {[
      [430, 50],
      [650, 50],
      [470, 120],
      [610, 120],
      [540, 40],
    ].map(([cx, dy], i) => (
      <circle key={i} cx={cx} cy={y + dy} r={14 + 6 * lit} fill={lit > 0.05 ? GOLD : '#ffc2d2'} style={{ filter: lit > 0.05 ? `drop-shadow(0 0 12px ${GOLD})` : 'none' }} />
    ))}
  </svg>
);

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.05 * EASE_INOUT(prog(frame, 0, 150)) : 1.05 - 0.05 * EASE_INOUT(prog(frame, 0, 30));
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'DIET SODA', color: '#ffffff' },
          { text: 'VS YOUR BRAIN', color: ICE },
        ]}
        subtitle="zero calories. zero effect?"
        y={250}
        size={106}
        warm={!loop}
      />
      <Can x={540} y={680} scale={1.1} draw={loop ? 1 : prog(frame, 0, 16)} />
    </AbsoluteFill>
  );
};

const SweetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = EASE_INOUT(prog(frame, sec(2.9), sec(4.6)));
  return (
    <FadeIn>
      <Kicker text="WHAT'S INSIDE" color={ICE} at={4} />
      <Chip text="0 SUGAR" color={GREEN} x={330} y={360} at={sec(0.3)} size={50} />
      <Chip text="0 CALORIES" color={GREEN} x={730} y={360} at={sec(1.2)} size={50} />
      <div style={{ opacity: prog(frame, sec(2.2), sec(2.7)) }}>
        <Meter y={600} label="SUGAR" value={0.03} color={PINK} note="1×" />
        <Meter y={800} label="SWEETENERS" value={0.03 + 0.97 * grow} color={ICE} note="200–600×" />
      </div>
      <Label text="sweetness" y={1010} color={DIM} size={36} at={sec(2.4)} mono />
    </FadeIn>
  );
};

const TongueScene: React.FC = () => {
  const frame = useCurrentFrame();
  const lit = prog(frame, sec(0.7), sec(1.1));
  const travel = prog(frame, sec(1.1), sec(2.3));
  const ready = prog(frame, sec(2.4), sec(3.0));
  return (
    <FadeIn>
      <Kicker text="SUGAR INCOMING!" color={GOLD} at={4} />
      <Brain id="t17" x={540} y={430} color={GOLD} lit={0.4 + 0.6 * ready} glow={0.5 * ready} fill="#1c2227" />
      <Nerve x={540} y1={1000} y2={570} color={GOLD} t={travel} />
      <Tongue y={1000} lit={lit} />
      <Chip text="GET READY FOR ENERGY ⚡" color={GOLD} x={540} y={700} at={sec(2.5)} size={38} />
    </FadeIn>
  );
};

const NoCalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const promised = EASE_OUT(prog(frame, sec(0.3), sec(1.2)));
  return (
    <FadeIn>
      <Kicker text="THE CALORIES NEVER ARRIVE" color={RED} at={4} />
      <Meter y={440} label="PROMISED" value={promised} color={GOLD} note="sweet taste" />
      <Meter y={640} label="DELIVERED" value={0} color={RED} note="0 kcal" />
      <Brain id="n17" x={540} y={990} size={300} color={ICE} lit={0.35} fill="#1c2227" />
      <Label text="?" y={920} color={ICE} size={110} at={sec(2.2)} />
    </FadeIn>
  );
};

const RewardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const on = prog(frame, sec(0.8), sec(1.6));
  const pulse = 0.85 + 0.15 * Math.sin(frame / 4);
  const Col: React.FC<{ x: number; title: string; color: string }> = ({ x, title, color }) => (
    <div style={{ position: 'absolute', left: x - 220, width: 440, top: 880, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, color }}>{title}</div>
  );
  return (
    <FadeIn>
      <Kicker text="REWARD RESPONSE" color={PINK} at={4} />
      <Brain id="r17a" x={290} y={640} size={380} color={PINK} lit={0.3 + 0.7 * on} glow={on * pulse} fill="#1c2227" />
      <Brain id="r17b" x={790} y={640} size={380} color={ICE} lit={0.3 + 0.25 * on} glow={0.25 * on} fill="#1c2227" />
      <Col x={290} title="REAL SUGAR" color={PINK} />
      <Col x={790} title="DIET" color={ICE} />
      <Chip text="WEAKER" color={ICE} x={790} y={970} at={sec(2.6)} />
      <Label text="in brain-imaging studies" y={1110} color={DIM} size={34} at={sec(0.6)} />
    </FadeIn>
  );
};

const CraveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const Card: React.FC<{ y: number; head: string; body: string; color: string; at: number }> = ({ y, head, body, color, at }) => {
    const p = EASE_OUT(prog(frame, at, at + 12));
    return (
      <div style={{ position: 'absolute', left: 90, right: 90, top: y, height: 200, borderRadius: 26, background: 'rgba(255,255,255,0.06)', borderLeft: `14px solid ${color}`, padding: '0 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: p, transform: `translateX(${(1 - p) * -60}px)` }}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 32, color: DIM }}>{head}</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 56, color }}>{body}</div>
      </div>
    );
  };
  return (
    <FadeIn>
      <Kicker text="DOES IT CAUSE CRAVINGS?" color={GOLD} at={4} />
      <Card y={420} head="some studies" body="MORE CRAVINGS ↑" color={PINK} at={sec(0.5)} />
      <Card y={660} head="other studies" body="NO EFFECT" color={ICE} at={sec(3.4)} />
      <Chip text="EVIDENCE: MIXED" color={GOLD} x={540} y={950} at={sec(3.9)} size={48} />
    </FadeIn>
  );
};

const MemoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 800;
  const H = 440;
  const rnd = (n: number) => {
    const v = Math.sin(n * 12.9898) * 43758.5453;
    return v - Math.floor(v);
  };
  const dots = Array.from({ length: 34 }, (_, i) => {
    const x = 0.04 + 0.92 * rnd(i + 1);
    const noise = (rnd(i + 101) - 0.5) * 0.4;
    return { x, y: 0.78 - 0.5 * x + noise, at: 8 + i * 2 };
  });
  const line = prog(frame, sec(2.0), sec(3.2));
  const stamp = EASE_OUT(prog(frame, sec(4.1), sec(4.5)));
  return (
    <FadeIn>
      <Kicker text="DIET SODA & MEMORY" color={ICE} at={4} />
      <div style={{ position: 'absolute', left: 150, top: 360 }}>
        <svg width={W} height={H + 70} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.35)" strokeWidth={4} />
          <line x1={0} y1={0} x2={0} y2={H} stroke="rgba(255,255,255,0.35)" strokeWidth={4} />
          <text x={W / 2} y={H + 54} textAnchor="middle" fill={DIM} fontSize={30} fontFamily={FONT_MONO}>
            sweetener intake →
          </text>
          <text x={-H / 2} y={-22} textAnchor="middle" fill={DIM} fontSize={30} fontFamily={FONT_MONO} transform="rotate(-90)">
            memory score →
          </text>
          {dots.map((d, i) => (
            <circle key={i} cx={d.x * W} cy={H - Math.max(0.04, Math.min(0.96, d.y)) * H} r={11} fill={ICE} opacity={0.75 * prog(frame, d.at, d.at + 6)} />
          ))}
          <line x1={0} y1={H - 0.78 * H} x2={W * line} y2={H - (0.78 - 0.5 * line) * H} stroke={GOLD} strokeWidth={9} strokeLinecap="round" />
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 930,
          transform: `translate(-50%, 0) rotate(-5deg) scale(${1.6 - 0.6 * stamp})`,
          opacity: stamp,
          padding: '18px 40px',
          border: `6px solid ${RED}`,
          borderRadius: 14,
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: 54,
          color: RED,
          whiteSpace: 'nowrap',
          background: 'rgba(11,19,24,0.8)',
        }}
      >
        CORRELATION ≠ PROOF
      </div>
      <Label text="observational studies" y={1090} color={DIM} size={34} at={sec(0.8)} />
    </FadeIn>
  );
};

const SafeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, 6, 22));
  const check = prog(frame, sec(1.0), sec(1.6));
  return (
    <FadeIn>
      <Kicker text="WHAT REGULATORS SAY" color={GREEN} at={4} />
      <div style={{ position: 'absolute', left: 540 - 170, top: 380, opacity: p, transform: `scale(${0.8 + 0.2 * p})` }}>
        <svg width={340} height={400} viewBox="0 0 340 400" style={{ overflow: 'visible', display: 'block' }}>
          <path d="M 170 10 L 320 70 L 320 200 C 320 300 250 360 170 390 C 90 360 20 300 20 200 L 20 70 Z" fill="#12261c" stroke={GREEN} strokeWidth={10} strokeLinejoin="round" />
          <path d="M 95 200 L 150 255 L 250 145" fill="none" stroke={GREEN} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} />
        </svg>
      </div>
      <Chip text="SAFE AT NORMAL AMOUNTS" color={GREEN} x={540} y={850} at={sec(1.4)} size={44} />
      <Label text="within the acceptable daily intake" y={980} color={DIM} size={34} at={sec(2.0)} />
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short17DietSoda: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.sweet)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.sweet, T.tongue)}>
      <SweetScene />
    </Sequence>
    <Sequence {...seq(T.tongue, T.nocal)}>
      <TongueScene />
    </Sequence>
    <Sequence {...seq(T.nocal, T.reward)}>
      <NoCalScene />
    </Sequence>
    <Sequence {...seq(T.reward, T.crave)}>
      <RewardScene />
    </Sequence>
    <Sequence {...seq(T.crave, T.memory)}>
      <CraveScene />
    </Sequence>
    <Sequence {...seq(T.memory, T.safe)}>
      <MemoryScene />
    </Sequence>
    <Sequence {...seq(T.safe, T.final)}>
      <SafeScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <Footnote text="GENERAL INFO · NOT MEDICAL ADVICE" />
    </Sequence>
    <Captions lines={LINES} y={1420} accent={ICE} />
    <ProgressBar color={ICE} />
  </AbsoluteFill>
);

export default Short17DietSoda;
