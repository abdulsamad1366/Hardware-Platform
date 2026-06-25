import Link from "next/link";
import { ArrowLeft, Building2, Store, Home, Factory } from "lucide-react";

export default function Industries() {
  const industries = [
    {
      title: "Commercial & Office Spaces",
      desc: "Heavy-duty door hardware, glass fittings, locks, and automatic access control systems built for high-traffic environments.",
      icon: Building2
    },
    {
      title: "Premium Hospitality & Hotels",
      desc: "Elegant design fittings, aesthetic cabinet pulls, smart locks, and custom architectural accessories.",
      icon: Store
    },
    {
      title: "Luxury Residential Projects",
      desc: "Sophisticated locksets, boutique handles, sliding system tracks, and designer hardware collections.",
      icon: Home
    },
    {
      title: "Industrial & Warehouses",
      desc: "Robust utility handles, hinges, latches, and secure padlocks capable of weathering extreme environments.",
      icon: Factory
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
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Industries Served</h1>
          <p className="text-slate-600 text-sm">We provide precision-engineered hardware systems configured for diverse sector-specific applications.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-soft border border-slate-100 flex items-start space-x-6">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center text-accent">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{ind.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {ind.desc}
                  </p>
                  <Link href="/products" className="text-primary font-semibold text-xs hover:text-accent flex items-center space-x-1">
                    <span>Explore Industry Hardware</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-8 px-6 text-center text-xs border-t border-slate-800">
        <p className="text-slate-500">Hardware Platform &copy; {new Date().getFullYear()} - Premium B2B Product Discovery</p>
      </footer>
    </div>
  );
}
