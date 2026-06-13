import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/ui/CustomCursor";
import SplashCursor from "@/components/ui/SplashCursor";
import SmoothLoader from "@/components/ui/SmoothLoader";
import RevealWrapper from "@/components/ui/RevealWrapper";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <SmoothLoader />
      <SplashCursor />
      <CustomCursor />
      <Navbar />
      <PageTransition>
        <RevealWrapper>
          <main style={{ paddingTop: "var(--nav-height)" }}>
            {children}
          </main>
          <Footer />
        </RevealWrapper>
      </PageTransition>
    </SmoothScrollProvider>
  );
}
