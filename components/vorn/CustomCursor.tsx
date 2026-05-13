"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block">
      {/* MAIN CROSSHAIR */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center"
        style={{ x: springX, y: springY }}
      >
        <div className="absolute w-full h-[1px] bg-accent/40" />
        <div className="absolute h-full w-[1px] bg-accent/40" />
        <div className="w-1 h-1 bg-accent rounded-full" />
      </motion.div>

      {/* OUTER SCANNER */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 -ml-6 -mt-6 border border-accent/20 rounded-sm"
        style={{ x: springX, y: springY }}
        animate={{ rotate: 90, scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* COORDINATE TEXT */}
      <motion.div
        className="absolute top-0 left-0 ml-6 mt-6 flex flex-col gap-1"
        style={{ x: springX, y: springY }}
      >
        <p className="font-mono text-[8px] text-accent uppercase tracking-tighter">
          X: <motion.span>{Math.round(cursorX.get())}</motion.span>
        </p>
        <p className="font-mono text-[8px] text-accent uppercase tracking-tighter">
          Y: <motion.span>{Math.round(cursorY.get())}</motion.span>
        </p>
      </motion.div>
    </div>
  );
}
