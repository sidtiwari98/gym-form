import type { AnchorName, PoseAngles, View } from "./rig";

export type Muscle =
  | "chest" | "upperChest" | "lats" | "upperBack" | "traps" | "lowerBack"
  | "frontDelts" | "sideDelts" | "rearDelts"
  | "biceps" | "triceps" | "forearms"
  | "quads" | "hamstrings" | "glutes" | "calves"
  | "abductors" | "adductors" | "core";

export const MUSCLE_LABEL: Record<Muscle, string> = {
  chest: "Chest", upperChest: "Upper chest", lats: "Lats", upperBack: "Upper back",
  traps: "Traps", lowerBack: "Lower back", frontDelts: "Front delts",
  sideDelts: "Side delts", rearDelts: "Rear delts", biceps: "Biceps",
  triceps: "Triceps", forearms: "Forearms", quads: "Quads",
  hamstrings: "Hamstrings", glutes: "Glutes", calves: "Calves",
  abductors: "Abductors", adductors: "Adductors", core: "Core",
};

/**
 * Where a muscle lives on the rig.
 *
 * `torso` regions are placed by fraction `t` along pelvis -> chest, pushed to
 * the anterior or posterior face; `limb` regions are a translucent stroke laid
 * over a segment and offset to one face of it. In side view that offset is what
 * separates biceps from triceps on the same upper arm.
 */
export type HighlightTarget =
  | { on: "torso"; t: number; face: "front" | "back" | "center"; rx: number; ry: number }
  | { on: "limb"; seg: "upperArm" | "forearm" | "thigh" | "shin"; face: "front" | "back" | "center" }
  | { on: "delt"; face: "front" | "back" | "center" }
  | { on: "hip"; face: "front" | "back" | "out" | "in" };

export const MUSCLE_TARGETS: Record<Muscle, HighlightTarget[]> = {
  chest: [{ on: "torso", t: 0.76, face: "front", rx: 8, ry: 5.5 }],
  upperChest: [{ on: "torso", t: 0.88, face: "front", rx: 7.5, ry: 4.5 }],
  lats: [{ on: "torso", t: 0.55, face: "back", rx: 9, ry: 7 }],
  upperBack: [{ on: "torso", t: 0.82, face: "back", rx: 8.5, ry: 5.5 }],
  traps: [{ on: "torso", t: 1.0, face: "back", rx: 7, ry: 4 }],
  lowerBack: [{ on: "torso", t: 0.24, face: "back", rx: 7, ry: 5 }],
  core: [{ on: "torso", t: 0.44, face: "front", rx: 7, ry: 6 }],
  frontDelts: [{ on: "delt", face: "front" }],
  sideDelts: [{ on: "delt", face: "center" }],
  rearDelts: [{ on: "delt", face: "back" }],
  biceps: [{ on: "limb", seg: "upperArm", face: "front" }],
  triceps: [{ on: "limb", seg: "upperArm", face: "back" }],
  forearms: [{ on: "limb", seg: "forearm", face: "center" }],
  quads: [{ on: "limb", seg: "thigh", face: "front" }],
  hamstrings: [{ on: "limb", seg: "thigh", face: "back" }],
  calves: [{ on: "limb", seg: "shin", face: "back" }],
  glutes: [{ on: "hip", face: "back" }],
  abductors: [{ on: "hip", face: "out" }],
  adductors: [{ on: "hip", face: "in" }],
};

/**
 * Drawable equipment. Deliberately a small set of primitives rather than one
 * entry per machine — a leg-press sled and a calf block are both boxes, a
 * bench and a preacher pad are both angled pads.
 */
export type Prop =
  /** A bar held at an anchor. `barbell`/`ez` get plates; `handle`/`rope` don't. */
  | { kind: "bar"; at: AnchorName; style?: "barbell" | "ez" | "handle" | "rope"; width?: number; plate?: number; inFront?: boolean }
  | { kind: "dumbbells"; grip?: "pronated" | "neutral"; size?: number }
  | { kind: "plate"; at: AnchorName; r?: number }
  /** Rect centred on (x,y), extending `len` along `angle` (0 = horizontal) and `thick` across it. */
  | { kind: "pad"; x: number; y: number; angle: number; len: number; thick?: number; inFront?: boolean }
  /** Same, but pinned to a joint — a leg-press footplate or a calf-raise shoulder pad moves with the lifter. */
  | { kind: "padAt"; at: AnchorName; angle: number; len: number; thick?: number; dx?: number; dy?: number; inFront?: boolean }
  | { kind: "box"; x: number; y: number; w: number; h: number; tone?: "frame" | "stack" | "plate"; inFront?: boolean }
  | { kind: "post"; x: number; y1: number; y2: number; thick?: number }
  | { kind: "beam"; y: number; x1: number; x2: number; thick?: number }
  | { kind: "cable"; from: [number, number]; to: AnchorName; via?: [number, number]; handle?: "bar" | "rope" | "dual" | "none" }
  /** Padded roller that rides on a joint — leg curl / leg extension / lat pulldown thigh pads. */
  | { kind: "roller"; at: AnchorName; r?: number; dx?: number; dy?: number; inFront?: boolean };

export type Overlay =
  /** Motion path of a point across the whole rep. The bar path, usually. */
  | { kind: "trace"; of: AnchorName; label?: string }
  /** Dashed straight line pelvis -> neck, for "keep a neutral spine". */
  | { kind: "spine"; label?: string }
  | { kind: "arrow"; from: AnchorName | [number, number]; to: AnchorName | [number, number]; label?: string; tone?: "good" | "bad" }
  | { kind: "mark"; at: AnchorName; label: string; tone?: "good" | "bad"; dx?: number; dy?: number }
  /** Angle at joint `at`, between the segments running to `a` and `b`. */
  | { kind: "angle"; at: AnchorName; a: AnchorName; b: AnchorName; label?: string };

export type Exercise = {
  slug: string;
  name: string;
  aka?: string;
  gear: string;
  pattern: string;
  primary: Muscle[];
  secondary?: Muscle[];
  frames: Record<View, PoseAngles[]>;
  /** Defaults to true. Off for seated, lying and hanging work. */
  groundLock?: Partial<Record<View, boolean>>;
  props?: Partial<Record<View, Prop[]>>;
  overlays?: Partial<Record<View, Overlay[]>>;
  /** Override the "Front"/"Side" captions — lying work often reads better from above. */
  viewLabels?: Partial<Record<View, string>>;
  cues: string[];
  mistakes: string[];
  /** Seconds per rep; drives the default animation speed. */
  tempo?: number;
  /** Optional real footage, for anything the drawing can't fully carry. */
  videoUrl?: string;
};

export type SetSpec = {
  slug: string;
  sets: string;
  reps: string;
  note?: string;
  /** Present when this slot rotates on week 2. */
  swapFor?: string;
  group?: string;
};

export type Day = {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  rest?: boolean;
  focus?: string;
  blurb?: string;
  work: SetSpec[];
};
