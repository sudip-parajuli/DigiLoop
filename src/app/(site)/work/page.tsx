import type { Metadata } from "next";
import WorkHero from "@/components/work/WorkHero";
import PortfolioGrid from "@/components/work/PortfolioGrid";
import CTAStrip from "@/components/home/CTAStrip";

export const metadata: Metadata = {
  title: "Work — SIA Enterprises",
  description:
    "Browse SIA Enterprises' portfolio of custom websites, branding, and social media campaigns delivered for clients across Nepal and beyond.",
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <PortfolioGrid />
      <CTAStrip />
    </>
  );
}
