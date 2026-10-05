"use client";

import React, { useEffect, useRef, useState } from "react";

export function AnimatedDivider({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full h-[1px] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="h-full bg-[var(--border)] transition-all duration-700 ease-out"
        style={{
          width: isVisible ? "100%" : "0%",
        }}
      />
    </div>
  );
}
