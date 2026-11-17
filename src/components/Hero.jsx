import React from 'react';
import { Reveal, Typewriter, Counter } from './effects';
import { BouncyText, Magnetic, SpinBadge } from './fun';

const floaters = [
  { emoji: '🚀', pos: 'top-16 left-[6%]', delay: '0s' },
  { emoji: '⚡', pos: 'top-1/3 right-[8%]', delay: '1.2s' },
  { emoji: '🤖', pos: 'bottom-1/4 left-[10%]', delay: '2.4s' },
  { emoji: '☕', pos: 'bottom-[18%] right-[14%]', delay: '0.8s' },
  { emoji: '💡', pos: 'top-[45%] left-[2%]', delay: '3s' },
];

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
      {/* Floating emojis — hover to spin, click for a burst */}
      {floaters.map((f) => (
        <span
          key={f.emoji}
          className={`absolute ${f.pos} hidden sm:block text-3xl md:text-4xl animate-float select-none`}
          style={{ animationDelay: f.delay }}
        >
          <span className="block cursor-pointer opacity-80 hover:opacity-100 hover:scale-150 hover:rotate-[360deg] transition-all duration-700 drop-shadow-[0_0_18px_rgb(var(--p400)/0.6)]">
            {f.emoji}
          </span>
        </span>
      ))}

      <SpinBadge className="hidden lg:block absolute top-6 right-0" />

      <div className="space-y-7 relative">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/30 backdrop-blur">
            <span className="relative ping-dot w-2 h-2 rounded-full bg-emerald-400" />
            Available for New Opportunities
          </div>
        </Reveal>

        <Reveal delay={120} variant="zoom">
          <p className="font-mono text-sm md:text-base text-slate-400 mb-3">Hi there <span className="wave">👋</span>, I'm</p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none drop-shadow-[0_0_35px_rgb(var(--p500)/0.25)]">
            <BouncyText text="Prachi Sharma" />
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
            <Magnetic>
            <a
              href="#projects"
              className="btn-shine group inline-block px-7 py-3.5 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-semibold rounded-xl shadow-[0_10px_40px_-10px_rgb(var(--p500)/0.8)] hover:shadow-[0_15px_50px_-10px_rgb(var(--s400)/0.9)] hover:-translate-y-1 transition-all duration-300"
            >
              View My Work <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </a>
            </Magnetic>
            <Magnetic>
            <a
              href="/resume.pdf"
              download
              className="group inline-block px-7 py-3.5 border border-slate-700 hover:border-emerald-400/60 bg-white/[0.02] hover:bg-emerald-500/10 text-slate-200 rounded-xl backdrop-blur hover:-translate-y-1 transition-all duration-300"
            >
              Download Resume <span className="inline-block group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
            </Magnetic>
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
