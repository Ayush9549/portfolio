"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('.game-card') ||
                target.closest('button') ||
                target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-cyan z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center"
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? "rgba(34, 211, 238, 0.2)" : "transparent",
                }}
            >
                <div className="w-1 h-1 bg-brand-cyan rounded-full" />
            </motion.div>

            {/* Subtle Outer Glow */}
            <motion.div
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                }}
                className="fixed top-0 left-0 w-0 h-0 z-[9998] pointer-events-none"
            >
                <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-cyan/5 blur-[100px] rounded-full" />
            </motion.div>
        </>
    );
}
