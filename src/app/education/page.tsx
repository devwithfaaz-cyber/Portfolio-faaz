import React from "react";
import Link from "next/link";
import { EDUCATION, CERTIFICATIONS } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education & Credentials — Faaz Mirza",
  description:
    "Academic background at Informatics Group of Colleges and verified credentials of Faaz Mirza, Software Developer.",
};

const COURSEWORK = [
  {
    topic: "Computer Science",
    details: "Foundations of computational thinking, boolean logic, control structures, and software syntax.",
  },
  {
    topic: "Mathematics",
    details: "Analytical calculus, algebra, logic proofs, and matrix calculations underpinning software algorithms.",
  },
  {
    topic: "Physics",
    details: "Mechanics, electromagnetism, and systems thinking that informs real-world problem decomposition.",
  },
];

export default function EducationPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {/* Header */}
          <div className="mb-14 border-b border-[var(--border)] pb-10">
            <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
              05 / EDUCATION & CREDENTIALS
            </span>
            <h1 className="font-display mt-3 text-4xl sm:text-5xl font-normal tracking-tight text-[var(--fg)]">
              Academic Foundations & Continuous Learning
            </h1>
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-[var(--fg-muted)] font-light leading-relaxed">
              Curiosity-driven education pairing structured academic problem solving with
              rigorous, hands-on software development credentials.
            </p>
          </div>

          {/* Academic Background */}
          <div className="mb-20">
            <div className="mb-8 border-b border-[var(--border)] pb-4">
              <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                FORMAL ACADEMICS
              </span>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-light text-[var(--fg)]">
                Institutional Education
              </h2>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
              {EDUCATION.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-subtle)]">
                    <span className="inline-flex items-center gap-1 mono-tag">
                      <Calendar className="h-3.5 w-3.5" />
                      {edu.period}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {edu.location}
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-2xl sm:text-3xl font-normal text-[var(--fg)]">
                    {edu.degree}
                  </h3>

                  <p className="mt-1 text-base font-medium text-[var(--accent)]">
                    {edu.institution}
                  </p>

                  <div className="mt-6">
                    <span className="mono-tag text-xs text-[var(--fg-subtle)] block mb-3">
                      Core Academic Disciplines:
                    </span>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {COURSEWORK.map((cw, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4"
                        >
                          <h4 className="font-display text-sm font-medium text-[var(--fg)]">
                            {cw.topic}
                          </h4>
                          <p className="mt-1.5 text-xs text-[var(--fg-muted)] font-light leading-relaxed">
                            {cw.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Certifications */}
          <div className="mb-20">
            <div className="mb-8 border-b border-[var(--border)] pb-4">
              <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                INDUSTRY LEARNING
              </span>
              <h2 className="font-display mt-1 text-2xl sm:text-3xl font-light text-[var(--fg)]">
                Verified Certifications
              </h2>
            </div>

            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors hover:bg-[var(--bg-subtle)] px-3 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] mt-0.5">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                        {cert.name}
                      </h3>
                      {cert.instructor && (
                        <p className="text-xs text-[var(--fg-subtle)] font-light mt-0.5">
                          Taught by: {cert.instructor}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mono-tag text-xs font-semibold text-[var(--fg-muted)] sm:text-right">
                    {cert.platform}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Learning Tenet */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <div className="flex items-center gap-2 text-xs text-[var(--accent)] mono-tag font-semibold mb-2">
              <BookOpen className="h-4 w-4" />
              <span>Principle 04 In Action</span>
            </div>
            <h3 className="font-display text-xl font-normal text-[var(--fg)]">
              Continuous Technical Growth
            </h3>
            <p className="mt-2 text-sm text-[var(--fg-muted)] font-light leading-relaxed max-w-3xl">
              Software engineering is dynamic. I allocate dedicated weekly focus to examining
              PostgreSQL execution plans, edge runtime capabilities, TypeScript type-level programming,
              and distributed state patterns to keep my engineering tools sharp and modern.
            </p>
          </div>

          {/* Bottom CTAs */}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-3 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
            >
              <span>Get in Touch for Opportunities</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-medium text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span>Review Real-World Projects →</span>
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
