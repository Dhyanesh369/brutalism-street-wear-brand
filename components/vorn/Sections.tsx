"use client";

import Reveal from "./Reveal";
import { useCart } from "@/lib/context/CartContext";
import { useSystemAudio } from "@/lib/context/SystemAudioContext";

// MANIFESTO
export function Manifesto() {
  return (
    <section id="manifesto" className="py-[160px] border-b border-white/10">
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-12 lg:col-span-7 lg:col-start-2">
            <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-8">/ IDENTITY_PROTOCOL // SECTOR_1</p></Reveal>
            <Reveal delay={0.1}><h2 className="text-6xl md:text-8xl mb-12">THE ARCHITECTURE<br />OF THE UNDERGROUND.</h2></Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-12 leading-relaxed">
                VORN exists in the margins. We do not participate in the noise. We build artifacts of identity for those who move with intentionality. Permanent documentation of the undercurrent.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// PRODUCT GRID
export function ProductGrid() {
  const { addItem } = useCart();
  const { playBlip } = useSystemAudio();
  const PRODUCTS = [
    { id: "AR-001", title: "VORN_HOODIE_X1", price: "180.00 USD", spec: "460GSM_DENSITY", image: "/images/hoodie.png", status: "active", units: "04" },
    { id: "AR-002", title: "VORN_SHELL_09", price: "320.00 USD", spec: "WEATHER_TECH", image: "/images/shell.png", status: "active", units: "12" },
    { id: "AR-003", title: "VORN_CARGO_P4", price: "240.00 USD", spec: "UTILITY_SPEC", image: "/images/cargo.png", status: "active", units: "02" },
    { id: "AR-000", title: "VORN_VEST_V1", price: "SOLD_OUT", spec: "HISTORICAL_ARCHIVE", image: "/images/vest.png", status: "sold_out", units: "00" }
  ];

  return (
    <section id="archive" className="py-[160px] border-b border-white/10">
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className={`group relative ${p.status === "sold_out" ? "opacity-50" : ""}`}>
                <div 
                  onClick={() => {
                    if (p.status === "active") {
                      addItem({ ...p, quantity: 1 });
                      playBlip("mid");
                    }
                  }}
                  className={`aspect-[4/5] overflow-hidden border border-white/10 relative transition-all duration-700 cursor-pointer glitch-hover ${p.status === "sold_out" ? "grayscale contrast-75 cursor-not-allowed" : "grayscale hover:grayscale-0 hover:scale-[1.02] contrast-110"}`}
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 font-mono text-[9px] bg-black/60 px-2 py-1 border border-white/10">
                    UNITS_REMAINING: {p.units}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full p-4 flex flex-col justify-between border border-accent/20">
                      <div className="flex justify-between items-start">
                         <span className="font-mono text-[8px] text-accent">DATA_STREAM_ACTIVE</span>
                         <span className="font-mono text-[8px] text-accent">0{i+1}_LINK_OK</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                         <span className="font-mono text-[11px] tracking-[0.2em] border border-white/20 px-4 py-2 bg-black/60">SECURE_ARTIFACT</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                         <div className="p-2 border border-white/10 bg-black/40">
                            <p className="font-mono text-[6px] text-dim uppercase">Structure</p>
                            <p className="font-mono text-[8px] text-accent uppercase">{p.spec}</p>
                         </div>
                         <div className="p-2 border border-white/10 bg-black/40">
                            <p className="font-mono text-[6px] text-dim uppercase">Security</p>
                            <p className="font-mono text-[8px] text-accent uppercase">TIER_1_AUTH</p>
                         </div>
                      </div>
                    </div>
                  </div>
                  {p.status === "sold_out" && <div className="absolute inset-0 flex items-center justify-center"><div className="bg-black border border-white/20 px-6 py-3 font-mono text-[10px] tracking-[0.2em]">ARCHIVE_CLOSED</div></div>}
                </div>
                <div className="mt-8 flex justify-between">
                  <div><h3 className="text-xl font-bold uppercase">{p.title}</h3><p className="font-mono text-[10px] opacity-40 uppercase">REF: {p.id} / {p.spec}</p></div>
                  <p className={`font-mono text-[13px] ${p.status === "sold_out" ? "line-through text-dim" : "text-accent"}`}>{p.price}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// LOOKBOOK
export function Lookbook() {
  const { playBlip } = useSystemAudio();
  return (
    <section id="lookbook" className="py-[160px] border-b border-white/10">
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-12 gap-0 items-center">
          <div className="col-span-12 lg:col-span-7">
            <Reveal width="100%"><div className="aspect-video relative border border-white/10 overflow-hidden"><img src="/images/lookbook.png" alt="Lookbook" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-[3000ms]" /></div></Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-8">/ DOCUMENT_01 // SECTOR_4</p></Reveal>
            <Reveal delay={0.2}><h2 className="text-6xl md:text-8xl mb-8 leading-[0.85]">NIGHT<br />TRAJECTORY</h2></Reveal>
            <Reveal delay={0.3}><p className="text-dim mb-12">Sector 4 surveillance. Documentation of movement through concrete and shadow. No models. Only presence.</p></Reveal>
            <Reveal delay={0.4}>
              <button 
                onClick={() => {
                  window.location.href = "/archive";
                  playBlip("high");
                }}
                className="border border-white/20 px-8 py-4 font-mono text-[11px] uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
              >
                VIEW_RECORDS
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// FEATURED DETAIL
export function FeaturedDetail() {
  const { addItem } = useCart();
  const { playBlip } = useSystemAudio();
  const item = {
    id: "AR-001",
    title: "VORN_HOODIE_X1",
    price: "180.00 USD",
    image: "/images/hoodie.png"
  };

  return (
    <section className="py-[160px] border-b border-white/10">
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-12 gap-0 items-center">
          <div className="col-span-12 lg:col-span-6 lg:col-start-2">
            <Reveal width="100%">
              <div className="aspect-square border border-white/10 overflow-hidden relative group">
                <img src={item.image} alt="Featured" className="w-full h-full object-cover grayscale contrast-110 hover:scale-105 transition-transform duration-[3000ms]" />
                
                {/* LIVE FEED OVERLAY */}
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                         <span className="font-mono text-[10px] text-white uppercase tracking-widest">LIVE_FEED // SECTOR_4</span>
                      </div>
                      <span className="font-mono text-[10px] text-white/50">CAM_01 // 30FPS</span>
                   </div>
                   
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-20 h-20 border border-accent/40 rounded-full flex items-center justify-center animate-spin-slow">
                         <div className="w-10 h-[1px] bg-accent/40" />
                      </div>
                   </div>

                   <div className="flex justify-between items-end font-mono text-[9px] text-white/40 uppercase">
                      <div>COORD: 52.5200 N / 13.4050 E</div>
                      <div>{new Date().toISOString().split('T')[0]}</div>
                   </div>
                </div>

                {/* NOISE OVERLAY */}
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uWUicKgZ2/giphy.gif')] opacity-5 mix-blend-overlay pointer-events-none" />
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-8">/ SECURE_PROTOCOL</p></Reveal>
            <Reveal delay={0.1}><h2 className="text-6xl md:text-8xl mb-12">{item.title}</h2></Reveal>
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 border border-white/10 mb-12">
                <div className="p-6 border-r border-b border-white/10"><p className="font-mono text-[9px] text-dim mb-2">Material</p><p className="text-xs uppercase font-bold">460GSM_JERSEY</p></div>
                <div className="p-6 border-b border-white/10"><p className="font-mono text-[9px] text-dim mb-2">Frame</p><p className="text-xs uppercase font-bold">BOX_OVERSIZE</p></div>
                <div className="p-6 border-r border-white/10"><p className="font-mono text-[9px] text-dim mb-2">Origin</p><p className="text-xs uppercase font-bold">SECTOR_4</p></div>
                <div className="p-6"><p className="font-mono text-[9px] text-dim mb-2">Dye</p><p className="text-xs uppercase font-bold">COLD_ARCHIVE</p></div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <button 
                onClick={() => {
                  addItem({ ...item, quantity: 1 });
                  playBlip("mid");
                }}
                className="bg-accent text-black font-mono text-[11px] font-bold px-12 py-6 tracking-[0.1em] hover:bg-white transition-colors"
              >
                Secure Artifact
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// NEWSLETTER
export function Newsletter() {
  const { playSuccess } = useSystemAudio();
  return (
    <section className="py-[160px] bg-white/[0.02]">
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-8">/ ACCESS_REQUEST // SECTOR_X</p></Reveal>
            <Reveal delay={0.1}><h2 className="text-6xl md:text-8xl mb-8">JOIN THE SYSTEM.</h2></Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5 flex items-end">
            <Reveal width="100%" delay={0.3}>
              <div className="w-full border-b border-white/20 flex items-center pb-6 group hover:border-accent transition-colors">
                <input 
                  type="text" 
                  placeholder="ACCESS_CODE_REQUIRED" 
                  className="bg-transparent border-none w-full font-mono text-sm outline-none text-foreground placeholder:text-dim/50" 
                />
                <button 
                  onClick={() => {
                    playSuccess();
                    alert("ACCESS_GRANTED // CHECK_ENCRYPTED_COMMS");
                  }}
                  className="font-mono text-accent text-[11px] font-bold tracking-[0.1em]"
                >
                  [ REQUEST_ACCESS ]
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

