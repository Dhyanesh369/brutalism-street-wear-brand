"use client";

import Navbar from "@/components/vorn/Navbar";
import Footer from "@/components/vorn/Footer";
import Reveal from "@/components/vorn/Reveal";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-background pt-32">
      <Navbar />
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-12 gap-12">
          
          {/* LEFT: STICKY IMAGES */}
          <div className="col-span-12 lg:col-span-7 space-y-4 lg:sticky lg:top-32 h-fit">
            <Reveal width="100%">
              <div className="aspect-[4/5] bg-surface border border-white/10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop" 
                  className="w-full h-full object-cover grayscale contrast-110" 
                  alt="Product Detail" 
                />
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-surface border border-white/10 overflow-hidden grayscale contrast-125">
                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detail 1" />
              </div>
              <div className="aspect-square bg-surface border border-white/10 overflow-hidden grayscale contrast-125">
                <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover" alt="Detail 2" />
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLABLE METADATA */}
          <div className="col-span-12 lg:col-span-5 pb-20">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-8">
                / ARTIFACT_SPECIFICATION // {id}
              </p>
              <h1 className="text-6xl md:text-8xl mb-12">VORN_HOODIE_X1</h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-8 mb-12">
                <p className="text-lg text-foreground/80 leading-relaxed">
                  High-density heavy jersey artifact. Engineered for structural endurance and thermal retention. Features industrial-grade hardware and cold-dye treatment.
                </p>
                <div className="font-mono text-[14px] text-accent">PRICE: 180.00 USD</div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="border-t border-white/10 pt-10 space-y-10">
                <div className="grid grid-cols-2 gap-y-8">
                  <div className="space-y-2">
                    <p className="font-mono text-[10px] text-dim uppercase">Material</p>
                    <p className="text-sm font-bold uppercase tracking-wider">460GSM_DENSITY_COTTON</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono text-[10px] text-dim uppercase">Silhoette</p>
                    <p className="text-sm font-bold uppercase tracking-wider">FRAME: BOX_OVERSIZED</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono text-[10px] text-dim uppercase">Construction</p>
                    <p className="text-sm font-bold uppercase tracking-wider">INDUSTRIAL_FLATLOCK</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono text-[10px] text-dim uppercase">Treatment</p>
                    <p className="text-sm font-bold uppercase tracking-wider">PIGMENT_COLD_DYE</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="font-mono text-[10px] text-dim uppercase">Select Size</p>
                  <div className="grid grid-cols-4 gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button key={size} className="border border-white/10 py-4 font-mono text-[12px] hover:border-accent hover:text-accent transition-all">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-accent text-black font-mono text-[11px] font-bold py-6 tracking-[0.2em] hover:bg-white transition-colors">
                  SECURE_ARTIFACT
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-20 space-y-6">
                <p className="font-mono text-[10px] text-dim uppercase tracking-widest">/ SYSTEM_NOTICE</p>
                <p className="text-xs text-dim leading-relaxed uppercase tracking-wider">
                  Every artifact is documenting a moment in the system. Minor variations in dye and texture are intentional. Engineered to age with the wearer.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
