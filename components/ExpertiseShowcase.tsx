"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, Smartphone, TrendingUp, Palette, Video, 
  Layers, FlaskConical, ChevronRight, Cpu, Image as ImageIcon 
} from "lucide-react";

interface ExpertiseShowcaseProps {
  onDiveIn: (type: 'pharmacy' | 'webDev' | 'seo' | 'uiUx' | 'mobile' | 'ai' | 'imageEditing' | 'video' | 'vault') => void; 
}

export default function ExpertiseShowcase({ onDiveIn }: ExpertiseShowcaseProps) {
  
  const handleStartProject = (
    title: string, 
    isResearch?: boolean, 
    isWebDev?: boolean, 
    isSeo?: boolean, 
    isUiUx?: boolean, 
    isMobile?: boolean, 
    isAi?: boolean,
    isImageEditing?: boolean,
    isVideo?: boolean,
    isVault?: boolean
  ) => {

    if (isMobile) { onDiveIn('mobile'); return; }
    if (isUiUx) { onDiveIn('uiUx'); return; }
    if (isSeo) { onDiveIn('seo'); return; }
    if (isWebDev) { onDiveIn('webDev'); return; }
    if (isResearch) { onDiveIn('pharmacy'); return; }
    if (isAi) { onDiveIn('ai'); return; }
    if (isImageEditing) { onDiveIn('imageEditing'); return; }
    if (isVideo) { onDiveIn('video'); return; }
    if (isVault) { onDiveIn('vault'); return; }

    const phoneNumber = "989126879769";
    const message = `Hello, I wanted to get information about ${title}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const FULL_EXPERTISE = [
      {
        title: "WEB DESIGNER & DEVELOPER",
        isWebDev: true,
        category: "Full Stack Development",
        desc: "I don't just build websites; I engineer digital experiences. Working solo, I leverage the full power of HTML, CSS, PHP, JS, and Next.js to craft 3D immersive sites.",
        tags: ["HTML/CSS/JS", "PHP", "3D Experiences", "E-Commerce", "Next.js"],
        icon: <Globe />,
        color: "cyan",
        gradient: "from-cyan-500/20 to-blue-600/20"
      },
      {
        title: "ELITE UI/UX DESIGN",
        category: "Experience Design",
        desc: "I design interfaces that communicate directly with your user's subconscious. By blending behavioral psychology with high-end aesthetics, I create user journeys.",
        tags: ["User Interface", "User Journey", "Prototyping", "Figma", "Design Systems"],
        icon: <Palette />,
        color: "pink",
        gradient: "from-pink-500/20 to-purple-600/20",
        isUiUx: true 
      },
      {
        title: "BUSINESS INTELLIGENCE & SEO",
        isSeo: true,
        category: "Growth Engine",
        desc: "I ensure your brand dominates the search results. Using advanced SEO strategies and data-driven analytics, I position your business at the apex of visibility.",
        tags: ["Advanced SEO", "Analytics", "Market Dominance", "Conversion Optimization"],
        icon: <TrendingUp />,
        color: "green",
        gradient: "from-green-500/20 to-emerald-600/20"
      },
      {
        title: "MOBILE ECOSYSTEMS",
        category: "App Development",
        desc: "I extend your business logic directly into the hands of your users. I develop robust iOS and Android applications (Web App & Native) that are seamless.",
        tags: ["React Native", "PWA", "iOS", "Android", "Cross-Platform"],
        icon: <Smartphone />,
        color: "orange",
        gradient: "from-orange-500/20 to-red-600/20",
        isMobile: true 
      },
      {
        title: "AI AUTOMATION & AGENTS",
        category: "Artificial Intelligence",
        desc: "I streamline your entire business operation using n8n and advanced AI models. From intelligent chatbots to fully automating your store's workflow.",
        tags: ["n8n Automation", "AI Chatbots", "Workflow Optimization", "LLMs"],
        icon: <Cpu />,
        color: "purple",
        gradient: "from-purple-500/20 to-indigo-600/20",
        isAi: true
      },
      {
        title: "PROFESSIONAL IMAGE EDITING",
        category: "Visual Perfection",
        desc: "I transform raw product photos into commercial masterpieces. Combining expert Photoshop skills with Generative AI, I design eye-catching advertising banners.",
        tags: ["Photoshop", "Gen-AI", "Product Retouching", "Banner Design"],
        icon: <ImageIcon />,
        color: "teal",
        gradient: "from-teal-500/20 to-cyan-400/20",
        isImageEditing: true 
      },
      {
        title: "CINEMATIC VISUAL PRODUCTION",
        category: "Video & Motion",
        desc: "I elevate your brand identity with cinema-grade motion graphics and precision video editing. In the modern attention economy, I ensure your visual assets tell a compelling story.",
        tags: ["Visual Identity", "Motion Graphics", "Video Editing", "Premiere Pro"],
        icon: <Video />,
        color: "yellow",
        gradient: "from-yellow-500/20 to-amber-600/20",
        isVideo: true 
      },
      {
        title: "PHARMACEUTICAL R&D",
        isResearch: true,
        category: "Science & Technology",
        desc: "Currently a Pharmacy student in Cyprus, I have a deep passion for research and uncovering the intricate details of molecular science. Here, I share my latest findings, medical insights, and R&D projects I am currently developing. Join me in exploring the scientific frontier.",
        tags: ["Pharmacy", "Chemical Analysis", "Research", "Science"],
        icon: <FlaskConical />,
        color: "green",
        gradient: "from-green-500/20 to-teal-600/20"
      },
      {
        title: "THE PROJECT VAULT",
        category: "Recent Works",
        desc: "A growing collection of my recent projects and commercial works. Check out the path I'm carving in the digital world.",
        tags: ["Case Studies", "Portfolio", "Recent Work"],
        icon: <Layers />,
        color: "gray",
        gradient: "from-gray-500/20 to-slate-600/20",
        isVault: true 
      }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-32">

        <div className="text-center py-32 relative">
          <h2 className="text-4xl md:text-6xl font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            AREAS OF EXPERTISE
          </h2>
          <p className="text-cyan-500/60 font-mono text-xs tracking-[0.6em] mt-4 uppercase">
            Systems • Design • Science
          </p>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>

      {FULL_EXPERTISE.map((item: any, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className={`min-h-[80vh] flex flex-col justify-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-20`}
        >
           <div className="w-full md:w-1/2 relative group cursor-pointer">
            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-[60px] rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-700`} />
            <div className="relative aspect-video rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md overflow-hidden flex items-center justify-center hover:scale-[1.02] hover:border-white/20 transition-all duration-500 shadow-2xl">
              <div className={`p-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 ${item.color === 'cyan' ? 'text-cyan-400' : item.color === 'pink' ? 'text-pink-400' : item.color === 'green' ? 'text-green-400' : item.color === 'orange' ? 'text-orange-400' : item.color === 'purple' ? 'text-purple-400' : item.color === 'yellow' ? 'text-yellow-400' : item.color === 'teal' ? 'text-teal-400' : 'text-gray-400'}`}>
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 64 })}
              </div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/5">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className={`h-[1px] w-12 ${item.color === 'gray' ? 'bg-gray-500' : 'bg-cyan-500'}`} />
              <span className={`text-xs font-mono tracking-[0.3em] uppercase ${item.color === 'cyan' ? 'text-cyan-400' : item.color === 'pink' ? 'text-pink-400' : item.color === 'green' ? 'text-green-400' : item.color === 'orange' ? 'text-orange-400' : item.color === 'purple' ? 'text-purple-400' : item.color === 'yellow' ? 'text-yellow-400' : item.color === 'teal' ? 'text-teal-400' : 'text-gray-400'}`}>
                {item.category}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight font-sans">{item.title}</h3>
            <p className="text-gray-300 text-lg leading-relaxed font-light font-sans">{item.desc}</p>
            
             <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              {item.tags.map((tag: any, i: number) => (
                <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">{tag}</span>
              ))}
            </div>

            <div className="pt-6 flex justify-center md:justify-start gap-4">
              <button 
                onClick={() => handleStartProject(item.title, item.isResearch, item.isWebDev, item.isSeo, item.isUiUx, item.isMobile, item.isAi, item.isImageEditing, item.isVideo, item.isVault)}
                className="group flex items-center gap-2 px-8 py-3 bg-white text-black font-bold tracking-widest text-xs rounded-full hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>
                  {item.isResearch ? "ENTER RESEARCH HUB" : 
                   item.isWebDev ? "CHOOSE YOUR PLAN" : 
                   item.isSeo ? "SECURE DOMINANCE" : 
                   item.isUiUx ? "DESIGN STUDIO" : 
                   item.isMobile ? "INITIATE LAUNCH" : 
                   item.isAi ? "TALK TO AI TWIN" : 
                   item.isImageEditing ? "VISUALIZE" : 
                   item.isVideo ? "WATCH SHOWREEL" : 
                   item.isVault ? "OPEN ARCHIVE" : "START PROJECT"}
                </span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}