"use client";

import { motion } from "framer-motion";

export default function ArtifactScan() {
  return (
    <div className="relative w-full h-[600px] bg-black overflow-hidden flex items-center justify-center border-b border-white/10">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      <div className="relative z-10 text-center">
        <motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-mono text-[10px] text-accent tracking-[0.4em] mb-12 uppercase"
        >
          // INITIALIZING_3D_SCAN_ARTIFACT_AR-001
        </motion.p>

        <div className="relative w-[300px] h-[400px] mx-auto">
          {/* WIREFRAME SIMULATION */}
          <svg viewBox="0 0 100 140" className="w-full h-full text-accent/20">
            <motion.path
              d="M30 20 L70 20 L85 50 L85 120 L15 120 L15 50 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M30 20 L20 40 L15 50 M70 20 L80 40 L85 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            {/* SCANNING LINE */}
            <motion.line
              x1="0" y1="0" x2="100" y2="0"
              stroke="var(--accent)"
              strokeWidth="1"
              animate={{ y: [0, 140, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* DATA POINTS */}
          <div className="absolute top-0 right-[-100px] text-left space-y-4">
             <div className="border-l border-accent/30 pl-4 py-2">
                <p className="font-mono text-[8px] text-dim uppercase mb-1">Density_Scan</p>
                <p className="font-mono text-[10px] text-accent">460GSM_JERSEY</p>
             </div>
             <div className="border-l border-accent/30 pl-4 py-2">
                <p className="font-mono text-[8px] text-dim uppercase mb-1">Structure</p>
                <p className="font-mono text-[10px] text-accent">OVERSIZED_FRAME</p>
             </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-12 font-mono text-[9px] text-dim">
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>SCANNING_ACTIVE</span>
           </div>
           <div>COORD: 52.5200 N / 13.4050 E</div>
           <div className="text-accent">VERSION: AR-001.REV.4</div>
        </div>
      </div>

      {/* FORENSIC CROPS (Subtle images) */}
      <div className="absolute bottom-10 left-10 w-32 h-32 border border-white/5 grayscale opacity-30">
         <img src="/images/hoodie.png" className="w-full h-full object-cover" />
         <div className="absolute inset-0 border border-accent/20 animate-pulse" />
      </div>
    </div>
  );
}
