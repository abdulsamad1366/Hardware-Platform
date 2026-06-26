"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";

interface NavLinksProps {
  isScrolled?: boolean;
}

export function NavLinks({ isScrolled = false }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main Navigation" className="hidden md:flex">
      <ul className="flex items-center gap-8" role="list">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <li key={item.href} className="relative py-2">
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md px-2 py-1 ${
                  isActive
                    ? "text-accent font-semibold"
                    : isScrolled
                    ? "text-slate-600 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.title}
              </Link>
              {isActive && (
                <span 
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full animate-in fade-in zoom-in-95 duration-300" 
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavLinks;