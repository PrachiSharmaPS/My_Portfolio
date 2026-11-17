import React, { useEffect, useState } from 'react';
import slackPoc from '../assets/slack-poc.png';
import slackClevertap from '../assets/slack-clevertap.png';
import slackAws from '../assets/slack-aws.png';
import { Reveal, SectionHeading } from './effects';

const feedback = [
  {
    sender: "Ujjwal Jain",
    context: "Client Demo & POC Validation",
    quote: "Awesome job by @Prachi Sharma and @Ashish in the demo. Each and every question was answered with ease. I just got off the call, the client is also impressed by the work both of you have done in building the POC. Didn't feel like it was your first demo. Kudos!",
    imgSrc: slackPoc
  },
  {
    sender: "Prerna Singhal",
    context: "Clevertap Application Migration",
    quote: "Big Shout Out to... @Prachi Sharma... for helping us migrate 70+ applications from retool to studio within 2 weeks including weekends 🏆 Special thanks to the platform team for their constant support 👏🎉✌️",
    imgSrc: slackClevertap
  },
  {
    sender: "Prerna Singhal",
    context: "AWS S3 File Explorer Launch",
    quote: "Kudos to @Prachi Sharma on successful delivery of her very first project 'a replica of file management system using S3 as data source'. 🚀🎉 Here is a small recording for future reference... We probably can make use of it in our sales call if needed",
    imgSrc: slackAws
  }
];

const AUTOPLAY_MS = 7000;

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActiveTab((v) => (v + 1) % feedback.length), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [activeTab, paused]);

  const initials = (name) => name.split(' ').map((n) => n[0]).join('');

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <SectionHeading
        index="04"
        title="Impact & Internal Praise"
        subtitle="Verified feedback and execution highlights extracted straight from workplace workspaces."
      />

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 space-y-3">
          {feedback.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <Reveal key={index} delay={index * 120} variant="left">
                <button
                  onClick={() => setActiveTab(index)}
                  className={`relative w-full text-left p-4 rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500/60 text-slate-100 shadow-[0_0_30px_-5px_rgba(16,185,129,0.35)] translate-x-2'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:border-slate-700 hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`grid place-items-center w-10 h-10 rounded-full text-sm font-bold shrink-0 transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {initials(item.sender)}
                    </span>
                    <div>
                      <div className="font-bold text-base">{item.sender}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">{item.context}</div>
                    </div>
                  </div>
                  <p className="text-xs line-clamp-2 mt-3 italic text-slate-400">"{item.quote}"</p>

                  {/* Autoplay progress bar */}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 h-[2px] w-full bg-white/5">
                      <span
                        key={`${activeTab}-${paused}`}
                        className="block h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                        style={{
                          animation: paused ? 'none' : `progress ${AUTOPLAY_MS}ms linear forwards`,
                          width: paused ? '100%' : undefined
                        }}
                      />
                    </span>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} variant="right" className="lg:col-span-3">
          <div className="conic-border shadow-[0_30px_80px_-30px_rgba(16,185,129,0.5)]">
            <div className="bg-slate-950 p-4 rounded-2xl flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
                </span>
                <span className="text-xs font-mono text-slate-500">Workspace Proof Asset // {feedback[activeTab].sender}</span>
              </div>
              <div className="overflow-hidden rounded-lg bg-slate-900 border border-slate-800/50 p-2 flex items-center justify-center min-h-[240px]">
                <img
                  key={activeTab}
                  src={feedback[activeTab].imgSrc}
                  alt={`Proof for ${feedback[activeTab].context}`}
                  className="fade-swap max-w-full h-auto object-contain rounded hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
