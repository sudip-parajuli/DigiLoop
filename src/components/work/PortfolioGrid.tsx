"use client";
import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Web", "Branding", "Social", "Print"];

const projects = [
  { id: 1, title: "Sudip Parajuli Portfolio", category: "Web", tags: ["Next.js", "GSAP"], url: "https://sudip-parajuli.com.np", color: "#1A1A2E", span: "col-span-2" },
  { id: 2, title: "EasyMoto Platform", category: "Web", tags: ["React", "E-Commerce"], url: "https://easymoto.com.np", color: "#0F172A", span: "" },
  { id: 3, title: "TechWired Brand Identity", category: "Branding", tags: ["Logo", "Brand Kit"], url: "https://techwired-solutions.vercel.app", color: "#1E1B4B", span: "" },
  { id: 4, title: "Aryal Farm Social Campaign", category: "Social", tags: ["Instagram", "Strategy"], url: "https://aryalfarm.com.np", color: "#064E3B", span: "" },
  { id: 5, title: "Amicus Legal Website", category: "Web", tags: ["WordPress", "SEO"], url: "https://amicus.com.np", color: "#1C1917", span: "" },
  { id: 6, title: "Wedding Invitation Series", category: "Print", tags: ["Print", "Digital"], url: "#", color: "#4A044E", span: "col-span-2" },
  { id: 7, title: "Restaurant Menu Design", category: "Print", tags: ["Brochure", "Layout"], url: "#", color: "#1C0B00", span: "" },
  { id: 8, title: "Tech Startup Branding", category: "Branding", tags: ["Logo", "Identity"], url: "#", color: "#172554", span: "" },
];

export default function PortfolioGrid() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section bg-[var(--color-bg)]">
      <div className="container">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12" data-reveal="up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: active === cat ? "var(--color-ink)" : "var(--color-surface)",
                color: active === cat ? "#fff" : "var(--color-muted)",
                border: `1px solid ${active === cat ? "var(--color-ink)" : "var(--color-border)"}`,
                cursor: "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={project.span}
                >
                  <div className="portfolio-grid-card group" style={{ aspectRatio: project.span ? "21/9" : "4/3" }}>
                    {/* Background color placeholder */}
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)` }}
                    >
                      <span
                        className="text-7xl font-bold opacity-10 text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {project.title[0]}
                      </span>
                    </div>

                    {/* Overlay */}
                    <div className="portfolio-grid-overlay">
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-0.5 rounded-full text-white/70"
                              style={{ background: "rgba(255,255,255,0.1)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-white text-lg font-semibold mb-2">{project.title}</h3>
                        {project.url !== "#" && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                            style={{ cursor: "none" }}
                          >
                            View Case <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
