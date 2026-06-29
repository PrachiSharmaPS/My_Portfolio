import React from 'react';
import certStar from '../assets/cert-star.jpeg';
import certFrontend from '../assets/cert-frontend.png';
import certHackathon from '../assets/cert-hackathon.png';

export default function Certificates() {
  const credentials = [
    {
      title: "Star Performer of the Year 2024",
      issuer: "DronaHQ / Deltecs Infotech",
      date: "Feb 21, 2025",
      img: certStar,
      badge: "Top Honor"
    },
    {
      title: "Front-End Domination Credentials",
      issuer: "Sheryians Coding School",
      date: "Jul 10, 2025",
      img: certFrontend,
      badge: "Core Stack"
    },
    {
      title: "Hackathon Builder & Participant",
      issuer: "DronaHQ Automation Build",
      date: "Feb 2026",
      img: certHackathon,
      badge: "AI Agent Engineering"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold border-b border-slate-800 pb-4 mb-8 text-slate-200">Credentials & Recognitions</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {credentials.map((cert, idx) => (
          <div key={idx} className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col group hover:border-slate-600 transition duration-300">
            <div className="relative overflow-hidden bg-slate-900 aspect-[4/3] flex items-center justify-center p-2 border-b border-slate-800">
              <img 
                src={cert.img} 
                alt={cert.title} 
                className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-300 rounded"
              />
              <span className="absolute top-3 right-3 text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-slate-950/80 border border-slate-700 text-emerald-400 rounded-full backdrop-blur-sm">
                {cert.badge}
              </span>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-1">{cert.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{cert.issuer}</p>
              </div>
              <div className="text-xs font-mono text-slate-500 mt-3 flex items-center justify-between">
                <span>Issued Portfolio Verified</span>
                <span>{cert.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}