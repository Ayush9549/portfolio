"use client";

import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Testimonials } from "@/components/testimonials";
import { HUD } from "@/components/hud";
import { LoadingScreen } from "@/components/loading-screen";
import { CustomCursor } from "@/components/custom-cursor";
import { SectionReveal } from "@/components/section-reveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <LoadingScreen />
      <HUD />

      <Hero />

      <SectionReveal>
        <Experience />
      </SectionReveal>

      <SectionReveal>
        <About />
      </SectionReveal>

      <SectionReveal>
        <Projects />
      </SectionReveal>

      <SectionReveal>
        <Skills />
      </SectionReveal>

      <SectionReveal>
        <Testimonials />
      </SectionReveal>

      <SectionReveal>
        <Contact />
      </SectionReveal>

      <footer className="py-12 bg-black border-t border-white/5 text-center font-mono">
        <div className="container px-6 mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            © {new Date().getFullYear()} AYUSH9549 • MISSION ACCOMPLISHED • WINNER WINNER CHICKEN DINNER
          </p>
        </div>
      </footer>
    </main>
  );
}
