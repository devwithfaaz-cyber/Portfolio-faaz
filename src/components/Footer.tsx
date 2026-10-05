"use client";

import React from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-16 bg-[var(--bg)] border-t border-[var(--border)] relative z-10">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Identity */}
          <div>
            <Link
              href="/"
              className="mono-tag text-xs font-bold tracking-widest text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
            >
              FAAZ MIRZA
            </Link>
            <p className="mt-2 text-xs text-[var(--fg-muted)] font-light">
              {PERSONAL_INFO.role}
            </p>
            <p className="mt-1 text-[11px] text-[var(--fg-subtle)]">
              {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Quick Navigation to Dedicated Pages */}
          <div className="flex flex-wrap gap-8 sm:gap-14 text-xs">
            <div>
              <p className="mono-tag mb-3 text-[10px] text-[var(--fg-subtle)] font-semibold">
                Pages
              </p>
              <ul className="space-y-2 text-[var(--fg-muted)] font-light">
                <li>
                  <Link href="/work" className="hover:text-[var(--fg)] transition-colors">
                    Selected Work
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[var(--fg)] transition-colors">
                    About Faaz
                  </Link>
                </li>
                <li>
                  <Link href="/engineering" className="hover:text-[var(--fg)] transition-colors">
                    Engineering
                  </Link>
                </li>
                <li>
                  <Link href="/skills" className="hover:text-[var(--fg)] transition-colors">
                    Skills & Toolkit
                  </Link>
                </li>
                <li>
                  <Link href="/education" className="hover:text-[var(--fg)] transition-colors">
                    Education
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[var(--fg)] transition-colors">
                    Get in Touch
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social channels: Strictly GitHub, LinkedIn, Instagram */}
            <div>
              <p className="mono-tag mb-3 text-[10px] text-[var(--fg-subtle)] font-semibold">
                Network
              </p>
              <ul className="space-y-2 text-[var(--fg-muted)] font-light">
                {PERSONAL_INFO.socials.github && (
                  <li>
                    <a
                      href={PERSONAL_INFO.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link inline-flex items-center gap-1 hover:text-[var(--fg)] transition-colors"
                    >
                      GitHub <ArrowUpRight className="h-2.5 w-2.5" />
                    </a>
                  </li>
                )}
                {PERSONAL_INFO.socials.linkedin && (
                  <li>
                    <a
                      href={PERSONAL_INFO.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link inline-flex items-center gap-1 hover:text-[var(--fg)] transition-colors"
                    >
                      LinkedIn <ArrowUpRight className="h-2.5 w-2.5" />
                    </a>
                  </li>
                )}
                {PERSONAL_INFO.socials.instagram && (
                  <li>
                    <a
                      href={PERSONAL_INFO.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link inline-flex items-center gap-1 hover:text-[var(--fg)] transition-colors"
                    >
                      Instagram <ArrowUpRight className="h-2.5 w-2.5" />
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center gap-1 hover:text-[var(--fg)] transition-colors"
                  >
                    Email <ArrowUpRight className="h-2.5 w-2.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Portal */}
            <div>
              <p className="mono-tag mb-3 text-[10px] text-[var(--fg-subtle)] font-semibold">
                System
              </p>
              <ul className="space-y-2 text-[var(--fg-muted)] font-light">
                <li>
                  <Link
                    href="/admin"
                    className="hover:text-[var(--fg)] transition-colors"
                  >
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-[var(--border)] pt-6 text-[11px] text-[var(--fg-subtle)] gap-2">
          <p>© 2026 Faaz Mirza. All rights reserved.</p>
          <p className="mono-tag">Editorial Developer Portfolio & Engineering Systems</p>
        </div>
      </div>
    </footer>
  );
}
