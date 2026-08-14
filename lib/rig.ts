/**
 * A tiny 2D skeletal rig.
 *
 * Every pose is expressed as ABSOLUTE segment angles in degrees, using a
 * convention picked so the numbers read the way you'd describe a body:
 *
 *      0   = pointing straight down
 *     90   = pointing to +x (to the figure's front, in side view)
 *    180   = pointing straight up
 *    -90   = pointing to -x
 *
 * So a hanging arm is 0, an overhead arm is 180, an upright torso is 180,
 * and a torso hinged 30 degrees forward is 150.
 *
 * Absolute (rather than parent-relative) angles mean a pose entry can be read
 * in isolation: `elbow: 90` is always "forearm horizontal", no matter what the
 * shoulder is doing. That matters a lot when authoring ~36 exercises by hand.
 */

export type Vec = { x: number; y: number };

export type View = "front" | "side";

export type PoseAngles = {
  torso: number;
  head: number;
  shoulderL: number;
  elbowL: number;
  shoulderR: number;
  elbowR: number;
  hipL: number;
  kneeL: number;
  hipR: number;
  kneeR: number;
  ankleL: number;
  ankleR: number;
  /**
   * Per-segment length multipliers, 1 = full length.
   *
   * This is the rig's fake perspective. A limb pointing at the viewer can't be
   * drawn shorter by rotating it in the picture plane, so a front view of a
   * chest press would send the hands up over the head. Scaling the segment to
   * ~0.3 instead reads correctly as "this arm is pointing at you".
   */
  sUpperArmL: number;
  sForearmL: number;
  sUpperArmR: number;
  sForearmR: number;
  sThighL: number;
  sShinL: number;
  sThighR: number;
  sShinR: number;
  /** Foreshortens the torso itself, for a body hinged toward or away from the camera. */
  sTorso: number;
  /** Pelvis position. Only used when the pose is not ground-locked. */
  rootX: number;
  rootY: number;
};

export const NEUTRAL: PoseAngles = {
  torso: 180,
  head: 180,
  shoulderL: 4,
  elbowL: 4,
  shoulderR: -4,
  elbowR: -4,
  hipL: 2,
  kneeL: 1,
  hipR: -2,
  kneeR: -1,
  ankleL: 90,
  ankleR: 90,
  sUpperArmL: 1,
  sForearmL: 1,
  sUpperArmR: 1,
  sForearmR: 1,
  sThighL: 1,
  sShinL: 1,
  sThighR: 1,
  sShinR: 1,
  sTorso: 1,
  rootX: 50,
  rootY: 52,
};

/** Segment lengths, in the same units as the 100x100 viewBox. */
export const L = {
  torso: 25,
  neck: 5,
  head: 6.4,
  upperArm: 14,
  forearm: 13.5,
  thigh: 20,
  shin: 19,
  foot: 8,
};

export const GROUND = 93;

/** Half-widths of the shoulder and hip girdles, per view. */
const GIRDLE = {
  front: { shoulder: 10.5, hip: 6.5 },
  // In side view the limbs very nearly overlap; a small stagger keeps the far
  // side visible instead of z-fighting into a single line.
  side: { shoulder: 1.6, hip: 1.4 },
};

export type Skeleton = {
  view: View;
  pelvis: Vec;
  hip: { L: Vec; R: Vec };
  knee: { L: Vec; R: Vec };
  ankle: { L: Vec; R: Vec };
  toe: { L: Vec; R: Vec };
  chest: Vec;
  shoulder: { L: Vec; R: Vec };
  elbow: { L: Vec; R: Vec };
  wrist: { L: Vec; R: Vec };
  neck: Vec;
  head: Vec;
  /** Midpoint of the two wrists — where a barbell or machine handle sits. */
  hands: Vec;
};

/** Walk `len` from `from` at `angle`, using the convention documented above. */
export function step(from: Vec, angle: number, len: number): Vec {
  const r = (angle * Math.PI) / 180;
  return { x: from.x + len * Math.sin(r), y: from.y + len * Math.cos(r) };
}

const mid = (a: Vec, b: Vec): Vec => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

/**
 * Build a skeleton from a pose.
 *
 * `groundLock` slides the finished figure vertically so the lowest foot rests
 * on the floor. That is what makes a squat actually sink: you author the hip
 * and knee angles and the descent falls out of the geometry for free, rather
 * than having to hand-tune a root height for every keyframe.
 */
