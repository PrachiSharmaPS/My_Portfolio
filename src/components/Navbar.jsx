import React, { useState } from 'react';

export default function Navbar() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navItems = [
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Impact', href: '#testimonials' },
    { label: 'Credentials', href: '#certificates' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold font-mono tracking-wider text-emerald-400">
                PS // SDE
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              {/* Changed from <a> to <button> to trigger the AI Agent Chat */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="px-4 py-2 text-sm font-medium border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 rounded-lg transition duration-200 bg-emerald-500/5 hover:bg-emerald-500/10"
              >
                Talk to AI Agent 🤖
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating AI Agent Chat Widget */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] h-[600px] max-h-[80vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Widget Header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-xs text-slate-300 font-semibold tracking-wide">PRACHI_AI_AGENT // ONLINE</span>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-slate-200 text-sm p-1 hover:bg-slate-800 rounded-md transition"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Iframe Container */}
          <div className="flex-grow w-full h-full bg-slate-900">
            <iframe 
              src="https://agents.dronahq.com/chat/28cca669-8250-4bed-af6a-6eae92d73095" 
              className="w-full h-full border-none"
              title="Prachi's AI Agent"
              allow="clipboard-write"
            />
          </div>
        </div>
      )}
    </>
  );
}