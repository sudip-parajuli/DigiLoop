import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import TeamGrid from "@/components/about/TeamGrid";
import ValuesSection from "@/components/about/ValuesSection";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import CTAStrip from "@/components/home/CTAStrip";

export const metadata: Metadata = {
  title: "About — DigiLoop",
  description:
    "Meet the team behind DigiLoop — a passionate digital agency from Nepal building brands that live in every pixel.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <TeamGrid />
      <ValuesSection />
      <JourneyTimeline />
      <CTAStrip />
    </>
  );
}
