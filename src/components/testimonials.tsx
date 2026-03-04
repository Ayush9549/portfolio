"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageSquare, Terminal } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO at TechFlow",
        content: "Ayush is an elite operative. He took our complex project requirements and turned them into a seamless, high-performance web application. Mission Successful!",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: 5,
        type: "Commendation"
    },
    {
        name: "Michael Chen",
        role: "Product Manager at Innovate",
        content: "The attention to detail Ayush brings to the table is unmatched. Our mobile app's engagement increased by 40%. Winner Winner Chicken Dinner!",
        avatar: "https://i.pravatar.cc/150?u=michael",
        rating: 5,
        type: "Squad Report"
    },
    {
        name: "Elena Rodriguez",
        role: "Founder of GreenGold",
        content: "Working with Ayush was like having a elite strategist on the team. He delivered ahead of schedule with all custom features. A true survival expert.",
        avatar: "https://i.pravatar.cc/150?u=elena",
        rating: 5,
        type: "Field Observation"
    }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="py-32 relative overflow-hidden bg-black font-mono">
            <div className="container px-6 mx-auto">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-6 uppercase leading-none">
                            Squad <span className="text-brand-cyan">Commendations</span>
                        </h2>
                        <div className="flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground">
                            <Terminal size={12} className="text-brand-cyan" /> Authenticated Battle Reports
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="game-card p-8 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <MessageSquare size={80} />
                            </div>

                            <div className="flex justify-between items-start mb-8">
                                <div className="flex gap-1">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-brand-cyan text-brand-cyan" />
                                    ))}
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border border-brand-cyan/40 text-brand-cyan">
                                    {item.type}
                                </span>
                            </div>

                            <div className="relative mb-8">
                                <Quote size={24} className="absolute -top-4 -left-4 text-brand-cyan/20 group-hover:text-brand-cyan transition-colors" />
                                <p className="text-sm md:text-base text-muted-foreground font-bold leading-relaxed italic uppercase tracking-tight">
                                    &quot;{item.content}&quot;
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                                <div className="w-12 h-12 rounded-sm overflow-hidden border border-white/10 group-hover:border-brand-cyan transition-colors grayscale group-hover:grayscale-0">
                                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-black text-white text-sm uppercase italic tracking-tighter group-hover:text-brand-cyan transition-colors">{item.name}</h4>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black">{item.role}</p>
                                </div>
                            </div>

                            {/* Animated Scanner Effect on Hover */}
                            <div className="absolute inset-x-0 top-0 h-[2px] bg-brand-cyan/50 opacity-0 group-hover:opacity-100 transition-opacity group-hover:animate-scan" />
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
               @keyframes scan {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(400px); }
               }
               .group:hover .animate-scan {
                  animation: scan 2s linear infinite;
               }
            `}</style>
        </section>
    );
}
