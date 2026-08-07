/**
 * Tiny mutable singleton (no React re-renders) holding the live cursor
 * position in viewport pixels. Cursor.tsx writes to it every animation
 * frame; the future OxcyGuide component (Day 3) reads it in its own rAF
 * loop to decide "is the cursor close enough to start playing with the
 * yarn ball?" — avoids wiring cursor state through React context/props
 * for something that changes every frame.
 */
export type CursorPosition = { x: number; y: number };

const position: CursorPosition = { x: -1000, y: -1000 }; // offscreen until first move

export const cursorStore = {
  get(): CursorPosition {
    return position;
  },
  set(x: number, y: number) {
    position.x = x;
    position.y = y;
  },
  /** Euclidean distance from the cursor to an arbitrary point. */
  distanceTo(x: number, y: number): number {
    return Math.hypot(position.x - x, position.y - y);
  },
};
