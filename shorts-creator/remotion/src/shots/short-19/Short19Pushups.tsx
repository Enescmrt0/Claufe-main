import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_INOUT, EASE_OUT, Kicker, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Chip, DIM, FadeIn, Footnote, Label, Meter, sec, seq } from '../../lib/explainer';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short19Pushups',
  durationInSeconds: 43.4,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#0d1210';
const GLOW = '#1d3a2c';
const ORANGE = '#ff9d4d'; // accent
const GREEN = '#7ee08a';
const BLUE = '#6ea8ff';
const RED = '#ff6b6b';
const GOLD = '#f5c76e';

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-19-pushups/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What happens if you do one hundred push-ups every day?', start: 0.3, end: 3.12 },
  { text: "Week one. You're sore. Tiny tears in the muscle fibers are being repaired.", start: 3.47, end: 7.67 },
  { text: 'Week two. It gets easier, but not from new muscle. Your nervous system is learning to fire more fibers.', start: 8.02, end: 14.08 },
  { text: 'Around week four to eight, real growth shows up: chest, shoulders and triceps.', start: 14.43, end: 19.0 },
  { text: 'Then you hit a plateau. Your body has adapted, and a hundred reps just builds endurance.', start: 19.35, end: 24.34 },
  { text: 'And push-ups only train pushing. Skip pulling exercises, and your shoulders can start to round forward.', start: 24.69, end: 30.79 },
  { text: 'No rest days is a risk too. Muscles grow while you recover, and wrists and elbows can get overused.', start: 31.14, end: 37.13 },
  { text: "So yes, you'll get stronger. To keep growing, make them harder, and take days off.", start: 37.48, end: 41.94 },
];

const T = { hook: 0, w1: 3.37, w2: 7.92, grow: 14.33, plateau: 19.25, pull: 24.59, rest: 31.04, final: 37.38, end: 43.4 };

// =============================================================================
// PIECES
// =============================================================================
// Side-view stick figure doing push-ups. `t` is the rep phase (0 = top, 0.5 = bottom, 1 = top).
const PushupFigure: React.FC<{ x: number; y: number; t: number; color?: string; scale?: number }> = ({ x, y, t, color = '#ffffff', scale = 1 }) => {
  const down = 0.5 - 0.5 * Math.cos(t * Math.PI * 2); // 0 top .. 1 bottom
  const L = 105; // upper arm = forearm length
  const ground = 300;
  const hand = { x: 150, y: ground };
  const h = 196 - 120 * down; // shoulder height above the hand
  const shoulder = { x: 150, y: ground - h };
  const feet = { x: 640, y: ground - 10 };
  const bend = Math.sqrt(Math.max(0, L * L - (h / 2) * (h / 2)));
  const elbow = { x: hand.x + bend, y: ground - h / 2 };
  const head = { x: shoulder.x - 62, y: shoulder.y - 26 };
  return (
    <div style={{ position: 'absolute', left: x - 370 * scale, top: y }}>
      <svg width={740 * scale} height={340 * scale} viewBox="0 0 740 340" style={{ overflow: 'visible', display: 'block' }}>
        <line x1={40} y1={ground + 16} x2={700} y2={ground + 16} stroke="rgba(255,255,255,0.25)" strokeWidth={6} strokeLinecap="round" />
        <line x1={shoulder.x} y1={shoulder.y} x2={feet.x} y2={feet.y} stroke={color} strokeWidth={34} strokeLinecap="round" />
        <polyline points={`${shoulder.x},${shoulder.y} ${elbow.x},${elbow.y} ${hand.x},${hand.y}`} fill="none" stroke={ORANGE} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={head.x} cy={head.y} r={40} fill={color} />
      </svg>
    </div>
  );
};

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.04 * EASE_INOUT(prog(frame, 0, 170)) : 1.05 - 0.05 * EASE_INOUT(prog(frame, 0, 30));
  const rep = frame / 36;
  const count = loop ? 100 : Math.min(100, Math.round(EASE_OUT(prog(frame, 6, 78)) * 100));
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: '100 PUSH-UPS', color: '#ffffff' },
          { text: 'EVERY DAY', color: ORANGE },
        ]}
        subtitle="what happens to your body"
        y={250}
        size={108}
        warm={!loop}
      />
      <div style={{ position: 'absolute', top: 590, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 96, color: ORANGE }}>
        {count}
        <span style={{ fontSize: 44, color: DIM }}> / day</span>
      </div>
      <PushupFigure x={540} y={720} t={rep % 1} />
    </AbsoluteFill>
  );
};

