"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 40, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 120, suffix: "+", label: "Automation Workflows" },
  { value: 15, suffix: "+", label: "Technologies Used" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const counters = sectionRef.current?.querySelectorAll("[data-count]");
    if (!counters || counters.length === 0) return;

    const ctx = gsap.context(() => {
      counters.forEach((el) => {
        const target = Number(el.getAttribute("data-count"));
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toString();
              },
              onComplete: () => {
                el.textContent = target.toString();
                // Pulse on complete
                gsap.fromTo(
                  el,
                  { scale: 1.15 },
                  { scale: 1, duration: 0.3, ease: "back.out(2)" }
                );
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Background glow effects behind the glass card */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-82 h-82 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-accent2), transparent)" }}
      />

      <div className="container relative z-10">
        <div className="bg-white/50 backdrop-blur-xl border border-[var(--color-border)] rounded-3xl p-12 md:p-16 shadow-lg relative overflow-hidden">
          {/* Subtle inside card radial highlights */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[var(--color-accent2)]/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-[var(--color-accent)]/5 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center relative z-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <div className="flex items-end justify-center gap-1">
                  <span
                    data-count={s.value}
                    className="stat-number text-[var(--color-ink)]"
                  >
                    0
                  </span>
                  <span className="text-3xl font-semibold text-[var(--color-accent2)] pb-1.5 md:pb-2.5">
                    {s.suffix}
                  </span>
                </div>
                <p className="mt-3 text-xs md:text-sm font-semibold tracking-wide text-[var(--color-ink)] uppercase font-mono">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
