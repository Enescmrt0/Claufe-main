import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_INOUT, EASE_OUT, Kicker, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Chip, DIM, FadeIn, Footnote, Label, Meter, sec, seq } from '../../lib/explainer';
import { Pose, Pt, STAND, StickFigure, lerpPt, solve, walkPose } from '../../lib/stick';
import { FONT_BODY, FONT_DISPLAY } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short22NoPain',
  durationInSeconds: 33.4,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#11131c';
const GLOW = '#2a2140';
const RED = '#ff5d5d'; // pain
const CYAN = '#7fd8ff'; // accent
const GOLD = '#f5c76e';
const GREEN = '#7ee08a';
const GROUND_Y = 1190;

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-22-no-pain/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What if you stopped feeling pain?', start: 0.3, end: 1.88 },
  { text: 'Sounds like a superpower. No headaches. No stubbed toes.', start: 2.23, end: 5.58 },
  { text: "But pain is your body's alarm system. Nerves warn your brain in a split second.", start: 5.93, end: 10.56 },
  { text: "Without it, you'd grab a hot pan, and not let go.", start: 10.91, end: 13.64 },
  { text: 'You could walk on a broken ankle, and never notice.', start: 13.99, end: 16.64 },
  { text: "Small things add up too. You'd bite your tongue, scratch your eyes, and miss infections.", start: 16.99, end: 21.68 },
  { text: 'And this is real. Some people are born unable to feel pain. Many get badly hurt as children.', start: 22.03, end: 27.94 },
  { text: "Pain isn't your enemy. It's the reason you're still in one piece.", start: 28.29, end: 31.68 },
];

const T = { hook: 0, power: 2.13, alarm: 5.83, pan: 10.81, ankle: 13.89, small: 16.89, real: 21.93, final: 28.19, end: 33.4 };

// =============================================================================
// PIECES
// =============================================================================
const Ground: React.FC<{ scroll?: number }> = ({ scroll = 0 }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
    <line x1={90} y1={GROUND_Y} x2={990} y2={GROUND_Y} stroke="rgba(255,255,255,0.22)" strokeWidth={6} strokeLinecap="round" />
    {scroll !== 0
      ? Array.from({ length: 8 }, (_, i) => {
          const x = 990 - ((i * 120 + scroll) % 900);
          return <line key={i} x1={x} y1={GROUND_Y + 22} x2={x - 50} y2={GROUND_Y + 22} stroke="rgba(255,255,255,0.18)" strokeWidth={5} strokeLinecap="round" />;
        })
      : null}
  </svg>
);

const BOLT = 'M 0 -34 L 16 -4 L 3 -4 L 13 34 L -16 3 L -3 3 Z';

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => {
  const frame = useCurrentFrame();
  const scale = loop ? 1 + 0.03 * EASE_INOUT(prog(frame, 0, 150)) : 1.04 - 0.04 * EASE_INOUT(prog(frame, 0, 30));
  const cx = 540;
  const cy = 800;
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'WHAT IF YOU', color: '#ffffff' },
          { text: 'FELT NO PAIN?', color: RED },
        ]}
        y={230}
        size={108}
        warm={!loop}
      />
      <Ground />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <circle cx={cx} cy={cy} r={300} fill="none" stroke={CYAN} strokeWidth={5} strokeDasharray="16 18" opacity={0.45} />
        {Array.from({ length: 6 }, (_, i) => {
          const a = ([-25, 20, 160, 205, 62, 118][i] * Math.PI) / 180; // never from straight above (the title)
          const t = ((frame + i * 11) % 66) / 66; // fly in, bounce off the bubble, fade
          const r = t < 0.6 ? 560 - (560 - 320) * (t / 0.6) : 320 + (t - 0.6) * 220;
          const o = t < 0.6 ? Math.min(1, t * 5) : 1 - (t - 0.6) / 0.4;
          return <path key={i} d={BOLT} fill={RED} opacity={o} transform={`translate(${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r * 0.9}) rotate(${(a * 180) / Math.PI + 90})`} />;
        })}
      </svg>
      <StickFigure x={540} y={935} scale={1.5} pose={{ lHand: [-24, -44], rHand: [24, -44] }} face="smile" />
    </AbsoluteFill>
  );
};

const PowerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const wave = Math.sin(frame / 7) * 14;
  return (
    <FadeIn>
      <Kicker text="SOUNDS LIKE A SUPERPOWER" color={GOLD} at={4} />
      <Ground />
      <StickFigure
        x={540}
        y={935}
        scale={1.5}
        pose={{ lHand: [-24, -44], rHand: [24, -44], bob: Math.sin(frame / 12) * 3 }}
        face="smile"
        behind={<path d={`M -22 -138 L 22 -138 L ${118 + wave} ${96 + wave * 0.6} Q ${40 + wave} ${70} ${-70 + wave} ${110} Z`} fill={RED} />}
      />
      <Chip text="NO HEADACHES" color={GREEN} x={540} y={330} at={sec(1.5)} size={50} />
      <Chip text="NO STUBBED TOES" color={GREEN} x={540} y={450} at={sec(2.4)} size={50} />
    </FadeIn>
  );
};

const AlarmScene: React.FC = () => {
  const frame = useCurrentFrame();
  const FX = 480;
  const FY = 935;
  const S = 1.5;
  const reach = EASE_INOUT(prog(frame, sec(0.5), sec(1.1)));
  const pull = EASE_OUT(prog(frame, sec(1.5), sec(1.8)));
  const touch: Pt = [128, -92];
  const hand = lerpPt(lerpPt(STAND.rHand, touch, reach), [36, -118], pull);
  const pose: Pose = { rHand: hand, lean: 20 * reach - 34 * pull, lHand: lerpPt(STAND.lHand, [-80, -96], pull) };
  const j = solve(pose);
  // nerve signal: hand -> elbow -> shoulder -> head
  const sig = prog(frame, sec(1.1), sec(1.5));
  const path: Pt[] = [j.rArm.end, j.rArm.joint, j.shoulder, j.head];
  const seg = Math.min(2.999, sig * 3);
  const sp = lerpPt(path[Math.floor(seg)], path[Math.floor(seg) + 1], seg % 1);
  const ouch = prog(frame, sec(1.5), sec(1.7));
  const cactusX = FX + 150 * S;
  return (
    <FadeIn>
      <Kicker text="PAIN = ALARM SYSTEM" color={RED} at={4} />
      <Ground />
      {/* cactus */}
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <g transform={`translate(${cactusX} ${GROUND_Y})`}>
          <rect x={-10} y={-470} width={120} height={470} rx={60} fill="#3f9b5f" />
          <rect x={100} y={-330} width={70} height={46} rx={23} fill="#3f9b5f" />
          <rect x={130} y={-420} width={46} height={130} rx={23} fill="#3f9b5f" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={-10} y1={-430 + i * 48} x2={-34} y2={-438 + i * 48} stroke="#e8f5e9" strokeWidth={5} strokeLinecap="round" />
          ))}
          <rect x={-30} y={-6} width={160} height={12} rx={6} fill="rgba(255,255,255,0.25)" />
        </g>
      </svg>
      <StickFigure x={FX} y={FY} scale={S} pose={pose} face={ouch > 0.2 ? 'ouch' : 'neutral'}>
        {sig > 0 && sig < 1 ? <circle cx={sp[0]} cy={sp[1]} r={15} fill={RED} style={{ filter: `drop-shadow(0 0 10px ${RED})` }} /> : null}
        {ouch > 0 ? <circle cx={j.head[0]} cy={j.head[1]} r={50 + 40 * ouch} fill="none" stroke={RED} strokeWidth={7} opacity={1 - ouch * 0.7} /> : null}
      </StickFigure>
      <div style={{ position: 'absolute', left: FX - 250, top: 420, opacity: ouch, transform: `scale(${0.6 + 0.4 * EASE_OUT(ouch)}) rotate(-8deg)`, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 84, color: RED, textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
        OUCH!
      </div>
      <Chip text="NERVES → BRAIN" color={CYAN} x={540} y={300} at={sec(2.6)} size={46} />
      <Chip text="IN A SPLIT SECOND" color={GOLD} x={540} y={1215} at={sec(3.6)} size={42} />
    </FadeIn>
  );
};

