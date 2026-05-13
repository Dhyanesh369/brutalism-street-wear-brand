"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function IndustrialStats() {
  const [stats, setStats] = useState([
    { label: "CORE_TEMP", value: "32.4", unit: "°C" },
    { label: "NETWORK_LOAD", value: "1.2", unit: "GB/S" },
    { label: "SECURITY_LEVEL", value: "4", unit: "P" },
    { label: "ACTIVE_USERS", value: "142", unit: "ID" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(s => ({
        ...s,
        value: s.label === "CORE_TEMP" ? (Math.random() * 2 + 31).toFixed(1) :
               s.label === "NETWORK_LOAD" ? (Math.random() * 0.5 + 1).toFixed(2) :
               s.value
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
      {stats.map((s, i) => (
        <div key={s.label} className={`p-8 border-white/10 ${i !== stats.length - 1 ? "md:border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""}`}>
           <p className="font-mono text-[9px] text-dim mb-4 tracking-[0.2em]">{s.label}</p>
           <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display text-accent">{s.value}</span>
              <span className="font-mono text-[10px] text-dim">{s.unit}</span>
           </div>
           <div className="mt-6 flex gap-1">
              {[...Array(5)].map((_, j) => (
                 <motion.div 
                    key={j} 
                    className="w-full h-1 bg-white/5"
                    animate={{ backgroundColor: j < 3 ? "var(--accent)" : "rgba(255,255,255,0.05)" }}
                    transition={{ delay: j * 0.1 }}
                 />
              ))}
           </div>
        </div>
      ))}
    </div>
  );
}
