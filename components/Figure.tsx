"use client";

import { Fragment, useMemo } from "react";
import {
  anchor, ease, GROUND, sampleLoop, solve,
  type AnchorName, type PoseAngles, type Skeleton, type Vec, type View,
} from "@/lib/rig";
import { MUSCLE_TARGETS, type Exercise, type Overlay, type Prop } from "@/lib/types";

/* ---------------------------------------------------------------- */
/* Small vector helpers                                              */
/* ---------------------------------------------------------------- */

const sub = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y });
const len = (v: Vec) => Math.hypot(v.x, v.y) || 1;
const norm = (v: Vec): Vec => { const l = len(v); return { x: v.x / l, y: v.y / l }; };
/** Rotate -90deg in SVG coords (y down): points to the figure's front in side view. */
const perp = (v: Vec): Vec => ({ x: v.y, y: -v.x });
const add = (a: Vec, s: Vec, k: number): Vec => ({ x: a.x + s.x * k, y: a.y + s.y * k });
const deg = (v: Vec) => (Math.atan2(v.y, v.x) * 180) / Math.PI;
const P = (v: Vec) => `${v.x.toFixed(2)},${v.y.toFixed(2)}`;

/* ---------------------------------------------------------------- */
/* Body                                                              */
/* ---------------------------------------------------------------- */

const TORSO_W = {
  front: { hip: 7.6, shoulder: 11.6 },
  side: { hip: 5.2, shoulder: 6.8 },
};

function torsoPath(s: Skeleton): string {
  const w = TORSO_W[s.view];
  const dir = norm(sub(s.chest, s.pelvis));
  const p = perp(dir);
  const a = add(s.pelvis, p, w.hip);
  const b = add(s.chest, p, w.shoulder);
  const c = add(s.chest, p, -w.shoulder);
  const d = add(s.pelvis, p, -w.hip);
  return `M${P(a)} L${P(b)} L${P(c)} L${P(d)} Z`;
}

function Limb({ a, b, w, cls }: { a: Vec; b: Vec; w: number; cls: string }) {
  return (
    <line
      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
      strokeWidth={w} strokeLinecap="round" className={cls}
    />
  );
}

/**
 * One side's limbs. Drawn twice: a fatter pass in the page background colour
 * first, then the limb itself. Without that outline a hanging arm vanishes into
 * the torso in front view, which is exactly where you need to see it.
 */
function Side({ s, side, dim, edge }: { s: Skeleton; side: "L" | "R"; dim: boolean; edge?: boolean }) {
  const cls = edge ? "stroke-[var(--fig-edge)]" : dim ? "stroke-[var(--fig-far)]" : "stroke-[var(--fig)]";
  const fill = edge ? "fill-[var(--fig-edge)]" : dim ? "fill-[var(--fig-far)]" : "fill-[var(--fig)]";
  const e = edge ? 2.4 : 0;
  const foot = s.view === "side";
  return (
    <g>
      <Limb a={s.hip[side]} b={s.knee[side]} w={9.5 + e} cls={cls} />
      <Limb a={s.knee[side]} b={s.ankle[side]} w={7.5 + e} cls={cls} />
      {foot ? (
        <Limb a={s.ankle[side]} b={s.toe[side]} w={4.6 + e} cls={cls} />
      ) : (
        <ellipse
          cx={s.ankle[side].x} cy={s.ankle[side].y + 1.6} rx={4 + e / 2} ry={2.6 + e / 2}
          className={fill}
        />
      )}
      <Limb a={s.shoulder[side]} b={s.elbow[side]} w={7.6 + e} cls={cls} />
      <Limb a={s.elbow[side]} b={s.wrist[side]} w={6.2 + e} cls={cls} />
      <circle cx={s.wrist[side].x} cy={s.wrist[side].y} r={2.6 + e / 2} className={fill} />
    </g>
  );
}

