import Link from "next/link";
import { notFound } from "next/navigation";
import ExerciseViewer from "@/components/ExerciseViewer";
import ExerciseNav from "@/components/ExerciseNav";
import { EXERCISES, getExercise } from "@/lib/exercises";
import { getDay } from "@/lib/routine";
import { MUSCLE_LABEL } from "@/lib/types";

export function generateStaticParams() {
  return EXERCISES.map((e) => ({ slug: e.slug }));
}

export default async function ExercisePage({
  params, searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ day?: string; i?: string }>;
}) {
  const { slug } = await params;
  const { day: dayId, i } = await searchParams;
  const ex = getExercise(slug);
  if (!ex) notFound();

  const day = dayId ? getDay(dayId) : undefined;
  const index = i ? parseInt(i, 10) : NaN;

  return (
    <main className="pt-6">
      <Link
        href={day ? `/day/${day.id}` : "/"}
        className="inline-flex items-center gap-1 text-[14px] text-[var(--muted)] -ml-1 mb-3"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {day ? day.name : "Week"}
      </Link>

      <header className="mb-4">
        <h1 className="text-[24px] font-bold tracking-tight leading-tight">{ex.name}</h1>
        {ex.aka && <p className="text-[14px] text-[var(--muted)] mt-0.5">{ex.aka}</p>}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <Chip>{ex.gear}</Chip>
          <Chip>{ex.pattern}</Chip>
        </div>
      </header>

      <ExerciseViewer ex={ex} />

      <section className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3.5">
        <div className="text-[12px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
          Working
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ex.primary.map((m) => (
            <span
              key={m}
              className="text-[12px] font-semibold px-2.5 py-1 rounded-lg"
              style={{ background: "color-mix(in srgb, var(--m1) 22%, transparent)", color: "var(--m1)" }}
            >
              {MUSCLE_LABEL[m]}
            </span>
          ))}
          {(ex.secondary ?? []).map((m) => (
            <span
              key={m}
              className="text-[12px] font-medium px-2.5 py-1 rounded-lg"
              style={{ background: "color-mix(in srgb, var(--m2) 18%, transparent)", color: "var(--m2)" }}
            >
              {MUSCLE_LABEL[m]}
            </span>
          ))}
        </div>
      </section>

      <Section title="Form cues" accent>
        <ul className="space-y-2.5">
          {ex.cues.map((c, n) => (
            <li key={n} className="flex gap-2.5">
              <span className="shrink-0 w-5 h-5 rounded-md bg-[var(--accent-dim)] text-[var(--accent)] text-[11px] font-bold grid place-items-center mt-0.5">
                {n + 1}
              </span>
              <span className="text-[14px] leading-relaxed">{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Common mistakes">
        <ul className="space-y-2.5">
          {ex.mistakes.map((m, n) => (
            <li key={n} className="flex gap-2.5">
              <span className="shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--bad)]" />
              <span className="text-[14px] leading-relaxed text-[var(--muted)]">{m}</span>
            </li>
          ))}
        </ul>
      </Section>

      {ex.videoUrl && (
        <a
          href={ex.videoUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3.5 text-[14px] font-semibold"
        >
          Watch real footage
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}

      {day && !Number.isNaN(index) && <ExerciseNav dayId={day.id} index={index} />}
    </main>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[12px] font-medium px-2.5 py-1 rounded-lg bg-[var(--panel-2)] text-[var(--muted)] border border-[var(--line)]">
      {children}
    </span>
  );
}

function Section({
  title, children, accent,
}: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <section className="mt-3 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3.5">
      <div
        className={`text-[12px] font-bold uppercase tracking-wider mb-2.5 ${
          accent ? "text-[var(--accent)]" : "text-[var(--muted)]"
        }`}
      >
        {title}
      </div>
      {children}
    </section>
  );
}
