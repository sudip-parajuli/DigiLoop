"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function SmoothLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Percentage counter animation (1.6s)
    const duration = 1600; // 1.6s
    const startTime = performance.now();

    const animateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.floor(pct * 100));

      if (pct < 1) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);

    // 2. Overlay burn away transition
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = "";
      },
    });

    document.body.style.overflow = "hidden";

    // Wait for stroke animation + progress counter (1.8s) then burn away
    tl.to(overlay, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 1.9,
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="loader-overlay"
      style={{
        clipPath: "circle(150% at 50% 50%)",
        position: "fixed",
        inset: 0,
        background: "var(--color-accent)",
        zIndex: 9000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Radial pulsing glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulseGlow 2.5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* SVG logo */}
      <svg
        className="loader-svg"
        width="280"
        height="60"
        viewBox="0 0 280 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* SIA wordmark as stroked text paths */}
        <text
          x="50%"
          y="44"
          textAnchor="middle"
          fontFamily="'Clash Display', sans-serif"
          fontSize="46"
          fontWeight="600"
          letterSpacing="1"
          fill="none"
          stroke="white"
          strokeWidth="1.2"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 2000,
            animation: "drawStroke 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          SIA
        </text>
      </svg>

      {/* Modern thin progress bar & percentage counter */}
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "2px",
          background: "rgba(255, 255, 255, 0.1)",
          marginTop: "24px",
          zIndex: 2,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--color-accent2)",
            transition: "width 0.05s ease-out",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: 0,
            top: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "rgba(255, 255, 255, 0.4)",
            letterSpacing: "0.05em",
          }}
        >
          {String(progress).padStart(2, "0")}%
        </span>
      </div>

      {/* Responsive Centered Subtitle */}
      <p
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.55rem, 2.8vw, 0.72rem)",
          letterSpacing: "0.12em",
          animation: "fadeIn 0.6s ease 0.5s forwards",
          opacity: 0,
          whiteSpace: "nowrap",
          textAlign: "center",
          width: "90%",
          zIndex: 2,
        }}
      >
        Strategy · Innovation · Analytics
      </p>

      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
