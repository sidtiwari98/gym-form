import GuideFigure from "@/components/GuideFigure";
import { getExercise } from "@/lib/exercises";
import { GUIDE_ART } from "@/lib/guide";

/**
 * Registration QA: every exercise's three frames, held one at a time with
 * their offsets applied. Anything that jitters in the animation shows up here
 * as the equipment sitting in a different place between frames. Same job
 * `/dev` does for the rig.
 */
export default function FramesPage() {
  return (
    <main className="pt-6">
      <h1 className="text-[22px] font-bold tracking-tight mb-1">Guide frames</h1>
      <p className="text-[13px] text-[var(--muted)] mb-5">
        In movement order, registered. The machine should hold still across a row.
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
