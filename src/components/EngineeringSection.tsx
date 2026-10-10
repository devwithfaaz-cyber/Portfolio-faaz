"use client";

import React from "react";
import { ENGINEERING_AREAS, ENGINEERING_APPROACH } from "@/data/portfolioData";
import { TextScramble } from "./interactive/TextScramble";
import { Check } from "lucide-react";

export function EngineeringSection() {
  return (
    <section id="engineering" className="py-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16" data-reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[var(--fg)] max-w-2xl">
            <TextScramble text="Full-Stack Engineering & Architecture" duration={600} className="block" />
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--fg-muted)] font-light max-w-3xl leading-relaxed">
            &ldquo;From high-performance React/Next.js interfaces to robust PostgreSQL database design and serverless Node.js APIs.&rdquo;
          </p>
        </div>

        {/* 3 Large Editorial Areas */}
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {ENGINEERING_AREAS.map((area, idx) => (
            <div
              key={area.number}
              className="py-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 items-start"
              data-reveal
              data-reveal-delay={idx * 60}
            >
              {/* Left Column: Number & Title */}
              <div className="md:col-span-5">
                <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                  AREA {area.number}
                </span>
                <h3 className="font-display mt-2 text-2xl sm:text-3xl font-light tracking-tight text-[var(--fg)]">
                  {area.title}
                </h3>
                <p className="mt-4 text-sm text-[var(--fg-muted)] leading-relaxed font-light">
                  {area.description}
                </p>
              </div>

              {/* Right Column: Key engineering disciplines */}
              <div className="md:col-span-7">
                <div className="space-y-3.5 pt-1">
                  {area.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-[var(--fg)] font-light"
                    >
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Engineering Approach Statements */}
        <div className="mt-20 pt-8" data-reveal>
          <div className="mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border)] pb-4">
            <h3 className="font-display text-xl sm:text-2xl font-light text-[var(--fg)]">
              Engineering Approach & Philosophy
            </h3>
            <span className="mono-tag text-xs text-[var(--fg-muted)]">
              Core Principles in Action
            </span>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {ENGINEERING_APPROACH.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between border-l-2 border-[var(--border)] pl-4 transition-all duration-200 hover:border-[var(--accent)]"
              >
                <div>
                  <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                    0{idx + 1}
                  </span>
                  <h4 className="mt-1 font-display text-base font-medium text-[var(--fg)]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-[var(--fg-muted)] font-light leading-relaxed">
                    {item.statement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
