"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.title}
            href={item.href}
            className={`relative py-2 text-sm transition-colors duration-300 ${
              isActive ? "text-accent font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            {item.title}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
