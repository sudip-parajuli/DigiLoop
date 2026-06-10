"use client";

import { useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "SIA Enterprises completely transformed our online presence. The website they built for us has been our best salesperson — leads come in every day now.",
    name: "Rajesh Shrestha",
    company: "TechWired Solutions",
    role: "Founder & CEO",
    avatar: "RS",
    rating: 5,
  },
  {
    quote: "The digital invitation they designed for our wedding was absolutely stunning. Every guest was amazed. The attention to detail was incredible.",
    name: "Priya & Amit Joshi",
    company: "Personal",
    role: "Wedding Clients",
    avatar: "PJ",
    rating: 5,
  },
  {
    quote: "Their social media management turned our dormant accounts into active community hubs. Engagement went up 400% in just 3 months.",
    name: "Sujata Adhikari",
    company: "Aryal Farm",
    role: "Marketing Director",
    avatar: "SA",
    rating: 5,
  },
  {
    quote: "The AI integration they built for our customer service saved us 20 hours per week. ROI was visible within the first month.",
    name: "Bikash Thapa",
    company: "EasyMoto Nepal",
    role: "Operations Head",
    avatar: "BT",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  useEffect(() => {
    const init = async () => {
      const { Swiper } = await import("swiper");
      const { Pagination, Autoplay, A11y } = await import("swiper/modules");
      await import("swiper/css");
      await import("swiper/css/pagination");

      new Swiper(".swiper-testimonials", {
        modules: [Pagination, Autoplay, A11y],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: ".testimonials-pagination", clickable: true },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
        a11y: { prevSlideMessage: "Previous testimonial", nextSlideMessage: "Next testimonial" },
      });
    };
    init();
  }, []);

  return (
    <section className="section noise-bg bg-[var(--color-bg)]">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="section-label">What Clients Say</span>
          <h2 data-reveal="up" className="text-[var(--color-ink)]">
            Trusted by businesses<br />
            <span style={{ color: "var(--color-accent2)" }}>across Nepal</span>
          </h2>
        </div>

        <div className="swiper swiper-testimonials" style={{ paddingBottom: "3rem" }}>
          <div className="swiper-wrapper">
            {testimonials.map((t) => (
              <div key={t.name} className="swiper-slide">
                <div className="testimonial-card h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="var(--color-accent2)" color="var(--color-accent2)" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[var(--color-ink)] text-sm leading-relaxed mb-6 relative z-10">
                    "{t.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-accent2))" }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-[var(--color-ink)] text-sm font-semibold">{t.name}</p>
                      <p className="text-[var(--color-muted)] text-xs">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="testimonials-pagination"
            style={{ position: "relative", marginTop: "2rem", textAlign: "center" }}
          />
        </div>
      </div>
    </section>
  );
}
