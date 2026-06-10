"use client";

import { useEffect, useRef } from "react";
import {
  Globe, Cpu, Bot, TrendingUp, Search, BarChart3, Palette, Lightbulb,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    desc: "Premium, responsive web applications engineered for speed, security, and scalability.",
    color: "#4F46E5",
  },
  {
    icon: Cpu,
    title: "AI Integration & Automation",
    desc: "Embed cognitive AI capabilities and machine learning models into your products.",
    color: "#06B6D4",
  },
  {
    icon: Bot,
    title: "Business Process Automation",
    desc: "Streamline workflows and cut operational costs with custom intelligent integrations.",
    color: "#10B981",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Data-driven growth strategies that drive measurable traffic and user acquisition.",
    color: "#F59E0B",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Improve visibility, scale organic search rankings, and optimize for target audiences.",
    color: "#7C3AED",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Reporting",
    desc: "Turn raw tracking into actionable dashboards, telemetry, and business intelligence.",
    color: "#8B5CF6",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Human-centric, modern, and beautiful user interfaces tailored to your audience.",
    color: "#F97316",
  },
  {
    icon: Lightbulb,
    title: "Technical Consulting",
    desc: "Strategic guidance, software architecture design, and enterprise tech planning.",
    color: "#EC4899",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const divider = dividerRef.current;
      if (!section || !divider) return;

      // Divider scaleX animation
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: divider, start: "top 85%" },
        }
      );

      // Cards staggered entrance
      const cards = section.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: cards[0], start: "top 85%" },
        }
      );
    };
    init();
  }, []);

  return (
    <section ref={sectionRef} className="section bg-[var(--color-bg)]">
      <div className="container">
        {/* Header */}
        <div className="mb-14">
          <span className="section-label">What We Do</span>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 data-reveal="up" className="text-[var(--color-ink)]">
              Services built for<br />
              <span style={{ color: "var(--color-accent2)" }}>modern brands</span>
            </h2>
            <p className="text-[var(--color-muted)] max-w-xs text-sm leading-relaxed" data-reveal="up" data-delay="0.1">
              Everything you need to build, grow, and scale your digital presence — under one roof.
            </p>
          </div>
          <div
            ref={dividerRef}
            className="section-divider mt-8"
            style={{ transformOrigin: "left", background: "var(--color-border)", height: "1px", width: "100%" }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="service-card group">
                {/* Icon */}
                <div
                  className="service-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${service.color}18` }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </div>

                {/* Content */}
                <h3
                  className="text-[var(--color-ink)] mb-2"
                  style={{ fontSize: "1.0625rem", fontWeight: 600 }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {service.desc}
                </p>

                {/* Arrow */}
                <div
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                  style={{ color: "var(--color-accent2)" }}
                >
                  Learn more →
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
