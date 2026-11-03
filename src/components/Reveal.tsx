"use client";

import { useEffect, useRef, useState } from "react";

/** Fade + 8px rise on first entry, 300ms, once. Disabled by prefers-reduced-motion (globals.css). */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Visible by default — matches SSR output, so content is never stuck
  // invisible if JS is slow or absent. JS only hides elements below the fold.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.92) return;

    setHidden(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal transition-[opacity,transform] duration-300 ease-out ${
        hidden ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
