import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothLoader from "@/components/ui/SmoothLoader";
import RevealWrapper from "@/components/ui/RevealWrapper";
import LenisProvider from "@/components/ui/LenisProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothLoader />
      <CustomCursor />
      <LenisProvider />
      <Navbar />
      <PageTransition>
        <RevealWrapper>
          <main style={{ paddingTop: "var(--nav-height)" }}>
            {children}
          </main>
          <Footer />
        </RevealWrapper>
      </PageTransition>
    </>
  );
}
