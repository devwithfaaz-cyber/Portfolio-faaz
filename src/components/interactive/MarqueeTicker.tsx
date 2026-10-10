"use client";

import React from "react";

type MarqueeItem = string | { label: string; className?: string; textClassName?: string };

interface MarqueeTickerProps {
  items: MarqueeItem[];
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
        {repeated.map((item, i) => {
          const label = typeof item === "string" ? item : item.label;
          const badgeClassName =
            typeof item === "string"
              ? "mono-tag text-xs font-medium text-[var(--fg-muted)] tracking-widest uppercase"
              : `inline-flex items-center justify-center rounded-md border px-3 py-1.5 mono-tag text-[10px] font-semibold tracking-[0.12em] uppercase shadow-sm ${item.className ?? "border-[var(--border)] bg-[var(--surface)] text-[var(--fg)]"}`;
          const textClassName =
            typeof item === "string"
              ? ""
              : item.textClassName ?? "";

          return (
            <span key={`${label}-${i}`} className="flex items-center gap-8 shrink-0">
              <span className={`${badgeClassName} ${textClassName}`.trim()}>
                {label}
              </span>
              <span className="h-1 w-1 rounded-full bg-[var(--accent)] opacity-50 shrink-0" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
