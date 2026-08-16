"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import React from "react";

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  desc: string;
  points: string[];
  tags: string[];
}

const experiences: ExperienceItem[] = [
  {
    year: "2024 - Present",
    role: "Lead Full-Stack Developer",
    company: "We Are Engineer (WAE)",
    desc: "Directing the design and rollout of custom enterprise SaaS platforms and LMS dashboards.",
    points: [
      "Engineered automated workflows with n8n, saving teams 20+ hours of manual data sync weekly.",
      "Integrated double-webhook verification workflows for Razorpay and PayPal paths.",
      "Configured Docker files and Supabase postgres setups to assure simple local replication."
    ],
    tags: ["n8n", "Docker", "Supabase", "Razorpay", "Next.js", "PostgreSQL"]
  },
  {
    year: "2023 - 2024",
    role: "Hybrid Mobile & App Engineer",
    company: "SaaS Agencies",
    desc: "Built high-performance cross-platform applications and modular Web interfaces.",
    points: [
      "Launched React Native mobile platforms using Expo APIs for GPS synchronization.",
      "Optimized load speeds by 45% using Server Component caches in Next.js layouts.",
      "Wired dynamic Socket.io message streams and custom JWT session validations."
    ],
    tags: ["React Native", "Expo", "Next.js", "Socket.io", "JWT", "TypeScript"]
  },
  {
    year: "2022 - 2023",
    role: "WordPress & PHP Developer",
    company: "Digital Commerce Studios",
    desc: "Coded highly customized web systems and performance integrations.",
    points: [
      "Programmed custom theme callbacks and backend MySQL triggers in WordPress layouts.",
      "Wired custom PayPal cart checkouts and external shipping rate integrations.",
      "Boosted core accessibility scores above 95 in Lighthouse inspections."
    ],
    tags: ["WordPress", "PHP", "MySQL", "PayPal", "Lighthouse", "JavaScript"]
  },
  {
    year: "2020 - 2022",
    role: "Junior Software Engineer",
    company: "Global Web Solutions",
    desc: "Developed frontend blocks and structured databases.",
    points: [
      "Designed dashboard frames and forms using React and Bootstrap templates.",
      "Connected REST API endpoints to MongoDB clusters.",
      "Integrated Google Maps location pins and custom distance matrix models."
    ],
    tags: ["React", "Bootstrap", "REST API", "MongoDB", "Google Maps"]
  }
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#050816] py-24 border-b border-line overflow-hidden"
    >
      {/* Background radial accent glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            My Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Experience
          </h2>
          <div className="w-12 h-[2px] bg-accent/80 rounded mt-1" />
        </div>

        {/* Vertical Timeline container */}
        <div className="relative w-full max-w-5xl mx-auto mt-8 flex flex-col gap-12">
          {/* Animated vertical timeline line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] bg-line/60 -translate-x-1/2" />

          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={exp.role + exp.company}
                className={`group relative w-full flex flex-col md:flex-row items-start justify-between min-h-[220px] ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Center timeline bullet with pulsing halo ring */}
                <div className="absolute left-[20px] md:left-1/2 w-9 h-9 rounded-full border border-line bg-[#0F172A] -translate-x-1/2 z-10 flex items-center justify-center font-mono text-[10px] font-bold text-accent transition-all duration-300 group-hover:border-accent">
                  <div className="absolute inset-0 rounded-full border border-accent/20 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                  0{idx + 1}
                </div>

                {/* Main Card (takes left or right side) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`w-[calc(100%-50px)] md:w-[45%] ml-12 md:ml-0 bg-[#0F172A]/70 backdrop-blur-sm border border-line/60 rounded-2xl p-6 md:p-8 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
                  style={{
                    boxShadow: "none",
                  }}
                >
                  {/* Subtle glassmorphic radial background glow on card hover */}
                  <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Header metadata */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] text-accent/90 border border-accent/30 bg-accent/5 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <Calendar size={10} />
                      {exp.year}
                    </span>
                    <span className="font-mono text-[10px] text-secondary/60 uppercase tracking-widest flex items-center gap-1">
                      <Briefcase size={10} />
                      {exp.company}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-2">
                    {exp.role}
                  </h3>

                  {/* Short description */}
                  <p className="text-secondary text-sm leading-relaxed mb-4 font-sans border-l border-line/40 pl-3">
                    {exp.desc}
                  </p>

                  {/* Key Contributions checklist */}
                  <ul className="flex flex-col gap-2.5 mb-6 text-xs text-secondary/90 font-sans">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 size={13} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology tag badges */}
                  <div className="flex flex-wrap gap-1.5 border-t border-line/40 pt-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-secondary/90 bg-[#1e293b]/40 hover:bg-[#1e293b]/70 border border-line rounded px-2 py-0.5 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Right Side spacer on desktop */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
