import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_INOUT, EASE_OUT, Kicker, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { CheckRow, Chip, DIM, FadeIn, Footnote, Label, Meter, sec, seq } from '../../lib/explainer';
import { FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short18OnlyMeat',
  durationInSeconds: 43.4,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#170d0c';
const GLOW = '#40201a';
const MEAT = '#ff7a6b'; // accent
const GOLD = '#f5c76e';
const BLUE = '#6ea8ff';
const GREEN = '#7ee08a';
const RED = '#ff6b6b';
const VIOLET = '#b79bff';

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-18-only-meat/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'What happens if you eat only meat, every single day?', start: 0.3, end: 3.18 },
  { text: 'Day one to three. No carbs, so your body burns through its stored sugar, and drops a lot of water.', start: 3.53, end: 9.23 },
  { text: "Week one. Your liver starts making ketones from fat. Many people feel tired and foggy. It's called keto flu.", start: 9.58, end: 16.47 },
  { text: 'Zero fiber means your gut bacteria start to change, and digestion can get rough.', start: 16.82, end: 21.7 },
  { text: 'After a few weeks, hunger often drops. Protein keeps you full.', start: 22.05, end: 25.7 },
  { text: 'But meat has almost no vitamin C, and no fiber at all.', start: 26.05, end: 29.57 },
  { text: 'And all that saturated fat often pushes LDL cholesterol up.', start: 29.92, end: 34.0 },
  { text: 'Long term? There are no long term trials. Nobody really knows.', start: 34.35, end: 38.06 },
  { text: "Your body can adapt to almost anything. That doesn't mean it should.", start: 38.41, end: 41.87 },
];

const T = { hook: 0, d13: 3.43, week1: 9.48, fiber: 16.72, hunger: 21.95, nutrients: 25.95, ldl: 29.82, long: 34.25, final: 38.31, end: 43.4 };

// =============================================================================
// PIECES
// =============================================================================
const Steak: React.FC<{ x: number; y: number; scale?: number; draw?: number }> = ({ x, y, scale = 1, draw = 1 }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 20) * 8;
  return (
    <div style={{ position: 'absolute', left: x - 230 * scale, top: y + bob, opacity: draw, transform: `scale(${0.85 + 0.15 * EASE_OUT(draw)}) rotate(-8deg)` }}>
      <svg width={460 * scale} height={340 * scale} viewBox="0 0 460 340" style={{ overflow: 'visible', display: 'block' }}>
        <path d="M 60 150 C 40 60 150 10 250 30 C 360 50 440 110 420 210 C 400 300 290 330 190 310 C 100 295 75 230 60 150 Z" fill="#f3d9c6" />
        <path d="M 90 155 C 78 85 165 50 248 62 C 335 76 400 125 388 200 C 374 270 285 296 200 280 C 125 266 102 215 90 155 Z" fill="#c8453a" />
        <path d="M 150 120 q 60 -20 110 10 M 170 200 q 70 30 150 -10 M 240 150 q 40 10 80 0" fill="none" stroke="#e58a7c" strokeWidth={8} strokeLinecap="round" />
        <circle cx={150} cy={175} r={30} fill="#f3d9c6" />
        <circle cx={150} cy={175} r={13} fill="#c8a48f" />
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
  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BigTitle
        lines={[
          { text: 'ONLY MEAT', color: '#ffffff' },
          { text: 'EVERY DAY', color: MEAT },
        ]}
        subtitle="what happens to your body"
        y={260}
        size={118}
        warm={!loop}
      />
      <Steak x={540} y={720} scale={1.1} draw={loop ? 1 : prog(frame, 0, 16)} />
    </AbsoluteFill>
  );
};

const Day13Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const drain = EASE_INOUT(prog(frame, sec(1.6), sec(3.8)));
  const drops = Array.from({ length: 7 }, (_, i) => {
    const start = sec(3.6) + i * 5;
    const t = prog(frame, start, start + 34);
    return { x: 250 + i * 95, y: 800 + t * 260, o: t > 0 && t < 1 ? 1 - t * 0.6 : 0 };
  });
  return (
    <FadeIn>
      <Kicker text="DAY 1–3" color={MEAT} at={4} />
      <Chip text="CARBS: 0" color={RED} x={540} y={350} at={sec(0.8)} size={50} />
      <Meter y={540} label="STORED SUGAR" value={1 - 0.92 * drain} color={GOLD} note="glycogen" />
      <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
        {drops.map((d, i) => (
          <path key={i} d={`M ${d.x} ${d.y} q 22 34 0 52 q -22 -18 0 -52 Z`} fill={BLUE} opacity={d.o} />
        ))}
      </svg>
      <Chip text="WATER WEIGHT ↓" color={BLUE} x={540} y={1110} at={sec(4.4)} size={46} />
    </FadeIn>
  );
};