function Arm({ s, side, dim }: { s: Skeleton; side: "L" | "R"; dim: boolean }) {
  return (
    <>
      <Side s={s} side={side} dim={dim} edge />
      <Side s={s} side={side} dim={dim} />
    </>
  );
}

function Body({ s }: { s: Skeleton }) {
  const dir = norm(sub(s.head, s.neck));
  const face = perp(dir);
  return (
    <g>
      {/* Far side first so the near limbs read as being in front of the body. */}
      {s.view === "side" && <Arm s={s} side="R" dim />}
      <path d={torsoPath(s)} className="fill-[var(--fig-edge)] stroke-[var(--fig-edge)]" strokeWidth={7.4} strokeLinejoin="round" />
      <path d={torsoPath(s)} className="fill-[var(--fig)] stroke-[var(--fig)]" strokeWidth={5} strokeLinejoin="round" />
      <line
        x1={s.chest.x} y1={s.chest.y} x2={s.neck.x} y2={s.neck.y}
        strokeWidth={8.4} strokeLinecap="round" className="stroke-[var(--fig-edge)]"
      />
      <line
        x1={s.chest.x} y1={s.chest.y} x2={s.neck.x} y2={s.neck.y}
        strokeWidth={6} strokeLinecap="round" className="stroke-[var(--fig)]"
      />
      <circle cx={s.head.x} cy={s.head.y} r={7.3} className="fill-[var(--fig-edge)]" />
      {/* A jaw wedge on the leading face, so you can tell which way they're facing. */}
      {s.view === "side" && (
        <circle
          cx={s.head.x + face.x * 4.4} cy={s.head.y + face.y * 4.4} r={3.7}
          className="fill-[var(--fig-edge)]"
        />
      )}
      <circle cx={s.head.x} cy={s.head.y} r={6.1} className="fill-[var(--fig)]" />
      {s.view === "side" && (
        <circle
          cx={s.head.x + face.x * 4.4} cy={s.head.y + face.y * 4.4} r={2.5}
          className="fill-[var(--fig)]"
        />
      )}
      {s.view === "side" ? <Arm s={s} side="L" dim={false} /> : (
        <>
          <Arm s={s} side="R" dim={false} />
          <Arm s={s} side="L" dim={false} />
        </>
      )}
    </g>
  );
}

/* ---------------------------------------------------------------- */
/* Muscle highlighting                                               */
/* ---------------------------------------------------------------- */

function faceSign(face: string, view: View): number {
  if (view === "front" || face === "center") return 0;
  return face === "front" ? 1 : -1;
}

