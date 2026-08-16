"use client";

import { useEffect, useRef } from "react";
import React from "react";

import type MatterType from "matter-js";

interface TechBall {
  name: string;
  color: string;     // Stroke color (hex)
  textColor: string; // Text color (hex)
}

const techBalls: TechBall[] = [
  { name: "JS", color: "#f7df1e", textColor: "#000000" },
  { name: "TS", color: "#3178c6", textColor: "#ffffff" },
  { name: "React", color: "#61dafb", textColor: "#00d8ff" },
  { name: "Next.js", color: "#ffffff", textColor: "#ffffff" },
  { name: "Node.js", color: "#339933", textColor: "#ffffff" },
  { name: "MongoDB", color: "#47a248", textColor: "#ffffff" },
  { name: "Supabase", color: "#3ecf8e", textColor: "#ffffff" },
  { name: "AWS", color: "#ff9900", textColor: "#000000" },
  { name: "Docker", color: "#2496ed", textColor: "#ffffff" },
  { name: "GitHub", color: "#181717", textColor: "#ffffff" },
  { name: "PHP", color: "#777bb4", textColor: "#ffffff" },
  { name: "WordPress", color: "#21759b", textColor: "#ffffff" },
  { name: "MySQL", color: "#4479a1", textColor: "#ffffff" },
  { name: "Firebase", color: "#ffca28", textColor: "#000000" },
  { name: "n8n", color: "#ff6c37", textColor: "#ffffff" },
  { name: "GSAP", color: "#88ce02", textColor: "#000000" },
  { name: "JS", color: "#f7df1e", textColor: "#000000" },
  { name: "TS", color: "#3178c6", textColor: "#ffffff" },
  { name: "React", color: "#61dafb", textColor: "#00d8ff" },
  { name: "Next.js", color: "#ffffff", textColor: "#ffffff" },
  { name: "Node.js", color: "#339933", textColor: "#ffffff" },
  { name: "GitHub", color: "#181717", textColor: "#ffffff" },
  { name: "Docker", color: "#2496ed", textColor: "#ffffff" },
  { name: "MySQL", color: "#4479a1", textColor: "#ffffff" },
  { name: "Firebase", color: "#ffca28", textColor: "#000000" },
  { name: "PHP", color: "#777bb4", textColor: "#ffffff" },
  { name: "Express", color: "#737373", textColor: "#ffffff" },
  { name: "Flutter", color: "#06b6d4", textColor: "#ffffff" },
  { name: "Socket.io", color: "#e5e5e5", textColor: "#ffffff" },
  { name: "GSAP", color: "#4ade80", textColor: "#000000" }
];

// Custom strict type definition for Matter.js Body with our custom plugin data
interface CustomBody extends MatterType.Body {
  plugin: {
    name: string;
    color: string;
    textColor: string;
    r: number;
  };
}

