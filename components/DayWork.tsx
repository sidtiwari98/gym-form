"use client";

import Link from "next/link";
import GuideFigure from "./GuideFigure";
import { getExercise } from "@/lib/exercises";
import { getGuideArt } from "@/lib/guide";
import { useWeek } from "@/lib/useWeek";
import type { Day } from "@/lib/types";

export default function DayWork({ day }: { day: Day }) {
  const [week, setWeek] = useWeek();
  const hasSwaps = day.work.some((w) => w.swapFor);


  return (
    <div>
      {hasSwaps && (
        <div className="mb-3 flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-1.5">
          {([1, 2] as const).map((w) => (
            <button
              key={w}
              onClick={() => setWeek(w)}
              className={`flex-1 h-9 rounded-xl text-[13px] font-semibold transition-colors ${
                week === w ? "bg-[var(--accent)] text-black" : "text-[var(--muted)]"
              }`}
              aria-pressed={week === w}
            >
              Week {w}
            </button>
          ))}
        </div>
      )}

      <ol className="space-y-2">
        {day.work.map((w, i) => {
          const slug = week === 2 && w.swapFor ? w.swapFor : w.slug;
          const ex = getExercise(slug);
          if (!ex) return null;
          const art = getGuideArt(slug);
          const swapped = week === 2 && !!w.swapFor;
          // A group heading shows on the first row of each run, read off the
          // previous row rather than carried in a variable across renders.
          const showGroup = w.group && w.group !== day.work[i - 1]?.group;

          return (
            <li key={`${w.slug}-${i}`}>
              {showGroup && (
                <div className="text-[12px] font-bold uppercase tracking-wider text-[var(--muted)] pt-3 pb-1.5">
                  {w.group}
                </div>
              )}
              <Link
                href={`/exercise/${slug}?day=${day.id}&i=${i}`}
                className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-2.5 active:bg-[var(--panel-2)]"
              >
                {art && (
                  <div className="shrink-0 w-[62px] h-[62px] rounded-xl bg-[var(--panel-2)] overflow-hidden">
                    {/* Mid-rep, held: a list of animating thumbnails is unreadable. */}
                    <GuideFigure art={art} pos={1} debug alt="" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-[15px] leading-tight">{ex.name}</div>
                  <div className="text-[13px] text-[var(--muted)] mt-0.5 tabular-nums">
                    {w.sets} × {w.reps}
                    <span className="mx-1.5 opacity-40">·</span>
                    {ex.gear}
                  </div>
                  {swapped && (
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)] mt-1">
                      Week 2 swap
                    </div>
                  )}
                  {w.note && (
                    <div className="text-[12px] leading-snug text-[var(--muted)] mt-1">{w.note}</div>
                  )}
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--muted)]">
                  <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