function Highlight({ s, ex }: { s: Skeleton; ex: Exercise }) {
  const out: React.ReactNode[] = [];
  const emit = (muscles: readonly string[], cls: string, key: string) => {
    muscles.forEach((m, mi) => {
      const targets = MUSCLE_TARGETS[m as keyof typeof MUSCLE_TARGETS] ?? [];
      targets.forEach((t, ti) => {
        const k = `${key}-${mi}-${ti}`;
        if (t.on === "torso") {
          const dir = norm(sub(s.chest, s.pelvis));
          const p = perp(dir);
          const base = { x: s.pelvis.x + (s.chest.x - s.pelvis.x) * t.t, y: s.pelvis.y + (s.chest.y - s.pelvis.y) * t.t };
          const c = add(base, p, faceSign(t.face, s.view) * 3.1);
          out.push(
            <ellipse
              key={k} cx={c.x} cy={c.y} rx={s.view === "side" ? t.rx * 0.62 : t.rx} ry={t.ry}
              transform={`rotate(${deg(dir) - 90} ${c.x} ${c.y})`} className={cls}
            />,
          );
        } else if (t.on === "delt") {
          (["L", "R"] as const).forEach((sd) => {
            const dir = norm(sub(s.chest, s.pelvis));
            const c = add(s.shoulder[sd], perp(dir), faceSign(t.face, s.view) * 3.2);
            out.push(<circle key={`${k}-${sd}`} cx={c.x} cy={c.y} r={5} className={cls} />);
          });
        } else if (t.on === "hip") {
          (["L", "R"] as const).forEach((sd) => {
            const dir = norm(sub(s.chest, s.pelvis));
            let off = perp(dir);
            let k2 = faceSign(t.face, s.view) * 3.2;
            if (t.face === "out" || t.face === "in") {
              // Abduction/adduction only read in the frontal plane.
              off = { x: 1, y: 0 };
              const outward = sd === "L" ? 1 : -1;
              k2 = s.view === "front" ? (t.face === "out" ? outward : -outward) * 3.4 : 0;
            }
            const c = add(s.hip[sd], off, k2);
            out.push(<circle key={`${k}-${sd}`} cx={c.x} cy={c.y} r={5.2} className={cls} />);
          });
        } else {
          (["L", "R"] as const).forEach((sd) => {
            const [a, b] =
              t.seg === "upperArm" ? [s.shoulder[sd], s.elbow[sd]]
              : t.seg === "forearm" ? [s.elbow[sd], s.wrist[sd]]
              : t.seg === "thigh" ? [s.hip[sd], s.knee[sd]]
              : [s.knee[sd], s.ankle[sd]];
            const d = norm(sub(b, a));
            const o = faceSign(t.face, s.view) * 1.9;
            out.push(
              <line
                key={`${k}-${sd}`}
                x1={a.x + perp(d).x * o} y1={a.y + perp(d).y * o}
                x2={b.x + perp(d).x * o} y2={b.y + perp(d).y * o}
                strokeWidth={t.seg === "upperArm" || t.seg === "thigh" ? 7.4 : 6}
                strokeLinecap="round" className={cls}
              />,
            );
          });
        }
      });
    });
  };
  emit(ex.secondary ?? [], "fill-[var(--m2)] stroke-[var(--m2)]", "s");
  emit(ex.primary, "fill-[var(--m1)] stroke-[var(--m1)]", "p");
  return <g opacity={0.5}>{out}</g>;
}

/* ---------------------------------------------------------------- */
/* Equipment                                                         */
/* ---------------------------------------------------------------- */

function Bar({ s, p }: { s: Skeleton; p: Extract<Prop, { kind: "bar" }> }) {
  const at = anchor(s, p.at);
  const style = p.style ?? "barbell";
  const plate = p.plate ?? (style === "ez" ? 5 : 6.8);
  const w = p.width ?? (style === "handle" ? 15 : style === "rope" ? 9 : 34);

  if (s.view === "side") {
    // Seen end-on: the plate is a disc, the bar a small hub.
    if (style === "handle") return <circle cx={at.x} cy={at.y} r={2.8} className="fill-[var(--gear)]" />;
    if (style === "rope") {
      return (
        <g className="stroke-[var(--gear)] fill-[var(--gear)]">
          <circle cx={at.x} cy={at.y} r={2.4} />
          <path d={`M${P(at)} l-2 6 M${P(at)} l2.4 5.6`} strokeWidth={1.8} fill="none" strokeLinecap="round" />
        </g>
      );
    }
    return (
      <g>
        <circle cx={at.x} cy={at.y} r={plate} className="fill-[var(--gear)]" />
        <circle cx={at.x} cy={at.y} r={plate * 0.42} className="fill-[var(--gear-dark)]" />
      </g>
    );
  }

  const x1 = at.x - w / 2, x2 = at.x + w / 2;
  return (
    <g>
      {style === "ez" ? (
        <path
          d={`M${x1},${at.y} L${x1 + 7},${at.y} L${x1 + 11},${at.y - 2.6} L${at.x - 2},${at.y - 2.6} L${at.x + 2},${at.y + 0} L${x2 - 11},${at.y} L${x2 - 7},${at.y - 2.6} L${x2},${at.y - 2.6}`}
          strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round"
          className="stroke-[var(--gear)]"
        />
      ) : (
        <line x1={x1} y1={at.y} x2={x2} y2={at.y} strokeWidth={2.4} strokeLinecap="round" className="stroke-[var(--gear)]" />
      )}
      {style === "rope" && (
        <path d={`M${at.x - 3},${at.y} l-2.4 7 M${at.x + 3},${at.y} l2.4 7`} strokeWidth={2} fill="none" strokeLinecap="round" className="stroke-[var(--gear)]" />
      )}
      {(style === "barbell" || style === "ez") &&
        [x1 + 2.5, x2 - 2.5].map((x, i) => (
          <rect
            key={i} x={x - 2} y={at.y - plate} width={4} height={plate * 2} rx={1.2}
            className="fill-[var(--gear)]"
          />
        ))}
    </g>
  );
}

