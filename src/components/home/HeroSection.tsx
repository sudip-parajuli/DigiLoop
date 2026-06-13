"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioCarousel from "@/components/home/PortfolioCarousel";

const TOTAL_FRAMES = 360;

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollTriggerInstance = useRef<any>(null);

  // Helper to get image path
  const getFramePath = (index: number) => {
    const frameNum = String(index).padStart(4, "0");
    return `/images/hero-sequence/frame_${frameNum}.jpg`;
  };

  // Helper to draw image cover style
  const drawImageCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    const w = canvas.width;
    const h = canvas.height;
    const iw = img.width;
    const ih = img.height;
    
    const r = Math.min(w / iw, h / ih);
    let nw = iw * r;
    let nh = ih * r;
    
    if (nw < w) {
      nw = w;
      nh = w / (iw / ih);
    }
    if (nh < h) {
      nh = h;
      nw = h * (iw / ih);
    }

    const cx = (iw - (w / nw) * iw) * 0.5;
    const cy = (ih - (h / nh) * ih) * 0.5;
    const cw = (w / nw) * iw;
    const ch = (h / nh) * ih;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, w, h);
  };

  // Preload first frame immediately to prevent layout shifts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution to match container size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      
      // Re-draw current frame if available
      const img = imagesRef.current[0];
      if (img && img.complete) {
        drawImageCover(ctx, img, canvas);
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      drawImageCover(ctx, firstImg, canvas);
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Preload all other frames in the background
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Load first frame separately (already handled, but store it)
    const loadRemainingImages = async () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          imagesRef.current[i - 1] = img;
          loadedCount++;
          setImagesLoaded(loadedCount);
          if (loadedCount === TOTAL_FRAMES) {
            setIsPreloading(false);
          }
        };
        images.push(img);
      }
    };

    loadRemainingImages();
  }, []);

  // Wire up ScrollTrigger and Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initSequence = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const renderFrame = (index: number) => {
        // Find closest loaded frame to prevent blank screen
        let img = imagesRef.current[index];
        if (!img || !img.complete) {
          // search backward for nearest loaded frame
          for (let i = index; i >= 0; i--) {
            if (imagesRef.current[i] && imagesRef.current[i].complete) {
              img = imagesRef.current[i];
              break;
            }
          }
        }
        // if still not found, search forward
        if (!img || !img.complete) {
          for (let i = index; i < TOTAL_FRAMES; i++) {
            if (imagesRef.current[i] && imagesRef.current[i].complete) {
              img = imagesRef.current[i];
              break;
            }
          }
        }

        if (img && img.complete) {
          drawImageCover(ctx, img, canvas);
        }
      };

      const sequenceObj = { frame: 0 };

      // Pin the section and animate the frame number + text/carousel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            // Force redraw immediately based on scroll progress
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.floor(self.progress * TOTAL_FRAMES)
            );
            renderFrame(frameIndex);
          }
        },
      });

      scrollTriggerInstance.current = tl.scrollTrigger;

      // 1. Text fades out from 0% to 35% scroll progress
      tl.to(
        textContainerRef.current,
        {
          autoAlpha: 0,
          y: -80,
          ease: "power2.inOut",
        },
        0.05
      );

      // 2. Frame sequence runs from 0% to 100%
      tl.to(
        sequenceObj,
        {
          frame: TOTAL_FRAMES - 1,
          snap: "frame",
          ease: "none",
          duration: 1, // Normalized duration inside timeline
        },
        0
      );

      // 3. Carousel container fades and slides in from bottom between 50% to 100%
      tl.fromTo(
        carouselContainerRef.current,
        {
          autoAlpha: 0.5,
          y: 25,
        },
        {
          autoAlpha: 1,
          y: -50,
          ease: "power2.out",
        },
        0.5
      );
    };

    initSequence();

    return () => {
      if (scrollTriggerInstance.current) {
        scrollTriggerInstance.current.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--color-bg)]"
      style={{ height: "300vh" }}
    >
      {/* Sticky container that spans the viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12"
      >
        {/* Apple-style sticky Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            objectFit: "cover",
            opacity: 0.25,
            mixBlendMode: "luminosity",
          }}
        />

        {/* Dynamic vignette gradient layer for legibility */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, transparent 40%, var(--color-bg) 95%)",
          }}
        />

        {/* ── Top Header Text Content ── */}
        <div
          ref={textContainerRef}
          className="container relative z-10 text-center mx-auto my-auto max-w-4xl"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-white/60 backdrop-blur-sm mb-4 text-sm text-[var(--color-muted)]"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent2)] animate-pulse" />
            Strategy, Innovation & Analytics · Based in Nepal
          </div>

          {/* Headline */}
          <h1 className="text-[var(--color-ink)] mb-4 leading-tight">
            Transforming Businesses Through{" "}
            <span style={{ color: "var(--color-accent2)" }}>Strategy. Innovation. Analytics.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[var(--color-muted)] max-w-xl mx-auto mb-10 leading-relaxed">
            SIA Enterprises helps businesses grow through modern web development, AI solutions, automation, digital marketing, and data-driven strategies.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn btn-primary px-8 py-4 text-base" style={{ cursor: "none" }}>
              Book a Consultation
              <ArrowRight size={18} />
            </Link>
            <Link href="/work" className="btn btn-ghost px-8 py-4 text-base" style={{ cursor: "none" }}>
              View Our Work
            </Link>
          </div>
        </div>

        {/* ── Bottom Content: Carousel ── */}
        <div
          ref={carouselContainerRef}
          className="relative z-10 w-full"
          style={{ opacity: 0.5, transform: "translateY(25px)" }}
        >
          <div className="container text-center mb-4">
            <span className="text-xs font-mono text-[var(--color-muted)] tracking-widest uppercase">
              Scroll down to explore our work
            </span>
          </div>
          <PortfolioCarousel />
        </div>

        {/* Loading overlay for image preloading */}
        {isPreloading && (
          <div className="absolute bottom-4 right-4 z-20 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[var(--color-border)] text-[10px] font-mono text-[var(--color-muted)] flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent2)] animate-ping" />
            Optimizing interactive assets ({Math.round((imagesLoaded / TOTAL_FRAMES) * 100)}%)
          </div>
        )}
      </div>
    </section>
  );
}
