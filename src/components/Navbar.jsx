import React from 'react';

export default function Navbar() {
  const navItems = [
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Impact', href: '#testimonials' },
    { label: 'Credentials', href: '#certificates' }
  ];

  return (
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
            <a
              href="mailto:Prachisharma.ps01@gmail.com"
              className="px-4 py-2 text-sm font-medium border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 rounded-lg transition duration-200"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}