function Dumbbells({ s, p }: { s: Skeleton; p: Extract<Prop, { kind: "dumbbells" }> }) {
  const size = p.size ?? 5.4;
  const vertical = p.grip === "neutral";
  return (
    <g className="fill-[var(--gear)]">
      {(["L", "R"] as const).map((sd) => {
        const w = s.wrist[sd];
        if (s.view === "side") return <circle key={sd} cx={w.x} cy={w.y} r={size * 0.85} />;
        const a = vertical
          ? { x: 0, y: -1 } // hammer grip: bar runs up/down when seen from the front
          : { x: 1, y: 0 };
        const e1 = add(w, a, size), e2 = add(w, a, -size);
        return (
          <g key={sd}>
            <line x1={e1.x} y1={e1.y} x2={e2.x} y2={e2.y} strokeWidth={2} className="stroke-[var(--gear)]" />
            <rect x={e1.x - 2.6} y={e1.y - 2.2} width={5.2} height={4.4} rx={1.2} />
            <rect x={e2.x - 2.6} y={e2.y - 2.2} width={5.2} height={4.4} rx={1.2} />
          </g>
        );
      })}
    </g>
  );
}

function Gear({ s, p }: { s: Skeleton; p: Prop }) {
  switch (p.kind) {
    case "bar": return <Bar s={s} p={p} />;
    case "dumbbells": return <Dumbbells s={s} p={p} />;
    case "plate": {
      const at = anchor(s, p.at);
      const r = p.r ?? 6.5;
      return (
        <g>
          <circle cx={at.x} cy={at.y} r={r} className="fill-[var(--gear)]" />
          <circle cx={at.x} cy={at.y} r={r * 0.34} className="fill-[var(--gear-dark)]" />
        </g>
      );
    }
    case "pad": {
      const t = p.thick ?? 4;
      return (
        <rect
          x={p.x - p.len / 2} y={p.y - t / 2} width={p.len} height={t} rx={1.6}
          transform={`rotate(${p.angle} ${p.x} ${p.y})`}
          className="fill-[var(--pad)]"
        />
      );
    }
    case "padAt": {
      const a = anchor(s, p.at);
      const x = a.x + (p.dx ?? 0), y = a.y + (p.dy ?? 0);
      const t = p.thick ?? 4;
      return (
        <rect
          x={x - p.len / 2} y={y - t / 2} width={p.len} height={t} rx={1.6}
          transform={`rotate(${p.angle} ${x} ${y})`}
          className="fill-[var(--pad)]"
        />
      );
    }
    case "box": {
      const tone = p.tone ?? "frame";
      if (tone === "stack") {
        const rows = Math.max(2, Math.floor(p.h / 3.4));
        return (
          <g>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={1} className="fill-[var(--gear-dark)]" />
            {Array.from({ length: rows }, (_, i) => (
              <line
                key={i} x1={p.x + 1} y1={p.y + 2 + i * (p.h / rows)} x2={p.x + p.w - 1} y2={p.y + 2 + i * (p.h / rows)}
                strokeWidth={1} className="stroke-[var(--gear)]"
              />
            ))}
          </g>
        );
      }
      return (
        <rect
          x={p.x} y={p.y} width={p.w} height={p.h} rx={1.4}
          className={tone === "plate" ? "fill-[var(--gear)]" : "fill-[var(--pad)]"}
        />
      );
    }
    case "post":
      return <line x1={p.x} y1={p.y1} x2={p.x} y2={p.y2} strokeWidth={p.thick ?? 3} strokeLinecap="round" className="stroke-[var(--frame)]" />;
    case "beam":
      return <line x1={p.x1} y1={p.y} x2={p.x2} y2={p.y} strokeWidth={p.thick ?? 3} strokeLinecap="round" className="stroke-[var(--frame)]" />;
    case "cable": {
      const to = anchor(s, p.to);
      const from = { x: p.from[0], y: p.from[1] };
      const d = p.via ? `M${P(from)} L${p.via[0]},${p.via[1]} L${P(to)}` : `M${P(from)} L${P(to)}`;
      return (
        <g>
          <path d={d} strokeWidth={1.3} fill="none" className="stroke-[var(--cable)]" />
          <circle cx={from.x} cy={from.y} r={2.2} className="fill-[var(--frame)]" />
        </g>
      );
    }
    case "roller": {
      const at = anchor(s, p.at);
      return (
        <circle
          cx={at.x + (p.dx ?? 0)} cy={at.y + (p.dy ?? 0)} r={p.r ?? 4.2}
          className="fill-[var(--pad)]"
        />
      );
    }
  }
}

