"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLanguage, LANGUAGES } from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { currentLang, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-[1002]">
      {/* دکمه اصلی */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
      >
        <Globe size={20} />
      </button>

      {/* منوی بازشونده */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* بستن با کلیک بیرون */}
            <div className="fixed inset-0 z-[1001]" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="absolute right-0 top-16 w-48 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[1002]"
            >
              <div className="p-2 space-y-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                      // چک کردن تقریبی زبان فعلی (چون گوگل گاهی کوکی رو تغییر میده)
                      document.cookie.includes(`/en/${lang.code}`) || (lang.code === 'en' && !document.cookie.includes('googtrans'))
                        ? "bg-cyan-500/20 text-cyan-300" 
                        : "hover:bg-white/5 text-gray-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-mono text-sm tracking-wider uppercase">{lang.label}</span>
                    </div>
                    {/* اگر انتخاب شده بود تیک بزنه (اختیاری) */}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* المان مخفی گوگل که هوک ازش استفاده میکنه */}
      <div id="google_translate_element" className="absolute" />
    </div>
  );
}