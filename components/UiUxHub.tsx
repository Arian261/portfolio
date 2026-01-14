"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PenTool, Layout, MousePointerClick, Palette, Layers, Zap } from "lucide-react";

interface UiUxHubProps {
  isActive: boolean;
  onBack: () => void;
}

const DESIGN_PILLARS = [
  {
    title: "Neuro-Aesthetics",
    desc: "Designing not just for the eye, but for the brain. I use color psychology and spacing to trigger dopamine and trust.",
    icon: <Palette className="text-pink-400" />,
    color: "pink"
  },
  {
    title: "UX Architecture",
    desc: "Structuring complex data into intuitive flows. I reduce cognitive load so users convert without thinking.",
    icon: <Layout className="text-purple-400" />,
    color: "purple"
  },
  {
    title: "Interaction (IxD)",
    desc: "Micro-animations and haptic feedback that make the digital feel physical and alive under the user's fingertip.",
    icon: <MousePointerClick className="text-cyan-400" />,
    color: "cyan"
  },
  {
    title: "High-Fidelity Prototyping",
    desc: "Pixel-perfect simulations of the final product. See the future of your app before I write a single line of code.",
    icon: <Layers className="text-rose-400" />,
    color: "rose"
  }
];

export default function UiUxHub({ isActive, onBack }: UiUxHubProps) {
  
  const handleStartSprint = () => {
    const phoneNumber = "989126879769";
    const message = "Hello, I want to redesign my digital product with Elite UI/UX. Let's start a Design Sprint.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-start pointer-events-auto overflow-y-auto"
        >
          {/* --- بک‌گراند خاص استودیویی --- */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-[3px] -z-20" />
          
          <div 
            className="fixed inset-0 opacity-20 -z-10" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(255, 105, 180, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 105, 180, 0.1) 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} 
          />
          
          {/* دکمه بازگشت */}
          <div className="fixed top-0 left-0 w-full p-6 z-[60] bg-gradient-to-b from-black/80 to-transparent">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-pink-400 transition-colors group bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs md:text-sm tracking-widest uppercase">Back to Orbit</span>
            </button>
          </div>

          <div className="w-full max-w-6xl px-6 pt-32 pb-20 relative">
            
            {/* تیتر اصلی */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16 space-y-4"
            >
               <div className="inline-flex items-center gap-2 text-pink-400 border border-pink-500/30 px-4 py-1 rounded-full bg-pink-500/5 mb-4">
                  <PenTool size={16} />
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Design Studio Active</span>
               </div>
               
               <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                 The Architecture of <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                    Pure Desire
                 </span>
               </h2>
               
               {/* متن اصلاح شده به اول شخص */}
               <p className="text-gray-300 max-w-xl mx-auto text-lg font-light">
                 I don&apos;t just design screens. I engineer feelings, guide decisions, and create digital addictions through beauty.
               </p>
            </motion.div>

            {/* کارت‌های شیشه‌ای */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {DESIGN_PILLARS.map((item, i) => (
                 <motion.div
                   key={i}
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.4 + (i * 0.15) }}
                   className={`group relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl overflow-hidden hover:border-${item.color}-500/50 transition-all duration-500`}
                 >
                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-${item.color}-500/20 blur-[80px] group-hover:bg-${item.color}-500/30 transition-all duration-500 rounded-full pointer-events-none`} />
                    
                    <div className="relative z-10">
                       <div className="flex justify-between items-start mb-6">
                          <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                             {item.icon}
                          </div>
                          <span className="font-mono text-xs text-gray-500 group-hover:text-white transition-colors">0{i + 1}</span>
                       </div>

                       <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                         {item.title}
                       </h3>
                       <p className="text-gray-400 leading-relaxed font-light group-hover:text-gray-300">
                         {item.desc}
                       </p>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* دکمه اکشن */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="mt-16 flex justify-center"
            >
               <button 
                 onClick={handleStartSprint}
                 className="group relative px-12 py-5 bg-white text-black rounded-full font-bold tracking-widest text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   START DESIGN SPRINT <Zap size={18} className="text-purple-600 fill-purple-600" />
                 </span>
                 <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </button>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}