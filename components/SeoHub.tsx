"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, TrendingUp, Search, Target, ShieldCheck, BarChart3, Lock, Zap } from "lucide-react";

interface SeoHubProps {
  isActive: boolean;
  onBack: () => void;
}

// کامپوننت داخلی برای هر بخش اسکرول (برای تمیزی کد)
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-20%" }} // تریگر شدن وقتی 20% توی صفحه اومد
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-[60vh] flex flex-col justify-center items-center text-center p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function SeoHub({ isActive, onBack }: SeoHubProps) {
  
  const handleConsult = () => {
    const phoneNumber = "989126879769";
    const message = "Hello, I am ready to invest in my Business Intelligence & SEO. Let's discuss strategy.";
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
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/40 backdrop-blur-[3px] pointer-events-auto"
        >
          {/* دکمه بازگشت شناور */}
          <div className="fixed top-6 left-6 z-[60]">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-green-400 transition-colors group bg-black/60 px-5 py-3 rounded-full border border-white/10 backdrop-blur-md hover:border-green-500/50 shadow-2xl"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs tracking-[0.2em] uppercase">Orbit View</span>
            </button>
          </div>

          {/* کانتینر اصلی اسکرول */}
          <div className="w-full max-w-5xl mx-auto relative pb-32">

            {/* --- SECTION 1: HERO TITLE --- */}
            {/* ورود پرقدرت با افکت زوم */}
            <Section className="min-h-screen">
               <div className="mb-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 backdrop-blur-md">
                  <TrendingUp size={20} />
                  <span className="font-mono text-xs tracking-[0.3em] uppercase">System Analysis • Core</span>
               </div>
               
               <h2 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                 DOMINATE THE <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-500 animate-pulse">
                   DIGITAL ORBIT
                 </span>
               </h2>
               
               <p className="text-gray-400 text-sm md:text-base font-mono tracking-[0.5em] uppercase mt-4">
                 Scroll to Initialize Data Stream
               </p>
               <motion.div 
                 animate={{ y: [0, 10, 0] }} 
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="mt-10"
               >
                 <div className="w-[1px] h-20 bg-gradient-to-b from-green-500 to-transparent mx-auto" />
               </motion.div>
            </Section>


            {/* --- SECTION 2: THE PROBLEM (GLASS PANEL) --- */}
            {/* شبیه به یک پنل شیشه‌ای که جلوی صورت خلبان باز می‌شود */}
            <Section>
              <div className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-3xl transform hover:scale-[1.02] transition-transform duration-700">
                {/* خط نوری متحرک دور کادر */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-70" />
                
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 text-left">
                  The <span className="text-red-500">Invisible</span> Empire
                </h3>
                
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-justify font-light">
                  In today's digital era, visibility is currency. Global enterprises spend millions monthly solely to appear first because they know a simple truth: 
                  <span className="block mt-4 text-center text-green-300 font-bold bg-green-900/20 py-2 rounded-lg border border-green-500/30">
                     "If you are not seen, you do not exist."
                  </span>
                </p>
              </div>
            </Section>


            {/* --- SECTION 3: THE SOLUTION (FLOATING CARDS) --- */}
            {/* کارت‌ها به صورت معلق و با زاویه (3D Tilt) نمایش داده می‌شوند */}
            <Section>
               <div className="text-center mb-16">
                 <h3 className="text-3xl md:text-5xl font-bold text-white">Strategy Modules</h3>
                 <div className="h-1 w-20 bg-green-500 mx-auto mt-4 rounded-full" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
                  {[
                    { icon: Lock, title: "Pattern Decoding", desc: "Analyzing search behaviors to predict market shifts." },
                    { icon: BarChart3, title: "AI Analytics", desc: "Data-driven decisions using advanced algorithms." },
                    { icon: ShieldCheck, title: "Identity Security", desc: "Building a cryptographic digital reputation." },
                    { icon: Target, title: "Precision Traffic", desc: "Converting passive viewers into active clients." }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-green-900/10 hover:border-green-500/50 backdrop-blur-md transition-all duration-300 flex items-center gap-4 text-left"
                    >
                      <div className="p-3 rounded-lg bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform">
                        <item.icon size={28} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </Section>


            {/* --- SECTION 4: THE PHILOSOPHY (BIG TEXT) --- */}
            <Section>
               <div className="max-w-4xl relative">
                  <Zap className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-400/80 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-pulse" size={40} />
                  <p className="text-xl md:text-3xl text-gray-200 font-light leading-relaxed text-center">
                    "Your customers are frantically searching for your solutions <em className="text-white not-italic font-bold">right now</em>. 
                    Without <strong className="text-green-400">Advanced SEO</strong>, you remain a ghost while competitors capture the market. 
                    This isn't just about keywords; it's about <span className="text-red-400 font-bold border-b-2 border-red-500">Survival</span>."
                  </p>
               </div>
            </Section>


            {/* --- SECTION 5: FINAL CTA (LAUNCH PAD) --- */}
            <Section className="min-h-[50vh]">
               <div className="relative p-1 rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-cyan-500 animate-spin-slow">
                 {/* حاشیه رنگی چرخان */}
               </div>
               
               <div className="relative z-10 flex flex-col items-center">
                 <p className="text-gray-400 font-mono text-sm mb-6 tracking-widest uppercase">
                   System Ready for Deployment
                 </p>
                 
                 <button 
                   onClick={handleConsult}
                   className="group relative px-12 py-5 bg-green-500 text-black font-bold text-lg tracking-[0.2em] rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_50px_rgba(34,197,94,0.6)] overflow-hidden"
                 >
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                   <span className="relative z-10 flex items-center gap-3">
                     SECURE YOUR POSITION <Search size={20} />
                   </span>
                 </button>
                 
                 <p className="mt-8 text-white/40 text-xs max-w-md">
                   Using proprietary AI Algorithms, I make you the landmark. This is a secure, long-term investment.
                 </p>
               </div>
            </Section>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}