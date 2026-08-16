"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Layers } from "lucide-react";

interface ProjectItem {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  rotate: number;
  liveUrl?: string;
  liveUrl2?: string;
  liveUrlWorker?: string;
  playStoreUrl?: string;
  playStoreUrl2?: string;
  appStoreUrl?: string;
}

const projects: ProjectItem[] = [
  {
    id: "bizbill",
    name: "BizBill POS",
    desc: "A hybrid multi-tenant POS and restaurant billing system featuring a dual-database sync pipeline, automated WhatsApp PDF invoicing, and real-time kitchen order tracking.",
    tags: ["React", "Express.js", "MongoDB", "Supabase", "WhatsApp API"],
    rotate: 3,
    liveUrl: "https://billing.magicaltreat.com"
  },
  {
    id: "festbuzz",
    name: "FestBuzz",
    desc: "A massive event discovery and reservation hub coordinating secure ticket sales and social feeds.",
    tags: ["Next.js", "Socket.io", "Supabase", "Tailwind"],
    rotate: -6,
    liveUrl: "https://www.festbuzz.in"
  },
  {
    id: "shareitclub",
    name: "ShareItClub",
    desc: "Social item sharing and rentals ecosystem supporting global wallet payouts and identity verification.",
    tags: ["React Native", "Expo", "Express.js", "MongoDB", "PayPal"],
    rotate: 5,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.shareitclubs",
    appStoreUrl: "https://apps.apple.com/in/app/shareit-club-book-sharing/id6761313329"
  },
  {
    id: "waesocial",
    name: "WAE Social",
    desc: "A high-performance social networking application featuring real-time messaging, dedicated thread replies, dynamic search routing, and optimized list rendering.",
    tags: ["React Native", "Expo", "Supabase", "FlashList"],
    rotate: -4,
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.waeapps.social"
  },
  {
    id: "texttiletrade",
    name: "TextTileTrade",
    desc: "B2B textile bulk marketplace with integrated quotation logs and custom logistics routers.",
    tags: ["React Native", "Expo", "PHP", "MySQL"],
    rotate: 6,
    liveUrl: "https://textiletrade.in",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.textiletrade.in",
    appStoreUrl: "https://apps.apple.com/in/app/textile-trade/id6764899520"
  },
  {
    id: "hyrup",
    name: "HyrUp",
    desc: "Premium automated recruitment portal with real-time video upload screening and interview scheduling.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AWS S3"],
    rotate: -5,
    liveUrl: "https://www.hyrup.co.in",
    liveUrlWorker: "https://hyrup-worker-app.vercel.app/",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hyrup.worker&pli=1"
  },
  {
    id: "wae",
    name: "WAE Academy",
    desc: "Advanced Learning Management System featuring real-time class comments, quizzes, and digital certifications.",
    tags: ["Next.js", "Express.js", "Firebase", "PostgreSQL"],
    rotate: 7,
    liveUrl: "https://weareengineer.com",
    liveUrl2: "https://colleges.weareengineer.com"
  },
  {
    id: "dlabs",
    name: "Dlabs Studio",
    desc: "Creative interface agency layout focusing on fluid WebGL interactions and rider/driver tracking apps.",
    tags: ["React Native", "Expo", "Framer Motion", "Tailwind CSS"],
    rotate: -3,
    liveUrl: "https://www.dilatelabs.com",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.lokesh_kabra.dlabs_app",
    playStoreUrl2: "https://play.google.com/store/apps/details?id=com.lokesh_kabra.dlabs_rider"
  },
  {
    id: "magicaltreat",
    name: "Magical Treat",
    desc: "On-demand food delivery and customized confectionery order management platform.",
    tags: ["React Native", "Expo", "Node.js", "Firebase"],
    rotate: 4,
    liveUrl: "https://www.magicaltreat.com",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.magicaltreat.app"
  },
];

const CARD_WIDTH = 380;
const CARD_GAP = 80;
const CARD_PADDING = 60;

