"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingCart, FileText, Bookmark, User, ArrowRight, 
  MessageSquare, Phone, Info, Clock, CheckCircle2, XCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Container } from "@/components/layout/container/Container";
import { products, Product } from "@/data/products";
import QuickViewModal from "@/components/products/QuickViewModal";

// Mock RFQ Data
const MOCK_RFQS = [
  {
    id: "SL-RFQ-2026-004",
    date: "28 Jun 2026",
    products: "Classic Mortise Lock Body (Qty: 10), Brushed Gold Lever Handle (Qty: 20)",
    status: "Pending",
    statusColor: "text-amber-600 bg-amber-500/10 border-amber-500/20"
  },
  {
    id: "SL-RFQ-2026-003",
    date: "15 Jun 2026",
    products: "Glass Door Digital Rim Lock (Qty: 5), Concealed 3D Hinge (Qty: 50)",
    status: "Approved",
    statusColor: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: "SL-RFQ-2026-002",
    date: "22 May 2026",
    products: "Matte Black Patch Connector (Qty: 12)",
    status: "Completed",
    statusColor: "text-blue-600 bg-blue-500/10 border-blue-500/20"
  },
  {
    id: "SL-RFQ-2026-001",
    date: "10 May 2026",
    products: "AeroTouch Biometric Smart Lock (Qty: 2)",
    status: "Rejected",
    statusColor: "text-red-600 bg-red-500/10 border-red-500/20"
  }
];

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);

  // Get recently viewed products (extracting 4 mock items)
  const recentlyViewed = products.slice(0, 4);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock size={12} className="shrink-0" />;
      case "Approved":
      case "Completed":
        return <CheckCircle2 size={12} className="shrink-0" />;
      case "Rejected":
        return <XCircle size={12} className="shrink-0" />;
      default:
        return <Info size={12} className="shrink-0" />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent selection:text-primary pt-28 md:pt-36 pb-20">
      <Container className="max-w-[1400px] space-y-16">
        
        {/* Welcome Section */}
        {user && (
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-1.5">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {user.name.split(" ")[0]} 👋
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage your product selections, RFQs, and account from one place.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/products">
                <button className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow">
                  Browse Products
                </button>
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-slate-200 shadow-sm"
              >
                View My Selection
              </button>
            </div>
          </section>
        )}

        {/* 4 Action Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "My Selection Cart",
              metric: `${cartCount} ${cartCount === 1 ? "Product" : "Products"} Selected`,
              desc: "Continue building your procurement list.",
              cta: "Open Selection",
              icon: ShoppingCart,
              action: () => setIsCartOpen(true)
            },
            {
              title: "My RFQs",
              metric: "1 Pending RFQ",
              desc: "Track quotation requests and approvals.",
              cta: "View RFQs",
              icon: FileText,
              link: "/#rfqs"
            },
            {
              title: "Saved Products",
              metric: "8 Saved",
              desc: "Access your bookmarked products anytime.",
              cta: "Open Saved",
              icon: Bookmark,
              link: "/#saved"
            },
            {
              title: "My Account",
              metric: "Profile Complete",
              desc: "Manage your company and contact details.",
              cta: "Manage Account",
              icon: User,
              link: "/#account"
            }
          ].map((card, idx) => {
            const Icon = card.icon;

            const cardContent = (
              <div className="h-full flex flex-col justify-between p-6">
                <div className="space-y-4">
                  {/* Icon and Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {card.title}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent">
                      <Icon size={16} className="stroke-[2.5]" />
                    </div>
                  </div>
                  {/* Metric and description */}
                  <div className="space-y-1">
                    <span className="text-lg font-black text-slate-900 block font-mono">
                      {card.metric}
                    </span>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* CTA Link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-[10px] font-bold text-accent group-hover:text-amber-500 uppercase tracking-widest font-mono transition-colors">
                  <span>{card.cta}</span>
                  <ArrowRight size={11} className="stroke-[2.5] transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );

            const cardClass = "group bg-white border border-slate-150 rounded-[20px] shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-305 block text-left h-full w-full cursor-pointer";

            if (card.action) {
              return (
                <button 
                  key={idx}
                  onClick={card.action}
                  className={cardClass}
                >
                  {cardContent}
                </button>
              );
            }

            return (
              <Link 
                key={idx}
                href={card.link || "#"}
                className={cardClass}
              >
                {cardContent}
              </Link>
            );
          })}
        </section>

        {/* Recent RFQs Section */}
        <section className="space-y-5 bg-white border border-slate-150 rounded-[20px] p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
              Recent RFQ Inquiries
            </h3>
            <Link 
              href="/#rfqs" 
              className="text-[10px] font-bold text-accent hover:text-amber-500 uppercase tracking-widest font-mono flex items-center gap-0.5"
            >
              <span>View All RFQs</span>
              <ArrowRight size={11} className="stroke-[2.5]" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[9px] font-mono">
                  <th className="pb-3 pl-2">RFQ ID</th>
                  <th className="pb-3">Submitted Date</th>
                  <th className="pb-3 max-w-[280px] truncate">Selected Products</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_RFQS.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-slate-50/50 transition-all font-medium text-slate-700">
                    <td className="py-4 font-bold font-mono pl-2 text-slate-900">{rfq.id}</td>
                    <td className="py-4 font-mono text-slate-500">{rfq.date}</td>
                    <td className="py-4 max-w-[280px] truncate text-slate-500 pr-4">{rfq.products}</td>
                    <td className="py-4">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-extrabold border uppercase tracking-wider ${rfq.statusColor}`}>
                        {getStatusIcon(rfq.status)}
                        <span>{rfq.status}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <button 
                        disabled
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-wider font-mono cursor-not-allowed opacity-50"
                      >
                        View Inquiry
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recently Viewed Products Section */}
        <section className="space-y-5">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
              Recently Viewed Products
            </h3>
          </div>

          {/* Sleek Horizontal Cards Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((product) => (
              <div 
                key={product.id}
                className="flex gap-4 items-center bg-white border border-slate-150 rounded-[20px] p-4 shadow-sm hover:shadow-md transition-shadow group/card"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2 group-hover/card:scale-104 transition-transform duration-300"
                    sizes="64px"
                  />
                </div>
                
                {/* Details and View CTA */}
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    {product.category}
                  </span>
                  <h4 
                    onClick={() => setActiveQuickView(product)}
                    className="text-xs font-extrabold text-slate-800 truncate hover:text-accent cursor-pointer transition-colors leading-tight mt-0.5"
                  >
                    {product.name}
                  </h4>
                  <button 
                    onClick={() => setActiveQuickView(product)}
                    className="text-[10px] font-bold text-accent hover:text-amber-500 transition-colors uppercase tracking-wider mt-2 flex items-center gap-0.5 font-mono cursor-pointer"
                  >
                    <span>View Product</span>
                    <ArrowRight size={10} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Help / Support Section */}
        <section className="bg-slate-900 border border-slate-800 text-white rounded-[20px] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Accent Glow Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/5 rounded-full filter blur-2xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <h3 className="text-lg font-extrabold text-white tracking-tight uppercase tracking-wider font-mono text-xs text-accent">
              Need Assistance?
            </h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Our hardware product specialists are ready to help with custom dimensions, OEM specifications, and shipping details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <a 
              href="https://wa.me/919999999999" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <button className="px-5 py-3 bg-accent hover:bg-[#c49015] text-primary font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg hover:shadow-accent/10">
                <MessageSquare size={13} className="stroke-[2.5]" />
                <span>WhatsApp</span>
              </button>
            </a>
            
            <a href="mailto:sales@securelink.com">
              <button className="px-5 py-3 bg-slate-950 hover:bg-slate-800 text-slate-350 hover:text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-slate-800 flex items-center gap-2">
                <Phone size={13} />
                <span>Contact Sales</span>
              </button>
            </a>
          </div>
        </section>

      </Container>

      {/* Quick View modal Overlay */}
      <QuickViewModal
        product={activeQuickView}
        onClose={() => setActiveQuickView(null)}
      />
    </div>
  );
}
