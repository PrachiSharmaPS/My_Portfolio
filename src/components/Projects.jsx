import React from 'react';
import { Reveal, SectionHeading, TiltCard } from './effects';

const projects = [
  {
    title: "AWS S3 File Explorer",
    date: "Feb 2025",
    icon: "☁️",
    gradient: "from-emerald-400/30 via-cyan-500/10 to-transparent",
    tech: ["JavaScript", "AWS S3", "AWS Athena"],
    desc: "Engineered a comprehensive file manager to view, upload, and download S3 objects. Integrated AWS Athena for high-speed querying and parsing of raw JSON-based integrations, optimizing data retrieval performance."
  },
  {
    title: "LinkSlice",
    date: "Feb 2023",
    icon: "🔗",
    gradient: "from-violet-400/30 via-emerald-500/10 to-transparent",
    tech: ["React.js", "Node.js", "MongoDB", "Redis"],
    desc: "Developed a secure URL shortener converting extensive links into concise, user-friendly URLs with seamless, low-latency redirection backed by Redis caching mechanisms."
  }
];

export default function Projects() {
  return (
    <div>
      <SectionHeading index="03" title="Featured Engineering Projects" subtitle="A few things I've built end to end." />

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <Reveal key={proj.title} delay={idx * 150} variant="zoom">
            <TiltCard className="group h-full flex flex-col" max={10}>
              {/* Visual header */}
              <div className={`relative h-40 bg-gradient-to-br ${proj.gradient} border-b border-white/5 overflow-hidden`}>
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute -right-6 -bottom-8 text-[9rem] leading-none opacity-20 group-hover:opacity-40 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 select-none">
                  {proj.icon}
                </div>
                <div className="absolute top-5 left-6 flex items-center gap-3">
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-slate-950/70 border border-white/10 text-2xl backdrop-blur group-hover:scale-110 transition-transform duration-300">
                    {proj.icon}
                  </span>
                  <span className="font-mono text-xs text-slate-300 px-2.5 py-1 rounded-full bg-slate-950/60 border border-white/10">
                    {proj.date}
                  </span>
                </div>
                <span className="absolute top-5 right-6 font-mono text-5xl font-black text-white/10">0{idx + 1}</span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                    {proj.title}
                    <span className="text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mt-3 mb-6">{proj.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span key={t} className="chip text-xs font-mono px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
