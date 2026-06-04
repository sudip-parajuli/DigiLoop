"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  // Three.js scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on mobile for performance
    if (window.innerWidth < 768) return;

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

      // Create multiple icosahedral wireframe meshes
      const geometries = [
        new THREE.IcosahedronGeometry(1.2, 1),
        new THREE.IcosahedronGeometry(0.7, 0),
        new THREE.OctahedronGeometry(0.9, 0),
        new THREE.IcosahedronGeometry(0.5, 1),
        new THREE.OctahedronGeometry(0.6, 0),
      ];

      const positions = [
        [0, 0, 0],
        [2.5, 1, -1],
        [-2.5, -0.5, -1.5],
        [1.5, -1.5, -0.5],
        [-1.5, 1.5, -0.5],
      ];

      geometries.forEach((geo, i) => {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x1A1A2E,
          wireframe: true,
          opacity: i === 0 ? 0.18 : 0.1,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geo, mat);
        const [x, y, z] = positions[i];
        mesh.position.set(x, y, z);
        group.add(mesh);
      });

      sceneRef.current = { scene, camera, renderer, group };

      const animate = () => {
        animId = requestAnimationFrame(animate);
        targetRotX += (mouseY * 0.0003 - targetRotX) * 0.05;
        targetRotY += (mouseX * 0.0003 - targetRotY) * 0.05;

        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;

        // Slow drift
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

      if (!headline) return;

      const split = new SplitType(headline, { types: "words" });

      const tl = gsap.timeline({ delay: 2.2 });

      tl.fromTo(
        split.words,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power4.out" }
      )
        .fromTo(sub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

      return () => { split.revert(); tl.kill(); };
    };
    initAnim();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.9 }}
      />

      {/* Mobile gradient bg (replaces Three.js) */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(79,70,229,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 text-center pt-24 pb-16">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-white/60 backdrop-blur-sm mb-8 text-sm text-[var(--color-muted)]"
          data-reveal="scale"
          data-delay="2.1"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent2)] animate-pulse" />
          Full-service digital agency · Based in Nepal
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-[var(--color-ink)] mb-6 max-w-4xl mx-auto"
          style={{ opacity: 0 }}
        >
          We make your brand{" "}
          <span style={{ color: "var(--color-accent2)" }}>live</span>{" "}
          in every pixel.
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          className="text-lg text-[var(--color-muted)] max-w-xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          From websites to AI tools — DigiLoop builds digital experiences that captivate, convert, and grow your business.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator mt-20 mx-auto"
          data-reveal="up"
          data-delay="2.8"
        >
          <div className="scroll-dot" />
          <span className="text-xs text-[var(--color-muted)] font-mono tracking-widest uppercase">Scroll</span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
      />
    </section>
  );
}
