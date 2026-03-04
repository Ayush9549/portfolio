"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ShieldAlert, Radio, Signal, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export function Contact() {
    const [transmissionId, setTransmissionId] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        setTransmissionId(Math.random().toString(36).substring(2, 9).toUpperCase());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-black font-mono">
            {/* Background Pulse Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 blur-[150px] rounded-full pointer-events-none animate-pulse" />

            <div className="container px-6 mx-auto relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        {/* Left Side: Radio Transmission Feed */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest mb-6 italic">
                                <Radio size={12} className="animate-pulse" />
                                <span>Establishing Connection...</span>
                            </div>

                            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white mb-8 uppercase leading-none">
                                Send <span className="text-brand-cyan">Extraktion</span> <br />
                                Request
                            </h2>

                            <p className="text-sm md:text-lg text-muted-foreground font-bold tracking-tight mb-12 max-w-lg leading-relaxed uppercase">
                                Secure channel open for high-stakes collaborations. Transmit your project blueprint to HQ immediately.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { label: "Channel 01", sub: "GMAIL", value: "ayushkumawat9549@gmail.com", icon: Mail, color: "text-brand-cyan" },
                                    { label: "Channel 02", sub: "VOICE", value: "+91 95495 11906", icon: Phone, color: "text-green-500" },
                                    { label: "HQ Location", sub: "ZONE", value: "Rajasthan, India", icon: MapPin, color: "text-red-500" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="game-card p-4 flex items-center gap-6 border-l-4 border-white/10 hover:border-brand-cyan"
                                    >
                                        <div className={`w-12 h-12 bg-white/5 flex items-center justify-center ${item.color}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{item.label}</span>
                                                <span className={`text-[8px] px-1 border border-current font-black ${item.color}`}>{item.sub}</span>
                                            </div>
                                            <div className="text-sm md:text-lg font-black text-white italic tracking-tighter transition-all group-hover:tracking-widest">{item.value}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 flex items-center gap-4 text-white/20">
                                <Signal size={24} className="animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Encryption Level: AES-256 BIT</span>
                            </div>
                        </motion.div>

                        {/* Right Side: Message Input Protocol */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="game-card p-8 md:p-12 relative overflow-hidden bg-black/80">
                                {/* Decorative Overlay */}
                                <div className="absolute top-0 right-0 p-4 opacity-50"><ShieldAlert size={40} className="text-brand-cyan" /></div>

                                <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-brand-cyan uppercase tracking-widest px-1">Soldier Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="ENTER NAME..."
                                                    className="w-full bg-white/5 border-b-2 border-white/10 py-3 px-2 text-white focus:outline-none focus:border-brand-cyan transition-colors font-black tracking-tighter italic placeholder:text-white/10 uppercase"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-brand-cyan uppercase tracking-widest px-1">Comms Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="ENTER EMAIL..."
                                                    className="w-full bg-white/5 border-b-2 border-white/10 py-3 px-2 text-white focus:outline-none focus:border-brand-cyan transition-colors font-black tracking-tighter italic placeholder:text-white/10 uppercase"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-brand-cyan uppercase tracking-widest px-1">Mission Objective</label>
                                            <textarea
                                                rows={4}
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="DESCRIBE YOUR VISION..."
                                                className="w-full bg-white/5 border-b-2 border-white/10 py-3 px-2 text-white focus:outline-none focus:border-brand-cyan transition-colors font-black tracking-tighter italic placeholder:text-white/10 uppercase resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "sending" || status === "success"}
                                        className={`game-button w-full flex items-center justify-center gap-4 group transition-all ${status === "success" ? "bg-green-500 text-black shadow-[0_0_30px_#22c55e]" :
                                                status === "error" ? "bg-red-500 text-white" : "bg-brand-cyan text-black"
                                            }`}
                                    >
                                        <span className="text-xl font-black italic tracking-tighter">
                                            {status === "idle" && "Transmit Signal"}
                                            {status === "sending" && "TRANSMITTING..."}
                                            {status === "success" && "MISSION SENT"}
                                            {status === "error" && "FAILED! RETRY?"}
                                        </span>
                                        {status === "idle" && <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
                                        {status === "sending" && <Loader2 size={24} className="animate-spin" />}
                                        {status === "success" && <CheckCircle2 size={24} />}
                                    </button>

                                    <div className="flex justify-between items-center text-[8px] font-black uppercase text-white/30 tracking-[0.3em]">
                                        <span>Status: {status === "idle" ? "Ready" : status.toUpperCase()}</span>
                                        <span>ID: {transmissionId || "LOADING..."}</span>
                                    </div>
                                </form>
                            </div>

                            {/* HUD Accents for Card */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-4 border-r-4 border-brand-cyan z-20 pointer-events-none" />
                            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-4 border-l-4 border-brand-cyan z-20 pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
