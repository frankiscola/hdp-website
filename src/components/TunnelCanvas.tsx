import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; z: number };

const COUNT = 520;
const DEPTH = 1000;

/**
 * Vacuum-tube particle tunnel: points streaming toward the viewer with a
 * subtle parallax pull from the pointer. Purely decorative.
 */
export function TunnelCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 2200,
      y: (Math.random() - 0.5) * 2200,
      z: Math.random() * DEPTH,
    }));

    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = () => {
      eased.x += (pointer.x - eased.x) * 0.04;
      eased.y += (pointer.y - eased.y) * 0.04;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2 + eased.x * 60;
      const cy = h / 2 + eased.y * 40;
      const focal = Math.max(w, h) * 0.9;

      for (const p of particles) {
        if (!reduce) p.z -= 3.4;
        if (p.z <= 1) {
          p.z = DEPTH;
          p.x = (Math.random() - 0.5) * 2200;
          p.y = (Math.random() - 0.5) * 2200;
        }
        const k = focal / p.z;
        const sx = cx + p.x * k * 0.5;
        const sy = cy + p.y * k * 0.5;
        if (sx < -60 || sx > w + 60 || sy < -60 || sy > h + 60) continue;

        const depth = 1 - p.z / DEPTH;
        const r = Math.max(0.4, depth * 2.4);
        const alpha = Math.min(0.85, depth * depth * 1.1);

        // streak tail toward the vanishing point
        const k2 = focal / Math.min(DEPTH, p.z + 60);
        ctx.strokeStyle = `oklch(0.72 0.17 279 / ${alpha * 0.5})`;
        ctx.lineWidth = r;
        ctx.beginPath();
        ctx.moveTo(cx + p.x * k2 * 0.5, cy + p.y * k2 * 0.5);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        ctx.fillStyle = `oklch(0.9 0.09 280 / ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
