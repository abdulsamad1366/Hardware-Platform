"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Grid, List, ArrowRight, ChevronRight, 
  Download, Share2, Clipboard, ChevronLeft, 
  Star, Eye, Check, Trash2, ShoppingCart, HelpCircle, X
} from "lucide-react";
import Container from "../layout/container/Container";
import { products, Product } from "@/data/products";
import QuickViewModal from "./QuickViewModal";
import { useCart } from "@/context/CartContext";

const CATEGORIES = [
  "All",
  "Locks",
  "Door Hardware",
  "Glass Hardware",
  "Furniture Hardware",
  "Smart Locks",
  "Builder Hardware",
  "Fasteners",
  "Bathroom Accessories"
];

const MATERIALS = [
  "All",
  "Solid Brass",
  "Stainless Steel 316",
  "Stainless Steel 304",
  "Zinc Alloy",
  "High-Tensile Steel",
  "Cast Aluminium",
  "Aluminium & Stainless Steel"
];

const FINISHES = [
  "All",
  "Satin Brass",
  "Matte Gold Anodized",
  "Matte Black",
  "Obsidian Black",
  "Space Grey",
  "Satin Nickel",
  "Brushed Bronze",
  "Silver Lacquered",
  "Brushed Stainless Steel",
  "Polished Chrome",
  "Satin Chrome",
  "Zinc Plated"
];

const APPLICATIONS = ["All", "Commercial", "Residential", "Both"];

