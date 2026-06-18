"use client";

import { useEffect } from "react";

export function useRevealSystem(pathname: string) {
  useEffect(() => {
    const activeTriggers: any[] = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Force a refresh so heights are correct before initializing triggers
      ScrollTrigger.refresh();

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

        // Reset element inline styles in case they were previously animated
        gsap.set(el, { clearProps: "all" });

        const tween = gsap.fromTo(
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

        if (tween.scrollTrigger) {
          activeTriggers.push(tween.scrollTrigger);
        }
      });
    };

    // Delay initialization slightly to let Next.js route transition settle
    const timer = setTimeout(() => {
      init();
    }, 150);

    return () => {
      clearTimeout(timer);
      activeTriggers.forEach((trigger) => {
        if (trigger && typeof trigger.kill === "function") {
          trigger.kill();
        }
      });
    };
  }, [pathname]);
}
