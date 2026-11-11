import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_INOUT, EASE_OUT, Kicker, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Chip, DIM, FadeIn, Footnote, Label, Meter, sec, seq } from '../../lib/explainer';
import { StickFigure } from '../../lib/stick';
import { Cat, CatLoaf } from '../../lib/cat';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short24Cat',
  durationInSeconds: 27,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#12101a';
const GLOW = '#3a2a1c';
const ORANGE = '#f0a24a'; // accent (the cat)
const GOLD = '#f5c76e';
const GREEN = '#9be07a';
const BLUE = '#7aa7ff';
const RED = '#ff6b6b';
const PINK = '#ff8fc7';
const GROUND_Y = 1190;

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-24-cat/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What if you woke up as a cat?', start: 0.3, end: 1.71 },
  { text: 'First, your hearing explodes. Cats hear sounds three times higher than humans can.', start: 2.11, end: 6.8 },
  { text: "At night, you'd need only a sixth of the light to see.", start: 7.2, end: 9.78 },
  { text: 'Your nose gets about forty times more scent receptors.', start: 10.18, end: 13.08 },
  { text: 'You could jump five times your own height, and land on your feet.', start: 13.48, end: 16.64 },
  { text: "But dessert is ruined. Cats can't taste sweetness at all.", start: 17.04, end: 20.32 },
  { text: "And you'd sleep around fourteen hours a day.", start: 20.72, end: 22.81 },
  { text: 'Honestly? Not a bad deal.', start: 23.21, end: 24.85 },
];

const T = { hook: 0, hear: 2.01, night: 7.1, smell: 10.08, jump: 13.38, sweet: 16.94, sleep: 20.62, final: 23.11, end: 27 };

// =============================================================================
// PIECES
// =============================================================================
const Ground: React.FC<{ color?: string }> = ({ color = 'rgba(255,255,255,0.22)' }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
    <line x1={90} y1={GROUND_Y} x2={990} y2={GROUND_Y} stroke={color} strokeWidth={6} strokeLinecap="round" />
  </svg>
);

// =============================================================================
// SCENES
// =============================================================================
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const poof = prog(frame, sec(0.55), sec(0.95));
  const cat = EASE_OUT(prog(frame, sec(0.75), sec(1.15)));
  return (
    <AbsoluteFill>
      <BigTitle
        lines={[
          { text: 'WHAT IF YOU', color: '#ffffff' },
          { text: 'BECAME A CAT?', color: ORANGE },
        ]}
        y={230}
        size={104}
        warm
      />
      <Ground />
      <StickFigure x={540} y={GROUND_Y - 170 * 1.4} scale={1.4} pose={{ lHand: [-70, -150], rHand: [70, -150], elbows: 'in' }} face="ouch" opacity={1 - prog(frame, sec(0.55), sec(0.8))} />
      {/* poof */}
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {poof > 0 && poof < 1
          ? Array.from({ length: 12 }, (_, i) => {
              const a = (i * Math.PI * 2) / 12;
              const r = 60 + poof * 260;
              return <circle key={i} cx={540 + Math.cos(a) * r} cy={960 + Math.sin(a) * r * 0.8} r={34 * (1 - poof) + 6} fill="#ffffff" opacity={0.85 * (1 - poof)} />;
            })
          : null}
      </svg>
      <Cat x={540} y={GROUND_Y} scale={1.45 * (0.6 + 0.4 * cat)} opacity={cat} tailWag={Math.sin(frame / 6) * 20} pupil={0.5} />
    </AbsoluteFill>
  );
};

const HearScene: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = EASE_INOUT(prog(frame, sec(1.9), sec(3.4)));
  const arcs = [0, 1, 2].map((i) => (frame / 30 + i / 3) % 1);
  const headY = GROUND_Y - 240 * 1.35;
  return (
    <FadeIn>
      <Kicker text="SUPER HEARING" color={BLUE} at={4} />
      <Meter y={290} label="HUMAN" value={0.31} color="#cfd6e6" note="20 kHz" />
      <Meter y={430} label="CAT" value={0.31 + 0.69 * grow} color={ORANGE} note={`${Math.round(20 + 44 * grow)} kHz`} />
      <Ground />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {[-1, 1].map((side) =>
          arcs.map((a, i) => {
            const x = 540 + side * (430 - a * 240);
            const r = 40 + (1 - a) * 50;
            return <path key={`${side}${i}`} d={`M ${x} ${headY - r} Q ${x - side * r * 0.7} ${headY} ${x} ${headY + r}`} fill="none" stroke={BLUE} strokeWidth={9} strokeLinecap="round" opacity={Math.sin(a * Math.PI) * 0.9} />;
          }),
        )}
      </svg>
      <Cat x={540} y={GROUND_Y} scale={1.35} earTwist={Math.sin(frame / 5) * 16} tailWag={Math.sin(frame / 9) * 12} pupil={0.4} />
      <Chip text="3× HIGHER PITCH" color={BLUE} x={540} y={600} at={sec(3.5)} size={46} />
    </FadeIn>
  );
};

const NightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const dark = prog(frame, 0, 12);
  const Room: React.FC<{ x: number; vis: number; label: string; tint: string }> = ({ x, vis, label, tint }) => (
    <g>
      <rect x={x} y={300} width={450} height={430} rx={24} fill="#06070c" stroke="rgba(255,255,255,0.2)" strokeWidth={3} />
      <g opacity={vis} fill={tint}>
        {/* plant */}
        <rect x={x + 60} y={560} width={70} height={90} rx={10} />
        <path d={`M ${x + 95} 560 q -50 -80 -10 -150 q 10 70 10 150 M ${x + 95} 560 q 50 -70 30 -140 q -30 60 -30 140`} />
        {/* ball */}
        <circle cx={x + 230} cy={630} r={34} />
        {/* mouse */}
        <ellipse cx={x + 350} cy={640} rx={46} ry={26} />
        <circle cx={x + 388} cy={622} r={13} />
        <path d={`M ${x + 304} 644 q -40 10 -50 -20`} fill="none" stroke={tint} strokeWidth={6} strokeLinecap="round" />
        <rect x={x + 30} y={664} width={390} height={8} rx={4} />
      </g>
      <text x={x + 225} y={356} textAnchor="middle" fill="#ffffff" fontSize={36} fontFamily={FONT_DISPLAY} fontWeight={700}>
        {label}
      </text>
    </g>
  );
  return (
    <FadeIn>
      <AbsoluteFill style={{ background: '#04050a', opacity: 0.82 * dark }} />
      <Kicker text="NIGHT VISION" color={GREEN} at={4} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <Room x={60} vis={0.07} label="HUMAN" tint="#aab4c8" />
        <Room x={570} vis={0.2 + 0.6 * prog(frame, sec(0.6), sec(1.4))} label="CAT" tint="#b9e8a0" />
      </svg>
      <Chip text="1/6 OF THE LIGHT" color={GREEN} x={540} y={770} at={sec(1.3)} size={46} />
      <Ground color="rgba(255,255,255,0.12)" />
      <Cat x={540} y={GROUND_Y} scale={0.95} pupil={0.95} eyeGlow={0.6 + 0.4 * Math.sin(frame / 8)} tailWag={Math.sin(frame / 9) * 10} color="#b8773a" />
    </FadeIn>
  );
};

const SmellScene: React.FC = () => {
  const frame = useCurrentFrame();
  const fill = prog(frame, sec(0.9), sec(2.2));
  const COLS = 20;
  const ROWS = 10;
  const shown = Math.round(fill * COLS * ROWS);
  return (
    <FadeIn>
      <Kicker text="SUPER SMELL" color={PINK} at={4} />
      {/* human: 5 dots (= 5 million) */}
      <div style={{ position: 'absolute', left: 110, top: 300, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: '#cfd6e6' }}>
        HUMAN <span style={{ fontFamily: FONT_MONO, fontSize: 32, color: DIM }}>5 million</span>
      </div>
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <circle key={i} cx={130 + i * 40} cy={390} r={13} fill="#cfd6e6" />
        ))}
        {Array.from({ length: COLS * ROWS }, (_, i) =>
          i < shown ? <circle key={i} cx={130 + (i % COLS) * 43} cy={540 + Math.floor(i / COLS) * 36} r={13} fill={PINK} /> : null,
        )}
        {/* scent trail to a fish */}
        <path
          d="M 470 1040 q 60 -50 120 0 t 120 0 t 120 0"
          fill="none"
          stroke={PINK}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray="6 18"
          strokeDashoffset={-frame * 2}
          opacity={0.8}
        />
        <g transform="translate(880 1060)">
          <ellipse cx={0} cy={0} rx={50} ry={26} fill={BLUE} />
          <polygon points="44,0 84,-26 84,26" fill={BLUE} />
          <circle cx={-26} cy={-6} r={5} fill="#10131a" />
        </g>
      </svg>
      <div style={{ position: 'absolute', left: 110, top: 440, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40, color: PINK }}>
        CAT <span style={{ fontFamily: FONT_MONO, fontSize: 32, color: DIM }}>~200 million</span>
      </div>
      <Label text="scent receptors · 1 dot = 1 million" y={920} color={DIM} size={30} at={sec(0.6)} mono />
      <Ground />
      <Cat x={330} y={GROUND_Y} scale={0.78} nose={0.5 + 0.5 * Math.sin(frame / 3)} tailWag={Math.sin(frame / 7) * 14} pupil={0.6} />
    </FadeIn>
  );
};

