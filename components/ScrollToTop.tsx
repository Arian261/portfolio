"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // نمایش دکمه فقط وقتی که کاربر اسکرول کرده باشد
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] group flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full p-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-500 overflow-hidden"
        >
          <motion.div className="flex items-center gap-0 group-hover:gap-2 transition-all duration-500">
            {/* آیکون فلش */}
            <ArrowUp size={20} className="text-white group-hover:text-cyan-400 transition-colors duration-300" />
            
            {/* متن که در حالت عادی مخفی است و در هوور باز می‌شود */}
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[100px] transition-all duration-500 ease-in-out text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-400">
              Back to Top
            </span>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}