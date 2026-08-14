import Link from "next/link";
import { notFound } from "next/navigation";
import DayWork from "@/components/DayWork";
import { DAYS, getDay } from "@/lib/routine";

export function generateStaticParams() {
  return DAYS.map((d) => ({ id: d.id }));
}

export default async function DayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const day = getDay(id);
  if (!day) notFound();

  return (
    <main className="pt-6">
      <Link href="/" className="inline-flex items-center gap-1 text-[14px] text-[var(--muted)] -ml-1 mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Week
      </Link>

      <header className="mb-5">
        <div className="text-[13px] font-bold uppercase tracking-wider text-[var(--accent)]">
          {day.subtitle}
        </div>
        <h1 className="text-[27px] font-bold tracking-tight mt-0.5">{day.name}</h1>
        {day.focus && <p className="text-[14px] text-[var(--muted)] mt-1">{day.focus}</p>}
        {day.blurb && (
          <p className="text-[14px] leading-relaxed text-[var(--muted)] mt-2.5">{day.blurb}</p>
        )}
      </header>

      {day.rest ? (
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-6 text-center">
          <div className="text-[15px] font-semibold">Nothing scheduled</div>
          <p className="text-[14px] text-[var(--muted)] mt-1">Take the day off.</p>
        </div>
      ) : (
        <DayWork day={day} />
      )}
    </main>
  );
}
