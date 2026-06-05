"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";

// Drives the whole page with Lenis momentum scrolling, keeps in-page hash
// links smooth, and falls back to instant scrolling for reduced-motion users.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Intercept same-page hash links so they ride Lenis instead of jumping.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href) return;

      const rootHash = href.startsWith("/#");
      if (!href.startsWith("#") && !rootHash) return;
      // "/#section" should only short-circuit when already on the home page;
      // otherwise let the router navigate there first.
      if (rootHash && window.location.pathname !== "/") return;

      const hash = rootHash ? href.slice(1) : href;
      if (hash.length <= 1) return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();
      lenisRef.current?.lenis?.scrollTo(target as HTMLElement, {
        offset: -96, // clear the fixed navbar
        immediate: reduced,
      });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduced]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: !reduced,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
