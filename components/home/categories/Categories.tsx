"use client";

import Link from "next/link";
import Container from "@/components/layout/container";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/categories";
import Button from "@/components/common/button";

export default function Categories() {
  return (
    <section className="py-20 lg:py-24 bg-gray-bg border-b border-slate-200/60">
      <Container>
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs text-accent uppercase font-bold tracking-widest bg-accent/5 border border-accent/20 px-3 py-1 rounded-full">
            <span>SecureLink Catalog</span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Explore Product Categories
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto mt-4" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Discover premium hardware collections for residential, commercial, industrial and architectural projects.
          </p>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="flex justify-center pt-12 sm:pt-16">
          <Link href="/products" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg">
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-primary hover:border-accent font-extrabold px-8 py-4 h-12 shadow-soft hover:shadow-md transition-all duration-300"
            >
              View All Categories
            </Button>
          </Link>
        </div>

      </Container>
    </section>
  );
}
