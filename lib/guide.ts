/**
 * Line art from the `workout-guide` catalogue, animated.
 *
 * The three frames per exercise are separately drawn illustrations rather than
 * frames of one scene, so the whole drawing sits at a slightly different place
 * in each — the bench slides around, the plates change diameter. Played
 * straight, the loop judders.
 *
 * `offsets` is the correction, derived offline rather than authored: for each
 * exercise, the translation of every frame that best lines its *static*
 * structure up with the middle one. Scoring the whole drawing doesn't work —
 * it cancels the movement itself, pulling the bottom of a squat back up to
 * meet the top — so the search is scored first over the floor of the frame,
 * then over the ink that survived in all three, which is the equipment. See
 * the README for regenerating it.
 *
 * It's a partial fix. The drawings genuinely differ, and no transform
 * reconciles that; a short cross-fade covers the rest.
 */

/** Fractions of the image box, so they survive any render size. */
export type Pt = [x: number, y: number];

export type GuideArt = {
  /** Slug in the workout-guide catalogue; also the folder under /public/guide. */
  source: string;
  /**
   * Frame files in movement order, with the mid-rep drawing in the middle.
   *
   * The catalogue's numbering is not consistently ordered, and the middle
   * frame is not reliably frame 2 — some exercises draw the top of the rep
   * there. Which end is which doesn't matter, because the rep ping-pongs and
   * a cycle reads the same in either direction; having the *middle* right
   * does, or the animation steps through the positions out of sequence.
   */
  order: [number, number, number];
  /** Registration offset per entry in `order`, not per file number. */
  offsets: [Pt, Pt, Pt];
};

/**
 * Every exercise in the routine that the catalogue covers.
 *
 * Two pairs share art: the catalogue has no barbell curl distinct from the
 * EZ-bar one, and no reverse-grip pushdown — in both cases the same movement
 * with a different grip or bar.
 */
