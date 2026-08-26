import GuideFigure from "@/components/GuideFigure";
import { getExercise } from "@/lib/exercises";
import { GUIDE_ART } from "@/lib/guide";

/**
 * Authoring aid: every catalogue frame with its anchor points plotted. Amber
 * points are the `stable` ones the registration lines up — those are the only
 * coordinates that have to be accurate. Same job `/dev` does for the rig.
 */
export default function AnchorsPage() {
  return (
    <main className="pt-6">
      <h1 className="text-[22px] font-bold tracking-tight mb-1">Guide anchors</h1>
      <p className="text-[13px] text-[var(--muted)] mb-5">
        Amber = registers the frames, and needs to be right. Red = reference only.
      </p>

      <div className="space-y-8">
        {Object.entries(GUIDE_ART).map(([slug, art]) => {
          const ex = getExercise(slug);
          if (!ex) return null;

          return (
            <section key={slug}>
              <h2 className="text-[15px] font-bold mb-2">{ex.name}</h2>
              <div className="grid grid-cols-3 gap-2">
                {art.order.map((frame, i) => (
                  <div
                    key={frame}
                    className="relative aspect-square rounded-xl bg-[var(--panel)] border border-[var(--line)] overflow-hidden"
                  >
                    <GuideFigure art={art} pos={i} debug alt={`${ex.name} frame ${frame}`} />
                    <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-[var(--muted)]">
                      frame-{frame}
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
