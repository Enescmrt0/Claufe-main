// Stick-figure kit — a posable 2D character for the explainer shorts.
// The pose is given as hand/foot TARGETS; elbows and knees are solved with two-bone IK, so a
// scene animates a figure by moving four points (plus lean/bob) instead of hand-placing joints.
// All coordinates are in the figure's own space: hip at (0,0), +x right, +y DOWN, ground at y≈170.
import React from 'react';

export type Pt = [number, number];
export type Face = 'smile' | 'neutral' | 'ouch' | 'sad';

export type Pose = {
  lHand?: Pt;
  rHand?: Pt;
  lFoot?: Pt;
  rFoot?: Pt;
  lean?: number; // torso lean in px at the neck (+ = right)
  bob?: number; // vertical offset of the whole upper body
  elbows?: 'out' | 'in' | 'back'; // 'back' = both elbows bend toward -x (side-view walk)
  knees?: 'side' | 'forward'; // 'forward' = both knees bend toward +x (side-view walk)
};

export const STAND: Required<Pose> = {
  lHand: [-58, -40],
  rHand: [58, -40],
  lFoot: [-34, 170],
  rFoot: [34, 170],
  lean: 0,
  bob: 0,
  elbows: 'out',
  knees: 'side',
};

const ARM = 68; // upper arm = forearm
const LEG = 88; // thigh = shin
const TORSO = 150;
const HEAD_R = 44;

// Two-bone IK: joint position for a limb from `root` to `target` with equal bone length `len`.
// `dir` picks which side the joint bends toward (+1 / -1).
export const ik = (root: Pt, target: Pt, len: number, dir: number): { joint: Pt; end: Pt } => {
  let dx = target[0] - root[0];
  let dy = target[1] - root[1];
  let d = Math.hypot(dx, dy);
  const max = len * 2 - 0.5;
  if (d > max) {
    dx *= max / d;
    dy *= max / d;
    d = max;
  }
  if (d < 1) d = 1;
  const end: Pt = [root[0] + dx, root[1] + dy];
  const h = Math.sqrt(Math.max(0, len * len - (d / 2) * (d / 2)));
  const mx = root[0] + dx / 2;
  const my = root[1] + dy / 2;
  return { joint: [mx + (-dy / d) * h * dir, my + (dx / d) * h * dir], end };
};

export const lerpPt = (a: Pt, b: Pt, k: number): Pt => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];

// Joint positions for a pose (figure space) — exported so scenes can attach props to a hand or
// run an effect along a limb (e.g. a nerve signal from hand to head).
export const solve = (pose: Pose) => {
  const p = { ...STAND, ...pose };
  const hip: Pt = [0, p.bob];
  const neck: Pt = [p.lean, -TORSO + p.bob];
  const head: Pt = [p.lean * 1.15, -TORSO - HEAD_R + 4 + p.bob];
  const shoulder: Pt = [neck[0], neck[1] + 14];
  const e = p.elbows === 'out' ? 1 : -1;
  const lArm = ik(shoulder, p.lHand, ARM, p.elbows === 'back' ? 1 : -e);
  const rArm = ik(shoulder, p.rHand, ARM, p.elbows === 'back' ? 1 : e);
  const lLeg = ik(hip, p.lFoot, LEG, p.knees === 'forward' ? -1 : 1);
  const rLeg = ik(hip, p.rFoot, LEG, -1);
  return { hip, neck, head, shoulder, lArm, rArm, lLeg, rLeg };
};

export const StickFigure: React.FC<{
  x: number;
  y: number; // pixel position of the HIP
  scale?: number;
  pose?: Pose;
  face?: Face;
  color?: string;
  stroke?: number;
  flip?: boolean;
  opacity?: number;
  children?: React.ReactNode; // extra SVG drawn in figure space (props, effects)
  behind?: React.ReactNode; // SVG drawn behind the body (cape, shadow)
}> = ({ x, y, scale = 1, pose = {}, face = 'smile', color = '#ffffff', stroke = 18, flip = false, opacity = 1, children, behind }) => {
  const j = solve(pose);
  const line = (a: Pt, b: Pt, c: Pt) => `${a[0]},${a[1]} ${b[0]},${b[1]} ${c[0]},${c[1]}`;
  const [hx, hy] = j.head;
  const ink = '#10131a';
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', opacity }}>
      <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
        {behind}
        <g fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
          <polyline points={line(j.hip, j.lLeg.joint, j.lLeg.end)} />
          <polyline points={line(j.hip, j.rLeg.joint, j.rLeg.end)} />
          <line x1={j.hip[0]} y1={j.hip[1]} x2={j.neck[0]} y2={j.neck[1]} />
          <polyline points={line(j.shoulder, j.lArm.joint, j.lArm.end)} />
          <polyline points={line(j.shoulder, j.rArm.joint, j.rArm.end)} />
        </g>
        <circle cx={hx} cy={hy} r={HEAD_R} fill={color} />
        {/* face */}
        {face === 'ouch' ? (
          <>
            <path d={`M ${hx - 22} ${hy - 12} l 12 8 l -12 8 M ${hx + 22} ${hy - 12} l -12 8 l 12 8`} fill="none" stroke={ink} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx={hx} cy={hy + 20} rx={9} ry={11} fill={ink} />
          </>
        ) : (
          <>
            <circle cx={hx - 15} cy={hy - 6} r={5.5} fill={ink} />
            <circle cx={hx + 15} cy={hy - 6} r={5.5} fill={ink} />
            {face === 'smile' ? <path d={`M ${hx - 15} ${hy + 13} q 15 15 30 0`} fill="none" stroke={ink} strokeWidth={5} strokeLinecap="round" /> : null}
            {face === 'sad' ? <path d={`M ${hx - 14} ${hy + 22} q 14 -13 28 0`} fill="none" stroke={ink} strokeWidth={5} strokeLinecap="round" /> : null}
            {face === 'neutral' ? <line x1={hx - 12} y1={hy + 18} x2={hx + 12} y2={hy + 18} stroke={ink} strokeWidth={5} strokeLinecap="round" /> : null}
          </>
        )}
        {children}
      </g>
    </svg>
  );
};

// A walk cycle in place: returns foot/hand targets for phase `t` (one full stride per 1.0).
export const walkPose = (t: number, stride = 46): Pose => {
  const a = t * Math.PI * 2;
  const s = Math.sin(a);
  const c = Math.cos(a);
  return {
    lFoot: [s * stride, 170 - Math.max(0, c) * 34],
    rFoot: [-s * stride, 170 - Math.max(0, -c) * 34],
    lHand: [-s * 52, -30],
    rHand: [s * 52, -30],
    bob: Math.abs(c) * 6 - 3,
    lean: 6,
    elbows: 'back',
    knees: 'forward',
  };
};
