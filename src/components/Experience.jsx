import React from 'react';

export default function Experience() {
  const jobs = [
    {
      role: "Software Development Engineer",
      company: "DronaHQ",
      location: "Mumbai",
      period: "June 2023 - Present",
      bullets: [
        "Designed and deployed a production-grade autonomous AI voice agent using Vapi, ElevenLabs, and Salesforce to automate lead qualification.",
        "Optimized the Orix IOM reimbursement solution by implementing lazy loading and resilient design patterns, reducing processing delays by 30%.",
        "Led technical training for Purplle on platform architecture and data sources, boosting development efficiency by 45%.",
        "Developed 70+ tools and POCs for enterprise clients like Clevertap, executing robust error handling and debugging frameworks."
      ]
    },
    {
      role: "Backend Developer Trainee",
      company: "FunctionUp",
      location: "Delhi",
      period: "Sept 2022 - May 2023",
      bullets: [
        "Designed scalable REST APIs and web backends using Node.js, Express, and MongoDB.",
        "Implemented secure JWT/OAuth2 authentication layers and structured exception handling mechanisms."
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold border-b border-slate-800 pb-4 mb-8 text-slate-200">Professional Experience</h2>
      <div className="space-y-12">
        {jobs.map((job, idx) => (
          <div key={idx} className="relative pl-6 border-l-2 border-emerald-500/30 hover:border-emerald-500 transition-colors duration-300">
            <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <div className="flex flex-wrap justify-between items-baseline mb-2">
              <h3 className="text-2xl font-bold text-slate-100">{job.role} <span className="text-emerald-400 font-normal">@ {job.company}</span></h3>
              <span className="text-sm text-slate-400 font-mono">{job.period} | {job.location}</span>
            </div>
            <ul className="space-y-2 text-slate-400 mt-4 list-disc pl-4">
              {job.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="leading-relaxed"><span className="text-slate-300">{bullet}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}