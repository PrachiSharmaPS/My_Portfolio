import React from 'react';
import { Reveal, Typewriter, Counter } from './effects';

const roles = ['Backend Developer', 'AI Agent Engineer', 'Automation Engineer', 'Node.js Specialist'];

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 70, suffix: '+', label: 'Tools & POCs Built' },
  { value: 50, suffix: '%', label: 'Faster Onboarding' },
  { value: 45, suffix: '%', label: 'Dev Efficiency Boost' }
];

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center text-center justify-center min-h-[calc(100vh-5rem)] py-16">
      {/* Floating decorative orbs */}
      <div className="absolute top-16 left-[8%] w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_25px_8px_rgba(16,185,129,0.5)] animate-float" />
      <div className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_20px_6px_rgba(34,211,238,0.5)] animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/4 left-[15%] w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_20px_6px_rgba(167,139,250,0.5)] animate-float" style={{ animationDelay: '3s' }} />

      <div className="space-y-7 relative">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/30 backdrop-blur">
            <span className="relative ping-dot w-2 h-2 rounded-full bg-emerald-400" />
            Available for New Opportunities
          </div>
        </Reveal>

        <Reveal delay={120} variant="zoom">
          <p className="font-mono text-sm md:text-base text-slate-400 mb-3">Hi there 👋, I'm</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none text-gradient drop-shadow-[0_0_35px_rgba(16,185,129,0.25)]">
            Prachi Sharma
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <div className="text-2xl md:text-4xl font-bold text-slate-200 h-12 md:h-14">
            <Typewriter words={roles} />
          </div>
        </Reveal>

        <Reveal delay={360}>
          <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed">
            <span className="text-slate-100 font-medium">3+ years of experience</span> in
            <span className="text-emerald-300 font-medium"> Node.js, Express, JavaScript, AWS</span>, and
            <span className="text-cyan-300 font-medium"> multi-database systems</span>.
            Built scalable backend architectures, AI-driven workflows, and production-grade automations used by global enterprise clients.
          </p>
        </Reveal>

        <Reveal delay={460}>
          <p className="text-sm md:text-base text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Delivered solutions for global clients including <span className="text-slate-300">Clevertap, media.net, and Swiggy</span>,
            improving development speed and reducing configuration overhead. Known for adaptability,
            rapid learning, and strong communication, backed by consistent high performance and multiple awards.
          </p>
        </Reveal>

        <Reveal delay={560}>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#projects"
              className="btn-shine group px-7 py-3.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-semibold rounded-xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.8)] hover:shadow-[0_15px_50px_-10px_rgba(34,211,238,0.9)] hover:-translate-y-1 transition-all duration-300"
            >
              View My Work <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/resume.pdf"
              download
              className="group px-7 py-3.5 border border-slate-700 hover:border-emerald-400/60 bg-white/[0.02] hover:bg-emerald-500/10 text-slate-200 rounded-xl backdrop-blur hover:-translate-y-1 transition-all duration-300"
            >
              Download Resume <span className="inline-block group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={680}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-black text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500 mt-1 group-hover:text-slate-300 transition-colors">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <a href="#skills" aria-label="Scroll down" className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2">
        <div className="scroll-mouse relative w-6 h-10 rounded-full border-2 border-slate-600 hover:border-emerald-400 transition-colors" />
      </a>
    </div>
  );
}
