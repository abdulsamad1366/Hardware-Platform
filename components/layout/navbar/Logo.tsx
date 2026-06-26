"use client";

import Link from "next/link";

interface LogoProps {
  isScrolled?: boolean;
}

export function Logo({ isScrolled = false }: LogoProps) {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md px-1.5 py-0.5 transition-all duration-300"
      aria-label="SecureLink Home"
    >
      <span
        className={`font-sans font-extrabold text-xl sm:text-2xl tracking-tight transition-colors duration-300 ${
          isScrolled ? "text-primary" : "text-white"
        }`}
      >
        Secure<span className="text-accent">Link</span>
      </span>
      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5" />
    </Link>
  );
}

export default Logo;