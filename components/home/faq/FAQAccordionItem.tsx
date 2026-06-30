"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

export default function FAQAccordionItem({ item, isOpen, onToggle, icon: IconComponent }: FAQAccordionItemProps) {
  return (
    <motion.div
      layout
      whileHover={{ 
        y: -2,
        borderColor: "#DAA017",
        boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.04), 0 0 12px rgba(218, 160, 23, 0.08)"
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }}
      className={`bg-white border rounded-[16px] overflow-hidden transition-colors duration-300 ${
        isOpen ? "border-[#DAA017] shadow-[0_15px_30px_rgba(218,160,23,0.05)]" : "border-[#E5E7EB]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:px-6 text-left focus:outline-none select-none cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          {/* Subtle Category Icon Container */}
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 ${
            isOpen 
              ? "bg-yellow-50 border-[#DAA017]/20 text-[#DAA017]" 
              : "bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-yellow-50 group-hover:border-[#DAA017]/20 group-hover:text-[#DAA017]"
          }`}>
            <IconComponent className="w-5 h-5 transition-colors duration-300" />
          </div>

          {/* Question Text */}
          <span className="font-extrabold text-[#0F172A] text-sm sm:text-base tracking-tight group-hover:text-[#DAA017] transition-colors duration-200 pr-4">
            {item.question}
          </span>
        </div>

        {/* Chevron Indicator */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }}
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen ? "border-[#DAA017] bg-yellow-50 text-[#DAA017]" : "border-slate-200 text-slate-400 group-hover:text-slate-600 group-hover:border-slate-300"
          }`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Answer Container with Expand/Collapse Animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { 
                height: { duration: 0.35, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }, 
                opacity: { duration: 0.25, delay: 0.05 } 
              } 
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { 
                height: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }, 
                opacity: { duration: 0.15 } 
              } 
            }}
          >
            {/* Aligned left padding of 64px to follow layout after the icon */}
            <div className="pl-[64px] pr-6 pb-5 pt-1 text-[16px] leading-[1.7] text-[#475569] font-sans">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
