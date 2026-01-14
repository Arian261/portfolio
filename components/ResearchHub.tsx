"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, ArrowLeft, FlaskConical } from "lucide-react";

interface ResearchHubProps {
  isActive: boolean;
  onBack: () => void;
}

const DOCUMENTS = [
  {
    title: "Thiolated Chitosans: A Multi-talented Class of Polymers",
    desc: "In-depth analysis of polymer applications in modern drug delivery systems.",
    file: "/docs/thiolated-chitosans.pdf", // مطمئن شو فایل رو اینجا گذاشتی
    date: "2024 Research"
  },
  {
    title: "Chitin and Chitosan: Properties and Applications",
    desc: "Exploring the fundamental properties and vast potential of Chitin derivatives.",
    file: "/docs/chitin-chitosan.pdf",
    date: "Review Paper"
  }
];

export default function ResearchHub({ isActive, onBack }: ResearchHubProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* دکمه بازگشت */}
          <button 
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors z-50 group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm tracking-widest uppercase">Return to Orbit</span>
          </button>

          <div className="w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* سمت چپ: تیتر و توضیحات */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
               <div className="flex items-center gap-3 text-cyan-400">
                  <FlaskConical size={32} />
                  <span className="font-mono text-xs tracking-[0.4em] uppercase">Scientific Archive</span>
               </div>
               
               <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                 Explore <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-green-400">With Me</span>
               </h2>
               
               <p className="text-gray-300 text-lg leading-relaxed max-w-md border-l border-white/20 pl-6">
                 Here lies the cutting edge of my pharmaceutical research. Access full documentation and detailed analysis below.
               </p>
            </motion.div>

            {/* سمت راست: کارت‌های دانلود */}
            <div className="space-y-6">
              {DOCUMENTS.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + (i * 0.2) }}
                  className="group relative p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:border-cyan-500/30"
                >
                   {/* درخشش پشت کارت */}
                   <div className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   
                   <div className="relative flex items-start gap-4">
                      <div className="p-4 bg-black/30 rounded-xl text-cyan-400">
                        <FileText size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                             {doc.title}
                           </h3>
                           <span className="text-[10px] font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                             {doc.date}
                           </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">{doc.desc}</p>
                        
                        <a 
                          href={doc.file} 
                          download 
                          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white uppercase border-b border-cyan-500/50 pb-1 hover:text-cyan-400 transition-colors"
                        >
                          Download PDF <Download size={14} />
                        </a>
                      </div>
                   </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}