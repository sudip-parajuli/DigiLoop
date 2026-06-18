"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { projects } from "@/lib/portfolio-data";

const N = projects.length; // 5
const CARD_GAP = 20;

// 3x repeat to allow seamless infinite peeking loop:
const EXTENDED = [...projects, ...projects, ...projects];

export default function PortfolioCarousel({ dark = false }: { dark?: boolean }) {
  const [extIndex, setExtIndex] = useState(5); // Start at index 5 (first real item)
  const [isPaused, setIsPaused] = useState(false);
  const isAnimatingRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const displacRef = useRef<SVGFEDisplacementMapElement>(null);
  const cardWidthRef = useRef(0);

  // Real dot/indicator index is from 0 to N-1
  const realIndex = extIndex % N;

  const measureCard = useCallback(() => {
    const card = trackRef.current?.firstElementChild as HTMLDivElement | null;
    if (card) cardWidthRef.current = card.offsetWidth;
  }, []);

  const computeOffset = useCallback((idx: number) => {
    if (!containerRef.current) return 0;
    const cw = containerRef.current.offsetWidth;
    const cardW = cardWidthRef.current;
    return (cw - cardW) / 2 - idx * (cardW + CARD_GAP);
  }, []);

  const snapTo = useCallback(
    (idx: number) => {
      measureCard();
      gsap.set(trackRef.current, { x: computeOffset(idx) });
    },
    [measureCard, computeOffset]
  );

  const applyCardStyles = useCallback((centerIdx: number, animate: boolean) => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLDivElement;
      const pos = i - centerIdx;
      const isActive = pos === 0;
      const tiltY = pos === 0 ? 0 : pos < 0 ? 12 : -12;
      const scale = isActive ? 1 : 0.88;
      const opacity = isActive ? 1 : Math.abs(pos) === 1 ? 0.6 : 0.25;
      const zIndex = isActive ? 10 : Math.abs(pos) === 1 ? 5 : 1;
      const shadow = isActive
        ? "0 24px 60px rgba(0,0,0,0.24)"
        : "0 6px 20px rgba(0,0,0,0.1)";

      if (animate) {
        gsap.to(card, {
          scale,
          opacity,
          rotateY: tiltY,
          transformPerspective: 1200,
          zIndex,
          boxShadow: shadow,
          duration: 0.48,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      } else {
        gsap.set(card, {
          scale,
          opacity,
          rotateY: tiltY,
          transformPerspective: 1200,
          zIndex,
          boxShadow: shadow,
        });
      }
    }
  }, []);

  // Initialise at P0 (extIndex=5)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      snapTo(5);
      applyCardStyles(5, false);
    });
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Core slide fn ────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (targetExt: number) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      measureCard();
      const targetX = computeOffset(targetExt);

      // 1. Animate card styles (scale, opacity, tilt, etc.) using GSAP
      applyCardStyles(targetExt, true);

      // 2. Animate track position and optional distortion filter
      const tl = gsap.timeline({
        onComplete: () => {
          let finalExt = targetExt;
          if (targetExt < N) {
            finalExt = targetExt + N;
            gsap.set(trackRef.current, { x: computeOffset(finalExt) });
            applyCardStyles(finalExt, false);
          } else if (targetExt >= 2 * N) {
            finalExt = targetExt - N;
            gsap.set(trackRef.current, { x: computeOffset(finalExt) });
            applyCardStyles(finalExt, false);
          }
          setExtIndex(finalExt);
          isAnimatingRef.current = false;
        },
      });

      if (turbRef.current && displacRef.current) {
        tl
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
          .to(
            trackRef.current,
            { x: targetX, duration: 0.48, ease: "power3.inOut" },
            "<0.06"
          )
          .to(
            displacRef.current,
            { attr: { scale: 0 }, duration: 0.3, ease: "power2.out" },
            "-=0.18"
          )
          .to(
            turbRef.current,
            { attr: { baseFrequency: "0 0" }, duration: 0.24, ease: "power2.out" },
            "<"
          );
      } else {
        tl.to(trackRef.current, { x: targetX, duration: 0.48, ease: "power3.inOut" });
      }
    },
    [computeOffset, measureCard, applyCardStyles]
  );

  const next = useCallback(() => goTo(extIndex + 1), [extIndex, goTo]);
  const prev = useCallback(() => goTo(extIndex - 1), [extIndex, goTo]);

  // 2-second autoplay
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      if (!isAnimatingRef.current) next();
    }, 2000);
    return () => clearInterval(t);
  }, [extIndex, isPaused, next]);

  // Tab visibility pause
  useEffect(() => {
    const h = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, []);

  // Resize re-snap
  useEffect(() => {
    const h = () => {
      snapTo(extIndex);
      applyCardStyles(extIndex, false);
    };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [extIndex, snapTo, applyCardStyles]);

  // Keyboard nav
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [extIndex, prev, next]);

  return (
    <div className="w-full">
      {/* SVG burn filter */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id="portfolio-burn" x="-30%" y="-30%" width="160%" height="160%">
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

      {/* Viewport */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{ height: "clamp(260px, 38vw, 480px)", perspective: "1200px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Sliding track */}
        <div
          ref={trackRef}
          className="absolute top-0 h-full flex"
          style={{ gap: `${CARD_GAP}px`, filter: "url(#portfolio-burn)", transformStyle: "preserve-3d" }}
        >
          {EXTENDED.map((project, i) => {
            const pos = i - extIndex;
            const isActive = pos === 0;

            const tiltY = pos === 0 ? 0 : pos < 0 ? 12 : -12;
            const scale = isActive ? 1 : 0.88;
            const opacity = isActive ? 1 : Math.abs(pos) === 1 ? 0.6 : 0.25;
            const zIndex = isActive ? 10 : Math.abs(pos) === 1 ? 5 : 1;
            const shadow = isActive
              ? "0 24px 60px rgba(0,0,0,0.24)"
              : "0 6px 20px rgba(0,0,0,0.1)";

            return (
              <div
                key={`${project.id}-${i}`}
                onClick={() => {
                  if (!isAnimatingRef.current) {
                    if (pos < 0) prev();
                    else if (pos > 0) next();
                  }
                }}
                className="relative flex-shrink-0 h-full rounded-2xl overflow-hidden"
                style={{
                  width: "clamp(240px, 54vw, 680px)",
                  opacity,
                  transform: `perspective(1200px) rotateY(${tiltY}deg) scale(${scale})`,
                  zIndex,
                  boxShadow: shadow,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                  priority={i === 5}
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 680px"
                />
                {/* Per-project gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${project.color}F2 0%, ${project.color}70 40%, transparent 68%)`,
                  }}
                />
                {/* Card info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <span className="text-xs text-white/55 font-mono tracking-widest uppercase">
                    {project.category} · {project.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold text-white mt-1 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm">{project.subtitle}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 mt-3 text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/60 px-3 py-1.5 rounded-full transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Live →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edge gradient fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-14 md:w-24 pointer-events-none z-10"
          style={{ background: `linear-gradient(to right, ${dark ? "#0a0a0a" : "var(--color-bg)"}, transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-14 md:w-24 pointer-events-none z-10"
          style={{ background: `linear-gradient(to left, ${dark ? "#0a0a0a" : "var(--color-bg)"}, transparent)` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mt-5">
        <button
          onClick={prev}
          aria-label="Previous project"
          className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
            dark
              ? "border-white/15 text-white/50 hover:border-white hover:text-white"
              : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          }`}
        >
          ←
        </button>

        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i + N)}
              aria-label={`Project ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === realIndex
                  ? dark
                    ? "w-8 bg-[#7F77DD]"
                    : "w-8 bg-[var(--color-accent)]"
                  : dark
                    ? "w-3 bg-white/10"
                    : "w-3 bg-[var(--color-border)]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next project"
          className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
            dark
              ? "border-white/15 text-white/50 hover:border-white hover:text-white"
              : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          }`}
        >
          →
        </button>
      </div>

      {/* View all link */}
      <div className="flex justify-center mt-4">
        <Link
          href="/work"
          className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${
            dark
              ? "text-white/40 hover:text-white"
              : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
          }`}
        >
          View All Work →
        </Link>
      </div>
    </div>
  );
}
