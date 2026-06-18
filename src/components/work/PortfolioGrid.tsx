"use client";

import { motion, LayoutGroup } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Sudip Parajuli Portfolio",
    category: "Web",
    tags: ["HTML", "CSS", "GSAP"],
    url: "https://sudip-parajuli.github.io/PersonalPortfolio/",
    color: "#1A1A2E",
    span: "",
    image: "/images/projects/sudip-parajuli.jpg"
  },
  {
    id: 13,
    title: "Sudip Parajuli 3D Portfolio",
    category: "Web",
    tags: ["Next.js", "GSAP", "Three.js"],
    url: "https://sudip-parajuli.com.np",
    color: "#0A0A16",
    span: "col-span-1 md:col-span-2",
    image: "/images/projects/sudip-parajuli3D.png"
  },
  {
    id: 14,
    title: "Paila Retro Restaurant",
    category: "Web",
    tags: ["Next.js", "TailwindCSS", "Aesthetics"],
    url: "https://pailarestrosample-web.vercel.app/",
    color: "#1F110A",
    span: "",
    image: "/images/projects/paila-retro.png"
  },
  {
    id: 2,
    title: "EasyMoto Platform",
    category: "Web",
    tags: ["React", "E-Commerce", "API"],
    url: "https://www.easymoto.com.np/public-home/",
    color: "#0F172A",
    span: "",
    image: "/images/projects/easymoto.jpg"
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
    id: 15,
    title: "Kwality Beach Resort",
    category: "Web",
    tags: ["HTML", "CSS", "GSAP", "Responsive"],
    url: "https://rbresortredesign.vercel.app/",
    color: "#0A2E2F",
    span: "",
    image: "/images/projects/kb-resort.jpg"
  },
  {
    id: 16,
    title: "Five Star Hotel",
    category: "Web",
    tags: ["Next.js", "TailwindCSS", "Booking"],
    url: "https://5starhotelsample.vercel.app/",
    color: "#2B1E10",
    span: "",
    image: "/images/projects/five-star-hotel.jpg"
  }
];

export default function PortfolioGrid() {
  return (
    <section className="section bg-[var(--color-bg)]">
      <div className="container">
        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
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
                        className="object-cover object-top"
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
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
