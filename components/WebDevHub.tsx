"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Home, Briefcase, User, Coffee, Gamepad2, Code, ChevronRight, Monitor } from "lucide-react";

interface WebDevHubProps {
  isActive: boolean;
  onBack: () => void;
}

const SERVICES = [
  {
    title: "E-Commerce Empire",
    category: "Online Store",
    desc: "High-conversion storefronts with secure gateways and seamless inventory management.",
    icon: <ShoppingCart className="text-emerald-400" />,
    color: "emerald"
  },
  {
    title: "Real Estate & Consulting",
    category: "Property Hub",
    desc: "Luxury listing showcases with virtual tours, booking systems, and agent portals.",
    icon: <Home className="text-blue-400" />,
    color: "blue"
  },
  {
    title: "Corporate & Services",
    category: "Business Identity",
    desc: "Professional platforms designed to build trust, showcase services, and generate leads.",
    icon: <Briefcase className="text-slate-300" />,
    color: "slate"
  },
  {
    title: "Personal Brand & Portfolio",
    category: "Personal Site",
    desc: "Minimalist, high-impact portfolios for artists, influencers, and professionals.",
    icon: <User className="text-pink-400" />,
    color: "pink"
  },
  {
    title: "Cafe & Restaurant",
    category: "Hospitality",
    desc: "Mouth-watering digital menus with table reservation and online ordering capabilities.",
    icon: <Coffee className="text-amber-400" />,
    color: "amber"
  },
  {
    title: "Gaming & WebGL",
    category: "Immersive Experience",
    desc: "High-performance websites with 3D elements and interactive gamified logic.",
    icon: <Gamepad2 className="text-purple-400" />,
    color: "purple"
  },
  {
    title: "Custom Solutions",
    category: "Bespoke Development",
    desc: "Limitless coding. If you can imagine the logic, I can engineer the reality.",
    icon: <Code className="text-cyan-400" />,
    color: "cyan"
  }
];

export default function WebDevHub({ isActive, onBack }: WebDevHubProps) {
  
  const handleInquiry = (service: string) => {
    const phoneNumber = "989126879769";
    const message = `Hello, I am interested in your "${service}" web design services. Please tell me more.`;
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
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-start pointer-events-auto overflow-y-auto"
        >
          {/* تغییر اصلی اینجاست: 
             بجای bg-black/90 از یک گرادینت ملایم استفاده کردم 
             که پایین صفحه تیره باشه (برای خوانایی کارت ها) ولی بالا شفاف باشه (برای دیدن سیاره)
          */}
          <div className="fixed inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80 backdrop-blur-[2px] -z-10" />

          {/* دکمه بازگشت */}
          <div className="fixed top-0 left-0 w-full p-6 z-[60] bg-gradient-to-b from-black/60 to-transparent">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group bg-black/30 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs md:text-sm tracking-widest uppercase">Back to Orbit</span>
            </button>
          </div>

          <div className="w-full max-w-7xl px-4 pt-32 pb-20 flex flex-col gap-12">
            
            {/* هدر بخش */}
            <motion.div 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-6"
            >
               <div className="inline-flex items-center gap-3 text-cyan-400 border border-cyan-500/30 px-6 py-2 rounded-full bg-black/40 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md">
                  <Monitor size={20} />
                  <span className="font-mono text-xs tracking-[0.3em] uppercase">Web Development Hub</span>
               </div>
               
               <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                 Choose Your <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">Digital Path</span>
               </h2>
               
               <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed drop-shadow-md bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                 From high-performance e-commerce engines to immersive 3D experiences. Select the architecture that fits your vision.
               </p>
            </motion.div>

            {/* گرید کارت‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  // کارت‌ها کمی شفاف‌تر و شیشه‌ای‌تر شدند
                  className={`group relative p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-black/60 transition-all duration-500 hover:border-${item.color}-500/50 hover:-translate-y-2 hover:shadow-2xl ${i === SERVICES.length - 1 ? "md:col-span-2 lg:col-span-3" : ""}`}
                >
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-black/50 rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-white/5">
                        {item.icon}
                      </div>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-${item.color}-500/10 text-${item.color}-300 border border-${item.color}-500/20`}>
                        {item.category}
                      </span>
                   </div>
                   
                   <h3 className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
                     {item.title}
                   </h3>
                   <p className="text-sm text-gray-300 mb-8 leading-relaxed font-light">
                     {item.desc}
                   </p>
                   
                   <button 
                     onClick={() => handleInquiry(item.title)}
                     className="absolute bottom-6 right-6 p-3 rounded-full bg-white/10 hover:bg-cyan-500 hover:text-black transition-all duration-300 group-hover:rotate-0 rotate-45 text-white border border-white/5"
                   >
                     <ChevronRight size={20} />
                   </button>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}