"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Trash2, Plus, Minus, Info, ArrowRight, ArrowLeft, 
  ShoppingBag, Eye, ShieldCheck, Heart 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@/components/layout/container/Container";
import { products, Product } from "@/data/products";
import QuickViewModal from "@/components/products/QuickViewModal";

export default function CartPage() {
  const { 
    cartItems, 
    cartCount, 
    subtotal, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);

  // checkout URL helper
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

  // Get recommended products (filter out items already in the cart, default to first 4)
  const cartIds = new Set(cartItems.map((item) => item.id));
  const recommendedProducts = products
    .filter((product) => !cartIds.has(product.id))
    .slice(0, 4);

  // Fallback to first 4 if cart has all products
  const finalRecommended = recommendedProducts.length > 0 
    ? recommendedProducts 
    : products.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-accent selection:text-primary pt-28 md:pt-36 pb-20">
      <Container className="max-w-[1400px] space-y-12">
        
        {/* Breadcrumbs and Header */}
        <div className="space-y-3">
          <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2 select-none">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900">Selection Cart</span>
          </nav>

          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Selection
            </h1>
            <p className="text-xs text-slate-500 font-medium font-sans">
              Review your selected products before requesting a quotation.
            </p>
          </div>
        </div>

        {/* Main Selection Area */}
        {cartItems.length === 0 ? (
          /* Empty Selection State */
          <div className="bg-white border border-slate-150 rounded-[20px] p-12 sm:p-16 text-center shadow-sm space-y-6 max-w-2xl mx-auto">
            <div className="w-18 h-18 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 mx-auto shadow-sm">
              <ShoppingBag size={24} className="stroke-[1.5]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight text-xs font-mono text-accent">
                Your Selection is Empty
              </h2>
              <p className="text-xs text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                Browse our premium architectural hardware collection and add products to your selection list.
              </p>
            </div>
            <Link href="/products" className="inline-block">
              <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          /* Cart Grid Content (70 / 30) */
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
            
            {/* Left Column: Product Selection Cards (70%) */}
            <div className="lg:col-span-7 space-y-4.5">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-150 rounded-[20px] p-5 shadow-sm flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center hover:shadow-md transition-shadow group"
                >
                  <div className="flex gap-4.5 items-center w-full sm:w-auto">
                    {/* Item Image Frame */}
                    <div className="relative w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 group-hover:scale-104 transition-transform duration-300"
                        sizes="80px"
                      />
                    </div>
                    {/* Details */}
                    <div className="space-y-1 min-w-0">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-sans">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 line-clamp-1 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">
                        SKU: {item.sku}
                      </p>
                      
                      {/* Material & Finish parameters */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5 select-none">
                        <span className="text-[8px] font-extrabold bg-slate-100 text-slate-500 uppercase px-1.5 py-0.5 rounded">
                          {item.material || "Solid Brass"}
                        </span>
                        <span className="text-[8px] font-extrabold bg-slate-100 text-slate-500 uppercase px-1.5 py-0.5 rounded">
                          {item.finish || "Brushed Gold"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Quantity Selector & Pricing */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-sm font-black text-slate-900 font-mono shrink-0 order-last sm:order-first">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>

                    <div className="flex items-center gap-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 bg-slate-50 rounded-lg p-0.5">
                        <button
                          onClick={() => item.quantity > 1 && decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          className={`p-1 rounded transition-colors ${
                            item.quantity <= 1 
                              ? "text-slate-300 cursor-not-allowed opacity-40" 
                              : "text-slate-400 hover:text-slate-700 hover:bg-white cursor-pointer"
                          }`}
                          title="Decrease Quantity (Min 1)"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} className="stroke-[2.5]" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800 min-w-[20px] text-center font-mono select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-white rounded transition-colors cursor-pointer"
                          title="Increase Quantity"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} className="stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Detail overlay trigger */}
                      <button
                        onClick={() => {
                          const catalogProduct = products.find((p) => p.id === item.id);
                          if (catalogProduct) setActiveQuickView(catalogProduct);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Product Specifications"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Sticky Summary Panel (30%) */}
            <div className="lg:col-span-3 lg:sticky lg:top-28 space-y-4">
              <div className="bg-white border border-slate-150 rounded-[20px] p-6 shadow-sm space-y-5">
                <div className="pb-3.5 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
                    Procurement Summary
                  </h3>
                </div>

                <div className="space-y-3 font-medium text-slate-600 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Products Selected</span>
                    <span className="font-bold text-slate-800">{cartItems.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Quantity</span>
                    <span className="font-bold text-slate-800">{cartCount}</span>
                  </div>
                  
                  <div className="flex items-baseline justify-between border-t border-slate-200/40 pt-4.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      Estimated Subtotal
                    </span>
                    <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Disclaimer card */}
                <div className="bg-[#DAA017]/5 border border-[#DAA017]/15 rounded-xl p-3.5 flex gap-2.5 items-start">
                  <Info size={14} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-550 leading-relaxed font-sans font-medium">
                    Final pricing will be confirmed by our B2B sales specialists after reviewing your RFQ specifications and shipping requirements.
                  </p>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-2.5 pt-1">
                  <Link href={getCheckoutLink()} className="block w-full">
                    <button className="w-full py-3 bg-accent hover:bg-[#c49015] text-primary font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg hover:shadow-accent/10 cursor-pointer flex items-center justify-center gap-1.5">
                      <span>Proceed to RFQ</span>
                      <ArrowRight size={13} className="stroke-[2.5]" />
                    </button>
                  </Link>

                  <Link href="/products" className="block w-full">
                    <button className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-200 shadow-sm cursor-pointer">
                      Browse Products
                    </button>
                  </Link>
                </div>
              </div>

              {/* Secure transaction summary card */}
              <div className="bg-slate-900 border border-slate-800 text-slate-400 rounded-[20px] p-4 text-center text-[9px] font-mono font-bold flex items-center justify-center gap-1.5 select-none shadow-sm">
                <ShieldCheck size={14} className="text-accent shrink-0" />
                <span>AES-128 RFQ TRANSMISSION SECURED</span>
              </div>
            </div>

          </div>
        )}

        {/* Recommended Products Grid Footer */}
        <section className="space-y-5 pt-8 border-t border-slate-100">
          <div className="pb-1 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
              Recommended Products
            </h3>
            <Link 
              href="/products"
              className="text-[9px] font-bold text-accent hover:text-amber-500 uppercase tracking-widest font-mono flex items-center gap-0.5"
            >
              <span>Explore Catalog</span>
              <ArrowRight size={11} className="stroke-[2.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalRecommended.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-slate-150 rounded-[20px] p-4.5 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-305 flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Image Frame */}
                  <div className="relative aspect-[4/3] w-full bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2.5 group-hover:scale-104 transition-transform duration-300"
                      sizes="180px"
                    />
                  </div>
                  {/* Category & Title */}
                  <div className="mt-3.5 space-y-1">
                    <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block font-sans">
                      {product.category}
                    </span>
                    <h4 
                      onClick={() => setActiveQuickView(product)}
                      className="text-xs font-extrabold text-slate-800 line-clamp-1 hover:text-accent cursor-pointer transition-colors leading-tight"
                    >
                      {product.name}
                    </h4>
                  </div>
                </div>

                {/* Details Button */}
                <button
                  onClick={() => setActiveQuickView(product)}
                  className="w-full mt-4 py-2 text-center text-[9px] font-bold text-slate-650 hover:text-primary border border-slate-200 hover:border-slate-800 bg-white rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 font-mono uppercase tracking-wider"
                >
                  <Eye size={12} />
                  <span>View Product</span>
                </button>
              </div>
            ))}
          </div>
        </section>

      </Container>

      {/* Quick View spec modal overlay */}
      <QuickViewModal
        product={activeQuickView}
        onClose={() => setActiveQuickView(null)}
      />
    </div>
  );
}
