"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  onDone: () => void;
  lineDurationMs?: number;
};

/**
 * RPG-style dialogue box: shows one line at a time, auto-advances (or
 * click to advance faster), closable any time. Rendered above Oxcy's head.
 */
export function OxcySpeechBubble({ lines, onDone, lineDurationMs = 3200 }: Props) {
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
      className="oxcy-bubble absolute bottom-full right-0 mb-3 w-56 cursor-pointer rounded-2xl rounded-br-sm border border-border bg-background-elevated px-4 py-3 text-sm text-foreground shadow-lg"
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
