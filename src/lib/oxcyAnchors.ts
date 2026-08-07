// Where Oxcy stands (as viewport top/left percentages) while each section
// is in view — desktop only; roaming around the page on a small screen
// eats too much of the limited space, so mobile just keeps one safe spot.
// Biased toward the page margins (near 8-10% / 88-90%) so Oxcy doesn't sit
// on top of body text.

export type OxcyAnchor = { top: string; left: string };

export const sectionAnchor: Record<string, OxcyAnchor> = {
  home: { top: "80%", left: "88%" },
  about: { top: "42%", left: "9%" },
  skills: { top: "28%", left: "89%" },
  projects: { top: "55%", left: "9%" },
  contact: { top: "68%", left: "88%" },
};

export const mobileAnchor: OxcyAnchor = { top: "88%", left: "84%" };

/** Anchors right of center get the speech bubble growing leftward; anchors
 * left of center get it growing rightward, so it never runs off-screen. */
export function isRightSide(anchor: OxcyAnchor): boolean {
  return parseFloat(anchor.left) > 50;
}
