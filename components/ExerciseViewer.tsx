"use client";

import { useEffect, useRef, useState } from "react";
import Figure from "./Figure";
import type { Exercise } from "@/lib/types";
import type { View } from "@/lib/rig";

const SPEEDS = [0.5, 1, 1.5];

export default function ExerciseViewer({ ex }: { ex: Exercise }) {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [muscles, setMuscles] = useState(true);
  const [cues, setCues] = useState(true);
  const [focus, setFocus] = useState<View | null>(null);

  const raf = useRef<number | null>(null);
  const last = useRef<number>(0);

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

  const views: View[] = focus ? [focus] : ["front", "side"];
  const label = (v: View) => ex.viewLabels?.[v] ?? (v === "front" ? "Front" : "Side");

  return (
    <div>
      <div className={`grid gap-2 ${focus ? "grid-cols-1" : "grid-cols-2"}`}>
        {views.map((v) => (
          <button
            key={v}
            onClick={() => setFocus(focus ? null : v)}
            className="relative block rounded-2xl bg-[var(--panel)] border border-[var(--line)] overflow-hidden"
            aria-label={focus ? "Show both views" : `Expand ${label(v)} view`}
          >
            <div className={focus ? "aspect-[4/3]" : "aspect-square"}>
              <Figure ex={ex} view={v} phase={phase} showMuscles={muscles} showCues={cues} />
            </div>
            <span className="absolute top-2 left-2.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              {label(v)}
            </span>
          </button>
        ))}
      </div>

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

        <div className="mt-2.5 flex gap-2">
          <Toggle on={muscles} set={setMuscles} label="Muscles" dot="var(--m1)" />
          <Toggle on={cues} set={setCues} label="Cues" dot="var(--cue)" />
        </div>
      </div>
    </div>
  );
}

function Toggle({
  on, set, label, dot,
}: { on: boolean; set: (v: boolean) => void; label: string; dot: string }) {
  return (
    <button
      onClick={() => set(!on)}
      className={`flex-1 h-9 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
        on
          ? "bg-[var(--panel-2)] border-[var(--line)] text-[var(--text)]"
          : "bg-transparent border-[var(--line)] text-[var(--muted)]"
      }`}
      aria-pressed={on}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ background: on ? dot : "transparent", boxShadow: on ? "none" : "inset 0 0 0 1.5px var(--muted)" }}
      />
      {label}
    </button>
  );
}
