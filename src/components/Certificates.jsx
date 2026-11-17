import React, { useEffect, useState } from 'react';
import certStar from '../assets/cert-star.jpeg';
import certFrontend from '../assets/cert-frontend.png';
import certHackathon from '../assets/cert-hackathon.png';
import { Reveal, SectionHeading, TiltCard } from './effects';

const credentials = [
  {
    title: "Star Performer of the Year 2024",
    issuer: "DronaHQ / Deltecs Infotech",
    date: "Feb 21, 2025",
    img: certStar,
    badge: "Top Honor",
    icon: "🏆"
  },
  {
    title: "Front-End Domination Credentials",
    issuer: "Sheryians Coding School",
    date: "Jul 10, 2025",
    img: certFrontend,
    badge: "Core Stack",
    icon: "🎓"
  },
  {
    title: "Hackathon Builder & Participant",
    issuer: "DronaHQ Automation Build",
    date: "Feb 2026",
    img: certHackathon,
    badge: "AI Agent Engineering",
    icon: "🚀"
  }
];

export default function Certificates() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div>
      <SectionHeading index="05" title="Credentials & Recognitions" subtitle="Click any certificate to view it full size." />

      <div className="grid md:grid-cols-3 gap-6">
        {credentials.map((cert, idx) => (
          <Reveal key={cert.title} delay={idx * 130} variant="up">
            <TiltCard className="group h-full flex flex-col cursor-zoom-in" max={12} onClick={() => setOpen(cert)}>
              <div className="relative overflow-hidden bg-slate-950/70 aspect-[4/3] flex items-center justify-center p-3 border-b border-white/5">
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700 rounded"
                />
                {/* Shine sweep on hover */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 bg-slate-950/80 border border-emerald-500/30 text-emerald-300 rounded-full backdrop-blur-sm">
                  {cert.icon} {cert.badge}
                </span>
                <span className="absolute inset-0 grid place-items-center bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-4 py-2 rounded-full bg-emerald-400 text-slate-950 text-xs font-bold scale-75 group-hover:scale-100 transition-transform duration-300">
                    View Certificate
                  </span>
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">{cert.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">{cert.issuer}</p>
                </div>
                <div className="text-xs font-mono text-slate-500 mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="text-emerald-400">✔</span> Verified</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center p-4 bg-slate-950/85 backdrop-blur-md fade-swap"
          onClick={() => setOpen(null)}
        >
          <div className="pop-in relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              className="absolute -top-12 right-0 w-10 h-10 grid place-items-center rounded-full bg-white/10 text-white hover:bg-emerald-400 hover:text-slate-950 hover:rotate-90 transition-all duration-300"
              aria-label="Close"
            >
              ✕
            </button>
            <img src={open.img} alt={open.title} className="w-full max-h-[80vh] object-contain rounded-xl shadow-[0_30px_100px_-20px_rgba(16,185,129,0.5)]" />
            <div className="text-center mt-4">
              <div className="font-bold text-slate-100">{open.title}</div>
              <div className="text-sm text-slate-400">{open.issuer} · {open.date}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
