"use client";

import { motion } from "framer-motion";
import { Zap, Trophy, Target, Award, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const combatStats = [
    { label: "Matches Played", value: 3, unit: "Years", icon: Zap, sub: "Experience in Field" },
    { label: "Total Kills", value: 15, unit: "Projs", icon: Target, sub: "Projects Completed" },
    { label: "Winner Chickens", value: 10, unit: "Wins", icon: Trophy, sub: "Happy Clients" },
    { label: "Survival Time", value: 50, unit: "Repos", icon: Award, sub: "Technologies Mastered" },
];

function CountUp({ value, unit }: { value: number; unit: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        if (start === end) return;

        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, 50);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span className="flex items-baseline gap-1">
            {count}+ <span className="text-xl font-black text-brand-cyan/60">{unit}</span>
        </span>
    );
}

export function Experience() {
    return (
        <section id="experience" className="py-32 relative overflow-hidden bg-black font-mono">
            {/* Background Digital Rain Effect (Subtle) */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
                <div className="flex flex-wrap gap-4 text-[10px] break-all">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="animate-pulse">01010101110010101010101101</div>
                    ))}
                </div>
            </div>

            <div className="container px-6 mx-auto relative z-10">
                <div className="flex flex-col items-center mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-4 uppercase leading-none">
                            Career <span className="text-brand-cyan">Service Record</span>
                        </h2>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-brand-cyan/40 tracking-[0.4em]">
                            <Terminal size={12} className="text-brand-cyan" /> Authenticating Combat Records
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {combatStats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50, rotateX: 20 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="game-card p-8 border-t-2 border-brand-cyan relative group lg:hover:shadow-[0_20px_40px_rgba(34,211,238,0.1)] transition-all"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div className="w-14 h-14 bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan group-hover:scale-110 group-hover:bg-brand-cyan group-hover:text-black transition-all duration-300">
                                    <stat.icon size={32} />
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-[10px] font-black text-brand-cyan italic uppercase tracking-widest">Stat Track™</div>
                                    <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">ID: {8492 + idx}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    <CountUp value={stat.value} unit={stat.unit} />
                                </div>
                                <p className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.3em]">{stat.label}</p>
                                <p className="text-[8px] text-muted-foreground uppercase font-black leading-relaxed">{stat.sub}</p>
                            </div>

                            {/* Animated Scanner Bar on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/0 via-brand-cyan/5 to-transparent h-full w-full opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />

                            {/* Decorative Lines */}
                            <div className="absolute bottom-2 right-2 flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-1 h-3 bg-brand-cyan/20" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </section>
    );
}
