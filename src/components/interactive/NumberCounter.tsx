"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";

const subscribeToMotionPreference = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getMotionPreference = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getServerMotionPreference = () => false;

interface NumberCounterProps {
  value: string; // e.g. "3+", "20+", "10+"
  duration?: number; // ms, default 1000
  className?: string;
}

export function NumberCounter({
  value,
  duration = 900,
  className = "",
}: NumberCounterProps) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );

  // Extract number and suffix (e.g. 20 and "+")
  const targetNumber = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animationFrameId = 0;
    const startCounting = () => {
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.floor(easeOut * targetNumber));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(update);
        } else {
          setCurrent(targetNumber);
        }
      };

      animationFrameId = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCounting();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [duration, prefersReducedMotion, targetNumber]);

  return (
    <span ref={containerRef} className={className}>
      {prefersReducedMotion ? targetNumber : current}
      {suffix}
    </span>
  );
}
