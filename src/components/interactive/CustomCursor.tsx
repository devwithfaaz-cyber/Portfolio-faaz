"use client";

import React, { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || reducedMotion) {
      return;
    }

    let rafId: number | null = null;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let pointerVisible = false;
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;

    document.body.classList.add("has-custom-cursor");

    const setCursorState = (state: string, label = "") => {
      if (ringRef.current) ringRef.current.dataset.state = state;
      if (dotRef.current) dotRef.current.dataset.state = state;
      if (labelRef.current && labelRef.current.textContent !== label) {
        labelRef.current.textContent = label;
      }
    };

    const clearIdleTimer = () => {
      if (idleTimeout !== null) clearTimeout(idleTimeout);
      idleTimeout = null;
      if (ringRef.current) ringRef.current.dataset.idle = "false";
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      clearIdleTimer();

      if (!pointerVisible) {
        pointerVisible = true;
        if (dotRef.current) dotRef.current.dataset.visible = "true";
        if (ringRef.current) ringRef.current.dataset.visible = "true";
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target instanceof Element ? e.target : null;
      if (target) {
        const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
        const link = target.closest("a");
        if (cursorAttr === "open") {
          setCursorState("open", "OPEN ↗");
        } else if (cursorAttr === "explore" && !target.closest("a, button, [role='button']")) {
          setCursorState("explore", "EXPLORE");
        } else if (target.closest("button, [role='button']")) {
          setCursorState("button");
        } else if (link) {
          const href = link.getAttribute("href") || "";
          if (href.startsWith("http") || link.getAttribute("target") === "_blank") {
            setCursorState("open", "OPEN ↗");
          } else {
            setCursorState("link");
          }
        } else if (cursorAttr === "view") {
          setCursorState("view", "VIEW");
        } else if (cursorAttr === "explore" || target.closest("img, picture")) {
          setCursorState("explore", "EXPLORE");
        } else {
          setCursorState("default");
        }
      }

      idleTimeout = setTimeout(() => {
        if (ringRef.current) ringRef.current.dataset.idle = "true";
      }, 2800);

      if (rafId === null) rafId = requestAnimationFrame(render);
    };

    const onMouseLeave = () => {
      pointerVisible = false;
      clearIdleTimer();
      if (dotRef.current) dotRef.current.dataset.visible = "false";
      if (ringRef.current) ringRef.current.dataset.visible = "false";
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.dataset.pressed = "true";
    };

    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.dataset.pressed = "false";
    };

    const render = () => {
      rafId = null;
      // Smooth lerp for outer ring (trailing effect)
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      clearIdleTimer();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Inner Dot: Immediate tracking */}
      <div
        ref={dotRef}
        aria-hidden="true"
        data-visible="false"
        className="custom-cursor cursor-dot pointer-events-none fixed top-0 left-0 z-[60] rounded-full bg-[var(--accent)]"
        style={{ willChange: "transform" }}
      />

      <div
        ref={ringRef}
        aria-hidden="true"
        data-visible="false"
        data-state="default"
        data-idle="false"
        data-pressed="false"
        className="custom-cursor cursor-ring pointer-events-none fixed top-0 left-0 z-[60] flex items-center justify-center rounded-full"
        style={{ willChange: "transform" }}
      >
        <span ref={labelRef} className="cursor-label mono-tag text-[9px] font-bold tracking-wider" />
      </div>
    </>
  );
}
