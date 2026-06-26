"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(category.name)}`}
      className="group relative block overflow-hidden rounded-2xl bg-slate-900 border border-transparent hover:border-accent shadow-md hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.4),0_0_20px_rgba(212,160,23,0.15)] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] aspect-[4/5] translate-y-0 hover:-translate-y-2.5"
    >
      {/* Product Count Badge (Top-Right Floating) */}
      <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full border border-white/10 bg-[#0F172A]/70 backdrop-blur-md text-[9px] font-extrabold tracking-widest text-white uppercase shadow-md select-none transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-105 group-hover:border-accent/40 group-hover:bg-[#0F172A]/85">
        {category.productCount}
      </div>

      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-[1.08] transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
          sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
        />
        {/* Dark Gradient Overlay (becomes slightly lighter on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-end p-5 text-left space-y-3">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-accent">
          {category.name}
        </h3>

        {/* Subcategories List */}
        <ul className="space-y-1.5 text-xs text-slate-300 font-medium" role="list">
          {category.subcategories.slice(0, 3).map((sub) => (
            <li key={sub} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              <span className="truncate">{sub}</span>
            </li>
          ))}
        </ul>

        {/* Action Link (Explore Collection) */}
        <div className="flex items-center gap-1.5 text-xs text-accent font-semibold pt-1">
          <span>Explore Collection</span>
          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}
