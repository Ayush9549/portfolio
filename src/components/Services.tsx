"use client";

import { useRef, type MouseEvent, type ComponentType } from "react";
import { Code, Database, Cpu, Smartphone, Settings, Globe } from "lucide-react";

interface ServiceItem {
  id: string;
  num: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  subservices: string[];
}

const services: ServiceItem[] = [
  {
    id: "web-apps",
    num: "01 //",
    icon: Code,
    title: "Web App Engineering",
    description: "Designing modern, high-speed single page applications and responsive SaaS modules matching clean styling conventions.",
    subservices: ["Website Development", "Web Applications", "SaaS Development", "Admin Dashboards"]
  },
  {
    id: "enterprise",
    num: "02 //",
    icon: Database,
    title: "Enterprise Solutions",
    description: "Architecting core database workflows, modular portals, and customized reporting suites for automated platform operations.",
    subservices: ["Enterprise Software", "ERP Development", "LMS Development"]
  },
  {
    id: "mobile",
    num: "03 //",
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Engineering responsive cross-platform native iOS & Android applications using Expo features and native bridges.",
    subservices: ["Mobile App Development", "Cross Platform Apps"]
  },
  {
    id: "backend",
    num: "04 //",
    icon: Settings,
    title: "APIs & Core Systems",
    description: "Constructing scalable database systems, payment microservices, and secure session management models.",
    subservices: ["API Development", "Payment Gateway Integration", "Authentication Systems"]
  },
  {
    id: "automation",
    num: "05 //",
    icon: Cpu,
    title: "Automation & AI Integrations",
    description: "Wiring custom cron automation tasks, node triggers, and third-party AI LLM endpoints for business efficiency.",
    subservices: ["Automation", "AI Integrations"]
  },
  {
    id: "consulting",
    num: "06 //",
    icon: Globe,
    title: "Optimization & Consulting",
    description: "Conducting UI/UX workflow testing, database caching, and custom legacy template conversions.",
    subservices: ["WordPress Development", "Performance Optimization", "UI UX", "Consulting"]
  }
];

function Card({ service }: { service: ServiceItem }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const IconComponent = service.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-surface border border-line rounded-2xl p-8 overflow-hidden transition-colors duration-300 hover:border-accent/40"
      style={{
        boxShadow: "none"
      }}
    >
      {/* Glow Hover background effect (no shadow) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(6, 182, 212, 0.07), transparent 80%)"
        }}
      />

      <span className="font-mono text-xs text-accent mb-6 block font-bold">
        {service.num}
      </span>

      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-background border border-line rounded-lg text-accent group-hover:text-white transition-colors duration-300">
          <IconComponent size={20} />
        </div>
        <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
          {service.title}
        </h3>
      </div>

      <p className="text-secondary text-sm leading-relaxed mb-6 font-sans">
        {service.description}
      </p>

      {/* Sub-services tags list */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-line/40">
        {service.subservices.map((sub) => (
          <span
            key={sub}
            className="font-mono text-[10px] text-secondary/80 bg-background px-2.5 py-1 border border-line rounded-md"
          >
            {sub}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full bg-background py-24 border-b border-line overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">

        {/* Title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            How I Can Help
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
}
