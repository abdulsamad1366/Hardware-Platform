"use client";

import { motion } from "framer-motion";
import { Layers, Settings, Sparkles, ShieldCheck, Package, Truck } from "lucide-react";

interface TimelineStep {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TIMELINE_STEPS: TimelineStep[] = [
  { 
    title: "Raw Material", 
    desc: "Premium brass, steel and alloys sourced globally.", 
    icon: Layers 
  },
  { 
    title: "Precision Engineering", 
    desc: "High precision CNC production.", 
    icon: Settings 
  },
  { 
    title: "Surface Finishing", 
    desc: "Electroplating and polishing.", 
    icon: Sparkles 
  },
  { 
    title: "Quality Inspection", 
    desc: "Multi-stage testing.", 
    icon: ShieldCheck 
  },
  { 
    title: "Packaging", 
    desc: "Premium export packaging.", 
    icon: Package 
  },
  { 
    title: "Worldwide Dispatch", 
    desc: "Global B2B logistics.", 
    icon: Truck 
  }
];

export default function ManufacturingTimeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] } }
  };

  return (
    <div className="space-y-12 pt-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-full border border-accent/20">
          Our Operations Workflow
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          The Manufacturing Timeline
        </h3>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative"
      >
        {/* Desktop Horizontal Connectors & Steps */}
        <div className="hidden lg:block relative px-4">
          
          {/* Connector Progress Line (Underlay) */}
          <div className="absolute top-[28px] left-[8%] right-[8%] h-0.5 bg-slate-800 z-0">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number], delay: 0.3 }}
            />
          </div>

          {/* Steps Horizontal Row */}
          <div className="flex flex-row justify-between relative z-10">
            {TIMELINE_STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div 
                  key={step.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center space-y-4 flex-1 px-3 group"
                >
                  {/* Circle Node */}
                  <motion.div 
                    variants={{
                      hidden: { scale: 0.8, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#0F172A" },
                      visible: { 
                        scale: 1, 
                        borderColor: "#D4A017", 
                        backgroundColor: "#1E293B",
                        transition: { delay: 0.3 + 0.15 * idx, duration: 0.3 } 
                      }
                    }}
                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-accent text-sm shadow-md group-hover:shadow-[0_0_15px_rgba(212,160,23,0.3)] transition-all duration-300 relative"
                  >
                    <IconComponent className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Index Number Floating Indicator */}
                    <span className="absolute -top-1 -right-1 bg-accent text-[#0F172A] w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold select-none">
                      {idx + 1}
                    </span>
                  </motion.div>
                  
                  {/* Step Description */}
                  <div className="space-y-1 bg-slate-900/20 group-hover:bg-slate-900/40 p-4 rounded-2xl border border-transparent group-hover:border-white/5 transition-all duration-300">
                    <h4 className="text-white font-extrabold text-xs lg:text-sm tracking-tight group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-[10px] lg:text-[11px] text-slate-400 font-sans max-w-[130px] mx-auto leading-normal font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Connectors & Steps */}
        <div className="block lg:hidden relative pl-4 sm:pl-8">
          
          {/* Connector Progress Line */}
          <div className="absolute top-[28px] bottom-[28px] left-[45px] sm:left-[53px] w-0.5 bg-slate-800 z-0">
            <motion.div 
              className="w-full bg-accent"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number], delay: 0.3 }}
            />
          </div>

          {/* Steps Vertical Column */}
          <div className="flex flex-col space-y-8 relative z-10 pl-4 sm:pl-8">
            {TIMELINE_STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div 
                  key={step.title}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 text-left group"
                >
                  {/* Circle Node */}
                  <motion.div 
                    variants={{
                      hidden: { scale: 0.8, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "#0F172A" },
                      visible: { 
                        scale: 1, 
                        borderColor: "#D4A017", 
                        backgroundColor: "#1E293B",
                        transition: { delay: 0.3 + 0.15 * idx, duration: 0.3 } 
                      }
                    }}
                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-accent text-sm shadow-md shrink-0 relative group-hover:shadow-[0_0_15px_rgba(212,160,23,0.3)] transition-all duration-300"
                  >
                    <IconComponent className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Index Floating Badge */}
                    <span className="absolute -top-1 -right-1 bg-accent text-[#0F172A] w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold select-none">
                      {idx + 1}
                    </span>
                  </motion.div>
                  
                  {/* Step Description */}
                  <div className="pt-1.5 space-y-0.5 bg-slate-900/10 group-hover:bg-slate-900/30 p-4 rounded-2xl border border-transparent group-hover:border-white/5 transition-all duration-300 flex-grow">
                    <h4 className="text-white font-extrabold text-sm tracking-tight group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-normal font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
