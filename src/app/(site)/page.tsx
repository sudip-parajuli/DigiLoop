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
  title: "DigiLoop — We make your brand live in every pixel",
  description:
    "DigiLoop is a full-service digital agency based in Nepal. We build websites, digital invitations, run social media, integrate AI, and more.",
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
