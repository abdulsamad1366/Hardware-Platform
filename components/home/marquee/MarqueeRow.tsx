"use client";

import React from "react";
import { MarqueeItem } from "@/data/marquee";

interface MarqueeRowProps {
  items: MarqueeItem[];
  direction?: "left" | "right";
}

export default function MarqueeRow({ items, direction = "left" }: MarqueeRowProps) {
  // Repeat items to guarantee coverage across ultra-wide viewports
  const repeatedItems = [...items, ...items, ...items, ...items];

  const trackAnimationClass = direction === "left" 
    ? "animate-marquee-left-slow" 
    : "animate-marquee-right-slow";

  return (
    <div className="group relative w-full h-[50px] flex items-center overflow-hidden bg-[#0F172A]">
      {/* Premium Ambient Edge Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0F172A] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0F172A] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max items-center">
        {/* Track 1 */}
        <div className={`flex items-center gap-6 px-3 shrink-0 ${trackAnimationClass} group-hover:[animation-play-state:paused]`}>
          {repeatedItems.map((item, idx) => (
            <React.Fragment key={`t1-${idx}`}>
              <div className="flex items-center gap-3 text-slate-100 font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/80 hover:border-accent/40 rounded-full px-5 py-2.5 shadow-sm transition-all duration-300 select-none">
                <item.icon className="w-4 h-4 text-accent shrink-0" />
                <span className="whitespace-nowrap">{item.text}</span>
              </div>
              <div className="w-1.5 h-1.5 rotate-45 bg-accent/60 shrink-0" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>

        {/* Track 2 (Duplicate for infinite seamless looping) */}
        <div className={`flex items-center gap-6 px-3 shrink-0 ${trackAnimationClass} group-hover:[animation-play-state:paused]`} aria-hidden="true">
          {repeatedItems.map((item, idx) => (
            <React.Fragment key={`t2-${idx}`}>
              <div className="flex items-center gap-3 text-slate-100 font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/80 hover:border-accent/40 rounded-full px-5 py-2.5 shadow-sm transition-all duration-300 select-none">
                <item.icon className="w-4 h-4 text-accent shrink-0" />
                <span className="whitespace-nowrap">{item.text}</span>
              </div>
              <div className="w-1.5 h-1.5 rotate-45 bg-accent/60 shrink-0" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
