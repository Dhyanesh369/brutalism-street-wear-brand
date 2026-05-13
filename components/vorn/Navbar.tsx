"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useSystemAudio } from "@/lib/context/SystemAudioContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, setCartOpen } = useCart();
  const { playBlip, playHum } = useSystemAudio();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The_Archive", href: "/archive" },
    { name: "Documentation", href: "/documentation" },
    { name: "Manifesto", href: "/manifesto" },
  ];

  return (
    <>
      {/* DESKTOP NAV */}
      <nav
        className={cn(
          "fixed top-0 w-full z-[1000] flex justify-between items-center px-[5%] py-10 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)]",
          scrolled && "bg-black/90 backdrop-blur-xl py-5 border-b border-white/10"
        )}
      >
        <Link
          href="/"
          onClick={() => playHum()}
          onMouseEnter={() => playBlip("high")}
          className="font-mono text-accent text-xl tracking-[0.1em] font-bold hover:opacity-70 transition-opacity"
        >
          VORN
        </Link>
        
        <div className="hidden md:flex gap-12 font-mono text-[11px] uppercase tracking-wider items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onMouseEnter={() => playBlip("mid")}
              className="hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/" 
            onMouseEnter={() => playBlip("mid")}
            className="text-accent hover:opacity-70 transition-opacity"
          >
            Home
          </Link>
          <button 
            onClick={() => {
                setCartOpen(true);
                playBlip("high");
            }}
            onMouseEnter={() => playBlip("mid")}
            className="relative hover:text-accent transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-black text-[9px] font-bold px-1 rounded-sm min-w-[14px] flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-6">
          <button 
            onClick={() => {
              setCartOpen(true);
              playBlip("high");
            }} 
            className="relative"
          >
            <ShoppingBag className="w-5 h-5 text-accent" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-black text-[9px] font-bold px-1 rounded-sm min-w-[14px] flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => {
              setMenuOpen(true);
              playBlip("mid");
            }}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-0 z-[2000] bg-black flex flex-col p-[5%] pt-20"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="font-mono text-accent tracking-tighter">VORN_SYSTEM_MENU</span>
              <button onClick={() => setMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMenuOpen(false)}
                  className="text-[clamp(28px,10vw,48px)] font-display uppercase leading-none hover:text-accent transition-colors tracking-tighter"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/" 
                onClick={() => setMenuOpen(false)}
                className="text-[clamp(28px,10vw,48px)] font-display uppercase leading-none text-accent tracking-tighter"
              >
                Home
              </Link>
            </div>

            <div className="mt-auto pb-10 border-t border-white/10 pt-10">
              <p className="font-mono text-[10px] text-dim uppercase tracking-widest mb-4">/ SYSTEM_STATUS</p>
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest">OPERATIONAL // LAT: 52.5200 N</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
