"use client";

import { useEffect, useRef } from "react";
import { cursorStore } from "@/lib/cursorStore";

/**
 * Custom reactive cursor: a little pink yarn ball that eases toward the
 * pointer (lerp), rolls (rotates) based on horizontal travel, and squashes
 * on click. A dashed gold halo appears around it over links/buttons.
 *
 * Also writes the live position to cursorStore + --cursor-x/--cursor-y on
 * <html> each frame, so Background.tsx's glow and (later) the OxcyGuide
 * character can react to where the cursor is.
 *
 * Only activates on fine-pointer (mouse/trackpad) devices — touch devices
 * keep their native behaviour (progressive enhancement).
 */
export function Cursor() {
  const ballRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ball = { x: target.x, y: target.y, rotation: 0 };
    let lastX = target.x;
    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const hovered = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor-hover]"
      );
      haloRef.current?.classList.toggle("cursor-hover", !!hovered);
    };
    const handleDown = () => ballRef.current?.classList.add("cursor-active");
    const handleUp = () => ballRef.current?.classList.remove("cursor-active");
    const handleLeave = () => {
      ballRef.current?.style.setProperty("opacity", "0");
      haloRef.current?.style.setProperty("opacity", "0");
    };
    const handleEnter = () => {
      ballRef.current?.style.setProperty("opacity", "1");
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    const loop = () => {
      // ball eases toward the real cursor position, like it's chasing it
      ball.x += (target.x - ball.x) * 0.2;
      ball.y += (target.y - ball.y) * 0.2;

      // roll based on horizontal travel — a positive dx spins it clockwise
      const dx = ball.x - lastX;
      ball.rotation += dx * 3;
      lastX = ball.x;

      // a subtle bob to sell the "rolling ball" feel while moving
      const speed = Math.abs(dx);
      const bob = Math.min(speed * 0.4, 4);

      ballRef.current?.style.setProperty(
        "transform",
        `translate3d(${ball.x}px, ${ball.y - bob}px, 0) translate(-50%, -50%) rotate(${ball.rotation}deg)`
      );
      haloRef.current?.style.setProperty(
        "transform",
        `translate3d(${ball.x}px, ${ball.y}px, 0) translate(-50%, -50%)`
      );

      cursorStore.set(target.x, target.y);

      const xPct = (target.x / window.innerWidth) * 100;
      const yPct = (target.y / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--cursor-x", `${xPct}%`);
      document.documentElement.style.setProperty("--cursor-y", `${yPct}%`);

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={haloRef} className="cursor-halo" aria-hidden="true" />
      <div ref={ballRef} className="cursor-ball" aria-hidden="true">
        <YarnBallSvg />
      </div>
    </>
  );
}

function YarnBallSvg() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="16" cy="16" r="14" fill="var(--yarn)" />
      <g stroke="#be185d" strokeWidth="1.4" fill="none" opacity="0.65">
        <path d="M2 16c6-6 22-6 28 0" />
        <path d="M2 16c6 6 22 6 28 0" />
        <path d="M16 2c-6 6-6 22 0 28" />
        <path d="M6 6c5 7 15 7 20 20" />
        <path d="M26 6c-5 7-15 7-20 20" />
      </g>
      <circle cx="11" cy="11" r="2.5" fill="#ffffff" opacity="0.35" />
    </svg>
  );
}
