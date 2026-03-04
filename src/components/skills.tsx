"use client";

import { motion } from "framer-motion";
import { Globe, Database, Smartphone, Cpu, Target } from "lucide-react";
import { use3DTilt } from "@/hooks/use-3d-tilt";

const skillCategories = [
    {
        name: "Primary Weapon",
        sub: "Frontend Architecture",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        icon: Globe,
        rarity: "Legendary",
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        name: "Heavy Artillery",
        sub: "Backend & DevOps",
        items: ["Node.js", "Express", "Supabase", "MongoDB", "AWS", "Docker"],
        icon: Database,
        rarity: "Epic",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        name: "Tactical Gear",
        sub: "Mobile Development",
        items: ["React Native", "Expo", "iOS/Android", "Native Modules"],
        icon: Smartphone,
        rarity: "Rare",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        name: "Attachments",
        sub: "Real-time & Utils",
        items: ["Socket.io", "Redux", "Zustand", "PHP/MySQL", "Git"],
        icon: Cpu,
        rarity: "Common",
        color: "text-gray-400",
        bg: "bg-white/5"
    }
];

function SkillCard({ cat }: { cat: typeof skillCategories[0] }) {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="game-card p-0 group cursor-crosshair"
        >
            <div className="flex flex-col md:flex-row h-full" style={{ transform: "translateZ(50px)" }}>
                {/* Visual Icon Section */}
                <div className={`w-full md:w-32 flex items-center justify-center p-6 ${cat.bg}`} style={{ transform: "translateZ(80px)" }}>
                    <div className={`relative ${cat.color} group-hover:scale-125 transition-transform duration-500`}>
                        <cat.icon size={48} />
                        <div className="absolute -inset-4 bg-current/20 blur-xl rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 space-y-6" style={{ transform: "translateZ(100px)" }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{cat.name}</h3>
                            <p className="text-[10px] text-brand-cyan uppercase font-bold tracking-widest">{cat.sub}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-1 border border-current font-black uppercase italic ${cat.color}`}>
                            {cat.rarity}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {cat.items.map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.2)", translateZ: 20 }}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm flex items-center gap-2 group/tag cursor-crosshair shadow-lg"
                            >
                                <Target size={12} className="text-brand-cyan opacity-40 group-hover/tag:opacity-100" />
                                <span className="text-xs font-bold text-white uppercase tracking-tighter">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mastery Bar */}
                    <div className="pt-4">
                        <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                            <span>Mastery Level</span>
                            <span className="text-brand-cyan">Level 99</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full p-[1px]">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "95%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-brand-cyan shadow-[0_0_10px_#22D3EE]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-8 h-8 flex items-end justify-start overflow-hidden pointer-events-none">
                <div className="w-16 h-1 bg-brand-cyan/20 rotate-45 transform origin-bottom-left" />
            </div>
        </motion.div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="py-32 relative overflow-hidden bg-black font-mono [perspective:1000px]">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container px-6 mx-auto">
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-4 uppercase">
                            Technical <span className="text-brand-cyan">Arsenal</span>
                        </h2>
                        <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Loadout configuration for high-performance scale</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {skillCategories.map((cat, idx) => (
                        <SkillCard key={idx} cat={cat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
