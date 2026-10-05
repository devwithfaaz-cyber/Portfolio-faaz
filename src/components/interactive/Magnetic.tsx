"use client";

import React, { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0 to 1, default 0.25
  maxDistance?: number; // max pixels to move, default 6
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.25,
  maxDistance = 6,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFinePointer = useRef(false);
  const bounds = useRef<DOMRect | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    hasFinePointer.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleMouseEnter = () => {
    if (hasFinePointer.current && ref.current) {
      bounds.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasFinePointer.current || !ref.current || !bounds.current) return;

    pointer.current = { x: e.clientX, y: e.clientY };
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (!ref.current || !bounds.current) return;
      let pullX = (pointer.current.x - bounds.current.left - bounds.current.width / 2) * strength;
      let pullY = (pointer.current.y - bounds.current.top - bounds.current.height / 2) * strength;
      const distance = Math.hypot(pullX, pullY);
      if (distance > maxDistance) {
        const factor = maxDistance / distance;
        pullX *= factor;
        pullY *= factor;
      }
      ref.current.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
    });
  };

  const handleMouseLeave = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    bounds.current = null;
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {children}
    </div>
  );
}
