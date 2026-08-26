import Image from "next/image";
import { blobsFor, type Anchors } from "@/lib/guide";
import type { Muscle } from "@/lib/types";

/**
 * One frame of catalogue artwork with muscle highlights under it.
 *
 * The art is white line work on transparency with a hollow interior — only
 * about an eighth of the canvas is ink — so a blurred blob painted *behind*
 * the image glows through the body and reads as a highlighted muscle. Painting
 * over the top would bury the linework instead.
 */
export default function GuideFigure({
  source, frame, anchors, primary, secondary, showMuscles = true, debug = false, alt,
}: {
  source: string;
  frame: number;
  anchors: Anchors;
  primary: Muscle[];
  secondary?: Muscle[];
  showMuscles?: boolean;
  /** Plot the raw anchor points over the art — how new exercises get authored. */
  debug?: boolean;
  alt: string;
}) {
  const layers = showMuscles
    ? [
        // Kept low: the highlight is a "this is the muscle" cue sitting under
        // linework, and anything stronger reads as the figure being on fire.
        ...(secondary ?? []).flatMap((m) => blobsFor(anchors, m).map((b) => ({ b, tone: "var(--m2)", o: 0.34 }))),
        ...primary.flatMap((m) => blobsFor(anchors, m).map((b) => ({ b, tone: "var(--m1)", o: 0.44 }))),
      ]
    : [];

  return (
    // `container-type: size` lets the blur scale with the rendered box, so the
    // highlights look the same on a phone and on the contact sheet.
    <div className="relative w-full h-full" style={{ containerType: "size" }}>
      {layers.map(({ b, tone, o }, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${b.x * 100}%`,
            top: `${b.y * 100}%`,
            width: `${b.w * 100}%`,
            height: `${b.h * 100}%`,
            background: tone,
            opacity: o,
            // Blur relative to the blob, not the box: a fixed radius leaves a
            // torso patch hard-edged and washes a delt away entirely.
            filter: `blur(${Math.max(1, Math.min(b.w, b.h) * 30)}cqmin)`,
            transform: `translate(-50%, -50%) rotate(${b.angle}deg)`,
          }}
        />
      ))}
      <Image
        src={`/guide/${source}/frame-${frame}.png`}
        alt={alt}
        width={512}
        height={512}
        className="guide-art relative w-full h-full object-contain"
      />

      {debug &&
        Object.entries(anchors).map(([name, [x, y]]) => (
          <div
            key={name}
            aria-hidden
            className="absolute pointer-events-none"
            style={{ left: `${x * 100}%`, top: `${y * 100}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--bad)] ring-1 ring-white/70" />
            <span className="absolute left-2 top-0 text-[7px] leading-none text-[var(--bad)] whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
    </div>
  );
}
