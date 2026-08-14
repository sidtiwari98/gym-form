import { pose, sym } from "../rig";
import type { Exercise } from "../types";

const seatSide = { torso: 184, hipL: 90, hipR: 90, kneeL: 2, kneeR: 2, ankleL: 90, ankleR: 90, rootX: 46, rootY: 60 };
const seatFront = { torso: 180, rootX: 50, rootY: 62, ...sym("front", { hip: 16, knee: 4, thighS: 0.34 }) };

export const shoulders: Exercise[] = [
  {
    slug: "barbell-overhead-press",
    name: "Barbell Overhead Press",
    aka: "Standing military press",
    gear: "Barbell",
    pattern: "Vertical press",
    primary: ["frontDelts"],
    secondary: ["sideDelts", "triceps", "core"],
    tempo: 3,
    frames: {
      side: [
        pose({ torso: 176 }, { shoulderL: -8, elbowL: 176, shoulderR: -8, elbowR: 176 }),
        pose({ torso: 182 }, { shoulderL: 178, elbowL: 178, shoulderR: 178, elbowR: 178 }),
      ],
      front: [
        pose({}, sym("front", { shoulder: 56, elbow: 176 })),
        pose({}, sym("front", { shoulder: 172, elbow: 178 })),
      ],
    },
    props: {
      side: [{ kind: "bar", at: "hands", style: "barbell", inFront: true }],
      front: [{ kind: "bar", at: "hands", style: "barbell", width: 40, inFront: true }],
    },
    overlays: {
      side: [
        { kind: "trace", of: "hands", label: "bar path" },
        { kind: "mark", at: "head", label: "head back, then through", dy: -9 },
      ],
      front: [{ kind: "mark", at: "elbowL", label: "elbows under the bar", dy: -8 }],
    },
    cues: [
      "Bar starts on the front delts, elbows slightly in front of the bar, forearms vertical.",
      "Squeeze the glutes and brace the abs — that's what stops the press turning into a standing incline press.",
      "Pull your head back out of the way, press up, then push your head 'through' the window as the bar clears it.",
      "Finish with the bar directly over the mid-foot, biceps by your ears.",
    ],
    mistakes: [
      "Leaning back through the lower back instead of bracing.",
      "Pressing the bar around your face in a big arc rather than moving your head.",
      "Stopping short overhead, with the bar still in front of the body.",
    ],
  },

  {
    slug: "machine-shoulder-press",
    name: "Machine Shoulder Press",
    aka: "Alternate grip",
    gear: "Machine",
    pattern: "Vertical press",
    primary: ["frontDelts"],
    secondary: ["sideDelts", "triceps"],
    tempo: 3,
    frames: {
      side: [
        pose(seatSide, { shoulderL: -10, elbowL: 174, shoulderR: -10, elbowR: 174 }),
        pose(seatSide, { shoulderL: 176, elbowL: 176, shoulderR: 176, elbowR: 176 }),
      ],
      front: [
        pose(seatFront, sym("front", { shoulder: 60, elbow: 176 })),
        pose(seatFront, sym("front", { shoulder: 168, elbow: 178 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 52, y: 67.5, angle: 0, len: 24, thick: 4 },
        { kind: "pad", x: 38, y: 52, angle: 84, len: 28, thick: 4.5 },
        { kind: "post", x: 48, y1: 70, y2: 93 },
        { kind: "bar", at: "hands", style: "handle", inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 68, angle: 0, len: 26, thick: 4 },
        { kind: "post", x: 26, y1: 18, y2: 93 },
        { kind: "post", x: 74, y1: 18, y2: 93 },
        { kind: "bar", at: "wristL", style: "handle", width: 8, inFront: true },
        { kind: "bar", at: "wristR", style: "handle", width: 8, inFront: true },
      ],
    },
    overlays: {
      side: [{ kind: "trace", of: "hands" }],
      front: [{ kind: "angle", at: "elbowL", a: "shoulderL", b: "wristL" }],
    },
    cues: [
      "Set the seat so the handles start at about shoulder height — not above your ears.",
      "Back flat against the pad, ribs down; don't arch to get the weight moving.",
      "Neutral or angled grip is easier on the shoulder than a straight pronated grip, so use the alternate handles if the machine has them.",
      "Press to near lockout, then lower under control to shoulder height.",
    ],
    mistakes: [
      "Starting far too low, which dumps you into the weakest part of the shoulder's range.",
      "Arching the lower back off the pad on the last few reps.",
      "Shrugging at the top instead of finishing with the shoulders down.",
    ],
  },

  {
    slug: "db-lateral-raise",
    name: "DB Lateral Raise",
    gear: "Dumbbells",
    pattern: "Shoulder abduction",
    primary: ["sideDelts"],
    secondary: ["traps"],
    tempo: 2.8,
    viewLabels: { side: "Side (scap plane)" },
    frames: {
      side: [
        pose({ torso: 174 }, { shoulderL: 12, elbowL: 10, shoulderR: 12, elbowR: 10 }),
        pose({ torso: 174 }, { shoulderL: 60, elbowL: 56, shoulderR: 60, elbowR: 56 }),
      ],
      front: [
        pose({}, sym("front", { shoulder: 8, elbow: 6 })),
        pose({}, sym("front", { shoulder: 86, elbow: 80 })),
      ],
    },
    props: {
      side: [{ kind: "dumbbells", grip: "pronated", size: 5 }],
      front: [{ kind: "dumbbells", grip: "pronated" }],
    },
    overlays: {
      front: [
        { kind: "trace", of: "wristL" },
        { kind: "mark", at: "elbowL", label: "elbow leads", dy: -8 },
      ],
      side: [{ kind: "mark", at: "hands", label: "slightly in front", dy: -9 }],
    },
    cues: [
      "Raise to shoulder height and no further — above that the traps take over.",
      "Lead with the elbows, not the hands. The elbow should be a touch higher than the wrist at the top.",
      "Raise slightly in front of your body (about 30°), not dead sideways. That's the plane the shoulder actually likes.",
      "Small forward tilt of the torso, and no swinging. Lighter than your ego wants.",
    ],
    mistakes: [
      "Swinging the weights up with a hip bounce.",
      "Going above shoulder height and turning it into a shrug.",
      "Leading with the hands, wrists higher than elbows, which shifts it to the front delt.",
    ],
  },

  {
    slug: "rear-delt-fly",
    name: "Rear Delt Fly",
    aka: "Reverse pec deck, or crossed cables",
    gear: "Machine / Cable",
    pattern: "Horizontal abduction",
    primary: ["rearDelts"],
    secondary: ["upperBack"],
    tempo: 3,
    frames: {
      side: [
        pose({ ...seatSide, torso: 170 }, { shoulderL: 80, elbowL: 76, shoulderR: 80, elbowR: 76 }),
        pose({ ...seatSide, torso: 170 }, { shoulderL: -66, elbowL: -60, shoulderR: -66, elbowR: -60 }),
      ],
      front: [
        pose(seatFront, sym("front", { shoulder: 62, elbow: 30, upperArmS: 0.5, forearmS: 0.45 })),
        pose(seatFront, sym("front", { shoulder: 88, elbow: 84 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 52, y: 67.5, angle: 0, len: 24, thick: 4 },
        { kind: "pad", x: 66, y: 50, angle: 96, len: 26, thick: 4.5 },
        { kind: "post", x: 48, y1: 70, y2: 93 },
        { kind: "bar", at: "hands", style: "handle", inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 68, angle: 0, len: 26, thick: 4 },
        { kind: "bar", at: "wristL", style: "handle", width: 7, inFront: true },
        { kind: "bar", at: "wristR", style: "handle", width: 7, inFront: true },
      ],
    },
    overlays: {
      front: [
        { kind: "trace", of: "wristL", label: "wide arc" },
        { kind: "mark", at: "elbowL", label: "elbows high", dy: -8 },
      ],
      side: [{ kind: "mark", at: "chest", label: "chest on the pad", dy: -9 }],
    },
    cues: [
      "Chest against the pad, small bend in the elbows held constant throughout.",
      "Sweep the arms out and back in a wide arc at roughly shoulder height, thumbs pointing slightly down.",
      "Think about pulling with the back of the shoulder, not squeezing the shoulder blades — that's a different exercise.",
      "Very light. Rear delts respond to reps and control, not load.",
    ],
    mistakes: [
      "Bending the elbows through the rep so it becomes a wide row.",
      "Letting the arms drop low so the lats take over.",
      "Jerking the torso off the pad to move heavier weight.",
    ],
  },

  {
    slug: "cable-face-pull",
    name: "Cable Face Pull",
    gear: "Cable",
    pattern: "Horizontal pull, high",
    primary: ["rearDelts"],
    secondary: ["upperBack", "traps"],
    tempo: 3,
    frames: {
      side: [
        pose({ torso: 178 }, { shoulderL: 76, elbowL: 74, shoulderR: 76, elbowR: 74 }),
        pose({ torso: 178 }, { shoulderL: 118, elbowL: 190, shoulderR: 118, elbowR: 190 }),
      ],
      front: [
        pose({}, sym("front", { shoulder: 26, elbow: 150, upperArmS: 0.6, forearmS: 0.55 })),
        pose({}, sym("front", { shoulder: 96, elbow: 172, forearmS: 0.7 })),
      ],
    },
    props: {
      side: [
        { kind: "post", x: 88, y1: 24, y2: 93 },
        { kind: "cable", from: [88, 26], to: "hands" },
        { kind: "bar", at: "hands", style: "rope", inFront: true },
      ],
      front: [
        { kind: "cable", from: [50, 16], to: "hands" },
        { kind: "bar", at: "hands", style: "rope", inFront: true },
      ],
    },
    overlays: {
      side: [{ kind: "trace", of: "hands" }],
      front: [{ kind: "mark", at: "elbowL", label: "elbows at shoulder height", dy: -8 }],
    },
    cues: [
      "Set the pulley at roughly upper-chest to face height and step back so there's tension at the start.",
      "Pull the rope toward your forehead, splitting your hands apart as they arrive beside your ears.",
      "Elbows stay at shoulder height — this is a high pull, not a row to the chest.",
      "Externally rotate at the end so the knuckles finish pointing up and back. Hold for a beat.",
    ],
    mistakes: [
      "Letting the elbows drop, which turns it into an upper-back row and skips the rear delts.",
      "Leaning back and using bodyweight as a counterweight.",
      "Too much load, so the reps become a series of jerks.",
    ],
  },
];
