import type { Exercise } from "../types";

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
