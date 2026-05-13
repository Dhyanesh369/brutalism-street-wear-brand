"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
        className="relative"
      >
        {/* GLITCH OVERLAY ON LOAD */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="fixed inset-0 z-[9999] bg-accent pointer-events-none mix-blend-difference"
        />

        {children}
      </motion.div>
    </AnimatePresence>
  );
}
