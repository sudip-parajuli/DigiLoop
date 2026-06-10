"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const links = menuRef.current?.querySelectorAll(".mobile-menu-link");
      if (links) {
        import("gsap").then(({ gsap }) => {
          gsap.fromTo(
            links,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power4.out", delay: 0.2 }
          );
        });
      }
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" style={{ cursor: "none" }}>
            <div className="w-10 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              <span className="text-white font-bold text-xs font-mono tracking-widest">SIA</span>
            </div>
            <span
              className="text-xl font-semibold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              SIA
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="btn btn-primary hidden lg:inline-flex text-sm py-2.5 px-5">
              Start a Project
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-ink)]"
              style={{ cursor: "none" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mobile-menu-link"
            style={{ color: "var(--color-accent2)" }}
            onClick={() => setMenuOpen(false)}
          >
            Start a Project →
          </Link>
        </div>

        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-white opacity-60 hover:opacity-100 transition-opacity"
          style={{ cursor: "none" }}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <p className="absolute bottom-8 text-white/30 text-sm font-mono tracking-widest">
          siaenterprises.com.np
        </p>
      </div>
    </>
  );
}
