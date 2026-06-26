"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ManufacturingImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
      whileHover="hover"
      className="relative aspect-[4/3] w-full rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] cursor-pointer group"
    >
      {/* Precision Industrial Image */}
      <motion.div
        className="w-full h-full relative"
        variants={{
          hover: { scale: 1.08 }
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }}
      >
        <Image
          src="/images/82998a1c-6996-4418-9317-c0ed86602dfd.png"
          alt="SecureLink Advanced Precision Manufacturing Facade"
          fill
          className="object-cover"
          sizes="(max-w-1024px) 100vw, 50vw"
          priority
        />
      </motion.div>

      {/* Luxury Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent pointer-events-none" />
    </motion.div>
  );
}
