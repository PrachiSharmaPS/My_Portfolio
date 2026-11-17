import React from 'react';
import { Reveal } from './effects';

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prachi-sharma-01ps/' },
  { label: 'GitHub', href: 'https://github.com/PrachiSharmaPS' }
];

export default function Footer() {
  return (
    <footer className="relative mt-36 border-t border-white/5 bg-slate-950/60 backdrop-blur">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal variant="zoom">
          <div className="text-center mb-14">
            <p className="font-mono text-sm text-emerald-400 mb-3">06. What's next?</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-gradient">Let's build something.</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Open to new opportunities and collaborations. Drop a message — I usually reply within a day.
            </p>
            <a
              href="mailto:Prachisharma.ps01@gmail.com"
              className="btn-shine inline-block mt-8 px-8 py-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.8)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(34,211,238,0.9)] transition-all duration-300"
            >
              Say Hello 👋
            </a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 items-center pt-10 border-t border-white/5">
          <div>
            <h3 className="text-lg font-bold text-slate-200">Prachi Sharma</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-sm">
              Automation Engineer & Backend Developer scaling enterprise tools and agentic applications.
            </p>
          </div>
          <div className="flex flex-col md:items-end space-y-2 text-sm text-slate-400">
            <a href="mailto:Prachisharma.ps01@gmail.com" className="hover:text-emerald-400 hover:translate-x-1 transition-all">
              ✉️ Prachisharma.ps01@gmail.com
            </a>
            <a href="tel:+919068674929" className="hover:text-emerald-400 hover:translate-x-1 transition-all">
              📞 +91 9068674929
            </a>
            <div className="flex gap-3 pt-3">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-emerald-300 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-12 font-mono">
          © {new Date().getFullYear()} Prachi Sharma · Built with React & Tailwind
        </p>
      </div>
    </footer>
  );
}
