"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, ShieldCheck, Activity, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSystemAudio } from "@/lib/context/SystemAudioContext";

export default function SystemConsole() {
  const { playBlip, playSuccess, playError } = useSystemAudio();
  const [logs, setLogs] = useState<string[]>([
    "VORN_OS_v4.2.0_INITIALIZED",
    "SECURE_LINK_ESTABLISHED...",
    "LAT: 52.5200 N // LON: 13.4050 E",
    "READY_FOR_PROTOCOL_INPUT"
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false });
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`].slice(-50));
    if (message.includes("ERR")) {
      playError();
    } else {
      playBlip("low");
    }
  };

  const [input, setInput] = useState("");

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toUpperCase().trim();
    if (!cmd) return;

    addLog(`EXEC_COMMAND: ${cmd}`);
    
    if (cmd === "CLEAR") {
      setLogs(["SYSTEM_LOGS_CLEARED"]);
      playSuccess();
    } else if (cmd === "NAV_ARCHIVE") {
      window.location.href = "/archive";
    } else if (cmd === "NAV_HOME") {
      window.location.href = "/";
    } else if (cmd === "HELP") {
      addLog("AVAILABLE_CMDS: CLEAR, NAV_ARCHIVE, NAV_HOME, HELP, STATUS, SEARCH");
      playSuccess();
    } else if (cmd === "STATUS") {
      addLog("SYSTEM: OPERATIONAL // UPLINK: STABLE // SECTOR: 4");
      playSuccess();
    } else if (cmd.startsWith("SEARCH")) {
       const query = cmd.replace("SEARCH ", "");
       addLog(`SEARCH_PROTOCOL_INITIATED: ${query}...`);
       setTimeout(() => {
          addLog(`MATCH_FOUND: ARTIFACTS_IDENTIFIED_IN_SECTOR_1`);
          playSuccess();
       }, 1000);
    } else if (cmd.startsWith("GOTO")) {
       const target = cmd.replace("GOTO ", "").toLowerCase();
       if (target === "archive" || target === "manifesto" || target === "home") {
          addLog(`REDIRECTING_TO_SECTOR: ${target.toUpperCase()}...`);
          playSuccess();
          setTimeout(() => {
            window.location.href = target === "home" ? "/" : `/${target}`;
          }, 800);
       } else {
          addLog(`ERR: SECTOR_NOT_FOUND: ${target.toUpperCase()}`);
       }
    } else {
      addLog(`ERR: COMMAND_NOT_RECOGNIZED: ${cmd}`);
    }
    
    setInput("");
  };

  useEffect(() => {
    addLog(`NAVIGATING_TO: ${pathname.toUpperCase()}`);
  }, [pathname]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[1000] hidden md:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black border border-white/10 p-4 flex items-center gap-3 hover:border-accent transition-colors group"
        >
          <div className="relative">
            <Terminal className="w-4 h-4 text-accent" />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest">System_Console</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-full mb-4 left-0 w-[400px] h-[350px] bg-black/95 backdrop-blur-xl border border-white/10 flex flex-col shadow-2xl scanlines"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-2">
                   <Cpu className="w-3 h-3 text-accent" />
                   <span className="font-mono text-[9px] uppercase tracking-widest text-dim">VORN_CORE_PROCESSOR</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/20" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
              </div>

              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-[9px] space-y-1 custom-scrollbar selection:bg-accent selection:text-black"
              >
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-accent/50">{">"}</span>
                    <span className={log.includes("NAVIGATING") || log.includes("EXEC") ? "text-accent" : "text-foreground/70"}>
                      {log}
                    </span>
                  </div>
                ))}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1.5 h-3 bg-accent inline-block align-middle ml-1"
                />
              </div>

              {/* COMMAND INPUT */}
              <form onSubmit={handleCommand} className="p-4 border-t border-white/10 flex items-center gap-3 bg-white/[0.01]">
                <span className="font-mono text-accent text-[9px]">CMD_PROTOCOL:</span>
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-[9px] text-accent placeholder:text-dim/30"
                  placeholder="WAITING_FOR_INPUT..."
                />
              </form>

              <div className="p-4 border-t border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-accent" />
                    <span className="font-mono text-[8px] uppercase text-dim">Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-accent" />
                    <span className="font-mono text-[8px] uppercase text-dim">Pulse_Normal</span>
                  </div>
                </div>
                <span className="font-mono text-[8px] text-accent/50">v4.2.0</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
