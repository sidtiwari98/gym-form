import type { Exercise } from "../types";

export const back: Exercise[] = [
  {
    slug: "bent-over-barbell-row",
    name: "Bent-over Barbell Row",
    gear: "Barbell",
    pattern: "Horizontal pull",
    primary: ["lats", "upperBack"],
    secondary: ["biceps", "rearDelts", "lowerBack"],
    tempo: 3,
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
