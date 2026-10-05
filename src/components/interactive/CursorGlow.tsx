"use client";

import React, { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const interactiveRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || reducedMotion) {
      return;
    }

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        if (glowRef.current) glowRef.current.dataset.visible = "true";
      }

      // Check if target is an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest("button, a, input, textarea, [data-cursor], [role='button']")
        );
        if (interactive !== interactiveRef.current) {
          interactiveRef.current = interactive;
          if (glowRef.current) {
            glowRef.current.dataset.interactive = String(interactive);
          }
        }
      }

      if (rafId === null) rafId = requestAnimationFrame(render);
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      if (glowRef.current) glowRef.current.dataset.visible = "false";
    };

    const render = () => {
      rafId = null;
      // Smooth interpolation for mouse follow glow
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(targetX - currentX) > 0.75 || Math.abs(targetY - currentY) > 0.75) {
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      data-interactive="false"
      data-visible="false"
      className="cursor-glow pointer-events-none fixed top-0 left-0 -z-5"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <div
        className="cursor-glow-core rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent) 0%, color-mix(in srgb, var(--accent) 7%, transparent) 38%, transparent 72%)",
        }}
      />
    </div>
  );
}
