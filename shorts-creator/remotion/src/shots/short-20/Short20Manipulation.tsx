import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_INOUT, EASE_OUT, Kicker, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Chip, DIM, FadeIn, Footnote, Label, sec, seq } from '../../lib/explainer';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short20Manipulation',
  durationInSeconds: 40,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#120e18';
const GLOW = '#2c1f45';
const VIOLET = '#b79bff'; // accent
const AMBER = '#ffb347';
const RED = '#ff6b6b';
const BLUE = '#6ea8ff';
const GREEN = '#7ee08a';
const PINK = '#ff8fc7';

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-20-manipulation/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: "How do you know when you're being manipulated?", start: 0.3, end: 2.41 },
  { text: 'Sign one: urgency. Decide right now. Pressure stops you from thinking.', start: 2.76, end: 6.92 },
  { text: "Sign two: guilt. After everything I've done for you. Your kindness becomes a lever.", start: 7.27, end: 12.13 },
  { text: 'Sign three: doubt. That never happened. You start questioning your own memory.', start: 12.48, end: 16.66 },
  { text: 'Sign four: hot and cold. Affection, then silence. The uncertainty keeps you chasing.', start: 17.01, end: 22.37 },
  { text: "Sign five: isolation. They don't want you asking anyone else.", start: 22.72, end: 26.28 },
  { text: 'The clearest signal is how you feel afterward: confused, guilty, or anxious.', start: 26.63, end: 31.2 },
  { text: "The fix is simple. Slow down. Say: I'll think about it. Manipulation hates time.", start: 31.55, end: 36.54 },
];

const T = { hook: 0, s1: 2.66, s2: 7.17, s3: 12.38, s4: 16.91, s5: 22.62, feel: 26.53, fix: 31.45, final: 37.0, end: 40 };

// =============================================================================
// PIECES
// =============================================================================
const SignNumber: React.FC<{ n: number; title: string; color: string }> = ({ n, title, color }) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, 2, 16));
  return (
    <div style={{ position: 'absolute', top: 270, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, opacity: p, transform: `translateY(${(1 - p) * 20}px)` }}>
      <div style={{ width: 110, height: 110, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 70, color: BASE }}>{n}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 92, color, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</div>
    </div>
  );
};

// Speech bubble (what the manipulator says).
const Bubble: React.FC<{ text: string; y: number; at: number; color?: string; size?: number; tail?: 'left' | 'right' }> = ({ text, y, at, color = '#ffffff', size = 52, tail = 'left' }) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, at, at + 10));
  return (
    <div style={{ position: 'absolute', top: y, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p, transform: `scale(${0.85 + 0.15 * p})` }}>
      <div style={{ position: 'relative', maxWidth: 820, padding: '30px 44px', borderRadius: 36, background: 'rgba(255,255,255,0.1)', border: `4px solid ${color}`, fontFamily: FONT_BODY, fontWeight: 600, fontSize: size, color, textAlign: 'center', lineHeight: 1.2 }}>
        “{text}”
        <div style={{ position: 'absolute', bottom: -26, [tail]: 80, width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderTop: `26px solid ${color}` } as React.CSSProperties} />
      </div>
    </div>
  );
};