export function solve(pose: PoseAngles, view: View, groundLock = true): Skeleton {
  const g = GIRDLE[view];
  // Perpendicular to the torso, so the girdles tilt with a hinged body.
  // The torso runs along (sin t, cos t); rotating that a quarter turn gives
  // (-cos t, sin t), which points to the figure's left at t = 180.
  const t = pose.torso * (Math.PI / 180);
  const px = -Math.cos(t);
  const py = Math.sin(t);

  const pelvis: Vec = { x: pose.rootX, y: pose.rootY };
  const chest = step(pelvis, pose.torso, L.torso * pose.sTorso);
  const neck = step(chest, pose.torso, L.neck * pose.sTorso);
  const head = step(neck, pose.head, L.head);

  const off = (base: Vec, amount: number): Vec => ({
    x: base.x + px * amount,
    y: base.y + py * amount,
  });

  // +x offset is the figure's LEFT: front view is rendered as a mirror, the
  // way you'd see yourself in the gym mirror rather than facing another person.
  const shoulder = { L: off(chest, g.shoulder), R: off(chest, -g.shoulder) };
  const hip = { L: off(pelvis, g.hip), R: off(pelvis, -g.hip) };

  const elbow = {
    L: step(shoulder.L, pose.shoulderL, L.upperArm * pose.sUpperArmL),
    R: step(shoulder.R, pose.shoulderR, L.upperArm * pose.sUpperArmR),
  };
  const wrist = {
    L: step(elbow.L, pose.elbowL, L.forearm * pose.sForearmL),
    R: step(elbow.R, pose.elbowR, L.forearm * pose.sForearmR),
  };
  const knee = {
    L: step(hip.L, pose.hipL, L.thigh * pose.sThighL),
    R: step(hip.R, pose.hipR, L.thigh * pose.sThighR),
  };
  const ankle = {
    L: step(knee.L, pose.kneeL, L.shin * pose.sShinL),
    R: step(knee.R, pose.kneeR, L.shin * pose.sShinR),
  };
  const toe = {
    L: step(ankle.L, pose.ankleL, L.foot),
    R: step(ankle.R, pose.ankleR, L.foot),
  };

  let s: Skeleton = {
    view,
    pelvis,
    hip,
    knee,
    ankle,
    toe,
    chest,
    shoulder,
    elbow,
    wrist,
    neck,
    head,
    hands: mid(wrist.L, wrist.R),
  };

  if (groundLock) {
    const lowest = Math.max(ankle.L.y, ankle.R.y, toe.L.y, toe.R.y);
    s = translate(s, 0, GROUND - lowest);
  }
  return s;
}

export function translate(s: Skeleton, dx: number, dy: number): Skeleton {
  const m = (v: Vec): Vec => ({ x: v.x + dx, y: v.y + dy });
  const pair = (p: { L: Vec; R: Vec }) => ({ L: m(p.L), R: m(p.R) });
  return {
    view: s.view,
    pelvis: m(s.pelvis),
    hip: pair(s.hip),
    knee: pair(s.knee),
    ankle: pair(s.ankle),
    toe: pair(s.toe),
    chest: m(s.chest),
    shoulder: pair(s.shoulder),
    elbow: pair(s.elbow),
    wrist: pair(s.wrist),
    neck: m(s.neck),
    head: m(s.head),
    hands: m(s.hands),
  };
}

/** Points that equipment and overlays can be pinned to. */
export type AnchorName =
  | "hands"
  | "wristL"
  | "wristR"
  | "elbowL"
  | "elbowR"
  | "shoulderL"
  | "shoulderR"
  | "chest"
  | "pelvis"
  | "hipL"
  | "hipR"
  | "head"
  | "neck"
  | "kneeL"
  | "kneeR"
  | "ankleL"
  | "ankleR"
  | "toeL"
  | "toeR";

