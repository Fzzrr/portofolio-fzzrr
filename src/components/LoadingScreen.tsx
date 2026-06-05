"use client";

import { useEffect, useState } from "react";
import ConstellationLoader from "./ConstellationLoader";

// Full-screen intro overlay shown until the page finishes loading. It matches
// the dark monochrome theme (bg-neutral-950) so the reveal is seamless.
export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const MIN_VISIBLE = 2000; // keep the loader on screen at least this long
    const EXIT_MS = 1300; // burst + curtain reveal duration before unmount
    const start = performance.now();
    let fadeTimer: number;
    let removeTimer: number;

    const begin = () => {
      const wait = Math.max(0, MIN_VISIBLE - (performance.now() - start));
      fadeTimer = window.setTimeout(() => {
        setHidden(true);
        document.body.style.overflow = "";
        removeTimer = window.setTimeout(() => setRemoved(true), EXIT_MS);
      }, wait);
    };

    document.body.style.overflow = "hidden";
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      window.removeEventListener("load", begin);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  // Curtain panels slide away in a staggered sweep to reveal the page. Literal
  // delay classes (not built dynamically) so Tailwind keeps them in the bundle.
  const PANELS = [
    "delay-[0ms] -translate-y-full",
    "delay-[80ms] translate-y-full",
    "delay-[160ms] -translate-y-full",
    "delay-[240ms] translate-y-full",
    "delay-[320ms] -translate-y-full",
    "delay-[400ms] translate-y-full",
  ];

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] ${hidden ? "pointer-events-none" : ""}`}
    >
      {/* Curtain: vertical panels that slide out alternately when exiting */}
      <div className="absolute inset-0 flex">
        {PANELS.map((panel, i) => (
          <div
            key={i}
            className={`h-full flex-1 bg-neutral-950 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              hidden ? panel : "translate-y-0"
            }`}
          />
        ))}
      </div>

      {/* Constellation cluster — bursts outward and fades just before the curtain opens */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-[opacity,transform,filter] duration-500 ease-in ${
          hidden ? "scale-125 opacity-0 blur-sm" : "scale-100 opacity-100"
        }`}
      >
        <ConstellationLoader exiting={hidden} />
        <span className="font-mono text-xs tracking-[0.35em] text-neutral-500">
          WELCOME
        </span>
      </div>
    </div>
  );
}
