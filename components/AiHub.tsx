"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Cpu, Bot, Terminal, Sparkles, Zap, 
  BrainCircuit, MessageSquare, Send 
} from "lucide-react";

interface AiHubProps {
  isActive: boolean;
  onBack: () => void;
}

const SUGGESTED_QUESTIONS = [
  "How can AI cut my costs?",
  "Tell me about Arian's skills.",
  "Do you build mobile apps?",
  "What is n8n automation?",
  "I want to start a project."
];

// --- COMPONENTS ---

const GlowingBrain = () => (
  <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
    <div className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full animate-pulse" />
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 border border-purple-500/30 rounded-full border-dashed"
    />
    <motion.div 
      animate={{ rotate: -360 }} 
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute inset-4 border border-cyan-500/30 rounded-full border-dotted"
    />
    <BrainCircuit size={80} className="text-white drop-shadow-[0_0_25px_rgba(168,85,247,1)] z-10" />
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group p-6 rounded-2xl bg-black/40 border border-white/10 hover:bg-purple-900/20 hover:border-purple-500/50 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-300 leading-relaxed text-justify">{desc}</p>
  </motion.div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState<{role: 'system' | 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hello. I am Arian's neural echo. I can analyze your business needs and explain how our AI solutions can help. Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: 'user' as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.filter(m => m.role !== 'system') }),
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error("No reply");
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Neural link unstable. Please check your internet connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-[0_0_60px_rgba(168,85,247,0.1)] relative">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-black/40">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
          <Bot size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm tracking-wide">ARIAN_AI_CORE v2.0</h3>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-400 font-mono">ONLINE • GEMINI MODEL</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.filter(m => m.role !== 'system').map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-purple-900/50 text-purple-400 border border-purple-500/30' : 'bg-white/10 text-white'}`}>
              {msg.role === 'assistant' ? <Bot size={16} /> : <MessageSquare size={16} />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed backdrop-blur-md ${
              msg.role === 'assistant' 
                ? 'bg-purple-500/10 border border-purple-500/20 text-gray-100 rounded-tl-none shadow-[0_0_20px_rgba(168,85,247,0.05)]' 
                : 'bg-white/10 text-white rounded-tr-none border border-white/5'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono animate-pulse pl-12">
            <Terminal size={12} />
            <span>PROCESSING DATA...</span>
          </div>
        )}
      </div>

      {/* Suggested Questions (With Purple Effect) */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/20">
        {SUGGESTED_QUESTIONS.map((q, i) => (
          <button 
            key={i}
            onClick={() => handleSend(q)}
            // تغییر: اضافه کردن بردر و سایه بنفش
            className="whitespace-nowrap px-4 py-1.5 rounded-full bg-purple-500/5 border border-purple-500/40 text-purple-200 text-xs hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-black/40 border-t border-white/10">
        <div className="flex items-center gap-2 bg-black/50 rounded-xl px-4 py-3 border border-white/10 focus-within:border-purple-500/50 focus-within:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Initialize conversation..."
            className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-600 font-mono"
          />
          <button onClick={() => handleSend(input)} className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-colors">
            <Send size={16} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default function AiHub({ isActive, onBack }: AiHubProps) {
  const handleConsult = () => {
    window.open(`https://wa.me/989126879769?text=${encodeURIComponent("Hi, I'm ready to automate my business.")}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-[4px] text-white selection:bg-purple-500/30"
        >

          <div className="fixed inset-0 pointer-events-none opacity-20">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px]" />
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black to-black" />
          </div>

          <div className="fixed top-6 left-6 z-[60]">
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-white/70 hover:text-purple-400 transition-colors group bg-black/40 px-5 py-2 rounded-full border border-white/10 backdrop-blur-xl hover:border-purple-500/50"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-xs tracking-widest uppercase">Orbit View</span>
            </button>
          </div>

          <div className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-20">

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
              <div className="w-full md:w-1/2 text-center md:text-left z-10">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                   className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500/30 text-purple-300 text-xs font-mono mb-6 backdrop-blur-sm"
                >
                   <Sparkles size={12} />
                   <span>NEXT GEN INTELLIGENCE</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl"
                >
                  AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 animate-pulse">AUTOMATION</span> <br/> & AGENTS
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                  className="text-gray-300 text-lg leading-relaxed max-w-xl font-light drop-shadow-md"
                >
                  The era of manual labor is fading. I deploy autonomous AI Agents and n8n workflows to transform your business into a self-driving, precise, and 24/7 powerhouse.
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                className="w-full md:w-1/2 flex justify-center z-10"
              >
                <GlowingBrain />
              </motion.div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10">
               <FeatureCard 
                 icon={Bot} 
                 title="The Sleepless Workforce"
                 desc="Your AI Agents work 24/7, never fatigue, and handle thousands of client interactions simultaneously with zero latency."
                 delay={0.6}
               />
               <FeatureCard 
                 icon={Zap} 
                 title="Workflow Automation (n8n)"
                 desc="Seamlessly connect your CRM, Email, Telegram, and Databases. Orders trigger invoices, stock updates, and notifications—automatically."
                 delay={0.7}
               />
               <FeatureCard 
                 icon={Cpu} 
                 title="Predictive Analytics"
                 desc="AI algorithms analyze sales patterns to predict future trends, enabling you to make data-driven decisions rather than educated guesses."
                 delay={0.8}
               />
            </div>

            {/* CHATBOT SECTION */}
            <div className="relative z-10">
               <div className="text-center mb-12">
                 <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">Consult My Digital Twin</h2>
                 <p className="text-purple-300/80 font-mono text-sm tracking-widest">LIVE NEURAL LINK • ASK ANYTHING</p>
               </div>
               
               <ChatInterface />
               
               <div className="mt-12 text-center">
                  <button 
                    onClick={handleConsult}
                    className="group relative px-10 py-4 bg-white text-black font-bold text-lg tracking-[0.2em] rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                       START AUTOMATION <ArrowLeft className="rotate-180" size={18} />
                    </span>
                  </button>
               </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}