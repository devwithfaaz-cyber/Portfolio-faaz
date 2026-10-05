"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export function AnimatedBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Orb 1: Primary accent — upper right, large */}
      <div
        className="ambient-orb-1 absolute -top-[15%] -right-[8%] h-[600px] w-[600px] rounded-full sm:h-[800px] sm:w-[800px] transition-colors duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(96,165,250,0.14) 0%, rgba(96,165,250,0.07) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(37,99,235,0.10) 0%, rgba(37,99,235,0.04) 45%, transparent 72%)",
          filter: "blur(90px)",
        }}
      />

      {/* Orb 2: Warm amber — middle left */}
      <div
        className="ambient-orb-2 absolute top-[25%] -left-[12%] h-[550px] w-[550px] rounded-full sm:h-[720px] sm:w-[720px] transition-colors duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(251,191,36,0.06) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(217,119,6,0.05) 0%, rgba(99,102,241,0.05) 55%, transparent 78%)",
          filter: "blur(110px)",
        }}
      />

      {/* Orb 3: Teal/emerald — lower right */}
      <div
        className="ambient-orb-3 absolute -bottom-[12%] right-[8%] h-[520px] w-[520px] rounded-full sm:h-[680px] sm:w-[680px] transition-colors duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(16,185,129,0.07) 0%, rgba(96,165,250,0.06) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(37,99,235,0.04) 50%, transparent 75%)",
          filter: "blur(100px)",
        }}
      />

      {/* Orb 4: Purple/indigo — center bottom, breathing */}
      <div
        className="ambient-orb-4 absolute top-[55%] left-[20%] h-[480px] w-[480px] rounded-full sm:h-[620px] sm:w-[620px] transition-colors duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(167,139,250,0.04) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(99,102,241,0.04) 0%, rgba(167,139,250,0.03) 55%, transparent 80%)",
          filter: "blur(115px)",
        }}
      />

      {/* Subtle organic noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none opacity-[0.35] dark:opacity-20" />

      {/* Very faint technical grid pattern */}
      <div className="technical-grid absolute inset-0 opacity-[0.18] dark:opacity-[0.12]" />
    </div>
  );
}
