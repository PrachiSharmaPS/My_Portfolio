import React from 'react';
import { Reveal, SectionHeading, TiltCard, useInView } from './effects';

const jobs = [
  {
    role: "Software Developer",
    company: "DronaHQ",
    location: "Mumbai",
    period: "June 2023 - Present",
    current: true,
    bullets: [
      "Designed and deployed a production-grade autonomous AI voice agent using Vapi, ElevenLabs, and Salesforce to automate lead qualification.",
      "Developed Observation Management and Fleet Management applications for Algihaz, automating workflows, notifications, and escalations. Built backend services for dynamic PDF generation and maintained self-hosted production infrastructure.",
      "Optimized the Orix IOM reimbursement solution by implementing lazy loading and resilient design patterns, reducing processing delays by 30%.",
      "Led technical training for Purplle on platform architecture and data sources, boosting development efficiency by 45%.",
      "Engineered an automated workflow application for Cognota, seamlessly integrating HubSpot CRM and Slack APIs to execute real-time team alerts, pipeline tracking, and an automated ROI calculation engine via REST APIs and webhooks.",
      "Built and optimized subscription forms and sign-up processes, making lead onboarding 50% faster.",
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
      "Implemented secure JWT/OAuth2 authentication layers and structured exception handling mechanisms.",
      "Worked with AWS S3 for secure file storage and data management."
    ]
  }
];

// Highlight numbers like 30%, 45%, 70+ in bullets
function highlight(text) {
  const parts = text.split(/(\d+\+|\d+%)/g);
  return parts.map((p, i) =>
    /^(\d+\+|\d+%)$/.test(p)
      ? <span key={i} className="font-semibold text-emerald-300">{p}</span>
      : p
  );
}

export default function Experience() {
  const [lineRef, lineVisible] = useInView({ threshold: 0.05 });

  return (
    <div>
      <SectionHeading index="02" title="Professional Experience" subtitle="Where I've built, shipped and scaled." />

      <div ref={lineRef} className="relative pl-8 md:pl-12">
        {/* Animated timeline line */}
        <div className="absolute left-[11px] md:left-[19px] top-2 bottom-2 w-[2px] bg-slate-800 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-emerald-400 via-cyan-400 to-violet-500 transition-all duration-[2000ms] ease-out"
            style={{ height: lineVisible ? '100%' : '0%' }}
          />
        </div>

        <div className="space-y-12">
          {jobs.map((job, idx) => (
            <Reveal key={job.company} delay={idx * 150} variant="right" className="relative">
              {/* Timeline node */}
              <div className="absolute -left-8 md:-left-12 top-6 w-6 h-6 md:w-10 md:h-10 grid place-items-center">
                <span className={`relative w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_14px_4px_rgba(16,185,129,0.55)] ${job.current ? 'ping-dot' : ''}`} />
              </div>

              <TiltCard className="p-6 md:p-8" max={3}>
                <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-100">{job.role}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-semibold text-gradient">@ {job.company}</span>
                      {job.current && (
                        <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-300 font-mono px-3 py-1 rounded-lg bg-white/[0.04] border border-white/5">{job.period}</div>
                    <div className="text-xs text-slate-500 mt-1.5">📍 {job.location}</div>
                  </div>
                </div>
                <ul className="space-y-3 mt-5">
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="group flex gap-3 leading-relaxed text-slate-400 hover:text-slate-200 transition-colors">
                      <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-500/60 group-hover:bg-emerald-400 group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all" />
                      <span>{highlight(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
