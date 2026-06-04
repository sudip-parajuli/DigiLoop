import type { Metadata } from "next";
import WorkHero from "@/components/work/WorkHero";
import PortfolioGrid from "@/components/work/PortfolioGrid";
import CTAStrip from "@/components/home/CTAStrip";

export const metadata: Metadata = {
  title: "Work — DigiLoop",
  description:
    "Browse DigiLoop's portfolio of websites, digital invitations, branding, and social media projects delivered for clients across Nepal.",
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
