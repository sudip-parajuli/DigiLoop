import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import TeamGrid from "@/components/about/TeamGrid";
import ValuesSection from "@/components/about/ValuesSection";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import CTAStrip from "@/components/home/CTAStrip";

export const metadata: Metadata = {
  title: "About — SIA Enterprises",
  description:
    "Meet the team behind SIA Enterprises — Strategy, Innovation & Analytics. Learn about our core values, our story, and our journey building digital identities in Nepal and beyond.",
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
