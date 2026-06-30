"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem as CartItemType } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export function CartItem({ item, onRemove, onIncrease, onDecrease }: CartItemProps) {
  // Animation variants for staggered listing item
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 25 }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="py-4.5 first:pt-0 flex gap-4 select-none font-sans"
    >
      {/* Item Image with micro-hover scale */}
      <div className="relative w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center group/img">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-2 group-hover/img:scale-106 transition-transform duration-300"
          sizes="80px"
        />
      </div>

      {/* Item details */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between gap-3">
            <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">
              {item.name}
            </h4>
            <span className="text-xs font-extrabold text-primary font-mono shrink-0">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
              SKU: {item.sku}
            </span>
            <span className="text-slate-300 text-[8px]">•</span>
            {/* Category badge */}
            <span className="inline-block text-[8px] font-extrabold tracking-wider bg-slate-100 text-slate-500 uppercase px-1.5 py-0.5 rounded">
              {item.category}
            </span>
          </div>
        </div>

        {/* Quantity selectors and delete actions */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center border border-slate-200/80 rounded-lg p-0.5 bg-slate-50">
            {/* Decrement Button (clamped at 1) */}
            <button
              onClick={() => item.quantity > 1 && onDecrease(item.id)}
              disabled={item.quantity <= 1}
              className={`p-1 rounded transition-colors ${
                item.quantity <= 1 
                  ? "text-slate-350 cursor-not-allowed opacity-40" 
                  : "text-slate-400 hover:text-slate-700 hover:bg-white"
              }`}
              title="Decrease Quantity (Min 1)"
              aria-label="Decrease quantity"
            >
              <Minus size={11} className="stroke-[2.5]" />
            </button>
            
            <span className="px-2.5 text-xs font-extrabold text-slate-800 min-w-[20px] text-center font-mono">
              {item.quantity}
            </span>

            {/* Increment Button */}
            <button
              onClick={() => onIncrease(item.id)}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors cursor-pointer"
              title="Increase Quantity"
              aria-label="Increase quantity"
            >
              <Plus size={11} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Remove/Delete button */}
          <button
            onClick={() => onRemove(item.id)}
            className="p-1.5 rounded-lg text-slate-450 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CartItem;
