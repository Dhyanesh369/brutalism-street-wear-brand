"use client";

import { createContext, useContext, useEffect, useRef } from "react";

interface AudioContextType {
  playBlip: (type?: "low" | "mid" | "high") => void;
  playSuccess: () => void;
  playError: () => void;
  playHum: () => void;
  stopHum: () => void;
}

const SystemAudioContext = createContext<AudioContextType | undefined>(undefined);

export function SystemAudioProvider({ children }: { children: React.ReactNode }) {
  const audioCtx = useRef<AudioContext | null>(null);
  const humOsc = useRef<OscillatorNode | null>(null);
  const humGain = useRef<GainNode | null>(null);

  const initCtx = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.current.state === "suspended") {
      audioCtx.current.resume();
    }
  };

  const playTone = (freq: number, type: OscillatorType, duration: number, volume: number) => {
    initCtx();
    const ctx = audioCtx.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playBlip = (type: "low" | "mid" | "high" = "mid") => {
    const freqs = { low: 150, mid: 400, high: 800 };
    playTone(freqs[type], "sine", 0.1, 0.05);
  };

  const playSuccess = () => {
    playTone(400, "sine", 0.1, 0.05);
    setTimeout(() => playTone(600, "sine", 0.1, 0.05), 50);
  };

  const playError = () => {
    playTone(150, "square", 0.15, 0.05);
    setTimeout(() => playTone(100, "square", 0.2, 0.05), 100);
  };

  const playHum = () => {
    initCtx();
    if (humOsc.current) return;
    const ctx = audioCtx.current!;
    
    humOsc.current = ctx.createOscillator();
    humGain.current = ctx.createGain();
    
    humOsc.current.type = "sine";
    humOsc.current.frequency.setValueAtTime(40, ctx.currentTime); // Low frequency industrial hum
    
    humGain.current.gain.setValueAtTime(0, ctx.currentTime);
    humGain.current.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2);
    
    humOsc.current.connect(humGain.current);
    humGain.current.connect(ctx.destination);
    
    humOsc.current.start();
  };

  const stopHum = () => {
    if (humGain.current && audioCtx.current) {
      humGain.current.gain.linearRampToValueAtTime(0, audioCtx.current.currentTime + 1);
      setTimeout(() => {
        humOsc.current?.stop();
        humOsc.current = null;
      }, 1000);
    }
  };

  return (
    <SystemAudioContext.Provider value={{ playBlip, playSuccess, playError, playHum, stopHum }}>
      {children}
    </SystemAudioContext.Provider>
  );
}

export const useSystemAudio = () => {
  const context = useContext(SystemAudioContext);
  if (!context) throw new Error("useSystemAudio must be used within SystemAudioProvider");
  return context;
};
