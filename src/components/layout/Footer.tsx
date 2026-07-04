import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Instagram, Twitter, Linkedin, Youtube } from "@/components/ui/BrandIcons";

const footerLinks = {
  Services: [
    { label: "Web Development", href: "/services#web" },
    { label: "AI Integration", href: "/services#ai" },
    { label: "Process Automation", href: "/services#automation" },
    { label: "Digital Marketing", href: "/services#marketing" },
    { label: "Data Analytics", href: "/services#analytics" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Instagram, href: "https://instagram.com/siaenterprises.np", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/siaenterprises", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/siaenterprises", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@siaenterprises", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group" style={{ cursor: "none" }}>
              <Image
                src="/SIAlogo.png"
                alt="SIA Enterprises"
                width={140}
                height={42}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Empowering businesses through Strategy, Innovation & Analytics. Based in Kathmandu, Nepal.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon !border-white/10 !text-white/50 hover:!border-[var(--color-accent2)] hover:!text-[var(--color-accent2)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-white text-sm font-semibold mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link hover:translate-x-1 inline-block transition-transform duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} SIA Enterprises. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            Made with <span className="text-red-400">❤️</span> in Nepal
          </p>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/9779866243388"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-white" />
      </a>
    </footer>
  );
}
