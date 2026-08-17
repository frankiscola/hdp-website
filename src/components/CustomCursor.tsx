import { useEffect, useRef, useState } from "react";

const INTERACTIVE = "a, button, input, textarea, select, [role='button'], label";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...target };
    let hovering = false;
    let dotScale = 1;
    let ringScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as Element | null;
      const isInteractive = Boolean(el?.closest?.(INTERACTIVE));
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        dotRef.current?.classList.toggle("is-hover", hovering);
        ringRef.current?.classList.toggle("is-hover", hovering);
      }
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;
      // Baked into the same transform string as the position (see below)
      // rather than left to a CSS `transition: width/height`, so the hover
      // grow is a plain scale() — compositor-only, no layout/repaint either.
      const dotTarget = hovering ? 1.75 : 1;
      const ringTarget = hovering ? 1.611 : 1;
      dotScale += (dotTarget - dotScale) * 0.22;
      ringScale += (ringTarget - ringScale) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
