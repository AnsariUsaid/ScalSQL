import React from 'react';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Security from '../components/landing/Security';
import Pricing from '../components/landing/Pricing';

const LandingPage = () => {
  return (
    <div className="w-full">
      {/* Optional: Add a simple Header nav here later */}
      <nav className="fixed w-full z-50 glass-panel border-b-0 border-border/50 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-textMain flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">S</div>
          ScalSQL
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-textMuted">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </div>
      </nav>

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Security />
        <Pricing />
      </main>

      <footer className="py-12 border-t border-border bg-surface/50 text-center text-textMuted">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-textMain transition-colors">About</a>
          <a href="#" className="hover:text-textMain transition-colors">Documentation</a>
          <a href="#" className="hover:text-textMain transition-colors">Contact</a>
          <a href="https://github.com/AnsariUsaid/ScalSQL" target="_blank" rel="noopener noreferrer" className="hover:text-textMain transition-colors">GitHub</a>
        </div>
        <p>&copy; {new Date().getFullYear()} ScalSQL. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
