"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Radio, Zap, Clock } from "lucide-react";

export default function SectorStatus() {
  const [time, setTime] = useState("");
  const [load, setLoad] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
      setLoad(Math.floor(Math.random() * 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-[4000] bg-black/80 backdrop-blur-md border-t border-white/5 px-6 py-2 flex justify-between items-center hidden md:flex pointer-events-none">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="font-mono text-[8px] text-accent uppercase tracking-widest">System_Uplink: Active</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
             <Radio className="w-3 h-3 text-dim" />
             <span className="font-mono text-[8px] text-dim uppercase">Sector: 04 // Berlin_Underground</span>
          </div>
          <div className="flex items-center gap-1.5">
             <Wifi className="w-3 h-3 text-dim" />
             <span className="font-mono text-[8px] text-dim uppercase">Latency: 14MS</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="flex items-center gap-6">
           <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                animate={{ width: `${load}%` }}
                transition={{ duration: 0.5 }}
              />
           </div>
           <span className="font-mono text-[8px] text-accent uppercase w-12">Load: {load}%</span>
        </div>

        <div className="flex items-center gap-2 text-foreground">
          <Clock className="w-3 h-3" />
          <span className="font-mono text-[9px] font-bold tracking-tighter">{time} // UTC_PROTOCOL</span>
        </div>
      </div>

      <div className="absolute top-[-1px] left-0 w-full h-[1px] bg-accent/20 overflow-hidden">
         <motion.div 
            className="w-40 h-full bg-accent"
            animate={{ left: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         />
      </div>
    </div>
  );
}