const PanScene: React.FC = () => {
  const frame = useCurrentFrame();
  const FX = 410;
  const FY = 935;
  const S = 1.5;
  const burn = prog(frame, sec(0.6), sec(3.0));
  const hand: Pt = [124, -52];
  const hx = FX + hand[0] * S;
  const hy = FY + hand[1] * S;
  return (
    <FadeIn>
      <Kicker text="WITHOUT THE ALARM" color={RED} at={4} />
      <Meter y={300} label="BURN DAMAGE" value={0.05 + 0.85 * burn} color={RED} />
      <Ground />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {/* stove */}
        <rect x={660} y={900} width={270} height={GROUND_Y - 900} rx={16} fill="#2c3040" stroke="rgba(255,255,255,0.3)" strokeWidth={5} />
        <rect x={690} y={880} width={210} height={20} rx={8} fill="#555c70" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M ${725 + i * 70} 898 q -16 -22 0 -36 q 16 14 0 36`} fill={GOLD} transform={`translate(0 ${Math.sin(frame / 3 + i) * 3})`} />
        ))}
        {/* pan */}
        <rect x={680} y={826} width={230} height={40} rx={12} fill="#8d94a8" />
        <rect x={hx - 16} y={834} width={680 - hx + 30} height={20} rx={10} fill="#5b6072" />
        {/* heat waves */}
        {[0, 1, 2].map((i) => {
          const t = (frame / 40 + i / 3) % 1;
          return <path key={i} d={`M ${720 + i * 70} ${810 - t * 110} q 18 -26 0 -52 q -18 -26 0 -52`} fill="none" stroke={RED} strokeWidth={8} strokeLinecap="round" opacity={Math.sin(t * Math.PI) * 0.8} />;
        })}
        {/* burning hand glow */}
        <circle cx={hx} cy={hy} r={26 + burn * 34 + Math.sin(frame / 3) * 4} fill={RED} opacity={0.25 + 0.4 * burn} />
      </svg>
      <StickFigure x={FX} y={FY} scale={S} pose={{ rHand: hand, lean: 26, lHand: [-50, -44] }} face="smile" />
      <Chip text="NO WARNING · NO REFLEX" color={RED} x={540} y={1215} at={sec(1.5)} size={42} />
    </FadeIn>
  );
};

const AnkleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const FX = 540;
  const FY = 930;
  const S = 1.5;
  const pose = walkPose(frame / 26);
  const j = solve(pose);
  const dmg = prog(frame, sec(0.4), sec(2.8));
  const ring = (frame / 18) % 1;
  return (
    <FadeIn>
      <Kicker text="A BROKEN ANKLE" color={RED} at={4} />
      <Meter y={300} label="DAMAGE" value={0.3 + 0.6 * dmg} color={RED} />
      <Ground scroll={frame * 7} />
      <StickFigure x={FX} y={FY} scale={S} pose={pose} face="smile">
        <circle cx={j.rLeg.end[0]} cy={j.rLeg.end[1] - 10} r={22 + ring * 34} fill="none" stroke={RED} strokeWidth={6} opacity={1 - ring} />
        <path d={`M ${j.rLeg.end[0] - 16} ${j.rLeg.end[1] - 28} l 12 10 l -10 8 l 14 10`} fill="none" stroke={RED} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      </StickFigure>
      <Chip text="KEEPS WALKING" color={GOLD} x={540} y={1215} at={sec(1.5)} size={44} />
    </FadeIn>
  );
};

const SmallScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cards: { text: string; color: string; at: number }[] = [
    { text: 'BITTEN TONGUE', color: '#ff8fc7', at: 1.7 },
    { text: 'SCRATCHED EYES', color: CYAN, at: 2.7 },
    { text: 'MISSED INFECTIONS', color: GREEN, at: 3.6 },
  ];
  const shrug = EASE_OUT(prog(frame, 6, 22));
  return (
    <FadeIn>
      <Kicker text="SMALL THINGS ADD UP" color={GOLD} at={4} />
      <StickFigure x={540} y={640} scale={0.95} pose={{ lHand: lerpPt(STAND.lHand, [-96, -128], shrug), rHand: lerpPt(STAND.rHand, [96, -128], shrug), elbows: 'in' }} face="neutral" />
      {cards.map((c, i) => {
        const p = EASE_OUT(prog(frame, sec(c.at), sec(c.at) + 12));
        return (
          <div
            key={c.text}
            style={{
              position: 'absolute',
              left: 110,
              right: 110,
              top: 840 + i * 130,
              height: 108,
              borderRadius: 24,
              background: 'rgba(255,255,255,0.07)',
              borderLeft: `14px solid ${c.color}`,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 38,
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 52,
              color: c.color,
              opacity: p,
              transform: `translateX(${(1 - p) * -60}px)`,
            }}
          >
            {c.text}
          </div>
        );
      })}
    </FadeIn>
  );
};

const RealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const aid = (at: number) => EASE_OUT(prog(frame, sec(at), sec(at) + 8));
  const childPose: Pose = { lHand: [-70, -110 + Math.sin(frame / 6) * 10], rHand: [58, -40] };
  const cj = solve(childPose);
  const Aid: React.FC<{ at: Pt; rot: number; k: number }> = ({ at, rot, k }) =>
    k > 0 ? (
      <g transform={`translate(${at[0]} ${at[1]}) rotate(${rot}) scale(${k})`}>
        <rect x={-26} y={-11} width={52} height={22} rx={11} fill="#e8b98a" />
        <rect x={-8} y={-11} width={16} height={22} fill="#f6dcc0" />
      </g>
    ) : null;
  return (
    <FadeIn>
      <Kicker text="THIS IS REAL" color={CYAN} at={4} />
      <Label text="some people are born this way" y={300} color="#ffffff" size={48} at={sec(1.4)} />
      <Chip text="VERY RARE" color={CYAN} x={540} y={400} at={sec(2.2)} size={40} />
      <Ground />
      <StickFigure x={370} y={952} scale={1.4} pose={{ rHand: [96, -70], lHand: [-50, -40], lean: 14 }} face="sad" />
      <StickFigure x={700} y={1037} scale={0.9} pose={childPose} face="smile">
        <Aid at={[cj.head[0] + 14, cj.head[1] - 26]} rot={-20} k={aid(3.8)} />
        <Aid at={cj.rArm.joint} rot={60} k={aid(4.3)} />
        <Aid at={cj.lLeg.joint} rot={10} k={aid(4.8)} />
      </StickFigure>
      <div style={{ position: 'absolute', top: 1220, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_BODY, fontWeight: 500, fontSize: 34, color: DIM, opacity: prog(frame, sec(3.8), sec(4.3)) }}>
        injuries go unnoticed
      </div>
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short22NoPain: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.power)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.power, T.alarm)}>
      <PowerScene />
    </Sequence>
    <Sequence {...seq(T.alarm, T.pan)}>
      <AlarmScene />
    </Sequence>
    <Sequence {...seq(T.pan, T.ankle)}>
      <PanScene />
    </Sequence>
    <Sequence {...seq(T.ankle, T.small)}>
      <AnkleScene />
    </Sequence>
    <Sequence {...seq(T.small, T.real)}>
      <SmallScene />
    </Sequence>
    <Sequence {...seq(T.real, T.final)}>
      <RealScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <Chip text="PAIN = PROTECTION" color={GREEN} x={540} y={1215} at={sec(1.3)} size={46} />
      <Footnote text="GENERAL INFO · NOT MEDICAL ADVICE" y={1320} />
    </Sequence>
    <Captions lines={LINES} y={1440} accent={RED} />
    <ProgressBar color={RED} />
  </AbsoluteFill>
);

export default Short22NoPain;
