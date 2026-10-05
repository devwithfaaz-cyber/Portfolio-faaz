"use client";

import React, { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function ClickEffects() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let counter = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const createEffect = (x: number, y: number) => {
      const rippleId = ++counter;

      setRipples((prev) => [...prev.slice(-6), { id: rippleId, x, y }]);
      const rippleTimer = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
        timers.delete(rippleTimer);
      }, 700);
      timers.add(rippleTimer);

      if (reducedMotion) return;

      const newParticles: Particle[] = [];
      const particleCount = 4;

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
        const speed = 18 + Math.random() * 14;
        newParticles.push({
          id: ++counter,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        });
      }

      setParticles((prev) => [...prev.slice(-15), ...newParticles]);
      const particleTimer = setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
        timers.delete(particleTimer);
      }, 700);
      timers.add(particleTimer);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.isPrimary && e.button !== 2) createEffect(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ripple Rings */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] opacity-70 animate-ping-once"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: "36px",
            height: "36px",
            animation: "rippleExpand 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        />
      ))}

      {/* Tiny Delicate Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="click-particle absolute h-1 w-1 rounded-full bg-[var(--accent)]"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            "--particle-x": `${p.vx}px`,
            "--particle-y": `${p.vy}px`,
          } as React.CSSProperties}
        />
      ))}

    </div>
  );
}
