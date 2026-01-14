"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { 
  ArrowLeft, Wifi, Battery, Signal, Camera, Phone, MessageSquare, 
  Globe, Calculator, Map, Calendar, Clock, ChevronRight, 
  RefreshCw, Search, Lock, Zap, Code, Layout, Send, Plane, DollarSign, Smartphone, Rocket
} from "lucide-react";

// --- Types ---
interface MobileHubProps {
  isActive: boolean;
  onBack: () => void;
}

// تتریس حذف شد
type AppType = 'home' | 'showcase' | 'messages' | 'camera' | 'browser' | 'calculator' | 'flightradar' | 'calendar' | 'blackjack';

interface Message {
  id: number;
  sender: 'me' | 'ana' | 'jeffrey';
  text: string;
  time: string;
}

// --- HELPER COMPONENTS ---

const AppIcon = ({ icon: Icon, label, color, onClick, notification }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group w-[70px]">
    <div className={`w-14 h-14 rounded-[14px] ${color} flex items-center justify-center text-white shadow-sm group-active:scale-90 transition-transform relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      {typeof Icon === 'string' ? <span className="text-2xl">{Icon}</span> : <Icon size={26} strokeWidth={2} />}
      {notification > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-black z-10">
          {notification}
        </div>
      )}
    </div>
    <span className="text-[10px] font-medium text-white/90 drop-shadow-md tracking-tight">{label}</span>
  </button>
);

// --- 1. SHOWCASE APP (REDESIGNED & IMPROVED) ---
const ShowcaseApp = ({ onConsult }: { onConsult: () => void }) => {
  return (
    <div className="w-full h-full bg-[#050505] text-white overflow-y-auto no-scrollbar pb-20 pt-14 px-5">
       
       {/* Hero Section */}
       <motion.div 
         initial={{ opacity:0, y:20 }} 
         animate={{ opacity:1, y:0 }} 
         className="mb-8 text-center"
       >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-red-600 mb-4 shadow-[0_0_30px_rgba(234,88,12,0.4)]">
             <Smartphone size={32} className="text-white" />
          </div>
          <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-2">My Architecture</h2>
          <h1 className="text-3xl font-bold leading-none">
            Mobile <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Dominance</span>
          </h1>
       </motion.div>

       {/* Introduction / Philosophy */}
       <motion.div 
         initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.2 }}
         className="mb-8"
       >
          <p className="text-sm text-gray-300 leading-relaxed text-justify font-light">
            In a digital era where attention is currency, <strong className="text-white font-bold">a mobile app is your vault.</strong> Having a website is necessary, but occupying a permanent space in your user's pocket is <em className="text-orange-400 not-italic">power</em>.
          </p>
          <p className="text-sm text-gray-300 leading-relaxed text-justify font-light mt-3">
            I don't just write code; I engineer <strong>fluid ecosystems</strong>. By merging creative intuition with rigorous engineering, I build apps that don't just "function"—they feel alive.
          </p>
       </motion.div>

       {/* Technical Stats Grid */}
       <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#1a1a1a] border border-white/5">
             <Code className="text-blue-400 mb-2" size={20} />
             <h3 className="font-bold text-sm">React Native</h3>
             <p className="text-[10px] text-gray-500 mt-1">Single codebase, native power on iOS & Android.</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#1a1a1a] border border-white/5">
             <Zap className="text-yellow-400 mb-2" size={20} />
             <h3 className="font-bold text-sm">120 FPS</h3>
             <p className="text-[10px] text-gray-500 mt-1">Butter-smooth animations & gesture handling.</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#1a1a1a] border border-white/5">
             <Rocket className="text-red-400 mb-2" size={20} />
             <h3 className="font-bold text-sm">Scalable</h3>
             <p className="text-[10px] text-gray-500 mt-1">Architecture built for millions of users.</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#1a1a1a] border border-white/5">
             <Layout className="text-purple-400 mb-2" size={20} />
             <h3 className="font-bold text-sm">Pixel Perfect</h3>
             <p className="text-[10px] text-gray-500 mt-1">Designs implemented with surgical precision.</p>
          </div>
       </div>

       {/* Closing Statement */}
       <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/20 mb-6">
          <p className="text-xs text-orange-200/80 italic text-center">
            "I transform your complex business logic into a seamless, tap-and-swipe experience."
          </p>
       </div>

       {/* CTA */}
       <button onClick={onConsult} className="w-full py-4 rounded-2xl bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2 mb-4">
          <span>START YOUR APP</span>
          <ChevronRight size={16} />
       </button>
       
       <p className="text-[10px] text-center text-gray-600 font-mono uppercase tracking-widest">
          System Ready for Deployment
       </p>
    </div>
  );
};

// --- 2. MESSAGES APP (UNCHANGED LOGIC) ---
const MessagesApp = ({ initialMessages, onSend }: { initialMessages: Message[], onSend: (text: string) => void }) => {
  const [activeChat, setActiveChat] = useState<'list' | 'ana' | 'jeffrey'>('list');
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { if (activeChat !== 'list') scrollToBottom(); }, [activeChat, initialMessages]);

  const ChatList = () => (
    <div className="flex-1 bg-black pt-14 px-4">
      <h1 className="text-3xl font-bold text-white mb-4 px-2">Messages</h1>
      <div className="space-y-1">
        <button onClick={() => setActiveChat('ana')} className="w-full flex items-center gap-3 p-3 active:bg-[#1c1c1e] rounded-xl transition-colors">
          <div className="relative">
             <img src="/ana.jpg" className="w-12 h-12 rounded-full object-cover bg-gray-800" />
             <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-black" />
          </div>
          <div className="flex-1 text-left border-b border-white/10 pb-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-white font-semibold text-base">Ana de Armas</h3>
              <span className="text-gray-500 text-xs">Now</span>
            </div>
            <p className="text-gray-400 text-sm truncate flex items-center gap-1"><span className="text-red-500">❤️</span> its positive i'm pregnant</p>
          </div>
        </button>
        <button onClick={() => setActiveChat('jeffrey')} className="w-full flex items-center gap-3 p-3 active:bg-[#1c1c1e] rounded-xl transition-colors">
          <img src="/epstein.jpg" className="w-12 h-12 rounded-full object-cover bg-gray-800" />
          <div className="flex-1 text-left border-b border-white/10 pb-3">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-white font-semibold text-base">Jeffrey Epstein</h3>
              <span className="text-gray-500 text-xs">Yesterday</span>
            </div>
            <p className="text-gray-400 text-sm truncate">Waiting for you this weekend</p>
          </div>
        </button>
      </div>
    </div>
  );

  const ChatRoom = ({ user }: { user: 'ana' | 'jeffrey' }) => (
    <div className="flex flex-col h-full bg-black">
      <div className="h-28 bg-[#1c1c1e]/80 backdrop-blur-md flex items-end pb-3 px-2 gap-1 border-b border-white/10 z-10 sticky top-0 pt-10">
        <button onClick={() => setActiveChat('list')} className="text-blue-500 flex items-center text-base pl-1 pr-2">
          <ArrowLeft size={22} className="mr-1" />
        </button>
        <div className="flex-1 flex flex-col items-center mr-10">
           <div className="w-10 h-10 rounded-full overflow-hidden mb-1">
             <img src={user === 'ana' ? '/ana.jpg' : '/epstein.jpg'} className="w-full h-full object-cover" />
           </div>
           <span className="text-[12px] text-white font-medium">{user === 'ana' ? 'Ana de Armas' : 'Jeffrey Epstein'}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {initialMessages.filter(m => 
           (user === 'ana' && (m.sender === 'ana' || (m.sender === 'me' && activeChat === 'ana'))) ||
           (user === 'jeffrey' && (m.sender === 'jeffrey' || (m.sender === 'me' && activeChat === 'jeffrey')))
        ).map((msg) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            key={msg.id} 
            className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] px-4 py-2 rounded-[18px] text-[15px] leading-snug relative ${
              msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-[#262628] text-white rounded-bl-md'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 w-full p-2 bg-[#1c1c1e] pb-6">
        <div className="flex items-center gap-3 bg-[#000] rounded-full px-4 py-2 border border-white/10">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="iMessage"
            className="flex-1 bg-transparent text-white text-base focus:outline-none placeholder-gray-600"
            onKeyDown={(e) => { if (e.key === 'Enter' && inputText.trim()) { onSend(inputText); setInputText(""); } }}
          />
          <button 
            onClick={() => { if(inputText.trim()) { onSend(inputText); setInputText(""); } }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-500'}`}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return activeChat === 'list' ? <ChatList /> : <ChatRoom user={activeChat} />;
};

