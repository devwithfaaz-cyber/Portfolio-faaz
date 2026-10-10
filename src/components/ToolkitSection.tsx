"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOLKIT_GROUPS } from "@/data/portfolioData";
import { MarqueeTicker } from "./interactive/MarqueeTicker";
import { TextScramble } from "./interactive/TextScramble";
import { ArrowUpRight } from "lucide-react";

const ALL_SKILLS = [
  { label: "React", className: "border-[#61DAFB]/30 bg-[#61DAFB]/14 text-[#7CD8FF]" },
  { label: "Next.js", className: "border-[#111827]/10 bg-[#111827] text-white" },
  { label: "TypeScript", className: "border-[#3178C6]/30 bg-[#3178C6] text-white" },
  { label: "Node.js", className: "border-[#68A063]/30 bg-[#68A063] text-[#F5FFF3]" },
  { label: "PostgreSQL", className: "border-[#336791]/30 bg-[#336791] text-white" },
  { label: "Redis", className: "border-[#DC382D]/30 bg-[#DC382D] text-white" },
  { label: "Neon", className: "border-[#52C5FF]/30 bg-[#52C5FF] text-[#081A2B]" },
  { label: "REST APIs", className: "border-[#7C3AED]/30 bg-[#7C3AED]/90 text-white" },
  { label: "JWT Auth", className: "border-[#F59E0B]/30 bg-[#F59E0B] text-[#1F2937]" },
  { label: "Stripe", className: "border-[#635BFF]/30 bg-[#635BFF] text-white" },
  { label: "Tailwind CSS", className: "border-[#06B6D4]/30 bg-[#06B6D4] text-[#062B35]" },
  { label: "JavaScript", className: "border-[#F7DF1E]/50 bg-[#F7DF1E] text-[#111827]" },
  { label: "Python", className: "border-[#3776AB]/30 bg-[#3776AB] text-white" },
  { label: "Git", className: "border-[#F05032]/30 bg-[#F05032] text-white" },
  { label: "Vercel", className: "border-[#111827]/10 bg-[#111827] text-white" },
  { label: "Prisma", className: "border-[#2D3748]/20 bg-[#2D3748] text-white" },
  { label: "SQL", className: "border-[#5B21B6]/30 bg-[#5B21B6] text-white" },
  { label: "HTML", className: "border-[#E34F26]/30 bg-[#E34F26] text-white" },
  { label: "CSS", className: "border-[#1572B6]/30 bg-[#1572B6] text-white" },
  { label: "Web Vitals", className: "border-[#14B8A6]/30 bg-[#14B8A6] text-[#072020]" },
];

const SECOND_ROW = [
  { label: "Full-Stack Engineering", className: "border-[#A855F7]/30 bg-[#A855F7]/90 text-white" },
  { label: "Clean Architecture", className: "border-[#10B981]/30 bg-[#10B981] text-[#062B20]" },
  { label: "Component Design", className: "border-[#F97316]/30 bg-[#F97316] text-white" },
  { label: "Database Schemas", className: "border-[#38BDF8]/30 bg-[#38BDF8] text-[#082F49]" },
  { label: "API Security", className: "border-[#F43F5E]/30 bg-[#F43F5E] text-white" },
  { label: "Performance Budgets", className: "border-[#22C55E]/30 bg-[#22C55E] text-[#052E16]" },
  { label: "Serverless Functions", className: "border-[#8B5CF6]/30 bg-[#8B5CF6] text-white" },
  { label: "Auth Systems", className: "border-[#F59E0B]/30 bg-[#F59E0B] text-[#1F2937]" },
  { label: "UI Systems", className: "border-[#EC4899]/30 bg-[#EC4899] text-white" },
  { label: "Core Web Vitals", className: "border-[#2DD4BF]/30 bg-[#2DD4BF] text-[#052E2A]" },
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
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[var(--fg)]">
              <TextScramble text="Technologies I Work With" duration={550} className="block" />
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
