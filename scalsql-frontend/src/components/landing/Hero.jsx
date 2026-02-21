import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-primary bg-primary/10 border border-primary/20 mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Cloud-Native AI to SQL Platform
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
        >
          <span className="block text-textMain">Transform Language</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            into Data
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-xl text-textMuted max-w-2xl mx-auto"
        >
          Ask in English. Execute in SQL. Scale in the Cloud. The secure, multi-tenant platform for instant database intelligence.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link
            to="/register"
            className="group flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primaryHover transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Get Started
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-lg bg-surfaceHighlight border border-border px-8 py-3 text-sm font-semibold text-textMain hover:bg-surface transition-all"
          >
            Sign In
          </Link>
        </motion.div>
      </div>

      {/* Background glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] opacity-50 -z-10 pointer-events-none"></div>
    </section>
  );
};

export default Hero;
