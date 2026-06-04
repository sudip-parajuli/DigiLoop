import { Instagram, Linkedin, Twitter } from "@/components/ui/BrandIcons";

const team = [
  {
    name: "Sudip Parajuli",
    role: "Founder & Lead Developer",
    avatar: "SP",
    bio: "Full-stack developer with 5+ years building premium digital experiences. Loves clean code and strong coffee.",
    gradient: "linear-gradient(135deg, #1A1A2E, #4F46E5)",
    socials: { instagram: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Anisha Thapa",
    role: "Creative Director",
    avatar: "AT",
    bio: "Designer obsessed with typography and motion. Turns complex ideas into visual stories that stick.",
    gradient: "linear-gradient(135deg, #4A044E, #7C3AED)",
    socials: { instagram: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Roshan Karki",
    role: "Marketing Strategist",
    avatar: "RK",
    bio: "Data-driven marketer who has run campaigns generating 10x ROI for clients across Nepal and India.",
    gradient: "linear-gradient(135deg, #064E3B, #10B981)",
    socials: { instagram: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Priya Shrestha",
    role: "AI & Automation Lead",
    avatar: "PS",
    bio: "Ex-software engineer turned AI specialist. Passionate about making cutting-edge tech accessible to all businesses.",
    gradient: "linear-gradient(135deg, #172554, #06B6D4)",
    socials: { instagram: "#", linkedin: "#", twitter: "#" },
  },
];

export default function TeamGrid() {
  return (
    <section className="section bg-[var(--color-surface)]">
      <div className="container">
        <div className="text-center mb-14">
          <span className="section-label">The Team</span>
          <h2 data-reveal="up" className="text-[var(--color-ink)]">
            The people behind<br />
            <span style={{ color: "var(--color-accent2)" }}>the pixels</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="team-card" data-reveal="up">
              <div className="team-card-inner">
                {/* Front */}
                <div className="team-card-front">
                  <div
                    className="w-full h-full flex flex-col items-center justify-end pb-8"
                    style={{ background: member.gradient }}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4"
                      style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                    >
                      {member.avatar}
                    </div>
                    <h3 className="text-white text-lg font-semibold text-center px-4">{member.name}</h3>
                    <p className="text-white/60 text-sm text-center mt-1">{member.role}</p>
                  </div>
                </div>

                {/* Back */}
                <div className="team-card-back">
                  <p className="text-white/80 text-sm leading-relaxed mb-6">"{member.bio}"</p>
                  <p className="text-white font-semibold mb-1">{member.name}</p>
                  <p className="text-white/50 text-xs mb-5">{member.role}</p>
                  <div className="flex items-center gap-3">
                    {Object.entries(member.socials).map(([platform, url]) => {
                      const icons: Record<string, React.ElementType> = { instagram: Instagram, linkedin: Linkedin, twitter: Twitter };
                      const Icon = icons[platform];
                      return (
                        <a
                          key={platform}
                          href={url}
                          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
                          style={{ cursor: "none" }}
                          aria-label={platform}
                        >
                          <Icon size={14} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
