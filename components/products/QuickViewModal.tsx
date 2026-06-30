"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ArrowRight, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [isThrottled, setIsThrottled] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isThrottled) return;

    setIsThrottled(true);
    setTimeout(() => setIsThrottled(false), 500);

    addToCart(product);

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
            aria-label="Close details modal"
          >
            <X size={20} />
          </button>

          {/* Left Side: Image */}
          <div className="relative w-full md:w-1/2 bg-slate-50 aspect-[4/3] md:aspect-auto md:min-h-[450px] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100">
            <div className="relative w-full h-full min-h-[250px] md:min-h-[350px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-w-768px) 100vw, 400px"
              />
            </div>
            <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md text-[10px] font-extrabold tracking-widest text-accent px-3 py-1 rounded-full uppercase">
              {product.category}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto md:max-h-[600px] scrollbar-none">
            <div className="space-y-6">
              {/* Product SKU and Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono text-slate-400 font-bold uppercase tracking-wider">
                  SKU: {product.code}
                </span>
                
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={14} className="fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">/ 5.0</span>
                </div>
              </div>

              {/* Title & Pricing */}
              <div>
                <h3 className="text-2xl font-extrabold text-primary tracking-tight leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-extrabold text-slate-900 font-mono">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    / Unit (Est.)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed font-sans font-normal">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  Technical Specifications
                </h4>
                <div className="border border-slate-100 rounded-xl overflow-hidden text-xs font-sans">
                  <div className="divide-y divide-slate-100 bg-slate-50">
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider col-span-1">Material</span>
                      <span className="font-semibold text-slate-700 col-span-2">{product.material}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider col-span-1">Finish</span>
                      <span className="font-semibold text-slate-700 col-span-2">{product.finish}</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider col-span-1">Application</span>
                      <span className="font-semibold text-slate-700 col-span-2">{product.application} Use</span>
                    </div>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 p-3">
                        <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider col-span-1">{key}</span>
                        <span className="font-semibold text-slate-700 col-span-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 mt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              {product.datasheet ? (
                <a
                  href={product.datasheet}
                  download
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900 text-sm font-bold transition-all duration-300 text-center select-none"
                >
                  <FileText size={16} />
                  <span>Datasheet</span>
                </a>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-100 text-slate-300 text-sm font-bold transition-all duration-300 text-center select-none cursor-not-allowed"
                >
                  <FileText size={16} />
                  <span>No Datasheet</span>
                </button>
              )}

              <motion.button
                onClick={handleAddToCart}
                disabled={isThrottled}
                whileHover={{ y: -2 }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent hover:bg-[#c49015] active:scale-[0.98] text-primary font-extrabold text-sm transition-all duration-200 shadow-sm hover:shadow shadow-accent/15 cursor-pointer text-center select-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdded ? (
                  <span className="font-extrabold text-sm mr-1">✓</span>
                ) : (
                  <ShoppingCart size={16} />
                )}
                <span>{isAdded ? "Added" : "Add to Cart"}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default QuickViewModal;
