import React, { useState } from 'react';
import slackPoc from '../assets/slack-poc.png';
import slackClevertap from '../assets/slack-clevertap.png';
import slackAws from '../assets/slack-aws.png';

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState(0);

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

  return (
    <div>
      <h2 className="text-3xl font-bold border-b border-slate-800 pb-4 mb-2 text-slate-200">Impact & Internal Praise</h2>
      <p className="text-sm text-slate-400 mb-8">Verified feedback and execution highlights extracted straight from workplace workspaces.</p>
      
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* Left Side: Text Navigation Controls */}
        <div className="lg:col-span-2 space-y-3">
          {feedback.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                activeTab === index 
                ? 'bg-emerald-500/10 border-emerald-500 text-slate-100 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-800/80'
              }`}
            >
              <div className="font-bold text-base">{item.sender}</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">{item.context}</div>
              <p className="text-xs line-clamp-2 mt-2 italic text-slate-400">"{item.quote}"</p>
            </button>
          ))}
        </div>

        {/* Right Side: Slack Image Render Viewport */}
        <div className="lg:col-span-3 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner flex flex-col justify-between h-full">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="text-xs font-mono text-slate-500">Workspace Proof Asset // {feedback[activeTab].sender}</span>
            <span className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
            </span>
          </div>
          <div className="overflow-hidden rounded-lg bg-slate-900 border border-slate-800/50 p-2 flex items-center justify-center">
            <img 
              src={feedback[activeTab].imgSrc} 
              alt={`Proof for ${feedback[activeTab].context}`}
              className="max-w-full h-auto object-contain rounded hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}