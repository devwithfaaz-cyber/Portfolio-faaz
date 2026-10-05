"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOLKIT_GROUPS } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { Check, Layers, Cpu, ShieldCheck, Terminal, ArrowRight } from "lucide-react";

const ARCHITECTURE_CAPABILITIES = [
  {
    title: "Full-Stack System Design",
    points: [
      "Decoupled client and server boundaries",
      "Stateless JWT authorization with secure cookies",
      "Neon serverless PostgreSQL connection pooling",
      "Redis in-memory caching and atomic key leases",
    ],
  },
  {
    title: "Modern Web Performance",
    points: [
      "Zero layout shift typography and dynamic fonts",
      "Strict bundle optimization with tree-shaking",
      "Server-side rendering (SSR) and SSG page compilation",
      "Accessible dark/light color systems without FOUC",
    ],
  },
  {
    title: "Code Quality & Standards",
    points: [
      "End-to-end type safety using TypeScript interfaces",
      "Defensive schema validation on all API inputs",
      "Clean Git commit conventions and semantic versioning",
      "Modular components adhering to single-responsibility",
    ],
  },
];

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; role: string } | null>(null);

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {/* Header */}
          <div className="mb-14 border-b border-[var(--border)] pb-10">
            <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
              04 / TOOLKIT & SKILLS
            </span>
            <h1 className="font-display mt-3 text-4xl sm:text-5xl font-normal tracking-tight text-[var(--fg)]">
              Technologies & Technical Capabilities
            </h1>
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-[var(--fg-muted)] font-light leading-relaxed">
              A comprehensive view of the tools, frameworks, databases, and architectural standards
              I leverage to build clean, maintainable, and scalable digital systems.
            </p>

            {selectedSkill && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-2 text-xs text-[var(--accent)] font-medium">
                <Terminal className="h-3.5 w-3.5" />
                <span>Selected: {selectedSkill.name} — {selectedSkill.role}</span>
              </div>
            )}
          </div>

          {/* Grouped Technology Grid */}
          <div className="mb-20">
            <div className="mb-8 flex items-baseline justify-between border-b border-[var(--border)] pb-4">
              <h2 className="font-display text-2xl font-light text-[var(--fg)]">
                Core Technology Stack
              </h2>
              <span className="mono-tag text-xs text-[var(--fg-muted)]">
                Click or hover any tool
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {TOOLKIT_GROUPS.map((group) => (
                <div
                  key={group.category}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent-border)]"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                    <h3 className="mono-tag text-xs font-semibold text-[var(--fg-muted)] tracking-wider">
                      {group.category}
                    </h3>
                    <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                      {group.skills.length} tools
                    </span>
                  </div>

                  <div className="space-y-3">
                    {group.skills.map((skill) => {
                      const isSelected = selectedSkill?.name === skill.name;
                      return (
                        <div
                          key={skill.name}
                          onClick={() => setSelectedSkill(skill)}
                          onMouseEnter={() => setSelectedSkill(skill)}
                          className={`group flex items-center justify-between rounded-lg p-2.5 transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-[var(--accent-soft)]"
                              : "hover:bg-[var(--bg-subtle)]"
                          }`}
                        >
                          <span
                            className={`text-sm font-medium transition-colors ${
                              isSelected
                                ? "text-[var(--accent)]"
                                : "text-[var(--fg)]"
                            }`}
                          >
                            {skill.name}
                          </span>
                          <span className="text-xs text-[var(--fg-subtle)] font-light text-right">
                            {skill.role}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Capabilities */}
          <div className="mb-16">
            <div className="mb-8 border-b border-[var(--border)] pb-4">
              <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                ENGINEERING PRACTICES
              </span>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-light text-[var(--fg)]">
                Architectural Standards
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {ARCHITECTURE_CAPABILITIES.map((cap, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
                >
                  <h3 className="font-display text-base font-medium text-[var(--fg)]">
                    {cap.title}
                  </h3>
                  <div className="mt-4 space-y-2.5">
                    {cap.points.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--fg-muted)] font-light">
                        <Check className="h-3 w-3 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
            <Link
              href="/education"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-3 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
            >
              <span>Explore Education & Certifications</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Discuss Technical Requirements →</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ThemeToggle />
      <BackToTop />
    </>
  );
}
