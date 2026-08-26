# Gym Form

Mobile-first form reference for a 5-day upper / lower / arms split. Pick the day,
tap an exercise, and see it animated from the front and the side with the muscles
worked highlighted and the coaching cues underneath.

The figures are drawn in code — no GIFs, no image hosting, no licensing questions.
Each exercise is a couple of key poses expressed as joint angles; the app
interpolates between them and draws the equipment, muscle highlights and cue
overlays around the resulting skeleton.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

`/dev` renders a contact sheet of every exercise in both views at the start and
end of the rep. That's the fastest way to eyeball pose changes.

### Testing on your phone

```bash
npm run preview  # builds, then serves on all interfaces
npm run lan      # prints the URL to open on your phone
```

Use `preview`, not `dev`. Next blocks cross-origin requests to dev resources,
and Turbopack's HMR websocket rejects the upgrade from another device on the
network. The page still server-renders, so it *looks* fine — but the client
bundle never finishes hydrating and nothing on the page responds to taps. The
production server has neither restriction.

## Layout

| Path | What's in it |
| --- | --- |
| `lib/rig.ts` | The skeleton: joint angles, forward kinematics, pose interpolation |
| `lib/types.ts` | Exercise shape, equipment primitives, muscle-to-body-region map |
| `lib/exercises/` | The 36 exercises, grouped by muscle |
| `lib/routine.ts` | The week, sets and reps, and the A/B swaps |
| `components/Figure.tsx` | SVG renderer — body, equipment, highlights, cue overlays |

## Adding an exercise

Add an entry to the relevant file in `lib/exercises/`, then reference its slug
from `lib/routine.ts`. A pose is a set of absolute joint angles in degrees where
`0` points straight down, `90` points forward, and `180` points straight up — so
a hanging arm is `0` and an overhead arm is `180`. Two poses (start and end) are
usually enough; the rep is interpolated and ping-ponged.

For limbs pointing at the viewer, use the `upperArmS` / `forearmS` / `thighS`
scale shorthands to foreshorten them — a 2D rig can't rotate a limb out of the
picture plane, so shortening it is how depth gets faked.

## Catalogue artwork (pilot)

An alternative to the drawn rig, using the illustrations from
[workout-guide](https://github.com/bryllim/workout-guide): 302 exercises, three
frames each, in a much more detailed line style than the rig produces.

Open `/pilot` to compare the two for the three exercises wired up so far, and
`/pilot/anchors` to see the anchor points each highlight is derived from.

Three things shape how it's integrated:

- **It's a stepper, not a loop.** The three frames are separately drawn
  illustrations rather than frames of one scene — the bench and the barbell
  plates move and change size between them — so playing them in sequence
  judders, and no amount of alignment fixes it. Tapping between held positions
  hides the mismatch completely.
- **Frame order isn't consistent.** A squat runs standing → deep across frames
  1-3, but a lateral raise has the arms *down* in frame 3. `GuideArt.order`
  states the rep order per exercise instead of assuming it.
- **Highlights are placed, not computed.** The rig derives muscle highlights
  from joint positions; a PNG has no joints. Each frame carries a handful of
  anchor points (`lib/guide.ts`) and `MUSCLE_SPOTS` derives every highlight
  from them, so a new exercise costs a dozen eyeballed coordinates rather than
  thirty hand-tuned ellipses. They land approximately, which is all a "which
  muscle is this" cue needs to be.

### Adding an exercise

Copy the three frames into `public/guide/<their-slug>/`, add an entry to
`GUIDE_ART` keyed by *our* slug, then check the placement on `/pilot/anchors`
and nudge the numbers.

### Licence

The illustrations are **CC BY-SA 4.0** — that binds the images, not this
repository's code, which stays as it was. Anywhere the art is displayed has to
carry the credit rendered by `GuideCredit`: Workout Guide, by Bryl Lim, after
Everkinetic. Don't drop it from a screen that shows the art.
