"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { EmptyCart } from "./EmptyCart";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartCount,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // ESC Close Handler
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Focus Trap Handler
  useEffect(() => {
    if (!isCartOpen) return;

    // Small delay to allow drawer to transition and elements to mount
    const timer = setTimeout(() => {
      const focusableElements = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      firstElement.focus();

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      window.addEventListener("keydown", handleTabKey);
      return () => window.removeEventListener("keydown", handleTabKey);
    }, 100);

    return () => clearTimeout(timer);
  }, [isCartOpen]);

  // Animation variants for staggered cart items
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay with Fade transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Sidebar Container */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[380px] md:w-[420px] bg-white border-l border-slate-100 shadow-2xl z-[101] flex flex-col font-sans h-screen"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart Drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <ShoppingCart size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-primary uppercase tracking-tight">
                    Shopping Cart
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    You have {cartItems.length} selected {cartItems.length === 1 ? "product" : "products"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-slate-450 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50"
                aria-label="Close cart drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Items Panel */}
            <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
              {cartItems.length === 0 ? (
                <EmptyCart onClose={() => setIsCartOpen(false)} />
              ) : (
                <motion.div
                  variants={listContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-slate-100"
                >
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={removeFromCart}
                      onIncrease={increaseQuantity}
                      onDecrease={decreaseQuantity}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer Summary (Sticky at bottom, hidden if empty) */}
            {cartItems.length > 0 && (
              <CartSummary onClose={() => setIsCartOpen(false)} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
