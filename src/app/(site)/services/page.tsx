import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import PricingTable from "@/components/services/PricingTable";
import FAQSection from "@/components/services/FAQSection";
import CTAStrip from "@/components/home/CTAStrip";

export const metadata: Metadata = {
  title: "Services — SIA Enterprises",
  description:
    "Explore SIA Enterprises' suite of professional consulting and development services: web development, AI integration, automation, digital marketing, and analytics.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ProcessTimeline />
      <PricingTable />
      <FAQSection />
      <CTAStrip />
    </>
  );
}
