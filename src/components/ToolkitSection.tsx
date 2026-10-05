"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOLKIT_GROUPS } from "@/data/portfolioData";
import { MarqueeTicker } from "./interactive/MarqueeTicker";
import { ArrowUpRight } from "lucide-react";

const ALL_SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis",
  "Neon", "REST APIs", "JWT Auth", "Stripe", "Tailwind CSS", "JavaScript",
  "Python", "Git", "Vercel", "Prisma", "SQL", "HTML", "CSS", "Web Vitals",
];

const SECOND_ROW = [
  "Full-Stack Engineering", "Clean Architecture", "Component Design",
  "Database Schemas", "API Security", "Performance Budgets",
  "Serverless Functions", "Auth Systems", "UI Systems", "Core Web Vitals",
];

export function ToolkitSection() {
  const [activeSkill, setActiveSkill] = useState<{ name: string; role: string } | null>(null);

  return (
    <section id="skills" className="py-24 border-b border-[var(--border)]">
      {/* Marquee Ticker Strip — subtle premium touch */}
      <div className="mb-16 py-4 border-y border-[var(--border-subtle)] overflow-hidden">
        <MarqueeTicker items={ALL_SKILLS} speed={35} />
        <MarqueeTicker items={SECOND_ROW} speed={45} reverse className="mt-2.5" />
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4" data-reveal>
          <div>
            <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
              04 / TOOLKIT
            </span>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-normal tracking-tight text-[var(--fg)]">
              Technologies I Work With
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="mono-tag text-xs text-[var(--fg-muted)]">
              {activeSkill ? (
                <span className="text-[var(--accent)] transition-colors">
                  {activeSkill.name} → {activeSkill.role}
                </span>
              ) : (
                <span>Hover any technology to reveal its role</span>
              )}
            </div>
            <Link
              href="/skills"
              className="inline-flex items-center gap-1 text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Full Skills Page <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOOLKIT_GROUPS.map((group) => (
            <div
              key={group.category}
              className="card-hover-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200"
              data-reveal
              data-reveal-delay="70"
            >
              <div className="mb-5 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <h3 className="mono-tag text-xs font-semibold text-[var(--fg-muted)] tracking-wider">
                  {group.category}
                </h3>
                <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                  {group.skills.length} tools
                </span>
              </div>

              <div className="space-y-2.5">
                {group.skills.map((skill) => {
                  const isCurrent = activeSkill?.name === skill.name;

                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setActiveSkill(skill)}
                      onFocus={() => setActiveSkill(skill)}
                      onBlur={() => setActiveSkill(null)}
                      onMouseEnter={() => setActiveSkill(skill)}
                      onMouseLeave={() => setActiveSkill(null)}
                      className={`tech-item group flex min-h-11 w-full flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg px-3 py-2.5 text-left transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                        isCurrent
                          ? "bg-[var(--accent-soft)] border border-[var(--accent-border)]"
                          : "hover:bg-[var(--bg-subtle)] border border-transparent"
                      }`}
                    >
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isCurrent
                            ? "text-[var(--accent)]"
                            : "text-[var(--fg)] group-hover:text-[var(--fg)]"
                        }`}
                      >
                        {skill.name}
                      </span>
                      <span className={`min-w-0 max-w-full whitespace-normal text-left text-[11px] font-light transition-colors sm:max-w-[130px] sm:truncate sm:text-right ${
                        isCurrent ? "text-[var(--accent)]" : "text-[var(--fg-subtle)]"
                      }`}>
                        {skill.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
