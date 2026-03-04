"use client";

import { motion } from "framer-motion";
import { Phone, Radio } from "lucide-react";

export function FloatingCall() {
    return (
        <motion.a
            href="tel:9549511906"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[150] w-16 h-16 bg-brand-cyan text-black flex items-center justify-center shadow-[0_0_30px_#22d3ee] group"
            style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)" }}
        >
            <div className="relative">
                <Phone size={28} className="relative z-10" />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white rounded-full -z-0"
                />
            </div>

            <div className="absolute right-full mr-4 bg-black/80 backdrop-blur-md border border-brand-cyan/20 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="flex items-center gap-2">
                    <Radio size={12} className="text-brand-cyan animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Request Comms</span>
                </div>
            </div>

            {/* Tactical border accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/40" />
        </motion.a>
    );
}
