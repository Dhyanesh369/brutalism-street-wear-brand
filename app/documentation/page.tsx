import { Newsletter } from "@/components/vorn/Sections";
import Reveal from "@/components/vorn/Reveal";

export default function DocumentationPage() {
  const specs = [
    { label: "FABRICATION", value: "HEAVYWEIGHT_JERSEY // 460GSM" },
    { label: "DYE_PROCESS", value: "COLD_ARCHIVE_PIGMENT" },
    { label: "STITCH_SPEC", value: "REINFORCED_INDUSTRIAL_LOCK" },
    { label: "ORIGIN", value: "SECTOR_4 // PRODUCTION_FACILITY" },
    { label: "COMPOSITION", value: "100% ORGANIC COTTON" },
    { label: "FINISH", value: "WEATHER_RESISTANT_COATING" }
  ];

  return (
    <div className="pt-40">
      <section className="container mx-auto px-[5%] mb-40">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-4">/ TECHNICAL_SPECIFICATIONS // DATA</p>
          <h1 className="text-8xl md:text-[10rem] leading-none mb-20">SYSTEM<br />LOGS.</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
            {specs.map((spec, i) => (
              <div key={i} className="p-10 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                <p className="font-mono text-[10px] text-dim mb-4 uppercase tracking-widest">{spec.label}</p>
                <p className="text-lg font-bold uppercase">{spec.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-40 grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-8">
            <Reveal delay={0.2}>
              <h2 className="text-5xl md:text-7xl mb-12 uppercase leading-tight">THE ARCHITECTURE<br />OF ENDURANCE.</h2>
              <p className="text-xl text-dim uppercase leading-relaxed mb-12">
                Every VORN artifact is subject to rigorous stress testing within urban environments. We prioritize material density and structural integrity over aesthetic trend. Our documentation process ensures that each garment is trackable to its sector of origin.
              </p>
              <div className="aspect-video bg-surface border border-white/10 overflow-hidden grayscale contrast-125">
                <img src="/images/tech.png" alt="Technical" className="w-full h-full object-cover opacity-50" />
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end">
             <Reveal delay={0.4}>
                <div className="p-8 border border-white/10 bg-surface/30">
                  <p className="font-mono text-[10px] text-accent mb-4 uppercase tracking-[0.2em]">/ CARE_INSTRUCTIONS</p>
                  <ul className="font-mono text-[10px] text-dim uppercase space-y-4">
                    <li>- WASH_COLD_ONLY</li>
                    <li>- AIR_DRY_VERTICAL</li>
                    <li>- DO_NOT_IRON_PRINT</li>
                    <li>- STORE_IN_DARK_SECTOR</li>
                  </ul>
                </div>
             </Reveal>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
