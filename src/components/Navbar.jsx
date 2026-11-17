import React, { useEffect, useState } from 'react';

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
              <span className="relative grid place-items-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(16,185,129,0.45)] group-hover:rotate-12 transition-transform duration-300">
                PS
              </span>
              <span className="text-lg font-bold font-mono tracking-wider text-slate-200 group-hover:text-emerald-400 transition-colors">
                // CSE
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
                        ? 'text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_18px_rgba(16,185,129,0.45)]'
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
                className="btn-shine group relative px-4 py-2 text-sm font-medium rounded-lg text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all duration-300"
              >
                <span className="hidden sm:inline">Talk to AI Agent </span>
                <span className="inline-block group-hover:animate-bounce">🤖</span>
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
        <div className="pop-in fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] h-[600px] max-h-[80vh] conic-border shadow-[0_30px_80px_-20px_rgba(16,185,129,0.45)]">
          <div className="h-full bg-slate-950 rounded-2xl flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative ping-dot w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-xs text-slate-300 font-semibold tracking-wide">PRACHI_AI_AGENT // OFFLINE</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-slate-100 text-sm w-7 h-7 grid place-items-center hover:bg-slate-800 rounded-md hover:rotate-90 transition-all duration-300"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
            <div className="flex-grow w-full h-full bg-slate-900">
              <iframe
                src="https://agents.com/chat/28cca669-8250-4bed-af6a-6eae92d73095"
                className="w-full h-full border-none"
                title="Prachi's AI Agent"
                allow="clipboard-write"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
