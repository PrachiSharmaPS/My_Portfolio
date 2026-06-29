import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Certificates from './components/Certificates';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans scroll-smooth">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32">
        <section id="hero"><Hero /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="certificates"><Certificates /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;