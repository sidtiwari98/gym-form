#!/usr/bin/env python3
"""
Derive the registration offsets and frame order in `lib/guide.ts`.

The catalogue's three frames per exercise are separately drawn illustrations,
so the whole drawing sits at a slightly different place in each. This finds the
translation that lines each frame's *static* structure up with the middle one.

Scoring the whole drawing does not work: the body is most of the ink, so the
best overlap is the one that cancels the movement — it pulls the bottom of a
squat back up to meet the top. So the search is scored twice: first over the
floor of the frame, where the equipment base and the planted feet are, then
over the ink that survived in all three roughly-aligned frames, which is the
equipment itself.

Needs a checkout of github.com/bryllim/workout-guide (for the PNGs, which are
faster to score than the SVGs the app ships) and: pip install pillow numpy

    python3 scripts/register-guide-frames.py /path/to/workout-guide
"""
import itertools
import json
import sys

import numpy as np
from PIL import Image, ImageFilter

N = 128            # working resolution for the search
SEARCH = 20        # max shift considered, in N-pixels
CAP = 0.09         # max accepted correction, as a fraction of the box

# Verified by eye against the uncorrected overlay: on these the search locks
# onto the wrong structure and registers worse than not correcting at all.
REJECT = {"barbell-row", "leg-extension"}

# Verified by eye: these change camera angle between frames, or draw the top of
# the rep as frame 2, so the derived middle frame is wrong.
MIDDLE = {"lateral-raise": 1, "cable-curl": 1, "tricep-pushdown": 1, "rope-tricep-pushdown": 1}


def mask(root, slug, i):
    path = f"{root}/packages/workout-guide/assets/{slug}/frame-{i}.png"
    a = Image.open(path).convert("RGBA").getchannel("A").resize((N, N))
    return (np.asarray(a) > 40).astype(np.float32)


def shift(m, dx, dy):
    return np.roll(np.roll(m, dy, axis=0), dx, axis=1)


def best(moving, ref, weight):
    top = (0, 0, -1.0)
    for dy in range(-SEARCH, SEARCH + 1):
        for dx in range(-SEARCH, SEARCH + 1):
            score = float((shift(moving, dx, dy) * ref * weight).sum())
            if score > top[2]:
                top = (dx, dy, score)
    return top[0], top[1]


def register(root, slug, ref_i=2):
    ms = {i: mask(root, slug, i) for i in (1, 2, 3)}
    ref = ms[ref_i]

    band = np.zeros_like(ref)
    band[int(0.62 * N):, :] = 1
    rough = {i: (0, 0) if i == ref_i else best(ms[i], ref, band) for i in (1, 2, 3)}

    static = np.minimum.reduce([shift(ms[i], *rough[i]) for i in (1, 2, 3)])
    # blur so a near-miss still scores; fall back to the floor if nothing held still
    static = np.asarray(
        Image.fromarray((static * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)),
        dtype=np.float32,
    ) / 255
    weight = static if static.sum() > 20 else band

    return {i: (0, 0) if i == ref_i else best(ms[i], ref, weight) for i in (1, 2, 3)}


def order(root, slug, offsets):
    """Movement order. Only the middle matters — the rep ping-pongs."""
    def registered(i):
        m = mask(root, slug, i)
        return shift(m, *offsets[i])

    ms = {i: registered(i) for i in (1, 2, 3)}

    def iou(a, b):
        union = ((a + b) > 0).sum()
        return float((a * b).sum() / union) if union else 0.0

    if slug in MIDDLE:
        mid = MIDDLE[slug]
        ends = [i for i in (1, 2, 3) if i != mid]
    else:
        pairs = {p: iou(ms[p[0]], ms[p[1]]) for p in itertools.combinations((1, 2, 3), 2)}
        ends = list(min(pairs, key=pairs.get))       # least alike = the two extremes
        mid = ({1, 2, 3} - set(ends)).pop()
    return [ends[0], mid, ends[1]]


def main(root, mapping_path="scripts/guide-mapping.json"):
    mapping = json.load(open(mapping_path))
    for ours in sorted(mapping):
        src = mapping[ours]
        raw = register(root, src)
        offsets = {}
        for i in (1, 2, 3):
            if src in REJECT:
                offsets[i] = (0.0, 0.0)
            else:
                offsets[i] = tuple(max(-CAP, min(CAP, v / N)) for v in raw[i])
        o = order(root, src, raw)
        vals = ", ".join(f"[{offsets[i][0]:g}, {offsets[i][1]:g}]" for i in o)
        print(f'  "{ours}": {{ source: "{src}", order: [{o[0]}, {o[1]}, {o[2]}], offsets: [{vals}] }},')


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1])
