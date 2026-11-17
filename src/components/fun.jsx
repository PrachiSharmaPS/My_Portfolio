import React, { useEffect, useRef, useState } from 'react';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches;

/* Read current theme colours from CSS variables */
function themeColors() {
  const cs = getComputedStyle(document.documentElement);
  return ['--p400', '--s400', '--t400', '--p300', '--s300']
    .map((v) => cs.getPropertyValue(v).trim())
    .filter(Boolean)
    .map((c) => `rgb(${c})`);
}

/* Fire confetti from anywhere: fireConfetti(x, y, { count, mode }) */
export function fireConfetti(x, y, opts = {}) {
  window.dispatchEvent(new CustomEvent('fun:confetti', { detail: { x, y, ...opts } }));
}

/* ---------- Canvas particle layer: click bursts, sparkle trail, confetti ---------- */
export function FunLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf = 0;
    let colors = themeColors();
    let lastTrail = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pick = () => colors[(Math.random() * colors.length) | 0];

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life < p.max);
      for (const p of particles) {
        p.life++;
        p.vy += p.g;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        const a = Math.max(0, 1 - p.life / p.max);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'star') {
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 2);
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(p.size * 0.15, p.size * 0.15, 0, p.size);
            ctx.quadraticCurveTo(-p.size * 0.15, p.size * 0.15, 0, 0);
          }
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * a, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      raf = particles.length ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const burst = (x, y) => {
      for (let i = 0; i < 16; i++) {
        const ang = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
        const sp = 2 + Math.random() * 3.5;
        particles.push({
          x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, g: 0.06, drag: 0.94,
          life: 0, max: 40 + Math.random() * 20, size: 3 + Math.random() * 4,
          color: pick(), shape: Math.random() > 0.5 ? 'star' : 'dot', rot: 0, vr: 0.1,
        });
      }
      kick();
    };

    const confetti = ({ x, y, count = 120, mode = 'pop' }) => {
      colors = themeColors();
      for (let i = 0; i < count; i++) {
        const rain = mode === 'rain';
        const ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const sp = 6 + Math.random() * 9;
        particles.push({
          x: rain ? Math.random() * window.innerWidth : x,
          y: rain ? -20 - Math.random() * window.innerHeight * 0.5 : y,
          vx: rain ? (Math.random() - 0.5) * 2 : Math.cos(ang) * sp,
          vy: rain ? 2 + Math.random() * 3 : Math.sin(ang) * sp,
          g: rain ? 0.05 : 0.25, drag: 0.985,
          life: 0, max: rain ? 260 : 130 + Math.random() * 60, size: 7 + Math.random() * 7,
          color: pick(), shape: 'rect', rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
        });
      }
      kick();
    };

    const onDown = (e) => {
      if (e.target.closest?.('iframe')) return;
      colors = themeColors();
      burst(e.clientX, e.clientY);
    };
    const onMove = (e) => {
      if (!finePointer()) return;
      const now = performance.now();
      if (now - lastTrail < 28) return;
      lastTrail = now;
      particles.push({
        x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 0.8, vy: Math.random() * 0.6,
        g: 0.02, drag: 0.98, life: 0, max: 35, size: 2 + Math.random() * 3,
        color: pick(), shape: Math.random() > 0.7 ? 'star' : 'dot', rot: 0, vr: 0.05,
      });
      kick();
    };
    const onConfetti = (e) => confetti(e.detail);
    const onTheme = () => { colors = themeColors(); };

    window.addEventListener('resize', resize);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('fun:confetti', onConfetti);
    window.addEventListener('fun:theme', onTheme);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('fun:confetti', onConfetti);
      window.removeEventListener('fun:theme', onTheme);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[80] pointer-events-none" aria-hidden="true" />;
}

