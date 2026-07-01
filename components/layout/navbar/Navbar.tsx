"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { Container } from "../container/Container";
import { contactConfig } from "@/config/contact";
import Button from "../../common/button";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

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

            {/* Right: Search, Cart, Login & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Search Icon */}
              <Link 
                href="/products"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isScrolled 
                    ? "text-slate-600 hover:bg-slate-100 hover:text-primary" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                title="Search Products"
              >
                <Search size={19} />
              </Link>

              {/* Cart Icon with Live Badge */}
              <Link
                href="/cart"
                className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                  isScrolled 
                    ? "text-slate-600 hover:bg-slate-100 hover:text-primary" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
                title="View Cart Selection"
              >
                <ShoppingCart size={19} />
                <span 
                  className={`absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full text-[9px] font-extrabold flex items-center justify-center border transition-all duration-300 font-mono ${
                    cartCount > 0 
                      ? "bg-accent text-primary border-accent scale-100" 
                      : "bg-slate-200 text-slate-500 border-slate-300 scale-100 opacity-60"
                  }`}
                >
                  {cartCount}
                </span>
              </Link>

              {/* Profile Dropdown or Login Button */}
              <div className="relative">
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="w-9 h-9 rounded-full bg-accent text-primary font-mono text-xs font-black tracking-wider flex items-center justify-center border border-accent/25 hover:brightness-105 transition-all select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50"
                      title={`Profile: ${user.name}`}
                      aria-expanded={isProfileOpen}
                      aria-haspopup="true"
                    >
                      {getInitials(user.name)}
                    </button>
                    
                    <AnimatePresence>
                      {isProfileOpen && (
                        <>
                          {/* Close overlay click listener */}
                          <div 
                            onClick={() => setIsProfileOpen(false)}
                            className="fixed inset-0 z-40 cursor-default"
                          />
                          
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2.5 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 font-sans text-left"
                          >
                            <div className="px-4.5 py-2.5 border-b border-slate-800/80 mb-1">
                              <span className="text-xs font-extrabold text-white block truncate leading-tight">{user.name}</span>
                              <span className="text-[9px] font-bold font-mono text-slate-500 block truncate uppercase tracking-widest mt-0.5">{user.company}</span>
                            </div>

                            <div className="space-y-0.5">
                              <Link 
                                href="/dashboard" 
                                onClick={() => setIsProfileOpen(false)}
                                className="w-full text-left block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer select-none"
                              >
                                My Dashboard
                              </Link>
                              
                              <Link 
                                href="/#rfqs" 
                                onClick={() => setIsProfileOpen(false)}
                                className="w-full text-left block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer select-none"
                              >
                                My RFQs
                              </Link>
                              
                              <Link 
                                href="/cart" 
                                onClick={() => setIsProfileOpen(false)}
                                className="w-full text-left block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer select-none"
                              >
                                My Cart
                              </Link>
                              
                              <Link 
                                href="/#profile" 
                                onClick={() => setIsProfileOpen(false)}
                                className="w-full text-left block px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer select-none"
                              >
                                Profile
                              </Link>

                              <button 
                                onClick={() => {
                                  setIsProfileOpen(false);
                                  logout();
                                }}
                                className="w-full text-left block px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs font-extrabold transition-all cursor-pointer select-none border-t border-slate-800 mt-1 pt-1.5"
                              >
                                Logout
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link 
                    href="/login"
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-xl"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={`font-bold border transition-colors ${
                        isScrolled
                          ? "border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900"
                          : "border-white/20 hover:border-white text-white hover:bg-white/5"
                      }`}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>

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
