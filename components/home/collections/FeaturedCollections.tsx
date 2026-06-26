"use client";

import Container from "@/components/layout/container";
import CollectionCard from "./CollectionCard";
import { collections } from "@/data/collections";
import { motion } from "framer-motion";

export default function FeaturedCollections() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="py-24 lg:py-28 bg-[#0F172A] text-white border-b border-slate-800/40">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs text-accent uppercase font-bold tracking-widest bg-accent/5 border border-accent/20 px-3.5 py-1.5 rounded-full">
            <span>Featured Collections</span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Discover Complete Hardware Collections
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
          </div>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Browse premium product collections designed for architects, builders, contractors and hardware distributors.
          </p>
        </div>

        {/* Collections Masonry-Style Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {collections.map((collection, index) => (
            <CollectionCard 
              key={collection.id} 
              collection={collection} 
              index={index} 
            />
          ))}
        </motion.div>

      </Container>
    </section>
  );
}
