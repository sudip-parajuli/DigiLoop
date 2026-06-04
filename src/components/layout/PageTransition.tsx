"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const animate = async () => {
      const { gsap } = await import("gsap");

      // Sweep in from bottom
      await gsap.fromTo(
        overlay,
        { y: "100%", clipPath: "circle(150% at 50% 100%)" },
        { y: "0%", duration: 0.4, ease: "power4.inOut" }
      );

      // Burn out with radial clip + shimmer
      gsap.to(overlay, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.7,
        ease: "power4.inOut",
        delay: 0.05,
      });

      gsap.to(overlay, {
        filter: "brightness(2) blur(4px)",
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    };

    animate();
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="page-transition-overlay"
        style={{ clipPath: "circle(0% at 50% 50%)" }}
      />
      {children}
    </>
  );
}
