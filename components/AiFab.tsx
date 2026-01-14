"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface AiFabProps {
  onClick: () => void;
}

export default function AiFab({ onClick }: AiFabProps) {
  return (
    <div className="fixed bottom-24 right-8 z-[99]">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        // کلاس‌های کلیدی برای انیمیشن کشویی: overflow-hidden و transition روی سایز
        className="group relative flex items-center bg-[#0a0a0a]/80 backdrop-blur-md border border-purple-500/50 rounded-full p-3.5 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-500 ease-out overflow-hidden"
      >
        {/* گرادینت پس‌زمینه */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* بخش آیکون (همیشه ثابت) */}
        <div className="relative z-10 flex items-center justify-center w-7 h-7">
            <Bot size={26} className="text-white group-hover:scale-110 transition-transform duration-300" />
            {/* نشانگر آنلاین */}
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
        </div>

        {/* بخش متن (کشویی) */}
        {/* مشابه دکمه Back to Top: تغییر max-width از 0 به مقدار مورد نظر */}
        <div className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-in-out relative z-10">
            <div className="flex items-center gap-2 pl-3 whitespace-nowrap">
                <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                  Chat with AI
                </span>
                <Sparkles size={10} className="text-yellow-400 animate-pulse" />
            </div>
        </div>

      </motion.button>
    </div>
  );
}