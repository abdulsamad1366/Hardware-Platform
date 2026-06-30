import { ReactNode } from "react";
import { Navbar } from "./navbar/Navbar";
import { Footer } from "./footer/Footer";
import { FinalCTA } from "./FinalCTA";
import { CartDrawer } from "@/components/cart/CartDrawer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        {children}
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}