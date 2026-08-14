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
