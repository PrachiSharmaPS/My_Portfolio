import React, { useEffect, useRef, useState } from 'react';

/* ---------- Reveal on scroll ---------- */
export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    // Already on screen at mount (e.g. hero) → animate in right away
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const t = setTimeout(() => setInView(true), 30);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

export function Reveal({ children, delay = 0, variant = 'up', className = '', as: Tag = 'div' }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-${variant} ${inView ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ---------- Section heading ---------- */
export function SectionHeading({ index, title, subtitle }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-emerald-400/80">{index}.</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gradient-soft">{title}</h2>
        <span className="hidden sm:block flex-1 h-px bg-gradient-to-r from-emerald-500/40 via-cyan-500/20 to-transparent" />
      </div>
      {subtitle && <p className="text-sm text-slate-400 mt-3 ml-0 sm:ml-10">{subtitle}</p>}
    </Reveal>
  );
}

/* ---------- 3D tilt + spotlight card ---------- */
export function TiltCard({ children, className = '', max = 8, onClick }) {
  const ref = useRef(null);
  const frame = useRef(0);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rx = ((y / rect.height) - 0.5) * -max;
      const ry = ((x / rect.width) - 0.5) * max;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`tilt-card spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Typewriter ---------- */
export function Typewriter({ words, speed = 70, pause = 1600 }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setI((v) => v + 1);
    } else {
      t = setTimeout(() => {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return (
    <span className="text-gradient">
      {text}
      <span className="caret" />
    </span>
  );
}

/* ---------- Animated counter ---------- */
export function Counter({ to, suffix = '', duration = 1600 }) {
  const [ref, inView] = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- Page-wide background, cursor glow, progress bar, back-to-top ---------- */
export function PageEffects() {
  const glowRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      setShowTop(h.scrollTop > 600);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 shadow-[0_0_12px_rgb(var(--s400)/0.7)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Background layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[rgb(var(--bg))]" />
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 noise" />
        <div ref={glowRef} className="cursor-glow hidden md:block" />
      </div>

      {/* Back to top */}
      <a
        href="#hero"
        aria-label="Back to top"
        className={`fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full grid place-items-center border border-emerald-500/40 bg-slate-950/70 backdrop-blur text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        ↑
      </a>
    </>
  );
}
