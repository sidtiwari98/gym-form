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
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward or slightly down — don't crane your neck up." },
      { part: "Bar", text: "Sits on your upper traps, not your neck." },
      { part: "Chest", text: "Stays up the whole rep." },
      { part: "Core", text: "Braced with a big belly breath before you descend, held the whole rep." },
      { part: "Hips", text: "Sit down and slightly back as the knees travel forward." },
      { part: "Knees", text: "Track out over your toes." },
      { part: "Feet", text: "Flat, weight spread through the whole foot, bar staying over your mid-foot." },
    ],
    cues: [
      "Rest the bar on your upper traps, not your neck. Keep your chest up.",
      "Take a big breath into your belly and brace before you descend. Hold it for the whole rep.",
      "Sit down and slightly back at the same time. Your knees move forward, your hips move back.",
      "Keep your knees tracking over your toes. Push the floor away and keep the bar over the middle of your foot.",
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
    bodyPosition: [
      { part: "Head", text: "Resting on the seat back, neutral." },
      { part: "Lower back", text: "Flat against the pad the entire set — the moment it lifts, you've gone too deep." },
      { part: "Hips", text: "Stay on the seat, not curling up toward your chest." },
      { part: "Knees", text: "Bend to roughly 90°, tracking in line with your toes." },
      { part: "Feet", text: "Shoulder width on the plate, whole foot down, heels never lifting." },
    ],
    cues: [
      "Feet about shoulder width apart, in the middle of the plate. Keep your whole foot down, don't let your heels lift.",
      "Lower until your knees reach roughly 90°, or until your hips start to curl off the seat. That's your depth limit.",
      "Push through your mid-foot and heel. Stop just short of locking your knees out at the top.",
      "Keep your lower back flat against the pad the whole set.",
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
    bodyPosition: [
      { part: "Hips", text: "Stay down on the pad — the moment they lift, you're using your lower back." },
      { part: "Knees", text: "Lined up with the machine's pivot point before you start." },
      { part: "Feet/ankles", text: "Toes pointed away to bias the hamstring, or pulled toward you for more calf." },
    ],
    cues: [
      "Line your knee up with the machine's pivot point before you start.",
      "Curl as far as the machine allows. Hold the squeeze for a beat.",
      "Keep your hips down on the pad. The moment they lift, your lower back is taking over.",
      "Point your toes away to work your hamstrings more, or pull them toward you to bring in more calf.",
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
    bodyPosition: [
      { part: "Back", text: "Against the pad, hands holding the handles for a stable base." },
      { part: "Hips", text: "Stay down on the seat — don't lift them to get extra leverage." },
      { part: "Knees", text: "Lined up with the machine's pivot point." },
      { part: "Legs", text: "Extend to fully straight and pause, then lower slowly." },
    ],
    cues: [
      "Back against the pad, hands on the handles. Line your knee up with the machine's pivot point.",
      "Extend to fully straight and pause for a beat. That top squeeze is where your quads work hardest.",
      "Lower slowly and stop just before the weight stack touches down. Keep tension on the whole set.",
      "Don't slam into lockout with a heavy weight. Build up gradually on this one.",
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
    bodyPosition: [
      { part: "Back", text: "Upright against the pad — pick a lean and keep it the same every set." },
      { part: "Torso", text: "Still — don't rock side to side to help." },
      { part: "Knees", text: "Push out against the pads, hold for a beat, then bring back in slowly." },
      { part: "Feet", text: "Stay planted, don't let the whole leg rotate for extra range." },
    ],
    cues: [
      "Sit upright with your back against the pad. Pick one lean and stay there every set.",
      "Push your knees out against the pads. Hold the end position for a beat.",
      "Bring them back in slowly, rather than letting the stack snap them closed.",
      "Keep your feet planted. Don't let your whole leg rotate for extra range.",
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
    bodyPosition: [
      { part: "Back", text: "On the pad, hips square." },
      { part: "Torso", text: "Upright — don't lean forward to help." },
      { part: "Legs", text: "Start at a stretch you can control, not the widest setting." },
      { part: "Knees", text: "Squeeze together, pause, then open back up slowly." },
    ],
    cues: [
      "Set the starting width to a stretch you can control, not the widest setting on the machine.",
      "Squeeze your knees together and pause for a beat at the end.",
      "Open back up slowly. The stretch matters as much as the squeeze.",
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
    bodyPosition: [
      { part: "Knees", text: "Straight but not locked." },
      { part: "Ankles", text: "Balls of the feet on the block, heels hanging free." },
      { part: "Feet", text: "Drop heels below the block for a full stretch, then rise all the way onto your toes." },
    ],
    cues: [
      "Balls of your feet on the block, heels hanging free.",
      "Drop your heels as far below the block as feels comfortable. That stretch is most of the point.",
      "Rise all the way onto your toes and pause for a second at the top.",
      "Keep your knees straight but not locked. Go slow — bouncing wastes the exercise.",
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
    bodyPosition: [
      { part: "Thigh", text: "Pad sits low, just above the knee — not pressing on the kneecap." },
      { part: "Knees", text: "Bent, which shifts the work to the soleus underneath the calf." },
      { part: "Feet/ankles", text: "Full stretch at the bottom, full squeeze at the top, one second at each end." },
    ],
    cues: [
      "The pad sits low on your thigh, just above the knee, so it doesn't dig into your kneecap.",
      "Bending your knees works a different, deeper calf muscle than the standing version does.",
      "Full stretch at the bottom, full squeeze at the top. Hold each for one second.",
      "Use higher reps for this one — 15 to 20 is right.",
    ],
    mistakes: [
      "Short bouncy reps using only the middle of the range.",
      "Pad set too high so it presses on the kneecap.",
      "Rushing. The soleus responds to time under tension more than load.",
    ],
  },
];
