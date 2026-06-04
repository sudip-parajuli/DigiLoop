"use client";
import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: { project: "NPR 15,000", monthly: "NPR 8,000" },
    desc: "Perfect for small businesses and individuals getting started online.",
    features: [
      "3-page website",
      "Mobile responsive",
      "Basic SEO setup",
      "Contact form",
      "1 round of revisions",
      "2 weeks delivery",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Growth",
    price: { project: "NPR 45,000", monthly: "NPR 20,000" },
    desc: "For growing businesses that need a full digital presence.",
    features: [
      "Up to 8 pages",
      "CMS integration",
      "Advanced SEO",
      "Social media setup",
      "Analytics dashboard",
      "3 rounds of revisions",
      "Priority support",
      "3 weeks delivery",
    ],
    cta: "Most Popular",
    featured: true,
  },
  {
    name: "Enterprise",
    price: { project: "Custom", monthly: "Custom" },
    desc: "Full-scale digital transformation for established businesses.",
    features: [
      "Unlimited pages",
      "Custom integrations",
      "AI & automation",
      "Dedicated account manager",
      "Monthly strategy calls",
      "Unlimited revisions",
      "24/7 support",
      "Custom timeline",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

export default function PricingTable() {
  const [billing, setBilling] = useState<"project" | "monthly">("project");

  return (
    <section className="section bg-[var(--color-surface)]">
      <div className="container">
        <div className="text-center mb-12">
          <span className="section-label">Pricing</span>
          <h2 data-reveal="up" className="text-[var(--color-ink)] mb-6">
            Transparent pricing,<br />
            <span style={{ color: "var(--color-accent2)" }}>no surprises</span>
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-accent3)]">
            {(["project", "monthly"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className="px-5 py-2 rounded-md text-sm font-medium transition-all duration-200"
                style={{
                  background: billing === type ? "var(--color-ink)" : "transparent",
                  color: billing === type ? "#fff" : "var(--color-muted)",
                  cursor: "none",
                }}
              >
                {type === "project" ? "Per Project" : "Monthly"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => (
            <div key={plan.name} className={`pricing-card ${plan.featured ? "featured" : ""}`} data-reveal="up">
              <div className="mb-6">
                <h3
                  className="mb-1"
                  style={{ color: plan.featured ? "#fff" : "var(--color-ink)" }}
                >
                  {plan.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: plan.featured ? "rgba(255,255,255,0.6)" : "var(--color-muted)" }}>
                  {plan.desc}
                </p>
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-display)", color: plan.featured ? "#fff" : "var(--color-ink)" }}
                >
                  {plan.price[billing]}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check
                      size={16}
                      className="flex-shrink-0"
                      style={{ color: plan.featured ? "var(--color-accent2)" : "var(--color-accent2)" }}
                    />
                    <span style={{ color: plan.featured ? "rgba(255,255,255,0.8)" : "var(--color-muted)" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className="block text-center py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300"
                style={{
                  background: plan.featured ? "var(--color-accent2)" : "var(--color-ink)",
                  color: "#fff",
                  cursor: "none",
                }}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
