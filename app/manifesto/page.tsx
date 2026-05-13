import { Manifesto, Lookbook, Newsletter } from "@/components/vorn/Sections";
import Reveal from "@/components/vorn/Reveal";

export default function ManifestoPage() {
  return (
    <div className="pt-40">
      <section className="container mx-auto px-[5%] mb-20 border-b border-white/10 pb-20">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-4">/ BRAND_PROTOCOL // IDENTITY</p>
          <h1 className="text-8xl md:text-[12rem] leading-none mb-12">OUR<br />ETHOS.</h1>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <p className="text-2xl md:text-3xl font-display uppercase leading-tight mb-8">
                VORN does not exist to be seen. It exists to be used. Built in the shadows of concrete and industry.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="font-mono text-xs text-dim uppercase leading-relaxed mb-6">
                We reject the cycle of seasonal hype. We build permanent artifacts. Each piece is a document of a specific trajectory through the urban landscape.
              </p>
              <p className="font-mono text-xs text-dim uppercase leading-relaxed">
                Engineered for endurance. Designed for intentionality. Documenting the undercurrent since SECTOR_01.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Manifesto />
      <Lookbook />
      <Newsletter />
    </div>
  );
}
