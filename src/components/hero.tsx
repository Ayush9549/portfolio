"use client";

import { motion, AnimatePresence, useScroll, useTransform as useMotionTransform } from "framer-motion";
import { Play, Volume2, Share2, MessageCircle, Target, Zap, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { use3DTilt } from "@/hooks/use-3d-tilt";

export function Hero() {
    const [glitch, setGlitch] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt();

    const { scrollY } = useScroll();
    const y1 = useMotionTransform(scrollY, [0, 500], [0, 200]);
    const scale = useMotionTransform(scrollY, [0, 500], [1, 1.2]);

    useEffect(() => {
        const triggerGlitch = () => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        };
        const interval = setInterval(() => {
            if (Math.random() > 0.8) triggerGlitch();
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-mono [perspective:1500px]"
        >
            {/* Lobby Background with Parallax */}
            <motion.div
                style={{ y: y1, scale }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 pointer-events-none"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/lobby-bg.png')" }}
                />
            </motion.div>
            <div className="absolute inset-0 vignette pointer-events-none" />

            {/* 3D Depth Particles Simulation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-cyan rounded-full animate-pulse blur-sm" />
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-brand-violet rounded-full animate-pulse blur-md" />
                <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
            </div>

            {/* Glitch Overlay */}
            <AnimatePresence>
                {glitch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-brand-cyan mix-blend-overlay z-40 pointer-events-none animate-glitch"
                    />
                )}
            </AnimatePresence>

            <div className="container relative z-10 px-6 mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Side: Game Menu / Navigation */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-full lg:w-1/3 order-2 lg:order-1"
                    >
                        <div className="space-y-4">
                            {[
                                { label: "Classic Matches", sub: "View Projects", icon: Target, href: "#projects" },
                                { label: "Training Ground", sub: "Tech Arsenal", icon: Zap, href: "#skills" },
                                { label: "Career Results", sub: "Work Experience", icon: Shield, href: "#experience" },
                                { label: "Global Chat", sub: "Get in Touch", icon: MessageCircle, href: "#contact" },
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.href}
                                    whileHover={{ x: 20, scale: 1.05, translateZ: 50 }}
                                    className="group flex items-center gap-6 p-1 bg-black/40 backdrop-blur-md border-l-4 border-white/10 hover:border-brand-cyan transition-all game-card cursor-pointer"
                                >
                                    <div className="w-16 h-16 bg-white/5 flex items-center justify-center text-white/40 group-hover:text-brand-cyan transition-colors">
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-white group-hover:tracking-widest transition-all italic uppercase">{item.label}</h3>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">{item.sub}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Center Side: 3D Character Focus / Title */}
                    <motion.div
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                        className="w-full lg:w-1/2 flex flex-col items-center text-center order-1 lg:order-2"
                    >
                        <div className="relative" style={{ transform: "translateZ(100px)" }}>
                            <div className="absolute -inset-20 bg-brand-cyan/20 blur-[120px] rounded-full animate-pulse" />

                            <div className="relative z-10">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="mb-6 inline-block"
                                >
                                    <span className="px-4 py-1 bg-brand-cyan text-brand-cyan-foreground font-black text-xs uppercase tracking-[0.5em] italic shadow-[0_0_20px_#22D3EE]">
                                        Conqueror Tier
                                    </span>
                                </motion.div>

                                <h1 className="text-6xl md:text-[10rem] font-black text-white italic tracking-tighter leading-[0.8] mb-4 drop-shadow-[0_0_50px_rgba(34,211,238,0.5)]">
                                    AYUSH<br />
                                    <span className="text-brand-cyan">KUMAWAT</span>
                                </h1>

                                <p className="text-sm md:text-xl text-white/60 font-bold uppercase tracking-[0.4em] mb-12 shadow-sm">
                                    Senior Full Stack • UI Architect • Gamified Dev
                                </p>

                                <div className="flex items-center justify-center gap-6" style={{ transform: "translateZ(150px)" }}>
                                    <motion.button
                                        whileHover={{ scale: 1.1, translateZ: 200 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-brand-cyan text-black game-button flex items-center gap-3 shadow-[0_0_60px_rgba(34,211,238,0.7)]"
                                    >
                                        <Play size={24} className="fill-current" />
                                        <span>Start Journey</span>
                                    </motion.button>

                                    <div className="flex gap-3">
                                        {[Volume2, Share2].map((Icon, i) => (
                                            <button key={i} className="w-14 h-14 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all rounded-sm">
                                                <Icon size={20} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Kill Feed Simulations */}
            <div className="absolute top-32 right-6 hidden md:flex flex-col gap-2 items-end z-20">
                <motion.div
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 2 }}
                    className="bg-black/60 backdrop-blur-sm px-4 py-2 border-r-4 border-red-500 flex items-center gap-3"
                >
                    <span className="text-white text-[10px] font-bold italic">Ayush9549 <span className="text-red-500">KILLED</span> Bad Code</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                </motion.div>
            </div>

            {/* 3D Floating Accents */}
            <div className="absolute bottom-10 right-10 text-white/5 text-[15rem] font-black uppercase italic pointer-events-none select-none tracking-tighter leading-none" style={{ transform: "translateZ(-100px)" }}>
                S1
            </div>

            {/* Scanning HUD lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(34,211,238,0.05)_50%,transparent_100%)] bg-[size:100%_200px] animate-scan pointer-events-none" />
        </section>
    );
}
