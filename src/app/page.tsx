"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useSmoothScroll from "@/hooks/useSmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import PhysicsFooter from "@/components/PhysicsFooter";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scrolling globally
  useSmoothScroll();

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingScreen onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full min-h-screen flex flex-col"
        >

          {/* Fixed morph element for ScrollTrigger transition */}
          <div
            id="travel-img"
            className="fixed pointer-events-none z-[9999] bg-cover bg-center border border-accent"
            style={{
              backgroundImage: "url('/assets/about-photo.png')",
              boxShadow: "none",
              display: "none"
            }}
          />

          <Navbar />

          <main className="w-full flex-grow">
            <Hero />
            <About />
            <TechStack />
            <Services />
            <FeaturedProjects />
            <Experience />
            <Contact />
          </main>

          <PhysicsFooter />
        </motion.div>
      )}
    </>
  );
}
