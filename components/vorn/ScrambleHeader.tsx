"use client";

import { useTextScramble } from "@/hooks/useTextScramble";

export default function ScrambleHeader({ text, className }: { text: string, className?: string }) {
  const { displayText } = useTextScramble(text);
  return <span className={className}>{displayText}</span>;
}
