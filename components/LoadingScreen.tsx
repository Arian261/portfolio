"use client";

import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen({ onStarted }: { onStarted: () => void }) {

  const { active, progress: realProgress } = useProgress();
  
  const [progress, setProgress] = useState(0); 
  const [showButton, setShowButton] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");

  useEffect(() => {

    if (progress < realProgress) {
      const timer = setTimeout(() => {
        const diff = realProgress - progress;
        const step = Math.ceil(diff / 5); 
        setProgress(prev => Math.min(prev + step, 100));
      }, 20);
      return () => clearTimeout(timer);
    }

    if (progress < 30) setStatusText("LOADING TEXTURES & ASSETS...");
    else if (progress < 70) setStatusText("COMPILING SHADERS...");
    else if (progress < 99) setStatusText("FINALIZING VISUALS...");
    else setStatusText("SYSTEM READY.");

    if (progress >= 100 && !active) {

       setTimeout(() => setShowButton(true), 500);
    }
  }, [progress, realProgress, active]);

  const handleStart = () => {
    setIsFading(true);
    setTimeout(() => {
      onStarted();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono"
        >

          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-md px-6 text-center flex flex-col items-center gap-10">

            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-32 h-32 md:w-48 md:h-48"
            >
              <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full animate-pulse" />
              <Image 
                src="/logo-photo.png" 
                alt="Arian Monadi Logo" 
                fill 
                className="object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                priority
              />
            </motion.div>
            
            <div className="h-24 flex items-center justify-center w-full">
              {!showButton ? (
                <div className="w-full space-y-4">

                   <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_#22d3ee]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                      />
                   </div>

                   <div className="flex justify-between text-[10px] text-cyan-500/70 tracking-widest uppercase">
                      <span className="animate-pulse">{statusText}</span>
                      <span>{Math.round(progress)}%</span>
                   </div>

                   <div className="flex gap-1 justify-center opacity-30">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${i < (progress/20) ? 'bg-cyan-400' : 'bg-gray-700'}`} />
                      ))}
                   </div>
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(34,211,238)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="group relative px-12 py-3 bg-transparent overflow-hidden rounded-full border border-cyan-500/50 text-cyan-100 uppercase tracking-[0.3em] text-xs font-bold shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300 cursor-pointer z-50"
                >
                  <span className="relative z-10">BEGIN JOURNEY</span>
                  <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}