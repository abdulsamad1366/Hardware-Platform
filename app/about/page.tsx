import Link from "next/link";
import { ArrowLeft, Target, Globe, Milestone } from "lucide-react";

export default function About() {
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
          <h1 className="text-4xl font-extrabold text-primary mb-2">About Our Platform</h1>
          <p className="text-slate-600 text-sm">India's premium integrated destination for high-quality architectural fittings and hardware manufacturing.</p>
        </div>

        {/* Story */}
        <div className="bg-white p-8 rounded-lg shadow-soft border border-slate-100 mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Unified Infrastructure</h2>
          <p className="text-slate-600 leading-relaxed text-sm mb-6">
            We represent a consolidated network of manufacturing units, trading setups, and design laboratories. By bringing multiple specialized entities under a single unified catalog, we allow developers, builders, wholesalers, and interior architects to source everything seamlessly.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-start space-x-3">
              <Target size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary text-sm">Our Mission</h4>
                <p className="text-xs text-slate-500 mt-1">To design architectural systems that unify aesthetics, precision, and heavy structural capacity.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Globe size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary text-sm">Supply Chain</h4>
                <p className="text-xs text-slate-500 mt-1">Sourcing high-integrity components and delivering bulk wholesale configurations globally.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Milestone size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-primary text-sm">Quality First</h4>
                <p className="text-xs text-slate-500 mt-1">Tested for wear, corrosion, cycle standards, and certified against industry benchmarks.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-8 px-6 text-center text-xs border-t border-slate-800">
        <p className="text-slate-500">Hardware Platform &copy; {new Date().getFullYear()} - Premium B2B Product Discovery</p>
      </footer>
    </div>
  );
}
