"use client";

import Hero from "@/components/vorn/Hero";
import ArtifactScan from "@/components/vorn/ArtifactScan";
import { ProductGrid, Newsletter } from "@/components/vorn/Sections";
import IndustrialStats from "@/components/vorn/IndustrialStats";
import Reveal from "@/components/vorn/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <ArtifactScan />
      
      <section className="py-20 border-b border-white/10">
        <div className="container mx-auto px-[5%]">
           <Reveal>
              <IndustrialStats />
           </Reveal>
        </div>
      </section>

      <div className="py-20 border-b border-white/10 flex justify-center items-center bg-white/[0.02]">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-dim flicker">
          ACCESS_ARCHIVE // SECTOR_01 // ACCESS_ARCHIVE // SECTOR_01
        </p>
      </div>
      <ProductGrid />
      <Newsletter />
    </>
  );
}
