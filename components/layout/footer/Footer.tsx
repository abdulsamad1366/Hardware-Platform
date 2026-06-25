import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { legalNavigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { contactConfig } from "@/config/contact";
import Container from "../container";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-400 border-t border-slate-800 font-sans">
      {/* Top Footer Section */}
      <div className="py-16 md:py-24 border-b border-slate-800">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            {/* Branding Column */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-block select-none">
                <span className="text-xl font-bold tracking-wider uppercase text-white">
                  {siteConfig.name}
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                {siteConfig.description}
              </p>
              
              {/* Quick Contact Block */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-sm text-slate-300">
                  <Phone size={16} className="text-accent flex-shrink-0" />
                  <span>{contactConfig.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-300">
                  <Mail size={16} className="text-accent flex-shrink-0" />
                  <span>{contactConfig.email}</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-slate-300">
                  <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                  <span>
                    {contactConfig.address.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Categorized Footer links mapping */}
            <FooterLinks />
          </div>
        </Container>
      </div>

      {/* Bottom Footer Section */}
      <div className="py-8 bg-slate-950/40 text-xs">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
              <p className="text-slate-600 mt-1">{siteConfig.tagline}</p>
            </div>
            
            {/* Legal Menu */}
            <div className="flex space-x-6">
              {legalNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
