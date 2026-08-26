import type { Muscle } from "./types";

/**
 * Photographic-style art from the `workout-guide` catalogue.
 *
 * The rig in `lib/rig.ts` computes muscle highlights from joint positions, so
 * they track the animation for free. This artwork is flat PNG — there are no
 * joints to read — so the highlights have to be told where to go.
 *
 * Rather than hand-place an ellipse per muscle per frame, each frame carries a
 * handful of anchor points and `MUSCLE_SPOTS` derives every highlight from
 * them. Authoring a new exercise is then a dozen eyeballed coordinates, not
 * thirty tuned ellipses. The highlights land approximately, which is all a
 * "which muscle is this working" cue needs to be.
 */

/** Joints we place by hand. Only the ones an exercise's muscles need. */
export type GuideAnchor =
  | "head" | "chest" | "hip"
  | "shoulderL" | "shoulderR"
  | "elbowL" | "elbowR"
  | "handL" | "handR"
  | "kneeL" | "kneeR"
  | "ankleL" | "ankleR";

/** Fractions of the image box, so they survive any render size. */
export type Pt = [x: number, y: number];
export type Anchors = Partial<Record<GuideAnchor, Pt>>;

/**
 * Where a muscle sits relative to the anchors. `at` pins a blob to one joint;
 * `mid` stretches it along the segment between two, which is what makes a
 * quad read as a thigh rather than a dot on a knee.
 */
type Spot =
  | { at: GuideAnchor; size?: number }
  | { mid: [GuideAnchor, GuideAnchor]; size?: number };

/**
 * `size` multiplies the torso unit (chest -> hip) for `at` spots, and the
 * segment's own thickness for `mid` spots. Back muscles resolve to the same
 * anchors as their front counterparts: a single camera angle can't show both
 * faces, so a lat highlight on a front-facing figure is a label for where the
 * work is happening, not an anatomical claim.
 */
const MUSCLE_SPOTS: Record<Muscle, Spot[]> = {
  chest: [{ at: "chest", size: 0.62 }],
  upperChest: [{ at: "chest", size: 0.5 }],
  lats: [{ mid: ["chest", "hip"], size: 1.15 }],
  upperBack: [{ at: "chest", size: 0.58 }],
  traps: [{ mid: ["shoulderL", "shoulderR"], size: 0.7 }],
  lowerBack: [{ at: "hip", size: 0.5 }],
  core: [{ mid: ["chest", "hip"], size: 0.85 }],

  frontDelts: [{ at: "shoulderL", size: 0.3 }, { at: "shoulderR", size: 0.3 }],
  sideDelts: [{ at: "shoulderL", size: 0.32 }, { at: "shoulderR", size: 0.32 }],
  rearDelts: [{ at: "shoulderL", size: 0.3 }, { at: "shoulderR", size: 0.3 }],

  biceps: [{ mid: ["shoulderL", "elbowL"] }, { mid: ["shoulderR", "elbowR"] }],
  triceps: [{ mid: ["shoulderL", "elbowL"] }, { mid: ["shoulderR", "elbowR"] }],
  forearms: [{ mid: ["elbowL", "handL"] }, { mid: ["elbowR", "handR"] }],

  quads: [{ mid: ["hip", "kneeL"] }, { mid: ["hip", "kneeR"] }],
  hamstrings: [{ mid: ["hip", "kneeL"] }, { mid: ["hip", "kneeR"] }],
  glutes: [{ at: "hip", size: 0.55 }],
  calves: [{ mid: ["kneeL", "ankleL"] }, { mid: ["kneeR", "ankleR"] }],
  abductors: [{ at: "hip", size: 0.5 }],
  adductors: [{ at: "hip", size: 0.45 }],
};

/** A resolved highlight, in fractions of the image box. */
export type Blob = { x: number; y: number; w: number; h: number; angle: number };

const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/**
 * Resolve a muscle to blobs, skipping any spot whose anchors this frame
 * doesn't define — that's how an exercise gets away with placing only the
 * joints its own muscles care about.
 */
