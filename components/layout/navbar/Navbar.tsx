"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "../container/Container";
import { contactConfig } from "@/config/contact";
import Button from "../../common/button";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Run once on mount to handle refreshed pages
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on window resize above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft py-3.5 border-slate-100"
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Logo isScrolled={isScrolled} />
            </div>

            {/* Center: Desktop Navigation Links */}
            <NavLinks isScrolled={isScrolled} />

            {/* Right: WhatsApp CTA & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* WhatsApp Button (Desktop) */}
              <a
                href={`https://wa.me/${contactConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg"
              >
                <Button
                  variant="accent"
                  size="sm"
                  className="font-bold gap-2 text-primary shadow-soft hover:shadow-md"
                  leftIcon={
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.793c-5.443 0-9.866 4.372-9.87 9.802 0 1.772.483 3.5 1.4 5.019l-.974 3.557 3.645-.956zm10.702-7.237c-.3-.15-1.774-.875-2.046-.976-.272-.1-.47-.15-.668.15-.198.3-.765.976-.938 1.178-.173.2-.347.225-.648.075-.3-.15-1.266-.466-2.41-1.485-.89-.794-1.49-1.775-1.665-2.076-.173-.3-.018-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.299.3-.5.1-.2.05-.375-.025-.526-.075-.15-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.726 2.022-1.429.247-.702.247-1.306.173-1.43-.075-.124-.272-.198-.57-.347z" />
                    </svg>
                  }
                >
                  WhatsApp
                </Button>
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md p-1.5 transition-colors duration-300 ${
                  isScrolled
                    ? "text-primary hover:text-accent"
                    : "text-white hover:text-accent"
                }`}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Navbar;
