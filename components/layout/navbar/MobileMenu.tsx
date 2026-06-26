"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { navigation } from "@/config/navigation";
import { contactConfig } from "@/config/contact";
import Button from "../../common/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll, handle Escape key, and trap focus
  useEffect(() => {
    if (!isOpen) return;

    // Save current body overflow style
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Trap focus inside the drawer
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableSelectors = 'a[href], button:not([disabled]), [tabindex="0"]';
      const focusableElements = drawerRef.current?.querySelectorAll(focusableSelectors);
      
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleFocusTrap);

    // Set initial focus to the close button
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex justify-end">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className="relative z-10 w-[300px] max-w-[85vw] h-full bg-primary border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right"
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <span className="font-sans font-extrabold text-xl tracking-tight text-white">
              Secure<span className="text-accent">Link</span>
            </span>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md p-1"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links list */}
          <nav aria-label="Mobile Main Navigation">
            <ul className="flex flex-col gap-4" role="list">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`block text-lg font-medium py-2 px-3 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                        isActive
                          ? "bg-slate-800/50 text-accent font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* WhatsApp & Contact CTA at bottom */}
        <div className="border-t border-slate-800 pt-6 mt-auto">
          <a
            href={`https://wa.me/${contactConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg"
          >
            <Button
              variant="accent"
              className="w-full justify-center gap-2 text-primary font-bold shadow-soft hover:shadow-md h-12"
              leftIcon={
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.793c-5.443 0-9.866 4.372-9.87 9.802 0 1.772.483 3.5 1.4 5.019l-.974 3.557 3.645-.956zm10.702-7.237c-.3-.15-1.774-.875-2.046-.976-.272-.1-.47-.15-.668.15-.198.3-.765.976-.938 1.178-.173.2-.347.225-.648.075-.3-.15-1.266-.466-2.41-1.485-.89-.794-1.49-1.775-1.665-2.076-.173-.3-.018-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.299.3-.5.1-.2.05-.375-.025-.526-.075-.15-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.726 2.022-1.429.247-.702.247-1.306.173-1.43-.075-.124-.272-.198-.57-.347z" />
                </svg>
              }
            >
              WhatsApp Inquiry
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

