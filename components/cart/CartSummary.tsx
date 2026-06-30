"use client";

import React from "react";
import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface CartSummaryProps {
  onClose: () => void;
}

export function CartSummary({ onClose }: CartSummaryProps) {
  const { cartItems, subtotal, cartCount } = useCart();
  const { isAuthenticated } = useAuth();

  const getCheckoutLink = () => {
    if (cartItems.length === 0) return "/rfq";
    const codes = cartItems.map((item) => item.sku).join(", ");
    const names = cartItems.map((item) => `${item.name} (Qty: ${item.quantity})`).join(", ");
    const checkoutPath = `/rfq?product=${encodeURIComponent(names)}&code=${encodeURIComponent(codes)}`;
    
    if (isAuthenticated) {
      return checkoutPath;
    } else {
      return `/login?redirect=${encodeURIComponent(checkoutPath)}`;
    }
  };

  return (
    <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4 font-sans select-none">
      {/* Dynamic Summary Values */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-405 uppercase tracking-widest font-mono">
          <span>Selected Items</span>
          <span className="text-slate-800 font-extrabold">{cartCount}</span>
        </div>
        <div className="flex items-baseline justify-between border-t border-slate-200/40 pt-3">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">
            Est. Subtotal
          </span>
          <span className="text-2xl font-extrabold text-primary font-mono tracking-tight">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Indicative pricing info card */}
      <div className="bg-[#DAA017]/5 border border-[#DAA017]/15 rounded-2xl p-3.5 flex gap-2.5 items-start">
        <Info size={14} className="text-accent shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-550 leading-relaxed font-sans font-medium">
          Prices are indicative. Final quotation including custom shipping, OEM logistics, and quantity discounts will be shared by our sales specialists.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1.5">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onClose}
          className="py-3 px-4 text-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all cursor-pointer border border-slate-200/80 shadow-sm"
        >
          Continue Shopping
        </motion.button>

        <Link
          href={getCheckoutLink()}
          onClick={onClose}
          className="focus:outline-none rounded-xl"
        >
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 px-4 text-center text-xs font-extrabold bg-accent hover:bg-[#c49015] text-primary rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-accent/10 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Proceed</span>
            <ArrowRight size={13} className="stroke-[2.5]" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;
