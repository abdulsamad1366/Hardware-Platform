"use client";

import Container from "@/components/layout/container";
import Link from "next/link";
import Button from "@/components/common/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import ManufacturingImage from "./ManufacturingImage";
import ManufacturingStats from "./ManufacturingStats";
import ManufacturingTimeline from "./ManufacturingTimeline";

export default function ManufacturingExcellence() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative py-24 lg:py-28 bg-[#0F172A] text-white border-b border-slate-800/40 overflow-hidden z-10">
      
      {/* Blurred Gold Glow Backdrop Highlights */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Container className="space-y-20 lg:space-y-24">
        
        {/* Main Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="space-y-6 lg:space-y-7"
          >
            {/* Badge */}
            <motion.div 
              variants={textVariants}
              className="inline-flex items-center gap-1.5 text-xs text-accent uppercase font-bold tracking-widest bg-accent/5 border border-accent/20 px-3.5 py-1.5 rounded-full"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Manufacturing Excellence</span>
            </motion.div>

            {/* Heading & Divider */}
            <div className="space-y-4">
              <motion.h2 
                variants={textVariants}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              >
                Built with Precision.<br />
                <span className="text-accent">Trusted by Professionals.</span>
              </motion.h2>
              <motion.div 
                variants={textVariants}
                className="w-12 h-0.5 bg-accent"
              />
            </div>

            {/* Description */}
            <motion.p 
              variants={textVariants}
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-sans font-medium"
            >
              Showcase world-class manufacturing capabilities, strict quality standards and OEM expertise. Our state-of-the-art facilities produce precision architectural hardware trusted across commercial and residential projects.
            </motion.p>

            {/* CTA Button with Hover Lift and Glow */}
            <motion.div variants={textVariants}>
              <Link href="/about" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg inline-block">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-[#0F172A] hover:border-accent font-extrabold px-8 py-4 h-12 shadow-soft transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    <span>Explore Manufacturing</span>
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Large Premium Factory Showcase Image */}
          <ManufacturingImage />

        </div>

        {/* Statistics Grid Section */}
        <ManufacturingStats />

        {/* Animated Manufacturing Process Timeline */}
        <ManufacturingTimeline />

      </Container>
    </section>
  );
}
