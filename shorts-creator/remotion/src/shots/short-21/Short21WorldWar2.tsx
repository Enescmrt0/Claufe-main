import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, EASE_OUT, ProgressBar, ShortsBackdrop, VoLine, prog } from '../../lib/shorts';
import { Chip, DIM, FadeIn, Footnote, sec, seq } from '../../lib/explainer';
import { MapScale, countryPath, makeMapScale } from '../../lib/map';
import { Country, WORLD } from '../../lib/geo/world';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../../fonts';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short21WorldWar2',
  durationInSeconds: 48.6,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS
// =============================================================================
const BASE = '#0c1017';
const GLOW = '#1a2436';
const SEA = '#0f1622';
const NEUTRAL = '#2b3547';
const BORDER = '#0c1017';
const AXIS = '#d9483b';
const OCC = '#8a2f2a';
const ALLY = '#4d8fe0';
const DEFEATED = '#737b8c';
const GOLD = '#f5c76e';

// =============================================================================
// NARRATION — real line timings from the Kokoro voiceover (shorts/short-21-ww2/voice/)
// =============================================================================
const LINES: VoLine[] = [
  { text: 'World War Two, explained in under a minute.', start: 0.3, end: 2.69 },
  { text: 'Nineteen thirty-nine. Germany invades Poland. Britain and France declare war.', start: 2.99, end: 7.9 },
  { text: 'Nineteen forty. Most of Western Europe falls. Britain holds out.', start: 8.2, end: 12.02 },
  { text: 'Nineteen forty-one. Germany invades the Soviet Union.', start: 12.32, end: 15.73 },
  { text: "In December, Japan attacks Pearl Harbor. Now it's a true world war.", start: 16.03, end: 19.89 },
  { text: 'Nineteen forty-two to forty-three. The tide turns: at Midway, El Alamein, and Stalingrad.', start: 20.19, end: 25.74 },
  { text: 'Nineteen forty-four. D-Day. The Allies land in Normandy, and close in on Germany.', start: 26.04, end: 31.18 },
  { text: 'Nineteen forty-five. Germany surrenders in May. After two atomic bombs, Japan surrenders in August.', start: 31.48, end: 38.07 },
  { text: 'More than seventy million people died, including six million Jews murdered in the Holocaust.', start: 38.37, end: 43.62 },
  { text: 'It was the deadliest war in history, and it reshaped the world.', start: 43.92, end: 47.1 },
];

const T = { hook: 0, y39: 2.89, y40: 8.1, y41: 12.22, pearl: 15.93, turn: 20.09, y44: 25.94, y45: 31.38, japan: 34.7, toll: 38.27, final: 43.82, end: 48.6 };

// =============================================================================
// EUROPE MAP STATE — who controls what, over the video's own timeline (seconds).
// Modern borders are used as a simplified stand-in for the 1939–45 map.
// =============================================================================
type Step = [number, string];
const STEPS: Record<string, Step[]> = {};
const add = (names: string[], t: number, color: string, stagger = 0) =>
  names.forEach((n, i) => {
    (STEPS[n] = STEPS[n] || []).push([t + i * stagger, color]);
  });

const GER = ['Germany', 'Austria', 'Czechia'];
const WEST = ['Denmark', 'Norway', 'Netherlands', 'Belgium', 'Luxembourg', 'France'];
const BALKANS = ['Republic of Serbia', 'Croatia', 'Bosnia and Herzegovina', 'Slovenia', 'Montenegro', 'North Macedonia', 'Kosovo', 'Albania', 'Greece'];
const PARTNERS = ['Hungary', 'Romania', 'Bulgaria', 'Slovakia', 'Finland'];
const USSR_WEST = ['Lithuania', 'Latvia', 'Belarus', 'Ukraine', 'Moldova'];