// Puppet on strings (hook).
const Puppet: React.FC<{ x: number; y: number; draw?: number }> = ({ x, y, draw = 1 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 14) * 16;
  const barTilt = Math.sin(frame / 14) * 5;
  const head = { x: 200 + sway, y: 300 };
  const lh = { x: 110 + sway * 1.6, y: 410 - Math.sin(frame / 14) * 30 };
  const rh = { x: 290 + sway * 1.6, y: 410 + Math.sin(frame / 14) * 30 };
  return (
    <div style={{ position: 'absolute', left: x - 200, top: y, opacity: draw }}>
      <svg width={400} height={640} viewBox="0 0 400 640" style={{ overflow: 'visible', display: 'block' }}>
        <g transform={`rotate(${barTilt} 200 40)`}>
          <rect x={60} y={30} width={280} height={22} rx={11} fill={VIOLET} />
          <rect x={189} y={0} width={22} height={52} rx={11} fill={VIOLET} />
        </g>
        {[
          [90, 44, lh.x, lh.y],
          [200, 44, head.x, head.y - 46],
          [310, 44, rh.x, rh.y],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.55)" strokeWidth={4} />
        ))}
        <circle cx={head.x} cy={head.y} r={46} fill="#ffffff" />
        <line x1={head.x} y1={head.y + 46} x2={200 + sway} y2={500} stroke="#ffffff" strokeWidth={26} strokeLinecap="round" />
        <polyline points={`${lh.x},${lh.y} ${200 + sway},${370} ${rh.x},${rh.y}`} fill="none" stroke="#ffffff" strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={`${150 + sway * 0.5},${620} ${200 + sway},${500} ${250 + sway * 0.5},${620}`} fill="none" stroke="#ffffff" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.04 * EASE_INOUT(prog(frame, 0, 90)) : 1.05 - 0.05 * EASE_INOUT(prog(frame, 0, 30));
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'ARE YOU BEING', color: '#ffffff' },
          { text: 'MANIPULATED?', color: VIOLET },
        ]}
        subtitle="5 signs to watch for"
        y={230}
        size={104}
        warm={!loop}
      />
      <Puppet x={540} y={560} draw={loop ? 1 : prog(frame, 0, 14)} />
    </AbsoluteFill>
  );
};

const UrgencyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const left = 1 - prog(frame, sec(0.6), sec(4.2));
  const R = 130;
  const C = 2 * Math.PI * R;
  const shake = Math.sin(frame * 1.3) * 4 * prog(frame, sec(2.4), sec(3.0));
  return (
    <FadeIn>
      <SignNumber n={1} title="Urgency" color={AMBER} />
      <Bubble text="Decide RIGHT NOW." y={470} at={sec(1.3)} color={AMBER} size={60} />
      <div style={{ position: 'absolute', left: 540 - 160 + shake, top: 760 }}>
        <svg width={320} height={320} viewBox="-160 -160 320 320">
          <circle r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={26} />
          <circle r={R} fill="none" stroke={left < 0.3 ? RED : AMBER} strokeWidth={26} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - left)} transform="rotate(-90)" />
          <text y={26} textAnchor="middle" fill="#fff" fontSize={92} fontFamily={FONT_MONO} fontWeight={700}>
            {Math.max(0, Math.ceil(left * 9))}
          </text>
        </svg>
      </div>
      <Label text="no time to think" y={1130} color={DIM} size={38} at={sec(3.0)} />
    </FadeIn>
  );
};

const GuiltScene: React.FC = () => {
  const frame = useCurrentFrame();
  const pull = EASE_INOUT(prog(frame, sec(3.4), sec(4.4)));
  return (
    <FadeIn>
      <SignNumber n={2} title="Guilt" color={PINK} />
      <Bubble text="After everything I've done for you…" y={460} at={sec(1.4)} color={PINK} size={50} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        {/* heart */}
        <path d="M 420 960 C 300 870 340 780 420 830 C 500 780 540 870 420 960 Z" fill={PINK} transform={`translate(${pull * 26} 0)`} />
        {/* lever: pivot at (640, 1000), arm rotates as it is pulled */}
        <circle cx={640} cy={1000} r={22} fill="#ffffff" />
        <g transform={`rotate(${-25 + pull * 50} 640 1000)`}>
          <line x1={640} y1={1000} x2={640} y2={790} stroke="#ffffff" strokeWidth={16} strokeLinecap="round" />
          <circle cx={640} cy={780} r={30} fill={AMBER} />
        </g>
        <line x1={480 + pull * 26} y1={890} x2={640} y2={1000} stroke="rgba(255,255,255,0.5)" strokeWidth={6} strokeDasharray="12 10" />
      </svg>
      <Label text="your kindness = their lever" y={1120} color={PINK} size={42} at={sec(3.6)} />
    </FadeIn>
  );
};

