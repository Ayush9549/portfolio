"use client";

import { motion } from "framer-motion";

export function SectionReveal({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}

            {/* Tactical scanning bar that passes once on reveal */}
            <motion.div
                initial={{ top: "-100%" }}
                whileInView={{ top: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-x-0 h-[200px] bg-gradient-to-b from-transparent via-brand-cyan/5 to-transparent z-50 pointer-events-none"
            />
        </motion.div>
    );
}
