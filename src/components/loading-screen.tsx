"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, Shield, Zap, Target } from "lucide-react";

export function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("INITIALIZING SYSTEM...");

    const logs = [
        "LOADING TACTICAL ASSETS...",
        "CONNECTING TO GLOBAL SERVERS...",
        "OPTIMIZING SHADERS...",
        "ESTABLISHING SECURE CONNECTION...",
        "SCANNING FOR HOSTILES...",
        "WEAPONS ARMED...",
        "READY FOR EXTRACTION."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                const next = prev + Math.random() * 15;
                return next > 100 ? 100 : next;
            });
        }, 200);

        const logInterval = setInterval(() => {
            setStatus(logs[Math.floor(Math.random() * logs.length)]);
        }, 800);

        return () => {
            clearInterval(interval);
            clearInterval(logInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-6 font-mono overflow-hidden"
                >
                    {/* Background Digital Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                    <div className="relative z-10 w-full max-w-sm">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center mb-12"
                        >
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-24 h-24 border-2 border-brand-cyan/20 border-t-brand-cyan rounded-full flex items-center justify-center"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Target size={40} className="text-brand-cyan animate-pulse" />
                                </div>
                            </div>
                            <h1 className="mt-6 text-2xl font-black italic tracking-tighter text-white">
                                AYUSH<span className="text-brand-cyan">.9549</span>
                            </h1>
                        </motion.div>

                        {/* Progress Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-brand-cyan font-black uppercase tracking-[0.3em] mb-1">Status Report</span>
                                    <motion.span
                                        key={status}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-xs text-white font-bold h-4"
                                    >
                                        {status}
                                    </motion.span>
                                </div>
                                <span className="text-2xl font-black text-brand-cyan italic">{Math.floor(progress)}%</span>
                            </div>

                            <div className="h-2 w-full bg-white/5 border border-white/10 p-[2px] rounded-sm">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-brand-cyan shadow-[0_0_20px_#22D3EE]"
                                />
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {[Shield, Zap, Terminal, Target].map((Icon, i) => (
                                    <div key={i} className={`h-1 rounded-full ${progress > (i + 1) * 20 ? 'bg-brand-cyan' : 'bg-white/5'}`} />
                                ))}
                            </div>
                        </div>

                        {/* System Specs Decor */}
                        <div className="mt-20 flex justify-between items-center text-[8px] font-black text-white/20 uppercase tracking-widest">
                            <span>Kernel: 0x9549</span>
                            <span>OS: Portfolio_S1</span>
                            <span>Build: 2026.03.05</span>
                        </div>
                    </div>

                    {/* Scanning Line */}
                    <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-brand-cyan/10 to-transparent pointer-events-none"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
