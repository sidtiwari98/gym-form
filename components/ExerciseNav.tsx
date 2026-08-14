"use client";

import Link from "next/link";
import { getExercise } from "@/lib/exercises";
import { getDay } from "@/lib/routine";
import { useWeek } from "@/lib/useWeek";

/**
 * Previous / next within the session, so you can move between exercises
 * without going back to the list mid-set. Resolved client-side because which
 * variation sits in a slot depends on the stored A/B week.
 */
export default function ExerciseNav({ dayId, index }: { dayId: string; index: number }) {
  const [week] = useWeek();
  const day = getDay(dayId);
  if (!day) return null;

  const at = (i: number) => {
    const w = day.work[i];
    if (!w) return null;
    const slug = week === 2 && w.swapFor ? w.swapFor : w.slug;
    const ex = getExercise(slug);
    return ex ? { href: `/exercise/${slug}?day=${dayId}&i=${i}`, name: ex.name } : null;
  };

  const prev = at(index - 1);
  const next = at(index + 1);
  if (!prev && !next) return null;

  return (
    <nav className="mt-6 grid grid-cols-2 gap-2">
      {prev ? (
        <Link
          href={prev.href}
          className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3 active:bg-[var(--panel-2)]"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Previous</div>
          <div className="text-[14px] font-semibold leading-tight mt-0.5 line-clamp-2">{prev.name}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3 text-right active:bg-[var(--panel-2)]"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Next</div>
          <div className="text-[14px] font-semibold leading-tight mt-0.5 line-clamp-2">{next.name}</div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