export default function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [selectedFinish, setSelectedFinish] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Cart Basket & Modal States
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [throttledButtons, setThrottledButtons] = useState<Record<string, boolean>>({});
  const [addedProducts, setAddedProducts] = useState<Record<string, boolean>>({});

  const itemsPerPage = 8;

  // Handle Toast Notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync state from query parameters on mount or change
  useEffect(() => {
    const catQuery = searchParams.get("category");
    const qQuery = searchParams.get("q");
    if (catQuery) {
      // Find matching category in case of slug formats
      const matched = CATEGORIES.find(c => c.toLowerCase().replace(/\s+/g, "-") === catQuery.toLowerCase() || c.toLowerCase() === catQuery.toLowerCase());
      if (matched) setSelectedCategory(matched);
    }
    if (qQuery) {
      setSearchQuery(qQuery);
    }
  }, [searchParams]);

  // Reset to first page when any filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedMaterial, selectedFinish, selectedApplication, inStockOnly, sortBy]);

  // Filter and Sort Logic
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => 
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Material
    if (selectedMaterial !== "All") {
      result = result.filter(p => p.material === selectedMaterial);
    }

    // Finish
    if (selectedFinish !== "All") {
      result = result.filter(p => p.finish === selectedFinish);
    }

    // Application
    if (selectedApplication !== "All") {
      result = result.filter(
        p => p.application === selectedApplication || p.application === "Both"
      );
    }

    // Sorting
    if (sortBy === "newest") {
      result.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
    } else if (sortBy === "popular") {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "az") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "za") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedMaterial, selectedFinish, selectedApplication, sortBy]);

  // Paginated Products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (throttledButtons[product.id]) return;
    
    setThrottledButtons(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setThrottledButtons(prev => ({ ...prev, [product.id]: false }));
    }, 500);

    addToCart(product);

    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const handleShareProduct = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${product.href}`;
      navigator.clipboard.writeText(shareUrl).then(
        () => triggerToast("Product link copied to clipboard!"),
        () => triggerToast("Failed to copy link.")
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col pt-16">
      
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xl border border-white/10 flex items-center gap-2"
          >
            <Check size={14} className="text-accent" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Hero */}
      <section className="bg-slate-50/50 border-b border-slate-100 py-16 lg:py-20 overflow-hidden">
        <Container className="max-w-[1280px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-8 select-none">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={10} className="text-slate-300" />
            <span className="text-slate-600">Products</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[10px] font-extrabold uppercase tracking-widest select-none">
                <span>Product Catalogue</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight leading-tight">
                Discover Premium <br />Hardware Products
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-xl">
                Browse our extensive collection of architectural hardware, door fittings, smart locks, and industrial components engineered for durability and aesthetics.
              </p>

              {/* In-Hero Search Bar */}
              <div className="relative max-w-lg shadow-sm border border-slate-200 bg-white rounded-2xl flex items-center p-1.5 gap-2 group-focus-within:border-accent">
                <Search size={18} className="text-slate-400 ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product name, SKU code, material..."
                  className="w-full text-slate-800 text-sm bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-slate-400 py-2.5 pr-4"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors mr-2 cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Collage Display */}
            <div className="lg:col-span-5 relative w-full h-[320px] max-w-[450px] mx-auto hidden lg:block select-none overflow-visible">
              
              {/* Card 1: Smart Lock */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 right-4 w-44 h-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-10 rotate-6"
              >
                <div className="relative w-full h-full bg-slate-50 rounded-xl overflow-hidden">
                  <Image 
                    src="/images/hero-smartlock.png" 
                    alt="Biometric Smart Lock" 
                    fill 
                    className="object-contain p-2" 
                    sizes="200px"
                  />
                </div>
              </motion.div>

              {/* Card 2: Door Handle */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-12 left-4 w-44 h-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-20 -rotate-6 animate-in fade-in"
              >
                <div className="relative w-full h-full bg-slate-50 rounded-xl overflow-hidden">
                  <Image 
                    src="/images/hero-handle.png" 
                    alt="Brushed Gold Lever" 
                    fill 
                    className="object-contain p-2"
                    sizes="200px"
                  />
                </div>
              </motion.div>

              {/* Card 3: Mortise Lock */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 right-16 w-36 h-48 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 z-0 rotate-12"
              >
                <div className="relative w-full h-full bg-slate-50 rounded-xl overflow-hidden">
                  <Image 
                    src="/images/product-locks.png" 
                    alt="Classic Mortise Lock" 
                    fill 
                    className="object-contain p-2"
                    sizes="180px"
                  />
                </div>
              </motion.div>
            </div>

          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-4 select-none">
        <Container className="max-w-[1280px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-grow max-w-4xl">
              
              {/* Category selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Category</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.slice(1).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Material Selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Material</span>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-accent cursor-pointer"
                >
                  {MATERIALS.map(m => (
                    <option key={m} value={m}>{m === "All" ? "All Materials" : m}</option>
                  ))}
                </select>
              </div>

              {/* Finish Selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Finish</span>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-accent cursor-pointer"
                >
                  {FINISHES.map(f => (
                    <option key={f} value={f}>{f === "All" ? "All Finishes" : f}</option>
                  ))}
                </select>
              </div>

              {/* Application Selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Application</span>
                <select
                  value={selectedApplication}
                  onChange={(e) => setSelectedApplication(e.target.value)}
                  className="bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-accent cursor-pointer"
                >
                  {APPLICATIONS.map(a => (
                    <option key={a} value={a}>{a === "All" ? "All Applications" : `${a} Use`}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Sorting, View Mode & Toggle Grid */}
            <div className="flex items-end justify-between md:justify-end gap-6 pt-2 md:pt-0">
              {/* Sort selector */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 p-2.5 min-w-[130px] focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Popularity</option>
                  <option value="az">Name A-Z</option>
                  <option value="za">Name Z-A</option>
                  <option value="price-asc">Price: Low-High</option>
                  <option value="price-desc">Price: High-Low</option>
                </select>
              </div>

              {/* Layout Switcher buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 h-[38px] mt-auto">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  title="Grid View"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${viewMode === "list" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  title="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Main Grid Content */}
      <section className="py-12 bg-white flex-grow select-none">
        <Container className="max-w-[1280px]">
          <div className="space-y-10">
            
            {/* Category horizontal scroll pills */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                  Browse Categories
                </span>
                <span className="text-xs text-slate-500 font-bold font-sans">
                  Showing {processedProducts.length} {processedProducts.length === 1 ? "Product" : "Products"}
                </span>
              </div>
              
              <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 select-none cursor-pointer border ${
                        isActive
                          ? "bg-accent border-accent text-primary shadow-md shadow-accent/15 scale-102"
                          : "bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:-translate-y-0.5 hover:shadow-sm"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Catalog Grid / List */}
            <div className="min-h-[400px]">
              <motion.div layout className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" : "space-y-6"}>
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                      className="h-full"
                    >
                      {viewMode === "grid" ? (
                        // Grid Card Design
                        <div className="group bg-white border border-slate-100 rounded-3xl p-4 shadow-soft hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden">
                          <div>
                            {/* Card Image Frame */}
                            <div className="relative aspect-[4/3] w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-3 group-hover:scale-106 transition-transform duration-500"
                                sizes="(max-w-768px) 100vw, 250px"
                              />
                              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[8px] font-extrabold tracking-widest text-accent px-2 py-0.5 rounded-full uppercase">
                                {product.category}
                              </div>

                              {/* Hover Quick Actions Overlay */}
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setActiveQuickView(product)}
                                  className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-accent hover:text-primary transition-all duration-300 shadow-md hover:scale-110 cursor-pointer"
                                  title="Quick View"
                                >
                                  <Eye size={15} />
                                </button>
                                <button
                                  onClick={(e) => handleShareProduct(product, e)}
                                  className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-accent hover:text-primary transition-all duration-300 shadow-md hover:scale-110 cursor-pointer"
                                  title="Share Link"
                                >
                                  <Share2 size={15} />
                                </button>
                                <button
                                  onClick={(e) => handleAddToCart(product, e)}
                                  disabled={throttledButtons[product.id]}
                                  className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-accent hover:text-primary transition-all duration-300 shadow-md hover:scale-110 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Add to Cart"
                                >
                                  {addedProducts[product.id] ? (
                                    <span className="font-extrabold text-xs">✓</span>
                                  ) : (
                                    <ShoppingCart size={15} />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Product Info */}
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                                <span>Code: {product.code}</span>
                                <span>{product.application} Use</span>
                              </div>
                              <h3 
                                onClick={() => setActiveQuickView(product)}
                                className="text-base font-extrabold text-slate-900 tracking-tight leading-tight line-clamp-1 hover:text-accent transition-colors duration-300 cursor-pointer"
                              >
                                {product.name}
                              </h3>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                                  <Star size={11} className="fill-current" />
                                  <span>{product.rating}</span>
                                </div>
                                <span className="text-[10px] text-slate-300">|</span>
                                <span className="text-[10px] font-semibold text-slate-500 font-sans truncate max-w-[120px]">{product.material}</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer details and Buttons */}
                          <div className="mt-5 space-y-4">
                            <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Price (Est.)</span>
                              <span className="text-sm font-extrabold text-primary font-mono">₹{product.price.toLocaleString("en-IN")}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => setActiveQuickView(product)}
                                className="px-2 py-2 text-center text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-800 rounded-xl transition-all duration-300 cursor-pointer"
                              >
                                Details
                              </button>
                              <button
                                onClick={(e) => handleAddToCart(product, e)}
                                disabled={throttledButtons[product.id]}
                                className="px-2 py-2 text-center text-xs font-bold bg-accent hover:bg-[#c49015] active:scale-[0.98] text-primary rounded-xl transition-all duration-200 shadow-sm hover:shadow shadow-accent/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 hover:-translate-y-0.5 select-none"
                              >
                                {addedProducts[product.id] ? (
                                  <>
                                    <span className="font-extrabold text-xs">✓</span>
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart size={12} className="flex-shrink-0" />
                                    <span>Add to Cart</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // List Row Design
                        <div className="group bg-white border border-slate-100 rounded-3xl p-5 shadow-soft hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-500 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
                          {/* Image box */}
                          <div className="relative w-full sm:w-48 aspect-[4/3] sm:aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-3 group-hover:scale-106 transition-transform duration-500"
                              sizes="200px"
                            />
                            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[8px] font-extrabold tracking-widest text-accent px-2 py-0.5 rounded-full uppercase">
                              {product.category}
                            </div>
                          </div>

                          {/* Info Description */}
                          <div className="flex-grow space-y-3 text-center sm:text-left">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                              <span>Code: {product.code}</span>
                              <span className="text-slate-200">•</span>
                              <span>{product.application} Use</span>
                              <span className="text-slate-200">•</span>
                              <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                                <Star size={11} className="fill-current" />
                                <span>{product.rating}</span>
                              </div>
                            </div>
                            
                            <h3 
                              onClick={() => setActiveQuickView(product)}
                              className="text-xl font-extrabold text-slate-900 hover:text-accent tracking-tight cursor-pointer transition-colors duration-300"
                            >
                              {product.name}
                            </h3>
                            
                            <p className="text-slate-500 text-xs max-w-xl leading-relaxed font-sans line-clamp-2">
                              {product.description}
                            </p>

                            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Specs:</span>
                              <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-semibold border border-slate-150">{product.material}</span>
                              <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-semibold border border-slate-150">{product.finish}</span>
                            </div>
                          </div>

                          {/* Price & Action columns */}
                          <div className="w-full sm:w-auto sm:border-l border-slate-150 sm:pl-6 flex flex-col justify-center gap-4 text-center sm:text-left flex-shrink-0">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Est. Price</span>
                              <span className="text-xl font-extrabold text-primary font-mono">₹{product.price.toLocaleString("en-IN")}</span>
                            </div>

                            <div className="flex sm:flex-col gap-2">
                              <button
                                onClick={() => setActiveQuickView(product)}
                                className="flex-1 sm:w-36 py-2.5 text-center text-xs font-bold text-slate-700 hover:text-slate-950 border border-slate-200 hover:border-slate-800 rounded-xl transition-all duration-300 cursor-pointer"
                              >
                                View Details
                              </button>
                              <button
                                onClick={(e) => handleAddToCart(product, e)}
                                disabled={throttledButtons[product.id]}
                                className="flex-1 sm:w-36 py-2.5 text-center text-xs font-bold bg-accent hover:bg-[#c49015] active:scale-[0.98] text-primary rounded-xl transition-all duration-200 shadow-sm hover:shadow shadow-accent/15 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 hover:-translate-y-0.5 select-none"
                              >
                                {addedProducts[product.id] ? (
                                  <>
                                    <span className="font-extrabold text-xs">✓</span>
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart size={14} className="flex-shrink-0" />
                                    <span>Add to Cart</span>
                                  </>
                                )}
                              </button>
                            </div>
                            
                            {/* Inline Row actions */}
                            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                              <button 
                                onClick={(e) => handleShareProduct(product, e)}
                                className="hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Share2 size={11} />
                                <span>Share</span>
                              </button>
                              <span>•</span>
                              {product.datasheet ? (
                                <a 
                                  href={product.datasheet} 
                                  download
                                  className="hover:text-slate-800 flex items-center gap-1 transition-colors"
                                >
                                  <Download size={11} />
                                  <span>Datasheet</span>
                                </a>
                              ) : (
                                <span className="text-slate-300 flex items-center gap-1 cursor-not-allowed">
                                  <Download size={11} />
                                  <span>No Sheet</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty state details */}
              {processedProducts.length === 0 && (
                <div className="text-center py-24 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400 border border-slate-100">
                    <HelpCircle size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">No products found</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-sans font-normal">
                    We couldn't find any products matching your active criteria. Try broadening your keywords, clearing filters, or choosing a different category.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setSelectedMaterial("All");
                      setSelectedFinish("All");
                      setSelectedApplication("All");
                      setInStockOnly(false);
                    }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between select-none">
                {/* Previous */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none hover:border-slate-800 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNum = index + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary text-white border border-primary"
                            : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-800"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none hover:border-slate-800 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

          </div>
        </Container>
      </section>



      {/* Quick View modal Overlay */}
      <QuickViewModal
        product={activeQuickView}
        onClose={() => setActiveQuickView(null)}
      />

    </div>
  );
}
