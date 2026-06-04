"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Sudip Parajuli",
    category: "Portfolio · Web Design",
    url: "https://sudip-parajuli.com.np",
    image: "/images/projects/sudip-parajuli.jpg",
    bg: "#1A1A2E",
  },
  {
    title: "EasyMoto",
    category: "E-Commerce · Automotive",
    url: "https://easymoto.com.np",
    image: "/images/projects/easymoto.jpg",
    bg: "#0F172A",
  },
  {
    title: "TechWired Solutions",
    category: "Corporate · Tech",
    url: "https://techwired-solutions.vercel.app",
    image: "/images/projects/techwired.jpg",
    bg: "#0D0D0D",
  },
  {
    title: "Aryal Farm",
    category: "Agriculture · Branding",
    url: "https://aryalfarm.com.np",
    image: "/images/projects/aryalfarm.jpg",
    bg: "#0A1628",
  },
  {
    title: "Amicus",
    category: "Legal · Professional",
    url: "https://amicus.com.np",
    image: "/images/projects/amicus.jpg",
    bg: "#1C1C1E",
  },
];

export default function PortfolioCarousel() {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      const { Swiper } = await import("swiper");
      const { Navigation, Pagination, EffectCoverflow, Autoplay } = await import("swiper/modules");

      // Dynamically import swiper CSS
      await import("swiper/css");
      await import("swiper/css/effect-coverflow");
      await import("swiper/css/navigation");
      await import("swiper/css/pagination");

      const swiper = new Swiper(".swiper-portfolio", {
        modules: [Navigation, Pagination, EffectCoverflow, Autoplay],
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
        coverflowEffect: {
          rotate: 30,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          slideChangeTransitionStart: (swiper: any) => {
            applyBurnEffect(swiper.slides[swiper.activeIndex]);
          },
        },
      });

      swiperRef.current = swiper;
    };

    const applyBurnEffect = (slide: HTMLElement) => {
      if (!slide) return;
      const img = slide.querySelector("img");
      if (!img) return;

      // Animate SVG feDisplacementMap turbulence
      const filterId = `burn-filter-${Date.now()}`;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("style", "position:absolute;width:0;height:0");
      svg.innerHTML = `
        <defs>
          <filter id="${filterId}">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="2">
              <animate attributeName="baseFrequency" from="0.015 0.015" to="0.08 0.08" dur="0.3s" fill="freeze"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="0;40;0" dur="0.6s" fill="freeze"/>
            </feDisplacementMap>
          </filter>
        </defs>
      `;
      document.body.appendChild(svg);
      img.style.filter = `url(#${filterId})`;
      setTimeout(() => {
        img.style.filter = "";
        document.body.removeChild(svg);
      }, 700);
    };

    init();

    return () => {
      if (swiperRef.current) swiperRef.current.destroy(true, true);
    };
  }, []);

  return (
    <section className="portfolio-section section-lg">
      <div className="container mb-12">
        <span className="section-label" style={{ color: "rgba(255,255,255,0.4)" }}>Selected Work</span>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2
            className="text-white"
            data-reveal="up"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work that speaks<br />
            <span style={{ color: "var(--color-accent2)" }}>for itself</span>
          </h2>
          <a
            href="/work"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
            style={{ cursor: "none" }}
          >
            View all projects <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Swiper */}
      <div className="swiper swiper-portfolio px-4" style={{ paddingBottom: "3rem" }}>
        <div className="swiper-wrapper">
          {projects.map((project) => (
            <div
              key={project.title}
              className="swiper-slide"
              style={{ width: "min(680px, 90vw)" }}
            >
              <div className="portfolio-card group" style={{ background: project.bg }}>
                {/* Project Image / Placeholder */}
                <div
                  className="w-full h-full absolute inset-0 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${project.bg}, #4F46E510)` }}
                >
                  {/* Placeholder content for when images aren't available */}
                  <div className="text-center px-8">
                    <div
                      className="text-6xl font-bold mb-4 opacity-10"
                      style={{ fontFamily: "var(--font-display)", color: "white" }}
                    >
                      {project.title[0]}
                    </div>
                    <div
                      className="text-white/20 font-mono text-sm tracking-widest"
                    >
                      {project.url.replace("https://", "")}
                    </div>
                  </div>
                </div>

                {/* Overlay */}
                <div className="portfolio-card-overlay opacity-100">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                    style={{ background: "rgba(79,70,229,0.3)", color: "var(--color-accent2)", border: "1px solid rgba(79,70,229,0.4)" }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-white text-2xl font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {project.title}
                  </h3>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
                    style={{ cursor: "none" }}
                  >
                    View Case <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
        <div className="swiper-pagination" style={{ bottom: "0.5rem" }} />
      </div>
    </section>
  );
}
