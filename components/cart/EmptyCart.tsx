"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyCartProps {
  onClose: () => void;
}

export function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6 select-none font-sans">
      {/* Premium Animated Icon container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 relative shadow-sm"
      >
        <ShoppingBag size={28} className="stroke-[1.5]" />
        {/* Decorative gold background dot */}
        <div className="absolute top-1/4 right-1/4 w-3.5 h-3.5 bg-accent border-2 border-white rounded-full" />
      </motion.div>

      <div className="space-y-2">
        <h4 className="text-base font-extrabold text-primary uppercase tracking-tight">
          Your cart is empty
        </h4>
        <p className="text-xs text-slate-400 max-w-[260px] mx-auto leading-relaxed font-medium">
          Browse our premium hardware collection to select locks, fittings, and smart accessories.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClose}
        className="px-6 py-3 bg-primary hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer font-sans"
      >
        Browse Products
      </motion.button>
    </div>
  );
}

export default EmptyCart;
