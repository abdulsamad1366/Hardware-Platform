"use client";

import { useState } from "react";
import Container from "@/components/layout/container";
import FAQAccordionItem from "./FAQAccordionItem";
import { FileText, Package, Factory, Settings, Truck, PhoneCall, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/common/button";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    question: "How do I request a quotation?",
    answer: "Browse products, open the product page and click \"Add to Cart\" or contact us directly through WhatsApp.",
    icon: FileText
  },
  {
    question: "Do you support bulk orders?",
    answer: "Yes. We specialize in wholesale and bulk supply for distributors, builders, retailers and commercial projects.",
    icon: Package
  },
  {
    question: "Do you offer OEM manufacturing?",
    answer: "Yes. We provide OEM and custom manufacturing solutions for selected products.",
    icon: Factory
  },
  {
    question: "Can I customize hardware products?",
    answer: "Depending on the product category, branding, finish and specifications can be customized.",
    icon: Settings
  },
  {
    question: "Do you deliver across India?",
    answer: "Yes. We supply products throughout India through our logistics network.",
    icon: Truck
  },
  {
    question: "How can I contact your sales team?",
    answer: "Use the WhatsApp button, enquiry form or Contact page to reach our sales specialists.",
    icon: PhoneCall
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }
    }
  };

  return (
    <section className="py-24 lg:py-28 bg-slate-50 text-slate-900 border-b border-slate-200/50 overflow-hidden relative">
      <Container className="space-y-16 lg:space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-5">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#DAA017] uppercase font-bold tracking-widest bg-[#DAA017]/5 border border-[#DAA017]/20 px-3.5 py-1.5 rounded-full">
            <span>FAQs</span>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Frequently Asked Questions
            </h2>
            {/* Small gold underline accent */}
            <div className="w-16 h-0.5 bg-[#DAA017] mx-auto mt-4" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-medium">
            Find answers to the most common questions about our products, manufacturing capabilities and quotation process.
          </p>
        </div>

        {/* Centered Accordion Content (max-width ~80% of container) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto w-full space-y-4"
        >
          {FAQ_ITEMS.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <FAQAccordionItem
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                icon={item.icon}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Support CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] as [number, number, number, number] }}
          className="bg-white border border-slate-200/80 rounded-[20px] p-8 sm:p-10 text-center max-w-4xl mx-auto shadow-[0_15px_40px_-20px_rgba(15,23,42,0.05),0_0_20px_rgba(218,160,23,0.03)] space-y-6 relative overflow-hidden"
        >
          {/* Subtle top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#DAA017]" />

          {/* Phone Operator Circle Icon */}
          <div className="w-12 h-12 rounded-full bg-yellow-50 border border-[#DAA017]/20 flex items-center justify-center text-[#DAA017] mx-auto">
            <Headphones className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Still Have Questions?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed max-w-xl mx-auto font-medium">
              Our hardware specialists can help you choose the right products, discuss CEM manufacturing, or prepare a quotation.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Chat on WhatsApp */}
            <Link 
              href="https://wa.me/919999999999" 
              target="_blank" 
              className="w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-xl"
            >
              <Button
                variant="accent"
                className="w-full sm:w-auto bg-[#DAA017] hover:bg-amber-600 text-white font-extrabold px-6 py-4 h-12 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-300"
              >
                {/* WhatsApp SVG Icon */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.805-9.805.001-2.621-1.02-5.086-2.875-6.944-1.856-1.856-4.322-2.875-6.943-2.875-5.407 0-9.81 4.403-9.813 9.814-.001 1.536.413 3.037 1.2 4.382l-.988 3.606 3.69-.979zm11.502-6.84c-.313-.156-1.854-.915-2.137-1.018-.282-.103-.488-.156-.693.156-.205.312-.796 1.018-.975 1.224-.18.207-.359.234-.672.078-.313-.156-1.323-.488-2.52-1.555-.93-.83-1.558-1.855-1.74-2.167-.182-.313-.019-.481.137-.636.141-.14.313-.365.47-.547.156-.182.208-.313.313-.52.105-.208.052-.39-.026-.547-.078-.156-.693-1.67-.95-2.285-.25-.601-.524-.519-.713-.529-.185-.01-.397-.012-.61-.012s-.56.08-.853.4c-.293.32-1.12 1.094-1.12 2.67s1.147 3.1 1.303 3.3c.156.2 2.257 3.447 5.468 4.836.764.33 1.36.527 1.824.674.768.243 1.467.209 2.02.127.616-.092 1.854-.758 2.117-1.458.263-.699.263-1.3.185-1.458-.078-.157-.282-.26-.595-.417z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </Button>
            </Link>

            {/* Contact Sales */}
            <Link 
              href="/contact" 
              className="w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-xl"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto border-[#DAA017] text-[#DAA017] hover:bg-amber-50/20 font-extrabold px-6 py-4 h-12 shadow-sm transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-[2px] active:scale-[0.98]"
              >
                <PhoneCall size={14} className="shrink-0" />
                <span>Contact Sales</span>
              </Button>
            </Link>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
