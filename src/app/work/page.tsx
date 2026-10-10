"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ArrowUpRight, Filter } from "lucide-react";

export default function WorkPage() {
  const [filter, setFilter] = useState<string>("All");

  const filterOptions = ["All", "Next.js", "React", "Node.js", "PostgreSQL"];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === "All") return true;
    return proj.technologies.some((t) =>
      t.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {/* Header */}
          <div className="mb-14 border-b border-[var(--border)] pb-10">
            <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
              SELECTED WORK
            </span>
            <h1 className="font-display mt-3 text-4xl sm:text-5xl font-normal tracking-tight text-[var(--fg)]">
              Full-Stack Applications & Systems
            </h1>
            <p className="mt-4 max-w-2xl text-base text-[var(--fg-muted)] font-light leading-relaxed">
              A curated catalog of production-quality software projects emphasizing
              clean architecture, resilient database schemas, and intuitive user experiences.
            </p>

            {/* Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 mono-tag text-xs text-[var(--fg-subtle)] mr-2">
                <Filter className="h-3.5 w-3.5" /> Filter Stack:
              </span>
              {filterOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFilter(opt)}
                  className={`mono-tag rounded-lg px-3 py-1.5 text-xs transition-all ${
                    filter === opt
                      ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-xs"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--accent)]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className="space-y-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--accent-border)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--fg-muted)]">{project.tagline}</span>
                  </div>
                  <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                    Production Architecture
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                  <div className="lg:col-span-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-[var(--fg)]">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm text-[var(--fg-muted)] font-light leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="mono-tag rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-end pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--fg)] px-4 py-2.5 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-16 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <h3 className="font-display text-lg font-normal text-[var(--fg)]">
              Interested in collaborating on a custom software project?
            </h3>
            <p className="mt-1 text-xs text-[var(--fg-muted)] font-light">
              I am available for full-stack engineering contracts, architecture consultations, and technical roles.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
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
