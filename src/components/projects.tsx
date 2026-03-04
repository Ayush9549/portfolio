"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ShieldCheck, MapPin, Crosshair } from "lucide-react";
import { use3DTilt } from "@/hooks/use-3d-tilt";

const categories = ["All", "Web", "Mobile", "WordPress"];

const projects = [
    {
        title: "Project: Celebration",
        sub: "PassportForCelebration",
        status: "Completed",
        reward: "10,000 XP",
        description: "High-stakes event platform with seamless cross-border payment integration.",
        tech: ["PHP", "PayPal", "MySQL"],
        category: "Web",
        link: "https://passportforcelebration.com",
        github: "https://github.com/Ayush9549",
        image: "/projects/passport.jpg"
    },
    {
        title: "Mission: FestBuzz",
        sub: "Event Management",
        status: "Active",
        reward: "8,500 XP",
        description: "Next-gen festival discovery engine powered by AWS and MongoDB.",
        tech: ["Next.js", "AWS", "MongoDB"],
        category: "Web",
        link: "https://festbuzz.in",
        github: "https://github.com/Ayush9549",
        image: "/projects/festbuzz.jpg"
    },
    {
        title: "Drop: ShareItClub",
        sub: "P2P Book Exchange",
        status: "In Development",
        reward: "12,000 XP",
        description: "Proximity-based book trading app with real-time tactical chat.",
        tech: ["ReactNative", "Socket.io", "Expo"],
        category: "Mobile",
        link: "#",
        github: "https://github.com/Ayush9549",
        image: "/projects/book.jpg"
    },
    {
        title: "Operation: TexTile",
        sub: "B2B Marketplace",
        status: "Completed",
        reward: "9,000 XP",
        description: "Industrial scale marketplace for the textile trade industry.",
        tech: ["Supabase", "React Native", "PostgreSQL"],
        category: "Mobile",
        link: "#",
        github: "https://github.com/Ayush9549",
        image: "/projects/textile.jpg"
    },
    {
        title: "HyrUp: Service HQ",
        sub: "Marketplace Hub",
        status: "Active",
        reward: "15,000 XP",
        description: "Premium service marketplace with hyper-accurate map tracking.",
        tech: ["Next.js", "Google Maps", "Supabase"],
        category: "Web",
        link: "#",
        github: "https://github.com/Ayush9549",
        image: "/projects/hyrup.jpg"
    },
    {
        title: "The Wedding Entry",
        sub: "Cultural Immersion",
        status: "Legendary",
        reward: "20,000 XP",
        description: "Strategic platform for global travelers seeking authentic cultural experiences.",
        tech: ["Next.js", "Node.js", "TypeScript"],
        category: "Web",
        link: "https://theweddingentry.com",
        github: "https://github.com/Ayush9549",
        image: "/projects/wedding.jpg"
    }
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
    const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative cursor-pointer"
        >
            <div className="game-card p-0 flex flex-col h-full hover:border-brand-cyan/40 transition-all bg-black/80" style={{ transform: "translateZ(50px)" }}>
                {/* Image & HUD */}
                <div className="relative aspect-video overflow-hidden" style={{ transform: "translateZ(80px)" }}>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />

                    {/* HUD Elements */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                        <div className="bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10 flex items-center gap-2">
                            <ShieldCheck size={10} className="text-brand-cyan" />
                            <span className="text-[8px] font-black text-white uppercase tracking-widest">{project.status}</span>
                        </div>
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                        <div className="bg-brand-cyan text-black font-black text-[10px] px-2 py-0.5 italic">
                            {project.reward}
                        </div>
                    </div>

                    {/* Crosshair decoration */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40 transition-opacity">
                        <Crosshair size={40} className="text-brand-cyan animate-spin-slow" />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-grow flex flex-col" style={{ transform: "translateZ(100px)" }}>
                    <div>
                        <div className="text-[10px] font-bold text-brand-cyan uppercase tracking-[0.2em] mb-1">{project.sub}</div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:text-brand-cyan transition-colors line-clamp-1">{project.title}</h3>
                    </div>

                    <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2">
                        {project.description}
                    </p>

                    <div className="pt-4 mt-auto border-t border-white/5 flex justify-between items-center">
                        <div className="flex gap-1.5 font-bold uppercase text-[8px] text-brand-cyan/60">
                            {project.tech.map((t, i) => (
                                <span key={i}>{t}</span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {project.github !== "#" && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-black transition-all">
                                    <Github size={14} />
                                </a>
                            )}
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-black transition-all">
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        className="h-full bg-brand-cyan shadow-[0_0_10px_#22D3EE]"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = projects.filter(project =>
        activeCategory === "All" || project.category === activeCategory
    );

    return (
        <section id="projects" className="py-32 relative bg-black font-mono overflow-hidden [perspective:1000px]">
            {/* Background Map Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />

            <div className="container px-6 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-2 uppercase">
                            Tactical <span className="text-brand-cyan">Deployments</span>
                        </h2>
                        <p className="text-muted-foreground font-bold tracking-[0.4em] uppercase text-[10px] flex items-center gap-2">
                            <MapPin size={12} className="text-brand-cyan" /> Select Mission Objective
                        </p>
                    </motion.div>

                    {/* Gamified Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${activeCategory === cat
                                        ? "bg-brand-cyan text-black border-brand-cyan shadow-[0_0_20px_#22d3ee]"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:border-brand-cyan/50 hover:text-white"
                                    }`}
                                style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <ProjectCard key={project.title} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <style jsx>{`
         .animate-spin-slow {
            animation: spin 10s linear infinite;
         }
         @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
         }
      `}</style>
        </section>
    );
}
