// Poses cropped from public/oxcy/oxcy sprit sheet.png via scripts/finalize-sprites.py
// Deliberately a small hand-picked subset (not all 24 poses) — one per
// section, plus a two-frame walk cycle and a two-step "playing" reaction.

export type OxcyPoseName =
  | "wave"
  | "sit"
  | "yarn-pounce"
  | "yarn-hold"
  | "box"
  | "laptop"
  | "walk-a"
  | "walk-b";

export const oxcyPoseSrc: Record<OxcyPoseName, string> = {
  wave: "/oxcy/sprites/final/oxcy-wave.png",
  sit: "/oxcy/sprites/final/oxcy-sit.png",
  "yarn-pounce": "/oxcy/sprites/final/oxcy-yarn-pounce.png",
  "yarn-hold": "/oxcy/sprites/final/oxcy-yarn-hold.png",
  box: "/oxcy/sprites/final/oxcy-box.png",
  laptop: "/oxcy/sprites/final/oxcy-laptop.png",
  "walk-a": "/oxcy/sprites/final/oxcy-walk-a.png",
  "walk-b": "/oxcy/sprites/final/oxcy-walk-b.png",
};

/** Which static pose Oxcy holds while each section is in view. */
export const sectionPose: Record<string, OxcyPoseName> = {
  home: "wave",
  about: "sit",
  skills: "yarn-hold", // doubles as the "playing" pose — ties Skills to the yarn-ball motif
  projects: "box", // "unboxing" the projects
  contact: "laptop",
};
