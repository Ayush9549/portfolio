"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TechGroup {
  category: string;
  items: string[];
}

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  type: string;
  desc: string;
  vx: number;
  vy: number;
}

const techGroups: TechGroup[] = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "GSAP", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Socket.io"] },
  { category: "Mobile", items: ["React Native", "Expo"] },
  { category: "Database", items: ["MongoDB", "MySQL", "PostgreSQL (Supabase)"] },
  { category: "Cloud", items: ["AWS", "Firebase", "Cloudinary"] },
  { category: "DevOps", items: ["Docker"] },
  { category: "Automation", items: ["n8n"] },
  { category: "Payments", items: ["PayPal", "Razorpay"] },
  { category: "Authentication", items: ["JWT", "Google OAuth"] },
  { category: "Maps", items: ["Google Maps API"] },
  { category: "Tools", items: ["Git", "GitHub", "Figma"] }
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<"grid" | "graph">("grid");

  // Graphify refs and state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tooltip, setTooltip] = useState({ title: "Hover a Node", desc: "Drag and explore technology links.", color: "var(--accent)" });

  useEffect(() => {
    if (activeTab !== "graph" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 800;
    const height = 500;
    canvas.width = width;
    canvas.height = height;

    const nodes: GraphNode[] = [
      { id: "center", label: "Ayush", x: width / 2, y: height / 2, r: 40, color: "#ff9f1c", type: "center", desc: "Ayush Kumawat: Senior Full-Stack Developer specializing in interactive web/mobile workflows.", vx: 0, vy: 0 },

      { id: "lang", label: "Languages", x: 0, y: 0, r: 24, color: "#00f5ff", type: "cat", desc: "Core code systems: HTML, CSS, JavaScript, TypeScript, PHP, SQL.", vx: 0, vy: 0 },
      { id: "frame", label: "Frameworks", x: 0, y: 0, r: 24, color: "#00f5ff", type: "cat", desc: "Core engines: React, Next.js, React Native, Node, Express, Tailwind, WordPress.", vx: 0, vy: 0 },
      { id: "db", label: "Databases", x: 0, y: 0, r: 24, color: "#00f5ff", type: "cat", desc: "Relational & Document models: Supabase/PostgreSQL, MongoDB, MySQL.", vx: 0, vy: 0 },
      { id: "tool", label: "Tools/Cloud", x: 0, y: 0, r: 24, color: "#00f5ff", type: "cat", desc: "Automation and deployment structures: n8n, Firebase, AWS S3, Docker, Git.", vx: 0, vy: 0 },

      { id: "ts", label: "TypeScript", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "Type-safe definitions, interface validation, cleaner compilations.", vx: 0, vy: 0 },
      { id: "php", label: "PHP", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "WordPress custom hooks, plugin structures, database connections.", vx: 0, vy: 0 },
      { id: "react", label: "React", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "Modern hook abstractions, dynamic loops, modular templates.", vx: 0, vy: 0 },
      { id: "rn", label: "React Native", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "Expo configurations, native mobile view controllers, FCM threads.", vx: 0, vy: 0 },
      { id: "next", label: "Next.js", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "App router, SSR renders, folder architecture optimizations.", vx: 0, vy: 0 },
      { id: "postgres", label: "PostgreSQL", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "Supabase instances, relational joins, geolocation coordinate indexing.", vx: 0, vy: 0 },
      { id: "mongo", label: "MongoDB", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "JSON stores, database cluster configurations, index queries.", vx: 0, vy: 0 },
      { id: "n8n", label: "n8n", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "Webhooks, payment pipeline nodes, automation script triggers.", vx: 0, vy: 0 },
      { id: "docker", label: "Docker", x: 0, y: 0, r: 14, color: "#ffffff", type: "skill", desc: "Container configurations, server replication structures.", vx: 0, vy: 0 },

      { id: "p_erp", label: "ERP Dashboard", x: 0, y: 0, r: 18, color: "#ff9f1c", type: "project", desc: "Next.js, Postgres & Docker. Inventory tracking, employee rotas, auth logs.", vx: 0, vy: 0 },
      { id: "p_app", label: "Worker App", x: 0, y: 0, r: 18, color: "#ff9f1c", type: "project", desc: "React Native, Expo & Firebase. GPS tracker, image uploads, offline forms.", vx: 0, vy: 0 }
    ];

    const links = [
      { source: "center", target: "lang" },
      { source: "center", target: "frame" },
      { source: "center", target: "db" },
      { source: "center", target: "tool" },
      { source: "lang", target: "ts" },
      { source: "lang", target: "php" },
      { source: "frame", target: "react" },
      { source: "frame", target: "rn" },
      { source: "frame", target: "next" },
      { source: "db", target: "postgres" },
      { source: "db", target: "mongo" },
      { source: "tool", target: "n8n" },
      { source: "tool", target: "docker" },
      { source: "next", target: "p_erp" },
      { source: "postgres", target: "p_erp" },
      { source: "docker", target: "p_erp" },
      { source: "rn", target: "p_app" },
      { source: "n8n", target: "p_app" }
    ];

    // Distribute nodes around the center
    nodes.forEach((n) => {
      if (n.id !== "center") {
        n.x = width / 2 + (Math.random() - 0.5) * 250;
        n.y = height / 2 + (Math.random() - 0.5) * 250;
      }
      n.vx = 0;
      n.vy = 0;
    });

    let activeNode: GraphNode | null = null;
    let hoveredNode: GraphNode | null = null;
    const offset = { x: 0, y: 0 };

    const k = 0.05;
    const linkLength = 90;
    const charge = 700;
    const friction = 0.82;

    let animationFrameId: number;

    const tick = () => {
      // Repulsion force
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 200) {
            const force = charge / (dist * dist);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      // Link spring force
      links.forEach((link) => {
        const s = nodes.find((n) => n.id === link.source);
        const t = nodes.find((n) => n.id === link.target);
        if (!s || !t) return;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.hypot(dx, dy) || 1;
        const delta = dist - linkLength;
        const fx = (dx / dist) * delta * k;
        const fy = (dy / dist) * delta * k;
        s.vx += fx;
        s.vy += fy;
        t.vx -= fx;
        t.vy -= fy;
      });

      // Central gravity
      nodes.forEach((n: GraphNode) => {
        if (n.id === "center") return;
        const dx = width / 2 - n.x;
        const dy = height / 2 - n.y;
        n.vx += dx * 0.0006;
        n.vy += dy * 0.0006;
      });

      // Update positions
      nodes.forEach((n: GraphNode) => {
        if (n === activeNode) return;
        n.vx *= friction;
        n.vy *= friction;
        n.x += n.vx;
        n.y += n.vy;

        // Boundaries
        const margin = 30;
        if (n.x < margin) { n.x = margin; n.vx = 0; }
        if (n.x > width - margin) { n.x = width - margin; n.vx = 0; }
        if (n.y < margin) { n.y = margin; n.vy = 0; }
        if (n.y > height - margin) { n.y = height - margin; n.vy = 0; }
      });

      // Render
      ctx.clearRect(0, 0, width, height);

      // Simple grid lines (extremely subtle background)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw links
      links.forEach((link) => {
        const s = nodes.find((n) => n.id === link.source);
        const t = nodes.find((n) => n.id === link.target);
        if (!s || !t) return;
        const isHigh = hoveredNode && (link.source === hoveredNode.id || link.target === hoveredNode.id);
        ctx.strokeStyle = isHigh ? "rgba(6, 182, 212, 0.8)" : "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = isHigh ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.stroke();

        // Pulsating particle link flow
        if (isHigh) {
          const flowProgress = (Date.now() * 0.002) % 1;
          const px = s.x + (t.x - s.x) * flowProgress;
          const py = s.y + (t.y - s.y) * flowProgress;
          ctx.fillStyle = "var(--accent)";
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw nodes
      nodes.forEach((n: GraphNode) => {
        const isDim = hoveredNode && n !== hoveredNode && !links.some((l) =>
          (l.source === hoveredNode?.id && l.target === n.id) || (l.target === hoveredNode?.id && l.source === n.id)
        );
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = isDim ? "#090A0D" : "#0F172A";
        ctx.fill();

        ctx.strokeStyle = isDim ? "rgba(255, 255, 255, 0.03)" : n.color;
        ctx.lineWidth = n === hoveredNode ? 2.5 : 1.5;
        ctx.stroke();

        ctx.fillStyle = isDim ? "rgba(255,255,255,0.15)" : "#FFFFFF";
        ctx.font = `${n.type === "center" ? "bold 12px" : "10px"} Outfit, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Mouse handlers
    const getMouseCoords = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const m = getMouseCoords(e);
      if (activeNode) {
        activeNode.x = m.x - offset.x;
        activeNode.y = m.y - offset.y;
        return;
      }

      let match: GraphNode | null = null;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (Math.hypot(n.x - m.x, n.y - m.y) < n.r) {
          match = n;
          break;
        }
      }

      if (match !== hoveredNode) {
        hoveredNode = match;
        if (hoveredNode) {
          setTooltip({
            title: hoveredNode.label,
            desc: hoveredNode.desc,
            color: hoveredNode.color
          });
        } else {
          setTooltip({
            title: "Hover a Node",
            desc: "Drag and explore technology links.",
            color: "var(--accent)"
          });
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const m = getMouseCoords(e);
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        if (Math.hypot(n.x - m.x, n.y - m.y) < n.r) {
          activeNode = n;
          offset.x = m.x - n.x;
          offset.y = m.y - n.y;
          break;
        }
      }
    };

    const handleMouseUp = () => {
      activeNode = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeTab]);

  return (
    <section
      id="tech-stack"
      className="relative w-full bg-background py-24 border-b border-line overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">

        {/* Section title */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            Core Capabilities
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Tech Stack
          </h2>

          {/* Tab selectors (no shadow) */}
          <div className="flex bg-surface border border-line rounded-lg p-1 mt-4">
            <button
              onClick={() => setActiveTab("grid")}
              className={`px-5 py-2 font-mono text-xs uppercase tracking-widest rounded-md transition-colors duration-200 ${activeTab === "grid" ? "bg-primary text-white" : "text-secondary hover:text-white"
                }`}
            >
              Categorized Grid
            </button>
            <button
              onClick={() => setActiveTab("graph")}
              className={`px-5 py-2 font-mono text-xs uppercase tracking-widest rounded-md transition-colors duration-200 ${activeTab === "graph" ? "bg-primary text-white" : "text-secondary hover:text-white"
                }`}
            >
              Interactive Graph
            </button>
          </div>
        </div>

        {/* Tab 1: Categorized Grid */}
        {activeTab === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {techGroups.map((group, idx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative group overflow-hidden bg-surface/20 border border-line/50 rounded-2xl p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface/30 flex flex-col gap-4 bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px]"
              >
                {/* Visual left indicator bar */}
                <span className="absolute top-0 left-0 w-[3px] h-full bg-accent/20 group-hover:bg-accent transition-colors duration-300" />
                
                {/* Category Header */}
                <div className="flex items-center gap-2 border-b border-line/30 pb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300 animate-pulse" />
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>

                {/* Tech Badges List */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2.5 py-1 bg-white/5 border border-white/5 text-secondary/90 hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-200 rounded-md cursor-default hover:-translate-y-[1px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tab 2: Graphify node simulation (no shadows) */}
        {activeTab === "graph" && (
          <div className="w-full border border-line rounded-2xl bg-surface/50 relative overflow-hidden flex flex-col items-center">
            <div className="w-full h-[500px] relative">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Tooltip Overlay */}
              <div
                className="absolute bottom-6 left-6 p-5 border border-line bg-surface/90 backdrop-blur-md rounded-xl max-w-sm pointer-events-none font-mono text-left"
              >
                <h4 className="text-xs uppercase font-bold tracking-wider mb-2" style={{ color: tooltip.color }}>
                  {tooltip.title}
                </h4>
                <p className="text-[11px] text-secondary leading-relaxed">
                  {tooltip.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
