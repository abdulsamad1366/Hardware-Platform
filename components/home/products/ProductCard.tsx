"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/rfq?product=${encodeURIComponent(product.name)}&code=${encodeURIComponent(product.code)}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { duration: 0.3 } 
    },
    hover: {
      y: -6,
      boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 15px rgba(212, 160, 23, 0.12)",
      borderColor: "rgba(212, 160, 23, 0.4)",
      transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }
    }
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      className="group bg-white border border-slate-200/80 rounded-[24px] overflow-hidden flex flex-col h-full shadow-sm transition-colors duration-300"
    >
      <Link href={product.href} className="flex flex-col flex-grow select-none">
        
        {/* Product Image Container */}
        <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden border-b border-slate-100">
          <motion.div
            className="w-full h-full relative"
            variants={{
              hover: { scale: 1.08 }
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-w-768px) 100vw, (max-w-1200px) 25vw, 20vw"
            />
          </motion.div>

          {/* Elegant Floating Category Badge */}
          <div className="absolute top-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md text-[9px] font-extrabold tracking-widest text-accent px-3 py-1 rounded-full uppercase shadow-sm">
            {product.category}
          </div>
        </div>

        {/* Product Information */}
        <div className="p-5 flex flex-col flex-grow space-y-4">
          
          <div className="space-y-1">
            {/* Product Code */}
            <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
              Code: {product.code}
            </span>
            {/* Product Title */}
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1 group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h3>
          </div>

          {/* Specifications List */}
          <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-100 text-xs text-slate-600 font-sans">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Material</span>
              <span className="font-semibold text-slate-700 truncate max-w-[150px]">{product.material}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Finish</span>
              <span className="font-semibold text-slate-700 truncate max-w-[150px]">{product.finish}</span>
            </div>
          </div>

        </div>
      </Link>

      {/* Action Buttons Footer */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-3 mt-auto">
        <Link 
          href={product.href} 
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all duration-300 text-center"
        >
          <span>View Details</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
        </Link>
        <button
          onClick={handleRequestQuote}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-accent hover:bg-amber-600 active:scale-[0.98] text-primary font-extrabold text-xs transition-all duration-300 shadow-sm hover:shadow shadow-accent/10 cursor-pointer"
        >
          <FileText size={13} />
          <span>Request Quote</span>
        </button>
      </div>

    </motion.div>
  );
}
