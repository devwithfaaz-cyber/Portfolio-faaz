"use client";

import Image from "next/image";
import { useState } from "react";
import type { PointerEvent, CSSProperties } from "react";

interface ProfileImageProps {
  className?: string;
}

interface TiltStyle extends CSSProperties {
  [key: `--${string}`]: string;
}

export function ProfileImage({ className = "" }: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isColorActivated, setIsColorActivated] = useState(false);
  const [isLifted, setIsLifted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;

    setIsHovered(true);
    setIsLifted(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    setTilt({
      x: (0.5 - y) * 8,
      y: (x - 0.5) * 8,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsLifted(false);
    setTilt({ x: 0, y: 0 });
  };

  const tiltStyle: TiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isLifted ? -6 : 0}px)`,
  };

  return (
    <figure className={`profile-image ${className}`}>
      <button
        type="button"
        aria-label={isColorActivated ? "Show profile photo in black and white" : "Show profile photo in color"}
        aria-pressed={isColorActivated}
        title="Click to toggle profile photo color"
        onPointerEnter={handlePointerEnter}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") {
            setIsHovered(true);
            setIsLifted(
              !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            );
          }
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") {
            setIsHovered(false);
            setIsLifted(false);
          }
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={() => setIsColorActivated((active) => !active)}
        style={tiltStyle}
        className="profile-image-button group relative block aspect-square w-full overflow-hidden rounded-full border-4 border-[var(--surface)] bg-[var(--surface)] shadow-[0_12px_36px_var(--accent-border)] transition-[transform,box-shadow] duration-500 ease-out hover:shadow-[0_20px_48px_var(--accent-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4"
      >
        <Image
          src="/faaz-mirza.jpg"
          alt="Faaz Mirza"
          width={512}
          height={512}
          sizes="(max-width: 768px) 70vw, 420px"
          className={`absolute inset-0 h-full w-full object-cover object-[center_25%] transition-[filter] duration-500 ease-out ${
            isColorActivated || isHovered ? "grayscale-0" : "grayscale"
          }`}
        />
      </button>
    </figure>
  );
}
