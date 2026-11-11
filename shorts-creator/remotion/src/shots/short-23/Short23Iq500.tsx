import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_INOUT, EASE_OUT, Kicker, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Chip, DIM, FadeIn, Footnote, Label, sec, seq } from '../../lib/explainer';
import { STAND, StickFigure, lerpPt } from '../../lib/stick';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short23Iq500',
  durationInSeconds: 37.8,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#0e1220';
const GLOW = '#1f2a55';
const BLUE = '#7aa7ff'; // accent
const GOLD = '#f5c76e';
const GREEN = '#7ee08a';
const RED = '#ff6b6b';
const GREY = '#8b93a7';
const GROUND_Y = 1190;

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-23-iq-500/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What if you had an IQ of five hundred?', start: 0.3, end: 2.39 },
  { text: "First, the catch. IQ isn't a power level. It's a ranking. One hundred is average, and one sixty is about one in thirty thousand.", start: 2.74, end: 10.76 },
  { text: 'Five hundred is off the chart. No test could even measure it.', start: 11.11, end: 14.52 },
  { text: "But imagine it anyway. You'd learn a language in days, and see patterns nobody else can.", start: 14.87, end: 19.84 },
  { text: 'The problem? Everyone else would feel painfully slow.', start: 20.19, end: 23.09 },
  { text: 'Conversations, jokes, school, work. All of it, like waiting for a loading bar.', start: 23.44, end: 28.01 },
  { text: "And raw intelligence doesn't guarantee happiness, wealth, or friends.", start: 28.36, end: 31.9 },
  { text: 'The smartest move might be the simplest: stay curious, and stay kind.', start: 32.25, end: 36.24 },
];

const T = { hook: 0, bell: 2.64, imagine: 14.77, slow: 20.09, guarantee: 28.26, final: 32.15, end: 37.8 };

// =============================================================================
// PIECES
// =============================================================================
const Ground: React.FC = () => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
    <line x1={90} y1={GROUND_Y} x2={990} y2={GROUND_Y} stroke="rgba(255,255,255,0.22)" strokeWidth={6} strokeLinecap="round" />
  </svg>
);

// Light-bulb rays around a head position (page pixels).
const Rays: React.FC<{ x: number; y: number; r: number; color: string; frame: number; n?: number }> = ({ x, y, r, color, frame, n = 10 }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
    {Array.from({ length: n }, (_, i) => {
      const a = (i * Math.PI * 2) / n + frame / 60;
      const k = 0.75 + 0.25 * Math.sin(frame / 6 + i);
      return <line key={i} x1={x + Math.cos(a) * r} y1={y + Math.sin(a) * r} x2={x + Math.cos(a) * (r + 36 * k)} y2={y + Math.sin(a) * (r + 36 * k)} stroke={color} strokeWidth={9} strokeLinecap="round" opacity={0.85} />;
    })}
  </svg>
);

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = 1.04 - 0.04 * EASE_INOUT(prog(frame, 0, 30));
  const iq = Math.round(100 + 400 * EASE_OUT(prog(frame, 6, 62)));
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'WHAT IF YOU HAD', color: '#ffffff' },
          { text: '500 IQ?', color: BLUE },
        ]}
        y={220}
        size={100}
        warm
      />
      <div style={{ position: 'absolute', top: 452, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 72, color: GOLD }}>IQ {iq}</div>
      <Ground />
      <Rays x={540} y={952 - 191 * 1.4} r={74} color={GOLD} frame={frame} />
      <StickFigure x={540} y={952} scale={1.4} pose={{ lHand: [-24, -44], rHand: [24, -44] }} face="smile" />
    </AbsoluteFill>
  );
};

