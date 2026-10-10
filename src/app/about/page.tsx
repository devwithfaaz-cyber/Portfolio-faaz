import React from "react";
import Link from "next/link";
import { PERSONAL_INFO, PRINCIPLES } from "@/data/portfolioData";
import { ProfileImage } from "@/components/ProfileImage";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { TextScramble } from "@/components/interactive/TextScramble";
import { ArrowRight, Code, Database, Sparkles, Terminal, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Faaz Mirza",
  description:
    "Learn more about Faaz Mirza, Software Developer & Creative Problem Solver dedicated to building high-performance full-stack applications.",
};

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Analytical Problem Deconstruction",
    desc: "Before writing any code, I deconstruct ambiguous business requirements into modular schemas, API specifications, and database entity relationships.",
    icon: Terminal,
  },
  {
    step: "02",
    title: "Database-First & Strict Typing",
    desc: "A solid PostgreSQL schema paired with TypeScript interfaces prevents whole classes of runtime bugs and keeps backend queries fast and predictable.",
    icon: Database,
  },
  {
    step: "03",
    title: "Pixel-Perfect, Accessible Interfaces",
    desc: "Crafting fluid layouts with modern semantic HTML and responsive design tokens, testing across light and dark color modes.",
    icon: Code,
  },
  {
    step: "04",
    title: "Optimization & Core Web Vitals",
    desc: "Profiling bundle payloads, reducing DOM depth, tuning SQL queries with indexes, and ensuring swift server responses.",
    icon: Sparkles,
  },
];

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {/* Header */}
          <div className="mb-14 border-b border-[var(--border)] pb-10">
            <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
              ABOUT FAAZ MIRZA
            </span>
            <h1 className="font-display mt-3 text-4xl sm:text-5xl font-normal tracking-tight text-[var(--fg)]">
              <TextScramble text="Crafting efficient, scalable digital products with thoughtful code." duration={650} className="block" />
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[var(--fg-muted)]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
                <MapPin className="h-3 w-3 text-[var(--fg-subtle)]" />
                {PERSONAL_INFO.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="ping-minimal absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                {PERSONAL_INFO.availability}
              </span>
            </div>
          </div>

          {/* Narrative Story Section */}
          <div className="grid grid-cols-1 gap-10 pb-16 border-b border-[var(--border)] md:grid-cols-12 md:gap-14 md:items-center">
            <div className="order-2 space-y-6 md:order-1 md:col-span-7" data-reveal data-reveal-delay="100">
              <p className="font-display text-2xl font-light text-[var(--fg)] leading-relaxed">
                &ldquo;{PERSONAL_INFO.about}&rdquo;
              </p>
              <div className="space-y-6 text-base text-[var(--fg-muted)] font-light leading-relaxed">
                <p>
                  My passion for software engineering started with curiosity about how complex
                  systems operate beneath the surface. From dissecting relational databases to
                  building reactive client applications, I treat code as both a logical puzzle
                  and a creative craft.
                </p>
                <p>
                  Rather than jumping to bloated libraries or superficial quick fixes, I emphasize
                  foundational computer science principles: clean architecture, deterministic state
                  management, normalized data schemas, and respectful user interface ergonomics.
                </p>
                <p>
                  I thrive in environments that challenge analytical thinking, where quality is
                  judged by performance metrics, maintainability, and real-world reliability.
                </p>
              </div>
            </div>

            <div className="order-1 flex justify-center md:order-2 md:col-span-5 md:justify-end" data-reveal>
              <ProfileImage className="w-64 sm:w-72 md:w-full md:max-w-[420px]" />
            </div>
          </div>

          {/* Core Principles */}
          <div className="mt-16 pb-16 border-b border-[var(--border)]">
            <div className="mb-10 flex items-baseline justify-between">
              <div>
                <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                  ENGINEERING BASELINE
                </span>
                <h2 className="font-display mt-2 text-2xl sm:text-3xl font-light text-[var(--fg)]">
                  <TextScramble text="Core Personal Principles" duration={550} className="block" />
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.number}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--accent-border)]"
                >
                  <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                    {principle.number}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-medium text-[var(--fg)]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--fg-muted)] font-light leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow & Methodologies */}
          <div className="mt-16 pb-16 border-b border-[var(--border)]">
            <div className="mb-10">
              <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                HOW I WORK
              </span>
              <h2 className="font-display mt-2 text-2xl sm:text-3xl font-light text-[var(--fg)]">
                <TextScramble text="Development Methodology" duration={550} className="block" />
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {WORKFLOW_STEPS.map((wf) => {
                const Icon = wf.icon;
                return (
                  <div
                    key={wf.step}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="mono-tag text-xs font-bold text-[var(--fg-subtle)]">
                        STEP {wf.step}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--accent)]" />
                    </div>
                    <h3 className="font-display mt-3 text-lg font-medium text-[var(--fg)]">
                      {wf.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[var(--fg-muted)] font-light leading-relaxed">
                      {wf.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTAs */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-3 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Get in Touch →</span>
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
