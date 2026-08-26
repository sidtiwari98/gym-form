"use client";

import { useEffect, useRef, useState } from "react";
import GuideFigure from "./GuideFigure";
import { GUIDE_CREDIT, type GuideArt } from "@/lib/guide";
import type { Exercise } from "@/lib/types";

const SPEEDS = [0.5, 1, 1.5];

/**
 * Plays the three catalogue frames as a rep.
 *
 * Ping-pongs bottom -> top -> bottom rather than looping 1-2-3-1: the jump
 * back to the start would be the one cut with no movement to explain it, and
 * it's also what a rep actually looks like.
 */
export default function GuideViewer({ ex, art }: { ex: Exercise; art: GuideArt }) {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const raf = useRef<number | null>(null);
  const last = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const period = (ex.tempo ?? 3) * 1000;
    last.current = performance.now();
    const tick = (now: number) => {
      const dt = now - last.current;
      last.current = now;
      setPhase((p) => (p + (dt / period) * speed) % 1);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [playing, speed, ex.tempo]);

  // Triangle wave: 0 -> 2 -> 0 across one cycle.
  const pos = phase < 0.5 ? phase * 4 : (1 - phase) * 4;
  const steps = art.steps ?? ["Start", "Middle", "End"];

  return (
    <div>
      <button
        onClick={() => setPlaying((p) => !p)}
        className="relative block w-full rounded-2xl bg-[var(--panel)] border border-[var(--line)] overflow-hidden"
        aria-label={playing ? "Pause" : "Play"}
      >
        <div className="aspect-square">
          <GuideFigure art={art} pos={pos} alt={ex.name} />
        </div>
        <span className="absolute top-2 left-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
          {steps[Math.round(pos)]}
        </span>
      </button>

      <div className="mt-3 rounded-2xl bg-[var(--panel)] border border-[var(--line)] p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="shrink-0 w-11 h-11 rounded-full bg-[var(--accent)] text-black grid place-items-center"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="3" y="2" width="3.6" height="12" rx="1" /><rect x="9.4" y="2" width="3.6" height="12" rx="1" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.4v11.2a.8.8 0 0 0 1.23.67l8.4-5.6a.8.8 0 0 0 0-1.34l-8.4-5.6A.8.8 0 0 0 4 2.4Z" /></svg>
            )}
          </button>

          <input
            type="range" min={0} max={0.999} step={0.001} value={phase}
            onChange={(e) => { setPlaying(false); setPhase(parseFloat(e.target.value)); }}
            className="flex-1 h-11"
            aria-label="Scrub through the rep"
          />

          <button
            onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])}
            className="shrink-0 h-11 px-3 rounded-xl bg-[var(--panel-2)] border border-[var(--line)] text-sm font-semibold tabular-nums"
          >
            {speed}×
          </button>
        </div>
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
