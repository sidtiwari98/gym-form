import type { Exercise } from "../types";

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
