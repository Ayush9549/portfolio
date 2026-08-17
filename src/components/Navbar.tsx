"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled || mobileOpen
          ? "py-3 lg:py-5 bg-[#050816]/80 border-b border-white/[0.06] backdrop-blur-xl"
          : "py-4 lg:py-7 bg-transparent border-b border-transparent"
          }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center py-4" style={{paddingBlock: "10px"}}>

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="Home"
          >
            <span className="font-mono text-lg font-bold tracking-tight text-white group-hover:text-accent transition-colors duration-200">
              Ayush Kumawat<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Nav — pill container */}
          <div
            className={`hidden lg:flex items-center gap-5 px-3 py-1.5 rounded-full border transition-all duration-500 backdrop-blur-md ${scrolled
              ? "bg-[#050816]/80 border-white/[0.1]"
              : "bg-[#050816]/60 border-white/[0.08]"
              }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-200 ${activeLink === link.href
                  ? "text-white bg-white/10"
                  : "text-neutral-300 hover:text-white hover:bg-white/[0.08]"
                  }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Hire me CTA (desktop only) */}
            <a
              href="#contact"
              className="hidden lg:flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 hover:bg-accent/15 text-accent font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-200"
              style={{padding:"5px 10px"}}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Hire Me
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-line text-white hover:text-accent hover:border-accent/40 transition-all duration-200 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-full left-0 w-full z-[99] lg:hidden pt-2"
            >
              <div className="mx-4 rounded-2xl border border-white/[0.08] bg-[#050816]/95 backdrop-blur-xl overflow-hidden">
                <div className="flex flex-col px-4 py-4 gap-1">
                  {navLinks.map((link, idx) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        setActiveLink(link.href);
                      }}
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.04, duration: 0.2 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-widest text-secondary hover:text-white hover:bg-white/[0.05] transition-all duration-200 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                      {link.name}
                    </motion.a>
                  ))}

                  {/* Mobile hire me */}
                  <div className="mt-2 pt-3 border-t border-white/[0.06]">
                    <a
                      href="#contact"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-accent/30 bg-accent/5 text-accent font-mono text-[10px] uppercase tracking-widest font-semibold hover:bg-accent/15 transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Hire Me
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
