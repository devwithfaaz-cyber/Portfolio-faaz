"use client";

import { useEffect, useRef } from "react";

interface NetworkParticle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) {
      console.error("Unable to initialize the animated network canvas.");
      return;
    }

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles: NetworkParticle[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let color = "96, 165, 250";
    let lineOpacity = 0.12;
    let nodeOpacity = 0.52;
    let frameId = 0;
    let previousFrameTime = 0;

    const readTheme = () => {
      const styles = window.getComputedStyle(root);
      color = styles.getPropertyValue("--network-rgb").trim() || "96, 165, 250";
      lineOpacity = Number.parseFloat(styles.getPropertyValue("--network-line-opacity")) || 0.12;
      nodeOpacity = Number.parseFloat(styles.getPropertyValue("--network-node-opacity")) || 0.52;
      draw();
    };

    const draw = (deltaSeconds = 0) => {
      context.clearRect(0, 0, width, height);
      const maxDistance = Math.min(160, Math.max(105, Math.min(width, height) * 0.32));
      const maxDistanceSquared = maxDistance * maxDistance;

      for (const particle of particles) {
        particle.x += particle.velocityX * deltaSeconds;
        particle.y += particle.velocityY * deltaSeconds;

        if (particle.x < 0 || particle.x > width) {
          particle.velocityX *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.velocityY *= -1;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }
      }

      context.lineWidth = 0.7;
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        if (!particle) continue;

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex];
          if (!other) continue;
          const distanceX = particle.x - other.x;
          const distanceY = particle.y - other.y;
          const distanceSquared = distanceX * distanceX + distanceY * distanceY;
          if (distanceSquared >= maxDistanceSquared) continue;

          const proximity = 1 - Math.sqrt(distanceSquared) / maxDistance;
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.strokeStyle = `rgba(${color}, ${lineOpacity * proximity})`;
          context.stroke();
        }
      }

      context.fillStyle = `rgba(${color}, ${nodeOpacity})`;
      context.shadowColor = `rgba(${color}, ${nodeOpacity})`;
      context.shadowBlur = 7;
      for (const particle of particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
    };

    const animate = (time: number) => {
      if (document.hidden || reducedMotion.matches) {
        frameId = 0;
        return;
      }

      const deltaSeconds = previousFrameTime
        ? Math.min((time - previousFrameTime) / 1000, 0.05)
        : 0;
      previousFrameTime = time;
      draw(deltaSeconds);
      frameId = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!reducedMotion.matches && !document.hidden && frameId === 0) {
        previousFrameTime = 0;
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.max(10, Math.min(60, Math.round((width * height) / 24000)));
      particles.length = 0;
      for (let index = 0; index < count; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 5 + Math.random() * 8;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          radius: 0.9 + Math.random() * 0.8,
        });
      }
      draw();
      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        return;
      }
      startAnimation();
    };

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        draw();
        return;
      }
      startAnimation();
    };

    const themeObserver = new MutationObserver(readTheme);
    themeObserver.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionChange);

    readTheme();
    resize();
    if (reducedMotion.matches) draw();

    return () => {
      window.cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="network-canvas absolute inset-0 h-full w-full" />
    </div>
  );
}
