import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-200">Prachi Sharma</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-sm">
              Automation Engineer & Backend Developer scaling enterprise tools and agentic applications.
            </p>
          </div>
          <div className="flex flex-col md:items-end space-y-2 text-sm text-slate-400">
            <a href="mailto:Prachisharma.ps01@gmail.com" className="hover:text-emerald-400 transition-colors">
              ✉️ Prachisharma.ps01@gmail.com 
            </a>
            <a href="tel:+919068674929" className="hover:text-emerald-400 transition-colors">
              📞 +91 9068674929 
            </a>
           <div className="flex gap-4 pt-2">
  <a 
    href="https://www.linkedin.com/in/prachi-sharma-01ps/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:text-slate-200 transition-colors"
  >
    LinkedIn
  </a>
  <a 
    href="https://github.com/PrachiSharmaPS" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="hover:text-slate-200 transition-colors"
  >
    GitHub
  </a>
</div>
          </div>
        </div>
        <div className="border-t border-slate-900 mt-8 pt-8 text-center text-xs text-slate-500 font-mono">
          &copy; {new Date().getFullYear()} // Engineered cleanly with React & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}