"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your brand, goals, and audience. Research-first approach to uncover real opportunities.",
    icon: "◈",
  },
  {
    number: "02",
    title: "Strategy",
    description: "From insights to a concrete plan — scope, tech stack, timeline, and measurable outcomes defined.",
    icon: "◎",
  },
  {
    number: "03",
    title: "Design",
    description: "Pixel-perfect UI built in Figma. We iterate with you until every interaction feels just right.",
    icon: "◐",
  },
  {
    number: "04",
    title: "Development",
    description: "Clean, performant code. Next.js, React, or WordPress — built to scale and easy to maintain.",
    icon: "◉",
  },
  {
    number: "05",
    title: "Launch & Grow",
    description: "We deploy, monitor, and optimize. Your success post-launch is as important as the build itself.",
    icon: "◍",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical progress line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );

      // Animate each step card
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Animate step dots
      gsap.utils.toArray<HTMLElement>(".process-dot").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36">
      <div className="container">
        {/* Section header */}
        <div className="mb-20 max-w-xl" data-reveal="up">
          <span className="inline-block text-xs tracking-widest uppercase font-mono text-[var(--color-muted)] mb-4">
            How We Work
          </span>
          <h2 className="text-[var(--color-ink)] mb-4">
            Our <span style={{ color: "var(--color-accent2)" }}>process</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed">
            A clear, collaborative workflow designed to deliver exceptional results — on time, every time.
          </p>
        </div>

        {/* Steps layout */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] -translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top"
              style={{
                background: "linear-gradient(to bottom, var(--color-accent), var(--color-accent2))",
                transformOrigin: "top",
              }}
            />
          </div>

          <div className="space-y-16">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`process-step relative flex items-start gap-8 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className={`md:w-[calc(50%-3rem)] ml-20 md:ml-0 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-2xl"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {step.icon}
                      </span>
                      <span className="text-xs font-mono text-[var(--color-muted)] tracking-widest">
                        STEP {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-muted)] leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2">
                  <div className="process-dot w-4 h-4 rounded-full bg-[var(--color-accent)] border-4 border-[var(--color-bg)] ring-2 ring-[var(--color-accent)] ring-offset-0" />
                </div>

                {/* Empty column for opposite side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