/* ---------------------------------------------------------------- */
/* Overlays                                                          */
/* ---------------------------------------------------------------- */

function resolve(s: Skeleton, v: AnchorName | [number, number]): Vec {
  return Array.isArray(v) ? { x: v[0], y: v[1] } : anchor(s, v);
}

function Overlays({ s, list, trace }: { s: Skeleton; list: Overlay[]; trace: Record<string, string> }) {
  return (
    <g>
      {list.map((o, i) => {
        if (o.kind === "trace") {
          const d = trace[o.of];
          if (!d) return null;
          return (
            <path
              key={i} d={d} fill="none" strokeWidth={1.2} strokeDasharray="2.5 2"
              strokeLinecap="round" className="stroke-[var(--cue)]" opacity={0.85}
            />
          );
        }
        if (o.kind === "spine") {
          return (
            <line
              key={i}
              x1={s.pelvis.x} y1={s.pelvis.y} x2={s.neck.x} y2={s.neck.y}
              strokeWidth={1.2} strokeDasharray="2.5 2" className="stroke-[var(--cue)]"
            />
          );
        }
        if (o.kind === "mark") {
          const at = resolve(s, o.at);
          return (
            <circle
              key={i} cx={at.x} cy={at.y} r={5.4} fill="none" strokeWidth={1.1}
              className={o.tone === "bad" ? "stroke-[var(--bad)]" : "stroke-[var(--cue)]"}
            />
          );
        }
        if (o.kind === "arrow") {
          const a = resolve(s, o.from), b = resolve(s, o.to);
          const d = norm(sub(b, a));
          const tip = add(b, d, -1.2);
          const wing = 2.8;
          const l = { x: tip.x - d.x * wing + d.y * wing * 0.6, y: tip.y - d.y * wing - d.x * wing * 0.6 };
          const r = { x: tip.x - d.x * wing - d.y * wing * 0.6, y: tip.y - d.y * wing + d.x * wing * 0.6 };
          const cls = o.tone === "bad" ? "stroke-[var(--bad)]" : "stroke-[var(--cue)]";
          const fcls = o.tone === "bad" ? "fill-[var(--bad)]" : "fill-[var(--cue)]";
          return (
            <Fragment key={i}>
              <line x1={a.x} y1={a.y} x2={tip.x} y2={tip.y} strokeWidth={1.4} strokeLinecap="round" className={cls} />
              <polygon points={`${P(tip)} ${P(l)} ${P(r)}`} className={fcls} />
            </Fragment>
          );
        }
        // angle
        const c = resolve(s, o.at), a = resolve(s, o.a), b = resolve(s, o.b);
        const r = 7;
        const da = norm(sub(a, c)), db = norm(sub(b, c));
        const p1 = add(c, da, r), p2 = add(c, db, r);
        const cross = da.x * db.y - da.y * db.x;
        return (
          <path
            key={i}
            d={`M${P(p1)} A${r},${r} 0 0,${cross > 0 ? 1 : 0} ${P(p2)}`}
            fill="none" strokeWidth={1.2} className="stroke-[var(--cue)]"
          />
        );
      })}
    </g>
  );
}

