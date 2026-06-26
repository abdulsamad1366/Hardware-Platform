"use client";

import { useEffect, useRef } from "react";
import { useInView, animate, motion } from "framer-motion";
import { Award, Cpu, Users, Globe } from "lucide-react";

interface StatItem {
  numericValue: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS: StatItem[] = [
  { numericValue: 35, suffix: "+", label: "Years Experience", icon: Award },
  { numericValue: 10, suffix: "M+", label: "Products Manufactured", icon: Cpu },
  { numericValue: 500, suffix: "+", label: "Skilled Workforce", icon: Users },
  { numericValue: 50, suffix: "+", label: "Countries Served", icon: Globe }
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return (
    <span className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-accent font-sans">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function ManufacturingStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }  
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-slate-800/60"
    >
      {STATS.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={{ 
              y: -8, 
              borderColor: "rgba(212, 160, 23, 0.4)",
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 160, 23, 0.15)"
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }}
            className="relative bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-[20px] text-left flex flex-col justify-between h-36 select-none cursor-pointer group"
          >
            {/* Stat Card Top Line */}
            <div className="flex justify-between items-start">
              {/* Animated Count-Up */}
              <CountUp value={stat.numericValue} suffix={stat.suffix} />
              
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent/80 group-hover:text-accent group-hover:border-accent/30 transition-colors duration-300">
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            {/* Stat Label */}
            <div className="text-[10px] sm:text-xs text-white/70 font-bold uppercase tracking-widest font-sans pt-4">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
