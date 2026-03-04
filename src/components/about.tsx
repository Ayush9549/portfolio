"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Target, Cpu, User, Activity, Flame, Medal, Terminal } from "lucide-react";

export function About() {
    const abilities = [
        { label: "Clean Code", icon: Cpu, value: "98%", color: "text-blue-400" },
        { label: "Performance", icon: Zap, value: "95%", color: "text-yellow-400" },
        { label: "Architecture", icon: Shield, value: "90%", color: "text-purple-400" },
        { label: "Precision", icon: Target, value: "99%", color: "text-brand-cyan" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="about" className="py-32 relative bg-black font-mono overflow-hidden">
            <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left Side: Survival Profile */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-10"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[10px] font-black uppercase tracking-widest mb-6 italic">
                                <Activity size={12} className="animate-pulse" />
                                <span>Player Intelligence Analysis</span>
                            </div>
                            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-8 uppercase leading-none">
                                Elite <span className="text-brand-cyan">Full Stack</span> <br />
                                Survivor
                            </h2>
                            <div className="space-y-6 text-sm md:text-lg text-muted-foreground font-medium leading-relaxed max-w-xl">
                                <p>
                                    Specialized in <span className="text-white font-bold italic border-b border-brand-cyan/40">High-Intensity Environments</span> (MERN Stack, Next.js, React Native).
                                    Weapon of choice: <span className="text-brand-cyan font-bold italic">TypeScript</span>.
                                </p>
                                <p>
                                    Based in <span className="text-white font-bold italic">Pochinki (India)</span>, deploying solutions worldwide.
                                    My mission is to clear the fog of bad UX and deliver <span className="text-brand-cyan font-bold italic">Chicken Dinner Performance</span> to every client.
                                </p>
                            </div>
                        </motion.div>

                        {/* Ability Stats Card */}
                        <motion.div variants={itemVariants} className="game-card p-8 border-l-4 border-brand-cyan relative overflow-hidden group">
                            <div className="text-[10px] font-black text-brand-cyan/40 tracking-[0.4em] uppercase mb-6 flex items-center gap-2">
                                <Flame size={12} className="text-brand-cyan animate-bounce" /> Talent Loadout
                            </div>
                            <div className="space-y-6">
                                {abilities.map((ability, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                            <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                                                <ability.icon size={14} className={ability.color} />
                                                {ability.label}
                                            </span>
                                            <span className={ability.color}>{ability.value}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full p-[1px]">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: ability.value }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: i * 0.1 }}
                                                className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${ability.color.replace('text', 'bg')}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Inventory / Awards Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: "Elite Repos", value: "50+", sub: "Total Weapons", icon: Cpu, color: "text-brand-cyan" },
                            { label: "Win Rate", value: "100%", sub: "Project Success", icon: Medal, color: "text-yellow-400" },
                            { label: "Squad Size", value: "20+", sub: "Collab Partners", icon: User, color: "text-blue-400" },
                            { label: "Rank", value: "#1", sub: "Performance Tier", icon: Activity, color: "text-red-500" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ y: -10, rotateY: 10, scale: 1.05 }}
                                className="game-card p-6 flex flex-col items-center text-center group cursor-help relative"
                            >
                                <div className={`w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:bg-current/10 transition-all duration-500 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <h4 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">{stat.value}</h4>
                                <div className="space-y-1">
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${stat.color.replace('text', 'text-opacity-60')}`}>{stat.label}</p>
                                    <p className="text-[8px] text-muted-foreground uppercase font-black">{stat.sub}</p>
                                </div>

                                {/* HUD Scanning effect on hover */}
                                <div className="absolute inset-0 bg-brand-cyan/0 group-hover:bg-brand-cyan/5 transition-colors pointer-events-none" />

                                {/* Decorative Corner Accents */}
                                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20" />
                                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20" />
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
                <div className="text-[200px] font-black uppercase italic whitespace-nowrap animate-pulse">CHARACTER PROFILE CHARACTER PROFILE</div>
            </div>
        </section>
    );
}
