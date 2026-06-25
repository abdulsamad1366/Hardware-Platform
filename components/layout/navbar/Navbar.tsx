"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import Container from "../container";
import Button from "../../common/button";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-md shadow-soft py-4 border-b border-slate-800"
          : "bg-transparent py-6"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo />

          {/* Nav links (Desktop) */}
          <NavLinks />

          {/* Right Action Block */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end max-w-sm">
            <SearchBar />
            <Link href="/rfq">
              <Button variant="accent" size="sm" rightIcon={<ArrowRight size={14} />}>
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-accent transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile navigation menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
