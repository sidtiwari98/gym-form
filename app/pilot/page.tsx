import Link from "next/link";
import ExerciseViewer from "@/components/ExerciseViewer";
import GuideViewer from "@/components/GuideViewer";
import { getExercise } from "@/lib/exercises";
import { GUIDE_ART } from "@/lib/guide";

/**
 * Side-by-side of the drawn rig against the workout-guide catalogue artwork,
 * for deciding which one the exercise pages should use. Not linked from the
 * app; open /pilot directly, ideally on a phone.
 */
export default function PilotPage() {
  const slugs = Object.keys(GUIDE_ART);

  return (
    <main className="pt-6">
      <Link href="/" className="text-[14px] text-[var(--muted)]">← Week</Link>

      <header className="mt-3 mb-5">
        <h1 className="text-[24px] font-bold tracking-tight">Artwork pilot</h1>
        <p className="text-[14px] text-[var(--muted)] mt-1.5 leading-relaxed">
          Same three exercises, drawn rig against catalogue art. The rig animates
          and computes its highlights from joint angles; the catalogue art is
          three stills with highlights placed from a handful of anchor points.
        </p>
      </header>

      <div className="space-y-10">
        {slugs.map((slug) => {
          const ex = getExercise(slug);
          const art = GUIDE_ART[slug];
          if (!ex) return null;

          return (
            <section key={slug}>
              <h2 className="text-[18px] font-bold tracking-tight mb-3">{ex.name}</h2>

              <div className="space-y-5">
                <div>
                  <Label>Now — drawn rig</Label>
                  <ExerciseViewer ex={ex} />
                </div>
                <div>
                  <Label>Proposed — catalogue art</Label>
                  <GuideViewer ex={ex} art={art} />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
      {children}
    </div>
  );
}
