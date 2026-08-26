import GuideFigure from "@/components/GuideFigure";
import { getExercise } from "@/lib/exercises";
import { GUIDE_ART } from "@/lib/guide";

/**
 * Visual QA sheet: every exercise's three frames, held one at a time in
 * movement order with their registration offsets applied.
 *
 * Anything that jitters in the animation shows up here as the equipment
 * sitting in a different place along a row. Not linked from anywhere in the
 * app — it exists to eyeball all the artwork at once after regenerating the
 * offsets.
 */
export default function DevPage() {
  return (
    <main className="pt-6">
      <h1 className="text-[22px] font-bold tracking-tight mb-1">Guide frames</h1>
      <p className="text-[13px] text-[var(--muted)] mb-5">
        In movement order, registered. The equipment should hold still across a row.
      </p>

      <div className="space-y-6">
        {Object.entries(GUIDE_ART).map(([slug, art]) => {
          const ex = getExercise(slug);
          if (!ex) return null;

          return (
            <section key={slug}>
              <h2 className="text-[14px] font-bold mb-1.5">{ex.name}</h2>
              <div className="grid grid-cols-3 gap-1.5">
                {art.order.map((frame, i) => (
                  <div
                    key={frame}
                    className="relative aspect-square rounded-xl bg-[var(--panel)] border border-[var(--line)] overflow-hidden"
                  >
                    <GuideFigure art={art} pos={i} debug alt={`${ex.name} frame ${frame}`} />
                    <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-[var(--muted)]">
                      {art.source}/{frame}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
