"use client";
import { useEffect, useRef } from "react";

export default function ServicesHero() {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = shapeRef.current;
    if (!el) return;
    let t = 0;
    const animate = () => {
      t += 0.008;
      const r1 = 50 + 12 * Math.sin(t);
      const r2 = 50 + 12 * Math.cos(t * 1.3);
      const r3 = 50 + 8 * Math.sin(t * 0.9);
      const r4 = 50 + 10 * Math.cos(t * 1.1);
      el.style.borderRadius = `${r1}% ${100 - r1}% ${r2}% ${100 - r2}% / ${r3}% ${r3}% ${r4}% ${100 - r4}%`;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <section className="relative section-lg overflow-hidden bg-[var(--color-bg)] flex items-center min-h-[60vh]">
      {/* Morphing blob */}
      <div
        ref={shapeRef}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #4F46E5 0%, #1A1A2E 60%, transparent 80%)", borderRadius: "50%" }}
      />
      <div className="container relative z-10">
        <span className="section-label">Services</span>
        <h1
          className="max-w-2xl mb-6 text-[var(--color-ink)]"
          data-reveal="up"
        >
          Everything your business needs to{" "}
          <span style={{ color: "var(--color-accent2)" }}>grow</span>
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-lg" data-reveal="up" data-delay="0.1">
          From consulting to execution — we cover every touchpoint of your digital transformation with Strategy, Innovation & Analytics.
        </p>
      </div>
    </section>
  );
}
