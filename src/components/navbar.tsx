"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Mail, Target, Shield, Zap, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "LOBBY", href: "#", icon: User },
    { name: "MISSIONS", href: "#projects", icon: Target },
    { name: "PROFILE", href: "#about", icon: Shield },
    { name: "ARSENAL", href: "#skills", icon: Zap },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 px-6",
                isScrolled ? "py-4" : "py-8"
            )}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo / System ID */}
                <motion.a
                    href="#"
                    className="flex flex-col z-[160]"
                >
                    <span className="text-2xl font-black italic tracking-tighter text-white">
                        AYUSH<span className="text-brand-cyan">.9549</span>
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-brand-cyan/60 -mt-1">
                        System Operational
                    </span>
                </motion.a>

                {/* Desktop HUD Nav */}
                <div className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-sm">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="group px-6 py-2 flex items-center gap-2 hover:bg-brand-cyan transition-all duration-300 relative overflow-hidden"
                            style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }}
                        >
                            <link.icon size={14} className="text-brand-cyan group-hover:text-black transition-colors" />
                            <span className="text-[10px] font-black text-white group-hover:text-black uppercase tracking-widest leading-none">
                                {link.name}
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>

                {/* System Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="https://github.com/Ayush9549" target="_blank" className="w-10 h-10 bg-white/5 flex items-center justify-center text-white/40 hover:text-brand-cyan hover:bg-white/10 transition-all border border-white/10">
                        <Github size={18} />
                    </a>
                    <a href="#contact" className="px-6 py-2 bg-brand-cyan text-black font-black text-[10px] uppercase tracking-widest italic flex items-center gap-2 shadow-[0_0_20px_#22d3ee50]">
                        <Mail size={14} /> Extraction
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-[160] p-2 bg-brand-cyan text-black"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-[140] bg-black/95 flex flex-col items-center justify-center p-12 overflow-hidden"
                    >
                        <div className="space-y-8 w-full max-w-xs">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between border-b-2 border-white/5 py-4 group"
                                >
                                    <span className="text-4xl font-black italic text-white group-hover:text-brand-cyan transition-colors">{link.name}</span>
                                    <link.icon size={24} className="text-brand-cyan" />
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full bg-brand-cyan text-black p-4 text-center font-black uppercase italic text-xl tracking-tighter"
                            >
                                Extraktion Protocol
                            </motion.a>
                        </div>

                        {/* Background Text */}
                        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none flex items-center justify-center">
                            <div className="text-[200px] font-black uppercase italic rotate-90">MENU</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
