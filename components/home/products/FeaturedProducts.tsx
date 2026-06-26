"use client";

import { useState } from "react";
import Container from "@/components/layout/container";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import Button from "@/components/common/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "All",
  "Locks",
  "Door Hardware",
  "Glass Hardware",
  "Smart Locks",
  "Builder Hardware",
  "Furniture Hardware"
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 lg:py-28 bg-slate-50 text-slate-900 border-b border-slate-200/50 overflow-hidden">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs text-accent uppercase font-bold tracking-widest bg-accent/5 border border-accent/20 px-3.5 py-1.5 rounded-full">
            <span>Featured Products</span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Premium Hardware Catalogue
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Explore our curated showcase of elite architectural hardware and electronic security products, designed to satisfy demanding commercial and residential specifications.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 sm:px-5 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-300 z-10 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                  isActive 
                    ? "text-[#0F172A]" 
                    : "text-slate-500 hover:text-slate-900 bg-white border border-slate-200/60 shadow-sm"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProductPill"
                    className="absolute inset-0 bg-accent rounded-full -z-10 shadow-sm shadow-accent/15 border border-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Product Grid with Smooth Layout Morphing */}
        <div className="min-h-[400px]">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-slate-400 text-sm font-sans"
            >
              No products found in this category.
            </motion.div>
          )}
        </div>

        {/* Centered Bottom CTA Catalogue Button */}
        <div className="flex justify-center pt-16 sm:pt-20">
          <Link href="/products" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg">
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-primary hover:border-accent font-extrabold px-8 py-4 h-12 shadow-soft hover:shadow-md transition-all duration-300"
            >
              View Complete Catalogue
            </Button>
          </Link>
        </div>

      </Container>
    </section>
  );
}
