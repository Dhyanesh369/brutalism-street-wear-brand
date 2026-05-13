"use client";

import Reveal from "./Reveal";
import ScrambleHeader from "./ScrambleHeader";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative h-[80vh] md:h-screen w-full flex items-center overflow-hidden">
      <div className="container mx-auto px-[5%] z-20">
        <div className="grid grid-cols-12 gap-0 relative">
          <div className="col-span-12 relative">
            <Reveal>
              <h1 className="text-huge leading-[0.8] mb-8">
                <ScrambleHeader text="VORN_SYSTEM" />
              </h1>
            </Reveal>
            <div className="absolute -bottom-20 right-0 text-right hidden md:block">
              <Reveal delay={0.2}>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-50 mb-2 flicker">
                  SECTOR_01 // ARCHIVE_01
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent flicker">
                  DOCUMENTING THE UNDERCURRENT.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 mt-16 flex justify-center md:block">
            <Reveal delay={0.4}>
              <a
                href="/archive"
                className="inline-block !bg-[#C8FF00] text-black font-mono text-[11px] uppercase font-bold px-12 py-6 tracking-[0.1em] hover:bg-white transition-colors"
              >
                ENTER_WAREHOUSE
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(10,10,10,0)_0%,rgba(10,10,10,0.9)_100%)] absolute inset-0 z-20" />
        <Image
          src="/images/hero.png"
          alt="VORN Hero"
          fill
          priority
          className="object-cover grayscale contrast-125 opacity-40 z-10"
        />
      </div>
    </header>
  );
}
