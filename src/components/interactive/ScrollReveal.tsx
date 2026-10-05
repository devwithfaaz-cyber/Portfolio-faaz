"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const revealed = new Set<Element>();
    const observe = (element: Element) => {
      if (revealed.has(element)) return;
      const delay = Number.parseInt(element.getAttribute("data-reveal-delay") ?? "0", 10);
      (element as HTMLElement).style.setProperty(
        "--reveal-delay",
        `${Math.min(Math.max(delay, 0), 240)}ms`
      );
      revealed.add(element);
      observer.observe(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );

    root.dataset.revealReady = "true";
    document.querySelectorAll("[data-reveal]").forEach(observe);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches("[data-reveal]")) observe(node);
          node.querySelectorAll("[data-reveal]").forEach(observe);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      delete root.dataset.revealReady;
    };
  }, []);

  return null;
}