const JumpScene: React.FC = () => {
  const frame = useCurrentFrame();
  const S = 0.5; // cat is ~145 px tall here, so 5x its height = ~725 px
  const catH = 290 * S;
  const shelfY = GROUND_Y - catH * 5;
  const crouch = prog(frame, sec(0.3), sec(0.7)) * (1 - prog(frame, sec(0.7), sec(0.8)));
  const up = prog(frame, sec(0.7), sec(1.5));
  const down = prog(frame, sec(2.1), sec(2.9));
  const land = prog(frame, sec(2.9), sec(3.0)) * (1 - prog(frame, sec(3.0), sec(3.3)));
  // up: ground (300) -> shelf (740) on an arc; down: shelf -> ground (480), one full tumble
  const ux = 300 + (740 - 300) * up;
  const uy = GROUND_Y + (shelfY - GROUND_Y) * up - Math.sin(up * Math.PI) * 150;
  const dx = 740 + (470 - 740) * down;
  const dy = shelfY + (GROUND_Y - shelfY) * (down * down);
  const x = down > 0 ? dx : ux;
  const y = down > 0 ? dy : uy;
  const rot = down > 0 && down < 1 ? -360 * EASE_INOUT(down) : 0;
  return (
    <FadeIn>
      <Kicker text="SUPER JUMP" color={GOLD} at={4} />
      <Ground />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {/* shelf */}
        <rect x={640} y={shelfY} width={260} height={22} rx={10} fill="#8b93a7" />
        <rect x={880} y={shelfY} width={20} height={GROUND_Y - shelfY} fill="rgba(255,255,255,0.12)" />
        {/* ruler: 5 cat-heights */}
        <line x1={170} y1={GROUND_Y} x2={170} y2={shelfY} stroke={GOLD} strokeWidth={5} />
        {Array.from({ length: 6 }, (_, i) => (
          <line key={i} x1={150} y1={GROUND_Y - i * catH} x2={190} y2={GROUND_Y - i * catH} stroke={GOLD} strokeWidth={5} />
        ))}
        <text x={120} y={(GROUND_Y + shelfY) / 2 + 20} textAnchor="middle" fill={GOLD} fontSize={64} fontFamily={FONT_MONO} fontWeight={700}>
          5×
        </text>
      </svg>
      <Cat x={x} y={y} scale={S} rotate={rot} squash={Math.max(crouch, land)} tailWag={Math.sin(frame / 4) * 16} pupil={0.5} />
      <Chip text="LANDS ON ITS FEET" color={GREEN} x={540} y={300} at={sec(2.9)} size={46} />
    </FadeIn>
  );
};

const SweetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cross = prog(frame, sec(1.5), sec(1.9));
  return (
    <FadeIn>
      <Kicker text="BUT DESSERT IS RUINED" color={RED} at={4} />
      <Chip text="NO SWEET TASTE" color={RED} x={540} y={300} at={sec(1.9)} size={52} />
      <Ground />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {/* cake */}
        <g transform={`translate(760 ${GROUND_Y})`}>
          <rect x={-150} y={-22} width={300} height={22} rx={10} fill="#cfd6e6" />
          <rect x={-120} y={-150} width={240} height={130} rx={18} fill="#f7c9d6" />
          <path d="M -120 -110 q 30 34 60 0 t 60 0 t 60 0 t 60 0 l 0 -40 l -240 0 Z" fill="#ffffff" />
          <rect x={-8} y={-196} width={16} height={46} fill={GOLD} />
          <circle cx={0} cy={-206} r={16} fill={RED} />
        </g>
        {/* red X */}
        <g stroke={RED} strokeWidth={22} strokeLinecap="round" opacity={cross}>
          <line x1={640} y1={GROUND_Y - 230} x2={640 + 240 * Math.min(1, cross * 2)} y2={GROUND_Y - 230 + 220 * Math.min(1, cross * 2)} />
          {cross > 0.5 ? <line x1={880} y1={GROUND_Y - 230} x2={880 - 240 * (cross * 2 - 1)} y2={GROUND_Y - 230 + 220 * (cross * 2 - 1)} /> : null}
        </g>
      </svg>
      <Cat x={340} y={GROUND_Y} scale={1.2} eyeOpen={0.42} pupil={0.4} tailWag={Math.sin(frame / 12) * 6} />
      <Label text="the sweet-taste gene is broken in cats" y={420} color={DIM} size={32} at={sec(2.2)} />
    </FadeIn>
  );
};

const SleepScene: React.FC = () => {
  const frame = useCurrentFrame();
  const R = 130;
  const C = 2 * Math.PI * R;
  const fill = EASE_INOUT(prog(frame, sec(0.4), sec(1.6))) * (14 / 24);
  return (
    <FadeIn>
      <Kicker text="AND THE BEST PART" color={GOLD} at={4} />
      <div style={{ position: 'absolute', left: 540 - 170, top: 300 }}>
        <svg width={340} height={340} viewBox="-170 -170 340 340">
          <circle r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={30} />
          <circle r={R} fill="none" stroke={BLUE} strokeWidth={30} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - fill)} transform="rotate(-90)" />
          <text y={14} textAnchor="middle" fill="#fff" fontSize={76} fontFamily={FONT_MONO} fontWeight={700}>
            {Math.round((fill * 24) / 1)}h
          </text>
          <text y={62} textAnchor="middle" fill={DIM} fontSize={30} fontFamily={FONT_MONO}>
            of 24
          </text>
        </svg>
      </div>
      <Ground />
      <CatLoaf x={540} y={GROUND_Y} scale={1.7} breath={0.5 + 0.5 * Math.sin(frame / 14)} />
      {[0, 1, 2].map((i) => {
        const t = (frame / 60 + i / 3) % 1;
        return (
          <div key={i} style={{ position: 'absolute', left: 430 + t * 120, top: 960 - t * 190, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 40 + t * 40, color: '#ffffff', opacity: Math.sin(t * Math.PI) * 0.9 }}>
            z
          </div>
        );
      })}
    </FadeIn>
  );
};

const FinalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heart = (frame / 50) % 1;
  return (
    <FadeIn>
      <Chip text="NOT A BAD DEAL" color={ORANGE} x={540} y={330} at={sec(0.9)} size={64} />
      <Ground />
      <Cat x={540} y={GROUND_Y} scale={1.5} eyeOpen={0.1} tailWag={Math.sin(frame / 5) * 24} />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d="M 0 30 C -60 -15 -40 -60 0 -35 C 40 -60 60 -15 0 30 Z" fill={PINK} opacity={Math.sin(heart * Math.PI)} transform={`translate(${720 + heart * 30} ${760 - heart * 180}) scale(${0.8 + heart * 0.6})`} />
      </svg>
      <Footnote text="NUMBERS ARE COMMON ESTIMATES" y={1320} />
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short24Cat: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.hear)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.hear, T.night)}>
      <HearScene />
    </Sequence>
    <Sequence {...seq(T.night, T.smell)}>
      <NightScene />
    </Sequence>
    <Sequence {...seq(T.smell, T.jump)}>
      <SmellScene />
    </Sequence>
    <Sequence {...seq(T.jump, T.sweet)}>
      <JumpScene />
    </Sequence>
    <Sequence {...seq(T.sweet, T.sleep)}>
      <SweetScene />
    </Sequence>
    <Sequence {...seq(T.sleep, T.final)}>
      <SleepScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <FinalScene />
    </Sequence>
    <Captions lines={LINES} y={1440} accent={ORANGE} />
    <ProgressBar color={ORANGE} />
  </AbsoluteFill>
);

export default Short24Cat;
