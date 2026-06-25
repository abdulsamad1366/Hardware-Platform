"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { headerNavigation } from "@/data/navigation";
import Container from "../container";
import Button from "../../common/button";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 select-none group">
            <span className="text-xl font-bold tracking-wider uppercase text-white">
              Hardware<span className="text-accent transition-colors duration-300 group-hover:text-amber-500">Platform</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            {headerNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-2 transition-colors duration-300 text-sm ${
                    isActive ? "text-accent font-bold" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <Link href="/rfq">
              <Button variant="accent" size="sm" rightIcon={<ArrowRight size={14} />}>
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-accent transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-20 bg-primary/98 backdrop-blur-lg z-40 transition-transform duration-300 border-t border-slate-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6">
          {headerNavigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium border-b border-slate-800 pb-3 transition-colors ${
                  isActive ? "text-accent font-semibold" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4">
            <Link href="/rfq" onClick={() => setIsOpen(false)}>
              <Button variant="accent" className="w-full" rightIcon={<ArrowRight size={16} />}>
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
