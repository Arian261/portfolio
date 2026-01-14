"use client";

import React, { Suspense, useState } from 'react';
import SolarSystem from '@/components/SolarSystem';
import HyperText from '@/components/HyperText';
import ExpertiseShowcase from '@/components/ExpertiseShowcase'; 
import LoadingScreen from '@/components/LoadingScreen';
import ContactModal from '@/components/ContactModal'; 
import ResearchHub from '@/components/ResearchHub'; 
import WebDevHub from '@/components/WebDevHub'; 
import SeoHub from '@/components/SeoHub'; 
import UiUxHub from '@/components/UiUxHub'; 
import MobileHub from '@/components/MobileHub'; 
import AiHub from '@/components/AiHub';
import ImageEditingHub from '@/components/ImageEditingHub';
import VideoHub from '@/components/VideoHub';
import ProjectVaultHub from '@/components/ProjectVaultHub';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ScrollIndicator from '@/components/ScrollIndicator'; 
import ScrollToTop from '@/components/ScrollToTop';
import MiniChatWidget from '@/components/MiniChatWidget'; 
import AiFab from '@/components/AiFab'; 
import { AnimatePresence } from 'framer-motion'; // برای انیمیشن خروج دکمه‌ها

export default function Home() {

  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState(false);

  const [viewMode, setViewMode] = useState<'default' | 'pharmacy' | 'webDev' | 'seo' | 'uiUx' | 'mobile' | 'ai' | 'imageEditing' | 'video' | 'vault'>('default');

  return (
    <>
      <LanguageSwitcher />

      {!started && <LoadingScreen onStarted={() => setStarted(true)} />}

      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
            <SolarSystem viewMode={viewMode} />
        </Suspense>
      </div>

      <div className={`relative z-10 w-full overflow-x-hidden selection:bg-cyan-500/30 transition-all duration-1000 ${
        started && viewMode === 'default' ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20 pointer-events-none fixed"
      }`}>

        <main className="h-screen w-full flex flex-col items-center justify-center relative px-4">
            <div className="text-center select-none space-y-8 z-10 transform transition-transform duration-1000 hover:scale-[1.01]">
               <div className="flex justify-center mb-8 opacity-0 animate-in fade-in zoom-in duration-1000 delay-300">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 border border-white/5 rotate-45 animate-[spin_15s_linear_infinite]" />
                      <div className="absolute inset-4 border border-cyan-500/30 rotate-45 animate-[spin_8s_linear_infinite_reverse]" />
                      <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
                  </div>
               </div>
               <h1 className="text-6xl md:text-9xl font-bold tracking-tighter drop-shadow-2xl mb-12">
                 <span className="text-[#E5E4E2]">ARIAN </span>
                 <HyperText text="MONADI" className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600" />
               </h1>
               <div className="flex justify-center animate-in slide-in-from-bottom-5 duration-1000 delay-500">
                  <div className="relative px-8 py-4 group cursor-default">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/50 group-hover:w-full group-hover:h-full transition-all duration-700 ease-out" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/50 group-hover:w-full group-hover:h-full transition-all duration-700 ease-out" />
                    <span className="text-sm md:text-base font-mono text-cyan-100 tracking-[0.4em] uppercase font-bold drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                      FULL STACK DEVELOPER
                    </span>
                  </div>
               </div>
            </div>
            
            <ScrollIndicator />

        </main>

        <ExpertiseShowcase onDiveIn={(type) => setViewMode(type)} /> 

        <section className="w-full py-32 flex flex-col items-center justify-center relative">
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
           <div className="relative w-40 h-40 md:w-64 md:h-64 mb-10 opacity-80 hover:opacity-100 transition-opacity duration-500">
             <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full animate-pulse" />
             <Image src="/logo-photo.png" alt="Big Logo" fill className="object-contain" />
           </div>

           <button 
             onClick={() => setIsModalOpen(true)}
             className="relative px-12 py-4 bg-white text-black font-bold tracking-[0.2em] rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 z-10"
           >
             VIEW COMMUNICATION
           </button>
           <p className="mt-8 text-gray-500 text-xs font-mono tracking-widest z-10">
             READY TO COLLABORATE
           </p>
        </section>
      </div>

      <ResearchHub isActive={viewMode === 'pharmacy'} onBack={() => setViewMode('default')} />
      <WebDevHub isActive={viewMode === 'webDev'} onBack={() => setViewMode('default')} />
      <SeoHub isActive={viewMode === 'seo'} onBack={() => setViewMode('default')} />
      <UiUxHub isActive={viewMode === 'uiUx'} onBack={() => setViewMode('default')} />
      <AiHub isActive={viewMode === 'ai'} onBack={() => setViewMode('default')} />
      <MobileHub isActive={viewMode === 'mobile'} onBack={() => setViewMode('default')} />
      <ImageEditingHub isActive={viewMode === 'imageEditing'} onBack={() => setViewMode('default')} />
      <VideoHub isActive={viewMode === 'video'} onBack={() => setViewMode('default')} />
      <ProjectVaultHub isActive={viewMode === 'vault'} onBack={() => setViewMode('default')} />

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onOpenChat={() => setIsChatWidgetOpen(true)} 
      />

      <MiniChatWidget 
        isOpen={isChatWidgetOpen} 
        onClose={() => setIsChatWidgetOpen(false)} 
      />

      {/* منطق جدید:
         اگر چت باز است -> هیچ دکمه‌ای نشان نده
         اگر چت بسته است -> دکمه‌های شناور را نشان بده
      */}
      <AnimatePresence>
        {!isChatWidgetOpen && (
          <>
            <AiFab onClick={() => setIsChatWidgetOpen(true)} />
            <ScrollToTop />
          </>
        )}
      </AnimatePresence>
      
    </>
  );
}