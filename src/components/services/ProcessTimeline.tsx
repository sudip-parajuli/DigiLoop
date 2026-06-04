const steps = [
  { num: "01", title: "Discovery", desc: "Deep dive into your goals, audience, and competitors to craft the perfect strategy." },
  { num: "02", title: "Design", desc: "Pixel-perfect mockups and prototypes reviewed with you before any code is written." },
  { num: "03", title: "Build", desc: "Development with clean code, performance best practices, and regular check-ins." },
  { num: "04", title: "Test", desc: "Thorough QA across devices and browsers. We don't ship broken things." },
  { num: "05", title: "Launch", desc: "Smooth deployment with monitoring, handoff docs, and post-launch support." },
];

export default function ProcessTimeline() {
  return (
    <section className="section bg-[var(--color-bg)]">
      <div className="container">
        <div className="text-center mb-14">
          <span className="section-label">How We Work</span>
          <h2 data-reveal="up" className="text-[var(--color-ink)]">
            A process built for{" "}
            <span style={{ color: "var(--color-accent2)" }}>results</span>
          </h2>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:grid grid-cols-5 gap-0 relative">
          {/* Connector line */}
          <div
            className="absolute top-7 left-[10%] right-[10%] h-px"
            style={{ background: "var(--color-border)" }}
          />

          {steps.map((step) => (
            <div key={step.num} className="timeline-step group px-4" data-reveal="up">
              <div className="timeline-dot relative z-10">{step.num}</div>
              <div className="text-center mt-4">
                <h4 className="font-semibold text-[var(--color-ink)] mb-2">{step.title}</h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-5" data-reveal="left">
              <div className="flex flex-col items-center">
                <div className="timeline-dot flex-shrink-0">{step.num}</div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-3" style={{ background: "var(--color-border)", minHeight: "2rem" }} />
                )}
              </div>
              <div className="pb-6">
                <h4 className="font-semibold text-[var(--color-ink)] mb-1">{step.title}</h4>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
