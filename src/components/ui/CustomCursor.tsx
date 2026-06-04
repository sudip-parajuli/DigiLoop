"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      raf = requestAnimationFrame(animateRing);
    };

    const onMouseEnterInteractive = () => {
      dot.classList.add("expanded");
      ring.classList.add("hidden");
    };

    const onMouseLeaveInteractive = () => {
      dot.classList.remove("expanded");
      ring.classList.remove("hidden");
    };

    const onMouseEnterImage = () => {
      dot.classList.add("view-mode");
      ring.classList.add("hidden");
    };

    const onMouseLeaveImage = () => {
      dot.classList.remove("view-mode");
      ring.classList.remove("hidden");
    };

    document.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(animateRing);

    const interactiveEls = document.querySelectorAll("a, button, [role='button'], .service-card, .portfolio-grid-card, .team-card");
    const imageEls = document.querySelectorAll(".portfolio-card, .portfolio-grid-card img");

    interactiveEls.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    imageEls.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnterImage);
      el.addEventListener("mouseleave", onMouseLeaveImage);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
