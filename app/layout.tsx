import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/components/layout";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hardware Platform | Premium B2B Discovery Platform",
  description: "Discover India's most premium hardware, architectural fittings, and custom manufacturing solutions. Explore architectural and building hardware catalogues and submit RFQs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <CartProvider>
          <AuthProvider>
            <Layout>{children}</Layout>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}

