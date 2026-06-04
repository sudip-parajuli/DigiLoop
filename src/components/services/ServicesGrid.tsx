import { Globe, Mail, Share2, TrendingUp, Bot, Cpu, Palette, CreditCard } from "lucide-react";

const services = [
  {
    icon: Globe, title: "Website Design & Development",
    desc: "Custom websites built for performance, aesthetics, and conversions. From landing pages to full web apps.",
    deliverables: ["Responsive design", "SEO optimized", "CMS integration", "Performance audit"],
    timeline: "2–4 weeks",
    color: "#4F46E5",
  },
  {
    icon: Mail, title: "Digital Invitations",
    desc: "Beautifully animated digital invitations for weddings, birthdays, corporate events, and more.",
    deliverables: ["Custom animation", "RSVP management", "WhatsApp share", "Multiple formats"],
    timeline: "3–5 days",
    color: "#7C3AED",
  },
  {
    icon: Share2, title: "Social Media Management",
    desc: "End-to-end social media strategy, content creation, scheduling, and analytics reporting.",
    deliverables: ["Content calendar", "Graphic design", "Caption writing", "Monthly reports"],
    timeline: "Ongoing",
    color: "#EC4899",
  },
  {
    icon: TrendingUp, title: "Digital Marketing",
    desc: "Data-driven paid and organic campaigns across Google, Meta, and other platforms.",
    deliverables: ["Ad campaigns", "Landing pages", "A/B testing", "ROI tracking"],
    timeline: "Ongoing",
    color: "#F59E0B",
  },
  {
    icon: Bot, title: "Automation",
    desc: "Automate repetitive business workflows using Zapier, Make, or custom scripts.",
    deliverables: ["Workflow mapping", "Integration setup", "Testing", "Documentation"],
    timeline: "1–2 weeks",
    color: "#10B981",
  },
  {
    icon: Cpu, title: "AI Integration",
    desc: "Embed GPT-powered chatbots, AI search, content generation tools into your products.",
    deliverables: ["AI API setup", "Custom UI", "Prompt engineering", "Ongoing support"],
    timeline: "2–3 weeks",
    color: "#06B6D4",
  },
  {
    icon: Palette, title: "Graphic Design",
    desc: "Brand identities, illustrations, UI assets, and visual content that make you unmissable.",
    deliverables: ["Logo & brand kit", "Social assets", "Illustrations", "Print-ready files"],
    timeline: "1–2 weeks",
    color: "#F97316",
  },
  {
    icon: CreditCard, title: "Print & Branding",
    desc: "Business cards, letterheads, flyers, and brochures with premium print-ready designs.",
    deliverables: ["Business cards", "Letterhead", "Flyers", "Brand guide"],
    timeline: "5–7 days",
    color: "#8B5CF6",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section bg-[var(--color-surface)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent2)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                data-reveal="up"
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${service.color}15` }}
                  >
                    <Icon size={26} style={{ color: service.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--color-ink)] mb-2">{service.title}</h3>
                    <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed">{service.desc}</p>
                    <ul className="grid grid-cols-2 gap-1.5 mb-4">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                          <span style={{ color: service.color }}>✓</span> {d}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-3 py-1 rounded-full font-mono"
                        style={{ background: `${service.color}15`, color: service.color }}
                      >
                        ⏱ {service.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
