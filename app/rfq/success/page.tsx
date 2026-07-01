"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, LayoutDashboard } from "lucide-react";
import { Container } from "@/components/layout/container/Container";
import Button from "@/components/common/button";

export default function RFQSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-accent selection:text-primary pt-28 md:pt-36 pb-20 flex items-center justify-center">
      <Container className="max-w-xl">
        <div className="bg-white border border-slate-150 rounded-[20px] p-8 sm:p-12 text-center shadow-sm space-y-6">
          {/* Successful Checkmark */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto shadow-sm">
            <CheckCircle2 size={28} className="stroke-[1.5]" />
          </div>

          {/* Text block */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest block font-mono">
              Inquiry Logged
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              RFQ Submitted Successfully
            </h1>
            <p className="text-xs text-slate-550 max-w-[320px] mx-auto leading-relaxed">
              Our B2B sales team is currently reviewing your product selections. A custom quotation with volume discounts will be shared with you shortly.
            </p>
          </div>

          {/* B2B reference info */}
          <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-[10px] text-slate-500 font-mono font-medium leading-relaxed max-w-sm mx-auto select-none">
            RFQ Inquiry ID: <strong className="text-slate-800">SL-RFQ-2026-005</strong>
            <span className="block mt-1 font-sans text-[9px] text-slate-400">A verification email has been dispatched.</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto pt-2">
            <Link href="/dashboard" className="block w-full">
              <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow">
                <LayoutDashboard size={13} />
                <span>View My RFQs</span>
              </button>
            </Link>
            
            <Link href="/products" className="block w-full">
              <button className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-200 shadow-sm cursor-pointer flex items-center justify-center gap-1.5">
                <span>Browse Products</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
