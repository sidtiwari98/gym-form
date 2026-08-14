"use client";

import Figure from "./Figure";
import { EXERCISES } from "@/lib/exercises";

export default function ContactSheet() {
  return (
    <div className="py-6">
      <h1 className="text-lg font-bold mb-4">Pose sheet — {EXERCISES.length} exercises</h1>
      <div className="space-y-4">
        {EXERCISES.map((ex) => (
          <div key={ex.slug} className="rounded-xl border border-[var(--line)] bg-[var(--panel)] p-2">
            <div className="text-[12px] font-semibold mb-1.5">{ex.name}</div>
            <div className="grid grid-cols-4 gap-1.5">
              {(["front", "side"] as const).flatMap((v) =>
                [0, 0.5].map((p) => (
                  <div key={`${v}-${p}`} className="bg-[var(--panel-2)] rounded-lg aspect-square relative">
                    <Figure ex={ex} view={v} phase={p} showMuscles showCues />
                    <span className="absolute top-1 left-1.5 text-[9px] text-[var(--muted)] uppercase">
                      {v} {p === 0 ? "start" : "end"}
                    </span>
                  </div>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
