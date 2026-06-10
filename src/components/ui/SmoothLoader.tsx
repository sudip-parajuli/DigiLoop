"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function SmoothLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        document.body.style.overflow = "";
      },
    });

    document.body.style.overflow = "hidden";

    // Wait for stroke animation (1.6s) then burn away
    tl.to(overlay, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 0.8,
      ease: "power4.inOut",
      delay: 1.9,
    });

    return () => { tl.kill(); };
  }, []);

  if (done) return null;

  return (
    <div ref={overlayRef} className="loader-overlay" style={{ clipPath: "circle(150% at 50% 50%)" }}>
      <svg
        className="loader-svg"
        width="280"
        height="60"
        viewBox="0 0 280 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
      <p
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.4)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          animation: "fadeIn 0.6s ease 0.5s forwards",
          opacity: 0,
        }}
      >
        Strategy · Innovation · Analytics
      </p>
      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </div>
  );
}
