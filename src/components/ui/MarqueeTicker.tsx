"use client";

interface MarqueeTickerProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  "Web Design", "Digital Invitations", "Social Media", "AI Integration",
  "Automation", "Branding", "Motion Graphics", "Digital Marketing",
  "Graphic Design", "Print & Branding", "Visiting Cards",
];

export default function MarqueeTicker({ items = DEFAULT_ITEMS }: MarqueeTickerProps) {
  const doubled = [...items, ...items];

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-marquee-track {
          animation: ticker-scroll 35s linear infinite;
          will-change: transform;
        }
        .ticker-marquee-wrapper:hover .ticker-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="overflow-hidden border-y border-[var(--color-border)] py-4 bg-[var(--color-surface)] ticker-marquee-wrapper">
        <div className="ticker-marquee-track flex">
          {doubled.map((item, i) => (
            <div
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
