"use client";

import { useState, FormEvent } from "react";
import { Mail, Calendar, Send, Clock, MapPin, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    project: "",
    budget: "< $5k",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setIsSending(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormState({
          name: "",
          email: "",
          project: "",
          budget: "< $5k",
          message: ""
        });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error("Form submit error:", err);
      setErrorMsg("Failed to send message. Please check your network connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050816] py-24 border-b border-line overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: CTA Title & Info */}
          <div className="lg:col-span-6 flex flex-col gap-8 text-left relative">
            {/* Soft decorative grid background for the left column */}
            <div className="absolute -left-10 top-0 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-70" />

            <div className="flex flex-col gap-3 relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                Get In Touch
              </span>
              <h2 className="font-display text-[44px] sm:text-[50px] lg:text-[60px] font-extrabold text-white leading-none uppercase tracking-tighter">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-accent font-black">
                  AMAZING
                </span>
                <br />
                TOGETHER.
              </h2>
            </div>

            <p className="text-secondary text-sm md:text-base leading-relaxed font-sans max-w-lg relative z-10">
              Have a platform concept, complex integration roadmap, or custom UI system in mind? Fill out the form or schedule a session to review your project scope directly with me.
            </p>

            {/* Quick Connect Grid Info (Glass Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-line/60 relative z-10">
              {/* Card 1: Email */}
              <a
                href="mailto:ayushkumawat9549@gmail.com"
                className="group/item bg-[#0F172A]/50 border border-line/60 rounded-xl p-4 flex flex-col gap-2 hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: "none" }}
              >
                <div className="flex items-center justify-between text-accent">
                  <Mail size={16} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                </div>
                <span className="font-mono text-[9px] text-secondary/60 uppercase tracking-widest font-bold">
                  Direct Email
                </span>
                <span className="font-sans text-xs text-white group-hover/item:text-accent transition-colors duration-200 truncate">
                  ayushkumawat9549@gmail.com
                </span>
              </a>

              {/* Card 2: Response */}
              <div
                className="bg-[#0F172A]/50 border border-line/60 rounded-xl p-4 flex flex-col gap-2"
                style={{ boxShadow: "none" }}
              >
                <div className="flex items-center justify-between text-accent">
                  <Clock size={16} />
                  <span className="font-mono text-[8px] bg-accent/10 text-accent border border-accent/20 px-1.5 py-0.2 rounded uppercase font-bold tracking-widest">
                    Guaranteed
                  </span>
                </div>
                <span className="font-mono text-[9px] text-secondary/60 uppercase tracking-widest font-bold">
                  Response Time
                </span>
                <span className="font-sans text-xs text-white">
                  Under 24 hours
                </span>
              </div>

              {/* Card 3: Location */}
              <div
                className="bg-[#0F172A]/50 border border-line/60 rounded-xl p-4 flex flex-col gap-2"
                style={{ boxShadow: "none" }}
              >
                <div className="text-accent">
                  <MapPin size={16} />
                </div>
                <span className="font-mono text-[9px] text-secondary/60 uppercase tracking-widest font-bold">
                  Location Hub
                </span>
                <span className="font-sans text-xs text-white">
                  Rajasthan, India (GMT +5:30)
                </span>
              </div>

              {/* Card 4: Meeting */}
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item bg-[#0F172A]/50 border border-line/60 rounded-xl p-4 flex flex-col gap-2 hover:border-accent/40 transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: "none" }}
              >
                <div className="text-accent flex items-center justify-between">
                  <Calendar size={16} />
                  <ExternalLink size={10} className="text-secondary/40 group-hover/item:text-accent transition-colors duration-200" />
                </div>
                <span className="font-mono text-[9px] text-secondary/60 uppercase tracking-widest font-bold">
                  Sync Session
                </span>
                <span className="font-sans text-xs text-white group-hover/item:text-accent transition-colors duration-200">
                  Book a Calendly slot
                </span>
              </a>
            </div>

            {/* Social handles row */}
            <div className="flex items-center gap-3 pt-4 relative z-10">
              <span className="font-mono text-[10px] text-secondary/40 uppercase tracking-wider mr-2">
                Profiles:
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-line/60 bg-[#0F172A]/50 flex items-center justify-center text-secondary hover:text-white hover:border-white/40 transition-all duration-200"
                style={{ boxShadow: "none" }}
              >
                <Github size={14} />
              </a>
              <a
                href="https://linkedin.com/in/ayush-kumawat05"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-line/60 bg-[#0F172A]/50 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/40 transition-all duration-200"
                style={{ boxShadow: "none" }}
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://x.com/AyushKu55022956"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-line/60 bg-[#0F172A]/50 flex items-center justify-center text-secondary hover:text-white hover:border-white/40 transition-all duration-200"
                style={{ boxShadow: "none" }}
              >
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form (No shadows) */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-surface border border-line rounded-2xl p-6 md:p-8 relative">

              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center text-accent font-mono text-xl animate-bounce">
                    ✓
                  </div>
                  <h3 className="font-display text-xl font-bold text-white uppercase">
                    Message Sent!
                  </h3>
                  <p className="text-secondary text-xs font-mono">
                    Thank you. Ayush will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono text-xs text-left">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-secondary/70 uppercase font-bold tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="bg-background border border-line rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent font-sans transition-colors duration-200"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-secondary/70 uppercase font-bold tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="bg-background border border-line rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent font-sans transition-colors duration-200"
                    />
                  </div>

                  {/* Project Name/Subject */}
                  <div className="flex flex-col gap-2">
                    <label className="text-secondary/70 uppercase font-bold tracking-wider">
                      Project Type / Scope
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Custom Admin Dashboard"
                      value={formState.project}
                      onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                      className="bg-background border border-line rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent font-sans transition-colors duration-200"
                    />
                  </div>

                  {/* Budget select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-secondary/70 uppercase font-bold tracking-wider">
                      Estimated Budget Scope
                    </label>
                    <select
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="bg-background border border-line rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors duration-200"
                    >
                      <option value="< $5k">&lt; $5k</option>
                      <option value="$5k - $10k">$5k - $10k</option>
                      <option value="$10k - $25k">$10k - $25k</option>
                      <option value="$25k+">$25k+</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label className="text-secondary/70 uppercase font-bold tracking-wider">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Detail your timeline requirements or database scopes here..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="bg-background border border-line rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent font-sans transition-colors duration-200 resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-sans text-center">
                      {errorMsg}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-2">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="flex-1 bg-primary text-white py-3.5 px-6 rounded-lg uppercase font-semibold tracking-wider hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={12} className={isSending ? "animate-pulse" : ""} />
                      <span>{isSending ? "Sending..." : "Send Message"}</span>
                    </button>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-line hover:border-accent text-white py-3.5 px-6 rounded-lg uppercase font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      <Calendar size={12} />
                      <span>Schedule Call</span>
                    </a>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
