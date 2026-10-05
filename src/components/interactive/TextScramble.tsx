"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________0101";

const subscribeToMotionPreference = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getMotionPreference = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getServerMotionPreference = () => false;

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  speed?: number; // ms per frame, default 25
  duration?: number; // total duration ms, default 500
}

export function TextScramble({
  text,
  className = "",
  as: Component = "span",
  speed = 25,
  duration = 500,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startScramble = () => {
      const totalFrames = Math.max(12, Math.floor(duration / speed));
      let frame = 0;

      intervalId = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "." || char === "/") return char;
            const charProgress = index / text.length;
            if (progress > charProgress) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setDisplayText(scrambled);

        if (frame >= totalFrames) {
          if (intervalId !== null) clearInterval(intervalId);
          intervalId = null;
          setDisplayText(text);
        }
      }, speed);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startScramble();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, [duration, prefersReducedMotion, speed, text]);

  return (
    // @ts-expect-error dynamic component tag
    <Component ref={containerRef} className={className}>
      {prefersReducedMotion ? text : displayText}
    </Component>
  );
}
