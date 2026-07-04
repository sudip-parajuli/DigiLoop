import { Palette, Handshake, TrendingUp, Rocket } from "lucide-react";

const values = [
  {
    title: "Craft over speed",
    desc: "We take the time to get things right. Every pixel, every line of code is intentional. We don't ship half-baked work.",
    icon: Palette,
    pattern: "conic-gradient(from 0deg at 50% 50%, #4F46E5 0deg, transparent 60deg, #4F46E5 120deg, transparent 180deg, #4F46E5 240deg, transparent 300deg)",
    iconColor: "#4F46E5",
  },
  {
    title: "Clients as partners",
    desc: "We don't just take briefs — we dive into your business, your goals, and your users. Your success is our success.",
    icon: Handshake,
    pattern: "repeating-linear-gradient(45deg, #7C3AED10 0px, #7C3AED10 2px, transparent 2px, transparent 8px)",
    iconColor: "#7C3AED",
  },
  {
    title: "Results that matter",
    desc: "Beautiful design means nothing without results. We obsess over conversion, engagement, and measurable impact.",
    icon: TrendingUp,
    pattern: "radial-gradient(circle at 30% 40%, #10B98120 0%, transparent 50%), radial-gradient(circle at 70% 60%, #10B98115 0%, transparent 40%)",
    iconColor: "#10B981",
  },
  {
    title: "Always learning",
    desc: "Tech moves fast. We stay ahead — constantly experimenting with new tools, AI capabilities, and design trends.",
    icon: Rocket,
    pattern: "repeating-linear-gradient(-45deg, #F9731610 0px, #F9731610 3px, transparent 3px, transparent 9px)",
    iconColor: "#F97316",
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
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden border-2 border-[var(--color-border)] hover:border-[var(--color-accent2)] transition-all duration-300 hover:shadow-lg"
                data-reveal="up"
                data-delay={`${i * 0.1}`}
              >
                {/* Text */}
                <div className={`p-10 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Icon
                    size={40}
                    strokeWidth={2.5}
                    style={{ color: value.iconColor, marginBottom: "1rem" }}
                  />
                  <h3 className="text-[var(--color-ink)] mb-3">{value.title}</h3>
                  <p className="text-[var(--color-muted)] leading-relaxed">{value.desc}</p>
                </div>

                {/* Visual — abstract pattern, no icon duplication */}
                <div
                  className={`h-48 lg:h-full min-h-[200px] flex items-center justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  style={{ background: value.pattern }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
