"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  lines: string[];
  onDone: () => void;
  lineDurationMs?: number;
  /** Which side of Oxcy the bubble grows toward — pass "right" when Oxcy
   * is anchored on the left half of the screen (and vice versa) so the
   * bubble always grows into open space instead of off-screen. */
  side?: "left" | "right";
};

/**
 * RPG-style dialogue box: shows one line at a time, auto-advances (or
 * click to advance faster), closable any time. Rendered above Oxcy's head.
 */
export function OxcySpeechBubble({ lines, onDone, lineDurationMs = 3200, side = "left" }: Props) {
  const [index, setIndex] = useState(0);
  const isLast = index >= lines.length - 1;

  useEffect(() => {
    const t = setTimeout(() => {
      if (isLast) onDone();
      else setIndex((i) => i + 1);
    }, lineDurationMs);
    return () => clearTimeout(t);
  }, [index, isLast, lineDurationMs, onDone]);

  return (
    <div
      role="status"
      data-cursor-hover
      onClick={() => (isLast ? onDone() : setIndex((i) => i + 1))}
      className={cn(
        "oxcy-bubble absolute bottom-full mb-3 w-56 cursor-pointer rounded-2xl border border-border bg-background-elevated px-4 py-3 text-sm text-foreground shadow-lg",
        side === "left" ? "right-0 rounded-br-sm" : "left-0 rounded-bl-sm"
      )}
      data-side={side}
    >
      <button
        type="button"
        aria-label="Dismiss"
        onClick={(e) => {
          e.stopPropagation();
          onDone();
        }}
        className="absolute right-2 top-1.5 text-xs text-foreground-muted hover:text-foreground"
      >
        ✕
      </button>
      <p className="pr-3 leading-snug">{lines[index]}</p>
      {!isLast && (
        <span className="mt-1.5 block font-mono text-[10px] text-accent-2">
          click to continue ▸
        </span>
      )}
    </div>
  );
}
