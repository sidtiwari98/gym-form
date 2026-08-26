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
