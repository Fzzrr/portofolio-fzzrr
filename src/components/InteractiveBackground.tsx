"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

// Monochrome constellation backdrop: drifting particles linked by faint lines,
// reacting to the cursor (brighten, attract, and connect to the pointer).
export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const GRID = 56;
    const LINK_DIST = 130;
    const CURSOR_DIST = 190;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const pointer = { x: -9999, y: -9999, active: false };

    const makeParticles = () => {
      const count = Math.min(110, Math.floor((width * height) / 15000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeParticles();
    };

    const drawGrid = () => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.beginPath();
      for (let x = 0; x <= width; x += GRID) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += GRID) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      // Move particles + gentle pull toward the cursor.
      for (const p of particles) {
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_DIST * CURSOR_DIST) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / CURSOR_DIST) * 0.04;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;
      }

      // Links between nearby particles.
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Soft halo around the cursor.
      if (pointer.active) {
        const grd = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          CURSOR_DIST
        );
        grd.addColorStop(0, "rgba(255,255,255,0.06)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(
          pointer.x - CURSOR_DIST,
          pointer.y - CURSOR_DIST,
          CURSOR_DIST * 2,
          CURSOR_DIST * 2
        );
      }

      // Particles + cursor links (brighter the closer they are).
      for (const p of particles) {
        let alpha = 0.35;
        let r = p.r;
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_DIST * CURSOR_DIST) {
            const t = 1 - Math.sqrt(d2) / CURSOR_DIST;
            alpha = 0.35 + t * 0.55;
            r = p.r + t * 1.2;
            ctx.strokeStyle = `rgba(255,255,255,${t * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    const loop = () => {
      frame();
      raf = requestAnimationFrame(loop);
    };

    let moveRaf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(moveRaf);
      moveRaf = requestAnimationFrame(() => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
      });
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!prefersReduced && raf === 0) {
        loop();
      }
    };

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    };

    resize();
    window.addEventListener("resize", onResize, { passive: true });

    if (prefersReduced) {
      frame(); // single static frame, no animation or cursor reaction
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(moveRaf);
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
