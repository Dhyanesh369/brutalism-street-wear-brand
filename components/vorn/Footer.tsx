"use client";

import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="py-[120px] bg-black border-t border-white/10">
      <div className="container mx-auto px-[5%]">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-4xl text-accent mb-8">VORN</h2>
            <div className="font-mono text-[11px] text-dim leading-relaxed uppercase tracking-widest">
              © MMXXIV VORN_SYSTEMS. <br />
              BUILT IN THE DARK.
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:text-right font-mono text-[10px] text-dim uppercase tracking-widest space-y-2">
            <p>OPERATIONAL // 01</p>
            <p>LAT: 52.5200 N // LNG: 13.4050 E</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
