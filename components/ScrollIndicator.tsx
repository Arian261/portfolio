"use client";

import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollIndicator = () => {
  // دریافت وضعیت اسکرول صفحه
  const { scrollYProgress } = useScroll();

  // تبدیل درصد اسکرول به شفافیت
  // از 0 تا 0.66 (66%) -> شفافیت از 1 به 0 میرسه
  const opacity = useTransform(scrollYProgress, [0, 0.66], [1, 0]);

  return (
    <motion.div 
      style={{ opacity }} // اعمال شفافیت داینامیک
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-40 pointer-events-none"
    >
      
      {/* کپسول نمادین موس/گوشی با استایل نئونی فیروزه‌ای */}
      <div className="w-[26px] h-[44px] border-2 border-cyan-500/50 rounded-full flex justify-center items-center backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.3)] bg-black/20">
        {/* نشانگر متحرک با گرادینت جذاب */}
        <div className="w-1.5 h-2.5 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-swipe-up" />
      </div>

      {/* متن راهنما با رنگ هماهنگ */}
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200/80 font-mono text-center drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
        Scroll To Explore
      </span>

      {/* استایل انیمیشن شما (بدون تغییر در منطق حرکت، فقط استفاده مجدد) */}
      <style jsx>{`
        @keyframes swipe-up {
          0% {
            transform: translateY(10px); /* شروع از پایین */
            opacity: 0;
            height: 6px; /* در ابتدا کمی فشرده */
          }
          30% {
            opacity: 1;
            height: 10px; /* کشیده شدن در میانه حرکت */
          }
          100% {
            transform: translateY(-10px); /* پایان در بالا */
            opacity: 0;
            height: 6px;
          }
        }
        .animate-swipe-up {
          animation: swipe-up 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default ScrollIndicator;