import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/portfolioData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ArrowLeft, ExternalLink, CheckCircle2, Layers, Cpu, ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Faaz Mirza`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-xs font-medium text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Title Header */}
          <div className="border-b border-[var(--border)] pb-10">
            <div className="flex items-center gap-3">
              <span className="mono-tag rounded-md bg-[var(--accent-soft)] px-2.5 py-1 text-xs text-[var(--accent)] font-semibold">
                PROJECT {project.number}
              </span>
              <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                Selected Engineering Work
              </span>
            </div>

            <h1 className="font-display mt-4 text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[var(--fg)]">
              {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[var(--fg-muted)] font-light leading-relaxed">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-xs font-medium text-[var(--fg)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Technology Stack Pill Bar */}
          <div className="py-6 border-b border-[var(--border)] flex flex-wrap items-center gap-2">
            <span className="mono-tag mr-2 text-xs text-[var(--fg-subtle)]">
              Stack:
            </span>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="mono-tag rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--fg)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Deep Dive Content Sections */}
          <div className="mt-12 space-y-16">
            {/* Overview */}
            <section>
              <h2 className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider mb-3">
                01 / OVERVIEW
              </h2>
              <p className="text-base text-[var(--fg)] font-light leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* Problem & Solution Asymmetric Grid */}
            <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <span className="mono-tag text-xs font-semibold text-rose-500">
                  The Problem
                </span>
                <p className="mt-3 text-sm text-[var(--fg-muted)] font-light leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <span className="mono-tag text-xs font-semibold text-emerald-500">
                  The Engineering Solution
                </span>
                <p className="mt-3 text-sm text-[var(--fg-muted)] font-light leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider mb-4">
                02 / CORE CAPABILITIES & FEATURES
              </h2>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 divide-y divide-[var(--border-subtle)]">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="py-3 flex items-start gap-3 first:pt-0 last:pb-0"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent)] mt-0.5" />
                    <span className="text-sm text-[var(--fg)] font-light leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Architecture */}
            <section>
              <h2 className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider mb-3">
                03 / SYSTEM ARCHITECTURE
              </h2>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-4 w-4 text-[var(--accent)]" />
                  <span className="mono-tag text-xs text-[var(--fg-muted)] font-semibold">
                    Technical Topology
                  </span>
                </div>
                <p className="text-sm text-[var(--fg)] font-light leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            </section>

            {/* Challenges & Decisions */}
            <section>
              <h2 className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider mb-3">
                04 / ENGINEERING CHALLENGES
              </h2>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="h-4 w-4 text-[var(--accent)]" />
                  <span className="mono-tag text-xs text-[var(--fg-muted)] font-semibold">
                    Bottlenecks & Mitigation
                  </span>
                </div>
                <p className="text-sm text-[var(--fg-muted)] font-light leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            </section>

            {/* Outcome */}
            <section className="border-t border-[var(--border)] pt-8">
              <h2 className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider mb-3">
                05 / RESULTS & OUTCOME
              </h2>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-base text-[var(--fg)] font-light leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </section>
          </div>

          {/* Bottom navigation */}
          <div className="mt-20 border-t border-[var(--border)] pt-8 flex items-center justify-between">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-medium text-[var(--fg-muted)] hover:text-[var(--accent)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Projects</span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-xs font-medium text-[var(--accent)] hover:underline"
            >
              <span>Discuss a Similar Project →</span>
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
