"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Trash2, ArrowRight } from "lucide-react";

interface MiniChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "Start a Web Project",
  "Automate with AI",
  "Mobile App Cost?",
  "Who is Arian?"
];

export default function MiniChatWidget({ isOpen, onClose }: MiniChatWidgetProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{ role: 'assistant', content: "Systems Online. I am Arian's Neural Twin. How can I accelerate your business today?" }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_history", JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    localStorage.removeItem("chat_history");
    setMessages([{ role: 'assistant', content: "Memory cleared. Ready for new instructions." }]);
  };

  const handleSend = async (text?: string) => {
    const msgToSend = text || input;
    if (!msgToSend.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: msgToSend }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            messages: [...messages, { role: 'user', content: msgToSend }] 
        })
      });
      
      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection signal lost. Retrying..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 30, stiffness: 350 }}
          className="fixed bottom-4 right-4 z-[1100] w-[90%] md:w-[380px] h-[550px] max-h-[85vh] flex flex-col bg-[#050505]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden font-sans ring-1 ring-white/5"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050505] animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-wide">Neural Assistant</h3>
                <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                   <span className="text-[10px] text-cyan-400/80 uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
               <button onClick={clearChat} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-red-400 transition-colors" title="Clear History">
                 <Trash2 size={16} />
               </button>
               <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                 <X size={20} />
               </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

             {messages.map((msg, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
               >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-purple-500/20 text-purple-400'}`}>
                     {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed backdrop-blur-md border ${
                    msg.role === 'user' 
                      ? 'bg-white/10 border-white/5 text-white rounded-br-none' 
                      : 'bg-[#1a1a1a]/80 border-white/5 text-gray-300 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
               </motion.div>
             ))}

             {isTyping && (
               <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                     <Bot size={14} />
                  </div>
                  <div className="flex gap-1 bg-[#1a1a1a] px-3 py-2.5 rounded-2xl rounded-bl-none border border-white/5">
                     <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                  </div>
               </div>
             )}
          </div>

          {/* Suggestions & Input */}
          <div className="p-4 bg-[#050505] border-t border-white/10 relative z-20 shrink-0">
             
             {messages.length < 3 && (
                <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-1">
                  {SUGGESTIONS.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSend(s)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-300 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
             )}

             <div className="flex items-center gap-2 bg-[#111] border border-white/10 rounded-xl px-4 py-2 focus-within:border-purple-500/50 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-600 font-sans"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                   <ArrowRight size={16} />
                </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}