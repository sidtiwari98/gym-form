# Gym Form

Mobile-first form reference for a 5-day upper / lower / arms split. Pick the day,
tap an exercise, and see the movement animated with the coaching cues underneath.

The illustrations come from the [workout-guide](https://github.com/bryllim/workout-guide)
catalogue — three drawn frames per exercise, registered and cross-faded into a
rep. See [Catalogue artwork](#catalogue-artwork) for how that works and what it
obliges us to display.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

`/dev` renders every exercise's three frames in movement order. That's the
fastest way to eyeball the artwork and its registration.

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
| `lib/guide.ts` | Exercise slug -> catalogue art, frame order, registration offsets |
| `lib/types.ts` | Exercise shape and the muscle vocabulary |
| `lib/exercises/` | The 36 exercises, grouped by muscle: naming, cues, mistakes |
| `lib/routine.ts` | The week, sets and reps, and the A/B swaps |
| `components/GuideFigure.tsx` | Stacks the three frames and cross-fades them |
| `components/GuideViewer.tsx` | Plays the rep; play/pause, scrub, speed |
| `scripts/register-guide-frames.py` | Regenerates the table in `lib/guide.ts` |

## Adding an exercise

Write the entry in the relevant file under `lib/exercises/` — naming, gear,
muscles, cues and mistakes — and reference its slug from `lib/routine.ts`. Then
give it artwork, below.

## Catalogue artwork

All 36 exercises in the routine are covered. Three things shape how it works:

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
gives the figures the app's own ink in both themes, instead of an `<img>` that
has to be `filter: invert(1)`-ed for the light one.

### Adding or regenerating an exercise

Add the pair to `scripts/guide-mapping.json`, copy the three SVGs into
`public/guide/<their-slug>/` from a checkout of `bryllim/workout-guide`
(`packages/workout-guide/assets/<slug>/`), then regenerate the table:

```
python3 scripts/register-guide-frames.py /path/to/workout-guide
```

Paste its output into `GUIDE_ART` and check the result on `/dev`, which holds
each frame in movement order — the equipment should sit still across a row.

### Licence

The illustrations are **CC BY-SA 4.0** — that binds the images, not this
repository's code, which stays as it was. Anywhere the art is displayed has to
carry the credit rendered by `GuideCredit`: Workout Guide, by Bryl Lim, after
Everkinetic. Don't drop it from a screen that shows the art.
