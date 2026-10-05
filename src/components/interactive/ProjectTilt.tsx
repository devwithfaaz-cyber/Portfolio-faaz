"use client";

import React, { useRef, useEffect } from "react";

interface ProjectTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 2.5)
}

export function ProjectTilt({
  children,
  className = "",
  maxTilt = 2.5,
}: ProjectTiltProps) {
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
      const { left, top, width, height } = bounds.current;
      const x = (pointer.current.x - (left + width / 2)) / (width / 2);
      const y = (pointer.current.y - (top + height / 2)) / (height / 2);
      const rotY = Math.max(-maxTilt, Math.min(maxTilt, x * maxTilt));
      const rotX = Math.max(-maxTilt, Math.min(maxTilt, -y * maxTilt));
      ref.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1)`;
    });
  };

  const handleMouseLeave = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    bounds.current = null;
    if (ref.current) {
      ref.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
