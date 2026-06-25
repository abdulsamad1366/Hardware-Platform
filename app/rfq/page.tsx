import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";

export default function RFQ() {
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
      <main className="flex-grow max-w-3xl mx-auto w-full py-16 px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-primary mb-2">Request for Quote</h1>
          <p className="text-slate-600 text-sm">Submit your commercial procurement lists or custom manufacturing needs.</p>
        </div>

        {/* RFQ Form */}
        <div className="bg-white p-8 rounded-lg shadow-soft border border-slate-100">
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-primary text-sm rounded-lg p-3 focus:outline-none focus:border-accent"
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Company / Firm</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-primary text-sm rounded-lg p-3 focus:outline-none focus:border-accent"
                  placeholder="e.g. Apex Construction Group"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Business Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-primary text-sm rounded-lg p-3 focus:outline-none focus:border-accent"
                  placeholder="e.g. procurement@apex.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Contact Number</label>
                <input 
                  type="tel" 
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-primary text-sm rounded-lg p-3 focus:outline-none focus:border-accent"
                  placeholder="e.g. +91 99999 88888"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Product Category interest</label>
              <select className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-primary text-sm rounded-lg p-3 focus:outline-none focus:border-accent">
                <option>Architectural Fitting Solutions</option>
                <option>High-Security Access & Locks</option>
                <option>Glass Systems & Hardware</option>
                <option>Cabinet pulls & Modular kitchen handles</option>
                <option>Custom OEM & Manufacturing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Inquiry Specifications / Details</label>
              <textarea 
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white text-primary text-sm rounded-lg p-3 focus:outline-none focus:border-accent"
                placeholder="Include sizes, finishes, quantities, or specific company specifications..."
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Send size={16} className="text-accent" />
              <span>Submit RFQ</span>
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-slate-400 py-8 px-6 text-center text-xs border-t border-slate-800">
        <p className="text-slate-500">Hardware Platform &copy; {new Date().getFullYear()} - Premium B2B Product Discovery</p>
      </footer>
    </div>
  );
}
