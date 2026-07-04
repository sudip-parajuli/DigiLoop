"use client";
import { useEffect, useRef } from "react";

export default function AboutHero() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const SplitType = (await import("split-type")).default;
      gsap.registerPlugin(ScrollTrigger);

      const el = textRef.current;
      if (!el) return;

      const split = new SplitType(el, { types: "lines" });

      gsap.fromTo(
        split.lines,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    };
    init();
  }, []);

  return (
    <section className="section-lg bg-[var(--color-bg)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 50%, #4F46E5, transparent 60%)" }} />
      <div className="container">
        <span className="section-label mb-8 block">Our Story</span>
        <p
          ref={textRef}
          className="max-w-4xl text-lg text-[var(--color-muted)] leading-relaxed"
        >
          We are SIA Enterprises — a digital agency born in Nepal with a mission to help local and global brands build meaningful digital identities. We believe that great design is not a luxury. It&apos;s how you survive and thrive in the digital age.
        </p>
      </div>
    </section>
  );
}