const Week1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const repair = prog(frame, sec(2.4), sec(3.8));
  // muscle fibre bundle: horizontal strands with small tears that close up
  const strands = Array.from({ length: 7 }, (_, i) => ({ y: 520 + i * 52, tear: i % 2 === 0 ? 300 + ((i * 97) % 380) : -1 }));
  return (
    <FadeIn>
      <Kicker text="WEEK 1" color={ORANGE} at={4} />
      <Chip text="SORE" color={RED} x={540} y={340} at={sec(0.9)} size={56} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {strands.map((s, i) => {
          const gap = s.tear > 0 ? 34 * (1 - repair) : 0;
          return (
            <g key={i}>
              {s.tear > 0 ? (
                <>
                  <line x1={170} y1={s.y} x2={s.tear - gap} y2={s.y} stroke="#c8453a" strokeWidth={34} strokeLinecap="round" />
                  <line x1={s.tear + gap} y1={s.y} x2={910} y2={s.y} stroke="#c8453a" strokeWidth={34} strokeLinecap="round" />
                  <circle cx={s.tear} cy={s.y} r={10 + 8 * repair} fill={GREEN} opacity={repair} style={{ filter: `drop-shadow(0 0 10px ${GREEN})` }} />
                </>
              ) : (
                <line x1={170} y1={s.y} x2={910} y2={s.y} stroke="#c8453a" strokeWidth={34} strokeLinecap="round" />
              )}
            </g>
          );
        })}
      </svg>
      <Label text="tiny tears → repaired" y={940} color={GREEN} size={46} at={sec(2.6)} />
      <Label text="muscle fibers" y={1030} color={DIM} size={34} at={sec(1.2)} mono />
    </FadeIn>
  );
};

const Week2Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const learn = EASE_INOUT(prog(frame, sec(3.6), sec(5.6)));
  const active = Math.round(4 + 10 * learn); // fibers firing out of 16
  const order = [5, 10, 6, 9, 1, 14, 2, 13, 4, 11, 7, 8, 0, 15, 3, 12];
  const pulse = (frame % 18) / 18;
  return (
    <FadeIn>
      <Kicker text="WEEK 2 · IT GETS EASIER" color={BLUE} at={4} />
      <Chip text="NOT NEW MUSCLE" color={GOLD} x={540} y={330} at={sec(1.8)} size={44} />
      {/* nerve signal coming down into the fibre grid */}
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <line x1={540} y1={450} x2={540} y2={560} stroke="rgba(255,255,255,0.3)" strokeWidth={10} strokeLinecap="round" />
        <circle cx={540} cy={450 + pulse * 110} r={16} fill={BLUE} style={{ filter: `drop-shadow(0 0 12px ${BLUE})` }} />
      </svg>
      {Array.from({ length: 16 }, (_, i) => {
        const on = order.indexOf(i) < active;
        const r = Math.floor(i / 4);
        const c = i % 4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 540 + (c - 1.5) * 150 - 55,
              top: 590 + r * 110,
              width: 110,
              height: 80,
              borderRadius: 40,
              background: on ? BLUE : 'rgba(255,255,255,0.1)',
              boxShadow: on ? `0 0 26px ${BLUE}` : 'none',
            }}
          />
        );
      })}
      <div style={{ position: 'absolute', top: 1060, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 44, color: BLUE }}>
        fibers firing: {active} / 16
      </div>
      <Label text="your nervous system learns" y={1140} color={DIM} size={34} at={sec(3.8)} />
    </FadeIn>
  );
};

const GrowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const g = EASE_INOUT(prog(frame, sec(1.4), sec(3.2)));
  return (
    <FadeIn>
      <Kicker text="WEEK 4–8 · REAL GROWTH" color={GREEN} at={4} />
      {/* fibre cross-section growing */}
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const a = (i * Math.PI * 2) / 6;
          const cx = i === 6 ? 540 : 540 + Math.cos(a) * (92 + 26 * g);
          const cy = i === 6 ? 560 : 560 + Math.sin(a) * (92 + 26 * g);
          return <circle key={i} cx={cx} cy={cy} r={42 + 14 * g} fill="#c8453a" stroke="#f3a79b" strokeWidth={5} />;
        })}
      </svg>
      <Chip text="CHEST" color={GREEN} x={190} y={800} at={sec(3.0)} size={38} />
      <Chip text="SHOULDERS" color={GREEN} x={520} y={800} at={sec(3.6)} size={38} />
      <Chip text="TRICEPS" color={GREEN} x={870} y={800} at={sec(4.1)} size={38} />
      <Meter y={960} label="MUSCLE SIZE" value={0.35 + 0.4 * g} color={GREEN} />
    </FadeIn>
  );
};

const PlateauScene: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 820;
  const H = 400;
  const curve = (k: number) => (k < 0.55 ? 0.15 + 0.6 * Math.sin((k / 0.55) * (Math.PI / 2)) : 0.75);
  const pts = Array.from({ length: 81 }, (_, i) => [(i / 80) * W, H - curve(i / 80) * H]);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const draw = prog(frame, 6, sec(2.6));
  return (
    <FadeIn>
      <Kicker text="THEN: THE PLATEAU" color={GOLD} at={4} />
      <div style={{ position: 'absolute', left: 130, top: 380 }}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: DIM, marginBottom: 10 }}>strength</div>
        <svg width={W} height={H + 60} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.35)" strokeWidth={4} />
          <line x1={0} y1={0} x2={0} y2={H} stroke="rgba(255,255,255,0.35)" strokeWidth={4} />
          <text x={W} y={H + 48} textAnchor="end" fill={DIM} fontSize={30} fontFamily={FONT_MONO}>
            weeks →
          </text>
          <path d={d} fill="none" stroke={GOLD} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
          <text x={W * 0.78} y={H - 0.75 * H - 30} textAnchor="middle" fill={GOLD} fontSize={44} fontFamily={FONT_DISPLAY} fontWeight={700} opacity={prog(frame, sec(1.6), sec(2.0))}>
            PLATEAU
          </text>
        </svg>
      </div>
      <Chip text="100 REPS = ENDURANCE" color={BLUE} x={540} y={960} at={sec(3.4)} size={44} />
    </FadeIn>
  );
};

const PullScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = EASE_INOUT(prog(frame, sec(1.6), sec(3.0))) * 14;
  const Pan: React.FC<{ x: number; label: string; color: string; full: boolean }> = ({ x, label, color, full }) => (
    <g transform={`translate(${x} 0)`}>
      <line x1={0} y1={0} x2={0} y2={120} stroke="rgba(255,255,255,0.5)" strokeWidth={6} />
      <path d="M -130 120 L 130 120 Q 110 190 0 190 Q -110 190 -130 120 Z" fill="#1c2a23" stroke={color} strokeWidth={6} />
      {full ? <rect x={-70} y={40} width={140} height={80} rx={14} fill={color} /> : null}
      <text x={0} y={250} textAnchor="middle" fill={color} fontSize={46} fontFamily={FONT_DISPLAY} fontWeight={700}>
        {label}
      </text>
    </g>
  );
  return (
    <FadeIn>
      <Kicker text="ONLY PUSHING" color={RED} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <line x1={540} y1={470} x2={540} y2={860} stroke="rgba(255,255,255,0.5)" strokeWidth={12} strokeLinecap="round" />
        <path d="M 440 880 L 640 880 L 600 850 L 480 850 Z" fill="rgba(255,255,255,0.5)" />
        <g transform={`rotate(${-tilt} 540 480)`}>
          <line x1={240} y1={480} x2={840} y2={480} stroke="#ffffff" strokeWidth={12} strokeLinecap="round" />
          <g transform={`translate(240 480) rotate(${tilt})`}>
            <Pan x={0} label="PUSH" color={ORANGE} full />
          </g>
          <g transform={`translate(840 480) rotate(${tilt})`}>
            <Pan x={0} label="PULL" color={BLUE} full={false} />
          </g>
        </g>
      </svg>
      <Chip text="SHOULDERS ROUND FORWARD" color={RED} x={540} y={980} at={sec(4.2)} size={40} />
      <Label text="add rows or pull-ups" y={1110} color={BLUE} size={40} at={sec(5.0)} />
    </FadeIn>
  );
};

const RestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <FadeIn>
      <Kicker text="NO REST DAYS" color={RED} at={4} />
      <div style={{ position: 'absolute', left: 90, right: 90, top: 380, display: 'flex', justifyContent: 'space-between' }}>
        {days.map((d, i) => {
          const p = EASE_OUT(prog(frame, 8 + i * 5, 18 + i * 5));
          return (
            <div key={i} style={{ width: 112, height: 150, borderRadius: 20, background: `${RED}33`, border: `4px solid ${RED}`, opacity: p, transform: `scale(${0.7 + 0.3 * p})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: DIM }}>{d}</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: RED }}>100</div>
            </div>
          );
        })}
      </div>
      <Label text="muscles grow while you RECOVER" y={610} color={GREEN} size={44} at={sec(2.0)} />
      <Chip text="WRISTS" color={GOLD} x={340} y={800} at={sec(4.0)} size={50} />
      <Chip text="ELBOWS" color={GOLD} x={740} y={800} at={sec(4.6)} size={50} />
      <Label text="overuse risk" y={940} color={DIM} size={36} at={sec(4.8)} mono />
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short19Pushups: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.w1)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.w1, T.w2)}>
      <Week1Scene />
    </Sequence>
    <Sequence {...seq(T.w2, T.grow)}>
      <Week2Scene />
    </Sequence>
    <Sequence {...seq(T.grow, T.plateau)}>
      <GrowScene />
    </Sequence>
    <Sequence {...seq(T.plateau, T.pull)}>
      <PlateauScene />
    </Sequence>
    <Sequence {...seq(T.pull, T.rest)}>
      <PullScene />
    </Sequence>
    <Sequence {...seq(T.rest, T.final)}>
      <RestScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <Chip text="MAKE THEM HARDER" color={ORANGE} x={300} y={1110} at={sec(2.0)} size={34} />
      <Chip text="TAKE DAYS OFF" color={GREEN} x={790} y={1110} at={sec(3.2)} size={34} />
      <Footnote text="GENERAL INFO · NOT MEDICAL ADVICE" />
    </Sequence>
    <Captions lines={LINES} y={1420} accent={ORANGE} />
    <ProgressBar color={ORANGE} />
  </AbsoluteFill>
);

export default Short19Pushups;