export const GUIDE_ART: Record<string, GuideArt> = {
  "assisted-pull-up": { source: "assisted-pull-up", order: [1, 2, 3], offsets: [[0, 0], [0, 0], [0, 0]] },
  "back-extension": { source: "back-extension", order: [1, 2, 3], offsets: [[-0.0234, 0.0312], [0, 0], [0, 0]] },
  "barbell-back-squat": { source: "squat", order: [1, 2, 3], offsets: [[-0.0078, -0.0078], [0, 0], [0.0156, -0.0547]] },
  "barbell-bench-press": { source: "bench-press", order: [1, 2, 3], offsets: [[0.0391, 0.0625], [0, 0], [0.0312, 0.0391]] },
  "barbell-overhead-press": { source: "overhead-press", order: [1, 2, 3], offsets: [[0.0078, -0.0156], [0, 0], [0, 0.0156]] },
  "bent-over-barbell-row": { source: "barbell-row", order: [1, 2, 3], offsets: [[0, 0], [0, 0], [0, 0]] },
  "cable-curl": { source: "cable-curl", order: [2, 1, 3], offsets: [[0, 0], [0, 0.0391], [0, 0]] },
  "cable-face-pull": { source: "face-pull", order: [1, 3, 2], offsets: [[-0.0234, 0], [-0.0234, 0], [0, 0]] },
  "cable-pushdown-bar": { source: "tricep-pushdown", order: [2, 1, 3], offsets: [[0, 0], [-0.0078, 0.0312], [0, 0]] },
  "cable-pushdown-rope": { source: "rope-tricep-pushdown", order: [2, 1, 3], offsets: [[0, 0], [-0.0078, 0.0312], [0, 0]] },
  "cable-reverse-curl": { source: "reverse-curl", order: [2, 1, 3], offsets: [[0, 0], [0, 0], [0, 0]] },
  "cable-reverse-grip-pushdown": { source: "tricep-pushdown", order: [2, 1, 3], offsets: [[0, 0], [-0.0078, 0.0312], [0, 0]] },
  "chest-press": { source: "machine-chest-press", order: [1, 2, 3], offsets: [[-0.0156, 0.0312], [0, 0], [0, 0]] },
  "close-grip-lat-pulldown": { source: "close-grip-lat-pulldown", order: [1, 2, 3], offsets: [[-0.0078, 0.0312], [0, 0], [0, 0]] },
  "db-curl": { source: "bicep-curl", order: [1, 2, 3], offsets: [[-0.0078, 0.0312], [0, 0], [0, 0]] },
  "db-lateral-raise": { source: "lateral-raise", order: [2, 1, 3], offsets: [[0, 0], [0, 0.0234], [0, 0]] },
  "dips": { source: "dip", order: [1, 2, 3], offsets: [[0, 0.09], [0, 0], [0.0078, -0.0625]] },
  "ez-bar-curl": { source: "ez-bar-curl", order: [1, 2, 3], offsets: [[0, 0.0312], [0, 0], [0, 0]] },
  "hammer-curl": { source: "hammer-curl", order: [1, 2, 3], offsets: [[-0.0078, 0.0312], [0, 0], [0, 0]] },
  "hip-abduction": { source: "hip-abduction-machine", order: [2, 1, 3], offsets: [[0, 0], [0, 0], [0, 0]] },
  "hip-adduction": { source: "hip-adduction-machine", order: [1, 2, 3], offsets: [[0, 0], [0, 0], [0, 0]] },
  "incline-chest-press": { source: "incline-bench-press", order: [1, 2, 3], offsets: [[0.0156, 0.0312], [0, 0], [0, 0.0078]] },
  "lat-pulldown-wide": { source: "wide-grip-lat-pulldown", order: [1, 3, 2], offsets: [[0, 0], [0, 0], [0, 0]] },
  "leg-curl": { source: "leg-curl", order: [1, 2, 3], offsets: [[0.0156, 0.0234], [0, 0], [0, 0]] },
  "leg-extension": { source: "leg-extension", order: [1, 2, 3], offsets: [[0, 0], [0, 0], [0, 0]] },
  "leg-press": { source: "leg-press", order: [1, 2, 3], offsets: [[0.0078, 0.0156], [0, 0], [0, 0]] },
  "lying-ez-bar-triceps-extension": { source: "skull-crusher", order: [1, 2, 3], offsets: [[0.0078, 0.0234], [0, 0], [0, 0]] },
  "machine-shoulder-press": { source: "machine-shoulder-press", order: [1, 3, 2], offsets: [[0, 0], [0, -0.0156], [0, 0]] },
  "pec-deck-fly": { source: "pec-deck", order: [1, 3, 2], offsets: [[0.0078, 0], [0.0078, 0], [0, 0]] },
  "rear-delt-fly": { source: "rear-delt-fly", order: [1, 2, 3], offsets: [[0, 0], [0, 0], [0, 0]] },
  "seated-calf-raise": { source: "seated-calf-raise", order: [1, 2, 3], offsets: [[0.0078, 0.0234], [0, 0], [0, 0]] },
  "seated-row-machine": { source: "seated-row", order: [1, 2, 3], offsets: [[0.0234, 0.0234], [0, 0], [0, 0]] },
  "shrugs": { source: "shrug", order: [2, 1, 3], offsets: [[0, 0], [0, 0], [0, 0.0156]] },
  "standing-calf-raise": { source: "standing-calf-raise", order: [1, 2, 3], offsets: [[0.0078, 0.0391], [0, 0], [0.0391, 0.0078]] },
  "straight-arm-pulldown": { source: "straight-arm-pulldown", order: [1, 3, 2], offsets: [[-0.0156, 0.0312], [-0.0156, 0], [0, 0]] },
  "straight-bar-curl": { source: "ez-bar-curl", order: [1, 2, 3], offsets: [[0, 0.0312], [0, 0], [0, 0]] },
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
