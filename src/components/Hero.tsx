"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set initial mute state
      video.muted = muted;
      
      // Attempt to autoplay with audio
      video.play().catch((error) => {
        console.log("Autoplay with sound blocked, muting to autoplay:", error);
        // Fallback: mute to allow autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
          videoRef.current.play().catch((err) => {
            console.error("Muted autoplay failed too:", err);
          });
        }
      });
    }

    // Intersection observer to automatically mute when out of view and unmute when entering view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (!entry.isIntersecting) {
            videoRef.current.muted = true;
            setMuted(true);
          } else {
            videoRef.current.muted = false;
            setMuted(false);
          }
        }
      },
      {
        root: null, // viewport
        threshold: 0, // trigger as soon as it enters or leaves view
      }
    );

    const heroSection = document.getElementById("hero");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Fullscreen Video */}
      <video
        ref={videoRef}
        src="/assets/hero-intro.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="auto"
      />

      {/* Subtle dark vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"

      />

      {/* Mute / Unmute Toggle — top right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute top-24 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest hover:border-accent/60 hover:bg-black/60 transition-all duration-200 cursor-pointer"
        style={{ boxShadow: "none" }}
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        {/* <span>{muted ? "Unmute" : "Mute"}</span> */}
      </motion.button>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-mono text-[9px] tracking-widest text-white uppercase animate-bounce pointer-events-none"
      >
        <span>Scroll</span>
        <ArrowDown size={10} />
      </motion.div>
    </section>
  );
}
