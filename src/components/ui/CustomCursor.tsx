"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip entirely on touch devices / small screens
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.innerWidth < 1024) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    let mouseX = 0, mouseY = 0;

    // Use GSAP quickSetter for max performance
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    // Initialize off-screen
    gsap.set([dot, ring], { x: -100, y: -100, opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);
      gsap.to(dot, { opacity: 1, duration: 0.2 });
      gsap.to(ring, { opacity: 1, duration: 0.4 });
    };

    // Smooth ring follow via gsap ticker
    const tickerFn = () => {
      const ringXNow = parseFloat(ring.style.transform?.match(/translateX\(([^p]+)px\)/)?.[1] ?? "-100");
      const ringYNow = parseFloat(ring.style.transform?.match(/translateY\(([^p]+)px\)/)?.[1] ?? "-100");
      setRingX(ringXNow + (mouseX - ringXNow) * 0.12);
      setRingY(ringYNow + (mouseY - ringYNow) * 0.12);
    };

    // Simpler approach: use gsap.to with repeat
    gsap.ticker.add(tickerFn);

    const onMouseEnterInteractive = () => {
      gsap.to(dot, { scale: 3.5, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { opacity: 0, scale: 0.5, duration: 0.2 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, { opacity: 1, scale: 1, duration: 0.3 });
    };

    const onMouseEnterImage = () => {
      gsap.to(dot, { scale: 1, backgroundColor: "transparent", border: "2px solid white", duration: 0.3 });
      gsap.to(ring, { scale: 2.5, opacity: 0.4, duration: 0.3 });
    };

    const onMouseLeaveImage = () => {
      gsap.to(dot, { scale: 1, backgroundColor: "var(--color-accent)", border: "none", duration: 0.3 });
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
    };

    document.addEventListener("mousemove", onMouseMove);

    const interactiveEls = document.querySelectorAll<HTMLElement>(
      "a, button, [role='button'], .service-card, .portfolio-grid-card, .team-card, input, textarea, select, label[for]"
    );
    const imageEls = document.querySelectorAll<HTMLElement>(
      ".portfolio-section, .portfolio-grid-card img"
    );

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    imageEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterImage);
      el.addEventListener("mouseleave", onMouseLeaveImage);
    });

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(tickerFn);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      imageEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterImage);
        el.removeEventListener("mouseleave", onMouseLeaveImage);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
