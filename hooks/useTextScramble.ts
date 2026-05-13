"use client";

import { useState, useEffect, useCallback } from "react";

const CHARS = "!@#$%^&*()_+{}:\"<>?-=[];',./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useTextScramble(targetText: string, speed: number = 40) {
  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return targetText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [targetText, speed]);

  useEffect(() => {
    scramble();
  }, [scramble]);

  return { displayText, isScrambling, scramble };
}
