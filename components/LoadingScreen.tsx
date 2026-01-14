"use client";

import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen({ onStarted }: { onStarted: () => void }) {
  const { progress: realProgress } = useProgress(); // مقدار واقعی لودینگ 3D
  const [progress, setProgress] = useState(0); // مقداری که ما نمایش میدهیم (برای نرم بودن)
  const [showButton, setShowButton] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING...");

  // منطق نرم کردن لودینگ و تغییر متن‌ها
  useEffect(() => {
    // متن‌های مختلف بر اساس درصد لودینگ
    if (progress < 30) setStatusText("LOADING ASSETS...");
    else if (progress < 60) setStatusText("ESTABLISHING NEURAL LINK...");
    else if (progress < 90) setStatusText("CALIBRATING ENVIRONMENT...");
    else setStatusText("SYSTEM READY.");

    // اگر لودینگ واقعی جلوتر بود، نمایشی را زیاد کن
    if (progress < realProgress || progress < 100) {
      const timer = setTimeout(() => {
        // سرعت پر شدن: اگر نزدیکیم کندتر، اگر دوریم سریع‌تر
        const diff = Math.max(realProgress, 100) - progress;
        const step = diff > 0 ? Math.ceil(diff / 10) : 1; 
        
        // حداکثر تا 100 برود
        setProgress((prev) => Math.min(prev + step, 100));
      }, 50); // سرعت آپدیت

      return () => clearTimeout(timer);
    } 
    
    // وقتی به 100 رسید
    if (progress >= 100) {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [progress, realProgress]);

  const handleStart = () => {
    setIsFading(true);
    setTimeout(() => {
      onStarted();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black font-mono"
        >
          {/* پس‌زمینه شبکه ماتریس خیلی کمرنگ */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative z-10 w-full max-w-md px-6 text-center flex flex-col items-center gap-10">
            
            {/* لوگو با انیمیشن ورود */}
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
            
            <div className="h-20 flex items-center justify-center w-full">
              {!showButton ? (
                <div className="w-full space-y-3">
                   {/* نوار پیشرفت */}
                   <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_#22d3ee]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                      />
                   </div>
                   
                   {/* متن وضعیت و درصد */}
                   <div className="flex justify-between text-[10px] text-cyan-500/80 tracking-widest uppercase">
                      <span>{statusText}</span>
                      <span>{Math.round(progress)}%</span>
                   </div>
                </div>
              ) : (
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05, textShadow: "0 0 8px rgb(34,211,238)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className="group relative px-12 py-3 bg-transparent overflow-hidden rounded-full border border-cyan-500/50 text-cyan-100 uppercase tracking-[0.3em] text-xs font-bold shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-300"
                >
                  <span className="relative z-10">Enter System</span>
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