/* ---------------------------------------------------------------- */
/* Figure                                                            */
/* ---------------------------------------------------------------- */

export default function Figure({
  ex, view, phase, showMuscles = true, showCues = true,
}: {
  ex: Exercise;
  view: View;
  /** Position within the rep, 0..1. */
  phase: number;
  showMuscles?: boolean;
  showCues?: boolean;
}) {
  const frames = ex.frames[view];
  const lock = ex.groundLock?.[view] ?? true;
  const current: PoseAngles = sampleLoop(frames, phase);
  const s = solve(current, view, lock);

  // The bar path has to come from the whole rep, not the current frame, so it
  // is sampled once per exercise rather than per animation tick.
  const trace = useMemo(() => {
    const overlays = ex.overlays?.[view] ?? [];
    const wanted = overlays.filter((o) => o.kind === "trace") as Extract<Overlay, { kind: "trace" }>[];
    const out: Record<string, string> = {};
    for (const t of wanted) {
      const pts: Vec[] = [];
      const N = 26;
      for (let i = 0; i <= N; i++) {
        const u = i / N;
        // Sample the outbound half only; the return leg retraces it.
        const idx = u * (frames.length - 1);
        const lo = Math.min(Math.floor(idx), frames.length - 2);
        const k = ease(idx - lo);
        const fp: PoseAngles = { ...frames[lo] };
        (Object.keys(fp) as (keyof PoseAngles)[]).forEach((key) => {
          fp[key] = frames[lo][key] + (frames[lo + 1][key] - frames[lo][key]) * k;
        });
        pts.push(anchor(solve(fp, view, lock), t.of));
      }
      out[t.of] = pts.map((p, i) => `${i === 0 ? "M" : "L"}${P(p)}`).join(" ");
    }
    return out;
  }, [ex, view, frames, lock]);

  const props = ex.props?.[view] ?? [];
  const behind = props.filter((p) => !("inFront" in p) || !p.inFront);
  const front = props.filter((p) => "inFront" in p && p.inFront);
  const overlays = ex.overlays?.[view] ?? [];

  // Cue text is collected into one caption line instead of floating over the
  // drawing, where at phone size it landed on top of the figure and was unreadable.
  const caption = overlays
    .map((o) => ("label" in o ? o.label : undefined))
    .filter(Boolean)
    .join("  ·  ");

  return (
    <svg
      viewBox="-9 -13 118 124"
      className="w-full h-full"
      role="img"
      aria-label={`${ex.name}, ${view} view`}
    >
      <line x1={-6} y1={GROUND + 1} x2={106} y2={GROUND + 1} strokeWidth={0.8} className="stroke-[var(--floor)]" />
      {behind.map((p, i) => <Gear key={`b${i}`} s={s} p={p} />)}
      <Body s={s} />
      {showMuscles && <Highlight s={s} ex={ex} />}
      {front.map((p, i) => <Gear key={`f${i}`} s={s} p={p} />)}
      {showCues && <Overlays s={s} list={overlays} trace={trace} />}
      {showCues && caption && (
        <text
          x={50} y={104} fontSize={4.1} fontWeight={600} textAnchor="middle"
          className="fill-[var(--cue)]"
        >
          {caption}
        </text>
      )}
    </svg>
  );
}
