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

/** Plain-English "where is it on my body" line for each muscle, no anatomy jargon. */
export const MUSCLE_LOCATION: Record<Muscle, string> = {
  chest: "Across the front of your upper body, under your collarbone.",
  upperChest: "The top slice of your chest, right under your collarbone.",
  lats: "The wide muscles on your sides, from your armpit down toward your waist.",
  upperBack: "Between your shoulder blades.",
  traps: "From the back of your neck out to your shoulders — it's what shrugs.",
  lowerBack: "Your lower back, either side of your spine.",
  frontDelts: "The front of your shoulder, just below your collarbone.",
  sideDelts: "The rounded cap on the side of your shoulder.",
  rearDelts: "The back of your shoulder, behind the cap.",
  biceps: "The front of your upper arm.",
  triceps: "The back of your upper arm.",
  forearms: "Your lower arm, between elbow and wrist.",
  quads: "The front of your thigh.",
  hamstrings: "The back of your thigh.",
  glutes: "Your butt.",
  calves: "The back of your lower leg.",
  abductors: "Your outer hip and thigh — the muscles that swing your leg out to the side.",
  adductors: "Your inner thigh — the muscles that pull your leg back in.",
  core: "Your stomach and sides — the muscles that brace your trunk.",
};

/** One checkpoint in a checklist: a short label plus a plain-language line. */
export type Checkpoint = { part: string; text: string };

export type Exercise = {
  slug: string;
  name: string;
  aka?: string;
  gear: string;
  pattern: string;
  primary: Muscle[];
  secondary?: Muscle[];
  cues: string[];
  mistakes: string[];
  /**
   * How to configure the machine, bench, rack, or cable before you start —
   * seat height, pad position, pulley height, rack pins, grip width.
   * The stuff that's wrong before the first rep even starts.
   */
  setup?: Checkpoint[];
  /**
   * How your body should be positioned, head to toe, in plain language.
   * Ordered top to bottom; only the body parts that matter for this exercise.
   */
  bodyPosition?: Checkpoint[];
  /** Seconds per rep; drives the animation speed. */
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
