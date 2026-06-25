import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNavigation } from "@/data/navigation";

export default function FooterLinks() {
  return (
    <>
      {footerNavigation.map((group) => (
        <div key={group.title} className="space-y-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">
            {group.title}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {group.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-white transition-colors duration-300 flex items-center group gap-1"
                >
                  <span>{item.name}</span>
                  {item.href.startsWith("http") && (
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
