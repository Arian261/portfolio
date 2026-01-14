"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Aperture, Wand2, Layers, Palette, Eye, ScanFace, Sparkles
} from "lucide-react";

interface HubProps {
  isActive: boolean;
  onBack: () => void;
}

// --- کامپوننت بصری: لنز دیجیتال کیهانی (بدون نیاز به عکس) ---
const DigitalLensVisualizer = () => {
  return (
    <div className="relative w-full h-64 md:h-96 flex items-center justify-center overflow-hidden rounded-3xl bg-black/50 border border-white/10 backdrop-blur-md perspective-1000">
      {/* پس‌زمینه نویزی و متحرک (نماینده دیتای خام) */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#000_2px,#111_4px,#000_6px)] animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20 mix-blend-overlay animate-[shift_10s_linear_infinite]" />
      </div>

      {/* المان مرکزی: دیافراگم/لنز درخشان */}
      <div className="relative z-10 flex items-center justify-center">
        {/* حلقه‌های چرخان بیرونی */}
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed border-cyan-500/30"
        />
         <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-dotted border-purple-500/40"
        />
        
        {/* هسته مرکزی لنز */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 bg-black/60 rounded-full border border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center overflow-hidden backdrop-blur-xl group">
          <Aperture size={64} className="text-cyan-300 relative z-20 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
          
          {/* پرتوی نورانی داخل لنز */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/40 to-purple-600/40 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* افکت اسکن عبوری */}
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-30"
          />
        </div>
      </div>

      {/* ذرات نورانی خروجی (نماینده تصویر نهایی) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent z-0 pointer-events-none" />
      <Sparkles className="absolute top-1/4 right-1/4 text-cyan-400 animate-pulse" size={20} />
      <Sparkles className="absolute bottom-1/3 right-10 text-purple-400 animate-bounce delay-700" size={16} />
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group p-6 rounded-2xl bg-black/40 border border-white/10 hover:bg-cyan-900/20 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-300 leading-relaxed text-justify">{desc}</p>
  </motion.div>
);

export default function ImageEditingHub({ isActive, onBack }: HubProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleConsult = () => {
    window.open(`https://wa.me/989126879769?text=${encodeURIComponent("Hi, I'm interested in professional image editing services.")}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-[4px] text-white selection:bg-cyan-500/30"
          ref={scrollRef}
        >
          {/* Animated Grid Background */}
          <div className="fixed inset-0 pointer-events-none opacity-20">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px]" />
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black to-black" />
          </div>

          {/* Back Button */}
          <div className="fixed top-6 left-6 z-[60]">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group bg-black/40 px-5 py-2 rounded-full border border-white/10 backdrop-blur-xl hover:border-cyan-500/50"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs tracking-widest uppercase">Orbit View</span>
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-20">
            
            {/* HERO SECTION */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
              <div className="w-full md:w-1/2 text-center md:text-left z-10 order-2 md:order-1">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                   className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-sm"
                >
                   <Eye size={12} />
                   <span>PRECISION RETOUCHING & GRADING</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl"
                >
                  VISUAL <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse">PERFECTION</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-gray-300 text-lg leading-relaxed max-w-xl font-light drop-shadow-md"
                >
                  Transforming raw imagery into flawless, high-end visuals. I utilize advanced techniques in frequency separation, color science, and compositing to ensure your brand imagery is impeccable and consistent across all platforms.
                </motion.p>
              </div>

              {/* THE DIGITAL LENS VISUALIZER (No Image Needed) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="w-full md:w-1/2 z-10 order-1 md:order-2"
              >
                <DigitalLensVisualizer />
              </motion.div>
            </div>

            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10">
               <FeatureCard 
                 icon={ScanFace} 
                 title="High-End Retouching"
                 desc="Meticulous skin texture cleaning, dodge & burn, and detail enhancement while maintaining clarity and realism. Perfect for portraits and products."
                 delay={0.6}
               />
               <FeatureCard 
                 icon={Palette} 
                 title="Advanced Color Grading"
                 desc="Establishing a unique, cinematic visual language for your brand. Focusing on color harmony, mood creation, and consistent tones."
                 delay={0.7}
               />
               <FeatureCard 
                 icon={Layers} 
                 title="Creative Compositing"
                 desc="Merging multiple elements to create seamless, impossible imagery. Expert masking, blending, and perspective matching for stunning key visuals."
                 delay={0.8}
               />
            </div>

            {/* CTA SECTION */}
            <div className="relative z-10 text-center">
               <div className="mb-12">
                 <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-white">Elevate Your Brand Imagery</h2>
                 <p className="text-cyan-300/80 font-mono text-sm tracking-widest uppercase">READY FOR A VISUAL UPGRADE?</p>
               </div>
               
               <div className="mt-8">
                  <button 
                    onClick={handleConsult}
                    className="group relative px-10 py-4 bg-white text-black font-bold text-lg tracking-[0.2em] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                       START PROJECT <Wand2 className="group-hover:rotate-12 transition-transform" size={18} />
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