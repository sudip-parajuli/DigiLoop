"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger, useGSAP };

export const ease = {
  outExpo: "power4.out",
  inOutExpo: "power4.inOut",
  outBack: "back.out(1.7)",
};
