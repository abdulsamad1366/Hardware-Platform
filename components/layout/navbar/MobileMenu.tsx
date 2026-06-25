"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { navigation } from "@/config/navigation";
import Button from "../../common/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-20 bg-primary/98 backdrop-blur-lg z-40 border-t border-slate-800 animate-in fade-in slide-in-from-right duration-300 md:hidden">
      <div className="flex flex-col p-6 space-y-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={onClose}
              className={`text-lg font-medium border-b border-slate-800 pb-3 transition-colors ${
                isActive ? "text-accent font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
        <div className="pt-4">
          <Link href="/rfq" onClick={onClose}>
            <Button variant="accent" className="w-full" rightIcon={<ArrowRight size={16} />}>
              Request Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
