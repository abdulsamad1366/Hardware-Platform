import { Metadata } from "next";
import { Suspense } from "react";
import ProductsCatalog from "@/components/products/ProductsCatalog";

export const metadata: Metadata = {
  title: "Premium Products Catalogue | SecureLink Hardware Marketplace",
  description: "Explore our architectural hardware catalogue. Browse door handles, smart locks, glass fittings, mortise locks, and custom B2B specifications, filter by finish and material, and request bulk quotations.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-accent"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Catalogue...</span>
        </div>
      </div>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}
