"use client";

import { ProductGrid, FeaturedDetail, Newsletter } from "@/components/vorn/Sections";
import Reveal from "@/components/vorn/Reveal";
import BiometricGate from "@/components/vorn/BiometricGate";

export default function ArchivePage() {
  return (
    <BiometricGate>
      <div className="pt-40">
      <section className="container mx-auto px-[5%] mb-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-4">/ SYSTEM_DIRECTORY // ARCHIVE</p>
          <h1 className="text-8xl md:text-[12rem] leading-none mb-12">THE<br />ARCHIVE.</h1>
          <p className="max-w-xl text-dim uppercase font-mono text-xs leading-relaxed">
            A curated collection of industrial artifacts. Documentation of movement through urban environments. Permanent records of the undercurrent.
          </p>
        </Reveal>
      </section>

      <ProductGrid />
      <FeaturedDetail />
      <Newsletter />
    </div>
    </BiometricGate>
  );
}