/* ---------- Trailing cursor ring that grows over links/buttons ---------- */
export function CursorRing() {
  const ref = useRef(null);
  const [enabled] = useState(() => finePointer() && !reducedMotion());

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    let x = -100, y = -100, tx = -100, ty = -100, scale = 1, tScale = 1, raf;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      tScale = e.target.closest?.('a, button, .cursor-zoom-in') ? 1.9 : 1;
    };
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      scale += (tScale - scale) * 0.2;
      el.style.transform = `translate(${x - 18}px, ${y - 18}px) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[90] w-9 h-9 rounded-full border-2 border-emerald-400/70 pointer-events-none mix-blend-screen shadow-[0_0_15px_rgb(var(--p400)/0.5)]"
    />
  );
}

/* ---------- Theme switcher ---------- */
export const THEMES = [
  { id: 'sunset', name: 'Sunset Pop', emoji: '🌅', swatch: ['#f472b6', '#fb923c', '#fde047'] },
  { id: 'mint',   name: 'Matrix Mint', emoji: '🌿', swatch: ['#34d399', '#22d3ee', '#a78bfa'] },
  { id: 'cyber',  name: 'Cyber Neon', emoji: '👾', swatch: ['#e879f9', '#fde047', '#22d3ee'] },
  { id: 'ocean',  name: 'Ocean Deep', emoji: '🌊', swatch: ['#38bdf8', '#818cf8', '#2dd4bf'] },
];

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'sunset');
  const btnRef = useRef(null);

  const apply = (id) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.dataset.theme = id;
    setTheme(id);
    try { localStorage.setItem('theme', id); } catch {}
    window.dispatchEvent(new Event('fun:theme'));
    setTimeout(() => root.classList.remove('theme-transition'), 700);
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setTimeout(() => fireConfetti(r.left + r.width / 2, r.top, { count: 70 }), 60);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!e.target.closest?.('[data-theme-switcher]')) setOpen(false); };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [open]);

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div data-theme-switcher className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="pop-in p-2 rounded-2xl bg-slate-950/90 border border-white/10 backdrop-blur-xl shadow-2xl w-52">
          <div className="px-2 pt-1 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">Pick a vibe</div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => apply(t.id)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl text-sm text-left transition-all duration-200 hover:bg-white/5 hover:translate-x-1 ${
                theme === t.id ? 'bg-white/[0.07] text-slate-100' : 'text-slate-400'
              }`}
            >
              <span
                className="w-7 h-7 rounded-full shrink-0 ring-2 ring-white/10"
                style={{ background: `conic-gradient(${t.swatch[0]}, ${t.swatch[1]}, ${t.swatch[2]}, ${t.swatch[0]})` }}
              />
              <span className="flex-1">{t.name}</span>
              <span>{theme === t.id ? '✓' : t.emoji}</span>
            </button>
          ))}
        </div>
      )}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Change colour theme"
        title="Change colour theme"
        className="group relative w-14 h-14 rounded-full grid place-items-center text-2xl bg-slate-950/80 backdrop-blur border border-white/10 shadow-[0_10px_30px_-8px_rgb(var(--p500)/0.7)] hover:scale-110 active:scale-95 transition-transform duration-300"
      >
        <span
          className="absolute inset-[-3px] rounded-full -z-10 animate-[spin_4s_linear_infinite]"
          style={{ background: `conic-gradient(${current.swatch[0]}, ${current.swatch[1]}, ${current.swatch[2]}, ${current.swatch[0]})` }}
        />
        <span className="absolute inset-[1px] rounded-full bg-slate-950 -z-10" />
        <span className="group-hover:rotate-[20deg] transition-transform duration-300">🎨</span>
      </button>
    </div>
  );
}

/* ---------- Magnetic wrapper: element leans toward the cursor ---------- */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </span>
  );
}

/* ---------- Letters that wobble like jelly on hover ---------- */
export function BouncyText({ text, className = '' }) {
  const wobble = (e) => {
    const el = e.currentTarget;
    if (el.classList.contains('rubber')) return;
    el.classList.add('rubber');
    el.addEventListener('animationend', () => el.classList.remove('rubber'), { once: true });
  };
  return (
    <span className={className} aria-label={text}>
      {[...text].map((ch, i) =>
        ch === ' ' ? (
          <span key={i} aria-hidden="true">&nbsp;</span>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            onMouseEnter={wobble}
            className="text-gradient letter inline-block cursor-default"
            style={{ '--d': `-${i * 0.35}s` }}
          >
            {ch}
          </span>
        )
      )}
    </span>
  );
}

/* ---------- Spinning "open to work" sticker ---------- */
export function SpinBadge({ className = '' }) {
  return (
    <div className={className}>
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_14s_linear_infinite]">
        <defs>
          <path id="circle-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-emerald-300 font-mono" style={{ fontSize: '9.5px', letterSpacing: '2.4px' }}>
          <textPath href="#circle-path">OPEN TO WORK ✦ LET'S TALK ✦ </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-3xl animate-float">💼</span>
    </div>
    </div>
  );
}

/* ---------- Easter egg: type "prachi" or the Konami code ---------- */
export function EasterEgg() {
  const [toast, setToast] = useState('');

  useEffect(() => {
    const konami = 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a';
    let keys = [];
    let word = '';
    let hide;
    const party = () => {
      fireConfetti(0, 0, { count: 220, mode: 'rain' });
      setToast('🎉 You found the secret! Thanks for exploring.');
      clearTimeout(hide);
      hide = setTimeout(() => setToast(''), 4000);
    };
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, [contenteditable]')) return;
      keys = [...keys, e.key].slice(-10);
      word = (word + (e.key.length === 1 ? e.key.toLowerCase() : '')).slice(-6);
      if (keys.join(',') === konami || word === 'prachi') {
        keys = [];
        word = '';
        party();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(hide); };
  }, []);

  if (!toast) return null;
  return (
    <div className="pop-in fixed top-24 left-1/2 -translate-x-1/2 z-[85] px-5 py-3 rounded-2xl bg-slate-950/90 border border-emerald-400/40 backdrop-blur text-sm text-slate-100 shadow-[0_15px_40px_-10px_rgb(var(--p500)/0.6)]">
      {toast}
    </div>
  );
}