const DoubtScene: React.FC = () => {
  const frame = useCurrentFrame();
  const blur = prog(frame, sec(2.4), sec(3.8));
  const q = EASE_OUT(prog(frame, sec(3.0), sec(3.5)));
  return (
    <FadeIn>
      <SignNumber n={3} title="Doubt" color={BLUE} />
      <Bubble text="That never happened." y={470} at={sec(1.2)} color={BLUE} size={56} />
      {/* a memory "photo" that blurs out */}
      <div style={{ position: 'absolute', left: 540 - 190, top: 760, width: 380, height: 300, borderRadius: 22, background: '#1d1830', border: '8px solid #ffffff', overflow: 'hidden', filter: `blur(${blur * 12}px)`, opacity: 1 - blur * 0.45 }}>
        <svg width={380} height={300}>
          <circle cx={290} cy={80} r={40} fill={AMBER} />
          <path d="M 0 300 L 110 150 L 190 230 L 260 170 L 380 300 Z" fill={BLUE} />
          <circle cx={120} cy={235} r={22} fill="#ffffff" />
          <rect x={102} y={255} width={36} height={45} rx={12} fill="#ffffff" />
        </svg>
      </div>
      <div style={{ position: 'absolute', left: 540 - 100, width: 200, top: 800, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 200, color: BLUE, opacity: q, transform: `scale(${0.6 + 0.4 * q})`, textShadow: '0 4px 30px rgba(0,0,0,0.7)' }}>?</div>
      <Label text="you doubt your own memory" y={1130} color={DIM} size={38} at={sec(3.2)} />
    </FadeIn>
  );
};

const HotColdScene: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 840;
  const H = 300;
  const draw = prog(frame, sec(0.8), sec(4.8));
  // affection level: square-ish swings between hot and cold
  const lvl = (k: number) => 0.5 + 0.42 * Math.tanh(3 * Math.sin(k * Math.PI * 5));
  const pts = Array.from({ length: 161 }, (_, i) => [(i / 160) * W, H - lvl(i / 160) * H]);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const cur = lvl(draw);
  return (
    <FadeIn>
      <SignNumber n={4} title="Hot & Cold" color={RED} />
      <div style={{ position: 'absolute', left: 120, top: 570 }}>
        <svg width={W} height={H} style={{ overflow: 'visible', display: 'block' }}>
          <defs>
            <linearGradient id="hc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={RED} />
              <stop offset="1" stopColor={BLUE} />
            </linearGradient>
          </defs>
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.15)" strokeWidth={3} strokeDasharray="12 10" />
          <path d={d} fill="none" stroke="url(#hc)" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
          <circle cx={draw * W} cy={H - cur * H} r={20} fill={cur > 0.5 ? RED : BLUE} />
        </svg>
      </div>
      <Chip text="AFFECTION" color={RED} x={300} y={450} at={sec(1.6)} size={40} />
      <Chip text="SILENCE" color={BLUE} x={780} y={910} at={sec(2.6)} size={40} />
      <Label text="uncertainty keeps you chasing" y={1080} color={DIM} size={38} at={sec(3.8)} />
    </FadeIn>
  );
};

const IsolationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const friends = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI * 2) / 6 - Math.PI / 2;
    return { x: 540 + Math.cos(a) * 300, y: 800 + Math.sin(a) * 250, cut: prog(frame, sec(1.4) + i * 7, sec(1.8) + i * 7) };
  });
  return (
    <FadeIn>
      <SignNumber n={5} title="Isolation" color={VIOLET} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {friends.map((f, i) => (
          <g key={i} opacity={1 - f.cut * 0.8}>
            <line x1={540} y1={800} x2={f.x} y2={f.y} stroke="rgba(255,255,255,0.45)" strokeWidth={6} strokeDasharray={f.cut > 0.05 ? '10 16' : undefined} />
            <circle cx={f.x} cy={f.y} r={38} fill={GREEN} />
          </g>
        ))}
        <circle cx={540} cy={800} r={58} fill="#ffffff" />
        <circle cx={540} cy={800} r={84} fill="none" stroke={VIOLET} strokeWidth={8} opacity={prog(frame, sec(2.4), sec(3.0))} strokeDasharray="18 14" />
      </svg>
      <Label text="cut off from second opinions" y={1130} color={DIM} size={38} at={sec(2.4)} />
    </FadeIn>
  );
};

