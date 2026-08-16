"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, MapPin, Cpu, Calendar } from "lucide-react";

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const targetAnchor = document.getElementById("target-anchor");
    const targetImg = document.getElementById("target-img");
    const travelImg = document.getElementById("travel-img");
    const tiltWrapper = document.getElementById("tilt-wrapper");

    if (!targetAnchor || !targetImg || !travelImg || !tiltWrapper) return;

    // Linear interpolation helper
    const interpolate = (start: number, end: number, progress: number) => {
      return start + (end - start) * progress;
    };

    const updateTravelImage = (progress: number) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Get target anchor rect in viewport coordinates
      const rect = targetAnchor.getBoundingClientRect();

      // Initial dimensions for the traveling image (aspect ratio 3:4)
      const initialW = 80;
      const initialH = 107;
      const initialRad = 12;

      // Start position: Hero bottom-center
      const heroX = viewportWidth / 2 - initialW / 2;
      const heroY = viewportHeight - initialH - 30; // 30px offset from the bottom of Hero

      if (progress < 1) {
        // Reset tilt rotation and scale when scroll is not complete
        gsap.set(tiltWrapper, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          overwrite: "auto",
        });
      }

      if (progress <= 0) {
        travelImg.style.display = "none";
        targetImg.style.opacity = "0";
        return;
      }

      if (progress >= 1) {
        travelImg.style.display = "none";
        targetImg.style.opacity = "1";
        return;
      }

      // Show the traveling image during scroll
      travelImg.style.display = "block";
      targetImg.style.opacity = "0";

      let x, y, w, h, br;

      if (progress < 0.5) {
        // Phase 1: Animate from Hero bottom-center to targetAnchor top-left
        const p1 = progress / 0.5; // normalise to 0-1 for this phase

        x = interpolate(heroX, rect.left, p1);
        y = interpolate(heroY, rect.top, p1);
        w = initialW;
        h = initialH;
        br = initialRad;
      } else {
        // Phase 2: Expand from top-left of targetAnchor to fill container down to bottom-right
        const p2 = (progress - 0.5) / 0.5; // normalise to 0-1 for this phase

        x = rect.left; // fixed at top-left of the target anchor
        y = rect.top;
        w = interpolate(initialW, rect.width, p2);
        h = interpolate(initialH, rect.height, p2);
        br = interpolate(initialRad, 16, p2); // morph to border-radius of the target card (16px)
      }

      gsap.set(travelImg, {
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: br + "px",
      });
    };

    // Trigger transition based on scroll from top of about to top pinned
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: "#about",
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        updateTravelImage(self.progress);
      },
      onLeave: () => {
        updateTravelImage(1);
      },
      onLeaveBack: () => {
        updateTravelImage(0);
      },
    });

    const handleResize = () => {
      updateTravelImage(scrollTriggerInstance.progress);
    };

    // Tilt hover interactions
    const handleMouseMove = (e: MouseEvent) => {
      // Only tilt once scrolling transition has finished (travelImg is hidden)
      if (travelImg.style.display !== "none") return;

      const rect = targetAnchor.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      const maxTilt = 15; // Max tilt rotation in degrees
      const rotateX = y * 2 * maxTilt; // positive y (bottom) tilts bottom down (rotateX positive)
      const rotateY = x * 2 * maxTilt; // positive x (right) tilts right down (rotateY positive)

      gsap.to(tiltWrapper, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 0.96, // visually depress the hovered corner
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(tiltWrapper, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("resize", handleResize);
    targetAnchor.addEventListener("mousemove", handleMouseMove);
    targetAnchor.addEventListener("mouseleave", handleMouseLeave);

    // Initialize state
    updateTravelImage(0);

    return () => {
      scrollTriggerInstance.kill();
      window.removeEventListener("resize", handleResize);
      targetAnchor.removeEventListener("mousemove", handleMouseMove);
      targetAnchor.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative w-full bg-background py-24 border-b border-line overflow-hidden mt-"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Text Content & Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                  A brief look
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-transparent">
                Who I Am
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-secondary text-base md:text-lg leading-relaxed font-sans font-light">
              <p>
                I am a passionate Full-Stack Web and Mobile Developer dedicated to creating highly interactive, robust, and clean applications. With expert skills spanning the entire MERN stack, Next.js, and native mobile development using React Native (Expo), I bring complex design grids and seamless logic into reality.
              </p>
              <p>
                My work combines optimized database architectures, modular component design, and rich physics-based animation models to provide end users with premium digital products.
              </p>
            </div>

            {/* Structured details list (Role, Location, Interests, Availability) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-line/40">
              {/* Role Card */}
              <div
                className="flex justify-between items-center bg-surface/30 border border-line/50 rounded-2xl transition-all duration-300 hover:border-accent/40 hover:bg-surface/50 font-mono group relative overflow-hidden"
                style={{ padding: "20px" }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-secondary/60 uppercase tracking-widest mb-1 group-hover:text-accent/80 transition-colors duration-300">
                    Role
                  </span>
                  <span className="text-sm text-accent font-bold tracking-tight">
                    Software Developer
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-secondary/60 group-hover:text-accent group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300 scale-95 group-hover:scale-100">
                  <Terminal size={18} />
                </div>
              </div>

              {/* Location Card */}
              <div
                className="flex justify-between items-center bg-surface/30 border border-line/50 rounded-2xl transition-all duration-300 hover:border-accent/40 hover:bg-surface/50 font-mono group relative overflow-hidden"
                style={{ padding: "20px" }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-secondary/60 uppercase tracking-widest mb-1 group-hover:text-accent/80 transition-colors duration-300">
                    Location
                  </span>
                  <span className="text-sm text-white font-bold tracking-tight">
                    India
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-secondary/60 group-hover:text-accent group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300 scale-95 group-hover:scale-100">
                  <MapPin size={18} />
                </div>
              </div>

              {/* Interests Card */}
              <div
                className="flex justify-between items-center bg-surface/30 border border-line/50 rounded-2xl transition-all duration-300 hover:border-accent/40 hover:bg-surface/50 font-mono group relative overflow-hidden"
                style={{ padding: "20px" }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-secondary/60 uppercase tracking-widest mb-1 group-hover:text-accent/80 transition-colors duration-300">
                    Interests
                  </span>
                  <span className="text-sm text-white font-bold tracking-tight">
                    Animations, UI & AI
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-secondary/60 group-hover:text-accent group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300 scale-95 group-hover:scale-100">
                  <Cpu size={18} />
                </div>
              </div>

              {/* Availability Card */}
              <div
                className="flex justify-between items-center bg-surface/30 border border-line/50 rounded-2xl transition-all duration-300 hover:border-accent/40 hover:bg-surface/50 font-mono group relative overflow-hidden"
                style={{ padding: "20px" }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] text-secondary/60 uppercase tracking-widest mb-1 group-hover:text-accent/80 transition-colors duration-300">
                    Availability
                  </span>
                  <span className="text-sm text-accent font-bold tracking-tight">
                    Full-Time / Freelance
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-secondary/60 group-hover:text-accent group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300 scale-95 group-hover:scale-100">
                  <Calendar size={18} />
                </div>
              </div>
            </div>

            {/* Simple Timeline / Career Journey summary */}
            <div className="flex flex-col gap-5 mt-6">
              <span className="font-mono text-[10px] text-secondary/60 uppercase tracking-widest font-bold">Career Journey</span>
              <div className="relative flex flex-col gap-8">
                {/* Timeline vertical gradient bar */}
                <div
                  className="absolute top-2 bottom-2 bg-gradient-to-b from-accent via-line to-transparent"
                  style={{ left: "7px", width: "2px" }}
                />

                {/* Timeline item 1 */}
                <div
                  className="relative group flex flex-col gap-2 transition-all duration-300"
                  style={{ paddingLeft: "32px" }}
                >
                  {/* Glowing active node point */}
                  <div
                    className="absolute top-1 rounded-full border-2 border-accent bg-[#050816] flex items-center justify-center"
                    style={{ left: "0px", width: "16px", height: "16px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping absolute" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                  <div className="flex items-center">
                    <span className="bg-accent/15 text-accent border border-accent/35 rounded-md px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider">
                      2024 - PRESENT
                    </span>
                  </div>
                  <p className="text-sm text-secondary group-hover:text-white transition-colors duration-300 leading-relaxed font-sans font-light">
                    Leading enterprise <span className="text-white group-hover:text-accent font-medium transition-colors duration-300">ERP systems</span> and client-facing hybrid apps.
                  </p>
                </div>

                {/* Timeline item 2 */}
                <div
                  className="relative group flex flex-col gap-2 transition-all duration-300"
                  style={{ paddingLeft: "32px" }}
                >
                  {/* Past node point */}
                  <div
                    className="absolute top-1 rounded-full border-2 border-line bg-[#050816] flex items-center justify-center group-hover:border-accent/60 transition-colors duration-300"
                    style={{ left: "0px", width: "16px", height: "16px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-accent/80 transition-colors duration-300" />
                  </div>
                  <div className="flex items-center">
                    <span className="bg-white/5 text-secondary border border-white/10 rounded-md px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                      2022 - 2024
                    </span>
                  </div>
                  <p className="text-sm text-secondary group-hover:text-white transition-colors duration-300 leading-relaxed font-sans font-light">
                    Formulated full-stack <span className="text-white group-hover:text-accent font-medium transition-colors duration-300">web architectures</span> for SaaS startups.
                  </p>
                </div>

                {/* Timeline item 3 */}
                <div
                  className="relative group flex flex-col gap-2 transition-all duration-300"
                  style={{ paddingLeft: "32px" }}
                >
                  {/* Past node point */}
                  <div
                    className="absolute top-1 rounded-full border-2 border-line bg-[#050816] flex items-center justify-center group-hover:border-accent/60 transition-colors duration-300"
                    style={{ left: "0px", width: "16px", height: "16px" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 group-hover:bg-accent/80 transition-colors duration-300" />
                  </div>
                  <div className="flex items-center">
                    <span className="bg-white/5 text-secondary border border-white/10 rounded-md px-2.5 py-0.5 text-[9px] font-mono font-bold tracking-wider group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                      BEFORE 2022
                    </span>
                  </div>
                  <p className="text-sm text-secondary group-hover:text-white transition-colors duration-300 leading-relaxed font-sans font-light">
                    Structured custom <span className="text-white group-hover:text-accent font-medium transition-colors duration-300">PHP architectures</span> and WordPress core workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Morph Target Image Container (No shadow) */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div
              id="target-anchor"
              className="w-full max-w-[360px] aspect-[3/4] relative cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Tilt Wrapper (No shadow) */}
              <div
                id="tilt-wrapper"
                className="w-full h-full rounded-2xl border border-line bg-surface overflow-hidden relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* This image remains invisible (opacity 0) during transition, and shows once transition finishes */}
                <div
                  id="target-img"
                  className="absolute inset-0 bg-cover bg-center rounded-2xl transition-opacity duration-200"
                  style={{
                    backgroundImage: "url('/assets/about-photo.png')",
                    opacity: 0,
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
