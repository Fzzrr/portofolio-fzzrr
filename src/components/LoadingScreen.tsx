"use client";

import { useEffect, useState } from "react";
import ConstellationLoader from "./ConstellationLoader";

// Full-screen intro overlay shown until the page finishes loading. On exit the
// constellation bursts, then the whole sheet fades away to reveal the page.
// The hero's `fade-up` entrance (paused via `.is-loading`) is released at the
// same moment, so the content rises in as the overlay dissolves.
export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const MIN_VISIBLE = 1900; // keep the loader on screen at least this long
    const EXIT_MS = 1200; // burst + lift duration before unmount
    const start = performance.now();
    let fadeTimer: number;
    let removeTimer: number;

    const begin = () => {
      const wait = Math.max(0, MIN_VISIBLE - (performance.now() - start));
      fadeTimer = window.setTimeout(() => {
        setHidden(true);
        document.body.classList.remove("is-loading"); // release hero entrance
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
      document.body.classList.remove("is-loading");
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] transition-opacity duration-[900ms] ease-out ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Dark backdrop that fades out with the overlay to reveal the page */}
      <div className="absolute inset-0 bg-neutral-950">
        {/* faint vignette so the sheet reads as a surface, not a flat fill */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-neutral-900/50" />
      </div>

      {/* Constellation cluster — bursts outward as the overlay dissolves */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-5 transition-[opacity,transform,filter] duration-500 ease-in ${
          hidden ? "scale-125 opacity-0 blur-sm" : "scale-100 opacity-100"
        }`}
      >
        <ConstellationLoader exiting={hidden} />
        <span className="font-mono text-[0.7rem] tracking-[0.4em] text-neutral-500">
          WELCOME
        </span>
      </div>
    </div>
  );
}
