"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PortfolioCarousel from "@/components/home/PortfolioCarousel";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Three.js scene — desktop only
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.innerWidth < 1024) return;

    let renderer: any, scene: any, camera: any, group: any;
    let animId: number;
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;

    const init = async () => {
      const THREE = await import("three");

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      group = new THREE.Group();
      scene.add(group);

      const geometries = [
        new THREE.IcosahedronGeometry(1.2, 1),
        new THREE.IcosahedronGeometry(0.7, 0),
        new THREE.OctahedronGeometry(0.9, 0),
        new THREE.IcosahedronGeometry(0.5, 1),
        new THREE.OctahedronGeometry(0.6, 0),
      ];

      const positions = [
        [0, 0, 0], [2.5, 1, -1], [-2.5, -0.5, -1.5], [1.5, -1.5, -0.5], [-1.5, 1.5, -0.5],
      ];

      geometries.forEach((geo, i) => {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x1A1A2E, wireframe: true,
          opacity: i === 0 ? 0.15 : 0.08, transparent: true,
        });
        const mesh = new THREE.Mesh(geo, mat);
        const [x, y, z] = positions[i];
        mesh.position.set(x, y, z);
        group.add(mesh);
      });

      const animate = () => {
        animId = requestAnimationFrame(animate);
        targetRotX += (mouseY * 0.0003 - targetRotX) * 0.05;
        targetRotY += (mouseX * 0.0003 - targetRotY) * 0.05;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
        group.children.forEach((mesh: any, i: number) => {
          mesh.rotation.x += 0.002 * (i % 2 === 0 ? 1 : -1);
          mesh.rotation.y += 0.003 * (i % 2 === 0 ? 1 : -1);
        });
        renderer.render(scene, camera);
      };
      animate();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    };

    const onResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    init();
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const initAnim = async () => {
      const { gsap } = await import("gsap");
      const SplitType = (await import("split-type")).default;

      const headline = headlineRef.current;
      const sub = subRef.current;
      const cta = ctaRef.current;
      const carousel = carouselRef.current;

      if (!headline) return;

      // Ensure the parent h1 is visible before split-type splits it and GSAP animates the words
      gsap.set(headline, { opacity: 1 });
      const split = new SplitType(headline, { types: "words" });

      const tl = gsap.timeline({ delay: 2.2 });

      tl.fromTo(
        split.words,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power4.out" }
      )
        .fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .fromTo(carousel, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2");

      return () => { split.revert(); tl.kill(); };
    };
    initAnim();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg)] pt-16 lg:pt-20 pb-10">
      {/* Three.js canvas — desktop only, behind text */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.85 }}
      />

      {/* Mobile gradient bg */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(79,70,229,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Text content ── */}
      <div className="container relative z-10 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-white/60 backdrop-blur-sm mb-3 text-sm text-[var(--color-muted)]"
          data-reveal="scale"
          data-delay="2.1"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent2)] animate-pulse" />
          Full-service digital agency · Based in Nepal
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-[var(--color-ink)] mb-3 max-w-4xl mx-auto"
          style={{ opacity: 0 }}
        >
          We make your brand{" "}
          <span style={{ color: "var(--color-accent2)" }}>live</span>{" "}
          in every pixel.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-lg text-[var(--color-muted)] max-w-xl mx-auto mb-5"
          style={{ opacity: 0 }}
        >
          From websites to AI tools — DigiLoop builds digital experiences that captivate, convert, and grow your business.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          style={{ opacity: 0 }}
        >
          <Link href="/work" className="btn btn-primary px-8 py-4 text-base">
            See Our Work
            <ArrowRight size={18} />
          </Link>
          <Link href="/contact" className="btn btn-ghost px-8 py-4 text-base">
            Get in Touch
          </Link>
        </div>
      </div>

      {/* ── Portfolio carousel — full-width below CTAs ── */}
      <div ref={carouselRef} style={{ opacity: 0 }}>
        <PortfolioCarousel />
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />
    </section>
  );
}
