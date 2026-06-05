"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const categories = ["All", "Web", "Branding", "Social"];

const projects = [
  {
    id: 1,
    title: "Sudip Parajuli Portfolio",
    category: "Web",
    tags: ["Next.js", "GSAP", "Three.js"],
    url: "https://sudip-parajuli.com.np",
    color: "#1A1A2E",
    span: "col-span-1 md:col-span-2",
    image: "/images/projects/sudip-parajuli.jpg"
  },
  {
    id: 2,
    title: "EasyMoto Platform",
    category: "Web",
    tags: ["React", "E-Commerce", "API"],
    url: "https://easymoto.com.np",
    color: "#0F172A",
    span: "",
    image: "/images/projects/easymoto.jpg"
  },
  {
    id: 3,
    title: "Bunapa Organic Brand",
    category: "Branding",
    tags: ["Logo", "Identity", "Packaging"],
    url: "#",
    color: "#0B132B",
    span: "",
    image: "/images/projects/logo_bunapa.png"
  },
  {
    id: 4,
    title: "Aryal Farm Website",
    category: "Web",
    tags: ["WordPress", "SEO", "Responsive"],
    url: "https://aryalfarm.com.np",
    color: "#052E16",
    span: "",
    image: "/images/projects/aryal-farm.jpg"
  },
  {
    id: 5,
    title: "Amicus Legal Chambers",
    category: "Web",
    tags: ["WordPress", "Legal Services"],
    url: "https://amicus.com.np",
    color: "#1C1917",
    span: "",
    image: "/images/projects/amicus.jpg"
  },
  {
    id: 6,
    title: "FootyBitez Brand Identity",
    category: "Branding",
    tags: ["Logo", "Sports Brand"],
    url: "#",
    color: "#1A0505",
    span: "col-span-1 md:col-span-2",
    image: "/images/projects/logo_footybitez.png"
  },
  {
    id: 7,
    title: "TechWired Corporate Portal",
    category: "Web",
    tags: ["Next.js", "Corporate site"],
    url: "https://techwired-solutions.vercel.app",
    color: "#0B1528",
    span: "",
    image: "/images/projects/techwired.jpg"
  },
  {
    id: 8,
    title: "Zaalo Brand Identity",
    category: "Branding",
    tags: ["Logo", "Modern Fashion"],
    url: "#",
    color: "#18181B",
    span: "",
    image: "/images/projects/logo_zaalo.jpg"
  },
  {
    id: 9,
    title: "Nepal Now Travel Portal",
    category: "Social",
    tags: ["Branding", "Tourism Campaign"],
    url: "#",
    color: "#3F0712",
    span: "",
    image: "/images/projects/logo_nepalnow.jpg"
  },
  {
    id: 10,
    title: "EasyMoto Brand Identity",
    category: "Branding",
    tags: ["Logo", "Corporate Identity"],
    url: "#",
    color: "#0F2B4A",
    span: "",
    image: "/images/projects/logo_easymoto.jpg"
  },
  {
    id: 11,
    title: "Aryal Farm Brand Identity",
    category: "Branding",
    tags: ["Logo Design", "Packaging Theme"],
    url: "#",
    color: "#0F2A10",
    span: "",
    image: "/images/projects/logo_aryalfarm.jfif"
  },
  {
    id: 12,
    title: "Amicus Legal Logo",
    category: "Branding",
    tags: ["Corporate Logo", "Corporate Theme"],
    url: "#",
    color: "#1A1208",
    span: "",
    image: "/images/projects/logo_amicus.jpg"
  }
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
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => {
                const isBranding = project.category === "Branding";
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={project.span}
                  >
                    <div
                      className="portfolio-grid-card group relative overflow-hidden rounded-xl bg-neutral-900 border border-[var(--color-border)] shadow-md"
                      style={{ aspectRatio: project.span ? "21/10" : "4/3" }}
                    >
                      {/* Image container */}
                      <div
                        className="w-full h-full relative transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundColor: project.color }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className={isBranding ? "object-contain p-10 sm:p-12 md:p-14" : "object-cover object-top"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                          priority={project.id <= 3}
                        />
                      </div>

                      {/* Overlay */}
                      <div className="portfolio-grid-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end p-5 md:p-6 pointer-events-none">
                        <div className="pointer-events-auto">
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] md:text-xs font-mono font-medium px-2 py-0.5 rounded-full text-white/80"
                                style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-white text-base md:text-lg font-semibold leading-snug mb-1">{project.title}</h3>
                          <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-mono block mb-3">
                            {project.category}
                          </span>
                          {project.url !== "#" && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[var(--color-accent2)] hover:text-white text-xs md:text-sm font-medium transition-colors"
                              style={{ cursor: "none" }}
                            >
                              View Live <ExternalLink size={12} className="md:w-3.5 md:h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
