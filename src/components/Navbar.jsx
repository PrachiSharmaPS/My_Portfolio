import React, { useEffect, useState } from 'react';

// Flip to true when the AI agent server is back up — the live chat returns automatically.
const AGENT_ONLINE = false;
const AGENT_URL = 'https://agents.com/chat/28cca669-8250-4bed-af6a-6eae92d73095';

const navItems = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Impact', href: '#testimonials' },
  { label: 'Credentials', href: '#certificates' }
];

export default function Navbar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl bg-slate-950/70 border-b border-white/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
            <a href="#hero" className="group flex items-center gap-2">
              <span className="relative grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 font-black text-sm shadow-[0_0_20px_rgb(var(--p500)/0.45)] group-hover:rotate-12 transition-transform duration-300">
                PS
              </span>
              <span className="text-lg font-bold font-mono tracking-wider text-slate-200 group-hover:text-emerald-400 transition-colors">
                // SDE
              </span>
            </a>

            <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/5">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_18px_rgb(var(--p500)/0.45)]'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="btn-shine group relative px-4 py-2 text-sm font-medium rounded-lg text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_25px_rgb(var(--p500)/0.35)] transition-all duration-300"
              >
                <span className="hidden sm:inline">Talk to AI Agent </span>
                <span className="inline-block group-hover:animate-bounce">🤖</span>
                <span
                  title={AGENT_ONLINE ? 'Online' : 'Offline for maintenance'}
                  className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-slate-950 ${AGENT_ONLINE ? 'bg-green-400' : 'bg-amber-400'}`}
                />
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 grid place-items-center rounded-lg border border-white/10 text-slate-300"
                aria-label="Toggle menu"
              >
                <div className="space-y-1.5">
                  <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pb-4 space-y-1 bg-slate-950/90 backdrop-blur-xl">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: `${i * 50}ms` }}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  menuOpen ? 'translate-x-0' : '-translate-x-4'
                } ${active === item.href ? 'bg-emerald-500/15 text-emerald-300' : 'text-slate-300 hover:bg-white/5'}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Floating AI Agent Chat Widget */}
      {isChatOpen && (
        <div className={`pop-in fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] ${AGENT_ONLINE ? 'h-[600px] max-h-[80vh]' : ''}`}>
        <div className="h-full conic-border shadow-[0_30px_80px_-20px_rgb(var(--p500)/0.45)]">
          <div className="h-full bg-slate-950 rounded-2xl flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`relative ping-dot w-2 h-2 rounded-full ${AGENT_ONLINE ? 'bg-green-400' : 'bg-amber-400'}`}></span>
                <span className="font-mono text-xs text-slate-300 font-semibold tracking-wide">
                  PRACHI_AI_AGENT // {AGENT_ONLINE ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-slate-100 text-sm w-7 h-7 grid place-items-center hover:bg-slate-800 rounded-md hover:rotate-90 transition-all duration-300"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
            {AGENT_ONLINE ? (
              <div className="flex-grow w-full h-full bg-slate-900">
                <iframe
                  src={AGENT_URL}
                  className="w-full h-full border-none"
                  title="Prachi's AI Agent"
                  allow="clipboard-write"
                />
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <div className="relative mx-auto w-20 h-20 grid place-items-center rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 text-4xl animate-float">
                  🤖
                  <span className="absolute -top-1 -right-1 text-xl">💤</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-100">My AI agent is taking a quick nap</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  The agent server is temporarily down for maintenance and will be back soon.
                  In the meantime, I'd love to hear from you directly!
                </p>
                <div className="mt-6 grid gap-2">
                  <a
                    href="mailto:Prachisharma.ps01@gmail.com"
                    className="btn-shine px-4 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:-translate-y-0.5 transition-transform"
                  >
                    ✉️ Email me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/prachi-sharma-01ps/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-xl text-sm font-medium text-slate-200 border border-white/10 bg-white/[0.03] hover:border-emerald-400/60 hover:bg-emerald-500/10 transition-colors"
                  >
                    💼 Message me on LinkedIn
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      )}
    </>
  );
}
