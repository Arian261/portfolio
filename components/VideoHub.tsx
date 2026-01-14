"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Clapperboard, Film, Music, MonitorPlay, Move3d, Sparkles 
} from "lucide-react";

interface HubProps {
  isActive: boolean;
  onBack: () => void;
}

// --- کامپوننت بصری: موتور سینمایی (Film Reactor) ---
const CinematicVisualizer = () => {
  return (
    <div className="relative w-full h-64 md:h-96 flex items-center justify-center overflow-hidden rounded-3xl bg-black/60 border border-white/10 backdrop-blur-md perspective-1000">
      
      {/* نور پس‌زمینه سینمایی (Golden Hour Glow) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 via-black to-amber-900/20" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full animate-pulse" />

      {/* نوار فیلم‌های چرخان */}
      <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 preserve-3d animate-[spin_20s_linear_infinite]">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-amber-500/30 rounded-full border-dashed"
            style={{ 
              rotateX: i * 45, 
              rotateY: i * 45 
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
        
        {/* هسته مرکزی: دکمه پخش هولوگرافیک */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="w-24 h-24 border border-amber-400/50 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] bg-black/40 backdrop-blur-sm"
            >
               <Clapperboard size={40} className="text-amber-400" />
            </motion.div>
        </div>
      </div>

      {/* فریم‌های شناور (Floating Frames) */}
      {[...Array(6)].map((_, i) => (
         <motion.div
           key={i}
           initial={{ x: -200, opacity: 0, scale: 0.5 }}
           animate={{ 
             x: ['120%', '-120%'], 
             opacity: [0, 1, 0],
             scale: [0.8, 1, 0.8]
           }}
           transition={{ 
             duration: 5 + i, 
             repeat: Infinity, 
             ease: "linear",
             delay: i * 1.5
           }}
           className="absolute w-32 h-20 bg-amber-500/10 border border-amber-500/30 rounded-md backdrop-blur-sm top-[20%] even:top-[70%]"
           style={{ top: `${15 + (i * 12)}%` }}
         >
           <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <Film size={16} className="text-amber-300" />
           </div>
         </motion.div>
      ))}

    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group p-6 rounded-2xl bg-black/40 border border-white/10 hover:bg-amber-900/10 hover:border-amber-500/50 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-300 leading-relaxed text-justify">{desc}</p>
  </motion.div>
);

export default function VideoHub({ isActive, onBack }: HubProps) {
  const handleConsult = () => {
    window.open(`https://wa.me/989126879769?text=${encodeURIComponent("Hi, I'm interested in Video Production & Motion Graphics.")}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md text-white selection:bg-amber-500/30"
        >
          {/* Animated Noise Texture */}
          <div className="fixed inset-0 pointer-events-none opacity-10">
             <div className="absolute inset-0 bg-[url('/textures/noise.png')] opacity-20" /> {/* اگر تکسچر ندارید مهم نیست، کد پایین کار میکنه */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b1a_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b1a_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          {/* Back Button */}
          <div className="fixed top-6 left-6 z-[60]">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-amber-400 transition-colors group bg-black/40 px-5 py-2 rounded-full border border-white/10 backdrop-blur-xl hover:border-amber-500/50"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs tracking-widest uppercase">Orbit View</span>
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-20">
            
            {/* HERO SECTION */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
              <div className="w-full md:w-1/2 text-center md:text-left z-10">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                   className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-500/30 text-amber-300 text-xs font-mono mb-6 backdrop-blur-sm"
                >
                   <Sparkles size={12} />
                   <span>CINEMATIC PRODUCTION</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl"
                >
                  MOTION <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 animate-pulse">NARRATIVES</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-gray-300 text-lg leading-relaxed max-w-xl font-light drop-shadow-md"
                >
                  In the attention economy, movement is king. I craft high-retention visual stories using cinema-grade editing, advanced motion graphics, and sound design that resonates with your audience's subconscious.
                </motion.p>
              </div>

              {/* VISUALIZER */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="w-full md:w-1/2 z-10"
              >
                <CinematicVisualizer />
              </motion.div>
            </div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10">
               <FeatureCard 
                 icon={MonitorPlay} 
                 title="Precision Editing"
                 desc="Rhythm-based cutting that keeps viewers hooked. I edit for emotional impact, ensuring every frame serves the story and your brand message."
                 delay={0.6}
               />
               <FeatureCard 
                 icon={Move3d} 
                 title="Motion Graphics"
                 desc="Dynamic text animations, logo reveals, and UI mockups. I bring static assets to life with smooth, physics-based motion."
                 delay={0.7}
               />
               <FeatureCard 
                 icon={Music} 
                 title="Sound Design"
                 desc="50% of video is audio. I layer sound effects, ambient textures, and music to create an immersive atmosphere that drives engagement."
                 delay={0.8}
               />
            </div>

            {/* CTA SECTION */}
            <div className="relative z-10 text-center">
               <div className="mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">Ready to Move Your Audience?</h2>
                 <p className="text-amber-300/80 font-mono text-sm tracking-widest uppercase">LET'S CREATE CINEMA</p>
               </div>
               
               <div className="mt-8">
                  <button 
                    onClick={handleConsult}
                    className="group relative px-10 py-4 bg-white text-black font-bold text-lg tracking-[0.2em] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                       START PRODUCTION <Clapperboard className="group-hover:-rotate-12 transition-transform" size={18} />
                    </span>
                  </button>
               </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}