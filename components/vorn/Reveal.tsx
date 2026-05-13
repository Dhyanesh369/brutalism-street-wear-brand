"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
}

export default function Reveal({ children, delay = 0, width = "fit-content" }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.2, 0, 0, 1], // Heavy Ease
      }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
