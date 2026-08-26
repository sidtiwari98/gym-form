import GuideFigure from "@/components/GuideFigure";
import { getExercise } from "@/lib/exercises";
import { GUIDE_ART } from "@/lib/guide";

/**
 * Authoring aid: every catalogue frame with its anchor points plotted and the
 * highlights they produce. Placing anchors for a new exercise is eyeball-then-
 * check against this page. Same job `/dev` does for the rig.
 */
export default function AnchorsPage() {
  return (
    <main className="pt-6">
      <h1 className="text-[22px] font-bold tracking-tight mb-1">Guide anchors</h1>
      <p className="text-[13px] text-[var(--muted)] mb-5">
        Left: anchor points. Right: the highlights derived from them.
      </p>

      <div className="space-y-8">
        {Object.entries(GUIDE_ART).map(([slug, art]) => {
          const ex = getExercise(slug);
          if (!ex) return null;

          return (
            <section key={slug}>
              <h2 className="text-[15px] font-bold mb-2">{ex.name}</h2>
              <div className="space-y-2">
                {art.order.map((frame, i) => (
                  <div key={frame} className="grid grid-cols-2 gap-2">
                    {[true, false].map((debug) => (
                      <div
                        key={String(debug)}
                        className="relative aspect-square rounded-xl bg-[var(--panel)] border border-[var(--line)] overflow-hidden"
                      >
                        <GuideFigure
                          source={art.source}
                          frame={frame}
                          anchors={art.anchors[i]}
                          primary={ex.primary}
                          secondary={ex.secondary}
                          showMuscles={!debug}
                          debug={debug}
                          alt={`${ex.name} frame ${frame}`}
                        />
                        <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-[var(--muted)]">
                          {art.source}/frame-{frame} · step {i}
                        </span>
                      </div>
                    ))}
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