const FeelScene: React.FC = () => {
  const frame = useCurrentFrame();
  const swirl = frame * 3;
  return (
    <FadeIn>
      <Kicker text="THE CLEAREST SIGNAL" color={AMBER} at={4} />
      <Label text="how you feel afterward" y={300} color="#ffffff" size={58} at={6} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <circle cx={540} cy={640} r={120} fill="#ffffff" />
        <g transform={`rotate(${swirl} 540 640)`}>
          <path d="M 540 640 m -60 0 a 60 60 0 1 1 60 60 a 40 40 0 1 1 -40 -40 a 22 22 0 1 1 22 22" fill="none" stroke={BASE} strokeWidth={10} strokeLinecap="round" />
        </g>
      </svg>
      <Chip text="CONFUSED" color={BLUE} x={540} y={840} at={sec(2.6)} size={50} />
      <Chip text="GUILTY" color={PINK} x={340} y={970} at={sec(3.3)} size={50} />
      <Chip text="ANXIOUS" color={AMBER} x={740} y={970} at={sec(3.9)} size={50} />
    </FadeIn>
  );
};

const FixScene: React.FC = () => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, sec(1.2), sec(1.7)));
  const hand = (frame / 30) * 60;
  return (
    <FadeIn>
      <Kicker text="THE FIX" color={GREEN} at={4} />
      <div style={{ position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44, opacity: p, transform: `scale(${0.7 + 0.3 * p})` }}>
        <div style={{ width: 70, height: 210, borderRadius: 18, background: GREEN }} />
        <div style={{ width: 70, height: 210, borderRadius: 18, background: GREEN }} />
      </div>
      <Label text="SLOW DOWN" y={540} color={GREEN} size={72} at={sec(1.3)} />
      <Bubble text="I'll think about it." y={690} at={sec(2.4)} color="#ffffff" size={60} tail="right" />
      <div style={{ position: 'absolute', left: 540 - 60, top: 920, opacity: prog(frame, sec(3.6), sec(4.0)) }}>
        <svg width={120} height={120} viewBox="-60 -60 120 120">
          <circle r={52} fill="none" stroke={GREEN} strokeWidth={8} />
          <line x1={0} y1={0} x2={0} y2={-36} stroke={GREEN} strokeWidth={8} strokeLinecap="round" transform={`rotate(${hand})`} />
          <line x1={0} y1={0} x2={22} y2={0} stroke={GREEN} strokeWidth={8} strokeLinecap="round" />
        </svg>
      </div>
      <Chip text="MANIPULATION HATES TIME" color={GREEN} x={540} y={1090} at={sec(3.8)} size={42} />
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short20Manipulation: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.s1)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.s1, T.s2)}>
      <UrgencyScene />
    </Sequence>
    <Sequence {...seq(T.s2, T.s3)}>
      <GuiltScene />
    </Sequence>
    <Sequence {...seq(T.s3, T.s4)}>
      <DoubtScene />
    </Sequence>
    <Sequence {...seq(T.s4, T.s5)}>
      <HotColdScene />
    </Sequence>
    <Sequence {...seq(T.s5, T.feel)}>
      <IsolationScene />
    </Sequence>
    <Sequence {...seq(T.feel, T.fix)}>
      <FeelScene />
    </Sequence>
    <Sequence {...seq(T.fix, T.final)}>
      <FixScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <Footnote text="GENERAL INFO · NOT A DIAGNOSIS" />
    </Sequence>
    <Captions lines={LINES} y={1420} accent={VIOLET} />
    <ProgressBar color={VIOLET} />
  </AbsoluteFill>
);

export default Short20Manipulation;
