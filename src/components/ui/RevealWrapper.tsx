"use client";

import { useRevealSystem } from "@/lib/reveal";
import { usePathname } from "next/navigation";

export default function RevealWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useRevealSystem(pathname);
  return <>{children}</>;
}
