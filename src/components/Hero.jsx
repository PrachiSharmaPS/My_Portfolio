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
      <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-light">
        Software Development Engineer specializing in <span className="text-slate-200 font-medium">AI Agents</span>, 
        <span className="text-slate-200 font-medium"> Workflow Automation</span>, and scalable Backend Systems.
      </p>
      <p className="text-sm md:text-base text-slate-500 max-w-xl">
        Proven track record of delivering 70+ enterprise tools and production-grade agentic systems with measurable client impact.
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