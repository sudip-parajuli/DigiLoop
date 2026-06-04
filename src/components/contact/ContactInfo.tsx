import { MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";

const info = [
  { icon: MapPin, label: "Location", value: "Kathmandu, Nepal" },
  { icon: Mail, label: "Email", value: "hello@digiloop.com.np", href: "mailto:hello@digiloop.com.np" },
  { icon: Phone, label: "Phone", value: "+977 980-0000000", href: "tel:+9779800000000" },
  { icon: Clock, label: "Response time", value: "Within 24 hours" },
];

export default function ContactInfo() {
  return (
    <div className="sticky top-24">
      <h3 className="text-[var(--color-ink)] mb-2">Other ways to reach us</h3>
      <p className="text-[var(--color-muted)] text-sm mb-8 leading-relaxed">
        Prefer a quick chat? We're available on WhatsApp for fast communication.
      </p>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/9779800000000"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 rounded-xl mb-6 transition-transform duration-200 hover:-translate-y-1"
        style={{
          background: "#25D366",
          color: "#fff",
          cursor: "none",
          boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
        }}
      >
        <MessageCircle size={22} />
        <div>
          <p className="font-semibold text-sm">Chat on WhatsApp</p>
          <p className="text-white/70 text-xs">Usually replies in minutes</p>
        </div>
      </a>

      {/* Info items */}
      <div className="space-y-5">
        {info.map(({ icon: Icon, label, value, href }) => (
          <div key={label} className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--color-accent3)" }}
            >
              <Icon size={18} style={{ color: "var(--color-accent2)" }} />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)] mb-0.5 font-mono tracking-wide uppercase">{label}</p>
              {href ? (
                <a href={href} className="text-[var(--color-ink)] text-sm font-medium hover:text-[var(--color-accent2)] transition-colors" style={{ cursor: "none" }}>
                  {value}
                </a>
              ) : (
                <p className="text-[var(--color-ink)] text-sm font-medium">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Google Map embed placeholder */}
      <div
        className="mt-8 rounded-xl overflow-hidden border border-[var(--color-border)]"
        style={{ height: "200px", background: "var(--color-accent3)" }}
      >
        <iframe
          title="DigiLoop Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625556187!2d85.29111251779784!3d27.709030847479847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
          width="100%"
          height="200"
          style={{ border: 0, filter: "grayscale(1) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