export function anchor(s: Skeleton, name: AnchorName): Vec {
  switch (name) {
    case "hands": return s.hands;
    case "wristL": return s.wrist.L;
    case "wristR": return s.wrist.R;
    case "elbowL": return s.elbow.L;
    case "elbowR": return s.elbow.R;
    case "shoulderL": return s.shoulder.L;
    case "shoulderR": return s.shoulder.R;
    case "chest": return s.chest;
    case "pelvis": return s.pelvis;
    case "hipL": return s.hip.L;
    case "hipR": return s.hip.R;
    case "head": return s.head;
    case "neck": return s.neck;
    case "kneeL": return s.knee.L;
    case "kneeR": return s.knee.R;
    case "ankleL": return s.ankle.L;
    case "ankleR": return s.ankle.R;
    case "toeL": return s.toe.L;
    case "toeR": return s.toe.R;
  }
}

/* ------------------------------------------------------------------ */
/* Pose authoring helpers                                              */
/* ------------------------------------------------------------------ */

export type PosePatch = Partial<PoseAngles>;

/**
 * Symmetric pose shorthand.
 *
 * `sym("front", { shoulder: 75 })` sets the left limb to +75 and the right to
 * -75, i.e. both arms raised out to the sides. In side view both limbs get the
 * same value, since a sign flip there would fold one leg through the other.
 */
export function sym(
  view: View,
  p: {
    torso?: number;
    head?: number;
    shoulder?: number;
    elbow?: number;
    hip?: number;
    knee?: number;
    ankle?: number;
    /** Foreshortening multipliers. Applied to both sides, never sign-flipped. */
    upperArmS?: number;
    forearmS?: number;
    thighS?: number;
    shinS?: number;
    torsoS?: number;
    rootX?: number;
    rootY?: number;
  },
): PosePatch {
  const flip = view === "front" ? -1 : 1;
  const out: PosePatch = {};
  if (p.torso !== undefined) out.torso = p.torso;
  if (p.head !== undefined) out.head = p.head;
  if (p.shoulder !== undefined) {
    out.shoulderL = p.shoulder;
    out.shoulderR = p.shoulder * flip;
  }
  if (p.elbow !== undefined) {
    out.elbowL = p.elbow;
    out.elbowR = p.elbow * flip;
  }
  if (p.hip !== undefined) {
    out.hipL = p.hip;
    out.hipR = p.hip * flip;
  }
  if (p.knee !== undefined) {
    out.kneeL = p.knee;
    out.kneeR = p.knee * flip;
  }
  if (p.ankle !== undefined) {
    out.ankleL = p.ankle;
    out.ankleR = p.ankle * flip;
  }
  if (p.upperArmS !== undefined) { out.sUpperArmL = p.upperArmS; out.sUpperArmR = p.upperArmS; }
  if (p.forearmS !== undefined) { out.sForearmL = p.forearmS; out.sForearmR = p.forearmS; }
  if (p.thighS !== undefined) { out.sThighL = p.thighS; out.sThighR = p.thighS; }
  if (p.shinS !== undefined) { out.sShinL = p.shinS; out.sShinR = p.shinS; }
  if (p.torsoS !== undefined) out.sTorso = p.torsoS;
  if (p.rootX !== undefined) out.rootX = p.rootX;
  if (p.rootY !== undefined) out.rootY = p.rootY;
  return out;
}

export function pose(...patches: PosePatch[]): PoseAngles {
  return Object.assign({}, NEUTRAL, ...patches);
}

const KEYS = Object.keys(NEUTRAL) as (keyof PoseAngles)[];

export function lerpPose(a: PoseAngles, b: PoseAngles, t: number): PoseAngles {
  const out = {} as PoseAngles;
  for (const k of KEYS) out[k] = a[k] + (b[k] - a[k]) * t;
  return out;
}

/** Ease in/out, so the figure decelerates into each end of the rep. */
export function ease(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Sample a keyframe list at phase `u` in [0,1), ping-ponging so a two-pose
 * exercise plays start -> end -> start as one continuous rep.
 */
export function sampleLoop(frames: PoseAngles[], u: number): PoseAngles {
  if (frames.length === 1) return frames[0];
  const legs = (frames.length - 1) * 2;
  const x = ((u % 1) + 1) % 1;
  const scaled = x * legs;
  let i = Math.floor(scaled);
  let t = scaled - i;
  if (i >= legs) { i = legs - 1; t = 1; }
  const forward = i < frames.length - 1;
  const [a, b] = forward
    ? [frames[i], frames[i + 1]]
    : [frames[legs - i], frames[legs - i - 1]];
  return lerpPose(a, b, ease(t));
}
