"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { projects } from "@/lib/portfolio-data";

export default function PortfolioCarousel() {
  const [active, setActive] = useState(0);
  const [burning, setBurning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const displacRef = useRef<SVGFEDisplacementMapElement>(null);

  const goTo = (index: number) => {
    if (burning || index === active) return;
    setBurning(true);

    // SVG feDisplacementMap burn transition
    if (turbRef.current && displacRef.current) {
      gsap
        .timeline()
        .to(turbRef.current, {
          attr: { baseFrequency: "0.04 0.06", numOctaves: 4 },
          duration: 0.15,
          ease: "power2.in",
        })
        .to(
          displacRef.current,
          {
            attr: { scale: 80 },
            duration: 0.25,
            ease: "power1.in",
          },
          "<"
        )
        .to(
          slideRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "-=0.1"
        )
        .call(() => setActive(index))
        .to(slideRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          displacRef.current,
          {
            attr: { scale: 0 },
            duration: 0.35,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          turbRef.current,
          {
            attr: { baseFrequency: "0 0", numOctaves: 1 },
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => setBurning(false),
          },
          "<"
        );
    } else {
      setActive(index);
      setBurning(false);
    }
  };

  const prev = () => goTo((active - 1 + projects.length) % projects.length);
  const next = () => goTo((active + 1) % projects.length);

  // Autoplay — pauses on hover and on hidden tab
  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (isPaused || burning) return;
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, burning, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const project = projects[active];

  return (
    <section
      className="portfolio-section relative w-full overflow-hidden"
      style={{ height: "90vh", minHeight: "600px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SVG burn filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="burn-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0 0"
              numOctaves={1}
              result="turbulence"
            />
            <feDisplacementMap
              ref={displacRef}
              in="SourceGraphic"
              in2="turbulence"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* Main slide */}
      <div
        ref={slideRef}
        className="absolute inset-0"
        style={{ filter: "url(#burn-filter)" }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top"
          priority={active === 0}
          sizes="100vw"
        />
        {/* Per-project gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${project.color}F0 0%, ${project.color}99 35%, transparent 65%)`,
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left: project info */}
            <div>
              <span className="inline-block text-xs font-medium tracking-widest uppercase text-white/60 mb-3 border border-white/20 px-3 py-1 rounded-full">
                {project.category} · {project.year}
              </span>
              <h2 className="text-4xl md:text-6xl font-semibold text-white leading-none mb-2">
                {project.title}
              </h2>
              <p className="text-white/60 text-lg">{project.subtitle}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: navigation + view link */}
            <div className="flex items-center gap-6">
              <span className="text-white/40 text-sm tabular-nums">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous project"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                  style={{ cursor: "none" }}
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next project"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                  style={{ cursor: "none" }}
                >
                  →
                </button>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-[var(--color-accent2)] hover:text-white transition-all duration-300"
                style={{ cursor: "none" }}
              >
                View Live →
              </a>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{ cursor: "none" }}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-white" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="absolute top-8 left-8 md:left-16 z-10">
        <span
          className="text-white/30 text-xs font-mono tracking-widest uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Selected Work
        </span>
      </div>
    </section>
  );
}
