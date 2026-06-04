import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTAStrip() {
  return (
    <section className="cta-strip section-lg relative overflow-hidden">
      {/* Gradient mesh blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #4F46E5, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
      />

      <div className="container relative z-10 text-center">
        {/* Badge */}
        <div
          className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/60 text-xs font-mono tracking-widest uppercase mb-6"
          data-reveal="scale"
        >
          Let's Build Together
        </div>

        <h2
          className="text-white mb-6 max-w-2xl mx-auto"
          data-reveal="up"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ready to go<br />
          <span style={{ color: "var(--color-accent2)" }}>digital?</span>
        </h2>

        <p
          className="text-white/50 text-lg max-w-md mx-auto mb-10"
          data-reveal="up"
          data-delay="0.1"
        >
          Tell us about your project and we'll get back to you within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-reveal="up" data-delay="0.2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-[var(--color-ink)] font-semibold text-base hover:bg-[var(--color-accent2)] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ cursor: "none" }}
          >
            Start a Project
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/20 text-white/80 font-medium text-base hover:border-white hover:text-white transition-all duration-300"
            style={{ cursor: "none" }}
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/30 text-xs font-mono tracking-wide">
          <span>✓ Free Consultation</span>
          <span>✓ On-Time Delivery</span>
          <span>✓ Satisfaction Guaranteed</span>
          <span>✓ Based in Nepal</span>
        </div>
      </div>
    </section>
  );
}