// --- 3. CALCULATOR APP ---
const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<string | null>(null);
  const [op, setOp] = useState<string | null>(null);

  const handleNum = (n: string) => setDisplay(display === '0' ? n : display + n);
  const handleOp = (o: string) => { setPrev(display); setDisplay('0'); setOp(o); };
  const handleEq = () => {
    if(!prev || !op) return;
    const cur = parseFloat(display); const pre = parseFloat(prev);
    let res = 0;
    if(op === '+') res = pre + cur;
    if(op === '-') res = pre - cur;
    if(op === '×') res = pre * cur;
    if(op === '÷') res = pre / cur;
    setDisplay(String(res).slice(0, 9)); setOp(null); setPrev(null);
  };
  const handleClear = () => { setDisplay('0'); setPrev(null); setOp(null); };

  return (
    <div className="w-full h-full bg-black p-4 flex flex-col justify-end pb-12">
      <div className="text-right text-7xl text-white font-light mb-6 px-2 tracking-tighter truncate">{display}</div>
      <div className="grid grid-cols-4 gap-3">
        {['AC','±','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','='].map((btn, i) => (
          <button 
            key={i} 
            onClick={() => {
               if(btn === 'AC') handleClear();
               else if(['÷','×','-','+'].includes(btn)) handleOp(btn);
               else if(btn === '=') handleEq();
               else handleNum(btn);
            }}
            className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl font-medium active:scale-95 transition-transform ${
            ['÷','×','-','+','='].includes(btn) ? 'bg-orange-500 text-white' : 
            ['AC','±','%'].includes(btn) ? 'bg-gray-300 text-black' : 
            'bg-[#333] text-white'
          } ${btn === '0' ? 'col-span-2 w-full items-start pl-7' : ''}`}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- 4. FLIGHT RADAR ---
const FlightRadarApp = () => {
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setCoords({ lat: 35.1856, lng: 33.3823 }); 
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="w-full h-full bg-[#0f172a] flex flex-col">
      <div className="h-24 bg-blue-900/90 backdrop-blur flex items-end pb-3 justify-center shadow-lg z-10 pt-10">
        <span className="text-white font-bold tracking-widest text-sm">FLIGHTRADAR24</span>
      </div>
      <div className="flex-1 relative">
        {loading ? (
            <div className="absolute inset-0 flex items-center justify-center text-green-500 font-mono text-xs">ACQUIRING SATELLITE...</div>
        ) : (
            <iframe 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords!.lng-0.1},${coords!.lat-0.1},${coords!.lng+0.1},${coords!.lat+0.1}&layer=mapnik`} 
                className="absolute inset-0 w-full h-full opacity-60 invert hue-rotate-180 grayscale" 
                style={{ border: 0 }} 
            />
        )}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_20%,#0f172a_100%)] opacity-80" />
        <div className="absolute top-1/2 left-1/2 w-full h-full border border-green-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-[spin_8s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-ping" />
        <div className="absolute bottom-10 left-0 w-full text-center text-[10px] text-green-500 font-mono">
            SCANNING SKY ABOVE YOUR LOCATION
        </div>
      </div>
    </div>
  );
};

