"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const logs = [
  "Initializing premium modules...",
  "Loading graphics and gravity buffers...",
  "Injecting GSAP scroll drivers...",
  "Synthesizing tech capabilities...",
  "Rendering AI introduction channels...",
  "Building Future Experiences..."
];

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "App Developer"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Progress increment timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Log cycler timer matching progress
    const logStep = Math.ceil(100 / logs.length);
    const currentLogIndex = Math.min(
      Math.floor(progress / logStep),
      logs.length - 1
    );
    setLogIndex(() => currentLogIndex);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Multiply role array for seamless infinite sliding text loop
  const roleList = [...roles, ...roles, ...roles, ...roles];

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      {/* Background Sliding Text (Right to Left) with enhanced visibility and slower speed */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-0 opacity-45 overflow-hidden space-y-4 sm:space-y-8">
        {/* Top Row - Slow Sliding Right to Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            className="flex whitespace-nowrap gap-10 text-2xl sm:text-4xl md:text-5xl font-bold tracking-widest text-neutral-400 uppercase font-mono"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 55,
            }}
          >
            {roleList.map((role, idx) => (
              <span key={`r1-${idx}`} className="flex items-center gap-10">
                <span>{role}</span>
                <span className="text-accent opacity-75">•</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Center Row (Just behind the main name) - Slow Sliding Right to Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            className="flex whitespace-nowrap gap-12 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-widest text-accent uppercase"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 42,
            }}
          >
            {roleList.map((role, idx) => (
              <span key={`r2-${idx}`} className="flex items-center gap-12">
                <span className="outline-text opacity-90">{role}</span>
                <span className="text-primary">•</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Row - Slow Sliding Right to Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            className="flex whitespace-nowrap gap-10 text-2xl sm:text-4xl md:text-5xl font-bold tracking-widest text-neutral-400 uppercase font-mono"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 50,
            }}
          >
            {roleList.map((role, idx) => (
              <span key={`r3-${idx}`} className="flex items-center gap-10">
                <span>{role}</span>
                <span className="text-accent opacity-75">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Foreground Center Content - "Ayush Kumawat" and Progress Bar */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl">
        {/* Subtle Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-neutral-800 bg-neutral-950/90 text-xs font-mono text-accent"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>SYSTEM LOADING</span>
        </motion.div>

        {/* Center Main Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans whitespace-nowrap"
        >
          Ayush Kumawat
        </motion.h1>

        {/* Progress Log & Progress Bar */}
        <div className="mt-8 w-full max-w-sm flex flex-col items-center">
          <div className="w-full flex justify-between items-center text-xs font-mono text-neutral-300 mb-2 px-1">
            <span className="truncate max-w-[75%] text-secondary">
              {logs[logIndex]}
            </span>
            <span className="text-accent font-bold">{progress}%</span>
          </div>

          {/* Progress Bar (No Shadow) */}
          <div className="w-full h-[3px] bg-neutral-900 overflow-hidden relative rounded-full border border-neutral-800">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


