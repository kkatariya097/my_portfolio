// Speech-bubble scripts for OxcySpeechBubble.tsx. Keyed by trigger name so
// more can be added later (e.g. a line the first time Skills is visited,
// a joke if the user lingers near the yarn ball, etc.) without touching
// the component that renders them.

export type DialogueScript = string[];

export const oxcyDialogues: Record<string, DialogueScript> = {
  welcome: ["Welcome! 👋", "Hey, I'm Oxcy — I love playing with yarn balls! 🧶"],
};
