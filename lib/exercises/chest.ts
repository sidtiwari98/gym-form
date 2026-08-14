import { pose, sym } from "../rig";
import type { Exercise } from "../types";

/* Shared bases. Seated and lying work is not ground-locked: the seat, not the
 * floor, sets the height, so the root is placed explicitly. */
const seatSide = { torso: 186, hipL: 90, hipR: 90, kneeL: 2, kneeR: 2, ankleL: 90, ankleR: 90, rootX: 44, rootY: 60 };
const seatFront = { torso: 180, rootX: 50, rootY: 62, ...sym("front", { hip: 16, knee: 4, thighS: 0.34 }) };

const benchFront = { torso: 180, rootX: 50, rootY: 58, ...sym("front", { hip: 20, knee: 8, thighS: 0.4 }) };
const inclineFront = { torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 18, knee: 6, thighS: 0.4 }) };

const seatProps = (x: number, y: number, recline = 84) => [
  { kind: "pad" as const, x: x + 6, y: y + 7.5, angle: 0, len: 24, thick: 4 },
  { kind: "pad" as const, x: x - 7.5, y: y - 8, angle: recline, len: 28, thick: 4.5 },
  { kind: "post" as const, x: x + 2, y1: y + 10, y2: 93 },
];

export const chest: Exercise[] = [
  {
    slug: "chest-press",
    name: "Chest Press",
    aka: "Machine chest press",
    gear: "Machine",
    pattern: "Horizontal press",
    primary: ["chest"],
    secondary: ["frontDelts", "triceps"],
    tempo: 3,
    frames: {
      side: [
        pose(seatSide, { shoulderL: -70, elbowL: 80, shoulderR: -70, elbowR: 80 }),
        pose(seatSide, { shoulderL: 90, elbowL: 90, shoulderR: 90, elbowR: 90 }),
      ],
      front: [
        pose(seatFront, sym("front", { shoulder: 84, elbow: 168, forearmS: 0.34 })),
        pose(seatFront, sym("front", { shoulder: 108, elbow: 168, upperArmS: 0.45, forearmS: 0.3 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        ...seatProps(44, 60),
        { kind: "post", x: 84, y1: 34, y2: 93 },
        { kind: "bar", at: "hands", style: "handle", inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 64, angle: 0, len: 26, thick: 4 },
        { kind: "post", x: 30, y1: 34, y2: 93 },
        { kind: "post", x: 70, y1: 34, y2: 93 },
        { kind: "bar", at: "wristL", style: "handle", width: 8, inFront: true },
        { kind: "bar", at: "wristR", style: "handle", width: 8, inFront: true },
      ],
    },
    overlays: {
      side: [{ kind: "trace", of: "hands" }],
      front: [{ kind: "angle", at: "elbowL", a: "shoulderL", b: "wristL", label: "~45° tuck" }],
    },
    cues: [
      "Set the seat so the handles line up with the middle of your chest, not your collarbones.",
      "Shoulder blades pinned back and down into the pad — think 'chest up, shoulders back'.",
      "Press until the elbows are almost locked, then stop; don't let the shoulders roll forward to chase extra range.",
      "Control the return until you feel a stretch across the chest, about level with your torso.",
    ],
    mistakes: [
      "Seat too low, so you press upward and it turns into a shoulder exercise.",
      "Elbows flared to 90°, which grinds the front of the shoulder.",
      "Letting the weight stack slam down and bouncing out of the bottom.",
    ],
  },

  {
    slug: "barbell-bench-press",
    name: "Barbell Bench Press",
    gear: "Barbell",
    pattern: "Horizontal press",
    primary: ["chest"],
    secondary: ["frontDelts", "triceps"],
    tempo: 3.4,
    viewLabels: { front: "From above" },
    frames: {
      side: [
        pose({ torso: 93, hipL: -75, hipR: -75, kneeL: -8, kneeR: -8, ankleL: 90, ankleR: 90, rootX: 40, rootY: 68 },
          { shoulderL: 180, elbowL: 180, shoulderR: 180, elbowR: 180 }),
        pose({ torso: 93, hipL: -75, hipR: -75, kneeL: -8, kneeR: -8, ankleL: 90, ankleR: 90, rootX: 40, rootY: 68 },
          { shoulderL: 250, elbowL: 130, shoulderR: 250, elbowR: 130 }),
      ],
      front: [
        pose(benchFront, sym("front", { shoulder: 100, elbow: 107, upperArmS: 0.55, forearmS: 0.65 })),
        pose(benchFront, sym("front", { shoulder: 72, elbow: 162, forearmS: 0.65 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 46, y: 75, angle: 0, len: 48, thick: 5 },
        { kind: "post", x: 28, y1: 77, y2: 93 },
        { kind: "post", x: 64, y1: 77, y2: 93 },
        { kind: "post", x: 72, y1: 44, y2: 93 },
        { kind: "bar", at: "hands", style: "barbell", inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 66, angle: 90, len: 46, thick: 15 },
        { kind: "bar", at: "hands", style: "barbell", width: 40, inFront: true },
      ],
    },
    overlays: {
      side: [{ kind: "trace", of: "hands", label: "bar path" }],
      front: [{ kind: "angle", at: "elbowL", a: "shoulderL", b: "wristL", label: "tuck, not flare" }],
    },
    cues: [
      "Shoulder blades retracted and tucked down before you unrack — that's what protects the shoulder and gives you a stable base.",
      "Bar touches the lower chest, roughly at nipple line, not the throat.",
      "Elbows at about 45–60° from the torso; tucked, not flared straight out.",
      "Drive your feet into the floor and keep your glutes on the bench the whole set.",
    ],
    mistakes: [
      "Bouncing the bar off the ribcage instead of controlling the touch.",
      "Elbows flaring to 90°, which puts the shoulder joint in its weakest position.",
      "Hips lifting off the bench on the heavy reps — that's the set telling you it's too heavy.",
    ],
  },

  {
    slug: "incline-chest-press",
    name: "Incline Chest Press",
    aka: "Incline machine or incline dumbbell press",
    gear: "Machine / Dumbbells",
    pattern: "Incline press",
    primary: ["upperChest"],
    secondary: ["frontDelts", "triceps"],
    tempo: 3,
    frames: {
      side: [
        pose({ torso: 208, hipL: 74, hipR: 74, kneeL: 6, kneeR: 6, ankleL: 90, ankleR: 90, rootX: 44, rootY: 62 },
          { shoulderL: -54, elbowL: 128, shoulderR: -54, elbowR: 128 }),
        pose({ torso: 208, hipL: 74, hipR: 74, kneeL: 6, kneeR: 6, ankleL: 90, ankleR: 90, rootX: 44, rootY: 62 },
          { shoulderL: 138, elbowL: 138, shoulderR: 138, elbowR: 138 }),
      ],
      front: [
        pose(inclineFront, sym("front", { shoulder: 82, elbow: 164, forearmS: 0.36 })),
        pose(inclineFront, sym("front", { shoulder: 116, elbow: 168, upperArmS: 0.5, forearmS: 0.3 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 38, y: 72, angle: 0, len: 22, thick: 4.5 },
        { kind: "pad", x: 30, y: 60, angle: 62, len: 32, thick: 5 },
        { kind: "post", x: 40, y1: 74, y2: 93 },
        { kind: "dumbbells", grip: "pronated", size: 5 },
      ],
      front: [
        { kind: "pad", x: 50, y: 68, angle: 90, len: 40, thick: 14 },
        { kind: "dumbbells", grip: "pronated" },
      ],
    },
    overlays: {
      side: [
        { kind: "trace", of: "hands" },
        { kind: "mark", at: "chest", label: "upper chest", dy: -9 },
      ],
      front: [{ kind: "angle", at: "elbowL", a: "shoulderL", b: "wristL" }],
    },
    cues: [
      "30–45° of incline is enough. Steeper than that and the front delt takes over from the upper chest.",
      "Press up and slightly back, so the weights finish over your collarbones rather than your face.",
      "Keep the shoulder blades pulled back into the pad — don't let them shrug up toward your ears.",
      "Lower until the elbows are level with the torso, then reverse.",
    ],
    mistakes: [
      "Setting the bench near-vertical, which turns it into an overhead press.",
      "Flaring the elbows wide at the bottom.",
      "Clanging the dumbbells together at the top and losing tension on the chest.",
    ],
  },

  {
    slug: "pec-deck-fly",
    name: "Pec Deck / Machine Fly",
    gear: "Machine",
    pattern: "Chest isolation",
    primary: ["chest"],
    secondary: ["frontDelts"],
    tempo: 3,
    frames: {
      side: [
        pose(seatSide, { shoulderL: -76, elbowL: -50, shoulderR: -76, elbowR: -50 }),
        pose(seatSide, { shoulderL: 84, elbowL: 76, shoulderR: 84, elbowR: 76 }),
      ],
      front: [
        pose(seatFront, sym("front", { shoulder: 92, elbow: 128, forearmS: 0.7 })),
        pose(seatFront, sym("front", { shoulder: 84, elbow: 150, upperArmS: 0.5, forearmS: 0.4 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        ...seatProps(44, 60),
        { kind: "post", x: 34, y1: 24, y2: 93 },
        { kind: "bar", at: "hands", style: "handle", inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 64, angle: 0, len: 26, thick: 4 },
        { kind: "post", x: 22, y1: 24, y2: 93 },
        { kind: "post", x: 78, y1: 24, y2: 93 },
        { kind: "bar", at: "wristL", style: "handle", width: 7, inFront: true },
        { kind: "bar", at: "wristR", style: "handle", width: 7, inFront: true },
      ],
    },
    overlays: {
      front: [{ kind: "trace", of: "wristL", label: "arc" }],
      side: [{ kind: "mark", at: "chest", label: "squeeze here", dy: -9 }],
    },
    cues: [
      "Keep a soft, fixed bend in the elbows the whole way — the angle shouldn't change; only the shoulder moves.",
      "Chest up, shoulders back and down. The pad should stop your upper arm roughly level with your torso.",
      "Squeeze for a beat at the point where the handles meet, then let them travel back slowly.",
      "This one is about the stretch and the squeeze, not the load. Go lighter than you think.",
    ],
    mistakes: [
      "Bending and straightening the elbows, which quietly turns the fly into a press.",
      "Going too deep behind the torso and putting the shoulder capsule on stretch under load.",
      "Shrugging the shoulders up toward the ears as the handles come together.",
    ],
  },

  {
    slug: "dips",
    name: "Dips",
    gear: "Bodyweight / Parallel bars",
    pattern: "Vertical press",
    primary: ["chest", "triceps"],
    secondary: ["frontDelts"],
    tempo: 3.2,
    frames: {
      side: [
        pose({ torso: 196, hipL: -22, hipR: -22, kneeL: -76, kneeR: -76, ankleL: 60, ankleR: 60, rootX: 52, rootY: 52 },
          { shoulderL: -6, elbowL: -4, shoulderR: -6, elbowR: -4 }),
        pose({ torso: 202, hipL: -22, hipR: -22, kneeL: -76, kneeR: -76, ankleL: 60, ankleR: 60, rootX: 52, rootY: 66 },
          { shoulderL: -46, elbowL: 46, shoulderR: -46, elbowR: 46 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 50, ...sym("front", { hip: 10, knee: -58, shinS: 0.8 }) }, sym("front", { shoulder: 6, elbow: 4 })),
        pose({ torso: 180, rootX: 50, rootY: 63, ...sym("front", { hip: 10, knee: -58, shinS: 0.8 }) }, sym("front", { shoulder: 15, elbow: 2, forearmS: 0.9 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "beam", y: 47.5, x1: 34, x2: 74, thick: 3 },
        { kind: "post", x: 70, y1: 47.5, y2: 93 },
      ],
      front: [
        { kind: "beam", y: 45.5, x1: 24, x2: 34, thick: 3 },
        { kind: "beam", y: 45.5, x1: 66, x2: 76, thick: 3 },
        { kind: "post", x: 28, y1: 45.5, y2: 93 },
        { kind: "post", x: 72, y1: 45.5, y2: 93 },
      ],
    },
    overlays: {
      side: [
        { kind: "angle", at: "elbowL", a: "shoulderL", b: "wristL", label: "to ~90°" },
        { kind: "trace", of: "chest" },
      ],
      front: [{ kind: "mark", at: "elbowL", label: "elbows back, not out", dy: -8 }],
    },
    cues: [
      "Lean the torso forward maybe 15–20° to bias the chest; stay upright to bias the triceps.",
      "Lower until the upper arm is about parallel to the floor — that's deep enough for almost everyone.",
      "Keep the shoulders pulled down away from the ears at the bottom. If they shrug up, you've gone too deep.",
      "Elbows travel back alongside you, not out to the sides.",
    ],
    mistakes: [
      "Dropping below parallel and letting the shoulders roll forward under load.",
      "Bouncing out of the bottom instead of controlling the turnaround.",
      "Swinging the legs to generate momentum.",
    ],
  },
];
