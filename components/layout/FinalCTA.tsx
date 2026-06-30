"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Container from "./container/Container";

export function FinalCTA() {
  const pathname = usePathname();

  // Hide on contact and RFQ pages to prevent layout noise and redundant CTAs
  const hideCTA = pathname === "/contact" || pathname === "/rfq";
  if (hideCTA) return null;

  const trustItems = [
    "Bulk Orders Welcome",
    "OEM Manufacturing",
    "PAN India Delivery",
    "Export Support",
  ];

  // Collage items configuration for floating cards
  const collageItems = [
    {
      id: "glass-fitting",
      name: "Glass Fitting",
      image: "/images/cat-glass.png",
      category: "Glass Hardware",
      className: "top-4 left-12 w-36 h-48 z-10 -rotate-12 hover:z-40",
      y: [0, -8, 0],
      duration: 6,
      delay: 0,
    },
    {
      id: "smart-lock",
      name: "Smart Lock",
      image: "/images/hero-smartlock.png",
      category: "Smart Locks",
      className: "top-8 right-8 w-40 h-52 z-20 rotate-3 hover:z-40",
      y: [0, -12, 0],
      duration: 7,
      delay: 0.5,
    },
    {
      id: "door-handle",
      name: "Door Handle",
      image: "/images/hero-handle.png",
      category: "Door Hardware",
      className: "bottom-4 left-6 w-40 h-52 z-30 -rotate-6 hover:z-40",
      y: [0, -10, 0],
      duration: 5.5,
      delay: 1,
    },
    {
      id: "mortise-lock",
      name: "Mortise Lock",
      image: "/images/product-locks.png",
      category: "Locks",
      className: "bottom-8 right-12 w-36 h-48 z-15 rotate-6 hover:z-40",
      y: [0, -14, 0],
      duration: 8,
      delay: 1.5,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-primary py-24 lg:py-32 group border-t border-slate-900">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),#020617)] z-0" />

      {/* Tiny gold dot pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      {/* Very soft gold glows reacting to hover */}
      <div className="absolute right-[-10%] top-[-20%] w-[550px] h-[550px] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0 transition-transform duration-[1200ms] ease-out group-hover:scale-115 group-hover:bg-accent/10" />
      <div className="absolute left-[-10%] bottom-[-20%] w-[450px] h-[450px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none z-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110" />

      <Container className="relative z-10 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Column */}
          <div className="space-y-8 lg:col-span-7 max-w-2xl lg:max-w-none">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold uppercase tracking-widest select-none">
              <span>Get Started</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Ready to Source Premium Hardware?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
                Whether you're a dealer, architect, builder or contractor, our team can help you discover the right products, provide quotations, OEM manufacturing support, and bulk purchasing assistance.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/rfq" 
                className="w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-xl"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-amber-600 text-primary font-extrabold text-base rounded-xl transition-all duration-300 shadow-lg shadow-accent/15 cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
              
              <Link 
                href="/products" 
                className="w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-xl"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white hover:bg-white hover:text-primary text-white font-extrabold text-base rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <span>Browse Products</span>
                </motion.button>
              </Link>
            </div>

            {/* Trust Row */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 font-semibold font-sans">
                    <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 border border-accent/25">
                      <Check size={12} className="text-accent" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collage Column */}
          <div className="relative w-full h-[450px] lg:h-[500px] hidden md:block lg:col-span-5 select-none overflow-visible">
            {collageItems.map((card) => (
              <motion.div
                key={card.id}
                animate={{ y: card.y }}
                transition={{
                  duration: card.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: card.delay,
                }}
                whileHover={{ y: -8, scale: 1.05, rotate: 0 }}
                className={`absolute ${card.className} group/card flex flex-col bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-2.5 shadow-2xl transition-all duration-500 ease-out hover:border-accent/40 hover:shadow-[0_20px_45px_-10px_rgba(212,160,23,0.15)] cursor-pointer`}
              >
                {/* Product Image Wrapper */}
                <div className="relative w-full flex-grow bg-slate-900/40 rounded-xl overflow-hidden border border-white/5 aspect-[4/3] flex items-center justify-center">
                  <Image 
                    src={card.image} 
                    alt={card.name} 
                    fill 
                    className="object-contain p-2 group-hover/card:scale-108 transition-transform duration-500" 
                    sizes="(max-w-768px) 100vw, 200px"
                  />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-[8px] font-extrabold tracking-widest text-accent px-2 py-0.5 rounded-full uppercase">
                    {card.category}
                  </div>
                </div>
                {/* Product Label */}
                <div className="mt-2.5 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    {card.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

export default FinalCTA;
