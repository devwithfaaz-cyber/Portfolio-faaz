"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { NetworkDiagram } from "./NetworkDiagram";
import { TextScramble } from "./interactive/TextScramble";
import { NumberCounter } from "./interactive/NumberCounter";
import { Magnetic } from "./interactive/Magnetic";
import { ArrowRight, Mail, User, MapPin } from "lucide-react";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[var(--border)]">
      {/* Background subtle technical grid */}
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8" data-reveal>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Headline & Bio */}
          <div className="lg:col-span-7">
            {/* Meta bar: Location & Availability */}
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[var(--fg-muted)] shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="ping-minimal absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-medium">{PERSONAL_INFO.availability}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[var(--fg-muted)] shadow-2xs">
                <MapPin className="h-3 w-3 text-[var(--fg-subtle)]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Editorial Greeting & Name with TextScramble */}
            <div className="space-y-1">
              <p className="mono-tag text-xs font-semibold text-[var(--fg-muted)]">
                Hello, I&apos;m
              </p>
              <h1 className="hero-title font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[var(--fg)]">
                <TextScramble text="Faaz Mirza" duration={600} />
                <span className="text-[var(--accent)]">.</span>
              </h1>
            </div>

            {/* Role designation */}
            <h2 className="mt-3 text-base sm:text-lg font-medium text-[var(--fg-muted)]">
              {PERSONAL_INFO.role}
            </h2>

            {/* Primary Introduction */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-[var(--fg-muted)] leading-relaxed font-light">
              &ldquo;{PERSONAL_INFO.introduction}&rdquo;
            </p>

            {/* Magnetic CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
              <Magnetic strength={0.25} maxDistance={7}>
                <button
                  type="button"
                  onClick={() => scrollTo("work")}
                  className="interactive-button interactive-button--primary group inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-3 text-xs font-medium text-[var(--bg)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    View My Projects
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </button>
              </Magnetic>

              <Magnetic strength={0.25} maxDistance={7}>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="interactive-button group inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--fg)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    Get in Touch
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </Magnetic>

              <button
                type="button"
                onClick={() => scrollTo("about")}
                className="animated-underline inline-flex items-center gap-1.5 px-3 py-3 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] focus:outline-none"
              >
                <User className="h-3.5 w-3.5" />
                <span>More About Me →</span>
              </button>
            </div>
          </div>

          {/* Right Column: Original interactive topology */}
          <div className="lg:col-span-5" data-cursor="explore">
            <NetworkDiagram />
          </div>
        </div>

        {/* Hero Stats: Single-trigger Counting Numbers */}
        <div className="mt-16 sm:mt-20 border-t border-[var(--border)] pt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
            <div className="pt-4 sm:pt-0 sm:pr-6">
              <span className="font-display text-4xl sm:text-5xl font-light tracking-tight text-[var(--fg)]">
                <NumberCounter value={PERSONAL_INFO.experienceYears} duration={800} />
              </span>
              <p className="mono-tag mt-2 text-xs text-[var(--fg-muted)]">
                Years Coding
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:px-6">
              <span className="font-display text-4xl sm:text-5xl font-light tracking-tight text-[var(--fg)]">
                <NumberCounter value={PERSONAL_INFO.projectsCount} duration={1000} />
              </span>
              <p className="mono-tag mt-2 text-xs text-[var(--fg-muted)]">
                Projects Built
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-6">
              <span className="font-display text-4xl sm:text-5xl font-light tracking-tight text-[var(--fg)]">
                <NumberCounter value={PERSONAL_INFO.techCount} duration={900} />
              </span>
              <p className="mono-tag mt-2 text-xs text-[var(--fg-muted)]">
                Technologies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
