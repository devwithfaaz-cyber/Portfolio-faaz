"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  slug: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Work", href: "/work", slug: "work" },
  { name: "About", href: "/about", slug: "about" },
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

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

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

  const isCurrentActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (pathname === "/" && activeSection === item.slug) return true;
    return false;
  };

  return (
    <>
      <header
        className={`mobile-site-header fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "border-b border-[var(--border)] bg-[var(--bg)]/85 py-3.5 backdrop-blur-md shadow-xs"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-8">
          {/* Logo / Name */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
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
                  className={`animated-underline relative rounded-md px-3 py-1.5 text-xs font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    active
                      ? "text-[var(--fg)] font-semibold"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
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
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
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
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
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
                  href={pathname === "/" ? `#${item.slug}` : item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex min-h-11 items-center justify-between text-2xl font-light tracking-tight transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                    active ? "text-[var(--accent)] font-normal" : "text-[var(--fg)]"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="mono-tag text-xs text-[var(--fg-subtle)]">
                      0{idx + 1}
                    </span>
                    <span>{item.name}</span>
                  </span>
                  <span className="mono-tag text-xs opacity-0 transition-opacity group-hover:opacity-100 text-[var(--accent)]">
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
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link inline-flex min-h-11 items-center gap-1 hover:text-[var(--fg)] transition-colors"
                >
                  GitHub <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
              {PERSONAL_INFO.socials.linkedin && (
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link inline-flex min-h-11 items-center gap-1 hover:text-[var(--fg)] transition-colors"
                >
                  LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
              {PERSONAL_INFO.socials.instagram && (
                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link inline-flex min-h-11 items-center gap-1 hover:text-[var(--fg)] transition-colors"
                >
                  Instagram <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
