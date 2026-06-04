import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import PricingTable from "@/components/services/PricingTable";
import FAQSection from "@/components/services/FAQSection";
import CTAStrip from "@/components/home/CTAStrip";

export const metadata: Metadata = {
  title: "Services — DigiLoop",
  description:
    "Explore DigiLoop's full suite of digital services: website design, AI integration, social media management, digital marketing, automation, and more.",
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
