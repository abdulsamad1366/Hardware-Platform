import Link from "next/link";
import { Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2.5 select-none group">
      <div className="w-9 h-9 rounded bg-accent flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-105 shadow-soft">
        <Shield size={20} className="fill-current" />
      </div>
      <span className="text-xl font-bold tracking-wider uppercase text-white">
        {siteConfig.name}
      </span>
    </Link>
  );
}
