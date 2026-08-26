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
