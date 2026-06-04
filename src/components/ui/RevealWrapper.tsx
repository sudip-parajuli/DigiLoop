"use client";

import { useEffect } from "react";
import { useRevealSystem } from "@/lib/reveal";

export default function RevealWrapper({ children }: { children: React.ReactNode }) {
  useRevealSystem();
  return <>{children}</>;
}
