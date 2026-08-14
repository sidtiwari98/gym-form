import type { Day } from "./types";

/**
 * 5-day upper / lower / arms split, on a 7-day cycle.
 *
 * `index` is the JS day-of-week (0 = Sunday) so today's session can be picked
 * without a lookup table.
 */
export const DAYS: Day[] = [
  {
    id: "upper-a",
    index: 1,
    name: "Upper A",
    subtitle: "Heavy / compound",
    focus: "Chest · Back · Shoulders · Biceps",
    blurb: "The heavy day. Low reps, long rests, and the lifts you actually want to add weight to.",
    work: [
      { slug: "chest-press", sets: "2", reps: "10–12", note: "Easy ramp-up sets to warm the shoulders before benching." },
      { slug: "barbell-bench-press", sets: "4", reps: "6–8" },
      { slug: "bent-over-barbell-row", sets: "4", reps: "6–8" },
      { slug: "barbell-overhead-press", sets: "3", reps: "6–8" },
      { slug: "assisted-pull-up", sets: "3", reps: "8–10" },
      { slug: "dips", sets: "3", reps: "8–12" },
      { slug: "ez-bar-curl", sets: "3", reps: "8–10", swapFor: "straight-bar-curl" },
    ],
  },
  {
    id: "lower-a",
    index: 2,
    name: "Lower A",
    subtitle: "Heavy / compound",
    focus: "Quads · Hamstrings · Glutes · Calves",
    blurb: "Squat day. Everything after it is there to cover the hinge and the calves.",
    work: [
      { slug: "barbell-back-squat", sets: "4", reps: "6–8" },
      { slug: "back-extension", sets: "3", reps: "10–12", note: "Weighted — hold a plate to your chest. Start bodyweight and add load gradually." },
      { slug: "leg-press", sets: "3", reps: "8–10" },
      { slug: "leg-curl", sets: "4", reps: "10–12" },
      { slug: "standing-calf-raise", sets: "4", reps: "10–12" },
    ],
  },
  {
    id: "rest-1",
    index: 3,
    name: "Rest",
    subtitle: "Recovery",
    rest: true,
    blurb: "Growth happens here, not in the gym. Walk, eat, sleep.",
    work: [],
  },
  {
    id: "upper-b",
    index: 4,
    name: "Upper B",
    subtitle: "Volume / isolation",
    focus: "Chest · Back · Shoulders",
    blurb: "Same muscles as Upper A, different angles and higher reps — incline instead of flat, machines and cables instead of bars.",
    work: [
      { slug: "incline-chest-press", sets: "3", reps: "10–12", note: "Incline here, flat on Upper A, so the two days hit different parts of the chest." },
      { slug: "pec-deck-fly", sets: "3", reps: "12–15" },
      { slug: "lat-pulldown-wide", sets: "3", reps: "10–12", swapFor: "close-grip-lat-pulldown" },
      { slug: "seated-row-machine", sets: "3", reps: "10–12" },
      { slug: "straight-arm-pulldown", sets: "2", reps: "12–15" },
      { slug: "machine-shoulder-press", sets: "3", reps: "10–12", note: "Use the alternate / neutral grip if the machine has one." },
      { slug: "db-lateral-raise", sets: "3", reps: "12–15" },
      { slug: "rear-delt-fly", sets: "3", reps: "15", swapFor: "cable-face-pull" },
    ],
  },
  {
    id: "lower-b",
    index: 5,
    name: "Lower B",
    subtitle: "Volume / isolation",
    focus: "Quads · Hamstrings · Glutes · Calves",
    blurb: "No barbell. Machine work at higher reps, plus the hip abduction and adduction that Lower A doesn't cover.",
    work: [
      { slug: "leg-extension", sets: "4", reps: "12–15" },
      { slug: "leg-curl", sets: "3", reps: "12–15" },
      { slug: "hip-abduction", sets: "2", reps: "15" },
      { slug: "hip-adduction", sets: "2", reps: "15" },
      { slug: "back-extension", sets: "3", reps: "12–15", note: "Bodyweight is fine here — the weighted version is on Lower A." },
      { slug: "seated-calf-raise", sets: "4", reps: "15–20" },
    ],
  },
  {
    id: "arms",
    index: 6,
    name: "Arms",
    subtitle: "Dedicated volume",
    focus: "Biceps · Triceps · Traps",
    blurb: "The third arm session of the week. Small muscles, fast recovery — they can take the extra frequency.",
    work: [
      { slug: "db-curl", sets: "3", reps: "10–12", group: "Biceps" },
      { slug: "hammer-curl", sets: "3", reps: "10–12", group: "Biceps" },
      { slug: "straight-bar-curl", sets: "3", reps: "10–12", swapFor: "cable-curl", group: "Biceps" },
      { slug: "cable-reverse-curl", sets: "2", reps: "12–15", note: "Neutral wrist.", group: "Biceps" },
      { slug: "lying-ez-bar-triceps-extension", sets: "3", reps: "10–12", group: "Triceps" },
      { slug: "cable-pushdown-bar", sets: "3", reps: "12–15", swapFor: "cable-pushdown-rope", group: "Triceps" },
      { slug: "cable-reverse-grip-pushdown", sets: "2", reps: "12–15", group: "Triceps" },
      { slug: "shrugs", sets: "3", reps: "12–15", group: "Traps" },
    ],
  },
  {
    id: "rest-2",
    index: 0,
    name: "Rest",
    subtitle: "Recovery",
    rest: true,
    blurb: "Second rest day. Back to Upper A tomorrow.",
    work: [],
  },
];

