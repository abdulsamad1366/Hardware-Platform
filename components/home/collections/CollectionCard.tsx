"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Collection } from "@/data/collections";

interface CollectionCardProps {
  collection: Collection;
  index: number;
}

export default function CollectionCard({ collection, index }: CollectionCardProps) {
  // Determine layout grid span on desktop based on index to achieve the masonry effect:
  // Row 1: Locks (wide, col-span-2) + Glass Hardware (narrow, col-span-1)
  // Row 2: Smart Locks (narrow, col-span-1) + Builder Hardware (wide, col-span-2)
  // Row 3: Furniture Hardware (wide, col-span-2) + Door Hardware (narrow, col-span-1)
  const getGridSpan = (idx: number) => {
    switch (idx) {
      case 0: // Locks
        return "lg:col-span-2 md:col-span-1 col-span-1";
      case 1: // Glass Hardware
        return "lg:col-span-1 md:col-span-1 col-span-1";
      case 2: // Smart Locks
        return "lg:col-span-1 md:col-span-1 col-span-1";
      case 3: // Builder Hardware
        return "lg:col-span-2 md:col-span-1 col-span-1";
      case 4: // Furniture Hardware
        return "lg:col-span-2 md:col-span-1 col-span-1";
      case 5: // Door Hardware
        return "lg:col-span-1 md:col-span-1 col-span-1";
      default:
        return "col-span-1";
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] } 
    },
    hover: {
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.5), 0 0 25px rgba(212, 160, 23, 0.2)",
      transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`${getGridSpan(index)} relative overflow-hidden rounded-[24px] bg-slate-900 border border-white/5 h-[380px] sm:h-[420px] lg:h-[460px] cursor-pointer`}
      whileHover="hover"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link href={collection.href} className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-8 lg:p-10 select-none">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            variants={{
              hidden: { scale: 1 },
              visible: { scale: 1 },
              hover: { scale: 1.08 }
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }}
          >
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
              priority={index < 2}
            />
          </motion.div>

          {/* Dark Navy Gradient Overlay (becomes slightly lighter on hover) */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-[#0F172A]/10"
            variants={{
              hidden: { opacity: 1 },
              visible: { opacity: 1 },
              hover: { opacity: 0.85 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>

        {/* Ambient Gold Border Fade (appears on hover) */}
        <motion.div 
          className="absolute inset-0 rounded-[24px] border border-accent pointer-events-none z-30"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0 },
            hover: { opacity: 0.6 }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Card Content */}
        <div className="relative z-20 space-y-4 max-w-xl">
          
          {/* Header Info */}
          <div className="flex flex-col gap-1.5">
            {/* Product Count Badge */}
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-accent uppercase font-sans">
              {collection.productCount}
            </span>
            
            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none transition-colors duration-300 group-hover:text-accent">
              {collection.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed font-sans line-clamp-2">
            {collection.description}
          </p>

          {/* CTA Link */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-accent font-extrabold pt-2">
            <span>Explore Collection</span>
            <motion.span
              variants={{
                hidden: { x: 0 },
                visible: { x: 0 },
                hover: { x: 6 }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </div>

        </div>

      </Link>
    </motion.div>
  );
}
