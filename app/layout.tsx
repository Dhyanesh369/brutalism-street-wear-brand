import type { Metadata } from "next";
import { Inter, Bebas_Neue, Space_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/lib/context/CartContext";
import { SystemAudioProvider } from "@/lib/context/SystemAudioContext";
import Cart from "@/components/vorn/Cart";
import Navbar from "@/components/vorn/Navbar";
import Footer from "@/components/vorn/Footer";
import SystemConsole from "@/components/vorn/SystemConsole";
import CustomCursor from "@/components/vorn/CustomCursor";
import PageTransition from "@/components/vorn/PageTransition";
import ParticleBackground from "@/components/vorn/ParticleBackground";
import SectorStatus from "@/components/vorn/SectorStatus";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "VORN | Built in the Dark",
  description: "Industrial streetwear artifacts. Documenting the undercurrent. Engineered for endurance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth antialiased ${inter.variable} ${bebas.variable} ${spaceMono.variable}`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <CartProvider>
          <SystemAudioProvider>
            <div className="noise-overlay" />
            <ParticleBackground />
            <CustomCursor />
            <SectorStatus />
            <Cart />
            <SystemConsole />
            <Navbar />
            <main className="flex-1">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
          </SystemAudioProvider>
        </CartProvider>
      </body>
    </html>
  );
}
