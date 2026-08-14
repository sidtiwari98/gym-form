import { pose, sym } from "../rig";
import type { Exercise } from "../types";

export const legs: Exercise[] = [
  {
    slug: "barbell-back-squat",
    name: "Barbell Back Squat",
    gear: "Barbell",
    pattern: "Squat",
    primary: ["quads", "glutes"],
    secondary: ["hamstrings", "lowerBack", "core"],
    tempo: 3.6,
    frames: {
      side: [
        pose({ torso: 176, hipL: 2, hipR: 2, kneeL: 1, kneeR: 1 },
          { shoulderL: -40, elbowL: 150, shoulderR: -40, elbowR: 150 }),
        pose({ torso: 140, hipL: 82, hipR: 82, kneeL: -32, kneeR: -32, ankleL: 90, ankleR: 90 },
          { shoulderL: -40, elbowL: 150, shoulderR: -40, elbowR: 150 }),
      ],
      front: [
        pose(sym("front", { hip: 10, knee: 6 }), sym("front", { shoulder: 48, elbow: 150 })),
        pose(sym("front", { hip: 34, knee: -30 }), sym("front", { shoulder: 48, elbow: 150 })),
      ],
    },
    props: {
      side: [{ kind: "bar", at: "chest", style: "barbell", inFront: true }],
      front: [{ kind: "bar", at: "chest", style: "barbell", width: 46, inFront: true }],
    },
    overlays: {
      side: [
        { kind: "spine", label: "neutral spine" },
        { kind: "trace", of: "chest", label: "stays over mid-foot" },
      ],
      front: [{ kind: "arrow", from: "ankleL", to: "kneeL", label: "knees track over toes", tone: "good" }],
    },
    cues: [
      "Bar on the upper traps, not the neck. Squeeze the bar down into your back and keep the chest up.",
      "Big breath into the belly and brace before you start descending. Hold it for the whole rep.",
      "Sit down and slightly back at the same time — knees travel forward, hips travel back.",
      "Knees track out over the toes; drive the floor away and keep the bar over the mid-foot the whole way.",
    ],
    mistakes: [
      "Knees caving inward on the way up — usually the last rep or two of a hard set.",
      "Hips shooting up first, which turns the squat into a good morning.",
      "Cutting depth. Aim for hip crease at or below the top of the knee if your mobility allows.",
    ],
  },

  {
    slug: "leg-press",
    name: "Leg Press",
    gear: "Machine",
    pattern: "Squat pattern, supported",
    primary: ["quads", "glutes"],
    secondary: ["hamstrings"],
    tempo: 3.2,
    frames: {
      side: [
        pose({ torso: 206, hipL: 118, hipR: 118, kneeL: 118, kneeR: 118, ankleL: 30, ankleR: 30, rootX: 30, rootY: 64 }, { shoulderL: -26, elbowL: 40, shoulderR: -26, elbowR: 40 }),
        pose({ torso: 206, hipL: 132, hipR: 132, kneeL: 68, kneeR: 68, ankleL: 30, ankleR: 30, rootX: 30, rootY: 64 }, { shoulderL: -26, elbowL: 40, shoulderR: -26, elbowR: 40 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 50, ...sym("front", { hip: 16, knee: 10, thighS: 0.45, shinS: 0.85 }) }, sym("front", { shoulder: 24, elbow: 40 })),
        pose({ torso: 180, rootX: 50, rootY: 50, ...sym("front", { hip: 30, knee: 18, thighS: 0.45, shinS: 0.6 }) }, sym("front", { shoulder: 24, elbow: 40 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 22, y: 74, angle: 24, len: 30, thick: 5 },
        { kind: "post", x: 20, y1: 76, y2: 93 },
        { kind: "padAt", at: "ankleL", angle: 62, len: 22, thick: 3.5, dx: 2, dy: -1 },
        { kind: "box", x: 74, y: 20, w: 6, h: 16, tone: "plate" },
      ],
      front: [
        { kind: "padAt", at: "ankleL", angle: 0, len: 12, thick: 3.5, dy: 4 },
        { kind: "padAt", at: "ankleR", angle: 0, len: 12, thick: 3.5, dy: 4 },
      ],
    },
    overlays: {
      side: [
        { kind: "angle", at: "kneeL", a: "hipL", b: "ankleL", label: "stop near 90°" },
        { kind: "mark", at: "pelvis", label: "hips stay down", dy: 9 },
      ],
      front: [{ kind: "arrow", from: "ankleL", to: "kneeL", label: "knees out", tone: "good" }],
    },
    cues: [
      "Feet about shoulder width in the middle of the plate, whole foot in contact — don't let the heels lift.",
      "Lower until the knees reach roughly 90°, or until your hips start to curl off the seat. That point is your depth.",
      "Push through the mid-foot and heel, and stop just short of locking the knees out at the top.",
      "Keep your lower back flat against the pad the entire set.",
    ],
    mistakes: [
      "Going so deep that the pelvis tucks under and the lower back rounds off the pad — the single most common way people hurt themselves on this machine.",
      "Slamming into a hard lockout at the top.",
      "Hands on the knees pushing yourself through the sticking point.",
    ],
  },

  {
    slug: "leg-curl",
    name: "Leg Curl",
    aka: "Seated or lying",
    gear: "Machine",
    pattern: "Knee flexion",
    primary: ["hamstrings"],
    secondary: ["calves"],
    tempo: 3,
    frames: {
      side: [
        pose({ torso: 198, hipL: 92, hipR: 92, kneeL: 86, kneeR: 86, ankleL: 84, ankleR: 84, rootX: 34, rootY: 60 }, { shoulderL: -20, elbowL: 62, shoulderR: -20, elbowR: 62 }),
        pose({ torso: 198, hipL: 92, hipR: 92, kneeL: -26, kneeR: -26, ankleL: 40, ankleR: 40, rootX: 34, rootY: 60 }, { shoulderL: -20, elbowL: 62, shoulderR: -20, elbowR: 62 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 16, knee: 5, thighS: 0.36 }) }, sym("front", { shoulder: 22, elbow: 54 })),
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 16, knee: 9, thighS: 0.36 }) }, sym("front", { shoulder: 22, elbow: 54 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 26, y: 68, angle: 0, len: 26, thick: 4.5 },
        { kind: "pad", x: 14, y: 54, angle: 74, len: 24, thick: 4.5 },
        { kind: "post", x: 26, y1: 70, y2: 93 },
        { kind: "roller", at: "kneeL", dy: -8, r: 4.2 },
        { kind: "roller", at: "ankleL", dy: -1, r: 4.6, inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 64, angle: 0, len: 26, thick: 4 },
        { kind: "roller", at: "ankleL", r: 4.4 },
        { kind: "roller", at: "ankleR", r: 4.4 },
      ],
    },
    overlays: {
      side: [
        { kind: "angle", at: "kneeL", a: "hipL", b: "ankleL", label: "full curl" },
        { kind: "mark", at: "pelvis", label: "hips stay planted", dy: 10 },
      ],
      front: [{ kind: "mark", at: "kneeL", label: "knees in line with hips", dy: -8 }],
    },
    cues: [
      "Line the knee joint up with the machine's pivot before you start — everything else follows from that.",
      "Curl as far as the machine allows and hold the squeeze for a beat at the bottom.",
      "Keep the hips down; the moment they lift off the pad you're using your lower back.",
      "Point the toes away to bias the hamstring, or pull them toward you to bring in more calf.",
    ],
    mistakes: [
      "Hips rising off the seat or pad to help finish the rep.",
      "Snapping the weight back to the start instead of controlling the negative.",
      "Setting the ankle roller too high up the calf, which makes the leverage horrible.",
    ],
  },

  {
    slug: "leg-extension",
    name: "Leg Extension",
    gear: "Machine",
    pattern: "Knee extension",
    primary: ["quads"],
    tempo: 3,
    frames: {
      side: [
        pose({ torso: 190, hipL: 90, hipR: 90, kneeL: -8, kneeR: -8, ankleL: 70, ankleR: 70, rootX: 40, rootY: 58 }, { shoulderL: -24, elbowL: 58, shoulderR: -24, elbowR: 58 }),
        pose({ torso: 190, hipL: 90, hipR: 90, kneeL: 86, kneeR: 86, ankleL: 120, ankleR: 120, rootX: 40, rootY: 58 }, { shoulderL: -24, elbowL: 58, shoulderR: -24, elbowR: 58 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 16, knee: 5, thighS: 0.36 }) }, sym("front", { shoulder: 22, elbow: 54 })),
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 16, knee: 2, thighS: 0.36 }) }, sym("front", { shoulder: 22, elbow: 54 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 34, y: 66, angle: 0, len: 26, thick: 4.5 },
        { kind: "pad", x: 22, y: 52, angle: 80, len: 24, thick: 4.5 },
        { kind: "post", x: 34, y1: 68, y2: 93 },
        { kind: "roller", at: "ankleL", r: 4.6, inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 62, angle: 0, len: 26, thick: 4 },
        { kind: "roller", at: "ankleL", r: 4.4 },
        { kind: "roller", at: "ankleR", r: 4.4 },
      ],
    },
    overlays: {
      side: [
        { kind: "trace", of: "ankleL" },
        { kind: "mark", at: "kneeL", label: "pivot lines up here", dy: -8 },
      ],
      front: [{ kind: "mark", at: "kneeL", label: "knees hip width", dy: -8 }],
    },
    cues: [
      "Back against the pad, hands on the handles, and line your knee up with the machine's pivot point.",
      "Extend to straight and pause for a beat — that top squeeze is where the quad does the most work.",
      "Lower slowly and stop just before the weight stack touches down, keeping tension the whole set.",
      "Don't slam into lockout with heavy weight; build up gradually on this one.",
    ],
    mistakes: [
      "Kicking the weight up with a jerk and freewheeling it back down.",
      "Lifting the hips off the seat to get extra leverage.",
      "Half reps that never reach full extension, which is the most productive part of the range.",
    ],
  },

  {
    slug: "hip-abduction",
    name: "Hip Abduction",
    gear: "Machine",
    pattern: "Hip abduction",
    primary: ["abductors", "glutes"],
    tempo: 2.6,
    viewLabels: { side: "Side (setup)" },
    frames: {
      side: [
        pose({ torso: 184, hipL: 90, hipR: 90, kneeL: 2, kneeR: 2, ankleL: 90, ankleR: 90, rootX: 44, rootY: 60 }, { shoulderL: -18, elbowL: 56, shoulderR: -18, elbowR: 56 }),
        pose({ torso: 184, hipL: 90, hipR: 90, kneeL: 2, kneeR: 2, ankleL: 90, ankleR: 90, rootX: 44, rootY: 60 }, { shoulderL: -18, elbowL: 56, shoulderR: -18, elbowR: 56 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 8, knee: 5, thighS: 0.4 }) }, sym("front", { shoulder: 22, elbow: 52 })),
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 40, knee: 34, thighS: 0.4 }) }, sym("front", { shoulder: 22, elbow: 52 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 50, y: 67.5, angle: 0, len: 26, thick: 4 },
        { kind: "pad", x: 36, y: 54, angle: 84, len: 26, thick: 4.5 },
        { kind: "post", x: 46, y1: 70, y2: 93 },
      ],
      front: [
        { kind: "pad", x: 50, y: 66, angle: 0, len: 26, thick: 4 },
        { kind: "padAt", at: "kneeL", angle: 78, len: 16, thick: 4, dx: 4 },
        { kind: "padAt", at: "kneeR", angle: -78, len: 16, thick: 4, dx: -4 },
      ],
    },
    overlays: {
      front: [
        { kind: "trace", of: "kneeL" },
        { kind: "arrow", from: "pelvis", to: "kneeL", label: "push out", tone: "good" },
      ],
      side: [{ kind: "mark", at: "chest", label: "sit tall, back on pad", dy: -9 }],
    },
    cues: [
      "Sit upright with your back against the pad — leaning forward changes which part of the glute you hit, so pick one and stay there.",
      "Push the knees out against the pads and hold the end position for a beat.",
      "Bring them back in slowly rather than letting the stack snap them closed.",
      "Feet stay planted; don't let the whole leg rotate to cheat extra range.",
    ],
    mistakes: [
      "Rocking the torso side to side to help the legs open.",
      "Bouncing the weight stack at the bottom of each rep.",
      "Going too heavy and only moving through a fraction of the range.",
    ],
  },

  {
    slug: "hip-adduction",
    name: "Hip Adduction",
    gear: "Machine",
    pattern: "Hip adduction",
    primary: ["adductors"],
    tempo: 2.6,
    viewLabels: { side: "Side (setup)" },
    frames: {
      side: [
        pose({ torso: 184, hipL: 90, hipR: 90, kneeL: 2, kneeR: 2, ankleL: 90, ankleR: 90, rootX: 44, rootY: 60 }, { shoulderL: -18, elbowL: 56, shoulderR: -18, elbowR: 56 }),
        pose({ torso: 184, hipL: 90, hipR: 90, kneeL: 2, kneeR: 2, ankleL: 90, ankleR: 90, rootX: 44, rootY: 60 }, { shoulderL: -18, elbowL: 56, shoulderR: -18, elbowR: 56 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 42, knee: 36, thighS: 0.4 }) }, sym("front", { shoulder: 22, elbow: 52 })),
        pose({ torso: 180, rootX: 50, rootY: 60, ...sym("front", { hip: 7, knee: 4, thighS: 0.4 }) }, sym("front", { shoulder: 22, elbow: 52 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 50, y: 67.5, angle: 0, len: 26, thick: 4 },
        { kind: "pad", x: 36, y: 54, angle: 84, len: 26, thick: 4.5 },
        { kind: "post", x: 46, y1: 70, y2: 93 },
      ],
      front: [
        { kind: "pad", x: 50, y: 66, angle: 0, len: 26, thick: 4 },
        { kind: "padAt", at: "kneeL", angle: 78, len: 16, thick: 4, dx: -4 },
        { kind: "padAt", at: "kneeR", angle: -78, len: 16, thick: 4, dx: 4 },
      ],
    },
    overlays: {
      front: [
        { kind: "trace", of: "kneeL" },
        { kind: "arrow", from: "kneeL", to: "pelvis", label: "squeeze in", tone: "good" },
      ],
      side: [{ kind: "mark", at: "chest", label: "sit tall, back on pad", dy: -9 }],
    },
    cues: [
      "Set the starting width to a stretch you can actually control — not the widest notch on the machine.",
      "Squeeze the knees together and pause for a beat at the end.",
      "Open back up slowly. The controlled stretch is doing as much work as the squeeze.",
      "Keep your back on the pad and your hips square.",
    ],
    mistakes: [
      "Starting far too wide, which puts the groin on stretch under load before you're warm.",
      "Letting the legs fly open on the return.",
      "Leaning forward and using the torso to help.",
    ],
  },

  {
    slug: "standing-calf-raise",
    name: "Standing Calf Raise",
    gear: "Machine",
    pattern: "Ankle plantarflexion",
    primary: ["calves"],
    tempo: 2.6,
    frames: {
      side: [
        pose({ rootY: 54, ankleL: 112, ankleR: 112 }, { shoulderL: -12, elbowL: 40, shoulderR: -12, elbowR: 40 }),
        pose({ rootY: 47, ankleL: 62, ankleR: 62 }, { shoulderL: -12, elbowL: 40, shoulderR: -12, elbowR: 40 }),
      ],
      front: [
        pose({ rootY: 54, ...sym("front", { hip: 6, knee: 4 }) }, sym("front", { shoulder: 14, elbow: 40 })),
        pose({ rootY: 47, ...sym("front", { hip: 6, knee: 4 }) }, sym("front", { shoulder: 14, elbow: 40 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "box", x: 46, y: 90, w: 24, h: 3.4, tone: "frame" },
        { kind: "post", x: 68, y1: 20, y2: 93 },
        { kind: "padAt", at: "chest", angle: 0, len: 18, thick: 4, dy: -6 },
      ],
      front: [
        { kind: "box", x: 36, y: 90, w: 28, h: 3.4, tone: "frame" },
        { kind: "post", x: 22, y1: 20, y2: 93 },
        { kind: "post", x: 78, y1: 20, y2: 93 },
        { kind: "padAt", at: "chest", angle: 0, len: 30, thick: 4, dy: -6 },
      ],
    },
    overlays: {
      side: [
        { kind: "trace", of: "pelvis" },
        { kind: "mark", at: "ankleL", label: "full stretch at the bottom", dy: 9 },
      ],
      front: [{ kind: "mark", at: "ankleL", label: "don't roll to the little toe", dy: 9 }],
    },
    cues: [
      "Balls of the feet on the block with the heels hanging free.",
      "Drop the heels as far below the block as you comfortably can — the stretch at the bottom is most of the point.",
      "Rise all the way onto the toes and pause for a second at the top.",
      "Keep the knees straight but not locked. Slow reps beat bouncy ones here.",
    ],
    mistakes: [
      "Bouncing on the achilles tendon with tiny fast reps.",
      "Bending the knees to help, which shifts work to the soleus and away from the calf you're trying to build.",
      "Rolling out onto the little-toe side of the foot at the top.",
    ],
  },

  {
    slug: "seated-calf-raise",
    name: "Seated Calf Raise",
    gear: "Machine",
    pattern: "Ankle plantarflexion, knee bent",
    primary: ["calves"],
    tempo: 2.6,
    frames: {
      side: [
        pose({ torso: 182, hipL: 92, hipR: 92, kneeL: 0, kneeR: 0, ankleL: 116, ankleR: 116, rootX: 40, rootY: 56 }, { shoulderL: -14, elbowL: 62, shoulderR: -14, elbowR: 62 }),
        pose({ torso: 182, hipL: 84, hipR: 84, kneeL: -6, kneeR: -6, ankleL: 64, ankleR: 64, rootX: 40, rootY: 56 }, { shoulderL: -14, elbowL: 62, shoulderR: -14, elbowR: 62 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 58, ...sym("front", { hip: 12, knee: 5, thighS: 0.4 }) }, sym("front", { shoulder: 18, elbow: 56 })),
        pose({ torso: 180, rootX: 50, rootY: 55, ...sym("front", { hip: 12, knee: 5, thighS: 0.4 }) }, sym("front", { shoulder: 18, elbow: 56 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 34, y: 63, angle: 0, len: 24, thick: 4.5 },
        { kind: "post", x: 34, y1: 65, y2: 93 },
        { kind: "box", x: 56, y: 88, w: 18, h: 3.4, tone: "frame" },
        { kind: "padAt", at: "kneeL", angle: 0, len: 16, thick: 5, dy: -8 },
      ],
      front: [
        { kind: "pad", x: 50, y: 62, angle: 0, len: 26, thick: 4 },
        { kind: "box", x: 38, y: 88, w: 24, h: 3.4, tone: "frame" },
        { kind: "padAt", at: "kneeL", angle: 0, len: 12, thick: 5, dy: -8 },
        { kind: "padAt", at: "kneeR", angle: 0, len: 12, thick: 5, dy: -8 },
      ],
    },
    overlays: {
      side: [{ kind: "mark", at: "kneeL", label: "pad on the lower thigh", dy: -13 }],
      front: [{ kind: "mark", at: "ankleL", label: "press through the big toe", dy: 9 }],
    },
    cues: [
      "Pad sits low on the thigh, just above the knee, so it doesn't dig into the kneecap.",
      "Bent knees take the big calf muscle out and put the soleus underneath it to work — that's why this earns a slot separate from the standing version.",
      "Full stretch at the bottom, full squeeze at the top, one second at each end.",
      "Higher reps suit this one; 15–20 is right.",
    ],
    mistakes: [
      "Short bouncy reps using only the middle of the range.",
      "Pad set too high so it presses on the kneecap.",
      "Rushing. The soleus responds to time under tension more than load.",
    ],
  },
];
