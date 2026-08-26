"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { DAYS, DAY_LABELS, WEEK, getDay } from "@/lib/routine";

export default function WeekList() {
  // Resolved on the client: the server has no idea what day it is where you
  // are, and guessing would flash the wrong session on load. The server
  // snapshot is null so the markup matches until hydration fills it in; the
  // date never changes mid-session, so there is nothing to subscribe to.
  const todayIdx = useSyncExternalStore(
    () => () => {},
    () => new Date().getDay(),
    () => null,
  );

  const today = todayIdx === null ? null : DAYS.find((d) => d.index === todayIdx);

  return (
    <div className="space-y-2">
      {WEEK.map((id, i) => {
        const d = getDay(id)!;
        const isToday = today?.id === d.id;
        const count = d.work.length;
        return (
          <Link
            key={id}
            href={`/day/${d.id}`}
            className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-colors ${
              isToday
                ? "border-[var(--accent)] bg-[var(--panel)]"
                : "border-[var(--line)] bg-[var(--panel)] active:bg-[var(--panel-2)]"
            } ${d.rest ? "opacity-70" : ""}`}
          >
            <div
              className={`shrink-0 w-11 h-11 rounded-xl grid place-items-center text-[13px] font-bold ${
                isToday ? "bg-[var(--accent)] text-black" : "bg-[var(--panel-2)] text-[var(--muted)]"
              }`}
            >
              {DAY_LABELS[i]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold truncate">{d.name}</span>
                {isToday && (
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    Today
                  </span>
                )}
              </div>
              <div className="text-[13px] text-[var(--muted)] truncate">
                {d.rest ? d.subtitle : `${d.subtitle} · ${count} exercises`}
              </div>
            </div>
            {!d.rest && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--muted)]">
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </Link>
        );
      })}
    </div>
  );
}