// Bell curve that zooms out until 500 fits on the axis.
const BellScene: React.FC = () => {
  const frame = useCurrentFrame();
  const LO = 40;
  const zoom = EASE_INOUT(prog(frame, sec(8.5), sec(10.0)));
  const hi = 180 + 380 * zoom;
  const X0 = 90;
  const W = 900;
  const BASE_Y = 990;
  const H = 400;
  const x = (iq: number) => X0 + ((iq - LO) / (hi - LO)) * W;
  const pdf = (iq: number) => Math.exp(-0.5 * ((iq - 100) / 15) ** 2);
  const pts = Array.from({ length: 141 }, (_, i) => {
    const iq = LO + i;
    return [x(iq), BASE_Y - pdf(iq) * H];
  });
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'} ${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  const draw = prog(frame, sec(1.3), sec(3.4));
  const m100 = prog(frame, sec(4.1), sec(4.5));
  const m160 = prog(frame, sec(5.6), sec(6.0));
  const m500 = prog(frame, sec(9.4), sec(9.9));
  const Mark: React.FC<{ iq: number; k: number; color: string; top: string; sub?: string; h?: number }> = ({ iq, k, color, top, sub, h = 120 }) =>
    k > 0 ? (
      <g opacity={k}>
        <line x1={x(iq)} y1={BASE_Y} x2={x(iq)} y2={BASE_Y + 20} stroke={color} strokeWidth={6} />
        <line x1={x(iq)} y1={BASE_Y} x2={x(iq)} y2={BASE_Y - h} stroke={color} strokeWidth={5} strokeDasharray="10 10" />
        <text x={x(iq)} y={BASE_Y + 66} textAnchor="middle" fill={color} fontSize={44} fontFamily={FONT_MONO} fontWeight={700}>
          {top}
        </text>
        {sub ? (
          <text x={x(iq)} y={BASE_Y + 110} textAnchor="middle" fill="#ffffff" fontSize={30} fontFamily={FONT_BODY} fontWeight={600}>
            {sub}
          </text>
        ) : null}
      </g>
    ) : null;
  return (
    <FadeIn>
      <Kicker text="FIRST, THE CATCH" color={GOLD} at={4} />
      <Chip text="IQ = A RANKING" color={BLUE} x={540} y={300} at={sec(2.9)} size={50} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <line x1={X0} y1={BASE_Y} x2={X0 + W} y2={BASE_Y} stroke="rgba(255,255,255,0.4)" strokeWidth={5} strokeLinecap="round" />
        <path d={`${d} L ${x(180)} ${BASE_Y} L ${x(LO)} ${BASE_Y} Z`} fill={BLUE} opacity={0.18 * draw} />
        <path d={d} fill="none" stroke={BLUE} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        <Mark iq={100} k={m100} color={GREEN} top="100" sub={zoom < 0.5 ? 'average' : undefined} h={H} />
        <Mark iq={160} k={m160} color={GOLD} top="160" sub={zoom < 0.5 ? '1 in 30,000' : undefined} h={150} />
        <Mark iq={500} k={m500} color={RED} top="500" h={0} />
      </svg>
      {/* tiny figure standing way out at 500 */}
      <StickFigure x={x(500)} y={BASE_Y - 170 * 0.5} scale={0.5} pose={{ rHand: [60, -150 + Math.sin(frame / 5) * 14], lHand: [-50, -40] }} face="smile" opacity={m500} flip />
      <Chip text="OFF THE CHART" color={RED} x={540} y={420} at={sec(9.0)} size={46} />
      <Chip text="NO TEST CAN MEASURE IT" color={GOLD} x={540} y={1215} at={sec(10.6)} size={40} />
    </FadeIn>
  );
};

const ImagineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const langs = ['SPANISH', 'JAPANESE', 'ARABIC'];
  // "patterns": scattered dots that connect into a shape
  const dots: [number, number][] = [
    [150, 700],
    [300, 620],
    [240, 860],
    [130, 1010],
    [330, 1080],
    [760, 640],
    [930, 720],
    [820, 880],
    [960, 1030],
    [770, 1090],
  ];
  const order = [0, 1, 5, 6, 7, 8, 9, 4, 3, 2, 0];
  const link = prog(frame, sec(3.4), sec(4.8));
  const total = order.length - 1;
  return (
    <FadeIn>
      <Kicker text="BUT IMAGINE IT ANYWAY" color={BLUE} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {order.slice(0, -1).map((a, i) => {
          const k = Math.max(0, Math.min(1, link * total - i));
          const [x1, y1] = dots[a];
          const [x2, y2] = dots[order[i + 1]];
          return k > 0 ? <line key={i} x1={x1} y1={y1} x2={x1 + (x2 - x1) * k} y2={y1 + (y2 - y1) * k} stroke={GOLD} strokeWidth={5} strokeLinecap="round" opacity={0.8} /> : null;
        })}
        {dots.map(([dx, dy], i) => (
          <circle key={i} cx={dx} cy={dy} r={11} fill="#ffffff" opacity={0.35 + 0.65 * prog(frame, sec(3.0) + i * 2, sec(3.3) + i * 2)} />
        ))}
      </svg>
      {langs.map((l, i) => {
        const at = sec(1.5) + i * 12;
        const p = EASE_OUT(prog(frame, at, at + 9));
        return (
          <div key={l} style={{ position: 'absolute', top: 290 + i * 92, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p, transform: `translateX(${(1 - p) * 50}px)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '12px 30px', borderRadius: 18, background: 'rgba(255,255,255,0.07)', border: `3px solid ${GREEN}` }}>
              <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: DIM }}>DAY {i + 1}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 46, color: '#fff' }}>{l}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 46, color: GREEN }}>✓</span>
            </div>
          </div>
        );
      })}
      <Ground />
      <Rays x={540} y={952 - 191 * 1.3} r={78} color={GOLD} frame={frame} n={8} />
      <StickFigure x={540} y={969} scale={1.3} pose={{ lHand: [-34, -86], rHand: [34, -86], elbows: 'out' }} face="smile">
        {/* open book in both hands */}
        <path d="M -46 -100 L 0 -90 L 46 -100 L 46 -66 L 0 -56 L -46 -66 Z" fill="#e8ecf5" stroke="#10131a" strokeWidth={4} strokeLinejoin="round" />
        <line x1={0} y1={-90} x2={0} y2={-56} stroke="#10131a" strokeWidth={4} />
      </StickFigure>
      <Label text="patterns nobody else sees" y={1215} color={GOLD} size={38} at={sec(3.8)} />
    </FadeIn>
  );
};

const SlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const slow = frame / 70; // everyone else moves in slow motion
  const tap = Math.max(0, Math.sin(frame / 3.2)) * 14; // impatient foot tap
  const load = 0.04 + 0.3 * prog(frame, 0, sec(8.0));
  const said = 'Sooo… aaanywaaay…';
  const shown = said.slice(0, Math.floor(prog(frame, sec(0.6), sec(6.5)) * said.length));
  const words = ['CONVERSATIONS', 'JOKES', 'SCHOOL', 'WORK'];
  return (
    <FadeIn>
      <Kicker text="THE PROBLEM" color={RED} at={4} />
      {/* loading bar */}
      <div style={{ position: 'absolute', left: 150, right: 150, top: 290 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 32, color: DIM, marginBottom: 10 }}>
          <span>LOADING{'.'.repeat(1 + (Math.floor(frame / 12) % 3))}</span>
          <span>{Math.round(load * 100)}%</span>
        </div>
        <div style={{ height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div style={{ width: `${load * 100}%`, height: '100%', background: GREY, borderRadius: 20 }} />
        </div>
      </div>
      {words.map((w, i) => (
        <Chip key={w} text={w} color={GREY} x={i % 2 ? 760 : 320} y={430 + Math.floor(i / 2) * 86} at={sec(3.4) + i * 16} size={34} />
      ))}
      <Ground />
      <StickFigure x={210} y={GROUND_Y - 170 * 1.1} scale={1.1} color={GREY} pose={{ rHand: [70, -90 + Math.sin(slow) * 30], lHand: [-50, -40], lean: 6 }} face="smile" />
      <StickFigure x={870} y={GROUND_Y - 170 * 1.1} scale={1.1} color={GREY} pose={{ lHand: [-70, -90 + Math.cos(slow) * 30], rHand: [50, -40], lean: -6 }} face="smile" />
      <StickFigure x={540} y={GROUND_Y - 170 * 1.35} scale={1.35} pose={{ lHand: [-24, -44], rHand: [24, -44], rFoot: [34, 170 - tap] }} face="neutral" />
      {/* slow speech bubble */}
      <div style={{ position: 'absolute', left: 50, top: 600, padding: '14px 24px', borderRadius: 24, background: 'rgba(255,255,255,0.1)', border: `3px solid ${GREY}`, fontFamily: FONT_BODY, fontWeight: 600, fontSize: 34, color: '#fff', minWidth: 60, opacity: prog(frame, sec(0.5), sec(0.8)) }}>
        {shown || '…'}
      </div>
    </FadeIn>
  );
};

const GuaranteeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const items = ['HAPPINESS', 'WEALTH', 'FRIENDS'];
  return (
    <FadeIn>
      <Kicker text="NOT GUARANTEED" color={GOLD} at={4} />
      {items.map((t, i) => {
        const at = sec(1.9) + i * 15;
        const p = EASE_OUT(prog(frame, at, at + 9));
        const strike = prog(frame, at + 8, at + 16);
        return (
          <div key={t} style={{ position: 'absolute', top: 310 + i * 110, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: p, transform: `scale(${0.85 + 0.15 * p})` }}>
            <div style={{ position: 'relative', padding: '14px 40px', borderRadius: 999, border: `3px solid ${GOLD}`, background: `${GOLD}1f`, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 52, color: GOLD }}>
              {t}
              <div style={{ position: 'absolute', left: 24, top: '50%', height: 7, width: `calc(${strike * 100}% - ${48 * strike}px)`, background: RED, borderRadius: 4 }} />
            </div>
          </div>
        );
      })}
      <Ground />
      <StickFigure x={540} y={GROUND_Y - 170 * 1.3} scale={1.3} pose={{ lHand: [-40, -30], rHand: [40, -30], lean: -4 }} face="sad" />
    </FadeIn>
  );
};

const FinalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const come = EASE_OUT(prog(frame, sec(0.4), sec(1.6)));
  const wave = Math.sin(frame / 5) * 16;
  return (
    <FadeIn>
      <Kicker text="THE SMARTEST MOVE" color={GREEN} at={4} />
      <Chip text="STAY CURIOUS" color={BLUE} x={540} y={320} at={sec(2.9)} size={56} />
      <Chip text="STAY KIND" color={GREEN} x={540} y={440} at={sec(3.7)} size={56} />
      <Ground />
      <StickFigure x={540 - 400 + 160 * come} y={GROUND_Y - 170 * 1.15} scale={1.15} color="#a9c4ff" pose={{ rHand: lerpPt(STAND.rHand, [70, -150 + wave], come), lHand: [-50, -40] }} face="smile" />
      <StickFigure x={540 + 400 - 160 * come} y={GROUND_Y - 170 * 1.15} scale={1.15} color="#b8f0c0" pose={{ lHand: lerpPt(STAND.lHand, [-70, -150 - wave], come), rHand: [50, -40] }} face="smile" />
      <StickFigure x={540} y={GROUND_Y - 170 * 1.35} scale={1.35} pose={{ lHand: [-76, -30], rHand: [76, -30] }} face="smile" />
      <Footnote text="A THOUGHT EXPERIMENT · REAL IQ TESTS TOP OUT NEAR 160" y={1320} />
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short23Iq500: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.bell)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.bell, T.imagine)}>
      <BellScene />
    </Sequence>
    <Sequence {...seq(T.imagine, T.slow)}>
      <ImagineScene />
    </Sequence>
    <Sequence {...seq(T.slow, T.guarantee)}>
      <SlowScene />
    </Sequence>
    <Sequence {...seq(T.guarantee, T.final)}>
      <GuaranteeScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <FinalScene />
    </Sequence>
    <Captions lines={LINES} y={1440} accent={BLUE} />
    <ProgressBar color={BLUE} />
  </AbsoluteFill>
);

export default Short23Iq500;
