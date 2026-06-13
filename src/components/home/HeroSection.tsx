"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioCarousel from "@/components/home/PortfolioCarousel";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    const initAnim = async () => {
      const { gsap } = await import("gsap");
      const SplitType = (await import("split-type")).default;

      const headline = headlineRef.current;
      const sub = subRef.current;
      const cta = ctaRef.current;
      const carousel = carouselRef.current;

      if (!headline) return;

      // Ensure the parent h1 is visible before split-type splits it and GSAP animates the words
      gsap.set(headline, { opacity: 1 });
      const split = new SplitType(headline, { types: "words" });

      const tl = gsap.timeline({ delay: 2.2 });

      tl.fromTo(
        split.words,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power4.out" }
      )
        .fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .fromTo(carousel, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2");

      return () => { split.revert(); tl.kill(); };
    };
    initAnim();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] pt-16 lg:pt-20 pb-10">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Fallback/Overlay gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(79,70,229,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Text content ── */}
      <div className="container relative z-10 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-white/60 backdrop-blur-sm mb-3 text-sm text-[var(--color-muted)]"
          data-reveal="scale"
          data-delay="2.1"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent2)] animate-pulse" />
          Strategy, Innovation & Analytics · Based in Nepal
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-[var(--color-ink)] mb-3 max-w-4xl mx-auto"
          style={{ opacity: 0 }}
        >
          Transforming Businesses Through{" "}
          <span style={{ color: "var(--color-accent2)" }}>Strategy. Innovation. Analytics.</span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-lg text-[var(--color-muted)] max-w-xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          SIA Enterprises helps businesses grow through modern web development, AI solutions, automation, digital marketing, and data-driven strategies.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          style={{ opacity: 0 }}
        >
          <Link href="/contact" className="btn btn-primary px-8 py-4 text-base" style={{ cursor: "none" }}>
            Book a Consultation
            <ArrowRight size={18} />
          </Link>
          <Link href="/work" className="btn btn-ghost px-8 py-4 text-base" style={{ cursor: "none" }}>
            View Our Work
          </Link>
        </div>
      </div>

      {/* ── Portfolio carousel — full-width below CTAs ── */}
      <div ref={carouselRef} style={{ opacity: 0 }}>
        <PortfolioCarousel />
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />
    </section>
  );
}
