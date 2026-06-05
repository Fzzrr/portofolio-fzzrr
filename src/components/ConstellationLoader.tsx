"use client";

import { useEffect, useRef } from "react";

// A small rotating 3D point-cloud — nodes linked by faint lines — echoing the
// site's constellation background. Monochrome white on transparent.
// When `exiting` is set it spins up and bursts the nodes outward.
export default function ConstellationLoader({
  exiting = false,
}: {
  exiting?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const exitingRef = useRef(exiting);

  useEffect(() => {
    exitingRef.current = exiting;
  }, [exiting]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const SIZE = 180;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const N = 16;
    const R = 60;
    const LINK = 1.15; // 3D distance threshold for drawing a link
    const center = SIZE / 2;

    // Random points inside a unit ball.
    const points = Array.from({ length: N }, () => {
      let x = 0;
      let y = 0;
      let z = 0;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
      } while (x * x + y * y + z * z > 1);
      return { x, y, z };
    });

    const tilt = 0.5;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    let angle = 0;
    let speed = 0.012;
    let burst = 1; // multiplier that flings nodes outward on exit

    const render = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);

      // Rotate around Y, tilt around X, then project with light perspective.
      const proj = points.map((p) => {
        const rx = p.x * ca + p.z * sa;
        const rz = -p.x * sa + p.z * ca;
        const ry = p.y * cosT - rz * sinT;
        const rz2 = p.y * sinT + rz * cosT;
        const persp = 1.5 / (2.2 - rz2);
        return {
          sx: center + rx * R * persp * burst,
          sy: center + ry * R * persp * burst,
          depth: (rz2 + 1) / 2, // 0 (far) → 1 (near)
        };
      });

      // Links between nearby points (depth-independent so the cage stays visible).
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / LINK) * 0.45})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      // Nodes — brighter and larger when closer to the viewer.
      for (const q of proj) {
        ctx.fillStyle = `rgba(255,255,255,${0.4 + q.depth * 0.6})`;
        ctx.beginPath();
        ctx.arc(q.sx, q.sy, 1.3 + q.depth * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    const loop = () => {
      if (exitingRef.current) {
        speed = Math.min(speed + 0.0045, 0.09); // spin up
        burst = Math.min(burst + 0.04, 2.4); // fling outward
      }
      angle += speed;
      render();
      raf = requestAnimationFrame(loop);
    };

    if (prefersReduced) render();
    else loop();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="h-[180px] w-[180px]"
    />
  );
}
