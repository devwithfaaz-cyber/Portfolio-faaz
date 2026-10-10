"use client";

import React from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/portfolioData";
import { ArrowUpRight, Database, Server, ShieldCheck, Zap } from "lucide-react";
import { ProjectTilt } from "./interactive/ProjectTilt";
import { Magnetic } from "./interactive/Magnetic";
import { TextScramble } from "./interactive/TextScramble";

export function ProjectShowcase() {
  const p1 = PROJECTS[0];
  const p2 = PROJECTS[1];
  const p3 = PROJECTS[2];

  return (
    <section id="work" className="py-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4" data-reveal>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[var(--fg)]">
              <TextScramble text="Featured Projects" duration={500} className="block" />
            </h2>
          </div>
          <p className="mono-tag text-xs text-[var(--fg-muted)]">
            Full-Stack Systems & Architecture
          </p>
        </div>

        {/* Project 01: Image Left, Content Right */}
        <div className="project-card mb-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 transition-all duration-300 hover:border-[var(--accent-border)]" data-cursor="view" data-reveal data-reveal-delay="60">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Visual Left */}
            <div className="lg:col-span-7">
              <ProjectTilt>
                <div data-cursor="explore" className="project-visual cursor-pointer">
                  <Project01Visual />
                </div>
              </ProjectTilt>
            </div>

            {/* Content Right */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                    PROJECT {p1.number}
                  </span>
                  <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                    Full-Stack Platform
                  </span>
                </div>

                <h3 className="font-display mt-3 text-2xl sm:text-3xl font-normal tracking-tight text-[var(--fg)]">
                  {p1.title}
                </h3>

                <p className="mt-4 text-sm text-[var(--fg-muted)] leading-relaxed font-light">
                  {p1.description}
                </p>

                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {p1.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tech-chip mono-tag rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <Magnetic strength={0.2} maxDistance={5}>
                  <Link
                    href={`/projects/${p1.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--fg)] px-4 py-2 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Magnetic>

              </div>
            </div>
          </div>
        </div>

        {/* Project 02: Content Left, Image Right */}
        <div className="project-card mb-24 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 transition-all duration-300 hover:border-[var(--accent-border)]" data-cursor="view" data-reveal data-reveal-delay="60">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Content Left */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                    PROJECT {p2.number}
                  </span>
                  <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
                    Cloud Engine
                  </span>
                </div>

                <h3 className="font-display mt-3 text-2xl sm:text-3xl font-normal tracking-tight text-[var(--fg)]">
                  {p2.title}
                </h3>

                <p className="mt-4 text-sm text-[var(--fg-muted)] leading-relaxed font-light">
                  {p2.description}
                </p>

                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {p2.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tech-chip mono-tag rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <Magnetic strength={0.2} maxDistance={5}>
                  <Link
                    href={`/projects/${p2.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--fg)] px-4 py-2 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </Magnetic>

              </div>
            </div>

            {/* Visual Right */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <ProjectTilt>
                <div data-cursor="explore" className="project-visual cursor-pointer">
                  <Project02Visual />
                </div>
              </ProjectTilt>
            </div>
          </div>
        </div>

        {/* Project 03: Large Visual Composition */}
        <div className="project-card rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 transition-all duration-300 hover:border-[var(--accent-border)]" data-cursor="view" data-reveal data-reveal-delay="60">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
            <div>
              <span className="mono-tag text-xs font-semibold text-[var(--accent)]">
                PROJECT {p3.number}
              </span>
              <h3 className="font-display mt-2 text-2xl sm:text-3xl font-normal tracking-tight text-[var(--fg)]">
                {p3.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2} maxDistance={5}>
                <Link
                  href={`/projects/${p3.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--fg)] px-4 py-2 text-xs font-medium text-[var(--bg)] transition-all hover:bg-[var(--accent)] hover:text-white"
                >
                  <span>Details</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Magnetic>

            </div>
          </div>

          <p className="max-w-3xl text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed font-light mb-8">
            {p3.description}
          </p>

          {/* Large Composition Visual */}
          <ProjectTilt>
              <div data-cursor="explore" className="project-visual cursor-pointer">
              <Project03Visual />
            </div>
          </ProjectTilt>

          {/* Tech Badges */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-[var(--border-subtle)]">
            {p3.technologies.map((tech) => (
              <span
                key={tech}
                className="tech-chip mono-tag rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Sophisticated CSS/SVG-based UI & Architecture Visuals for Projects

function Project01Visual() {
  return (
    <div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 sm:p-5 transition-transform duration-300 hover:scale-[1.01]">
      {/* Mock Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="mono-tag ml-2 break-all text-[10px] text-[var(--fg-muted)]">
            ai-analyzer/stream.ts
          </span>
        </div>
        <span className="mono-tag text-right text-[10px] font-semibold text-emerald-500">
          99.8% AST Efficiency
        </span>
      </div>

      {/* Code & Telemetry Grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-xs">
          <div className="flex items-center justify-between text-[var(--fg-subtle)] mb-2">
            <span className="mono-tag text-[10px]">Parser Latency</span>
            <span className="mono-tag text-[10px] text-emerald-500">42ms</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] text-[var(--fg-muted)]">
            <p className="text-[var(--accent)]">const ast = parse(source);</p>
            <p>analyzeComplexity(ast);</p>
            <p className="text-emerald-500">✓ No memory leaks found</p>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-xs">
          <div className="flex items-center justify-between text-[var(--fg-subtle)] mb-2">
            <span className="mono-tag text-[10px]">PostgreSQL Index</span>
            <span className="mono-tag text-[10px] text-[var(--accent)]">B-Tree</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-[var(--fg-muted)]">
            <p>SELECT id, score</p>
            <p>FROM code_audits</p>
            <p className="text-[var(--fg-subtle)]">WHERE org_id = $1;</p>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Bars */}
      <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--fg-muted)]">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-amber-500" />
            Tokens processed: 28,400/sec
          </span>
          <span className="mono-tag text-[10px] text-[var(--fg-subtle)]">
            Next.js SSR
          </span>
        </div>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border-subtle)]">
          <div className="h-full w-[84%] bg-[var(--accent)] transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}

function Project02Visual() {
  return (
    <div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 sm:p-5 transition-transform duration-300 hover:scale-[1.01]">
      {/* Mock Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Server className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span className="mono-tag break-words text-[10px] text-[var(--fg-muted)]">
            redis-cluster:6379 · stripe-gateway
          </span>
        </div>
        <span className="mono-tag text-[10px] text-emerald-500 font-semibold">
          HOLD LOCK 300s
        </span>
      </div>

      {/* Multi-tenant Flow */}
      <div className="mt-4 space-y-2.5">
        <div className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-xs">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <Database className="h-3.5 w-3.5 text-[var(--fg-subtle)]" />
            <div className="min-w-0">
              <p className="font-medium text-[var(--fg)]">Atomic Inventory Lease</p>
              <p className="break-words text-[11px] text-[var(--fg-muted)]">Redis SETNX key with automatic expiry</p>
            </div>
          </div>
          <span className="mono-tag rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-500 font-semibold">
            ACQUIRED
          </span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-xs">
          <div className="flex min-w-0 flex-1 items-start gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
            <div className="min-w-0">
              <p className="font-medium text-[var(--fg)]">Stripe Idempotent Webhook</p>
              <p className="break-words text-[11px] text-[var(--fg-muted)]">payment_intent.succeeded signature match</p>
            </div>
          </div>
          <span className="mono-tag rounded bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-500 font-semibold">
            VERIFIED
          </span>
        </div>
      </div>

      {/* Throughput Metric */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 text-xs">
        <span className="text-[var(--fg-muted)]">Ledger Reconciliation:</span>
        <span className="break-words font-mono text-[11px] text-[var(--fg)]">Zero Double-Spend Margin</span>
      </div>
    </div>
  );
}

function Project03Visual() {
  return (
    <div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5 sm:p-6 transition-transform duration-300 hover:scale-[1.01]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Module 1: Architecture */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <span className="mono-tag text-[10px] text-[var(--accent)] font-semibold">
            Architecture
          </span>
          <h4 className="mt-2 text-sm font-medium text-[var(--fg)]">
            Neon Serverless PostgreSQL
          </h4>
          <p className="mt-1 text-xs text-[var(--fg-muted)] font-light">
            Instant branching with edge connection pooling and typed schemas.
          </p>
          <div className="mt-3 font-mono text-[10px] text-[var(--fg-subtle)]">
            POOL: 10 connections active
          </div>
        </div>

        {/* Module 2: Security */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <span className="mono-tag text-[10px] text-emerald-500 font-semibold">
            Security
          </span>
          <h4 className="mt-2 text-sm font-medium text-[var(--fg)]">
            JWT Stateless Session
          </h4>
          <p className="mt-1 text-xs text-[var(--fg-muted)] font-light">
            HMAC-SHA256 signature verification in Next.js edge middleware.
          </p>
          <div className="mt-3 font-mono text-[10px] text-[var(--fg-subtle)]">
            AUTH: HttpOnly Cookie
          </div>
        </div>

        {/* Module 3: CMS Engine */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
          <span className="mono-tag text-[10px] text-amber-500 font-semibold">
            Admin Portal
          </span>
          <h4 className="mt-2 text-sm font-medium text-[var(--fg)]">
            Dynamic Project CRUD
          </h4>
          <p className="mt-1 text-xs text-[var(--fg-muted)] font-light">
            Server-side revalidation upon article or project publishing.
          </p>
          <div className="mt-3 font-mono text-[10px] text-[var(--fg-subtle)]">
            ROUTE: /admin
          </div>
        </div>
      </div>
    </div>
  );
}
