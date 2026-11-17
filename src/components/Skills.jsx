import React from 'react';
import { Reveal, SectionHeading, TiltCard } from './effects';

const categories = [
  {
    title: "AI & Automation",
    icon: "🤖",
    accent: "from-emerald-400 to-cyan-400",
    skills: ["Al Agent Development", "Workflow Automation", "n8n", "Vapi", "ElevenLabs", "Lovable", "Retool", "DronaHQ", "Prompt Engineering", "Conversational AI", "LLM Integrations", "Cursor", "Claude Code"]
  },
  {
    title: "Backend & Frontend",
    icon: "⚡",
    accent: "from-cyan-400 to-violet-400",
    skills: ["Node.js", "Express.js", "JavaScript", "Python", "REST APIs", "React.js", "HTML", "CSS", "GSAP Animations", "OAuth2 / JWT"]
  },
  {
    title: "Database & Tools",
    icon: "🗄️",
    accent: "from-violet-400 to-emerald-400",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "HubSpot", "AWS (EC2, S3)", "Docker"]
  },
  {
    title: "Tools & Practices",
    icon: "🛠️",
    accent: "from-emerald-300 to-violet-500",
    skills: ["Git", "GitHub", "Notion", "Postman", "Unit Testing", "Debugging", "Error Handling"]
  }
];

const marqueeItems = ["Node.js", "AI Agents", "AWS", "MongoDB", "React", "Redis", "n8n", "Vapi", "PostgreSQL", "Docker", "REST APIs", "Python", "ElevenLabs", "Claude Code"];

export default function Skills() {
  return (
    <div>
      <SectionHeading index="01" title="Technical Expertise" subtitle="The stack I use to ship production-grade automations and backends." />

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => (
          <Reveal key={cat.title} delay={idx * 120} variant={idx % 2 ? 'right' : 'left'}>
            <TiltCard className="p-6 h-full" max={6}>
              <div className="flex items-center gap-3 mb-5">
                <span className={`grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br ${cat.accent} text-xl shadow-lg`}>
                  {cat.icon}
                </span>
                <h3 className={`text-xl font-bold bg-gradient-to-r ${cat.accent} bg-clip-text text-transparent`}>
                  {cat.title}
                </h3>
                <span className="ml-auto font-mono text-xs text-slate-500">{cat.skills.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="chip px-3 py-1.5 bg-slate-900/70 text-slate-300 text-sm rounded-lg border border-slate-800 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Infinite marquee */}
      <Reveal delay={200}>
        <div className="marquee mt-12 overflow-hidden py-4 border-y border-white/5">
          <div className="marquee-track gap-10">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} className="flex items-center gap-10 text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-700 hover:text-emerald-400 transition-colors whitespace-nowrap">
                {m}
                <span className="text-emerald-500/50 text-xl">✦</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
