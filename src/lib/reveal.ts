"use client";

import { useEffect, useRef } from "react";

export function useRevealSystem() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const elements = document.querySelectorAll("[data-reveal]");

      elements.forEach((el) => {
        const variant = el.getAttribute("data-reveal") || "up";
        const delay = parseFloat(el.getAttribute("data-delay") || "0");

        let fromVars: gsap.TweenVars = { opacity: 0 };

        switch (variant) {
          case "up":
            fromVars = { opacity: 0, y: 50 };
            break;
          case "left":
            fromVars = { opacity: 0, x: -50 };
            break;
          case "right":
            fromVars = { opacity: 0, x: 50 };
            break;
          case "scale":
            fromVars = { opacity: 0, scale: 0.85 };
            break;
          case "rotate":
            fromVars = { opacity: 0, rotation: 8, y: 30 };
            break;
        }

        gsap.fromTo(
          el,
          fromVars,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 0.9,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    };

    init();
  }, []);
}
