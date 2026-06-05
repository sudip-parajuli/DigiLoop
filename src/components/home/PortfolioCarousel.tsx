"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { projects } from "@/lib/portfolio-data";

const CARD_GAP = 20;

export default function PortfolioCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isAnimatingRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const displacRef = useRef<SVGFEDisplacementMapElement>(null);
  const cardWidthRef = useRef(0);

  // Measure card width from DOM (pure px, no calc guessing)
  const measureCard = useCallback(() => {
    const firstCard = trackRef.current?.firstElementChild as HTMLDivElement | null;
    if (firstCard) cardWidthRef.current = firstCard.offsetWidth;
  }, []);

  // Offset to centre `index` card
  const computeOffset = useCallback((index: number) => {
    if (!containerRef.current) return 0;
    const cw = containerRef.current.offsetWidth;
    const cardW = cardWidthRef.current;
    return (cw - cardW) / 2 - index * (cardW + CARD_GAP);
  }, []);

  // Initial snap (no animation)
  const snapToActive = useCallback(
    (idx = active) => {
      measureCard();
      if (trackRef.current) gsap.set(trackRef.current, { x: computeOffset(idx) });
    },
    [active, computeOffset, measureCard]
  );

  useEffect(() => {
    // Wait one tick so the DOM has rendered card widths
    const raf = requestAnimationFrame(() => snapToActive(0));
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Slide transition ────────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      if (isAnimatingRef.current || index === active) return;
      isAnimatingRef.current = true;

      // Update visual state immediately so card styles react
      setActive(index);

      measureCard();
      const targetX = computeOffset(index);

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      if (turbRef.current && displacRef.current) {
        tl
          // Ramp up distortion
          .to(turbRef.current, {
            attr: { baseFrequency: "0.04 0.07", numOctaves: 3 },
            duration: 0.14,
            ease: "power2.in",
          })
          .to(
            displacRef.current,
            { attr: { scale: 90 }, duration: 0.18, ease: "power1.in" },
            "<"
          )
          // Slide track
          .to(
            trackRef.current,
            { x: targetX, duration: 0.48, ease: "power3.inOut" },
            "<0.06"
          )
          // Dissolve distortion
          .to(
            displacRef.current,
            { attr: { scale: 0 }, duration: 0.3, ease: "power2.out" },
            "-=0.18"
          )
          .to(
            turbRef.current,
            {
              attr: { baseFrequency: "0 0" },
              duration: 0.24,
              ease: "power2.out",
            },
            "<"
          );
      } else {
        tl.to(trackRef.current, {
          x: targetX,
          duration: 0.48,
          ease: "power3.inOut",
        });
      }
    },
    [active, computeOffset, measureCard]
  );

  const next = useCallback(
    () => goTo((active + 1) % projects.length),
    [active, goTo]
  );
  const prev = useCallback(
    () => goTo((active - 1 + projects.length) % projects.length),
    [active, goTo]
  );

  // ── 2-second autoplay ───────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      if (!isAnimatingRef.current) next();
    }, 2000);
    return () => clearInterval(timer);
  }, [active, isPaused, next]);

  // ── Tab visibility pause ────────────────────────────────────────────────────
  useEffect(() => {
    const h = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, []);

  // ── Resize re-snap ──────────────────────────────────────────────────────────
  useEffect(() => {
    const h = () => snapToActive(active);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [active, snapToActive]);

  // ── Keyboard nav ────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* SVG burn filter — hidden, zero-size */}
      <svg
        className="pointer-events-none"
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter
            id="portfolio-burn"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0 0"
              numOctaves={3}
              result="noise"
            />
            <feDisplacementMap
              ref={displacRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Carousel viewport ── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: "clamp(260px, 38vw, 480px)" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Sliding track — filter applied here so all visible cards distort */}
        <div
          ref={trackRef}
          className="absolute top-0 h-full flex"
          style={{ gap: `${CARD_GAP}px`, filter: "url(#portfolio-burn)" }}
        >
          {projects.map((project, i) => {
            const isActive = i === active;
            return (
              <div
                key={project.id}
                onClick={() => goTo(i)}
                className="relative flex-shrink-0 h-full rounded-2xl overflow-hidden"
                style={{
                  /* Squarespace layout: center card ≈55 vw, caps at 680px */
                  width: "clamp(240px, 54vw, 680px)",
                  opacity: isActive ? 1 : 0.48,
                  transform: isActive ? "scale(1)" : "scale(0.93)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                  cursor: "none",
                  boxShadow: isActive
                    ? "0 24px 60px rgba(0,0,0,0.22)"
                    : "0 8px 24px rgba(0,0,0,0.1)",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  priority={i === 0}
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 680px"
                />
                {/* Per-project gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${project.color}F2 0%, ${project.color}70 40%, transparent 68%)`,
                  }}
                />
                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="text-xs text-white/55 font-mono tracking-widest uppercase">
                    {project.category} · {project.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-white mt-1 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm">{project.subtitle}</p>
                  {isActive && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ cursor: "none" }}
                      className="inline-flex items-center gap-1.5 mt-3 text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/60 px-3 py-1.5 rounded-full transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Live →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Left / right gradient fades to hint continuation */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 md:w-20 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-12 md:w-20 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to left, var(--color-bg), transparent)",
          }}
        />
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-center gap-5 mt-5">
        <button
          onClick={prev}
          aria-label="Previous project"
          style={{ cursor: "none" }}
          className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{ cursor: "none" }}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === active
                  ? "w-8 bg-[var(--color-accent)]"
                  : "w-3 bg-[var(--color-border)]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next project"
          style={{ cursor: "none" }}
          className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-sm text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
        >
          →
        </button>
      </div>

      {/* ── View all work link ── */}
      <div className="flex justify-center mt-4">
        <Link
          href="/work"
          style={{ cursor: "none" }}
          className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] font-mono tracking-widest uppercase transition-colors duration-300"
        >
          View All Work →
        </Link>
      </div>
    </div>
  );
}
