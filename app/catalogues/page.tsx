import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";

export default function Catalogues() {
  const catalogues = [
    {
      title: "Complete Architectural Hardware Catalog",
      size: "18.4 MB",
      version: "2026 Edition"
    },
    {
      title: "Locks, Latches & High-Security Systems",
      size: "12.1 MB",
      version: "V3.4"
    },
    {
      title: "Glass Fittings & Commercial Hinges",
      size: "8.7 MB",
      version: "2026 Edition"
    },
    {
      title: "Custom Finishes & Materials Reference Guide",
      size: "4.2 MB",
      version: "V1.0"
    }
  ];

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
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Product Catalogues</h1>
          <p className="text-slate-600 text-sm">Download offline PDF documentation for technical specifications and dimension grids.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {catalogues.map((cat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-soft border border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-primary">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-base leading-tight mb-1">{cat.title}</h3>
                  <p className="text-xs text-slate-500">{cat.version} &bull; {cat.size}</p>
                </div>
              </div>
              
              <button className="bg-primary hover:bg-slate-800 text-white p-3 rounded-lg transition-colors cursor-pointer flex items-center gap-2 text-xs font-semibold">
                <Download size={16} className="text-accent" />
                <span className="hidden sm:inline">Download</span>
              </button>
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
