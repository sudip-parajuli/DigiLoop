const milestones = [
  { year: "2022", title: "SIA Founded", desc: "Started as a boutique consulting & development group in Kathmandu with a single laptop and a big vision." },
  { year: "2023", title: "First 10 Clients", desc: "Delivered 10 platforms, landed our first corporate client, and grew the team to 3 people." },
  { year: "2023", title: "Expanded Services", desc: "Added strategy consulting, business process automation, and data analytics to our offering." },
  { year: "2024", title: "AI Integration Launch", desc: "Built our first AI-powered product — an automated customer service system for a retail client." },
  { year: "2024", title: "40+ Projects Delivered", desc: "Crossed 40 successful project deliveries across web, branding, social, and automation." },
  { year: "2025", title: "Going Regional", desc: "Onboarded clients from India and the UK. SIA Enterprises goes beyond borders." },
];

export default function JourneyTimeline() {
  return (
    <section className="section bg-[var(--color-surface)]">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">Our Journey</span>
          <h2 data-reveal="up" className="text-[var(--color-ink)]">
            From a laptop to a{" "}
            <span style={{ color: "var(--color-accent2)" }}>team</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "var(--color-border)" }}
          />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-8" data-reveal="left" data-delay={`${i * 0.08}`}>
                {/* Dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "var(--color-accent)",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {m.year}
                  </div>
                </div>

                {/* Content */}
                <div className="pb-8 flex-1">
                  <h4 className="text-[var(--color-ink)] font-semibold mb-1">{m.title}</h4>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
