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

## Catalogue artwork

The exercise pages use the illustrations from
[workout-guide](https://github.com/bryllim/workout-guide) — all 36 exercises in
the routine are covered. The drawn rig in `lib/rig.ts` still builds and still
renders `/dev`, and `app/exercise/[slug]/page.tsx` falls back to it for any
exercise the catalogue doesn't cover, but nothing currently takes that path.
`/pilot` keeps the two side by side for comparison.

Three things shape how it works:

- **The frames need registering before they can be animated.** They are
  separately drawn illustrations rather than frames of one scene, so the whole
  drawing sits at a slightly different place in each — the bench slides around,
  the plates change diameter. `offsets` in `lib/guide.ts` corrects that. It is
  a partial fix: the drawings genuinely differ, and no transform reconciles
  that, so a short cross-fade covers the rest.
- **Registration is derived, not authored.** `scripts/register-guide-frames.py`
  searches for the translation that best lines each frame's *static* structure
  up with the middle one. Scoring the whole drawing does not work — the body is
  most of the ink, so the best overlap is the one that cancels the movement,
  pulling the bottom of a squat back up to meet the top. It scores over the
  floor of the frame first, then over the ink that survived in all three, which
  is the equipment. Two exercises where it locks onto the wrong structure are
  rejected by name in the script, and corrections are capped.
- **The rep ping-pongs**, so which end of `order` comes first doesn't matter —
  the cycle reads the same in either direction. Having the *middle* frame right
  does. It's derived (the two least-alike frames are the extremes), which is
  wrong for four exercises that change camera angle between frames; those are
  overridden by name.

### Assets are SVG, and come from the repo not npm

`@bryllim/workout-guide` on npm ships PNG only, but the repository carries an
SVG of every frame alongside it, and the project's own site serves those. Take
the SVGs: they stay crisp at any size and, drawn as opaque white on
transparency, they work as a CSS `mask-image` over a box painted `--fig`. That
gives the catalogue figures the same ink as the rig in both themes, instead of
an `<img>` that has to be `filter: invert(1)`-ed for the light one.

### Adding or regenerating an exercise

Add the pair to `scripts/guide-mapping.json`, copy the three SVGs into
`public/guide/<their-slug>/` from a checkout of `bryllim/workout-guide`
(`packages/workout-guide/assets/<slug>/`), then regenerate the table:

```
python3 scripts/register-guide-frames.py /path/to/workout-guide
```

Paste its output into `GUIDE_ART` and check the result on `/pilot/frames`,
which holds each frame in movement order — the equipment should sit still
across a row.

### Licence

The illustrations are **CC BY-SA 4.0** — that binds the images, not this
repository's code, which stays as it was. Anywhere the art is displayed has to
carry the credit rendered by `GuideCredit`: Workout Guide, by Bryl Lim, after
Everkinetic. Don't drop it from a screen that shows the art.
