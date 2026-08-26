/**
 * Line art from the `workout-guide` catalogue, animated.
 *
 * The three frames per exercise are separately drawn illustrations rather than
 * frames of one scene, so the whole drawing sits at a different place and size
 * in each — the bench slides around, the plates change diameter. Played
 * straight, the loop judders.
 *
 * The fix is registration. Each frame carries a handful of eyeballed joint
 * positions, and `stable` names the joints that shouldn't move in the real
 * world — the planted feet of a squat, the hips on a bench. Lining those up
 * cancels the whole-drawing drift and leaves only the difference in linework,
 * which is small enough to cross-fade through.
 *
 * It's a partial fix, not a perfect one: the drawings genuinely differ, and no
 * transform reconciles that.
 */

/** Joints we place by hand. Only the ones an exercise needs to register. */
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
  /**
   * Joints that hold still through the rep, used to register the frames.
   *
   * Pick things the lifter plants, never something the movement moves: aligning
   * on the hips of a squat would cancel the squat. Two points beat one, but
   * keep them far apart — the ankles of a narrow stance sit so close together
   * that they can't even be trusted for scale, which is why registration is
   * translation-only.
   */
  stable: GuideAnchor[];
  /** Captions for the three positions. */
  steps?: [string, string, string];
};

/**
 * Per-frame translation, in fractions of the image box, that brings each frame
 * into register with the middle one. Frames missing a stable anchor just don't
 * move.
 */
export function frameOffsets(art: GuideArt): Pt[] {
  const REF = 1;
  return art.anchors.map((a, i) => {
    if (i === REF) return [0, 0];
    const shared = art.stable.filter((k) => a[k] && art.anchors[REF][k]);
    if (!shared.length) return [0, 0];
    let sx = 0;
    let sy = 0;
    for (const k of shared) {
      sx += art.anchors[REF][k]![0] - a[k]![0];
      sy += art.anchors[REF][k]![1] - a[k]![1];
    }
    return [sx / shared.length, sy / shared.length];
  });
}

/**
 * Pilot set. Keyed by our slug, pointing at their art.
 */
export const GUIDE_ART: Record<string, GuideArt> = {
  "barbell-bench-press": {
    source: "bench-press",
    order: [3, 2, 1],
    // Butt stays on the bench, far foot stays planted.
    stable: ["hip", "ankleR"],
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
    stable: ["ankleL", "ankleR"],
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
    stable: ["ankleL", "ankleR"],
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
