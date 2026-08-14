import { pose, sym } from "../rig";
import type { Exercise } from "../types";

const seatSide = { torso: 190, hipL: 90, hipR: 90, kneeL: 2, kneeR: 2, ankleL: 90, ankleR: 90, rootX: 46, rootY: 60 };
const seatFront = { torso: 180, rootX: 50, rootY: 62, ...sym("front", { hip: 16, knee: 4, thighS: 0.34 }) };

export const back: Exercise[] = [
  {
    slug: "bent-over-barbell-row",
    name: "Bent-over Barbell Row",
    gear: "Barbell",
    pattern: "Horizontal pull",
    primary: ["lats", "upperBack"],
    secondary: ["biceps", "rearDelts", "lowerBack"],
    tempo: 3,
    frames: {
      side: [
        pose({ torso: 140, hipL: -6, hipR: -6, kneeL: 6, kneeR: 6 }, { shoulderL: 0, elbowL: 0, shoulderR: 0, elbowR: 0 }),
        pose({ torso: 140, hipL: -6, hipR: -6, kneeL: 6, kneeR: 6 }, { shoulderL: -70, elbowL: 70, shoulderR: -70, elbowR: 70 }),
      ],
      front: [
        pose({ torso: 178, ...sym("front", { hip: 5, knee: 4 }) }, sym("front", { shoulder: 10, elbow: 8 })),
        pose({ torso: 178, ...sym("front", { hip: 5, knee: 4 }) }, sym("front", { shoulder: 62, elbow: -60, forearmS: 0.75 })),
      ],
    },
    props: {
      side: [{ kind: "bar", at: "hands", style: "barbell", inFront: true }],
      front: [{ kind: "bar", at: "hands", style: "barbell", width: 40, inFront: true }],
    },
    overlays: {
      side: [
        { kind: "spine", label: "flat back" },
        { kind: "trace", of: "hands" },
      ],
      front: [{ kind: "mark", at: "elbowL", label: "elbows past the ribs", dy: -8 }],
    },
    cues: [
      "Hinge at the hips to roughly 45° or a bit lower, knees softly bent, and hold that torso angle for the whole set.",
      "Pull the bar to your lower ribs or belly button, not your chest.",
      "Lead with the elbows and think about driving them back and past your ribs, not about pulling with the hands.",
      "Brace hard. The lower back's job here is to not move.",
    ],
    mistakes: [
      "Standing up a little on every rep so the torso angle rises with the weight — that's a cheat rep.",
      "Rounding the lower back under load.",
      "Yanking with the biceps and never actually retracting the shoulder blades.",
    ],
  },

  {
    slug: "assisted-pull-up",
    name: "Assisted Pull-up",
    aka: "Machine assisted pull-up",
    gear: "Machine",
    pattern: "Vertical pull",
    primary: ["lats"],
    secondary: ["biceps", "upperBack"],
    tempo: 3.4,
    frames: {
      side: [
        pose({ torso: 182, hipL: -25, hipR: -25, kneeL: -100, kneeR: -100, ankleL: 40, ankleR: 40, rootX: 50, rootY: 70 },
          { shoulderL: 178, elbowL: 178, shoulderR: 178, elbowR: 178 }),
        pose({ torso: 188, hipL: -25, hipR: -25, kneeL: -100, kneeR: -100, ankleL: 40, ankleR: 40, rootX: 50, rootY: 58.2 },
          { shoulderL: 235, elbowL: 125, shoulderR: 235, elbowR: 125 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 70, ...sym("front", { hip: 16, knee: -84, ankle: 50 }) }, sym("front", { shoulder: 160, elbow: 178 })),
        pose({ torso: 180, rootX: 50, rootY: 64, ...sym("front", { hip: 16, knee: -84, ankle: 50 }) }, sym("front", { shoulder: 128, elbow: 206 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "beam", y: 17.5, x1: 30, x2: 74, thick: 3 },
        { kind: "post", x: 72, y1: 17.5, y2: 93 },
        { kind: "roller", at: "kneeL", dy: 6, r: 5.5 },
      ],
      front: [
        { kind: "beam", y: 17.5, x1: 22, x2: 78, thick: 3 },
        { kind: "post", x: 24, y1: 17.5, y2: 93 },
        { kind: "post", x: 76, y1: 17.5, y2: 93 },
        { kind: "roller", at: "kneeL", dy: 6, r: 5.5 },
        { kind: "roller", at: "kneeR", dy: 6, r: 5.5 },
      ],
    },
    overlays: {
      side: [{ kind: "trace", of: "chest" }],
      front: [{ kind: "mark", at: "elbowL", label: "drive elbows down", dy: -8 }],
    },
    cues: [
      "Start from a dead hang with the shoulders pulled down — the first move is the shoulder blades, before the arms.",
      "Pull your chest toward the bar rather than your chin over it; that keeps the lats working.",
      "Pick the least assistance you can control. More assist weight = easier.",
      "Lower all the way down under control; the negative is most of the value here.",
    ],
    mistakes: [
      "Kipping or bouncing off the knee pad.",
      "Stopping halfway down and never reaching a full hang.",
      "Shrugging the shoulders up at the bottom instead of staying packed.",
    ],
  },

  {
    slug: "lat-pulldown-wide",
    name: "Lat Pulldown, Wide Grip",
    gear: "Cable",
    pattern: "Vertical pull",
    primary: ["lats"],
    secondary: ["biceps", "upperBack"],
    tempo: 3,
    frames: {
      side: [
        pose(seatSide, { shoulderL: 175, elbowL: 178, shoulderR: 175, elbowR: 178 }),
        pose(seatSide, { shoulderL: 250, elbowL: 80, shoulderR: 250, elbowR: 80 }),
      ],
      front: [
        pose(seatFront, sym("front", { shoulder: 138, elbow: 176 })),
        pose(seatFront, sym("front", { shoulder: 96, elbow: 140, upperArmS: 0.95, forearmS: 0.7 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 50, y: 68, angle: 0, len: 24, thick: 4 },
        { kind: "roller", at: "kneeL", dy: -7, r: 4.6 },
        { kind: "post", x: 74, y1: 10, y2: 93 },
        { kind: "cable", from: [74, 12], to: "hands" },
        { kind: "bar", at: "hands", style: "handle", inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 68, angle: 0, len: 26, thick: 4 },
        { kind: "cable", from: [50, 10], to: "hands" },
        { kind: "bar", at: "hands", style: "handle", width: 46, inFront: true },
      ],
    },
    overlays: {
      side: [{ kind: "trace", of: "hands" }],
      front: [{ kind: "mark", at: "elbowL", label: "elbows down, not back", dy: -8 }],
    },
    cues: [
      "Grip a little wider than shoulder width — much wider just shortens the range without adding lat work.",
      "Slight lean back, about 15°, and hold it. Chest up toward the bar.",
      "Pull to the top of your chest and think 'elbows into your back pockets'.",
      "Let the bar travel all the way up and let the shoulder blades rise at the top for a full stretch.",
    ],
    mistakes: [
      "Pulling behind the neck — no upside, real shoulder risk.",
      "Rocking back and forth so it turns into a row with momentum.",
      "Curling the bar down with the arms and never feeling the lats.",
    ],
  },

  {
    slug: "close-grip-lat-pulldown",
    name: "Close-Grip Lat Pulldown",
    aka: "Small-bar pulldown",
    gear: "Cable",
    pattern: "Vertical pull",
    primary: ["lats"],
    secondary: ["biceps", "upperBack"],
    tempo: 3,
    frames: {
      side: [
        pose(seatSide, { shoulderL: 176, elbowL: 178, shoulderR: 176, elbowR: 178 }),
        pose(seatSide, { shoulderL: 244, elbowL: 74, shoulderR: 244, elbowR: 74 }),
      ],
      front: [
        pose(seatFront, sym("front", { shoulder: 160, elbow: 178 })),
        pose(seatFront, sym("front", { shoulder: 112, elbow: 172, forearmS: 0.75 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 50, y: 68, angle: 0, len: 24, thick: 4 },
        { kind: "roller", at: "kneeL", dy: -7, r: 4.6 },
        { kind: "post", x: 74, y1: 10, y2: 93 },
        { kind: "cable", from: [74, 12], to: "hands" },
        { kind: "bar", at: "hands", style: "handle", width: 10, inFront: true },
      ],
      front: [
        { kind: "pad", x: 50, y: 68, angle: 0, len: 26, thick: 4 },
        { kind: "cable", from: [50, 10], to: "hands" },
        { kind: "bar", at: "hands", style: "handle", width: 14, inFront: true },
      ],
    },
    overlays: {
      side: [{ kind: "trace", of: "hands" }],
      front: [{ kind: "mark", at: "hands", label: "hands close", dy: -8 }],
    },
    cues: [
      "Hands roughly shoulder-width on the short bar, elbows tracking close to the ribs.",
      "The close grip gives you more range — use it, and pull the bar right down to the sternum.",
      "Same lean-back as the wide version, held steady the whole set.",
      "Stretch fully at the top before the next rep.",
    ],
    mistakes: [
      "Leaning back progressively further as you fatigue.",
      "Letting the elbows drift out wide, which turns it back into a wide pulldown.",
      "Half reps at the top, cutting off the stretch.",
    ],
  },

  {
    slug: "seated-row-machine",
    name: "Seated Row Machine",
    gear: "Machine",
    pattern: "Horizontal pull",
    primary: ["upperBack", "lats"],
    secondary: ["biceps", "rearDelts"],
    tempo: 3,
    frames: {
      side: [
        pose({ ...seatSide, torso: 178 }, { shoulderL: 88, elbowL: 88, shoulderR: 88, elbowR: 88 }),
        pose({ ...seatSide, torso: 184 }, { shoulderL: -68, elbowL: 68, shoulderR: -68, elbowR: 68 }),
      ],
      front: [
        pose(seatFront, sym("front", { shoulder: 44, elbow: 22, upperArmS: 0.5, forearmS: 0.4 })),
        pose(seatFront, sym("front", { shoulder: 58, elbow: -54, forearmS: 0.8 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 52, y: 68, angle: 0, len: 26, thick: 4 },
        { kind: "pad", x: 74, y: 56, angle: 78, len: 20, thick: 4.5 },
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
      side: [
        { kind: "spine", label: "torso still" },
        { kind: "trace", of: "hands" },
      ],
      front: [{ kind: "mark", at: "elbowL", label: "squeeze blades", dy: -8 }],
    },
    cues: [
      "Chest against the pad if the machine has one, torso upright and still — the movement is arms and shoulder blades only.",
      "Pull the handles to your lower ribs and hold the squeeze for a beat.",
      "Let the shoulder blades travel forward at the end of each rep for a full stretch, without rounding the lower back.",
      "Elbows stay close to the body for more mid-back, out wide for more rear delt.",
    ],
    mistakes: [
      "Rowing with the torso — leaning back on the pull and forward on the return.",
      "Shrugging the traps up instead of pulling the blades together.",
      "Cutting the stretch short and staying bunched up at the front.",
    ],
  },

  {
    slug: "straight-arm-pulldown",
    name: "Straight-Arm Pulldown",
    gear: "Cable",
    pattern: "Lat isolation",
    primary: ["lats"],
    secondary: ["core", "triceps"],
    tempo: 3,
    frames: {
      side: [
        pose({ torso: 158, hipL: -6, hipR: -6, kneeL: 6, kneeR: 6 }, { shoulderL: 62, elbowL: 58, shoulderR: 62, elbowR: 58 }),
        pose({ torso: 152, hipL: -6, hipR: -6, kneeL: 6, kneeR: 6 }, { shoulderL: -8, elbowL: -6, shoulderR: -8, elbowR: -6 }),
      ],
      front: [
        pose({ torso: 178, ...sym("front", { hip: 5, knee: 4 }) }, sym("front", { shoulder: 32, elbow: 16 })),
        pose({ torso: 178, ...sym("front", { hip: 5, knee: 4 }) }, sym("front", { shoulder: 9, elbow: 6 })),
      ],
    },
    props: {
      side: [
        { kind: "post", x: 84, y1: 14, y2: 93 },
        { kind: "cable", from: [84, 16], to: "hands" },
        { kind: "bar", at: "hands", style: "handle", inFront: true },
      ],
      front: [
        { kind: "cable", from: [50, 12], to: "hands" },
        { kind: "bar", at: "hands", style: "handle", width: 22, inFront: true },
      ],
    },
    overlays: {
      side: [
        { kind: "trace", of: "hands", label: "big arc" },
        { kind: "mark", at: "elbowL", label: "elbows locked soft", dy: -8 },
      ],
      front: [{ kind: "spine" }],
    },
    cues: [
      "Hinge forward slightly, arms nearly straight with a fixed soft elbow bend.",
      "Sweep the bar down in a big arc to your thighs — the shoulder is the only joint that moves.",
      "Squeeze the lats hard at the bottom, then let the arms rise back overhead for a full stretch.",
      "Light weight. If you need to bend the elbows to move it, it's too heavy.",
    ],
    mistakes: [
      "Bending the elbows and turning it into a triceps pushdown.",
      "Standing bolt upright, which cuts the range in half.",
      "Rocking the torso to drive the bar down.",
    ],
  },

  {
    slug: "back-extension",
    name: "Back Extension",
    aka: "45° hyperextension — hold a plate to add load",
    gear: "Hyper bench",
    pattern: "Hip hinge",
    primary: ["hamstrings", "glutes", "lowerBack"],
    secondary: ["core"],
    tempo: 3.2,
    frames: {
      side: [
        pose({ torso: 150, hipL: -35, hipR: -35, kneeL: -35, kneeR: -35, ankleL: 34, ankleR: 34, rootX: 50, rootY: 56 },
          { shoulderL: -150, elbowL: -128, shoulderR: -150, elbowR: -128 }),
        pose({ torso: 58, hipL: -35, hipR: -35, kneeL: -35, kneeR: -35, ankleL: 34, ankleR: 34, rootX: 50, rootY: 56 },
          { shoulderL: -58, elbowL: -36, shoulderR: -58, elbowR: -36 }),
      ],
      front: [
        pose({ torso: 180, rootX: 50, rootY: 54, ...sym("front", { hip: 7, knee: 3 }) }, sym("front", { shoulder: 26, elbow: 74 })),
        pose({ torso: 180, rootX: 50, rootY: 58, ...sym("front", { hip: 7, knee: 3 }) }, sym("front", { shoulder: 26, elbow: 74 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [
        { kind: "pad", x: 48, y: 64, angle: -35, len: 20, thick: 6 },
        { kind: "post", x: 44, y1: 66, y2: 93 },
        { kind: "roller", at: "ankleL", dy: -4, r: 4.4 },
        { kind: "plate", at: "hands", r: 6.2 },
      ],
      front: [
        { kind: "post", x: 50, y1: 72, y2: 93 },
        { kind: "plate", at: "hands", r: 6.5 },
      ],
    },
    overlays: {
      side: [
        { kind: "spine", label: "neutral spine" },
        { kind: "trace", of: "head" },
      ],
      front: [{ kind: "mark", at: "hands", label: "plate on the chest", dy: -9 }],
    },
    cues: [
      "Set the pad just below the hip bones so you can hinge freely — too high and your lower back does all the work.",
      "The movement is a hip hinge: fold at the hips, keep the spine in one straight line from head to heels.",
      "Come up until your body is in line with your legs and stop. Don't arch up past straight.",
      "Squeeze the glutes at the top. Start bodyweight, then hug a plate to your chest as it gets easy.",
    ],
    mistakes: [
      "Cranking into hyperextension at the top, which is where people tweak their back.",
      "Rounding down through the spine instead of hinging at the hip.",
      "Jerking up with momentum, especially once you add a plate.",
    ],
  },

  {
    slug: "shrugs",
    name: "Shrugs",
    gear: "Barbell / Dumbbells",
    pattern: "Scapular elevation",
    primary: ["traps"],
    secondary: ["forearms"],
    tempo: 2.6,
    frames: {
      side: [
        pose({ rootY: 52 }, { shoulderL: 2, elbowL: 2, shoulderR: 2, elbowR: 2 }),
        pose({ rootY: 48.4, head: 178 }, { shoulderL: 2, elbowL: 2, shoulderR: 2, elbowR: 2 }),
      ],
      front: [
        pose({ rootY: 52 }, sym("front", { shoulder: 7, elbow: 5 })),
        pose({ rootY: 48.4 }, sym("front", { shoulder: 7, elbow: 5 })),
      ],
    },
    groundLock: { side: false, front: false },
    props: {
      side: [{ kind: "bar", at: "hands", style: "barbell", inFront: true }],
      front: [{ kind: "dumbbells", grip: "neutral" }],
    },
    overlays: {
      side: [{ kind: "trace", of: "hands" }],
      front: [{ kind: "arrow", from: "shoulderL", to: "head", label: "straight up", tone: "good" }],
    },
    cues: [
      "Shrug straight up toward your ears — the traps elevate, they don't rotate.",
      "Pause for a second at the top; that squeeze is the whole exercise.",
      "Arms stay straight and act as hooks. No pulling with the biceps.",
      "Let the shoulders drop all the way down between reps for a full stretch.",
    ],
    mistakes: [
      "Rolling the shoulders backward — adds nothing and irritates the joint.",
      "Bouncing tiny reps with far too much weight.",
      "Craning the neck forward as you shrug.",
    ],
  },
];
