"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { SocialLinkButton } from "./SocialLinkButton";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  slug: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "About", href: "/about", slug: "about" },
  { name: "Work", href: "/work", slug: "work" },
  { name: "Engineering", href: "/engineering", slug: "engineering" },
  { name: "Skills", href: "/skills", slug: "skills" },
  { name: "Education", href: "/education", slug: "education" },
  { name: "Contact", href: "/contact", slug: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      if (pathname === "/") {
        // Active section detection on homepage
        const sectionIds = ["work", "about", "engineering", "skills", "education", "contact"];
        const scrollPosition = window.scrollY + 200;

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Keep focus and background scrolling predictable while the mobile menu is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusableElements = () =>
      Array.from(
        mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        ) ?? []
      );
    focusableElements().find((element) => element.closest("nav"))?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const elements = focusableElements();
        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const isCurrentRoute = (item: NavItem) =>
    pathname === item.href || (item.slug === "work" && pathname.startsWith("/projects/"));

  const isCurrentActive = (item: NavItem) => {
    if (isCurrentRoute(item)) return true;
    if (pathname === "/" && activeSection === item.slug) return true;
    return false;
  };

  return (
    <>
      <header
        className={`mobile-site-header fixed left-0 right-0 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-6xl rounded-2xl border border-[var(--border)] bg-[var(--bg)]/90 shadow-xs backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-[var(--bg)]/75 sm:w-[calc(100%-2.5rem)] ${
          isScrolled
            ? "py-2.5 shadow-md"
            : "py-3"
        }`}
      >
        <div className="mx-auto flex items-center justify-between gap-3 px-2 sm:px-3">
          {/* Logo / Name */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--fg)] transition-colors duration-250 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span className="mono-tag text-xs font-bold tracking-widest text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
              FAAZ MIRZA
            </span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-[var(--accent)] sm:inline-block"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isCurrentActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isCurrentRoute(item) ? "page" : undefined}
                  className={`animated-underline navbar-animated-underline relative shrink-0 rounded-xl border px-2.5 py-2 text-xs font-medium tracking-tight transition-all duration-250 hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:px-3 ${
                    item.slug === "about"
                      ? "border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] hover:border-slate-300 hover:bg-white hover:text-slate-900"
                      : item.slug === "work"
                        ? "border-transparent bg-transparent text-[var(--fg-muted)] hover:border-red-600 hover:bg-red-600 hover:text-white"
                        : item.slug === "engineering"
                          ? "border-transparent bg-transparent text-[var(--fg-muted)] hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                          : item.slug === "skills"
                            ? "border-transparent bg-transparent text-[var(--fg-muted)] hover:border-violet-600 hover:bg-violet-600 hover:text-white"
                            : item.slug === "education"
                              ? "border-transparent bg-transparent text-[var(--fg-muted)] hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                              : item.slug === "contact"
                                ? "border-transparent bg-transparent text-[var(--fg-muted)] hover:border-amber-600 hover:bg-amber-600 hover:text-white"
                          : `border-transparent bg-transparent ${
                              active
                                ? "text-[var(--fg)] font-semibold"
                                : "text-[var(--fg-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)]"
                            }`
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-full bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] transition-all duration-250 hover:scale-[1.03] hover:border-[var(--accent-border)] hover:bg-[var(--surface-hover)] hover:text-[var(--accent)] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          ref={mobileMenuRef}
          className="mobile-menu-enter fixed inset-0 z-50 flex min-h-screen min-h-[100dvh] flex-col justify-between overflow-y-auto overscroll-contain bg-[var(--bg)] px-6 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-10 md:hidden"
        >
          {/* Top header inside overlay */}
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              id="mobile-nav-title"
              className="mono-tag inline-flex min-h-11 items-center text-xs font-bold tracking-widest text-[var(--fg)]"
            >
              FAAZ MIRZA
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] transition-all duration-250 hover:scale-[1.03] hover:border-[var(--accent-border)] hover:bg-[var(--surface-hover)] hover:text-[var(--accent)] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="my-auto flex flex-col space-y-3 py-6" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item, idx) => {
              const active = isCurrentActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isCurrentRoute(item) ? "page" : undefined}
                  className={`animated-underline navbar-animated-underline group flex min-h-11 items-center justify-between rounded-xl px-3 py-2 text-2xl font-light tracking-tight transition-all duration-250 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    item.slug === "about"
                      ? "hover:bg-white hover:text-slate-900"
                      : item.slug === "work"
                        ? "hover:bg-red-600 hover:text-white"
                        : item.slug === "engineering"
                          ? "hover:bg-blue-600 hover:text-white"
                          : item.slug === "skills"
                            ? "hover:bg-violet-600 hover:text-white"
                            : item.slug === "education"
                              ? "hover:bg-emerald-600 hover:text-white"
                              : item.slug === "contact"
                                ? "hover:bg-amber-600 hover:text-white"
                                : ""
                  } ${
                    active ? "text-[var(--accent)] font-normal" : "text-[var(--fg)]"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                      0{idx + 1}
                    </span>
                    <span>{item.name}</span>
                  </span>
                  <span className="mono-tag text-xs opacity-0 transition-opacity duration-250 group-hover:opacity-100 group-hover:text-current">
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Social links at bottom - strictly GitHub, LinkedIn, Instagram */}
          <div className="border-t border-[var(--border)] pt-6">
            <p className="mono-tag mb-3 text-[10px] text-[var(--fg-subtle)]">
              Connect
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--fg-muted)]">
              {PERSONAL_INFO.socials.github && (
                <SocialLinkButton
                  platform="github"
                  href={PERSONAL_INFO.socials.github}
                />
              )}
              {PERSONAL_INFO.socials.linkedin && (
                <SocialLinkButton
                  platform="linkedin"
                  href={PERSONAL_INFO.socials.linkedin}
                />
              )}
              {PERSONAL_INFO.socials.instagram && (
                <SocialLinkButton
                  platform="instagram"
                  href={PERSONAL_INFO.socials.instagram}
                />
              )}
              <SocialLinkButton
                platform="whatsapp"
                href={PERSONAL_INFO.socials.whatsapp}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
