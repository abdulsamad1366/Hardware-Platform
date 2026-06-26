"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Shield, Download, Star, Award, Settings, Send, Search, ChevronDown } from "lucide-react";
import Container from "@/components/layout/container";
import InfiniteMarquee from "@/components/home/marquee/InfiniteMarquee";
import Categories from "@/components/home/categories/Categories";
import FeaturedCollections from "@/components/home/collections/FeaturedCollections";
import FeaturedProducts from "@/components/home/products/FeaturedProducts";
import ManufacturingExcellence from "@/components/home/manufacturing/ManufacturingExcellence";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentSlide, setCurrentSlide] = useState(0);

  const backgroundImages = [
    "/images/hero-bg.png",
    "/images/hero-handle.png",
    "/images/hero-smartlock.png",
    "/images/hero-hinge.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/products?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`
    );
  };

  const trendingQueries = ["Locks", "Door Handles", "Hinges", "Smart Locks", "Door Closers", "Glass Fittings"];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[90vh] min-h-[550px] lg:min-h-[620px] flex items-center overflow-hidden bg-primary text-white border-b border-slate-800/50">
          
          {/* Background Image Slideshow Layer with Zoom Animation */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {backgroundImages.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`SecureLink B2B Hardware Lifestyle Collection Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover animate-bg-zoom brightness-[0.80]"
                  sizes="100vw"
                />
              </div>
            ))}
            {/* Overlay Gradient Layers */}
            <div className="absolute inset-0 bg-[#0F172A]/60 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent z-0" />
          </div>

          <Container className="relative z-10 w-full h-full flex flex-col justify-between py-10 lg:py-16">
            
            {/* Center Content: Badge, Headings & Search */}
            <div className="flex-grow flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full space-y-6 sm:space-y-8 my-auto">
              
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/95 text-[10px] sm:text-xs font-semibold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Shield className="w-3.5 h-3.5 text-accent fill-accent/20" />
                <span>SECURELINK B2B HARDWARE PLATFORM</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-600">
                  Discover Premium Hardware<br />for Every Project
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
                  Search thousands of hardware products, manufacturers and industrial solutions from one trusted platform.
                </p>
              </div>

              {/* Glassmorphic Search Bar */}
              <form 
                onSubmit={handleSearch}
                className="w-full max-w-[900px] bg-slate-950/60 backdrop-blur-lg border border-white/15 p-2.5 sm:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-800"
              >
                {/* Search Input */}
                <div className="relative flex-1 w-full flex items-center">
                  <Search className="absolute left-4 text-slate-400 w-5 h-5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Locks, Door Handles, Hinges, Smart Locks..."
                    className="w-full bg-slate-900/40 text-white placeholder-slate-400 border border-slate-800/80 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Dropdown Select */}
                <div className="relative w-full md:w-[220px] shrink-0">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-slate-900/40 text-white border border-slate-800/80 focus:border-accent/50 focus:ring-1 focus:ring-accent/30 rounded-xl py-3.5 pl-4 pr-10 text-sm focus:outline-none transition-all duration-300 cursor-pointer [&>option]:bg-slate-950 [&>option]:text-white"
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Locks">Locks</option>
                    <option value="Door Hardware">Door Hardware</option>
                    <option value="Glass Hardware">Glass Hardware</option>
                    <option value="Furniture Hardware">Furniture Hardware</option>
                    <option value="Bathroom Accessories">Bathroom Accessories</option>
                    <option value="Builder Hardware">Builder Hardware</option>
                    <option value="Fasteners">Fasteners</option>
                    <option value="Smart Locks">Smart Locks</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto px-7 py-3.5 bg-accent hover:bg-amber-600 active:scale-[0.98] text-primary font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-accent/15 cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Search size={16} />
                  <span>Search</span>
                </button>
              </form>

              {/* Trending Searches Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-6 duration-900">
                <span className="text-slate-400 font-medium mr-1.5">Trending Searches:</span>
                {trendingQueries.map((query) => (
                  <button
                    key={query}
                    type="button"
                    onClick={() => setSearchQuery(query)}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 text-slate-200 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {query}
                  </button>
                ))}
              </div>

            </div>

            {/* Trust Statistics: Responsive Horizontal Scroll on Mobile, Flex on Desktop */}
            <div className="w-full pt-8 md:pt-12 mt-auto animate-in fade-in duration-1000">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 px-4 -mx-4 md:mx-0 md:px-0 md:justify-center">
                
                {/* Stat Card 1 */}
                <div className="snap-center shrink-0 w-[150px] sm:w-[170px] bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-soft hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-accent">50+</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider mt-1">Product Categories</div>
                </div>

                {/* Stat Card 2 */}
                <div className="snap-center shrink-0 w-[150px] sm:w-[170px] bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-soft hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-accent">5,000+</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider mt-1 font-sans">Products Catalogued</div>
                </div>

                {/* Stat Card 3 */}
                <div className="snap-center shrink-0 w-[150px] sm:w-[170px] bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-soft hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-accent">1,000+</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider mt-1">Partner Dealers</div>
                </div>

                {/* Stat Card 4 */}
                <div className="snap-center shrink-0 w-[150px] sm:w-[170px] bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-soft hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-accent">OEM</div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider mt-1">Manufacturing Services</div>
                </div>

              </div>
            </div>

          </Container>
        </section>

        {/* Infinite Hardware Marquee */}
        <InfiniteMarquee />

        {/* Browse Categories Section */}
        <Categories />

        {/* Featured Collections Section */}
        <FeaturedCollections />

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Manufacturing Excellence Section */}
        <ManufacturingExcellence />

        {/* Feature Highlights */}
        <section className="py-24 bg-gray-bg px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Engineered for High-Performance Environments
              </h2>
              <p className="text-slate-600">
                Our products meet rigorous quality benchmarks, delivering durability and architectural integrity for commercial projects.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 text-accent">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Certified Quality</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every category is rigorously tested for load cycles, corrosion resistance, and high-frequency commercial usage.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 text-accent">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Premium Materials</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Forged from high-grade stainless steel, brass, and alloys to match contemporary architectural aesthetics.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 text-accent">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">B2B Customization</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Custom sizes, finishes, and manufacturing configurations available for wholesale ordering and contractors.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
