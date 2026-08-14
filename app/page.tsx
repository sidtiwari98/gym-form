import WeekList from "@/components/WeekList";
import { GENERAL_NOTES, WEEKLY_VOLUME } from "@/lib/routine";
import { EXERCISES } from "@/lib/exercises";

export default function Home() {
  return (
    <main className="pt-8">
      <header className="mb-6">
        <h1 className="text-[27px] font-bold tracking-tight">Gym Form</h1>
        <p className="text-[15px] text-[var(--muted)] mt-1">
          5-day upper / lower / arms split. {EXERCISES.length} exercises, front and side view.
        </p>
      </header>

      <WeekList />

      <section className="mt-8">
        <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">
          How to run it
        </h2>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] divide-y divide-[var(--line)]">
          {GENERAL_NOTES.map((n) => (
            <div key={n.title} className="p-3.5">
              <div className="font-semibold text-[15px]">{n.title}</div>
              <p className="text-[14px] leading-relaxed text-[var(--muted)] mt-0.5">{n.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2.5">
          Weekly volume
        </h2>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3.5">
          <div className="space-y-2.5">
            {WEEKLY_VOLUME.map((v) => (
              <div key={v.muscle}>
                <div className="flex items-baseline justify-between gap-3 text-[14px]">
                  <span className="font-medium">{v.muscle}</span>
                  <span className="tabular-nums text-[var(--muted)]">
                    ~{v.sets} sets
                  </span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-[var(--panel-2)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${Math.min(100, (v.sets / 20) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--muted)] mt-3.5 pt-3.5 border-t border-[var(--line)]">
            All inside or near the 10–20 sets per week range generally used as a hypertrophy target
            for natural lifters — enough to drive growth, not so much that it tips into junk volume.
          </p>
        </div>
      </section>
    </main>
  );
}
