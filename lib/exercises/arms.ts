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
    cues: [
      "The angled grip puts the wrists in a slightly rotated position — easier on the wrist and elbow than a straight bar.",
      "Upper arms stay vertical and locked at your sides; only the forearm moves.",
      "Curl until the forearms are just past vertical, then stop. Going further unloads the biceps.",
      "Lower over 2–3 seconds all the way to a straight arm.",
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
    cues: [
      "Hands about shoulder width, wrists straight and stacked over the forearm.",
      "Elbows pinned to your ribs for the whole set.",
      "Squeeze at the top with the forearms just past vertical.",
      "If your wrists complain on the straight bar, this is the week to run the EZ bar instead.",
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
    cues: [
      "Start with the palms facing forward, or rotate them out as you curl for a bit more peak contraction.",
      "Elbows stay at your sides; don't let them travel forward as you curl.",
      "You can go alternating or both at once — both together is stricter and harder to cheat.",
      "Full stretch at the bottom, arm completely straight.",
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
    cues: [
      "Palms face each other the whole way — the dumbbell stays vertical, like swinging a hammer.",
      "This hits the brachialis and the forearm more than a supinated curl, which is why it's in here alongside the others.",
      "Elbows tight to your sides, no swing.",
      "Control the lowering; don't let the weight drop.",
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
    cues: [
      "The cable keeps tension on the biceps at every point in the range, including the top — that's the advantage over free weights here.",
      "Stand far enough from the stack that the cable pulls slightly forward at the bottom.",
      "Elbows pinned, torso still.",
      "Slow negative all the way to a straight arm.",
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
    cues: [
      "Overhand grip, knuckles facing up, wrist held straight and neutral rather than bent back.",
      "This targets the brachioradialis and forearm extensors — expect to use noticeably less weight than a normal curl.",
      "Elbows at your sides, slow and strict.",
      "Stop the moment the wrist starts collapsing; that's the working set done.",
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
    cues: [
      "Angle the upper arms slightly back toward your head rather than straight vertical — it keeps tension on the triceps at lockout.",
      "Only the forearm moves. The elbows stay in one place for the entire set.",
      "Lower the bar to just above your forehead or slightly behind your head, whichever your elbows prefer.",
      "Don't fully lock out hard at the top; stop just short and keep the tension.",
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
    cues: [
      "Stand close to the stack, slight forward lean, elbows glued to your ribs.",
      "Push down until the arms are straight and hold the lockout for a beat.",
      "Let the bar come back up only until the forearms are about horizontal — going higher lets the elbows drift and kills tension.",
      "Wrists stay straight; don't push with a bent wrist.",
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
    cues: [
      "Same setup as the bar version, but at the bottom pull the rope apart and turn the knuckles slightly outward.",
      "That split at lockout gets you a harder contraction on the lateral head than a fixed bar allows.",
      "Elbows pinned; the upper arm never moves.",
      "Control the rope back up to forearms-horizontal, no higher.",
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
    cues: [
      "Underhand grip, palms facing up. Expect to drop the weight a fair bit versus the overhand version.",
      "This biases the long head of the triceps, which is why it earns a slot of its own.",
      "Elbows tight to the sides, wrists neutral — don't let them bend back under the load.",
      "Full lockout, brief squeeze, controlled return.",
    ],
    mistakes: [
      "Using the same weight as the straight-bar pushdown and losing the grip position.",
      "Elbows drifting back behind the body.",
      "Turning the wrists mid-set because the grip is failing.",
    ],
  },
];
