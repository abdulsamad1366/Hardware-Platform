import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Layout } from "@/components/layout";
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
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