export default function FeaturedProjects() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinEl = pinRef.current;
    const containerEl = containerRef.current;
    const titleEl = titleRef.current;

    if (!pinEl || !containerEl || !titleEl) return;

    const vw = pinEl.clientWidth;

    // Immediately push container fully off-screen right before any animation
    gsap.set(containerEl, { x: vw + 100, opacity: 1 });

    // Calculate where the row ends: start at right edge, end so last card is visible
    const totalRowWidth =
      projects.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP + CARD_PADDING * 2;
    const endX = -(totalRowWidth - vw + 80);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinEl,
        start: "top top",
        end: "+=10000px",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1 (scroll 0→30%): title shrinks and glides to top-left
    tl.to(
      titleEl,
      {
        top: "64px",
        left: "48px",
        scale: 0.5,
        transformOrigin: "top left",
        duration: 1.5,
        ease: "power2.out",
      },
      0
    );

    // Phase 2 (scroll 15%→100%): cards row slides right→left
    tl.fromTo(
      containerEl,
      { x: vw + 100 },
      { x: endX, duration: 2.8, ease: "power2.out" },
      0.2
    );

    // Dynamic rotation tilt tweens (scroll-bound staggered wave)
    const cardWrappers = containerEl.querySelectorAll(".project-card-tilt-wrapper");
    if (cardWrappers.length > 0) {
      // 1. Tilt Left
      tl.to(
        cardWrappers,
        {
          rotation: (idx) => projects[idx].rotate - 12,
          duration: 0.6,
          stagger: 0.08,
          ease: "sine.inOut",
        },
        0.2
      );

      // 2. Tilt Right
      tl.to(
        cardWrappers,
        {
          rotation: (idx) => projects[idx].rotate + 12,
          duration: 0.6,
          stagger: 0.08,
          ease: "sine.inOut",
        },
        0.8
      );

      // 3. Tilt Left
      tl.to(
        cardWrappers,
        {
          rotation: (idx) => projects[idx].rotate - 12,
          duration: 0.6,
          stagger: 0.08,
          ease: "sine.inOut",
        },
        1.4
      );

      // 4. Tilt Right
      tl.to(
        cardWrappers,
        {
          rotation: (idx) => projects[idx].rotate + 12,
          duration: 0.6,
          stagger: 0.08,
          ease: "sine.inOut",
        },
        2.0
      );

      // 5. Back to base rotation
      tl.to(
        cardWrappers,
        {
          rotation: (idx) => projects[idx].rotate,
          duration: 0.4,
          stagger: 0.08,
          ease: "sine.inOut",
        },
        2.6
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === pinEl) t.kill();
      });
    };
  }, []);

  return (
    <div
      ref={pinRef}
      className="relative w-full h-screen bg-[#050816] overflow-hidden border-b border-line"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Title — centered by CSS, GSAP moves it to top-left on scroll */}
      <div
        ref={titleRef}
        className="absolute z-20 pointer-events-none flex flex-col items-center gap-2"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          Selected works
        </span>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase text-center whitespace-nowrap">
          Featured Projects
        </h2>
        <span className="font-mono text-[10px] text-secondary tracking-widest uppercase mt-2 animate-pulse">
          Scroll down to stack cards
        </span>
      </div>

      {/* Cards row — starts off-screen right, slides left on scroll */}
      <div
        ref={containerRef}
        className="absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
        style={{
          left: "0px",
          gap: CARD_GAP + "px",
          paddingLeft: CARD_PADDING + "px",
          paddingRight: CARD_PADDING + "px",
        }}
      >
        {projects.map((proj, idx) => {
          const duration = 5.5 + idx * 0.5;
          const delay = idx * 0.2;

          return (
            <div
              key={proj.id}
              className="project-card-tilt-wrapper flex-shrink-0 pointer-events-auto"
              style={{
                width: CARD_WIDTH + "px",
                height: "460px",
                transform: `rotate(${proj.rotate}deg)`,
                transformOrigin: "center center",
              }}
            >
              <div
                className="wiggle-card w-full h-full bg-[#0F172A] border border-line rounded-2xl p-6 flex flex-col justify-between"
                style={{
                  boxShadow: "none",
                  zIndex: idx + 1,
                  "--base-rotate": "0deg",
                  animationDuration: duration + "s",
                  animationDelay: delay + "s",
                } as React.CSSProperties}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] text-accent tracking-wider font-semibold uppercase">
                      Case Study
                    </span>
                    <div className="flex gap-2 text-secondary">
                      <Layers size={14} />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">
                    {proj.name}
                  </h3>

                  <p className="text-secondary text-xs sm:text-sm leading-relaxed font-sans">
                    {proj.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-wrap gap-1.5 border-t border-line/40 pt-4">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-secondary/90 bg-background/50 px-2 py-0.5 border border-line rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-2 items-center mt-2">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase text-white hover:text-accent tracking-wider flex items-center gap-1 transition-colors duration-200"
                      >
                        <span>Website</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {proj.liveUrl2 && (
                      <a
                        href={proj.liveUrl2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase text-white hover:text-accent tracking-wider flex items-center gap-1 transition-colors duration-200"
                      >
                        <span>Colleges</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {proj.liveUrlWorker && (
                      <a
                        href={proj.liveUrlWorker}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase text-white hover:text-accent tracking-wider flex items-center gap-1 transition-colors duration-200"
                      >
                        <span>Worker App</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {proj.playStoreUrl && (
                      <a
                        href={proj.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase text-[#10B981] hover:text-accent tracking-wider flex items-center gap-1 transition-colors duration-200"
                      >
                        <span>Android</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {proj.playStoreUrl2 && (
                      <a
                        href={proj.playStoreUrl2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase text-[#10B981] hover:text-accent tracking-wider flex items-center gap-1 transition-colors duration-200"
                      >
                        <span>Rider App</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {proj.appStoreUrl && (
                      <a
                        href={proj.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] uppercase text-[#38BDF8] hover:text-accent tracking-wider flex items-center gap-1 transition-colors duration-200"
                      >
                        <span>iOS App</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {!proj.liveUrl && !proj.liveUrl2 && !proj.liveUrlWorker && !proj.playStoreUrl && !proj.playStoreUrl2 && !proj.appStoreUrl && (
                      <span className="font-mono text-[10px] uppercase text-secondary/50 tracking-wider">
                        Internal System
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
