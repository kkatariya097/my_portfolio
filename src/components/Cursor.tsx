"use client";

import { useEffect, useRef } from "react";

/**
 * Custom reactive cursor: a small dot that tracks the mouse exactly, and a
 * ring that eases toward it (lerp) and grows when hovering interactive
 * elements. Also writes --cursor-x/--cursor-y onto <html> each frame so
 * Background.tsx's .bg-glow layer can track the cursor too.
 *
 * Only activates on fine-pointer (mouse/trackpad) devices — touch devices
 * keep their native behaviour, and the default cursor is left alone until
 * this confirms a mouse is present (progressive enhancement).
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;

      const hovered = (e.target as HTMLElement)?.closest?.(
        "a, button, [data-cursor-hover]"
      );
      ringRef.current?.classList.toggle("cursor-hover", !!hovered);
    };
    const handleDown = () => ringRef.current?.classList.add("cursor-active");
    const handleUp = () => ringRef.current?.classList.remove("cursor-active");
    const handleLeave = () => {
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };
    const handleEnter = () => {
      dotRef.current?.style.setProperty("opacity", "1");
      ringRef.current?.style.setProperty("opacity", "1");
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    const loop = () => {
      // ring eases toward the real cursor position; dot tracks it exactly
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;

      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`
      );
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      );

      // feed the background glow layer
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
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
