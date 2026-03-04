"use client";

import { motion } from "framer-motion";
import { User, Battery, Shield, Target, Map, Zap, Settings, Trophy } from "lucide-react";

export function HUD() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[100] p-6 lg:p-10 font-mono overflow-hidden select-none [perspective:1000px]">
            {/* Top Bar: Player Info & Status */}
            <div className="flex justify-between items-start">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05, translateZ: 50 }}
                    className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 pointer-events-auto cursor-pointer"
                >
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center text-brand-cyan">
                        <User size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-white font-bold tracking-tighter uppercase text-sm">Ayush9549</span>
                            <span className="text-[10px] px-2 py-0.5 bg-brand-cyan/20 text-brand-cyan rounded-full font-black border border-brand-cyan/30">LVL 99</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "85%" }}
                                    className="h-full bg-brand-cyan shadow-[0_0_10px_#22D3EE]"
                                />
                            </div>
                            <span className="text-[8px] text-brand-cyan font-bold">85% XP</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-end gap-3"
                >
                    <div className="flex items-center gap-4 text-white/40 uppercase text-[10px] tracking-[0.2em] font-black">
                        <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-400" /> Latency: 12ms</span>
                        <span className="flex items-center gap-1 text-green-400">● Live Status</span>
                    </div>
                    <div className="flex gap-2">
                        {[Settings, Trophy].map((Icon, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.2, translateZ: 100 }}
                                className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white/60 pointer-events-auto cursor-pointer hover:bg-brand-cyan/20 hover:text-brand-cyan transition-colors shadow-lg"
                            >
                                <Icon size={18} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Center: Crosshair overlay with breathe effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative w-12 h-12"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-brand-cyan" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-brand-cyan" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-brand-cyan" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-brand-cyan" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full shadow-[0_0_10px_#22D3EE]" />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Layout: Health & Equipment */}
            <div className="absolute bottom-0 inset-x-0 p-6 lg:p-10">
                <div className="flex flex-col lg:flex-row justify-between items-end gap-8">

                    {/* Health & Shield */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.05, translateZ: 50 }}
                        className="flex items-end gap-4 pointer-events-auto cursor-crosshair"
                    >
                        <div className="space-y-3">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-tighter text-blue-400">
                                    <span className="flex items-center gap-1"><Shield size={10} /> Armor</span>
                                    <span>100 / 100</span>
                                </div>
                                <div className="h-2 w-48 md:w-64 bg-white/5 border border-white/10 rounded-sm overflow-hidden p-[2px]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        className="h-full bg-blue-500 rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-tighter text-red-500">
                                    <span className="flex items-center gap-1"><Battery size={10} /> Health</span>
                                    <span>100 / 100</span>
                                </div>
                                <div className="h-4 w-48 md:w-64 bg-white/5 border border-white/10 rounded-sm overflow-hidden p-[2px]">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        className="h-full bg-red-500 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Minimap Placeholder with depth */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        whileHover={{ scale: 1.1, rotateY: 20, translateZ: 100 }}
                        className="hidden lg:block w-44 h-44 bg-black/60 backdrop-blur-md rounded-full border-4 border-white/10 relative overflow-hidden pointer-events-auto cursor-pointer shadow-2xl"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#22d3ee20_100%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:15px_15px]" />
                        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
                            <Map size={32} className="text-brand-cyan/20" />
                            <motion.div
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute w-2.5 h-2.5 bg-brand-cyan rounded-full shadow-[0_0_15px_#22D3EE]"
                            />
                        </div>
                        <div className="absolute bottom-6 inset-x-0 text-center text-[8px] font-black uppercase tracking-widest text-brand-cyan/40">POCHINKI SECTOR</div>
                        <div className="absolute inset-0 border-[10px] border-black/40 animate-pulse rounded-full" />
                    </motion.div>

                    {/* Weapon / Tech Slot with hover zoom */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-end gap-3"
                    >
                        <div className="group/item pointer-events-auto cursor-pointer border-r-4 border-brand-cyan pr-4">
                            <div className="text-[10px] text-brand-cyan font-black text-right uppercase tracking-widest mb-1 opacity-60">Equipped Language</div>
                            <motion.div
                                whileHover={{ scale: 1.1, x: -10 }}
                                className="text-3xl md:text-5xl font-black text-white italic tracking-tighter"
                            >
                                TYPESCRIPT
                            </motion.div>
                            <div className="flex justify-end gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                        className="w-4 h-1 bg-brand-cyan"
                                    />
                                ))}
                            </div>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.2, rotate: 10, translateZ: 80 }}
                            className="w-16 h-16 md:w-24 md:h-24 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center text-brand-cyan overflow-hidden relative group/btn pointer-events-auto cursor-pointer shadow-xl"
                        >
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Target size={48} className="md:w-16 md:h-16" />
                            </motion.div>
                            <div className="absolute inset-0 bg-brand-cyan/0 group-hover/btn:bg-brand-cyan/20 transition-colors" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-20" />
        </div>
    );
}