// --- 5. CAMERA APP ---
const CameraApp = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch { setError(true); }
    };
    startCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  return (
    <div className="w-full h-full bg-black relative flex flex-col">
      {error ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-center px-6">
          <Lock size={40} className="mb-4 text-gray-700" />
          <p className="text-sm">Camera access denied.</p>
        </div>
      ) : (
        <video ref={videoRef} autoPlay playsInline muted className="flex-1 object-cover rounded-[2rem]" />
      )}
      <div className="h-28 bg-black/40 backdrop-blur-md absolute bottom-0 w-full flex items-center justify-around pb-8 px-6">
         <div className="w-12 h-12 rounded-lg bg-gray-800 border border-gray-600" />
         <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
            <div className="w-14 h-14 bg-white rounded-full" />
         </div>
         <div className="w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-md flex items-center justify-center">
            <RefreshCw size={20} className="text-white" />
         </div>
      </div>
    </div>
  );
};

// --- 6. BLACKJACK (UPDATED TEXT) ---
const BlackjackApp = ({ onExit }: { onExit: () => void }) => {
  const [money, setMoney] = useState(25);
  const [round, setRound] = useState(1);
  const [playerHand, setPlayerHand] = useState<number[]>([]);
  const [dealerHand, setDealerHand] = useState<number[]>([]);
  const [status, setStatus] = useState<'betting' | 'playing' | 'end' | 'kicked'>('betting');
  const [msg, setMsg] = useState("");

  const getRandomCard = () => Math.floor(Math.random() * 10) + 2; 
  const calcSum = (hand: number[]) => hand.reduce((a,b) => a+b, 0);

  const startRound = () => {
    if (round > 5) { setStatus('kicked'); return; }
    if (round === 1) {
        setPlayerHand([10, 11]);
        setDealerHand([9, 9]);
        setStatus('end');
        setMsg("BLACKJACK! You Win!");
        setMoney(m => m + 25);
        return;
    }
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([getRandomCard()]);
    setStatus('playing');
    setMsg("");
  };

  const hit = () => {
    const newHand = [...playerHand, getRandomCard()];
    setPlayerHand(newHand);
    if (calcSum(newHand) > 21) { setMsg("BUST! You Lose."); setStatus('end'); setMoney(m => m - 5); }
  };

  const stand = () => {
    let dHand = [...dealerHand];
    while(calcSum(dHand) < 17) dHand.push(getRandomCard());
    setDealerHand(dHand);
    const pSum = calcSum(playerHand);
    const dSum = calcSum(dHand);
    if (dSum > 21 || pSum > dSum) { setMsg("YOU WIN!"); setMoney(m => m + 10); } 
    else { setMsg("DEALER WINS."); setMoney(m => m - 10); }
    setStatus('end');
  };

  if (status === 'kicked') return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center text-center p-6 space-y-6">
        <h1 className="text-3xl font-bold text-red-600">AMOO ARIAN</h1>
        <p className="text-white text-lg font-mono">
          "That's it, I'm done—I don't have the patience to play with amateurs anymore."
        </p>
        <button onClick={onExit} className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200">Back to Home</button>
    </div>
  );

  return (
    <div className="w-full h-full bg-[#1a472a] flex flex-col relative pt-12">
        <div className="absolute top-4 right-4 bg-black/40 px-3 py-1 rounded-full text-white font-mono border border-white/10 flex items-center gap-1"><DollarSign size={14} className="text-yellow-400"/> {money}</div>
        <div className="absolute top-4 left-4 text-white/50 text-xs font-mono">ROUND {round}/5</div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="flex flex-col items-center">
                <span className="text-white/60 text-xs mb-2">DEALER</span>
                <div className="flex gap-2">{dealerHand.map((c, i) => (<div key={i} className="w-12 h-16 bg-white rounded-md flex items-center justify-center font-bold text-black border-2 border-gray-300">{c}</div>))}{status === 'playing' && <div className="w-12 h-16 bg-red-800 rounded-md border-2 border-white/20" />}</div>
            </div>
            <div className="h-8 text-yellow-400 font-bold text-lg">{msg}</div>
            <div className="flex flex-col items-center">
                <span className="text-white/60 text-xs mb-2">YOU</span>
                <div className="flex gap-2">{playerHand.map((c, i) => (<div key={i} className="w-12 h-16 bg-white rounded-md flex items-center justify-center font-bold text-black border-2 border-gray-300">{c}</div>))}</div>
            </div>
        </div>
        <div className="h-24 bg-black/40 backdrop-blur flex items-center justify-center gap-4 mb-8">
            {status === 'betting' && <button onClick={startRound} className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-lg">DEAL</button>}
            {status === 'playing' && <><button onClick={hit} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full">HIT</button><button onClick={stand} className="px-6 py-3 bg-red-600 text-white font-bold rounded-full">STAND</button></>}
            {status === 'end' && <button onClick={() => { setRound(r => r+1); setStatus('betting'); }} className="px-8 py-3 bg-green-600 text-white font-bold rounded-full">NEXT HAND</button>}
        </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

export default function MobileHub({ isActive, onBack }: MobileHubProps) {
  const [activeApp, setActiveApp] = useState<AppType>('showcase');
  const [time, setTime] = useState("");
  
  // Scenario State
  const [notif, setNotif] = useState<{title: string, body: string, icon: string} | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'jeffrey', text: '18.29917° N, 64.82522° W', time: 'Yesterday' },
    { id: 2, sender: 'jeffrey', text: 'Waiting for you this weekend.', time: 'Yesterday' }
  ]);
  const [hasTriggeredScenario, setHasTriggeredScenario] = useState(false);

  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    t();
    const i = setInterval(t, 1000);
    return () => clearInterval(i);
  }, []);

  // SCENARIO TRIGGER
  useEffect(() => {
    if (!isActive || hasTriggeredScenario) return;
    const timer = setTimeout(() => {
      setNotif({ title: "Ana de Armas", body: "❤️ its positive i'm pregnant", icon: "/ana.jpg" });
      setHasTriggeredScenario(true);
      setMessages(prev => [...prev, { id: 3, sender: 'ana', text: '❤️ its positive i\'m pregnant', time: 'Now' }]);
    }, 12000);
    let dismissTimer: NodeJS.Timeout;
    if (notif) dismissTimer = setTimeout(() => setNotif(null), 6000);
    return () => { clearTimeout(timer); clearTimeout(dismissTimer); };
  }, [isActive, hasTriggeredScenario, notif]);

  // Handle Swipe Up (Home)
  const y = useMotionValue(0);
  const scale = useTransform(y, [-100, 0], [0.9, 1]);
  const handleDragEnd = (_: any, info: any) => { if (info.offset.y < -50) setActiveApp('home'); };

  const handleConsult = () => window.open(`https://wa.me/989126879769`, '_blank');

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-auto">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onBack} />
          
          <motion.button initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} onClick={onBack} className="absolute top-8 left-8 flex items-center gap-3 text-white/60 hover:text-orange-400 transition-colors z-[60] group">
            <div className="p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-xl group-hover:border-orange-500/50"><ArrowLeft size={18} /></div>
            <span className="font-mono text-xs tracking-widest uppercase">Eject</span>
          </motion.button>

          <motion.div 
            initial={{ y: 300, rotateX: 20 }} animate={{ y: 0, rotateX: 0 }} exit={{ y: 300 }} 
            transition={{ type: "spring", damping: 25, stiffness: 100 }} style={{ scale }} 
            className="relative w-[360px] h-[720px] md:w-[390px] md:h-[800px] max-h-[90vh] z-10"
          >
            {/* Chassis */}
            <div className="absolute inset-0 rounded-[3.5rem] border-[6px] border-[#3a3a3a] bg-black shadow-[0_0_60px_rgba(251,146,60,0.15)] pointer-events-none z-0">
               <div className="absolute -left-[2px] top-24 w-[2px] h-8 bg-gray-600 rounded-l" />
               <div className="absolute -left-[2px] top-40 w-[2px] h-14 bg-gray-600 rounded-l" />
               <div className="absolute -left-[2px] top-60 w-[2px] h-14 bg-gray-600 rounded-l" />
               <div className="absolute -right-[2px] top-36 w-[2px] h-20 bg-gray-600 rounded-r" />
            </div>

            <div className="relative w-full h-full rounded-[3.2rem] bg-black overflow-hidden flex flex-col border-[8px] border-black z-10 shadow-inner">
              
              {/* Status Bar */}
              <div className="absolute top-0 w-full h-12 px-7 pt-4 flex justify-between text-white z-50 pointer-events-none mix-blend-difference">
                 <span className="text-sm font-semibold tracking-wide">{time}</span>
                 <div className="flex gap-1.5 items-center"><Signal size={14} /><Wifi size={14} /><Battery size={18} /></div>
              </div>

              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
                 <div className="w-full h-full bg-[#000] rounded-full flex items-center justify-end pr-3 gap-2">
                    {activeApp === 'showcase' && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
                 </div>
              </div>

              {/* Notification */}
              <AnimatePresence>
                {notif && (
                  <motion.div initial={{ y: -100, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0, scale: 0.95 }} onClick={() => { setNotif(null); setActiveApp('messages'); }} className="absolute top-14 left-3 right-3 bg-gray-200/95 backdrop-blur-2xl rounded-2xl p-3 shadow-2xl z-[100] cursor-pointer flex gap-3 items-center">
                    <img src={notif.icon} className="w-10 h-10 rounded-full bg-gray-300 object-cover" />
                    <div className="flex-1 min-w-0"><div className="flex justify-between items-baseline mb-0.5"><h4 className="text-black font-bold text-[13px]">{notif.title}</h4><span className="text-[10px] text-gray-500">now</span></div><p className="text-black text-[13px] leading-tight truncate">{notif.body}</p></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Screen Content */}
              <div className="flex-1 w-full h-full relative bg-black">
                {activeApp === 'home' && (
                  <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full pt-16 pb-8 px-5 flex flex-col justify-between bg-[url('https://cdn.wallpapersafari.com/13/6/M5E1bK.jpg')] bg-cover bg-bottom">
                    <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-4">
                       <AppIcon icon={Calendar} label="Calendar" color="bg-white text-black" onClick={() => setActiveApp('calendar')} />
                       <AppIcon icon={Clock} label="Clock" color="bg-black border border-white/20" onClick={() => {}} />
                       <AppIcon icon={Map} label="Maps" color="bg-gradient-to-tr from-green-400 to-blue-500" onClick={() => {}} />
                       <AppIcon icon={Calculator} label="Calc" color="bg-gray-800" onClick={() => setActiveApp('calculator')} />
                       <AppIcon icon={Plane} label="Radar" color="bg-[#0f172a]" onClick={() => setActiveApp('flightradar')} />
                       <AppIcon icon={Camera} label="Camera" color="bg-gray-300 text-black" onClick={() => setActiveApp('camera')} />
                       <AppIcon icon={Layout} label="My Work" color="bg-gradient-to-br from-orange-500 to-red-600" onClick={() => setActiveApp('showcase')} />
                       <AppIcon icon={DollarSign} label="Blackjack" color="bg-[#1a472a]" onClick={() => setActiveApp('blackjack')} />
                    </div>
                    <div className="bg-white/20 backdrop-blur-2xl rounded-[32px] p-4 flex justify-between items-center mb-6">
                       <AppIcon icon={Phone} label="" color="bg-green-500" onClick={() => {}} />
                       <AppIcon icon={Globe} label="" color="bg-blue-500" onClick={() => setActiveApp('browser')} />
                       <AppIcon icon={MessageSquare} label="" color="bg-green-500" notification={messages.length > 2 ? 1 : 0} onClick={() => setActiveApp('messages')} />
                       <AppIcon icon={Lock} label="" color="bg-gray-500" onClick={() => {}} />
                    </div>
                  </motion.div>
                )}

                {activeApp !== 'home' && (
                  <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="absolute inset-0 w-full h-full bg-black z-40">
                    {activeApp === 'showcase' && <ShowcaseApp onConsult={handleConsult} />}
                    {activeApp === 'camera' && <CameraApp />}
                    {activeApp === 'messages' && <MessagesApp initialMessages={messages} onSend={(txt: string) => setMessages(p => [...p, { id: Date.now(), sender: 'me', text: txt, time: 'Now' }])} />}
                    {activeApp === 'flightradar' && <FlightRadarApp />}
                    {activeApp === 'calculator' && <CalculatorApp />}
                    {activeApp === 'blackjack' && <BlackjackApp onExit={() => setActiveApp('home')} />}
                    {activeApp === 'browser' && (
                        <div className="w-full h-full bg-white flex flex-col pt-12">
                             <div className="px-4 py-2 bg-gray-100 border-b flex items-center gap-2"><Lock size={10} /><div className="flex-1 bg-gray-200 rounded-md py-1 px-2 text-center text-xs text-gray-700 font-medium">google.com</div></div>
                             <div className="flex-1 flex flex-col items-center justify-center -mt-20"><span className="text-4xl font-bold text-gray-600 mb-6 tracking-tighter">Google</span><div className="w-4/5 h-10 border border-gray-300 rounded-full flex items-center px-4 shadow-sm bg-white"><Search size={16} className="text-gray-400 mr-2" /></div></div>
                        </div>
                    )}
                    {activeApp === 'calendar' && <div className="w-full h-full bg-white flex items-center justify-center flex-col"><span className="text-red-500 font-bold text-2xl uppercase tracking-widest">{new Date().toLocaleString('default', { weekday: 'long' })}</span><span className="text-black font-light text-9xl -mt-2">{new Date().getDate()}</span></div>}
                  </motion.div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 w-full h-8 z-[60] flex justify-center items-end pb-2">
                 <motion.div drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={0.1} onDragEnd={handleDragEnd} style={{ y }} className="w-[35%] h-1.5 bg-white rounded-full cursor-grab active:cursor-grabbing shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}