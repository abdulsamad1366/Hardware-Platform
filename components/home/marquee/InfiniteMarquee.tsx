"use client";

import MarqueeRow from "./MarqueeRow";
import { row1Items } from "@/data/marquee";

export default function InfiniteMarquee() {
  return (
    <section className="w-full bg-[#0F172A] py-4 border-y border-slate-800/40 overflow-hidden flex flex-col">
      {/* Row 1 - Category Showcase - Scrolls Left */}
      <MarqueeRow items={row1Items} direction="left" />
    </section>
  );
}
