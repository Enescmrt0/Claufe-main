// Cat kit — a simple 2D cat for the explainer shorts.
// `Cat` is a front-facing sitting cat, `CatLoaf` a curled-up sleeping one. Both are drawn in their
// own space with the origin on the GROUND under the cat (+y down); a sitting cat is ~290 units tall.
import React from 'react';

const INK = '#10131a';

export const Cat: React.FC<{
  x: number;
  y: number; // ground position in page pixels
  scale?: number;
  rotate?: number; // degrees, around the cat's middle (for tumbling)
  color?: string;
  earTwist?: number; // degrees each ear swivels outward (+) or inward (-)
  pupil?: number; // 0 = thin slit, 1 = fully round (dark-adapted)
  eyeOpen?: number; // 0 = closed, 1 = open
  eyeGlow?: number; // 0..1 night-shine
  tailWag?: number; // px sideways swing of the tail tip
  squash?: number; // 0..1 crouch / landing squash
  nose?: number; // 0..1 sniff pulse
  opacity?: number;
}> = ({ x, y, scale = 1, rotate = 0, color = '#f0a24a', earTwist = 0, pupil = 0.35, eyeOpen = 1, eyeGlow = 0, tailWag = 0, squash = 0, nose = 0, opacity = 1 }) => {
  const dark = '#c97f2e';
  const eyeC = eyeGlow > 0.05 ? '#d8ff7a' : '#9be07a';
  const ry = 17 * Math.max(0.08, eyeOpen);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity }}>
      <g transform={`translate(${x} ${y}) scale(${scale}) rotate(${rotate} 0 -140) scale(${1 + squash * 0.12} ${1 - squash * 0.18})`}>
        {/* tail */}
        <path d={`M 58 -34 C 150 -30 ${150 + tailWag} -150 ${104 + tailWag} -196`} fill="none" stroke={color} strokeWidth={26} strokeLinecap="round" />
        {/* body */}
        <ellipse cx={0} cy={-84} rx={80} ry={90} fill={color} />
        <ellipse cx={0} cy={-58} rx={44} ry={56} fill="#fbe3c2" opacity={0.9} />
        {/* front paws */}
        <ellipse cx={-30} cy={-10} rx={24} ry={14} fill={color} />
        <ellipse cx={30} cy={-10} rx={24} ry={14} fill={color} />
        {/* ears */}
        <g transform={`rotate(${-earTwist} -42 -236)`}>
          <polygon points="-70,-222 -56,-292 -18,-248" fill={color} />
          <polygon points="-58,-234 -52,-270 -32,-248" fill="#f7b7c0" />
        </g>
        <g transform={`rotate(${earTwist} 42 -236)`}>
          <polygon points="70,-222 56,-292 18,-248" fill={color} />
          <polygon points="58,-234 52,-270 32,-248" fill="#f7b7c0" />
        </g>
        {/* head */}
        <circle cx={0} cy={-192} r={70} fill={color} />
        <path d="M -14 -258 l 4 22 M 0 -262 l 0 24 M 14 -258 l -4 22" stroke={dark} strokeWidth={7} strokeLinecap="round" />
        {/* eyes */}
        {[-27, 27].map((ex) => (
          <g key={ex}>
            {eyeGlow > 0.05 ? <circle cx={ex} cy={-196} r={30} fill={eyeC} opacity={0.35 * eyeGlow} /> : null}
            {eyeOpen > 0.25 ? (
              <>
                <ellipse cx={ex} cy={-196} rx={16} ry={ry} fill={eyeC} />
                <ellipse cx={ex} cy={-196} rx={2.5 + 11 * pupil} ry={ry * 0.9} fill={INK} />
              </>
            ) : (
              <path d={`M ${ex - 15} -196 q 15 12 30 0`} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
            )}
          </g>
        ))}
        {/* nose + mouth */}
        <polygon points="-8,-172 8,-172 0,-162" fill="#f08a9b" transform={`translate(0 -168) scale(${1 + nose * 0.5}) translate(0 168)`} />
        <path d="M 0 -162 q -8 12 -18 4 M 0 -162 q 8 12 18 4" fill="none" stroke={INK} strokeWidth={4} strokeLinecap="round" />
        {/* whiskers */}
        {[-1, 1].map((s) => (
          <g key={s} stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.9}>
            <line x1={s * 34} y1={-168} x2={s * 104} y2={-180} />
            <line x1={s * 34} y1={-162} x2={s * 108} y2={-160} />
            <line x1={s * 34} y1={-156} x2={s * 102} y2={-140} />
          </g>
        ))}
      </g>
    </svg>
  );
};

// Curled-up sleeping cat ("loaf"); `breath` 0..1 gently swells the body.
export const CatLoaf: React.FC<{ x: number; y: number; scale?: number; color?: string; breath?: number }> = ({ x, y, scale = 1, color = '#f0a24a', breath = 0 }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={10} cy={-62 - breath * 4} rx={132} ry={64 + breath * 5} fill={color} />
      {/* tail wrapped around the front */}
      <path d="M 138 -50 C 150 6 20 14 -70 -6" fill="none" stroke={color} strokeWidth={26} strokeLinecap="round" />
      {/* head resting */}
      <circle cx={-92} cy={-58} r={54} fill={color} />
      <polygon points="-138,-84 -128,-134 -100,-100" fill={color} />
      <polygon points="-62,-102 -52,-140 -40,-90" fill={color} />
      <path d="M -116 -58 q 10 9 20 0 M -82 -58 q 10 9 20 0" fill="none" stroke={INK} strokeWidth={4.5} strokeLinecap="round" />
      <polygon points="-96,-44 -84,-44 -90,-36" fill="#f08a9b" />
    </g>
  </svg>
);
