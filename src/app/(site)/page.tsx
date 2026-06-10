import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import BrandsStrip from "@/components/home/BrandsStrip";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTAStrip from "@/components/home/CTAStrip";

export const metadata: Metadata = {
  title: "SIA Enterprises — Strategy, Innovation & Analytics",
  description:
    "SIA Enterprises is a premier digital transformation agency based in Nepal. We help businesses grow through custom web development, AI integration, automation, digital marketing, and data analytics.",
};

export default function HomePage() {
  return (
    <>
      {/* HeroSection includes the PortfolioCarousel inline below the CTAs */}
      <HeroSection />
      <BrandsStrip />
      <MarqueeTicker />
      <ServicesSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <CTAStrip />
    </>
  );
}
