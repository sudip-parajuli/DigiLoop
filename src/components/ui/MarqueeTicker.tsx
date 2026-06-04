"use client";

import { useEffect, useRef } from "react";

interface MarqueeTickerProps {
  items?: string[];
  speed?: number;
}

const DEFAULT_ITEMS = [
  "Web Design", "Digital Invitations", "Social Media", "AI Integration",
  "Automation", "Branding", "Motion Graphics", "Digital Marketing",
  "Graphic Design", "Print & Branding", "Visiting Cards",
];

export default function MarqueeTicker({ items = DEFAULT_ITEMS, speed = 30 }: MarqueeTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let currentSpeed = speed;
    let lastScrollY = window.scrollY;

    const updateSpeed = () => {
      const scrollY = window.scrollY;
      const delta = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
      const newDuration = Math.max(8, speed - delta * 0.3);
      track.style.animationDuration = `${newDuration}s`;
    };

    window.addEventListener("scroll", updateSpeed, { passive: true });
    return () => window.removeEventListener("scroll", updateSpeed);
  }, [speed]);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[var(--color-border)] py-4 bg-[var(--color-surface)]">
      <div ref={trackRef} className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 whitespace-nowrap"
          >
            <span
              className="text-[0.9375rem] font-medium text-[var(--color-ink)]"
              style={{ fontStyle: i % 3 === 1 ? "italic" : "normal" }}
            >
              {item}
            </span>
            <span className="text-[var(--color-accent2)] text-lg">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
