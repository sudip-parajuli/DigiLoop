"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  { q: "How long does it take to build a website?", a: "Timelines vary by project size. A basic 3-page site takes 1–2 weeks, while a full custom website with CMS takes 3–5 weeks. We'll give you a specific timeline after our discovery call." },
  { q: "Do you work with clients outside Nepal?", a: "Absolutely! We work with clients globally. Our team communicates primarily in English and Nepali, and we're comfortable working across time zones." },
  { q: "What do you need from me to get started?", a: "We'll start with a brief consultation call to understand your goals. From there, we'll need your brand assets (logo, photos if any), content direction, and access to any existing accounts. We guide you through everything." },
  { q: "Do you offer ongoing maintenance and support?", a: "Yes. We offer monthly retainer packages for maintenance, content updates, SEO monitoring, and technical support. Ask us about our Growth plan for ongoing services." },
  { q: "Can you help if I already have a website?", a: "Definitely. We offer redesigns, speed optimizations, SEO audits, and feature additions for existing websites. Just share your current site and we'll assess what's needed." },
  { q: "How do payments work?", a: "We typically take 50% upfront and 50% upon delivery. For larger projects, we can split into 3 milestones. We accept bank transfers, eSewa, and international payments via Wise." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-[var(--color-bg)]">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label">FAQ</span>
          <h2 data-reveal="up" className="text-[var(--color-ink)]">
            Questions? We've got{" "}
            <span style={{ color: "var(--color-accent2)" }}>answers</span>
          </h2>
        </div>

        <div className="space-y-0" data-reveal="up">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button
                className="faq-trigger"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className="faq-icon">
                  <Plus size={14} style={{ color: open === i ? "#fff" : "var(--color-muted)" }} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="text-sm text-[var(--color-muted)] pb-5 leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
