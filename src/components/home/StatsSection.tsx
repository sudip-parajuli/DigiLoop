"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "On-Time Delivery" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [pulsing, setPulsing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setCount(Math.floor(eased * value));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(value);
              setPulsing(true);
              setTimeout(() => setPulsing(false), 700);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <span className={`stat-number ${pulsing ? "pulse" : ""}`}>
        {count}{suffix}
      </span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-sm border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center flex flex-col items-center gap-3 relative"
            >
              {/* Divider between stats on desktop */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-[var(--color-border)]" />
              )}

              <Counter value={stat.value} suffix={stat.suffix} />
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
