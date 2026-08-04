import { useEffect, useRef } from "react";

/**
 * Magnetic hover: the element is gently pulled toward the pointer
 * while the cursor is within its bounds (plus a small padding).
 * Disabled on coarse pointers and when reduced motion is preferred.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28, max = 12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    let raf = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const loop = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      target.x = Math.max(-max, Math.min(max, dx * strength));
      target.y = Math.max(-max, Math.min(max, dy * strength));
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, max]);

  return ref;
}
