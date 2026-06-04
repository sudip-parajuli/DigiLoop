export default function ContactHero() {
  return (
    <section className="section bg-[var(--color-accent)] relative overflow-hidden flex items-center min-h-[45vh]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{ background: "radial-gradient(ellipse at 30% 50%, #4F46E5, transparent 60%)" }} />
      </div>
      <div className="container relative z-10">
        <span className="section-label" style={{ color: "rgba(255,255,255,0.4)" }}>Contact</span>
        <h1 className="text-white max-w-2xl mb-4" data-reveal="up">
          Let's build something{" "}
          <span style={{ color: "var(--color-accent2)" }}>great</span>{" "}
          together
        </h1>
        <p className="text-white/50 max-w-md" data-reveal="up" data-delay="0.1">
          Fill in the form and we'll get back to you within 24 hours. Or just drop us a WhatsApp.
        </p>
      </div>
    </section>
  );
}