add(GER, -1, AXIS);
add(['Poland'], T.y39 + 1.9, OCC);
add(['United Kingdom', 'France'], T.y39 + 3.0, ALLY);
add(WEST, T.y40 + 1.2, OCC, 0.2);
add(['Italy'], T.y40 + 1.2, AXIS);
add(PARTNERS, T.y41 + 0.3, AXIS, 0.05);
add(BALKANS, T.y41 + 0.3, OCC, 0.05);
add(['Russia'], T.y41 + 1.6, ALLY);
add(USSR_WEST, T.y41 + 2.0, OCC, 0.15);
add(['France', 'Belgium', 'Netherlands', 'Luxembourg', 'Italy'], T.y44 + 2.8, ALLY, 0.15);
add(['Ukraine', 'Belarus', 'Moldova', 'Lithuania', 'Latvia', 'Romania', 'Bulgaria'], T.y44 + 3.4, ALLY, 0.12);
add(['Poland', 'Denmark', 'Norway', 'Hungary', 'Slovakia', 'Finland', ...BALKANS], T.y45 + 1.0, ALLY, 0.04);
add(GER, T.y45 + 1.8, DEFEATED, 0.1);

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix = (a: string, b: string, k: number) => {
  const A = hex(a);
  const B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(',')})`;
};
const colorAt = (name: string, t: number): string => {
  const steps = STEPS[name];
  if (!steps) return NEUTRAL;
  let prev = NEUTRAL;
  let cur = NEUTRAL;
  let since = 99;
  for (const [st, col] of steps) {
    if (t >= st) {
      prev = cur;
      cur = col;
      since = t - st;
    }
  }
  return since < 0.5 ? mix(prev, cur, since / 0.5) : cur;
};

// =============================================================================
// MAP SCALES
// =============================================================================
const EUROPE = makeMapScale([-12, 46], [35, 66], { x: 30, y: 420, w: 1020 });
const WORLD_SCALE = makeMapScale([-180, 180], [-40, 72], { x: 30, y: 540, w: 1020 });
const PACIFIC = makeMapScale([110, 250], [5, 60], { x: 30, y: 500, w: 1020 });
const JAPAN = makeMapScale([120, 150], [28, 47], { x: 30, y: 430, w: 1020 });

// Pacific-centred maps: shift western longitudes by +360 so the map does not wrap at the dateline.
const shiftLon = (lon: number) => (lon < 0 ? lon + 360 : lon);
const shiftedPath = (s: MapScale, c: Country): string =>
  c.rings
    .filter((r) => r.every(([lon]) => shiftLon(lon) > 80 && shiftLon(lon) < 300))
    .map((r) => r.map(([lon, lat], i) => `${i ? 'L' : 'M'}${s.px(shiftLon(lon), lat).map((v) => v.toFixed(1)).join(' ')}`).join('') + 'Z')
    .join('');

const MapFrame: React.FC<{ scale: MapScale; id: string; children: React.ReactNode }> = ({ scale, id, children }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0 }}>
    <defs>
      <clipPath id={id}>
        <rect x={scale.box.x} y={scale.box.y} width={scale.box.w} height={scale.box.h} rx={26} />
      </clipPath>
    </defs>
    <rect x={scale.box.x} y={scale.box.y} width={scale.box.w} height={scale.box.h} rx={26} fill={SEA} />
    <g clipPath={`url(#${id})`}>{children}</g>
    <rect x={scale.box.x} y={scale.box.y} width={scale.box.w} height={scale.box.h} rx={26} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={3} />
  </svg>
);

// Curved arrow between two map points (pixels), drawn on with `t` 0..1.
const Arrow: React.FC<{ from: [number, number]; to: [number, number]; t: number; color: string; bend?: number; width?: number }> = ({ from, to, t, color, bend = 0.18, width = 12 }) => {
  if (t <= 0) return null;
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend;
  const my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const k = EASE_OUT(Math.min(1, t));
  // point and tangent on the quadratic at k
  const px = (1 - k) * (1 - k) * x1 + 2 * (1 - k) * k * mx + k * k * x2;
  const py = (1 - k) * (1 - k) * y1 + 2 * (1 - k) * k * my + k * k * y2;
  const tx = 2 * (1 - k) * (mx - x1) + 2 * k * (x2 - mx);
  const ty = 2 * (1 - k) * (my - y1) + 2 * k * (y2 - my);
  const ang = (Math.atan2(ty, tx) * 180) / Math.PI;
  return (
    <g style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))' }}>
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k} />
      <polygon points="0,-20 34,0 0,20" fill={color} transform={`translate(${px} ${py}) rotate(${ang})`} />
    </g>
  );
};