/** Cycle order, Monday first — how the week actually runs. */
export const WEEK = ["upper-a", "lower-a", "rest-1", "upper-b", "lower-b", "arms", "rest-2"];

export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function getDay(id: string): Day | undefined {
  return DAYS.find((d) => d.id === id);
}

export function dayForDate(d: Date): Day {
  return DAYS.find((x) => x.index === d.getDay()) ?? DAYS[0];
}

export const GENERAL_NOTES = [
  {
    title: "Warm up",
    body: "5 minutes of light cardio, then 1–2 light ramp-up sets on the first exercise of the session.",
  },
  {
    title: "Rest between sets",
    body: "2–3 minutes on the heavy compounds (squat, bench, row, overhead press). 60–90 seconds on isolation work.",
  },
  {
    title: "Progressive overload",
    body: "This is what actually drives growth. Once you hit the top of a rep range with good form, add weight next session — even a small jump counts.",
  },
  {
    title: "Bodyweight work",
    body: "Once dips or push-ups get easy at 15+ reps, add a weighted vest or a plate, or slow the tempo down.",
  },
  {
    title: "Deload",
    body: "Every 6–8 weeks take one lighter week: same exercises at roughly 60% of your usual weights, stopping 3–4 reps short of failure.",
  },
  {
    title: "Week A / B swaps",
    body: "A few slots rotate on alternate weeks so you're not stacking two versions of the same movement into one session. Toggle the week at the top of any session to see which variation you're on.",
  },
];

export const WEEKLY_VOLUME = [
  { muscle: "Chest", sets: 13, where: "Upper A + Upper B" },
  { muscle: "Back", sets: 15, where: "Upper A + Upper B" },
  { muscle: "Shoulders", sets: 14, where: "Upper A + Upper B" },
  { muscle: "Biceps", sets: 17, where: "Upper A + Upper B + Arms" },
  { muscle: "Triceps", sets: 14, where: "Upper A + Upper B + Arms" },
  { muscle: "Quads", sets: 11, where: "Lower A + Lower B" },
  { muscle: "Hamstrings / glutes", sets: 12, where: "Lower A + Lower B" },
  { muscle: "Calves", sets: 8, where: "Lower A + Lower B" },
];
