"use client";

import React from "react";
import { EDUCATION, CERTIFICATIONS } from "@/data/portfolioData";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="py-24 border-b border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-16" data-reveal>
          <span className="mono-tag text-xs font-semibold text-[var(--accent)] tracking-wider">
            05 / EDUCATION
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-normal tracking-tight text-[var(--fg)]">
            Education & Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Education Timeline (Left Column) */}
          <div className="lg:col-span-6" data-reveal data-reveal-delay="70">
            <div className="mb-6 flex items-center gap-2 text-xs text-[var(--fg-muted)]">
              <GraduationCap className="h-4 w-4 text-[var(--accent)]" />
              <span className="mono-tag tracking-wider font-semibold">
                Academic Background
              </span>
            </div>

            <div className="relative border-l border-[var(--border)] pl-6 sm:pl-8 space-y-12">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)] transition-transform duration-200 group-hover:scale-125" />

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-subtle)]">
                    <span className="inline-flex items-center gap-1 mono-tag">
                      <Calendar className="h-3 w-3" />
                      {edu.period}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {edu.location}
                    </span>
                  </div>

                  <h3 className="font-display mt-2 text-xl sm:text-2xl font-normal tracking-tight text-[var(--fg)]">
                    {edu.degree}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-[var(--fg-muted)]">
                    {edu.institution}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {edu.focus.map((item) => (
                      <span
                        key={item}
                        className="mono-tag rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Rows (Right Column) */}
          <div className="lg:col-span-6" data-reveal data-reveal-delay="120">
            <div className="mb-6 flex items-center gap-2 text-xs text-[var(--fg-muted)]">
              <Award className="h-4 w-4 text-[var(--accent)]" />
              <span className="mono-tag tracking-wider font-semibold">
                Verified Certifications
              </span>
            </div>

            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group transition-colors hover:bg-[var(--bg-subtle)] px-2 rounded-lg"
                >
                  <div>
                    <h4 className="font-display text-base font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                      {cert.name}
                    </h4>
                    {cert.instructor && (
                      <p className="text-xs text-[var(--fg-subtle)] font-light mt-0.5">
                        Instructor: {cert.instructor}
                      </p>
                    )}
                  </div>

                  <div className="mono-tag text-xs font-medium text-[var(--fg-muted)] text-left sm:text-right">
                    {cert.platform}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
