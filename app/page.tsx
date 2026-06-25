import Link from "next/link";
import { ArrowRight, Shield, Award, Settings, Download, Send } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Navbar placeholder for navigation */}
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-wider uppercase text-white">
              Hardware<span className="text-accent">Platform</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            <Link href="/solutions" className="hover:text-accent transition-colors">Solutions</Link>
            <Link href="/industries" className="hover:text-accent transition-colors">Industries</Link>
            <Link href="/catalogues" className="hover:text-accent transition-colors">Catalogues</Link>
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </nav>
          <div>
            <Link 
              href="/rfq" 
              className="bg-accent hover:bg-amber-600 text-primary font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 shadow-soft hover:shadow-lg"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative bg-primary text-white py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-primary to-primary opacity-90"></div>
          <div className="relative max-w-7xl mx-auto flex flex-col items-start space-y-8">
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">
              India's Premium B2B Destination
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight">
              Industrial & Architectural Hardware Solutions
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light">
              Engineered for endurance. Designed for aesthetic excellence. Partnering with dealers, wholesalers, and builders across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/products" 
                className="bg-accent hover:bg-amber-600 text-primary font-bold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/catalogues" 
                className="border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-950 px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Download size={18} className="text-accent" />
                <span>Download Catalogue</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-24 bg-gray-bg px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
                Engineered for High-Performance Environments
              </h2>
              <p className="text-slate-600">
                Our products meet rigorous quality benchmarks, delivering durability and architectural integrity for commercial projects.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 text-accent">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Certified Quality</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every category is rigorously tested for load cycles, corrosion resistance, and high-frequency commercial usage.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 text-accent">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Premium Materials</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Forged from high-grade stainless steel, brass, and alloys to match contemporary architectural aesthetics.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-soft hover:shadow-lg transition-shadow duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-6 text-accent">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">B2B Customization</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Custom sizes, finishes, and manufacturing configurations available for wholesale ordering and contractors.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div>
            <p className="text-white font-semibold">Hardware Platform &copy; {new Date().getFullYear()}</p>
            <p className="mt-1">India's Premium Industrial & Architectural fittings</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/rfq" className="hover:text-white transition-colors">Inquiries</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
