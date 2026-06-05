"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface HeroAvatarProps {
  src: string;
  alt: string;
}

// Interactive hero portrait: idle float + 3D tilt that wakes up only when the
// cursor comes near, with a glow that parallaxes for depth.
export default function HeroAvatar({ src, alt }: HeroAvatarProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const reset = () => {
      const tilt = tiltRef.current;
      if (tilt) {
        tilt.style.setProperty("--rx", "0deg");
        tilt.style.setProperty("--ry", "0deg");
      }
      const glow = glowRef.current;
      if (glow) glow.style.transform = "translate(0px, 0px)";
    };

    const handleMove = (e: PointerEvent) => {
      const tilt = tiltRef.current;
      if (!tilt) return;

      const rect = tilt.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Only react when the cursor is within an activation radius around the
      // avatar; otherwise it stays neutral.
      const radius = rect.width * 1.4;
      if (Math.hypot(dx, dy) > radius) {
        reset();
        return;
      }

      const px = Math.max(-1, Math.min(1, dx / radius));
      const py = Math.max(-1, Math.min(1, dy / radius));

      tilt.style.setProperty("--ry", `${px * 18}deg`);
      tilt.style.setProperty("--rx", `${-py * 18}deg`);

      const glow = glowRef.current;
      if (glow) glow.style.transform = `translate(${px * 22}px, ${py * 22}px)`;
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className="group fade-up fade-up-3 relative mx-auto w-64 shrink-0 md:mx-0 md:w-[24rem] md:-translate-y-6">
      {/* reactive glow behind the avatar */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-8 rounded-full bg-gradient-to-br from-neutral-300/15 via-neutral-400/10 to-neutral-500/10 blur-3xl transition-transform duration-300 ease-out"
      />

      {/* idle float */}
      <div className="avatar-float relative">
        {/* cursor tilt */}
        <div ref={tiltRef} className="avatar-tilt relative aspect-[4/5] w-full">
          {/* gradient ring frame */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/25 via-white/5 to-transparent p-px shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-900">
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(max-width: 768px) 18rem, 26rem"
                className="object-cover object-[50%_18%] transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* bottom blend into the dark page + subtle top sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/10 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent"
              />
              {/* inner hairline for a crisp edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
