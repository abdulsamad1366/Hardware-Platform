import Link from "next/link";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-bg font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-primary text-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-accent transition-colors flex items-center space-x-1 text-sm">
              <ArrowLeft size={16} />
              <span>Back Home</span>
            </Link>
          </div>
          <span className="text-lg font-bold tracking-wider uppercase text-white">
            Hardware<span className="text-accent">Platform</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full py-16 px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-2">Product Catalog</h1>
            <p className="text-slate-600 text-sm">Browse architectural and industrial fittings by categories.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-white border border-slate-200 text-primary text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-accent w-64 shadow-soft"
              />
              <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            </div>
            <button className="flex items-center space-x-2 bg-white border border-slate-200 hover:border-slate-300 text-primary px-4 py-2.5 rounded-lg text-sm transition-colors shadow-soft">
              <SlidersHorizontal size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Categories Grid Placeholder */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {["Architectural Hardware", "Locks & Access Systems", "Glass Fittings", "Cabinet Handles", "Sliding Systems", "Builder Hardware"].map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-soft border border-slate-100 hover:border-accent/40 transition-all duration-300 group">
              <div className="text-slate-300 text-xs font-mono mb-2">CATEGORY 0{idx + 1}</div>
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{cat}</h3>
              <p className="text-slate-600 text-sm mb-6">
                Premium grade solutions engineered for reliability, architectural layouts and security.
              </p>
              <Link href="/products" className="text-primary font-bold text-sm flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                <span>View Products</span>
                <span className="text-accent">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-8 px-6 text-center text-xs border-t border-slate-800">
        <p className="text-slate-500">Hardware Platform &copy; {new Date().getFullYear()} - Premium B2B Product Discovery</p>
      </footer>
    </div>
  );
}