export default function PhysicsFooter() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth;
    let height = container.clientHeight || 550;
    
    // Set up high-DPI canvas drawing contexts
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let active = false;
    let animationFrameId: number;
    let spawnTimers: NodeJS.Timeout[] = [];

    // Matter.js references holder
    let Matter: typeof import("matter-js");
    let engine: MatterType.Engine;
    let runner: MatterType.Runner;
    let ground: MatterType.Body;
    let leftWall: MatterType.Body;
    let rightWall: MatterType.Body;
    let mouseConstraint: MatterType.MouseConstraint;

    const clearSpawnTimers = () => {
      spawnTimers.forEach((t) => clearTimeout(t));
      spawnTimers = [];
    };

    const stopSimulation = () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
      clearSpawnTimers();

      if (runner && Matter) {
        Matter.Runner.stop(runner);
      }
      if (engine && Matter) {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
    };

    // WHY: We use dual thresholds [0.15, 0.85] so that the physics simulation drops the balls only when the footer is mostly visible (>= 85%), and cleanly resets/clears resources when scrolled away (< 15%).
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.intersectionRatio >= 0.85) {
          if (!active) {
            active = true;
            startSimulation();
          }
        } else if (entry.intersectionRatio < 0.15) {
          if (active) {
            stopSimulation();
          }
        }
      },
      {
        threshold: [0.15, 0.85],
      }
    );

    observer.observe(container);

    const startSimulation = async () => {
      Matter = await import("matter-js");
      const { Engine, World, Bodies, Composite, Mouse, MouseConstraint, Runner } = Matter;

      engine = Engine.create({
        gravity: { y: 1.0 } // Gravity enabled
      });

      runner = Runner.create();
      Runner.run(runner, engine);

      const wallThickness = 120;

      // static boundaries
      ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, {
        isStatic: true,
        restitution: 0.4
      });

      leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true
      });

      rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true
      });

      Composite.add(engine.world, [ground, leftWall, rightWall]);

      // Draggable constraint hook
      const mouse = Mouse.create(canvas);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.25,
          render: { visible: false }
        }
      });

      Composite.add(engine.world, mouseConstraint);

      // Prevent stealing standard mouse scroll behavior
      const mcMouse = (mouseConstraint as unknown as { mouse: { element: HTMLElement; mousewheel: EventListener } }).mouse;
      mcMouse.element.removeEventListener("mousewheel", mcMouse.mousewheel);
      mcMouse.element.removeEventListener("DOMMouseScroll", mcMouse.mousewheel);

      const r = 42; // Ball radius

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        // Reduced motion mode: Spawn all balls immediately and run simulation forward
        techBalls.forEach((tech) => {
          const x = r + Math.random() * (width - r * 2);
          const y = height - r - Math.random() * 100; // already at bottom

          // WHY: Restitution of 0.6 and friction of 0.12 are specifically tuned to give a satisfying rubbery bounce while allowing balls to settle into a stable pile without excessive jitter.
          const body = Bodies.circle(x, y, r, {
            restitution: 0.6,
            friction: 0.12,
            frictionAir: 0.015,
            density: 0.001
          }) as CustomBody;

          body.plugin = {
            name: tech.name,
            color: tech.color,
            textColor: tech.textColor,
            r: r
          };

          Composite.add(engine.world, body);
        });

        // Run simulation forward 300 times to settle balls instantly
        for (let i = 0; i < 300; i++) {
          Engine.update(engine, 16.666);
        }
      } else {
        // Standard mode: Spawn balls staggered over time
        techBalls.forEach((tech, idx) => {
          const timer = setTimeout(() => {
            if (!active) return;
            const x = r + Math.random() * (width - r * 2);
            const y = -60;

            const body = Bodies.circle(x, y, r, {
              restitution: 0.6,
              friction: 0.12,
              frictionAir: 0.015,
              density: 0.001
            }) as CustomBody;

            body.plugin = {
              name: tech.name,
              color: tech.color,
              textColor: tech.textColor,
              r: r
            };

            Composite.add(engine.world, body);
          }, idx * 220); // ~200-250ms spacing to prevent overlapping

          spawnTimers.push(timer);
        });
      }

      // Drawing Loop
      const draw = () => {
        if (!active) return;

        // Clear canvas frame
        ctx.clearRect(0, 0, width, height);

        // Render Matter.js bodies onto canvas
        const bodies = Composite.allBodies(engine.world) as CustomBody[];
        
        bodies.forEach((body) => {
          // Skip static boundary boxes
          if (body.isStatic) return;

          const { x, y } = body.position;
          const { name, color, textColor, r: radius } = body.plugin;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(body.angle);

          // 1. Draw glossy white/light-grey 3D sphere base
          const baseGrad = ctx.createRadialGradient(
            -radius * 0.35,
            -radius * 0.35,
            radius * 0.05,
            -radius * 0.1,
            -radius * 0.1,
            radius
          );
          baseGrad.addColorStop(0, "#ffffff"); // specular highlight peak
          baseGrad.addColorStop(0.2, "#fbfbfb"); // shiny light plastic
          baseGrad.addColorStop(0.65, "#e5e7eb"); // diffuse white-grey
          baseGrad.addColorStop(0.9, "#d1d5db"); // shadow gradient edge
          baseGrad.addColorStop(1.0, "#9ca3af"); // rim shadow ambient occlusion

          ctx.fillStyle = baseGrad;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fill();

          // Stroke border matching tech theme color with low opacity for soft blend
          ctx.strokeStyle = color + "40"; // 25% opacity
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw a very thin dark outline for separation
          ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // 2. Draw Tech Logo / Brand Patch (rotated slightly for random 3D orientation)
          ctx.save();
          ctx.rotate(-Math.PI / 18);

          if (name === "JS") {
            // Yellow square patch with black JS in bottom right
            ctx.fillStyle = "#f7df1e";
            ctx.beginPath();
            ctx.rect(-radius * 0.42, -radius * 0.42, radius * 0.84, radius * 0.84);
            ctx.fill();

            ctx.fillStyle = "#000000";
            ctx.font = `900 ${radius * 0.44}px system-ui, sans-serif`;
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.fillText("JS", radius * 0.34, radius * 0.36);
          } else if (name === "TS") {
            // Blue square patch with white TS in bottom right
            ctx.fillStyle = "#3178c6";
            ctx.beginPath();
            ctx.rect(-radius * 0.42, -radius * 0.42, radius * 0.84, radius * 0.84);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${radius * 0.44}px system-ui, sans-serif`;
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.fillText("TS", radius * 0.34, radius * 0.36);
          } else if (name === "React") {
            // Light blue React atom logo directly on the white ball
            ctx.strokeStyle = "#00d8ff";
            ctx.lineWidth = 2.2;
            for (let i = 0; i < 3; i++) {
              ctx.save();
              ctx.rotate((i * Math.PI) / 3);
              ctx.beginPath();
              ctx.ellipse(0, 0, radius * 0.52, radius * 0.18, 0, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();
            }
            ctx.fillStyle = "#00d8ff";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.08, 0, Math.PI * 2);
            ctx.fill();
          } else if (name === "Next.js") {
            // Black circle patch with white 'N' diagonal slash
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 3.2;
            ctx.lineCap = "round";
            ctx.lineJoin = "miter";
            ctx.beginPath();
            ctx.moveTo(-radius * 0.18, radius * 0.22);
            ctx.lineTo(-radius * 0.18, -radius * 0.22);
            ctx.lineTo(radius * 0.16, radius * 0.22);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(radius * 0.16, -radius * 0.22);
            ctx.lineTo(radius * 0.16, radius * 0.22);
            ctx.stroke();
          } else if (name === "Node.js") {
            // Green circular patch with lowercase "node"
            ctx.fillStyle = "#339933";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${radius * 0.22}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("node", 0, 0);
          } else if (name === "MongoDB") {
            // Green leaf shape
            ctx.fillStyle = "#13aa52";
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.42);
            ctx.quadraticCurveTo(radius * 0.32, -radius * 0.1, 0, radius * 0.42);
            ctx.quadraticCurveTo(-radius * 0.32, -radius * 0.1, 0, -radius * 0.42);
            ctx.fill();

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.32);
            ctx.lineTo(0, radius * 0.32);
            ctx.stroke();
          } else if (name === "Supabase") {
            // Black circle patch with green lightning bolt
            ctx.fillStyle = "#1c1c1c";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#3ecf8e";
            ctx.beginPath();
            ctx.moveTo(-radius * 0.08, -radius * 0.28);
            ctx.lineTo(radius * 0.16, -radius * 0.08);
            ctx.lineTo(0, 0);
            ctx.lineTo(radius * 0.12, radius * 0.3);
            ctx.lineTo(-radius * 0.12, radius * 0.08);
            ctx.lineTo(-radius * 0.02, 0);
            ctx.closePath();
            ctx.fill();
          } else if (name === "AWS") {
            // Orange squircle patch with black "aws" text
            ctx.fillStyle = "#ff9900";
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(-radius * 0.42, -radius * 0.32, radius * 0.84, radius * 0.64, radius * 0.12);
            } else {
              ctx.rect(-radius * 0.42, -radius * 0.32, radius * 0.84, radius * 0.64);
            }
            ctx.fill();

            ctx.fillStyle = "#000000";
            ctx.font = `900 ${radius * 0.26}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("aws", 0, 0);
          } else if (name === "Docker") {
            // Blue circle patch with stacked container boxes
            ctx.fillStyle = "#2496ed";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.8;
            const boxSize = radius * 0.1;
            ctx.strokeRect(-boxSize * 1.7, -boxSize / 2, boxSize, boxSize);
            ctx.strokeRect(-boxSize * 0.5, -boxSize / 2, boxSize, boxSize);
            ctx.strokeRect(boxSize * 0.7, -boxSize / 2, boxSize, boxSize);
            ctx.strokeRect(-boxSize * 0.5, -boxSize * 1.7, boxSize, boxSize);
          } else if (name === "GitHub") {
            // Black circle patch with stylized Octocat head
            ctx.fillStyle = "#181717";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(0, radius * 0.05, radius * 0.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-radius * 0.16, -radius * 0.06);
            ctx.lineTo(-radius * 0.2, -radius * 0.26);
            ctx.lineTo(-radius * 0.07, -radius * 0.13);
            ctx.closePath();
            ctx.moveTo(radius * 0.16, -radius * 0.06);
            ctx.lineTo(radius * 0.2, -radius * 0.26);
            ctx.lineTo(radius * 0.07, -radius * 0.13);
            ctx.closePath();
            ctx.fill();
          } else if (name === "PHP") {
            // Purple oval with white "PHP" text
            ctx.fillStyle = "#777bb4";
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 0.52, radius * 0.32, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold italic ${radius * 0.24}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("PHP", 0, 0);
          } else if (name === "WordPress") {
            // Blue circle with white W
            ctx.fillStyle = "#21759b";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${radius * 0.32}px Georgia, serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("W", 0, -radius * 0.02);
          } else if (name === "MySQL") {
            // Blue & yellow mysql text directly on sphere
            ctx.font = `900 ${radius * 0.24}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#00758f";
            ctx.fillText("my", -radius * 0.18, 0);
            ctx.fillStyle = "#f29111";
            ctx.fillText("SQL", radius * 0.18, 0);
          } else if (name === "Firebase") {
            // Dark circular patch with yellow/orange flame triangle
            ctx.fillStyle = "#1e1e1e";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffcb28";
            ctx.beginPath();
            ctx.moveTo(-radius * 0.18, radius * 0.22);
            ctx.lineTo(radius * 0.18, radius * 0.22);
            ctx.lineTo(0, -radius * 0.26);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#f57c00";
            ctx.beginPath();
            ctx.moveTo(-radius * 0.08, radius * 0.22);
            ctx.lineTo(radius * 0.18, radius * 0.22);
            ctx.lineTo(0, -radius * 0.08);
            ctx.closePath();
            ctx.fill();
          } else if (name === "n8n") {
            // Red circle patch with white n8n
            ctx.fillStyle = "#ff6c37";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${radius * 0.22}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("n8n", 0, 0);
          } else if (name === "GSAP") {
            // Black circle patch with green GSAP
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#88ce02";
            ctx.font = `bold ${radius * 0.2}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("GSAP", 0, 0);
          } else if (name === "Express") {
            // Black square patch with white "ex"
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.rect(-radius * 0.42, -radius * 0.42, radius * 0.84, radius * 0.84);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${radius * 0.35}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("ex", 0, 0);
          } else if (name === "Flutter") {
            // Light blue circle patch with white chevron
            ctx.fillStyle = "#02569b";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#01c6fc";
            ctx.lineWidth = 2.2;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(-radius * 0.15, -radius * 0.22);
            ctx.lineTo(radius * 0.1, -radius * 0.22);
            ctx.lineTo(-radius * 0.1, radius * 0.05);
            ctx.lineTo(radius * 0.12, radius * 0.22);
            ctx.stroke();
          } else if (name === "Socket.io") {
            // Black circular patch with white lightning/arrows
            ctx.fillStyle = "#010101";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${radius * 0.25}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("io", 0, 0);
          } else {
            // Fallback for other items: Dark slate patch with name
            ctx.fillStyle = "#1e293b";
            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.52, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = `bold ${radius * 0.22}px system-ui, sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(name, 0, 0);
          }
          ctx.restore();

          // 3. Draw Specular Gloss / Reflection Spot on top of the logo
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.beginPath();
          ctx.arc(-radius * 0.32, -radius * 0.32, radius * 0.16, 0, Math.PI * 2);
          ctx.fill();

          // Draw linear ambient reflection gradient on the upper half
          const glossGrad = ctx.createLinearGradient(0, -radius, 0, radius);
          glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.24)");
          glossGrad.addColorStop(0.4, "rgba(255, 255, 255, 0.03)");
          glossGrad.addColorStop(0.8, "rgba(255, 255, 255, 0)");
          glossGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.fillStyle = glossGrad;
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
    };

    // Clean restart on window resize
    const handleResize = () => {
      stopSimulation();

      // Re-trigger layout measurement
      width = container.clientWidth;
      height = container.clientHeight || 550;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      active = true;
      startSimulation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      stopSimulation();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer
      id="footer"
      className="relative w-full min-h-[550px] bg-background border-t border-line py-16 flex flex-col justify-between overflow-hidden"
    >

      {/* Static Footer Text Content (lower z-index so balls fall in front of it) */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-2 flex flex-col md:flex-row justify-between items-start z-0 pointer-events-none relative pb-30">

      {/* Container holding physics canvas layer */}
      <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-auto pb-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full max-w-7xl mx-auto bottom-5 h-full" />
      </div>
        {/* Left footer description */}
        <div className="flex flex-col gap-4 text-left max-w-md">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-none uppercase tracking-tight">
            LET&apos;S SHIFT
            <br />
            PERSPECTIVES
          </h2>
          <p className="font-mono text-xs text-secondary leading-relaxed">
            Drag technologies around or collide them together. Physics engine mapped for high-performance interactivity.
          </p>
        </div>

        {/* Right footer coordinates */}
        <div className="flex flex-col gap-3 text-left md:text-right mt-8 md:mt-0 relative z-20 pointer-events-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-secondary font-bold">
            Connect
          </span>
          <div className="flex gap-4 font-mono text-[11px] text-white pointer-events-auto">
            <a href="https://github.com/Ayush9549" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
              GitHub
            </a>
            <a href="https://linkedin.com/in/ayush-kumawat05" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
              LinkedIn
            </a>
            <a href="mailto:ayushkumawat9549@gmail.com" className="hover:text-accent transition-colors duration-200">
              Email
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 border-t border-line/45 pt-6 flex flex-col sm:flex-row justify-between items-center z-20 pointer-events-none font-mono text-[10px] text-secondary/65 gap-4">
        <p>© 2026 AYUSH KUMAWAT. ALL RIGHTS RESERVED.</p>
        <p>BUILT WITH NEXT.JS & MATTER.JS PHYSICS</p>
      </div>
    </footer>
  );
}
