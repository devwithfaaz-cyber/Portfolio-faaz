import React from "react";
import Link from "next/link";
import { ENGINEERING_AREAS, ENGINEERING_APPROACH } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { Check, Database, Globe, Zap, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering & Architecture — Faaz Mirza",
  description:
    "Engineering principles, backend system design, database schemas, and modern frontend practices by Faaz Mirza.",
};

const SYSTEM_PRINCIPLES = [
  {
    icon: Database,
    title: "Relational Integrity & Schema Discipline",
    desc: "Strict foreign key constraints, targeted indexes, and transaction isolation levels guarantee data correctness before it reaches client applications.",
  },
  {
    icon: Globe,
    title: "Server Component Boundary Management",
    desc: "Pushing data fetching to the edge and server boundaries keeps client bundles small, rendering speeds fast, and API secrets safe.",
  },
  {
    icon: Zap,
    title: "Core Web Vitals as Non-Negotiable Budgets",
    desc: "Sub-100ms Interaction to Next Paint (INP), zero Cumulative Layout Shift (CLS), and fast Largest Contentful Paint (LCP) through asset optimization.",
  },
  {
    icon: ShieldCheck,
    title: "Defensive API Design & Validation",
    desc: "Every API endpoint parses and validates incoming payloads on the server, enforcing strong types and preventing malformed inputs.",
  },
];

export default function EngineeringPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {/* Header */}
          <div className="mb-14 border-b border-[var(--border)] pb-10">
            <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
              03 / ENGINEERING
            </span>
            <h1 className="font-display mt-3 text-4xl sm:text-5xl font-normal tracking-tight text-[var(--fg)]">
              Full-Stack Engineering & Architecture
            </h1>
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-[var(--fg-muted)] font-light leading-relaxed">
              &ldquo;From high-performance React/Next.js interfaces to robust PostgreSQL database design and serverless Node.js APIs.&rdquo;
            </p>
          </div>

          {/* Core System Architectural Pillars */}
          <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SYSTEM_PRINCIPLES.map((sp, idx) => {
              const Icon = sp.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent-border)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-medium text-[var(--fg)]">
                    {sp.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--fg-muted)] font-light leading-relaxed">
                    {sp.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* The 3 Editorial Engineering Areas */}
          <div className="mb-20">
            <div className="mb-8 border-b border-[var(--border)] pb-4">
              <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                DETAILED DOMAIN SPECIALIZATIONS
              </span>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-light text-[var(--fg)]">
                Core Domains of Execution
              </h2>
            </div>

            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {ENGINEERING_AREAS.map((area) => (
                <div
                  key={area.number}
                  className="py-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 items-start"
                >
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
          </div>

          {/* Philosophy Statements */}
          <div className="mb-16">
            <div className="mb-8 border-b border-[var(--border)] pb-4">
              <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                ENGINEERING ETHOS
              </span>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-light text-[var(--fg)]">
                Philosophy in Practice
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ENGINEERING_APPROACH.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <span className="mono-tag text-[10px] text-[var(--accent)] font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className="mt-2 font-display text-base font-medium text-[var(--fg)]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-[var(--fg-muted)] font-light leading-relaxed">
                    {item.statement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-3 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
            >
              <span>View Technical Skills & Toolkit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>See Projects Built With These Standards →</span>
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
