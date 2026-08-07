"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { oxcyPoseSrc, sectionPose, type OxcyPoseName } from "@/lib/oxcyPoses";
import { oxcyDialogues } from "@/lib/oxcyDialogue";
import { cursorStore } from "@/lib/cursorStore";
import { useActiveSection } from "@/hooks/useActiveSection";
import { sectionAnchor, mobileAnchor, isRightSide } from "@/lib/oxcyAnchors";
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
 * The Oxcy guide: roams between a handful of spots around the page (left
 * mid, right mid, etc. — see oxcyAnchors.ts) as different sections come
 * into view, walking between them, and reacts to the yarn-ball cursor
 * getting close by pouncing on it.
 *
 * Position is viewport-relative (fixed + animated top/left), not literally
 * tracking scroll offset down the document — much more reliable to keep
 * smooth, while still delivering "Oxcy moves around the portfolio."
 * Mobile keeps a single safe spot; roaming is desktop-only (limited space).
 */
export function OxcyGuide() {
  const activeSection = useActiveSection(SECTION_IDS);
  const targetPose = sectionPose[activeSection] ?? "wave";

  const [pose, setPose] = useState<OxcyPoseName>("wave");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches
  );

  const dockRef = useRef<HTMLDivElement>(null);
  const prevSectionRef = useRef(activeSection);

  // roaming is desktop-only — track the breakpoint live for resizes/rotation
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const anchor = isDesktop ? (sectionAnchor[activeSection] ?? sectionAnchor.home) : mobileAnchor;
  const bubbleSide = isRightSide(anchor) ? "left" : "right";

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
  // section changes (skipped while mid-"play", handled below) — runs
  // alongside the position animation below, so it reads as Oxcy actually
  // walking to its new spot rather than just teleporting + pose-swapping
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

  // cursor-proximity "come play" reaction — re-checks Oxcy's live (possibly
  // mid-transition) position every frame via getBoundingClientRect
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
    <motion.div
      ref={dockRef}
      data-cursor-hover
      className="fixed z-40 -translate-x-1/2 -translate-y-1/2"
      animate={{ top: anchor.top, left: anchor.left }}
      transition={{ type: "spring", stiffness: 110, damping: 16 }}
    >
      <div className="oxcy-dock relative">
        {showWelcome && (
          <OxcySpeechBubble
            lines={oxcyDialogues.welcome}
            onDone={dismissWelcome}
            side={bubbleSide}
          />
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
    </motion.div>
  );
}
