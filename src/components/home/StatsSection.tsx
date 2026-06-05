"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "On-Time Delivery" },
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
    <section ref={sectionRef} className="py-24 bg-[var(--color-accent)]">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="flex items-end justify-center gap-1">
                <span
                  data-count={s.value}
                  className="stat-number text-white"
                >
                  0
                </span>
                <span className="text-3xl font-semibold text-[var(--color-accent2)] pb-1">
                  {s.suffix}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
