const values = [
  {
    title: "Craft over speed",
    desc: "We take the time to get things right. Every pixel, every line of code is intentional. We don't ship half-baked work.",
    visual: "🎨",
    bg: "#F8F7F4",
  },
  {
    title: "Clients as partners",
    desc: "We don't just take briefs — we dive into your business, your goals, and your users. Your success is our success.",
    visual: "🤝",
    bg: "#F0EFFF",
  },
  {
    title: "Results that matter",
    desc: "Beautiful design means nothing without results. We obsess over conversion, engagement, and measurable impact.",
    visual: "📈",
    bg: "#F0FFF9",
  },
  {
    title: "Always learning",
    desc: "Tech moves fast. We stay ahead — constantly experimenting with new tools, AI capabilities, and design trends.",
    visual: "🚀",
    bg: "#FFF7F0",
  },
];

export default function ValuesSection() {
  return (
    <section className="section bg-[var(--color-bg)]">
      <div className="container">
        <div className="text-center mb-14">
          <span className="section-label">Our Values</span>
          <h2 data-reveal="up" className="text-[var(--color-ink)]">
            What drives us<br />
            <span style={{ color: "var(--color-accent2)" }}>every day</span>
          </h2>
        </div>

        <div className="space-y-8">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden border border-[var(--color-border)]"
              data-reveal="up"
              data-delay={`${i * 0.1}`}
            >
              {/* Text */}
              <div className={`p-10 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="text-4xl mb-4">{value.visual}</div>
                <h3 className="text-[var(--color-ink)] mb-3">{value.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{value.desc}</p>
              </div>

              {/* Visual */}
              <div
                className={`h-48 lg:h-full min-h-[200px] flex items-center justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}
                style={{ background: value.bg }}
              >
                <span className="text-8xl opacity-40">{value.visual}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
