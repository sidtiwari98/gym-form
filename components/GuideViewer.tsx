"use client";

import { useState } from "react";
import GuideFigure from "./GuideFigure";
import { GUIDE_CREDIT, type GuideArt } from "@/lib/guide";
import type { Exercise } from "@/lib/types";

/**
 * Stepper for catalogue artwork.
 *
 * Deliberately not a loop. The three frames are separately drawn illustrations
 * rather than frames of one scene — the bench and the plates move between them
 * — so playing them in sequence judders. Stepping between positions on a tap
 * hides that completely, because you're comparing two held poses instead of
 * watching a bad animation.
 */
export default function GuideViewer({ ex, art }: { ex: Exercise; art: GuideArt }) {
  const [step, setStep] = useState(0);
  const [muscles, setMuscles] = useState(true);

  const steps = art.steps ?? ["Start", "Middle", "End"];

  return (
    <div>
      <button
        onClick={() => setStep((s) => (s + 1) % 3)}
        className="relative block w-full rounded-2xl bg-[var(--panel)] border border-[var(--line)] overflow-hidden"
        aria-label={`Next position (showing ${steps[step]})`}
      >
        <div className="aspect-square">
          <GuideFigure
            source={art.source}
            frame={art.order[step]}
            anchors={art.anchors[step]}
            primary={ex.primary}
            secondary={ex.secondary}
            showMuscles={muscles}
            alt={`${ex.name} — ${steps[step]}`}
          />
        </div>
        <span className="absolute top-2 left-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
          {steps[step]}
        </span>
      </button>

      <div className="mt-3 rounded-2xl bg-[var(--panel)] border border-[var(--line)] p-3">
        <div className="flex gap-2">
          {steps.map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              aria-pressed={i === step}
              className={`flex-1 h-11 rounded-xl border text-[12px] font-semibold transition-colors ${
                i === step
                  ? "bg-[var(--accent-dim)] border-[var(--accent)] text-[var(--accent)]"
                  : "bg-[var(--panel-2)] border-[var(--line)] text-[var(--muted)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMuscles((m) => !m)}
          aria-pressed={muscles}
          className={`mt-2.5 w-full h-9 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            muscles
              ? "bg-[var(--panel-2)] border-[var(--line)] text-[var(--text)]"
              : "bg-transparent border-[var(--line)] text-[var(--muted)]"
          }`}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: muscles ? "var(--m1)" : "transparent",
              boxShadow: muscles ? "none" : "inset 0 0 0 1.5px var(--muted)",
            }}
          />
          Muscles
        </button>
      </div>

      <GuideCredit />
    </div>
  );
}

/** CC BY-SA obliges us to name the creator and link the terms wherever the art runs. */
export function GuideCredit() {
  const c = GUIDE_CREDIT;
  return (
    <p className="mt-2 text-[11px] leading-relaxed text-[var(--muted)]">
      Illustration from{" "}
      <a href={c.workUrl} className="underline underline-offset-2">{c.work}</a> by{" "}
      <a href={c.creatorUrl} className="underline underline-offset-2">{c.creator}</a>, after{" "}
      <a href={c.sourceUrl} className="underline underline-offset-2">{c.source}</a> —{" "}
      <a href={c.licenseUrl} className="underline underline-offset-2">{c.license}</a>.
    </p>
  );
}
