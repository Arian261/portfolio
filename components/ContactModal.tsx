"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Phone, Send, Globe, Mail, Linkedin, X, ExternalLink, 
  Github, Bot, Activity, HeartPulse, ArrowRight 
} from "lucide-react";
import Image from "next/image";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void; 
}

const breatheAnimation: Variants = {
  idle: {
    boxShadow: [
      "0 0 0px rgba(225, 29, 72, 0)",
      "0 0 20px rgba(225, 29, 72, 0.3)",
      "0 0 0px rgba(225, 29, 72, 0)"
    ],
    borderColor: [
      "rgba(255,255,255,0.1)",
      "rgba(225, 29, 72, 0.5)",
      "rgba(255,255,255,0.1)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { opacity: 0, scale: 0.9, y: 20 }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactModal({ isOpen, onClose, onOpenChat }: ContactModalProps) {
  const [isAiHovered, setIsAiHovered] = useState(false);

  const contacts = [
    { 
      id: "whatsapp",
      name: "WhatsApp", 
      value: "Direct Line", 
      icon: <Phone size={20} />, 
      link: "https://wa.me/989126879769",
      accent: "group-hover:text-emerald-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]",
      border: "group-hover:border-emerald-500/50"
    },
    { 
      id: "telegram",
      name: "Telegram", 
      value: "@arian_mnd", 
      icon: <Send size={20} />, 
      link: "https://t.me/arian_mnd",
      accent: "group-hover:text-blue-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.4)]",
      border: "group-hover:border-blue-500/50"
    },
    { 
      id: "linkedin", 
      name: "LinkedIn", 
      value: "Professional Profile", 
      icon: <Linkedin size={20} />, 
      link: "https://www.linkedin.com/in/arian-monadi", 
      accent: "group-hover:text-sky-500",
      glow: "group-hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]",
      border: "group-hover:border-sky-500/50"
    },
    { 
      id: "github",
      name: "GitHub", 
      value: "Code Repository", 
      icon: <Github size={20} />, 
      link: "https://github.com/arian261",
      accent: "group-hover:text-purple-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      border: "group-hover:border-purple-500/50"
    },
    { 
      id: "email",
      name: "Email", 
      value: "arian.monadi261...", 
      icon: <Mail size={20} />, 
      link: "mailto:arian.monadi261@gmail.com",
      accent: "group-hover:text-rose-500",
      glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]",
      border: "group-hover:border-rose-500/50"
    },
    { 
      id: "website",
      name: "Website", 
      value: "Live Portfolio", 
      icon: <Globe size={20} />, 
      link: "https://arianmonadi.me",
      accent: "group-hover:text-cyan-400",
      glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]",
      border: "group-hover:border-cyan-500/50"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.05)_0%,transparent_70%)] animate-pulse" />
          </motion.div>

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl z-10"
          >
            {/* Inner Container for Breathing Animation */}
            <motion.div
               variants={breatheAnimation}
               animate="idle"
               className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#050505] shadow-2xl"
            >
                <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none mix-blend-overlay" />
                
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-600 to-transparent opacity-70 shadow-[0_0_10px_#e11d48]" />

                {/* Header */}
                <div className="relative p-8 pb-2 flex justify-between items-start z-10">
                   <div className="flex items-center gap-5">
                      <div className="relative group">
                        <div className="absolute -inset-1 rounded-full border border-dashed border-rose-500/30 animate-[spin_10s_linear_infinite]" />
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-black grayscale group-hover:grayscale-0 transition-all duration-500">
                           <Image src="/logo-photo.png" alt="Arian" fill className="object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 bg-black rounded-full border border-gray-800">
                            <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping" />
                            <div className="absolute w-2 h-2 bg-rose-500 rounded-full" />
                        </div>
                      </div>
                      <div>
                         <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                            Arian Monadi
                         </h3>
                         <div className="flex items-center gap-2 mt-1">
                            <Activity size={12} className="text-rose-500 animate-pulse" />
                            <p className="text-rose-500/80 font-mono text-[10px] tracking-[0.2em] uppercase">
                                SYSTEM ALIVE
                            </p>
                         </div>
                      </div>
                   </div>
                   
                   <button 
                     onClick={onClose} 
                     className="group p-2 rounded-full hover:bg-rose-500/10 text-gray-500 hover:text-rose-500 transition-all duration-300"
                   >
                     <X size={24} className="group-hover:rotate-90 transition-transform" />
                   </button>
                </div>

                {/* Grid Content */}
                <div className="relative p-8 pt-6 grid grid-cols-2 gap-4 z-10">
                   {contacts.map((contact, idx) => (
                     <motion.a
                       key={contact.id}
                       variants={itemVariants}
                       initial="hidden"
                       animate="visible"
                       transition={{ delay: idx * 0.1 }}
                       href={contact.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       className={`group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-500 hover:bg-white/[0.04] ${contact.border} ${contact.glow} hover:-translate-y-1`}
                     >
                        <div className="relative z-10 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-white/5 text-gray-400 ${contact.accent} transition-colors group-hover:bg-transparent`}>
                                 {contact.icon}
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">
                                    {contact.name}
                                 </span>
                                 <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors truncate max-w-[120px] md:max-w-none">
                                    {contact.value}
                                 </span>
                              </div>
                           </div>
                           <ExternalLink 
                             size={16} 
                             className="text-gray-700 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" 
                           />
                        </div>
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-transparent via-current to-transparent ${contact.accent.replace('group-hover:', '')}`} />
                     </motion.a>
                   ))}
                </div>

                {/* Neural Twin (AI Chat) */}
                <div className="p-8 pt-2 z-10 relative">
                   <motion.div 
                     initial={false}
                     onHoverStart={() => setIsAiHovered(true)}
                     onHoverEnd={() => setIsAiHovered(false)}
                     className={`relative overflow-hidden rounded-xl border transition-all duration-500 cursor-pointer group ${
                       isAiHovered 
                         ? "bg-gradient-to-r from-rose-900/20 to-purple-900/20 border-rose-500/40 shadow-[0_0_30px_rgba(225,29,72,0.2)]" 
                         : "bg-white/[0.02] border-white/10"
                     }`}
                   >
                     <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
                     
                     <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className={`relative p-3 rounded-lg transition-all duration-300 ${isAiHovered ? 'bg-rose-600 text-white' : 'bg-white/5 text-rose-500'}`}>
                               <Bot size={24} />
                               {isAiHovered && <span className="absolute -inset-1 rounded-lg border border-rose-500 animate-ping opacity-50"/>}
                            </div>
                            <div>
                                <h4 className={`font-bold text-lg transition-colors flex items-center gap-2 ${isAiHovered ? 'text-white' : 'text-gray-300'}`}>
                                    Neural Twin
                                    {isAiHovered && <HeartPulse size={16} className="text-rose-500 animate-pulse" />}
                                </h4>
                                <p className="text-[10px] text-gray-500 font-mono tracking-wide">
                                    INTERACTIVE AI CONSCIOUSNESS
                                </p>
                            </div>
                        </div>

                        <button 
                           onClick={() => {
                               onClose(); 
                               setTimeout(onOpenChat, 300); 
                           }}
                           className={`relative px-6 py-3 rounded-lg font-bold text-xs tracking-widest uppercase transition-all duration-300 overflow-hidden ${
                               isAiHovered 
                               ? "bg-white text-black hover:scale-105" 
                               : "bg-white/5 text-gray-500"
                           }`}
                        >
                           <span className="relative z-10 flex items-center gap-2">
                             Initialize <ArrowRight size={14} className={isAiHovered ? "text-rose-500" : ""} />
                           </span>
                        </button>
                     </div>
                   </motion.div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-black/40 text-center border-t border-white/5 flex justify-between items-center px-8">
                    <span className="text-[9px] text-gray-700 font-mono">ID: 41-52-49-41-4E</span>
                    <span className="text-[9px] text-rose-900/50 font-mono tracking-[0.2em] uppercase animate-pulse">
                        CONNECTION SECURE
                    </span>
                </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}