"use client";

import React from "react";

export function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="ambient-orb ambient-orb-1 absolute -top-[15%] -right-[8%] h-[600px] w-[600px] rounded-full sm:h-[800px] sm:w-[800px]" />
      <div className="ambient-orb ambient-orb-2 absolute top-[25%] -left-[12%] h-[550px] w-[550px] rounded-full sm:h-[720px] sm:w-[720px]" />
      <div className="ambient-orb ambient-orb-3 absolute -bottom-[12%] right-[8%] h-[520px] w-[520px] rounded-full sm:h-[680px] sm:w-[680px]" />
      <div className="ambient-orb ambient-orb-4 absolute top-[55%] left-[20%] h-[480px] w-[480px] rounded-full sm:h-[620px] sm:w-[620px]" />

      <div className="ambient-wave ambient-wave--one" />
      <div className="ambient-wave ambient-wave--two" />

      {/* Subtle organic noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none opacity-[0.35] dark:opacity-20" />

      {/* Very faint technical grid pattern */}
      <div className="technical-grid absolute inset-0 opacity-[0.18] dark:opacity-[0.12]" />
    </div>
  );
}
