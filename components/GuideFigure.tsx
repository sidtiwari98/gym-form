import Image from "next/image";
import { frameOffsets, type GuideArt } from "@/lib/guide";

/**
 * All three catalogue frames stacked, cross-faded by `pos`.
 *
 * `pos` runs 0..2 across the rep. Within each step the outgoing and incoming
 * frame always sum to full opacity, so there is never a moment with nothing on
 * screen; `BLEND` sets how much of the step is spent handing over, and the
 * rest holds a single drawing. A plain linear cross-fade would instead leave
 * two ghosted figures up for most of the rep.
 */
const BLEND = 0.4;

/** Opacity of each of the three frames at `pos`. */
function weights(pos: number): [number, number, number] {
  const k = Math.min(1, Math.floor(pos));
  const t = pos - k;
  const e = Math.min(1, Math.max(0, (t - (0.5 - BLEND / 2)) / BLEND));
  const w: [number, number, number] = [0, 0, 0];
  w[k] = 1 - e;
  w[k + 1] = e;
  return w;
}

export default function GuideFigure({
  art, pos, debug = false, alt,
}: {
  art: GuideArt;
  pos: number;
  /** Plot the anchors, and mark the ones used to register the frames. */
  debug?: boolean;
  alt: string;
}) {
  const offsets = frameOffsets(art);
  const w = weights(pos);

  return (
    <div className="relative w-full h-full">
      {art.order.map((frame, i) => {
        const [dx, dy] = offsets[i];
        // Debug shows one frame flat, so the anchors can be read against it.
        const opacity = debug ? Number(i === Math.round(pos)) : w[i];
        if (opacity === 0) return null;

        return (
          <Image
            key={frame}
            src={`/guide/${art.source}/frame-${frame}.png`}
            alt={i === Math.round(pos) ? alt : ""}
            aria-hidden={i !== Math.round(pos)}
            width={512}
            height={512}
            className="guide-art absolute inset-0 w-full h-full object-contain"
            style={{ opacity, transform: `translate(${dx * 100}%, ${dy * 100}%)` }}
          />
        );
      })}

      {debug &&
        [art.anchors[Math.round(pos)]].map((anchors, i) =>
          Object.entries(anchors).map(([name, [x, y]]) => (
            <div
              key={`${i}-${name}`}
              aria-hidden
              className="absolute pointer-events-none"
              style={{ left: `${x * 100}%`, top: `${y * 100}%`, transform: "translate(-50%, -50%)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full ring-1 ring-white/70"
                style={{
                  background: art.stable.includes(name as never) ? "var(--accent)" : "var(--bad)",
                }}
              />
            </div>
          )),
        )}
    </div>
  );
}
