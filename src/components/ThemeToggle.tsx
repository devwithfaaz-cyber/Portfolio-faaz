"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!mounted) {
    return (
      <div
        className="floating-theme-control fixed z-50 h-11 w-11 rounded-full border border-[var(--border)] bg-[var(--surface)] opacity-50 shadow-md"
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";
  const tooltipText = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <div className="floating-theme-control fixed z-50 flex items-center">
      {/* Tooltip */}
      <div
        id="theme-tooltip"
        role="tooltip"
        className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--fg)] shadow-md transition-all duration-200 ${
          showTooltip ? "scale-100 opacity-100 translate-x-0" : "scale-95 opacity-0 translate-x-1"
        }`}
      >
        {tooltipText}
      </div>

      {/* Floating Button */}
      <button
        type="button"
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={tooltipText}
        aria-describedby="theme-tooltip"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] shadow-lg transition-all duration-300 hover:scale-105 hover:border-[var(--accent)] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <div className="relative h-5 w-5">
          {/* Sun icon */}
          <Sun
            className={`absolute inset-0 h-5 w-5 text-amber-500 transition-all duration-300 ${
              isDark
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
            strokeWidth={1.75}
          />
          {/* Moon icon */}
          <Moon
            className={`absolute inset-0 h-5 w-5 text-blue-400 transition-all duration-300 ${
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
            strokeWidth={1.75}
          />
        </div>
      </button>
    </div>
  );
}
