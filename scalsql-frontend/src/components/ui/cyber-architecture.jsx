import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Database, Server, BrainCircuit, Globe, Box, Terminal, Zap } from 'lucide-react';

const AnimatedArchitecture = () => {
  const containerRef = useRef(null);
  
  // Mouse position values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth tilt
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation angles (subtle tilt)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Animated data particles
  const DataParticle = ({ pathId, duration, delay, color }) => (
    <motion.circle
      r="4"
      fill={color}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: '100%' }}
      transition={{
        duration,
        delay,
        ease: 'linear',
        repeat: Infinity,
      }}
      className="particle"
    >
      <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </motion.circle>
  );

  return (
    <div 
      className="w-full py-24 min-h-[800px] flex flex-col items-center justify-center relative overflow-hidden bg-background-dark" 
      id="architecture"
      style={{ perspective: 1500 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="60" id="architect-grid" patternUnits="userSpaceOnUse" width="60">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="4 4" />
            </pattern>
          </defs>
          <rect fill="url(#architect-grid)" height="100%" width="100%" />
        </svg>
      </div>
      
      {/* Glowing atmospheric orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-50 text-center mb-16 max-w-2xl mx-auto px-4 pointer-events-none">
        <span className="text-primary font-semibold tracking-widest uppercase text-xs border border-primary/40 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.3)] inline-block mb-6">
          System Blueprint
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
          Cloud-Native <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Intelligence</span>
        </h2>
        <p className="text-gray-400 text-lg">Hover around to interact with the 3D infrastructure map.</p>
      </div>

      {/* 3D Scene Container */}
      <motion.div 
        className="relative w-full max-w-6xl h-[500px] flex items-center justify-center transform-style-3d z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* SVG Connectors Canvas */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(0px)' }}>
          <svg className="w-full h-full absolute inset-0 text-white" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168,85,247,0.2)" />
                <stop offset="50%" stopColor="rgba(168,85,247,1)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
              </linearGradient>
            </defs>

            {/* Path 1: Client -> API */}
            <path id="path-client-api" d="M 200 250 L 350 250" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <path d="M 200 250 L 350 250" fill="none" stroke="url(#glowLine)" strokeWidth="3" className="animate-[dash_3s_linear_infinite]" strokeDasharray="10 10" />

            {/* Path 2: API -> SageMaker */}
            <path id="path-api-ai" d="M 450 250 L 600 250" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <path d="M 450 250 L 600 250" fill="none" stroke="url(#glowLine)" strokeWidth="3" className="animate-[dash_3s_linear_infinite]" strokeDasharray="10 10" />

            {/* Path 3: SageMaker -> DB */}
            <path id="path-ai-db" d="M 700 230 C 780 230, 800 150, 850 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <path d="M 700 230 C 780 230, 800 150, 850 150" fill="none" stroke="url(#glowLine)" strokeWidth="3" className="animate-[dash_3s_linear_infinite]" strokeDasharray="10 10" />

            {/* Path 4: SageMaker -> Warehouse */}
            <path id="path-ai-lake" d="M 700 270 C 780 270, 800 350, 850 350" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <path d="M 700 270 C 780 270, 800 350, 850 350" fill="none" stroke="url(#glowLine)" strokeWidth="3" className="animate-[dash_3s_linear_infinite]" strokeDasharray="10 10" />

            {/* Particles */}
            <DataParticle pathId="path-client-api" duration={2} delay={0} color="#a855f7" />
            <DataParticle pathId="path-client-api" duration={2} delay={1} color="#d8b4fe" />
            
            <DataParticle pathId="path-api-ai" duration={1.5} delay={0.5} color="#a855f7" />
            <DataParticle pathId="path-api-ai" duration={1.5} delay={1.2} color="#4c1d95" />

            <DataParticle pathId="path-ai-db" duration={2} delay={0} color="#3b82f6" />
            <DataParticle pathId="path-ai-lake" duration={2.5} delay={0.8} color="#10b981" />
          </svg>
        </div>

        {/* --- NODE 1: Client --- */}
        <div 
          className="absolute left-[80px] top-[190px] group"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="w-32 h-32 rounded-2xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <Globe className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors mb-3" />
            <span className="text-white font-bold text-sm">User App</span>
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">Frontend</span>
          </div>
          {/* Base shadow reflection */}
          <div className="absolute -bottom-8 blur-xl w-32 h-8 bg-primary/20 rounded-full" style={{ transform: 'translateZ(-40px)' }} />
        </div>

        {/* --- NODE 2: API Gateway --- */}
        <div 
          className="absolute left-[330px] top-[190px] group"
          style={{ transform: 'translateZ(80px)' }}
        >
          <div className="w-32 h-32 rounded-2xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] relative">
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500/20 border border-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <Server className="w-10 h-10 text-gray-400 group-hover:text-blue-400 transition-colors mb-3" />
            <span className="text-white font-bold text-sm">API Gateway</span>
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">REST / GQL</span>
          </div>
          <div className="absolute -bottom-10 blur-xl w-32 h-10 bg-blue-500/20 rounded-full" style={{ transform: 'translateZ(-80px)' }} />
        </div>

        {/* --- NODE 3: SageMaker / Central Core --- */}
        <div 
          className="absolute left-[580px] top-[170px] group"
          style={{ transform: 'translateZ(120px)' }}
        >
          {/* Pulsing ring behind the core */}
          <div className="absolute inset-0 bg-primary/20 rounded-3xl animate-ping opacity-30 delay-75" />
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-3xl blur-2xl group-hover:from-primary/50 group-hover:to-blue-500/50 transition-colors duration-500" />
          
          <div className="w-40 h-40 rounded-3xl bg-[#0a0a0c]/90 backdrop-blur-2xl border border-primary/40 flex flex-col items-center justify-center p-4 shadow-[0_30px_60px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] relative overflow-hidden">
            {/* Inner scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-1/2 animate-[scan_2s_linear_infinite]" />
            <BrainCircuit className="w-14 h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mb-3 relative z-10" />
            <span className="text-white font-bold text-lg relative z-10">SageMaker AI</span>
            <span className="text-primary text-[10px] font-mono tracking-widest mt-1 uppercase relative z-10">Query Engine</span>
          </div>
          <div className="absolute -bottom-12 blur-2xl w-40 h-12 bg-primary/30 rounded-full" style={{ transform: 'translateZ(-120px)' }} />
        </div>

        {/* --- NODE 4: Transational DB --- */}
        <div 
          className="absolute left-[880px] top-[80px] group"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="w-32 h-32 rounded-2xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <Database className="w-10 h-10 text-gray-400 group-hover:text-emerald-400 transition-colors mb-3" />
            <span className="text-white font-bold text-sm">RDS Database</span>
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">Postgres</span>
          </div>
          <div className="absolute -bottom-8 blur-xl w-32 h-8 bg-emerald-500/20 rounded-full" style={{ transform: 'translateZ(-60px)' }} />
        </div>

        {/* --- NODE 5: Data Warehouse --- */}
        <div 
          className="absolute left-[880px] top-[290px] group"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="w-32 h-32 rounded-2xl bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center p-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            <Box className="w-10 h-10 text-gray-400 group-hover:text-indigo-400 transition-colors mb-3" />
            <span className="text-white font-bold text-sm">Data Lake / S3</span>
            <span className="text-gray-500 text-[10px] uppercase tracking-wider mt-1">Analytics</span>
          </div>
          <div className="absolute -bottom-8 blur-xl w-32 h-8 bg-indigo-500/20 rounded-full" style={{ transform: 'translateZ(-60px)' }} />
        </div>

      </motion.div>

      {/* Global CSS for SVG animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}} />
    </div>
  );
};

export default AnimatedArchitecture;