const Week1Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const sw = EASE_INOUT(prog(frame, sec(1.2), sec(2.4)));
  const Tile: React.FC<{ x: number; text: string; sub: string; color: string; on: number }> = ({ x, text, sub, color, on }) => (
    <div
      style={{
        position: 'absolute',
        left: x - 200,
        top: 420,
        width: 400,
        height: 240,
        borderRadius: 30,
        border: `6px solid ${color}`,
        background: `${color}${on > 0.5 ? '33' : '0d'}`,
        opacity: 0.3 + 0.7 * on,
        boxShadow: on > 0.5 ? `0 0 ${50 * on}px ${color}88` : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: DIM }}>{sub}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 62, color }}>{text}</div>
    </div>
  );
  return (
    <FadeIn>
      <Kicker text="WEEK 1 · FUEL SWITCH" color={VIOLET} at={4} />
      <Tile x={300} text="SUGAR" sub="old fuel" color={GOLD} on={1 - sw} />
      <Tile x={780} text="KETONES" sub="made from fat" color={VIOLET} on={sw} />
      <Label text="→" y={490} color="#ffffff" size={80} at={sec(1.0)} />
      <Chip text="TIRED" color={BLUE} x={360} y={780} at={sec(3.5)} size={48} />
      <Chip text="FOGGY" color={GOLD} x={720} y={780} at={sec(4.3)} size={48} />
      <Label text="“KETO FLU”" y={960} color={VIOLET} size={72} at={sec(5.5)} />
    </FadeIn>
  );
};

const FiberScene: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = prog(frame, sec(1.8), sec(4.2));
  const colors = [GREEN, BLUE, GOLD, VIOLET, MEAT];
  const dots = Array.from({ length: 60 }, (_, i) => {
    const a = (i * 137.5 * Math.PI) / 180;
    const r = 30 + Math.sqrt(i) * 34;
    const kind = i % 5;
    // kinds 0..2 (fiber-loving) fade as the diet shifts; 3..4 stay
    const fade = kind < 3 ? 1 - prog(shift, kind * 0.2, kind * 0.2 + 0.5) : 1;
    return { x: 540 + Math.cos(a) * r, y: 800 + Math.sin(a) * r * 0.75 + Math.sin(frame / 14 + i) * 5, c: colors[kind], o: fade };
  });
  return (
    <FadeIn>
      <Kicker text="ZERO FIBER" color={GREEN} at={4} />
      <div style={{ position: 'absolute', top: 330, left: 0, right: 0, textAlign: 'center', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 120, color: '#fff' }}>
        0<span style={{ fontSize: 56, color: DIM }}> g fiber</span>
      </div>
      {dots.map((d, i) => (
        <div key={i} style={{ position: 'absolute', left: d.x - 16, top: d.y - 16, width: 32, height: 32, borderRadius: '50%', background: d.c, opacity: 0.9 * d.o }} />
      ))}
      <Label text="gut bacteria shift" y={1100} color={GREEN} size={46} at={sec(2.2)} />
    </FadeIn>
  );
};

const HungerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = EASE_INOUT(prog(frame, sec(0.8), sec(2.2)));
  return (
    <FadeIn>
      <Kicker text="A FEW WEEKS IN" color={GOLD} at={4} />
      <Meter y={520} label="HUNGER" value={0.9 - 0.6 * drop} color={GOLD} note="often drops" />
      <Chip text="PROTEIN = FULL" color={GREEN} x={540} y={800} at={sec(2.3)} size={54} />
    </FadeIn>
  );
};

const NutrientsScene: React.FC = () => (
  <FadeIn>
    <Kicker text="WHAT MEAT HAS · AND LACKS" color={MEAT} at={4} />
    <CheckRow y={380} label="PROTEIN" cells={[true]} at={sec(0.2)} labelW={620} />
    <CheckRow y={520} label="IRON · B12" cells={[true]} at={sec(0.6)} labelW={620} />
    <CheckRow y={660} label="VITAMIN C" cells={[false]} at={sec(1.5)} labelW={620} />
    <CheckRow y={800} label="FIBER" cells={[false]} at={sec(2.6)} labelW={620} />
    <Label text="almost none · none at all" y={980} color={DIM} size={36} at={sec(2.8)} />
  </FadeIn>
);

const LdlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 800;
  const H = 400;
  const draw = prog(frame, sec(0.8), sec(3.4));
  const pts = Array.from({ length: 61 }, (_, i) => {
    const k = i / 60;
    return [k * W, H - (0.25 + 0.6 * EASE_INOUT(k)) * H];
  });
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  return (
    <FadeIn>
      <Kicker text="SATURATED FAT" color={RED} at={4} />
      <div style={{ position: 'absolute', left: 140, top: 380 }}>
        <svg width={W} height={H + 20} style={{ overflow: 'visible', display: 'block' }}>
          <line x1={0} y1={H} x2={W} y2={H} stroke="rgba(255,255,255,0.35)" strokeWidth={4} />
          <line x1={0} y1={0} x2={0} y2={H} stroke="rgba(255,255,255,0.35)" strokeWidth={4} />
          <path d={d} fill="none" stroke={RED} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} style={{ filter: `drop-shadow(0 0 12px ${RED})` }} />
        </svg>
      </div>
      <Label text="LDL CHOLESTEROL ↑" y={880} color={RED} size={64} at={sec(2.2)} />
      <Label text="often, not always" y={990} color={DIM} size={36} at={sec(2.8)} />
    </FadeIn>
  );
};

const LongScene: React.FC = () => {
  const frame = useCurrentFrame();
  const stops = [
    { x: 180, t: 'WEEKS', known: true },
    { x: 540, t: 'MONTHS', known: true },
    { x: 900, t: 'YEARS', known: false },
  ];
  const line = prog(frame, 8, sec(1.4));
  const q = EASE_OUT(prog(frame, sec(1.3), sec(1.8)));
  return (
    <FadeIn>
      <Kicker text="LONG TERM?" color={GOLD} at={4} />
      <div style={{ position: 'absolute', left: 180, top: 600, width: 720 * line, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.4)' }} />
      {stops.map((s, i) => {
        const p = prog(frame, 8 + i * 14, 20 + i * 14);
        return (
          <div key={s.t} style={{ position: 'absolute', left: s.x - 150, width: 300, top: 560, textAlign: 'center', opacity: p }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: s.known ? GREEN : GOLD, margin: '22px auto 20px', border: '6px solid #170d0c' }} />
            <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 36, color: s.known ? GREEN : GOLD }}>{s.t}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 900 - 150, width: 300, top: 300, textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 240, color: GOLD, opacity: q, transform: `scale(${0.6 + 0.4 * q})` }}>?</div>
      <Chip text="NO LONG-TERM TRIALS" color={GOLD} x={540} y={850} at={sec(1.6)} size={48} />
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short18OnlyMeat: React.FC = () => (
  <AbsoluteFill style={{ background: BASE }}>
    <ShortsBackdrop base={BASE} glow={GLOW} />
    <Sequence {...seq(T.hook, T.d13)}>
      <HookScene />
    </Sequence>
    <Sequence {...seq(T.d13, T.week1)}>
      <Day13Scene />
    </Sequence>
    <Sequence {...seq(T.week1, T.fiber)}>
      <Week1Scene />
    </Sequence>
    <Sequence {...seq(T.fiber, T.hunger)}>
      <FiberScene />
    </Sequence>
    <Sequence {...seq(T.hunger, T.nutrients)}>
      <HungerScene />
    </Sequence>
    <Sequence {...seq(T.nutrients, T.ldl)}>
      <NutrientsScene />
    </Sequence>
    <Sequence {...seq(T.ldl, T.long)}>
      <LdlScene />
    </Sequence>
    <Sequence {...seq(T.long, T.final)}>
      <LongScene />
    </Sequence>
    <Sequence {...seq(T.final, T.end)}>
      <HookScene loop />
      <Footnote text="NOT MEDICAL ADVICE · TALK TO A DOCTOR FIRST" />
    </Sequence>
    <Captions lines={LINES} y={1420} accent={MEAT} />
    <ProgressBar color={MEAT} />
  </AbsoluteFill>
);

export default Short18OnlyMeat;
