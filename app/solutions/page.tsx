import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Solutions() {
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
          <h1 className="text-4xl font-extrabold text-primary mb-2">B2B Solutions</h1>
          <p className="text-slate-600 text-sm">Tailored architectural, structural, and institutional hardware integration solutions.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "OEM & Manufacturing Solutions",
              description: "Custom fittings, hardware castings, and specialized branding options for large-scale manufacturers and developers."
            },
            {
              title: "Architectural Specification Services",
              description: "Technical scheduling, hardware consulting, and layout blueprints tailored for premium residential and commercial spaces."
            },
            {
              title: "Bulk Wholesale & Procurement",
              description: "Logistics pipelines, bulk discounts, and supply agreements for dealers, distributors, and large developers."
            },
            {
              title: "Project Customization",
              description: "Tailored surface finishes, dimensions, and alloy grades tailored to match specific builder demands."
            }
          ].map((sol, idx) => (
            <div key={idx} className="bg-white p-8 rounded-lg shadow-soft border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                  <CheckCircle2 className="text-accent flex-shrink-0" size={22} />
                  <span>{sol.title}</span>
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {sol.description}
                </p>
              </div>
              <Link href="/contact" className="text-accent hover:text-amber-600 font-semibold text-sm flex items-center gap-2">
                <span>Inquire About Solution</span>
                <span>&rarr;</span>
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
