"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { useSystemAudio } from "@/lib/context/SystemAudioContext";
import { useState } from "react";
import Image from "next/image";

export default function Cart() {
  const { cart, removeItem, updateQuantity, isCartOpen, setCartOpen, clearCart } = useCart();
  const { playBlip, playSuccess, playError } = useSystemAudio();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(" USD", ""));
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    playBlip("high");
    
    setTimeout(() => {
      setIsProcessing(false);
      playSuccess();
      setSubmitted(true);
      setTimeout(() => {
        clearCart();
        setCartOpen(false);
        setSubmitted(false);
      }, 2000);
    }, 2000);
  };

  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-white/10 z-[2001] flex flex-col"
          >
            <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-display uppercase leading-none">Your_Archive</h2>
                <p className="font-mono text-[10px] text-accent mt-2 uppercase tracking-widest">
                  {cart.length} Artifacts_Secured
                </p>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  playBlip("mid");
                }}
                className="p-2 hover:text-accent transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-12 h-12 text-white/10 mb-4" />
                  <p className="font-mono text-sm text-dim uppercase tracking-widest">
                    Archive_Is_Empty
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      playBlip("low");
                    }}
                    className="mt-8 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
                  >
                    Return_To_Manifesto
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-surface border border-white/10 overflow-hidden flex-shrink-0 grayscale relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold uppercase leading-tight">{item.title}</h3>
                          <button
                            onClick={() => {
                              removeItem(item.id);
                              playBlip("low");
                            }}
                            className="text-dim hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-mono text-[10px] text-dim uppercase mt-1">
                          REF: {item.id}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-white/10 px-2 py-1 gap-4">
                          <button 
                            className="hover:text-accent transition-colors"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity - 1);
                              playBlip("mid");
                            }}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs">{item.quantity}</span>
                          <button 
                            className="hover:text-accent transition-colors"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity + 1);
                              playBlip("high");
                            }}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-mono text-accent text-sm font-bold">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-surface/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs uppercase text-dim">Total_Value</span>
                  <span className="text-2xl font-bold text-accent">{total.toFixed(2)} USD</span>
                </div>
                {submitted ? (
                  <div className="w-full border border-accent p-5 font-mono text-accent text-[11px] text-center uppercase tracking-widest">
                    ORDER_PROCESSED // DISPATCH_INITIATED
                  </div>
                ) : (
                  <button 
                    disabled={isProcessing}
                    onClick={handleCheckout}
                    style={{ backgroundColor: '#C8FF00' }}
                    className="w-full text-black font-mono font-bold py-5 uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed relative z-50"
                  >
                    {isProcessing ? "PROCESSING_PAYMENT..." : "Initiate_Checkout_Protocol"}
                  </button>
                )}
                <p className="text-center font-mono text-[9px] text-dim mt-4 uppercase tracking-tighter">
                  Secure encrypted transmission // Tier 1 Logistics
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
