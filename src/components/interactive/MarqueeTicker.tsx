"use client";

import React from "react";

interface MarqueeTickerProps {
  items: string[];
  speed?: number; // seconds for one full pass (default 30)
  reverse?: boolean;
  className?: string;
}

export function MarqueeTicker({
  items,
  speed = 30,
  reverse = false,
  className = "",
}: MarqueeTickerProps) {
  // Duplicate for seamless looping
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex items-center gap-8 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-8 shrink-0">
            <span className="mono-tag text-xs font-medium text-[var(--fg-muted)] tracking-widest uppercase">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-50 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
