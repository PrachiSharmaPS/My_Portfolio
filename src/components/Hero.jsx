import React from 'react';

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center justify-center min-h-[70vh] space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20 animate-pulse">
        Available for New Opportunities
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
        Prachi Sharma
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-4xl font-light leading-relaxed">
  Backend Developer with <span className="text-slate-200 font-medium">2+ years of experience</span> in
  <span className="text-slate-200 font-medium"> Node.js, Express, JavaScript, AWS</span>, and
  <span className="text-slate-200 font-medium"> multi-database systems</span>.
  Built scalable backend architectures, AI-driven workflows, and production-grade automations used by global enterprise clients.
</p>

<p className="text-sm md:text-base text-slate-500 max-w-3xl leading-relaxed">
  Delivered solutions for global clients including <span className="text-slate-300">Clevertap, media.net, and Swiggy</span>,
  improving development speed and reducing configuration overhead. Known for adaptability,
  rapid learning, and strong communication, backed by consistent high performance and multiple awards.
</p>
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <a href="#projects" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg shadow-lg transition duration-200">
          View My Work
        </a>
        <a href="/resume.pdf" download className="px-6 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-lg transition duration-200">
          Download Resume
        </a>
      </div>
    </div>
  );
}