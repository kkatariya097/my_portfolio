"use client";

import { useEffect, useRef, useState } from "react";
import { oxcyPoseSrc, sectionPose, type OxcyPoseName } from "@/lib/oxcyPoses";
import { oxcyDialogues } from "@/lib/oxcyDialogue";
import { cursorStore } from "@/lib/cursorStore";
import { useActiveSection } from "@/hooks/useActiveSection";
import { OxcySpeechBubble } from "./OxcySpeechBubble";

const SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

// how close the yarn-ball cursor has to get before Oxcy notices (and how
// far it has to back off before Oxcy goes back to what it was doing) —
// two different thresholds so it doesn't flicker right at the boundary
const PLAY_ENTER_DISTANCE = 170;
const PLAY_EXIT_DISTANCE = 230;

const WALK_STEP_MS = 160;
const WALK_STEPS = 4;

/**
 * The Oxcy guide: docked in the bottom-right corner, its pose follows
 * whichever section is in view (with a little walk-cycle in between), and
 * it reacts to the yarn-ball cursor getting close by pouncing on it.
 *
 * Deliberately NOT free-roaming across the page — a fixed companion whose
 * pose reacts to context is far more reliable to keep smooth than
 * literally animating a position down the whole page, and still delivers
 * on "Oxcy reacts to what you're doing."
 */
export function OxcyGuide() {
  const activeSection = useActiveSection(SECTION_IDS);
  const targetPose = sectionPose[activeSection] ?? "wave";

  const [pose, setPose] = useState<OxcyPoseName>("wave");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const dockRef = useRef<HTMLDivElement>(null);
  const prevSectionRef = useRef(activeSection);

  // preload every pose once so switching never shows a blank flash
  useEffect(() => {
    Object.values(oxcyPoseSrc).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // first-visit welcome dialogue (once per browser session)
  useEffect(() => {
    if (sessionStorage.getItem("oxcy-welcomed")) return;
    const t = setTimeout(() => setShowWelcome(true), 900);
    return () => clearTimeout(t);
  }, []);

  const dismissWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem("oxcy-welcomed", "1");
  };

  // walk from the old pose to the new section's pose whenever the active
  // section changes (skipped while mid-"play", handled below)
  useEffect(() => {
    if (isPlaying) return;

    if (prevSectionRef.current === activeSection) {
      setPose(targetPose);
      return;
    }
    prevSectionRef.current = activeSection;

    let step = 0;
    setPose("walk-a");
    const timer = setInterval(() => {
      step += 1;
      if (step >= WALK_STEPS) {
        clearInterval(timer);
        setPose(targetPose);
        return;
      }
      setPose(step % 2 === 0 ? "walk-a" : "walk-b");
    }, WALK_STEP_MS);

    return () => clearInterval(timer);
  }, [activeSection, targetPose, isPlaying]);

  // cursor-proximity "come play" reaction
  useEffect(() => {
    let rafId: number;
    let playing = false;
    let pounceTimer: ReturnType<typeof setTimeout> | null = null;

    const loop = () => {
      const dock = dockRef.current;
      if (dock) {
        const rect = dock.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = cursorStore.distanceTo(cx, cy);

        if (!playing && dist < PLAY_ENTER_DISTANCE) {
          playing = true;
          setIsPlaying(true);
          setPose("yarn-pounce");
          pounceTimer = setTimeout(() => setPose("yarn-hold"), 260);
        } else if (playing && dist > PLAY_EXIT_DISTANCE) {
          playing = false;
          setIsPlaying(false); // the section-pose effect above restores the right pose
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      if (pounceTimer) clearTimeout(pounceTimer);
    };
  }, []);

  return (
    <div
      ref={dockRef}
      data-cursor-hover
      className="oxcy-dock fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      {showWelcome && (
        <OxcySpeechBubble lines={oxcyDialogues.welcome} onDone={dismissWelcome} />
      )}
      <div className="oxcy-float h-20 w-20 sm:h-32 sm:w-32">
        {/* plain <img>, not next/image — these are small local sprites we
            swap on state changes, no need for the optimization pipeline */}
        <img
          src={oxcyPoseSrc[pose]}
          alt="Oxcy, your guide"
          className="h-full w-full select-none object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.55)]"
          draggable={false}
        />
      </div>
    </div>
  );
}