// Pulsing marker at a map point.
const Marker: React.FC<{ at: [number, number]; t: number; color: string; frame: number }> = ({ at, t, color, frame }) => {
  if (t <= 0) return null;
  const ring = (frame / 26) % 1;
  return (
    <g opacity={Math.min(1, t * 3)}>
      <circle cx={at[0]} cy={at[1]} r={16 + ring * 46} fill="none" stroke={color} strokeWidth={5} opacity={1 - ring} />
      <circle cx={at[0]} cy={at[1]} r={15} fill={color} stroke="#ffffff" strokeWidth={4} />
    </g>
  );
};

// Small plate label pinned to a pixel position.
const Pin: React.FC<{ x: number; y: number; text: string; color?: string; t: number; size?: number; anchor?: 'middle' | 'start' | 'end' }> = ({ x, y, text, color = '#ffffff', t, size = 30, anchor = 'middle' }) => {
  if (t <= 0) return null;
  const p = EASE_OUT(Math.min(1, t));
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(${anchor === 'middle' ? '-50%' : anchor === 'end' ? '-100%' : '0'}, -50%) scale(${0.8 + 0.2 * p})`,
        opacity: p,
        background: 'rgba(12,16,23,0.88)',
        border: `2px solid ${color}`,
        borderRadius: 12,
        padding: '6px 14px',
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

// Big year + headline at the top of a scene.
const YearHead: React.FC<{ year: string; head: string; color?: string }> = ({ year, head, color = GOLD }) => {
  const frame = useCurrentFrame();
  const p = EASE_OUT(prog(frame, 0, 12));
  return (
    <div style={{ position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
      <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: year.length > 4 ? 110 : 140, lineHeight: 1, color }}>{year}</div>
      <div style={{ marginTop: 14, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 42, letterSpacing: 2, color: '#ffffff', textTransform: 'uppercase' }}>{head}</div>
    </div>
  );
};

const Legend: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div style={{ position: 'absolute', top: EUROPE.box.y + EUROPE.box.h - 62, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 34, opacity }}>
    {[
      ['AXIS', AXIS],
      ['OCCUPIED', OCC],
      ['ALLIES', ALLY],
    ].map(([t, c]) => (
      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(12,16,23,0.8)', padding: '6px 14px', borderRadius: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: c }} />
        <span style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, color: '#fff' }}>{t}</span>
      </div>
    ))}
  </div>
);

// =============================================================================
// EUROPE LAYER — persistent across the European scenes; colours follow `stateT`.
// =============================================================================
const E = (lon: number, lat: number) => EUROPE.px(lon, lat) as [number, number];

const EuropeLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const inEurope = t < T.pearl || (t >= T.y44 && t < T.japan) || t >= T.final;
  if (!inEurope) return null;
  const stateT = t >= T.final ? 0 : t; // the loop scene shows the opening map again
  const fade =
    t < T.pearl
      ? 1 - prog(t, T.pearl - 0.25, T.pearl)
      : t < T.japan
        ? prog(t, T.y44, T.y44 + 0.3) * (1 - prog(t, T.japan - 0.25, T.japan))
        : prog(t, T.final, T.final + 0.3);
  const l = (a: number, b: number) => prog(t, a, b);
  return (
    <AbsoluteFill style={{ opacity: fade }}>
      <MapFrame scale={EUROPE} id="eu">
        {WORLD.map((c) => (
          <path key={c.name} d={countryPath(EUROPE, c)} fill={colorAt(c.name, stateT)} stroke={BORDER} strokeWidth={2} strokeLinejoin="round" />
        ))}
        {/* 1939 — into Poland */}
        {t < T.y40 ? <Arrow from={E(13.4, 52.5)} to={E(20.5, 52.2)} t={l(T.y39 + 1.2, T.y39 + 1.9)} color="#ffffff" /> : null}
        {/* 1940 — west and north */}
        {t >= T.y40 && t < T.y41 ? (
          <>
            <Arrow from={E(8.5, 50.5)} to={E(2.6, 48.7)} t={l(T.y40 + 1.0, T.y40 + 1.7)} color="#ffffff" bend={-0.2} />
            <Arrow from={E(10.5, 54.3)} to={E(10.2, 59.6)} t={l(T.y40 + 1.1, T.y40 + 1.8)} color="#ffffff" bend={0.12} />
            <Marker at={E(-1.5, 52.6)} t={l(T.y40 + 2.7, T.y40 + 3.0)} color={ALLY} frame={frame} />
          </>
        ) : null}
        {/* 1941 — east */}
        {t >= T.y41 && t < T.pearl ? (
          <>
            <Arrow from={E(23, 54.5)} to={E(30, 59.3)} t={l(T.y41 + 1.6, T.y41 + 2.5)} color="#ffffff" bend={-0.1} />
            <Arrow from={E(24, 52.5)} to={E(36.5, 55.4)} t={l(T.y41 + 1.7, T.y41 + 2.6)} color="#ffffff" bend={0.05} />
            <Arrow from={E(25, 50)} to={E(40, 48.6)} t={l(T.y41 + 1.8, T.y41 + 2.7)} color="#ffffff" bend={0.1} />
          </>
        ) : null}
        {/* 1944 — D-Day, then closing in from both sides */}
        {t >= T.y44 && t < T.y45 ? (
          <>
            <Arrow from={E(-3.2, 51.6)} to={E(-0.4, 48.9)} t={l(T.y44 + 1.3, T.y44 + 2.0)} color="#ffffff" bend={0.25} />
            <Marker at={E(-0.6, 49.2)} t={l(T.y44 + 1.9, T.y44 + 2.2)} color={ALLY} frame={frame} />
            <Arrow from={E(1.5, 48.6)} to={E(8.2, 50.6)} t={l(T.y44 + 3.4, T.y44 + 4.2)} color="#ffffff" bend={0.1} />
            <Arrow from={E(31, 52.5)} to={E(17.5, 52.3)} t={l(T.y44 + 3.6, T.y44 + 4.4)} color="#ffffff" bend={0.1} />
          </>
        ) : null}
      </MapFrame>
      {/* country name pins */}
      <Pin x={E(10.4, 51.2)[0]} y={E(10.4, 51.2)[1]} text="GERMANY" t={t >= T.final ? 1 : l(T.y39 + 0.4, T.y39 + 0.8) * (t < T.y40 ? 1 : 0)} size={26} />
      <Pin x={E(19.5, 50.6)[0]} y={E(19.5, 50.6)[1] + 40} text="POLAND" t={t < T.y40 ? l(T.y39 + 1.5, T.y39 + 1.9) : 0} size={26} />
      <Pin x={E(-2.5, 54.2)[0]} y={E(-2.5, 54.2)[1]} text="BRITAIN" color={ALLY} t={t < T.y40 ? l(T.y39 + 3.0, T.y39 + 3.4) : 0} size={26} />
      <Pin x={E(2.5, 46.6)[0]} y={E(2.5, 46.6)[1]} text="FRANCE" color={ALLY} t={t < T.y40 ? l(T.y39 + 3.3, T.y39 + 3.7) : 0} size={26} />
      <Pin x={E(-1.5, 52.6)[0]} y={E(-1.5, 52.6)[1] - 64} text="BRITAIN HOLDS OUT" color={ALLY} t={t >= T.y40 && t < T.y41 ? l(T.y40 + 2.7, T.y40 + 3.1) : 0} size={28} />
      <Pin x={E(38, 57.5)[0]} y={E(38, 57.5)[1]} text="SOVIET UNION" color={ALLY} t={t >= T.y41 && t < T.pearl ? l(T.y41 + 1.6, T.y41 + 2.0) : 0} size={28} />
      <Pin x={E(-0.6, 49.2)[0] + 30} y={E(-0.6, 49.2)[1] + 62} text="D-DAY · JUNE 6" color={ALLY} t={t >= T.y44 && t < T.y45 ? l(T.y44 + 1.9, T.y44 + 2.3) : 0} size={28} />
      <Legend opacity={t >= T.final ? 0 : prog(t, T.y39 + 0.3, T.y39 + 0.8)} />
    </AbsoluteFill>
  );
};

// =============================================================================
// SCENES (overlays + the non-European maps)
// =============================================================================
const HookScene: React.FC<{ loop?: boolean }> = ({ loop = false }) => (
  <AbsoluteFill>
    <BigTitle
      lines={[
        { text: 'WORLD WAR II', color: '#ffffff' },
        { text: '1939 – 1945', color: GOLD },
      ]}
      subtitle="explained in under a minute"
      y={130}
      size={100}
      warm={!loop}
    />
  </AbsoluteFill>
);

const PearlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const P = (lon: number, lat: number) => PACIFIC.px(shiftLon(lon), lat) as [number, number];
  const strike = prog(frame, sec(1.3), sec(2.3));
  const hit = prog(frame, sec(2.2), sec(2.5));
  const pearl = P(-157.95, 21.35);
  return (
    <FadeIn>
      <YearHead year="DEC 1941" head="Japan attacks Pearl Harbor" />
      <MapFrame scale={PACIFIC} id="pac">
        {WORLD.map((c) => (
          <path key={c.name} d={shiftedPath(PACIFIC, c)} fill={c.name === 'Japan' ? AXIS : c.name === 'United States of America' ? mix(NEUTRAL, ALLY, hit) : NEUTRAL} stroke={BORDER} strokeWidth={2} />
        ))}
        <Arrow from={P(141, 37)} to={pearl} t={strike} color="#ffffff" bend={-0.12} />
        <Marker at={pearl} t={hit} color={GOLD} frame={frame} />
      </MapFrame>
      <Pin x={P(138, 36)[0] - 10} y={P(138, 36)[1] - 70} text="JAPAN" color={AXIS} t={prog(frame, 10, 20)} size={30} />
      <Pin x={pearl[0]} y={pearl[1] + 70} text="PEARL HARBOR" color={GOLD} t={hit} size={30} />
      <Pin x={PACIFIC.box.x + PACIFIC.box.w - 24} y={P(-120, 40)[1]} text="USA" color={ALLY} t={hit} size={30} anchor="end" />
      <Chip text="THE USA ENTERS THE WAR" color={ALLY} x={540} y={PACIFIC.box.y + PACIFIC.box.h + 50} at={sec(2.7)} size={42} />
    </FadeIn>
  );
};

const TurnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const W = (lon: number, lat: number) => WORLD_SCALE.px(lon, lat) as [number, number];
  const spots: { at: [number, number]; name: string; t0: number; dx: number; dy: number; anchor: 'middle' | 'start' | 'end' }[] = [
    { at: W(-177.4, 28.2), name: 'MIDWAY', t0: 3.3, dx: 20, dy: -66, anchor: 'start' },
    { at: W(28.9, 30.8), name: 'EL ALAMEIN', t0: 4.1, dx: 0, dy: 70, anchor: 'middle' },
    { at: W(44.5, 48.7), name: 'STALINGRAD', t0: 4.9, dx: 20, dy: -66, anchor: 'start' },
  ];
  return (
    <FadeIn>
      <YearHead year="1942–43" head="The tide turns" color={ALLY} />
      <MapFrame scale={WORLD_SCALE} id="wrl">
        {WORLD.filter((c) => c.cont !== 'Antarctica').map((c) => (
          <path key={c.name} d={countryPath(WORLD_SCALE, c)} fill={NEUTRAL} stroke={BORDER} strokeWidth={1} />
        ))}
        {spots.map((s) => (
          <Marker key={s.name} at={s.at} t={prog(frame, sec(s.t0), sec(s.t0) + 8)} color={ALLY} frame={frame} />
        ))}
      </MapFrame>
      {spots.map((s) => (
        <Pin key={s.name} x={s.at[0] + s.dx} y={s.at[1] + s.dy} text={s.name} color={ALLY} t={prog(frame, sec(s.t0), sec(s.t0) + 10)} size={32} anchor={s.anchor} />
      ))}
      <Chip text="3 ALLIED VICTORIES" color={ALLY} x={540} y={WORLD_SCALE.box.y + WORLD_SCALE.box.h + 60} at={sec(5.0)} size={44} />
    </FadeIn>
  );
};

const JapanScene: React.FC = () => {
  const frame = useCurrentFrame();
  const J = (lon: number, lat: number) => JAPAN.px(lon, lat) as [number, number];
  const h = prog(frame, sec(0.3), sec(0.6));
  const n = prog(frame, sec(0.9), sec(1.2));
  const done = prog(frame, sec(1.9), sec(2.4));
  return (
    <FadeIn>
      <YearHead year="AUG 1945" head="Japan surrenders" />
      <MapFrame scale={JAPAN} id="jpn">
        {WORLD.map((c) => (
          <path key={c.name} d={countryPath(JAPAN, c)} fill={c.name === 'Japan' ? mix(AXIS, DEFEATED, done) : NEUTRAL} stroke={BORDER} strokeWidth={2} />
        ))}
        <Marker at={J(132.45, 34.39)} t={h} color="#ffffff" frame={frame} />
        <Marker at={J(129.87, 32.75)} t={n} color="#ffffff" frame={frame + 9} />
      </MapFrame>
      <Pin x={J(132.45, 34.39)[0] + 30} y={J(132.45, 34.39)[1] - 70} text="HIROSHIMA · AUG 6" t={h} size={28} anchor="start" />
      <Pin x={J(129.87, 32.75)[0] - 10} y={J(129.87, 32.75)[1] + 72} text="NAGASAKI · AUG 9" t={n} size={28} />
    </FadeIn>
  );
};

const TollScene: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.round(EASE_OUT(prog(frame, sec(0.3), sec(2.4))) * 70);
  const second = EASE_OUT(prog(frame, sec(2.9), sec(3.5)));
  return (
    <FadeIn dur={14}>
      <div style={{ position: 'absolute', top: 360, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 190, lineHeight: 1, color: '#ffffff' }}>{n}M+</div>
        <div style={{ marginTop: 20, fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 60, color: '#ffffff' }}>people died</div>
        <div style={{ marginTop: 10, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 36, color: DIM }}>most of them civilians</div>
      </div>
      <div style={{ position: 'absolute', top: 800, left: 240, right: 240, height: 3, background: 'rgba(255,255,255,0.25)', opacity: second }} />
      <div style={{ position: 'absolute', top: 850, left: 60, right: 60, textAlign: 'center', opacity: second, transform: `translateY(${(1 - second) * 14}px)` }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 64, color: GOLD }}>6 million Jews</div>
        <div style={{ marginTop: 10, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 40, color: '#ffffff' }}>murdered in the Holocaust</div>
      </div>
    </FadeIn>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const Short21WorldWar2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BASE }}>
      <ShortsBackdrop base={BASE} glow={GLOW} />
      <EuropeLayer />
      <Sequence {...seq(T.hook, T.y39)}>
        <HookScene />
      </Sequence>
      <Sequence {...seq(T.y39, T.y40)}>
        <YearHead year="1939" head="Germany invades Poland" />
      </Sequence>
      <Sequence {...seq(T.y40, T.y41)}>
        <YearHead year="1940" head="Western Europe falls" />
      </Sequence>
      <Sequence {...seq(T.y41, T.pearl)}>
        <YearHead year="1941" head="Germany invades the USSR" />
      </Sequence>
      <Sequence {...seq(T.pearl, T.turn)}>
        <PearlScene />
      </Sequence>
      <Sequence {...seq(T.turn, T.y44)}>
        <TurnScene />
      </Sequence>
      <Sequence {...seq(T.y44, T.y45)}>
        <YearHead year="1944" head="D-Day" color={ALLY} />
      </Sequence>
      <Sequence {...seq(T.y45, T.japan)}>
        <YearHead year="MAY 1945" head="Germany surrenders" color={ALLY} />
      </Sequence>
      <Sequence {...seq(T.japan, T.toll)}>
        <JapanScene />
      </Sequence>
      <Sequence {...seq(T.toll, T.final)}>
        <TollScene />
      </Sequence>
      <Sequence {...seq(T.final, T.end)}>
        <HookScene loop />
        <Footnote text="SIMPLIFIED · MODERN BORDERS SHOWN" y={1340} />
      </Sequence>
      <Captions lines={LINES} y={1440} accent={GOLD} />
      <ProgressBar color={GOLD} />
    </AbsoluteFill>
  );
};

export default Short21WorldWar2;
