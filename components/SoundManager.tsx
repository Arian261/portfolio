"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundManager() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // ایجاد المنت صدا
    audioRef.current = new Audio("/ambient.mp3"); // فایل باید در پوشه public باشد
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // صدای ملایم
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-gray-400 group-hover:text-cyan-400" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-500 group-hover:text-red-400" />
      )}
    </button>
  );
}