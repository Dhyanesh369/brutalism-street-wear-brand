"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, ShieldCheck, Lock, UserCheck, AlertTriangle } from "lucide-react";
import { useSystemAudio } from "@/lib/context/SystemAudioContext";

export default function BiometricGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { playBlip, playSuccess, playError } = useSystemAudio();

  const startScan = () => {
    setStatus("scanning");
    playBlip("high");
    
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);
      if (current % 10 === 0) playBlip("mid");
      
      if (current >= 100) {
        clearInterval(interval);
        setStatus("success");
        playSuccess();
        setTimeout(() => setIsUnlocked(true), 1200);
      }
    }, 40);
  };

  if (isUnlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[5000] bg-black flex items-center justify-center p-[5%]">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #C8FF00 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative max-w-md w-full border border-white/10 p-12 bg-surface/50 backdrop-blur-xl flex flex-col items-center"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
          <motion.div 
            className="h-full bg-accent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="mb-12 relative">
           <AnimatePresence mode="wait">
             {status === "idle" && (
               <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 <Fingerprint className="w-20 h-20 text-dim" />
               </motion.div>
             )}
             {status === "scanning" && (
               <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
                 <Fingerprint className="w-20 h-20 text-accent animate-pulse" />
                 <motion.div 
                    className="absolute inset-0 border-b-2 border-accent"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                 />
               </motion.div>
             )}
             {status === "success" && (
               <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-accent rounded-full p-6 text-black">
                 <ShieldCheck className="w-12 h-12" />
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        <div className="text-center mb-12">
           <p className="font-mono text-[10px] text-accent tracking-[0.4em] mb-2 uppercase">
             {status === "idle" ? "// IDENTITY_VERIFICATION_REQUIRED" : 
              status === "scanning" ? `// SCANNING_SECTOR_DATA: ${progress}%` :
              "// ACCESS_GRANTED"}
           </p>
           <h2 className="text-4xl font-display uppercase leading-tight">
             {status === "idle" ? "ARCHIVE_LOCKED" : 
              status === "scanning" ? "ANALYZING..." :
              "IDENTITY_CONFIRMED"}
           </h2>
        </div>

        {status === "idle" && (
          <button
            onClick={startScan}
            className="w-full bg-accent text-black font-mono font-bold py-5 tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-3"
          >
            <Lock className="w-4 h-4" />
            INITIATE_SCAN
          </button>
        )}

        <div className="mt-12 w-full grid grid-cols-2 gap-4">
           <div className="p-4 border border-white/10">
              <p className="font-mono text-[7px] text-dim mb-1 uppercase">Latency</p>
              <p className="font-mono text-[9px] text-accent">14MS</p>
           </div>
           <div className="p-4 border border-white/10">
              <p className="font-mono text-[7px] text-dim mb-1 uppercase">Uplink</p>
              <p className="font-mono text-[9px] text-accent">STABLE</p>
           </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-dim">
           <AlertTriangle className="w-3 h-3" />
           <p className="font-mono text-[8px] uppercase tracking-tighter">SECURE_PROTOCOL_LEVEL_4 // AUTHORIZED_ACCESS_ONLY</p>
        </div>
      </motion.div>
    </div>
  );
}
