"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioCarousel from "@/components/home/PortfolioCarousel";

const words = ["Strategy", "Innovation", "Analytics"];

const colors = [
  { word: "#D0C4FF", cursor: "#8A7DFF", glow: "rgba(138,125,255,0.22)", stat: "#D0C4FF", pillClass: "active-strategy" },
  { word: "#FFA480", cursor: "#FF6B35", glow: "rgba(255,107,53,0.2)",   stat: "#FFA480", pillClass: "active-innovation" },
  { word: "#62FFC7", cursor: "#00E599", glow: "rgba(0,229,153,0.22)",  stat: "#62FFC7", pillClass: "active-analytics" },
];

const subtexts = [
  "Long-term planning and strategic roadmaps that align your business goals with measurable digital outcomes.",
  "Cutting-edge AI integration and modern web solutions that push your product ahead of the curve.",
  "Data-driven dashboards and business intelligence that turn raw numbers into clear decisions.",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animateState, setAnimateState] = useState("in"); // "in" | "out"
  const [displayWord, setDisplayWord] = useState(words[0]);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reqRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const DURATION = 3000;

  // Word cycling animation timing
  useEffect(() => {
    setAnimateState("out");
    const timer = setTimeout(() => {
      setDisplayWord(words[current]);
      setAnimateState("in");
    }, 300);
    return () => clearTimeout(timer);
  }, [current]);

  // Autoplay and progress bar logic
  const startAutoplay = () => {
    startTimeRef.current = performance.now() - elapsedRef.current;

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      elapsedRef.current = elapsed;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        reqRef.current = requestAnimationFrame(tick);
      } else {
        elapsedRef.current = 0;
        setCurrent((prev) => (prev + 1) % words.length);
      }
    };
    reqRef.current = requestAnimationFrame(tick);
  };

  const pauseAutoplay = () => {
    if (reqRef.current) {
      cancelAnimationFrame(reqRef.current);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      startAutoplay();
    } else {
      pauseAutoplay();
    }
    return () => pauseAutoplay();
  }, [isPaused, current]);

  const activeColor = colors[current];

  return (
    <section className="w-full px-4 md:px-8 bg-[var(--color-bg)]">
      <style>{`
        .hero {
          background: #0a0a0a;
          min-height: 620px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          font-family: var(--font-body);
          border: 1px solid rgba(255,255,255,0.05);
          color: #fff;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .grid-fade {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 55% at 50% 110%, #0a0a0a 40%, transparent 100%);
          pointer-events: none;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          transition: all 1s ease;
        }

        .glow-purple {
          width: 320px; height: 320px;
          top: 20px; right: 40px;
          background: radial-gradient(circle, ${activeColor.glow} 0%, transparent 70%);
        }

        .glow-teal {
          width: 280px; height: 280px;
          bottom: 120px; left: 40px;
          background: radial-gradient(circle, ${current === 2 ? "rgba(29,158,117,0.22)" : "rgba(29,158,117,0)"} 0%, transparent 70%);
          opacity: ${current === 2 ? 1 : 0};
        }

        .progress-bar-hero {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: ${activeColor.cursor};
          transition: background 0.4s ease;
          z-index: 10;
        }

        .hero-body {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px 60px;
          max-width: 900px;
          margin: 0 auto;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          border: 0.5px solid rgba(255,255,255,0.15);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
        }

        .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #7F77DD;
          display: inline-block;
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .headline-static {
          font-size: clamp(1.2rem, 3.5vw, 2rem);
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.01em;
          margin-bottom: 8px;
        }

        .headline-wrapper {
          font-size: clamp(2.5rem, 8vw, 4.8rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
        }

        .word-display {
          position: relative;
          display: inline-block;
        }

        .word-text {
          display: inline-block;
          transition: color 0.4s ease;
        }

        .cursor {
          display: inline-block;
          width: 3px;
          height: 0.8em;
          background: ${activeColor.cursor};
          margin-left: 6px;
          vertical-align: middle;
          border-radius: 2px;
          animation: blink 1s step-end infinite;
          transition: background 0.4s ease;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .pills-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .pill {
          font-size: 11px;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: 100px;
          border: 0.5px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pill:hover {
          border-color: rgba(255,255,255,0.3);
          color: #fff;
        }

        .pill.active-strategy {
          border-color: rgba(83,74,183,0.6);
          color: #AFA9EC;
          background: rgba(83,74,183,0.12);
        }
        .pill.active-innovation {
          border-color: rgba(215,90,48,0.6);
          color: #F0997B;
          background: rgba(215,90,48,0.1);
        }
        .pill.active-analytics {
          border-color: rgba(29,158,117,0.6);
          color: #5DCAA5;
          background: rgba(29,158,117,0.1);
        }

        .subtext {
          font-size: clamp(0.85rem, 2vw, 0.95rem);
          color: rgba(255,255,255,0.55);
          max-width: 520px;
          line-height: 1.6;
          margin-bottom: 32px;
          min-height: 54px;
          transition: opacity 0.3s ease;
        }

        .cta-row-hero {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 48px;
        }

        .btn-hero-primary {
          background: #fff;
          color: #0a0a0a;
          font-size: 13px;
          font-weight: 500;
          padding: 11px 22px;
          border-radius: 8px;
          border: none;
          transition: transform 0.15s ease, opacity 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-hero-primary:hover {
          transform: scale(1.02);
          opacity: 0.9;
        }

        .btn-hero-ghost {
          color: rgba(255,255,255,0.7);
          font-size: 13px;
          font-weight: 500;
          padding: 11px 22px;
          border-radius: 8px;
          border: 0.5px solid rgba(255,255,255,0.15);
          background: transparent;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .btn-hero-ghost:hover {
          border-color: rgba(255,255,255,0.4);
          color: #fff;
        }

        .stats-bar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 0.5px solid rgba(255,255,255,0.07);
          position: relative;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .stats-bar {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat {
          text-align: center;
          padding: 20px 16px;
          border-right: 0.5px solid rgba(255,255,255,0.07);
          border-bottom: 0.5px solid rgba(255,255,255,0.07);
        }
        .stat:nth-child(2n) {
          border-right: none;
        }
        @media (min-width: 768px) {
          .stat {
            padding: 24px 36px;
            border-bottom: none;
          }
          .stat:nth-child(2n) {
            border-right: 0.5px solid rgba(255,255,255,0.07);
          }
          .stat:last-child {
            border-right: none;
          }
        }

        .stat-num {
          font-size: clamp(1.25rem, 4vw, 1.6rem);
          font-weight: 500;
          color: #fff;
          transition: color 0.5s ease;
          font-family: var(--font-display);
        }

        .stat-label {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 4px;
          font-family: var(--font-mono);
        }

        @keyframes wordIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes wordOut {
          from { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
          to { opacity: 0; transform: translateY(-16px) scale(0.97); filter: blur(4px); }
        }

        .word-in {
          animation: wordIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .word-out {
          animation: wordOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div
        className="hero"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid-bg" />
        <div className="grid-fade" />
        <div className="glow glow-purple" />
        <div className="glow glow-teal" />

        <div className="progress-bar-hero" style={{ width: `${progress}%` }} />

        <div className="hero-body">
          {/* Eyebrow */}
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Digital Agency · Kathmandu, Nepal
          </div>

          <p className="headline-static">Transforming businesses through</p>

          {/* Headline Word Cycle */}
          <div className="headline-wrapper">
            <div className="word-display">
              <span
                className={`word-text ${animateState === "in" ? "word-in" : "word-out"}`}
                style={{ color: activeColor.word }}
              >
                {displayWord}
              </span>
              <span className="cursor" />
            </div>
          </div>

          {/* Selector Pills Removed */}

          {/* Subtext */}
          <p className="subtext">
            {subtexts[current]}
          </p>

          {/* CTAs */}
          <div className="cta-row-hero">
            <Link href="/contact" className="btn-hero-primary">
              Book a Consultation
              <ArrowRight size={14} />
            </Link>
            <Link href="/work" className="btn-hero-ghost">
              View Our Work →
            </Link>
          </div>
        </div>

        {/* Portfolio Carousel in Dark Mode */}
        <div className="relative z-10 w-full mb-12">
          <PortfolioCarousel dark />
        </div>

        {/* Bottom stats bar */}
        <div className="stats-bar">
          <div className="stat">
            <div className="stat-num" style={{ color: activeColor.word }}>
              50+
            </div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat">
            <div className="stat-num" style={{ color: activeColor.word }}>
              100%
            </div>
            <div className="stat-label">Satisfaction</div>
          </div>
          <div className="stat">
            <div className="stat-num" style={{ color: activeColor.word }}>
              30+
            </div>
            <div className="stat-label">Automations</div>
          </div>
          <div className="stat">
            <div className="stat-num" style={{ color: activeColor.word }}>
              15+
            </div>
            <div className="stat-label">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
}
