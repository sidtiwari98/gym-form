import type { Exercise } from "../types";

/* Every standing curl goes wrong the same three ways. */
const curlMistakes = [
  "Swinging the torso back to launch the weight up.",
  "Elbows drifting forward at the top, which hands the work to the front delt.",
  "Cutting the bottom short and never letting the arm straighten under load.",
];

export const arms: Exercise[] = [
  {
    slug: "ez-bar-curl",
    name: "EZ-Bar Curl",
    gear: "EZ bar",
    pattern: "Elbow flexion",
    primary: ["biceps"],
    secondary: ["forearms"],
    tempo: 2.8,
    setup: [
      { part: "Grip", text: "Use the angled part of the bar — the wider outer bend works the outer biceps a touch more, the inner bend works the inner head. Either is fine to start with." },
      { part: "Stance", text: "Feet about shoulder width, bar hanging at arm's length in front of your thighs." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Shoulders", text: "Down and still, not shrugging as the weight gets heavy." },
      { part: "Upper arms", text: "Locked at your sides the whole set — only the forearm moves." },
      { part: "Wrists", text: "Slightly rotated by the angled bar, relaxed rather than bent." },
      { part: "Torso", text: "Still — no leaning back to launch the weight." },
    ],
    cues: [
      "The angled grip is easier on your wrists and elbows than a straight bar.",
      "Keep your upper arms locked at your sides. Only your forearms should move.",
      "Curl until your forearms are just past vertical, then stop.",
      "Lower slowly, over 2–3 seconds, all the way to a straight arm.",
    ],
    mistakes: curlMistakes,
  },

  {
    slug: "straight-bar-curl",
    name: "Straight Bar Curl",
    gear: "Barbell",
    pattern: "Elbow flexion",
    primary: ["biceps"],
    secondary: ["forearms"],
    tempo: 2.8,
    setup: [
      { part: "Grip", text: "Hands about shoulder width apart, overhand, bar hanging at arm's length." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Shoulders", text: "Down and still." },
      { part: "Elbows", text: "Pinned to your ribs the whole set." },
      { part: "Wrists", text: "Straight, stacked over your forearm — not curled back under the bar." },
      { part: "Torso", text: "Upright, no swinging." },
    ],
    cues: [
      "Hands about shoulder width apart. Wrists straight, stacked over your forearms.",
      "Keep your elbows pinned to your ribs the whole set.",
      "Squeeze at the top, with your forearms just past vertical.",
      "If your wrists hurt on the straight bar, switch to the EZ bar instead.",
    ],
    mistakes: [
      ...curlMistakes.slice(0, 2),
      "Letting the wrists curl back under the bar, which moves the strain to the wrist joint.",
    ],
  },

  {
    slug: "db-curl",
    name: "DB Curl",
    gear: "Dumbbells",
    pattern: "Elbow flexion",
    primary: ["biceps"],
    secondary: ["forearms"],
    tempo: 2.8,
    setup: [
      { part: "Stance", text: "Feet about shoulder width, one dumbbell in each hand at your sides." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Shoulders", text: "Down and still." },
      { part: "Elbows", text: "Stay at your sides, don't travel forward as you curl." },
      { part: "Palms", text: "Face forward, or rotate out through the curl for more squeeze." },
      { part: "Arms", text: "Fully straight at the bottom of every rep." },
    ],
    cues: [
      "Start with your palms facing forward, or rotate them outward as you curl for a bigger squeeze.",
      "Keep your elbows at your sides. Don't let them drift forward as you curl.",
      "You can curl one arm at a time or both together. Both together is stricter and harder to cheat.",
      "Let your arm straighten fully at the bottom.",
    ],
    mistakes: curlMistakes,
  },

  {
    slug: "hammer-curl",
    name: "Hammer Curl",
    gear: "Dumbbells",
    pattern: "Elbow flexion, neutral grip",
    primary: ["biceps", "forearms"],
    tempo: 2.8,
    setup: [
      { part: "Stance", text: "Feet about shoulder width, dumbbells at your sides with palms already facing in." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Shoulders", text: "Down and still." },
      { part: "Elbows", text: "Tight to your sides, no swing." },
      { part: "Palms", text: "Face each other the whole way — the dumbbell stays vertical, like a hammer." },
      { part: "Arms", text: "Lower under control, don't let the weight drop." },
    ],
    cues: [
      "Keep your palms facing each other the whole way, like you're swinging a hammer.",
      "This works your forearms and a deeper arm muscle more than a normal curl does.",
      "Keep your elbows tight to your sides. No swinging.",
      "Lower the weight under control. Don't let it drop.",
    ],
    mistakes: [
      "Rotating the wrist during the rep so it drifts into a normal curl.",
      "Using much heavier dumbbells and turning it into a shrug-and-swing.",
      "Short reps that never straighten the arm.",
    ],
  },

  {
    slug: "cable-curl",
    name: "Cable Curl",
    aka: "Functional trainer, low pulley",
    gear: "Cable",
    pattern: "Elbow flexion",
    primary: ["biceps"],
    secondary: ["forearms"],
    tempo: 2.8,
    setup: [
      { part: "Pulley height", text: "Set to the lowest position, bar or straight handle attached." },
      { part: "Stance", text: "Stand facing the machine, far enough back that the cable has tension even with your arms straight down." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Torso", text: "Still, standing far enough from the stack that the cable pulls slightly forward at the bottom." },
      { part: "Elbows", text: "Pinned to your sides for the whole set." },
      { part: "Arms", text: "Slow lowering all the way to straight." },
    ],
    cues: [
      "The cable keeps tension on your biceps through the whole movement, even at the top. That's the advantage over dumbbells here.",
      "Stand far enough from the stack that the cable pulls slightly forward at the bottom.",
      "Keep your elbows pinned and your torso still.",
      "Lower slowly all the way to a straight arm.",
    ],
    mistakes: curlMistakes,
  },

  {
    slug: "cable-reverse-curl",
    name: "Cable Reverse Curl",
    aka: "Neutral wrist",
    gear: "Cable",
    pattern: "Elbow flexion, pronated",
    primary: ["forearms", "biceps"],
    tempo: 2.8,
    setup: [
      { part: "Pulley height", text: "Lowest position, straight bar attached." },
      { part: "Stance", text: "Stand facing the machine, close enough that your arms hang straight down to the bar." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Grip", text: "Overhand, knuckles facing up." },
      { part: "Wrists", text: "Held straight and neutral, not bent back — stop the set the moment they start to collapse." },
      { part: "Elbows", text: "At your sides, slow and strict." },
    ],
    cues: [
      "Overhand grip, knuckles facing up. Keep your wrist straight, not bent back.",
      "This works your forearms. Use noticeably less weight than a normal curl.",
      "Keep your elbows at your sides. Go slow and strict.",
      "Stop the set the moment your wrist starts to bend under the load.",
    ],
    mistakes: [
      "Loading it like a normal curl and letting the wrists buckle.",
      "Swinging to get past the sticking point.",
      "Letting the elbows swing forward at the top.",
    ],
  },

  {
    slug: "lying-ez-bar-triceps-extension",
    name: "Lying EZ-Bar Triceps Extension",
    aka: "Skullcrusher",
    gear: "EZ bar",
    pattern: "Elbow extension",
    primary: ["triceps"],
    tempo: 3,
    setup: [
      { part: "Bench", text: "Flat bench, lie down with your head near the end so the bar has room to travel back behind you." },
      { part: "Grip", text: "Hands about shoulder width on the EZ bar's angled grip." },
      { part: "Getting the bar up", text: "Have a spotter hand it to you, or curl it up from your thighs to a straight-arm start position over your chest before you begin." },
    ],
    bodyPosition: [
      { part: "Head", text: "Resting on the bench." },
      { part: "Upper arms", text: "Angled slightly back toward your head, staying in one place the whole set." },
      { part: "Elbows", text: "Fixed — only the forearm moves." },
      { part: "Forearms", text: "Lower the bar to just above or slightly behind your head." },
      { part: "Lockout", text: "Stop just short of fully locking out, to keep tension on." },
    ],
    cues: [
      "Angle your upper arms slightly back toward your head, not straight up. This keeps tension on your triceps.",
      "Only your forearms should move. Your elbows stay in one place the whole set.",
      "Lower the bar to just above or slightly behind your head, whichever feels natural.",
      "Don't lock your elbows out hard at the top. Stop just short to keep the tension on.",
    ],
    mistakes: [
      "Letting the elbows drift apart and flare out as the set gets hard.",
      "Turning it into a pullover by swinging the upper arms back.",
      "Lowering the bar straight onto the forehead — hence the name. Control it.",
    ],
  },

  {
    slug: "cable-pushdown-bar",
    name: "Cable Pushdown, Straight Bar",
    gear: "Cable",
    pattern: "Elbow extension",
    primary: ["triceps"],
    tempo: 2.8,
    setup: [
      { part: "Pulley height", text: "Highest position, straight bar attached." },
      { part: "Grip", text: "Overhand, hands shoulder width or a little closer." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Torso", text: "Slight forward lean, standing close to the stack." },
      { part: "Elbows", text: "Glued to your ribs the whole set — the upper arm never moves." },
      { part: "Wrists", text: "Straight, not bent as you push down." },
      { part: "Arms", text: "Straighten fully at the bottom, hold for a beat." },
    ],
    cues: [
      "Stand close to the stack with a slight forward lean. Elbows glued to your ribs.",
      "Push down until your arms are straight. Hold that for a beat.",
      "Let the bar rise back up only until your forearms are about horizontal. Any higher and your elbows will drift.",
      "Keep your wrists straight. Don't push with a bent wrist.",
    ],
    mistakes: [
      "Leaning over the bar and pressing with the chest and shoulders.",
      "Elbows flaring out and travelling forward on each rep.",
      "Too heavy, so the reps become half-range shoves.",
    ],
  },

  {
    slug: "cable-pushdown-rope",
    name: "Cable Pushdown, Rope",
    gear: "Cable",
    pattern: "Elbow extension",
    primary: ["triceps"],
    tempo: 2.8,
    setup: [
      { part: "Pulley height", text: "Highest position, rope attached." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Torso", text: "Slight forward lean, standing close to the stack." },
      { part: "Elbows", text: "Pinned — the upper arm never moves." },
      { part: "Hands", text: "Pull the rope apart at the bottom, knuckles turning slightly outward." },
    ],
    cues: [
      "Same setup as the straight-bar version, but pull the rope apart at the bottom and turn your knuckles slightly outward.",
      "That split gives you a harder squeeze than a fixed bar.",
      "Keep your elbows pinned. Your upper arm never moves.",
      "Control the rope back up to about forearms-horizontal, no higher.",
    ],
    mistakes: [
      "Never actually separating the rope, which makes it just a worse straight-bar pushdown.",
      "Shrugging and leaning to force out extra reps.",
      "Letting the elbows flare wide.",
    ],
  },

  {
    slug: "cable-reverse-grip-pushdown",
    name: "Cable Reverse-Grip Pushdown",
    gear: "Cable",
    pattern: "Elbow extension, supinated",
    primary: ["triceps"],
    tempo: 2.8,
    setup: [
      { part: "Pulley height", text: "Highest position, straight bar attached." },
    ],
    bodyPosition: [
      { part: "Head", text: "Neutral, eyes forward." },
      { part: "Grip", text: "Underhand, palms facing up." },
      { part: "Elbows", text: "Tight to your sides." },
      { part: "Wrists", text: "Neutral — don't let them bend back under the load." },
      { part: "Arms", text: "Full lockout, brief squeeze, controlled return." },
    ],
    cues: [
      "Underhand grip, palms facing up. Use less weight than you would for the overhand version.",
      "This works a different part of your triceps than the overhand version.",
      "Keep your elbows tight to your sides. Don't let your wrists bend back under the load.",
      "Full lockout, a brief squeeze, then a controlled return.",
    ],
    mistakes: [
      "Using the same weight as the straight-bar pushdown and losing the grip position.",
      "Elbows drifting back behind the body.",
      "Turning the wrists mid-set because the grip is failing.",
    ],
  },
];
