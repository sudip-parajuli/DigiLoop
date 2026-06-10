import { Globe, Cpu, Bot, TrendingUp, Search, BarChart3, Palette, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Globe, title: "Custom Web Development",
    desc: "Premium, responsive web applications engineered for speed, security, and scalability. From landing pages to custom portals.",
    deliverables: ["Next.js & React", "SEO optimized", "Headless CMS integration", "Performance optimization"],
    timeline: "2–4 weeks",
    color: "#4F46E5",
  },
  {
    icon: Cpu, title: "AI Integration & Automation",
    desc: "Embed cognitive AI capabilities, GPT models, intelligent search, and autonomous bots into your products and services.",
    deliverables: ["OpenAI & LLM APIs", "Custom UI interfaces", "Prompt engineering", "Semantic vector search"],
    timeline: "2–3 weeks",
    color: "#06B6D4",
  },
  {
    icon: Bot, title: "Business Process Automation",
    desc: "Streamline repetitive business tasks and cut overhead operational costs using custom script integration and automated workflows.",
    deliverables: ["Workflow optimization", "Third-party APIs", "Zapier & Make builds", "Database pipelines"],
    timeline: "1–2 weeks",
    color: "#10B981",
  },
  {
    icon: TrendingUp, title: "Digital Marketing",
    desc: "Data-driven organic and paid growth strategies across Google, Meta, and multiple search/social distribution networks.",
    deliverables: ["Ad campaign setups", "Targeted copy", "A/B testing", "Conversion metrics"],
    timeline: "Ongoing",
    color: "#F59E0B",
  },
  {
    icon: Search, title: "SEO Optimization",
    desc: "Improve structural readability, search engine crawler parsing, index visibility, and content authority to scale traffic.",
    deliverables: ["Technical audit", "Keyword architecture", "Page-speed updates", "Backlink outreach"],
    timeline: "Ongoing",
    color: "#7C3AED",
  },
  {
    icon: BarChart3, title: "Data Analytics & Reporting",
    desc: "Turn raw tracking telemetry into beautiful visual dashboards, attribution streams, and clean business intelligence.",
    deliverables: ["Google Analytics 4", "Custom dashboards", "Conversion tracking", "Attribution modeling"],
    timeline: "1–2 weeks",
    color: "#8B5CF6",
  },
  {
    icon: Palette, title: "UI/UX Design",
    desc: "Human-centric user interface design and interactive prototypes tailored exactly to your brand personality.",
    deliverables: ["Figma prototypes", "Wireframing", "Style guides", "User flows"],
    timeline: "1–2 weeks",
    color: "#F97316",
  },
  {
    icon: Lightbulb, title: "Technical Consulting",
    desc: "Enterprise systems design, architecture mapping, code reviews, technology reviews, and growth-phase product advice.",
    deliverables: ["Architecture design", "Systems audit", "Cost analysis", "Consultation docs"],
    timeline: "Ongoing",
    color: "#EC4899",
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
