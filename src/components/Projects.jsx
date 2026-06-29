import React from 'react';

export default function Projects() {
  const projects = [
    {
      title: "AWS S3 File Explorer",
      date: "Feb 2025",
      tech: ["JavaScript", "AWS S3", "AWS Athena"],
      desc: "Engineered a comprehensive file manager to view, upload, and download S3 objects. Integrated AWS Athena for high-speed querying and parsing of raw JSON-based integrations, optimizing data retrieval performance."
    },
    {
      title: "LinkSlice",
      date: "Feb 2023",
      tech: ["React.js", "Node.js", "MongoDB", "Redis"],
      desc: "Developed a secure URL shortener converting extensive links into concise, user-friendly URLs with seamless, low-latency redirection backed by Redis caching mechanisms."
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold border-b border-slate-800 pb-4 mb-8 text-slate-200">Featured Engineering Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => (
          <div key={idx} className="p-6 bg-slate-800/30 border border-slate-700/60 rounded-xl flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-slate-100">{proj.title}</h3>
                <span className="text-xs text-slate-500 font-mono">{proj.date}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{proj.desc}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t, i) => (
                <span key={i} className="text-xs font-mono px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}