export function blobsFor(anchors: Anchors, muscle: Muscle): Blob[] {
  const chest = anchors.chest;
  const hip = anchors.hip;
  // Every size is relative to the torso, so a figure drawn small in frame gets
  // proportionally smaller highlights without a per-frame scale factor.
  const torso = chest && hip ? dist(chest, hip) : 0.2;

  const out: Blob[] = [];
  for (const spot of MUSCLE_SPOTS[muscle]) {
    if ("at" in spot) {
      const p = anchors[spot.at];
      if (!p) continue;
      const r = torso * (spot.size ?? 0.5);
      out.push({ x: p[0], y: p[1], w: r, h: r, angle: 0 });
    } else {
      const a = anchors[spot.mid[0]];
      const b = anchors[spot.mid[1]];
      if (!a || !b) continue;
      const len = dist(a, b);
      out.push({
        x: (a[0] + b[0]) / 2,
        y: (a[1] + b[1]) / 2,
        // A limb pointing towards the camera is drawn short — the thigh at the
        // bottom of a squat is barely taller than the hip. Letting the blob
        // shrink with it turns the highlight into a smudge at the joint, so it
        // keeps a floor tied to the torso and stays a readable patch.
        w: Math.max(len * 0.8, torso * 0.55),
        h: torso * 0.3 * (spot.size ?? 1),
        angle: (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI,
      });
    }
  }
  return out;
}

export type GuideArt = {
  /** Slug in the workout-guide catalogue; also the folder under /public/guide. */
  source: string;
  /**
   * Frame files in rep order, bottom of the rep first.
   *
   * The catalogue's own numbering is not consistently ordered — a squat runs
   * standing -> deep across frames 1-3, but a lateral raise has arms down in
   * frame 3 — so the order is stated per exercise rather than assumed.
   */
  order: [number, number, number];
  /** Anchors per entry in `order`, not per file number. */
  anchors: [Anchors, Anchors, Anchors];
  /** Captions for the three positions. */
  steps?: [string, string, string];
};

/**
 * Pilot set. Keyed by our slug, pointing at their art.
 */
export const GUIDE_ART: Record<string, GuideArt> = {
  "barbell-bench-press": {
    source: "bench-press",
    order: [3, 2, 1],
    steps: ["Bar on chest", "Driving up", "Lockout"],
    anchors: [
      {
        chest: [0.47, 0.47], hip: [0.62, 0.6],
        shoulderL: [0.4, 0.43], shoulderR: [0.55, 0.4],
        elbowL: [0.36, 0.36], elbowR: [0.63, 0.33],
        handL: [0.33, 0.32], handR: [0.68, 0.28],
        kneeL: [0.72, 0.68], kneeR: [0.66, 0.72],
        ankleL: [0.8, 0.82], ankleR: [0.57, 0.88],
      },
      {
        chest: [0.48, 0.48], hip: [0.63, 0.62],
        shoulderL: [0.4, 0.44], shoulderR: [0.56, 0.4],
        elbowL: [0.33, 0.35], elbowR: [0.62, 0.3],
        handL: [0.3, 0.26], handR: [0.66, 0.24],
        kneeL: [0.74, 0.68], kneeR: [0.68, 0.72],
        ankleL: [0.82, 0.84], ankleR: [0.58, 0.9],
      },
      {
        chest: [0.45, 0.47], hip: [0.6, 0.6],
        shoulderL: [0.36, 0.44], shoulderR: [0.5, 0.4],
        elbowL: [0.3, 0.34], elbowR: [0.55, 0.3],
        handL: [0.28, 0.22], handR: [0.6, 0.2],
        kneeL: [0.72, 0.66], kneeR: [0.66, 0.7],
        ankleL: [0.8, 0.8], ankleR: [0.55, 0.86],
      },
    ],
  },

  "barbell-back-squat": {
    source: "squat",
    order: [3, 2, 1],
    steps: ["Bottom", "Driving up", "Standing"],
    anchors: [
      {
        head: [0.49, 0.43], chest: [0.49, 0.52], hip: [0.5, 0.64],
        shoulderL: [0.43, 0.48], shoulderR: [0.57, 0.48],
        kneeL: [0.43, 0.75], kneeR: [0.55, 0.73],
        ankleL: [0.45, 0.91], ankleR: [0.57, 0.89],
      },
      {
        head: [0.47, 0.31], chest: [0.47, 0.41], hip: [0.48, 0.55],
        shoulderL: [0.4, 0.37], shoulderR: [0.56, 0.37],
        kneeL: [0.43, 0.66], kneeR: [0.53, 0.65],
        ankleL: [0.42, 0.86], ankleR: [0.53, 0.85],
      },
      {
        head: [0.44, 0.24], chest: [0.45, 0.33], hip: [0.45, 0.51],
        shoulderL: [0.37, 0.31], shoulderR: [0.53, 0.31],
        kneeL: [0.42, 0.68], kneeR: [0.5, 0.68],
        ankleL: [0.4, 0.86], ankleR: [0.52, 0.86],
      },
    ],
  },

  "db-lateral-raise": {
    source: "lateral-raise",
    order: [3, 1, 2],
    steps: ["Arms down", "Rising", "Shoulder height"],
    anchors: [
      {
        chest: [0.5, 0.37], hip: [0.5, 0.53],
        shoulderL: [0.44, 0.31], shoulderR: [0.57, 0.31],
        elbowL: [0.42, 0.43], elbowR: [0.6, 0.43],
        handL: [0.41, 0.54], handR: [0.61, 0.54],
        kneeL: [0.47, 0.66], kneeR: [0.55, 0.66],
        ankleL: [0.47, 0.82], ankleR: [0.56, 0.82],
      },
      {
        chest: [0.47, 0.36], hip: [0.47, 0.52],
        shoulderL: [0.4, 0.32], shoulderR: [0.55, 0.3],
        elbowL: [0.3, 0.35], elbowR: [0.64, 0.27],
        handL: [0.24, 0.35], handR: [0.71, 0.25],
        kneeL: [0.45, 0.68], kneeR: [0.55, 0.66],
        ankleL: [0.45, 0.82], ankleR: [0.6, 0.78],
      },
      {
        chest: [0.5, 0.38], hip: [0.5, 0.55],
        shoulderL: [0.43, 0.33], shoulderR: [0.58, 0.33],
        elbowL: [0.33, 0.36], elbowR: [0.68, 0.35],
        handL: [0.24, 0.38], handR: [0.77, 0.36],
        kneeL: [0.46, 0.68], kneeR: [0.55, 0.68],
        ankleL: [0.46, 0.84], ankleR: [0.57, 0.82],
      },
    ],
  },
};

export const getGuideArt = (slug: string): GuideArt | undefined => GUIDE_ART[slug];

/**
 * Required by the artwork's licence. The images are CC BY-SA 4.0 — that binds
 * the images, not this repo's code — so anywhere they are shown has to carry
 * the credit and a link to the terms.
 */
export const GUIDE_CREDIT = {
  work: "Workout Guide",
  workUrl: "https://github.com/bryllim/workout-guide",
  creator: "Bryl Lim",
  creatorUrl: "https://bryllim.com",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  source: "Everkinetic",
  sourceUrl: "https://github.com/everkinetic/data",
} as const;
