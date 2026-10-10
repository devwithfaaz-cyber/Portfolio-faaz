"use client";

import React, { useState } from "react";
import { PRINCIPLES } from "@/data/portfolioData";
import { TextScramble } from "./interactive/TextScramble";

export function AboutSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14" data-reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[var(--fg)] max-w-3xl">
            <TextScramble text="Passionate about building full-stack applications with clean code." duration={550} className="block" />
          </h2>
        </div>

        {/* Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14 items-start pb-16 border-b border-[var(--border)]" data-reveal data-reveal-delay="70">
          <div className="md:col-span-5">
            <p className="font-display text-xl sm:text-2xl font-light text-[var(--fg)] leading-relaxed">
              &ldquo;I&apos;m Faaz Mirza, a software developer dedicated to crafting efficient digital products.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[var(--accent)]" />
              <span className="mono-tag text-xs text-[var(--fg-muted)]">
                Philosophy & Practice
              </span>
            </div>
          </div>

          <div className="md:col-span-7 space-y-5 text-base text-[var(--fg-muted)] leading-relaxed font-light">
            <p>
              My development journey is driven by curiosity, analytical thinking,
              and a commitment to writing maintainable code that scales.
            </p>
            <p>
              Whether I&apos;m designing PostgreSQL databases, writing REST API
              endpoints in Node.js/Next.js, or crafting pixel-perfect interfaces,
              I focus on performance, user experience, and detail.
            </p>
          </div>
        </div>

        {/* Core Principles: Elegant Editorial Rows */}
        <div className="mt-16" data-reveal data-reveal-delay="110">
          <div className="mb-8 flex items-baseline justify-between">
            <h3 className="mono-tag text-xs font-semibold text-[var(--fg-muted)] tracking-wider">
              Core Personal Principles
            </h3>
            <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
              Engineering Baseline
            </span>
          </div>

          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {PRINCIPLES.map((principle, idx) => {
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={principle.number}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between py-6 transition-all duration-200"
                >
                  {/* Left Side: Number & Title */}
                  <div className="flex items-baseline gap-6 md:w-1/2">
                    <span
                      className={`mono-tag text-sm font-semibold transition-opacity duration-200 ${
                        isHovered
                          ? "text-[var(--accent)] opacity-100"
                          : "text-[var(--fg-subtle)] opacity-60"
                      }`}
                    >
                      {principle.number}
                    </span>
                    <h4
                      className={`font-display text-xl sm:text-2xl font-light tracking-tight text-[var(--fg)] transition-transform duration-200 ${
                        isHovered ? "translate-x-1" : "translate-x-0"
                      }`}
                    >
                      {principle.title}
                    </h4>
                  </div>

                  {/* Right Side: Description */}
                  <div className="mt-2 md:mt-0 md:w-1/2 md:pl-8">
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-200 ${
                        isHovered
                          ? "text-[var(--fg)] font-normal"
                          : "text-[var(--fg-muted)] font-light"
                      }`}
                    >
                      {principle.description}
                    </p>
                  </div>

                  {/* Underline micro indicator */}
                  <div
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[var(--accent)] transition-all duration-300 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
