"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Layers, ExternalLink, ShieldAlert, 
  Database, Lock, Globe, Server 
} from "lucide-react";

interface HubProps {
  isActive: boolean;
  onBack: () => void;
}

const PROJECTS = [
  {
    id: 1,
    title: "Mavi Pandora Lighting",
    category: "E-Commerce & Brand Identity",
    desc: "A high-end e-commerce platform for luxury lighting solutions. Features include 3D product previews, seamless payment gateways, and a bespoke UI designed to reflect the brand's elegance.",
    tags: ["Next.js", "3D WebGL", "UX Design", "E-Commerce"],
    link: "https://mavipandoralighting.com/",
    isExternal: true,
    icon: Globe,
    status: "LIVE SYSTEM",
    statusColor: "text-green-400"
  },
  {
    id: 2,
    title: "Military Academy HR System",
    category: "Enterprise Resource Planning",
    desc: "A comprehensive Human Resource Management System designed for a military academy. Features distinct access levels, secure personnel databases, and automated performance tracking.",
    tags: ["System Architecture", "Security", "Database Design", "React"],
    link: "#",
    isExternal: false, // لینک ندارد (محرمانه)
    icon: ShieldAlert,
    status: "RESTRICTED ACCESS", // کلاس کاری بالا
    statusColor: "text-red-400"
  }
];

// --- المان بصری: مکعب داده (Data Vault) ---
const DataVaultVisualizer = () => {
  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-md">
      {/* شبکه‌بندی پس‌زمینه */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      {/* مکعب چرخان */}
      <div className="relative w-32 h-32 preserve-3d animate-[spin_10s_linear_infinite]">
         {/* لایه‌های مکعب */}
         <div className="absolute inset-0 border-2 border-slate-400/30 bg-slate-500/10 translate-z-16" style={{ transform: 'translateZ(64px)' }} />
         <div className="absolute inset-0 border-2 border-slate-400/30 bg-slate-500/10 -translate-z-16" style={{ transform: 'translateZ(-64px)' }} />
         <div className="absolute inset-0 border-2 border-slate-400/30 bg-slate-500/10 rotate-y-90 translate-z-16" style={{ transform: 'rotateY(90deg) translateZ(64px)' }} />
         <div className="absolute inset-0 border-2 border-slate-400/30 bg-slate-500/10 rotate-y-90 -translate-z-16" style={{ transform: 'rotateY(90deg) translateZ(-64px)' }} />
         <div className="absolute inset-0 border-2 border-slate-400/30 bg-slate-500/10 rotate-x-90 translate-z-16" style={{ transform: 'rotateX(90deg) translateZ(64px)' }} />
         <div className="absolute inset-0 border-2 border-slate-400/30 bg-slate-500/10 rotate-x-90 -translate-z-16" style={{ transform: 'rotateX(90deg) translateZ(-64px)' }} />
         
         {/* هسته مرکزی */}
         <div className="absolute inset-8 bg-cyan-500/20 blur-md rounded-full animate-pulse shadow-[0_0_30px_rgba(34,211,238,0.5)]" />
         <Database className="absolute inset-0 m-auto text-slate-200" size={32} />
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
         <span className="text-[10px] font-mono text-slate-400">SECURE ARCHIVE ONLINE</span>
      </div>
    </div>
  );
};

export default function ProjectVaultHub({ isActive, onBack }: HubProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md text-white selection:bg-slate-500/30"
        >
           {/* Back Button */}
           <div className="fixed top-6 left-6 z-[60]">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group bg-black/40 px-5 py-2 rounded-full border border-slate-700/50 backdrop-blur-xl"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs tracking-widest uppercase">Orbit View</span>
            </button>
          </div>

          <div className="relative w-full max-w-6xl mx-auto px-4 pt-32 pb-20">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-12 mb-20">
                <div className="w-full md:w-1/2 space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-600/30 text-slate-300 text-xs font-mono"
                    >
                        <Server size={12} />
                        <span>PROJECT ARCHIVE</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-bold leading-tight"
                    >
                        THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-gray-400 to-slate-500">VAULT</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                        className="text-slate-400 text-lg leading-relaxed border-l-2 border-slate-700 pl-6"
                    >
                        A curated collection of deployed systems, commercial websites, and high-security infrastructure designed and developed by Arian Monadi.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                    className="w-full md:w-1/2"
                >
                    <DataVaultVisualizer />
                </motion.div>
            </div>

            {/* Project List */}
            <div className="grid grid-cols-1 gap-6">
                {PROJECTS.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (idx * 0.2) }}
                        className="group relative p-8 rounded-2xl bg-black/40 border border-slate-800 hover:bg-slate-900/40 hover:border-slate-600 transition-all duration-300 flex flex-col md:flex-row gap-8 items-start md:items-center"
                    >
                        {/* آیکون پروژه */}
                        <div className="w-16 h-16 rounded-xl bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:scale-110 transition-transform">
                            <project.icon size={32} className="text-slate-300" />
                        </div>

                        {/* اطلاعات پروژه */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-200 transition-colors">{project.title}</h3>
                                <span className={`text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded ${project.statusColor} bg-black/50`}>
                                    {project.status}
                                </span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{project.desc}</p>
                            
                            <div className="flex flex-wrap gap-2 pt-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 text-[10px] bg-slate-800/50 text-slate-400 rounded-md border border-slate-700/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* دکمه اکشن */}
                        <div className="pt-4 md:pt-0">
                            {project.isExternal ? (
                                <a 
                                    href={project.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-cyan-400 hover:scale-105 transition-all"
                                >
                                    <span>Visit Site</span>
                                    <ExternalLink size={16} />
                                </a>
                            ) : (
                                <button disabled className="flex items-center gap-2 px-6 py-3 bg-slate-800/50 text-slate-500 font-bold rounded-lg cursor-not-allowed border border-slate-700">
                                    <span>Confidential</span>
                                    <Lock size={16} />
                                </button>
                            )}
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